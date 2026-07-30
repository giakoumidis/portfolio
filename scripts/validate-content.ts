import { infrastructureRecords } from "../src/content/infrastructure";
import { researchOutputs } from "../src/content/research-outputs";
import { taxonomyTerms } from "../src/content/taxonomy";
import { workRecords } from "../src/content/work";
import {
  APPROVED_RELATION_TYPES,
  ENVIRONMENT_RELATION_TYPES,
  isRelationType,
} from "../src/lib/relations";
import type {
  EntityRef,
  EvidenceRef,
  Facet,
  InfrastructureRecord,
  ProjectRecord,
  RelationType,
  ResearchOutputRecord,
} from "../src/lib/types";

type Issue = {
  entity?: string;
  field?: string;
  error: string;
  hint?: string;
};

const issues: Issue[] = [];

function fail(
  error: string,
  opts: { entity?: string; field?: string; hint?: string } = {},
) {
  issues.push({ error, ...opts });
}

function suggest(value: string, candidates: string[]): string | undefined {
  const lower = value.toLowerCase();
  const hit = candidates.find(
    (c) =>
      c.toLowerCase() === lower ||
      c.toLowerCase().includes(lower) ||
      lower.includes(c.toLowerCase()),
  );
  return hit ? `Did you mean: "${hit}"?` : undefined;
}

/* ---- Taxonomy ---- */

const facetSlugs = new Map<Facet, Set<string>>();
const allTaxonomySlugs = new Set<string>();
const aliasOwners = new Map<string, string>();

for (const term of taxonomyTerms) {
  if (allTaxonomySlugs.has(term.slug)) {
    fail(`Duplicate taxonomy slug "${term.slug}"`, {
      field: "taxonomy",
    });
  }
  allTaxonomySlugs.add(term.slug);

  if (!facetSlugs.has(term.facet)) facetSlugs.set(term.facet, new Set());
  const within = facetSlugs.get(term.facet)!;
  if (within.has(term.slug)) {
    fail(`Duplicate taxonomy slug within facet ${term.facet}: "${term.slug}"`);
  }
  within.add(term.slug);

  const aliases = [term.slug, term.label, ...(term.aliases ?? [])];
  for (const alias of aliases) {
    const key = alias.toLowerCase();
    const owner = aliasOwners.get(key);
    if (owner && owner !== term.slug) {
      fail(`Alias collision "${alias}" owned by both "${owner}" and "${term.slug}"`, {
        field: "taxonomy.aliases",
      });
    }
    aliasOwners.set(key, term.slug);
  }
}

function assertTaxonomy(
  slug: string,
  expectedFacet: Facet,
  entity: string,
  field: string,
) {
  const term = taxonomyTerms.find((t) => t.slug === slug);
  if (!term) {
    fail(`Unknown taxonomy slug "${slug}"`, {
      entity,
      field,
      hint: suggest(slug, [...allTaxonomySlugs]),
    });
    return;
  }
  if (term.facet !== expectedFacet) {
    fail(
      `Taxonomy "${slug}" has facet "${term.facet}" but "${expectedFacet}" was expected`,
      { entity, field },
    );
  }
}

/* ---- Entities ---- */

const entityKeys = new Set<string>();

function registerEntity(type: string, slug: string) {
  const key = `${type}:${slug}`;
  if (entityKeys.has(key)) {
    fail(`Duplicate entity ${key}`);
  }
  entityKeys.add(key);
}

for (const record of workRecords) registerEntity("project", record.slug);
for (const record of infrastructureRecords)
  registerEntity("infrastructure", record.slug);
for (const record of researchOutputs)
  registerEntity("research-output", record.slug);

function assertEntityRef(
  ref: EntityRef,
  entity: string,
  field: string,
) {
  const key = `${ref.type}:${ref.slug}`;
  if (!entityKeys.has(key)) {
    const candidates = [...entityKeys]
      .filter((k) => k.startsWith(`${ref.type}:`))
      .map((k) => k.slice(ref.type.length + 1));
    fail(`Entity "${key}" does not exist`, {
      entity,
      field,
      hint: suggest(ref.slug, candidates),
    });
  }
}

