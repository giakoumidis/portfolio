import type { ProjectRecord } from "@/lib/types";

export const workRecords: ProjectRecord[] = [
  {
    type: "project",
    slug: "etihad-rail-nyuad-collaboration",
    title: "Etihad Rail × NYUAD AI & Robotics Collaboration",
    org: "NYU Abu Dhabi · CAIR with Etihad Rail",
    period: { startYear: 2024, label: "2024" },
    challenge:
      "Etihad Rail needed a credible path to integrate AI and robotics into depot operations without treating university research as a one-off demo.",
    summary:
      "Industry engagement with Etihad Rail to explore integrating artificial intelligence and robotics into rail operations — including depot inspection trials where I operated Boston Dynamics Spot to collect multimodal data around locomotives for downstream analysis and predictive maintenance — translating NYUAD research capabilities into collaborative experiments aimed at efficiency, sustainability, and next-generation rail transport standards.",
    contributionSummary:
      "Led industry-facing translation of CAIR autonomous-systems research into a strategic collaboration with Etihad Rail — stakeholder engagement, lab visits, and depot inspection with Spot, which I operated to gather multimodal locomotive data for analysis and predictive maintenance, plus public demonstration of partnership intent.",
    outcomeSummary:
      "Established a public industry collaboration featuring depot Spot inspections that collect multimodal locomotive data for predictive maintenance analysis.",
    highlights: [
      "Featured in Etihad Rail's public announcement of the collaboration with New York University Abu Dhabi on AI and robotics for rail operations.",
      "At the Etihad Rail depot I used Spot for locomotive inspection — collecting multimodal sensor data that feeds further analysis aimed at predictive maintenance rather than one-off visual checks alone.",
      "Aligns with CAIR's commercialization track: stakeholder engagement, lab and site visits, and industry-facing translation of autonomous systems research.",
      "Part of a broader external engagement model spanning infrastructure partners across the UAE transport and logistics ecosystem.",
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
    images: [
      {
        src: "/images/projects/etihad-rail-depot-spot-train.jpg",
        alt: "Spot beside an Etihad Rail locomotive inside the depot hangar, collecting multimodal inspection data for predictive maintenance",
        caption: "DEPOT — MULTIMODAL LOCOMOTIVE SCAN",
      },
      {
        src: "/images/projects/etihad-rail-depot-spot-tracks.jpg",
        alt: "Spot on railway tracks facing the Etihad Rail depot, gathering multimodal data for locomotive predictive maintenance analysis",
        caption: "TRACKSIDE — DATA FOR PREDICTIVE MAINT.",
      },
      {
        src: "/images/projects/etihad-rail-depot-spot-yard.jpg",
        alt: "Spot in the Etihad Rail yard between freight tracks, supporting multimodal data collection for further analysis and predictive maintenance",
        caption: "YARD — SPOT MULTIMODAL COLLECTION",
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
    // PENDING OWNER REVIEW
    challenge:
      "The RTA Dubai World Challenge required a competition-ready delivery octarotor that could fly and demonstrate under real autonomous-transport conditions.",
    summary:
      "First-prize delivery octarotor for the RTA Dubai World Challenge for Self-Driving Transport — a mechatronic aerial logistics platform demonstrated under competition conditions in Dubai, with USD 100,000 prize recognition and a peer-reviewed mechatronic design paper.",
    contributionSummary:
      "Designed and integrated the delivery octarotor mechatronics and supported competition deployment that won First Prize at the RTA Dubai World Challenge.",
    outcomeSummary:
      "Won First Prize (USD 100,000) and produced a peer-reviewed mechatronic design paper on the delivery octarotor.",
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
    challenge:
      "Desert sand movement, water pooling, and vegetation encroachment threaten UAE rail corridors in ways cab visibility alone cannot detect early enough.",
    summary:
      "Proposed and field-piloted a train-mounted sensing concept for Etihad Rail: LiDAR, cameras, and supporting sensors capture the rail corridor so the surrounding geo-environment can be reconstructed in 3D. The aim is early detection of desert-environment hazards that threaten operations — sand movement, water accumulation, and vegetation encroachment — giving maintenance teams a proactive view of track-side risk across UAE conditions.",
    contributionSummary:
      "Supported the Etihad Rail proposal and train-side sensing pilot — coordinating the industry engagement and the field installation of the rearward LiDAR and camera payload used to capture corridor evidence for the desert-environment monitoring concept.",
    outcomeSummary:
      "Field-piloted a train-mounted LiDAR and camera payload that captures corridor evidence for 3D geo-environment monitoring and change detection.",
    highlights: [
      "Addresses Middle Eastern rail hazards that cab visibility alone cannot cover: sand dune shifts, flood-related water pooling, and vegetation growth along the alignment.",
      "Pilot sensor suite mounts LiDAR and cameras on selected trains to collect corridor data and regenerate a dynamic 3D view of the track-side geo-environment for visual monitoring and change detection.",
      "Machine-learning analysis of environmental change patterns is intended to surface actionable alerts for operators and maintenance teams, supporting safer, more reliable service with fewer weather- and terrain-driven delays.",
      "Scale path: expand onboard sensing across the fleet into a centralized platform that aggregates train and environmental feeds for network-wide risk awareness and maintenance planning.",
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
    images: [
      {
        src: "/images/projects/etihad-rail-rear-camera-team.jpg",
        alt: "Three engineers in PPE on the rear platform of an Etihad Rail locomotive with a LiDAR and camera sensing payload mounted on the handrail",
        caption: "FIELD CREW — TRAIN SENSOR INSTALL",
        orientation: "portrait",
      },
      {
        src: "/images/projects/etihad-rail-rear-camera-mount.jpg",
        alt: "Close-up of LiDAR and camera sensors bracketed to the train rear handrail, with an Etihad Rail service vehicle beside the tracks",
        caption: "LIDAR · CAMERA — REAR HANDRAIL MOUNT",
      },
    ],
    status: "published",
  },
  {
    type: "project",
    slug: "multiagent-construction-exploration",
    title: "Multi-Agent Exploration for Construction Data Collection",
    org: "NYU Abu Dhabi · SMART Lab",
    period: { startYear: 2024, label: "2024" },
    challenge:
      "Construction sites need cooperative robotic exploration and mapping when obstacles block a single agent's path.",
    summary:
      "Cooperative multi-agent robotic system for 3D digitization and data collection in construction environments — one agent explores and maps the space while coordinating with another to clear obstacles, with a human operator in the loop via remote access when needed.",
    contributionSummary:
      "Contributed to the multi-agent exploration system and its Journal of Field Robotics publication — cooperative mapping with human-in-the-loop teleoperation for construction-site data collection.",
    // PENDING OWNER REVIEW
    outcomeSummary:
      "Published in the Journal of Field Robotics on multi-agent exploration with human-in-the-loop teleoperation for construction data collection.",
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
    challenge:
      "People who have lost voluntary motor control need a safe way to navigate unknown environments using eye gaze alone.",
    summary:
      "A wheelchair navigation system driven entirely by eye gaze, built for people who have lost voluntary motor control — combining gaze tracking, obstacle sensing, and shared autonomy so the chair can navigate unknown environments safely. Validated in a real-world case study with a person living with ALS.",
    contributionSummary:
      "Designed and field-validated a gaze-driven wheelchair navigation stack with shared autonomy — the most-cited work in the publication record (170+ citations).",
    outcomeSummary:
      "Field-validated a gaze-driven wheelchair with shared autonomy in a real-world ALS case study — 170+ citations.",
    highlights: [
      "Gaze input is fused with onboard sensing and assisted-control logic, so a single modality — where the user looks — becomes a safe, complete driving interface.",
      "Field-tested beyond the lab: the system was deployed and evaluated in the home of a person with ALS, navigating environments it had never seen.",
      "Published in IEEE Access; the most-cited work in my publication record (170+ citations).",
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
      "A custom programmable apparatus for Panče Naumov's smart-materials group to investigate how controlled pulling conditions produce curling and chiral coiling in ribbon specimens. The system applied controlled linear pulling while varying speed, mounting orientation, geometry, and material parameters — turning an evolving scientific experiment into a repeatable mechatronic test instrument.",
    contributionSummary:
      "Designed and integrated the hardware, controller software, and automation for the ribbon-curling apparatus — motion-stage trade study, mechanical integration, fixture-alignment debugging, Newmark motion-control configuration, and operational handover so the group could run structured experiments and publication media.",
    outcomeSummary:
      "Delivered a programmable ribbon-curling apparatus that unlocked structured sample campaigns and supplementary publication media.",
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
      "The hardware-security group needed a reliable PCB test rig to validate logic-locked 65 nm ARM Cortex-M0 silicon before ACM CCS publication.",
    summary:
      "Led PCB development and hardware bring-up of a custom test platform for a 65 nm ARM Cortex-M0 logic-locked ASIC — UART programming, key activation, and silicon validation for ACM CCS 2017.",
    contributionSummary:
      "Led electronics design and fabrication of the ASIC validation PCB — schematic, layout, in-house fabrication, and silicon bring-up for the ACM CCS 2017 logic-locking work.",
    // PENDING OWNER REVIEW
    outcomeSummary:
      "Validated locked processor silicon on the custom board: correct execution with the valid key, failure with an incorrect one.",
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
    status: "needs-review",
  },
  {
    type: "project",
    slug: "nyuad-adac-airport-inspection-drone",
    title: "Drone Inspection of Abu Dhabi International Airport",
    org: "NYU Abu Dhabi · with Abu Dhabi Airports (ADAC)",
    period: { startYear: 2019, label: "2019" },
    challenge:
      "Abu Dhabi International Airport's aerodynamic terminal roof is hazardous for human inspectors but still requires contact inspection.",
    summary:
      "Collaboration between NYU Abu Dhabi and Abu Dhabi Airports to protect infrastructure and keep workers safe at the city's new international airport — engineering a drone equipped with robotic arms to inspect the terminal's aerodynamic roof, which is not safe for humans to access.",
    contributionSummary:
      "Supported the aerial-manipulation inspection collaboration with Abu Dhabi Airports — drone-based contact inspection of the terminal roof where human access is hazardous.",
    // PENDING OWNER REVIEW
    outcomeSummary:
      "Demonstrated drone-based aerial manipulation for terminal roof inspection in NYUAD's industry collaboration with Abu Dhabi Airports.",
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
    challenge:
      "CAIR needed real-time UAV detection, tracking, and cooperative localization pipelines that could survive live arena flights.",
    summary:
      "Multi-paper research thread on detecting, tracking, and relatively localizing UAVs in real time — from airborne PTZ visual lock and cooperative spherical localization through RGB-thermal fusion and deep-learning / Siamese aerial trackers, validated on live flights in the Kinesis arena.",
    contributionSummary:
      "System integration and experimental development across the CAIR UAV perception thread — arena instrumentation, RGB-T PTZ pipelines, and field validation that underpins six peer-reviewed papers (2020–2022).",
    outcomeSummary:
      "Integrated and flight-tested the RGB-T arena stack underpinning six peer-reviewed papers (2020–2022).",
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
      "Co-constructed the original hybrid platform and supported technical integration through the Kinesis Lab / Core Technology Platform — co-author on both IEEE publications documenting the mechatronic design, control architecture, and experimental validation.",
    outcomeSummary:
      "Experimentally validated three-domain operation and published at ICARA and ICUAS 2023, with IEEE Spectrum coverage of the hybrid platform.",
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
    org: "NYU Abu Dhabi · with Imperial College London IDE",
    period: { startYear: 2020, label: "2020" },
    challenge:
      "Red Palm Weevil larvae feed internally, leaving almost no external symptoms until the tree is beyond saving.",
    summary:
      "Integrated robotic monitoring system for early Red Palm Weevil detection at the scale of UAE date plantations — fusing acoustic, thermal, and RGB sensing so hidden larval infestations can be flagged before trunk collapse, then handing farmers targeted trees for inspection rather than blanket pesticide treatment.",
    contributionSummary:
      "Built the multimodal field data collector and automated the inspection path on Clearpath Husky — sensor fusion, SLAM under canopy, and Gazebo simulation for plantation-scale monitoring.",
    outcomeSummary:
      "Field-validated acoustic trunk probing and multimodal capture that lets farmers target inspection instead of blanket pesticide treatment.",
    highlights: [
      "Built a sensor-fusion field data collector around a single-board computer: thermal and RGB cameras, contact microphone, GPS-RTK, storage, and a Healthy/Infested UI so every tree sample follows the same acquisition protocol for supervised deep learning.",
      "Field-validated acoustic trunk probing and multimodal capture across date plantations, addressing the core challenge that RPW larvae feed internally and leave almost no external symptoms until it is too late to save the tree.",
      "Automated the inspection path on a Clearpath Husky UGV platform — SLAM with RGB-D sensing under palm canopy, plus Gazebo/RViz simulation of row navigation — so the same sensing stack can scale from handheld surveys to thousands of trees.",
    ],
    credits: [
      {
        name: "Nikolaos Giakoumidis",
        role: "System integration · field sensing",
        org: "NYU Abu Dhabi",
      },
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
    challenge:
      "Ground robots need overhead situational awareness for path planning, but a single platform cannot carry both mobility and long-range vision affordably.",
    summary:
      "Heterogeneous symbiotic robot pair treated as one entity with separable bodies: the ground vehicle carries and recharges a lightweight quad-rotor, while the quad-rotor acts as the pair's detachable long-range vision system, turning top-down aerial views into the maps that plan the ground vehicle's route.",
    contributionSummary:
      "First-author development of the UAV–UGV hybrid pilot: aerial mapping into ground-robot path planning, published at FIT 2012.",
    outcomeSummary:
      "First-author FIT 2012 paper on a symbiotic UAV–UGV pair that maps from the air and plans ground routes from stitched aerial frames.",
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
      "Real-time teleoperation of an industrial robotic arm through natural human arm imitation: the operator wears a motion-capture marker suit, and the arm reproduces their movement live. The work grew into a general evaluation framework for teleoperation quality, published in the International Journal of Social Robotics.",
    contributionSummary:
      "Built the motion-capture teleoperation pipeline from optical tracking through kinematic retargeting to live industrial-arm control; published at IRIS 2010.",
    outcomeSummary:
      "Built and published a motion-capture teleoperation pipeline from optical tracking through kinematic retargeting to live arm control (IRIS 2010).",
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
      "IRML's android telepresence platform required dense electromechanical upkeep to stay research-ready at an affordable price point.",
    summary:
      "Hands-on electromechanical work on IRML's android telepresence platform — servicing the actuation, wiring, and control hardware behind a human-like robot head and torso, in pursuit of android telepresence at an affordable price point.",
    contributionSummary:
      "Maintained and upgraded the android telepresence actuation and wiring hardware — electromechanical support contributing to the HRI 2011 workshop paper.",
    outcomeSummary:
      "Kept the android head and torso running for HRI research, contributing to the HRI 2011 workshop paper on affordable telepresence.",
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
      "Bachelor graduation project: an end-to-end autonomous navigation stack for a Parrot AR.Drone quadrotor — onboard ArduPilot Mega with GPS, IMU, and digital compass feeding a LabVIEW ground control station that computes great-circle routes (Haversine + bearing), overlays the vehicle on an interactive Google Earth map, and closes the loop to fly the UAV from its current geographic position to a user-selected destination.",
    contributionSummary:
      "Sole author of the BSc Automation Engineering thesis — designed, built, and demonstrated the AR.Drone sensing payload, ArduPilot firmware interfaces, and LabVIEW GCS for GPS path planning and automatic navigation.",
    outcomeSummary:
      "Sole-author BSc thesis demonstrating closed-loop GPS path planning from a LabVIEW ground station to a modified AR.Drone.",
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
