"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

const SPEED_MS = 35;
const LINE_PAUSE_MS = 280;
const LINE_COUNT = 4;

type HeroIntroSequenceProps = {
  systemLine: string;
  firstName: string;
  lastName: string;
  onComplete: () => void;
};

function Cursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.1em] bg-current animate-blink"
    />
  );
}

function SystemLine({ text, cursor }: { text: string; cursor: boolean }) {
  return (
    <p className="label-mono text-cyan">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        <span className="text-text-dim">{text.slice(0, 2)}</span>
        {text.slice(2)}
      </span>
      <Cursor visible={cursor} />
    </p>
  );
}

function NameLine({
  text,
  cursor,
}: {
  text: string;
  cursor: boolean;
}) {
  return (
    <span className="glow-cyan">
      <span className="sr-only">{text}</span>
      <span aria-hidden>{text}</span>
      <Cursor visible={cursor} />
    </span>
  );
}

function Tagline({ text, cursor }: { text: string; cursor: boolean }) {
  return (
    <p className="label-mono mt-5 text-pink">
      <span className="sr-only">{text}</span>
      <span aria-hidden>{text}</span>
      <Cursor visible={cursor} />
    </p>
  );
}

export default function HeroIntroSequence({
  systemLine,
  firstName,
  lastName,
  onComplete,
}: HeroIntroSequenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const reduced = useReducedMotion();

  const lines = useRef([
    systemLine,
    firstName.toUpperCase(),
    lastName.toUpperCase(),
    profile.tagline,
  ]).current;

  const completeRef = useRef(onComplete);
  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setFinished(true);
      completeRef.current();
    }
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced) return;
    setStarted(true);
  }, [inView, reduced]);

  useEffect(() => {
    if (!started || finished || reduced) return;

    const current = lines[lineIndex] ?? "";

    if (charIndex < current.length) {
      const timer = window.setTimeout(() => setCharIndex((c) => c + 1), SPEED_MS);
      return () => window.clearTimeout(timer);
    }

    if (lineIndex >= LINE_COUNT - 1) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setFinished(true);
        completeRef.current();
      }
      return;
    }

    const timer = window.setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, LINE_PAUSE_MS);
    return () => window.clearTimeout(timer);
  }, [started, finished, reduced, lineIndex, charIndex, lines]);

  const slice = (index: number) => {
    const full = lines[index] ?? "";
    if (reduced || finished || lineIndex > index) return full;
    if (lineIndex < index) return "";
    return full.slice(0, charIndex);
  };

  const cursorOn = (index: number) =>
    !reduced &&
    !finished &&
    lineIndex === index &&
    charIndex < (lines[index]?.length ?? 0);

  if (reduced || finished) {
    return (
      <div ref={ref}>
        <SystemLine text={lines[0] ?? ""} cursor={false} />
        <h1 className="mt-6 flex flex-col text-[clamp(2.4rem,6.5vw,5.25rem)] font-semibold leading-[0.95]">
          <NameLine text={lines[1] ?? ""} cursor={false} />
          <NameLine text={lines[2] ?? ""} cursor={false} />
        </h1>
        <Tagline text={lines[3] ?? ""} cursor={false} />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <SystemLine text={slice(0)} cursor={cursorOn(0)} />
      <h1 className="mt-6 flex flex-col text-[clamp(2.4rem,6.5vw,5.25rem)] font-semibold leading-[0.95]">
        {(lineIndex >= 1 || slice(1).length > 0) && (
          <NameLine text={slice(1)} cursor={cursorOn(1)} />
        )}
        {(lineIndex >= 2 || slice(2).length > 0) && (
          <NameLine text={slice(2)} cursor={cursorOn(2)} />
        )}
      </h1>
      {(lineIndex >= 3 || slice(3).length > 0) && (
        <Tagline text={slice(3)} cursor={cursorOn(3)} />
      )}
    </div>
  );
}
