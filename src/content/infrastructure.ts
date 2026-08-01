import type { InfrastructureRecord } from "@/lib/types";

export const infrastructureRecords: InfrastructureRecord[] = [
  {
    type: "infrastructure",
    slug: "kinesis-ctp-laboratory",
    title: "Kinesis Core Technology Platform Laboratory",
    org: "NYU Abu Dhabi · Core Technology Platforms",
    period: { startYear: 2018, endYear: 2025, label: "2018–2025" },
    challenge:
      "NYU Abu Dhabi lacked a shared, reconfigurable robotics arena where drones, arms, motion capture, and immersive systems could be tested under one roof.",
    summary:
      "Led the end-to-end creation of Kinesis, NYU Abu Dhabi's shared robotics and motion research platform — from user requirements and multidisciplinary design through procurement, construction supervision, hands-on systems integration, commissioning, and operation. A 17 × 6.4 × 8 m reconfigurable arena of adaptable trusses and safety nets, paired with a researcher workspace, built to serve drones, industrial robots, motion capture, AI, and immersive-systems research across the university.",
    contributionSummary:
      "Conceived, designed, procured, commissioned, and operated Kinesis as a shared university research platform — owning requirements, facility design, systems integration, and ongoing institutional demonstrations.",
    outcomeSummary:
      "Delivered and operated Kinesis — a 17 × 6.4 × 8 m netted arena and researcher workspace reported 100% operational by May 2019.",
    highlights: [
      "Owned the full delivery chain: gathered faculty and user requirements, produced truss, electrical, network, furniture, and safety designs, directed procurement, supervised installations, and personally integrated networking, automated lighting, sound, and compute — reported 100% operational by May 2019.",
      "Arena engineered for reconfigurable motion experiments: Vicon motion-capture tracking, color- and intensity-controllable lighting, removable protective flooring, 2 kW sound and projection, and high-speed wired and wireless networking.",
      "Workspace for eight researchers with GPU compute for simulation and machine learning, a dedicated safe LiPo charging station, and an equipment ecosystem spanning Vicon V16 cameras, a KUKA LBR iiwa collaborative arm, Aerotech stages, VR gear, and custom UAV platforms.",
      "Became an institutional showcase: hosted external delegations, NYUAD media productions, the \"Dreamers Who Do\" filming for the UAE Pavilion at Expo 2020, and Vice Chancellor's Office demonstrations still running in 2025.",
    ],
    domains: ["lab-automation-instrumentation"],
    contributions: [
      "conceived",
      "designed",
      "commissioned",
      "operated",
      "system-integration",
    ],
    inventory: [
      "vicon-motion-capture",
      "kuka-lbr-iiwa",
      "uav-platform",
      "boston-dynamics-spot",
      "ugv-platform",
    ],
    evidence: [
      {
        type: "institutional-page",
        title: "Official Kinesis CTP page",
        url: "https://nyuad.nyu.edu/en/research/facilities-and-support/core-technology-platforms/kinesis.html",
      },
      {
        type: "photograph",
        title: "CAIR fleet in Kinesis arena",
        note: "Platform inventory photography",
      },
    ],
    images: [
      {
        src: "/images/projects/kinesis-cair-fleet.jpg",
        alt: "Full CAIR robot fleet staged in the Kinesis CTP arena — humanoids, Spot and other quadrupeds, multirotor drones, marine craft, and ground robots under motion-capture trusses and safety nets",
        caption: "CAIR FLEET — PLATFORMS WORKED ON OR SUPPORTED",
      },
      {
        src: "/images/projects/kinesis-arena.jpg",
        alt: "The Kinesis arena enclosed by truss structures and safety nets, with a fleet of drones, a Spot quadruped, ground robots, and a KUKA arm arranged on the floor",
        caption: "KINESIS ARENA — ROBOT FLEET ON DECK",
      },
      {
        src: "/images/projects/kinesis-workspace.jpg",
        alt: "The Kinesis workspace with researchers at workstations beneath equipment shelving, and two KUKA collaborative arms on turntables in the foreground",
        caption: "WORKSPACE — KUKA ARMS & RESEARCH BAYS",
      },
    ],
    link: {
      label: "Official lab page",
      href: "https://nyuad.nyu.edu/en/research/facilities-and-support/core-technology-platforms/kinesis.html",
    },
    status: "published",
  },
  {
    type: "infrastructure",
    slug: "photonics-ctp-laboratory",
    title: "Photonics Core Technology Platform Laboratory",
    org: "NYU Abu Dhabi · Core Technology Platforms",
    period: { startYear: 2017, endYear: 2024, label: "2017–2024" },
    challenge:
      "High-speed optical and RF research required an integrated characterization facility from faculty concept through sustained shared operation.",
    summary:
      "Helped establish NYU Abu Dhabi's Photonics Core Technology Platform from faculty concept to sustained shared operation — translating high-speed optical and RF research requirements into an integrated characterization facility spanning tunable lasers, BER testing, arbitrary waveform generation, coherent and vector signal analysis, lightwave component analysis to 67 GHz, microscopy, and polarization and spectral measurement, then stewarding its procurement, commissioning, expansion, and lifecycle.",
    contributionSummary:
      "Co-developed the equipment architecture, commissioned the characterization facility, and stewarded seven years of operation, expansion, and research enablement — acknowledged across multiple photonics publications.",
    outcomeSummary:
      "Commissioned and stewarded seven years of photonics CTP operation, explicitly acknowledged across six peer-reviewed papers (2021–2024).",
    highlights: [
      "Developed the equipment architecture with Prof. Mahmoud Rasras: model-level capital plans and staged priority scenarios for a photonics/RF option set evaluated at ~AED 12.77M, backed by vendor benchmarking visits to research laboratories in France and Germany.",
      "Coordinated installation and commissioning end to end — optical tables and Leica M205A microscopy, UPS-backed power, networked TCP/IP instrument control, Keysight BERT/AWG vendor training, Lightwave Component Analyzer calibration, and VSA software integration.",
      "Managed lifecycle stewardship across seven years: troubleshooting, calibration, instrument restoration, laser safety and EHS responsibility, access governance, and a 2022–2023 expansion adding three optical tables — sequenced around critical PhD-defense measurements and praised by faculty as \"meticulous and thorough\".",
      "Explicitly named in the acknowledgements of at least six peer-reviewed photonics journal papers (2021–2024) from Prof. Rasras’s group — Optics Express, Journal of Lightwave Technology, Advanced Photonics Research, and npj 2D Materials and Applications — for optical testing, instrumentation support, technical discussions, and experimental characterization in the Photonics Lab.",
      "Broader research enablement: CTP characterization acknowledged in a 2019 Journal of Applied Physics paper, capstone projects faculty said \"could not have been completed\" without CTP support, and demonstrations for the NYUAD Provost and the UAE Space Agency.",
    ],
    domains: ["telecommunications-edge-computing"],
    contributions: [
      "designed",
      "commissioned",
      "operated",
      "supported",
      "system-integration",
    ],
    evidence: [
      {
        type: "publication",
        target: { type: "research-output", slug: "oe-2021-plasmonics-puf" },
        note: "Acknowledged for optical testing support",
      },
      {
        type: "publication",
        target: { type: "research-output", slug: "oe-2021-swir-gagete" },
      },
      {
        type: "publication",
        target: { type: "research-output", slug: "oe-2022-mmi-diplexer" },
      },
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "adpr-2023-inse-photodetector",
        },
      },
      {
        type: "publication",
        target: { type: "research-output", slug: "jlt-2023-swg-multiplexer" },
      },
      {
        type: "publication",
        target: { type: "research-output", slug: "npj-2024-inse-trimming" },
      },
      {
        type: "institutional-page",
        title: "Photonics Research Lab page",
        url: "https://nyuad.nyu.edu/en/research/faculty-labs-and-projects/photonics-research-lab.html",
      },
    ],
    images: [
      {
        src: "/images/projects/photonics-optical-bench.jpg",
        alt: "Photonics characterization bench with Thorlabs amplifiers, Keysight instruments, Leica microscope, and dense fiber cabling on a Newport optical table",
        caption: "OPTICAL BENCH — MICROSCOPY & FIBER SETUP",
      },
      {
        src: "/images/projects/photonics-high-speed-bench.jpg",
        alt: "High-speed photonics test stack with Keysight arbitrary waveform generators, Infiniium oscilloscopes showing eye diagrams, and fiber and RF cabling on an optical breadboard",
        caption: "HIGH-SPEED BENCH — AWG & EYE DIAGRAM",
      },
    ],
    relatedPapersLabel: "contribution",
    link: {
      label: "Photonics Research Lab page",
      href: "https://nyuad.nyu.edu/en/research/faculty-labs-and-projects/photonics-research-lab.html",
    },
    status: "published",
  },
  {
    type: "infrastructure",
    slug: "nyuad-hts-platform",
    title: "High-Throughput Screening Platform",
    org: "NYU Abu Dhabi · CGSB × Core Technology Platforms",
    period: { startYear: 2013, endYear: 2025, label: "2013–2025" },
    challenge:
      "Large-scale chemical and functional genomics screening needed dependable robotic automation beyond a static instrument stack.",
    summary:
      "Automated high-throughput screening platform developed through a partnership between the Center for Genomics and Systems Biology’s Chemical and Functional Genomics Lab and NYU Abu Dhabi Core Technology Platforms — integrating robotic liquid handling, incubation, imaging, plate handling, and data acquisition so researchers can run large-scale assays across chemical genomics, functional genomics, bioactive discovery, toxicity, cell biology, and whole-organism screening.",
    contributionSummary:
      "Owned the automation and systems-engineering layer for the HTS platform within Core Technology Platforms — Thermo Fisher Momentum workflow programming, FANUC robot configuration, instrument synchronization, fault recovery, vendor coordination, and long-term lifecycle stewardship so scientific workflows stayed reliable in shared use.",
    outcomeSummary:
      "Kept the joint CGSB × CTP high-throughput screening platform available through Momentum workflows, FANUC integration, and long-term lifecycle stewardship.",
    highlights: [
      "Built as a joint research system: the Chemical and Functional Genomics Lab defined biological screening objectives and assay workflows, while CTP delivered the robotics, automation, instrumentation, and lifecycle-engineering layer that made those workflows dependable shared infrastructure.",
      "Scientific applications spanned mammalian cells and whole organisms (microbes, worms, zebrafish) — small-molecule and drug-library screening, RNAi and CRISPR functional genomics, high-content cellular imaging, phenotypic profiling, anthelmintic and antimicrobial discovery, toxicity analysis, and natural-product screening.",
      "Day-to-day collaboration with Dr. Hala Fahs connected laboratory experimental requirements to automated processes — coordinating platform operation, CellInsight high-content imaging support, fault diagnosis, repairs and preventive maintenance, spare parts, and Thermo Fisher engineer engagement for upgrades, calibration, and recommissioning.",
      "Engineering scope covered robotic-system integration, Momentum workflow programming, FANUC configuration, instrument synchronization, new-equipment integration, troubleshooting, user training, and lifecycle management — keeping the platform available for ongoing research rather than treating it as a static instrument stack.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Automation & systems engineering",
        org: "NYU Abu Dhabi · Core Technology Platforms",
      },
      {
        name: "Kristin Gunsalus",
        role: "Scientific leadership",
        org: "NYU Abu Dhabi · Chemical and Functional Genomics Lab",
      },
      {
        name: "Fabio Piano",
        role: "Scientific co-leadership",
        org: "NYU Abu Dhabi · Chemical and Functional Genomics Lab",
      },
      {
        name: "Hala Fahs",
        role: "Principal scientific & operational collaborator",
        org: "NYU Abu Dhabi · Chemical Genomics program",
      },
      {
        name: "Chemical and Functional Genomics Lab",
        role: "Scientific ownership & research direction",
        org: "Center for Genomics and Systems Biology",
      },
      {
        name: "Core Technology Platforms",
        role: "Engineering & infrastructure organization",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Thermo Fisher Scientific",
        role: "Primary technology partner",
      },
    ],
    domains: ["lab-automation-instrumentation", "genomics"],
    contributions: ["operated", "supported", "system-integration"],
    inventory: ["hts-robot", "labview"],
    evidence: [
      {
        type: "video",
        title: "NYUAD High-throughput Screening Platform",
        url: "https://www.youtube.com/watch?v=6SRC2zhe1zo",
      },
    ],
    video: {
      provider: "youtube",
      id: "6SRC2zhe1zo",
      title: "NYUAD High-throughput Screening Platform",
    },
    images: [
      {
        src: "/images/projects/hts-rail.jpg",
        alt: "Plate-handling rail robot inside the NYUAD high-throughput screening enclosure, flanked by instrument stacks",
        caption: "PLATE-HANDLING RAIL ROBOT — HTS ENCLOSURE",
      },
      {
        src: "/images/projects/hts-rail-hotels.jpg",
        alt: "Rail-mounted plate-handling robot between microplate hotels and Agilent instruments inside the HTS enclosure",
        caption: "RAIL ROBOT — PLATE HOTELS & INSTRUMENTS",
      },
      {
        src: "/images/projects/hts-cytomat-enclosure.jpg",
        alt: "Thermo Scientific Cytomat automated incubator cabinets beneath the glass-fronted HTS robotic enclosure",
        caption: "THERMO CYTOMAT — INCUBATOR UNDER ENCLOSURE",
      },
      {
        src: "/images/projects/hts-lab-overview.jpg",
        alt: "Wide view of the HTS robotic enclosure beside the multi-monitor operator control station",
        caption: "HTS CELL — ENCLOSURE & CONTROL STATION",
      },
      {
        src: "/images/projects/hts-control-station.jpg",
        alt: "HTS control desk with four monitors, overhead camera-feed display, server rack, and emergency stop",
        caption: "OPERATOR DESK — MONITORS & E-STOP",
      },
      {
        src: "/images/projects/hts-bravo-liquid-handler.jpg",
        alt: "Agilent Bravo automated liquid handler with a 96-channel ST head over the microplate deck",
        caption: "AGILENT BRAVO — 96ST LIQUID HANDLER",
      },
      {
        src: "/images/projects/hts-pipette-tips.jpg",
        alt: "Underside close-up of a multi-channel liquid-handling head with a dense array of pipette tips",
        caption: "PIPETTE HEAD — MULTI-CHANNEL TIP ARRAY",
      },
      {
        src: "/images/projects/hts-microplate-labeler.jpg",
        alt: "Agilent Microplate Labeler with cab a2+ printer, Foscam camera, and plate stacker on the HTS bench",
        caption: "MICROPLATE LABELER — CAB A2+ & STACKER",
      },
    ],
    imagesOnIndex: false,
    status: "published",
  },
];
