"use client";

import type { ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  text: string;
  className?: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Seconds to wait after entering view before typing starts. */
  delay?: number;
  showCursor?: boolean;
  /** When false, nothing is rendered until this becomes true. */
  enabled?: boolean;
  /** Hide the cursor once typing finishes (terminal-style). */
  hideCursorWhenDone?: boolean;
  /** Milliseconds to wait after the last character before `onDone`. */
  pauseAfterDone?: number;
  renderTyped?: (typed: string) => ReactNode;
  onDone?: () => void;
};

export default function Typewriter({
  text,
  className = "",
  speed = 35,
  delay = 0,
  showCursor = true,
  enabled = true,
  hideCursorWhenDone = false,
  pauseAfterDone = 0,
  renderTyped,
  onDone,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Vertical-only inset: a negative horizontal margin would never match this
  // span before it has typed anything, since it starts only a cursor wide.
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const [doneFired, setDoneFired] = useState(false);

  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!enabled) {
      setStarted(false);
      setTyped(0);
      setDoneFired(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !inView || reduced) return;
    const timer = window.setTimeout(() => setStarted(true), delay * 1000);
    return () => window.clearTimeout(timer);
  }, [enabled, inView, reduced, delay]);

  useEffect(() => {
    if (!started || reduced) return;
    if (typed >= text.length) return;
    const timer = window.setTimeout(() => setTyped((c) => c + 1), speed);
    return () => window.clearTimeout(timer);
  }, [started, typed, text.length, speed, reduced]);

  useEffect(() => {
    if (!started || reduced || typed < text.length || doneFired) return;
    const timer = window.setTimeout(() => {
      setDoneFired(true);
      doneRef.current?.();
    }, pauseAfterDone);
    return () => window.clearTimeout(timer);
  }, [started, reduced, typed, text.length, pauseAfterDone, doneFired]);

  useEffect(() => {
    if (enabled && inView && reduced) {
      setDoneFired(true);
      doneRef.current?.();
    }
  }, [enabled, inView, reduced]);

  if (!enabled) return null;

  // Motion suppressed means the whole string is simply present.
  const count = reduced ? text.length : typed;
  const complete = count >= text.length;
  const typedText = text.slice(0, count);
  const cursorVisible =
    showCursor && !(hideCursorWhenDone && complete);

  return (
    <span ref={ref} className={className}>
      {/* Full string is present for assistive tech regardless of progress. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {renderTyped ? renderTyped(typedText) : typedText}
      </span>
      {cursorVisible && (
        <span
          aria-hidden
          className={`ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.1em] bg-current ${
            !complete ? "animate-blink" : ""
          }`}
        />
      )}
    </span>
  );
}
