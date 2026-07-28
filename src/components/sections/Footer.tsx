import { profile, socialLinks } from "@/content/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-grid-dim">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-mono text-text-dim">
              © {year} {profile.name}
            </p>
            <p className="label-mono mt-2 text-text-dim">
              Designed &amp; built by {profile.name}
              <span className="text-text-dim/60"> · Next.js</span>
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-text-dim transition-colors duration-200 hover:text-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-grid-dim pt-6">
          <p className="label-mono text-text-dim">Soundtrack</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-dim">
            Ambient audio:{" "}
            <a
              href="https://www.youtube.com/watch?v=smpTDkLCYb0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text transition-colors duration-200 hover:text-cyan"
            >
              Main Titles
            </a>
            {" — "}
            Vangelis, from{" "}
            <span className="text-text">
              Blade Runner (Music From The Original Soundtrack)
            </span>
            . Written and produced by Vangelis. © 1994 Warner Music UK Ltd.
            Streamed via YouTube for listening only; all rights remain with the
            rights holders.
          </p>
        </div>
      </div>
    </footer>
  );
}
