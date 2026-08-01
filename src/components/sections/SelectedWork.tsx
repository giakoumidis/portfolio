import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { flagshipProjectSlugs } from "@/content/homepage";
import { taxonomyLabel } from "@/content/taxonomy";
import { getProject } from "@/lib/query";

function oneSentence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^(.+?[.!?])(\s|$)/);
  return match ? match[1] : trimmed;
}

function contributionPhrase(text: string): string {
  const sentence = oneSentence(text);
  return sentence.length > 120 ? `${sentence.slice(0, 117)}…` : sentence;
}

export default function SelectedWork() {
  const projects = flagshipProjectSlugs
    .map((slug) => getProject(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="scroll-mt-20"
    >
      <div className="section-shell">
        <SectionHeading
          index="03"
          title="Selected Work"
          headingId="selected-work-heading"
          kicker="Flagship case files"
        />

        <ul className="mt-4 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const image = project.images?.[0];
            const tags = [
              ...(project.facets.domains ?? []).slice(0, 1),
              ...(project.facets.applications ?? []).slice(0, 1),
              ...(project.facets.outcomes ?? []).slice(0, 2),
            ]
              .slice(0, 4)
              .map(taxonomyLabel);

            return (
              <Reveal as="li" key={project.slug} delay={(index % 2) * 0.06}>
                <article className="flex h-full flex-col border border-grid-dim bg-bg-raised/20">
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
                      {taxonomyLabel(project.facets.domains[0])}
                      {project.period.label && (
                        <span className="ml-3">{project.period.label}</span>
                      )}
                    </p>
                    <h3 className="mt-3 font-display text-lg uppercase text-text">
                      <Link
                        href={`/work/${project.slug}`}
                        className="transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-text-dim">
                      {oneSentence(project.summary)}
                    </p>
                    <p className="mt-4 font-body text-sm text-text">
                      <span className="label-mono text-cyan">My contribution · </span>
                      {contributionPhrase(project.contributionSummary)}
                    </p>
                    {tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <li
                            key={tag}
                            className="label-mono border border-grid-dim px-2 py-1 text-text-dim"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-auto pt-5">
                      <Link
                        href={`/work/${project.slug}`}
                        className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                      >
                        Open case file →
                      </Link>
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-10">
          <Link
            href="/work"
            className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            View all work →
          </Link>
        </p>
      </div>
    </section>
  );
}
