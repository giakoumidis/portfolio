#!/usr/bin/env python3
"""
Convert real LiDAR scans into the normalised CloudPoint JSON used by GridHorizon.

Default: merges several Neara outdoor scans, clusters elevated returns into
poles / trees / structures, and places them at different lateral positions.
https://github.com/Neara-Software/ground_segmentation_exercise
"""

from __future__ import annotations

import argparse
import json
import random
import sys
import urllib.request
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path

NEARA_BASE = (
    "https://raw.githubusercontent.com/Neara-Software/"
    "ground_segmentation_exercise/master/data"
)
ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUT = ROOT / "public" / "data" / "hero-pointcloud.json"
TARGET_POINTS = 1400
LOOP_TILES = 3
OBSTACLE_HEIGHT_M = 0.35
GROUND_PERCENTILE = 8
CLUSTER_CELL_M = 0.22
MIN_CLUSTER_POINTS = 28
OBJECT_KINDS = ("pole", "tree", "structure")

# Different Neara captures → different shapes when clustered and spaced on the grid.
DEFAULT_SCENES = (
    {"file": "Pole1.las", "xn": -0.28},
    {"file": "Pole3.las", "xn": -0.1},
    {"file": "Pole6.las", "xn": 0.1},
    {"file": "Pole8.las", "xn": 0.28},
)


@dataclass
class SceneSpec:
    file: str
    xn: float


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        return
    print(f"Downloading {url} …")
    urllib.request.urlretrieve(url, dest)
    print(f"Saved {dest} ({dest.stat().st_size:,} bytes)")


def read_las(path: Path):
    try:
        import laspy
        import numpy as np
    except ImportError:
        print("laspy and numpy are required: pip install laspy numpy", file=sys.stderr)
        sys.exit(1)

    las = laspy.read(str(path))
    x = np.asarray(las.x, dtype="float64")
    y = np.asarray(las.y, dtype="float64")
    z = np.asarray(las.z, dtype="float64")
    return x, y, z


def estimate_ground(z):
    import numpy as np

    return float(np.percentile(z, GROUND_PERCENTILE))


def classify_clusters(clusters, rel_h, lateral, depth) -> list[str]:
    import numpy as np

    if not clusters:
        return []

    metrics = []
    for cluster in clusters:
        h = rel_h[cluster]
        lat = lateral[cluster]
        dep = depth[cluster]
        height = float(h.max() - h.min())
        footprint = float(max(lat.max() - lat.min(), dep.max() - dep.min()))
        aspect = height / max(footprint, 0.15)
        metrics.append((height, footprint, aspect))

    kinds = ["structure"] * len(clusters)
    if len(clusters) == 1:
        kinds[0] = "pole"
        return kinds

    pole_i = max(range(len(clusters)), key=lambda i: metrics[i][2])
    tree_i = max(
        range(len(clusters)),
        key=lambda i: metrics[i][1] if i != pole_i else -1.0,
    )
    kinds[pole_i] = "pole"
    kinds[tree_i] = "tree"
    for i, (height, footprint, aspect) in enumerate(metrics):
        if kinds[i] != "structure":
            continue
        if height > 0.55 and footprint >= 0.35:
            kinds[i] = "tree"
        elif aspect >= 1.6:
            kinds[i] = "pole"
    return kinds


def spatial_clusters(obstacle_idx, lateral, depth):
    import numpy as np

    buckets: dict[tuple[int, int], list[int]] = defaultdict(list)
    for i in obstacle_idx:
        key = (
            int(float(lateral[i]) / CLUSTER_CELL_M),
            int(float(depth[i]) / CLUSTER_CELL_M),
        )
        buckets[key].append(int(i))
    return [np.array(v, dtype=int) for v in buckets.values() if len(v) >= MIN_CLUSTER_POINTS]


def sample_indices(idxs, n, rng: random.Random):
    import numpy as np

    if len(idxs) == 0:
        return np.array([], dtype=int)
    if len(idxs) <= n:
        return idxs
    return np.array(rng.sample(idxs.tolist(), n), dtype=int)


