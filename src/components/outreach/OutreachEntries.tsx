import Link from "next/link";

import ActionLink from "@/components/ui/ActionLink";
import HudCard from "@/components/ui/HudCard";
import RoboPhoto from "@/components/ui/RoboPhoto";
import {
  getOutreachBand,
  outreachEntryHref,
  resolveOutreachLinks,
  societyClusters,
  type OutreachEntry,
  type OutreachImage,
} from "@/content/outreach";

function OrgLogo({
  entry,
  large = false,
}: {
  entry: OutreachEntry;
  large?: boolean;
}) {
  if (!entry.logo) return null;
  const plate =
    entry.logoSurface === "dark"
      ? "border border-grid-dim bg-bg"
      : "bg-white";
  const size = large ? "h-14 w-28" : "h-10 w-[4.75rem]";
  const mark = large ? "max-h-9" : "max-h-7";
  return (
    <span
      className={`flex shrink-0 items-center justify-center px-2 ${size} ${plate}`}
    >
      {/* Official marks include SVG wordmarks, which next/image does not serve. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={entry.logo}
        alt=""
        className={`${mark} max-w-full object-contain`}
      />
    </span>
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

function EngagementMark({ entry }: { entry: OutreachEntry }) {
  return (
    <li
      id={entry.id}
      className="scroll-mt-24 flex min-h-32 flex-col items-center justify-center gap-3 border border-grid-dim bg-bg-raised/20 px-3 py-5 text-center"
    >
      <OrgLogo entry={entry} large />
      <h3 className="font-body text-sm font-medium leading-snug text-text">
        {entry.title}
      </h3>
    </li>
  );
}

function ShowcaseFeature({
  entry,
  titleFirst = false,
}: {
  entry: OutreachEntry;
  /** Title, then place and date. Used for the society flagship. */
  titleFirst?: boolean;
}) {
  const photos = entryPhotos(entry);
  const gallery = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption,
  }));
  const placeLine = [entry.place, entry.year].filter(Boolean).join(" · ");

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
          {titleFirst ? (
            <>
              <h3 className="font-display text-base uppercase text-text">
                {entry.title}
              </h3>
              {placeLine && (
                <p className="label-mono mt-2 text-cyan">{placeLine}</p>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <OrgLogo entry={entry} />
                <p className="label-mono text-text-dim">{entry.standing}</p>
                <p className="label-mono text-cyan">{entry.year}</p>
              </div>
              <h3 className="mt-3 font-display text-base uppercase text-text">
                {entry.title}
              </h3>
            </>
          )}
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
  const lead = selected.find((entry) => entry.id === "global-rail");
  const selectedCards = selected.filter((entry) => entry.id !== "global-rail");
  const roster = [
    ...showcases.filter((entry) => (entry.images?.length ?? 0) === 0),
    ...getOutreachBand("industry", "record"),
  ];

  return (
    <div className="mt-10 space-y-14">
      <div>
        <h3
          id="industry-selected"
          className="scroll-mt-24 font-display text-base uppercase text-text"
        >
          Selected collaborations
        </h3>
        {lead && (
          <div id={lead.id} className="mt-6 scroll-mt-24">
            <ShowcaseFeature entry={lead} />
          </div>
        )}
        <ul className="mt-6 grid gap-5 lg:grid-cols-2">
          {selectedCards.map((entry) => (
            <li key={entry.id} id={entry.id} className="scroll-mt-24">
              <SelectedCard entry={entry} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3
          id="industry-record"
          className="scroll-mt-24 font-display text-base uppercase text-text"
        >
          Engagement record
        </h3>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {roster.map((entry) => (
            <EngagementMark key={entry.id} entry={entry} />
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

/** Same card as industry selections: one photograph, then the record. */
function SocietyCard({ entry }: { entry: OutreachEntry }) {
  const meta = [entry.place, entry.year].filter(Boolean).join(" · ");

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
        <h3 className="font-display text-base uppercase text-text">
          {entry.title}
        </h3>
        {meta && <p className="label-mono mt-2 text-cyan">{meta}</p>}
        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-text-dim">
          {entry.summary}
        </p>
        <EntryLinks entry={entry} />
      </div>
    </HudCard>
  );
}

export function SocietyRecord({ entries }: { entries: OutreachEntry[] }) {
  if (entries.length === 0) return null;
  const lead = entries.filter((entry) => entry.band === "showcase");
  const grouped = entries.filter((entry) => entry.band !== "showcase");

  return (
    <div className="mt-12 space-y-16">
      {lead.map((entry) => (
        <div key={entry.id} id={entry.id} className="scroll-mt-24">
          <ShowcaseFeature entry={entry} titleFirst />
        </div>
      ))}
      {societyClusters.map((cluster) => {
        const group = grouped.filter((entry) => entry.cluster === cluster.id);
        if (group.length === 0) return null;

        return (
          <section key={cluster.id} aria-labelledby={`society-${cluster.id}`}>
            <h2
              id={`society-${cluster.id}`}
              className="scroll-mt-24 font-display text-base uppercase text-text"
            >
              {cluster.title}
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
              {cluster.note}
            </p>
            <ul className="mt-6 grid gap-5 lg:grid-cols-2">
              {group.map((entry) => (
                <li key={entry.id} id={entry.id} className="scroll-mt-24">
                  <SocietyCard entry={entry} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
