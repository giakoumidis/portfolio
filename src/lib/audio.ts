/**
 * Soundtrack licensing status for the ambient YouTube track (Blade Runner
 * "Main Titles"). Do not remove audio without owner approval.
 * PENDING OWNER REVIEW — confirm valid license, replace, or remove before treating as cleared.
 */
export const AUDIO_LICENSE_STATUS = "pending-confirmation" as const;

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
