import { Suspense } from "react";

import FilteredProjectCards from "@/components/sections/FilteredProjectCards";
import ProjectCards from "@/components/sections/ProjectCards";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="section-shell">
        <SectionHeading
          index="05"
          title="Projects"
          headingId="projects-heading"
          kicker="Selected Work"
        />

        <Suspense fallback={<ProjectCards items={projects} />}>
          <FilteredProjectCards
            items={projects}
            ariaLabel="Filter projects by domain"
          />
        </Suspense>
      </div>
    </section>
  );
}
