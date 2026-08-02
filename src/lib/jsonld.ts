import { profile } from "@/content/profile";
import type { ProjectRecord } from "@/lib/types";
import type { Publication } from "@/lib/types";
import { siteDescription, siteUrl } from "@/lib/site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.currentRole.title,
    description: siteDescription,
    email: [`mailto:${profile.nyuEmail}`, `mailto:${profile.email}`],
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    worksFor: {
      "@type": "Organization",
      name: "New York University Abu Dhabi",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of the Aegean" },
      { "@type": "CollegeOrUniversity", name: "University of West Attica" },
    ],
    knowsAbout: [
      "Robotics",
      "Embodied AI",
      "Autonomous Systems",
      "Multi-Agent Systems",
      "Computer Vision",
      "Lab Automation",
    ],
    sameAs: Object.values(profile.links),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path
        ? {
            item:
              item.path === "/" ? siteUrl : `${siteUrl}${item.path}`,
          }
        : {}),
    })),
  };
}

export function creativeWorkJsonLd(record: ProjectRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: record.title,
    description: record.contributionSummary,
    url: `${siteUrl}/projects/${record.slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    ...(record.period.label ? { dateCreated: record.period.label } : {}),
    ...(record.images?.[0]?.src
      ? { image: `${siteUrl}${record.images[0].src}` }
      : {}),
  };
}

export function scholarlyArticleJsonLd(publication: Publication) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: publication.title,
    url: publication.link,
    datePublished: publication.year,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    ...(publication.venue
      ? {
          isPartOf: {
            "@type": "Periodical",
            name: publication.venue,
          },
        }
      : {}),
  };
}

export function scholarlyArticleListJsonLd(publications: Publication[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: publications.slice(0, 30).map((publication, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: scholarlyArticleJsonLd(publication),
    })),
  };
}
