import { infrastructureRecords } from "@/content/infrastructure";
import { researchOutputs } from "@/content/research-outputs";
import {
  getTaxonomyByFacet,
  getTaxonomyTerm,
  taxonomyLabel,
} from "@/content/taxonomy";
import { flagshipProjectSlugs } from "@/content/homepage";
import { workRecords } from "@/content/work";
import {
  ENVIRONMENT_RELATION_TYPES,
  inverseOf,
  type InverseRelationType,
} from "@/lib/relations";
import type {
  ContentType,
  EntityRef,
  EvidenceRef,
  Facet,
  InfrastructureRecord,
  ProjectRecord,
  RelationType,
  ResearchOutputRecord,
  TaxonomySlug,
  TaxonomyTerm,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Non-scoring / low-signal terms for related-work fallback           */
/* ------------------------------------------------------------------ */

const NON_SCORING_TERMS = new Set([
  "python",
  "docker",
  "robotics",
  "artificial-intelligence",
  "research",
  "prototyping",
  "labview",
  "gazebo",
]);

/* ------------------------------------------------------------------ */
/*  Entity lookup                                                      */
/* ------------------------------------------------------------------ */

export type AnyEntity =
  | ProjectRecord
  | InfrastructureRecord
  | ResearchOutputRecord;

function entityKey(ref: EntityRef): string {
  return `${ref.type}:${ref.slug}`;
}

const entityIndex = new Map<string, AnyEntity>();

for (const record of workRecords) {
  entityIndex.set(entityKey({ type: "project", slug: record.slug }), record);
}
for (const record of infrastructureRecords) {
  entityIndex.set(
    entityKey({ type: "infrastructure", slug: record.slug }),
    record,
  );
}
for (const record of researchOutputs) {
  entityIndex.set(
    entityKey({ type: "research-output", slug: record.slug }),
    record,
  );
}

export function getEntity(ref: EntityRef): AnyEntity | undefined {
  return entityIndex.get(entityKey(ref));
}

export function getEntityBySlug(slug: string): AnyEntity | undefined {
  for (const entity of entityIndex.values()) {
    if (entity.slug === slug) return entity;
  }
  return undefined;
}

export function getAllWork(): ProjectRecord[] {
  return workRecords.filter((r) => r.status !== "draft");
}

export function getAllInfrastructure(): InfrastructureRecord[] {
  return infrastructureRecords.filter((r) => r.status !== "draft");
}

export function getProject(slug: string): ProjectRecord | undefined {
  const entity = getEntity({ type: "project", slug });
  return entity?.type === "project" ? entity : undefined;
}

/** Flagship projects first (homepage order), then remaining work by start year desc. */
export function getCuratedWork(): ProjectRecord[] {
  const all = getAllWork();
  const flagshipSet = new Set<string>(flagshipProjectSlugs);
  const flagships: ProjectRecord[] = [];

  for (const slug of flagshipProjectSlugs) {
    const project = getProject(slug);
    if (project) flagships.push(project);
  }

  const rest = all
    .filter((project) => !flagshipSet.has(project.slug))
    .sort(
      (a, b) =>
        (b.period.startYear ?? 0) - (a.period.startYear ?? 0),
    );

  return [...flagships, ...rest];
}

export type SpokeNeighbor = {
  slug: string;
  title: string;
};

export function getWorkNeighbors(slug: string): {
  prev: SpokeNeighbor | null;
  next: SpokeNeighbor | null;
} {
  const curated = getCuratedWork();
  const index = curated.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? curated[index - 1] : null;
  const next = index < curated.length - 1 ? curated[index + 1] : null;

  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}

export function getInfrastructureNeighbors(slug: string): {
  prev: SpokeNeighbor | null;
  next: SpokeNeighbor | null;
} {
  const all = getAllInfrastructure();
  const index = all.findIndex((record) => record.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}

export function getInfrastructure(
  slug: string,
): InfrastructureRecord | undefined {
  const entity = getEntity({ type: "infrastructure", slug });
  return entity?.type === "infrastructure" ? entity : undefined;
}

/* ------------------------------------------------------------------ */
/*  Directed relations + automatic inverses                            */
/* ------------------------------------------------------------------ */

export type ResolvedRelation = {
  type: RelationType | InverseRelationType;
  source: EntityRef;
  target: EntityRef;
  label?: string;
  /** True when this edge was derived as an inverse. */
  derived: boolean;
};

function collectOutgoing(source: EntityRef): ResolvedRelation[] {
  const entity = getEntity(source);
  if (!entity || !("relations" in entity) || !entity.relations) return [];
  return entity.relations.map((rel) => ({
    type: rel.type,
    source,
    target: rel.target,
    label: rel.label,
    derived: false,
  }));
}

/** All edges stored on entities (forward direction only). */
function allForwardEdges(): ResolvedRelation[] {
  const edges: ResolvedRelation[] = [];
  for (const record of workRecords) {
    edges.push(
      ...collectOutgoing({ type: "project", slug: record.slug }),
    );
  }
  for (const record of infrastructureRecords) {
    edges.push(
      ...collectOutgoing({ type: "infrastructure", slug: record.slug }),
    );
  }
  return edges;
}

export function getRelationsFrom(
  ref: EntityRef,
  relationTypes?: RelationType[],
): ResolvedRelation[] {
  let edges = collectOutgoing(ref);
  if (relationTypes) {
    edges = edges.filter((e) =>
      relationTypes.includes(e.type as RelationType),
    );
  }
  return edges;
}

export function getRelationsTo(
  ref: EntityRef,
  relationTypes?: RelationType[],
): ResolvedRelation[] {
  const incoming: ResolvedRelation[] = [];
  for (const edge of allForwardEdges()) {
    if (edge.target.type !== ref.type || edge.target.slug !== ref.slug) {
      continue;
    }
    const forwardType = edge.type as RelationType;
    if (relationTypes && !relationTypes.includes(forwardType)) continue;
    incoming.push({
      type: inverseOf(forwardType),
      source: edge.target,
      target: edge.source,
      label: edge.label,
      derived: true,
    });
  }
  return incoming;
}

export function getConnectedEntities(
  ref: EntityRef,
  relationTypes?: RelationType[],
): Array<{ entity: AnyEntity; relation: ResolvedRelation }> {
  const results: Array<{ entity: AnyEntity; relation: ResolvedRelation }> = [];
  const seen = new Set<string>();

  for (const rel of [
    ...getRelationsFrom(ref, relationTypes),
    ...getRelationsTo(ref, relationTypes),
  ]) {
    // For derived inverses, target is the original source project.
    const otherRef = rel.derived
      ? rel.target
      : rel.target.type === ref.type && rel.target.slug === ref.slug
        ? rel.source
        : rel.target;

    const key = entityKey(otherRef);
    if (seen.has(key)) continue;
    seen.add(key);
    const entity = getEntity(otherRef);
    if (entity) results.push({ entity, relation: rel });
  }
  return results;
}

/* ------------------------------------------------------------------ */
/*  Filter work                                                        */
/* ------------------------------------------------------------------ */

export type WorkFilterParams = {
  domains?: string[];
  applications?: string[];
  /** Infrastructure entity slugs via environment relations. */
  environments?: string[];
  platforms?: string[];
  methods?: string[];
  outcomes?: string[];
  contributions?: string[];
  contentTypes?: ContentType[];
  years?: number[];
};

const FILTER_PARAM_ORDER = [
  "domain",
  "application",
  "environment",
  "platform",
  "method",
  "outcome",
  "contribution",
  "type",
  "year",
] as const;

export type FilterParamKey = (typeof FILTER_PARAM_ORDER)[number];

function asArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/** Parse URL search params into filter state; collect unknown values. */
export function parseWorkSearchParams(
  raw: Record<string, string | string[] | undefined>,
): { filters: WorkFilterParams; unknown: string[]; canonicalQuery: string } {
  const unknown: string[] = [];
  const knownKeys = new Set<string>(FILTER_PARAM_ORDER);

  for (const key of Object.keys(raw)) {
    if (!knownKeys.has(key)) unknown.push(key);
  }

  const domains = asArray(raw.domain).filter((s) => getTaxonomyTerm(s)?.facet === "domain");
  const applications = asArray(raw.application).filter(
    (s) => getTaxonomyTerm(s)?.facet === "application",
  );
  const platforms = asArray(raw.platform).filter(
    (s) => getTaxonomyTerm(s)?.facet === "platform",
  );
  const methods = asArray(raw.method).filter(
    (s) => getTaxonomyTerm(s)?.facet === "method",
  );
  const outcomes = asArray(raw.outcome).filter(
    (s) => getTaxonomyTerm(s)?.facet === "outcome",
  );
  const contributions = asArray(raw.contribution).filter(
    (s) => getTaxonomyTerm(s)?.facet === "contribution",
  );

  const envSlugs = new Set(getAllInfrastructure().map((i) => i.slug));
  const environments = asArray(raw.environment).filter((s) => envSlugs.has(s));

  const rawDomains = asArray(raw.domain);
  const rawApps = asArray(raw.application);
  const rawPlatforms = asArray(raw.platform);
  const rawMethods = asArray(raw.method);
  const rawOutcomes = asArray(raw.outcome);
  const rawEnvs = asArray(raw.environment);
  for (const s of rawDomains) if (!domains.includes(s)) unknown.push(`domain=${s}`);
  for (const s of rawApps) if (!applications.includes(s)) unknown.push(`application=${s}`);
  for (const s of rawPlatforms) if (!platforms.includes(s)) unknown.push(`platform=${s}`);
  for (const s of rawMethods) if (!methods.includes(s)) unknown.push(`method=${s}`);
  for (const s of rawOutcomes) if (!outcomes.includes(s)) unknown.push(`outcome=${s}`);
  for (const s of rawEnvs) if (!environments.includes(s)) unknown.push(`environment=${s}`);

  const years = asArray(raw.year)
    .map(Number)
    .filter((n) => Number.isFinite(n));

  const filters: WorkFilterParams = {
    domains: sortUnique(domains),
    applications: sortUnique(applications),
    environments: sortUnique(environments),
    platforms: sortUnique(platforms),
    methods: sortUnique(methods),
    outcomes: sortUnique(outcomes),
    contributions: sortUnique(contributions),
    years: [...new Set(years)].sort((a, b) => a - b),
  };

  return {
    filters,
    unknown,
    canonicalQuery: buildCanonicalQuery(filters),
  };
}

function sortUnique(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function buildCanonicalQuery(filters: WorkFilterParams): string {
  const params = new URLSearchParams();
  const append = (key: FilterParamKey, values?: Array<string | number>) => {
    for (const v of values ?? []) params.append(key, String(v));
  };
  append("domain", filters.domains);
  append("application", filters.applications);
  append("environment", filters.environments);
  append("platform", filters.platforms);
  append("method", filters.methods);
  append("outcome", filters.outcomes);
  append("contribution", filters.contributions);
  append("type", filters.contentTypes);
  append("year", filters.years);
  return params.toString();
}

function orMatch(selected: string[] | undefined, values: string[] | undefined): boolean {
  if (!selected || selected.length === 0) return true;
  if (!values || values.length === 0) return false;
  return selected.some((s) => values.includes(s));
}

function projectEnvironmentSlugs(project: ProjectRecord): string[] {
  return (project.relations ?? [])
    .filter((r) => ENVIRONMENT_RELATION_TYPES.includes(r.type))
    .filter((r) => r.target.type === "infrastructure")
    .map((r) => r.target.slug);
}

function projectYears(project: ProjectRecord): number[] {
  const years: number[] = [];
  if (project.period.startYear) years.push(project.period.startYear);
  if (project.period.endYear) years.push(project.period.endYear);
  return years;
}

export function filterWork(filters: WorkFilterParams): ProjectRecord[] {
  return getAllWork().filter((project) => {
    if (!orMatch(filters.domains, project.facets.domains)) return false;
    if (!orMatch(filters.applications, project.facets.applications)) return false;
    if (!orMatch(filters.platforms, project.facets.platforms)) return false;
    if (!orMatch(filters.methods, project.facets.methods)) return false;
    if (!orMatch(filters.outcomes, project.facets.outcomes)) return false;
    if (!orMatch(filters.contributions, project.facets.contributions)) return false;
    if (!orMatch(filters.environments, projectEnvironmentSlugs(project))) {
      return false;
    }
    if (filters.years && filters.years.length > 0) {
      const years = projectYears(project);
      if (!filters.years.some((y) => years.includes(y))) return false;
    }
    return true;
  });
}

export function hasActiveWorkFilters(filters: WorkFilterParams): boolean {
  return Boolean(
    filters.domains?.length ||
      filters.applications?.length ||
      filters.environments?.length ||
      filters.platforms?.length ||
      filters.methods?.length ||
      filters.outcomes?.length ||
      filters.contributions?.length ||
      filters.contentTypes?.length ||
      filters.years?.length,
  );
}

/* ------------------------------------------------------------------ */
/*  Related work                                                       */
/* ------------------------------------------------------------------ */

function facetOverlapScore(
  a: ProjectRecord,
  b: ProjectRecord,
): number {
  let score = 0;
  const count = (left?: string[], right?: string[], weight = 1) => {
    if (!left || !right) return;
    for (const slug of left) {
      if (NON_SCORING_TERMS.has(slug)) continue;
      if (right.includes(slug)) score += weight;
    }
  };
  count(a.facets.applications, b.facets.applications, 4);
  count(a.facets.platforms, b.facets.platforms, 3);
  count(a.facets.domains, b.facets.domains, 2);
  count(a.facets.methods, b.facets.methods, 2);
  count(a.facets.outcomes, b.facets.outcomes, 1);

  const envA = new Set(projectEnvironmentSlugs(a));
  for (const slug of projectEnvironmentSlugs(b)) {
    if (envA.has(slug)) score += 3;
  }
  return score;
}

export function getRelatedWork(
  slug: string,
  limit = 3,
): ProjectRecord[] {
  const project = getProject(slug);
  if (!project) return [];

  const results: ProjectRecord[] = [];
  const seen = new Set<string>([slug]);

  // 1. Explicit editorial connections
  for (const ref of project.explicitRelated ?? []) {
    if (ref.type !== "project" || seen.has(ref.slug)) continue;
    const related = getProject(ref.slug);
    if (related) {
      results.push(related);
      seen.add(ref.slug);
    }
    if (results.length >= limit) return results;
  }

  // 2. Meaningful typed relationships to other projects
  for (const { entity } of getConnectedEntities({
    type: "project",
    slug,
  })) {
    if (entity.type !== "project" || seen.has(entity.slug)) continue;
    results.push(entity);
    seen.add(entity.slug);
    if (results.length >= limit) return results;
  }

  // Also: projects sharing the same infrastructure via relations
  for (const envSlug of projectEnvironmentSlugs(project)) {
    const hubProjects = getRelationsTo(
      { type: "infrastructure", slug: envSlug },
      ENVIRONMENT_RELATION_TYPES,
    );
    for (const rel of hubProjects) {
      const otherSlug = rel.target.slug;
      if (seen.has(otherSlug)) continue;
      const other = getProject(otherSlug);
      if (other) {
        results.push(other);
        seen.add(otherSlug);
      }
      if (results.length >= limit) return results;
    }
  }

  // 3. Weighted facet similarity
  const scored = getAllWork()
    .filter((p) => !seen.has(p.slug))
    .map((p) => ({ project: p, score: facetOverlapScore(project, p) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  for (const item of scored) {
    results.push(item.project);
    if (results.length >= limit) break;
  }

  return results;
}

/* ------------------------------------------------------------------ */
/*  Composed view models                                               */
/* ------------------------------------------------------------------ */

export type ResolvedTaxonomy = TaxonomyTerm & { href: string };

export type ResolvedEvidence = EvidenceRef & {
  resolved?: ResearchOutputRecord;
};

export type ProjectCaseFile = {
  record: ProjectRecord;
  domainTerms: ResolvedTaxonomy[];
  applicationTerms: ResolvedTaxonomy[];
  platformTerms: ResolvedTaxonomy[];
  methodTerms: ResolvedTaxonomy[];
  contributionTerms: ResolvedTaxonomy[];
  outcomeTerms: ResolvedTaxonomy[];
  environments: Array<{
    record: InfrastructureRecord;
    relationType: RelationType;
    label?: string;
  }>;
  evidence: ResolvedEvidence[];
  related: ProjectRecord[];
};

function resolveTerms(
  slugs: TaxonomySlug[] | undefined,
  facet: Facet,
): ResolvedTaxonomy[] {
  if (!slugs) return [];
  return slugs
    .map((slug) => {
      const term = getTaxonomyTerm(slug);
      if (!term || term.facet !== facet) return null;
      return {
        ...term,
        href: `/projects?${facet === "domain" ? "domain" : facet}=${slug}`,
      };
    })
    .filter((t): t is ResolvedTaxonomy => t !== null);
}

function resolveEvidence(
  evidence: EvidenceRef[] | undefined,
): ResolvedEvidence[] {
  return (evidence ?? []).map((item) => {
    if (item.target?.type === "research-output") {
      const resolved = researchOutputs.find((r) => r.slug === item.target!.slug);
      return { ...item, resolved };
    }
    return { ...item };
  });
}

export function getProjectCaseFile(slug: string): ProjectCaseFile | undefined {
  const record = getProject(slug);
  if (!record) return undefined;

  const environments: ProjectCaseFile["environments"] = [];
  for (const r of record.relations ?? []) {
    if (!ENVIRONMENT_RELATION_TYPES.includes(r.type)) continue;
    if (r.target.type !== "infrastructure") continue;
    const infra = getInfrastructure(r.target.slug);
    if (!infra) continue;
    environments.push({
      record: infra,
      relationType: r.type,
      label: r.label,
    });
  }

  return {
    record,
    domainTerms: resolveTerms(record.facets.domains, "domain"),
    applicationTerms: resolveTerms(record.facets.applications, "application"),
    platformTerms: resolveTerms(record.facets.platforms, "platform"),
    methodTerms: resolveTerms(record.facets.methods, "method"),
    contributionTerms: resolveTerms(record.facets.contributions, "contribution"),
    outcomeTerms: resolveTerms(record.facets.outcomes, "outcome"),
    environments,
    evidence: resolveEvidence(record.evidence),
    related: getRelatedWork(slug),
  };
}

export type InfrastructureHub = {
  record: InfrastructureRecord;
  domainTerms: ResolvedTaxonomy[];
  contributionTerms: ResolvedTaxonomy[];
  inventoryTerms: ResolvedTaxonomy[];
  /** Projects connected via incoming environment relations. */
  connectedWork: Array<{
    project: ProjectRecord;
    relationType: InverseRelationType;
  }>;
  evidence: ResolvedEvidence[];
};

export function getInfrastructureHub(
  slug: string,
): InfrastructureHub | undefined {
  const record = getInfrastructure(slug);
  if (!record) return undefined;

  const incoming = getRelationsTo(
    { type: "infrastructure", slug },
    ENVIRONMENT_RELATION_TYPES,
  );

  const connectedWork: InfrastructureHub["connectedWork"] = [];
  const seen = new Set<string>();
  for (const rel of incoming) {
    const project = getProject(rel.target.slug);
    if (!project || seen.has(project.slug)) continue;
    seen.add(project.slug);
    connectedWork.push({
      project,
      relationType: rel.type as InverseRelationType,
    });
  }

  return {
    record,
    domainTerms: resolveTerms(record.domains, "domain"),
    contributionTerms: resolveTerms(record.contributions, "contribution"),
    inventoryTerms: resolveTerms(record.inventory, "platform"),
    connectedWork,
    evidence: resolveEvidence(record.evidence),
  };
}

/* ------------------------------------------------------------------ */
/*  Filter option catalogs for the Work index UI                       */
/* ------------------------------------------------------------------ */

export type FilterOption = { slug: string; label: string };

export function getWorkFilterOptions(): {
  domains: FilterOption[];
  applications: FilterOption[];
  environments: FilterOption[];
  platforms: FilterOption[];
  methods: FilterOption[];
  outcomes: FilterOption[];
} {
  const used = {
    domains: new Set<string>(),
    applications: new Set<string>(),
    environments: new Set<string>(),
    platforms: new Set<string>(),
    methods: new Set<string>(),
    outcomes: new Set<string>(),
  };

  for (const project of getAllWork()) {
    for (const s of project.facets.domains) used.domains.add(s);
    for (const s of project.facets.applications ?? []) used.applications.add(s);
    for (const s of project.facets.platforms ?? []) used.platforms.add(s);
    for (const s of project.facets.methods ?? []) used.methods.add(s);
    for (const s of project.facets.outcomes ?? []) used.outcomes.add(s);
    for (const s of projectEnvironmentSlugs(project)) used.environments.add(s);
  }

  const toOptions = (slugs: Set<string>, facet?: Facet): FilterOption[] =>
    [...slugs]
      .map((slug) => ({
        slug,
        label: facet ? taxonomyLabel(slug) : getInfrastructure(slug)?.title ?? slug,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

  return {
    domains: toOptions(used.domains, "domain"),
    applications: toOptions(used.applications, "application"),
    environments: toOptions(used.environments),
    platforms: toOptions(used.platforms, "platform"),
    methods: toOptions(used.methods, "method"),
    outcomes: toOptions(used.outcomes, "outcome"),
  };
}

export function workIndexHref(filters: WorkFilterParams = {}): string {
  const qs = buildCanonicalQuery(filters);
  return qs ? `/projects?${qs}` : "/projects";
}

export { taxonomyLabel, getTaxonomyByFacet, getTaxonomyTerm };
