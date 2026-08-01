import { infrastructureRecords } from "@/content/infrastructure";
import { workRecords } from "@/content/work";
import type { FieldPhoto } from "@/lib/types";

/**
 * Standalone shots not attached to a work or laboratory record
 * (competitions, exhibition floors, etc.). Project/laboratory archive photos are
 * aggregated in `getFieldPhotos()` so the gallery stays in sync with content.
 *
 * Source archive: Google Drive "Kinesis Photos and Videos"; resize new
 * additions to ~1600px wide JPEGs under `public/images/field/`.
 */
const standaloneFieldPhotos: FieldPhoto[] = [
  {
    src: "/images/field/kinesis-arena-aerial.jpg",
    alt: "Aerial view of the Kinesis arena floor with a Spot quadruped, a heavy-lift hexacopter, and ground robots staged between truss columns",
    caption: "ARENA OVERWATCH — MIXED FLEET STAGED",
    location: "KINESIS · NYUAD · 2021",
  },
  {
    src: "/images/field/dwc-modular-tricopter.jpg",
    alt: "Modular tricopter prototype built from three linked rotor pods, on the test floor during the Dubai World Challenge",
    caption: "MODULAR TRICOPTER — FLIGHT TEST RIG",
    location: "DUBAI WORLD CHALLENGE · 2021",
  },
  {
    src: "/images/awards/rta-2021/delivery-octarotor-top.jpg",
    alt: "Top-down view of the delivery octarotor drone with eight rotors arranged around a central payload bay",
    caption: "DELIVERY OCTAROTOR — TOP VIEW",
    location: "RTA DUBAI WORLD CHALLENGE · 2021",
  },
  {
    src: "/images/awards/rta-2021/rta-team-test-venue.jpg",
    alt: "NYUAD team members with the delivery drone at the RTA competition test venue in Dubai",
    caption: "TEAM & DRONE — RTA TEST VENUE",
    location: "RTA DUBAI WORLD CHALLENGE · 2021",
  },
  {
    src: "/images/awards/rta-2021/rta-test-venue.jpg",
    alt: "Delivery drone on the RTA self-driving transport challenge test floor in Dubai",
    caption: "FLIGHT TEST — RTA CHALLENGE VENUE",
    location: "RTA DUBAI WORLD CHALLENGE · 2021",
  },
  {
    src: "/images/field/cair-fleet-lineup.jpg",
    alt: "CAIR robot fleet lined up along a lab corridor: multirotor drones on the floor flanked by quadruped robots and equipment racks",
    caption: "FLEET LINEUP — DRONES & QUADRUPEDS",
    location: "CAIR · NYUAD · 2023",
  },
  {
    src: "/images/field/expo-humanoid-demo.jpg",
    alt: "Unitree humanoid robot mid-motion on an exhibition stage, surrounded by a fleet of quadruped robots under stage lighting",
    caption: "HUMANOID DEMO — FLEET ON STAGE",
    location: "EXHIBITION FLOOR · ABU DHABI · 2024",
  },
  {
    src: "/images/field/global-rail-humanoid.jpg",
    alt: "Humanoid robot standing beside a researcher in front of the Global Rail Innovation Hub backdrop",
    caption: "H1 AT THE INNOVATION HUB",
    location: "GLOBAL RAIL · 2025",
  },
  {
    src: "/images/field/etihad-rail-booth-spots.jpg",
    alt: "Three Spot quadruped robots and the NYUAD team presenting rail robotics at the Etihad Rail booth",
    caption: "SPOT FLEET — RAIL ROBOTICS BOOTH",
    location: "ETIHAD RAIL × NYUAD",
  },
];

/**
 * Photos gallery for the homepage Field Log: every archive image from work
 * and laboratory records, plus standalone field shots not already covered.
 * Each project/laboratory photo carries its description and a link to the case file.
 */
export function getFieldPhotos(): FieldPhoto[] {
  const photos: FieldPhoto[] = [];
  const seen = new Set<string>();

  for (const record of workRecords) {
    for (const image of record.images ?? []) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      photos.push({
        src: image.src,
        alt: image.alt,
        caption: image.caption,
        description: image.alt,
        location: [record.org, record.period.label].filter(Boolean).join(" · "),
        orientation: image.orientation,
        project: {
          title: record.title,
          href: `/projects/${record.slug}`,
        },
      });
    }
  }

  for (const record of infrastructureRecords) {
    for (const image of record.images ?? []) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      photos.push({
        src: image.src,
        alt: image.alt,
        caption: image.caption,
        description: image.alt,
        location: [record.org, record.period.label].filter(Boolean).join(" · "),
        orientation: image.orientation,
        project: {
          title: record.title,
          href: `/laboratories/${record.slug}`,
        },
      });
    }
  }

  for (const photo of standaloneFieldPhotos) {
    if (seen.has(photo.src)) continue;
    seen.add(photo.src);
    photos.push({
      ...photo,
      description: photo.description ?? photo.alt,
    });
  }

  return photos;
}
