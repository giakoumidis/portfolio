"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay, used to stagger siblings by ~0.08s steps. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * The single entrance animation used across every section, so the whole page
 * shares one motion signature. Collapses to a plain fade when the visitor
 * asks for reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      /*
        The initial and target states must not depend on `reduced`: it resolves
        to false during SSR and to true on the client for visitors who ask for
        reduced motion, which would hydrate a mismatched inline style. Motion is
        suppressed by collapsing the duration instead.
      */
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : delay,
        ease: REVEAL_EASE,
      }}
    >
      {children}
    </MotionTag>
  );
}
