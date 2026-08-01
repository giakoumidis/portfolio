import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseFileLayout from "@/components/work/CaseFileLayout";
import RouteChrome from "@/components/work/RouteChrome";
import { getAllWork, getProjectCaseFile, getWorkNeighbors } from "@/lib/query";
import { siteTitle, siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllWork().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseFile = getProjectCaseFile(slug);
  if (!caseFile) return { title: `Not found — ${siteTitle}` };
  return {
    title: `${caseFile.record.title} | Nikolaos Giakoumidis`,
    description: caseFile.record.contributionSummary,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function WorkCaseFilePage({ params }: PageProps) {
  const { slug } = await params;
  const caseFile = getProjectCaseFile(slug);
  if (!caseFile) notFound();

  const { prev, next } = getWorkNeighbors(slug);
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
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseFile.record.title,
        item: `${siteUrl}/projects/${slug}`,
      },
    ],
  };

  return (
    <RouteChrome active="projects">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CaseFileLayout caseFile={caseFile} prev={prev} next={next} />
    </RouteChrome>
  );
}
