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
  { id: "profile-proof", label: "Biography", index: "01" },
  { id: "selected-projects", label: "Projects", index: "02", href: "/projects" },
  {
    id: "laboratories",
    label: "Laboratories",
    index: "03",
    href: "/laboratories",
  },
  { id: "archive", label: "Archive", index: "04", href: "/archive" },
  { id: "contact", label: "Contact", index: "05", href: "/#contact" },
];
