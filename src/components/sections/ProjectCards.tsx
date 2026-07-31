import HudCard, { type Accent } from "@/components/ui/HudCard";
import InstagramMedia from "@/components/ui/InstagramMedia";
import LocalVideoPlayer from "@/components/ui/LocalVideoPlayer";
import NeonButton from "@/components/ui/NeonButton";
import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import WatchLocalDemoButton from "@/components/ui/WatchLocalDemoButton";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import type { Project } from "@/lib/types";

type ProjectCardsProps = {
  items: Project[];
  /**
   * When set, card titles link into the knowledge-system case file or
   * laboratory hub (e.g. `/work` or `/laboratories`).
   */
  recordBasePath?: "/work" | "/laboratories";
};

const ACCENT_CYCLE = [
  "cyan",
  "magenta",
  "orange",
  "violet",
  "pink",
  "blue",
] as const satisfies readonly Accent[];

const ACCENT_TEXT: Record<Accent, string> = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  violet: "text-violet",
  amber: "text-amber",
  orange: "text-orange",
  yellow: "text-yellow",
  pink: "text-pink",
  blue: "text-blue",
  green: "text-green",
};

const ACCENT_DOT: Record<Accent, string> = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  violet: "bg-violet",
  amber: "bg-amber",
  orange: "bg-orange",
  yellow: "bg-yellow",
  pink: "bg-pink",
  blue: "bg-blue",
  green: "bg-green",
};

export default function ProjectCards({
  items,
  recordBasePath,
}: ProjectCardsProps) {
  return (
    <ul className="flex flex-col gap-10">
      {items.map((project, i) => {
        const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
        const recordHref = recordBasePath
          ? `${recordBasePath}/${project.id}`
          : undefined;
        const images = project.images;
        const photoGallery =
          images && images.length > 1
            ? images.map((item, gi) => ({
                src: item.src,
                alt: item.alt,
                caption: item.caption,
                tag: `FIG.0${gi + 1}`,
              }))
            : undefined;

        return (
          <Reveal
            as="li"
            key={project.id}
            delay={i * 0.08}
            className="list-none scroll-mt-20 lg:scroll-mt-8"
          >
            <div id={project.id}>
              <HudCard accent={accent} className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-[1.05fr_1fr]">
                {(project.video || images) && (
                  <div className="flex flex-col border-b border-grid-dim lg:border-r lg:border-b-0">
                    {project.video?.provider === "youtube" && (
                      <YouTubeEmbed
                        videoId={project.video.id}
                        title={project.video.title}
                        className="border-0"
                      />
                    )}
                    {project.video?.provider === "instagram" && (
                      <InstagramMedia
                        url={project.video.url}
                        title={project.video.title}
                        poster={project.video.poster}
                        className="border-0"
                      />
                    )}
                    {project.video?.provider === "local" && (
                      <LocalVideoPlayer
                        src={project.video.src}
                        title={project.video.title}
                        poster={project.video.poster}
                        type={project.video.type}
                        className="border-0"
                      />
                    )}

                    {images && images.length > 0 && (
                      <div
                        className={`flex flex-1 flex-col ${
                          project.video ? "border-t border-grid-dim" : ""
                        }`}
                      >
                        {images.map((image, n) => (
                          <RoboPhoto
                            key={image.src}
                            src={image.src}
                            alt={image.alt}
                            tag={`FIG.0${n + 1}`}
                            caption={image.caption}
                            aspect={
                              image.orientation === "portrait"
                                ? "flex-1 min-h-96"
                                : "flex-1 min-h-64"
                            }
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className={`flex-1 ${
                              n > 0 ? "border-t border-grid-dim" : ""
                            }`}
                            gallery={photoGallery}
                            galleryIndex={n}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col p-6 sm:p-8">
                  <p className={`label-mono ${ACCENT_TEXT[accent]}`}>
                    [{project.domainLabel}]
                    {project.period && (
                      <span className="ml-3 text-text-dim">
                        {project.period}
                      </span>
                    )}
                  </p>

                  <h3 className="mt-4 text-xl text-text sm:text-2xl">
                    {recordHref ? (
                      /*
                        Native anchor (not next/link): leaving the WebGL homepage
                        via client navigation races Three.js / media cleanup and
                        throws removeChild. A full load is the reliable exit.
                      */
                      <a
                        href={recordHref}
                        className="transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  <p className="mt-2 font-body text-sm text-text-dim">
                    {project.org}
                  </p>

                  <p className="mt-5 font-body text-sm leading-relaxed text-text-dim">
                    {project.summary}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 font-body text-sm leading-relaxed text-text-dim"
                      >
                        <span
                          aria-hidden
                          className={`mt-2 h-1 w-1 shrink-0 ${ACCENT_DOT[accent]}`}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {project.paper && (
                    <div className="mt-6 border border-grid-dim bg-bg/40 p-4">
                      <p className="label-mono text-text-dim">Paper</p>
                      <a
                        href={project.paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block font-body text-sm font-medium text-text transition-colors duration-200 hover:text-cyan hover:underline hover:underline-offset-4"
                      >
                        {project.paper.title}
                      </a>
                      <p className="mt-1 text-sm text-text-dim">
                        <span className="italic">{project.paper.venue}</span>
                        <span className="label-mono ml-2">
                          · {project.paper.year}
                        </span>
                      </p>
                    </div>
                  )}

                  {project.relatedPapers && project.relatedPapers.length > 0 && (
                    <details className="mt-6 group">
                      <summary className="label-mono cursor-pointer list-none text-text-dim transition-colors duration-200 hover:text-cyan [&::-webkit-details-marker]:hidden">
                        <span className="border border-grid-dim px-3 py-2 inline-block group-open:border-cyan/40 group-open:text-cyan">
                          {project.relatedPapersLabel ??
                            `Named in ${project.relatedPapers.length} papers`}
                          <span aria-hidden className="ml-2">
                            →
                          </span>
                        </span>
                      </summary>
                      <ul className="mt-3 space-y-3 border border-grid-dim bg-bg/40 p-4">
                        {project.relatedPapers.map((related) => (
                          <li key={related.link}>
                            <a
                              href={related.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block font-body text-sm font-medium text-text transition-colors duration-200 hover:text-cyan hover:underline hover:underline-offset-4"
                            >
                              {related.title}
                            </a>
                            <p className="mt-1 text-sm text-text-dim">
                              <span className="italic">{related.venue}</span>
                              <span className="label-mono ml-2">
                                · {related.year}
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="label-mono border border-grid-dim px-2 py-1 text-text-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(project.video || project.paper || project.link) && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.link && (
                        <NeonButton
                          href={project.link.href}
                          download={project.link.download}
                          external={!project.link.download}
                        >
                          {project.link.label} →
                        </NeonButton>
                      )}
                      {project.video?.provider === "youtube" && (
                        <NeonButton
                          href={`https://www.youtube.com/watch?v=${project.video.id}`}
                          external
                        >
                          Open on YouTube →
                        </NeonButton>
                      )}
                      {project.video?.provider === "instagram" && (
                        <NeonButton href={project.video.url} external>
                          Watch on Instagram →
                        </NeonButton>
                      )}
                      {project.video?.provider === "local" && (
                        <WatchLocalDemoButton
                          src={project.video.src}
                          title={project.video.title}
                          poster={project.video.poster}
                          type={project.video.type}
                        />
                      )}
                      {project.paper && (
                        <NeonButton
                          href={project.paper.link}
                          external
                          variant="magenta"
                        >
                          Read paper →
                        </NeonButton>
                      )}
                    </div>
                  )}
                </div>
              </div>
              </HudCard>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
