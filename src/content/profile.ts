import type { Profile, SocialLink } from "@/lib/types";

export const profile = {
  name: "Nikolaos Giakoumidis",
  tagline: "ROBOTICS · AI · AUTONOMOUS SYSTEMS",
  location: "Abu Dhabi, UAE",
  email: "giakoumidisnikolaos@gmail.com",
  nyuEmail: "giakoumidis@nyu.edu",
  summary:
    "I am an engineer, researcher, and technical leader driven by curiosity, a practical instinct to build, and a deep interest in how technology shapes our future. Across 15+ years in AI, Robotics, Electronics, and Automation, I have led engineering projects, established and managed research laboratories, and brought people, resources, and technologies together to turn ideas into working systems. My leadership approach draws on a broad understanding of engineering, research, operations, and commercial priorities, combining technical involvement, collaboration, and responsibility for delivery. Currently, at NYU Abu Dhabi's Center for Artificial Intelligence and Robotics, I lead commercialization and industry engagement, working to understand real-world challenges and bring scientific teams and industry partners together to address them. My PhD research focuses on agentic robotics and physical AI: building the software frameworks, or harnesses, that connect AI models with physical systems, bringing together low-level sensing and control with high-level reasoning, planning, and coordination. This work extends from individual robots to the capabilities needed across buildings, production lines, and logistics hubs. My personal interests include aviation, design, fabrication, and how people interact with intelligent machines. I enjoy exploring unconventional ideas and sharing knowledge through teaching and mentoring. I care deeply about AI's impact on humanity and want to help shape a future in which it expands human capability, supports human agency, and creates meaningful benefits for society.",
  positioning:
    "Engineering physical AI. Connecting research and industry. Extending what people can do with intelligent machines.",
  currentRole: {
    title: "Commercial Lead – AI and Robotics",
    org: "NYUAD Center for Artificial Intelligence and Robotics (CAIR)",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/nikolaos-giakoumidis/",
    github: "https://github.com/giakoumidis",
    scholar: "https://scholar.google.com/citations?user=HmOOogwAAAAJ&hl=en",
  },
  // Durable proof metrics — keep definitions aligned with CV and experience copy.
  stats: [
    { value: 15, suffix: "+", label: "Years in robotics & research engineering" },
    { value: 100, suffix: "+", label: "Research and technical users supported" },
    {
      value: 9,
      prefix: "US$",
      suffix: "M+",
      label: "Research assets stewarded across shared platforms",
    },
    { value: 3, label: "Major shared research platforms" },
    { value: 30, suffix: "+", label: "Publications" },
    { value: 4, label: "First-prize awards" },
  ],
} satisfies Profile;

