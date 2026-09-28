import Image from "next/image";
import Link from "next/link";

import ActionLink from "@/components/ui/ActionLink";
import HudCard from "@/components/ui/HudCard";
import RoboPhoto from "@/components/ui/RoboPhoto";
import {
  getOutreachBand,
  industryRecordNote,
  outreachEntryHref,
  resolveOutreachLinks,
  type OutreachEntry,
  type OutreachImage,
} from "@/content/outreach";

function OrgLogo({ entry }: { entry: OutreachEntry }) {
  if (!entry.logo) return null;
  const plate =
    entry.logoSurface === "dark"
      ? "border border-grid-dim bg-bg"
      : "bg-white";
  return (
    <span
      className={`flex h-10 w-[4.75rem] shrink-0 items-center justify-center px-1.5 ${plate}`}
    >
      {/* Official marks include SVG wordmarks, which next/image does not serve. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={entry.logo}
        alt=""
        className="max-h-7 max-w-full object-contain"
      />
    </span>
  );
}

function PhotoThumb({ entry }: { entry: OutreachEntry }) {
  if (!entry.image) return null;
  return (
    <div className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden border border-grid-dim sm:h-20 sm:w-28">
      <Image
        src={entry.image.src}
        alt={entry.image.alt}
        fill
        sizes="112px"
        className="object-cover"
      />
    </div>
  );
}

function EntryLinks({ entry }: { entry: OutreachEntry }) {
  const links = resolveOutreachLinks(entry);
  if (!links.length) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <ActionLink href={link.href} external={link.external}>
            {link.label}
          </ActionLink>
        </li>
      ))}
    </ul>
  );
}

/** Reverse links from a project case file or laboratory hub. */
export function RelatedOutreach({ entries }: { entries: OutreachEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
      {entries.map((entry) => (
        <li key={entry.id}>
          <Link
            href={outreachEntryHref(entry)}
            className="block h-full border border-grid-dim p-4 transition-colors hover:border-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            <p className="label-mono text-cyan/70">
              {[entry.standing, entry.year].filter(Boolean).join(" · ")}
            </p>
            <p className="mt-2 font-display text-sm uppercase text-text">
              {entry.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SelectedCard({ entry }: { entry: OutreachEntry }) {
  return (
    <HudCard accent="cyan" className="flex h-full flex-col overflow-hidden">
      {entry.image && (
        <RoboPhoto
          src={entry.image.src}
          alt={entry.image.alt}
          caption={entry.image.caption}
          sizes="(max-width: 1024px) 100vw, 36rem"
          className="border-0 border-b border-grid-dim"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <OrgLogo entry={entry} />
          <p className="label-mono text-text-dim">{entry.standing}</p>
          <p className="label-mono text-cyan">{entry.year}</p>
        </div>
        <h3 className="mt-3 font-display text-base uppercase text-text">
          {entry.title}
        </h3>
        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-text-dim">
          {entry.summary}
        </p>
        <EntryLinks entry={entry} />
      </div>
    </HudCard>
  );
}

export function RecordRow({ entry }: { entry: OutreachEntry }) {
  return (
    <li
      id={entry.id}
      className="scroll-mt-24 border-b border-grid-dim py-5 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        <OrgLogo entry={entry} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-body font-medium text-text">{entry.title}</h3>
            <p className="label-mono text-cyan">{entry.year}</p>
          </div>
          <p className="label-mono mt-1 text-text-dim">{entry.standing}</p>
          <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-text-dim">
            {entry.summary}
          </p>
          <EntryLinks entry={entry} />
        </div>
        <PhotoThumb entry={entry} />
      </div>
    </li>
  );
}

function ShowcaseFeature({ entry }: { entry: OutreachEntry }) {
  const photos = entryPhotos(entry);
  const gallery = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption,
  }));

  return (
    <HudCard accent="cyan" className="overflow-hidden">
      <div>
        <div
          className={`grid gap-px bg-grid-dim ${
            photos.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {photos.map((photo, index) => (
            <RoboPhoto
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              gallery={gallery}
              galleryIndex={index}
              sizes={
                photos.length > 1
                  ? "(max-width: 640px) 100vw, 40rem"
                  : "(max-width: 1024px) 100vw, 64rem"
              }
              className="bg-bg"
            />
          ))}
        </div>
        <div className="flex max-w-3xl flex-col justify-center p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <OrgLogo entry={entry} />
            <p className="label-mono text-text-dim">{entry.standing}</p>
            <p className="label-mono text-cyan">{entry.year}</p>
          </div>
          <h3 className="mt-3 font-display text-base uppercase text-text">
            {entry.title}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-text-dim">
            {entry.summary}
          </p>
          <EntryLinks entry={entry} />
        </div>
      </div>
    </HudCard>
  );
}

export function IndustryRecord() {
  const selected = getOutreachBand("industry", "selected");
  const showcases = getOutreachBand("industry", "showcase");
  const featuredShowcases = showcases.filter(
    (entry) => (entry.images?.length ?? 0) > 0,
  );
  const showcaseRows = showcases.filter(
    (entry) => (entry.images?.length ?? 0) === 0,
  );
  const record = getOutreachBand("industry", "record");

  return (
    <div className="mt-10 space-y-14">
      <p className="max-w-2xl font-body text-sm leading-relaxed text-text-dim">
        {industryRecordNote}
      </p>

      <div>
        <h3
          id="industry-selected"
          className="scroll-mt-24 font-display text-base uppercase text-text"
        >
          Selected collaborations
        </h3>
        <ul className="mt-6 grid gap-5 lg:grid-cols-2">
          {selected.map((entry) => (
            <li key={entry.id} id={entry.id} className="scroll-mt-24">
              <SelectedCard entry={entry} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3
          id="industry-showcases"
          className="scroll-mt-24 font-display text-base uppercase text-text"
        >
          Showcases
        </h3>
        {featuredShowcases.length > 0 && (
          <ul className="mt-6 space-y-5">
            {featuredShowcases.map((entry) => (
              <li key={entry.id} id={entry.id} className="scroll-mt-24">
                <ShowcaseFeature entry={entry} />
              </li>
            ))}
          </ul>
        )}
        {showcaseRows.length > 0 && (
          <ul className="mt-2">
            {showcaseRows.map((entry) => (
              <RecordRow key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3
          id="industry-record"
          className="scroll-mt-24 font-display text-base uppercase text-text"
        >
          Further engagements
        </h3>
        <ul className="mt-2">
          {record.map((entry) => (
            <RecordRow key={entry.id} entry={entry} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function entryPhotos(entry: OutreachEntry): OutreachImage[] {
  if (entry.images?.length) return entry.images;
  return entry.image ? [entry.image] : [];
}

function SocietyFeature({ entry }: { entry: OutreachEntry }) {
  const photos = entryPhotos(entry);
  const gallery = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption,
  }));

  return (
    <HudCard accent="cyan" className="overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="grid grid-cols-2 gap-px bg-grid-dim">
          {photos.map((photo, index) => (
            <RoboPhoto
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              gallery={gallery}
              galleryIndex={index}
              sizes="(max-width: 1024px) 50vw, 28rem"
              className="bg-bg"
            />
          ))}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <OrgLogo entry={entry} />
            <p className="label-mono text-text-dim">{entry.standing}</p>
            <p className="label-mono text-cyan">{entry.year}</p>
          </div>
          <h3 className="mt-3 font-display text-base uppercase text-text">
            {entry.title}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-text-dim">
            {entry.summary}
          </p>
          <EntryLinks entry={entry} />
        </div>
      </div>
    </HudCard>
  );
}

export function SocietyRecord({ entries }: { entries: OutreachEntry[] }) {
  if (entries.length === 0) return null;
  const featured = entries.filter((entry) => entryPhotos(entry).length > 1);
  const rest = entries.filter((entry) => entryPhotos(entry).length <= 1);

  return (
    <div className="mt-8 space-y-8">
      {featured.length > 0 && (
        <ul className="space-y-5">
          {featured.map((entry) => (
            <li key={entry.id} id={entry.id} className="scroll-mt-24">
              <SocietyFeature entry={entry} />
            </li>
          ))}
        </ul>
      )}
      {rest.length > 0 && (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((entry) => (
            <li key={entry.id} id={entry.id} className="scroll-mt-24">
              <SelectedCard entry={entry} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
