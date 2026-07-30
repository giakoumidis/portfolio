import Link from "next/link";

import TaxonomyChip from "@/components/work/TaxonomyChip";
import InstagramMedia from "@/components/ui/InstagramMedia";
import LocalVideoPlayer from "@/components/ui/LocalVideoPlayer";
import NeonButton from "@/components/ui/NeonButton";
import RoboPhoto from "@/components/ui/RoboPhoto";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import type { InfrastructureHub } from "@/lib/query";

type LabHubLayoutProps = {
  hub: InfrastructureHub;
};

export default function LabHubLayout({ hub }: LabHubLayoutProps) {
  const {
    record,
    domainTerms,
    contributionTerms,
    inventoryTerms,
    connectedWork,
    evidence,
  } = hub;
  const video = record.video;
  const images = record.images;
  const photoGallery =
    images && images.length > 1
      ? images.map((item) => ({
          src: item.src,
          alt: item.alt,
          caption: item.caption,
        }))
      : undefined;

  return (
    <article className="section-shell py-16 lg:py-24">
      <nav aria-label="Breadcrumb" className="label-mono text-text-dim">
        <Link
          href="/infrastructure"
          className="hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          Infrastructure
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Laboratory Hub</span>
      </nav>

      <header className="mt-8">
        <p className="label-mono text-cyan">
          Infrastructure
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

      <section className="mt-12" aria-labelledby="lab-contribution-heading">
        <h2 id="lab-contribution-heading" className="label-mono text-text-dim">
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
        {domainTerms.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {domainTerms.map((term) => (
              <TaxonomyChip
                key={term.slug}
                label={term.label}
                href={term.href}
                prefix="DOMAIN"
              />
            ))}
          </div>
        )}
      </section>

      {record.highlights && record.highlights.length > 0 && (
        <section className="mt-12" aria-labelledby="lab-story-heading">
          <h2 id="lab-story-heading" className="label-mono text-text-dim">
            Facility Narrative
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

      {record.credits && record.credits.length > 0 && (
        <section className="mt-12" aria-labelledby="lab-credits-heading">
          <h2 id="lab-credits-heading" className="label-mono text-text-dim">
            Institutional Collaboration & Project Team
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
      )}

      {/* Inventory — separate from project-used platforms */}
      {inventoryTerms.length > 0 && (
        <section className="mt-12" aria-labelledby="inventory-heading">
          <h2 id="inventory-heading" className="label-mono text-text-dim">
            Platforms & Systems
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-dim">
            Equipment and platforms established or operated in this environment
            — not a claim that every connected project used each system.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {inventoryTerms.map((term) => (
              <TaxonomyChip
                key={term.slug}
                label={term.label}
                href={`/work?platform=${term.slug}`}
                prefix="INVENTORY"
              />
            ))}
          </div>
        </section>
      )}

      {/* Work from typed relations */}
      {connectedWork.length > 0 && (
        <section className="mt-12" aria-labelledby="lab-work-heading">
          <h2 id="lab-work-heading" className="label-mono text-text-dim">
            Work From This Lab
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {connectedWork.map(({ project, relationType }) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="block h-full border border-grid-dim p-5 transition-colors hover:border-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  <p className="label-mono text-cyan/70">
                    {String(relationType).replace(/-/g, " ")}
                  </p>
                  <p className="mt-2 font-display text-base uppercase text-text">
                    {project.title}
                  </p>
                  <p className="mt-2 font-body text-sm text-text-dim">
                    {project.contributionSummary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {evidence.length > 0 && (
        <section className="mt-12" aria-labelledby="lab-evidence-heading">
          <h2 id="lab-evidence-heading" className="label-mono text-text-dim">
            Publications & Evidence
          </h2>
          <ul className="mt-4 space-y-4">
            {evidence.map((item, i) => {
              const title = item.resolved?.title ?? item.title ?? item.type;
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

      {images && images.length > 0 && (
        <section className="mt-12" aria-labelledby="lab-photos-heading">
          <h2 id="lab-photos-heading" className="label-mono text-text-dim">
            Photos
          </h2>
          <div
            className={`mt-4 grid gap-4 ${
              images.length > 1 ? "lg:grid-cols-2" : ""
            }`}
          >
            {images.map((image, i) => (
              <RoboPhoto
                key={image.src}
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                aspect={
                  image.orientation === "portrait" ? "min-h-96" : "min-h-64"
                }
                sizes="(min-width: 1024px) 50vw, 100vw"
                gallery={photoGallery}
                galleryIndex={i}
              />
            ))}
          </div>
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
