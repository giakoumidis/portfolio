import type { ProjectRecord } from "@/lib/types";

/**
 * Partner-controlled imagery — publication rights checklist (owner confirm before launch):
 * - Etihad Rail depot / yard / locomotive Spot photos (`etihad-rail-depot-*`, rear-camera field installs)
 * - Abu Dhabi Airports / ADAC facility material (currently video-only via NYUAD public channel)
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
      "This is my current research system for natural-language field inspection. I designed and built a three-layer agent harness — interface, orchestration, and decision-and-skill — joined only by tool calls. Robot and sensor skills are independent Model Context Protocol servers, so a locally served open-weight model chooses actions from tool descriptions without fine-tuning. Every call is checked before it reaches the Boston Dynamics Spot SDK, and the model cannot clear an operator e-stop. The working stack accepts voice and text, keeps session memory, and drives Spot through navigation, vision, and thermal inspection skills. The paper is under review at the Journal of Field Robotics.",
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
        title: "Spot CAM panorama during an inspection pass",
      },
      {
        type: "photograph",
        title: "Spot PTZ view down an inspection aisle",
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
        alt: "Spot's panoramic camera looking down a server aisle, with the robot's sensor arm in the foreground and a tripod camera ahead",
        caption: "SPOT CAM — INSPECTION PASS",
      },
      {
        src: "/images/projects/agentic-spot-aisle.jpg",
        alt: "Spot PTZ view down a server aisle with inspection objects on the raised floor",
        caption: "SPOT PTZ — AISLE VIEW",
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
        name: "Etihad Rail",
        role: "Industry partner",
      },
      {
        name: "Center for Artificial Intelligence and Robotics (CAIR)",
        role: "Research partner",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Anthony Tzes",
        role: "Principal Investigator",
        org: "NYU Abu Dhabi · CAIR",
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
    ],
    video: {
      provider: "instagram",
      url: "https://www.instagram.com/reel/DByqr6-Rndg/",
      title: "Etihad Rail × NYUAD AI and robotics collaboration",
      poster: "/images/projects/etihad-rail-nyuad.jpg",
    },
    // PENDING PUBLICATION RIGHTS — depot/yard stills omitted until Etihad Rail permission confirmed.
    // Files retained on disk: etihad-rail-depot-spot-{train,tracks,yard}.jpg
    images: [
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
      poster: "/images/awards/rta-2021/delivery-drone-nyuad.jpg",
    },
    images: [
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
    org: "NYU Abu Dhabi · SMART Lab with Etihad Rail",
    period: { startYear: 2024, label: "2024" },
    cardHook:
      "A train-mounted LiDAR and camera pilot for Etihad Rail, collecting corridor data to investigate 3D environmental monitoring and support future maintenance planning under UAE field conditions.",
    challenge:
      "Collect rail-corridor data to investigate sand movement, water accumulation, and vegetation encroachment under UAE field conditions.",
    summary:
      "A field pilot within the NYUAD–Etihad Rail collaboration, using rearward-facing LiDAR and cameras to capture the rail corridor. I supported the proposal and coordinated industry engagement and payload installation. The wider research concept uses these observations to reconstruct the track-side environment in 3D and investigate environmental change for maintenance planning.",
    contributionSummary:
      "Coordinated industry engagement and installation of the train-mounted LiDAR and camera payload, supporting the proposal and field sensing pilot.",
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
        role: "Industry engagement · field sensing",
        org: "NYU Abu Dhabi",
      },
      {
        name: "Etihad Rail",
        role: "Industry partner",
      },
      {
        name: "Borja García de Soto",
        role: "Principal Investigator",
        org: "NYU Abu Dhabi · SMART Lab",
      },
      {
        name: "SMART Lab",
        role: "Research partner",
        org: "NYU Abu Dhabi",
      },
    ],
    facets: {
      domains: [
        "perception-sensing",
        "sim2real-digital-twins",
        "industry-engagement",
      ],
      contributions: ["supported", "field-testing", "commercialized"],
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
      "A cooperative robotic system for 3D digitization and data collection in construction environments. One robot explores and maps the space, coordinating with another to address obstacles and drawing on human teleoperation when needed. The work investigates how complementary robot capabilities and human assistance can keep a data-collection task progressing.",
    contributionSummary:
      "Contributed to the cooperative exploration system and co-authored the Journal of Field Robotics paper on construction-site data collection.",
    // PENDING OWNER REVIEW
    outcomeSummary:
      "Demonstrated cooperative exploration with human assistance for construction data collection; published in the Journal of Field Robotics in 2024.",
    highlights: [
      "Demonstrates autonomous exploration paired with agent-to-agent coordination so the team can keep mapping after an obstacle blocks the path.",
      "Human-in-the-loop teleoperation backs the autonomous stack when remote support is required to finish the mission.",
      "Published in the Journal of Field Robotics as an application of multiagent robotic systems and exploration algorithms to construction-site data collection.",
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
    ],
    facets: {
      domains: ["multi-agent-robotic-systems"],
      contributions: ["experimental-development", "co-authored"],
      applications: ["construction"],
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
    ],
    video: {
      provider: "youtube",
      id: "i-83iW9gd5Q",
      title: "Multi-agent robotic system: An example for data collection",
    },
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
        src: "/images/projects/ribbon-curler-sample-layout.jpg",
        alt: "Laboratory workbench covered with pink ribbon curl samples arranged by test condition under a task light",
        caption: "LAB BENCH — FULL SAMPLE CAMPAIGN",
      },
      {
        src: "/images/projects/ribbon-curler-curl-conditions.jpg",
        alt: "Drawer tray of pink ribbon curls with handwritten notes for weight, speed, width, and fixture geometry",
        caption: "CURL SAMPLES — BY TEST CONDITION",
      },
      {
        src: "/images/projects/ribbon-curler-mounting-angles.jpg",
        alt: "Annotated sheets comparing left and right blade mounting angles with corresponding ribbon curl samples",
        caption: "MOUNTING ANGLE — LEFT VS RIGHT",
        orientation: "portrait",
      },
      {
        src: "/images/projects/ribbon-curler-speed-response.jpg",
        alt: "Ribbon curl samples arranged by pull speed from 1 mm/s to 150 mm/s showing increasing spiral radius",
        caption: "SPEED SWEEP — SPIRAL RESPONSE",
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
        "aerial-ground-underwater-robotics",
        "industry-engagement",
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
    status: "needs-review",
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
      "Flagship RGB-T detection and tracking demo integrated and flight-tested inside NYUAD's netted Kinesis arena with pan-tilt-zoom camera coverage — evidence spans six peer-reviewed outputs plus the live arena video.",
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
