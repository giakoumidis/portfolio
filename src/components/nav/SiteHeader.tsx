"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { openSearch } from "@/lib/search-events";

type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
  match: (path: string) => boolean;
};

/** Desktop primary destinations — order matches the approved nav plan. */
const PRIMARY: NavItem[] = [
  {
    href: "/projects",
    label: "Projects",
    match: (p) => p === "/projects" || p.startsWith("/projects/"),
  },
  {
    href: "/laboratories",
    label: "Laboratories",
    shortLabel: "Labs",
    match: (p) => p === "/laboratories" || p.startsWith("/laboratories/"),
  },
  {
    href: "/research",
    label: "Research",
    match: (p) => p === "/research" || p.startsWith("/research/"),
  },
  {
    href: "/archive",
    label: "Archive",
    match: (p) => p === "/archive" || p.startsWith("/archive/"),
  },
  {
    href: "/profile",
    label: "Profile",
    match: (p) => p === "/profile" || p.startsWith("/profile/"),
  },
  {
    href: "/map",
    label: "Map",
    match: (p) => p === "/map" || p.startsWith("/map/"),
  },
];

const linkClass = (active: boolean) =>
  `label-mono px-2 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
    active ? "text-cyan" : "text-text-dim hover:text-text"
  }`;

const utilityClass =
  "label-mono px-2 py-1 text-text-dim transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-grid-dim bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="label-mono shrink-0 text-cyan transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          aria-label="Home — Nikolaos Giakoumidis"
        >
          NG//
        </Link>

        <nav
          aria-label="Primary"
          className="ml-2 hidden min-w-0 flex-1 items-center gap-1 md:flex lg:gap-2"
        >
          {PRIMARY.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(active)}
                aria-current={active ? "page" : undefined}
              >
                <span className="lg:hidden">{item.shortLabel ?? item.label}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => openSearch()}
            className={utilityClass}
            aria-label="Open search"
          >
            Search
          </button>
          <Link href="/cv.pdf" className={`${utilityClass} hidden sm:inline`} download>
            CV
          </Link>
          <button
            type="button"
            className="label-mono border border-grid-dim px-2.5 py-1 text-text-dim transition-colors hover:border-cyan/50 hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id={menuId} className="border-t border-grid-dim bg-bg md:hidden">
          <nav aria-label="Mobile primary" className="mx-auto max-w-6xl px-4 py-3">
            <ul className="flex flex-col gap-1">
              {PRIMARY.map((item) => {
                const active = item.match(pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`label-mono block px-2 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                        active ? "text-cyan" : "text-text-dim hover:text-text"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/cv.pdf"
                  download
                  onClick={closeMenu}
                  className="label-mono block px-2 py-2.5 text-text-dim transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  CV
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  onClick={closeMenu}
                  className="label-mono block px-2 py-2.5 text-text-dim transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
