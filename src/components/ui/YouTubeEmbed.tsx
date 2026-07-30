"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import VideoLightbox from "@/components/ui/VideoLightbox";
import {
  canHoverPlay,
  enterFullscreen,
  exitFullscreen,
  isFullscreenActive,
} from "@/lib/video-playback";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

const LEAVE_DELAY_MS = 220;

/**
 * Hover-to-preview YouTube embed: loads the iframe on hover so YouTube scripts
 * do not cost bandwidth on first paint. Leave is debounced so brief pointer
 * wobbles do not tear down the player. Click (or EXPAND) opens a controlled
 * lightbox; landscape while playing requests fullscreen.
 */
export default function YouTubeEmbed({
  videoId,
  title,
  className = "",
}: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);
  const [hoverMode, setHoverMode] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [orientationExpand, setOrientationExpand] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&controls=0&modestbranding=1&playsinline=1`;

  const clearLeaveTimer = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const closeExpand = useCallback(() => {
    setExpanded(false);
    setOrientationExpand(false);
  }, []);

  useEffect(() => {
    const sync = () => setHoverMode(canHoverPlay());
    sync();
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      clearLeaveTimer();
    };
  }, []);

  // Mobile: while previewing, landscape → fullscreen (lightbox fallback).
  useEffect(() => {
    if (hoverMode) return;

    const mq = window.matchMedia("(orientation: landscape)");
    let cancelled = false;

    const apply = async () => {
      if (cancelled) return;
      if (!mq.matches) {
        if (orientationExpand) {
          setExpanded(false);
          setOrientationExpand(false);
        }
        if (isFullscreenActive()) void exitFullscreen();
        return;
      }
      if (expanded || isFullscreenActive() || !active) return;
      const ok = await enterFullscreen(
        rootRef.current ?? document.documentElement,
      );
      if (!ok && !cancelled) {
        setOrientationExpand(true);
        setExpanded(true);
        setActive(false);
      }
    };

    void apply();
    mq.addEventListener("change", apply);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", apply);
    };
  }, [active, hoverMode, expanded, orientationExpand]);

  const openExpand = () => {
    clearLeaveTimer();
    hoveringRef.current = false;
    setActive(false);
    setOrientationExpand(false);
    setExpanded(true);
  };

  const handlePointerEnter = () => {
    if (!hoverMode || expanded) return;
    clearLeaveTimer();
    hoveringRef.current = true;
    setActive(true);
  };

  const handlePointerLeave = () => {
    if (!hoverMode || expanded) return;
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      hoveringRef.current = false;
      setActive(false);
      leaveTimerRef.current = null;
    }, LEAVE_DELAY_MS);
  };

  const handleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openExpand();
  };

  return (
    <>
      <div
        ref={rootRef}
        className={`group/video relative aspect-video overflow-hidden border border-grid-dim bg-bg-raised ${className}`}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
      >
        {active && !expanded && (
          <iframe
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        )}

        {!expanded && (
          <button
            type="button"
            onClick={openExpand}
            aria-label={`Expand video: ${title}`}
            className="absolute inset-0 z-10 cursor-zoom-in"
          >
            {!active && <PosterArt poster={poster} label="YouTube" />}
          </button>
        )}

        <button
          type="button"
          onClick={handleExpand}
          aria-label={`Expand video: ${title}`}
          className="label-mono absolute top-3 right-3 z-20 border border-grid-dim bg-bg/70 px-2 py-1 text-cyan opacity-0 transition-opacity group-hover/video:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan [@media(hover:none)]:opacity-100"
        >
          EXPAND
        </button>
      </div>

      {expanded && (
        <VideoLightbox
          title={title}
          source={{ kind: "youtube", videoId }}
          onClose={closeExpand}
        />
      )}
    </>
  );
}

function PosterArt({ poster, label }: { poster: string; label: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube poster; not in next/image remotePatterns */}
      <img
        src={poster}
        alt=""
        width={480}
        height={360}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-200 group-hover/video:opacity-100"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center border border-cyan/60 bg-bg/70 text-cyan transition-all duration-200 group-hover/video:panel-glow-cyan group-hover/video:scale-105">
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-5 w-5 fill-current"
            aria-hidden
          >
            <path d="M8 5.14v13.72L19.27 12 8 5.14z" />
          </svg>
        </span>
      </span>
      <span className="label-mono absolute right-3 bottom-3 text-text-dim">
        {label}
      </span>
    </>
  );
}
