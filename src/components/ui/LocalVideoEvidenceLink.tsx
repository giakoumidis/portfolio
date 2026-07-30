"use client";

import { useState } from "react";

import VideoLightbox from "@/components/ui/VideoLightbox";

type LocalVideoEvidenceLinkProps = {
  src: string;
  title: string;
  type?: string;
  className?: string;
};

/**
 * Evidence list link for self-hosted video — expands in VideoLightbox
 * rather than opening the raw file in a new tab.
 */
export default function LocalVideoEvidenceLink({
  src,
  title,
  type,
  className = "",
}: LocalVideoEvidenceLinkProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`mt-2 block text-left font-body text-sm font-medium text-text transition-colors hover:text-cyan hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${className}`}
      >
        {title}
      </button>
      {open && (
        <VideoLightbox
          title={title}
          source={{ kind: "local", src, type }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
