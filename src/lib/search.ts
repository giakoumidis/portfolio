import { awards, certifications } from "@/content/awards";
import { capabilities } from "@/content/capabilities";
import { education, experience } from "@/content/experience";
import { exhibitions } from "@/content/exhibitions";
import { labs } from "@/content/labs";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { publications } from "@/content/publications";
import { stackGroups } from "@/content/stack";
import { sections } from "@/lib/sections";

export type SearchCategory =
  | "section"
  | "project"
  | "lab"
  | "domain"
  | "role"
  | "education"
  | "publication"
  | "award"
  | "certification"
  | "exhibition"
  | "post"
  | "tool";

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

const CATEGORY_LABEL: Record<SearchCategory, string> = {
  section: "Section",
  project: "Project",
  lab: "Lab",
  domain: "Skill",
  role: "Role",
  education: "Education",
  publication: "Paper",
  award: "Award",
  certification: "Cert",
  exhibition: "Exhibition",
  post: "Post",
  tool: "Tool",
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

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const section of sections) {
    if (section.id === "search") continue;
    entries.push({
      id: `section:${section.id}`,
      title: section.label,
      blurb: `Jump to ${section.label}`,
      category: "section",
      href: `#${section.id}`,
      haystack: joinHaystack(section.label, section.id, section.index),
    });
  }

  for (const project of projects) {
    entries.push({
      id: `project:${project.id}`,
      title: project.title,
      blurb: [project.domainLabel, project.org, project.period]
        .filter(Boolean)
        .join(" · "),
      category: "project",
      href: `#${project.id}`,
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

  for (const lab of labs) {
    entries.push({
      id: `lab:${lab.id}`,
      title: lab.title,
      blurb: [lab.domainLabel, lab.org, lab.period].filter(Boolean).join(" · "),
      category: "lab",
      href: `#${lab.id}`,
      haystack: joinHaystack(
        lab.title,
        lab.summary,
        lab.domainId,
        lab.domainLabel,
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
      href: `#${capability.id}`,
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
      href: `#${role.id}`,
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
      href: `#${item.id}`,
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

  for (const award of awards) {
    entries.push({
      id: `award:${award.id}`,
      title: `${award.placement} — ${award.event}`,
      blurb: [award.detail, award.location, award.year]
        .filter(Boolean)
        .join(" · "),
      category: "award",
      href: `#${award.id}`,
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
      href: `#${certification.id}`,
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
      href: `#${exhibition.id}`,
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
        href: "#arsenal",
        haystack: joinHaystack(item, group.label),
      });
    }
  }

  return entries;
}

/** Static index built once at module load — content is compile-time data. */
export const searchIndex: SearchEntry[] = buildIndex();

const SUGGESTIONS = [
  "robotics",
  "drone",
  "CAIR",
  "wheelchair",
  "PyTorch",
  "award",
] as const;

export const searchSuggestions: readonly string[] = SUGGESTIONS;

/**
 * Ranked substring search. Multi-word queries require every token to match.
 * Title hits rank above blurb/haystack hits.
 */
export function searchEntries(
  query: string,
  limit = 24,
): SearchEntry[] {
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) return [];

  const scored: Array<{ entry: SearchEntry; score: number }> = [];

  for (const entry of searchIndex) {
    let score = 0;
    let matched = true;

    for (const token of tokens) {
      const inTitle = entry.title.toLowerCase().includes(token);
      const inBlurb = entry.blurb.toLowerCase().includes(token);
      const inHay = entry.haystack.includes(token);

      if (!inTitle && !inBlurb && !inHay) {
        matched = false;
        break;
      }

      if (inTitle) score += 8;
      else if (inBlurb) score += 3;
      else score += 1;

      if (entry.title.toLowerCase().startsWith(token)) score += 4;
    }

    if (matched) {
      // Prefer concrete work over bare section jumps when scores tie.
      if (entry.category === "section") score -= 1;
      scored.push({ entry, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));
  return scored.slice(0, limit).map(({ entry }) => entry);
}
