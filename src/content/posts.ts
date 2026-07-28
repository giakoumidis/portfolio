import type { Post } from "@/lib/types";

/**
 * Selected LinkedIn posts, newest first. Excerpts are trimmed from the posts
 * themselves; the media and discussion stay on LinkedIn, which is what each
 * card links out to.
 */
export const posts = [
  {
    id: "make-it-in-the-emirates-2025",
    title: "CAIR on the floor at Make it in the Emirates",
    date: "2025-05-20",
    dateLabel: "May 2025",
    excerpt:
      "NYU Abu Dhabi is showcasing some of its most impactful research at Make it in the Emirates. At the heart of our presence is the Center for Artificial Intelligence and Robotics, featuring advanced AI-driven robotic systems developed for real-world applications. My mission is to drive the commercialization of research by building strong industry partnerships, identifying real-world challenges, and transforming innovative ideas into scalable solutions.",
    tags: ["MIITEUAE", "ADNEC", "Innovation", "UAE"],
    url: "https://www.linkedin.com/posts/nikolaos-giakoumidis_miiteuae-adnec-innovation-activity-7330601256417181696-37BI",
  },
  {
    id: "omniocta-uav-2025",
    title: "OmniOcta: an airborne synthesizer",
    date: "2025-05-16",
    dateLabel: "May 2025",
    excerpt:
      "The OmniOcta UAV is not just another drone — it is a bold step forward in aerial robotics, achieving full omnidirectional flight with fixed unidirectional propellers. During development I witnessed test flights where the modulation of motor sound frequencies during aggressive rotations resembled that of an airborne synthesizer: an engineering symphony in motion.",
    tags: ["CAIR", "UAV", "OmnidirectionalFlight", "ICRA2025"],
    url: "https://www.linkedin.com/posts/nikolaos-giakoumidis_nyuad-cair-uav-activity-7329022386689802240-ryP4",
  },
  {
    id: "commercial-lead-2025",
    title: "Starting as Commercial Lead for AI & Robotics",
    date: "2025-04-23",
    dateLabel: "April 2025",
    excerpt:
      "Working alongside exceptional faculty and researchers at CAIR, I focus on translating pioneering academic work into applied innovation — bridging the gap between breakthrough research and industry needs. The UAE's bold vision for AI and robotics offers fertile ground for turning academic research into real solutions that serve society and industry.",
    tags: ["TechTransfer", "AppliedResearch", "NYUAD", "CAIR"],
    url: "https://www.linkedin.com/posts/nikolaos-giakoumidis_ai-robotics-innovation-activity-7320867165232881665-GAG2",
  },
  {
    id: "humanoids-2024",
    title: "Humanoids 2024, Nancy",
    date: "2024-11-24",
    dateLabel: "November 2024",
    excerpt:
      "Presentations, panels, and live robot demonstrations at the cutting edge of humanoid robotics and AI. We are entering an era that transforms our world in ways we could not have imagined a decade ago, and with that comes great responsibility: it is up to us, as researchers, engineers, and innovators, to steer this disruptive technology toward the greater good.",
    tags: ["Humanoids2024", "Robotics", "TechnologyForGood"],
    url: "https://www.linkedin.com/posts/nikolaos-giakoumidis_robotics-ai-humanoids2024-activity-7266364856117706752-qTWd",
  },
  {
    id: "autocis-summit-2021",
    title: "Summit robot inspecting a construction site",
    date: "2021-11-15",
    dateLabel: "November 2021",
    excerpt:
      "Testing our Summit robot during autonomous data collection and monitoring of construction sites. The work is partly based on our ISARC 2021 paper, AutoCIS: An Automated Construction Inspection System for Quality Inspection of Buildings.",
    tags: ["ISARC", "ConstructionAutomation", "ConstructionRobots"],
    url: "https://www.linkedin.com/posts/nikolaos-giakoumidis_isarc-constructionautomation-constructionrobots-activity-6866097966600482816-Q9s8",
  },
  {
    id: "spot-recovery-2021",
    title: "Failure is part of the process",
    date: "2021-10-14",
    dateLabel: "October 2021",
    excerpt:
      "Failure is part of the process, but recovery is what matters — a beautifully articulated maneuver from our Spot.",
    tags: ["NYUAD", "BostonDynamics", "Spot"],
    url: "https://www.linkedin.com/posts/nikolaos-giakoumidis_nyuad-bostondynamics-nyuadctp-activity-6854462233334837248-Sozb",
  },
] satisfies Post[];

/** Feed the cards link out to collectively. */
export const linkedinActivityUrl =
  "https://www.linkedin.com/in/nikolaos-giakoumidis/recent-activity/all/";
