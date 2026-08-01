/** Pure SVG path helpers for the portfolio signal map (n8n-style cubic Beziers). */

export type MapPoint = { x: number; y: number };

export type MapSide = "top" | "right" | "bottom" | "left";

/** Which side of `from` faces `toward` (dominant axis). */
export function facingSide(from: MapPoint, toward: MapPoint): MapSide {
  const dx = toward.x - from.x;
  const dy = toward.y - from.y;
  if (Math.abs(dx) > Math.abs(dy)) return dx >= 0 ? "right" : "left";
  return dy >= 0 ? "bottom" : "top";
}

/** Point on the node perimeter along a side. */
export function portPoint(
  center: MapPoint,
  side: MapSide,
  offset: number,
): MapPoint {
  switch (side) {
    case "top":
      return { x: center.x, y: center.y - offset };
    case "bottom":
      return { x: center.x, y: center.y + offset };
    case "left":
      return { x: center.x - offset, y: center.y };
    case "right":
      return { x: center.x + offset, y: center.y };
  }
}

function controlOffset(distance: number, curvature: number): number {
  return Math.max(Math.abs(distance) * curvature, 6);
}

function controlFromSide(
  point: MapPoint,
  side: MapSide,
  distance: number,
  curvature: number,
): MapPoint {
  const offset = controlOffset(distance, curvature);
  switch (side) {
    case "left":
      return { x: point.x - offset, y: point.y };
    case "right":
      return { x: point.x + offset, y: point.y };
    case "top":
      return { x: point.x, y: point.y - offset };
    case "bottom":
      return { x: point.x, y: point.y + offset };
  }
}

export type BezierPathOptions = {
  /** 0–1 style curvature; default matches React Flow / n8n feel. */
  curvature?: number;
  sourceSide?: MapSide;
  targetSide?: MapSide;
  /** Pull endpoints off node centers toward the perimeter. */
  sourcePortOffset?: number;
  targetPortOffset?: number;
};

/**
 * Cubic Bezier cable between two points (n8n / Vue Flow style).
 * Returns the SVG `d` attribute string.
 */
export function bezierPath(
  source: MapPoint,
  target: MapPoint,
  options: BezierPathOptions = {},
): string {
  const {
    curvature = 0.28,
    sourcePortOffset = 0,
    targetPortOffset = 0,
  } = options;

  const sourceSide = options.sourceSide ?? facingSide(source, target);
  const targetSide = options.targetSide ?? facingSide(target, source);

  const start =
    sourcePortOffset > 0
      ? portPoint(source, sourceSide, sourcePortOffset)
      : source;
  const end =
    targetPortOffset > 0
      ? portPoint(target, targetSide, targetPortOffset)
      : target;

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.hypot(dx, dy);

  const c1 = controlFromSide(start, sourceSide, distance, curvature);
  const c2 = controlFromSide(end, targetSide, distance, curvature);

  return `M${start.x},${start.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`;
}

/** Concatenate Bezier segments through an ordered list of points (path pulse). */
export function bezierChain(
  points: MapPoint[],
  options: Omit<
    BezierPathOptions,
    "sourcePortOffset" | "targetPortOffset"
  > = {},
): string {
  if (points.length < 2) return "";
  let d = "";
  for (let i = 0; i < points.length - 1; i++) {
    const segment = bezierPath(points[i], points[i + 1], {
      ...options,
      sourcePortOffset: 0,
      targetPortOffset: 0,
    });
    if (i === 0) {
      d = segment;
      continue;
    }
    const curve = segment.match(/C.+$/)?.[0];
    if (curve) d += ` ${curve}`;
  }
  return d;
}

export function edgeKey(a: string, b: string): string {
  return a < b ? `${a}__${b}` : `${b}__${a}`;
}
