import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LaboratoryHubLayout from "@/components/laboratories/LaboratoryHubLayout";
import RouteChrome from "@/components/work/RouteChrome";
import { getAllInfrastructure, getInfrastructureHub } from "@/lib/query";
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
  return {
    title: `${hub.record.title} — ${siteTitle}`,
    description: hub.record.contributionSummary,
    alternates: { canonical: `/laboratories/${slug}` },
  };
}

export default async function LaboratoryHubPage({ params }: PageProps) {
  const { slug } = await params;
  const hub = getInfrastructureHub(slug);
  if (!hub) notFound();

  return (
    <RouteChrome active="laboratories">
      <LaboratoryHubLayout hub={hub} />
    </RouteChrome>
  );
}
