import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import RoboPhoto from "@/components/ui/RoboPhoto";
import {
  ARCHIVE_TYPES,
  filterArchiveRecords,
  getArchiveRecords,
  type ArchiveRecord,
  type ArchiveType,
} from "@/content/archive";
import { siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: `Archive — ${siteTitle}`,
  description:
    "Field photographs, laboratory construction, exhibitions, awards, media, and documentary evidence linked to projects and laboratories.",
  alternates: { canonical: "/archive" },
};

const PAGE_SIZE = 12;

const FILTER_LABELS: Record<ArchiveType | "all", string> = {
  all: "All",
  field: "Field",
  exhibition: "Exhibition",
  award: "Award",
  laboratory: "Laboratory",
  project: "Project",
  media: "Media",
  career: "Career",
  research: "Research",
  documents: "Documents",
};

type PageProps = {
  searchParams: Promise<{ type?: string; page?: string }>;
};

function archiveHref(type: ArchiveType | "all", page = 1): string {
  const params = new URLSearchParams();
  if (type !== "all") params.set("type", type);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/archive?${qs}` : "/archive";
}

function parseType(raw?: string): ArchiveType | "all" {
  if (!raw || raw === "all") return "all";
  return ARCHIVE_TYPES.includes(raw as ArchiveType) ? (raw as ArchiveType) : "all";
}

function buildGallery(records: ArchiveRecord[]) {
  if (records.length <= 1) return undefined;
  return records.map((record, i) => ({
    src: record.src,
    alt: record.alt,
    tag: `LOG.${String(i + 1).padStart(3, "0")}`,
    caption: record.institution
      ? `${record.caption} — ${record.institution}`
      : record.caption,
    description: record.description ?? record.alt,
    link: record.projectHref
      ? { href: record.projectHref, label: record.projectTitle ?? "Project" }
      : record.laboratoryHref
        ? {
            href: record.laboratoryHref,
            label: record.laboratoryTitle ?? "Laboratory",
          }
        : undefined,
  }));
}

function ArchiveFilters({
  activeType,
}: {
  activeType: ArchiveType | "all";
}) {
  const filters: Array<ArchiveType | "all"> = ["all", ...ARCHIVE_TYPES];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((type) => (
        <Link
          key={type}
          href={archiveHref(type)}
          aria-current={activeType === type ? "true" : undefined}
          className={`label-mono border px-3 py-1.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
            activeType === type
              ? "border-cyan bg-cyan/10 text-cyan"
              : "border-grid-dim text-text-dim hover:border-cyan/40 hover:text-cyan"
          }`}
        >
          {FILTER_LABELS[type]}
        </Link>
      ))}
    </div>
  );
}

function ArchiveGrid({
  records,
  page,
  totalPages,
  activeType,
}: {
  records: ArchiveRecord[];
  page: number;
  totalPages: number;
  activeType: ArchiveType | "all";
}) {
  const gallery = buildGallery(records);

  if (records.length === 0) {
    return (
      <div className="border border-grid-dim bg-bg-raised/40 p-8 text-center">
        <p className="font-body text-text-dim">
          No archive records match this filter.
        </p>
        <Link
          href="/archive"
          className="label-mono mt-4 inline-block text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          Show all →
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {records.map((record, i) => {
          const globalIndex = (page - 1) * PAGE_SIZE + i;
          const logTag = `LOG.${String(globalIndex + 1).padStart(3, "0")}`;
          const caption = record.institution
            ? `${record.caption} — ${record.institution}`
            : record.caption;

          const link = record.projectHref
            ? { href: record.projectHref, label: record.projectTitle ?? "Project" }
            : record.laboratoryHref
              ? {
                  href: record.laboratoryHref,
                  label: record.laboratoryTitle ?? "Laboratory",
                }
              : undefined;

          return (
            <li key={record.id} className="flex flex-col">
              <RoboPhoto
                src={record.src}
                alt={record.alt}
                tag={logTag}
                caption={caption}
                description={record.description ?? record.alt}
                link={link}
                aspect={
                  record.orientation === "portrait"
                    ? "aspect-[4/5]"
                    : "aspect-[3/2]"
                }
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="h-full border border-grid-dim"
                gallery={gallery}
                galleryIndex={i}
              />

              <div className="mt-3 space-y-1 border-l border-grid-dim pl-3">
                <p className="label-mono text-cyan">ARCHIVE {logTag}</p>
                <p className="font-body text-sm text-text">{record.title}</p>
                <p className="label-mono text-text-dim">
                  {record.year && <span>{record.year} · </span>}
                  {FILTER_LABELS[record.archiveType]}
                </p>
                {(record.projectHref || record.laboratoryHref) && (
                  <p className="label-mono text-xs">
                    {record.projectHref && (
                      <Link
                        href={record.projectHref}
                        className="text-cyan transition-colors hover:text-text"
                      >
                        {record.projectTitle} →
                      </Link>
                    )}
                    {record.laboratoryHref && (
                      <Link
                        href={record.laboratoryHref}
                        className="text-cyan transition-colors hover:text-text"
                      >
                        {record.laboratoryTitle} →
                      </Link>
                    )}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <nav
          aria-label="Archive pagination"
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {page > 1 && (
            <Link
              href={archiveHref(activeType, page - 1)}
              className="label-mono border border-grid-dim px-4 py-2 text-text-dim transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              ← Previous
            </Link>
          )}
          <span className="label-mono text-text-dim">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={archiveHref(activeType, page + 1)}
              className="label-mono border border-grid-dim px-4 py-2 text-text-dim transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              Load more →
            </Link>
          )}
        </nav>
      )}
    </>
  );
}

export default async function ArchivePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeType = parseType(params.type);
  const page = Math.max(1, Number(params.page) || 1);

  const allRecords = filterArchiveRecords(getArchiveRecords(), activeType);
  const totalPages = Math.max(1, Math.ceil(allRecords.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const sliceStart = (safePage - 1) * PAGE_SIZE;
  const pageRecords = allRecords.slice(sliceStart, sliceStart + PAGE_SIZE);

  return (
    <main className="section-shell py-16 lg:py-24">
      <p className="label-mono text-cyan">
        Archive <span className="text-text-dim">{"//"} Documentary evidence</span>
      </p>
      <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
        Archive
      </h1>
      <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
      <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
        Contextual records from field deployments, laboratory construction,
        exhibitions, awards, and research evidence — each linked back to the
        work and laboratories it documents.
      </p>

      <div className="mt-10 border border-grid-dim bg-bg-raised/20 p-5 sm:p-6">
        <p className="label-mono text-text-dim">
          <span className="text-cyan">{allRecords.length}</span> records
          {activeType !== "all" && (
            <span> · {FILTER_LABELS[activeType]}</span>
          )}
        </p>

        <Suspense
          fallback={
            <p className="label-mono mt-4 text-text-dim">Loading filters…</p>
          }
        >
          <div className="mt-4">
            <ArchiveFilters activeType={activeType} />
          </div>
        </Suspense>
      </div>

      <div className="mt-12">
        <ArchiveGrid
          records={pageRecords}
          page={safePage}
          totalPages={totalPages}
          activeType={activeType}
        />
      </div>
    </main>
  );
}
