import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseFileLayout from "@/components/work/CaseFileLayout";
import RouteChrome from "@/components/work/RouteChrome";
import { getAllWork, getProjectCaseFile } from "@/lib/query";
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
  return {
    title: `${caseFile.record.title} — ${siteTitle}`,
    description: caseFile.record.contributionSummary,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function WorkCaseFilePage({ params }: PageProps) {
  const { slug } = await params;
  const caseFile = getProjectCaseFile(slug);
  if (!caseFile) notFound();

  return (
    <RouteChrome active="work">
      <CaseFileLayout caseFile={caseFile} />
    </RouteChrome>
  );
}
