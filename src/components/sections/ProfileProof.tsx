import Link from "next/link";

import ProfilePhotoCycle from "@/components/ui/ProfilePhotoCycle";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { homepageProfileBlurb } from "@/content/homepage";
import { profile } from "@/content/profile";
import { getProfilePhotoGroups } from "@/lib/profile-photos";

export default function ProfileProof() {
  const photoGroups = getProfilePhotoGroups();

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

          <Reveal delay={0.2} className="mt-10">
            <ProfilePhotoCycle groups={photoGroups} />
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
