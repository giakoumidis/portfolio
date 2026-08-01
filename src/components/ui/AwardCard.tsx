import CertThumb from "@/components/ui/CertThumb";
import LocalVideoPlayer from "@/components/ui/LocalVideoPlayer";
import NeonButton from "@/components/ui/NeonButton";
import RoboPhoto from "@/components/ui/RoboPhoto";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import type { Award } from "@/lib/types";

type AwardCardProps = {
  award: Award;
  /** Show certificates and paper link (full detail). */
  detailed?: boolean;
};

/** Award card with hero video or photo when available. */
export default function AwardCard({
  award,
  detailed = false,
}: AwardCardProps) {
  return (
    <article
      id={award.id}
      className="flex h-full scroll-mt-24 flex-col overflow-hidden border border-grid-dim bg-bg-raised/30"
    >
      {award.video?.provider === "youtube" && (
        <YouTubeEmbed
          videoId={award.video.id}
          title={award.video.title}
          className="border-0 border-b border-grid-dim"
        />
      )}

      {award.video?.provider === "local" && (
        <LocalVideoPlayer
          src={award.video.src}
          title={award.video.title}
          poster={award.video.poster}
          className="border-0 border-b border-grid-dim"
        />
      )}

      {!award.video && award.image && (
        <RoboPhoto
          src={award.image.src}
          alt={award.image.alt}
          caption={award.image.caption}
          tag="AWD"
          aspect="aspect-[16/10]"
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="border-0 border-b border-grid-dim"
        />
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="label-mono glow-amber">▲ {award.placement}</p>
        <h3 className="mt-3 text-base text-text">{award.event}</h3>

        {award.detail && (
          <p className="mt-2 text-sm text-text-dim">{award.detail}</p>
        )}
        {award.location && (
          <p className="mt-1 text-sm text-text-dim">{award.location}</p>
        )}

        {detailed && award.certificates && award.certificates.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-3">
            {award.certificates.map((certificate) => (
              <li
                key={certificate.src}
                className="flex max-w-[7.5rem] flex-col gap-2"
              >
                <CertThumb
                  src={certificate.src}
                  thumbSrc={certificate.thumbSrc}
                  alt={certificate.alt}
                  caption={certificate.caption}
                  tag="AWD"
                />
                <p className="label-mono text-[10px] leading-snug text-text-dim">
                  {certificate.label}
                </p>
              </li>
            ))}
          </ul>
        )}

        {detailed && award.paper && (
          <div className="mt-4">
            <NeonButton
              href={award.paper.link}
              external
              variant="magenta"
              className="w-full justify-start"
            >
              Read paper →
            </NeonButton>
          </div>
        )}

        <p className="label-mono mt-auto pt-5 text-text-dim">{award.year}</p>
      </div>
    </article>
  );
}
