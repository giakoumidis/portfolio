import { acknowledgedPublications } from "@/content/acknowledgements";
import { getArchiveRecords } from "@/content/archive";
import { awards, certifications } from "@/content/awards";
import { capabilities } from "@/content/capabilities";
import { education, experience } from "@/content/experience";
import { exhibitions } from "@/content/exhibitions";
import { infrastructureRecords } from "@/content/infrastructure";
import { posts } from "@/content/posts";
import { currentResearch, profile } from "@/content/profile";
import { publications } from "@/content/publications";
import {
  getResearchOutput,
  researchOutputs,
} from "@/content/research-outputs";
import { stackGroups } from "@/content/stack";
import {
  getTaxonomyByFacet,
  getTaxonomyTerm,
  resolveTaxonomyAlias,
  taxonomyLabel,
} from "@/content/taxonomy";
import { workRecords } from "@/content/work";
import { sections } from "@/lib/sections";
import type { TaxonomyTerm } from "@/lib/types";

export type SearchCategory =
  | "section"
  | "project"
  | "laboratory"
  | "domain"
  | "role"
  | "education"
  | "publication"
  | "award"
  | "certification"
  | "exhibition"
  | "post"
  | "tool"
  | "contact";

export type SearchEntry = {
  id: string;
  title: string;
  /** One-line context shown under the title. */
  blurb: string;
  category: SearchCategory;
  /** In-page anchor or absolute URL. */
  href: string;
  /** Lowercased haystack used for matching. */
  haystack: string;
};

/** Display order for category filter chips (idle + results). */
export const SEARCH_FILTER_CATEGORIES: readonly SearchCategory[] = [
  "project",
  "laboratory",
  "domain",
  "role",
  "publication",
  "award",
  "post",
  "tool",
  "section",
  "contact",
] as const;

const CATEGORY_LABEL: Record<SearchCategory, string> = {
  section: "Section",
  project: "Project",
  laboratory: "Laboratory",
  domain: "Skill",
  role: "Role",
  education: "Education",
  publication: "Paper",
  award: "Award",
  certification: "Cert",
  exhibition: "Exhibition",
  post: "Post",
  tool: "Tool",
  contact: "Contact",
};

export function categoryLabel(category: SearchCategory): string {
  return CATEGORY_LABEL[category];
}

function joinHaystack(...parts: Array<string | undefined | null>): string {
  return parts
    .filter((part): part is string => Boolean(part && part.trim()))
    .join(" ")
    .toLowerCase();
}

/** Homepage deep links stay resolvable from hub routes. */
function homeHash(id: string): string {
  return `/#${id}`;
}

function titleKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function paperSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function termText(slugs: readonly string[] | undefined): string[] {
  const text: string[] = [];
  for (const slug of slugs ?? []) {
    const term = getTaxonomyTerm(slug);
    text.push(slug, taxonomyLabel(slug));
    if (term?.description) text.push(term.description);
    if (term?.aliases) text.push(...term.aliases);
  }
  return text;
}

const listedWork = workRecords.filter((record) => record.status !== "draft");
const listedLabs = infrastructureRecords.filter(
  (record) => record.status !== "draft",
);

/** Send a taxonomy term to the index that actually contains it. */
function taxonomyHref(term: TaxonomyTerm): string {
  const slug = term.slug;

  const projectHit = listedWork.some((project) => {
    const facets = project.facets;
    const values =
      term.facet === "domain"
        ? facets.domains
        : term.facet === "application"
          ? facets.applications
          : term.facet === "platform"
            ? facets.platforms
            : term.facet === "method"
              ? facets.methods
              : term.facet === "outcome"
                ? facets.outcomes
                : facets.contributions;
    return values?.includes(slug) ?? false;
  });

  if (
    projectHit &&
    (term.facet === "domain" ||
      term.facet === "application" ||
      term.facet === "platform" ||
      term.facet === "method" ||
      term.facet === "outcome" ||
      term.facet === "contribution")
  ) {
    return `/projects?${term.facet}=${slug}`;
  }

  const labs = listedLabs.filter(
    (lab) =>
      lab.domains.includes(slug) ||
      lab.inventory?.includes(slug) ||
      lab.contributions.includes(slug),
  );
  if (labs.length === 1) return `/laboratories/${labs[0].slug}`;
  if (labs.length > 1) return "/laboratories";
  return "/projects";
}

