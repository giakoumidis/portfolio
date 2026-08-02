/**
 * Portfolio map taxonomy — shared by homepage teaser and /map.
 * Level-0 hubs only at first; Level-1 entities revealed on interaction.
 * Recognition is surfaced as an evidence signal on the Profile/Career hub.
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
  /** Compact durable evidence signal shown without interaction. */
  signal: string;
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
  /** Recommended case files / evidence shown when the path is active. */
  recommendations: Array<{ label: string; href: string; kind: string }>;
};

export const mapCenter = {
  label: "Nikolaos",
  href: "/profile",
  blurb: "Commercial Lead — AI & Robotics, NYUAD CAIR",
  signal: "Central entity",
} as const;

/** Durable hub counts — verify before deploy; prefer rounded floors. */
export const mapSignals = {
  projects: "15 case files",
  laboratories: "3 shared research platforms",
  research: "30+ publications",
  recognition: "4 first-prize awards",
  archive: "Field records & documentary evidence",
  career: "4 career periods",
} as const;

export const mapHubs: MapHub[] = [
  {
    id: "career",
    label: "Profile",
    href: "/profile",
    blurb: "Four-era trajectory, roles, and recognition",
    signal: `${mapSignals.career} · ${mapSignals.recognition}`,
    connected: ["projects", "laboratories", "archive"],
  },
  {
    id: "laboratories",
    label: "Laboratories",
    href: "/laboratories",
    blurb: "Research platforms established and operated",
    signal: mapSignals.laboratories,
    connected: ["projects", "research", "archive"],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    blurb: "Case files, deployments, and engagements",
    signal: mapSignals.projects,
    connected: ["laboratories", "research", "archive"],
  },
  {
    id: "research",
    label: "Research",
    href: "/research",
    blurb: "Publications, IP, and themes",
    signal: mapSignals.research,
    connected: ["projects", "laboratories", "archive"],
  },
  {
    id: "archive",
    label: "Archive",
    href: "/archive",
    blurb: "Field records, exhibitions, media, documents, and evidence",
    signal: mapSignals.archive,
    connected: ["projects", "laboratories", "career"],
  },
];

export const mapPaths: MapPath[] = [
  {
    id: "industry",
    label: "Industry",
    summary:
      "Follow applied collaborations from rail and inspection projects through deployment evidence to contact.",
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
    recommendations: [
      {
        label: "Etihad Rail × NYUAD",
        href: "/projects/etihad-rail-nyuad-collaboration",
        kind: "Project",
      },
      {
        label: "Desert environment monitoring",
        href: "/projects/etihad-rail-desert-environment-monitoring",
        kind: "Project",
      },
      {
        label: "Airport inspection collaboration",
        href: "/projects/nyuad-adac-airport-inspection-drone",
        kind: "Project",
      },
      {
        label: "Exhibition archive",
        href: "/archive?type=exhibition",
        kind: "Evidence",
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    summary:
      "Move from shared laboratories through perception projects into publications and citation evidence.",
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
    recommendations: [
      {
        label: "Kinesis CTP Laboratory",
        href: "/laboratories/kinesis-ctp-laboratory",
        kind: "Laboratory",
      },
      {
        label: "UAV visual tracking",
        href: "/projects/rgb-t-uav-detection-tracking",
        kind: "Project",
      },
      {
        label: "Eye-gaze wheelchair",
        href: "/projects/eye-gaze-wheelchair",
        kind: "Project",
      },
      { label: "Research index", href: "/research", kind: "Hub" },
    ],
  },
  {
    id: "recruiter",
    label: "Recruiter",
    summary:
      "Read the career narrative, laboratories built, selected projects, awards, then download the CV.",
    steps: [
      { label: "Profile", href: "/profile" },
      { label: "Laboratories built", href: "/laboratories" },
      { label: "Selected projects", href: "/projects" },
      { label: "Awards", href: "/profile#awards" },
      { label: "CV", href: "/cv.pdf" },
    ],
    recommendations: [
      { label: "Career narrative", href: "/profile", kind: "Profile" },
      { label: "Laboratories", href: "/laboratories", kind: "Hub" },
      {
        label: "RTA delivery drone",
        href: "/projects/rta-dubai-delivery-drone",
        kind: "Project",
      },
      { label: "Download CV", href: "/cv.pdf", kind: "Document" },
    ],
  },
];

/** Hub sequence used for the traveling pulse when a visitor path is active. */
export const mapPathHubs: Record<MapPathId, MapHubId[]> = {
  industry: ["projects", "archive", "career"],
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
    { label: "Awards / recognition", href: "/profile#awards" },
    { label: "Download CV", href: "/cv.pdf" },
  ],
  archive: [
    { label: "Browse Archive", href: "/archive" },
    { label: "Exhibitions", href: "/archive?type=exhibition" },
    { label: "Field deployments", href: "/archive?type=field" },
  ],
};

export function isMapPathId(value: string | null | undefined): value is MapPathId {
  return value === "industry" || value === "research" || value === "recruiter";
}
