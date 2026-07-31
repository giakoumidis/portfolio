import type { Metadata } from "next";
import Link from "next/link";

import RouteChrome from "@/components/work/RouteChrome";
import { getAllInfrastructure } from "@/lib/query";
import { siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: `Laboratories — ${siteTitle}`,
  description:
    "Laboratories and research facilities established, commissioned, or operated — with connected work generated from typed relationships.",
  alternates: { canonical: "/laboratories" },
};

export default function LaboratoriesIndexPage() {
  const items = getAllInfrastructure();

  return (
    <RouteChrome active="laboratories">
      <div className="section-shell py-16 lg:py-24">
        <p className="label-mono text-cyan">
          02 <span className="text-text-dim">{"//"} Laboratories</span>
        </p>
        <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
          Laboratories
        </h1>
        <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
          Laboratories and platforms as first-class hubs. Connected projects are
          generated from typed relationships — not folder trees.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/laboratories/${item.slug}`}
                className="flex h-full flex-col border border-grid-dim bg-bg-raised/30 p-5 transition-colors hover:border-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                <p className="label-mono text-text-dim">
                  Laboratory
                  {item.period.label && (
                    <span className="ml-3">{item.period.label}</span>
                  )}
                </p>
                <h2 className="mt-3 font-display text-lg uppercase text-text">
                  {item.title}
                </h2>
                <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-text-dim">
                  {item.contributionSummary}
                </p>
                <p className="label-mono mt-5 text-cyan">Open hub →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </RouteChrome>
  );
}