function toolHref(label: string): string {
  const slug = resolveTaxonomyAlias(label);
  const term = slug ? getTaxonomyTerm(slug) : undefined;
  return term ? taxonomyHref(term) : "/projects";
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const archiveRecords = getArchiveRecords();
  const seenPapers = new Set<string>();

  function addPaper(entry: SearchEntry) {
    const key = titleKey(entry.title);
    if (!key || seenPapers.has(key)) return;
    seenPapers.add(key);
    entries.push(entry);
  }

  for (const section of sections) {
    const archiveText =
      section.id === "archive"
        ? archiveRecords.flatMap((record) => [
            record.title,
            record.caption,
            record.description,
            record.alt,
            record.institution,
            record.projectTitle,
            record.laboratoryTitle,
            record.archiveType,
          ])
        : [];

    entries.push({
      id: `section:${section.id}`,
      title: section.label,
      blurb:
        section.id === "archive"
          ? "Field photography and documentary records"
          : `Open ${section.label}`,
      category: "section",
      href: section.href ?? homeHash(section.id),
      haystack: joinHaystack(
        section.label,
        section.id,
        section.index,
        section.id === "selected-projects"
          ? "work index case files filters"
          : undefined,
        section.id === "laboratories"
          ? "labs infrastructure kinesis photonics hts"
          : undefined,
        ...archiveText,
      ),
    });
  }

  entries.push(
    {
      id: "section:research-hub",
      title: "Research",
      blurb: "Publications and acknowledgements",
      category: "section",
      href: "/research",
      haystack: joinHaystack(
        "research",
        "publications",
        "acknowledgements",
        "papers",
        ...currentResearch.flatMap((item) => [item.title, item.description]),
      ),
    },
    {
      id: "section:resume",
      title: "Resume",
      blurb: "Career narrative and CV",
      category: "section",
      href: "/resume",
      haystack: joinHaystack("resume", "profile", "career", "cv", "experience"),
    },
  );

  for (const item of currentResearch) {
    const slug = titleKey(item.title).slice(0, 48);
    entries.push({
      id: `section:research:${slug}`,
      title: item.title,
      blurb: "Current research",
      category: "section",
      href: "href" in item && item.href ? item.href : "/research",
      haystack: joinHaystack(item.title, item.description, "research", "phd"),
    });
  }

  for (const project of listedWork) {
    entries.push({
      id: `project:${project.slug}`,
      title: project.title,
      blurb: [
        taxonomyLabel(project.facets.domains[0]),
        project.org,
        project.period.label,
      ]
        .filter(Boolean)
        .join(" · "),
      category: "project",
      href: `/projects/${project.slug}`,
      haystack: joinHaystack(
        project.title,
        project.cardHook,
        project.challenge,
        project.summary,
        project.contributionSummary,
        project.outcomeSummary,
        project.org,
        project.period.label,
        ...termText(project.facets.domains),
        ...termText(project.facets.applications),
        ...termText(project.facets.platforms),
        ...termText(project.facets.methods),
        ...termText(project.facets.outcomes),
        ...termText(project.facets.contributions),
        ...(project.highlights ?? []),
        ...project.credits.flatMap((credit) => [
          credit.name,
          credit.role,
          credit.org,
        ]),
        ...(project.evidence ?? []).flatMap((item) => [
          item.title,
          item.note,
          item.date,
        ]),
        ...(project.images ?? []).flatMap((image) => [
          image.alt,
          image.caption,
        ]),
      ),
    });
  }

  for (const lab of listedLabs) {
    entries.push({
      id: `laboratory:${lab.slug}`,
      title: lab.title,
      blurb: [taxonomyLabel(lab.domains[0]), lab.org, lab.period.label]
        .filter(Boolean)
        .join(" · "),
      category: "laboratory",
      href: `/laboratories/${lab.slug}`,
      haystack: joinHaystack(
        lab.title,
        lab.challenge,
        lab.summary,
        lab.contributionSummary,
        lab.outcomeSummary,
        lab.org,
        lab.period.label,
        ...termText(lab.domains),
        ...termText(lab.contributions),
        ...termText(lab.inventory),
        ...(lab.highlights ?? []),
        ...(lab.credits ?? []).flatMap((credit) => [
          credit.name,
          credit.role,
          credit.org,
        ]),
        ...(lab.evidence ?? []).flatMap((item) => [
          item.title,
          item.note,
          item.date,
        ]),
        ...(lab.images ?? []).flatMap((image) => [image.alt, image.caption]),
      ),
    });
  }

  const capabilityById = new Map(
    capabilities.map((capability) => [capability.id, capability]),
  );

  for (const term of getTaxonomyByFacet("domain")) {
    const capability = capabilityById.get(term.slug);
    entries.push({
      id: `domain:${term.slug}`,
      title: term.label,
      blurb: capability?.blurb ?? term.description ?? "Project domain",
      category: "domain",
      href: taxonomyHref(term),
      haystack: joinHaystack(
        term.label,
        term.slug,
        term.description,
        capability?.blurb,
        ...(term.aliases ?? []),
        ...(capability?.tags ?? []),
      ),
    });
  }

  for (const role of experience) {
    entries.push({
      id: `role:${role.id}`,
      title: role.title,
      blurb: [role.org, role.unit, role.period].filter(Boolean).join(" · "),
      category: "role",
      href: "/resume",
      haystack: joinHaystack(
        role.title,
        role.org,
        role.unit,
        role.note,
        role.location,
        role.period,
        ...role.highlights,
      ),
    });
  }

  for (const item of education) {
    entries.push({
      id: `education:${item.id}`,
      title: item.degree,
      blurb: [item.institution, item.period.replace(/\s+/g, " ")].filter(Boolean).join(" · "),
      category: "education",
      href: "/resume",
      haystack: joinHaystack(
        item.degree,
        item.institution,
        item.location,
        item.period,
        item.detail,
      ),
    });
  }

  for (const publication of publications) {
    addPaper({
      id: `publication:${paperSlug(publication.title)}`,
      title: publication.title,
      blurb: `${publication.venue} · ${publication.year}`,
      category: "publication",
      href: publication.link,
      haystack: joinHaystack(
        publication.title,
        publication.authors,
        publication.venue,
        publication.year,
      ),
    });
  }

  for (const publication of acknowledgedPublications) {
    addPaper({
      id: `acknowledgement:${paperSlug(publication.title)}`,
      title: publication.title,
      blurb: `Acknowledged · ${publication.venue} · ${publication.year}`,
      category: "publication",
      href: publication.link,
      haystack: joinHaystack(
        publication.title,
        publication.venue,
        publication.year,
        publication.contribution,
        "acknowledgement",
        "acknowledged",
      ),
    });
  }

  for (const output of researchOutputs) {
    if (output.status === "draft") continue;
    addPaper({
      id: `publication:${output.slug}`,
      title: output.title,
      blurb: `${output.venue} · ${output.year}`,
      category: "publication",
      href: output.url,
      haystack: joinHaystack(
        output.title,
        output.authors,
        output.venue,
        output.year,
        "research",
      ),
    });
  }

  for (const project of listedWork) {
    for (const item of project.evidence ?? []) {
      if (item.type !== "publication" || !item.title) continue;
      const linked =
        item.target?.type === "research-output"
          ? getResearchOutput(item.target.slug)
          : undefined;
      addPaper({
        id: `publication:evidence:${project.slug}:${paperSlug(item.title)}`,
        title: item.title,
        blurb:
          [item.note, item.date].filter(Boolean).join(" · ") || project.title,
        category: "publication",
        href: item.url ?? linked?.url ?? `/projects/${project.slug}`,
        haystack: joinHaystack(
          item.title,
          item.note,
          item.date,
          linked?.venue,
          linked?.authors,
          project.title,
          "publication",
        ),
      });
    }
  }

  for (const lab of listedLabs) {
    for (const item of lab.evidence ?? []) {
      if (item.type !== "publication" || !item.title) continue;
      const linked =
        item.target?.type === "research-output"
          ? getResearchOutput(item.target.slug)
          : undefined;
      addPaper({
        id: `publication:evidence:${lab.slug}:${paperSlug(item.title)}`,
        title: item.title,
        blurb: [item.note, item.date].filter(Boolean).join(" · ") || lab.title,
        category: "publication",
        href: item.url ?? linked?.url ?? `/laboratories/${lab.slug}`,
        haystack: joinHaystack(
          item.title,
          item.note,
          item.date,
          linked?.venue,
          linked?.authors,
          lab.title,
          "publication",
        ),
      });
    }
  }

  for (const award of awards) {
    entries.push({
      id: `award:${award.id}`,
      title: `${award.placement} — ${award.event}`,
      blurb: [award.detail, award.location, award.year]
        .filter(Boolean)
        .join(" · "),
      category: "award",
      href: `/resume#${award.id}`,
      haystack: joinHaystack(
        award.placement,
        award.event,
        award.detail,
        award.location,
        award.year,
      ),
    });
  }

  for (const certification of certifications) {
    entries.push({
      id: `certification:${certification.id}`,
      title: certification.name,
      blurb: [certification.issuer, certification.detail, certification.year]
        .filter(Boolean)
        .join(" · "),
      category: "certification",
      href: "/resume",
      haystack: joinHaystack(
        certification.name,
        certification.issuer,
        certification.detail,
        certification.year,
      ),
    });
  }

  for (const exhibition of exhibitions) {
    entries.push({
      id: `exhibition:${exhibition.id}`,
      title: exhibition.name,
      blurb: [exhibition.role, exhibition.location, exhibition.year]
        .filter(Boolean)
        .join(" · "),
      category: "exhibition",
      href: "/resume",
      haystack: joinHaystack(
        exhibition.name,
        exhibition.role,
        exhibition.location,
        exhibition.period,
        exhibition.year,
      ),
    });
  }

  for (const post of posts) {
    entries.push({
      id: `post:${post.id}`,
      title: post.title,
      blurb: post.excerpt.slice(0, 120) + (post.excerpt.length > 120 ? "…" : ""),
      category: "post",
      href: post.url,
      haystack: joinHaystack(post.title, post.excerpt, ...post.tags),
    });
  }

  for (const group of stackGroups) {
    for (const item of group.items) {
      entries.push({
        id: `tool:${group.id}:${item}`,
        title: item,
        blurb: group.label,
        category: "tool",
        href: toolHref(item),
        haystack: joinHaystack(item, group.label),
      });
    }
  }

  entries.push({
    id: "contact:nyu",
    title: profile.nyuEmail,
    blurb: `${profile.name} · institutional email`,
    category: "contact",
    href: "/#contact",
    haystack: joinHaystack(
      profile.nyuEmail,
      profile.name,
      "email",
      "nyu",
      "contact",
      "reach",
    ),
  });

  entries.push({
    id: "contact:primary",
    title: profile.email,
    blurb: `${profile.name} · personal email`,
    category: "contact",
    href: "/#contact",
    haystack: joinHaystack(
      profile.email,
      profile.name,
      "email",
      "contact",
    ),
  });

  entries.push({
    id: "contact:profile",
    title: profile.name,
    blurb: [profile.currentRole.title, profile.currentRole.org, profile.location]
      .filter(Boolean)
      .join(" · "),
    category: "contact",
    href: "/resume",
    haystack: joinHaystack(
      profile.name,
      profile.tagline,
      profile.summary,
      profile.positioning,
      profile.currentRole.title,
      profile.currentRole.org,
      profile.location,
      "about",
      "bio",
      "cv",
      "resume",
    ),
  });

  return entries;
}

