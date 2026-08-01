import type { Metadata } from "next";

import PortfolioMap from "@/components/map/PortfolioMap";
import { siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: `Portfolio Map — ${siteTitle}`,
  description:
    "Navigable portfolio map connecting work, laboratories, research, career, recognition, and archive evidence.",
  alternates: { canonical: "/map" },
};

export default function MapPage() {
  return (
    <main className="section-shell py-16 lg:py-24">
      <p className="label-mono text-cyan">
        Map <span className="text-text-dim">{"//"} Portfolio graph</span>
      </p>
      <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
        Portfolio Map
      </h1>
      <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
      <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
        Explore how work, laboratories, research, career periods, recognition,
        and archive records connect. Hover to highlight relationships; select a
        hub for local detail, then open the destination. On mobile, drill down
        one hub at a time.
      </p>
      <div className="mt-12">
        <PortfolioMap variant="full" />
      </div>
    </main>
  );
}
