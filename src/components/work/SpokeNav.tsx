import Link from "next/link";

import type { SpokeNeighbor } from "@/lib/query";

type SpokeNavProps = {
  basePath: "/work" | "/laboratories";
  prev: SpokeNeighbor | null;
  next: SpokeNeighbor | null;
};

export default function SpokeNav({ basePath, prev, next }: SpokeNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Case file navigation"
      className="mt-16 grid gap-4 border-t border-grid-dim pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`${basePath}/${prev.slug}`}
          className="group border border-grid-dim p-4 transition-colors hover:border-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <p className="label-mono text-text-dim">← Previous</p>
          <p className="mt-2 font-display text-sm uppercase text-text group-hover:text-cyan">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div aria-hidden className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="group border border-grid-dim p-4 text-left transition-colors hover:border-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:text-right"
        >
          <p className="label-mono text-text-dim">Next →</p>
          <p className="mt-2 font-display text-sm uppercase text-text group-hover:text-cyan">
            {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
