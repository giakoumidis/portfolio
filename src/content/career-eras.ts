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
      "Research internships, teaching robotics, and defense R&D on small UAS — culminating in NYUAD's first robotics laboratory and BSc thesis work on GPS-guided autonomous flight.",
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
      "Established NYUAD's Electronics and Advanced Manufacturing workshops, co-built shared research platforms, and delivered scientific instrumentation across photonics, HTS, and robotics.",
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
    label: "Research infrastructure & multidisciplinary enablement",
    years: "2017–2025",
    summary:
      "Expanded and operated key NYUAD laboratories — Kinesis, photonics, HTS — supporting 100+ researchers while co-developing aerial robotics, construction automation, and perception systems.",
    relatedExperienceIds: ["nyuad-ctp-research-instrumentation-specialist"],
    relatedWorkSlugs: [
      "rta-dubai-delivery-drone",
      "rgb-t-uav-detection-tracking",
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
      "Commercial Lead at CAIR — translating embodied AI and autonomous systems research into industry collaborations, proposals, and field deployments across transport, logistics, and infrastructure.",
    relatedExperienceIds: ["nyuad-cair-commercial-lead"],
    relatedWorkSlugs: [
      "etihad-rail-nyuad-collaboration",
      "etihad-rail-desert-environment-monitoring",
    ],
    relatedLabSlugs: ["kinesis-ctp-laboratory"],
  },
];
