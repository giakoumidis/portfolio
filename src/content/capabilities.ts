import type { Capability } from "@/lib/types";

export const capabilities = [
  {
    id: "embodied-physical-ai",
    title: "Embodied & Physical AI",
    blurb:
      "Bringing learning-based intelligence onto real hardware, from deep reinforcement learning policies to LLM- and VLM-driven robot behaviour.",
    tags: [
      "Embodied AI",
      "Physical AI",
      "Deep reinforcement learning",
      "LLM/VLM workflows",
      "PyTorch",
      "Dockerized microservices",
    ],
  },
  {
    id: "multi-agent-robotic-systems",
    title: "Multi-Agent Robotic Systems",
    blurb:
      "Designing cooperative teams of aerial and ground robots that explore, map, and inspect environments together.",
    tags: [
      "Multi-agent systems",
      "Exploration algorithms",
      "Industrial inspection",
      "Path planning",
      "Construction robotics",
    ],
  },
  {
    id: "perception-sensing",
    title: "Perception & Sensing",
    blurb:
      "Building multimodal perception stacks that fuse vision, LiDAR, radar, and spatial tracking into reliable localization and mapping.",
    tags: [
      "Multimodal perception",
      "Computer vision",
      "LiDAR & radar",
      "Thermal & multispectral",
      "Motion capture",
      "Localization & mapping",
    ],
  },
  {
    id: "sim2real-digital-twins",
    title: "Sim2Real & Digital Twins",
    blurb:
      "Developing and validating robotic systems in simulation with synthetic data, then transferring them to physical deployment.",
    tags: [
      "Isaac Sim",
      "Isaac Lab",
      "Gazebo",
      "MATLAB Simulink",
      "Synthetic data",
      "Sim-to-real",
    ],
  },
  {
    id: "lab-automation-instrumentation",
    title: "Lab Automation & Instrumentation",
    blurb:
      "Establishing and running research laboratories — from equipment strategy and custom instrumentation to platforms like NYUAD's High-Throughput Screening system.",
    tags: [
      "Scientific instrumentation",
      "LabVIEW",
      "High-throughput screening",
      "Custom instrumentation",
      "Equipment strategy",
    ],
  },
  {
    id: "aerial-ground-underwater-robotics",
    title: "Aerial · Ground · Underwater Robotics",
    blurb:
      "Hands-on mechatronic design, control, and field operation of drones, quadrupeds, humanoids, and amphibious platforms.",
    tags: [
      "Drone systems",
      "PX4 & ArduPilot",
      "Quadruped & humanoid",
      "Amphibious platforms",
      "Control & navigation",
    ],
  },
  {
    id: "teleoperation",
    title: "Teleoperation",
    blurb:
      "Real-time human-in-the-loop control of industrial arms and robots — motion capture, kinematic retargeting, and operator-driven manipulation.",
    tags: [
      "Motion capture",
      "Kinematic retargeting",
      "Industrial manipulators",
      "Human-robot interaction",
      "Operator trials",
    ],
  },
  {
    id: "telecommunications-edge-computing",
    title: "Photonics & Telecommunications",
    blurb:
      "Establishing and operating NYU Abu Dhabi's Photonics Core — capital planning, commissioning, and high-speed optical/RF characterization for silicon photonics research.",
    tags: [
      "Silicon photonics",
      "High-speed optical test",
      "Keysight BERT & AWG",
      "Lightwave analysis",
      "RF & fiber characterization",
      "Research infrastructure",
    ],
  },
] satisfies Capability[];
