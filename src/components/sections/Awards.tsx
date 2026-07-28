import HudCard from "@/components/ui/HudCard";
import NeonButton from "@/components/ui/NeonButton";
import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import CertThumb from "@/components/ui/CertThumb";
import SectionHeading from "@/components/ui/SectionHeading";
import LocalVideoPlayer from "@/components/ui/LocalVideoPlayer";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import { awards, certifications } from "@/content/awards";

export default function Awards() {
  return (
    <section id="awards" aria-labelledby="awards-heading">
      <div className="section-shell">
        <SectionHeading
          index="10"
          title="Awards"
          headingId="awards-heading"
          kicker="Recognition"
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, i) => (
            <Reveal
              as="li"
              key={award.id}
              delay={i * 0.08}
              className="scroll-mt-20 lg:scroll-mt-8"
            >
              <div id={award.id}>
              <HudCard accent="amber" className="h-full p-0">
                <div className="flex h-full flex-col">
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

                  {award.image && (
                    <RoboPhoto
                      src={award.image.src}
                      alt={award.image.alt}
                      caption={award.image.caption}
                      tag="AWD.01"
                      aspect="min-h-48"
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="border-0 border-b border-grid-dim"
                    />
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <p className="label-mono glow-amber">▲ {award.placement}</p>

                    <h3 className="mt-4 text-base text-text">{award.event}</h3>

                    {award.detail && (
                      <p className="mt-3 text-sm text-text-dim">
                        {award.detail}
                      </p>
                    )}

                    {award.location && (
                      <p className="mt-1 text-sm text-text-dim">
                        {award.location}
                      </p>
                    )}

                    {award.certificates && award.certificates.length > 0 && (
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

                    {award.paper && (
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

                    <p className="label-mono mt-auto pt-6 text-text-dim">
                      {award.year}
                    </p>
                  </div>
                </div>
              </HudCard>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 border-t border-grid-dim pt-10">
          <Reveal>
            <p className="label-mono text-text-dim">Certifications</p>
          </Reveal>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((certification, i) => (
              <Reveal
                as="li"
                key={certification.id}
                delay={i * 0.08}
                className="scroll-mt-20 border-l border-grid-dim pl-4 lg:scroll-mt-8"
              >
                <div id={certification.id} className="flex gap-3">
                  {certification.image && (
                    <CertThumb
                      src={certification.image.src}
                      thumbSrc={certification.image.thumbSrc}
                      alt={certification.image.alt}
                      caption={certification.image.caption}
                      tag="CERT"
                    />
                  )}

                  <div className="min-w-0">
                    <p className="text-sm text-text">{certification.name}</p>
                    <p className="label-mono mt-1 text-text-dim">
                      {certification.issuer}
                    </p>
                    {certification.detail && (
                      <p className="label-mono mt-1 text-text-dim">
                        {certification.detail}
                      </p>
                    )}
                    <p className="label-mono mt-1 text-cyan">
                      {certification.year}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
