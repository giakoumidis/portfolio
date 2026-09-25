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
      "Lead commercialization and industry engagement for CAIR, working with faculty and external stakeholders to identify industrial needs, assess research applications, and develop technical proposals and pilot opportunities.",
      "Authored 15+ project proposals in my first year, defining applications for CAIR research in inspection, logistics, infrastructure, embodied AI, and digital twins.",
      "Completed 5 NDAs with external stakeholders to support further technical discussions and collaboration development.",
      "Represented NYUAD and CAIR at Dubai AI Festival, Make it in the Emirates, Global Rail, Future Digital Twin & AI, DriftX, and ADIPEC, and in meetings with stakeholders including AD Ports Group, Etihad Rail, GCAA, Kent, Mubadala, MGX, Analog, CycloTech, and Mimik.",
      "Established a structured engagement process averaging roughly two external visits per week in 2025, leading to proposal requests, technical workshops, site visits, and pilot discussions.",
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
      "Established, expanded, and operated research facilities spanning robotics, photonics, high-throughput screening, electronics, and advanced manufacturing.",
      "Led technical decisions across multiple laboratories, including system architecture, equipment strategy, vendor selection, workflow design, safety procedures, and repair-versus-replacement planning.",
      "Supported 100+ faculty, researchers, students, and technical staff in using shared facilities for multidisciplinary experimental research.",
      "Stewarded US$9M+ in shared research assets, with responsibility for technical planning and equipment lifecycle decisions. Managed approximately US$800K in average annual procurement, with peak years approaching US$3M, and reduced costs through strategic purchasing and in-house repair of high-value equipment.",
      "Delivered roughly four student workshops per semester and co-supervised about two capstone projects annually. Managed laboratory activities involving drones, lasers, and RF systems within university safety and regulatory requirements.",
    ],
  },
  {
    id: "nyuad-electronics-engineer",
    title: "Electronics Engineer, Laboratories",
    org: "New York University Abu Dhabi",
    location: "Abu Dhabi, UAE",
    period: "2013–2017",
    highlights: [
      "Established the Electronics Workshop and co-established the Advanced Manufacturing Workshop, giving NYUAD greater in-house capability in prototyping and scientific instrumentation.",
      "Helped plan and deliver the relocation of research laboratories from the Center for Science and Engineering to the Saadiyat campus.",
      "Supported faculty, researchers, and students across electronics, automation, robotics, and scientific instrumentation, including the High Throughput Screening Platform (HTS).",
      "Delivered in-house troubleshooting, maintenance, and repair of scientific equipment, improving operational continuity and cost efficiency.",
      "Demonstrated research systems to industry and government delegations, explaining technical capabilities and potential applications.",
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
      "Contributed to robotics experiments, prototype development, and day-to-day operation of IRML.",
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
    detail:
      "Thesis: automatic path finding and GPS navigation for a Parrot AR.Drone quadrotor — ArduPilot sensing payload and LabVIEW ground control station (ΤΕΙ Piraeus · Department of Automation).",
  },
] satisfies Education[];
