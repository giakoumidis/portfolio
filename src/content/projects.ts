import { getLegacyProjects } from "@/content/adapters";
import type { Project } from "@/lib/types";

/**
 * Homepage project list — derived from knowledge-graph work records.
 * Prefer `@/content/work` + `@/lib/query` for new routes.
 */
export const projects: Project[] = getLegacyProjects();
