import type { Education, Role } from "@/lib/types";

export const experience = [
  {
    id: "nyuad-cair-commercial-lead",
    title: "Commercial Lead – AI and Robotics",
    org: "New York University Abu Dhabi",
    unit: "Center for Artificial Intelligence and Robotics (CAIR)",
    location: "Abu Dhabi, UAE",
    period: "2025–Present",
    current: true,
    highlights: [
      "Lead commercialization and external engagement for CAIR, positioning NYUAD's AI, robotics, and autonomous systems research for industry-facing translation and strategic collaboration.",
      "Authored 15+ project proposals in the first year in role, spanning embodied and physical AI, industrial inspection, logistics, infrastructure, digital twins, and autonomous systems.",
      "Completed 5 NDAs with external stakeholders, advancing discussions toward next-stage collaboration.",
      "Represented NYUAD and CAIR at Dubai AI Festival, Make it in the Emirates, Global Rail, Future Digital Twin & AI, DriftX, and ADIPEC, and in meetings with stakeholders including AD Ports Group, Etihad Rail, GCAA, Kent, Mubadala, MGX, Analog, CycloTech, and Mimik.",
      "Built a structured engagement model averaging roughly two external visits per week in 2025, generating proposal requests, technical workshops, lab and site visits, pilot discussions, and executive follow-ups.",
    ],
  },
  {
    id: "nyuad-ctp-research-instrumentation-specialist",
    title: "Research Instrumentation Specialist – Robotics & Automation",
    org: "New York University Abu Dhabi",
    unit: "Core Technology Platforms (CTP)",
    location: "Abu Dhabi, UAE",
    period: "2017–2025",
    highlights: [
      "Established, expanded, and ran key NYUAD laboratories across robotics, photonics, high-throughput screening, electronics, and advanced manufacturing.",
      "Owned end-to-end technical decision-making across multiple labs: equipment strategy, vendor selection, system architecture, workflow design, safety procedures, and repair-versus-replacement planning.",
      "Supported 100+ users — faculty, researchers, students, and technical staff — across multidisciplinary research communities.",
      "Influenced approximately $800K in annual purchasing, peaking near $3M, and generated major institutional savings through strategic procurement and in-house repair of high-value systems.",
      "Ran roughly four student workshops per semester and co-supervised about two capstone projects annually, while operating within demanding safety and regulatory environments involving drones, lasers, and RF systems.",
    ],
  },
  {
    id: "nyuad-electronics-engineer",
    title: "Electronics Engineer, Laboratories",
    org: "New York University Abu Dhabi",
    location: "Abu Dhabi, UAE",
    period: "2013–2017",
    highlights: [
      "Fully established the Electronics Workshop and co-established the Advanced Manufacturing Workshop, expanding NYUAD's internal prototyping and scientific instrumentation capabilities.",
      "Played a key role in planning and relocating research laboratories from the Center for Science and Engineering to the Saadiyat campus.",
      "Supported faculty, researchers, and students across electronics, automation, robotics, and scientific instrumentation, including the High Throughput Screening Platform (HTS).",
      "Delivered in-house troubleshooting, maintenance, and repair of scientific equipment, improving operational continuity and cost efficiency.",
      "Conducted demonstrations for industry and government delegations to showcase research capabilities.",
    ],
  },
  {
    id: "nyuad-irml-research-assistant",
    title: "Research Assistant",
    org: "New York University Abu Dhabi",
    unit: "Interactive Robots and Media Laboratory (IRML)",
    location: "Abu Dhabi, UAE",
    period: "2012–2013",
    highlights: [
      "Supported the setup and early development of NYUAD's first robotics laboratory.",
      "Contributed to robotics research projects and day-to-day laboratory operations in IRML.",
      "Served as teaching assistant for engineering courses and supported international robotics workshop activities.",
    ],
  },
  {
    id: "hellenic-armed-forces-rd-engineer",
    title: "R&D Engineer",
    org: "Hellenic Armed Forces",
    unit: "Dept. of Advanced Defense Systems",
    location: "Greece",
    period: "2011–2012",
    highlights: [
      "Conducted R&D on small unmanned aerial systems, including fixed-wing and multirotor platforms.",
      "Completed during mandatory National Service in Greece.",
    ],
  },
  {
    id: "experimental-primary-school-athens-teacher",
    title: "Teacher of Robotics",
    org: "Experimental Primary School of Athens",
    location: "Athens, Greece",
    period: "2010–2011",
    highlights: [
      "Delivered robotics instruction to school students using LEGO Mindstorms.",
      "Supported early STEM engagement for young learners.",
    ],
  },
  {
    id: "uaeu-research-intern",
    title: "Research Intern",
    org: "United Arab Emirates University, Al Ain",
    unit: "Interactive Robots and Media Lab",
    location: "Al Ain, UAE",
    period: "2009–2010",
    highlights: [
      "Supported robotics research activities in the Interactive Robots and Media Lab.",
      "Contributed to project execution across lab research efforts.",
    ],
  },
  {
    id: "gd-goumas-manager",
    title: "Manager of Industrial and Automotive Equipment",
    org: "G&D Goumas SA, Athens",
    location: "Athens, Greece",
    period: "2003–2009",
    highlights: [
      "Managed technical support and training for industrial and automotive diagnostic equipment.",
      "Worked across Launch diagnostic tools and troubleshooting systems.",
    ],
  },
] satisfies Role[];

export const education = [
  {
    id: "aegean-phd",
    degree: "PhD Candidate",
    institution: "University of the Aegean",
    location: "Greece",
    period: "2023–Present",
    detail:
      "PhD research focused on autonomous cooperative robotic systems, embodied AI, and deep reinforcement learning.",
  },
  {
    id: "uniwa-bsc",
    degree: "BSc, Automation Engineering",
    institution: "University of West Attica",
    location: "Greece",
    period: "2012",
  },
] satisfies Education[];
