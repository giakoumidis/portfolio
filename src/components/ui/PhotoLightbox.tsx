"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

type PhotoLightboxProps = {
  src: string;
  alt: string;
  caption?: string;
  tag?: string;
  /** Extra diagonal overlay mark (for certificates already baked with a watermark). */
  watermark?: boolean;
  onClose: () => void;
};

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
  watermark = false,
  onClose,
}: PhotoLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="photo-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-bg/92 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
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
            aria-label={alt}
            className="photo-lightbox-image absolute inset-0"
            style={{ backgroundImage: `url("${src.replace(/"/g, "%22")}")` }}
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
          className="label-mono border-t border-grid-dim bg-bg/80 px-4 py-3 text-text-dim"
        >
          {tag && <span className="mr-2 text-cyan">{tag}</span>}
          {caption ?? alt}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
