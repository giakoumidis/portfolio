import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Kept so existing call sites stay valid. Entrance motion is no longer applied. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/** Static wrapper. Section content is visible on first paint. */
export default function Reveal({
  children,
  className,
  as = "div",
}: RevealProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
