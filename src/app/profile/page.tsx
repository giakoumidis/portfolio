import type { Metadata } from "next";
import Link from "next/link";

import Timeline from "@/components/sections/Timeline";
import AwardCard from "@/components/ui/AwardCard";
import CertThumb from "@/components/ui/CertThumb";
import HudCard from "@/components/ui/HudCard";
import { awards, certifications } from "@/content/awards";
import { careerEras } from "@/content/career-eras";
import { exhibitions } from "@/content/exhibitions";
import { profile } from "@/content/profile";
import { getInfrastructure, getProject } from "@/lib/query";
import { siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: `Profile — ${siteTitle}`,
  description:
    "Career narrative, roles, education, expertise, and commercialization leadership — with links into the portfolio graph.",
  alternates: { canonical: "/profile" },
};

export default function ProfilePage() {
  return (
    <main className="section-shell py-16 lg:py-24">
      <p className="label-mono text-cyan">
        Profile <span className="text-text-dim">{"//"} Career narrative</span>
      </p>
      <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
        {profile.name}
      </h1>
      <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
      <p className="mt-6 max-w-3xl font-body text-sm leading-relaxed text-text-dim">
        {profile.positioning}
      </p>

      <section className="mt-12">
        <h2 className="font-display text-lg uppercase text-text">Summary</h2>
        <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-text-dim">
          {profile.summary}
        </p>
        <p className="mt-4 label-mono text-magenta">
          {profile.currentRole.title}
          <span className="mt-1 block text-text-dim">{profile.currentRole.org}</span>
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-lg uppercase text-text">
          Career trajectory
        </h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-text-dim">
          Four eras spanning early robotics research through commercialization
          leadership — with links into project and laboratory hubs.
        </p>

        <ul className="mt-8 grid gap-5 lg:grid-cols-2">
          {careerEras.map((era) => (
            <li key={era.id}>
              <HudCard accent="cyan" className="flex h-full flex-col p-6">
                <p className="label-mono text-cyan">{era.years}</p>
                <h3 className="mt-3 text-base text-text">{era.label}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-dim">
                  {era.summary}
                </p>

                {(era.relatedWorkSlugs.length > 0 ||
                  (era.relatedLabSlugs?.length ?? 0) > 0) && (
                  <div className="mt-5 space-y-2 border-t border-grid-dim pt-4">
                    {era.relatedWorkSlugs.slice(0, 3).map((slug) => {
                      const project = getProject(slug);
                      if (!project) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/projects/${slug}`}
                          className="label-mono block text-sm text-text-dim transition-colors hover:text-cyan"
                        >
                          {project.title} →
                        </Link>
                      );
                    })}
                    {era.relatedLabSlugs?.map((slug) => {
                      const lab = getInfrastructure(slug);
                      if (!lab) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/laboratories/${slug}`}
                          className="label-mono block text-sm text-text-dim transition-colors hover:text-cyan"
                        >
                          {lab.title} →
                        </Link>
                      );
                    })}
                  </div>
                )}
              </HudCard>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="experience-education-heading">
        <h2
          id="experience-education-heading"
          className="font-display text-lg uppercase text-text"
        >
          Experience & education
        </h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-text-dim">
          Full role history and education along the career spine.
        </p>
        <div className="mt-10">
          <Timeline embedded />
        </div>
      </section>

      <section id="awards" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-lg uppercase text-text">Awards</h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-text-dim">
          First-prize competition wins — with deployment video or ceremony
          photography where available.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {awards.map((award) => (
            <li key={award.id}>
              <AwardCard award={award} detailed />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-lg uppercase text-text">Exhibitions</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exhibitions.map((exhibition) => (
            <li key={exhibition.id}>
              <HudCard accent="magenta" className="h-full p-6">
                <p className="label-mono text-magenta">
                  {exhibition.period} · {exhibition.year}
                </p>
                <h3 className="mt-3 text-base text-text">
                  {exhibition.link ? (
                    <a
                      href={exhibition.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-cyan"
                    >
                      {exhibition.name}
                    </a>
                  ) : (
                    exhibition.name
                  )}
                </h3>
                <p className="mt-2 text-sm text-text-dim">{exhibition.role}</p>
                {exhibition.location && (
                  <p className="label-mono mt-4 text-text-dim">
                    {exhibition.location}
                  </p>
                )}
              </HudCard>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-lg uppercase text-text">
          Certifications
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((certification) => (
            <li
              key={certification.id}
              className="flex gap-3 border-l border-grid-dim pl-4"
            >
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
                <p className="label-mono mt-1 text-cyan">{certification.year}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border border-grid-dim bg-bg-raised/20 p-6">
        <h2 className="font-display text-lg uppercase text-text">Documents</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/cv.pdf"
            download
            className="label-mono border border-cyan/50 px-5 py-3 text-cyan transition-all hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            Download CV →
          </Link>
          <Link
            href="/#contact"
            className="label-mono border border-grid-dim px-5 py-3 text-text-dim transition-all hover:border-cyan/40 hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            Contact →
          </Link>
        </div>
      </section>
    </main>
  );
}
