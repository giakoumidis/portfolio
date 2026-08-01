export type SectionMeta = {
  id: string;
  /** Short label for the homepage section rail. */
  label: string;
  /** Two-digit kicker shared by the rail and section headings. */
  index: string;
  /**
   * Optional hub/route used by global search when the topic lives off-page.
   * The homepage rail always jumps to `#id`.
   */
  href?: string;
};

/** Homepage blocks — left rail, IntersectionObserver, and search section entries. */
export const sections: SectionMeta[] = [
  { id: "hero", label: "Home", index: "00", href: "/" },
  { id: "profile-proof", label: "Profile", index: "01", href: "/profile" },
  { id: "portfolio-map", label: "Map", index: "02", href: "/map" },
  { id: "selected-work", label: "Work", index: "03", href: "/work" },
  {
    id: "credibility",
    label: "Evidence",
    index: "04",
    href: "/laboratories",
  },
  { id: "contact", label: "Contact", index: "05", href: "/#contact" },
];
