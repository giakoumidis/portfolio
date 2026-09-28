/**
 * Outreach — substantiated industry engagement, and society sessions.
 * The industry list is a working inventory of correspondence and activity,
 * with proposals and visits kept distinct from field work.
 * `resources` ties an entry to the project or laboratory that holds the
 * technical record. Homepage cards, case files, laboratory hubs, and search
 * read from this file.
 */

import { infrastructureRecords } from "@/content/infrastructure";
import { workRecords } from "@/content/work";

export type OutreachAudience = "industry" | "society";

export type OutreachBand = "selected" | "showcase" | "record";

export type OutreachForm =
  | "pilot"
  | "workshop"
  | "demonstration"
  | "exhibition"
  | "laboratory visit"
  | "competition"
  | "interactive session"
  | "proposal"
  | "coordination";

export type OutreachImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type OutreachLink = {
  href: string;
  label: string;
  /** Opens in a new tab. Use for sources outside this site. */
  external?: boolean;
};

/** Project or laboratory that holds the technical record for an engagement. */
export type OutreachResource = {
  type: "project" | "laboratory";
  slug: string;
  /** Short label on the outreach card. Defaults to the record title. */
  label?: string;
};

export type OutreachLogoSurface = "light" | "dark";

export type OutreachEntry = {
  id: string;
  title: string;
  audience: OutreachAudience;
  /** Selected collaborations, public showcases, or the further record. */
  band: OutreachBand;
  year: string;
  form: OutreachForm;
  /** Short status shown on the card or row. */
  standing: string;
  summary: string;
  /** Official organisation mark, when one could be verified. */
  logo?: string;
  /** White marks sit on a dark plate. Defaults to a light plate. */
  logoSurface?: OutreachLogoSurface;
  /** Case files and laboratory hubs connected to this engagement. */
  resources?: OutreachResource[];
  /** Extra links that are not a project or laboratory record. */
  links?: OutreachLink[];
  /** Thumbnail on compact cards. */
  image?: OutreachImage;
  /** Full set when the record has more than the thumbnail. */
  images?: OutreachImage[];
};

export const outreachIntro =
  "A record of robotics and AI carried outside the laboratory: to industry partners, and to students and the public. Industry entries are limited to activity I can substantiate.";

export const industryIntro =
  "To build technology that matters, I need to understand the world in which it will be used. I spend time with industry and government partners at their sites, in workshops, and in the laboratory, learning about their operations, constraints, and unmet needs. I then connect what I learn with researchers and engineering teams, so that questions, prototypes, and collaborations stay grounded in real applications. This exchange also informs my own work in physical AI and robotics. My aim is to help ideas move from research into use, and to bring what we learn in the field back to the university, strengthening the connection between academia and industry in Abu Dhabi.";

export const industryRecordNote =
  "Selected collaborations are the clearest technical contributions. Proposals and visits are labeled as such.";

export const societyIntro =
  "This work sat outside my formal responsibilities. I take it on as a duty to society: to bring awareness of robotics and AI beyond the laboratory, and to inspire the next generation so younger people can meet these technologies and picture themselves building with them.";

export const outreachAudiences = [
  {
    id: "industry" as const,
    title: "Industry",
    purpose:
      "Field work, demonstrations, proposals, and visits with companies and public operators.",
  },
  {
    id: "society" as const,
    title: "Society",
    purpose:
      "Workshops, competitions, demonstrations, and interactive sessions with students and the public.",
  },
] as const;

