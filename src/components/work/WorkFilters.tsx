"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import type { FilterOption, WorkFilterParams } from "@/lib/query";
import { buildCanonicalQuery } from "@/lib/query";

type WorkFiltersProps = {
  options: {
    domains: FilterOption[];
    applications: FilterOption[];
    environments: FilterOption[];
    platforms: FilterOption[];
    methods: FilterOption[];
    outcomes: FilterOption[];
  };
  initialFilters: WorkFilterParams;
  resultCount: number;
  unknownNotice?: boolean;
};

type FacetKey =
  | "domains"
  | "applications"
  | "environments"
  | "platforms"
  | "methods"
  | "outcomes";

const FACET_META: Array<{
  key: FacetKey;
  param: string;
  label: string;
  more?: boolean;
}> = [
  { key: "domains", param: "domain", label: "Domain" },
  { key: "applications", param: "application", label: "Application" },
  { key: "environments", param: "environment", label: "Laboratory" },
  { key: "platforms", param: "platform", label: "Platform" },
  { key: "methods", param: "method", label: "Technology", more: true },
  { key: "outcomes", param: "outcome", label: "Outcome", more: true },
];

const CHIP =
  "label-mono cursor-pointer border px-3 py-1.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";
const CHIP_ON = "border-cyan/60 bg-cyan/10 text-cyan";
const CHIP_OFF = "border-grid-dim text-text-dim hover:border-grid hover:text-text";

export default function WorkFilters({
  options,
  initialFilters,
  resultCount,
  unknownNotice,
}: WorkFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [moreOpen, setMoreOpen] = useState(false);

  const active = useMemo(() => {
    const read = (key: string) =>
      searchParams.getAll(key).length > 0
        ? searchParams.getAll(key)
        : ((initialFilters as Record<string, string[] | undefined>)[
            key === "domain"
              ? "domains"
              : key === "application"
                ? "applications"
                : key === "environment"
                  ? "environments"
                  : key === "platform"
                    ? "platforms"
                    : key === "method"
                      ? "methods"
                      : key === "outcome"
                        ? "outcomes"
                        : key
          ] ?? []);
    return {
      domains: read("domain"),
      applications: read("application"),
      environments: read("environment"),
      platforms: read("platform"),
      methods: read("method"),
      outcomes: read("outcome"),
    } satisfies Record<FacetKey, string[]>;
  }, [searchParams, initialFilters]);

  function pushFilters(next: WorkFilterParams) {
    const qs = buildCanonicalQuery(next);
    router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
  }

  function toggle(facet: FacetKey, slug: string) {
    const current = new Set(active[facet]);
    if (current.has(slug)) current.delete(slug);
    else current.add(slug);
    pushFilters({
      domains: facet === "domains" ? [...current].sort() : active.domains,
      applications:
        facet === "applications" ? [...current].sort() : active.applications,
      environments:
        facet === "environments" ? [...current].sort() : active.environments,
      platforms: facet === "platforms" ? [...current].sort() : active.platforms,
      methods: facet === "methods" ? [...current].sort() : active.methods,
      outcomes: facet === "outcomes" ? [...current].sort() : active.outcomes,
    });
  }

  function clearAll() {
    pushFilters({});
  }

  function removeChip(facet: FacetKey, slug: string) {
    toggle(facet, slug);
  }

  const activeChips: Array<{ facet: FacetKey; slug: string; label: string }> =
    [];
  for (const meta of FACET_META) {
    const opts = options[meta.key];
    for (const slug of active[meta.key]) {
      const label = opts.find((o) => o.slug === slug)?.label ?? slug;
      activeChips.push({ facet: meta.key, slug, label });
    }
  }

  const primaryFacets = FACET_META.filter((f) => !f.more);
  const moreFacets = FACET_META.filter((f) => f.more);

  function renderFacet(meta: (typeof FACET_META)[number]) {
    const opts = options[meta.key];
    if (opts.length === 0) return null;
    return (
      <div key={meta.key} className="flex flex-col gap-2">
        <p className="label-mono text-text-dim">{meta.label}</p>
        <div
          role="group"
          aria-label={`Filter by ${meta.label}`}
          className="flex flex-wrap gap-2"
        >
          {opts.map((opt) => {
            const on = active[meta.key].includes(opt.slug);
            return (
              <button
                key={opt.slug}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(meta.key, opt.slug)}
                className={`${CHIP} ${on ? CHIP_ON : CHIP_OFF}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {unknownNotice && (
        <p className="label-mono text-amber" role="status">
          One or more filters could not be recognized and were removed.
        </p>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="label-mono text-text-dim" aria-live="polite" aria-atomic>
          <span className="text-cyan">{resultCount}</span>{" "}
          {resultCount === 1 ? "result" : "results"}
        </p>
        {activeChips.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className={`${CHIP} ${CHIP_OFF}`}
          >
            Clear all
          </button>
        )}
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Active filters">
          {activeChips.map((chip) => (
            <button
              key={`${chip.facet}-${chip.slug}`}
              type="button"
              onClick={() => removeChip(chip.facet, chip.slug)}
              className={`${CHIP} ${CHIP_ON}`}
              aria-label={`Remove filter ${chip.label}`}
            >
              {chip.label}
              <span aria-hidden className="ml-2">
                ×
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {primaryFacets.map(renderFacet)}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className={`${CHIP} ${CHIP_OFF}`}
          aria-expanded={moreOpen}
        >
          More {moreOpen ? "▴" : "▾"}
        </button>
        {moreOpen && (
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            {moreFacets.map(renderFacet)}
          </div>
        )}
      </div>
    </div>
  );
}
