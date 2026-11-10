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
      "Lead commercialization and industry engagement for CAIR, working with faculty, researchers, and external partners to identify practical needs and develop applications for AI, robotics, and autonomous systems.",
      "Authored 15+ project proposals in the first year, translating industrial needs and research capabilities into proposed work across inspection, logistics, infrastructure, digital twins, and autonomous systems.",
      "Completed five NDAs with external stakeholders, enabling further technical exchange and collaboration discussions.",
      "Connect scientific teams with industry and government partners, bringing engineering judgment to discussions of technical feasibility, implementation needs, and potential applications.",
      "Designed and built a model-agnostic robot agent architecture for industrial inspection, researching how natural-language task execution can reduce reliance on specialist operators and support practical robotics adoption.",
      "Represent NYUAD and CAIR through technical demonstrations, executive discussions, and exhibitions including ADIPEC, Global Rail, Make it in the Emirates, and DriftX.",
      "Engage organizations across transport, energy, logistics, technology, and investment, including AD Ports Group, Etihad Rail, GCAA, Kent, Mubadala, MGX, Analog, CycloTech, and Mimik.",
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
      "Established, expanded, and operated laboratories across robotics, photonics, high-throughput screening, electronics, and advanced manufacturing, building shared engineering capabilities for multidisciplinary research.",
      "Led end-to-end technical decision-making across multiple research laboratories, covering facility design, construction supervision, system architecture, integration and commissioning, equipment strategy, vendor selection and procurement, workflow design, safety procedures, and repair-versus-replacement decisions.",
      "Supported 100+ users, including faculty, researchers, students, and technical staff, translating experimental requirements into equipment configurations, integrated systems, and working research methods.",
      "Stewarded US$9M+ in research assets and influenced approximately US$800K in annual purchasing, with peak periods approaching US$3M, through technical evaluation, vendor selection, and procurement planning.",
      "Diagnosed and restored complex scientific equipment, including systems without vendor support, to maintain research continuity and avoid unnecessary service or replacement expenditure.",
      "Co-developed and commissioned the Photonics laboratory and managed its operation and expansion. Engineered high-throughput screening automation through Thermo Fisher Momentum workflows, FANUC configuration, instrument synchronization, and fault recovery.",
      "Organized approximately four student workshops per semester and co-supervised around two capstone projects annually, mentoring users in engineering methods, system integration, and experimental work.",
      "Operated within demanding safety and regulatory environments involving drones, lasers, and RF systems, while maintaining compliance with university and UAE approval requirements.",
      "Enabled multidisciplinary research through experimental design, systems integration, and scientific instrumentation, with contributions acknowledged in more than 20 publications spanning robotics, photonics, materials science, and life sciences.",
    ],
  },
  {
    id: "nyuad-electronics-engineer",
    title: "Electronics Engineer, Laboratories",
    org: "New York University Abu Dhabi",
    location: "Abu Dhabi, UAE",
    period: "2013–2017",
    highlights: [
      "Established the Electronics Workshop and co-established the Advanced Manufacturing Workshop, expanding in-house capabilities in prototyping, scientific instrumentation, and engineering support. Handed Advanced Manufacturing and Electronics over in 2017.",
      "Played a key role in planning and relocating research laboratories from the Center for Science and Engineering to the Saadiyat campus.",
      "Designed and integrated electronics, control hardware, and automation for research teams with different scientific specialisms, supporting experimental development from problem definition through testing.",
      "Supported the operation and technical development of the High Throughput Screening Platform, integrating robotic automation with scientific instruments and laboratory workflows.",
      "Delivered in-house troubleshooting and repair of scientific equipment, supporting reliable laboratory operation and informed repair-versus-replacement decisions.",
      "Presented laboratory capabilities and working systems to industry and government delegations, translating technical research into accessible demonstrations.",
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
      "Contributed to the establishment and early operation of NYUAD's first robotics laboratory.",
      "Developed and integrated robotic systems for research, including work linking aerial mapping with ground-robot path planning, and contributed to related publications.",
      "Served as a teaching assistant for engineering courses and supported international robotics workshops.",
    ],
  },
  {
    id: "hellenic-armed-forces-rd-engineer",
    title: "R&D Engineer",
    org: "Hellenic Armed Forces",
    unit: "Dept. of Advanced Defense Systems",
    note: "Mandatory national service in Greece",
    location: "Greece",
    period: "2011–2012",
    highlights: [
      "Conducted R&D on small unmanned aerial systems, including fixed-wing and multirotor platforms.",
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
    period: "2023–\nExpected\ncompletion\nJanuary\n2027",
    detail:
      "Thesis: Modular Architectures for Physical AI: Agentic Reasoning and Orchestration in Heterogeneous Robotic Systems. The dissertation investigates how modular architectures can connect autonomous perception, agentic reasoning, and coordinated robotic capabilities across systems with different embodiments and operating constraints.",
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
