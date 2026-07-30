import type { Facet, TaxonomySlug } from "@/lib/types";

/** Explicit mapping from legacy freeform tags / labels → controlled facets. */
export type LegacyTagMapping = {
  facet: Facet;
  slug: TaxonomySlug;
};

export const legacyTagMap: Record<string, LegacyTagMapping> = {
  /* Domains / labels already used as domainId */
  "embodied-physical-ai": { facet: "domain", slug: "embodied-physical-ai" },
  "multi-agent-robotic-systems": {
    facet: "domain",
    slug: "multi-agent-robotic-systems",
  },
  "perception-sensing": { facet: "domain", slug: "perception-sensing" },
  "lab-automation-instrumentation": {
    facet: "domain",
    slug: "lab-automation-instrumentation",
  },
  "aerial-ground-underwater-robotics": {
    facet: "domain",
    slug: "aerial-ground-underwater-robotics",
  },
  teleoperation: { facet: "domain", slug: "teleoperation" },
  "telecommunications-edge-computing": {
    facet: "domain",
    slug: "telecommunications-edge-computing",
  },
  "industry-engagement": { facet: "domain", slug: "industry-engagement" },

  /* Confirmed tag → facet mappings */
  SLAM: { facet: "method", slug: "slam" },
  Spot: { facet: "platform", slug: "boston-dynamics-spot" },
  "Boston Dynamics Spot": { facet: "platform", slug: "boston-dynamics-spot" },
  Husky: { facet: "platform", slug: "clearpath-husky" },
  "Clearpath Husky": { facet: "platform", slug: "clearpath-husky" },
  "Assistive Robotics": { facet: "application", slug: "assistive-technology" },
  "Assistive robotics": { facet: "application", slug: "assistive-technology" },
  "Eye-gaze tracking": { facet: "method", slug: "eye-gaze-tracking" },
  "Shared autonomy": { facet: "method", slug: "shared-autonomy" },
  "Thermal imaging": { facet: "method", slug: "thermal-imaging" },
  "Visual tracking": { facet: "method", slug: "visual-tracking" },
  "Pan-tilt-zoom camera": { facet: "platform", slug: "rgbt-ptz-camera" },
  "Counter-UAS": { facet: "application", slug: "counter-uas" },
  "UAV detection": { facet: "application", slug: "counter-uas" },
  "Construction robotics": { facet: "application", slug: "construction" },
  "Exploration algorithms": { facet: "method", slug: "exploration-algorithms" },
  "Multi-agent systems": {
    facet: "domain",
    slug: "multi-agent-robotic-systems",
  },
  "Human-in-the-loop": { facet: "method", slug: "shared-autonomy" },
  "Sensor fusion": { facet: "method", slug: "sensor-fusion" },
  "Date palm inspection": {
    facet: "application",
    slug: "agriculture-monitoring",
  },
  "Red Palm Weevil": { facet: "application", slug: "agriculture-monitoring" },
  "PCB design": { facet: "method", slug: "pcb-design" },
  "Hardware security": { facet: "application", slug: "hardware-security" },
  "ASIC validation": { facet: "application", slug: "hardware-security" },
  "Aerial manipulation": { facet: "method", slug: "aerial-manipulation" },
  "Drone inspection": { facet: "application", slug: "industrial-inspection" },
  "Motion capture": { facet: "platform", slug: "vicon-motion-capture" },
  Teleoperation: { facet: "domain", slug: "teleoperation" },
  "Industrial manipulator": {
    facet: "platform",
    slug: "industrial-manipulator",
  },
  "Kinematic retargeting": { facet: "method", slug: "kinematic-retargeting" },
  "Human-robot interaction": {
    facet: "application",
    slug: "human-robot-interaction",
  },
  "Air-based path planning": {
    facet: "method",
    slug: "air-based-path-planning",
  },
  "UAV-UGV hybrid": { facet: "method", slug: "air-based-path-planning" },
  "Quad-rotor": { facet: "platform", slug: "uav-platform" },
  "Heterogeneous multi-robot": {
    facet: "domain",
    slug: "multi-agent-robotic-systems",
  },
  LabVIEW: { facet: "platform", slug: "labview" },
  "High-throughput screening": {
    facet: "application",
    slug: "research-infrastructure",
  },
  "Lab automation": {
    facet: "domain",
    slug: "lab-automation-instrumentation",
  },
  "Systems integration": { facet: "contribution", slug: "system-integration" },
  "Research infrastructure": {
    facet: "application",
    slug: "research-infrastructure",
  },
  "Rail infrastructure": { facet: "application", slug: "rail-transport" },
  "Industry engagement": { facet: "domain", slug: "industry-engagement" },
  "Strategic collaboration": {
    facet: "outcome",
    slug: "industry-collaboration",
  },
  "Research translation": { facet: "contribution", slug: "commercialized" },
};

export type UnresolvedLegacyTag = {
  project: string;
  value: string;
  reason: string;
};

/**
 * Tags that were intentionally not mapped — too broad or ambiguous.
 * Surfaced in CONTENT_MIGRATION.md for editorial review.
 */
export const unresolvedLegacyTags: UnresolvedLegacyTag[] = [
  {
    project: "etihad-rail-nyuad-collaboration",
    value: "AI & robotics",
    reason: "Too broad — could be domain, method, or marketing label",
  },
  {
    project: "multiagent-construction-exploration",
    value: "3D digitization",
    reason: "Could be method or outcome; folded into exploration context",
  },
  {
    project: "eye-gaze-wheelchair",
    value: "Obstacle avoidance",
    reason: "Capability detail, not a primary facet",
  },
  {
    project: "hardware-security-asic-validation-platform",
    value: "Logic locking",
    reason: "Research technique specific to the paper, not a portfolio facet",
  },
  {
    project: "nyuad-adac-airport-inspection-drone",
    value: "UAV robotic arms",
    reason: "Covered by aerial-manipulation method + uav-platform",
  },
  {
    project: "nyuad-adac-airport-inspection-drone",
    value: "Industry collaboration",
    reason: "Mapped as outcome elsewhere; tag itself is generic",
  },
  {
    project: "palmspector-date-palm-monitoring",
    value: "Field robotics",
    reason: "Overlaps domain vs application; used agriculture-monitoring",
  },
  {
    project: "uav-ugv-hybrid-air-based-path-planning",
    value: "Aerial mapping",
    reason: "Covered by air-based-path-planning method",
  },
  {
    project: "android-telepresence-hardware",
    value: "Servo actuation",
    reason: "Implementation detail, not a controlled facet",
  },
  {
    project: "android-telepresence-hardware",
    value: "Electromechanical design",
    reason: "Covered by electronics-design contribution",
  },
  {
    project: "android-telepresence-hardware",
    value: "Humanoid robotics",
    reason: "Broad domain label; platform is android-telepresence",
  },
  {
    project: "industrial-arm-teleoperation",
    value: "Human-robot interaction",
    reason: "Mapped as application; duplicate of alias check",
  },
];

export function mapLegacyTag(value: string): LegacyTagMapping | undefined {
  return legacyTagMap[value];
}
