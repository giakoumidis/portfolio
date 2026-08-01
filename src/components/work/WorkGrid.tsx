import Link from "next/link";

import RecordCardHero from "@/components/ui/RecordCardHero";
import TaxonomyChip from "@/components/work/TaxonomyChip";
import { taxonomyLabel } from "@/content/taxonomy";
import type { ProjectRecord } from "@/lib/types";

type WorkGridProps = {
  items: ProjectRecord[];
};

export default function WorkGrid({ items }: WorkGridProps) {
  if (items.length === 0) {
    return (
      <div className="border border-grid-dim bg-bg-raised/40 p-8 text-center">
        <p className="font-body text-text-dim">
          No projects match these filters.
        </p>
        <Link
          href="/projects"
          className="label-mono mt-4 inline-block text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          Clear filters →
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => {
        const chips = [
          ...(item.facets.domains.slice(0, 1).map((slug) => ({
            slug,
            label: taxonomyLabel(slug),
            href: `/projects?domain=${slug}`,
            prefix: "DOMAIN",
          }))),
          ...(item.facets.applications?.slice(0, 1).map((slug) => ({
            slug,
            label: taxonomyLabel(slug),
            href: `/projects?application=${slug}`,
            prefix: "APP",
          })) ?? []),
          ...(item.facets.platforms?.slice(0, 1).map((slug) => ({
            slug,
            label: taxonomyLabel(slug),
            href: `/projects?platform=${slug}`,
            prefix: "PLATFORM",
          })) ?? []),
        ].slice(0, 3);

        return (
          <li key={item.slug}>
            <article className="flex h-full flex-col overflow-hidden border border-grid-dim bg-bg-raised/30 transition-colors hover:border-cyan/40">
              <RecordCardHero video={item.video} images={item.images} />
              <div className="flex flex-1 flex-col p-5">
                <p className="label-mono text-text-dim">
                  Case File
                  {item.period.label && (
                    <span className="ml-3">{item.period.label}</span>
                  )}
                </p>
                <h3 className="mt-3 text-lg text-text">
                  <Link
                    href={`/projects/${item.slug}`}
                    className="transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                  >
                    {item.title}
                  </Link>
                </h3>
                {item.org && (
                  <p className="mt-2 font-body text-sm text-text-dim">
                    {item.org}
                  </p>
                )}
                <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-text-dim">
                  {item.contributionSummary}
                </p>
                {chips.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <TaxonomyChip
                        key={`${chip.prefix}-${chip.slug}`}
                        label={chip.label}
                        href={chip.href}
                        prefix={chip.prefix}
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
