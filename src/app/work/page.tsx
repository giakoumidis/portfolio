import { Suspense } from "react";
import type { Metadata } from "next";

import RouteChrome from "@/components/work/RouteChrome";
import WorkFilters from "@/components/work/WorkFilters";
import WorkGrid from "@/components/work/WorkGrid";
import {
  filterWork,
  getWorkFilterOptions,
  parseWorkSearchParams,
} from "@/lib/query";
import { siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: `Work Index — ${siteTitle}`,
  description:
    "Faceted index of projects and engagements — filter by domain, application, environment, platform, and method.",
  alternates: { canonical: "/work" },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WorkIndexPage({ searchParams }: PageProps) {
  const raw = await searchParams;
  const { filters, unknown, canonicalQuery } = parseWorkSearchParams(raw);
  const items = filterWork(filters);
  const options = getWorkFilterOptions();
  const unknownNotice = unknown.length > 0;

  return (
    <RouteChrome active="work">
      <div className="section-shell py-16 lg:py-24">
        <p className="label-mono text-cyan">
          01 <span className="text-text-dim">{"//"} Work Index</span>
        </p>
        <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
          Work
        </h1>
        <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
          Projects and engagements with explicit contribution, typed
          relationships to laboratories, and evidence-backed outcomes. Filters
          are shareable via the URL
          {canonicalQuery ? ` (?${canonicalQuery})` : ""}.
        </p>

        <div className="mt-10 border border-grid-dim bg-bg-raised/20 p-5 sm:p-6">
          <Suspense
            fallback={
              <p className="label-mono text-text-dim">Loading filters…</p>
            }
          >
            <WorkFilters
              options={options}
              initialFilters={filters}
              resultCount={items.length}
              unknownNotice={unknownNotice}
            />
          </Suspense>
        </div>

        <div className="mt-12">
          <WorkGrid items={items} />
        </div>
      </div>
    </RouteChrome>
  );
}
