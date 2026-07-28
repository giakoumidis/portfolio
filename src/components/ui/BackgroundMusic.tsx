"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MEDIA_VIDEO_PLAY, MEDIA_VIDEO_STOP } from "@/lib/media-events";

const VIDEO_ID = "smpTDkLCYb0";
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

function mobileEmbedSrc() {
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
    mute: "0",
  });
  return `https://www.youtube.com/embed/${VIDEO_ID}?${params}`;
}

/**
 * Ambient soundtrack via YouTube.
 * Desktop: IFrame API with volume fade.
 * Mobile/iOS: direct iframe src set inside a tap handler (the only reliable path on Safari).
 */
export default function BackgroundMusic() {
  const hostId = useId().replace(/:/g, "");
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [awaitingTap, setAwaitingTap] = useState(false);
  // Detect mobile only after mount so SSR and the first client render match.
  const [mobileMode, setMobileMode] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    const storedMuted = readStoredMuted();
    const storedVolume = readStoredVolume();
    mutedRef.current = storedMuted;
    volumeRef.current = storedVolume;
    wantPlayRef.current = !storedMuted;
    setMuted(storedMuted);
    setVolume(storedVolume);

    const isMobile = prefersDirectEmbed();
    mobileModeRef.current = isMobile;
    setMobileMode(isMobile);
    setMounted(true);
    if (isMobile) {
      setReady(true);
      if (!storedMuted) setAwaitingTap(true);
    }
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
    if (!player || mutedRef.current) return;
    player.setVolume(volume);
  }, [volume]);

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

  const startMobilePlayback = () => {
    if (mutedRef.current || !wantPlayRef.current) return false;

    const iframe = iframeRef.current;
    if (!iframe) return false;

    // Setting src synchronously inside a tap handler is what iOS Safari requires.
    iframe.src = mobileEmbedSrc();

    setPlaying(true);
    setAwaitingTap(false);
    startedRef.current = true;
    return true;
  };

  const stopMobilePlayback = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.src = "";
    }
    setPlaying(false);
  };

  const startDesktopPlayback = (opts?: { fade?: boolean }) => {
    const player = playerRef.current;
    if (!player || mutedRef.current || !wantPlayRef.current) return false;

    // Already audible — don't reset volume to 0 / restart the fade
    // (pointerdown on the volume slider would otherwise fight setVolume).
    if (startedRef.current && player.getPlayerState() === 1 /* PLAYING */) {
      try {
        if (player.isMuted()) player.unMute();
      } catch {
        player.unMute();
      }
      player.setVolume(volumeRef.current);
      setPlaying(true);
      setAwaitingTap(false);
      return true;
    }

    const shouldFade = opts?.fade !== false;
    player.unMute();
    if (shouldFade) {
      player.setVolume(0);
      player.playVideo();
      fadeTo(volumeRef.current);
    } else {
      clearFade();
      player.setVolume(volumeRef.current);
      player.playVideo();
    }
    setPlaying(true);
    setAwaitingTap(false);
    startedRef.current = true;
    return true;
  };

  const stopDesktopPlayback = () => {
    const player = playerRef.current;
    if (!player) return;

    clearFade();
    player.setVolume(0);
    player.mute();
    player.pauseVideo();
    setPlaying(false);
  };

  const startPlayback = () => {
    if (mobileModeRef.current) return startMobilePlayback();
    return startDesktopPlayback();
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
      if (mutedRef.current || !wantPlayRef.current) return;

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

      if (mutedRef.current || !wantPlayRef.current) {
        event.target.setVolume(0);
        event.target.mute();
        return;
      }

      // Try unmuted autoplay at the default volume. Chrome often blocks this;
      // if so we fall back to muted playback and unlock on the first gesture.
      event.target.unMute();
      event.target.setVolume(0);
      event.target.playVideo();
      fadeTo(volumeRef.current);
      startedRef.current = true;
      setPlaying(true);
      setAwaitingTap(false);

      window.setTimeout(() => {
        if (disposed || mutedRef.current || !wantPlayRef.current) return;
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
      setPlaying(event.data === YT.PlayerState.PLAYING);
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
      if (disposed || mutedRef.current) return;
      // Volume slider has its own handler — don't restart playback / fade on drag.
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('[aria-label="Background music controls"]')
      ) {
        return;
      }
      wantPlayRef.current = true;
      startDesktopPlayback();
    };

    window.addEventListener("touchstart", armFromGesture, { passive: true });
    window.addEventListener("pointerdown", armFromGesture);
    window.addEventListener("keydown", armFromGesture);

    const onVisibility = () => {
      const player = playerRef.current;
      if (!player) return;
      if (document.hidden) {
        player.pauseVideo();
        return;
      }
      if (!mutedRef.current && wantPlayRef.current && startedRef.current) {
        player.unMute();
        player.setVolume(volumeRef.current);
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
    iframe.className =
      "pointer-events-none fixed bottom-0 left-0 z-[-1] h-[200px] w-[200px] border-0 opacity-[0.01]";
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    return () => {
      iframe.remove();
      iframeRef.current = null;
    };
  }, [mounted, mobileMode]);

  const handleStartTap = () => {
    if (mutedRef.current) return;
    wantPlayRef.current = true;
    startPlayback();
  };

  const toggleMute = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    wantPlayRef.current = !next;
    setMuted(next);

    if (next) {
      stopPlayback();
      setAwaitingTap(false);
      return;
    }

    if (mobileModeRef.current) {
      setAwaitingTap(!startMobilePlayback());
      return;
    }

    if (playerRef.current) {
      startDesktopPlayback();
    } else {
      setAwaitingTap(true);
    }
  };

  const onVolumeInput = (value: number) => {
    const next = clampVolume(value);
    setVolume(next);
    volumeRef.current = next;

    if (next === 0) {
      mutedRef.current = true;
      wantPlayRef.current = false;
      setMuted(true);
      stopPlayback();
      return;
    }

    if (mutedRef.current) {
      mutedRef.current = false;
      wantPlayRef.current = true;
      setMuted(false);
      // Slider gesture counts as the unlock — skip fade so level matches the thumb.
      if (mobileModeRef.current) {
        setAwaitingTap(!startMobilePlayback());
      } else {
        startDesktopPlayback({ fade: false });
      }
      return;
    }

    clearFade();
    const player = playerRef.current;
    if (!player) return;

    // First slider move also unlocks Chrome autoplay (controls are excluded from armFromGesture).
    if (!startedRef.current) {
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

  const statusLabel = muted
    ? "AUDIO OFF"
    : awaitingTap
      ? "TAP AUDIO"
      : ready
        ? playing
          ? "AUDIO"
          : "LOADING"
        : "STANDBY";

  return (
    <>
      <div
        id={`yt-audio-${hostId}`}
        aria-hidden
        hidden={mobileMode}
        className="pointer-events-none fixed bottom-0 left-0 z-[-1] h-[200px] w-[200px] overflow-hidden opacity-[0.01]"
      />

      <div
        role="group"
        aria-label="Background music controls"
        onTouchStart={handleStartTap}
        className={`fixed right-4 bottom-4 z-50 flex items-center gap-3 border bg-bg/85 px-3 py-2 backdrop-blur-md lg:right-6 lg:bottom-6 ${
          awaitingTap ? "border-cyan/60 shadow-[0_0_16px_rgba(0,240,255,0.25)]" : "border-grid-dim"
        }`}
      >
        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          title={muted ? "Enable soundtrack" : "Mute soundtrack"}
          className="label-mono flex items-center gap-2 text-text-dim transition-colors duration-200 hover:text-cyan"
        >
          <span
            aria-hidden
            className="relative flex h-3.5 w-3.5 items-center justify-center"
          >
            {muted || volume === 0 ? (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.94 8.94 0 0 0 3.69-1.81L19.73 21 21 19.73 4.27 3zM14 3.23v2.06c1.78.46 3.27 1.68 4.1 3.3l-1.55 1.55A5.98 5.98 0 0 0 14 8.59V3.23zM16.5 12c0-.77-.15-1.5-.41-2.17L14 11.91V12c0 .55-.1 1.07-.28 1.55l1.55 1.55c.42-.88.67-1.87.73-2.92.02-.06.01-.12.01-.18zM12 4 9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.59v6.82c1.46-.52 2.5-1.9 2.5-3.41zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
            {!muted && (playing || awaitingTap) && (
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-cyan shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
            )}
          </span>
          <span className={awaitingTap || mobileMode ? "inline text-cyan" : "hidden sm:inline"}>
            {statusLabel}
          </span>
        </button>

        {!mobileMode && (
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
              className="audio-slider h-1 w-20 cursor-pointer appearance-none bg-transparent accent-cyan sm:w-28"
            />
            <span className="label-mono w-8 text-right text-text-dim tabular-nums">
              {muted ? "00" : String(volume).padStart(2, "0")}
            </span>
          </label>
        )}
      </div>
    </>
  );
}