/** Static index built once at module load — content is compile-time data. */
export const searchIndex: SearchEntry[] = buildIndex();

export type SearchIndexStat = {
  category: SearchCategory;
  label: string;
  count: number;
};

/** Compact corpus readout for the idle search panel. */
export const searchIndexStats: SearchIndexStat[] = (() => {
  const counts = new Map<SearchCategory, number>();
  for (const entry of searchIndex) {
    counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  }

  return SEARCH_FILTER_CATEGORIES.map((category) => ({
    category,
    label: CATEGORY_LABEL[category],
    count: counts.get(category) ?? 0,
  })).filter((stat) => stat.count > 0);
})();

const SUGGESTIONS = [
  "robotics",
  "drone",
  "CAIR",
  "wheelchair",
  "PyTorch",
  "kinesis",
] as const;

export const searchSuggestions: readonly string[] = SUGGESTIONS;

export type SearchOptions = {
  limit?: number;
  category?: SearchCategory | "all";
};

/**
 * Ranked substring search. Multi-word queries require every token to match.
 * Title hits rank above blurb/haystack hits. Empty query + category returns
 * a browse list for that facet.
 */
export function searchEntries(
  query: string,
  options: SearchOptions | number = 24,
): SearchEntry[] {
  const { limit = 24, category = "all" } =
    typeof options === "number" ? { limit: options } : options;

  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const pool =
    category === "all"
      ? searchIndex
      : searchIndex.filter((entry) => entry.category === category);

  if (tokens.length === 0) {
    if (category === "all") return [];
    return pool.slice(0, limit);
  }

  const scored: Array<{ entry: SearchEntry; score: number }> = [];

  for (const entry of pool) {
    let score = 0;
    let matched = true;

    for (const token of tokens) {
      const titleLower = entry.title.toLowerCase();
      const inTitle = titleLower.includes(token);
      const inBlurb = entry.blurb.toLowerCase().includes(token);
      const inHay = entry.haystack.includes(token);

      if (!inTitle && !inBlurb && !inHay) {
        matched = false;
        break;
      }

      if (inTitle) score += 8;
      else if (inBlurb) score += 3;
      else score += 1;

      if (titleLower.startsWith(token)) score += 4;
      if (titleLower === token) score += 6;
    }

    if (matched) {
      // Prefer concrete work over bare section jumps when scores tie.
      if (entry.category === "section") score -= 1;
      scored.push({ entry, score });
    }
  }

  scored.sort(
    (a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title),
  );
  return scored.slice(0, limit).map(({ entry }) => entry);
}

/** Categories that currently match a query (for filter chip enablement). */
export function matchingCategories(query: string): SearchCategory[] {
  const hits = searchEntries(query, { limit: searchIndex.length, category: "all" });
  const seen = new Set<SearchCategory>();
  for (const hit of hits) seen.add(hit.category);
  return SEARCH_FILTER_CATEGORIES.filter((category) => seen.has(category));
}
