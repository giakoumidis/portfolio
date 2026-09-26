"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import ActionLink from "@/components/ui/ActionLink";
import PhotoLightbox, {
  type LightboxPhoto,
} from "@/components/ui/PhotoLightbox";

type RoboPhotoProps = {
  src: string;
  alt: string;
  /** Mono kicker at the start of the caption, e.g. "FIG.01". */
  tag?: string;
  caption?: string;
  /** Longer readable description under the telemetry caption. */
  description?: string;
  /** Optional case-file / external link shown under the caption. */
  link?: {
    href: string;
    label: string;
  };
  /** Aspect class applied to the image frame, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
  /**
   * Sibling photos opened from the same grid. Enables next/prev in the
   * lightbox via arrow keys, swipe, and on-screen controls.
   */
  gallery?: LightboxPhoto[];
  /** Index of this photo within `gallery`. */
  galleryIndex?: number;
};

/**
 * A real project photograph with corner ticks and a telemetry-style caption.
 * Click opens a protected full-viewport viewer (no casual download / save-as).
 */
export default function RoboPhoto({
  src,
  alt,
  tag,
  caption,
  description,
  link,
  aspect = "aspect-[3/2]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw",
  preload,
  className = "",
  gallery,
  galleryIndex,
}: RoboPhotoProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const openViewer = useCallback(() => setOpen(true), []);
  const tick = "absolute h-2.5 w-2.5 border-cyan opacity-70 z-10";
  const hasCaption = Boolean(tag || caption || description || link);

  return (
    <>
      <figure
        className={`robo-photo relative flex flex-col overflow-hidden bg-bg ${className}`}
      >
        <button
          type="button"
          onClick={openViewer}
          aria-label={`Enlarge photo: ${alt}`}
          className={`robo-photo-trigger group relative block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${aspect}`}
          onContextMenu={(event) => event.preventDefault()}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            draggable={false}
            className="robo-photo-img object-cover"
            onDragStart={(event) => event.preventDefault()}
          />
          {/* Blocks direct interaction with the underlying <img>. */}
          <div aria-hidden className="robo-photo-shield" />
          <span
            aria-hidden
            className={`${tick} top-2 left-2 border-t border-l`}
          />
          <span
            aria-hidden
            className={`${tick} top-2 right-2 border-t border-r`}
          />
          <span
            aria-hidden
            className={`${tick} bottom-2 left-2 border-b border-l`}
          />
          <span
            aria-hidden
            className={`${tick} bottom-2 right-2 border-b border-r`}
          />
          <span className="label-mono pointer-events-none absolute right-3 bottom-3 z-10 bg-bg/70 px-2 py-1 text-cyan opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            EXPAND
          </span>
        </button>

        {hasCaption && (
          <figcaption className="border-t border-grid-dim bg-bg/60 px-3 py-2">
            {(tag || caption) && (
              <p className="label-mono min-w-0 text-text-dim">
                {tag && <span className="mb-1 block text-cyan">{tag}</span>}
                {caption && <span className="block wrap-break-word">{caption}</span>}
              </p>
            )}
            {description && (
              <p className="mt-1.5 text-sm leading-snug text-text-dim">
                {description}
              </p>
            )}
            {link && (
              <div className="mt-2">
                <ActionLink href={link.href} native>
                  {link.label}
                </ActionLink>
              </div>
            )}
          </figcaption>
        )}
      </figure>

      {open && (
        <PhotoLightbox
          src={src}
          alt={alt}
          tag={tag}
          caption={caption}
          description={description}
          link={link}
          gallery={gallery}
          galleryIndex={galleryIndex}
          onClose={close}
        />
      )}
    </>
  );
}
