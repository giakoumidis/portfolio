/**
 * Portfolio map taxonomy — shared by homepage teaser and /map.
 * Level-0 hubs only at first; Level-1 entities revealed on interaction.
 * Awards live under Profile (not a separate Recognition hub).
 */

export type MapHubId =
  | "projects"
  | "laboratories"
  | "research"
  | "career"
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
    blurb: "Four-era trajectory, roles, and awards",
    connected: ["projects", "laboratories", "archive"],
  },
  {
    id: "laboratories",
    label: "Laboratories",
    href: "/laboratories",
    blurb: "Research platforms established and operated",
    connected: ["projects", "research", "archive"],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    blurb: "Case files, deployments, and engagements",
    connected: ["laboratories", "research", "archive"],
  },
  {
    id: "research",
    label: "Research",
    href: "/research",
    blurb: "Publications, IP, and themes",
    connected: ["projects", "laboratories", "archive"],
  },
  {
    id: "archive",
    label: "Archive",
    href: "/archive",
    blurb: "Documentary evidence of the work",
    connected: ["projects", "laboratories", "career"],
  },
];

export const mapPaths: MapPath[] = [
  {
    id: "industry",
    label: "Industry",
    summary: "Application → project → deployment evidence → outcome → contact",
    steps: [
      {
        label: "Rail & industry projects",
        href: "/projects?application=rail-transport",
      },
      {
        label: "Etihad Rail collaboration",
        href: "/projects/etihad-rail-nyuad-collaboration",
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
        href: "/projects/rgb-t-uav-detection-tracking",
      },
      { label: "Publications", href: "/research" },
    ],
  },
  {
    id: "recruiter",
    label: "Recruiter",
    summary: "Profile → career → laboratories → projects → awards → CV",
    steps: [
      { label: "Profile", href: "/profile" },
      { label: "Laboratories built", href: "/laboratories" },
      { label: "Selected projects", href: "/projects" },
      { label: "Awards", href: "/profile#awards" },
      { label: "CV", href: "/cv.pdf" },
    ],
  },
];

/** Hub sequence used for the traveling pulse when a visitor path is active. */
export const mapPathHubs: Record<MapPathId, MapHubId[]> = {
  industry: ["projects", "archive"],
  research: ["laboratories", "projects", "research"],
  recruiter: ["career", "laboratories", "projects", "archive"],
};

/** Level-1 sample entities per hub — keep sparse for progressive disclosure. */
export const mapHubEntities: Record<
  MapHubId,
  Array<{ label: string; href: string }>
> = {
  projects: [
    {
      label: "Etihad Rail × NYUAD",
      href: "/projects/etihad-rail-nyuad-collaboration",
    },
    {
      label: "RTA Delivery Drone",
      href: "/projects/rta-dubai-delivery-drone",
    },
    {
      label: "Eye-Gaze Wheelchair",
      href: "/projects/eye-gaze-wheelchair",
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
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=HmOOogwAAAAJ&hl=en",
    },
  ],
  career: [
    { label: "Four-era trajectory", href: "/profile" },
    { label: "Awards", href: "/profile#awards" },
    { label: "Download CV", href: "/cv.pdf" },
  ],
  archive: [
    { label: "Browse Archive", href: "/archive" },
    { label: "Exhibitions", href: "/archive?type=exhibition" },
    { label: "Field deployments", href: "/archive?type=field" },
  ],
};
