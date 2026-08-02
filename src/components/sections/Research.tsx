"use client";

import { useState } from "react";

import HudCard from "@/components/ui/HudCard";
import NeonButton from "@/components/ui/NeonButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  featuredPublicationTitles,
  patent,
  publications,
  scholarProfileUrl,
  durableCitationLabel,
} from "@/content/publications";
import type { Publication } from "@/lib/types";

const SUBJECT_SURNAME = "Giakoumidis";

const featured = publications.filter((publication) =>
  featuredPublicationTitles.includes(publication.title),
);

const rest = publications.filter(
  (publication) => !featuredPublicationTitles.includes(publication.title),
);

function AuthorList({ authors }: { authors: string }) {
  return (
    <>
      {authors.split(", ").map((author, i) => (
        <span
          key={`${author}-${i}`}
          className={author.includes(SUBJECT_SURNAME) ? "text-text" : undefined}
        >
          {i > 0 ? ", " : ""}
          {author}
        </span>
      ))}
    </>
  );
}

type PublicationRowProps = {
  publication: Publication;
  last: boolean;
};

function PublicationRow({ publication, last }: PublicationRowProps) {
  return (
    <div
      className={`flex gap-4 py-5 ${last ? "" : "border-b border-grid-dim"}`}
    >
      <span className="label-mono h-fit w-16 shrink-0 border border-cyan/40 px-2 py-1 text-center text-cyan">
        {publication.year}
      </span>

      <div className="min-w-0">
        <a
          href={publication.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body font-medium text-text transition-colors duration-200 hover:text-cyan hover:underline hover:underline-offset-4"
        >
          {publication.title}
        </a>

        <p className="mt-1 text-sm text-text-dim">
          <AuthorList authors={publication.authors} />
        </p>

        <p className="mt-1 text-sm text-text-dim">
          <span className="italic">{publication.venue}</span>
          {publication.citations > 0 && (
            <span className="label-mono ml-2 text-text-dim">
              · {publication.citations} cited
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default function Research() {
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <section id="research" aria-labelledby="research-heading">
      <div className="section-shell">
        <SectionHeading
          index="07"
          title="Research"
          headingId="research-heading"
          kicker="Publications & IP"
        />

        <Reveal className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-2">
          <p className="label-mono text-text-dim">
            <span className="text-cyan">{publications.length}</span>{" "}
            Publications
          </p>
          <p className="label-mono text-text-dim">
            <span className="text-cyan">{durableCitationLabel}</span> Citations
          </p>
        </Reveal>

        <ul>
          {featured.map((publication, i) => (
            <Reveal
              as="li"
              key={publication.title}
              delay={i * 0.06}
              className="list-none"
            >
              <PublicationRow
                publication={publication}
                last={!showAll && i === featured.length - 1}
              />
            </Reveal>
          ))}

          {showAll &&
            rest.map((publication, i) => (
              <Reveal
                as="li"
                key={publication.title}
                // Cap the stagger so the tail of a 24-row list is not still
                // animating seconds after the toggle was pressed.
                delay={Math.min(i, 8) * 0.06}
                className="list-none"
              >
                <PublicationRow
                  publication={publication}
                  last={i === rest.length - 1}
                />
              </Reveal>
            ))}
        </ul>

        <div className="mt-8">
          <button
            type="button"
            aria-expanded={showAll}
            onClick={() => setShowAll((open) => !open)}
            className="label-mono border border-grid-dim px-4 py-2 text-text-dim transition-all duration-200 hover:panel-glow-cyan hover:text-cyan"
          >
            {showAll
              ? "Show fewer"
              : `Show all ${publications.length} publications`}
          </button>
        </div>

        <Reveal className="mt-14">
          <HudCard accent="amber" className="p-6">
            <p className="label-mono glow-amber">Patent</p>
            <p className="mt-3 font-mono text-sm text-text-dim">
              {patent.number}
            </p>
            <h3 className="mt-2 text-lg text-text">{patent.title}</h3>
            {patent.note && (
              <p className="mt-3 text-sm text-text-dim">{patent.note}</p>
            )}
          </HudCard>
        </Reveal>

        <Reveal className="mt-10">
          <NeonButton href={scholarProfileUrl} external>
            Full list → Google Scholar
          </NeonButton>
        </Reveal>
      </div>
    </section>
  );
}
