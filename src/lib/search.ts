import { awards, certifications } from "@/content/awards";
import { capabilities } from "@/content/capabilities";
import { education, experience } from "@/content/experience";
import { exhibitions } from "@/content/exhibitions";
import { getFieldPhotos } from "@/content/field-photos";
import { laboratories } from "@/content/laboratories";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { patent, publications } from "@/content/publications";
import { stackGroups } from "@/content/stack";
import { sections } from "@/lib/sections";

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

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const fieldPhotos = getFieldPhotos();

  for (const section of sections) {
    entries.push({
      id: `section:${section.id}`,
      title: section.label,
      blurb: `Open ${section.label}`,
      category: "section",
      href: section.href ?? homeHash(section.id),
      haystack: joinHaystack(section.label, section.id, section.index),
    });
  }

  entries.push(
    {
      id: "section:research-hub",
      title: "Research",
      blurb: "Publications, IP, and awards",
      category: "section",
      href: "/research",
      haystack: joinHaystack(
        "research",
        "publications",
        patent.title,
        patent.number,
        patent.note,
      ),
    },
    {
      id: "section:archive-hub",
      title: "Archive",
      blurb: "Documentary evidence and field photography",
      category: "section",
      href: "/archive",
      haystack: joinHaystack(
        "archive",
        "photos",
        "field log",
        ...fieldPhotos.flatMap((photo) => [
          photo.caption,
          photo.location ?? "",
          photo.alt,
        ]),
      ),
    },
    {
      id: "section:profile-hub",
      title: "Profile",
      blurb: "Career narrative and CV",
      category: "section",
      href: "/profile",
      haystack: joinHaystack("profile", "career", "cv", "experience"),
    },
    {
      id: "section:projects-index",
      title: "Projects",
      blurb: "Faceted project and engagement index",
      category: "section",
      href: "/projects",
      haystack: joinHaystack(
        "projects",
        "work index",
        "case files",
        "filters",
      ),
    },
    {
      id: "section:laboratories-index",
      title: "Laboratories",
      blurb: "Laboratory and facility hubs",
      category: "section",
      href: "/laboratories",
      haystack: joinHaystack(
        "laboratories",
        "labs",
        "infrastructure",
        "kinesis",
        "photonics",
        "hts",
      ),
    },
  );

  for (const project of projects) {
    entries.push({
      id: `project:${project.id}`,
      title: project.title,
      blurb: [project.domainLabel, project.org, project.period]
        .filter(Boolean)
        .join(" · "),
      category: "project",
      href: `/projects/${project.id}`,
      haystack: joinHaystack(
        project.title,
        project.summary,
        project.domainId,
        project.domainLabel,
        project.org,
        project.period,
        ...project.tags,
        ...project.highlights,
      ),
    });
  }

  for (const lab of laboratories) {
    entries.push({
      id: `laboratory:${lab.id}`,
      title: lab.title,
      blurb: [lab.domainLabel, lab.org, lab.period].filter(Boolean).join(" · "),
      category: "laboratory",
      href: `/laboratories/${lab.id}`,
      haystack: joinHaystack(
        lab.title,
        lab.summary,
        lab.domainId,
        lab.domainLabel,
        ...(lab.domainIds ?? []),
        lab.org,
        lab.period,
        ...lab.tags,
        ...lab.highlights,
      ),
    });
  }

  for (const capability of capabilities) {
    entries.push({
      id: `domain:${capability.id}`,
      title: capability.title,
      blurb: capability.blurb,
      category: "domain",
      href: `/projects?domain=${capability.id}`,
      haystack: joinHaystack(
        capability.title,
        capability.blurb,
        ...capability.tags,
      ),
    });
  }

  for (const role of experience) {
    entries.push({
      id: `role:${role.id}`,
      title: role.title,
      blurb: [role.org, role.unit, role.period].filter(Boolean).join(" · "),
      category: "role",
      href: "/profile",
      haystack: joinHaystack(
        role.title,
        role.org,
        role.unit,
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
      blurb: [item.institution, item.period].filter(Boolean).join(" · "),
      category: "education",
      href: "/profile",
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
    const slug = publication.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 64);
    entries.push({
      id: `publication:${slug}`,
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

  entries.push({
    id: "publication:patent",
    title: patent.title,
    blurb: `Patent · ${patent.number}`,
    category: "publication",
    href: "/research",
    haystack: joinHaystack(
      patent.title,
      patent.number,
      patent.note,
      "patent",
      "ip",
      "intellectual property",
    ),
  });

  for (const award of awards) {
    entries.push({
      id: `award:${award.id}`,
      title: `${award.placement} — ${award.event}`,
      blurb: [award.detail, award.location, award.year]
        .filter(Boolean)
        .join(" · "),
      category: "award",
      href: `/profile#${award.id}`,
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
      href: "/profile",
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
      href: "/profile",
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
        href: "/projects",
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
    href: "/profile",
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
  "patent",
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
