"use client";

import { useEffect, useState } from "react";

import { sections } from "@/lib/sections";

/**
 * Homepage-only left section rail. Tracks the six current homepage blocks.
 * Mobile navigation stays on SiteHeader — this rail is desktop-only so the
 * sticky global header is not duplicated.
 */
export default function HudRail() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }

        const next = sections.find((section) => intersecting.has(section.id));
        if (next) setActiveId(next.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-start gap-2.5 lg:flex xl:left-6"
    >
      {sections.map((section) => {
        const active = section.id === activeId;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={`label-mono w-6 text-left transition-all duration-200 ${
                active
                  ? "glow-cyan opacity-100"
                  : "text-text-dim opacity-35 group-hover:text-text group-hover:opacity-80"
              }`}
            >
              {section.index}
            </span>
            <span className="flex w-8 items-center justify-start">
              <span
                className={`block transition-all duration-200 ${
                  active
                    ? "h-0.5 w-8 bg-cyan shadow-[0_0_10px_rgba(0,240,255,0.85)]"
                    : "h-px w-4 bg-grid opacity-40 group-hover:w-6 group-hover:opacity-80"
                }`}
              />
            </span>
            <span
              className={`label-mono w-28 text-left transition-all duration-200 ${
                active
                  ? "text-cyan opacity-100"
                  : "text-text-dim opacity-35 group-hover:text-text group-hover:opacity-80"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
