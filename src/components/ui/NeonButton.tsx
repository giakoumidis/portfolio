import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "cyan" | "magenta" | "orange" | "pink";
type Appearance = "solid" | "outline" | "ghost";

const OUTLINE: Record<Variant, string> = {
  cyan: "border-cyan/40 bg-cyan/5 text-text hover:border-cyan hover:bg-cyan/15 hover:text-cyan",
  magenta:
    "border-magenta/40 bg-magenta/5 text-text hover:border-magenta hover:bg-magenta/15 hover:text-magenta",
  orange:
    "border-orange/40 bg-orange/5 text-text hover:border-orange hover:bg-orange/15 hover:text-orange",
  pink: "border-pink/40 bg-pink/5 text-text hover:border-pink hover:bg-pink/15 hover:text-pink",
};

const SOLID: Record<Variant, string> = {
  cyan: "border-cyan bg-cyan text-bg hover:bg-cyan/90",
  magenta: "border-magenta bg-magenta text-bg hover:bg-magenta/90",
  orange: "border-orange bg-orange text-bg hover:bg-orange/90",
  pink: "border-pink bg-pink text-bg hover:bg-pink/90",
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

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

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
  const classes = `label-mono inline-flex items-center justify-center gap-2 border px-5 py-3 transition-colors duration-200 ${FOCUS} ${APPEARANCE[appearance][variant]} ${className}`;

  if (href) {
    const inApp =
      !download && !external && (href.startsWith("/") || href.startsWith("#"));

    if (inApp) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

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
