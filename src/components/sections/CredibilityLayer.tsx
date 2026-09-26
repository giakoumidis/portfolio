import ActionLink from "@/components/ui/ActionLink";
import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { archiveTeaserSrcs } from "@/content/homepage";
import { getArchiveTeasers } from "@/content/archive";
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
            index="03"
            title="Laboratories & Evidence"
            headingId="credibility-heading"
            kicker="Infrastructure · archive"
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
                        <span className="label-mono text-cyan">My contribution · </span>
                        {lab.contributionSummary.split(/(?<=[.!?])\s/)[0]}
                      </p>
                      <p className="mt-auto pt-4">
                        <ActionLink href={`/laboratories/${lab.slug}`}>
                          Explore laboratory
                        </ActionLink>
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-6">
            <ActionLink href="/laboratories">Explore all laboratories</ActionLink>
          </p>
        </div>

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
            <ActionLink href="/archive">Explore the Archive</ActionLink>
          </p>
        </div>
      </div>
    </section>
  );
}
