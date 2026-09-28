import ActionLink from "@/components/ui/ActionLink";
import HudCard from "@/components/ui/HudCard";
import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { getArchiveRecords, getArchiveTeasers } from "@/content/archive";
import { archiveTeaserSrcs } from "@/content/homepage";
import { getOutreachByAudience, outreachAudiences } from "@/content/outreach";
import { getAllInfrastructure } from "@/lib/query";

const FEATURED_LAB_SLUG = "kinesis-ctp-laboratory";

export default function CredibilityLayer() {
  const labs = getAllInfrastructure();
  const lab = labs.find((item) => item.slug === FEATURED_LAB_SLUG);
  const teasers = getArchiveTeasers([...archiveTeaserSrcs]);
  const archiveCount = getArchiveRecords().length;
  const image = lab?.images?.[0];
  const industryCount = getOutreachByAudience("industry").length;

  return (
    <>
      <section
        id="laboratories"
        aria-labelledby="laboratories-heading"
        className="scroll-mt-20"
      >
        <div className="section-shell">
          <SectionHeading
            index="03"
            title="Laboratories"
            headingId="laboratories-heading"
            kicker="Facilities built & operated"
          />

          {lab && (
            <Reveal>
              <article className="grid border border-grid-dim bg-bg-raised/20 lg:grid-cols-2">
                {image && (
                  <RoboPhoto
                    src={image.src}
                    alt={image.alt}
                    caption={image.caption}
                    aspect="aspect-[3/2]"
                    sizes="(max-width: 1024px) 100vw, 36rem"
                    className="border-0 border-b border-grid-dim lg:border-r lg:border-b-0"
                  />
                )}
                <div className="flex flex-col p-5 sm:p-6">
                  <h3 className="font-display text-base uppercase text-text">
                    {lab.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-text-dim">
                    {lab.summary.split(/(?<=[.!?])\s/)[0]}
                  </p>
                  <p className="mt-auto pt-5">
                    <ActionLink href={`/laboratories/${lab.slug}`}>
                      Explore laboratory
                    </ActionLink>
                  </p>
                </div>
              </article>
            </Reveal>
          )}

          <Reveal className="mt-12">
            <div className="flex flex-col items-start gap-4 border-t border-grid-dim pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label-mono text-text-dim">
                  <span className="text-cyan">{labs.length}</span> laboratories on
                  record
                </p>
                <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-text-dim">
                  Robotics, photonics, advanced manufacturing, electronics, and
                  high-throughput screening at NYU Abu Dhabi.
                </p>
              </div>
              <ActionLink href="/laboratories" className="shrink-0">
                Explore all laboratories
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="outreach"
        aria-labelledby="outreach-heading"
        className="scroll-mt-20"
      >
        <div className="section-shell">
          <SectionHeading
            index="04"
            title="Outreach"
            headingId="outreach-heading"
            kicker="Industry · society"
          />
          <p className="max-w-2xl font-body text-sm text-text-dim">
            Taking robotics and AI out of the laboratory, to industry and to
            students and the public.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {outreachAudiences.map((audience, index) => (
              <Reveal as="li" key={audience.id} delay={index * 0.06}>
                <HudCard accent="magenta" className="flex h-full flex-col p-6">
                  <h3 className="font-display text-base uppercase text-text">
                    {audience.title}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-text-dim">
                    {audience.purpose}
                  </p>
                  <p className="mt-5">
                    <ActionLink href={`/outreach/${audience.id}`}>
                      Explore {audience.title.toLowerCase()}
                    </ActionLink>
                  </p>
                </HudCard>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12">
            <div className="flex flex-col items-start gap-4 border-t border-grid-dim pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label-mono text-text-dim">
                  <span className="text-cyan">{industryCount}</span> industry
                  engagements on record
                </p>
                <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-text-dim">
                  Industry engagement and public sessions that carry the work
                  beyond the laboratory.
                </p>
              </div>
              <ActionLink href="/outreach" className="shrink-0">
                Explore Outreach
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="archive"
        aria-labelledby="archive-heading"
        className="scroll-mt-20"
      >
        <div className="section-shell">
          <SectionHeading
            index="05"
            title="Archive"
            headingId="archive-heading"
            kicker="Field records · exhibitions · media"
          />
          <p className="max-w-2xl font-body text-sm text-text-dim">
            Field deployments, laboratory construction, exhibitions, awards, and
            published work.
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

          <Reveal className="mt-12">
            <div className="flex flex-col items-start gap-4 border-t border-grid-dim pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label-mono text-text-dim">
                  <span className="text-cyan">{archiveCount}</span> records in the
                  archive
                </p>
                <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-text-dim">
                  Photographs, demonstrations, and documents beyond this teaser
                  strip.
                </p>
              </div>
              <ActionLink href="/archive" className="shrink-0">
                Explore the Archive
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
