import { Suspense } from "react";

import FilteredProjectCards from "@/components/sections/FilteredProjectCards";
import ProjectCards from "@/components/sections/ProjectCards";
import SectionHeading from "@/components/ui/SectionHeading";
import { labs } from "@/content/labs";

export default function Labs() {
  return (
    <section id="labs" aria-labelledby="labs-heading">
      <div className="section-shell">
        <SectionHeading
          index="04"
          title="Labs"
          headingId="labs-heading"
          kicker="Built & Operated"
        />

        <Suspense
          fallback={
            <ProjectCards items={labs} recordBasePath="/infrastructure" />
          }
        >
          <FilteredProjectCards
            items={labs}
            ariaLabel="Filter labs by domain"
            recordBasePath="/infrastructure"
          />
        </Suspense>
      </div>
    </section>
  );
}
