"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import GridHorizon from "./GridHorizon";
import RobotStage from "./RobotStage";
import HeroIntroSequence from "./HeroIntroSequence";
import NeonButton from "@/components/ui/NeonButton";
import { REVEAL_EASE } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

function Telemetry({
  className,
  rows,
}: {
  className: string;
  rows: [string, ReactNode][];
}) {
  return (
    <div className={`label-mono gap-1 text-text-dim ${className}`}>
      {rows.map(([key, value]) => (
        <p key={key}>
          <span className="text-grid">{key}</span> {value}
        </p>
      ))}
    </div>
  );
}

/** Simplified UAE mainland contour — stroke only, palette cyan. */
function UaeMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 70"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M90.5 4.8L70.7 23L63 26.3L56.1 32.8L50 39.7L43.3 40.3L24.8 37.3L12.2 41.3L5.4 33.3L6.5 38.8L24.8 59.8L71.8 65.2L79.8 47.8L78.2 42.2L88 40L84.2 25.2L89.8 28.2L94.6 23.9Z"
        className="stroke-cyan"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Abu Dhabi pin — matches LAT/LON telemetry */}
      <circle cx="58.9" cy="32" r="2.2" className="fill-cyan" />
      <circle
        cx="58.9"
        cy="32"
        r="4.5"
        className="stroke-cyan/50"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(reduced);
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");
  const systemLine = `// ${profile.location.toUpperCase()}`;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-svh scroll-mt-20 items-center overflow-hidden"
    >
      <GridHorizon />
      <RobotStage />

      {/*
        Scrim so the headline never fights the grid. On wide screens it sweeps
        in from the left, keeping the robots and grid exposed on the right; on
        narrow screens the copy spans the full width so it darkens vertically.
      */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,15,0.55)_0%,rgba(5,6,15,0.78)_28%,rgba(5,6,15,0.7)_55%,rgba(5,6,15,0.45)_100%)] sm:bg-[linear-gradient(100deg,rgba(5,6,15,0.95)_0%,rgba(5,6,15,0.86)_38%,rgba(5,6,15,0.3)_66%,transparent_88%)]"
      />

      <div className="absolute top-8 left-8 hidden items-center gap-3 lg:flex">
        <UaeMap className="h-10 w-[3.6rem] shrink-0 drop-shadow-[0_0_6px_rgb(0_240_255_/_0.45)]" />
        <Telemetry
          className="grid"
          rows={[
            ["LAT", "24.5233 N"],
            ["LON", "54.4341 E"],
          ]}
        />
      </div>
      <Telemetry
        className="absolute top-8 right-8 hidden justify-items-end text-right lg:grid"
        rows={[
          ["SINCE", "2009"],
          ["STATUS", <span key="status" className="glow-green">OPERATIONAL</span>],
        ]}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroIntroSequence
            systemLine={systemLine}
            firstName={firstName}
            lastName={lastName}
            onComplete={() => setIntroComplete(true)}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.6, ease: REVEAL_EASE }
          }
          className="mt-8 max-w-xl text-base text-text-dim sm:text-lg"
        >
          {profile.positioning}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.15, ease: REVEAL_EASE }
          }
          className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:max-w-3xl sm:flex-row sm:flex-wrap sm:items-center"
        >
          <NeonButton href="/map" className="w-full sm:w-auto">
            Explore the map
          </NeonButton>
          <NeonButton href="#selected-projects" className="w-full sm:w-auto">
            Selected projects
          </NeonButton>
          <NeonButton href="/cv.pdf" download className="w-full sm:w-auto">
            View CV
          </NeonButton>
          <a
            href="#contact"
            className="label-mono px-2 py-2 text-center text-text-dim transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:ml-2"
          >
            Contact
          </a>
        </motion.div>
      </div>

    </section>
  );
}