def sample_obstacles_stratified(idxs, n, rel_h, rng: random.Random):
    import numpy as np

    if len(idxs) == 0:
        return np.array([], dtype=int)
    if len(idxs) <= n:
        return idxs
    heights = rel_h[idxs]
    bands = np.linspace(float(heights.min()), float(heights.max()), 12 + 1)
    digitized = np.digitize(heights, bands[1:-1], right=False)
    per_band = max(1, n // 12)
    picked: list[int] = []
    for band in range(12):
        in_band = idxs[digitized == band]
        if len(in_band) == 0:
            continue
        picked.extend(rng.sample(in_band.tolist(), min(per_band, len(in_band))))
    if len(picked) < n:
        remaining = np.setdiff1d(idxs, np.array(picked, dtype=int))
        if len(remaining) > 0:
            extra = min(n - len(picked), len(remaining))
            picked.extend(rng.sample(remaining.tolist(), extra))
    return np.array(picked[:n], dtype=int)


def scene_points(x, y, z, scene: SceneSpec, rng: random.Random, object_budget: int):
    import numpy as np

    ground = estimate_ground(z)
    rel_h = z - ground
    lateral = x - float(np.median(x))
    depth = y - float(np.min(y))
    depth_range = float(np.max(depth)) or 1.0

    indices = np.arange(len(x))
    obstacle_idx = indices[rel_h > OBSTACLE_HEIGHT_M]
    clusters = spatial_clusters(obstacle_idx, lateral, depth)
    if not clusters:
        return []

    clusters.sort(key=len, reverse=True)
    cluster_kinds = classify_clusters(clusters, rel_h, lateral, depth)
    points: list[dict] = []
    per_cluster = max(24, object_budget // max(len(clusters), 1))

    for cluster, kind in zip(clusters[:6], cluster_kinds[:6]):
        picked = sample_obstacles_stratified(cluster, per_cluster, rel_h, rng)
        if len(picked) == 0:
            continue

        c_lat = float(np.median(lateral[picked]))
        c_dep = float(np.median(depth[picked]))
        lat_span = float(np.percentile(np.abs(lateral[picked] - c_lat), 92)) or 0.4
        max_h = float(np.percentile(rel_h[picked], 98)) or 1.0

        for i in picked:
            local_xn = (float(lateral[i] - c_lat) / lat_span) * 0.07
            xn = scene.xn + local_xn
            xn = max(-0.35, min(0.35, xn))
            slot = float(depth[i] - c_dep) / depth_range * 0.18 + 0.41
            slot = max(0.05, min(0.94, slot))
            h_norm = (
                max(0.0, float(rel_h[i]) / max_h) * (0.24 if kind == "pole" else 0.2)
                if rel_h[i] > 0.05
                else 0.0
            )
            points.append(
                {
                    "xn": round(xn, 5),
                    "slot": round(slot, 5),
                    "h": round(h_norm, 5),
                    "obstacle": True,
                    "kind": kind,
                }
            )

    return points


def ground_points_from_scene(x, y, z, count: int, rng: random.Random):
    import numpy as np

    ground = estimate_ground(z)
    rel_h = z - ground
    lateral = x - float(np.median(x))
    depth = y - float(np.min(y))
    depth_range = float(np.max(depth)) or 1.0

    indices = np.arange(len(x))
    ground_idx = indices[rel_h <= OBSTACLE_HEIGHT_M]
    picked = sample_indices(ground_idx, count, rng)
    if len(picked) == 0:
        return []

    lat_span = float(np.percentile(np.abs(lateral[picked]), 95)) or 1.0
    points = []
    for i in picked:
        xn = (float(lateral[i]) / lat_span) * 0.35
        xn = max(-0.35, min(0.35, xn))
        slot = float(depth[i]) / depth_range
        slot = max(0.0, min(0.999, slot))
        points.append(
            {
                "xn": round(xn, 5),
                "slot": round(slot, 5),
                "h": 0.0,
                "obstacle": False,
                "kind": "ground",
            }
        )
    return points


def tile_points(points: list[dict], loop_tiles: int) -> list[dict]:
    tiled: list[dict] = []
    for tile in range(loop_tiles):
        shift = tile / loop_tiles
        for p in points:
            local_slot = (p["slot"] % (1.0 / loop_tiles)) if loop_tiles else p["slot"]
            slot = (local_slot + shift) % 1.0
            tiled.append({**p, "slot": round(slot, 5)})
    return tiled


def build_multi_object_cloud(
    scenes: list[SceneSpec],
    cache_dir: Path,
    count: int,
    loop_tiles: int,
):
    rng = random.Random(42)
    ground_budget = max(120, round(count * 0.14))
    object_budget = max(200, (count // loop_tiles - ground_budget) // max(len(scenes), 1))

    merged: list[dict] = []
    ground_source = cache_dir / scenes[0].file

    for spec in scenes:
        las_path = cache_dir / spec.file
        download(f"{NEARA_BASE}/{spec.file}", las_path)
        x, y, z = read_las(las_path)
        merged.extend(scene_points(x, y, z, spec, rng, object_budget))

    x, y, z = read_las(ground_source)
    merged.extend(ground_points_from_scene(x, y, z, ground_budget, rng))

    rng.shuffle(merged)
    return tile_points(merged, loop_tiles)


def to_cloud_points_single(x, y, z, count: int, loop_tiles: int = LOOP_TILES):
    """Legacy single-file mode."""
    rng = random.Random(42)
    ground_budget = max(80, round((count // loop_tiles) * 0.22))
    object_budget = max(120, (count // loop_tiles) - ground_budget)
    base = ground_points_from_scene(x, y, z, ground_budget, rng)
    spec = SceneSpec(file="single.las", xn=0.0)
    base.extend(scene_points(x, y, z, spec, rng, object_budget))
    rng.shuffle(base)
    return tile_points(base, loop_tiles)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, help="Single local .las (legacy mode)")
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUT,
        help="Output JSON path",
    )
    parser.add_argument("--count", type=int, default=TARGET_POINTS)
    parser.add_argument("--tiles", type=int, default=LOOP_TILES)
    args = parser.parse_args()

    cache_dir = ROOT / "scripts" / ".cache"
    cache_dir.mkdir(parents=True, exist_ok=True)

    if args.input:
        x, y, z = read_las(args.input)
        points = to_cloud_points_single(x, y, z, args.count, args.tiles)
        source = str(args.input)
    else:
        scenes = [SceneSpec(**s) for s in DEFAULT_SCENES]
        points = build_multi_object_cloud(scenes, cache_dir, args.count, args.tiles)
        source = "Neara Pole1/3/6/8.las (ground_segmentation_exercise)"

    kinds = {}
    for p in points:
        kinds[p.get("kind", "ground")] = kinds.get(p.get("kind", "ground"), 0) + 1

    payload = {
        "source": source,
        "sourceUrl": "https://github.com/Neara-Software/ground_segmentation_exercise",
        "pointCount": len(points),
        "kinds": kinds,
        "points": points,
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, separators=(",", ":")))
    print(f"Wrote {len(points)} points → {args.output}")
    print("Kinds:", kinds)


if __name__ == "__main__":
    main()
