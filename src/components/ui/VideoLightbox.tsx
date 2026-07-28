"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { notifyVideoPlay, notifyVideoStop } from "@/lib/media-events";

type LocalSource = {
  kind: "local";
  src: string;
  type?: string;
  poster?: string;
};

type YouTubeSource = {
  kind: "youtube";
  videoId: string;
};

type VideoLightboxProps = {
  title: string;
  source: LocalSource | YouTubeSource;
  onClose: () => void;
};

function mimeFromSrc(src: string): string | undefined {
  const ext = src.split(".").pop()?.toLowerCase();
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg" || ext === "ogv") return "video/ogg";
  return undefined;
}

/**
 * Full-viewport video viewer — mirrors PhotoLightbox chrome for local
 * and YouTube sources. Instagram is handled as an outbound link instead.
 */
export default function VideoLightbox({
  title,
  source,
  onClose,
}: VideoLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const notifiedRef = useRef(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    notifyVideoPlay();
    notifiedRef.current = true;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
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
  }, [onClose]);

  const youtubeSrc =
    source.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${source.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
      : null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="photo-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-bg/92 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
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
      >
        <div className="photo-lightbox-stage relative aspect-video h-auto max-h-[min(85vh,900px)] w-[min(92vw,1400px)] bg-bg">
          {source.kind === "local" ? (
            <video
              key={source.src}
              autoPlay
              controls
              playsInline
              loop
              poster={source.poster}
              aria-label={title}
              className="absolute inset-0 h-full w-full bg-bg object-contain"
            >
              <source
                src={source.src}
                type={source.type ?? mimeFromSrc(source.src)}
              />
              Your browser does not support embedded video.
            </video>
          ) : (
            <iframe
              src={youtubeSrc ?? undefined}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
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
          className="label-mono border-t border-grid-dim bg-bg/80 px-4 py-3 text-text-dim"
        >
          <span className="mr-2 text-cyan">
            {source.kind === "youtube" ? "YOUTUBE" : "VIDEO"}
          </span>
          {title}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
