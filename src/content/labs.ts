import type { Project } from "@/lib/types";

export const labs: Project[] = [
  {
    id: "kinesis-ctp-laboratory",
    title: "Kinesis Core Technology Platform Laboratory",
    domainId: "lab-automation-instrumentation",
    domainLabel: "Research Infrastructure",
    org: "NYU Abu Dhabi · Core Technology Platforms",
    period: "2018–2025",
    summary:
      "Led the end-to-end creation of Kinesis, NYU Abu Dhabi's shared robotics and motion research platform — from user requirements and multidisciplinary design through procurement, construction supervision, hands-on systems integration, commissioning, and operation. A 17 × 6.4 × 8 m reconfigurable arena of adaptable trusses and safety nets, paired with a researcher workspace, built to serve drones, industrial robots, motion capture, AI, and immersive-systems research across the university.",
    highlights: [
      "Owned the full delivery chain: gathered faculty and user requirements, produced truss, electrical, network, furniture, and safety designs, directed procurement, supervised installations, and personally integrated networking, automated lighting, sound, and compute — reported 100% operational by May 2019.",
      "Arena engineered for reconfigurable motion experiments: Vicon motion-capture tracking, color- and intensity-controllable lighting, removable protective flooring, 2 kW sound and projection, and high-speed wired and wireless networking.",
      "Workspace for eight researchers with GPU compute for simulation and machine learning, a dedicated safe LiPo charging station, and an equipment ecosystem spanning Vicon V16 cameras, a KUKA LBR iiwa collaborative arm, Aerotech stages, VR gear, and custom UAV platforms.",
      "Became an institutional showcase: hosted external delegations, NYUAD media productions, the \"Dreamers Who Do\" filming for the UAE Pavilion at Expo 2020, and Vice Chancellor's Office demonstrations still running in 2025.",
    ],
    tags: [
      "Research infrastructure",
      "Robotics laboratory",
      "Motion capture",
      "Facility design",
      "Systems integration",
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
  },
  {
    id: "photonics-ctp-laboratory",
    title: "Photonics Core Technology Platform Laboratory",
    domainId: "telecommunications-edge-computing",
    domainLabel: "Photonics & Telecommunications",
    org: "NYU Abu Dhabi · Core Technology Platforms",
    period: "2017–2024",
    summary:
      "Helped establish NYU Abu Dhabi's Photonics Core Technology Platform from faculty concept to sustained shared operation — translating high-speed optical and RF research requirements into an integrated characterization facility spanning tunable lasers, BER testing, arbitrary waveform generation, coherent and vector signal analysis, lightwave component analysis to 67 GHz, microscopy, and polarization and spectral measurement, then stewarding its procurement, commissioning, expansion, and lifecycle.",
    highlights: [
      "Developed the equipment architecture with Prof. Mahmoud Rasras: model-level capital plans and staged priority scenarios for a photonics/RF option set evaluated at ~AED 12.77M, backed by vendor benchmarking visits to research laboratories in France and Germany.",
      "Coordinated installation and commissioning end to end — optical tables and Leica M205A microscopy, UPS-backed power, networked TCP/IP instrument control, Keysight BERT/AWG vendor training, Lightwave Component Analyzer calibration, and VSA software integration.",
      "Managed lifecycle stewardship across seven years: troubleshooting, calibration, instrument restoration, laser safety and EHS responsibility, access governance, and a 2022–2023 expansion adding three optical tables — sequenced around critical PhD-defense measurements and praised by faculty as \"meticulous and thorough\".",
      "Explicitly named in the acknowledgements of at least six peer-reviewed photonics journal papers (2021–2024) from Prof. Rasras’s group — Optics Express, Journal of Lightwave Technology, Advanced Photonics Research, and npj 2D Materials and Applications — for optical testing, instrumentation support, technical discussions, and experimental characterization in the Photonics Lab.",
      "Broader research enablement: CTP characterization acknowledged in a 2019 Journal of Applied Physics paper, capstone projects faculty said \"could not have been completed\" without CTP support, and demonstrations for the NYUAD Provost and the UAE Space Agency.",
    ],
    tags: [
      "Research infrastructure",
      "Photonics laboratory",
      "Optical characterization",
      "Capital equipment planning",
      "Systems integration",
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
    relatedPapers: [
      {
        title:
          "Experimental studies of plasmonics-enhanced optical physically unclonable functions",
        venue: "Optics Express 29 (20), 32020–32030",
        year: "2021",
        link: "https://doi.org/10.1364/OE.437636",
      },
      {
        title:
          "Short-wavelength infrared (SWIR) photodetector based on multi-layer 2D GaGeTe",
        venue: "Optics Express 29 (24), 39395–39405",
        year: "2021",
        link: "https://doi.org/10.1364/OE.442845",
      },
      {
        title:
          "CMOS compatible ultra-compact MMI based wavelength diplexer with 60 Gbit/s system demonstration",
        venue: "Optics Express 30 (5), 8257–8265",
        year: "2022",
        link: "https://doi.org/10.1364/OE.452421",
      },
      {
        title:
          "High-Speed Waveguide-Integrated InSe Photodetector on SiN Photonics for Near-Infrared Applications",
        venue: "Advanced Photonics Research 4 (11), 2300162",
        year: "2023",
        link: "https://doi.org/10.1002/adpr.202300162",
      },
      {
        title:
          "Ultra-Compact Ultra-Broadband Two-Mode Transverse-Electric Based SWG Multiplexer Demonstrated at 64 Gbps",
        venue: "Journal of Lightwave Technology 41 (16), 5412–5417",
        year: "2023",
        link: "https://doi.org/10.1109/JLT.2023.3264012",
      },
      {
        title:
          "Simultaneous optical power insensitivity and non-volatile wavelength trimming using 2D In₄/₃P₂Se₆ integration in silicon photonics",
        venue: "npj 2D Materials and Applications 8, 46",
        year: "2024",
        link: "https://doi.org/10.1038/s41699-024-00481-w",
      },
    ],
    link: {
      label: "Photonics Research Lab page",
      href: "https://nyuad.nyu.edu/en/research/faculty-labs-and-projects/photonics-research-lab.html",
    },
  },
  {
    id: "nyuad-hts-platform",
    title: "High-Throughput Screening Platform",
    domainId: "lab-automation-instrumentation",
    domainLabel: "Lab Automation",
    org: "NYU Abu Dhabi · Center for Genomics and Systems Biology",
    period: "2013–2025",
    summary:
      "Automated laboratory platform for high-throughput biological screening at NYUAD CGSB — integrating robotic liquid handling, scientific instrumentation, and LabVIEW-driven workflows so researchers can run large-scale assays with consistent, reproducible throughput.",
    highlights: [
      "Supported end-to-end setup, expansion, and day-to-day operation of the NYUAD High-Throughput Screening (HTS) Platform across electronics, automation, and Core Technology Platforms roles.",
      "Worked across equipment strategy, custom instrumentation, workflow design, and repair-versus-replacement decisions for screening hardware used by faculty, researchers, and students.",
      "Tied into broader lab automation efforts spanning robotics, photonics, electronics, and advanced manufacturing laboratories at NYUAD.",
    ],
    tags: [
      "High-throughput screening",
      "Lab automation",
      "Scientific instrumentation",
      "LabVIEW",
      "Robotic liquid handling",
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
    ],
  },
];
