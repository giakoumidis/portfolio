import type { ProjectRecord } from "@/lib/types";

export const workRecords: ProjectRecord[] = [
  {
    type: "project",
    slug: "etihad-rail-nyuad-collaboration",
    title: "Etihad Rail × NYUAD AI & Robotics Collaboration",
    org: "NYU Abu Dhabi · CAIR with Etihad Rail",
    period: { startYear: 2024, label: "2024" },
    summary:
      "Industry engagement with Etihad Rail to explore integrating artificial intelligence and robotics into rail operations — translating NYUAD research capabilities into collaborative experiments aimed at efficiency, sustainability, and next-generation rail transport standards.",
    contributionSummary:
      "Led industry-facing translation of CAIR autonomous-systems research into a strategic collaboration with Etihad Rail — stakeholder engagement, lab and site visits, and public demonstration of partnership intent.",
    highlights: [
      "Featured in Etihad Rail's public announcement of the collaboration with New York University Abu Dhabi on AI and robotics for rail operations.",
      "Aligns with CAIR's commercialization track: stakeholder engagement, lab and site visits, and industry-facing translation of autonomous systems research.",
      "Part of a broader external engagement model spanning infrastructure partners across the UAE transport and logistics ecosystem.",
    ],
    credits: [
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
      domains: ["industry-engagement"],
      contributions: ["commercialized", "led"],
      applications: ["rail-transport"],
      outcomes: ["industry-collaboration", "public-demonstration"],
    },
    evidence: [
      {
        type: "video",
        title: "Etihad Rail × NYUAD AI and robotics collaboration",
        url: "https://www.instagram.com/reel/DByqr6-Rndg/",
      },
    ],
    video: {
      provider: "instagram",
      url: "https://www.instagram.com/reel/DByqr6-Rndg/",
      title: "Etihad Rail × NYUAD AI and robotics collaboration",
      poster: "/images/projects/etihad-rail-nyuad.jpg",
    },
    status: "published",
  },
  {
    type: "project",
    slug: "multiagent-construction-exploration",
    title: "Multi-Agent Exploration for Construction Data Collection",
    org: "NYU Abu Dhabi · SMART Lab",
    period: { startYear: 2024, label: "2024" },
    summary:
      "Cooperative multi-agent robotic system for 3D digitization and data collection in construction environments — one agent explores and maps the space while coordinating with another to clear obstacles, with a human operator in the loop via remote access when needed.",
    contributionSummary:
      "Contributed to the multi-agent exploration system and its Journal of Field Robotics publication — cooperative mapping with human-in-the-loop teleoperation for construction-site data collection.",
    highlights: [
      "Demonstrates autonomous exploration paired with agent-to-agent coordination so the team can keep mapping after an obstacle blocks the path.",
      "Human-in-the-loop teleoperation backs the autonomous stack when remote support is required to finish the mission.",
      "Published in the Journal of Field Robotics as an application of multiagent robotic systems and exploration algorithms to construction-site data collection.",
    ],
    credits: [
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
    summary:
      "A wheelchair navigation system driven entirely by eye gaze, built for people who have lost voluntary motor control — combining gaze tracking, obstacle sensing, and shared autonomy so the chair can navigate unknown environments safely. Validated in a real-world case study with a person living with ALS.",
    contributionSummary:
      "Designed and field-validated a gaze-driven wheelchair navigation stack with shared autonomy — the most-cited work in the publication record (170+ citations).",
    highlights: [
      "Gaze input is fused with onboard sensing and assisted-control logic, so a single modality — where the user looks — becomes a safe, complete driving interface.",
      "Field-tested beyond the lab: the system was deployed and evaluated in the home of a person with ALS, navigating environments it had never seen.",
      "Published in IEEE Access; the most-cited work in my publication record (170+ citations).",
    ],
    credits: [
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
    slug: "hardware-security-asic-validation-platform",
    title: "Hardware-Security ASIC Validation Platform",
    org: "NYU Abu Dhabi · with Ozgur Sinanoglu's hardware-security group",
    period: { startYear: 2017, label: "2017" },
    summary:
      "Led PCB development and hardware bring-up of a custom test platform for a 65 nm ARM Cortex-M0 logic-locked ASIC — UART programming, key activation, and silicon validation for ACM CCS 2017.",
    contributionSummary:
      "Led electronics design and fabrication of the ASIC validation PCB — schematic, layout, in-house fabrication, and silicon bring-up for the ACM CCS 2017 logic-locking work.",
    highlights: [
      "Eagle schematic, two-layer layout, and in-house fabrication on NYUAD Core Technology Platform equipment — two revisions to a reliable UART/DIP-switch test rig.",
      "Validated locked processor silicon: correct execution with the valid key, failure with an incorrect one.",
    ],
    credits: [
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
    status: "needs-review",
  },
  {
    type: "project",
    slug: "nyuad-adac-airport-inspection-drone",
    title: "Drone Inspection of Abu Dhabi International Airport",
    org: "NYU Abu Dhabi · with Abu Dhabi Airports (ADAC)",
    period: { startYear: 2019, label: "2019" },
    summary:
      "Collaboration between NYU Abu Dhabi and Abu Dhabi Airports to protect infrastructure and keep workers safe at the city's new international airport — engineering a drone equipped with robotic arms to inspect the terminal's aerodynamic roof, which is not safe for humans to access.",
    contributionSummary:
      "Supported the aerial-manipulation inspection collaboration with Abu Dhabi Airports — drone-based contact inspection of the terminal roof where human access is hazardous.",
    highlights: [
      "Aerial manipulation for infrastructure inspection: the drone's robotic arms take over contact inspection of the roof structure, \"minimizing the risks and hazards of using humans in difficult tasks\" (Prof. Anthony Tzes, NYUAD).",
      "Targets the aerodynamic roof design of the airport terminal, whose geometry makes conventional human inspection hazardous.",
      "Featured by NYU Abu Dhabi as part of its industry collaboration with Abu Dhabi Airports on maintaining safety standards at Abu Dhabi International Airport.",
    ],
    credits: [
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
    summary:
      "Multi-paper research thread on detecting, tracking, and relatively localizing UAVs in real time — from airborne PTZ visual lock and cooperative spherical localization through RGB-thermal fusion and deep-learning / Siamese aerial trackers, validated on live flights in the Kinesis arena.",
    contributionSummary:
      "System integration and experimental development across the CAIR UAV perception thread — arena instrumentation, RGB-T PTZ pipelines, and field validation that underpins six peer-reviewed papers (2020–2022).",
    highlights: [
      "Thread opens with airborne PTZ visual tracking and relative visual localization for cooperative UAS, then layers computationally efficient RGB-thermal detection so thermal cues pull small drones out of clutter while RGB refines boxes at frame rate.",
      "Deep-learning evader pursuit and a Siamese adaptive transformer tracker extend the same arena stack to agile targets; relative spherical-visual localization closes the loop for multi-UAV cooperative localization.",
      "Flagship RGB-T detection and tracking demo integrated and flight-tested inside NYUAD's netted Kinesis arena with pan-tilt-zoom camera coverage — evidence spans six peer-reviewed outputs plus the live arena video.",
    ],
    credits: [
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
    slug: "palmspector-date-palm-monitoring",
    title: "PalmSpector — Robotic Monitoring for Date Palm Health",
    org: "NYU Abu Dhabi · with Imperial College London IDE",
    period: { startYear: 2020, label: "2020" },
    summary:
      "Integrated robotic monitoring system for early Red Palm Weevil detection at the scale of UAE date plantations — fusing acoustic, thermal, and RGB sensing so hidden larval infestations can be flagged before trunk collapse, then handing farmers targeted trees for inspection rather than blanket pesticide treatment.",
    contributionSummary:
      "Built the multimodal field data collector and automated the inspection path on Clearpath Husky — sensor fusion, SLAM under canopy, and Gazebo simulation for plantation-scale monitoring.",
    highlights: [
      "Built a sensor-fusion field data collector around a single-board computer: thermal and RGB cameras, contact microphone, GPS-RTK, storage, and a Healthy/Infested UI so every tree sample follows the same acquisition protocol for supervised deep learning.",
      "Field-validated acoustic trunk probing and multimodal capture across date plantations, addressing the core challenge that RPW larvae feed internally and leave almost no external symptoms until it is too late to save the tree.",
      "Automated the inspection path on a Clearpath Husky UGV platform — SLAM with RGB-D sensing under palm canopy, plus Gazebo/RViz simulation of row navigation — so the same sensing stack can scale from handheld surveys to thousands of trees.",
    ],
    credits: [
      {
        name: "Imperial College London · Innovation Design Engineering (IDE)",
        role: "Research partner",
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
    summary:
      "Heterogeneous symbiotic robot pair treated as one entity with separable bodies: the ground vehicle carries and recharges a lightweight quad-rotor, while the quad-rotor acts as the pair's detachable long-range vision system, turning top-down aerial views into the maps that plan the ground vehicle's route.",
    contributionSummary:
      "First-author development of the UAV–UGV hybrid pilot: aerial mapping into ground-robot path planning, published at FIT 2012.",
    highlights: [
      "Aerial frames are stitched into a single overhead map, obstacles are segmented from it, and a slowness map yields a collision-free minimum-time trajectory for the ground robot.",
      "Built as a small-scale indoor pilot standing in for a much larger outdoor system, which made the concept testable and iterable at low cost and risk.",
      "First-author paper at the 10th International Conference on Frontiers of Information Technology; still cited in later aerial terrain mapping work for ground robot navigation.",
    ],
    credits: [
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
    summary:
      "Real-time teleoperation of an industrial robotic arm through natural human arm imitation: the operator wears a motion-capture marker suit, and the arm reproduces their movement live. The work grew into a general evaluation framework for teleoperation quality, published in the International Journal of Social Robotics.",
    contributionSummary:
      "Built the motion-capture teleoperation pipeline from optical tracking through kinematic retargeting to live industrial-arm control; published at IRIS 2010.",
    highlights: [
      "Full pipeline from optical motion capture through kinematic retargeting to live control of an industrial manipulator.",
      "Operator trials measured how naturally human arm movement transfers to a machine with very different kinematics.",
      "Presented at IRIS 2010; the follow-up evaluation framework appeared in the International Journal of Social Robotics (2012).",
    ],
    credits: [
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
    summary:
      "Hands-on electromechanical work on IRML's android telepresence platform — servicing the actuation, wiring, and control hardware behind a human-like robot head and torso, in pursuit of android telepresence at an affordable price point.",
    contributionSummary:
      "Maintained and upgraded the android telepresence actuation and wiring hardware — electromechanical support contributing to the HRI 2011 workshop paper.",
    highlights: [
      "Maintained and upgraded the dense servo actuation and wiring loom driving the android's facial expressions and head movement.",
      "Bench-level rebuild work spanning skin, servo, and controller maintenance kept the platform running for HRI research.",
      "Contributed to 'Steps towards affordable android telepresence', presented at the HRI 2011 workshop.",
    ],
    credits: [
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
    ],
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
];
