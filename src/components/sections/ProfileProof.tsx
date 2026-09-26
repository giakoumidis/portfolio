import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { homepageProfileBlurb } from "@/content/homepage";

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
          kicker="Engineering depth · technical leadership"
        />

        <div className="max-w-3xl">
          <Reveal>
            <RoboPhoto
              src="/images/about/kuka-teleop.jpg"
              alt="Nikolaos Giakoumidis crouching beside a KUKA LBR robotic arm he is teleoperating in the NYUAD CTP labs"
              tag="FIELD LOG"
              caption="TELEOPERATING A KUKA LBR — NYUAD CTP LABS"
              aspect="aspect-[3/2]"
              sizes="(max-width: 1024px) 100vw, 36rem"
              preload
              className="max-w-xl border border-grid-dim"
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <p className="max-w-[60ch] text-text-dim">{homepageProfileBlurb}</p>
          </Reveal>

          <Reveal delay={0.12} className="mt-8">
            <Link
              href="/profile"
              className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Experience & background →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
