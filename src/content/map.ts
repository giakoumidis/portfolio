/**
 * Audience paths shown in the hero. Each path is a short curated route
 * through existing pages — there is no separate map view.
 */

export type MapPathId = "industry" | "research" | "recruiter";

export type MapPath = {
  id: MapPathId;
  label: string;
  summary: string;
  recommendations: Array<{ label: string; href: string }>;
};

export const mapPaths: MapPath[] = [
  {
    id: "industry",
    label: "Industry",
    summary:
      "Robotics for rail and infrastructure inspection, and how to start a conversation about an industrial application.",
    recommendations: [
      {
        label: "Etihad Rail × NYUAD",
        href: "/projects/etihad-rail-nyuad-collaboration",
      },
      {
        label: "Desert environment monitoring",
        href: "/projects/etihad-rail-desert-environment-monitoring",
      },
      {
        label: "Airport inspection collaboration",
        href: "/projects/nyuad-adac-airport-inspection-drone",
      },
      {
        label: "Exhibition archive",
        href: "/archive?type=exhibition",
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    summary:
      "Experimental systems, research facilities, and publications in robotics and perception.",
    recommendations: [
      {
        label: "Kinesis CTP Laboratory",
        href: "/laboratories/kinesis-ctp-laboratory",
      },
      {
        label: "UAV visual tracking",
        href: "/projects/rgb-t-uav-detection-tracking",
      },
      {
        label: "Eye-gaze wheelchair",
        href: "/projects/eye-gaze-wheelchair",
      },
      { label: "Publications", href: "/research" },
    ],
  },
  {
    id: "recruiter",
    label: "Recruiter",
    summary:
      "Engineering depth, responsibility for research facilities, and experience connecting technical teams with industry.",
    recommendations: [
      { label: "Experience & leadership", href: "/profile" },
      { label: "Laboratories", href: "/laboratories" },
      {
        label: "RTA delivery drone",
        href: "/projects/rta-dubai-delivery-drone",
      },
      { label: "Download CV", href: "/cv.pdf" },
    ],
  },
];
