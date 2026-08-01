import Link from "next/link";

import Breadcrumbs from "@/components/nav/Breadcrumbs";
import LocalVideoEvidenceLink from "@/components/ui/LocalVideoEvidenceLink";
import LocalVideoPlayer from "@/components/ui/LocalVideoPlayer";
import NeonButton from "@/components/ui/NeonButton";
import RoboPhoto from "@/components/ui/RoboPhoto";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import InstagramMedia from "@/components/ui/InstagramMedia";
import SpokeNav from "@/components/work/SpokeNav";
import SpokeScanBlock from "@/components/work/SpokeScanBlock";
import SystemRecord from "@/components/work/SystemRecord";
import type { ProjectCaseFile, SpokeNeighbor } from "@/lib/query";
import { resolveSpokeChallenge, resolveSpokeOutcome } from "@/lib/spoke-copy";

const ENVIRONMENT_LABEL: Record<string, string> = {
  "tested-in": "Tested in",
  "developed-in": "Developed in",
  "enabled-by": "Enabled by",
  "fabricated-through": "Fabricated through",
  "deployed-at": "Deployed at",
  "demonstrated-at": "Demonstrated at",
};

type CaseFileLayoutProps = {
  caseFile: ProjectCaseFile;
  prev?: SpokeNeighbor | null;
  next?: SpokeNeighbor | null;
};

export default function CaseFileLayout({
  caseFile,
  prev = null,
  next = null,
}: CaseFileLayoutProps) {
  const { record, evidence, related, environments } = caseFile;
  const video = record.video;
  const images = record.images;
  const primaryLocalSrc =
    video?.provider === "local" ? video.src : undefined;
  /** Extra self-hosted clips listed in evidence (not already the featured video). */
  const additionalLocalVideos = (record.evidence ?? []).flatMap((item) => {
    if (item.type !== "video" || !item.url?.startsWith("/") || !item.title) {
      return [];
    }
    if (item.url === primaryLocalSrc) return [];
    return [{ src: item.url, title: item.title }];
  });
  const photoGallery =
    images && images.length > 1
      ? images.map((item) => ({
          src: item.src,
          alt: item.alt,
          caption: item.caption,
        }))
      : undefined;

  const publicationEvidence = evidence.filter(
    (item) => item.type === "publication" || item.resolved,
  );
  const archiveEvidence = evidence.filter(
    (item) =>
      item.type === "document" ||
      item.type === "field-post" ||
      item.type === "photograph",
  );
  const otherEvidence = evidence.filter(
    (item) =>
      !publicationEvidence.includes(item) && !archiveEvidence.includes(item),
  );

  const hasRelated =
    environments.length > 0 ||
    publicationEvidence.length > 0 ||
    related.length > 0 ||
    archiveEvidence.length > 0;

  return (
    <article className="section-shell py-16 lg:py-24">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: record.title },
        ]}
      />

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
      </header>

      <SpokeScanBlock
        challenge={resolveSpokeChallenge(record.challenge, record.summary)}
        contribution={record.contributionSummary}
        outcome={resolveSpokeOutcome(
          record.outcomeSummary,
          record.highlights,
          record.summary,
        )}
      />

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

      {additionalLocalVideos.length > 0 && (
        <div className={`grid gap-4 ${video ? "mt-4" : "mt-10"}`}>
          {additionalLocalVideos.map((clip) => (
            <LocalVideoPlayer
              key={clip.src}
              src={clip.src}
              title={clip.title}
            />
          ))}
        </div>
      )}

      <section className="mt-12" aria-labelledby="narrative-heading">
        <h2 id="narrative-heading" className="label-mono text-text-dim">
          Narrative
        </h2>
        <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-text-dim">
          {record.summary}
        </p>
      </section>

      <SystemRecord caseFile={caseFile} />

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

      {(otherEvidence.length > 0 || record.evidencePending) && (
        <section className="mt-12" aria-labelledby="evidence-heading">
          <h2 id="evidence-heading" className="label-mono text-text-dim">
            Evidence
          </h2>
          {record.evidencePending && otherEvidence.length === 0 && (
            <p className="mt-4 font-body text-sm text-text-dim">
              Evidence pending — structured artifacts will be linked here.
            </p>
          )}
          <ul className="mt-4 space-y-4">
            {otherEvidence.map((item, i) => {
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
                    item.type === "video" && url.startsWith("/") ? (
                      <LocalVideoEvidenceLink src={url} title={title} />
                    ) : (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block font-body text-sm font-medium text-text transition-colors hover:text-cyan hover:underline hover:underline-offset-4"
                      >
                        {title}
                      </a>
                    )
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

      {hasRelated && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="label-mono text-text-dim">
            Related
          </h2>

          {environments.length > 0 && (
            <div className="mt-6">
              <h3 className="label-mono text-cyan">Conducted at</h3>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                {environments.map(({ record: infra, relationType }) => (
                  <li key={infra.slug}>
                    <Link
                      href={`/laboratories/${infra.slug}`}
                      className="block h-full border border-grid-dim p-4 transition-colors hover:border-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                    >
                      <p className="label-mono text-cyan/70">
                        {ENVIRONMENT_LABEL[relationType] ?? relationType}
                      </p>
                      <p className="mt-2 font-display text-sm uppercase text-text">
                        {infra.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {publicationEvidence.length > 0 && (
            <div className="mt-8">
              <h3 className="label-mono text-cyan">Publications</h3>
              <ul className="mt-3 space-y-4">
                {publicationEvidence.map((item, i) => {
                  const title =
                    item.resolved?.title ?? item.title ?? item.type;
                  const url = item.resolved?.url ?? item.url;
                  const meta = item.resolved
                    ? `${item.resolved.venue} · ${item.resolved.year}`
                    : item.note;
                  return (
                    <li
                      key={`pub-${i}`}
                      className="border border-grid-dim bg-bg/40 p-4"
                    >
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm font-medium text-text transition-colors hover:text-cyan hover:underline hover:underline-offset-4"
                        >
                          {title}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-text">{title}</p>
                      )}
                      {meta && (
                        <p className="mt-1 font-body text-sm text-text-dim">
                          {meta}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-8">
              <h3 className="label-mono text-cyan">Related projects</h3>
              <ul className="mt-3 grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/projects/${item.slug}`}
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
            </div>
          )}

          {archiveEvidence.length > 0 && (
            <div className="mt-8">
              <h3 className="label-mono text-cyan">Archive</h3>
              <ul className="mt-3 space-y-4">
                {archiveEvidence.map((item, i) => {
                  const title =
                    item.resolved?.title ?? item.title ?? item.type;
                  const url = item.resolved?.url ?? item.url;
                  return (
                    <li
                      key={`archive-${i}`}
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
                        <Link
                          href="/archive"
                          className="mt-2 block font-body text-sm font-medium text-text transition-colors hover:text-cyan hover:underline hover:underline-offset-4"
                        >
                          {title}
                        </Link>
                      )}
                      {item.note && (
                        <p className="mt-1 font-body text-sm text-text-dim">
                          {item.note}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}

      {images && images.length > 0 && (
        <section className="mt-12" aria-labelledby="photos-heading">
          <h2 id="photos-heading" className="label-mono text-text-dim">
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
          <NeonButton
            href={record.link.href}
            download={record.link.download}
            external={!record.link.download}
          >
            {record.link.label} →
          </NeonButton>
        </div>
      )}

      <SpokeNav basePath="/projects" prev={prev} next={next} />
    </article>
  );
}
