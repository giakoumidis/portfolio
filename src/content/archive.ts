import { getFieldPhotos } from "@/content/field-photos";
import { outreachEntries, outreachEntryHref } from "@/content/outreach";
import type { FieldPhoto, ProjectImage } from "@/lib/types";

export type ArchiveType =
  | "field"
  | "exhibition"
  | "award"
  | "laboratory"
  | "project"
  | "media"
  | "career"
  | "research"
  | "documents";

export type ArchiveRecord = {
  id: string;
  title: string;
  year: string;
  archiveType: ArchiveType;
  institution?: string;
  caption: string;
  description?: string;
  src: string;
  alt: string;
  orientation?: "landscape" | "portrait";
  projectHref?: string;
  projectTitle?: string;
  laboratoryHref?: string;
  laboratoryTitle?: string;
  /** Engagements depicted in this photograph. */
  outreachLinks?: { href: string; title: string }[];
};

export const ARCHIVE_TYPES: readonly ArchiveType[] = [
  "field",
  "exhibition",
  "award",
  "laboratory",
  "project",
  "media",
  "career",
  "research",
  "documents",
] as const;

const EXHIBITION_HINTS =
  /\b(exhibition|expo|global rail|booth|festival|adipec|driftx)\b/i;
const AWARD_HINTS = /\b(challenge|competition|award|rta|olympiad|prize)\b/i;

/** Pull a four-digit year from location / caption strings when present. */
function yearFromLocation(location?: string, caption?: string): string {
  const haystack = [location, caption].filter(Boolean).join(" ");
  const match = haystack.match(/\b(19|20)\d{2}\b/);
  return match?.[0] ?? "";
}

function institutionFromLocation(location?: string): string | undefined {
  if (!location) return undefined;
  const parts = location.split("·").map((part) => part.trim());
  const withoutYear = parts.filter((part) => !/^\d{4}$/.test(part));
  const label = withoutYear.join(" · ").trim();
  return label || undefined;
}

function inferArchiveType(photo: FieldPhoto): ArchiveType {
  if (photo.src.includes("/awards/")) return "award";
  if (photo.project?.href.startsWith("/laboratories/")) return "laboratory";
  if (photo.project?.href.startsWith("/projects/")) return "project";

  const loc = photo.location ?? "";
  if (EXHIBITION_HINTS.test(loc) || EXHIBITION_HINTS.test(photo.caption)) {
    return "exhibition";
  }
  if (AWARD_HINTS.test(loc) || AWARD_HINTS.test(photo.caption)) {
    return "award";
  }
  return "field";
}

function fieldPhotoToArchiveRecord(
  photo: FieldPhoto,
  index: number,
): ArchiveRecord {
  const archiveType = inferArchiveType(photo);
  const isLab = photo.project?.href.startsWith("/laboratories/");

  return {
    id: `archive-${String(index + 1).padStart(3, "0")}`,
    title: photo.caption,
    year: yearFromLocation(photo.location, photo.caption),
    archiveType,
    institution: institutionFromLocation(photo.location),
    caption: photo.caption,
    description: photo.description ?? photo.alt,
    src: photo.src,
    alt: photo.alt,
    orientation: photo.orientation,
    projectHref: isLab ? undefined : photo.project?.href,
    projectTitle: isLab ? undefined : photo.project?.title,
    laboratoryHref: isLab ? photo.project?.href : undefined,
    laboratoryTitle: isLab ? photo.project?.title : undefined,
  };
}

/** Chip an engagement when this photograph is the one shown on that record. */
function attachOutreach(record: ArchiveRecord): ArchiveRecord {
  const outreachLinks = outreachEntries
    .filter((entry) => {
      const srcs = [
        entry.image?.src,
        ...(entry.images ?? []).map((image) => image.src),
      ];
      return srcs.includes(record.src);
    })
    .map((entry) => ({
      href: outreachEntryHref(entry),
      title: entry.title,
    }));

  return outreachLinks.length > 0 ? { ...record, outreachLinks } : record;
}

/**
 * Caption, description, and link shown on a photograph.
 * Archive, project case files, and laboratory hubs all use this shape.
 */
export type PhotoFigure = {
  src: string;
  alt: string;
  caption: string;
  description?: string;
  link?: { href: string; label: string };
  orientation?: "landscape" | "portrait";
};

/** The text and link the archive shows under a photograph. */
export function photoFigure(
  record: ArchiveRecord,
  options?: { hideHref?: string },
): PhotoFigure {
  const caption = record.institution
    ? `${record.caption} — ${record.institution}`
    : record.caption;
  const description = record.description ?? record.alt;
  const link = record.projectHref
    ? { href: record.projectHref, label: record.projectTitle ?? "Project" }
    : record.laboratoryHref
      ? {
          href: record.laboratoryHref,
          label: record.laboratoryTitle ?? "Laboratory",
        }
      : undefined;

  return {
    src: record.src,
    alt: record.alt,
    caption,
    description: description !== caption ? description : undefined,
    link: link && link.href !== options?.hideHref ? link : undefined,
    orientation: record.orientation,
  };
}

/** All archive records derived from field photographs and linked case files. */
export function getArchiveRecords(): ArchiveRecord[] {
  return getFieldPhotos().map(fieldPhotoToArchiveRecord).map(attachOutreach);
}

/** Archive records keyed by image path, for photo frames outside the archive. */
export function getArchiveBySrc(): Map<string, ArchiveRecord> {
  return new Map(getArchiveRecords().map((record) => [record.src, record]));
}

/**
 * Photo frame for a project or laboratory image.
 * Uses the archive record when one exists, so the caption and description
 * match the archive. Falls back to the image's own caption and alt text.
 */
export function figureForImage(
  image: Pick<ProjectImage, "src" | "alt" | "caption" | "orientation">,
  bySrc: Map<string, ArchiveRecord>,
  options?: { hideHref?: string },
): PhotoFigure {
  const record = bySrc.get(image.src);
  if (record) return photoFigure(record, options);
  return {
    src: image.src,
    alt: image.alt,
    caption: image.caption,
    description: image.alt !== image.caption ? image.alt : undefined,
    orientation: image.orientation,
  };
}

/** Resolve homepage / hub teaser photos by src path. */
export function getArchiveTeasers(srcs: string[]): ArchiveRecord[] {
  const bySrc = getArchiveBySrc();
  return srcs
    .map((src) => bySrc.get(src))
    .filter((record): record is ArchiveRecord => record !== undefined);
}

/** Filter archive records by type; omit or pass `"all"` for the full set. */
export function filterArchiveRecords(
  records: ArchiveRecord[],
  type?: ArchiveType | "all" | null,
): ArchiveRecord[] {
  if (!type || type === "all") return records;
  return records.filter((record) => record.archiveType === type);
}
