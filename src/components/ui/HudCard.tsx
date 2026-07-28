import type { ReactNode } from "react";

export type Accent =
  | "cyan"
  | "magenta"
  | "violet"
  | "amber"
  | "orange"
  | "yellow"
  | "pink"
  | "blue"
  | "green";

const TICK_COLOR: Record<Accent, string> = {
  cyan: "border-cyan",
  magenta: "border-magenta",
  violet: "border-violet",
  amber: "border-amber",
  orange: "border-orange",
  yellow: "border-yellow",
  pink: "border-pink",
  blue: "border-blue",
  green: "border-green",
};

const HOVER_GLOW: Record<Accent, string> = {
  cyan: "group-hover:panel-glow-cyan",
  magenta: "group-hover:panel-glow-magenta",
  violet: "group-hover:panel-glow-violet",
  amber: "group-hover:panel-glow-amber",
  orange: "group-hover:panel-glow-orange",
  yellow: "group-hover:panel-glow-yellow",
  pink: "group-hover:panel-glow-pink",
  blue: "group-hover:panel-glow-blue",
  green: "group-hover:panel-glow-green",
};

type HudCardProps = {
  children: ReactNode;
  accent?: Accent;
  className?: string;
};

/** Corner brackets are what make a plain panel read as a heads-up display. */
function CornerTicks({ accent }: { accent: Accent }) {
  const color = TICK_COLOR[accent];
  const base = `absolute h-3 w-3 ${color} opacity-60 transition-all duration-200 group-hover:h-4 group-hover:w-4 group-hover:opacity-100`;

  return (
    <>
      <span aria-hidden className={`${base} top-0 left-0 border-t-2 border-l-2`} />
      <span aria-hidden className={`${base} top-0 right-0 border-t-2 border-r-2`} />
      <span
        aria-hidden
        className={`${base} bottom-0 left-0 border-b-2 border-l-2`}
      />
      <span
        aria-hidden
        className={`${base} bottom-0 right-0 border-b-2 border-r-2`}
      />
    </>
  );
}

export default function HudCard({
  children,
  accent = "cyan",
  className = "",
}: HudCardProps) {
  return (
    <div
      className={`group relative border border-grid-dim bg-panel backdrop-blur-sm transition-all duration-200 ${HOVER_GLOW[accent]} ${className}`}
    >
      <CornerTicks accent={accent} />
      {children}
    </div>
  );
}
