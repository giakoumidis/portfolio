import MapExperience from "@/components/map/MapExperience";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PortfolioMapSection() {
  return (
    <section
      id="portfolio-map"
      aria-labelledby="portfolio-map-heading"
      className="scroll-mt-20"
    >
      <div className="section-shell">
        <SectionHeading
          index="02"
          title="Portfolio Map"
          headingId="portfolio-map-heading"
          kicker="One integrated professional system"
        />
        <Reveal>
          <p className="mb-6 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
            Nikolaos is the center. Projects, laboratories, research, profile
            periods, recognition, and archive evidence connect as one body of
            work — not unrelated portfolio entries.
          </p>
          <MapExperience variant="teaser" />
        </Reveal>
      </div>
    </section>
  );
}
