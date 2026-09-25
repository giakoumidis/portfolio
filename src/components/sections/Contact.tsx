"use client";

import { useState } from "react";

import HudCard from "@/components/ui/HudCard";
import NeonButton from "@/components/ui/NeonButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile, socialLinks } from "@/content/profile";

const SHELL_USER = "nikolaos";
const SHELL_HOST = "portfolio";
const SHELL_CWD = "~";

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

function CopyEmailButton({ email, targetId }: { email: string; targetId: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
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
      className="label-mono shrink-0 border border-cyan/40 px-2.5 py-1 text-xs text-cyan transition-colors duration-200 hover:bg-cyan/10"
      aria-label={copied ? "Email copied" : `Copy ${email}`}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}

function ContactEmailRow({ email, id }: { email: string; id: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        id={id}
        href={`mailto:${email}`}
        className="select-all text-cyan transition-colors duration-200 hover:underline hover:underline-offset-4"
      >
        {email}
      </a>
      <CopyEmailButton email={email} targetId={id} />
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20"
    >
      <div className="section-shell">
        <SectionHeading
          index="04"
          title="Contact"
          headingId="contact-heading"
          kicker="Engineering · leadership · collaboration"
        />

        <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-text-dim">
          Get in touch to discuss robotics development, research infrastructure,
          industry collaboration, or technical leadership opportunities in
          robotics and applied AI.
        </p>

        <HudCard accent="cyan">
          <div className="relative flex items-center justify-between border-b border-grid-dim bg-bg-raised/70 px-4 py-2.5">
            <span aria-hidden className="hidden font-mono text-sm text-text-dim sm:block">
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
              <span className="text-text">whoami</span>
            </p>
            <p className="text-text">{profile.name}</p>
            <div className="space-y-2">
              <ContactEmailRow id="contact-nyu-email" email={profile.nyuEmail} />
              <ContactEmailRow id="contact-email" email={profile.email} />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-cyan hover:underline hover:underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </HudCard>

        <div className="mt-10 flex justify-center">
          <NeonButton href="/cv.pdf" download variant="magenta">
            Download CV
          </NeonButton>
        </div>
      </div>
    </section>
  );
}
