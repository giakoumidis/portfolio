"use client";

import { useEffect, useState } from "react";

const BOTTOM_THRESHOLD_PX = 48;

/**
 * Fixed scroll affordance — always on-screen like the volume control.
 * Flips to an end-of-page cue (and scrolls back to top on click) at the bottom.
 */
export default function ScrollCue() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      setAtBottom(maxScroll <= BOTTOM_THRESHOLD_PX || window.scrollY >= maxScroll - BOTTOM_THRESHOLD_PX);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={atBottom ? goTop : undefined}
      tabIndex={atBottom ? 0 : -1}
      aria-hidden={!atBottom}
      aria-label={atBottom ? "Back to top" : undefined}
      className={`scroll-cue label-mono pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 text-center text-text-dim lg:bottom-6 ${
        atBottom ? "pointer-events-auto cursor-pointer hover:text-cyan" : ""
      }`}
    >
      <p>{atBottom ? "End" : "Scroll"}</p>
      <svg
        viewBox="0 0 16 16"
        className={`mx-auto mt-2 h-4 w-4 transition-transform duration-300 ${
          atBottom ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </button>
  );
}
