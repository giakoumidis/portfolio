import HudCard from "@/components/ui/HudCard";
import ActionLink from "@/components/ui/ActionLink";
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
                      <span key={tag} className="keyword">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <ActionLink
                      href={post.url}
                      external
                      aria-label={`Read on LinkedIn: ${post.title}`}
                    >
                      Read on LinkedIn
                    </ActionLink>
                  </div>
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
