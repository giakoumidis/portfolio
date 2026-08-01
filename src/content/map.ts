/**
 * Portfolio map taxonomy — shared by homepage teaser and /map.
 * Level-0 hubs only at first; Level-1 entities revealed on interaction.
 */

export type MapHubId =
  | "work"
  | "laboratories"
  | "research"
  | "career"
  | "recognition"
  | "archive";

export type MapHub = {
  id: MapHubId;
  label: string;
  href: string;
  blurb: string;
  /** Conceptual neighbours for highlight relationships. */
  connected: MapHubId[];
};

export type MapPathId = "industry" | "research" | "recruiter";

export type MapPathStep = {
  label: string;
  href: string;
};

export type MapPath = {
  id: MapPathId;
  label: string;
  summary: string;
  steps: MapPathStep[];
};

export const mapCenter = {
  label: "Nikolaos",
  href: "/profile",
  blurb: "Commercial Lead — AI & Robotics, NYUAD CAIR",
} as const;

export const mapHubs: MapHub[] = [
  {
    id: "career",
    label: "Career",
    href: "/profile",
    blurb: "Four-era trajectory and roles",
    connected: ["work", "laboratories", "recognition"],
  },
  {
    id: "laboratories",
    label: "Laboratories",
    href: "/laboratories",
    blurb: "Research platforms established and operated",
    connected: ["work", "research", "archive"],
  },
  {
    id: "work",
    label: "Work",
    href: "/work",
    blurb: "Projects, deployments, and case files",
    connected: ["laboratories", "research", "archive", "recognition"],
  },
  {
    id: "research",
    label: "Research",
    href: "/research",
    blurb: "Publications, IP, and themes",
    connected: ["work", "laboratories", "recognition"],
  },
  {
    id: "recognition",
    label: "Recognition",
    href: "/research#recognition",
    blurb: "Awards and external validation",
    connected: ["work", "research", "archive"],
  },
  {
    id: "archive",
    label: "Archive",
    href: "/archive",
    blurb: "Documentary evidence of the work",
    connected: ["work", "laboratories", "recognition"],
  },
];

export const mapPaths: MapPath[] = [
  {
    id: "industry",
    label: "Industry",
    summary: "Application → project → deployment evidence → outcome → contact",
    steps: [
      { label: "Rail & industry work", href: "/work?application=rail-transport" },
      {
        label: "Etihad Rail collaboration",
        href: "/work/etihad-rail-nyuad-collaboration",
      },
      { label: "Archive evidence", href: "/archive?type=exhibition" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    id: "research",
    label: "Research",
    summary: "Domain → laboratory → project → publication → evidence",
    steps: [
      { label: "Laboratories", href: "/laboratories" },
      {
        label: "Kinesis CTP Laboratory",
        href: "/laboratories/kinesis-ctp-laboratory",
      },
      {
        label: "UAV visual tracking",
        href: "/work/rgb-t-uav-detection-tracking",
      },
      { label: "Publications", href: "/research" },
    ],
  },
  {
    id: "recruiter",
    label: "Recruiter",
    summary: "Profile → career → laboratories → projects → recognition → CV",
    steps: [
      { label: "Profile", href: "/profile" },
      { label: "Laboratories built", href: "/laboratories" },
      { label: "Selected work", href: "/work" },
      { label: "Recognition", href: "/research#recognition" },
      { label: "CV", href: "/cv.pdf" },
    ],
  },
];

/** Hub sequence used for the traveling pulse when a visitor path is active. */
export const mapPathHubs: Record<MapPathId, MapHubId[]> = {
  industry: ["work", "archive"],
  research: ["laboratories", "work", "research"],
  recruiter: ["career", "laboratories", "work", "recognition"],
};

/** Level-1 sample entities per hub — keep sparse for progressive disclosure. */
export const mapHubEntities: Record<
  MapHubId,
  Array<{ label: string; href: string }>
> = {
  work: [
    {
      label: "Etihad Rail × NYUAD",
      href: "/work/etihad-rail-nyuad-collaboration",
    },
    {
      label: "RTA Delivery Drone",
      href: "/work/rta-dubai-delivery-drone",
    },
    {
      label: "Eye-Gaze Wheelchair",
      href: "/work/eye-gaze-wheelchair",
    },
  ],
  laboratories: [
    {
      label: "Kinesis CTP Laboratory",
      href: "/laboratories/kinesis-ctp-laboratory",
    },
    {
      label: "Photonics CTP Laboratory",
      href: "/laboratories/photonics-ctp-laboratory",
    },
    {
      label: "High-Throughput Screening",
      href: "/laboratories/nyuad-hts-platform",
    },
  ],
  research: [
    { label: "Publications & IP", href: "/research" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=HmOOogwAAAAJ&hl=en" },
  ],
  career: [
    { label: "Four-era trajectory", href: "/profile" },
    { label: "Download CV", href: "/cv.pdf" },
  ],
  recognition: [
    { label: "Awards", href: "/research#recognition" },
    { label: "RTA First Prize", href: "/work/rta-dubai-delivery-drone" },
  ],
  archive: [
    { label: "Browse Archive", href: "/archive" },
    { label: "Exhibitions", href: "/archive?type=exhibition" },
    { label: "Field deployments", href: "/archive?type=field" },
  ],
};
