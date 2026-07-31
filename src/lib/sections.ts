export type SectionMeta = {
  id: string;
  /** Rail label, kept short enough for the fixed side navigation. */
  label: string;
  /** Two-digit kicker shared by the nav rail and the section heading. */
  index: string;
};

/** Single source of truth for anchor ids, ordering and section numbering. */
export const sections: SectionMeta[] = [
  { id: "hero", label: "Home", index: "00" },
  { id: "about", label: "About", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "capabilities", label: "Skills", index: "03" },
  { id: "laboratories", label: "Laboratories", index: "04" },
  { id: "projects", label: "Projects", index: "05" },
  { id: "arsenal", label: "Stack", index: "06" },
  { id: "research", label: "Research", index: "07" },
  { id: "exhibitions", label: "Exhibitions", index: "08" },
  { id: "field-log", label: "Photos", index: "09" },
  { id: "awards", label: "Awards", index: "10" },
  { id: "signal", label: "Posts", index: "11" },
  { id: "search", label: "Search", index: "12" },
  { id: "contact", label: "Contact", index: "13" },
];
