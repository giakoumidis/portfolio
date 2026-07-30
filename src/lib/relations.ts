import type { RelationType } from "@/lib/types";

/**
 * Directed relation vocabulary. Store each edge once on the source;
 * the query layer derives the inverse for hub pages.
 */
export const relationDefinitions = {
  "tested-in": { inverse: "testing-environment-for" },
  "developed-in": { inverse: "development-environment-for" },
  "enabled-by": { inverse: "enabled" },
  "fabricated-through": { inverse: "fabricated-for" },
  "deployed-at": { inverse: "deployment-site-of" },
  "demonstrated-at": { inverse: "hosted-demonstration-of" },
  "published-as": { inverse: "publication-of" },
  "documented-in": { inverse: "documents" },
  "recognized-by": { inverse: "recognizes" },
  "used-platform": { inverse: "used-by" },
  "continuation-of": { inverse: "continued-by" },
  commercializes: { inverse: "commercialized-by" },
} as const satisfies Record<RelationType, { inverse: string }>;

export type InverseRelationType =
  (typeof relationDefinitions)[RelationType]["inverse"];

export const APPROVED_RELATION_TYPES = Object.keys(
  relationDefinitions,
) as RelationType[];

/** Relation types that connect a project to an infrastructure environment. */
export const ENVIRONMENT_RELATION_TYPES: RelationType[] = [
  "tested-in",
  "developed-in",
  "enabled-by",
  "fabricated-through",
  "deployed-at",
  "demonstrated-at",
];

export function isRelationType(value: string): value is RelationType {
  return value in relationDefinitions;
}

export function inverseOf(type: RelationType): InverseRelationType {
  return relationDefinitions[type].inverse;
}
