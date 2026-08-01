import { getFieldPhotos } from "@/content/field-photos";
import type { FieldPhoto } from "@/lib/types";

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
  if (photo.project?.href.startsWith("/work/")) return "project";

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

/** All archive records derived from field photographs and linked case files. */
export function getArchiveRecords(): ArchiveRecord[] {
  return getFieldPhotos().map(fieldPhotoToArchiveRecord);
}

/** Resolve homepage / hub teaser photos by src path. */
export function getArchiveTeasers(srcs: string[]): ArchiveRecord[] {
  const bySrc = new Map(getArchiveRecords().map((record) => [record.src, record]));
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
