/**
 * Legacy wrapper for knowledge-system routes.
 * Global SiteHeader + Footer live in the root layout; this is a pass-through.
 */
export default function RouteChrome({
  children,
}: {
  children: React.ReactNode;
  /** @deprecated Active highlighting is handled by SiteHeader. */
  active?: "work" | "laboratories" | "home" | "research" | "archive" | "profile" | "map";
}) {
  return <>{children}</>;
}
