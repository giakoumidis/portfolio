"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import { sections } from "@/lib/sections";

export default function HudRail() {
  const menuTitleId = useId();
  const [activeId, setActiveId] = useState(sections[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }

        // The middle band can hold several sections at once; resolving to the
        // first one in registry order keeps the readout from flickering
        // between neighbours as they scroll past each other.
        const next = sections.find((section) => intersecting.has(section.id));
        if (next) setActiveId(next.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const current = sections.find((section) => section.id === activeId);

  function jumpTo(sectionId: string) {
    setMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${sectionId}`);
    }
  }

  return (
    <>
      <nav
        aria-label="Section navigation"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-2.5 lg:flex xl:left-6"
      >
        {sections.map((section) => {
          const active = section.id === activeId;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active ? "true" : undefined}
              className="group flex items-center gap-3"
            >
              <span
                className={`label-mono w-6 text-left transition-all duration-200 ${
                  active
                    ? "glow-cyan opacity-100"
                    : "text-text-dim opacity-35 group-hover:text-text group-hover:opacity-80"
                }`}
              >
                {section.index}
              </span>
              <span className="flex w-8 items-center justify-start">
                <span
                  className={`block transition-all duration-200 ${
                    active
                      ? "h-0.5 w-8 bg-cyan shadow-[0_0_10px_rgba(0,240,255,0.85)]"
                      : "h-px w-4 bg-grid opacity-40 group-hover:w-6 group-hover:opacity-80"
                  }`}
                />
              </span>
              {/*
                Always-visible chapter labels; inactive ones stay readable but
                faint so the active chapter leads.
              */}
              <span
                className={`label-mono w-28 text-left transition-all duration-200 ${
                  active
                    ? "text-cyan opacity-100"
                    : "text-text-dim opacity-35 group-hover:text-text group-hover:opacity-80"
                }`}
              >
                {section.label}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-grid-dim bg-bg/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <a href="#hero" className="label-mono text-cyan">
          NG//
        </a>
        {current && (
          <p className="label-mono text-text-dim">
            <span className="text-cyan">{current.index}</span> / {current.label}
          </p>
        )}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-section-menu"
          onClick={() => setMenuOpen((value) => !value)}
          className="label-mono border border-grid-dim px-3 py-1.5 text-text-dim transition-colors hover:border-cyan/50 hover:text-cyan"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                key="mobile-section-menu"
                id="mobile-section-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby={menuTitleId}
                className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-md lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.15 }}
              >
                <div className="flex items-center justify-between border-b border-grid-dim px-4 py-3">
                  <h2 id={menuTitleId} className="label-mono text-cyan">
                    Sections
                  </h2>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="label-mono border border-grid-dim px-3 py-1.5 text-text-dim transition-colors hover:border-cyan/50 hover:text-cyan"
                  >
                    Close
                  </button>
                </div>

                <nav
                  aria-label="Mobile section navigation"
                  className="flex-1 overflow-y-auto px-4 py-4"
                >
                  <ul className="flex flex-col gap-1">
                    {sections.map((section) => {
                      const active = section.id === activeId;

                      return (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() => jumpTo(section.id)}
                            aria-current={active ? "true" : undefined}
                            className={`flex w-full items-center gap-4 border px-4 py-3 text-left transition-colors duration-150 ${
                              active
                                ? "border-cyan/50 bg-cyan/10 text-cyan"
                                : "border-transparent text-text-dim hover:border-grid-dim hover:text-text"
                            }`}
                          >
                            <span className="label-mono w-6 shrink-0">
                              {section.index}
                            </span>
                            <span className="label-mono">{section.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <p className="border-t border-grid-dim px-4 py-3 label-mono text-text-dim">
                  Tip · <span className="text-cyan">⌘K</span> opens site search
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
