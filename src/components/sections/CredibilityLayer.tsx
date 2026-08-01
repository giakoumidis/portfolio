import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { archiveTeaserSrcs } from "@/content/homepage";
import { getArchiveTeasers } from "@/content/archive";
import { awards } from "@/content/awards";
import {
  featuredPublicationTitles,
  publications,
  scholarProfileUrl,
  totalCitations,
  patent,
} from "@/content/publications";
import { getAllInfrastructure } from "@/lib/query";

const PRIMARY_LAB_SLUGS = [
  "kinesis-ctp-laboratory",
  "photonics-ctp-laboratory",
  "nyuad-hts-platform",
] as const;

export default function CredibilityLayer() {
  const labs = getAllInfrastructure().filter((lab) =>
    (PRIMARY_LAB_SLUGS as readonly string[]).includes(lab.slug),
  );
  const featured = publications.filter((publication) =>
    featuredPublicationTitles.includes(publication.title),
  ).slice(0, 2);
  const firstPrizes = awards.filter((award) =>
    award.placement.toLowerCase().includes("first"),
  );
  const teasers = getArchiveTeasers([...archiveTeaserSrcs]);

  return (
    <section
      id="credibility"
      aria-labelledby="credibility-heading"
      className="scroll-mt-20"
    >
      <div className="section-shell space-y-16 lg:space-y-20">
        <div>
          <SectionHeading
            index="04"
            title="Laboratories & Evidence"
            headingId="credibility-heading"
            kicker="Infrastructure · research · archive"
          />

          <ul className="mt-8 grid gap-5 lg:grid-cols-3">
            {labs.map((lab, index) => {
              const image = lab.images?.[0];
              return (
                <Reveal as="li" key={lab.slug} delay={index * 0.05}>
                  <article className="flex h-full flex-col border border-grid-dim bg-bg-raised/20">
                    {image && (
                      <RoboPhoto
                        src={image.src}
                        alt={image.alt}
                        caption={image.caption}
                        aspect="aspect-[3/2]"
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        className="border-0 border-b border-grid-dim"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-base uppercase text-text">
                        {lab.title}
                      </h3>
                      <p className="mt-3 font-body text-sm leading-relaxed text-text-dim">
                        {lab.summary.split(/(?<=[.!?])\s/)[0]}
                      </p>
                      <p className="mt-3 font-body text-sm text-text">
                        <span className="label-mono text-cyan">Contribution · </span>
                        {lab.contributionSummary.split(/(?<=[.!?])\s/)[0]}
                      </p>
                      <p className="mt-auto pt-4">
                        <Link
                          href={`/laboratories/${lab.slug}`}
                          className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                        >
                          Laboratory page →
                        </Link>
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-6">
            <Link
              href="/laboratories"
              className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Explore all laboratories →
            </Link>
          </p>
        </div>

        <Reveal>
          <div className="border border-grid-dim bg-bg-raised/20 p-5 sm:p-6">
            <p className="label-mono text-cyan">Research & awards</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              <p className="label-mono text-text-dim">
                <span className="text-cyan">{publications.length}</span> publications
              </p>
              <p className="label-mono text-text-dim">
                <span className="text-cyan">{totalCitations}</span> citations
              </p>
              <p className="label-mono text-text-dim">
                <span className="text-cyan">{firstPrizes.length}</span> first-prize awards
              </p>
            </div>
            <ul className="mt-5 space-y-3">
              {featured.map((publication) => (
                <li key={publication.title}>
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-text transition-colors hover:text-cyan"
                  >
                    {publication.title}
                  </a>
                  <span className="label-mono ml-2 text-text-dim">
                    {publication.year}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-body text-sm text-text-dim">
              IP: {patent.title} ({patent.number}). {patent.note}
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href={scholarProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                Google Scholar →
              </a>
              <Link
                href="/research"
                className="label-mono text-text-dim transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                Full research hub →
              </Link>
            </div>
          </div>
        </Reveal>

        <div>
          <p className="label-mono text-cyan">From the Archive</p>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-dim">
            Field deployments, laboratory construction, exhibitions, awards, and
            research evidence.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {teasers.map((item, index) => (
              <Reveal as="li" key={item.id} delay={(index % 6) * 0.04}>
                <RoboPhoto
                  src={item.src}
                  alt={item.alt}
                  tag={`LOG.${String(index + 1).padStart(2, "0")}`}
                  caption={item.caption}
                  aspect={
                    item.orientation === "portrait"
                      ? "aspect-[4/5]"
                      : "aspect-[3/2]"
                  }
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 15vw"
                  className="border border-grid-dim"
                />
              </Reveal>
            ))}
          </ul>
          <p className="mt-6">
            <Link
              href="/archive"
              className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Explore the Archive →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
