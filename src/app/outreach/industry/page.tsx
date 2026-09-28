import type { Metadata } from "next";
import Link from "next/link";

import { IndustryRecord } from "@/components/outreach/OutreachEntries";
import RouteChrome from "@/components/work/RouteChrome";
import {
  getOutreachByAudience,
  outreachAudiences,
} from "@/content/outreach";
import { buildPageMetadata } from "@/lib/seo";

const audience = outreachAudiences.find((item) => item.id === "industry")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Industry Outreach — Nikolaos Giakoumidis",
  description: audience.purpose,
  path: "/outreach/industry",
});

export default function IndustryOutreachPage() {
  const count = getOutreachByAudience("industry").length;

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
          /Industry/
        </p>
        <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
          Industry
        </h1>
        <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
          {audience.purpose}
        </p>
        <p className="label-mono mt-4 text-text-dim">
          <span className="text-cyan">{count}</span> on record
        </p>
        <IndustryRecord />
      </div>
    </RouteChrome>
  );
}
