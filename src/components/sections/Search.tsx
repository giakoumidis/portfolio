"use client";

import HudCard from "@/components/ui/HudCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SearchPanel from "@/components/nav/SearchPanel";
import { searchIndex, searchIndexStats } from "@/lib/search";

export default function Search() {
  const nodeCount = searchIndex.length;
  const facetCount = searchIndexStats.length;

  return (
    <section id="search" aria-labelledby="search-heading">
      <div className="section-shell">
        <SectionHeading
          index="12"
          title="Search"
          headingId="search-heading"
          kicker="Find anything"
        />

        <Reveal className="mb-8 max-w-2xl">
          <p className="font-body text-base leading-relaxed text-text-dim">
            Query the live portfolio index — projects, laboratories, research,
            roles, stack, and contact — or open the same panel anywhere with{" "}
            <kbd className="label-mono text-cyan">⌘K</kbd> /{" "}
            <kbd className="label-mono text-cyan">/</kbd>.
          </p>
          <p className="label-mono mt-3 text-text-dim">
            <span className="text-cyan">{nodeCount}</span> nodes
            <span className="mx-2 text-grid">·</span>
            <span className="text-cyan">{facetCount}</span> facets
          </p>
        </Reveal>

        <Reveal>
          <HudCard accent="cyan" className="overflow-hidden p-0">
            <SearchPanel />
          </HudCard>
        </Reveal>
      </div>
    </section>
  );
}
