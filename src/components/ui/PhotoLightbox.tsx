"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";

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
  const touchStart = useRef<{ x: number; y: number } | null>(null);

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

  const onTouchStart = (event: TouchEvent) => {
    if (!canNavigate) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (!canNavigate || !touchStart.current) return;
    const touch = event.changedTouches[0];
    if (!touch) {
      touchStart.current = null;
      return;
    }
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="photo-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-bg/92 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      onContextMenu={(event) => event.preventDefault()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
        className="photo-lightbox-frame relative flex max-h-full max-w-full flex-col border border-grid-dim bg-bg"
        onClick={(event) => event.stopPropagation()}
        onContextMenu={(event) => event.preventDefault()}
      >
        <div className="photo-lightbox-stage relative h-[min(85vh,900px)] w-[min(92vw,1400px)]">
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
          className="border-t border-grid-dim bg-bg/80 px-4 py-3 text-text-dim"
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
            <a
              href={current.link.href}
              className="label-mono mt-2 inline-block text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {current.link.label} →
            </a>
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
