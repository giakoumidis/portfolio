"use client";

import { Suspense, useSyncExternalStore } from "react";

import MapFallback from "@/components/map/MapFallback";
import PortfolioMap from "@/components/map/PortfolioMap";
import type { MapPathId } from "@/content/map";

type MapExperienceProps = {
  variant?: "teaser" | "full";
  initialPathId?: MapPathId | null;
};

function subscribe() {
  return () => {};
}

/**
 * Progressive enhancement: SSR/no-JS readers always get MapFallback.
 * After hydration, the interactive map takes the visual stage and the
 * fallback remains in the accessibility tree.
 */
export default function MapExperience({
  variant = "full",
  initialPathId = null,
}: MapExperienceProps) {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <div className="space-y-6">
      <div className={hydrated ? "sr-only" : undefined}>
        <MapFallback />
      </div>
      {hydrated && (
        <Suspense fallback={null}>
          <PortfolioMap variant={variant} initialPathId={initialPathId} />
        </Suspense>
      )}
    </div>
  );
}
