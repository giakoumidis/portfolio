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
                          className="group/link flex items-center justify-between gap-3 border border-cyan/40 bg-cyan/5 px-3 py-2.5 font-body text-sm font-normal leading-snug text-text normal-case tracking-normal transition-colors hover:border-cyan hover:bg-cyan/15 hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                        >
                          <span>{exhibition.name}</span>
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-cyan transition-transform duration-200 group-hover/link:translate-x-0.5"
                          >
                            →
                          </span>
                        </a>
                      ) : (
                        exhibition.name
                      )}
                    </h3>

                    {exhibition.location && (
                      <p className="label-mono mt-auto flex items-center gap-2 pt-6 text-text-dim">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z"
                          />
                          <circle cx="12" cy="10" r="2.25" />
                        </svg>
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
