"use client";

import {
  startTransition,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { AUDIO_TRACK } from "@/lib/audio";
import { MEDIA_VIDEO_PLAY, MEDIA_VIDEO_STOP } from "@/lib/media-events";
import { canHoverPlay } from "@/lib/video-playback";

// Ambient track license status: see AUDIO_LICENSE_STATUS in @/lib/audio
const VIDEO_ID = AUDIO_TRACK.videoId;
const TRACK_DURATION = AUDIO_TRACK.durationSeconds;
const MUTED_KEY = "ng-audio-muted";
const VOLUME_KEY = "ng-audio-volume-v2";
const DEFAULT_VOLUME = 50;
const FADE_MS = 1800;

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getPlayerState: () => number;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement | string,
    options: {
      videoId: string;
      width?: number | string;
      height?: number | string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YTPlayer }) => void;
        onStateChange?: (event: { data: number; target: YTPlayer }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function clampVolume(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, value));
}

function readStoredMuted() {
  try {
    return localStorage.getItem(MUTED_KEY) === "1";
  } catch {
    return false;
  }
}

function readStoredVolume() {
  try {
    const raw = localStorage.getItem(VOLUME_KEY);
    if (raw == null) return DEFAULT_VOLUME;
    return clampVolume(Number(raw));
  } catch {
    return DEFAULT_VOLUME;
  }
}

/** iOS Safari blocks the YT IFrame API for hidden players — use a direct embed instead. */
function prefersDirectEmbed() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    /iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

function mobileEmbedSrc(muted: boolean, startSeconds = 0) {
  const params = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    loop: "1",
    playlist: VIDEO_ID,
    controls: "0",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    enablejsapi: "1",
    mute: muted ? "1" : "0",
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }
  if (startSeconds > 0) {
    params.set("start", String(Math.floor(startSeconds)));
  }
  return `https://www.youtube.com/embed/${VIDEO_ID}?${params}`;
}

