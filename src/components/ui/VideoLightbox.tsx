"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { notifyVideoPlay, notifyVideoStop } from "@/lib/media-events";
import {
  canHoverPlay,
  enterFullscreen,
  exitFullscreen,
  isFullscreenActive,
  youtubeEmbedSrc,
} from "@/lib/video-playback";

type LocalSource = {
  kind: "local";
  src: string;
  type?: string;
  poster?: string;
};

type YouTubeSource = {
  kind: "youtube";
  videoId: string;
  /** Seconds from the start of the video. */
  start?: number;
};

export type LightboxVideo = {
  title: string;
  source: LocalSource | YouTubeSource;
};

type VideoLightboxProps = LightboxVideo & {
  onClose: () => void;
  /**
   * Sibling clips opened from the same page. Enables next/prev via arrow
   * keys, swipe, and on-screen controls.
   */
  gallery?: LightboxVideo[];
  /** Index of this clip within `gallery`. */
  galleryIndex?: number;
};

const SWIPE_THRESHOLD_PX = 48;

function mimeFromSrc(src: string): string | undefined {
  const ext = src.split(".").pop()?.toLowerCase();
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg" || ext === "ogv") return "video/ogg";
  return undefined;
}

/** Bottom band of a player, where the native transport controls sit. */
function onPlayerControls(event: PointerEvent) {
  const target = event.target;
  if (!(target instanceof HTMLVideoElement || target instanceof HTMLIFrameElement)) {
    return false;
  }
  const rect = target.getBoundingClientRect();
  if (rect.height <= 0) return false;
  return event.clientY - rect.top > rect.height * 0.72;
}

/**
 * Full-viewport video viewer. Phone landscape fills the screen with the
 * clip. When a page has several clips, swipe or the arrows move between them.
 * Instagram stays an outbound link.
 */
