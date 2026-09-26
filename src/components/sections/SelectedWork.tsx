import Link from "next/link";

import HudCard from "@/components/ui/HudCard";
import NeonButton from "@/components/ui/NeonButton";
import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import TaxonomyChip from "@/components/work/TaxonomyChip";
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
          title="Selected Projects"
          headingId="selected-projects-heading"
          kicker="Systems built · research applied"
        />

        <ul className="mt-4 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const image = project.images?.[0];
            const hook =
              project.cardHook?.trim() ||
              completeFirstSentence(project.summary);
            const facetChips = [
              ...(project.facets.domains ?? []).slice(0, 1).map((slug) => ({
                slug,
                label: taxonomyLabel(slug),
                href: `/projects?domain=${slug}`,
                prefix: "DOMAIN",
              })),
              ...(project.facets.applications ?? []).slice(0, 1).map((slug) => ({
                slug,
                label: taxonomyLabel(slug),
                href: `/projects?application=${slug}`,
                prefix: "APP",
              })),
              ...(project.facets.outcomes ?? []).slice(0, 2).map((slug) => ({
                slug,
                label: taxonomyLabel(slug),
                href: `/projects?outcome=${slug}`,
                prefix: "OUTCOME",
              })),
            ].slice(0, 4);

            const featured = project.slug === featuredProjectSlug;

            return (
              <Reveal
                as="li"
                key={project.slug}
                delay={(index % 2) * 0.06}
                className={featured ? "lg:col-span-2" : undefined}
              >
                <article
                  className={`flex h-full flex-col bg-bg-raised/20 ${
                    featured
                      ? "border border-cyan/70 shadow-[0_0_32px_rgb(0_240_255_/_0.12)]"
                      : "border border-grid-dim"
                  }`}
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
                    <p className="mt-4 font-body text-sm text-text">
                      <span className="label-mono text-cyan">
                        My contribution ·{" "}
                      </span>
                      {project.contributionSummary.trim()}
                    </p>
                    {facetChips.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {facetChips.map((chip) => (
                          <li key={`${chip.prefix}-${chip.slug}`}>
                            <TaxonomyChip
                              label={chip.label}
                              href={chip.href}
                              prefix={chip.prefix}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-auto pt-5">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                      >
                        Explore project →
                      </Link>
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12">
          <HudCard
            accent="cyan"
            className="flex flex-col items-stretch gap-6 border-cyan/45 bg-cyan/[0.05] px-6 py-7 shadow-[0_0_36px_rgb(0_240_255_/_0.1)] sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <div>
              <p className="label-mono text-cyan">Full project index</p>
              <p className="mt-2 font-display text-xl uppercase text-text">
                {projectCount} systems on record
              </p>
              <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-text-dim">
                Field robots, sensing payloads, and research instruments beyond
                these three.
              </p>
            </div>
            <NeonButton
              href="/projects"
              appearance="solid"
              className="w-full shrink-0 px-7 py-4 sm:w-auto"
            >
              Explore all projects →
            </NeonButton>
          </HudCard>
        </Reveal>
      </div>
    </section>
  );
}
