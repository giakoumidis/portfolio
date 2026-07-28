import HudCard from "@/components/ui/HudCard";
import NeonButton from "@/components/ui/NeonButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { linkedinActivityUrl, posts } from "@/content/posts";

export default function Signal() {
  return (
    <section id="signal" aria-labelledby="signal-heading">
      <div className="section-shell">
        <SectionHeading
          index="11"
          title="Posts"
          headingId="signal-heading"
          kicker="Updates & writing"
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.id} delay={i * 0.06}>
              <HudCard accent="violet" className="h-full p-6">
                <div className="flex h-full flex-col">
                  <p className="label-mono text-violet">
                    <time dateTime={post.date}>{post.dateLabel}</time>
                  </p>

                  <h3 className="mt-4 text-base text-text">{post.title}</h3>

                  <p className="mt-3 font-body text-sm leading-relaxed text-text-dim">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="label-mono border border-grid-dim px-2 py-1 text-text-dim"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read on LinkedIn: ${post.title}`}
                    className="label-mono mt-auto pt-6 text-cyan transition-colors duration-200 hover:underline hover:underline-offset-4"
                  >
                    Read on LinkedIn →
                  </a>
                </div>
              </HudCard>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <NeonButton href={linkedinActivityUrl} external>
            All activity → LinkedIn
          </NeonButton>
        </Reveal>
      </div>
    </section>
  );
}
