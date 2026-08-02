import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LaboratoryHubLayout from "@/components/laboratories/LaboratoryHubLayout";
import RouteChrome from "@/components/work/RouteChrome";
import {
  getAllInfrastructure,
  getInfrastructureHub,
  getInfrastructureNeighbors,
} from "@/lib/query";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/seo";
import { siteTitle } from "@/lib/site";

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
  const image = hub.record.images?.[0]?.src;
  return buildPageMetadata({
    title: `${hub.record.title} — NYU Abu Dhabi | Nikolaos Giakoumidis`,
    description: hub.record.contributionSummary,
    path: `/laboratories/${slug}`,
    image,
  });
}

export default async function LaboratoryHubPage({ params }: PageProps) {
  const { slug } = await params;
  const hub = getInfrastructureHub(slug);
  if (!hub) notFound();

  const { prev, next } = getInfrastructureNeighbors(slug);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Laboratories", path: "/laboratories" },
    { name: hub.record.title, path: `/laboratories/${slug}` },
  ]);

  return (
    <RouteChrome active="laboratories">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <LaboratoryHubLayout hub={hub} prev={prev} next={next} />
    </RouteChrome>
  );
}
