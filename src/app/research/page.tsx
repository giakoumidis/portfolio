import type { Metadata } from "next";
import Link from "next/link";

import AwardCard from "@/components/ui/AwardCard";
import HudCard from "@/components/ui/HudCard";
import NeonButton from "@/components/ui/NeonButton";
import { awards } from "@/content/awards";
import { profile } from "@/content/profile";
import {
  featuredPublicationTitles,
  patent,
  publications,
  scholarProfileUrl,
  durableCitationLabel,
} from "@/content/publications";
import { scholarlyArticleListJsonLd } from "@/lib/jsonld";
import type { Publication } from "@/lib/types";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Research — Nikolaos Giakoumidis",
  description:
    "Publications, patents, research themes, and awards — connected to projects and laboratories.",
  path: "/research",
});

const SUBJECT_SURNAME = "Giakoumidis";

type PageProps = {
  searchParams: Promise<{ sort?: string }>;
};

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

function sortPublications(
  items: Publication[],
  sort: "year" | "citations",
): Publication[] {
  const copy = [...items];
  if (sort === "citations") {
    return copy.sort((a, b) => b.citations - a.citations || b.year.localeCompare(a.year));
  }
  return copy.sort((a, b) => b.year.localeCompare(a.year) || b.citations - a.citations);
}

type PublicationRowProps = {
  publication: Publication;
  featured?: boolean;
  last?: boolean;
};

function PublicationRow({ publication, featured, last }: PublicationRowProps) {
  return (
    <div
      className={`flex gap-4 py-5 ${last ? "" : "border-b border-grid-dim"} ${featured ? "border-l-2 border-l-cyan/60 pl-4" : ""}`}
    >
      <span className="label-mono h-fit w-16 shrink-0 border border-cyan/40 px-2 py-1 text-center text-cyan">
        {publication.year}
      </span>

      <div className="min-w-0">
        {featured && (
          <p className="label-mono mb-2 text-cyan">Featured</p>
        )}
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

function SortLink({
  label,
  active,
  href,
}: {
  label: string;
  active: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`label-mono border px-3 py-1.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
        active
          ? "border-cyan bg-cyan/10 text-cyan"
          : "border-grid-dim text-text-dim hover:border-cyan/40 hover:text-cyan"
      }`}
    >
      {label}
    </Link>
  );
}

export default async function ResearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sort = params.sort === "citations" ? "citations" : "year";
  const sorted = sortPublications(publications, sort);
  const featuredSet = new Set(featuredPublicationTitles);
  const featured = sorted.filter((p) => featuredSet.has(p.title));
  const rest = sorted.filter((p) => !featuredSet.has(p.title));

  return (
    <main className="section-shell py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(scholarlyArticleListJsonLd(sorted)),
        }}
      />
      <p className="label-mono text-cyan">
        Research <span className="text-text-dim">{"//"} Outputs & IP</span>
      </p>
      <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
        Research
      </h1>
      <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
      <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
        Publications and intellectual property — linked to projects and
        laboratories. Awards live on the Profile page with full media.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border border-grid-dim bg-bg-raised/20 p-5">
        <p className="label-mono text-text-dim">
          <span className="text-cyan">{publications.length}</span> publications
        </p>
        <p className="label-mono text-text-dim">
          <span className="text-cyan">{durableCitationLabel}</span> citations
        </p>
        <p className="label-mono text-text-dim">
          Patent <span className="text-cyan">{patent.number}</span>
        </p>
        <a
          href={profile.links.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          Google Scholar →
        </a>
      </div>

      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-lg uppercase text-text">
            Publications
          </h2>
          <div className="flex flex-wrap gap-2">
            <SortLink
              label="By year"
              active={sort === "year"}
              href="/research?sort=year"
            />
            <SortLink
              label="By citations"
              active={sort === "citations"}
              href="/research?sort=citations"
            />
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mt-8">
            <p className="label-mono text-text-dim">Highlighted outputs</p>
            <div className="mt-4 border border-grid-dim bg-bg-raised/20 p-4 sm:p-6">
              {featured.map((publication, i) => (
                <PublicationRow
                  key={publication.title}
                  publication={publication}
                  featured
                  last={i === featured.length - 1 && rest.length === 0}
                />
              ))}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-8">
            {featured.length > 0 && (
              <p className="label-mono text-text-dim">Full list</p>
            )}
            <div className={featured.length > 0 ? "mt-4" : ""}>
              {rest.map((publication, i) => (
                <PublicationRow
                  key={publication.title}
                  publication={publication}
                  last={i === rest.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-14">
        <HudCard accent="amber" className="p-6">
          <p className="label-mono glow-amber">Patent</p>
          <p className="mt-3 font-mono text-sm text-text-dim">{patent.number}</p>
          <h3 className="mt-2 text-lg text-text">{patent.title}</h3>
          {patent.note && (
            <p className="mt-3 text-sm text-text-dim">{patent.note}</p>
          )}
        </HudCard>
      </div>

      <div className="mt-10">
        <NeonButton href={scholarProfileUrl} external>
          Full list → Google Scholar
        </NeonButton>
      </div>

      <section id="awards" className="mt-20 scroll-mt-24">
        <h2 className="font-display text-lg uppercase text-text">Awards</h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-text-dim">
          First-prize competition wins. Full certificates and detail on{" "}
          <Link
            href="/profile#awards"
            className="text-cyan transition-colors hover:text-text"
          >
            Profile → Awards
          </Link>
          .
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {awards.map((award) => (
            <li key={award.id}>
              <AwardCard award={award} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