export const outreachEntries: OutreachEntry[] = [
  {
    id: "abu-dhabi-airports",
    title: "Abu Dhabi Airports",
    logo: "/images/logos/abu-dhabi-airports.png",
    audience: "industry",
    band: "selected",
    year: "2019–2020",
    form: "pilot",
    standing: "Field work",
    summary:
      "Supported an aerial-robotics collaboration on airport inspection, including an exhibition showcase and a laboratory demonstration for airport leadership.",
    image: {
      src: "/images/projects/adac-inspection-drone-exhibit.jpg",
      alt: "Inspection drone on display at an exhibition booth with NYU Abu Dhabi and Abu Dhabi Airports branding",
    },
    resources: [
      {
        type: "project",
        slug: "nyuad-adac-airport-inspection-drone",
        label: "Airport inspection drone",
      },
    ],
  },
  {
    id: "alec",
    title: "ALEC",
    audience: "industry",
    band: "selected",
    year: "2021–2023",
    form: "demonstration",
    standing: "Site demonstrations",
    summary:
      "Supported construction-site robotics with ALEC, including progress monitoring at SeaWorld Abu Dhabi, an innovation showcase, and later site scanning.",
    logo: "/images/logos/alec.svg",
    resources: [
      {
        type: "project",
        slug: "multiagent-construction-exploration",
        label: "Construction exploration",
      },
    ],
    image: {
      src: "/images/projects/multiagent-seaworld-team.jpg",
      alt: "Field team with quadruped and wheeled robots at the SeaWorld Abu Dhabi construction site",
    },
  },
  {
    id: "hilti",
    title: "Hilti",
    audience: "industry",
    band: "selected",
    year: "2022–2023",
    form: "demonstration",
    standing: "Leadership demonstration",
    summary:
      "With Borja García de Soto’s S.M.A.R.T. Construction Research Group, demonstrated Boston Dynamics Spot to Hilti Energy & Industry leadership at Hilti Emirates in Dubai during the April 2022 Global E&I Summit. The briefing showed how autonomous agile robots can support asset monitoring, construction monitoring, and digital-twin updates. Later supported the team’s mapping experiments.",
    logo: "/images/logos/hilti.svg",
    links: [
      {
        href: "https://www.linkedin.com/posts/nikolaos-giakoumidis_dubai-activity-6919222227615772672-inl2",
        label: "Demonstration account",
        external: true,
      },
    ],
    image: {
      src: "/images/outreach/hilti-leadership-dubai.jpg",
      alt: "Boston Dynamics Spot demonstrated on a test slab at Hilti Emirates in Dubai, with Hilti Energy and Industry leadership watching",
      caption: "Leadership demonstration · Hilti Emirates, Dubai · April 2022",
    },
  },
  {
    id: "etihad-rail",
    title: "Etihad Rail",
    audience: "industry",
    band: "selected",
    year: "2024–2025",
    form: "pilot",
    standing: "Field trials",
    summary:
      "Worked with Etihad Rail on locomotive sensing and depot trials of robotic inspection, and continued the relationship the following year.",
    logo: "/images/logos/etihad-rail.png",
    image: {
      src: "/images/projects/etihad-rail-locomotion-rails.jpg",
      alt: "Boston Dynamics Spot on the rails during locomotion testing at an Etihad Rail depot",
    },
    resources: [
      {
        type: "project",
        slug: "etihad-rail-nyuad-collaboration",
        label: "Depot trials",
      },
      {
        type: "project",
        slug: "etihad-rail-desert-environment-monitoring",
        label: "Corridor sensing",
      },
    ],
  },
  {
    id: "ad-ports",
    title: "AD Ports",
    audience: "industry",
    band: "selected",
    year: "2023–2026",
    form: "proposal",
    standing: "Proposals and visits",
    summary:
      "Worked with AD Ports on port and logistics robotics, including an autonomous-forklift proposal and a spreader concept with CycloTech. A later workshop was not taken forward.",
    logo: "/images/logos/ad-ports.svg",
  },
  {
    id: "total-metis",
    title: "TOTAL",
    audience: "industry",
    band: "selected",
    year: "2019–2020",
    form: "coordination",
    standing: "Collaboration setup",
    summary:
      "Set up technical collaboration on the METIS drone project with TOTAL and ADNOC.",
    logo: "/images/logos/total.svg",
  },
  {
    id: "kent",
    title: "Kent",
    audience: "industry",
    band: "selected",
    year: "2025",
    form: "laboratory visit",
    standing: "Research visit",
    summary: "Hosted Kent for research presentations and a collaboration discussion.",
    logo: "/images/logos/kent.png",
  },
  {
    id: "analog",
    title: "Analog",
    logo: "/images/logos/analog.png",
    audience: "industry",
    band: "selected",
    year: "2026",
    form: "proposal",
    standing: "Technical meeting",
    summary:
      "Met Analog to discuss joint research and internship collaboration.",
  },
  {
    id: "rox-motor",
    title: "ROX Motor",
    audience: "industry",
    band: "selected",
    year: "2026",
    form: "laboratory visit",
    standing: "Research visit",
    summary:
      "Hosted ROX Motor, demonstrated research, and continued discussions on smart mobility and automation.",
    logo: "/images/logos/rox.svg",
  },
  {
    id: "rta-dubai-world-challenge",
    title: "RTA Dubai World Challenge",
    audience: "industry",
    band: "showcase",
    year: "2021",
    form: "competition",
    standing: "First prize",
    summary:
      "Designed and integrated the mechatronics of the NYUAD delivery drone for the RTA Dubai World Challenge. The team won First Prize.",
    logo: "/images/logos/rta.png",
    image: {
      src: "/images/awards/rta-2021/rta-test-venue.jpg",
      alt: "Delivery drone on the test floor at the RTA Dubai World Challenge",
    },
    resources: [
      {
        type: "project",
        slug: "rta-dubai-delivery-drone",
        label: "Delivery drone",
      },
    ],
  },
  {
    id: "global-rail",
    title: "Global Rail",
    logo: "/images/logos/global-rail.png",
    audience: "industry",
    band: "showcase",
    year: "2024–2025",
    form: "exhibition",
    standing: "Briefing and demonstrations",
    summary:
      "At Global Rail, 8–10 October 2024, ADNEC Abu Dhabi, briefed His Highness Sheikh Theyab bin Mohamed bin Zayed Al Nahyan, Chairman of Etihad Rail, on how robotics and AI can support infrastructure monitoring, safer operations, and less downtime through predictive maintenance. Robot demonstrations at the exhibition continued in 2025, alongside the Etihad Rail engagement.",
    resources: [
      {
        type: "project",
        slug: "etihad-rail-nyuad-collaboration",
        label: "Etihad Rail collaboration",
      },
    ],
    links: [
      {
        href: "https://www.mediaoffice.abudhabi/en/transport/theyab-bin-mohamed-bin-zayed-inaugurates-first-global-rail-transport-infrastructure-exhibition-and-conference/",
        label: "Global Rail 2024 opening",
        external: true,
      },
    ],
    image: {
      src: "/images/outreach/global-rail-2024-briefing.jpg",
      alt: "Global Rail 2024 exhibition floor at ADNEC Abu Dhabi, with Boston Dynamics Spot robots and a yellow manipulator in front of the NYU Abu Dhabi CAIR booth during a briefing",
      caption: "Briefing · Global Rail 2024",
    },
    images: [
      {
        src: "/images/outreach/global-rail-2024-briefing.jpg",
        alt: "Global Rail 2024 exhibition floor at ADNEC Abu Dhabi, with Boston Dynamics Spot robots and a yellow manipulator in front of the NYU Abu Dhabi CAIR booth during a briefing",
        caption: "Briefing · Global Rail 2024",
      },
    ],
  },
  {
    id: "make-it-in-the-emirates",
    title: "Make it in the Emirates",
    audience: "industry",
    band: "showcase",
    year: "May 2025",
    form: "exhibition",
    standing: "Team coordination",
    summary: "Coordinated NYUAD participation at Make it in the Emirates.",
    logo: "/images/logos/miite.png",
    logoSurface: "dark",
  },
  {
    id: "adipec-2025",
    title: "ADIPEC",
    logo: "/images/logos/adipec.png",
    audience: "industry",
    band: "showcase",
    year: "2025",
    form: "exhibition",
    standing: "Booth coordination",
    summary: "Coordinated the ADIPEC booth.",
  },
  {
    id: "driftx-2025",
    title: "DRIFTx",
    logo: "/images/logos/driftx.png",
    audience: "industry",
    band: "showcase",
    year: "November 2025",
    form: "exhibition",
    standing: "Showcase preparation",
    summary: "Prepared the robotics showcase for DRIFTx.",
  },
  {
    id: "vpixx",
    title: "VPixx Technologies",
    audience: "industry",
    band: "record",
    year: "2017",
    form: "laboratory visit",
    standing: "Visit",
    summary: "Hosted the team and discussed a possible technical collaboration.",
    logo: "/images/logos/vpixx.png",
    logoSurface: "dark",
  },
  {
    id: "keysight",
    title: "Keysight Technologies",
    logo: "/images/logos/keysight.png",
    audience: "industry",
    band: "record",
    year: "January 2018",
    form: "laboratory visit",
    standing: "Visit",
    summary:
      "Visited the Böblingen centre to discuss equipment for the optoelectronics laboratory.",
    resources: [
      {
        type: "laboratory",
        slug: "photonics-ctp-laboratory",
        label: "Photonics laboratory",
      },
    ],
  },
  {
    id: "tektronix-finisar",
    title: "Tektronix / Finisar",
    audience: "industry",
    band: "record",
    year: "January 2018",
    form: "coordination",
    standing: "Coordination",
    summary:
      "Coordinated a technical visit covering instrument demonstrations and optical-receiver research in Berlin.",
    logo: "/images/logos/tektronix.svg",
  },
  {
    id: "adnoc-visit",
    title: "ADNOC",
    audience: "industry",
    band: "record",
    year: "January 2020",
    form: "coordination",
    standing: "Coordination",
    summary: "Supported a campus visit by ADNOC leadership.",
    logo: "/images/logos/adnoc.png",
  },
  {
    id: "exxonmobil",
    title: "ExxonMobil",
    audience: "industry",
    band: "record",
    year: "January 2020",
    form: "laboratory visit",
    standing: "Visit",
    summary: "Coordinated a visit to the drone laboratory.",
    logo: "/images/logos/exxonmobil.svg",
  },
  {
    id: "dubai-future-foundation",
    title: "Dubai Future Foundation",
    logo: "/images/logos/dubai-future-foundation.png",
    audience: "industry",
    band: "record",
    year: "January 2020",
    form: "coordination",
    standing: "Coordination",
    summary: "Took part in visit coordination.",
  },
  {
    id: "dewa",
    title: "DEWA",
    logo: "/images/logos/dewa.png",
    audience: "industry",
    band: "record",
    year: "2021–2022 · 2024",
    form: "coordination",
    standing: "Coordination",
    summary:
      "Shared a technical presentation and supported a later visit to Kinesis.",
  },
  {
    id: "civil-defence-academy",
    title: "Civil Defence Academy",
    logo: "/images/logos/civil-defence.png",
    audience: "industry",
    band: "record",
    year: "March 2022",
    form: "coordination",
    standing: "Coordination",
    summary: "Planned a visit and a meeting.",
  },
  {
    id: "adq",
    title: "ADQ",
    audience: "industry",
    band: "record",
    year: "June 2022",
    form: "coordination",
    standing: "Coordination",
    summary: "Offered laboratory demonstrations for an exploratory visit.",
    logo: "/images/logos/adq.svg",
    logoSurface: "dark",
  },
  {
    id: "aldar",
    title: "ALDAR",
    logo: "/images/logos/aldar.png",
    audience: "industry",
    band: "record",
    year: "October 2022",
    form: "coordination",
    standing: "Coordination",
    summary: "Joined preparations for a laboratory visit.",
  },
  {
    id: "tii",
    title: "Technology Innovation Institute",
    audience: "industry",
    band: "record",
    year: "2022–2023",
    form: "laboratory visit",
    standing: "Visit",
    summary: "Hosted several visits and gave a laboratory overview.",
    logo: "/images/logos/tii.svg",
  },
  {
    id: "boeing",
    title: "Boeing",
    audience: "industry",
    band: "record",
    year: "September 2023",
    form: "laboratory visit",
    standing: "Visit",
    summary: "Hosted Boeing at Kinesis for a discussion on robotics.",
    logo: "/images/logos/boeing.svg",
  },
  {
    id: "sdf",
    title: "SDF",
    logo: "/images/logos/sdf.png",
    audience: "industry",
    band: "record",
    year: "October 2024",
    form: "demonstration",
    standing: "Showcase preparation",
    summary: "Prepared a robotics showcase for a donor visit.",
  },
  {
    id: "dubai-police",
    title: "Dubai Police",
    logo: "/images/logos/dubai-police.png",
    audience: "industry",
    band: "record",
    year: "2024–2025",
    form: "coordination",
    standing: "Coordination",
    summary: "Coordinated a research visit on drones and marine rescue.",
  },
  {
    id: "rta-collaboration-meeting",
    title: "RTA",
    audience: "industry",
    band: "record",
    year: "December 2024",
    form: "coordination",
    standing: "Coordination",
    summary: "Supported planning for a collaboration meeting and a laboratory tour.",
    logo: "/images/logos/rta.png",
  },
  {
    id: "tenstorrent",
    title: "Tenstorrent",
    audience: "industry",
    band: "record",
    year: "April 2025",
    form: "coordination",
    standing: "Coordination",
    summary: "Exchanged technical material on a possible collaboration.",
    logo: "/images/logos/tenstorrent.png",
  },
  {
    id: "mgx",
    title: "MGX",
    audience: "industry",
    band: "record",
    year: "June 2025",
    form: "laboratory visit",
    standing: "Visit",
    summary: "Supported a campus visit with CAIR.",
    logo: "/images/logos/mgx.svg",
    logoSurface: "dark",
  },
  {
    id: "gcaa",
    title: "GCAA",
    audience: "industry",
    band: "record",
    year: "2025–2026",
    form: "coordination",
    standing: "Coordination",
    summary: "Discussed research collaboration and testing airspace.",
    logo: "/images/logos/gcaa.svg",
  },
  {
    id: "tamkeen",
    title: "Tamkeen",
    logo: "/images/logos/tamkeen.png",
    audience: "industry",
    band: "record",
    year: "2025–2026",
    form: "coordination",
    standing: "Coordination",
    summary: "Prepared research presentations for strategic-partnership contacts.",
  },
  {
    id: "rina",
    title: "RINA",
    audience: "industry",
    band: "record",
    year: "2025–2026",
    form: "laboratory visit",
    standing: "Visit",
    summary: "Coordinated laboratory visits and follow-up discussions.",
    logo: "/images/logos/rina.svg",
  },
  {
    id: "kezad",
    title: "KEZAD",
    audience: "industry",
    band: "record",
    year: "2025–2026",
    form: "proposal",
    standing: "Proposal",
    summary: "Proposed demonstrations for industrial monitoring at KEZAD.",
    logo: "/images/logos/kezad.png",
  },
  {
    id: "tadweer",
    title: "Tadweer",
    audience: "industry",
    band: "record",
    year: "January–February 2026",
    form: "proposal",
    standing: "Proposal",
    summary:
      "Submitted a proposal for autonomous waste collection. It was not selected.",
    logo: "/images/logos/tadweer.svg",
  },
  {
    id: "adia-lab",
    title: "ADIA Lab",
    logo: "/images/logos/adia-lab.png",
    audience: "industry",
    band: "record",
    year: "May 2026",
    form: "proposal",
    standing: "Proposal",
    summary: "Prepared a proposal for the Digital Economy call.",
  },
  {
    id: "sanad",
    title: "Sanad",
    audience: "industry",
    band: "record",
    year: "June 2026",
    form: "coordination",
    standing: "Coordination",
    summary: "Coordinated an exploratory collaboration visit.",
    logo: "/images/logos/sanad.svg",
  },
  {
    id: "dubai-future-labs",
    title: "Dubai Future Labs",
    audience: "society",
    band: "showcase",
    year: "May 2018 · Dubai",
    form: "demonstration",
    standing: "Projects approved",
    summary:
      "Presented Dubai Future Labs projects at Area 2071, Emirates Towers, to His Highness Sheikh Mohammed bin Rashid Al Maktoum, Vice President and Prime Minister of the UAE and Ruler of Dubai, and His Highness Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum, Crown Prince of Dubai and Chairman of the Executive Council of Dubai. Their Highnesses approved the projects.",
    image: {
      src: "/images/outreach/dubai-future-labs-briefing-1.jpg",
      alt: "Drone airframes and design sketches on the briefing table at Dubai Future Labs, with cameras in front and the visiting party beyond the glass",
    },
    images: [
      {
        src: "/images/outreach/dubai-future-labs-briefing-1.jpg",
        alt: "Drone airframes and design sketches on the briefing table at Dubai Future Labs, with cameras in front and the visiting party beyond the glass",
      },
      {
        src: "/images/outreach/dubai-future-labs-briefing-2.jpg",
        alt: "A guest examines a small component above the drone hardware during the Dubai Future Labs briefing",
      },
      {
        src: "/images/outreach/dubai-future-labs-briefing-3.jpg",
        alt: "Wider view of the Dubai Future Labs briefing at Area 2071, with drone hardware on the table and the visiting party in the laboratory",
      },
      {
        src: "/images/outreach/dubai-future-labs-briefing-4.jpg",
        alt: "Briefing table at Dubai Future Labs, with drone frames, sketches, and a small component held above the hardware",
      },
    ],
    links: [
      {
        href: "https://www.protocol.dubai.ae/en/media-listing/news-events/mohammed-bin-rashid-opens-area-2071/",
        label: "Dubai Protocol",
        external: true,
      },
      {
        href: "https://gulfnews.com/uae/government/mohammad-bin-rashid-inaugurates-area-2071-1.2221957",
        label: "Gulf News",
        external: true,
      },
      {
        href: "https://www.emirates247.com/news/emirates/sheikh-mohammed-opens-area-2071-2018-05-15-1.669293",
        label: "Emirates 24|7",
        external: true,
      },
    ],
  },
];

