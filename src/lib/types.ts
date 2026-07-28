/** Shared types for the content modules in `src/content`. */

/** Animated hero counter. `value` is the number a counter animates toward. */
export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type SocialLinks = {
  linkedin: string;
  github: string;
  gitlab: string;
  scholar: string;
  huggingface: string;
  dockerhub: string;
};

/** A labelled social link, ordered for display. */
export type SocialLink = {
  label: string;
  href: string;
};

export type CurrentRole = {
  title: string;
  org: string;
};

export type Profile = {
  name: string;
  tagline: string;
  location: string;
  email: string;
  summary: string;
  positioning: string;
  currentRole: CurrentRole;
  links: SocialLinks;
  stats: Stat[];
};

/**
 * A single position. `org` is the employer and is repeated across consecutive
 * roles at the same employer so the UI can group them under one header; `unit`
 * is the lab, centre, or department within that employer.
 */
export type Role = {
  id: string;
  title: string;
  org: string;
  unit?: string;
  location?: string;
  period: string;
  current?: boolean;
  highlights: string[];
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  detail?: string;
};

export type Capability = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
};

export type YouTubeVideo = {
  provider: "youtube";
  id: string;
  title: string;
};

export type InstagramVideo = {
  provider: "instagram";
  /** Permalink to the reel or post. */
  url: string;
  title: string;
  /** Local poster under `/public`, preferred over CDN URLs that expire. */
  poster?: string;
};

/**
 * Self-hosted video served from `/public` (or any absolute media URL).
 * Prefer MP4 (H.264) + WebM for broad browser support; keep files lean.
 */
export type LocalVideo = {
  provider: "local";
  /** Path under `/public`, e.g. "/videos/demo.mp4". */
  src: string;
  title: string;
  /** Local poster under `/public`, shown until the visitor presses play. */
  poster?: string;
  /** MIME type; inferred from the file extension when omitted. */
  type?: string;
};

/** Video / reel referenced from project content (hosted or external). */
export type ProjectVideo = YouTubeVideo | InstagramVideo | LocalVideo;

/** Video shown on an award card (YouTube or self-hosted). */
export type AwardVideo = YouTubeVideo | LocalVideo;

/** A real photograph from the archive, rendered with the HUD duotone frame. */
export type ProjectImage = {
  /** Path under `/public`, e.g. "/images/projects/teleop-mocap.jpg". */
  src: string;
  alt: string;
  /** Short telemetry-style caption; keep under ~45 characters. */
  caption: string;
  /** Drives the crop of single-image galleries; defaults to landscape. */
  orientation?: "landscape" | "portrait";
};

/** External page related to the project, e.g. an official facility page. */
export type ProjectLink = {
  label: string;
  href: string;
};

/** Linked paper — typically matches an entry in `publications`. */
export type ProjectPaper = {
  title: string;
  venue: string;
  year: string;
  link: string;
};

/**
 * A featured portfolio project. `domainId` links back to a Capability so
 * projects can sit under domains like Lab Automation without duplicating tags.
 */
export type Project = {
  id: string;
  title: string;
  domainId: string;
  domainLabel: string;
  org: string;
  period?: string;
  summary: string;
  highlights: string[];
  tags: string[];
  video?: ProjectVideo;
  /** Archive photographs shown in the project's media column. */
  images?: ProjectImage[];
  paper?: ProjectPaper;
  /**
   * Extra papers kept behind a collapsed disclosure on the card
   * (e.g. acknowledgement lists) so the main layout stays light.
   */
  relatedPapers?: ProjectPaper[];
  /** Summary label for the related-papers disclosure (defaults to "Named in N papers"). */
  relatedPapersLabel?: string;
  /** External page rendered as a call-to-action button. */
  link?: ProjectLink;
};

export type StackGroup = {
  id: string;
  label: string;
  items: string[];
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  citations: number;
  link: string;
};

export type Patent = {
  title: string;
  number: string;
  note?: string;
};

/** View-only award evidence (letter / certificate) — same model as certifications. */
export type AwardCertificate = {
  label: string;
  /** Watermarked full-size image shown in the protected lightbox. */
  src: string;
  /** Small watermarked thumbnail beside the award copy. */
  thumbSrc: string;
  alt: string;
  /** Short telemetry-style caption; keep under ~45 characters. */
  caption: string;
};

export type Award = {
  id: string;
  placement: string;
  event: string;
  detail?: string;
  location?: string;
  year: string;
  video?: AwardVideo;
  /** Hero photograph shown above the award copy, like a YouTube embed. */
  image?: ProjectImage;
  /** View-only watermarked previews (letters, certificates of recognition). */
  certificates?: AwardCertificate[];
  /** Linked paper — same shape as project papers ("Read paper →"). */
  paper?: ProjectPaper;
};

export type CertificationImage = {
  /** Watermarked full-size image shown in the protected lightbox. */
  src: string;
  /** Small watermarked thumbnail beside the certification copy. */
  thumbSrc: string;
  alt: string;
  /** Short telemetry-style caption; keep under ~45 characters. */
  caption: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  detail?: string;
  year: string;
  /** View-only watermarked preview (no downloadable PDF). */
  image?: CertificationImage;
};

/**
 * A LinkedIn post worth surfacing on the site. `excerpt` is a trimmed pull-quote
 * from the post itself — the full thread, media, and comments stay on LinkedIn.
 */
export type Post = {
  id: string;
  /** Editorial title; LinkedIn posts have none of their own. */
  title: string;
  /** ISO date of publication, used for ordering and the `<time>` element. */
  date: string;
  /** Human-readable form of `date`. */
  dateLabel: string;
  excerpt: string;
  /** Post hashtags, stored without the leading `#`. */
  tags: string[];
  url: string;
};

/** A photograph in the Field Log gallery — real shots from labs and deployments. */
export type FieldPhoto = {
  /** Path under `/public`, e.g. "/images/field/dwc-desert-rig.jpg". */
  src: string;
  alt: string;
  /** Short telemetry-style caption; keep under ~45 characters. */
  caption: string;
  /** Where / when the shot was taken, e.g. "DUBAI · 2021". */
  location: string;
  /** Drives the crop in the gallery grid; defaults to landscape. */
  orientation?: "landscape" | "portrait";
};

/** External exhibition, trade show, or festival where CAIR / NYUAD was represented. */
export type Exhibition = {
  id: string;
  name: string;
  role: string;
  location?: string;
  period: string;
  year: string;
  link?: string;
  /** Optional talk or booth reel shown above the exhibition copy. */
  video?: YouTubeVideo;
};
