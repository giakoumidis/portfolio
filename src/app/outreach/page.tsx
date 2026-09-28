import type { Metadata } from "next";
import Link from "next/link";

import ActionLink from "@/components/ui/ActionLink";
import HudCard from "@/components/ui/HudCard";
import RouteChrome from "@/components/work/RouteChrome";
import {
  getOutreachByAudience,
  outreachAudiences,
  outreachIntro,
} from "@/content/outreach";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Outreach — Nikolaos Giakoumidis",
  description:
    "Substantiated industry engagement in robotics and AI — field work, demonstrations, proposals, visits, and showcases — and sessions with students and the public.",
  path: "/outreach",
});

export default function OutreachPage() {
  const industryCount = getOutreachByAudience("industry").length;

  return (
    <RouteChrome>
      <div className="section-shell py-16 lg:py-24">
        <p className="label-mono text-cyan">Outreach/</p>
        <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
          Outreach
        </h1>
        <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
          {outreachIntro}
        </p>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
          Where a technical record exists, the engagement links to its{" "}
          <Link
            href="/projects"
            className="text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            project
          </Link>{" "}
          or{" "}
          <Link
            href="/laboratories"
            className="text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            laboratory
          </Link>
          . Those pages link back here, and the same connections are in search.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {outreachAudiences.map((audience) => {
            const count = getOutreachByAudience(audience.id).length;
            return (
              <li key={audience.id}>
                <HudCard accent="magenta" className="flex h-full flex-col p-6">
                  <h2 className="font-display text-base uppercase text-text">
                    {audience.title}
                  </h2>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-text-dim">
                    {audience.purpose}
                  </p>
                  {count > 0 && (
                    <p className="label-mono mt-4 text-text-dim">
                      <span className="text-cyan">{count}</span> on record
                    </p>
                  )}
                  <p className="mt-5">
                    <ActionLink href={`/outreach/${audience.id}`}>
                      Explore {audience.title.toLowerCase()}
                    </ActionLink>
                  </p>
                </HudCard>
              </li>
            );
          })}
        </ul>

        {industryCount > 0 && (
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-grid-dim pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="label-mono text-text-dim">
                <span className="text-cyan">{industryCount}</span> industry
                engagements on record
              </p>
              <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-text-dim">
                Field work, demonstrations, proposals, visits, and showcases —
                with proposals and visits labeled as such.
              </p>
            </div>
            <ActionLink href="/outreach/industry" className="shrink-0">
              Explore industry
            </ActionLink>
          </div>
        )}
      </div>
    </RouteChrome>
  );
}
