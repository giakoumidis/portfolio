"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ProjectCards from "@/components/sections/ProjectCards";
import { CHIP_BASE, CHIP_OFF, CHIP_ON } from "@/components/ui/ActionLink";
import Reveal from "@/components/ui/Reveal";
import { taxonomyLabel } from "@/content/taxonomy";
import type { Project } from "@/lib/types";

const ALL = "all";

type FilteredProjectCardsProps = {
  items: Project[];
  /** Accessible name for the chip group. */
  ariaLabel: string;
  recordBasePath?: "/projects" | "/laboratories";
};

function itemDomainIds(item: Project): string[] {
  return item.domainIds?.length ? item.domainIds : [item.domainId];
}

function domainOptions(items: Project[]) {
  const map = new Map<string, string>();
  for (const item of items) {
    for (const id of itemDomainIds(item)) {
      if (!map.has(id)) {
        map.set(
          id,
          id === item.domainId ? item.domainLabel : taxonomyLabel(id),
        );
      }
    }
  }
  return [...map.entries()].map(([id, label]) => ({ id, label }));
}

export default function FilteredProjectCards({
  items,
  ariaLabel,
  recordBasePath,
}: FilteredProjectCardsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const domains = useMemo(() => domainOptions(items), [items]);

  const activeParam = searchParams.get("domain");
  const active =
    activeParam && domains.some((domain) => domain.id === activeParam)
      ? activeParam
      : ALL;

  const filtered = useMemo(
    () =>
      active === ALL
        ? items
        : items.filter((item) => itemDomainIds(item).includes(active)),
    [active, items],
  );

  function setDomain(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === ALL) params.delete("domain");
    else params.set("domain", next);

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  // Single-domain lists still get an All chip so the filter chrome stays consistent
  // when content grows, and so ?domain= deep links can be cleared in-place.
  const showFilter = domains.length > 0;

  return (
    <div>
      {showFilter && (
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label={ariaLabel}
              className="flex flex-wrap gap-3"
            >
              {[{ id: ALL, label: "All" }, ...domains].map((domain) => {
                const selected = active === domain.id;

                return (
                  <button
                    key={domain.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDomain(domain.id)}
                    className={`${CHIP_BASE} cursor-pointer ${selected ? CHIP_ON : CHIP_OFF}`}
                  >
                    {domain.label}
                  </button>
                );
              })}
            </div>

            <p aria-live="polite" className="label-mono ml-auto text-text-dim">
              {filtered.length} Item{filtered.length === 1 ? "" : "s"}
            </p>
          </div>
        </Reveal>
      )}

      {filtered.length === 0 ? (
        <p className="font-mono text-sm text-text-dim">
          No items in this domain.{" "}
          <button
            type="button"
            onClick={() => setDomain(ALL)}
            className="text-cyan underline-offset-4 hover:underline"
          >
            Show all
          </button>
        </p>
      ) : (
        <ProjectCards items={filtered} recordBasePath={recordBasePath} />
      )}
    </div>
  );
}
