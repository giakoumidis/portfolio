import MapExperience from "@/components/map/MapExperience";
import { isMapPathId, type MapPathId } from "@/content/map";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Portfolio Map — Nikolaos Giakoumidis",
  description:
    "Navigable portfolio map connecting projects, laboratories, research, career, and archive evidence.",
  path: "/map",
});

type PageProps = {
  searchParams: Promise<{ path?: string }>;
};

export default async function MapPage({ searchParams }: PageProps) {
  const raw = await searchParams;
  const initialPathId: MapPathId | null = isMapPathId(raw.path) ? raw.path : null;

  return (
    <main className="section-shell py-16 lg:py-24">
      <p className="label-mono text-cyan">
        Map <span className="text-text-dim">{"//"} Portfolio graph</span>
      </p>
      <h1 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text">
        Portfolio Map
      </h1>
      <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
      <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
        Nikolaos is the central entity. Explore how projects, laboratories,
        research, profile periods, recognition, and archive records connect —
        then follow an Industry, Research, or Recruiter path through curated
        evidence.
      </p>

      <div className="mt-12">
        <MapExperience variant="full" initialPathId={initialPathId} />
      </div>
    </main>
  );
}
