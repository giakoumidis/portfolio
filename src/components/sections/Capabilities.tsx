import HudCard, { type Accent } from "@/components/ui/HudCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { capabilities } from "@/content/capabilities";
import { getAllInfrastructure, getAllWork } from "@/lib/query";

const ACCENT_CYCLE = [
  "cyan",
  "magenta",
  "orange",
  "violet",
  "pink",
  "blue",
] as const satisfies readonly Accent[];

const ACCENT_TEXT: Record<Accent, string> = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  violet: "text-violet",
  amber: "text-amber",
  orange: "text-orange",
  yellow: "text-yellow",
  pink: "text-pink",
  blue: "text-blue",
  green: "text-green",
};

/** Prefer Laboratories when a domain has a facility hub (e.g. HTS under Lab Automation). */
function relatedHref(
  domainId: string,
): { href: string; label: string } | null {
  const hasLab = getAllInfrastructure().some((item) =>
    item.domains.includes(domainId),
  );
  if (hasLab) {
    return {
      href: `/?domain=${domainId}#laboratories`,
      label: "View related laboratories →",
    };
  }
  const hasWork = getAllWork().some((item) =>
    item.facets.domains.includes(domainId),
  );
  if (hasWork) {
    return {
      href: `/projects?domain=${domainId}`,
      label: "View related work →",
    };
  }
  return null;
}

export default function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading">
      <div className="section-shell">
        <SectionHeading
          index="03"
          title="Skills"
          headingId="capabilities-heading"
          kicker="What I work on"
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => {
            const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
            const related = relatedHref(capability.id);

            return (
              <Reveal
                as="li"
                key={capability.id}
                delay={i * 0.08}
                className="h-full scroll-mt-20 lg:scroll-mt-8"
              >
                <div id={capability.id} className="h-full">
                  <HudCard accent={accent} className="flex h-full flex-col p-6">
                    <p className={`label-mono ${ACCENT_TEXT[accent]}`}>
                      [{String(i + 1).padStart(2, "0")}]
                    </p>

                    <h3 className="mt-4 text-lg text-text">
                      {capability.title}
                    </h3>

                    <p className="mt-3 font-body text-sm leading-relaxed text-text-dim">
                      {capability.blurb}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {capability.tags.map((tag) => (
                        <span
                          key={tag}
                          className="label-mono border border-grid-dim px-2 py-1 text-text-dim"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {related && (
                      <a
                        href={related.href}
                        className={`label-mono mt-auto pt-6 transition-colors duration-200 hover:underline hover:underline-offset-4 ${ACCENT_TEXT[accent]}`}
                      >
                        {related.label}
                      </a>
                    )}
                  </HudCard>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
