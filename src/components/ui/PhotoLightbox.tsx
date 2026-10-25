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

import ActionLink from "@/components/ui/ActionLink";
import {
  canHoverPlay,
  enterFullscreen,
  exitFullscreen,
  isFullscreenActive,
} from "@/lib/video-playback";

export type LightboxPhoto = {
  src: string;
  alt: string;
  caption?: string;
  tag?: string;
  /** Longer readable description under the telemetry caption. */
  description?: string;
  /** Optional case-file / external link shown under the caption. */
  link?: {
    href: string;
    label: string;
  };
};

type PhotoLightboxProps = LightboxPhoto & {
  /** Extra diagonal overlay mark (for certificates already baked with a watermark). */
  watermark?: boolean;
  onClose: () => void;
  /**
   * Sibling photos for next/prev browsing. When length > 1, arrow keys,
   * horizontal swipe, and on-screen controls move through the set.
   */
  gallery?: LightboxPhoto[];
  /** Index of the opened photo within `gallery`. */
  galleryIndex?: number;
};

const SWIPE_THRESHOLD_PX = 48;

/**
 * Full-viewport photo viewer. The image is painted as a CSS background behind
 * a transparent shield so the browser never exposes a right-clickable `<img>`,
 * and common save / drag gestures are cancelled. This is a deterrent — screenshots
 * and network tools still work — but it blocks casual downloads.
 */
export default function PhotoLightbox({
  src,
  alt,
  caption,
  tag,
  description,
  link,
  watermark = false,
  onClose,
  gallery,
  galleryIndex = 0,
}: PhotoLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const askedFullscreen = useRef(false);
  const ignoreClick = useRef(false);
  const [immersive, setImmersive] = useState(false);
  const [dragX, setDragX] = useState(0);

  const photos =
    gallery && gallery.length > 0
      ? gallery
      : [{ src, alt, caption, tag, description, link }];
  const canNavigate = photos.length > 1;

  const [index, setIndex] = useState(() => {
    if (!canNavigate) return 0;
    const clamped = Math.min(Math.max(galleryIndex, 0), photos.length - 1);
    return clamped;
  });

  const current = photos[index] ?? photos[0];
  const goPrev = useCallback(() => {
    if (!canNavigate) return;
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [canNavigate, photos.length]);
  const goNext = useCallback(() => {
    if (!canNavigate) return;
    setIndex((i) => (i + 1) % photos.length);
  }, [canNavigate, photos.length]);

  // Phone landscape: the open photo fills the screen. Native fullscreen hides
  // the browser chrome when the device allows it; the layout still fills the
  // viewport when that call is rejected.
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

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (!canNavigate) return;
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
    };
  }, [onClose, canNavigate, goPrev, goNext]);

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
      onContextMenu={(event) => event.preventDefault()}
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
          {String(photos.length).padStart(2, "0")}
        </p>
      )}

      {canNavigate && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
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
            aria-label="Next photo"
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
        onContextMenu={(event) => event.preventDefault()}
      >
        <div
          className={
            immersive
              ? "photo-lightbox-stage relative h-dvh w-dvw"
              : "photo-lightbox-stage relative h-[min(78dvh,900px)] w-[min(92vw,1400px)] sm:h-[min(85vh,900px)]"
          }
          style={
            dragX !== 0
              ? { transform: `translate3d(${dragX}px,0,0)` }
              : undefined
          }
        >
          {/*
            Background paint + opaque shield: no <img> for the browser to
            offer "Save image as…", and drag / select are disabled in CSS.
          */}
          <div
            role="img"
            aria-label={current.alt}
            className="photo-lightbox-image absolute inset-0"
            style={{
              backgroundImage: `url("${current.src.replace(/"/g, "%22")}")`,
            }}
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
          />
          {watermark && (
            <div aria-hidden className="photo-lightbox-watermark absolute inset-0" />
          )}
          <div
            aria-hidden
            className="photo-lightbox-shield absolute inset-0"
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
          />
          <span
            aria-hidden
            className="absolute top-2 left-2 z-10 h-3 w-3 border-t border-l border-cyan opacity-70"
          />
          <span
            aria-hidden
            className="absolute top-2 right-2 z-10 h-3 w-3 border-t border-r border-cyan opacity-70"
          />
          <span
            aria-hidden
            className="absolute bottom-2 left-2 z-10 h-3 w-3 border-b border-l border-cyan opacity-70"
          />
          <span
            aria-hidden
            className="absolute right-2 bottom-2 z-10 h-3 w-3 border-r border-b border-cyan opacity-70"
          />
        </div>

        <figcaption
          id={titleId}
          className={
            immersive
              ? "sr-only"
              : "border-t border-grid-dim bg-bg/80 px-4 py-3 text-text-dim"
          }
        >
          <p className="label-mono">
            {current.tag && (
              <span className="mr-2 text-cyan">{current.tag}</span>
            )}
            {current.caption ?? current.alt}
          </p>
          {current.description &&
            current.description !== (current.caption ?? current.alt) && (
              <p className="mt-1.5 text-sm leading-snug">{current.description}</p>
            )}
          {current.link && (
            <div className="mt-2">
              <ActionLink href={current.link.href} native>
                {current.link.label}
              </ActionLink>
            </div>
          )}
          {canNavigate && (
            <p className="label-mono mt-2 text-[10px] text-text-dim/80">
              ← → or swipe
            </p>
          )}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
