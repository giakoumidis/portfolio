/**
 * Homepage curation config — editable without restructuring components.
 * PENDING OWNER REVIEW on flagship order, sixth project, metrics, teaser count.
 */

/** Flagship project slugs in narrative order (homepage Selected Projects). */
export const flagshipProjectSlugs = [
  "etihad-rail-nyuad-collaboration",
  "rta-dubai-delivery-drone",
  "multiagent-construction-exploration",
  "eye-gaze-wheelchair",
  "rgb-t-uav-detection-tracking",
  "etihad-rail-desert-environment-monitoring",
] as const;

/** Collaboration / recognition strip on Profile & Proof. */
export const collaborationStrip = [
  "NYU Abu Dhabi",
  "Etihad Rail",
  "RTA Dubai World Challenge",
  "Abu Dhabi Airports",
] as const;

/** Compact homepage profile paragraph (~50–80 words). */
export const homepageProfileBlurb =
  "Commercial Lead for AI and Robotics at NYU Abu Dhabi's CAIR. I commercialize embodied AI and multi-agent robotics built on more than a decade of research infrastructure, experimental engineering, and field deployment across the UAE — from shared laboratories that support 100+ researchers to award-winning systems and industry collaborations.";

/** Archive teaser photo srcs (matched against archive records). */
export const archiveTeaserSrcs = [
  "/images/field/global-rail-humanoid.jpg",
  "/images/field/kinesis-arena-aerial.jpg",
  "/images/awards/rta-2021/delivery-octarotor-top.jpg",
  "/images/field/etihad-rail-booth-spots.jpg",
  "/images/field/dwc-modular-tricopter.jpg",
  "/images/field/cair-fleet-lineup.jpg",
] as const;
