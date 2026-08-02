"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  isMapPathId,
  mapCenter,
  mapHubEntities,
  mapHubs,
  mapPathHubs,
  mapPaths,
  type MapHubId,
  type MapPathId,
} from "@/content/map";
import {
  bezierChain,
  bezierPath,
  edgeKey,
  facingSide,
  type MapPoint,
  type MapSide,
} from "@/lib/map-edges";

type PortfolioMapProps = {
  /** Compact homepage embed vs full /map page. */
  variant?: "teaser" | "full";
  /** Optional initial path (e.g. from /map?path=industry). */
  initialPathId?: MapPathId | null;
};

const HUB_POSITIONS: Record<MapHubId, MapPoint> = {
  career: { x: 50, y: 12 },
  laboratories: { x: 14, y: 42 },
  projects: { x: 86, y: 42 },
  research: { x: 28, y: 78 },
  archive: { x: 72, y: 78 },
};

const CENTER_POSITION: MapPoint = { x: 50, y: 38 };
const HUB_PORT = 6.2;
const CENTER_PORT = 6.8;

type DomainEdge = {
  key: string;
  a: MapHubId;
  b: MapHubId;
  d: string;
};

function CornerTicks({ active }: { active: boolean }) {
  const tone = active ? "border-cyan" : "border-grid";
  return (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t ${tone}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t ${tone}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l ${tone}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r ${tone}`}
      />
    </>
  );
}

function PortDot({ side, lit }: { side: MapSide; lit: boolean }) {
  const pos =
    side === "top"
      ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
      : side === "bottom"
        ? "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
        : side === "left"
          ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
          : "right-0 top-1/2 translate-x-1/2 -translate-y-1/2";

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full border transition-colors duration-200 ${pos} ${
        lit
          ? "border-cyan bg-cyan shadow-[0_0_6px_rgba(0,240,255,0.85)]"
          : "border-grid bg-bg-raised"
      }`}
    />
  );
}

