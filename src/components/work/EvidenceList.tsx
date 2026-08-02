import LocalVideoEvidenceLink from "@/components/ui/LocalVideoEvidenceLink";
import type { ResolvedEvidence } from "@/lib/query";
import type { EvidenceType } from "@/lib/types";

const EVIDENCE_LABEL: Record<EvidenceType, string> = {
  publication: "Publication",
  patent: "Technical Document",
  award: "Award",
  "external-article": "Media Coverage",
  "institutional-page": "Media Coverage",
  video: "Video",
  "field-post": "Field Record",
  photograph: "Photograph",
  document: "Technical Document",
};

type EvidenceListProps = {
  items: ResolvedEvidence[];
  pending?: boolean;
};

export default function EvidenceList({ items, pending }: EvidenceListProps) {
  if (pending && items.length === 0) {
    return (
      <p className="mt-4 font-body text-sm text-text-dim">
        Evidence pending — structured artifacts will be linked here.
      </p>
    );
  }

  if (items.length === 0) return null;

  return (
    <ul className="mt-4 space-y-4">
      {items.map((item, i) => {
        const title = item.resolved?.title ?? item.title ?? item.type;
        const url = item.resolved?.url ?? item.url;
        const date = item.date ?? item.resolved?.year;
        const source = item.resolved
          ? item.resolved.venue
          : item.note;
        const proves =
          item.note && item.resolved
            ? item.note
            : !item.resolved
              ? item.note
              : undefined;
        const label = EVIDENCE_LABEL[item.type] ?? item.type;

        return (
          <li
            key={`${item.type}-${i}-${title}`}
            className="border border-grid-dim bg-bg/40 p-4"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="label-mono text-cyan">{label}</p>
              {date && (
                <p className="label-mono text-text-dim">{date}</p>
              )}
            </div>
            {url ? (
              item.type === "video" && url.startsWith("/") ? (
                <LocalVideoEvidenceLink src={url} title={title} />
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block font-body text-sm font-medium text-text transition-colors hover:text-cyan hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  {title}
                </a>
              )
            ) : (
              <p className="mt-2 font-body text-sm text-text">{title}</p>
            )}
            {source && (
              <p className="mt-1 font-body text-sm text-text-dim">
                Source · {source}
              </p>
            )}
            {proves && proves !== source && (
              <p className="mt-2 font-body text-sm text-text-dim">
                Proves · {proves}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
