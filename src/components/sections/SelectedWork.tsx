import Link from "next/link";

import ActionLink from "@/components/ui/ActionLink";
import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredProjectSlug, selectedProjectSlugs } from "@/content/homepage";
import { taxonomyLabel } from "@/content/taxonomy";
import { getAllWork, getProject } from "@/lib/query";

function completeFirstSentence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^(.+?[.!?])(\s|$)/);
  return match ? match[1] : trimmed;
}

export default function SelectedWork() {
  const projects = selectedProjectSlugs
    .map((slug) => getProject(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const projectCount = getAllWork().length;

  return (
    <section
      id="selected-projects"
      aria-labelledby="selected-projects-heading"
      className="scroll-mt-20"
    >
      <div className="section-shell">
        <SectionHeading
          index="02"
          title="Projects"
          headingId="selected-projects-heading"
          kicker="Systems built · research applied"
        />

        <ul className="mt-4 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const image = project.images?.[0];
            const hook =
              project.cardHook?.trim() ||
              completeFirstSentence(project.summary);
            const featured = project.slug === featuredProjectSlug;

            return (
              <Reveal
                as="li"
                key={project.slug}
                delay={(index % 2) * 0.06}
                className={featured ? "lg:col-span-2" : undefined}
              >
                <article
                  className="flex h-full flex-col border border-grid-dim bg-bg-raised/20 transition-[border-color,box-shadow] duration-200 hover:border-cyan/70 hover:shadow-[0_0_32px_rgb(0_240_255_/_0.12)] focus-within:border-cyan/70 focus-within:shadow-[0_0_32px_rgb(0_240_255_/_0.12)]"
                >
                  {image && (
                    <RoboPhoto
                      src={image.src}
                      alt={image.alt}
                      caption={image.caption}
                      aspect="aspect-[16/10]"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="border-0 border-b border-grid-dim"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="label-mono text-text-dim">
                      {featured && (
                        <span className="mr-3 text-cyan">Flagship</span>
                      )}
                      {taxonomyLabel(project.facets.domains[0])}
                      {project.period.label && (
                        <span className="ml-3">{project.period.label}</span>
                      )}
                    </p>
                    <h3 className="mt-3 font-display text-lg uppercase text-text">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-text-dim">
                      {hook}
                    </p>
                    <p className="mt-auto pt-5">
                      <ActionLink href={`/projects/${project.slug}`}>
                        Explore project
                      </ActionLink>
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12">
          <div className="flex flex-col items-start gap-4 border-t border-grid-dim pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="label-mono text-text-dim">
                <span className="text-cyan">{projectCount}</span> systems on
                record
              </p>
              <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-text-dim">
                Field robots, sensing payloads, and research instruments beyond
                these three.
              </p>
            </div>
            <ActionLink href="/projects" className="shrink-0">
              Explore all projects
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
