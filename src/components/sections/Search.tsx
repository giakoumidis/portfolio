"use client";

import HudCard from "@/components/ui/HudCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SearchPanel from "@/components/nav/SearchPanel";

export default function Search() {
  return (
    <section id="search" aria-labelledby="search-heading">
      <div className="section-shell">
        <SectionHeading
          index="12"
          title="Search"
          headingId="search-heading"
          kicker="Find anything"
        />

        <Reveal>
          <HudCard accent="cyan" className="overflow-hidden p-0">
            <SearchPanel />
          </HudCard>
        </Reveal>
      </div>
    </section>
  );
}
