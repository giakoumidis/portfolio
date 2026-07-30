import Link from "next/link";

import SystemRecord from "@/components/work/SystemRecord";
import TaxonomyChip from "@/components/work/TaxonomyChip";
import InstagramMedia from "@/components/ui/InstagramMedia";
import LocalVideoPlayer from "@/components/ui/LocalVideoPlayer";
import NeonButton from "@/components/ui/NeonButton";
import RoboPhoto from "@/components/ui/RoboPhoto";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import type { ProjectCaseFile } from "@/lib/query";

type CaseFileLayoutProps = {
  caseFile: ProjectCaseFile;
};

export default function CaseFileLayout({ caseFile }: CaseFileLayoutProps) {
  const { record, evidence, related, contributionTerms } = caseFile;
  const video = record.video;
  const images = record.images;

  return (
    <article className="section-shell py-16 lg:py-24">
      <nav aria-label="Breadcrumb" className="label-mono text-text-dim">
        <Link
          href="/work"
          className="hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          Work Index
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Case File</span>
      </nav>

      {/* 1. Header */}
      <header className="mt-8">
        <p className="label-mono text-cyan">
          Case File
          {record.period.label && (
            <span className="ml-3 text-text-dim">{record.period.label}</span>
          )}
        </p>
        <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.6rem)] text-text">
          {record.title}
        </h1>
        {record.org && (
          <p className="mt-3 font-body text-sm text-text-dim">{record.org}</p>
        )}
        <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-text-dim">
          {record.summary}
        </p>
      </header>

      {video && (
        <div
          className={
            video.provider === "instagram"
              ? "mt-10 w-full max-w-sm"
              : "mt-10 w-full"
          }
        >
          {video.provider === "youtube" && (
            <YouTubeEmbed videoId={video.id} title={video.title} />
          )}
          {video.provider === "instagram" && (
            <InstagramMedia
              url={video.url}
              title={video.title}
              poster={video.poster}
            />
          )}
          {video.provider === "local" && (
            <LocalVideoPlayer
              src={video.src}
              title={video.title}
              poster={video.poster}
              type={video.type}
            />
          )}
        </div>
      )}

      {images && images.length > 0 && (
        <div className={`grid gap-4 lg:grid-cols-2 ${video ? "mt-4" : "mt-10"}`}>
          {images.slice(0, 2).map((image) => (
            <RoboPhoto
              key={image.src}
              src={image.src}
              alt={image.alt}
              caption={image.caption}
              aspect={
                image.orientation === "portrait" ? "min-h-96" : "min-h-64"
              }
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ))}
        </div>
      )}

      {/* 2. System record */}
      <SystemRecord caseFile={caseFile} />

      {/* 3–4. Context + contribution */}
      <section className="mt-12" aria-labelledby="contribution-heading">
        <h2 id="contribution-heading" className="label-mono text-text-dim">
          My Contribution
        </h2>
        <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-text">
          {record.contributionSummary}
        </p>
        {contributionTerms.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {contributionTerms.map((term) => (
              <TaxonomyChip
                key={term.slug}
                label={term.label}
                href={term.href}
                prefix="CONTRIB"
              />
            ))}
          </div>
        )}
      </section>

      {/* 5–6. Architecture / validation from highlights */}
      {record.highlights && record.highlights.length > 0 && (
        <section className="mt-12" aria-labelledby="development-heading">
          <h2 id="development-heading" className="label-mono text-text-dim">
            Development & Validation
          </h2>
          <ul className="mt-4 max-w-3xl space-y-3">
            {record.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-body text-sm leading-relaxed text-text-dim"
              >
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-cyan" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 7. Credits & collaborators */}
      <section className="mt-12" aria-labelledby="credits-heading">
        <h2 id="credits-heading" className="label-mono text-text-dim">
          Credits & Collaborators
        </h2>
        <ul className="mt-4 max-w-3xl divide-y divide-grid-dim border border-grid-dim">
          {record.credits.map((credit) => (
            <li
              key={`${credit.name}-${credit.role ?? ""}`}
              className="grid gap-1 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
            >
              <div>
                <p className="font-body text-sm text-text">{credit.name}</p>
                {credit.org && (
                  <p className="mt-0.5 font-body text-sm text-text-dim">
                    {credit.org}
                  </p>
                )}
              </div>
              {credit.role && (
                <p className="label-mono text-cyan sm:text-right">
                  {credit.role}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Evidence */}
      {(evidence.length > 0 || record.evidencePending) && (
        <section className="mt-12" aria-labelledby="evidence-heading">
          <h2 id="evidence-heading" className="label-mono text-text-dim">
            Evidence
          </h2>
          {record.evidencePending && evidence.length === 0 && (
            <p className="mt-4 font-body text-sm text-text-dim">
              Evidence pending — structured artifacts will be linked here.
            </p>
          )}
          <ul className="mt-4 space-y-4">
            {evidence.map((item, i) => {
              const title =
                item.resolved?.title ?? item.title ?? item.type;
              const url = item.resolved?.url ?? item.url;
              const meta = item.resolved
                ? `${item.resolved.venue} · ${item.resolved.year}`
                : item.note;
              return (
                <li
                  key={`${item.type}-${i}`}
                  className="border border-grid-dim bg-bg/40 p-4"
                >
                  <p className="label-mono text-text-dim">
                    {item.type.replace(/-/g, " ")}
                  </p>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block font-body text-sm font-medium text-text transition-colors hover:text-cyan hover:underline hover:underline-offset-4"
                    >
                      {title}
                    </a>
                  ) : (
                    <p className="mt-2 font-body text-sm text-text">{title}</p>
                  )}
                  {meta && (
                    <p className="mt-1 font-body text-sm text-text-dim">{meta}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* 9. Connected work */}
      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="connected-heading">
          <h2 id="connected-heading" className="label-mono text-text-dim">
            Connected Work
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/work/${item.slug}`}
                  className="block h-full border border-grid-dim p-4 transition-colors hover:border-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  <p className="label-mono text-text-dim">
                    {item.period.label}
                  </p>
                  <p className="mt-2 font-display text-sm uppercase text-text">
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {record.link && (
        <div className="mt-12">
          <NeonButton href={record.link.href} external>
            {record.link.label} →
          </NeonButton>
        </div>
      )}
    </article>
  );
}
