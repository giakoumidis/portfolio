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
      "Kinesis is NYU Abu Dhabi’s shared platform for robotics and motion research. I led its creation from faculty requirements and facility design through procurement, construction supervision, systems integration, commissioning, and operation. Its reconfigurable arena and researcher workspace bring drones, industrial arms, motion capture, and immersive systems into one experimental facility.",
    contributionSummary:
      "Led Kinesis from concept to operation, taking responsibility for facility design, procurement, construction supervision, systems integration, and commissioning.",
    outcomeSummary:
      "Delivered a 17 × 6.4 × 8 m netted arena and researcher workspace, reported fully operational by May 2019, and operated it for research and institutional demonstrations.",
    highlights: [
      "Owned the full delivery chain: gathered faculty and user requirements, produced truss, electrical, network, furniture, and safety designs, directed procurement, supervised installations, and personally integrated networking, automated lighting, sound, and compute — reported 100% operational by May 2019.",
      "Arena engineered for reconfigurable motion experiments: Vicon motion-capture tracking, color- and intensity-controllable lighting, removable protective flooring, 2 kW sound and projection, and high-speed wired and wireless networking.",
      "Workspace for eight researchers with GPU compute for simulation and machine learning, a dedicated safe LiPo charging station, and an equipment ecosystem spanning Vicon V16 cameras, a KUKA LBR iiwa collaborative arm, Aerotech stages, VR gear, and custom UAV platforms.",
      "Became an institutional showcase: hosted external delegations, NYUAD media productions, the \"Dreamers Who Do\" filming for the UAE Pavilion at Expo 2020, and Vice Chancellor's Office demonstrations still running in 2025.",
      "Supported Dr. Merritt Moore's January 2023 robot fashion show: students costumed Boston Dynamics Spot platforms in the Kinesis arena on 20 January, and the performance ran in Dubai the next day.",
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
      {
        src: "/images/projects/kinesis-research-bay.jpg",
        alt: "The Kinesis laboratory under purple truss lighting, with multirotor drones on the workbenches, researcher desks, and equipment shelves along the wall",
        caption: "KINESIS — RESEARCH WORKSPACE",
      },
      {
        src: "/images/projects/kinesis-fashion-show-wings.jpg",
        alt: "Boston Dynamics Spot in a student swan costume of white tulle and feathered wings, with an LED strip along the body, prepared in the netted Kinesis arena on 20 January 2023 for Dr. Merritt Moore's robot fashion show",
        caption: "FASHION SHOW — WINGED SPOT IN ARENA",
      },
      {
        src: "/images/projects/kinesis-fashion-show-foil.jpg",
        alt: "Boston Dynamics Spot wrapped in silver foil with whip antennas, a gold panel, and a black hood, photographed at Kinesis on 20 January 2023 ahead of Dr. Merritt Moore's robot fashion show in Dubai",
        caption: "FASHION SHOW — SILVER ANTENNA COSTUME",
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
      "An integrated optical and RF characterization facility supporting photonics research at NYU Abu Dhabi. Working with Prof. Mahmoud Rasras, I translated research requirements into equipment plans and coordinated procurement, commissioning, and expansion. The facility combines high-speed signal generation and analysis, optical testing, microscopy, and spectral and polarization measurement, with lightwave component analysis to 67 GHz.",
    contributionSummary:
      "Co-developed the equipment architecture, commissioned the facility, and managed seven years of operation and expansion supporting photonics experiments.",
    outcomeSummary:
      "Sustained a shared characterization facility over seven years, with my technical contributions explicitly acknowledged in six photonics papers from 2021 to 2024.",
    highlights: [
      "Developed the equipment architecture with Prof. Mahmoud Rasras: model-level capital plans and staged priority scenarios for a photonics/RF option set evaluated at ~AED 12.77M, backed by vendor benchmarking visits to research laboratories in France and Germany.",
      "Coordinated installation and commissioning end to end — optical tables and Leica M205A microscopy, UPS-backed power, networked TCP/IP instrument control, Keysight BERT/AWG vendor training, Lightwave Component Analyzer calibration, and VSA software integration.",
      "Designed and built an aerial bridge between the instrument rack and the main optical table during installation. Optical instruments stayed on the rack, off the table; the table was reserved for electrical equipment that had to sit close to the device under test.",
      "Built a motion stage that carries the fully equipped microscope — optics, camera, and accessories — to within a few microns, so the silicon photonics device under test could stay fixed. Electrical probes and the fiber interface took hours to attach and align; moving the chip would have broken that setup. The first version used Aerotech stages. The later version used Thorlabs stages, with a LabVIEW interface and joystick control.",
      "Worked with the full telecommunication and electronics set on this bench: lasers, optical and electrical power meters, polarizers, component analyzers, real-time and sampling oscilloscopes, arbitrary-waveform and signal generators, digitizers, a bit-error-ratio tester, optical and electrical spectrum analyzers, software-defined radio, E/O clock recovery, modulators, filters, optical and electrical amplifiers, antennas, transceivers, and a digital signal processor.",
      "Those instruments are the measurement path in the papers that credit this laboratory. Tunable Keysight lasers (81600B sources in the O and C bands, and the 8164B lightwave system), N7744A and photodiode power meters, and fiber polarizers measured insertion loss and crosstalk of the dual-band two-mode multiplexer, with TE0 held 20 dB above TM0, and the laser-power sweeps on the InPSe microring that hold the resonance when source power changes. The plasmonic optical PUFs were checked on that same path for stability under power, temperature, and transverse-magnetic polarization. High-speed transmission used the bit-error-ratio tester, modulator, and amplifiers together: a Keysight M8045A pattern generator, a Thorlabs LN05S Mach–Zehnder modulator, an SHF S807C radio-frequency amplifier, and Thorlabs optical amplifiers put a 2³¹−1 pattern on a 1550 nm laser at 40 and 64 Gbit/s, and a Keysight Infiniium DCA-X 86100D sampling oscilloscope recorded the eyes after the mode multiplexer. The 60 Gbit/s diplexer paper is the same on-chip NRZ on-off-keying test, with open eyes at 1310 and 1550 nm. The waveguide InSe photodetector used an arbitrary waveform generator and a high-speed modulator for the sinusoid and the pseudorandom pattern, an optical spectrum analyzer for waveguide loss, an electrical spectrum analyzer for the radio-frequency response (3 dB at 85 MHz), an Agilent B1505A power-device analyzer for the current–voltage curves, and a high-speed oscilloscope for eyes up to 1 Gbit/s. The GaGeTe detectors were read under 1310 nm illumination for responsivity and with intensity-modulated light for a frequency response out to 100 MHz. Digitizers and the real-time oscilloscopes captured those waveforms. E/O clock recovery, filters, software-defined radio, antennas, transceivers, and the digital signal processor were the electrical timing, conditioning, and readout on that same bench, alongside the lightwave component analyzer calibrated to 67 GHz.",
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
        src: "/images/projects/photonics-high-speed-bench.jpg",
        alt: "High-speed photonics test stack with Keysight arbitrary waveform generators, Infiniium oscilloscopes showing eye diagrams, and fiber and RF cabling on an optical breadboard",
        caption: "HIGH-SPEED BENCH — AWG & EYE DIAGRAM",
      },
      {
        src: "/images/projects/photonics-from-scratch.jpg",
        alt: "Empty photonics lab during commissioning, with stacked Keysight Technologies shipping cartons, loose cables, and a vacuum pump on the floor",
        caption: "HOW YOU BUILD FROM SCRATCH",
      },
      {
        src: "/images/projects/photonics-bench-build.jpg",
        alt: "Keysight oscilloscopes, signal generators, and RF instruments staged on a perforated bench during photonics laboratory commissioning, with open cartons behind them",
        caption: "INSTRUMENTS OUT OF THE BOX",
      },
      {
        src: "/images/projects/photonics-aerial-bridge.jpg",
        alt: "Nikolaos Giakoumidis during photonics laboratory installation, adjusting Keysight instruments in an aluminum rack topped by a Luna optical instrument, with a workstation and UPS beside the rack",
        caption: "AERIAL BRIDGE — OPTICS OFF THE TABLE",
        orientation: "portrait",
      },
      {
        src: "/images/projects/photonics-lab-online.jpg",
        alt: "Photonics laboratory taking shape, with a Newport SmartTable optical bench, stereo microscope, instrument racks, and aluminum shelving along the wall",
        caption: "ROOM BECOMES A LABORATORY",
      },
      {
        src: "/images/projects/photonics-microscope-stage.jpg",
        alt: "Leica microscope on a Newport SmartTable UT2, carried by a custom motion stage, with electrical probe positioners and fiber aligned to a silicon photonics chip and the live device image on the monitor",
        caption: "STAGE MOVES THE WHOLE MICROSCOPE",
      },
      {
        src: "/images/projects/photonics-optical-bench.jpg",
        alt: "Photonics characterization bench with Thorlabs amplifiers, Keysight instruments, Leica microscope, and dense fiber cabling on a Newport optical table",
        caption: "OPTICAL BENCH — MICROSCOPY & FIBER SETUP",
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
    period: { startYear: 2013, endYear: 2022, label: "2013–2022" },
    challenge:
      "Integrate laboratory robots and scientific instruments into dependable workflows for large-scale biological screening.",
    summary:
      "A shared automation platform for chemical and functional genomics screening, developed through the Chemical and Functional Genomics Lab and NYUAD Core Technology Platforms. I was responsible for the automation and systems-engineering work: coordinating robotic plate handling, liquid handling, incubation, imaging, and data acquisition so scientific protocols could run as integrated workflows.",
    contributionSummary:
      "Engineered and maintained the platform’s automation: Thermo Fisher Momentum workflows, FANUC configuration, instrument synchronization, fault recovery, and vendor coordination.",
    outcomeSummary:
      "Supported biological screening through 2022 with integrated robotic workflows, instrument maintenance, and operational support for the joint CGSB–CTP platform.",
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
  {
    type: "infrastructure",
    slug: "advanced-manufacturing-electronics",
    title: "Advanced Manufacturing and Electronics",
    org: "NYU Abu Dhabi · Core Technology Platforms",
    period: { startYear: 2013, endYear: 2025, label: "2013–2025" },
    challenge:
      "Research hardware needed an in-house path from design to metal and polymer parts and to printed circuit boards.",
    summary:
      "NYU Abu Dhabi’s shared workshops for custom mechanical parts and printed-circuit fabrication. I co-developed Advanced Manufacturing and Electronics and ran the facility for several years, personally operating the industrial additive, cutting, inspection, and circuit-board machines used for research prototypes.",
    contributionSummary:
      "Co-developed the workshops and personally operated the EOS and Stratasys printers, waterjet, wire EDM, laser cutters, NSI CT scanner, and the in-house circuit-board line.",
    outcomeSummary:
      "Gave NYUAD in-house prototyping for metal and polymer parts and printed circuit boards, and kept those machines in research use from 2013 through 2025.",
    highlights: [
      "Established the Electronics Workshop and co-established the Advanced Manufacturing Workshop, then operated them as the Advanced Manufacturing and Electronics platform through 2025.",
      "Personally operated EOS industrial 3D printers — selective laser sintering and SLA, and the EOSINT M 270 metal laser-sintering system — and Stratasys plastic printers. The EOS machines were advanced systems that took particular care to understand and run, including powder handling, inert process gas, and build parameters.",
      "Operated the cutting and inspection cell: waterjet, wire EDM, and laser cutters, and a North Star Imaging (NSI) computed-tomography scanner for non-destructive inspection of manufactured parts. The machining bay included a Haas VF-2SS vertical mill.",
      "Ran the electronics fabrication line: circuit-board plotter, through-hole plating system, board press, and reflow oven. In-house work on that line produced research boards, including the hardware-security ASIC validation platform.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Co-development & operation",
        org: "NYU Abu Dhabi · Core Technology Platforms",
      },
      {
        name: "Core Technology Platforms",
        role: "Research infrastructure organization",
        org: "NYU Abu Dhabi",
      },
    ],
    domains: ["electronics-embedded-systems", "lab-automation-instrumentation"],
    contributions: ["designed", "commissioned", "operated"],
    evidence: [
      {
        type: "institutional-page",
        title: "Advanced Manufacturing and Electronics CTP",
        url: "https://nyuad.nyu.edu/en/research/facilities-and-support/core-technology-platforms/advanced-manufacturing-and-electronics.html",
      },
      {
        type: "photograph",
        title: "EOSINT M 270 and Haas VF-2SS on the shop floor",
        note: "Advanced Manufacturing and Electronics, NYU Abu Dhabi",
      },
    ],
    images: [
      {
        src: "/images/projects/ame-eosint-aisle.jpg",
        alt: "Advanced Manufacturing shop aisle at NYU Abu Dhabi with an EOSINT M 270 metal laser-sintering system, an argon dewar, and machining equipment further down the floor",
        caption: "EOSINT M 270 — METAL LASER SINTERING",
      },
      {
        src: "/images/projects/ame-haas-vf2ss.jpg",
        alt: "Haas VF-2SS vertical machining center with the enclosure open, flanked by tool cabinets and a workbench in the Advanced Manufacturing workshop",
        caption: "HAAS VF-2SS — CNC MACHINING CELL",
      },
      {
        src: "/images/projects/ame-shop-bench.jpg",
        alt: "Shop-floor view of the EOSINT M 270 beside an argon supply, with a Haas machining center and a bench vise in the foreground",
        caption: "SHOP FLOOR — ADDITIVE & MACHINING",
      },
    ],
    link: {
      label: "Official facility page",
      href: "https://nyuad.nyu.edu/en/research/facilities-and-support/core-technology-platforms/advanced-manufacturing-and-electronics.html",
    },
    status: "published",
  },
];
