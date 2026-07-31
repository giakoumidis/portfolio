import { getLegacyLaboratories } from "@/content/adapters";
import type { Project } from "@/lib/types";

/**
 * Homepage laboratories list — derived from knowledge-graph infrastructure records.
 * Prefer `@/content/infrastructure` + `@/lib/query` for new routes.
 */
export const laboratories: Project[] = getLegacyLaboratories();
