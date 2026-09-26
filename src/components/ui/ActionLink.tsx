import Link from "next/link";
import type { ReactNode } from "react";

type ActionLinkVariant = "inline" | "row" | "chip";

type ActionLinkProps = {
  children: ReactNode;
  href: string;
  variant?: ActionLinkVariant;
  /** Hide the trailing → (e.g. when the caller supplies its own marker). */
  hideArrow?: boolean;
  download?: boolean;
  external?: boolean;
  /**
   * Force a plain <a> for same-origin hrefs. Use when client navigation
   * would race with WebGL / media teardown (e.g. homepage photo captions).
   */
  native?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-current"?: "true" | "page" | "step" | "location" | "date" | "time" | boolean;
};

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

const VARIANT: Record<ActionLinkVariant, string> = {
  inline:
    "inline-flex items-center gap-2 border border-cyan/40 bg-cyan/5 px-3 py-2.5 font-body text-sm leading-snug text-text normal-case tracking-normal transition-colors hover:border-cyan hover:bg-cyan/15 hover:text-cyan",
  row: "group/link flex w-full items-center justify-between gap-3 border border-cyan/40 bg-cyan/5 px-3 py-2.5 font-body text-sm leading-snug text-text normal-case tracking-normal transition-colors hover:border-cyan hover:bg-cyan/15 hover:text-cyan",
  chip: "label-mono inline-flex items-center gap-2 border border-cyan/40 bg-cyan/5 px-2 py-1 text-text-dim transition-colors duration-200 hover:border-cyan hover:bg-cyan/15 hover:text-cyan",
};

export default function ActionLink({
  children,
  href,
  variant = "inline",
  hideArrow = false,
  download = false,
  external = false,
  native = false,
  className = "",
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: ActionLinkProps) {
  const showArrow = !hideArrow && variant !== "chip";
  const classes = `${VARIANT[variant]} ${FOCUS} ${className}`;

  const content =
    variant === "row" ? (
      <>
        <span>{children}</span>
        {showArrow && (
          <span
            aria-hidden="true"
            className="shrink-0 text-cyan transition-transform duration-200 group-hover/link:translate-x-0.5"
          >
            →
          </span>
        )}
      </>
    ) : (
      <>
        {children}
        {showArrow && (
          <span aria-hidden="true" className="shrink-0 text-cyan">
            →
          </span>
        )}
      </>
    );

  const inApp =
    !native &&
    !download &&
    !external &&
    (href.startsWith("/") || href.startsWith("#"));

  if (inApp) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      aria-current={ariaCurrent === true ? "true" : ariaCurrent || undefined}
      {...(download ? { download: "" } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

/** Shared chip classes for filter toggles (selected / idle). */
export const CHIP_BASE =
  "label-mono inline-flex items-center gap-1.5 border px-3 py-1.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";
export const CHIP_ON = "border-cyan/60 bg-cyan/10 text-cyan";
export const CHIP_OFF =
  "border-cyan/40 bg-cyan/5 text-text-dim hover:border-cyan hover:bg-cyan/15 hover:text-cyan";