function assertNoTodo(text: string | undefined, entity: string, field: string) {
  if (!text) return;
  if (/\bTODO\b|\bFIXME\b|\bNEEDS REVIEW\b/i.test(text)) {
    fail(`Published/draft record contains review marker in ${field}`, {
      entity,
      field,
    });
  }
}

function validateEvidence(
  evidence: EvidenceRef[] | undefined,
  entity: string,
) {
  (evidence ?? []).forEach((item, i) => {
    if (item.target) {
      assertEntityRef(item.target, entity, `evidence[${i}].target`);
    }
  });
}

function validateRelations(
  relations: ProjectRecord["relations"] | InfrastructureRecord["relations"],
  sourceType: string,
  sourceSlug: string,
) {
  const entity = `${sourceType}:${sourceSlug}`;
  const seen = new Set<string>();
  (relations ?? []).forEach((rel, i) => {
    if (!isRelationType(rel.type)) {
      fail(`Invalid relation type "${rel.type}"`, {
        entity,
        field: `relations[${i}].type`,
        hint: `Approved: ${APPROVED_RELATION_TYPES.join(", ")}`,
      });
      return;
    }
    assertEntityRef(rel.target, entity, `relations[${i}].target`);
    if (rel.target.type === sourceType && rel.target.slug === sourceSlug) {
      fail("Self-referential relationship", {
        entity,
        field: `relations[${i}]`,
      });
    }
    const dupKey = `${rel.type}->${rel.target.type}:${rel.target.slug}`;
    if (seen.has(dupKey)) {
      fail(`Duplicate relation ${dupKey}`, {
        entity,
        field: `relations[${i}]`,
      });
    }
    seen.add(dupKey);
    assertNoTodo(rel.label, entity, `relations[${i}].label`);
  });
}

function hasMeaningfulSignal(project: ProjectRecord): boolean {
  const hasApp = (project.facets.applications?.length ?? 0) > 0;
  const hasPlatform = (project.facets.platforms?.length ?? 0) > 0;
  const hasMethod = (project.facets.methods?.length ?? 0) > 0;
  const hasEnv = (project.relations ?? []).some((r) =>
    (ENVIRONMENT_RELATION_TYPES as RelationType[]).includes(r.type),
  );
  return hasApp || hasPlatform || hasMethod || hasEnv;
}

