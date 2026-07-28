"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { stackGroups } from "@/content/stack";

const ALL = "all";

/** One tint per group, cycled by position so each family stays readable in the ALL view. */
const GROUP_TINTS = [
  "border-cyan/20 hover:border-cyan/50 hover:text-cyan",
  "border-magenta/20 hover:border-magenta/50 hover:text-magenta",
  "border-orange/20 hover:border-orange/50 hover:text-orange",
  "border-violet/20 hover:border-violet/50 hover:text-violet",
  "border-pink/20 hover:border-pink/50 hover:text-pink",
  "border-blue/20 hover:border-blue/50 hover:text-blue",
  "border-yellow/20 hover:border-yellow/50 hover:text-yellow",
  "border-green/20 hover:border-green/50 hover:text-green",
] as const;

const NEUTRAL_TINT = "border-grid-dim hover:border-cyan/50 hover:text-cyan";

const FILTER_BASE =
  "label-mono cursor-pointer border px-4 py-2 transition-all duration-200";
const FILTER_ACTIVE = "panel-glow-cyan border-cyan/60 bg-cyan/10 text-cyan";
const FILTER_IDLE = "border-grid-dim text-text-dim hover:border-grid hover:text-text";

export default function TechArsenal() {
  const [active, setActive] = useState<string>(ALL);
  const reduced = useReducedMotion();

  const items = useMemo(
    () =>
      stackGroups.flatMap((group, groupIndex) =>
        active !== ALL && group.id !== active
          ? []
          : group.items.map((item) => ({
              key: `${group.id}:${item}`,
              item,
              tint:
                active === ALL
                  ? GROUP_TINTS[groupIndex % GROUP_TINTS.length]
                  : NEUTRAL_TINT,
            })),
      ),
    [active],
  );

  return (
    <section id="arsenal" aria-labelledby="arsenal-heading">
      <div className="section-shell">
        <SectionHeading
          index="06"
          title="Stack"
          headingId="arsenal-heading"
          kicker="Tools & platforms"
        />

        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Filter arsenal by category"
              className="flex flex-wrap gap-3"
            >
              {[{ id: ALL, label: "All" }, ...stackGroups].map((group) => {
                const selected = active === group.id;

                return (
                  <button
                    key={group.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(group.id)}
                    className={`${FILTER_BASE} ${selected ? FILTER_ACTIVE : FILTER_IDLE}`}
                  >
                    {group.label}
                  </button>
                );
              })}
            </div>

            <p aria-live="polite" className="label-mono ml-auto text-text-dim">
              {items.length} Items
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map(({ key, item, tint }) => (
                <motion.span
                  key={key}
                  layout
                  /* States stay constant so server and client markup agree;
                     reduced motion collapses the duration instead. */
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: reduced ? 0 : 0.2 }}
                  className={`label-mono border px-3 py-1.5 text-text-dim transition-colors duration-200 ${tint}`}
                >
                  {item}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
