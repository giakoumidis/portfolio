import Link from "next/link";

import { mapCenter, mapHubs, mapPaths } from "@/content/map";

/** Server-rendered map alternative — same relationships without JavaScript. */
export default function MapFallback() {
  return (
    <nav
      aria-label="Portfolio map"
      className="border border-grid-dim bg-bg-raised/20 p-5 sm:p-6"
    >
      <p className="label-mono text-cyan">Integrated professional system</p>
      <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
        <Link
          href={mapCenter.href}
          className="text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          {mapCenter.label}
        </Link>{" "}
        is the central entity. Projects, laboratories, research, profile
        periods, recognition, and archive evidence form one connected body of
        work.
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mapHubs.map((hub) => (
          <li key={hub.id} className="border border-grid-dim bg-bg/40 p-4">
            <Link
              href={hub.href}
              className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {hub.label}
            </Link>
            <p className="label-mono mt-2 text-[0.65rem] text-text-dim">
              {hub.signal}
            </p>
            <p className="mt-2 font-body text-sm text-text-dim">{hub.blurb}</p>
            <p className="label-mono mt-3 text-[0.65rem] text-text-dim/80">
              Connected ·{" "}
              {hub.connected
                .map((id) => mapHubs.find((h) => h.id === id)?.label ?? id)
                .join(" · ")}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-4">
        <p className="label-mono text-text-dim">Audience paths</p>
        {mapPaths.map((path) => (
          <div key={path.id} className="border border-grid-dim/80 p-4">
            <p className="label-mono text-cyan">
              <Link
                href={`/map?path=${path.id}`}
                className="transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                {path.label}
              </Link>
            </p>
            <p className="mt-2 font-body text-sm text-text-dim">{path.summary}</p>
            <ol className="mt-3 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
              {path.steps.map((step, index) => (
                <li key={step.href} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden className="hidden text-text-dim sm:inline">
                      →
                    </span>
                  )}
                  <Link
                    href={step.href}
                    className="label-mono text-text-dim transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                  >
                    {step.label}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </nav>
  );
}
