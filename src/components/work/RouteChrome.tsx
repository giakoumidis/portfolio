import Link from "next/link";

type RouteChromeProps = {
  children: React.ReactNode;
  /** Active top-level path for nav highlight. */
  active?: "work" | "infrastructure" | "home";
};

const NAV = [
  { href: "/", label: "Home", key: "home" as const },
  { href: "/work", label: "Work Index", key: "work" as const },
  {
    href: "/infrastructure",
    label: "Infrastructure",
    key: "infrastructure" as const,
  },
];

/** Minimal chrome for knowledge-system routes — keeps HudRail on the homepage. */
export default function RouteChrome({ children, active }: RouteChromeProps) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="sticky top-0 z-40 border-b border-grid-dim bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="label-mono text-cyan transition-colors hover:text-text"
          >
            N. Giakoumidis
          </Link>
          <nav aria-label="Knowledge system" className="flex flex-wrap gap-4">
            {NAV.map((item) => {
              const isActive = active === item.key;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`label-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                    isActive
                      ? "text-cyan"
                      : "text-text-dim hover:text-text"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
