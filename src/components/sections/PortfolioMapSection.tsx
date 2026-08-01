import PortfolioMap from "@/components/map/PortfolioMap";
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
          kicker="How the career connects"
        />
        <Reveal>
          <p className="mb-8 max-w-2xl font-body text-sm leading-relaxed text-text-dim">
            Start from the major hubs — work, laboratories, research, career,
            recognition, and archive — then drill into the entities that matter
            for your path.
          </p>
          <PortfolioMap variant="teaser" />
        </Reveal>
      </div>
    </section>
  );
}
