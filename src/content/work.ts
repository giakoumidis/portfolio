import type { ProjectRecord } from "@/lib/types";

/**
 * Partner-controlled imagery — publication rights checklist (owner confirm before launch):
 * - Etihad Rail depot / yard / locomotive Spot photos (`etihad-rail-depot-*`, rear-camera field installs).
 *   Owner added three stills on the collaboration page (locomotive inspection and rail locomotion).
 *   The earlier `etihad-rail-depot-*` set and rear-camera installs stay omitted.
 * - Abu Dhabi Airports / ADAC facility material (currently video-only via NYUAD public channel).
 *   The exhibition-booth still is a public display photo, not restricted-site imagery.
 * Until confirmed, restricted-site stills are omitted from `images` arrays; public announcement
 * media (Instagram/YouTube) remains.
 */

export const workRecords: ProjectRecord[] = [
  {
    type: "project",
    slug: "agentic-robotics-framework",
    title: "Agentic Robotics Framework",
    org: "NYU Abu Dhabi · CAIR · PhD research, University of the Aegean",
    period: { startYear: 2025, label: "2025–" },
    cardHook:
      "Operators command a Boston Dynamics Spot for industrial inspection in ordinary language. A model-agnostic agent harness grounds skills through tool descriptions and keeps language-model reasoning behind a deterministic safety boundary.",
    challenge:
      "Let facility operators command a field robot for inspection without specialist interfaces or task-specific model training.",
    summary:
      "This is my current research system for natural-language field inspection. I designed and built a three-layer agent harness — interface, orchestration, and decision-and-skill — joined only by tool calls. Robot and sensor skills are independent Model Context Protocol servers, so a locally served open-weight model chooses actions from tool descriptions without fine-tuning. Every call is checked before it reaches the Boston Dynamics Spot SDK, and the model cannot clear an operator e-stop. The working stack accepts voice and text, keeps session memory, and drives Spot through navigation, vision, and thermal inspection skills. Two Spots with different payloads can split one mission: the arm robot opens a door or turns a valve, while the robot carrying LiDAR and an acoustic camera navigates and acquires the inspection data. The paper is under review at the Journal of Field Robotics.",
    contributionSummary:
      "Designed and built the agent harness, MCP skill servers, and orchestration that connect natural-language commands to Spot inspection skills.",
    outcomeSummary:
      "A working inspection stack on Boston Dynamics Spot, commanded by voice and text through a local model. The paper is under review at the Journal of Field Robotics.",
    highlights: [
      "Three layers — a messaging interface, n8n orchestration, and a language-model skill loop — exchange natural language upward and structured tool calls downward.",
      "Spot locomotion, vision, and thermal sensing are separate MCP servers. The model reads descriptions, not robot code, and is not trained on the inspection task.",
      "Each tool server validates arguments before the Spot SDK runs them. The agent can request a stop; it cannot release an operator e-stop.",
      "Voice and text over Telegram, plus browser and webhook entry points, share one orchestration path and PostgreSQL session memory.",
      "The deployment runs on Spot with an arm and thermal payload, with on-robot perception and the language model served locally.",
      "Two Spots carry different payloads and can cooperate on one mission. The arm robot opens a door or turns a valve. The robot with LiDAR and an acoustic camera handles navigation and data acquisition.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Designer and builder",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Anthony Tzes",
        role: "Co-author",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Christos-Nikolaos Anagnostopoulos",
        role: "Co-author",
        org: "University of the Aegean",
      },
    ],
    facets: {
      domains: ["embodied-physical-ai", "perception-sensing"],
      contributions: [
        "conceived",
        "designed",
        "built",
        "system-integration",
        "experimental-development",
      ],
      applications: ["industrial-inspection"],
      platforms: ["boston-dynamics-spot"],
      methods: ["thermal-imaging"],
      outcomes: ["deployed-prototype"],
    },
    evidence: [
      {
        type: "photograph",
        title: "Spot CAM payload panorama during an inspection pass",
      },
      {
        type: "photograph",
        title: "Spot PTZ payload view down an inspection aisle",
      },
      {
        type: "photograph",
        title: "SV600 payload localizing frequencies",
      },
      {
        type: "photograph",
        title: "WIRIS Pro SC payload thermal frame",
      },
      {
        type: "photograph",
        title: "Thermal payload image from a data center inspection",
      },
      {
        type: "photograph",
        title: "Two Spots with arm and sensing payloads",
      },
      {
        type: "photograph",
        title: "Spot opening a door at Kinesis",
      },
      {
        type: "publication",
        title:
          "A Zero-Training Robot Agent Harness for Natural-Language Field Inspection",
        note: "Journal of Field Robotics, under review",
        date: "2026",
      },
    ],
    images: [
      {
        src: "/images/projects/agentic-spot-pano.jpg",
        alt: "Spot CAM payload panorama looking down a server aisle, with the robot's sensor arm in the foreground and a tripod camera ahead",
        caption: "PAYLOAD — SPOT CAM PASS",
      },
      {
        src: "/images/projects/agentic-spot-aisle.jpg",
        alt: "Spot PTZ payload view down a server aisle with inspection objects on the raised floor",
        caption: "PAYLOAD — SPOT PTZ AISLE",
      },
      {
        src: "/images/projects/agentic-sv600-sound.jpg",
        alt: "Fluke SV600 payload acoustic image of a vehicle side, with a 30.25 dB sound-pressure hotspot at the front wheel and a spectrum localized between about 18 and 22 kHz",
        caption: "PAYLOAD — SV600 FREQUENCIES",
      },
      {
        src: "/images/projects/agentic-wiris-thermal.jpg",
        alt: "Workswell WIRIS Pro SC payload radiometric thermal view of a dark interior, with a hot object close to the lens and warmer equipment along the left side",
        caption: "PAYLOAD — WIRIS THERMAL",
      },
      {
        src: "/images/projects/agentic-datacenter-thermal.jpg",
        alt: "Thermal payload image from a data center inspection showing two people, with readings of 17.25 °C minimum, 34.85 °C maximum, and 24.95 °C",
        caption: "PAYLOAD — DATA CENTER THERMAL",
      },
      {
        src: "/images/projects/agentic-spot-pair.jpg",
        alt: "Two Boston Dynamics Spot robots in a workshop. The robot on the left carries a LiDAR and acoustic-camera payload. The robot on the right carries a manipulator arm. A person stands between them.",
        caption: "TWO SPOTS — COOPERATIVE PAYLOADS",
      },
      {
        src: "/images/projects/agentic-spot-door.jpg",
        alt: "Boston Dynamics Spot with a manipulator arm gripping a door handle in the Kinesis laboratory, beside a workbench and parts cabinets",
        caption: "KINESIS — SPOT OPENS THE DOOR",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "mobius-tethered-uav-power",
    title: "MOBIUS Tethered UAV Power System",
    org: "NYU Abu Dhabi · CAIR with University of Patras",
    period: { startYear: 2026, label: "2026–" },
    cardHook:
      "A tethered UAV platform I built for persistent observation: hybrid high-voltage power from University of Patras electronics, a fiber optical-communications architecture I designed, and monitoring software that records the full electrical and flight path.",
    challenge:
      "Keep a UAV aloft for long-duration observation by combining high-voltage tether power with an onboard battery for peak load and tether-side redundancy, while carrying a secure fiber data link and recording the complete power path during bench and flight tests.",
    summary:
      "MOBIUS is a tethered aerial platform that delivers 400–800 V DC and fiber-optic communications through a 120 m hybrid tether to an airborne UAV power station (UAVoPoS). I built the UAV, designed the optical communications architecture over the tether fiber, consulted on the overall system design, and designed the monitoring software — the Integrated Experiment Console that merges the BK Precision ground supply, airborne converter telemetry, and MAVLink aircraft state into one synchronized 10 Hz record. University of Patras designed the Vicor-based converter and ideal-diode battery interface. Bench work reached about 1.75 kW from the tether-side converter and about 2.5 kW in hybrid operation. The manuscript is under review at IEEE Access.",
    contributionSummary:
      "Built the UAV, designed the optical communications architecture, consulted on the overall system design, co-authored the manuscript, and designed the monitoring software that synchronizes multi-source logging and supervised power-supply control.",
    outcomeSummary:
      "A working tethered UAV with fiber communications, two UAVoPoS voltage-range prototypes, bench hybrid-power validation, flight demonstrations, and a monitoring console. The paper is under review at IEEE Access.",
    highlights: [
      "I built the UAV airframes used for the low-power quadrotor and large coaxial-octarotor flight demonstrations that carry the UAVoPoS and hybrid tether.",
      "I designed the optical communications architecture that uses the tether’s single-mode fiber for an EMI-resistant ground–air data link alongside the 400–800 V DC power conductors.",
      "I consulted on the overall MOBIUS architecture — ground supply, tether, airborne converter, battery assist, and aircraft integration — with University of Patras as the power-electronics partner.",
      "Ground BK Precision PVS10005 supplies 400–800 V DC through a 120 m Linden SPE-7155 tether to a Vicor BCM4414 fixed-ratio converter. Two UAVoPoS prototypes cover 400–700 V and 500–800 V; a LiPo joins the bus through an ideal-diode MOSFET for Mode 2 peak support and redundancy.",
      "University of Patras delivered the power electronics, STM32 firmware, schematics, and PCB package. NYUAD Machine Shop fabricated the HV/LV busbars and QS8 connector brackets.",
      "I designed the monitoring software — the Integrated Experiment Console (v0.3.0) — a local web dashboard that joins PVS SCPI, firmware UART, and read-only MAVLink into a 10 Hz CSV with source age, derived tether loss and efficiency, virtual devices, and CSV replay.",
      "The console’s software safety layer provides diagnostics, arming, and a narrowly scoped LAND request. It is research instrumentation, not a hardwired E-stop or certified flight controller.",
      "Bench tests reported about 1.75 kW converter output and about 2.5 kW hybrid load, with flight validation on the platforms I built.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Co-author · UAV build, optical communications, design consult, monitoring software",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Anthony Tzes",
        role: "Senior academic lead",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Nikolaos Evangeliou",
        role: "Co-author · Flight and integration support",
        org: "NYU Abu Dhabi · RISC",
      },
      {
        name: "Emmanuel C. Tatakis",
        role: "University of Patras lead",
        org: "University of Patras",
      },
      {
        name: "Georgios A. Salagiannis",
        role: "Corresponding author · Power-electronics design",
        org: "University of Patras",
      },
      {
        name: "Laboratory of Electromechanical Energy Conversion",
        role: "Power-electronics development partner",
        org: "University of Patras",
      },
      {
        name: "NYUAD Machine Shop",
        role: "Busbars and QS8 brackets",
        org: "NYU Abu Dhabi",
      },
    ],
    facets: {
      domains: [
        "aerial-ground-underwater-robotics",
        "electronics-embedded-systems",
        "telecommunications-edge-computing",
        "lab-automation-instrumentation",
      ],
      contributions: [
        "conceived",
        "co-authored",
        "designed",
        "built",
        "system-integration",
        "experimental-development",
      ],
      platforms: ["uav-platform"],
      outcomes: ["deployed-prototype"],
    },
    evidence: [
      {
        type: "photograph",
        title: "Integrated Experiment Console live telemetry overview",
      },
      {
        type: "photograph",
        title: "GoPoS–tether–UAVoPoS–battery architecture schematic",
      },
      {
        type: "photograph",
        title: "MOBIUS OnBoard UAVoPoS PCB with Vicor heatsink",
      },
      {
        type: "photograph",
        title: "Enclosed 800 V UAVoPoS prototype",
      },
      {
        type: "photograph",
        title: "Open UAVoPoS assembly with cooling fans",
      },
      {
        type: "photograph",
        title: "UAVoPoS cooling airflow CAD",
      },
      {
        type: "photograph",
        title: "Low-power quadrotor flight demonstration",
      },
      {
        type: "publication",
        title:
          "Compact and Redundant Power System for UAVs Combining Power-over-Tether and Battery",
        note: "IEEE Access, under review",
        date: "2026",
      },
    ],
    images: [
      {
        src: "/images/projects/mobius-console-overview.jpg",
        alt: "MOBIUS Fieldline experiment console showing live power telemetry, source panels, and safety supervisor status",
        caption: "EXPERIMENT CONSOLE — LIVE TELEMETRY",
      },
      {
        src: "/images/projects/mobius-console-routing.jpg",
        alt: "MOBIUS Fieldline console power-routing view with ground source, converter, battery, and aircraft load",
        caption: "CONSOLE — POWER ROUTING VIEW",
      },
      {
        src: "/images/projects/mobius-power-architecture.jpg",
        alt: "Schematic of the MOBIUS power path from ground power station through the tether to the UAV converter, battery MOSFET, and load",
        caption: "POWER PATH — GOPOS TO UAV BUS",
      },
      {
        src: "/images/projects/mobius-uavopos-pcb.jpg",
        alt: "Top view of the MOBIUS OnBoard UAVoPoS printed circuit board with aluminum heatsink, fan headers, and high-voltage terminals",
        caption: "UAVOPOS PCB — MOBIUS ONBOARD",
        orientation: "portrait",
      },
      {
        src: "/images/projects/mobius-uavopos-enclosure.jpg",
        alt: "Green 3D-printed UAVoPoS enclosure labeled 800 V with cooling fans and high-current terminals visible",
        caption: "UAVOPOS ENCLOSURE — 800 V VARIANT",
      },
      {
        src: "/images/projects/mobius-uavopos-open.jpg",
        alt: "Open MOBIUS OnBoard V1 assembly showing the PCB, aluminum heatsink, and three lid-mounted cooling fans",
        caption: "UAVOPOS OPEN — FANS & HEATSINK",
      },
      {
        src: "/images/projects/mobius-cooling-cad.jpg",
        alt: "CAD rendering of the UAVoPoS enclosure with three fans and red airflow arrows over the Vicor heatsink",
        caption: "COOLING CAD — AIRFLOW PATH",
      },
      {
        src: "/images/projects/mobius-quadrotor-flight.jpg",
        alt: "Low-power quadrotor hovering outdoors during a MOBIUS tethered power flight demonstration",
        caption: "FLIGHT DEMO — LOW-POWER QUADROTOR",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "etihad-rail-nyuad-collaboration",
    title: "Etihad Rail × NYUAD AI & Robotics Collaboration",
    org: "NYU Abu Dhabi · CAIR with Etihad Rail",
    period: { startYear: 2024, label: "2024" },
    cardHook:
      "Connecting robotics research with rail operations through industry engagement and hands-on Spot inspection trials at an Etihad Rail depot, collecting multimodal locomotive data for further analysis.",
    challenge:
      "Evaluate how AI and robotics research could address inspection needs in an operating rail depot.",
    summary:
      "This NYUAD–Etihad Rail collaboration explored the use of AI and robotics in rail operations. I combined stakeholder engagement and laboratory visits with hands-on operation of Boston Dynamics Spot at the depot, collecting multimodal locomotive data for inspection research. The trials provided a practical basis for exploring predictive-maintenance applications.",
    contributionSummary:
      "Connected CAIR research with Etihad Rail through stakeholder engagement, laboratory visits, and hands-on Spot inspection trials at the depot.",
    outcomeSummary:
      "A publicly announced collaboration and depot trials that collected multimodal locomotive data for inspection and predictive-maintenance research.",
    highlights: [
      "Connected research capabilities with the practical requirements of depot inspection through laboratory visits and field trials.",
      "Operated Spot around locomotives in an active depot to collect multimodal inspection data.",
      "Trials covered locomotive visual inspection and locomotion testing on the rail infrastructure, including ballast and track walking at the depot.",
      "Combined technical demonstrations, stakeholder engagement, and hands-on fieldwork within the Etihad Rail–CAIR collaboration.",
      "Collected data for further analysis, with predictive maintenance as a research application to develop and validate.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Commercial Lead",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Nikolaos Evangeliou",
        role: "Research Scientist",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Etihad Rail",
        role: "Industry partner",
      },
      {
        name: "Center for Artificial Intelligence and Robotics (CAIR)",
        role: "Research partner",
        org: "NYU Abu Dhabi",
      },
    ],
    facets: {
      domains: [
        "industry-engagement",
        "aerial-ground-underwater-robotics",
        "perception-sensing",
      ],
      contributions: ["commercialized", "led", "field-testing"],
      applications: ["rail-transport", "industrial-inspection"],
      platforms: ["boston-dynamics-spot"],
      methods: ["sensor-fusion"],
      outcomes: ["industry-collaboration", "public-demonstration"],
    },
    evidence: [
      {
        type: "video",
        title: "Etihad Rail × NYUAD AI and robotics collaboration",
        url: "https://www.instagram.com/reel/DByqr6-Rndg/",
      },
      {
        type: "photograph",
        title:
          "Spot collecting multimodal locomotive data at the Etihad Rail depot for predictive maintenance",
      },
      {
        type: "photograph",
        title: "Spot locomotion test on ballast beside a freight wagon",
      },
      {
        type: "photograph",
        title: "Spot locomotion test on the depot rails",
      },
      {
        type: "photograph",
        title: "Spot visual inspection beside an Etihad Rail locomotive",
      },
    ],
    video: {
      provider: "instagram",
      url: "https://www.instagram.com/reel/DByqr6-Rndg/",
      title: "Etihad Rail × NYUAD AI and robotics collaboration",
      poster: "/images/projects/etihad-rail-nyuad.jpg",
    },
    // Earlier depot set still withheld: etihad-rail-depot-spot-{train,tracks,yard}.jpg
    images: [
      {
        src: "/images/projects/etihad-rail-locomotion-rails.jpg",
        alt: "Boston Dynamics Spot standing on the rails in front of the Etihad Rail depot during locomotion testing",
        caption: "LOCOMOTION — ON THE DEPOT RAILS",
      },
      {
        src: "/images/projects/etihad-rail-locomotive-inspection.jpg",
        alt: "Boston Dynamics Spot beside an Etihad Rail passenger locomotive inside the maintenance shed during visual inspection",
        caption: "INSPECTION — LOCOMOTIVE SIDE",
      },
      {
        src: "/images/projects/etihad-rail-locomotion-ballast.jpg",
        alt: "Boston Dynamics Spot on the ballast beside an Etihad Rail freight wagon during locomotion testing",
        caption: "LOCOMOTION — BALLAST BY WAGON",
      },
      {
        src: "/images/projects/etihad-rail-nyuad.jpg",
        alt: "Public collaboration imagery for the Etihad Rail × NYUAD AI and robotics partnership",
        caption: "ETIHAD RAIL × NYUAD — PUBLIC COLLAB",
      },
    ],
    imagesOnIndex: false,
    status: "published",
  },
  {
    type: "project",
    slug: "rta-dubai-delivery-drone",
    title: "RTA Delivery Drone — Dubai World Challenge",
    org: "NYU Abu Dhabi · RTA Dubai World Challenge for Self-Driving Transport",
    period: { startYear: 2021, label: "2021" },
    cardHook:
      "Delivery drone developed by the NYUAD team that won First Prize at the RTA Dubai World Challenge for Self-Driving Transport.",
    // PENDING OWNER REVIEW
    challenge:
      "Build and demonstrate an aerial delivery platform for the RTA Dubai World Challenge for Self-Driving Transport.",
    summary:
      "An eight-rotor aerial delivery platform developed by the NYUAD team for the RTA Dubai World Challenge for Self-Driving Transport. I designed and integrated its mechatronics and supported its competition deployment. The team won First Prize and USD 100,000, and the platform was documented in a subsequent mechatronic design paper.",
    contributionSummary:
      "Designed and integrated the delivery drone’s mechatronics and supported the NYUAD team’s deployment at the RTA competition.",
    outcomeSummary:
      "The NYUAD team won First Prize and USD 100,000. The platform’s mechatronic design was subsequently published in IJMERR.",
    highlights: [
      "First Prize, RTA Dubai World Challenge for Self-Driving Transport (Delivery Drone · USD 100,000).",
      "Octarotor delivery airframe with central payload bay, flown and demonstrated at the RTA test venue.",
      "Peer-reviewed follow-on: Mechatronic design of a delivery octarotor drone (IJMERR, 2022).",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Mechatronics & systems integration",
        org: "NYU Abu Dhabi",
      },
      {
        name: "NYU Abu Dhabi team",
        role: "Competition team",
      },
      {
        name: "Roads and Transport Authority (RTA)",
        role: "Challenge organiser",
        org: "Dubai",
      },
    ],
    facets: {
      domains: ["aerial-ground-underwater-robotics"],
      contributions: ["designed", "system-integration", "field-testing"],
      platforms: ["uav-platform"],
      methods: ["aerial-manipulation"],
      outcomes: [
        "prize-award",
        "peer-reviewed-publication",
        "public-demonstration",
        "deployed-prototype",
      ],
    },
    explicitRelated: [
      {
        type: "project",
        slug: "hybrid-ground-air-water-vehicle",
      },
    ],
    evidence: [
      {
        type: "award",
        title: "First Prize — RTA Dubai World Challenge 2021",
      },
      {
        type: "video",
        title:
          "Delivery drone — RTA Dubai World Challenge for Self-Driving Transport",
        url: "/videos/awards/rta-2021/drone-delivery.mp4",
      },
      {
        type: "photograph",
        title: "1st Prize trophy, Local Academia",
      },
      {
        type: "photograph",
        title: "Delivery octarotor — top view",
      },
      {
        type: "publication",
        title: "Mechatronic design of a delivery octarotor drone",
        url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:hqOjcs7Dif8C",
        note: "International Journal of Mechanical Engineering and Robotics Research 11 (5)",
        date: "2022",
      },
    ],
    video: {
      provider: "local",
      src: "/videos/awards/rta-2021/drone-delivery.mp4",
      title:
        "Delivery drone — RTA Dubai World Challenge for Self-Driving Transport",
      poster: "/images/awards/rta-2021/rta-academia-trophy.jpg",
    },
    images: [
      {
        src: "/images/awards/rta-2021/rta-academia-trophy.jpg",
        alt: "Illuminated ring trophy for 1st Prize Drone, Local Academia, at the RTA competition, with the delivery octarotor behind it",
        caption: "1ST PRIZE — LOCAL ACADEMIA",
      },
      {
        src: "/images/awards/rta-2021/delivery-octarotor-top.jpg",
        alt: "Top-down view of the delivery octarotor drone with eight rotors arranged around a central payload bay",
        caption: "DELIVERY OCTAROTOR — TOP VIEW",
      },
      {
        src: "/images/awards/rta-2021/rta-ceremony.jpg",
        alt: "NYU Abu Dhabi receiving the first-prize award for the delivery drone at the RTA Dubai World Challenge ceremony",
        caption: "FIRST PRIZE — RTA AWARD CEREMONY",
      },
      {
        src: "/images/awards/rta-2021/rta-test-venue.jpg",
        alt: "Delivery drone on the RTA self-driving transport challenge test floor in Dubai",
        caption: "FLIGHT TEST — RTA CHALLENGE VENUE",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "etihad-rail-desert-environment-monitoring",
    title: "Digital Twin-Based Desert Environment Monitoring for Rail Tracks",
    org: "NYU Abu Dhabi · CAIR with Etihad Rail",
    period: { startYear: 2024, label: "2024" },
    cardHook:
      "A train-mounted LiDAR and camera pilot for Etihad Rail, collecting corridor data to investigate 3D environmental monitoring and support future maintenance planning under UAE field conditions.",
    challenge:
      "Collect rail-corridor data to investigate sand movement, water accumulation, and vegetation encroachment under UAE field conditions.",
    summary:
      "A field pilot within the NYUAD–Etihad Rail collaboration, using rearward-facing LiDAR and cameras to capture the rail corridor. I designed the sensing system, and Nikolaos Evangeliou and I ran the field experiment. The wider research concept uses these observations to reconstruct the track-side environment in 3D and investigate environmental change for maintenance planning.",
    contributionSummary:
      "Designed the train-mounted LiDAR and camera system and ran the field experiment with Nikolaos Evangeliou.",
    outcomeSummary:
      "Field-piloted a train-mounted sensing payload to collect corridor data for subsequent 3D environmental monitoring research.",
    highlights: [
      "Targets data collection for rail-corridor hazards including sand movement, water accumulation, and vegetation growth.",
      "The pilot mounted LiDAR and cameras on a train to collect the observations needed for subsequent 3D reconstruction and environmental monitoring.",
      "The proposed analysis would compare environmental observations over time and investigate alerts for operators and maintenance teams.",
      "The longer-term concept is to aggregate observations from multiple trains for network-wide monitoring and maintenance planning.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "System design · experiment",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Nikolaos Evangeliou",
        role: "Research Scientist · experiment",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Etihad Rail",
        role: "Industry partner",
      },
    ],
    facets: {
      domains: [
        "perception-sensing",
        "sim2real-digital-twins",
        "industry-engagement",
      ],
      contributions: ["designed", "field-testing", "commercialized"],
      applications: ["rail-transport"],
      methods: ["sensor-fusion", "slam", "deep-learning"],
      outcomes: [
        "industry-collaboration",
        "deployed-prototype",
        "public-demonstration",
      ],
    },
    relations: [
      {
        type: "continuation-of",
        target: {
          type: "project",
          slug: "etihad-rail-nyuad-collaboration",
        },
        label: "Field sensing pilot within the Etihad Rail × NYUAD collaboration",
      },
    ],
    evidence: [
      {
        type: "photograph",
        title: "Train-mounted LiDAR and camera payload on an Etihad Rail locomotive",
      },
      {
        type: "video",
        title: "Field walkaround of the train-mounted desert-environment sensing payload",
        url: "/videos/projects/etihad-rail-rear-facing-camera/etihad-rail-rear-facing-camera.mp4",
      },
    ],
    video: {
      provider: "local",
      src: "/videos/projects/etihad-rail-rear-facing-camera/etihad-rail-rear-facing-camera.mp4",
      title: "Field walkaround of the train-mounted desert-environment sensing payload",
      poster: "/images/projects/etihad-rail-rear-camera-poster.jpg",
    },
    // PENDING PUBLICATION RIGHTS — locomotive install stills omitted until Etihad Rail permission confirmed.
    // Files retained: etihad-rail-rear-camera-{team,mount,poster}.jpg
    images: undefined,
    status: "published",
  },
  {
    type: "project",
    slug: "multiagent-construction-exploration",
    title: "Multi-Agent Exploration for Construction Data Collection",
    org: "NYU Abu Dhabi · SMART Lab",
    period: { startYear: 2024, label: "2024" },
    cardHook:
      "Cooperative robot exploration and mapping for construction environments, combining complementary robot capabilities with human assistance when obstacles interrupt the task. Published in the Journal of Field Robotics.",
    challenge:
      "Continue robotic mapping and data collection when obstacles prevent a single robot from completing the task.",
    summary:
      "A cooperative robotic system for 3D digitization and data collection in construction environments. One robot explores and maps the space, coordinating with another to address obstacles and drawing on human teleoperation when needed. The work investigates how complementary robot capabilities and human assistance can keep a data-collection task progressing. The field deployment was at SeaWorld Abu Dhabi, where the team used the robots for construction monitoring in collaboration with the ALEC contractor.",
    contributionSummary:
      "Contributed to the cooperative exploration system and co-authored the Journal of Field Robotics paper on construction-site data collection.",
    // PENDING OWNER REVIEW
    outcomeSummary:
      "Demonstrated cooperative exploration with human assistance for construction data collection; published in the Journal of Field Robotics in 2024.",
    highlights: [
      "Demonstrates autonomous exploration paired with agent-to-agent coordination so the team can keep mapping after an obstacle blocks the path.",
      "Human-in-the-loop teleoperation backs the autonomous stack when remote support is required to finish the mission.",
      "Published in the Journal of Field Robotics as an application of multiagent robotic systems and exploration algorithms to construction-site data collection.",
      "Field deployment at SeaWorld Abu Dhabi with the ALEC contractor. The site photo shows the full field team and the robots used for construction monitoring: two Spot platforms and a wheeled sensing robot.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Co-author",
        org: "NYU Abu Dhabi · SMART Lab",
      },
      {
        name: "Samuel A. Prieto",
        role: "Lead author",
        org: "NYU Abu Dhabi · SMART Lab",
      },
      {
        name: "Borja García de Soto",
        role: "Principal Investigator",
        org: "NYU Abu Dhabi · SMART Lab",
      },
      {
        name: "ALEC",
        role: "Contractor at SeaWorld Abu Dhabi",
      },
    ],
    facets: {
      domains: ["multi-agent-robotic-systems"],
      contributions: ["experimental-development", "co-authored"],
      applications: ["construction"],
      platforms: ["boston-dynamics-spot", "ugv-platform"],
      methods: ["exploration-algorithms", "shared-autonomy"],
      outcomes: ["peer-reviewed-publication"],
    },
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "jfr-2024-multiagent-construction",
        },
      },
      {
        type: "video",
        title: "Multi-agent robotic system: An example for data collection",
        url: "https://www.youtube.com/watch?v=i-83iW9gd5Q",
      },
      {
        type: "photograph",
        title: "Field team and robots at SeaWorld Abu Dhabi",
      },
    ],
    video: {
      provider: "youtube",
      id: "i-83iW9gd5Q",
      title: "Multi-agent robotic system: An example for data collection",
    },
    images: [
      {
        src: "/images/projects/multiagent-seaworld-team.jpg",
        alt: "The field team in hard hats and high-visibility vests at the SeaWorld Abu Dhabi construction site, with two Boston Dynamics Spot robots and a wheeled sensing robot",
        caption: "SEAWORLD — FIELD TEAM & ROBOTS",
      },
    ],
    status: "needs-review",
  },
  {
    type: "project",
    slug: "eye-gaze-wheelchair",
    title: "Eye-Gaze-Controlled Wheelchair",
    org: "NYU Abu Dhabi · with University of Ottawa",
    period: { startYear: 2013, endYear: 2016, label: "2013–2016" },
    cardHook:
      "Eye-gaze control and shared autonomy for powered mobility, evaluated in a home case study with a person living with ALS.",
    challenge:
      "Enable a person with severely limited voluntary movement to navigate unfamiliar spaces using eye gaze and assisted control.",
    summary:
      "A powered-wheelchair navigation system that combines eye-gaze input with obstacle sensing and shared autonomy. I designed, integrated, and field-tested the navigation stack, connecting the user’s intended direction with assisted robot control. The system was evaluated in the home of a person living with ALS and documented in IEEE Access.",
    contributionSummary:
      "Designed, integrated, and field-tested the wheelchair navigation stack, combining gaze tracking, obstacle sensing, and shared autonomy.",
    outcomeSummary:
      "Evaluated in a home case study with a person living with ALS and published in IEEE Access.",
    highlights: [
      "Constraint: the interface had to work from a single voluntary channel — gaze — without requiring residual limb control.",
      "Engineering decision: fuse gaze with onboard sensing and shared autonomy so unsafe commanded paths are filtered before the chair moves.",
      "Field conditions: evaluated outside the lab in the home of a person with ALS, navigating previously unseen rooms and corridors.",
      "Trade-off: higher assisted-control safety reduces raw teleoperation freedom; the stack prioritizes collision avoidance over direct gaze-to-velocity mapping.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Co-author",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Mohamad Eid",
        role: "Lead author · Principal Investigator",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Abdulmotaleb El Saddik",
        role: "Co-author",
        org: "University of Ottawa",
      },
      {
        name: "University of Ottawa",
        role: "Research partner",
      },
    ],
    facets: {
      domains: ["perception-sensing"],
      contributions: ["designed", "built", "field-testing", "co-authored"],
      applications: ["assistive-technology"],
      platforms: ["powered-wheelchair"],
      methods: ["eye-gaze-tracking", "shared-autonomy", "sensor-fusion"],
      outcomes: ["peer-reviewed-publication", "deployed-prototype"],
    },
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "ieee-access-2016-eye-gaze-wheelchair",
        },
      },
      {
        type: "video",
        title:
          "Eye-gaze-controlled wheelchair — case study with a person with ALS",
        url: "/videos/projects/eye-gaze-wheelchair/eye-gaze-wheelchair.mp4",
      },
    ],
    video: {
      provider: "local",
      src: "/videos/projects/eye-gaze-wheelchair/eye-gaze-wheelchair.mp4",
      title:
        "Eye-gaze-controlled wheelchair — case study with a person with ALS",
      poster: "/images/projects/wheelchair-demo-poster.jpg",
    },
    images: [
      {
        src: "/images/projects/wheelchair-rig.jpg",
        alt: "Instrumented powered wheelchair prototype with a custom sensor and gaze-tracking frame, in a lab corridor",
        caption: "INSTRUMENTED CHAIR — SENSOR & GAZE RIG",
        orientation: "portrait",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "ribbon-curler-research-instrumentation",
    title: "Ribbon Curler — Automated Research Instrumentation",
    org: "NYU Abu Dhabi · Panče Naumov research group / Design Studio",
    period: { startYear: 2016, endYear: 2017, label: "2016–2017" },
    challenge:
      "Panče Naumov's smart-materials group needed repeatable control over pull speed, orientation, and geometry to study ribbon curling and chiral coiling.",
    summary:
      "A programmable test instrument developed for Panče Naumov’s group to study ribbon curling and chiral coiling. I translated changing experimental requirements into integrated motion hardware and control software, allowing researchers to vary pulling speed, sample orientation, and fixture geometry. The work included stage selection, mechanical integration, alignment troubleshooting, and operator handover.",
    contributionSummary:
      "Designed and integrated the motion hardware and control software, resolved fixture-alignment problems, and handed over a programmable instrument for repeatable ribbon-curling experiments.",
    outcomeSummary:
      "Delivered a programmable apparatus for structured sample campaigns and supported preparation of supplementary publication media.",
    highlights: [
      "Evaluated commercial linear stages across cost and performance (Thorlabs, Aerotech, Newmark, and lower-cost CNC options) against a ~300 mm travel envelope and experimental pull speeds up to about 100 mm/s.",
      "Integrated the stage, puller, and sample-holder assembly and corrected a fixture-height mismatch that had blocked reliable curling — converting a near-complete build into a usable experimental instrument.",
      "Enabled structured sample campaigns across pull speed, mounting angle/direction, width, and weight, producing catalogued curl, coil, spiral, and twist sets for analysis and figures.",
      "Configured and handed over Newmark motion-control software to follow-on operators, and supported filming plus assembly animation used toward manuscript supplementary material.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Instrumentation design & integration",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Panče Naumov",
        role: "Principal Investigator",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Lidong Zhang",
        role: "Experiment lead · sample campaigns",
        org: "NYU Abu Dhabi · Naumov group",
      },
      {
        name: "Khulood Alawadi",
        role: "Design Studio · visualization & fabrication support",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Israel Desta",
        role: "Follow-on operator · measurements",
        org: "NYU Abu Dhabi",
      },
    ],
    facets: {
      domains: [
        "lab-automation-instrumentation",
        "electronics-embedded-systems",
      ],
      contributions: [
        "designed",
        "built",
        "system-integration",
        "experimental-development",
      ],
      applications: ["research-infrastructure"],
      outcomes: ["research-capability", "deployed-prototype"],
    },
    evidence: [
      {
        type: "video",
        title: "Ribbon Curler — controlled pulling experiment",
        url: "/videos/projects/ribbon-curler/ribbon-experiment.mp4",
      },
      {
        type: "video",
        title: "Ribbon Curler — final machine assembly animation",
        url: "/videos/projects/ribbon-curler/ribbon-curler-assembly.mp4",
      },
      {
        type: "photograph",
        title:
          "July 2016 experiment photographs — curl samples grouped by test condition",
      },
    ],
    video: {
      provider: "local",
      src: "/videos/projects/ribbon-curler/ribbon-experiment.mp4",
      title: "Ribbon Curler — controlled pulling experiment",
      poster: "/images/projects/ribbon-curler-poster.jpg",
    },
    images: [
      {
        src: "/images/projects/ribbon-curler-mounting-angles.jpg",
        alt: "Annotated sheets comparing left and right blade mounting angles with corresponding ribbon curl samples",
        caption: "MOUNTING ANGLE — LEFT VS RIGHT",
        orientation: "portrait",
      },
      {
        src: "/images/projects/ribbon-curler-geometry-variations.jpg",
        alt: "Ribbon curl and twist variations with trigonometric fixture sketches for different geometric conditions",
        caption: "GEOMETRY — CURL & TWIST STATES",
      },
    ],
    imagesOnIndex: false,
    status: "published",
  },
  {
    type: "project",
    slug: "hardware-security-asic-validation-platform",
    title: "Hardware-Security ASIC Validation Platform",
    org: "NYU Abu Dhabi · with Ozgur Sinanoglu's hardware-security group",
    period: { startYear: 2017, label: "2017" },
    challenge:
      "Create a practical test platform for programming and validating a logic-locked 65 nm ARM Cortex-M0 ASIC.",
    summary:
      "A custom PCB test platform for hardware-security research on a logic-locked ARM Cortex-M0 ASIC. I led schematic design, board layout, in-house fabrication, and initial hardware testing. The board supported UART programming and key activation, allowing the research team to compare processor behaviour with valid and invalid keys for the ACM CCS 2017 work.",
    contributionSummary:
      "Led schematic design, PCB layout, in-house fabrication, and initial testing of the custom ASIC validation board.",
    // PENDING OWNER REVIEW
    outcomeSummary:
      "Enabled physical testing of the locked processor: correct execution with a valid key and failure with an incorrect key.",
    highlights: [
      "Eagle schematic, two-layer layout, and in-house fabrication on NYUAD Core Technology Platform equipment — two revisions to a reliable UART/DIP-switch test rig.",
      "Validated locked processor silicon: correct execution with the valid key, failure with an incorrect one.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Electronics design · hardware validation",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Ozgur Sinanoglu",
        role: "Principal Investigator",
        org: "NYU Abu Dhabi · Hardware Security Group",
      },
      {
        name: "Hardware Security Group",
        role: "Research partner",
        org: "NYU Abu Dhabi",
      },
    ],
    facets: {
      domains: [
        "electronics-embedded-systems",
        "lab-automation-instrumentation",
      ],
      contributions: ["led", "electronics-design", "built"],
      applications: ["hardware-security"],
      platforms: ["custom-pcb"],
      methods: ["pcb-design"],
      outcomes: ["peer-reviewed-publication"],
    },
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "acm-ccs-2017-logic-locking",
        },
        note: "Acknowledged hardware validation contribution",
      },
    ],
    images: [
      {
        src: "/images/projects/sfll-chip-board-close.jpg",
        alt: "Close-up of the populated chip-test PCB showing the SOP-28 test socket, DIP switch block, and illuminated seven-segment display",
        caption: "SOP-28 SOCKET — LOCKED PROCESSOR UNDER TEST",
      },
    ],
    // Fabricated on NYUAD CTP electronics equipment — no separate Electronics Workshop entity in the graph.
    status: "needs-review",
  },
  {
    type: "project",
    slug: "nyuad-adac-airport-inspection-drone",
    title: "Drone Inspection of Abu Dhabi International Airport",
    org: "NYU Abu Dhabi · with Abu Dhabi Airports (ADAC)",
    period: { startYear: 2019, label: "2019" },
    cardHook:
      "An NYUAD industry collaboration with Abu Dhabi Airports on drone inspection of the terminal roof at Abu Dhabi International Airport, using aerial manipulation where human access is hazardous.",
    challenge:
      "Investigate contact inspection of an airport terminal roof whose geometry makes human access hazardous.",
    summary:
      "An NYUAD collaboration with Abu Dhabi Airports investigating aerial manipulation for terminal-roof inspection. The system uses a drone equipped with robotic arms to make contact with the structure. My involvement supported the collaboration’s application of robotics to inspection in difficult-access infrastructure.",
    contributionSummary:
      "Supported the NYUAD–Abu Dhabi Airports collaboration on drone-based contact inspection of the terminal roof.",
    // PENDING OWNER REVIEW
    outcomeSummary:
      "Demonstrated an aerial-manipulation approach to terminal-roof inspection, featured in NYUAD’s public collaboration with Abu Dhabi Airports.",
    highlights: [
      "Aerial manipulation for infrastructure inspection: the drone's robotic arms take over contact inspection of the roof structure, \"minimizing the risks and hazards of using humans in difficult tasks\" (Prof. Anthony Tzes, NYUAD).",
      "Targets the aerodynamic roof design of the airport terminal, whose geometry makes conventional human inspection hazardous.",
      "Featured by NYU Abu Dhabi as part of its industry collaboration with Abu Dhabi Airports on maintaining safety standards at Abu Dhabi International Airport.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "System integration",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Abu Dhabi Airports (ADAC)",
        role: "Industry partner",
      },
      {
        name: "Anthony Tzes",
        role: "Principal Investigator",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Center for Artificial Intelligence and Robotics (CAIR)",
        role: "Research partner",
        org: "NYU Abu Dhabi",
      },
    ],
    facets: {
      domains: [
        "industry-engagement",
        "aerial-ground-underwater-robotics",
      ],
      contributions: ["supported", "system-integration"],
      applications: ["industrial-inspection"],
      platforms: ["uav-platform"],
      methods: ["aerial-manipulation"],
      outcomes: ["industry-collaboration", "public-demonstration"],
    },
    evidence: [
      {
        type: "video",
        title:
          "NYUAD and ADAC use drone technology to maintain safety standards at Abu Dhabi International Airport",
        url: "https://www.youtube.com/watch?v=iD51n8OFUbg",
      },
    ],
    video: {
      provider: "youtube",
      id: "iD51n8OFUbg",
      title:
        "NYUAD and ADAC use drone technology to maintain safety standards at Abu Dhabi International Airport",
    },
    images: [
      {
        src: "/images/projects/adac-inspection-drone-exhibit.jpg",
        alt: "Custom inspection multirotor in a clear display cylinder at an exhibition booth, with NYU Abu Dhabi and Abu Dhabi Airports branding and a screen showing the collaboration",
        caption: "EXHIBITION — INSPECTION DRONE",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "rgb-t-uav-detection-tracking",
    title: "UAV Visual Tracking & Localization",
    org: "NYU Abu Dhabi · CAIR",
    period: { startYear: 2020, endYear: 2022, label: "2020–2022" },
    cardHook:
      "Experimental development and flight validation across six publications on UAV detection, visual tracking, and cooperative localization, connecting perception algorithms with integrated sensing systems in the Kinesis arena.",
    challenge:
      "Translate UAV perception algorithms into integrated systems that could be evaluated during live flights.",
    summary:
      "A research programme spanning UAV detection, tracking, and relative localization. I contributed system integration and experimental development, including arena instrumentation, RGB-thermal pan-tilt-zoom sensing, and flight validation in Kinesis. The programme covered cooperative localization, deep-learning tracking, and Siamese aerial trackers across six peer-reviewed papers from 2020 to 2022.",
    contributionSummary:
      "Integrated sensing and arena instrumentation and supported flight validation across six papers on UAV perception and cooperative localization.",
    outcomeSummary:
      "Experimental systems and flight validation supporting six peer-reviewed publications on UAV perception from 2020 to 2022.",
    highlights: [
      "Thread opens with airborne PTZ visual tracking and relative visual localization for cooperative UAS, then layers computationally efficient RGB-thermal detection so thermal cues pull small drones out of clutter while RGB refines boxes at frame rate.",
      "Deep-learning evader pursuit and a Siamese adaptive transformer tracker extend the same arena stack to agile targets; relative spherical-visual localization closes the loop for multi-UAV cooperative localization.",
      "Flagship RGB-T detection and tracking demo integrated and flight-tested inside NYUAD's netted Kinesis arena with pan-tilt-zoom camera coverage — the programme includes six peer-reviewed outputs plus the live arena video.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "System integration · Co-author",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Anthony Tzes",
        role: "Principal Investigator",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Athanasios Tsoukalas",
        role: "Co-author",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Nikolaos Evangeliou",
        role: "Co-author",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Dengqing Xing",
        role: "Co-author",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Scott Holter",
        role: "Co-author",
        org: "NYU Abu Dhabi · CAIR",
      },
    ],
    facets: {
      domains: ["perception-sensing", "aerial-ground-underwater-robotics"],
      contributions: [
        "system-integration",
        "experimental-development",
        "field-testing",
      ],
      applications: ["counter-uas"],
      platforms: ["uav-platform", "rgbt-ptz-camera"],
      methods: [
        "thermal-imaging",
        "visual-tracking",
        "sensor-fusion",
        "deep-learning",
      ],
      outcomes: ["peer-reviewed-publication", "deployed-prototype"],
    },
    relations: [
      {
        type: "tested-in",
        target: {
          type: "infrastructure",
          slug: "kinesis-ctp-laboratory",
        },
      },
    ],
    explicitRelated: [
      {
        type: "project",
        slug: "nyuad-adac-airport-inspection-drone",
      },
      {
        type: "project",
        slug: "hybrid-ground-air-water-vehicle",
      },
    ],
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "robovis-2020-airborne-ptz-uav-tracking",
        },
      },
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "arxiv-2020-relative-visual-localization",
        },
      },
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "icuas-2021-rgbt-uav-detection",
        },
      },
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "icuas-2021-evader-uav-tracking",
        },
      },
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "icuas-2021-spherical-visual-localization",
        },
      },
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "icuas-2022-siamese-aerial-tracking",
        },
      },
      {
        type: "video",
        title: "RGB-T UAV detection and tracking — live arena demo",
        url: "/videos/projects/drone-detection/drone-detection.mp4",
      },
    ],
    video: {
      provider: "local",
      src: "/videos/projects/drone-detection/drone-detection.mp4",
      title: "RGB-T UAV detection and tracking — live arena demo",
      poster: "/images/projects/drone-detection-poster.jpg",
    },
    images: [
      {
        src: "/images/projects/uav-tracking-field-test.jpg",
        alt: "Researcher steadying a long custom multirotor on a sports field, with a canopy ground station, dish antenna, and tripod sensors set up behind",
        caption: "FIELD TEST — UAV & GROUND STATION",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "isac-rcs-measurement-campaign",
    title: "ISAC Radar Cross-Section Campaign",
    org: "NYU Abu Dhabi · CAIR · NYU WIRELESS · Nokia",
    period: { startYear: 2025, endYear: 2026, label: "2025–2026" },
    cardHook:
      "Co-authored a 25–28 GHz RF electronics campaign for telecommunications channel modeling, measuring radar cross sections of indoor targets in Kinesis with NYU WIRELESS and Nokia for 3GPP Release 19.",
    challenge:
      "Integrated sensing and communication channel models need measured radar cross sections of indoor targets, including robots in motion, rather than simulated values alone.",
    summary:
      "A telecommunications and RF electronics study: 25–28 GHz radar cross-section measurements in the Kinesis arena, with NYU WIRELESS and Nokia. The bistatic RF testbed characterized a mid-size UAV, a robotic arm executing motions, and a quadruped moving laterally and longitudinally. Goodness-of-fit tests found lognormal and gamma distributions the best models for these targets. The results were submitted to 3GPP RAN1 as TDOC R1-2502052 for Release 19 ISAC channel modeling and published in IEEE Transactions on Wireless Communications.",
    contributionSummary:
      "Co-authored the RF electronics study and supported the 25–28 GHz measurement campaign in Kinesis, including the arena and the robotic targets.",
    outcomeSummary:
      "Published in IEEE Transactions on Wireless Communications in 2026, after submission to 3GPP RAN1 as TDOC R1-2502052.",
    highlights: [
      "The testbed covers 25–28 GHz in quasi-monostatic and bistatic geometries, with bistatic angles of 20°, 40°, and 60°, inside the Kinesis arena (5 × 15 × 8.5 m).",
      "Targets include a mid-size UAV, a robotic arm executing motions, and a quadruped performing lateral and longitudinal movements.",
      "Measured radar cross sections fit lognormal and gamma distributions, the forms used in 3GPP ISAC channel-modeling contributions.",
      "NYU Abu Dhabi and Nokia submitted the campaign to 3GPP RAN1 as TDOC R1-2502052 for Release 19 ISAC channel modeling.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Co-author",
        org: "NYU Abu Dhabi · CAIR",
      },
      {
        name: "Marwa Chafii",
        role: "Co-author",
        org: "NYU Abu Dhabi · NYU WIRELESS",
      },
      {
        name: "Ali Waqar Azim",
        role: "Co-author",
        org: "University of Glasgow",
      },
      {
        name: "Ahmad Bazzi",
        role: "Co-author",
        org: "NYU Abu Dhabi · NYU WIRELESS",
      },
      {
        name: "Roberto Bomfin",
        role: "Co-author",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Theodore S. Rappaport",
        role: "Co-author",
        org: "NYU WIRELESS",
      },
      {
        name: "Nokia",
        role: "Industry partner",
      },
    ],
    facets: {
      domains: ["telecommunications-rf-electronics"],
      contributions: ["co-authored", "experimental-development", "supported"],
      outcomes: ["peer-reviewed-publication", "industry-collaboration"],
    },
    relations: [
      {
        type: "tested-in",
        target: {
          type: "infrastructure",
          slug: "kinesis-ctp-laboratory",
        },
      },
    ],
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "twc-2026-indoor-rcs-isac",
        },
      },
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "arxiv-2025-rcs-isac",
        },
      },
      {
        type: "field-post",
        title: "RCS measurement campaign — NYU Abu Dhabi and Nokia",
        url: "https://www.linkedin.com/posts/marwa-chafii-04a94644_happy-to-share-that-our-results-from-the-activity-7368276212558835712-wnKR",
        date: "2025",
        note: "Marwa Chafii’s note on the campaign photos, the 3GPP RAN1 submission R1-2502052, and the NYU Abu Dhabi–Nokia collaboration.",
      },
    ],
    images: [
      {
        src: "/images/projects/kinesis-rcs-bistatic.jpg",
        alt: "Kinesis arena marked with transmitter, target, and receiver positions and the distances between them for bistatic radar cross-section measurements",
        caption: "RCS SETUP — TRANSMITTER AND RECEIVER",
      },
      {
        src: "/images/projects/kinesis-rcs-arm.jpg",
        alt: "Collaborative robot arm on a circular base in the netted Kinesis arena during the 25–28 GHz radar cross-section measurement campaign",
        caption: "RCS CAMPAIGN — ARM IN THE ARENA",
      },
      {
        src: "/images/projects/kinesis-rcs-quadruped.jpg",
        alt: "Yellow quadruped robot standing on a black case in the Kinesis arena, used as a moving target in the radar cross-section measurement campaign",
        caption: "RCS CAMPAIGN — QUADRUPED TARGET",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "hybrid-ground-air-water-vehicle",
    title: "Hybrid Ground–Air–Water Autonomous Vehicle",
    org: "NYU Abu Dhabi · Kinesis Lab / CTP · RISC Lab · ACCESS",
    period: { startYear: 2023, label: "2023" },
    challenge:
      "Most autonomous vehicles are optimized for one medium — consolidating flight, ground driving, and surface-vessel operation into one waterproof platform under 10 kg forces conflicting actuator, buoyancy, and control requirements.",
    summary:
      "A multimodal robotic platform capable of flying, driving, and navigating on water — combining a coaxial six-motor UAV, a tri-omniwheel ground vehicle, and a twin-thruster surface vessel in one waterproof system. Two Pixhawk autopilots, an Intel NUC supervisory computer, ROS/MAVROS coordination, custom motor-control electronics, and waterproof mechanical integration enabled autonomous mode switching across air, land, and water.",
    contributionSummary:
      "Co-built the original hybrid platform, supported its technical integration through Kinesis, and co-authored both IEEE papers on its design and validation.",
    outcomeSummary:
      "The team demonstrated aerial, ground, and water-surface operation, published at ICARA and ICUAS 2023, and received IEEE Spectrum coverage.",
    highlights: [
      "Unified aerial (coaxial hex-motor multirotor), terrestrial (three waterproof Dynamixel-driven omniwheels), and marine (twin underwater thrusters with flotation body) mobility in a single vehicle under 10 kg MTOW.",
      "Dual-autopilot architecture — ArduCopter for flight and ArduRover for land/water — supervised by an Intel NUC running ROS/MAVROS with a state machine that activates only one operating mode at a time.",
      "Custom waterproof electronics enclosure (IP68 characterization), PWM-to-RS485 Dynamixel interface board, and simulation-to-hardware validation spanning vessel operation, water take-off, flight, landing, and omnidirectional ground motion.",
      "Featured by IEEE Spectrum as “This Drone Can Fly, Float, and Roll to Get Around”; later reused as the basis for an NYU Abu Dhabi engineering capstone activity.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Robotic systems integration · Co-author",
        org: "NYU Abu Dhabi · Kinesis Lab / CTP",
      },
      {
        name: "Dimitris Chaikalis",
        role: "Lead author · platform design",
        org: "NYU Abu Dhabi · RISC Lab",
      },
      {
        name: "Nikolaos Evangeliou",
        role: "Co-construction · Co-author",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Muhammed Nabeel",
        role: "Co-construction · Co-author",
        org: "NYU Abu Dhabi · ACCESS",
      },
      {
        name: "Anthony Tzes",
        role: "Principal Investigator",
        org: "NYU Abu Dhabi · CAIR",
      },
    ],
    facets: {
      domains: [
        "aerial-ground-underwater-robotics",
        "sim2real-digital-twins",
        "lab-automation-instrumentation",
      ],
      contributions: [
        "built",
        "system-integration",
        "supported",
        "co-authored",
        "experimental-development",
      ],
      applications: ["environmental-monitoring"],
      platforms: ["uav-platform", "ugv-platform", "usv-platform"],
      outcomes: [
        "peer-reviewed-publication",
        "deployed-prototype",
        "public-demonstration",
      ],
    },
    relations: [
      {
        type: "developed-in",
        target: {
          type: "infrastructure",
          slug: "kinesis-ctp-laboratory",
        },
      },
      {
        type: "published-as",
        target: {
          type: "research-output",
          slug: "icara-2023-amphibious-drone",
        },
      },
      {
        type: "published-as",
        target: {
          type: "research-output",
          slug: "icuas-2023-hybrid-ground-air-water",
        },
      },
    ],
    explicitRelated: [
      {
        type: "project",
        slug: "uav-ugv-hybrid-air-based-path-planning",
      },
      {
        type: "project",
        slug: "rta-dubai-delivery-drone",
      },
      {
        type: "project",
        slug: "rgb-t-uav-detection-tracking",
      },
    ],
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "icara-2023-amphibious-drone",
        },
      },
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "icuas-2023-hybrid-ground-air-water",
        },
      },
      {
        type: "external-article",
        title: "This Drone Can Fly, Float, and Roll to Get Around",
        url: "https://spectrum.ieee.org/climate-change-drone",
        date: "2023",
        note: "IEEE Spectrum feature",
      },
    ],
    link: {
      label: "IEEE Spectrum feature",
      href: "https://spectrum.ieee.org/climate-change-drone",
    },
    status: "published",
  },
  {
    type: "project",
    slug: "palmspector-date-palm-monitoring",
    title: "PalmSpector — Robotic Monitoring for Date Palm Health",
    org: "Imperial College London / Royal College of Art IDE · robotics support from NYU Abu Dhabi",
    period: { startYear: 2020, label: "2020" },
    challenge:
      "Collect consistent sensor data to investigate Red Palm Weevil infestation, which develops inside the trunk and can be difficult to detect visually.",
    summary:
      "PalmSpector was created and led by Khulood Alawadi as her Innovation Design Engineering project at Imperial College London and the Royal College of Art; she is now at NYU Abu Dhabi. I supported the robotics side of the project at NYU Abu Dhabi, helping integrate the Clearpath Husky and develop the plantation-inspection workflow through SLAM and Gazebo/RViz simulation.",
    contributionSummary:
      "Supported Khulood Alawadi’s PalmSpector project on the robotics side, including Clearpath Husky integration, plantation navigation, SLAM, and Gazebo/RViz simulation.",
    outcomeSummary:
      "Field-tested acoustic trunk probing and multimodal data collection, with Husky navigation and simulation supporting further inspection-automation research.",
    highlights: [
      "Built a sensor-fusion field data collector around a single-board computer: thermal and RGB cameras, contact microphone, GPS-RTK, storage, and a Healthy/Infested UI so every tree sample follows the same acquisition protocol for supervised deep learning.",
      "Field-tested acoustic trunk probing and multimodal data capture in date plantations to investigate signs of infestation inside the trunk.",
      "Automated inspection-path navigation on Clearpath Husky using RGB-D sensing and SLAM under palm canopy, with Gazebo/RViz simulation to investigate repeatable navigation between rows.",
    ],
    credits: [
      {
        name: "Khulood Alawadi",
        role: "Project creator · Principal Investigator",
        org: "NYU Abu Dhabi · developed at Imperial College London / Royal College of Art IDE",
      },
      {
        name: "Nikolaos Giakoumidis",
        role: "Robotics support · systems integration",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Imperial College London / Royal College of Art",
        role: "Innovation Design Engineering programme",
      },
      {
        name: "NYU Abu Dhabi",
        role: "Host institution",
      },
    ],
    facets: {
      domains: ["perception-sensing", "aerial-ground-underwater-robotics"],
      contributions: ["built", "system-integration", "field-testing"],
      applications: ["agriculture-monitoring"],
      platforms: ["clearpath-husky", "gazebo"],
      methods: ["sensor-fusion", "slam", "thermal-imaging", "deep-learning"],
      outcomes: ["deployed-prototype"],
    },
    evidence: [
      {
        type: "photograph",
        title: "PalmSpector field collector and plantation corridor",
      },
    ],
    images: [
      {
        src: "/images/projects/palmspector-plantation.jpg",
        alt: "View down a sandy access road through a dense UAE date palm plantation, with rows of textured trunks and arching green fronds forming a canopy tunnel",
        caption: "DATE PLANTATION — FIELD CORRIDOR",
      },
      {
        src: "/images/projects/palmspector-collector.jpg",
        alt: "Handheld acrylic sensor-fusion data collector with blue 3D-printed brackets, Raspberry Pi, GPS dome antenna, and clipped contact microphone resting in dry field grass",
        caption: "DATA COLLECTOR — THERMAL · RGB · AUDIO",
      },
      {
        src: "/images/projects/palmspector-trunk-sensing.jpg",
        alt: "Field operator placing a contact microphone into a crevice of a date palm trunk while holding the clear acrylic PalmSpector data-collector enclosure",
        caption: "TRUNK SENSING — ACOUSTIC RPW PROBE",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "uav-ugv-hybrid-air-based-path-planning",
    title: "UAV-UGV Hybrid with Air-Based Path Planning",
    org: "NYU Abu Dhabi · Interactive Robots and Media Lab (IRML)",
    period: { startYear: 2012, label: "2012" },
    challenge:
      "Give a ground robot an overhead view of obstacles by coordinating it with a lightweight aerial robot.",
    summary:
      "An early heterogeneous robot team pairing a ground vehicle with a quadrotor. The ground vehicle carries and recharges the aerial robot, whose overhead images are stitched into maps for ground-route planning. Developed as an indoor pilot, the work demonstrates how two physically different platforms can combine sensing and mobility capabilities.",
    contributionSummary:
      "Developed the UAV–UGV pilot linking aerial mapping to ground-robot path planning and served as first author of the FIT 2012 paper.",
    outcomeSummary:
      "An indoor pilot and first-author FIT 2012 paper demonstrating aerial-image mapping for ground-robot route planning.",
    highlights: [
      "Aerial frames are stitched into a single overhead map, obstacles are segmented from it, and a slowness map yields a collision-free minimum-time trajectory for the ground robot.",
      "Built as a small-scale indoor pilot standing in for a much larger outdoor system, which made the concept testable and iterable at low cost and risk.",
      "First-author paper at the 10th International Conference on Frontiers of Information Technology; still cited in later aerial terrain mapping work for ground robot navigation.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Lead author",
        org: "Interactive Robots and Media Lab (IRML)",
      },
      {
        name: "Nikolaos Mavridis",
        role: "Principal Investigator",
        org: "Interactive Robots and Media Lab (IRML)",
      },
      {
        name: "Jong Hyun Bak",
        role: "Co-author",
        org: "IRML",
      },
      {
        name: "Juan V. Gómez",
        role: "Co-author",
        org: "IRML",
      },
      {
        name: "A. Llenga",
        role: "Co-author",
        org: "IRML",
      },
    ],
    facets: {
      domains: ["multi-agent-robotic-systems"],
      contributions: ["built", "designed", "co-authored"],
      platforms: ["uav-platform", "ugv-platform"],
      methods: ["air-based-path-planning"],
      outcomes: ["peer-reviewed-publication"],
    },
    explicitRelated: [
      {
        type: "project",
        slug: "hybrid-ground-air-water-vehicle",
      },
    ],
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "fit-2012-uav-ugv-hybrid",
        },
      },
      {
        type: "video",
        title:
          "Pilot-Scale Development of a UAV-UGV Hybrid with Air-Based UGV Path Planning",
        url: "https://www.youtube.com/watch?v=RqdwuKcUPfU",
      },
    ],
    video: {
      provider: "youtube",
      id: "RqdwuKcUPfU",
      title:
        "Pilot-Scale Development of a UAV-UGV Hybrid with Air-Based UGV Path Planning",
    },
    status: "published",
  },
  {
    type: "project",
    slug: "industrial-arm-teleoperation",
    title: "Industrial Arm Teleoperation by Motion Capture",
    org: "Interactive Robots and Media Lab (IRML)",
    period: { startYear: 2010, endYear: 2012, label: "2010–2012" },
    challenge:
      "Industrial manipulators are kinematically unlike human arms, making intuitive real-time teleoperation through natural motion difficult to evaluate.",
    summary:
      "A real-time teleoperation system that transfers an operator’s arm movements to an industrial manipulator using optical motion capture and kinematic retargeting. I built the pipeline connecting human motion to live robot control. Operator trials informed the initial IRIS 2010 work and a subsequent teleoperation-evaluation framework published in the International Journal of Social Robotics.",
    contributionSummary:
      "Built the complete teleoperation pipeline from optical motion capture through kinematic retargeting to live industrial-arm control.",
    outcomeSummary:
      "Demonstrated motion-driven industrial-arm control and contributed to the IRIS 2010 publication and subsequent teleoperation research.",
    highlights: [
      "Full pipeline from optical motion capture through kinematic retargeting to live control of an industrial manipulator.",
      "Operator trials measured how naturally human arm movement transfers to a machine with very different kinematics.",
      "Presented at IRIS 2010; the follow-up evaluation framework appeared in the International Journal of Social Robotics (2012).",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Co-author",
        org: "Interactive Robots and Media Lab (IRML)",
      },
      {
        name: "Nikolaos Mavridis",
        role: "Principal Investigator · Lead author",
        org: "Interactive Robots and Media Lab (IRML)",
      },
      {
        name: "Eduardo L. Machado",
        role: "Co-author",
        org: "IRML",
      },
      {
        name: "Nikos Batalas",
        role: "Co-author",
        org: "IRML",
      },
    ],
    facets: {
      domains: ["teleoperation"],
      contributions: ["built", "experimental-development", "co-authored"],
      applications: ["human-robot-interaction"],
      platforms: ["industrial-manipulator", "vicon-motion-capture"],
      methods: ["kinematic-retargeting"],
      outcomes: ["peer-reviewed-publication"],
    },
    explicitRelated: [
      {
        type: "project",
        slug: "android-telepresence-hardware",
      },
    ],
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "iris-2010-teleoperation",
        },
      },
      {
        type: "video",
        title:
          "Real-time teleoperation of an industrial robotic arm through human arm movement imitation",
        url: "https://www.youtube.com/watch?v=4N16kaWdQTM",
      },
    ],
    video: {
      provider: "youtube",
      id: "4N16kaWdQTM",
      title:
        "Real-time teleoperation of an industrial robotic arm through human arm movement imitation",
    },
    images: [
      {
        src: "/images/projects/teleop-mocap.jpg",
        alt: "Operator in a motion-capture marker suit holding a T-pose for calibration in the IRML lab",
        caption: "MARKER SUIT — OPERATOR CALIBRATION",
        orientation: "portrait",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "android-telepresence-hardware",
    title: "Android Telepresence Robot Hardware",
    org: "Interactive Robots and Media Lab (IRML)",
    period: { startYear: 2010, endYear: 2011, label: "2010–2011" },
    challenge:
      "Maintain and improve the compact servo, wiring, and control systems of an android telepresence research platform.",
    summary:
      "Hands-on electromechanical development and maintenance of IRML’s android telepresence platform. I worked on the servo actuation, wiring, and control hardware responsible for facial expressions and head movement, helping keep the platform available for human–robot interaction experiments.",
    contributionSummary:
      "Maintained and upgraded servo actuation, wiring, and control hardware for the android platform, contributing to the HRI 2011 workshop paper.",
    outcomeSummary:
      "Supported continued use of the android platform in human–robot interaction research and co-authored work on affordable telepresence.",
    highlights: [
      "Maintained and upgraded the dense servo actuation and wiring loom driving the android's facial expressions and head movement.",
      "Bench-level rebuild work spanning skin, servo, and controller maintenance kept the platform running for HRI research.",
      "Contributed to 'Steps towards affordable android telepresence', presented at the HRI 2011 workshop.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Co-author",
        org: "Interactive Robots and Media Lab (IRML)",
      },
      {
        name: "Nikolaos Mavridis",
        role: "Principal Investigator · Lead author",
        org: "Interactive Robots and Media Lab (IRML)",
      },
      {
        name: "Alexandros Tsamakos",
        role: "Co-author",
        org: "IRML",
      },
      {
        name: "Interactive Robots and Media Lab (IRML)",
        role: "Host laboratory",
      },
    ],
    facets: {
      domains: ["embodied-physical-ai"],
      contributions: ["electronics-design", "supported", "built"],
      applications: ["human-robot-interaction"],
      platforms: ["android-telepresence"],
      outcomes: ["peer-reviewed-publication"],
    },
    evidence: [
      {
        type: "publication",
        target: {
          type: "research-output",
          slug: "hri-2011-android-telepresence",
        },
      },
      {
        type: "video",
        title: "IbnSina emotions",
        url: "https://www.youtube.com/watch?v=N_44f5REabo",
      },
    ],
    video: {
      provider: "youtube",
      id: "N_44f5REabo",
      title: "IbnSina emotions",
    },
    images: [
      {
        src: "/images/projects/android-head.jpg",
        alt: "Rear of the android robot head opened for service, revealing the servo actuation and wiring loom",
        caption: "ANDROID HEAD — ACTUATION & WIRING",
        orientation: "portrait",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "ardrone-gps-path-planning-bsc-thesis",
    title: "Automatic UAV Path Finding & GPS Navigation",
    org: "ΤΕΙ Piraeus · Department of Automation (BSc thesis)",
    period: { startYear: 2010, endYear: 2012, label: "2010–2012" },
    challenge:
      "A stock Parrot AR.Drone lacked the sensing and ground-station tooling needed for autonomous GPS waypoint navigation.",
    summary:
      "An autonomous GPS-navigation system developed for my BSc thesis, combining a modified Parrot AR.Drone with an ArduPilot sensing payload and a LabVIEW ground station. I integrated GPS, inertial sensing, compass data, and radio telemetry, and implemented waypoint planning, map display, and closed-loop heading control. The project brought hardware selection, embedded interfaces, software, and flight demonstration together in one working system.",
    contributionSummary:
      "Independently designed, built, and demonstrated the sensing payload, firmware interfaces, and LabVIEW ground station for my BSc thesis on autonomous UAV navigation.",
    outcomeSummary:
      "A working GPS-navigation demonstration and sole-author BSc thesis documenting the integrated hardware, software, and flight-control system.",
    highlights: [
      "Augmented the Parrot AR.Drone with ArduPilot Mega, a u-blox GPS receiver, IMU, HMC5883L 3-axis compass, and XBee RF link for independent navigation telemetry.",
      "LabVIEW ground station splits vehicle control (Parrot SDK over Wi-Fi/UDP) from navigation: live map display via Google Earth/KML, Haversine distance and bearing to a clicked waypoint, and closed-loop heading corrections in flight.",
      "Fourteen-month thesis (Dec 2010–2012) synthesizing automation coursework into a working automatic transport system — from equipment selection and wiring through GCS software and flight demonstration.",
      "Demo reel documents path planning of the quadcopter UAV with GPS using LabVIEW.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "Sole author · Thesis",
        org: "ΤΕΙ Piraeus · Department of Automation",
      },
      {
        name: "Konstantinos Alafodimos",
        role: "Thesis supervisor",
        org: "ΤΕΙ Piraeus · Department of Automation",
      },
      {
        name: "Grigoris Nikolaou",
        role: "Thesis supervisor",
        org: "ΤΕΙ Piraeus · Department of Automation",
      },
      {
        name: "Nikolaos Mavridis",
        role: "Advisor",
        org: "Interactive Robots and Media Lab (IRML)",
      },
    ],
    facets: {
      domains: [
        "aerial-ground-underwater-robotics",
        "electronics-embedded-systems",
      ],
      contributions: [
        "conceived",
        "designed",
        "built",
        "system-integration",
        "field-testing",
      ],
      platforms: ["uav-platform", "labview"],
      methods: ["sensor-fusion"],
      outcomes: ["deployed-prototype", "public-demonstration"],
    },
    evidence: [
      {
        type: "video",
        title: "Ar.Drone UAV Project — GPS path planning with LabVIEW",
        url: "https://www.youtube.com/watch?v=2k9F91N2o1I",
        date: "2011-04-14",
        note: "BSc thesis demonstration reel",
      },
      {
        type: "document",
        title:
          "Αυτόματο σύστημα εύρεσης διαδρομής και πλοήγησης μη επανδρωμένου ιπτάμενου οχήματος",
        url: "/documents/giakoumidis-bsc-thesis-ardrone-gps-navigation-2012.pdf",
        note: "BSc thesis · ΤΕΙ Piraeus · Department of Automation · Athens 2012",
        date: "2012",
      },
    ],
    video: {
      provider: "youtube",
      id: "2k9F91N2o1I",
      title: "Ar.Drone UAV Project — path planning with GPS using LabVIEW",
    },
    link: {
      label: "Download thesis PDF",
      href: "/documents/giakoumidis-bsc-thesis-ardrone-gps-navigation-2012.pdf",
      download: true,
    },
    status: "published",
  },
];
