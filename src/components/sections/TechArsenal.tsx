"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { CHIP_BASE, CHIP_OFF, CHIP_ON } from "@/components/ui/ActionLink";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { stackGroups } from "@/content/stack";

const ALL = "all";

export default function TechArsenal() {
  const [active, setActive] = useState<string>(ALL);
  const reduced = useReducedMotion();

  const items = useMemo(
    () =>
      stackGroups.flatMap((group) =>
        active !== ALL && group.id !== active
          ? []
          : group.items.map((item) => ({
              key: `${group.id}:${item}`,
              item,
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
                    className={`${CHIP_BASE} cursor-pointer ${selected ? CHIP_ON : CHIP_OFF}`}
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
              {items.map(({ key, item }) => (
                <motion.span
                  key={key}
                  layout
                  /* States stay constant so server and client markup agree;
                     reduced motion collapses the duration instead. */
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: reduced ? 0 : 0.2 }}
                  className="keyword"
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
