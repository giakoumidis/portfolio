"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BOTTOM_THRESHOLD_PX = 48;
const PROFILE_HREF = "/#profile-proof";

/**
 * Fixed scroll affordance — always on-screen like the volume control.
 * On the way down it invites a visit to the profile; at the bottom it returns to the top.
 */
export default function ScrollCue() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [atBottom, setAtBottom] = useState(false);
  const onHome = pathname === "/";

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

  const knowMore = () => {
    if (onHome) {
      document.getElementById("profile-proof")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push(PROFILE_HREF);
  };

  return (
    <button
      type="button"
      onClick={atBottom ? goTop : knowMore}
      aria-label={atBottom ? "Back to top" : "Know more about Nikolaos"}
      className="scroll-cue label-mono pointer-events-auto fixed bottom-4 left-1/2 z-40 max-w-[calc(100%-8rem)] -translate-x-1/2 cursor-pointer text-center text-text-dim hover:text-cyan lg:bottom-6"
    >
      <p>{atBottom ? "End" : "Know more about Nikolaos"}</p>
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
