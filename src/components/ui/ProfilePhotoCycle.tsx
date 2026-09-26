"use client";

import { useEffect, useState } from "react";

import RoboPhoto from "@/components/ui/RoboPhoto";
import type { ProfilePhotoSlide } from "@/lib/profile-photos";

const INTERVAL_MS = 3000;

type ProfilePhotoCycleProps = {
  /** One group per project; each group is that project's archive photos. */
  groups: ProfilePhotoSlide[][];
};

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j]!, next[i]!];
  }
  return next;
}

/** One photo per project. Prefer a frame that was not shown last cycle. */
function pickCycle(
  groups: ProfilePhotoSlide[][],
  previousByHref: Map<string, string>,
): ProfilePhotoSlide[] {
  const picked = groups.map((group) => {
    const previous = previousByHref.get(group[0]!.href);
    const pool =
      group.length > 1 ? group.filter((slide) => slide.src !== previous) : group;
    return pool[Math.floor(Math.random() * pool.length)]!;
  });
  return shuffle(picked);
}

export default function ProfilePhotoCycle({ groups }: ProfilePhotoCycleProps) {
  const initial = groups[0]?.[0];
  const [slide, setSlide] = useState<ProfilePhotoSlide | undefined>(initial);

  useEffect(() => {
    if (groups.length === 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const previousByHref = new Map<string, string>();
    let sequence = pickCycle(groups, previousByHref);
    let index = 0;
    for (const frame of sequence) previousByHref.set(frame.href, frame.src);
    setSlide(sequence[0]);

    const id = window.setInterval(() => {
      if (document.hidden) return;
      index += 1;
      if (index >= sequence.length) {
        sequence = pickCycle(groups, previousByHref);
        index = 0;
        for (const frame of sequence) previousByHref.set(frame.href, frame.src);
      }
      const next = sequence[index];
      if (next) setSlide(next);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [groups]);

  if (!slide) return null;

  return (
    <div key={slide.src} className="profile-photo-in">
      <p className="sr-only" aria-live="polite">
        {slide.caption}. {slide.title}
      </p>
      <RoboPhoto
        src={slide.src}
        alt={slide.alt}
        tag="FIELD LOG"
        caption={slide.caption}
        href={slide.href}
        link={{ href: slide.href, label: slide.title }}
        aspect="aspect-[3/2]"
        sizes="(max-width: 1024px) 100vw, 36rem"
        className="max-w-xl border border-grid-dim"
      />
    </div>
  );
}