function validateProject(project: ProjectRecord) {
  const entity = `project:${project.slug}`;
  const status = project.status ?? "published";

  if (!project.title?.trim()) fail("Missing title", { entity, field: "title" });
  if (!project.summary?.trim())
    fail("Missing summary", { entity, field: "summary" });
  if (!project.contributionSummary?.trim()) {
    fail("Missing contributionSummary", {
      entity,
      field: "contributionSummary",
    });
  }
  if (!project.credits?.length) {
    fail("credits must be non-empty", { entity, field: "credits" });
  }
  project.credits?.forEach((credit, i) => {
    if (!credit.name?.trim()) {
      fail("Credit missing name", { entity, field: `credits[${i}].name` });
    }
  });
  if (
    !project.period.label &&
    project.period.startYear === undefined &&
    project.period.endYear === undefined
  ) {
    fail("Missing period", { entity, field: "period" });
  }

  if (!project.facets.domains?.length) {
    fail("domains must be non-empty", { entity, field: "facets.domains" });
  }
  if (!project.facets.contributions?.length) {
    fail("contributions must be non-empty", {
      entity,
      field: "facets.contributions",
    });
  }

  for (const slug of project.facets.domains ?? []) {
    assertTaxonomy(slug, "domain", entity, "facets.domains");
  }
  for (const slug of project.facets.contributions ?? []) {
    assertTaxonomy(slug, "contribution", entity, "facets.contributions");
  }
  for (const slug of project.facets.applications ?? []) {
    assertTaxonomy(slug, "application", entity, "facets.applications");
  }
  for (const slug of project.facets.platforms ?? []) {
    assertTaxonomy(slug, "platform", entity, "facets.platforms");
  }
  for (const slug of project.facets.methods ?? []) {
    assertTaxonomy(slug, "method", entity, "facets.methods");
  }
  for (const slug of project.facets.outcomes ?? []) {
    assertTaxonomy(slug, "outcome", entity, "facets.outcomes");
  }

  validateRelations(project.relations, "project", project.slug);
  validateEvidence(project.evidence, entity);

  for (const ref of project.explicitRelated ?? []) {
    assertEntityRef(ref, entity, "explicitRelated");
  }

  if (status === "published") {
    if (!hasMeaningfulSignal(project)) {
      fail(
        "Published project needs application, infrastructure relation, platform, or specialist method",
        { entity, field: "facets|relations" },
      );
    }
    const hasEvidence =
      (project.evidence?.length ?? 0) > 0 || project.evidencePending === true;
    if (!hasEvidence) {
      fail("Published project needs evidence or evidencePending", {
        entity,
        field: "evidence",
      });
    }
    assertNoTodo(project.contributionSummary, entity, "contributionSummary");
    assertNoTodo(project.summary, entity, "summary");
  }
}

function validateInfrastructure(record: InfrastructureRecord) {
  const entity = `infrastructure:${record.slug}`;
  if (!record.title?.trim()) fail("Missing title", { entity, field: "title" });
  if (!record.summary?.trim())
    fail("Missing summary", { entity, field: "summary" });
  if (!record.contributionSummary?.trim()) {
    fail("Missing contributionSummary", {
      entity,
      field: "contributionSummary",
    });
  }
  if (!record.domains?.length) {
    fail("domains must be non-empty", { entity, field: "domains" });
  }
  if (!record.contributions?.length) {
    fail("contributions must be non-empty", {
      entity,
      field: "contributions",
    });
  }
  for (const slug of record.domains) {
    assertTaxonomy(slug, "domain", entity, "domains");
  }
  for (const slug of record.contributions) {
    assertTaxonomy(slug, "contribution", entity, "contributions");
  }
  for (const slug of record.inventory ?? []) {
    assertTaxonomy(slug, "platform", entity, "inventory");
  }
  validateRelations(record.relations, "infrastructure", record.slug);
  validateEvidence(record.evidence, entity);
}

function validateResearchOutput(record: ResearchOutputRecord) {
  const entity = `research-output:${record.slug}`;
  if (!record.title?.trim()) fail("Missing title", { entity, field: "title" });
  if (!record.venue?.trim()) fail("Missing venue", { entity, field: "venue" });
  if (!record.year?.trim()) fail("Missing year", { entity, field: "year" });
  if (!record.url?.trim()) fail("Missing url", { entity, field: "url" });
}

/* ---- Run ---- */

for (const project of workRecords) validateProject(project);
for (const infra of infrastructureRecords) validateInfrastructure(infra);
for (const output of researchOutputs) validateResearchOutput(output);

if (issues.length > 0) {
  console.error("\nCONTENT VALIDATION FAILED\n");
  for (const issue of issues) {
    if (issue.entity) console.error(`Entity: ${issue.entity}`);
    if (issue.field) console.error(`Field: ${issue.field}`);
    console.error(`Error: ${issue.error}`);
    if (issue.hint) console.error(issue.hint);
    console.error("");
  }
  console.error(`${issues.length} issue(s) found.\n`);
  process.exit(1);
}

console.log(
  `Content validation passed (${workRecords.length} projects, ${infrastructureRecords.length} infrastructure, ${researchOutputs.length} research outputs, ${taxonomyTerms.length} taxonomy terms).`,
);
