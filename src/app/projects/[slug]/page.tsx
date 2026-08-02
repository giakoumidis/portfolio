import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseFileLayout from "@/components/work/CaseFileLayout";
import RouteChrome from "@/components/work/RouteChrome";
import { getAllWork, getProjectCaseFile, getWorkNeighbors } from "@/lib/query";
import {
  breadcrumbJsonLd,
  creativeWorkJsonLd,
} from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/seo";
import { siteTitle } from "@/lib/site";

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
  const image = caseFile.record.images?.[0]?.src;
  return buildPageMetadata({
    title: `${caseFile.record.title} | Nikolaos Giakoumidis`,
    description: caseFile.record.contributionSummary,
    path: `/projects/${slug}`,
    image,
    type: "article",
  });
}

export default async function WorkCaseFilePage({ params }: PageProps) {
  const { slug } = await params;
  const caseFile = getProjectCaseFile(slug);
  if (!caseFile) notFound();

  const { prev, next } = getWorkNeighbors(slug);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: caseFile.record.title, path: `/projects/${slug}` },
  ]);
  const creativeWork = creativeWorkJsonLd(caseFile.record);

  return (
    <RouteChrome active="projects">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <CaseFileLayout caseFile={caseFile} prev={prev} next={next} />
    </RouteChrome>
  );
}
