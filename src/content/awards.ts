import type { Award, Certification } from "@/lib/types";

export const awards = [
  {
    id: "rta-dubai-world-challenge-2021",
    placement: "First Prize",
    event: "RTA Dubai World Challenge for Self-Driving Transport",
    detail: "Delivery Drone · USD 100,000",
    location: "Dubai, UAE",
    year: "2021",
    video: {
      provider: "local",
      src: "/videos/awards/rta-2021/drone-delivery.mp4",
      title:
        "Delivery drone — RTA Dubai World Challenge for Self-Driving Transport",
      poster: "/images/awards/rta-2021/delivery-drone-nyuad.jpg",
    },
    image: {
      src: "/images/awards/rta-2021/rta-ceremony.jpg",
      alt: "NYU Abu Dhabi receiving the first-prize award for the delivery drone at the RTA Dubai World Challenge ceremony",
      caption: "FIRST PRIZE — RTA AWARD CEREMONY",
      orientation: "landscape",
    },
    certificates: [
      {
        label: "RTA winners letter",
        src: "/images/awards/rta-2021/rta-winners-letter.jpg",
        thumbSrc: "/images/awards/rta-2021/rta-winners-letter-thumb.jpg",
        alt: "Formal RTA winners letter congratulating the NYU Abu Dhabi team on first place in the Dubai World Challenge 2021",
        caption: "RTA · WINNERS LETTER · VIEW ONLY",
      },
      {
        label: "Certificate of recognition",
        src: "/images/awards/rta-2021/rta-certificate.jpg",
        thumbSrc: "/images/awards/rta-2021/rta-certificate-thumb.jpg",
        alt: "RTA Certificate of Appreciation issued to Nikos Giakoumidis for the Dubai World Challenge 2021",
        caption: "RTA · CERTIFICATE · VIEW ONLY",
      },
    ],
    paper: {
      title: "Mechatronic design of a delivery octarotor drone",
      venue:
        "International Journal of Mechanical Engineering and Robotics Research 11 (5)",
      year: "2022",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HmOOogwAAAAJ&citation_for_view=HmOOogwAAAAJ:hqOjcs7Dif8C",
    },
  },
  {
    id: "design-embedit-2012",
    placement: "First Prize",
    event: "Design EmbedIT Competition",
    detail: "Soft Body Robot · ShanghAI Lectures",
    location: "Shanghai, China",
    year: "2012",
    video: {
      provider: "youtube",
      id: "3iChQSdb7p4",
      title:
        "Soft Body Robot — NYU Abu Dhabi Team at EmbedIT Competition, ShanghAI Lectures 2012",
    },
  },
  {
    id: "world-robot-olympiad-2009",
    placement: "First Prize",
    event: "World Robot Olympiad",
    detail: "LEGO Mindstorms NXT · Greek national round, TEI of Piraeus",
    year: "2009",
    video: {
      provider: "youtube",
      id: "s96Zy8lGH1A",
      title:
        "1st Panhellenic LEGO Mindstorms NXT competition — TEI of Piraeus",
    },
  },
  {
    id: "digital-week-robotics-2008",
    placement: "First Prize",
    event: "Digital Week Robotics Competition",
    location: "Athens, Greece",
    year: "2008",
  },
] satisfies Award[];

export const certifications = [
  {
    id: "dcaa-rpas-2023",
    name: "Professional RPAS Certificate",
    issuer: "Dubai Civil Aviation Authority",
    detail: "Multirotor & Fixed Wing",
    year: "2023",
    image: {
      src: "/images/certifications/dcaa-rpas-2023/rpas-certificate.jpg",
      thumbSrc:
        "/images/certifications/dcaa-rpas-2023/rpas-certificate-thumb.jpg",
      alt: "Professional RPAS Certificate issued to Nikolaos Giakoumidis by Dubai Civil Aviation Authority",
      caption: "DCAA · RPAS 21364 · VIEW ONLY",
    },
  },
  {
    id: "nvidia-dli-robotics-2019",
    name: "Deep Learning for Robotics",
    issuer: "NVIDIA Deep Learning Institute",
    year: "2019",
  },
  {
    id: "kuka-lbr-iiwa-2019",
    name: "KUKA LBR iiwa Commissioning and Programming",
    issuer: "KUKA College",
    year: "2019",
  },
  {
    id: "udacity-deep-rl-2019",
    name: "Deep Reinforcement Learning Nanodegree",
    issuer: "Udacity",
    year: "2019",
    image: {
      src: "/images/certifications/udacity-deep-rl-2019/deep-rl-nanodegree.jpg",
      thumbSrc:
        "/images/certifications/udacity-deep-rl-2019/deep-rl-nanodegree-thumb.jpg",
      alt: "Udacity Deep Reinforcement Learning Nanodegree certificate issued to Nikolaos Giakoumidis",
      caption: "UDACITY · DEEP RL · VIEW ONLY",
    },
  },
] satisfies Certification[];
