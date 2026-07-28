import type { ReactNode } from "react";

type Variant = "cyan" | "magenta" | "orange" | "pink";

const VARIANT: Record<Variant, string> = {
  cyan: "border-cyan/50 text-cyan hover:panel-glow-cyan hover:bg-cyan/10",
  magenta:
    "border-magenta/50 text-magenta hover:panel-glow-magenta hover:bg-magenta/10",
  orange:
    "border-orange/50 text-orange hover:panel-glow-orange hover:bg-orange/10",
  pink: "border-pink/50 text-pink hover:panel-glow-pink hover:bg-pink/10",
};

type NeonButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  download?: boolean;
  external?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function NeonButton({
  children,
  href,
  variant = "cyan",
  download = false,
  external = false,
  onClick,
  className = "",
}: NeonButtonProps) {
  const classes = `label-mono inline-flex items-center gap-2 border px-5 py-3 transition-all duration-200 ${VARIANT[variant]} ${className}`;

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
