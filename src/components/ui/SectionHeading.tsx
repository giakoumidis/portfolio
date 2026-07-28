import Reveal from "./Reveal";

type SectionHeadingProps = {
  /** Two-digit section index shown as a mono kicker, e.g. "01". */
  index: string;
  title: string;
  /** id of the heading element, referenced by the section's aria-labelledby. */
  headingId: string;
  /** Short descriptor beside the index; should differ from the title. */
  kicker?: string;
};

export default function SectionHeading({
  index,
  title,
  headingId,
  kicker,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 lg:mb-16">
      <p className="label-mono text-cyan">
        {index} <span className="text-text-dim">{"//"}</span>
        {kicker && <span className="text-text-dim"> {kicker}</span>}
      </p>
      <h2
        id={headingId}
        className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-text"
      >
        {title}
      </h2>
      <div className="mt-4 h-px w-40 bg-gradient-to-r from-cyan via-magenta to-orange" />
    </Reveal>
  );
}
