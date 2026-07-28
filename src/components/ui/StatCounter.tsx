"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

export default function StatCounter({
  value,
  label,
  prefix,
  suffix,
  durationMs = 1200,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduced = useReducedMotion();
  const [tweened, setTweened] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / durationMs, 1);
      // Ease-out cubic: fast arrival, gentle settle.
      const eased = 1 - Math.pow(1 - t, 3);
      setTweened(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, durationMs]);

  // With motion suppressed the figure is content, not an effect, so it reads
  // its final value straight away instead of waiting to be scrolled past.
  const shown = reduced ? value : tweened;

  return (
    <div ref={ref} className="px-5 py-6">
      <p className="font-mono text-3xl font-bold tracking-tight">
        {prefix && <span className="text-text-dim">{prefix}</span>}
        <span className="glow-cyan">{shown}</span>
        {suffix && <span className="text-text-dim">{suffix}</span>}
      </p>
      <p className="label-mono mt-2 text-text-dim">{label}</p>
    </div>
  );
}