export default function VideoLightbox({
  title,
  source,
  onClose,
  gallery,
  galleryIndex = 0,
}: VideoLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const askedFullscreen = useRef(false);
  const ignoreClick = useRef(false);
  const notifiedRef = useRef(false);
  const [immersive, setImmersive] = useState(false);
  const [dragX, setDragX] = useState(0);

  const clips =
    gallery && gallery.length > 0 ? gallery : [{ title, source }];
  const canNavigate = clips.length > 1;
  const [index, setIndex] = useState(() => {
    if (!canNavigate) return 0;
    return Math.min(Math.max(galleryIndex, 0), clips.length - 1);
  });
  const current = clips[index] ?? clips[0];

  const goPrev = useCallback(() => {
    if (!canNavigate) return;
    setIndex((i) => (i - 1 + clips.length) % clips.length);
  }, [canNavigate, clips.length]);
  const goNext = useCallback(() => {
    if (!canNavigate) return;
    setIndex((i) => (i + 1) % clips.length);
  }, [canNavigate, clips.length]);

  useLayoutEffect(() => {
    const landscape = window.matchMedia("(orientation: landscape)");
    const short = window.matchMedia("(max-height: 520px)");
    let cancelled = false;

    const wantsImmersive = () =>
      landscape.matches && (!canHoverPlay() || short.matches);

    const apply = async () => {
      if (cancelled) return;
      if (!wantsImmersive()) {
        setImmersive(false);
        if (askedFullscreen.current && isFullscreenActive()) {
          askedFullscreen.current = false;
          void exitFullscreen();
        }
        return;
      }
      setImmersive(true);
      if (canHoverPlay() || isFullscreenActive() || !rootRef.current) return;
      const ok = await enterFullscreen(rootRef.current);
      if (!cancelled && ok) askedFullscreen.current = true;
    };

    void apply();
    landscape.addEventListener("change", apply);
    short.addEventListener("change", apply);
    return () => {
      cancelled = true;
      landscape.removeEventListener("change", apply);
      short.removeEventListener("change", apply);
      if (askedFullscreen.current && isFullscreenActive()) {
        askedFullscreen.current = false;
        void exitFullscreen();
      }
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !canNavigate) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let active = false;
    let horizontal = false;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const target = event.target;
      if (target instanceof Element && target.closest("button, a")) return;
      if (onPlayerControls(event)) return;
      startX = lastX = event.clientX;
      startY = lastY = event.clientY;
      active = true;
      horizontal = false;
      try {
        root.setPointerCapture(event.pointerId);
      } catch {
        /* The pointer can already be gone on a cancelled gesture. */
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!active) return;
      lastX = event.clientX;
      lastY = event.clientY;
      const dx = lastX - startX;
      const dy = lastY - startY;
      if (!horizontal) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        horizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (!horizontal) return;
      setDragX(dx);
    };

    const finish = (event: PointerEvent) => {
      if (!active) return;
      active = false;
      const dx = lastX - startX;
      const dy = lastY - startY;
      setDragX(0);
      try {
        if (root.hasPointerCapture(event.pointerId)) {
          root.releasePointerCapture(event.pointerId);
        }
      } catch {
        /* Capture was never taken. */
      }
      if (!horizontal || Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
      if (Math.abs(dx) < Math.abs(dy)) return;
      ignoreClick.current = true;
      if (dx > 0) goPrev();
      else goNext();
    };

    const onCancel = () => {
      if (!horizontal) return;
      active = false;
      setDragX(0);
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", finish);
    root.addEventListener("pointercancel", onCancel);
    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", finish);
      root.removeEventListener("pointercancel", onCancel);
    };
  }, [canNavigate, goPrev, goNext]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    notifyVideoPlay();
    notifiedRef.current = true;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (!canNavigate) return;
      if (event.target instanceof HTMLVideoElement) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      if (notifiedRef.current) {
        notifiedRef.current = false;
        notifyVideoStop();
      }
    };
  }, [onClose, canNavigate, goPrev, goNext]);

  const youtubeSrc =
    current.source.kind === "youtube"
      ? youtubeEmbedSrc(current.source.videoId, {
          autoplay: true,
          start: current.source.start,
        })
      : null;

  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={
        immersive
          ? "photo-lightbox fixed inset-0 z-[100] flex bg-bg"
          : "photo-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-bg/92 p-4 backdrop-blur-md sm:p-8"
      }
      onClick={(event) => {
        if (ignoreClick.current) {
          ignoreClick.current = false;
          event.preventDefault();
          return;
        }
        onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="label-mono absolute top-4 right-4 z-20 border border-grid px-3 py-2 text-cyan transition-colors hover:border-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:top-6 sm:right-6"
      >
        CLOSE [ESC]
      </button>

      {canNavigate && (
        <p
          aria-live="polite"
          className="label-mono absolute top-4 left-4 z-20 text-text-dim sm:top-6 sm:left-6"
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(clips.length).padStart(2, "0")}
        </p>
      )}

      {canNavigate && (
        <>
          <button
            type="button"
            aria-label="Previous video"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            className="label-mono absolute top-1/2 left-2 z-20 -translate-y-1/2 border border-grid px-2.5 py-3 text-cyan transition-colors hover:border-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:left-4 sm:px-3"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next video"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            className="label-mono absolute top-1/2 right-2 z-20 -translate-y-1/2 border border-grid px-2.5 py-3 text-cyan transition-colors hover:border-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:right-4 sm:px-3"
          >
            →
          </button>
        </>
      )}

      <figure
        className={
          immersive
            ? "photo-lightbox-frame relative flex h-full w-full flex-col bg-bg"
            : "photo-lightbox-frame relative flex max-h-full max-w-full flex-col border border-grid-dim bg-bg"
        }
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={
            immersive
              ? "photo-lightbox-stage relative h-dvh w-dvw bg-bg"
              : "photo-lightbox-stage relative aspect-video h-auto max-h-[min(78dvh,900px)] w-[min(92vw,1400px)] bg-bg sm:max-h-[min(85vh,900px)]"
          }
          style={
            dragX !== 0
              ? { transform: `translate3d(${dragX}px,0,0)` }
              : undefined
          }
        >
          {current.source.kind === "local" ? (
            <video
              key={current.source.src}
              autoPlay
              controls
              playsInline
              loop
              poster={current.source.poster}
              aria-label={current.title}
              className="absolute inset-0 h-full w-full bg-bg object-contain"
            >
              <source
                src={current.source.src}
                type={current.source.type ?? mimeFromSrc(current.source.src)}
              />
              Your browser does not support embedded video.
            </video>
          ) : (
            <iframe
              key={current.source.videoId}
              src={youtubeSrc ?? undefined}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          )}
          {canNavigate && current.source.kind === "youtube" && (
            <>
              <div aria-hidden className="absolute inset-y-0 left-0 z-10 w-10" />
              <div aria-hidden className="absolute inset-y-0 right-0 z-10 w-10" />
            </>
          )}
          <span
            aria-hidden
            className="pointer-events-none absolute top-2 left-2 z-10 h-3 w-3 border-t border-l border-cyan opacity-70"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-2 right-2 z-10 h-3 w-3 border-t border-r border-cyan opacity-70"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-2 left-2 z-10 h-3 w-3 border-b border-l border-cyan opacity-70"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-2 bottom-2 z-10 h-3 w-3 border-r border-b border-cyan opacity-70"
          />
        </div>

        <figcaption
          id={titleId}
          className={
            immersive
              ? "sr-only"
              : "label-mono border-t border-grid-dim bg-bg/80 px-4 py-3 text-text-dim"
          }
        >
          <span className="mr-2 text-cyan">
            {current.source.kind === "youtube" ? "YOUTUBE" : "VIDEO"}
          </span>
          {current.title}
          {canNavigate && (
            <span className="mt-2 block text-[10px] text-text-dim/80">
              ← → or swipe
            </span>
          )}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
