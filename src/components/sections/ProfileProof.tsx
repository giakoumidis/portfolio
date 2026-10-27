import ActionLink from "@/components/ui/ActionLink";
import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { homepageProfileBlurb } from "@/content/homepage";
import { profile } from "@/content/profile";

const yearsOnRecord = profile.stats.find((stat) =>
  stat.label.startsWith("Years"),
);

export default function ProfileProof() {
  return (
    <section
      id="profile-proof"
      aria-labelledby="profile-proof-heading"
      className="scroll-mt-20"
    >
      <div className="section-shell">
        <SectionHeading
          index="01"
          title="Biography"
          headingId="profile-proof-heading"
          kicker="Engineering depth · technical leadership"
        />

        <Reveal>
          <RoboPhoto
            src="/images/about/kuka-teleop.jpg"
            alt="Nikolaos Giakoumidis crouching beside a KUKA LBR robotic arm he is teleoperating in the NYUAD CTP labs"
            tag="FIELD LOG"
            caption="TELEOPERATING A KUKA LBR — NYUAD CTP LABS"
            aspect="aspect-[16/10]"
            sizes="(max-width: 1024px) 100vw, 72rem"
            preload
            className="border border-grid-dim"
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <p className="text-text-dim">
            {homepageProfileBlurb}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="flex flex-col items-start gap-4 border-t border-grid-dim pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="label-mono text-text-dim">
                {yearsOnRecord && (
                  <span className="text-cyan">
                    {yearsOnRecord.prefix}
                    {yearsOnRecord.value}
                    {yearsOnRecord.suffix}
                  </span>
                )}{" "}
                years on record
              </p>
              <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-text-dim">
                Experience, education, awards, and engineering expertise.
              </p>
            </div>
            <ActionLink href="/resume" className="shrink-0">
              Explore resume
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
