import { Suspense } from "react";

import FilteredProjectCards from "@/components/sections/FilteredProjectCards";
import ProjectCards from "@/components/sections/ProjectCards";
import SectionHeading from "@/components/ui/SectionHeading";
import { laboratories } from "@/content/laboratories";

export default function Laboratories() {
  return (
    <section id="laboratories" aria-labelledby="laboratories-heading">
      <div className="section-shell">
        <SectionHeading
          index="04"
          title="Laboratories"
          headingId="laboratories-heading"
          kicker="Built & Operated"
        />

        <Suspense
          fallback={
            <ProjectCards
              items={laboratories}
              recordBasePath="/laboratories"
            />
          }
        >
          <FilteredProjectCards
            items={laboratories}
            ariaLabel="Filter laboratories by domain"
            recordBasePath="/laboratories"
          />
        </Suspense>
      </div>
    </section>
  );
}