export default function PortfolioMap({
  variant = "full",
  initialPathId = null,
}: PortfolioMapProps) {
  const reduced = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<MapHubId | null>(null);
  const [selected, setSelected] = useState<MapHubId | null>(null);
  const [localPathId, setLocalPathId] = useState<MapPathId | null>(
    initialPathId,
  );

  const pathFromUrl = (() => {
    const raw = searchParams.get("path");
    return isMapPathId(raw) ? raw : null;
  })();
  /** On /map the URL is canonical; elsewhere local path selection drives the UI. */
  const pathId = pathname === "/map" ? pathFromUrl ?? localPathId : localPathId;

  function selectPath(next: MapPathId | null) {
    setLocalPathId(next);
    if (pathname === "/map") {
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set("path", next);
      else params.delete("path");
      const qs = params.toString();
      router.replace(qs ? `/map?${qs}` : "/map", { scroll: false });
    }
  }

  const highlight = selected ?? active;
  const connected = useMemo(() => {
    if (!highlight) return new Set<MapHubId>();
    const hub = mapHubs.find((item) => item.id === highlight);
    return new Set(hub?.connected ?? []);
  }, [highlight]);

  const pathHubSet = useMemo(() => {
    if (!pathId) return new Set<MapHubId>();
    return new Set(mapPathHubs[pathId]);
  }, [pathId]);

  const pathEdgeKeys = useMemo(() => {
    if (!pathId) return new Set<string>();
    const hubs = mapPathHubs[pathId];
    const keys = new Set<string>();
    for (let i = 0; i < hubs.length - 1; i++) {
      keys.add(edgeKey(hubs[i], hubs[i + 1]));
    }
    return keys;
  }, [pathId]);

  const domainEdges = useMemo((): DomainEdge[] => {
    const edges: DomainEdge[] = [];
    for (const hub of mapHubs) {
      for (const targetId of hub.connected) {
        if (hub.id > targetId) continue;
        const from = HUB_POSITIONS[hub.id];
        const to = HUB_POSITIONS[targetId];
        const sourceSide = facingSide(from, to);
        const targetSide = facingSide(to, from);
        const d = bezierPath(from, to, {
          sourceSide,
          targetSide,
          sourcePortOffset: HUB_PORT,
          targetPortOffset: HUB_PORT,
        });
        edges.push({
          key: edgeKey(hub.id, targetId),
          a: hub.id,
          b: targetId,
          d,
        });
      }
    }
    return edges;
  }, []);

  const spokePaths = useMemo(() => {
    return mapHubs.map((hub) => {
      const to = HUB_POSITIONS[hub.id];
      const sourceSide = facingSide(CENTER_POSITION, to);
      const targetSide = facingSide(to, CENTER_POSITION);
      return {
        id: hub.id,
        d: bezierPath(CENTER_POSITION, to, {
          sourceSide,
          targetSide,
          sourcePortOffset: CENTER_PORT,
          targetPortOffset: HUB_PORT,
          curvature: 0.22,
        }),
      };
    });
  }, []);

  const pathPulseD = useMemo(() => {
    if (!pathId) return "";
    const points = mapPathHubs[pathId].map((id) => HUB_POSITIONS[id]);
    return bezierChain(points, { curvature: 0.3 });
  }, [pathId]);

  const hubPortSides = useMemo(() => {
    const map = new Map<MapHubId, Set<MapSide>>();
    for (const hub of mapHubs) {
      map.set(hub.id, new Set());
    }
    for (const hub of mapHubs) {
      for (const targetId of hub.connected) {
        if (hub.id > targetId) continue;
        const from = HUB_POSITIONS[hub.id];
        const to = HUB_POSITIONS[targetId];
        map.get(hub.id)?.add(facingSide(from, to));
        map.get(targetId)?.add(facingSide(to, from));
      }
      map.get(hub.id)?.add(facingSide(HUB_POSITIONS[hub.id], CENTER_POSITION));
    }
    return map;
  }, []);

  const panelHub = selected;
  const panelEntities = panelHub ? mapHubEntities[panelHub] : [];
  const activePath = mapPaths.find((path) => path.id === pathId);
  const isTeaser = variant === "teaser";

  function onHubActivate(id: MapHubId) {
    if (selected === id) {
      const hub = mapHubs.find((item) => item.id === id);
      if (hub) window.location.assign(hub.href);
      return;
    }
    setSelected(id);
  }

  function edgeLit(a: MapHubId, b: MapHubId): boolean {
    if (pathEdgeKeys.has(edgeKey(a, b))) return true;
    if (!highlight) return true;
    return (
      a === highlight || b === highlight || (connected.has(a) && connected.has(b))
    );
  }

  function edgeRelated(a: MapHubId, b: MapHubId): boolean {
    if (!highlight && !pathId) return true;
    if (pathEdgeKeys.has(edgeKey(a, b))) return true;
    if (!highlight) return pathHubSet.has(a) || pathHubSet.has(b);
    return (
      a === highlight ||
      b === highlight ||
      connected.has(a) ||
      connected.has(b)
    );
  }

  const pathControls = (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Audience paths">
      {mapPaths.map((path) => {
        const on = pathId === path.id;
        return (
          <button
            key={path.id}
            type="button"
            onClick={() => selectPath(on ? null : path.id)}
            className={`label-mono border px-3 py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
              on
                ? "border-cyan text-cyan"
                : "border-grid-dim text-text-dim hover:border-cyan/40 hover:text-text"
            }`}
            aria-pressed={on}
          >
            Path · {path.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-5">
      {pathControls}

      {activePath && (
        <div
          className="border border-grid-dim bg-bg-raised/30 p-4"
          aria-live="polite"
        >
          <p className="label-mono text-cyan">
            Visitor path · {activePath.label}
          </p>
          <p className="mt-2 font-body text-sm text-text-dim">
            {activePath.summary}
          </p>
          <ol className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            {activePath.steps.map((step, index) => (
              <li key={step.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden className="hidden text-text-dim sm:inline">
                    →
                  </span>
                )}
                <Link
                  href={step.href}
                  className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  {step.label}
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-4 border-t border-grid-dim pt-4">
            <p className="label-mono text-text-dim">Recommended evidence</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {activePath.recommendations.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="label-mono border border-grid-dim px-2 py-1 text-text-dim transition-colors hover:border-cyan/50 hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                  >
                    <span className="text-cyan/70">{item.kind}</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Desktop graph — always-visible spokes/cables communicate meaning before interaction */}
      <div
        className={`relative hidden w-full overflow-hidden border border-grid-dim bg-bg-raised/20 md:block ${
          isTeaser
            ? "aspect-[16/9] max-h-[min(70vh,36rem)]"
            : "aspect-[16/10]"
        }`}
        aria-hidden
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgb(5_4_15/0.75)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(46 40 96 / 0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(46 40 96 / 0.35) 1px, transparent 1px)
            `,
            backgroundSize: "8% 10%",
          }}
        />

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="map-edge-glow"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="0.55" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker
              id="map-signal-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="3.2"
              markerHeight="3.2"
              orient="auto-start-reverse"
            >
              <path d="M0,1.5 L8,5 L0,8.5 Z" fill="rgb(0 240 255 / 0.85)" />
            </marker>
            <marker
              id="map-signal-arrow-dim"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="2.6"
              markerHeight="2.6"
              orient="auto-start-reverse"
            >
              <path d="M0,1.5 L8,5 L0,8.5 Z" fill="rgb(46 40 96 / 0.9)" />
            </marker>
          </defs>

          {spokePaths.map((spoke) => {
            const lit =
              Boolean(
                highlight && (spoke.id === highlight || connected.has(spoke.id)),
              ) || pathHubSet.has(spoke.id);
            const dimmed =
              Boolean(highlight) &&
              spoke.id !== highlight &&
              !connected.has(spoke.id) &&
              !pathHubSet.has(spoke.id);
            return (
              <path
                key={`spoke-${spoke.id}`}
                d={spoke.d}
                fill="none"
                stroke={
                  lit
                    ? "rgb(255 43 214 / 0.55)"
                    : dimmed
                      ? "rgb(28 22 64 / 0.45)"
                      : "rgb(46 40 96 / 0.7)"
                }
                strokeWidth={lit ? 0.28 : 0.18}
                strokeDasharray="1.2 1.1"
                strokeLinecap="round"
              />
            );
          })}

          {domainEdges.map((edge) => {
            const lit = edgeLit(edge.a, edge.b);
            const related = edgeRelated(edge.a, edge.b);
            const onPath = pathEdgeKeys.has(edge.key);
            return (
              <g key={edge.key}>
                <path
                  d={edge.d}
                  fill="none"
                  stroke={
                    lit
                      ? "rgb(0 240 255 / 0.22)"
                      : related
                        ? "rgb(28 22 64 / 0.9)"
                        : "rgb(28 22 64 / 0.35)"
                  }
                  strokeWidth={lit ? 1.1 : 0.55}
                  strokeLinecap="round"
                  filter={lit ? "url(#map-edge-glow)" : undefined}
                />
                <path
                  d={edge.d}
                  fill="none"
                  className={!reduced && !lit ? "map-edge-drift" : undefined}
                  stroke={
                    lit
                      ? "rgb(0 240 255 / 0.85)"
                      : related
                        ? "rgb(46 40 96 / 0.95)"
                        : "rgb(28 22 64 / 0.45)"
                  }
                  strokeWidth={lit ? 0.42 : 0.22}
                  strokeLinecap="round"
                  strokeDasharray={lit ? undefined : "1.6 1.4"}
                  markerEnd={
                    lit
                      ? "url(#map-signal-arrow)"
                      : related
                        ? "url(#map-signal-arrow-dim)"
                        : undefined
                  }
                />
                {!reduced && lit && (
                  <>
                    <circle r="0.55" fill="rgb(0 240 255)">
                      <animateMotion
                        dur={onPath ? "2.4s" : "3.2s"}
                        repeatCount="indefinite"
                        path={edge.d}
                      />
                    </circle>
                    <circle r="0.35" fill="rgb(255 43 214 / 0.9)">
                      <animateMotion
                        dur={onPath ? "2.4s" : "3.2s"}
                        begin="1.1s"
                        repeatCount="indefinite"
                        path={edge.d}
                      />
                    </circle>
                  </>
                )}
              </g>
            );
          })}

          {pathPulseD && !reduced && (
            <g>
              <path
                d={pathPulseD}
                fill="none"
                stroke="rgb(0 240 255 / 0.35)"
                strokeWidth="0.7"
                strokeLinecap="round"
                filter="url(#map-edge-glow)"
              />
              <circle r="0.9" fill="rgb(0 240 255)" filter="url(#map-edge-glow)">
                <animateMotion
                  dur="4.5s"
                  repeatCount="indefinite"
                  path={pathPulseD}
                />
              </circle>
            </g>
          )}
          {pathPulseD && reduced && (
            <path
              d={pathPulseD}
              fill="none"
              stroke="rgb(0 240 255 / 0.55)"
              strokeWidth="0.55"
              strokeLinecap="round"
            />
          )}
        </svg>

        <Link
          href={mapCenter.href}
          className="absolute left-1/2 top-[38%] z-10 flex min-w-[10rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center border border-cyan/60 bg-bg/95 px-3 py-3 text-center transition-colors panel-glow-cyan hover:border-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <CornerTicks active />
          <span className="label-mono glow-cyan whitespace-nowrap tracking-[0.16em] text-cyan">
            {mapCenter.label}
          </span>
          <span className="mt-1 text-[0.65rem] leading-snug text-text-dim">
            {mapCenter.signal}
          </span>
          {(["top", "right", "bottom", "left"] as MapSide[]).map((side) => (
            <PortDot key={side} side={side} lit />
          ))}
        </Link>

        {mapHubs.map((hub) => {
          const pos = HUB_POSITIONS[hub.id];
          const isActive = highlight === hub.id || pathHubSet.has(hub.id);
          const isConnected = connected.has(hub.id);
          const dimmed =
            (highlight && !isActive && !isConnected && !pathHubSet.has(hub.id)) ||
            (pathId && !pathHubSet.has(hub.id) && !highlight);
          const sides = hubPortSides.get(hub.id) ?? new Set<MapSide>();

          return (
            <button
              key={hub.id}
              type="button"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={`absolute z-10 min-w-[10.5rem] max-w-[12rem] -translate-x-1/2 -translate-y-1/2 border px-3 py-2 text-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                isActive
                  ? "border-cyan bg-cyan/10 text-cyan panel-glow-cyan"
                  : isConnected
                    ? "border-magenta/50 bg-bg/90 text-text panel-glow-magenta"
                    : dimmed
                      ? "border-grid-dim/50 bg-bg/70 text-text-dim/50"
                      : "border-grid-dim bg-bg/90 text-text-dim hover:border-cyan/40 hover:text-text"
              }`}
              onMouseEnter={() => setActive(hub.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(hub.id)}
              onBlur={() => setActive(null)}
              onClick={() => onHubActivate(hub.id)}
              aria-pressed={selected === hub.id}
            >
              <CornerTicks active={isActive || selected === hub.id} />
              <span
                className={`label-mono whitespace-nowrap tracking-[0.14em] ${
                  isActive ? "glow-cyan" : ""
                }`}
              >
                {hub.label}
              </span>
              <span className="mt-1 block text-[0.58rem] leading-snug text-text-dim">
                {hub.signal}
              </span>
              {[...sides].map((side) => (
                <PortDot
                  key={side}
                  side={side}
                  lit={isActive || isConnected}
                />
              ))}
            </button>
          );
        })}
      </div>

      {/* Simplified mobile — center + grouped hub cards, not a compressed graph */}
      <div className="space-y-4 md:hidden">
        <Link
          href={mapCenter.href}
          className="block border border-cyan/50 bg-bg-raised/40 p-4 text-center panel-glow-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <span className="label-mono text-cyan">{mapCenter.label}</span>
          <span className="mt-1 block font-body text-sm text-text-dim">
            {mapCenter.blurb}
          </span>
          <span className="label-mono mt-2 block text-[0.65rem] text-text-dim">
            {mapCenter.signal}
          </span>
        </Link>

        <ul className="grid gap-3">
          {mapHubs.map((hub, index) => {
            const onPath = pathHubSet.has(hub.id);
            return (
              <li key={hub.id}>
                <div
                  className={`border p-4 ${
                    onPath
                      ? "border-cyan/50 bg-cyan/5"
                      : "border-grid-dim bg-bg-raised/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={hub.href}
                        className="label-mono text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                      >
                        {hub.label}
                      </Link>
                      <p className="label-mono mt-1 text-[0.65rem] text-text-dim">
                        {hub.signal}
                      </p>
                    </div>
                    <span className="label-mono text-text-dim/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm text-text-dim">
                    {hub.blurb}
                  </p>
                  <p className="label-mono mt-3 text-[0.6rem] text-text-dim/70">
                    ↔{" "}
                    {hub.connected
                      .map((id) => mapHubs.find((h) => h.id === id)?.label ?? id)
                      .join(" · ")}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {panelHub && (
        <aside
          className="hidden border border-grid-dim bg-bg-raised/30 p-5 md:block"
          aria-live="polite"
        >
          <p className="label-mono text-cyan">
            {mapHubs.find((h) => h.id === panelHub)?.label}
          </p>
          <p className="label-mono mt-1 text-[0.65rem] text-text-dim">
            {mapHubs.find((h) => h.id === panelHub)?.signal}
          </p>
          <p className="mt-2 font-body text-sm text-text-dim">
            {mapHubs.find((h) => h.id === panelHub)?.blurb}
          </p>
          <ul className="mt-4 space-y-2">
            {panelEntities.map((entity) => (
              <li key={entity.href}>
                <Link
                  href={entity.href}
                  className="label-mono text-text-dim transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  {entity.label} →
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link
              href={mapHubs.find((h) => h.id === panelHub)?.href ?? "/"}
              className="label-mono text-cyan"
            >
              Open hub →
            </Link>
          </p>
        </aside>
      )}

      {isTeaser && (
        <p>
          <Link
            href={pathId ? `/map?path=${pathId}` : "/map"}
            className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            Open full map →
          </Link>
        </p>
      )}
    </div>
  );
}
