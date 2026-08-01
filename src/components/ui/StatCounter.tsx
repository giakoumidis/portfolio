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

/**
 * Server-renders the final verified value so crawlers / no-JS readers see real
 * numbers. Count-up is progressive enhancement after hydration + in-view.
 */
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
  // Initial state = final value so SSR HTML contains real metrics.
  const [shown, setShown] = useState(value);
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || reduced || animated.current) return;
    animated.current = true;

    let frame = 0;
    let start: number | null = null;
    setShown(0);

    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, durationMs]);

  useEffect(() => {
    if (reduced) setShown(value);
  }, [reduced, value]);

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
