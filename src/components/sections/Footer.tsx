import Link from "next/link";

import { profile, socialLinks } from "@/content/profile";
import { AUDIO_LICENSE_STATUS, AUDIO_TRACK } from "@/lib/audio";

const NAVIGATE = [
  { href: "/map", label: "Map" },
  { href: "/projects", label: "Projects" },
  { href: "/laboratories", label: "Laboratories" },
  { href: "/research", label: "Research" },
  { href: "/archive", label: "Archive" },
  { href: "/profile", label: "Profile" },
  { href: "/cv.pdf", label: "CV", download: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-grid-dim">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="label-mono text-text-dim">Navigate</p>
          <ul className="mt-4 flex flex-col gap-2">
            {NAVIGATE.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  download={item.download || undefined}
                  className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-mono text-text-dim">Connect</p>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <a
                href={`mailto:${profile.nyuEmail}`}
                className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                {profile.nyuEmail}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                {profile.email}
              </a>
            </li>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <p className="label-mono text-text-dim">Credits</p>
          <p className="label-mono mt-4 text-text-dim">
            © {year} {profile.name}
          </p>
          <p className="mt-3">
            <Link
              href="/llms.txt"
              className="label-mono text-text-dim transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              /llms.txt
            </Link>
          </p>
          <p className="mt-6 text-sm leading-relaxed text-text-dim">
            Ambient audio:{" "}
            <span className="text-text">{AUDIO_TRACK.title}</span>
            {" — "}
            {AUDIO_TRACK.artist}, from{" "}
            <span className="text-text">{AUDIO_TRACK.album}</span>.
            {AUDIO_LICENSE_STATUS === "pending-confirmation" && (
              <> Licensing confirmation pending.</>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
