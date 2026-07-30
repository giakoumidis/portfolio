import type { Profile, SocialLink } from "@/lib/types";

export const profile = {
  name: "Nikolaos Giakoumidis",
  tagline: "ROBOTICS · AI · AUTONOMOUS SYSTEMS",
  location: "Abu Dhabi, UAE",
  email: "giakoumidis@hotmail.com",
  nyuEmail: "giakoumidis@nyu.edu",
  summary:
    "Robotics, AI, and automation engineer with 15+ years of hands-on experience building advanced research infrastructure, developing autonomous systems, and delivering technology for real-world use across the UAE. Deep technical expertise in embodied and physical AI, multimodal perception, lab automation, and complex robotic systems, combined with a practical understanding of the operational, administrative, and stakeholder requirements needed to turn advanced technology into deployable projects. Currently focused on scalable multi-agent robotic systems for inspection and real-world deployment, combining technical depth with research translation, external engagement, and implementation across government, industry, and research environments.",
  positioning:
    "Turning embodied AI and multi-agent robotics research into systems that get deployed in the real world.",
  currentRole: {
    title: "Commercial Lead – AI and Robotics",
    org: "NYUAD Center for Artificial Intelligence and Robotics (CAIR)",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/nikolaos-giakoumidis/",
    github: "https://github.com/giakoumidis",
    scholar: "https://scholar.google.com/citations?user=HmOOogwAAAAJ&hl=en",
  },
  stats: [
    { value: 15, suffix: "+", label: "Years experience" },
    { value: 100, suffix: "+", label: "Researchers supported" },
    { value: 800, prefix: "$", suffix: "K", label: "Annual purchasing influence" },
    { value: 4, label: "Labs built" },
    { value: 4, label: "First-prize awards" },
    { value: 30, suffix: "+", label: "Publications" },
  ],
} satisfies Profile;

/** Display order for the social links shown in the contact panel. */
export const socialLinks = [
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Google Scholar", href: profile.links.scholar },
] satisfies SocialLink[];
