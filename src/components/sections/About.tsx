import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/ui/StatCounter";
import { profile } from "@/content/profile";

/** Phrases lifted into cyan so the summary scans in one pass. */
const EMPHASIS = [
  "embodied and physical AI",
  "multi-agent robotic systems",
  "advanced research infrastructure",
  "autonomous systems",
];

function EmphasisedSummary({ text }: { text: string }) {
  const pattern = new RegExp(`(${EMPHASIS.join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        EMPHASIS.some((e) => e.toLowerCase() === part.toLowerCase()) ? (
          <strong key={i} className="font-medium text-cyan">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="section-shell">
        <SectionHeading
          index="01"
          title="About"
          headingId="about-heading"
          kicker="Who I am"
        />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="label-mono mb-5 text-magenta">
                {profile.currentRole.title}
                <span className="mt-1 block text-text-dim">
                  {profile.currentRole.org}
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="max-w-[65ch] text-text-dim">
                <EmphasisedSummary text={profile.summary} />
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-10">
              <RoboPhoto
                src="/images/about/kuka-teleop.jpg"
                alt="Nikolaos Giakoumidis crouching beside a KUKA LBR robotic arm he is teleoperating in the NYUAD CTP labs"
                tag="FIELD LOG"
                caption="TELEOPERATING A KUKA LBR — NYUAD CTP LABS"
                aspect="aspect-[3/2]"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="border border-grid-dim"
              />
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="grid grid-cols-2 gap-px border border-grid-dim bg-grid-dim">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="bg-bg-raised">
                  <StatCounter
                    value={stat.value}
                    label={stat.label}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
