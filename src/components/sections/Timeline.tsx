"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { education, experience } from "@/content/experience";
import type { Education, Role } from "@/lib/types";

/** The spine hugs the left edge on mobile and sits after the year gutter on wide screens. */
const SPINE_X = "left-0 lg:left-32";
const GUTTER = "lg:grid lg:grid-cols-[8rem_1fr]";

type OrgGroup = { org: string; period: string; roles: Role[] };

/**
 * Collapses consecutive roles at the same employer into one group so the four
 * NYUAD positions read as a single 2012–Present arc rather than four jobs.
 */
function groupByOrg(roles: Role[]): OrgGroup[] {
  const groups: OrgGroup[] = [];

  for (const role of roles) {
    const last = groups.at(-1);
    if (last && last.org === role.org) last.roles.push(role);
    else groups.push({ org: role.org, period: "", roles: [role] });
  }

  for (const group of groups) {
    const first = group.roles[0];
    const start = group.roles.at(-1)?.period.split("–")[0] ?? "";
    const end = first.period.split("–")[1] ?? first.period;
    group.period = group.roles.length > 1 ? `${start}–${end}` : first.period;
  }

  return groups;
}

/** A dot on the spine that ignites from dim to neon as it scrolls into view. */
function Node({
  accent = "cyan",
  large = false,
  lit,
}: {
  accent?: "cyan" | "violet";
  large?: boolean;
  lit: boolean;
}) {
  const color = accent === "cyan" ? "0, 240, 255" : "139, 92, 255";
  const size = large ? "h-3 w-3" : "h-2 w-2";

  return (
    <span
      aria-hidden
      className={`absolute top-2 -translate-x-1/2 rounded-full border transition-all duration-500 ${SPINE_X} ${size}`}
      style={{
        backgroundColor: lit ? `rgb(${color})` : "#0c0820",
        borderColor: lit ? `rgb(${color})` : "#2e2860",
        boxShadow: lit
          ? `0 0 6px rgba(${color}, 0.9), 0 0 16px rgba(${color}, 0.45)`
          : "none",
      }}
    />
  );
}

function RoleEntry({ role, isLast }: { role: Role; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const lit = useInView(ref, { once: true, margin: "-40% 0px -40% 0px" });

  return (
    <div
      id={role.id}
      ref={ref}
      className={`relative scroll-mt-24 pl-8 lg:scroll-mt-24 lg:pl-0 ${isLast ? "" : "pb-12"} ${GUTTER}`}
    >
      <Node lit={lit} />

      <div className="lg:pr-8 lg:text-right">
        <p
          className={`label-mono ${role.current ? "glow-amber" : "text-cyan"}`}
        >
          {role.period}
        </p>
        {role.location && (
          <p className="label-mono mt-1 text-text-dim">{role.location}</p>
        )}
      </div>

      <div className="mt-3 lg:mt-0 lg:pl-8">
        <h4 className="text-base text-text md:text-lg">{role.title}</h4>
        {role.unit && (
          <p className="label-mono mt-1 text-text-dim">{role.unit}</p>
        )}

        <ul className="mt-4 space-y-2">
          {role.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-3 text-sm text-text-dim md:text-[0.95rem]"
            >
              <span aria-hidden className="mt-[0.15rem] shrink-0 text-cyan/70">
                ▹
              </span>
              <span className="max-w-[68ch]">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EducationEntry({ item }: { item: Education }) {
  const ref = useRef<HTMLDivElement>(null);
  const lit = useInView(ref, { once: true, margin: "-40% 0px -40% 0px" });

  return (
    <div
      id={item.id}
      ref={ref}
      className={`relative scroll-mt-24 pb-12 pl-8 lg:scroll-mt-24 lg:pl-0 ${GUTTER}`}
    >
      <Node accent="violet" lit={lit} />

      <div className="lg:pr-8 lg:text-right">
        <p className="label-mono text-violet">{item.period}</p>
      </div>

      <div className="mt-3 lg:mt-0 lg:pl-8">
        <h4 className="text-base text-text md:text-lg">{item.degree}</h4>
        <p className="label-mono mt-1 text-text-dim">
          {item.institution} — {item.location}
        </p>
        {item.detail && (
          <p className="mt-3 max-w-[68ch] text-sm text-text-dim">
            {item.detail}
          </p>
        )}
      </div>
    </div>
  );
}

function GroupHeader({
  title,
  meta,
  accent = "cyan",
}: {
  title: string;
  meta?: string;
  accent?: "cyan" | "violet";
}) {
  return (
    <div className={`relative pb-8 pl-8 lg:pl-0 ${GUTTER}`}>
      <Node large accent={accent} lit />
      <div className="hidden lg:block" />
      <div className="lg:pl-8">
        <h3 className="text-lg text-text md:text-xl">{title}</h3>
        {meta && <p className="label-mono mt-1 text-text-dim">{meta}</p>}
      </div>
    </div>
  );
}

/** Animated career spine — experience groups + education. */
export function CareerTimeline() {
  const groups = groupByOrg(experience);
  const spineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 65%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={spineRef} className="relative">
      <div
        aria-hidden
        className={`absolute inset-y-0 w-px bg-grid-dim ${SPINE_X}`}
      />
      <motion.div
        aria-hidden
        className={`absolute inset-y-0 w-px origin-top bg-gradient-to-b from-cyan via-violet to-orange ${SPINE_X}`}
        style={{ scaleY: fill }}
      />

      <div className="space-y-16">
        {groups.map((group) => (
          <div key={group.org}>
            <GroupHeader
              title={group.org}
              meta={
                group.roles.length > 1
                  ? `${group.period} · ${group.roles.length} roles`
                  : group.period
              }
            />
            {group.roles.map((role, i) => (
              <RoleEntry
                key={role.id}
                role={role}
                isLast={i === group.roles.length - 1}
              />
            ))}
          </div>
        ))}

        <div>
          <GroupHeader title="Education" accent="violet" />
          {education.map((item) => (
            <EducationEntry key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

type TimelineProps = {
  /** Omit homepage section chrome when embedding on /profile. */
  embedded?: boolean;
};

export default function Timeline({ embedded = false }: TimelineProps) {
  if (embedded) {
    return <CareerTimeline />;
  }

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="section-shell">
        <SectionHeading
          index="02"
          title="Experience"
          headingId="experience-heading"
          kicker="Career & education"
        />
        <CareerTimeline />
      </div>
    </section>
  );
}
