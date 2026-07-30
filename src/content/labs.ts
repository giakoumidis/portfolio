import { getLegacyLabs } from "@/content/adapters";
import type { Project } from "@/lib/types";

/**
 * Homepage lab list — derived from knowledge-graph infrastructure records.
 * Prefer `@/content/infrastructure` + `@/lib/query` for new routes.
 */
export const labs: Project[] = getLegacyLabs();
