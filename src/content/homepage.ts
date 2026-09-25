/**
 * Homepage curation config — editable without restructuring components.
 * PENDING OWNER REVIEW on flagship order, sixth project, metrics, teaser count.
 */

import { profile } from "@/content/profile";

/** Lead project — full-width treatment on the homepage and projects index. */
export const featuredProjectSlug = "agentic-robotics-framework";

/** Flagship project slugs in narrative order (homepage Selected Projects). */
export const flagshipProjectSlugs = [
  featuredProjectSlug,
  "etihad-rail-nyuad-collaboration",
  "rta-dubai-delivery-drone",
  "multiagent-construction-exploration",
  "eye-gaze-wheelchair",
  "rgb-t-uav-detection-tracking",
  "etihad-rail-desert-environment-monitoring",
] as const;

/** Homepage profile paragraph. Same copy as the profile page summary. */
export const homepageProfileBlurb = profile.summary;

/**
 * Archive teaser photo srcs (matched against archive records).
 * Etihad Rail booth stills are public exhibition imagery; depot/facility stills
 * are excluded until publication rights are confirmed.
 */
export const archiveTeaserSrcs = [
  "/images/field/global-rail-humanoid.jpg",
  "/images/field/kinesis-arena-aerial.jpg",
  "/images/awards/rta-2021/delivery-octarotor-top.jpg",
  "/images/field/etihad-rail-booth-spots.jpg",
  "/images/field/dwc-modular-tricopter.jpg",
  "/images/field/cair-fleet-lineup.jpg",
] as const;