/** Evidence-linked scope for the visible profile and structured person metadata. */
export const professionalCapabilities = [
  {
    title: "Robotics systems architecture & integration",
    description:
      "Connect mechanical design, actuation, embedded control, sensing, and software in working robotic systems. Experience spans UAVs, ground robots, quadrupeds, industrial manipulators, and hybrid air–land–water platforms, from prototype construction and control integration to laboratory testing and field trials.",
    links: [
      { label: "Hybrid robotic platform", href: "/projects/hybrid-ground-air-water-vehicle" },
      { label: "Delivery drone", href: "/projects/rta-dubai-delivery-drone" },
    ],
  },
  {
    title: "Embodied AI & cooperative robotics",
    description:
      "Develop robot-agent frameworks that connect natural-language instructions with robot capabilities through the Robot Operating System (ROS 2) and Model Context Protocol (MCP). Current research combines model-agnostic orchestration with cooperative autonomy; longer-term work targets shared memory and capability-aware coordination between different robot platforms.",
    links: [
      { label: "Agentic Robotics Framework", href: "/projects/agentic-robotics-framework" },
      { label: "Current research direction", href: "/research#current-research" },
      { label: "Cooperative construction exploration", href: "/projects/multiagent-construction-exploration" },
    ],
  },
  {
    title: "Perception, navigation & human–robot interaction",
    description:
      "Integrate cameras, thermal sensing, LiDAR, motion capture, and positioning systems for perception experiments, mapping, navigation, and inspection. Work includes UAV detection and tracking, simultaneous localization and mapping (SLAM), motion-based teleoperation, and gaze-controlled assistive robotics. Use simulation and physical experiments to develop and evaluate systems.",
    links: [
      { label: "UAV perception research", href: "/projects/rgb-t-uav-detection-tracking" },
      { label: "Gaze-controlled wheelchair", href: "/projects/eye-gaze-wheelchair" },
    ],
  },
  {
    title: "Electronics, instrumentation & laboratory automation",
    description:
      "Design custom electronics and automate experimental workflows, including schematic capture, printed circuit board (PCB) layout, embedded interfaces, LabVIEW control, and robotic instrument integration. Experience includes ASIC test hardware, programmable research instruments, Thermo Fisher Momentum workflows, FANUC robots, and optical/RF characterization infrastructure for photonics research.",
    links: [
      { label: "Custom ASIC validation board", href: "/projects/hardware-security-asic-validation-platform" },
      { label: "High-throughput screening automation", href: "/laboratories/nyuad-hts-platform" },
      { label: "Photonics platform", href: "/laboratories/photonics-ctp-laboratory" },
    ],
  },
  {
    title: "Research infrastructure & technical leadership",
    description:
      "Translate scientific requirements into facility designs, equipment strategies, procurement decisions, and commissioned research platforms. Led Kinesis from concept to operation and stewarded US$9M+ in assets across shared facilities serving 100+ faculty, researchers, students, and technical staff. Responsibilities include vendor coordination, safety, maintenance strategy, technical training, and student supervision.",
    links: [
      { label: "Kinesis facility delivery", href: "/laboratories/kinesis-ctp-laboratory" },
      { label: "Experience & education", href: "/profile#experience-education" },
    ],
  },
  {
    title: "Research translation & industry collaboration",
    description:
      "Connect faculty research with industrial problems and shape technical proposals, demonstrations, and pilot opportunities. Combine familiarity with UAE industry and research institutions with direct engineering experience to assess applications and communicate their technical value. Current responsibilities include commercialization development, external engagement, and coordination between researchers and prospective industry partners.",
    links: [
      { label: "Etihad Rail collaboration", href: "/projects/etihad-rail-nyuad-collaboration" },
      { label: "Rail sensing pilot", href: "/projects/etihad-rail-desert-environment-monitoring" },
    ],
  },
] as const;

/** Current work is described separately from the published research record. */
export const currentResearch = [
  {
    title: "Robot-agent frameworks for industrial inspection",
    description:
      "My current work develops a model-agnostic framework that connects natural-language instructions with robot perception, navigation, and inspection skills. The architecture uses the Robot Operating System (ROS 2) and Model Context Protocol (MCP) to expose capabilities to AI agents, with Boston Dynamics Spot as the primary platform. The design separates AI task reasoning from deterministic robot control and safety constraints, with the aim of making inspection workflows reusable across models and platforms. The paper is under review at the Journal of Field Robotics.",
    href: "/projects/agentic-robotics-framework",
    linkLabel: "Agentic Robotics Framework",
  },
  {
    title: "Heterogeneous embodied collective intelligence",
    description:
      "My longer-term research direction asks how robots with different bodies, sensors, and capabilities can become more effective as a team. I aim to investigate shared world and task memory, capability-aware coordination, and selective communication under limited bandwidth and failures. This extends my work in cooperative robotics and my PhD focus on optimizing autonomous cooperative agents using deep reinforcement learning.",
  },
] as const;

/** Display order for the social links shown in the contact panel. */
export const socialLinks = [
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Google Scholar", href: profile.links.scholar },
] satisfies SocialLink[];