/** Best-effort command channel for the mobile direct embed (no YT.Player). */
function sendYtCommand(
  iframe: HTMLIFrameElement,
  func: string,
  args: Array<string | number | boolean> = [],
) {
  try {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  } catch {
    /* cross-origin / not ready */
  }
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function VolumeOnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.59v6.82c1.46-.52 2.5-1.9 2.5-3.41zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function VolumeOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.94 8.94 0 0 0 3.69-1.81L19.73 21 21 19.73 4.27 3zM14 3.23v2.06c1.78.46 3.27 1.68 4.1 3.3l-1.55 1.55A5.98 5.98 0 0 0 14 8.59V3.23zM16.5 12c0-.77-.15-1.5-.41-2.17L14 11.91V12c0 .55-.1 1.07-.28 1.55l1.55 1.55c.42-.88.67-1.87.73-2.92.02-.06.01-.12.01-.18zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10.5V17M12 7.5h.01" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Ambient soundtrack via YouTube.
 * Desktop: IFrame API with volume fade + progress.
 * Mobile/iOS: direct iframe src set inside a tap handler (the only reliable path on Safari).
 */
export default function BackgroundMusic() {
  const hostId = useId().replace(/:/g, "");
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [awaitingTap, setAwaitingTap] = useState(false);
  // Detect mobile only after mount so SSR and the first client render match.
  const [mobileMode, setMobileMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hoverPreview, setHoverPreview] = useState(false);

  const mutedRef = useRef(false);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const playerRef = useRef<YTPlayer | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const mobileModeRef = useRef(false);
  const fadeRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const wantPlayRef = useRef(true);
  const pausedByVideoRef = useRef(false);
  const activeVideoCountRef = useRef(0);
  const seekingRef = useRef(false);
  const seekSettleRef = useRef<number | null>(null);
  const durationRef = useRef<number>(TRACK_DURATION);
  /** Seconds to resume from after pause (desktop + mobile). */
  const resumeAtRef = useRef(0);
  const mobilePlayStartedRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const playingRef = useRef(false);
  /** Wall-clock anchor — hidden YT embeds often report stale/zero currentTime. */
  const lastWallRef = useRef<number | null>(null);
  /**
   * iOS fires touchstart then a synthetic click. Starting in touchstart and
   * toggling again on click would immediately pause — suppress that click.
   */
  const suppressPlayClickRef = useRef(false);
  const dockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedMuted = readStoredMuted();
    const storedVolume = readStoredVolume();
    mutedRef.current = storedMuted;
    volumeRef.current = storedVolume;
    wantPlayRef.current = !storedMuted;
    durationRef.current = TRACK_DURATION;

    const isMobile = prefersDirectEmbed();
    mobileModeRef.current = isMobile;

    // Defer client-only hydration so SSR markup matches the first paint.
    startTransition(() => {
      setMuted(storedMuted);
      setVolume(storedVolume);
      setMobileMode(isMobile);
      setHoverPreview(canHoverPlay());
      setMounted(true);
      if (isMobile) {
        setReady(true);
        if (!storedMuted) setAwaitingTap(true);
      }
    });
  }, []);

  useEffect(() => {
    mutedRef.current = muted;
    try {
      localStorage.setItem(MUTED_KEY, muted ? "1" : "0");
    } catch {
      /* private mode */
    }
  }, [muted]);

  useEffect(() => {
    volumeRef.current = volume;
    try {
      localStorage.setItem(VOLUME_KEY, String(volume));
    } catch {
      /* private mode */
    }

    const player = playerRef.current;
    if (!player || mutedRef.current || !playing) return;
    player.setVolume(volume);
  }, [volume, playing]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    playingRef.current = playing;
    if (!playing) lastWallRef.current = null;
  }, [playing]);

  useEffect(() => {
    return () => {
      if (seekSettleRef.current != null) window.clearTimeout(seekSettleRef.current);
    };
  }, []);

  // Close track preview on outside tap (fixes iOS sticky-hover / stuck overlay).
  useEffect(() => {
    if (!previewOpen) return;

    const onPointerDown = (event: Event) => {
      const dock = dockRef.current;
      const target = event.target;
      if (dock && target instanceof Node && dock.contains(target)) return;
      setPreviewOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [previewOpen]);

  useEffect(() => {
    if (!ready) return;

    const applyPlayhead = (seconds: number, duration: number) => {
      const wrapped = ((seconds % duration) + duration) % duration;
      resumeAtRef.current = wrapped;
      const next = clampProgress((wrapped / duration) * 100);
      progressRef.current = next;
      setProgress(next);
    };

    const tick = () => {
      if (seekingRef.current) return;

      const player = playerRef.current;
      const now = performance.now();
      let duration = durationRef.current;

      if (player) {
        try {
          const apiDuration = player.getDuration();
          if (apiDuration > 0) {
            duration = apiDuration;
            durationRef.current = apiDuration;
          }
        } catch {
          /* ignore */
        }
      }

      if (!duration || duration <= 0) return;

      // Desktop: prefer API time only when it looks trustworthy.
      if (player && !mobileModeRef.current) {
        try {
          const state = player.getPlayerState();
          const apiTime = player.getCurrentTime();
          const playingState = 1;
          const pausedState = 2;
          const spuriousZero =
            apiTime < 0.35 && resumeAtRef.current > 1.5 && state !== pausedState;
          if (
            (state === playingState || state === pausedState) &&
            Number.isFinite(apiTime) &&
            apiTime >= 0 &&
            !spuriousZero
          ) {
            lastWallRef.current = now;
            applyPlayhead(apiTime, duration);
            return;
          }
        } catch {
          /* ignore */
        }
      }

      // Mobile (and desktop fallback): advance from last known position while playing.
      if (playingRef.current) {
        if (lastWallRef.current != null) {
          applyPlayhead(
            resumeAtRef.current + (now - lastWallRef.current) / 1000,
            duration,
          );
        }
        lastWallRef.current = now;
      } else {
        lastWallRef.current = null;
      }
    };

    tick();
    const id = window.setInterval(tick, 200);
    return () => window.clearInterval(id);
  }, [ready]);

  const clearFade = () => {
    if (fadeRef.current != null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = (target: number, durationMs = FADE_MS) => {
    const player = playerRef.current;
    if (!player) return;

    clearFade();
    const from = player.getVolume();
    const start = performance.now();

    const tick = (now: number) => {
      if (!playerRef.current) return;
      const t = Math.min(1, (now - start) / durationMs);
      const next = Math.round(from + (target - from) * t);
      playerRef.current.setVolume(next);
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(tick);
      } else {
        fadeRef.current = null;
      }
    };

    fadeRef.current = requestAnimationFrame(tick);
  };

  const applyMuteToPlayer = (nextMuted: boolean) => {
    const player = playerRef.current;
    if (!player) return;

    if (nextMuted) {
      clearFade();
      player.setVolume(0);
      player.mute();
      return;
    }

    player.unMute();
    player.setVolume(volumeRef.current);
  };

  const captureDesktopPosition = () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      const current = player.getCurrentTime();
      if (Number.isFinite(current) && current >= 0) {
        resumeAtRef.current = current;
        const duration = player.getDuration() || durationRef.current;
        if (duration > 0) {
          durationRef.current = duration;
          setProgress(clampProgress((current / duration) * 100));
        }
      }
    } catch {
      if (durationRef.current > 0) {
        resumeAtRef.current = (progressRef.current / 100) * durationRef.current;
      }
    }
  };

  const restoreDesktopPosition = (player: YTPlayer) => {
    const resumeAt = resumeAtRef.current;
    if (!resumeAt || resumeAt <= 0) return;
    try {
      const current = player.getCurrentTime();
      if (Math.abs(current - resumeAt) > 0.5) {
        player.seekTo(resumeAt, true);
      }
    } catch {
      player.seekTo(resumeAt, true);
    }
  };

  const captureMobilePosition = () => {
    // Progress polling keeps resumeAt/progress current — just freeze the clocks.
    if (durationRef.current > 0) {
      resumeAtRef.current = (progressRef.current / 100) * durationRef.current;
    }
    mobilePlayStartedRef.current = null;
    lastWallRef.current = null;
  };

  const applyMobileVolume = (iframe: HTMLIFrameElement, nextMuted: boolean, nextVolume: number) => {
    // Handshake + commands — works when enablejsapi is on; ignored if the player isn't ready.
    try {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: hostId }),
        "*",
      );
    } catch {
      /* ignore */
    }
    if (nextMuted || nextVolume <= 0) {
      sendYtCommand(iframe, "mute");
      sendYtCommand(iframe, "setVolume", [0]);
    } else {
      sendYtCommand(iframe, "unMute");
      sendYtCommand(iframe, "setVolume", [nextVolume]);
    }
  };

  const startMobilePlayback = () => {
    if (!wantPlayRef.current) return false;

    const iframe = iframeRef.current;
    if (!iframe) return false;

    // Setting src synchronously inside a tap handler is what iOS Safari requires.
    iframe.src = mobileEmbedSrc(mutedRef.current, resumeAtRef.current);
    mobilePlayStartedRef.current = performance.now();
    lastWallRef.current = performance.now();

    // After the embed boots, push stored volume (unmute path may still start muted by policy).
    window.setTimeout(() => {
      const live = iframeRef.current;
      if (!live || !playingRef.current) return;
      applyMobileVolume(live, mutedRef.current, volumeRef.current);
    }, 600);

    setPlaying(true);
    setAwaitingTap(false);
    startedRef.current = true;
    return true;
  };

  const stopMobilePlayback = () => {
    captureMobilePosition();
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.src = "";
    }
    setPlaying(false);
  };

  const startDesktopPlayback = (opts?: { fade?: boolean }) => {
    const player = playerRef.current;
    if (!player || !wantPlayRef.current) return false;

    // Already audible — don't reset volume to 0 / restart the fade
    // (pointerdown on the volume slider would otherwise fight setVolume).
    if (startedRef.current && player.getPlayerState() === 1 /* PLAYING */) {
      applyMuteToPlayer(mutedRef.current);
      setPlaying(true);
      setAwaitingTap(false);
      return true;
    }

    restoreDesktopPosition(player);

    const shouldFade = opts?.fade !== false && !mutedRef.current;
    if (mutedRef.current) {
      clearFade();
      player.mute();
      player.setVolume(0);
      player.playVideo();
    } else if (shouldFade) {
      player.unMute();
      player.setVolume(0);
      player.playVideo();
      fadeTo(volumeRef.current);
    } else {
      clearFade();
      player.unMute();
      player.setVolume(volumeRef.current);
      player.playVideo();
    }
    setPlaying(true);
    setAwaitingTap(false);
    startedRef.current = true;
    return true;
  };

  const pauseDesktopPlayback = () => {
    const player = playerRef.current;
    if (!player) return;

    clearFade();
    captureDesktopPosition();
    player.pauseVideo();
    setPlaying(false);
  };

  const stopDesktopPlayback = () => {
    const player = playerRef.current;
    if (!player) return;

    clearFade();
    captureDesktopPosition();
    player.setVolume(0);
    player.mute();
    player.pauseVideo();
    setPlaying(false);
  };

  const pausePlayback = () => {
    if (mobileModeRef.current) return stopMobilePlayback();
    return pauseDesktopPlayback();
  };

  const stopPlayback = () => {
    if (mobileModeRef.current) return stopMobilePlayback();
    return stopDesktopPlayback();
  };

  useEffect(() => {
    if (!mounted) return;

    const onVideoPlay = () => {
      activeVideoCountRef.current += 1;
      if (activeVideoCountRef.current !== 1) return;

      pausedByVideoRef.current = true;
      stopPlayback();
    };

    const onVideoStop = () => {
      activeVideoCountRef.current = Math.max(0, activeVideoCountRef.current - 1);
      if (activeVideoCountRef.current !== 0 || !pausedByVideoRef.current) return;

      pausedByVideoRef.current = false;
      if (!wantPlayRef.current) return;

      // Mobile Safari needs a user gesture to restart the hidden iframe embed.
      if (mobileModeRef.current || !startedRef.current) {
        setAwaitingTap(true);
        return;
      }

      startDesktopPlayback();
    };

    window.addEventListener(MEDIA_VIDEO_PLAY, onVideoPlay);
    window.addEventListener(MEDIA_VIDEO_STOP, onVideoStop);
    return () => {
      window.removeEventListener(MEDIA_VIDEO_PLAY, onVideoPlay);
      window.removeEventListener(MEDIA_VIDEO_STOP, onVideoStop);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || mobileMode) return;

    let disposed = false;
    let pollId: number | null = null;
    const pendingReady: Array<() => void> = [];

    const clearPoll = () => {
      if (pollId != null) {
        window.clearInterval(pollId);
        pollId = null;
      }
    };

    const onPlayerReady = (event: { target: YTPlayer }) => {
      if (disposed) {
        event.target.destroy();
        return;
      }
      playerRef.current = event.target;
      setReady(true);
      try {
        const duration = event.target.getDuration();
        if (duration > 0) durationRef.current = duration;
      } catch {
        /* duration not available yet */
      }

      if (!wantPlayRef.current) {
        event.target.setVolume(0);
        event.target.mute();
        return;
      }

      // Try unmuted autoplay at the default volume. Chrome often blocks this;
      // if so we fall back to muted playback and unlock on the first gesture.
      if (mutedRef.current) {
        event.target.mute();
        event.target.setVolume(0);
        event.target.playVideo();
        startedRef.current = true;
        setPlaying(true);
        setAwaitingTap(false);
        return;
      }

      event.target.unMute();
      event.target.setVolume(0);
      event.target.playVideo();
      fadeTo(volumeRef.current);
      startedRef.current = true;
      setPlaying(true);
      setAwaitingTap(false);

      window.setTimeout(() => {
        if (disposed || !wantPlayRef.current) return;
        const player = playerRef.current;
        if (!player) return;

        const state = player.getPlayerState();
        const YT = window.YT;
        const isActive = YT
          ? state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING
          : state === 1 || state === 3;

        let audible = false;
        try {
          audible = isActive && !player.isMuted() && player.getVolume() > 0;
        } catch {
          audible = isActive;
        }

        if (audible) return;

        clearFade();
        player.mute();
        player.setVolume(volumeRef.current);
        player.playVideo();
        startedRef.current = true;
        setPlaying(isActive);
        setAwaitingTap(true);
      }, 500);
    };

    const onStateChange = (event: { data: number; target: YTPlayer }) => {
      const YT = window.YT;
      if (!YT) return;
      if (event.data === YT.PlayerState.ENDED) {
        event.target.playVideo();
      }
      // Treat buffering as playing so seeks don't flip the transport to "paused".
      setPlaying(
        event.data === YT.PlayerState.PLAYING ||
          event.data === YT.PlayerState.BUFFERING,
      );
    };

    const createPlayer = () => {
      if (disposed || !window.YT?.Player) return;
      const mount = document.getElementById(`yt-audio-${hostId}`);
      if (!mount || playerRef.current) return;

      new window.YT.Player(mount, {
        videoId: VIDEO_ID,
        width: 200,
        height: 200,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: VIDEO_ID,
          origin: window.location.origin,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange,
        },
      });
    };

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      for (const cb of pendingReady.splice(0)) cb();
      createPlayer();
    };

    if (window.YT?.Player) {
      createPlayer();
    } else if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
      pendingReady.push(createPlayer);
    } else {
      pendingReady.push(createPlayer);
      pollId = window.setInterval(() => {
        if (disposed) {
          clearPoll();
          return;
        }
        if (window.YT?.Player) {
          clearPoll();
          createPlayer();
        }
      }, 50);
    }

    const armFromGesture = (event: Event) => {
      if (disposed || !wantPlayRef.current) return;
      // Transport controls have their own handlers — don't restart playback / fade on drag.
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('[aria-label="Background music controls"]')
      ) {
        return;
      }
      startDesktopPlayback();
    };

    window.addEventListener("touchstart", armFromGesture, { passive: true });
    window.addEventListener("pointerdown", armFromGesture);
    window.addEventListener("keydown", armFromGesture);

    const onVisibility = () => {
      const player = playerRef.current;
      if (!player) return;
      if (document.hidden) {
        try {
          const current = player.getCurrentTime();
          if (Number.isFinite(current) && current >= 0) {
            resumeAtRef.current = current;
          }
        } catch {
          /* ignore */
        }
        player.pauseVideo();
        return;
      }
      if (wantPlayRef.current && startedRef.current) {
        try {
          const resumeAt = resumeAtRef.current;
          if (resumeAt > 0) {
            const current = player.getCurrentTime();
            if (Math.abs(current - resumeAt) > 0.5) {
              player.seekTo(resumeAt, true);
            }
          }
        } catch {
          /* ignore */
        }
        applyMuteToPlayer(mutedRef.current);
        player.playVideo();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      clearFade();
      clearPoll();
      window.removeEventListener("touchstart", armFromGesture);
      window.removeEventListener("pointerdown", armFromGesture);
      window.removeEventListener("keydown", armFromGesture);
      document.removeEventListener("visibilitychange", onVisibility);
      window.onYouTubeIframeAPIReady = previousReady;
      try {
        playerRef.current?.destroy();
      } catch {
        /* already gone */
      }
      playerRef.current = null;
      startedRef.current = false;
    };
  }, [hostId, mounted, mobileMode]);

  useEffect(() => {
    if (!mounted || !mobileMode) return;

    const iframe = document.createElement("iframe");
    iframe.title = "Background soundtrack";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.setAttribute("playsinline", "true");
    iframe.setAttribute("aria-hidden", "true");
    // 1×1 visible pixel — iOS often refuses playback for opacity~0 / offscreen media.
    iframe.className =
      "pointer-events-none fixed bottom-0 left-0 z-[-1] h-px w-px border-0 opacity-100";
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    return () => {
      iframe.remove();
      iframeRef.current = null;
    };
  }, [mounted, mobileMode]);

  const togglePlay = () => {
    if (playingRef.current) {
      wantPlayRef.current = false;
      pausePlayback();
      setAwaitingTap(false);
      return;
    }

    wantPlayRef.current = true;
    if (mobileModeRef.current) {
      setAwaitingTap(!startMobilePlayback());
      return;
    }

    if (playerRef.current) {
      startDesktopPlayback({ fade: false });
    } else {
      setAwaitingTap(true);
    }
  };

  /** Start inside the user-gesture window on touch; ignore the follow-up click. */
  const onPlayPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    suppressPlayClickRef.current = true;
    togglePlay();
  };

  const onPlayClick = () => {
    if (suppressPlayClickRef.current) {
      suppressPlayClickRef.current = false;
      return;
    }
    togglePlay();
  };

  const toggleMute = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);

    if (mobileModeRef.current) {
      if (!wantPlayRef.current || !playingRef.current) return;
      // Remount with mute flag — postMessage mute is unreliable on iOS.
      captureMobilePosition();
      startMobilePlayback();
      return;
    }

    const player = playerRef.current;
    if (!player) return;

    applyMuteToPlayer(next);
  };

  const onVolumeInput = (value: number) => {
    const next = clampVolume(value);
    setVolume(next);
    volumeRef.current = next;

    if (next === 0) {
      mutedRef.current = true;
      setMuted(true);
      if (mobileModeRef.current) {
        const iframe = iframeRef.current;
        if (iframe && playingRef.current) applyMobileVolume(iframe, true, 0);
        return;
      }
      applyMuteToPlayer(true);
      return;
    }

    if (mutedRef.current) {
      mutedRef.current = false;
      setMuted(false);
    }

    if (mobileModeRef.current) {
      const iframe = iframeRef.current;
      if (!iframe) return;
      if (!playingRef.current && wantPlayRef.current) {
        startMobilePlayback();
      }
      applyMobileVolume(iframe, false, next);
      // Remount unmuted so iOS actually hears audio if postMessage was ignored.
      if (playingRef.current && iframe.src.includes("mute=1")) {
        captureMobilePosition();
        startMobilePlayback();
      }
      return;
    }

    clearFade();
    const player = playerRef.current;
    if (!player) return;

    // First slider move also unlocks Chrome autoplay (controls are excluded from armFromGesture).
    if (!startedRef.current || !wantPlayRef.current) {
      wantPlayRef.current = true;
      startDesktopPlayback({ fade: false });
      return;
    }

    try {
      if (player.isMuted()) player.unMute();
    } catch {
      player.unMute();
    }
    player.setVolume(next);
  };

  const seekToPercent = (value: number, opts?: { resume?: boolean }) => {
    const next = clampProgress(value);
    setProgress(next);
    progressRef.current = next;
    lastWallRef.current = performance.now();

    const duration = durationRef.current;
    if (!duration || duration <= 0) return;
    const seconds = (next / 100) * duration;
    resumeAtRef.current = seconds;

    if (mobileModeRef.current) {
      // Only remount when the scrub ends — live input would thrash the embed.
      if (opts?.resume && wantPlayRef.current) {
        mobilePlayStartedRef.current = performance.now();
        startMobilePlayback();
      }
      return;
    }

    const player = playerRef.current;
    if (!player) return;

    try {
      try {
        const apiDuration = player.getDuration();
        if (apiDuration > 0) durationRef.current = apiDuration;
      } catch {
        /* keep fallback duration */
      }
      player.seekTo(seconds, true);
      if (opts?.resume && wantPlayRef.current) {
        applyMuteToPlayer(mutedRef.current);
        player.playVideo();
        setPlaying(true);
        setAwaitingTap(false);
        startedRef.current = true;
      }
    } catch {
      /* ignore */
    }
  };

  const holdSeekUntilSettled = () => {
    seekingRef.current = true;
    if (seekSettleRef.current != null) window.clearTimeout(seekSettleRef.current);
    // YouTube seekTo is async — keep polling paused briefly so the bar doesn't snap back.
    seekSettleRef.current = window.setTimeout(() => {
      seekingRef.current = false;
      seekSettleRef.current = null;
    }, 400);
  };

  const beginSeek = (event: PointerEvent<HTMLInputElement>) => {
    seekingRef.current = true;
    if (seekSettleRef.current != null) {
      window.clearTimeout(seekSettleRef.current);
      seekSettleRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const endSeek = (event: PointerEvent<HTMLInputElement>) => {
    seekToPercent(Number(event.currentTarget.value), { resume: true });
    holdSeekUntilSettled();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const isPaused = !playing && !awaitingTap;
  const showPlaying = playing && !awaitingTap;

  const openPreview = () => {
    if (!hoverPreview) return;
    setPreviewOpen(true);
  };
  const closePreview = () => {
    if (!hoverPreview) return;
    setPreviewOpen(false);
  };
  const togglePreview = () => setPreviewOpen((open) => !open);

  return (
    <div
      ref={dockRef}
      role="group"
      aria-label="Background music controls"
      onMouseEnter={openPreview}
      onMouseLeave={closePreview}
      onFocusCapture={openPreview}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closePreview();
        }
      }}
      className={`fixed right-4 bottom-4 z-50 flex flex-col items-stretch border bg-bg/40 backdrop-blur-md lg:right-6 lg:bottom-6 ${
        awaitingTap ? "border-cyan/60 shadow-[0_0_16px_rgba(0,240,255,0.25)]" : "border-grid-dim"
      }`}
    >
      {/* Track credits preview — hover on desktop; explicit toggle on touch. */}
      <div
        className={
          previewOpen
            ? "relative flex h-[90px] w-full min-w-[280px] overflow-hidden border-b border-cyan/40 bg-bg/50 sm:min-w-[320px]"
            : mobileMode
              ? "pointer-events-none fixed bottom-0 left-0 z-[-1] h-px w-px overflow-hidden opacity-100"
              : // Desktop YT host must stay large enough for the IFrame API / autoplay.
                "pointer-events-none fixed bottom-0 left-0 z-[-1] h-[200px] w-[200px] overflow-hidden opacity-[0.01]"
        }
        aria-hidden={!previewOpen}
      >
        {previewOpen && (
          <a
            href={AUDIO_TRACK.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Open ${AUDIO_TRACK.title} by ${AUDIO_TRACK.artist} on YouTube`}
            title="Open on YouTube"
          />
        )}

        <div
          className={
            previewOpen
              ? "relative h-full w-[120px] shrink-0 overflow-hidden bg-bg-raised/60 sm:w-[140px] [&_iframe]:pointer-events-none [&_iframe]:!h-full [&_iframe]:!w-full"
              : "h-full w-full [&_iframe]:!h-full [&_iframe]:!w-full"
          }
        >
          {mobileMode ? (
            previewOpen ? (
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                alt=""
                className="h-full w-full object-cover opacity-90"
              />
            ) : null
          ) : (
            /* Stable mount — YT replaces this with an iframe; don't toggle its classes. */
            <div id={`yt-audio-${hostId}`} />
          )}
        </div>

        {previewOpen && (
          <div className="pointer-events-none relative flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-2.5 py-2">
            <p className="label-mono text-[10px] tracking-[0.14em] text-cyan">
              Ambient audio
            </p>
            <p className="truncate font-display text-xs font-semibold text-text">
              {AUDIO_TRACK.title}
            </p>
            <p className="truncate text-[11px] text-text-dim">{AUDIO_TRACK.artist}</p>
            <p className="truncate text-[10px] text-text-dim/80">
              {AUDIO_TRACK.albumShort}
            </p>
            <p className="label-mono mt-0.5 text-[10px] text-cyan/80">YouTube ↗</p>
          </div>
        )}
      </div>

      <div className="relative z-20 flex items-center gap-2 px-2.5 py-2 sm:gap-3 sm:px-3">
        <button
          type="button"
          onPointerDown={onPlayPointerDown}
          onClick={onPlayClick}
          disabled={!ready && !mobileMode}
          aria-label={showPlaying ? "Pause background music" : "Play background music"}
          title={showPlaying ? "Pause" : awaitingTap ? "Tap to start" : "Play"}
          className={`relative flex h-8 w-8 shrink-0 items-center justify-center text-text-dim transition-colors duration-200 hover:text-cyan disabled:opacity-40 ${
            awaitingTap ? "text-cyan" : ""
          }`}
        >
          {showPlaying ? (
            <PauseIcon className="h-4 w-4 fill-current" />
          ) : (
            <PlayIcon className="h-4 w-4 fill-current" />
          )}
          {awaitingTap && (
            <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-cyan shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
          )}
        </button>

        <label
          className={`relative flex h-8 w-24 cursor-pointer items-center sm:w-40 ${
            !ready ? "cursor-not-allowed opacity-45" : ""
          }`}
        >
          <span className="sr-only">Scrub track position</span>
          <span
            aria-hidden
            className={`audio-progress-track pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden ${
              showPlaying ? "audio-progress-track--active" : ""
            }`}
          >
            <span
              className={`audio-progress-fill absolute inset-y-0 left-0 ${
                showPlaying ? "audio-progress-fill--active" : ""
              }`}
              style={{ width: `${progress}%` }}
            />
          </span>
          <span
            aria-hidden
            className={`audio-progress-thumb pointer-events-none absolute top-1/2 -translate-y-1/2 ${
              showPlaying ? "audio-progress-thumb--active" : ""
            }`}
            style={{ left: `clamp(0px, calc(${progress}% - 3px), calc(100% - 6px))` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            step={0.25}
            value={progress}
            disabled={!ready}
            onPointerDown={beginSeek}
            onPointerUp={endSeek}
            onPointerCancel={endSeek}
            onInput={(event) => {
              seekingRef.current = true;
              seekToPercent(Number(event.currentTarget.value));
            }}
            onChange={(event) =>
              seekToPercent(Number(event.currentTarget.value), {
                resume: !seekingRef.current,
              })
            }
            onKeyUp={(event) => {
              if (
                event.key === "ArrowLeft" ||
                event.key === "ArrowRight" ||
                event.key === "Home" ||
                event.key === "End"
              ) {
                seekToPercent(Number(event.currentTarget.value), { resume: true });
                holdSeekUntilSettled();
              }
            }}
            aria-valuetext={showPlaying ? "Playing" : isPaused ? "Paused" : "Loading"}
            title="Drag to scrub track"
            className="audio-progress-input absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed"
          />
        </label>

        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={muted || volume === 0}
          aria-label={muted || volume === 0 ? "Unmute background music" : "Mute background music"}
          title={muted || volume === 0 ? "Unmute" : "Mute"}
          className="flex h-8 w-8 shrink-0 items-center justify-center text-text-dim transition-colors duration-200 hover:text-cyan"
        >
          {muted || volume === 0 ? (
            <VolumeOffIcon className="h-4 w-4 fill-current" />
          ) : (
            <VolumeOnIcon className="h-4 w-4 fill-current" />
          )}
        </button>

        <label className="flex items-center gap-2">
          <span className="sr-only">Volume</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={muted ? 0 : volume}
            onChange={(event) => onVolumeInput(Number(event.target.value))}
            aria-valuetext={muted ? "Muted" : `${volume} percent`}
            className="audio-slider h-1 w-14 cursor-pointer appearance-none bg-transparent accent-cyan sm:w-20"
          />
        </label>

        {mounted && !hoverPreview && (
          <button
            type="button"
            onClick={togglePreview}
            aria-expanded={previewOpen}
            aria-label={previewOpen ? "Hide track info" : "Show track info"}
            title={previewOpen ? "Hide info" : "Track info"}
            className={`flex h-8 w-8 shrink-0 items-center justify-center transition-colors duration-200 hover:text-cyan ${
              previewOpen ? "text-cyan" : "text-text-dim"
            }`}
          >
            <InfoIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
