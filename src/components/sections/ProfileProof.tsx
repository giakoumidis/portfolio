import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/ui/StatCounter";
import {
  collaborationStrip,
  homepageProfileBlurb,
} from "@/content/homepage";
import { profile } from "@/content/profile";
import Link from "next/link";

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
          title="Profile"
          headingId="profile-proof-heading"
          kicker="Who I am · what the work proves"
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
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
              <p className="max-w-[60ch] text-text-dim">{homepageProfileBlurb}</p>
            </Reveal>

            <Reveal delay={0.12} className="mt-6">
              <p className="label-mono text-text-dim">
                {collaborationStrip.join(" · ")}
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-8">
              <Link
                href="/profile"
                className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                Full career narrative →
              </Link>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <RoboPhoto
                src="/images/about/kuka-teleop.jpg"
                alt="Nikolaos Giakoumidis crouching beside a KUKA LBR robotic arm he is teleoperating in the NYUAD CTP labs"
                tag="FIELD LOG"
                caption="TELEOPERATING A KUKA LBR — NYUAD CTP LABS"
                aspect="aspect-[3/2]"
                sizes="(max-width: 1024px) 100vw, 45vw"
                preload
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
