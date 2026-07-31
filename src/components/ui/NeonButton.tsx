import type { ReactNode } from "react";

type Variant = "cyan" | "magenta" | "orange" | "pink";
type Appearance = "solid" | "outline" | "ghost";

const OUTLINE: Record<Variant, string> = {
  cyan: "border-cyan/50 text-cyan hover:panel-glow-cyan hover:bg-cyan/10",
  magenta:
    "border-magenta/50 text-magenta hover:panel-glow-magenta hover:bg-magenta/10",
  orange:
    "border-orange/50 text-orange hover:panel-glow-orange hover:bg-orange/10",
  pink: "border-pink/50 text-pink hover:panel-glow-pink hover:bg-pink/10",
};

const SOLID: Record<Variant, string> = {
  cyan: "border-cyan bg-cyan text-bg hover:bg-cyan/90 hover:panel-glow-cyan",
  magenta:
    "border-magenta bg-magenta text-bg hover:bg-magenta/90 hover:panel-glow-magenta",
  orange:
    "border-orange bg-orange text-bg hover:bg-orange/90 hover:panel-glow-orange",
  pink: "border-pink bg-pink text-bg hover:bg-pink/90 hover:panel-glow-pink",
};

const GHOST: Record<Variant, string> = {
  cyan: "border-transparent text-cyan/80 hover:text-cyan hover:bg-cyan/5",
  magenta:
    "border-transparent text-magenta/80 hover:text-magenta hover:bg-magenta/5",
  orange:
    "border-transparent text-orange/80 hover:text-orange hover:bg-orange/5",
  pink: "border-transparent text-pink/80 hover:text-pink hover:bg-pink/5",
};

const APPEARANCE: Record<Appearance, Record<Variant, string>> = {
  solid: SOLID,
  outline: OUTLINE,
  ghost: GHOST,
};

type NeonButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  appearance?: Appearance;
  download?: boolean;
  external?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function NeonButton({
  children,
  href,
  variant = "cyan",
  appearance = "outline",
  download = false,
  external = false,
  onClick,
  className = "",
}: NeonButtonProps) {
  const classes = `label-mono inline-flex items-center justify-center gap-2 border px-5 py-3 transition-all duration-200 ${APPEARANCE[appearance][variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(download ? { download: "" } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
