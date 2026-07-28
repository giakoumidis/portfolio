"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type GlitchTextProps = {
  text: string;
  className?: string;
  /** Replay the RGB-split burst on pointer enter. */
  glitchOnHover?: boolean;
};

/**
 * RGB-split glitch burst. Fires once when scrolled into view rather than
 * looping, which keeps it a punctuation mark instead of a distraction. The
 * keyframes run a single iteration and end hidden, so no timer is needed to
 * switch them back off.
 */
export default function GlitchText({
  text,
  className = "",
  glitchOnHover = true,
}: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const reduced = useReducedMotion();

  /** Re-arms the CSS animation; a reflow between the flips is what restarts it. */
  const replay = () => {
    const node = ref.current;
    if (!node || reduced) return;
    node.setAttribute("data-glitch", "off");
    void node.offsetWidth;
    node.setAttribute("data-glitch", "on");
  };

  return (
    <span
      ref={ref}
      data-text={text}
      data-glitch={inView && !reduced ? "on" : "off"}
      className={`glitch ${className}`}
      onMouseEnter={glitchOnHover ? replay : undefined}
    >
      {text}
    </span>
  );
}
