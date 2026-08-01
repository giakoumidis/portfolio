import type { Metadata } from "next";
import Link from "next/link";

import RecordCardHero from "@/components/ui/RecordCardHero";
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
              <article className="flex h-full flex-col overflow-hidden border border-grid-dim bg-bg-raised/30 transition-colors hover:border-cyan/40">
                <RecordCardHero
                  video={item.video}
                  images={item.images}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="label-mono text-text-dim">
                    Laboratory
                    {item.period.label && (
                      <span className="ml-3">{item.period.label}</span>
                    )}
                  </p>
                  <h2 className="mt-3 font-display text-lg uppercase text-text">
                    <Link
                      href={`/laboratories/${item.slug}`}
                      className="transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  {item.org && (
                    <p className="mt-2 font-body text-sm text-text-dim">
                      {item.org}
                    </p>
                  )}
                  <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-text-dim">
                    {item.contributionSummary}
                  </p>
                  <p className="mt-5">
                    <Link
                      href={`/laboratories/${item.slug}`}
                      className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                    >
                      Open hub →
                    </Link>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </RouteChrome>
  );
}