export function getOutreachByAudience(
  audience: OutreachAudience,
): OutreachEntry[] {
  return outreachEntries.filter((entry) => entry.audience === audience);
}

const projectsBySlug = new Map(
  workRecords.map((record) => [record.slug, record]),
);
const laboratoriesBySlug = new Map(
  infrastructureRecords.map((record) => [record.slug, record]),
);

export function outreachEntryHref(
  entry: Pick<OutreachEntry, "audience" | "id">,
): string {
  return `/outreach/${entry.audience}#${entry.id}`;
}

export function getOutreachEntry(id: string): OutreachEntry | undefined {
  return outreachEntries.find((entry) => entry.id === id);
}

/** Cards, search, and archive chips. Skips a resource whose record is missing. */
export function resolveOutreachLinks(entry: OutreachEntry): OutreachLink[] {
  const resolved: OutreachLink[] = [];

  for (const resource of entry.resources ?? []) {
    if (resource.type === "project") {
      const project = projectsBySlug.get(resource.slug);
      if (!project || project.status === "draft") continue;
      resolved.push({
        href: `/projects/${project.slug}`,
        label: resource.label ?? project.title,
      });
      continue;
    }

    const laboratory = laboratoriesBySlug.get(resource.slug);
    if (!laboratory || laboratory.status === "draft") continue;
    resolved.push({
      href: `/laboratories/${laboratory.slug}`,
      label: resource.label ?? laboratory.title,
    });
  }

  for (const link of entry.links ?? []) {
    if (resolved.some((item) => item.href === link.href)) continue;
    resolved.push(link);
  }

  return resolved;
}

/** Engagements that name this project or laboratory as their technical record. */
export function getOutreachFor(
  type: OutreachResource["type"],
  slug: string,
): OutreachEntry[] {
  return outreachEntries.filter((entry) =>
    entry.resources?.some(
      (resource) => resource.type === type && resource.slug === slug,
    ),
  );
}

export function getOutreachBand(
  audience: OutreachAudience,
  band: OutreachBand,
): OutreachEntry[] {
  return outreachEntries.filter(
    (entry) => entry.audience === audience && entry.band === band,
  );
}
