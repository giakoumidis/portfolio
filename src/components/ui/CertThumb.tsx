"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import PhotoLightbox from "@/components/ui/PhotoLightbox";

type CertThumbProps = {
  /** Watermarked full-size image shown in the lightbox. */
  src: string;
  /** Small watermarked preview beside the certification copy. */
  thumbSrc: string;
  alt: string;
  caption?: string;
  tag?: string;
  className?: string;
};

/**
 * Compact certificate preview. Opens a protected lightbox over a watermarked
 * render — no PDF link, no casual save-as (same deterrent model as RoboPhoto).
 */
export default function CertThumb({
  src,
  thumbSrc,
  alt,
  caption,
  tag = "CERT",
  className = "",
}: CertThumbProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View certificate: ${alt}`}
        className={`group relative h-20 w-14 shrink-0 cursor-zoom-in overflow-hidden border border-grid-dim bg-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${className}`}
        onContextMenu={(event) => event.preventDefault()}
      >
        <Image
          src={thumbSrc}
          alt={alt}
          fill
          sizes="56px"
          draggable={false}
          className="object-cover object-top"
          onDragStart={(event) => event.preventDefault()}
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
        <div aria-hidden className="absolute inset-0 z-[1]" />
        <span className="label-mono pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-bg/75 py-0.5 text-center text-[9px] text-cyan opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          VIEW
        </span>
      </button>

      {open && (
        <PhotoLightbox
          src={src}
          alt={alt}
          tag={tag}
          caption={caption}
          watermark
          onClose={close}
        />
      )}
    </>
  );
}
