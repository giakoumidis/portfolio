import type { Facet, TaxonomyTerm } from "@/lib/types";

/**
 * Controlled vocabulary — facets only.
 * Laboratories and other first-class pages are content entities, not terms.
 */
export const taxonomyTerms: TaxonomyTerm[] = [
  /* ---- Domains ---- */
  {
    slug: "embodied-physical-ai",
    label: "Embodied & Physical AI",
    facet: "domain",
    description:
      "Learning-based intelligence on real hardware — policies, LLM/VLM robot behaviour.",
    aliases: ["Embodied AI", "Physical AI"],
  },
  {
    slug: "multi-agent-robotic-systems",
    label: "Multi-Agent Robotic Systems",
    facet: "domain",
    description:
      "Cooperative teams of aerial and ground robots for exploration, mapping, and inspection.",
    aliases: ["Multi-agent systems", "Multiagent robotic systems"],
  },
  {
    slug: "perception-sensing",
    label: "Perception & Sensing",
    facet: "domain",
    description:
      "Multimodal perception stacks fusing vision, LiDAR, radar, and spatial tracking.",
    aliases: ["Perception", "Sensing"],
  },
  {
    slug: "sim2real-digital-twins",
    label: "Sim2Real & Digital Twins",
    facet: "domain",
    description:
      "Simulation-first development and transfer to physical deployment.",
    aliases: ["Sim2Real", "Digital twins", "sim-to-real"],
  },
  {
    slug: "lab-automation-instrumentation",
    label: "Lab Automation & Instrumentation",
    facet: "domain",
    description:
      "Research laboratories, custom instrumentation, and high-throughput platforms.",
    aliases: ["Lab automation", "Instrumentation"],
  },
  {
    slug: "aerial-ground-underwater-robotics",
    label: "Aerial · Ground · Underwater Robotics",
    facet: "domain",
    description:
      "Mechatronic design, control, and field operation of mobile robot platforms.",
    aliases: ["Aerial robotics"],
  },
  {
    slug: "teleoperation",
    label: "Teleoperation",
    facet: "domain",
    description:
      "Human-in-the-loop remote control of manipulators and robots via motion capture, retargeting, and shared autonomy.",
    aliases: ["Remote operation", "Telepresence control"],
  },
  {
    slug: "telecommunications-edge-computing",
    label: "Photonics & Telecommunications",
    facet: "domain",
    description:
      "High-speed optical and RF characterization for silicon photonics research.",
    aliases: ["Photonics", "Telecommunications"],
  },
  {
    slug: "electronics-embedded-systems",
    label: "Electronics & Embedded Systems",
    facet: "domain",
    description: "PCB design, ASIC validation, and embedded bring-up.",
    aliases: ["Electronics", "Embedded systems"],
  },
  {
    slug: "industry-engagement",
    label: "Industry Engagement",
    facet: "domain",
    description:
      "Translation of research capabilities toward industry partnerships and pilots.",
    aliases: ["Commercialization"],
  },

  /* ---- Applications ---- */
  {
    slug: "assistive-technology",
    label: "Assistive Technology",
    facet: "application",
    aliases: ["Assistive robotics", "Assistive Robotics"],
  },
  {
    slug: "construction",
    label: "Construction",
    facet: "application",
    aliases: ["Construction robotics", "Construction-site data collection"],
  },
  {
    slug: "industrial-inspection",
    label: "Industrial Inspection",
    facet: "application",
    aliases: ["Drone inspection", "Infrastructure safety", "Infrastructure inspection"],
  },
  {
    slug: "counter-uas",
    label: "Counter-UAS",
    facet: "application",
    aliases: ["UAV detection", "Counter UAS"],
  },
  {
    slug: "agriculture-monitoring",
    label: "Agriculture Monitoring",
    facet: "application",
    aliases: ["Date palm inspection", "Red Palm Weevil", "Field robotics"],
  },
  {
    slug: "rail-transport",
    label: "Rail Transport",
    facet: "application",
    aliases: ["Rail infrastructure"],
  },
  {
    slug: "hardware-security",
    label: "Hardware Security",
    facet: "application",
    aliases: ["ASIC validation", "Logic locking"],
  },
  {
    slug: "human-robot-interaction",
    label: "Human-Robot Interaction",
    facet: "application",
    aliases: ["HRI", "Telepresence", "Human-robot interaction"],
  },
  {
    slug: "research-infrastructure",
    label: "Research Infrastructure",
    facet: "application",
    aliases: ["Facility design", "Lab establishment"],
  },

  /* ---- Platforms ---- */
  {
    slug: "boston-dynamics-spot",
    label: "Boston Dynamics Spot",
    facet: "platform",
    aliases: ["Spot", "BD Spot"],
  },
  {
    slug: "clearpath-husky",
    label: "Clearpath Husky",
    facet: "platform",
    aliases: ["Husky", "Husky UGV", "Clearpath Husky UGV"],
  },
  {
    slug: "kuka-lbr-iiwa",
    label: "KUKA LBR iiwa",
    facet: "platform",
    aliases: ["KUKA", "KUKA arm", "LBR iiwa"],
  },
  {
    slug: "uav-platform",
    label: "UAV Platform",
    facet: "platform",
    aliases: ["UAV", "Drone", "Quad-rotor", "DJI", "custom UAV"],
  },
  {
    slug: "ugv-platform",
    label: "UGV Platform",
    facet: "platform",
    aliases: ["UGV", "Ground robot", "Ground vehicle"],
  },
  {
    slug: "rgbt-ptz-camera",
    label: "RGB-T PTZ Camera",
    facet: "platform",
    aliases: ["PTZ camera", "Pan-tilt-zoom camera", "RGB-t camera"],
  },
  {
    slug: "vicon-motion-capture",
    label: "Vicon Motion Capture",
    facet: "platform",
    aliases: ["Vicon", "Motion capture", "Vicon V16"],
  },
  {
    slug: "hts-robot",
    label: "HTS Plate-Handling Robot",
    facet: "platform",
    aliases: ["HTS robot", "Plate-handling rail robot", "Robotic liquid handling"],
  },
  {
    slug: "industrial-manipulator",
    label: "Industrial Manipulator",
    facet: "platform",
    aliases: ["Industrial robotic arm", "Industrial arm", "Fanuc", "Kinova"],
  },
  {
    slug: "android-telepresence",
    label: "Android Telepresence Platform",
    facet: "platform",
    aliases: ["Android hardware", "Humanoid", "Android head"],
  },
  {
    slug: "custom-pcb",
    label: "Custom PCB / ASIC Test Rig",
    facet: "platform",
    aliases: ["PCB", "ASIC test platform", "Cortex-M0"],
  },
  {
    slug: "powered-wheelchair",
    label: "Powered Wheelchair",
    facet: "platform",
    aliases: ["Wheelchair", "Eye-gaze wheelchair"],
  },
  {
    slug: "gazebo",
    label: "Gazebo",
    facet: "platform",
    aliases: ["Gazebo/RViz"],
  },
  {
    slug: "labview",
    label: "LabVIEW",
    facet: "platform",
    aliases: ["LabVIEW workflows"],
  },

  /* ---- Methods ---- */
  {
    slug: "thermal-imaging",
    label: "Thermal Imaging",
    facet: "method",
    aliases: ["Thermal", "RGB-T", "Thermal cameras"],
  },
  {
    slug: "visual-tracking",
    label: "Visual Tracking",
    facet: "method",
    aliases: ["Visual tracking", "Siamese tracker", "UAV tracking"],
  },
  {
    slug: "sensor-fusion",
    label: "Sensor Fusion",
    facet: "method",
    aliases: ["Multimodal sensing", "Sensor-fusion"],
  },
  {
    slug: "slam",
    label: "SLAM",
    facet: "method",
    aliases: ["Localization & mapping", "RGB-D SLAM"],
  },
  {
    slug: "eye-gaze-tracking",
    label: "Eye-Gaze Tracking",
    facet: "method",
    aliases: ["Eye-gaze tracking", "Gaze tracking"],
  },
  {
    slug: "shared-autonomy",
    label: "Shared Autonomy",
    facet: "method",
    aliases: ["Assisted control", "Human-in-the-loop"],
  },
  {
    slug: "exploration-algorithms",
    label: "Exploration Algorithms",
    facet: "method",
    aliases: ["Autonomous exploration", "3D digitization"],
  },
  {
    slug: "air-based-path-planning",
    label: "Air-Based Path Planning",
    facet: "method",
    aliases: ["Aerial mapping", "Path planning"],
  },
  {
    slug: "kinematic-retargeting",
    label: "Kinematic Retargeting",
    facet: "method",
    aliases: ["Motion capture teleoperation", "Arm imitation"],
  },
  {
    slug: "pcb-design",
    label: "PCB Design",
    facet: "method",
    aliases: ["Eagle schematic", "Two-layer layout"],
  },
  {
    slug: "aerial-manipulation",
    label: "Aerial Manipulation",
    facet: "method",
    aliases: ["UAV robotic arms", "Contact inspection"],
  },
  {
    slug: "optical-characterization",
    label: "Optical Characterization",
    facet: "method",
    aliases: ["BER testing", "Lightwave analysis", "Optical test"],
  },
  {
    slug: "deep-learning",
    label: "Deep Learning",
    facet: "method",
    aliases: ["Deep learning", "Supervised deep learning"],
  },

  /* ---- Contributions ---- */
  {
    slug: "conceived",
    label: "Conceived",
    facet: "contribution",
  },
  {
    slug: "led",
    label: "Led",
    facet: "contribution",
  },
  {
    slug: "designed",
    label: "Designed",
    facet: "contribution",
  },
  {
    slug: "built",
    label: "Built",
    facet: "contribution",
  },
  {
    slug: "system-integration",
    label: "System Integration",
    facet: "contribution",
    aliases: ["Integrated", "Systems integration"],
  },
  {
    slug: "commissioned",
    label: "Commissioned",
    facet: "contribution",
  },
  {
    slug: "operated",
    label: "Operated",
    facet: "contribution",
  },
  {
    slug: "field-testing",
    label: "Field Testing",
    facet: "contribution",
    aliases: ["Field-tested", "Field-validated"],
  },
  {
    slug: "experimental-development",
    label: "Experimental Development",
    facet: "contribution",
  },
  {
    slug: "supported",
    label: "Supported",
    facet: "contribution",
    aliases: ["Technical support", "Instrumentation support"],
  },
  {
    slug: "co-authored",
    label: "Co-Authored",
    facet: "contribution",
    aliases: ["First-author", "Published"],
  },
  {
    slug: "commercialized",
    label: "Commercialized / Translated",
    facet: "contribution",
    aliases: ["Research translation", "Industry translation"],
  },
  {
    slug: "electronics-design",
    label: "Electronics Design",
    facet: "contribution",
    aliases: ["PCB development", "Electromechanical work"],
  },

  /* ---- Outcomes ---- */
  {
    slug: "peer-reviewed-publication",
    label: "Peer-Reviewed Publication",
    facet: "outcome",
    aliases: ["Publication", "Paper"],
  },
  {
    slug: "operational-laboratory",
    label: "Operational Laboratory",
    facet: "outcome",
  },
  {
    slug: "deployed-prototype",
    label: "Deployed Prototype",
    facet: "outcome",
    aliases: ["Live experimental validation", "Field deployment"],
  },
  {
    slug: "industry-collaboration",
    label: "Industry Collaboration",
    facet: "outcome",
    aliases: ["Strategic collaboration"],
  },
  {
    slug: "public-demonstration",
    label: "Public Demonstration",
    facet: "outcome",
    aliases: ["Institutional demonstration"],
  },
  {
    slug: "research-capability",
    label: "Research Capability",
    facet: "outcome",
    aliases: ["Research enablement"],
  },
];

const bySlug = new Map<string, TaxonomyTerm>();
const aliasToSlug = new Map<string, string>();

for (const term of taxonomyTerms) {
  bySlug.set(term.slug, term);
  aliasToSlug.set(term.slug.toLowerCase(), term.slug);
  aliasToSlug.set(term.label.toLowerCase(), term.slug);
  for (const alias of term.aliases ?? []) {
    aliasToSlug.set(alias.toLowerCase(), term.slug);
  }
}

export function getTaxonomyTerm(slug: string): TaxonomyTerm | undefined {
  return bySlug.get(slug);
}

export function resolveTaxonomyAlias(value: string): string | undefined {
  return aliasToSlug.get(value.toLowerCase().trim());
}

export function getTaxonomyByFacet(facet: Facet): TaxonomyTerm[] {
  return taxonomyTerms.filter((term) => term.facet === facet);
}

export function taxonomyLabel(slug: string): string {
  return bySlug.get(slug)?.label ?? slug;
}
