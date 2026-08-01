import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LaboratoryHubLayout from "@/components/laboratories/LaboratoryHubLayout";
import RouteChrome from "@/components/work/RouteChrome";
import {
  getAllInfrastructure,
  getInfrastructureHub,
  getInfrastructureNeighbors,
} from "@/lib/query";
import { siteTitle, siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllInfrastructure().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = getInfrastructureHub(slug);
  if (!hub) return { title: `Not found — ${siteTitle}` };
  return {
    title: `${hub.record.title} — NYU Abu Dhabi | Nikolaos Giakoumidis`,
    description: hub.record.contributionSummary,
    alternates: { canonical: `/laboratories/${slug}` },
  };
}

export default async function LaboratoryHubPage({ params }: PageProps) {
  const { slug } = await params;
  const hub = getInfrastructureHub(slug);
  if (!hub) notFound();

  const { prev, next } = getInfrastructureNeighbors(slug);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Laboratories",
        item: `${siteUrl}/laboratories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: hub.record.title,
        item: `${siteUrl}/laboratories/${slug}`,
      },
    ],
  };

  return (
    <RouteChrome active="laboratories">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LaboratoryHubLayout hub={hub} prev={prev} next={next} />
    </RouteChrome>
  );
}
