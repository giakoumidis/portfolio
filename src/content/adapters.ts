import { infrastructureRecords } from "@/content/infrastructure";
import { getResearchOutput } from "@/content/research-outputs";
import { taxonomyLabel } from "@/content/taxonomy";
import { workRecords } from "@/content/work";
import type {
  InfrastructureRecord,
  Project,
  ProjectPaper,
  ProjectRecord,
} from "@/lib/types";

function evidencePapers(
  evidence: ProjectRecord["evidence"] | InfrastructureRecord["evidence"],
): { primary?: ProjectPaper; related: ProjectPaper[] } {
  const papers: ProjectPaper[] = [];
  for (const item of evidence ?? []) {
    if (item.type !== "publication") continue;
    if (item.target?.type === "research-output") {
      const output = getResearchOutput(item.target.slug);
      if (output) {
        papers.push({
          title: output.title,
          venue: output.venue,
          year: output.year,
          link: output.url,
        });
        continue;
      }
    }
    if (item.title && item.url) {
      papers.push({
        title: item.title,
        venue: item.note ?? "External",
        year: item.date ?? "",
        link: item.url,
      });
    }
  }
  const [primary, ...related] = papers;
  return { primary, related };
}

/**
 * Adapt knowledge-graph records to the legacy homepage `Project` shape
 * so existing section components keep working during Milestone B.
 */
export function projectRecordToLegacy(record: ProjectRecord): Project {
  const domainId = record.facets.domains[0];
  const { primary, related } = evidencePapers(record.evidence);

  return {
    id: record.slug,
    title: record.title,
    domainId,
    domainLabel: taxonomyLabel(domainId),
    org: record.org ?? "",
    period: record.period.label,
    summary: record.summary,
    highlights: record.highlights ?? [],
    tags: [
      ...(record.facets.applications ?? []).map(taxonomyLabel),
      ...(record.facets.platforms ?? []).map(taxonomyLabel),
      ...(record.facets.methods ?? []).map(taxonomyLabel),
    ].slice(0, 5),
    video: record.video,
    images: record.imagesOnIndex === false ? undefined : record.images,
    paper: primary,
    relatedPapers: related.length > 0 ? related : undefined,
    link: record.link,
  };
}

export function infrastructureToLegacy(
  record: InfrastructureRecord,
): Project {
  const domainId = record.domains[0];
  const { primary, related } = evidencePapers(record.evidence);
  const allRelated = primary ? [primary, ...related] : related;

  return {
    id: record.slug,
    title: record.title,
    domainId,
    domainLabel: taxonomyLabel(domainId),
    org: record.org ?? "",
    period: record.period.label,
    summary: record.summary,
    highlights: record.highlights ?? [],
    tags: record.contributions.map(taxonomyLabel).slice(0, 5),
    video: record.video,
    images: record.imagesOnIndex === false ? undefined : record.images,
    link: record.link,
    relatedPapers: allRelated.length > 0 ? allRelated : undefined,
    relatedPapersLabel: record.relatedPapersLabel,
  };
}

/** Homepage projects list — derived from work records. */
export function getLegacyProjects(): Project[] {
  return workRecords.map(projectRecordToLegacy);
}

/** Homepage labs list — derived from infrastructure records. */
export function getLegacyLabs(): Project[] {
  return infrastructureRecords.map(infrastructureToLegacy);
}
