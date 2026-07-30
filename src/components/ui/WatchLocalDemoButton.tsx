"use client";

import { useState } from "react";

import NeonButton from "@/components/ui/NeonButton";
import VideoLightbox from "@/components/ui/VideoLightbox";

type WatchLocalDemoButtonProps = {
  src: string;
  title: string;
  poster?: string;
  type?: string;
  label?: string;
  className?: string;
};

/**
 * Opens a self-hosted demo in the site VideoLightbox instead of navigating
 * to the raw media URL (which has no site chrome or back navigation).
 */
export default function WatchLocalDemoButton({
  src,
  title,
  poster,
  type,
  label = "Watch demo →",
  className,
}: WatchLocalDemoButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NeonButton onClick={() => setOpen(true)} className={className}>
        {label}
      </NeonButton>
      {open && (
        <VideoLightbox
          title={title}
          source={{ kind: "local", src, type, poster }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
