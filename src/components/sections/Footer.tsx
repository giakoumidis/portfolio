import Link from "next/link";

import { profile } from "@/content/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-grid-dim">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="shrink-0">
          <p className="label-mono text-text-dim">Credits</p>
          <p className="label-mono mt-2 text-text-dim">
            © {year} {profile.name}
          </p>
          <nav
            aria-label="Knowledge system"
            className="mt-6 flex flex-wrap gap-4"
          >
            <Link
              href="/work"
              className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Work Index
            </Link>
            <Link
              href="/laboratories"
              className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Laboratories
            </Link>
          </nav>
        </div>

        <div className="sm:ml-auto sm:max-w-md sm:text-right">
          <p className="label-mono text-text-dim">Soundtrack</p>
          <p className="mt-2 text-sm leading-relaxed text-text-dim">
            Ambient audio:{" "}
            <span className="text-text">Main Titles</span>
            {" — "}
            Vangelis, from{" "}
            <span className="text-text">
              Blade Runner (Music From The Original Soundtrack)
            </span>
            . Written and produced by Vangelis.
          </p>
        </div>
      </div>
    </footer>
  );
}
