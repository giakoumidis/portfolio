import type { MetadataRoute } from "next";

import { getAllInfrastructure, getAllWork } from "@/lib/query";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/infrastructure`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  for (const project of getAllWork()) {
    entries.push({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const infra of getAllInfrastructure()) {
    entries.push({
      url: `${siteUrl}/infrastructure/${infra.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  return entries;
}
