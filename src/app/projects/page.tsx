import type { Metadata } from "next";

import RouteChrome from "@/components/work/RouteChrome";
import WorkFilters from "@/components/work/WorkFilters";
import WorkGrid from "@/components/work/WorkGrid";
import {
  filterWork,
  getCuratedWork,
  getWorkFilterOptions,
  hasActiveWorkFilters,
  parseWorkSearchParams,
} from "@/lib/query";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects — Nikolaos Giakoumidis",
  description:
    "Robotics, sensing, and automation projects by Nikolaos Giakoumidis, with personal contributions, engineering decisions, and research outcomes.",
  path: "/projects",
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WorkIndexPage({ searchParams }: PageProps) {
  const raw = await searchParams;
  const { filters, unknown } = parseWorkSearchParams(raw);
  const filtered = hasActiveWorkFilters(filters);
  const items = filtered ? filterWork(filters) : getCuratedWork();
  const options = getWorkFilterOptions();
  const unknownNotice = unknown.length > 0;

  return (
    <RouteChrome active="projects">
      <div className="section-shell py-16 lg:py-24">
        <p className="label-mono text-cyan">
          01 <span className="text-text-dim">{"//"} Projects</span>
        </p>
        <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
          Projects
        </h1>
        <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
          Robotic systems, sensing platforms, and custom automation developed
          through research and industry collaboration. Each project explains
          the challenge, my contribution, and what the work demonstrated.
        </p>

        <div className="mt-10 border border-grid-dim bg-bg-raised/20 px-5 py-4 sm:px-6">
          <WorkFilters
            options={options}
            filters={filters}
            resultCount={items.length}
            unknownNotice={unknownNotice}
          />
        </div>

        <div className="mt-12">
          <WorkGrid items={items} />
        </div>
      </div>
    </RouteChrome>
  );
}
