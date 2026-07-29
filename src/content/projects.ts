import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "etihad-rail-nyuad-collaboration",
    title: "Etihad Rail × NYUAD AI & Robotics Collaboration",
    domainId: "industry-engagement",
    domainLabel: "Industry Engagement",
    org: "NYU Abu Dhabi · CAIR with Etihad Rail",
    period: "2024",
    summary:
      "Industry engagement with Etihad Rail to explore integrating artificial intelligence and robotics into rail operations — translating NYUAD research capabilities into collaborative experiments aimed at efficiency, sustainability, and next-generation rail transport standards.",
    highlights: [
      "Featured in Etihad Rail's public announcement of the collaboration with New York University Abu Dhabi on AI and robotics for rail operations.",
      "Aligns with CAIR's commercialization track: stakeholder engagement, lab and site visits, and industry-facing translation of autonomous systems research.",
      "Part of a broader external engagement model spanning infrastructure partners across the UAE transport and logistics ecosystem.",
    ],
    tags: [
      "Industry engagement",
      "Rail infrastructure",
      "AI & robotics",
      "Research translation",
      "Strategic collaboration",
    ],
    video: {
      provider: "instagram",
      url: "https://www.instagram.com/reel/DByqr6-Rndg/",
      title: "Etihad Rail × NYUAD AI and robotics collaboration",
      poster: "/images/projects/etihad-rail-nyuad.jpg",
    },
  },
  {
    id: "multiagent-construction-exploration",
    title: "Multi-Agent Exploration for Construction Data Collection",
    domainId: "multi-agent-robotic-systems",
    domainLabel: "Multi-Agent Systems",
    org: "NYU Abu Dhabi · SMART Lab",
    period: "2024",
    summary:
      "Cooperative multi-agent robotic system for 3D digitization and data collection in construction environments — one agent explores and maps the space while coordinating with another to clear obstacles, with a human operator in the loop via remote access when needed.",
    highlights: [
      "Demonstrates autonomous exploration paired with agent-to-agent coordination so the team can keep mapping after an obstacle blocks the path.",
      "Human-in-the-loop teleoperation backs the autonomous stack when remote support is required to finish the mission.",
      "Published in the Journal of Field Robotics as an application of multiagent robotic systems and exploration algorithms to construction-site data collection.",
    ],
    tags: [
      "Multi-agent systems",
      "Exploration algorithms",
      "Construction robotics",
      "3D digitization",
      "Human-in-the-loop",
    ],
    video: {
      provider: "youtube",
      id: "i-83iW9gd5Q",
      title: "Multi-agent robotic system: An example for data collection",
    },
    paper: {
      title:
        "Multiagent robotic systems and exploration algorithms: Applications for data collection in construction sites",
      venue: "Journal of Field Robotics 41 (4), 1187–1203",
      year: "2024",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:MXK_kJrjxJIC",
    },
  },
  {
    id: "eye-gaze-wheelchair",
    title: "Eye-Gaze-Controlled Wheelchair",
    domainId: "perception-sensing",
    domainLabel: "Assistive Robotics",
    org: "NYU Abu Dhabi · with University of Ottawa",
    period: "2013–2016",
    summary:
      "A wheelchair navigation system driven entirely by eye gaze, built for people who have lost voluntary motor control — combining gaze tracking, obstacle sensing, and shared autonomy so the chair can navigate unknown environments safely. Validated in a real-world case study with a person living with ALS.",
    highlights: [
      "Gaze input is fused with onboard sensing and assisted-control logic, so a single modality — where the user looks — becomes a safe, complete driving interface.",
      "Field-tested beyond the lab: the system was deployed and evaluated in the home of a person with ALS, navigating environments it had never seen.",
      "Published in IEEE Access; the most-cited work in my publication record (170+ citations).",
    ],
    tags: [
      "Assistive robotics",
      "Eye-gaze tracking",
      "Shared autonomy",
      "Obstacle avoidance",
      "Human-robot interaction",
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
    paper: {
      title:
        "A novel eye-gaze-controlled wheelchair system for navigating unknown environments: case study with a person with ALS",
      venue: "IEEE Access 4, 558–573",
      year: "2016",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:UeHWp8X0CEIC",
    },
  },
  {
    id: "hardware-security-asic-validation-platform",
    title: "Hardware-Security ASIC Validation Platform",
    domainId: "lab-automation-instrumentation",
    domainLabel: "Advanced Manufacturing Support",
    org: "NYU Abu Dhabi · with Ozgur Sinanoglu's hardware-security group",
    period: "2017",
    summary:
      "Led PCB development and hardware bring-up of a custom test platform for a 65 nm ARM Cortex-M0 logic-locked ASIC — UART programming, key activation, and silicon validation for ACM CCS 2017.",
    highlights: [
      "Eagle schematic, two-layer layout, and in-house fabrication on NYUAD Core Technology Platform equipment — two revisions to a reliable UART/DIP-switch test rig.",
      "Validated locked processor silicon: correct execution with the valid key, failure with an incorrect one.",
    ],
    tags: ["Hardware security", "ASIC validation", "PCB design", "Logic locking"],
    images: [
      {
        src: "/images/projects/sfll-chip-board-close.jpg",
        alt: "Close-up of the populated chip-test PCB showing the SOP-28 test socket, DIP switch block, and illuminated seven-segment display",
        caption: "SOP-28 SOCKET — LOCKED PROCESSOR UNDER TEST",
      },
    ],
    paper: {
      title: "Provably-Secure Logic Locking: From Theory to Practice",
      venue:
        "Proceedings of the 2017 ACM SIGSAC Conference on Computer and Communications Security (CCS)",
      year: "2017",
      link: "https://dl.acm.org/doi/10.1145/3133956.3133985",
    },
  },
  {
    id: "nyuad-adac-airport-inspection-drone",
    title: "Drone Inspection of Abu Dhabi International Airport",
    domainId: "aerial-ground-underwater-robotics",
    domainLabel: "Aerial Robotics",
    org: "NYU Abu Dhabi · with Abu Dhabi Airports (ADAC)",
    period: "2019",
    summary:
      "Collaboration between NYU Abu Dhabi and Abu Dhabi Airports to protect infrastructure and keep workers safe at the city's new international airport — engineering a drone equipped with robotic arms to inspect the terminal's aerodynamic roof, which is not safe for humans to access.",
    highlights: [
      "Aerial manipulation for infrastructure inspection: the drone's robotic arms take over contact inspection of the roof structure, \"minimizing the risks and hazards of using humans in difficult tasks\" (Prof. Anthony Tzes, NYUAD).",
      "Targets the aerodynamic roof design of the airport terminal, whose geometry makes conventional human inspection hazardous.",
      "Featured by NYU Abu Dhabi as part of its industry collaboration with Abu Dhabi Airports on maintaining safety standards at Abu Dhabi International Airport.",
    ],
    tags: [
      "Aerial manipulation",
      "Drone inspection",
      "Infrastructure safety",
      "UAV robotic arms",
      "Industry collaboration",
    ],
    video: {
      provider: "youtube",
      id: "iD51n8OFUbg",
      title:
        "NYUAD and ADAC use drone technology to maintain safety standards at Abu Dhabi International Airport",
    },
  },
  {
    id: "rgb-t-uav-detection-tracking",
    title: "RGB-T UAV Detection & Tracking",
    domainId: "perception-sensing",
    domainLabel: "Perception & Sensing",
    org: "NYU Abu Dhabi · CAIR",
    period: "2020–2022",
    summary:
      "Ground-based perception stack for detecting and tracking small unmanned aerial vehicles in real time — fusing visible and thermal (RGB-t) imagery through a pan-tilt-zoom camera so a target drone stays locked even as it moves across the Kinesis arena.",
    highlights: [
      "Computationally efficient RGB-t pipeline: thermal cues help pick out UAVs against cluttered backgrounds while RGB keeps box refinement and tracking precise at frame rate.",
      "Integrated detection and tracking in one system, validated on live flights inside NYUAD's netted drone arena with PTZ camera coverage.",
      "Research thread spans six peer-reviewed papers — from PTZ visual tracking and deep-learning evader pursuit to Siamese aerial trackers and cooperative visual localization.",
    ],
    tags: [
      "UAV detection",
      "Thermal imaging",
      "Visual tracking",
      "Pan-tilt-zoom camera",
      "Counter-UAS",
    ],
    video: {
      provider: "local",
      src: "/videos/projects/drone-detection/drone-detection.mp4",
      title: "RGB-T UAV detection and tracking — live arena demo",
      poster: "/images/projects/drone-detection-poster.jpg",
    },
    paper: {
      title: "Computationally efficient RGB-t UAV detection and tracking system",
      venue:
        "2021 International Conference on Unmanned Aircraft Systems (ICUAS), 1410–1415",
      year: "2021",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:Se3iqnhoufwC",
    },
    relatedPapers: [
      {
        title: "Deep learning assisted visual tracking of evader-UAV",
        venue:
          "2021 International Conference on Unmanned Aircraft Systems (ICUAS), 252-257",
        year: "2021",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:roLk4NBRz8UC",
      },
      {
        title: "Airborne Visual Tracking of UAVs with a Pan-Tilt-Zoom Camera",
        venue: "ROBOVIS, 90-97",
        year: "2020",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:_FxGoFyzp5QC",
      },
      {
        title:
          "Siamese adaptive transformer network for real-time aerial tracking",
        venue:
          "2022 International Conference on Unmanned Aircraft Systems (ICUAS), 570-575",
        year: "2022",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:0EnyYjriUFMC",
      },
      {
        title:
          "Relative Spherical-Visual Localization for Cooperative Unmanned Aerial Systems",
        venue:
          "2021 International Conference on Unmanned Aircraft Systems (ICUAS), 371-376",
        year: "2021",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:LkGwnXOMwfcC",
      },
      {
        title: "Relative visual localization for unmanned aerial systems",
        venue: "arXiv preprint arXiv:2003.01954",
        year: "2020",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:WF5omc3nYNoC",
      },
    ],
  },
  {
    id: "palmspector-date-palm-monitoring",
    title: "PalmSpector — Robotic Monitoring for Date Palm Health",
    domainId: "perception-sensing",
    domainLabel: "Field Robotics",
    org: "NYU Abu Dhabi · with Imperial College London IDE",
    period: "2020",
    summary:
      "Integrated robotic monitoring system for early Red Palm Weevil detection at the scale of UAE date plantations — fusing acoustic, thermal, and RGB sensing so hidden larval infestations can be flagged before trunk collapse, then handing farmers targeted trees for inspection rather than blanket pesticide treatment.",
    highlights: [
      "Built a sensor-fusion field data collector around a single-board computer: thermal and RGB cameras, contact microphone, GPS-RTK, storage, and a Healthy/Infested UI so every tree sample follows the same acquisition protocol for supervised deep learning.",
      "Field-validated acoustic trunk probing and multimodal capture across date plantations, addressing the core challenge that RPW larvae feed internally and leave almost no external symptoms until it is too late to save the tree.",
      "Automated the inspection path on a Clearpath Husky UGV platform — SLAM with RGB-D sensing under palm canopy, plus Gazebo/RViz simulation of row navigation — so the same sensing stack can scale from handheld surveys to thousands of trees.",
    ],
    tags: [
      "Field robotics",
      "Sensor fusion",
      "Red Palm Weevil",
      "SLAM",
      "Date palm inspection",
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
  },
  {
    id: "uav-ugv-hybrid-air-based-path-planning",
    title: "UAV-UGV Hybrid with Air-Based Path Planning",
    domainId: "multi-agent-robotic-systems",
    domainLabel: "Multi-Agent Systems",
    org: "NYU Abu Dhabi · Interactive Robots and Media Lab (IRML)",
    period: "2012",
    summary:
      "Heterogeneous symbiotic robot pair treated as one entity with separable bodies: the ground vehicle carries and recharges a lightweight quad-rotor, while the quad-rotor acts as the pair's detachable long-range vision system, turning top-down aerial views into the maps that plan the ground vehicle's route.",
    highlights: [
      "Aerial frames are stitched into a single overhead map, obstacles are segmented from it, and a slowness map yields a collision-free minimum-time trajectory for the ground robot.",
      "Built as a small-scale indoor pilot standing in for a much larger outdoor system, which made the concept testable and iterable at low cost and risk.",
      "First-author paper at the 10th International Conference on Frontiers of Information Technology; still cited in later aerial terrain mapping work for ground robot navigation.",
    ],
    tags: [
      "UAV-UGV hybrid",
      "Air-based path planning",
      "Aerial mapping",
      "Heterogeneous multi-robot",
      "Quad-rotor",
    ],
    video: {
      provider: "youtube",
      id: "RqdwuKcUPfU",
      title:
        "Pilot-Scale Development of a UAV-UGV Hybrid with Air-Based UGV Path Planning",
    },
    paper: {
      title:
        "Pilot-scale development of a UAV-UGV hybrid with air-based UGV path planning",
      venue:
        "2012 10th International Conference on Frontiers of Information Technology, 204–208",
      year: "2012",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:2osOgNQ5qMEC",
    },
  },
  {
    id: "industrial-arm-teleoperation",
    title: "Industrial Arm Teleoperation by Motion Capture",
    domainId: "aerial-ground-underwater-robotics",
    domainLabel: "Teleoperation",
    org: "Interactive Robots and Media Lab (IRML)",
    period: "2010–2012",
    summary:
      "Real-time teleoperation of an industrial robotic arm through natural human arm imitation: the operator wears a motion-capture marker suit, and the arm reproduces their movement live. The work grew into a general evaluation framework for teleoperation quality, published in the International Journal of Social Robotics.",
    highlights: [
      "Full pipeline from optical motion capture through kinematic retargeting to live control of an industrial manipulator.",
      "Operator trials measured how naturally human arm movement transfers to a machine with very different kinematics.",
      "Presented at IRIS 2010; the follow-up evaluation framework appeared in the International Journal of Social Robotics (2012).",
    ],
    tags: [
      "Teleoperation",
      "Motion capture",
      "Industrial manipulator",
      "Kinematic retargeting",
      "Human-robot interaction",
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
    paper: {
      title:
        "Real-time teleoperation of an industrial robotic arm through human arm movement imitation",
      venue:
        "Proceedings of the International Symposium on Robotics and Intelligent Sensors (IRIS)",
      year: "2010",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:W7OEmFMy1HYC",
    },
  },
  {
    id: "android-telepresence-hardware",
    title: "Android Telepresence Robot Hardware",
    domainId: "embodied-physical-ai",
    domainLabel: "Humanoid Robotics",
    org: "Interactive Robots and Media Lab (IRML)",
    period: "2010–2011",
    summary:
      "Hands-on electromechanical work on IRML's android telepresence platform — servicing the actuation, wiring, and control hardware behind a human-like robot head and torso, in pursuit of android telepresence at an affordable price point.",
    highlights: [
      "Maintained and upgraded the dense servo actuation and wiring loom driving the android's facial expressions and head movement.",
      "Bench-level rebuild work spanning skin, servo, and controller maintenance kept the platform running for HRI research.",
      "Contributed to 'Steps towards affordable android telepresence', presented at the HRI 2011 workshop.",
    ],
    tags: [
      "Humanoid robotics",
      "Android hardware",
      "Servo actuation",
      "Electromechanical design",
      "Telepresence",
    ],
    images: [
      {
        src: "/images/projects/android-head.jpg",
        alt: "Rear of the android robot head opened for service, revealing the servo actuation and wiring loom",
        caption: "ANDROID HEAD — ACTUATION & WIRING",
        orientation: "portrait",
      },
    ],
    paper: {
      title: "Steps towards affordable android telepresence",
      venue: "HRI 2011 Workshop",
      year: "2011",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:qjMakFHDy7sC",
    },
  },
];
