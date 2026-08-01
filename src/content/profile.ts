import type { Profile, SocialLink } from "@/lib/types";

export const profile = {
  name: "Nikolaos Giakoumidis",
  tagline: "ROBOTICS · AI · AUTONOMOUS SYSTEMS",
  location: "Abu Dhabi, UAE",
  email: "giakoumidis@hotmail.com",
  nyuEmail: "giakoumidis@nyu.edu",
  summary:
    "Robotics, AI, and automation engineer with 15+ years of hands-on experience building advanced research infrastructure, developing autonomous systems, and delivering technology for real-world use across the UAE. Deep technical expertise in embodied and physical AI, multimodal perception, lab automation, and complex robotic systems, combined with a practical understanding of the operational, administrative, and stakeholder requirements needed to turn advanced technology into deployable projects. Currently focused on scalable multi-agent robotic systems for inspection and real-world deployment, combining technical depth with research translation, external engagement, and implementation across government, industry, and research environments.",
  // PENDING OWNER REVIEW — brief recommended positioning sentence.
  positioning:
    "Commercializing AI and robotics built on more than a decade of research infrastructure, experimental engineering, and field deployment.",
  currentRole: {
    title: "Commercial Lead – AI and Robotics",
    org: "NYUAD Center for Artificial Intelligence and Robotics (CAIR)",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/nikolaos-giakoumidis/",
    github: "https://github.com/giakoumidis",
    scholar: "https://scholar.google.com/citations?user=HmOOogwAAAAJ&hl=en",
  },
  // PENDING OWNER REVIEW — proof metrics pending verification with site owner.
  stats: [
    { value: 15, suffix: "+", label: "Years in robotics & research engineering" },
    { value: 100, suffix: "+", label: "Researchers supported" },
    { value: 9, prefix: "$", suffix: "M+", label: "Research assets managed" },
    { value: 3, label: "Major shared research platforms" },
    { value: 30, suffix: "+", label: "Publications" },
    { value: 4, label: "First-prize awards" },
  ],
} satisfies Profile;

/** Display order for the social links shown in the contact panel. */
export const socialLinks = [
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Google Scholar", href: profile.links.scholar },
] satisfies SocialLink[];
