export type CareerEra = {
  id: string;
  label: string;
  years: string;
  summary: string;
  relatedExperienceIds: string[];
  relatedWorkSlugs: string[];
  relatedLabSlugs?: string[];
};

export const careerEras: CareerEra[] = [
  {
    id: "early-robotics",
    label: "Early robotics research & autonomous systems",
    years: "2009–2012",
    summary:
      "Developed a foundation in autonomous flight, robot teleoperation, and aerial–ground cooperation through research internships, small-UAS R&D, and a BSc thesis on GPS navigation. Taught robotics and helped establish NYUAD's first robotics laboratory.",
    relatedExperienceIds: [
      "uaeu-research-intern",
      "experimental-primary-school-athens-teacher",
      "hellenic-armed-forces-rd-engineer",
      "nyuad-irml-research-assistant",
    ],
    relatedWorkSlugs: [
      "uav-ugv-hybrid-air-based-path-planning",
      "industrial-arm-teleoperation",
      "android-telepresence-hardware",
      "ardrone-gps-path-planning-bsc-thesis",
    ],
  },
  {
    id: "electronics-instrumentation",
    label: "Electronics, instrumentation & laboratory creation",
    years: "2012–2017",
    summary:
      "Established NYUAD's Electronics Workshop and co-established its Advanced Manufacturing Workshop. Built custom electronics, automated research instruments, and robotic systems, translating experimental requirements into working hardware and software.",
    relatedExperienceIds: [
      "nyuad-irml-research-assistant",
      "nyuad-electronics-engineer",
    ],
    relatedWorkSlugs: [
      "eye-gaze-wheelchair",
      "ribbon-curler-research-instrumentation",
      "hardware-security-asic-validation-platform",
      "palmspector-date-palm-monitoring",
    ],
    relatedLabSlugs: ["photonics-ctp-laboratory", "nyuad-hts-platform"],
  },
  {
    id: "research-infrastructure",
    label: "Research infrastructure & systems leadership",
    years: "2017–2025",
    summary:
      "Led the creation of Kinesis and the expansion and operation of shared research platforms across robotics, photonics, and laboratory automation. Supported 100+ research and technical users while contributing to aerial robotics, construction automation, and perception research.",
    relatedExperienceIds: ["nyuad-ctp-research-instrumentation-specialist"],
    relatedWorkSlugs: [
      "rta-dubai-delivery-drone",
      "rgb-t-uav-detection-tracking",
      "hybrid-ground-air-water-vehicle",
      "multiagent-construction-exploration",
      "nyuad-adac-airport-inspection-drone",
    ],
    relatedLabSlugs: [
      "kinesis-ctp-laboratory",
      "photonics-ctp-laboratory",
      "nyuad-hts-platform",
    ],
  },
  {
    id: "commercialization",
    label: "AI & robotics commercialization",
    years: "2025–present",
    summary:
      "Lead CAIR's commercialization and industry engagement, connecting AI and robotics research with industrial needs across transport, logistics, and infrastructure. Develop technical proposals, partnerships, and pilot opportunities while continuing hands-on research in robot-agent frameworks and cooperative autonomy.",
    relatedExperienceIds: ["nyuad-cair-commercial-lead"],
    relatedWorkSlugs: [
      "etihad-rail-nyuad-collaboration",
      "etihad-rail-desert-environment-monitoring",
    ],
    relatedLabSlugs: ["kinesis-ctp-laboratory"],
  },
];
