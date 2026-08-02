/**
 * Soundtrack licensing status for the ambient YouTube track (Blade Runner
 * "Main Titles"). Do not remove audio without owner approval.
 *
 * Flip to `cleared` (or another cleared status) and update footer credit
 * before treating a public deployment as accepted.
 */
export type AudioLicenseStatus =
  | "pending-confirmation"
  | "cleared"
  | "original"
  | "royalty-free";

export const AUDIO_LICENSE_STATUS: AudioLicenseStatus = "pending-confirmation";

export const AUDIO_TRACK = {
  videoId: "smpTDkLCYb0",
  title: "Main Titles",
  artist: "Vangelis",
  album: "Blade Runner (Music From The Original Soundtrack)",
  albumShort: "Blade Runner OST",
  youtubeUrl: "https://www.youtube.com/watch?v=smpTDkLCYb0",
  /** Used for mobile wall-clock progress (YT API time is unavailable there). */
  durationSeconds: 222,
} as const;

/** Footer credit line after the track title/artist/album sentence. */
export function audioLicenseCredit(): string | null {
  switch (AUDIO_LICENSE_STATUS) {
    case "pending-confirmation":
      return "Licensing confirmation pending.";
    case "cleared":
      return "Used with confirmed licence.";
    case "original":
      return "Original commissioned score.";
    case "royalty-free":
      return "Royalty-free licensed track.";
    default:
      return null;
  }
}
