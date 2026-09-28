import type { Metadata } from "next";
import Link from "next/link";

import { SocietyRecord } from "@/components/outreach/OutreachEntries";
import RouteChrome from "@/components/work/RouteChrome";
import {
  getOutreachByAudience,
  outreachAudiences,
  societyIntro,
} from "@/content/outreach";
import { buildPageMetadata } from "@/lib/seo";

const audience = outreachAudiences.find((item) => item.id === "society")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Society Outreach — Nikolaos Giakoumidis",
  description: societyIntro,
  path: "/outreach/society",
});

export default function SocietyOutreachPage() {
  const entries = getOutreachByAudience("society");

  return (
    <RouteChrome>
      <div className="section-shell py-16 lg:py-24">
        <p className="label-mono text-cyan">
          <Link
            href="/outreach"
            className="transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            Outreach
          </Link>
          /Society/
        </p>
        <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
          Society
        </h1>
        <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
          {societyIntro}
        </p>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
          {audience.purpose}
        </p>
        {entries.length > 0 && (
          <p className="label-mono mt-4 text-text-dim">
            <span className="text-cyan">{entries.length}</span> on record
          </p>
        )}
        <SocietyRecord entries={entries} />
      </div>
    </RouteChrome>
  );
}
