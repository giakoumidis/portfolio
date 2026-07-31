"use client";

import { useEffect, useState } from "react";

import HudCard from "@/components/ui/HudCard";
import NeonButton from "@/components/ui/NeonButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Typewriter from "@/components/ui/Typewriter";
import { profile, socialLinks } from "@/content/profile";

const SHELL_USER = "nikolaos";
const SHELL_HOST = "portfolio";
const SHELL_CWD = "~";
const WHOAMI = "whoami";
const LINK_STAGGER_MS = 80;

/** Ubuntu's stock PS1, decorative: the command itself is announced by Typewriter. */
function Prompt() {
  return (
    <span aria-hidden className="shrink-0 whitespace-pre">
      <span className="text-term-green">
        {SHELL_USER}@{SHELL_HOST}
      </span>
      <span className="text-text-dim">:</span>
      <span className="text-term-blue">{SHELL_CWD}</span>
      <span className="text-text-dim">$ </span>
    </span>
  );
}

/** Minimise / maximise / close, drawn right-aligned as GNOME Shell places them. */
function WindowControls() {
  const glyph = "h-3 w-3 text-text-dim";

  return (
    <span aria-hidden className="ml-auto flex shrink-0 items-center gap-2">
      <svg viewBox="0 0 12 12" className={glyph} fill="none" stroke="currentColor">
        <path d="M2.5 9h7" />
      </svg>
      <svg viewBox="0 0 12 12" className={glyph} fill="none" stroke="currentColor">
        <path d="M2.5 2.5h7v7h-7z" />
      </svg>
      <svg viewBox="0 0 12 12" className={glyph} fill="none" stroke="currentColor">
        <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
      </svg>
    </span>
  );
}

function CopyEmailButton({
  email,
  targetId,
  revealed,
}: {
  email: string;
  targetId: string;
  revealed: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback for older browsers / denied clipboard permission.
      const range = document.createRange();
      const node = document.getElementById(targetId);
      if (!node) return;
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      disabled={!revealed}
      tabIndex={revealed ? undefined : -1}
      className="label-mono shrink-0 border border-cyan/40 px-2.5 py-1 text-xs text-cyan transition-colors duration-200 hover:bg-cyan/10"
      aria-label={copied ? "Email copied" : `Copy ${email}`}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}

function ContactEmailRow({
  email,
  id,
  animate,
  onDone,
}: {
  email: string;
  id: string;
  /** When true, type the address; when false, show it fully (already revealed). */
  animate: boolean;
  onDone?: () => void;
}) {
  const [done, setDone] = useState(!animate);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        id={id}
        href={`mailto:${email}`}
        tabIndex={done ? undefined : -1}
        className="select-all text-cyan transition-colors duration-200 hover:underline hover:underline-offset-4"
      >
        {animate && !done ? (
          <Typewriter
            text={email}
            showCursor
            hideCursorWhenDone
            pauseAfterDone={120}
            speed={28}
            className="text-cyan"
            onDone={() => {
              setDone(true);
              onDone?.();
            }}
          />
        ) : (
          email
        )}
      </a>
      <CopyEmailButton email={email} targetId={id} revealed={done} />
    </div>
  );
}

type Line = 0 | 1 | 2 | 3 | 4;

export default function Contact() {
  const [line, setLine] = useState<Line>(0);
  const [linksShown, setLinksShown] = useState(0);
  const linksPhase = line >= 4;
  const sequenceDone = linksPhase && linksShown >= socialLinks.length;

  useEffect(() => {
    if (!linksPhase || linksShown >= socialLinks.length) return;
    const delay = linksShown === 0 ? 0 : LINK_STAGGER_MS;
    const timer = window.setTimeout(
      () => setLinksShown((n) => n + 1),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [linksPhase, linksShown]);

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="section-shell">
        <SectionHeading
          index="13"
          title="Contact"
          headingId="contact-heading"
          kicker="Get in touch"
        />

        <Reveal>
          <HudCard accent="cyan">
            <div className="relative flex items-center justify-between border-b border-grid-dim bg-bg-raised/70 px-4 py-2.5">
              {/* GNOME Terminal's new-tab button sits at the leading edge. */}
              <span
                aria-hidden
                className="hidden font-mono text-sm text-text-dim sm:block"
              >
                +
              </span>
              <span className="absolute left-1/2 max-w-[70%] -translate-x-1/2 truncate font-mono text-sm text-text-dim">
                {SHELL_USER}@{SHELL_HOST}: {SHELL_CWD}
              </span>
              <WindowControls />
            </div>

            <div className="space-y-3 p-4 font-mono text-sm sm:p-6 sm:text-base">
              <p className="flex">
                <Prompt />
                <Typewriter
                  text={WHOAMI}
                  showCursor
                  hideCursorWhenDone
                  pauseAfterDone={280}
                  className="text-text"
                  onDone={() => setLine(1)}
                />
              </p>

              {line >= 1 && (
                <p className="text-text">
                  <Typewriter
                    text={profile.name}
                    showCursor
                    hideCursorWhenDone
                    pauseAfterDone={280}
                    className="text-text"
                    onDone={() => setLine(2)}
                  />
                </p>
              )}

              {/*
                Always mount contact links so SSR / crawlers / a11y trees see them.
                Humans still get the terminal reveal: they stay sr-only until the
                typewriter sequence reaches them.
              */}
              <div className={line >= 2 ? "space-y-2" : "sr-only"}>
                {line < 2 ? (
                  <>
                    <a id="contact-email" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    <a
                      id="contact-nyu-email"
                      href={`mailto:${profile.nyuEmail}`}
                    >
                      {profile.nyuEmail}
                    </a>
                  </>
                ) : (
                  <>
                    <ContactEmailRow
                      id="contact-email"
                      email={profile.email}
                      animate={line === 2}
                      onDone={() => setLine(3)}
                    />
                    {line >= 3 && (
                      <ContactEmailRow
                        id="contact-nyu-email"
                        email={profile.nyuEmail}
                        animate={line === 3}
                        onDone={() => setLine(4)}
                      />
                    )}
                  </>
                )}
              </div>

              <div
                className={
                  linksPhase
                    ? "flex flex-wrap gap-x-6 gap-y-2 pt-2"
                    : "sr-only"
                }
              >
                {socialLinks.map((link, i) => {
                  const visible = !linksPhase || i < linksShown;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={visible && linksPhase ? undefined : -1}
                      className={
                        linksPhase
                          ? `label-mono text-cyan transition-opacity duration-150 hover:underline hover:underline-offset-4 ${
                              visible ? "opacity-100" : "pointer-events-none opacity-0"
                            }`
                          : "label-mono text-cyan"
                      }
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {sequenceDone && (
                <p className="flex items-center pt-2">
                  <Prompt />
                  <span
                    aria-hidden
                    className="animate-blink inline-block h-5 w-2.5 bg-text"
                  />
                </p>
              )}
            </div>
          </HudCard>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 flex justify-center">
          <NeonButton href="/cv.pdf" download variant="magenta">
            Download CV
          </NeonButton>
        </Reveal>
      </div>
    </section>
  );
}
