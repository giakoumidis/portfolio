import type { AcknowledgedPublication } from "@/lib/types";

export const acknowledgementIntro =
  "Much of my work at NYU Abu Dhabi has involved helping researchers across robotics, photonics, materials science, biology, and human–robot interaction turn scientific questions into practical experiments. By designing experimental systems, integrating instrumentation, and solving engineering challenges, I have provided capabilities essential to their investigations, with contributions acknowledged in more than 20 publications. Working closely with researchers across these disciplines has given me a broad scientific perspective, a deeper understanding of experimental research, and the ability to connect methods and ideas across fields.";

/**
 * Publications that name an acknowledged contribution.
 * Newest first. Links prefer the DOI; otherwise the publisher or author record.
 */
export const acknowledgedPublications = [
  {
    title:
      "A Modular ROS–MARL Framework for Cooperative Multi-Robot Task Allocation in Construction Digital Environments",
    venue: "Buildings 16(3), 539",
    year: "2026",
    link: "https://doi.org/10.3390/buildings16030539",
    contribution:
      "Discussions and assistance with laboratory methods and experimental design.",
  },
  {
    title: "A new class of natural anthelmintics targeting lipid metabolism",
    venue: "Nature Communications 16, 305",
    year: "2025",
    link: "https://doi.org/10.1038/s41467-024-54965-w",
    contribution: "Support from the high-throughput screening facility.",
  },
  {
    title:
      "Automated integration of as-is point cloud information with as-planned BIM for interior construction",
    venue: "International Journal of Construction Management 24(2)",
    year: "2024",
    link: "https://doi.org/10.1080/15623599.2023.2211487",
    contribution: "Support with campus resources for the research.",
  },
  {
    title:
      "Safe multi-agent drone control using control barrier functions and acceleration fields",
    venue: "Robotics and Autonomous Systems",
    year: "2024",
    link: "https://www.sciencedirect.com/science/article/pii/S0921889023002403",
    contribution: "Technical support and insights.",
  },
  {
    title:
      "Simultaneous optical power insensitivity and non-volatile wavelength trimming using 2D In4/3P2Se6 integration in silicon photonics",
    venue: "npj 2D Materials and Applications 8, 46",
    year: "2024",
    link: "https://doi.org/10.1038/s41699-024-00481-w",
    contribution: "Help and support in the photonics laboratory.",
  },
  {
    title: "BSSM: GPU-Accelerated Point-Cloud Distance Metric for Motion Planning",
    venue: "IEEE Robotics and Automation Letters",
    year: "2024",
    link: "https://doi.org/10.1109/LRA.2024.3469809",
    contribution: "Acknowledged by the authors.",
  },
  {
    title:
      "Modular Multi-Copter Structure Control for Cooperative Aerial Cargo Transportation",
    venue: "Journal of Intelligent & Robotic Systems",
    year: "2023",
    link: "https://doi.org/10.1007/s10846-023-01842-1",
    contribution: "Technical support and insights for the experiments.",
  },
  {
    title:
      "High-Speed Waveguide-Integrated InSe Photodetector on SiN Photonics for Near-Infrared Applications",
    venue: "Advanced Photonics Research 4(11), 2300162",
    year: "2023",
    link: "https://doi.org/10.1002/adpr.202300162",
    contribution:
      "Support associated with optical, analytical and microfabrication facilities.",
  },
  {
    title:
      "Ultra-Compact Ultra-Broadband Two-Mode Transverse-Electric Based SWG Multiplexer Demonstrated at 64 Gbps",
    venue: "Journal of Lightwave Technology 41(16), 5412–5417",
    year: "2023",
    link: "https://doi.org/10.1109/JLT.2023.3264012",
    contribution: "Technical instrumentation support.",
  },
  {
    title:
      "Autonomous and Continuous As-is 3D Thermal Mapping for Construction Environments",
    venue: "ICRA 2023 Future of Construction Workshop, 16–19",
    year: "2023",
    link: "https://doi.org/10.22260/ICRA2023/0007",
    contribution: "Assistance with power systems for the automated platform.",
  },
  {
    title:
      "Developing a Digital Twin on a University Campus to Support Efficient and Sustainable Buildings",
    venue: "Creative Construction Conference 2023",
    year: "2023",
    link: "https://doi.org/10.3311/CCC2023-007",
    contribution: "Scanning the physical space.",
  },
  {
    title:
      "CMOS compatible ultra-compact MMI based wavelength diplexer with 60 Gbit/s system demonstration",
    venue: "Optics Express 30(5), 8257–8265",
    year: "2022",
    link: "https://doi.org/10.1364/OE.452421",
    contribution: "Technical support and helpful discussion.",
  },
  {
    title:
      "Investigating the Fiducial Marker Network Characteristics for Autonomous Mobile Indoor Robot Navigation Using ROS and Gazebo",
    venue: "Journal of Construction Engineering and Management 148(10)",
    year: "2022",
    link: "https://doi.org/10.1061/(ASCE)CO.1943-7862.0002378",
    contribution: "Assistance with experiments.",
  },
  {
    title:
      "An Ultra-Broadband Two-Mode Transverse-Electric Multiplexer in SOI platform",
    venue: "Optical Fiber Communication Conference (OFC)",
    year: "2021",
    link: "https://ieeexplore.ieee.org/abstract/document/9489888",
    contribution: "Technical support and useful discussion.",
  },
  {
    title: "Dual-Band (O & C-Bands) Two-Mode Multiplexer on the SOI platform",
    venue: "IEEE Photonics Journal",
    year: "2021",
    link: "https://doi.org/10.1109/JPHOT.2021.3075292",
    contribution: "Technical support.",
  },
  {
    title:
      "Experimental studies of plasmonics-enhanced optical physically unclonable functions",
    venue: "Optics Express 29(20), 32020–32030",
    year: "2021",
    link: "https://doi.org/10.1364/OE.437636",
    contribution: "Instrumentation support.",
  },
  {
    title:
      "Short-wavelength infrared (SWIR) photodetector based on multi-layer 2D GaGeTe",
    venue: "Optics Express 29(24), 39395–39405",
    year: "2021",
    link: "https://doi.org/10.1364/OE.442845",
    contribution: "Help and support in the photonics laboratory.",
  },
  {
    title: "Acoustic Emission from Organic Martensites",
    venue: "Angewandte Chemie International Edition",
    year: "2017",
    link: "https://doi.org/10.1002/anie.201702359",
    contribution: "Custom experimental design and LabVIEW software.",
  },
  {
    title:
      "One LED is Enough: Catalyzing Face-to-face Interactions at Conferences with a Gentle Nudge",
    venue: "CSCW 2016",
    year: "2016",
    link: "https://chenjay.org/publications/cscw16-chen.pdf",
    contribution: "Soldering support.",
  },
  {
    title:
      "Creating Sub-50 Nm Nanofluidic Junctions in PDMS Microfluidic Chip via Self-Assembly Process of Colloidal Particles",
    venue: "Journal of Visualized Experiments",
    year: "2016",
    link: "https://www.jove.com/t/54145/creating-sub-50-nm-nanofluidic-junctions-pdms-microfluidic-chip-via",
    contribution: "Building a voltage divider.",
  },
  {
    title:
      "In our own image? Emotional and neural processing differences when observing human–human vs human–robot interactions",
    venue: "Social Cognitive and Affective Neuroscience 10(11), 1515–1524",
    year: "2015",
    link: "https://doi.org/10.1093/scan/nsv043",
    contribution: "Help preparing the experimental stimuli.",
  },
] satisfies AcknowledgedPublication[];
