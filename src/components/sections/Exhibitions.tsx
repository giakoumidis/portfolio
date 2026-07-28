import HudCard from "@/components/ui/HudCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import { exhibitions } from "@/content/exhibitions";

export default function Exhibitions() {
  return (
    <section id="exhibitions" aria-labelledby="exhibitions-heading">
      <div className="section-shell">
        <SectionHeading
          index="08"
          title="Exhibitions"
          headingId="exhibitions-heading"
          kicker="External engagement"
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {exhibitions.map((exhibition, i) => (
            <Reveal
              as="li"
              key={exhibition.id}
              delay={i * 0.06}
              className="scroll-mt-20 lg:scroll-mt-8"
            >
              <div id={exhibition.id}>
              <HudCard
                accent="magenta"
                className={`h-full ${exhibition.video ? "p-0" : "p-6"}`}
              >
                <div className="flex h-full flex-col">
                  {exhibition.video && (
                    <YouTubeEmbed
                      videoId={exhibition.video.id}
                      title={exhibition.video.title}
                      className="border-0 border-b border-grid-dim"
                    />
                  )}

                  <div
                    className={`flex flex-1 flex-col ${exhibition.video ? "p-6" : ""}`}
                  >
                    <p className="label-mono text-magenta">
                      {exhibition.period} · {exhibition.year}
                    </p>

                    <h3 className="mt-4 text-base text-text">
                      {exhibition.link ? (
                        <a
                          href={exhibition.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-cyan"
                        >
                          {exhibition.name}
                        </a>
                      ) : (
                        exhibition.name
                      )}
                    </h3>

                    <p className="mt-3 text-sm text-text-dim">
                      {exhibition.role}
                    </p>

                    {exhibition.location && (
                      <p className="label-mono mt-auto pt-6 text-text-dim">
                        {exhibition.location}
                      </p>
                    )}
                  </div>
                </div>
              </HudCard>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
