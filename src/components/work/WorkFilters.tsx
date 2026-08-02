import Link from "next/link";

import type { FilterOption, WorkFilterParams } from "@/lib/query";
import {
  toggleWorkFilterHref,
  workIndexHref,
  type WorkFilterFacetKey,
} from "@/lib/query";

type WorkFiltersProps = {
  options: {
    domains: FilterOption[];
    applications: FilterOption[];
    environments: FilterOption[];
    platforms: FilterOption[];
    methods: FilterOption[];
    outcomes: FilterOption[];
    contributions: FilterOption[];
  };
  filters: WorkFilterParams;
  resultCount: number;
  unknownNotice?: boolean;
};

const FACET_META: Array<{
  key: WorkFilterFacetKey;
  label: string;
  primary?: boolean;
}> = [
  { key: "domains", label: "Domain", primary: true },
  { key: "applications", label: "Application", primary: true },
  { key: "contributions", label: "Contribution", primary: true },
  { key: "outcomes", label: "Outcome", primary: true },
  { key: "environments", label: "Laboratory" },
  { key: "platforms", label: "Platform" },
  { key: "methods", label: "Technology" },
];

const CHIP =
  "label-mono inline-block border px-3 py-1.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";
const CHIP_ON = "border-cyan/60 bg-cyan/10 text-cyan";
const CHIP_OFF =
  "border-grid-dim text-text-dim hover:border-grid hover:text-text";

export default function WorkFilters({
  options,
  filters,
  resultCount,
  unknownNotice,
}: WorkFiltersProps) {
  const active = {
    domains: filters.domains ?? [],
    applications: filters.applications ?? [],
    environments: filters.environments ?? [],
    platforms: filters.platforms ?? [],
    methods: filters.methods ?? [],
    outcomes: filters.outcomes ?? [],
    contributions: filters.contributions ?? [],
  };

  const activeChips: Array<{
    facet: WorkFilterFacetKey;
    slug: string;
    label: string;
  }> = [];
  for (const meta of FACET_META) {
    const opts = options[meta.key];
    for (const slug of active[meta.key]) {
      const label = opts.find((o) => o.slug === slug)?.label ?? slug;
      activeChips.push({ facet: meta.key, slug, label });
    }
  }

  const primaryFacets = FACET_META.filter((f) => f.primary);
  const moreFacets = FACET_META.filter((f) => !f.primary);

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
              <Link
                key={opt.slug}
                href={toggleWorkFilterHref(filters, meta.key, opt.slug)}
                aria-current={on ? "true" : undefined}
                className={`${CHIP} ${on ? CHIP_ON : CHIP_OFF}`}
              >
                {opt.label}
              </Link>
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
          <Link href={workIndexHref()} className={`${CHIP} ${CHIP_OFF}`}>
            Clear all
          </Link>
        )}
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Active filters">
          {activeChips.map((chip) => (
            <Link
              key={`${chip.facet}-${chip.slug}`}
              href={toggleWorkFilterHref(filters, chip.facet, chip.slug)}
              className={`${CHIP} ${CHIP_ON}`}
              aria-label={`Remove filter ${chip.label}`}
            >
              {chip.label}
              <span aria-hidden className="ml-2">
                ×
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {primaryFacets.map(renderFacet)}
      </div>

      <details className="group">
        <summary
          className={`${CHIP} ${CHIP_OFF} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
        >
          More filters
          <span aria-hidden className="ml-2 group-open:hidden">
            ▾
          </span>
          <span aria-hidden className="ml-2 hidden group-open:inline">
            ▴
          </span>
        </summary>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          {moreFacets.map(renderFacet)}
        </div>
      </details>
    </div>
  );
}
