"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import VideoLightbox from "@/components/ui/VideoLightbox";
import {
  canHoverPlay,
  enterFullscreen,
  exitFullscreen,
  isFullscreenActive,
} from "@/lib/video-playback";

type LocalVideoPlayerProps = {
  src: string;
  title: string;
  poster?: string;
  /** MIME type; defaults from the file extension when omitted. */
  type?: string;
  className?: string;
};

function mimeFromSrc(src: string): string | undefined {
  const ext = src.split(".").pop()?.toLowerCase();
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg" || ext === "ogv") return "video/ogg";
  return undefined;
}

const LEAVE_DELAY_MS = 180;

/**
 * Hover-to-preview self-hosted video: loads on first hover so the file is not
 * fetched on first paint. Plays muted for reliable autoplay. Click (or the
 * EXPAND control) opens a full lightbox — same as photos. Rotating to landscape
 * while playing on touch requests fullscreen (with lightbox fallback).
 */
function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function LocalVideoPlayer({
  src,
  title,
  poster,
  type,
  className = "",
}: LocalVideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hoverMode, setHoverMode] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [orientationExpand, setOrientationExpand] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoveringRef = useRef(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mime = type ?? mimeFromSrc(src);
  const remaining = Math.max(0, duration - currentTime);
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    try {
      await video.play();
    } catch {
      /* autoplay blocked — user can tap */
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  };

  const clearLeaveTimer = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const closeExpand = useCallback(() => {
    setExpanded(false);
    setOrientationExpand(false);
  }, []);

  useEffect(() => {
    const sync = () => setHoverMode(canHoverPlay());
    sync();
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      clearLeaveTimer();
    };
  }, []);

  // Resume play once the <video> mounts while still hovering.
  useEffect(() => {
    if (!loaded || !hoveringRef.current) return;
    void playVideo();
  }, [loaded]);

  // Mobile: while playing, landscape → native fullscreen (lightbox fallback).
  useEffect(() => {
    if (hoverMode) return;

    const mq = window.matchMedia("(orientation: landscape)");
    let cancelled = false;

    const apply = async () => {
      if (cancelled) return;
      if (!mq.matches) {
        if (orientationExpand) {
          setExpanded(false);
          setOrientationExpand(false);
        }
        if (isFullscreenActive()) void exitFullscreen();
        return;
      }
      if (expanded || isFullscreenActive() || !playing) return;
      const ok = await enterFullscreen(
        rootRef.current ?? document.documentElement,
        videoRef.current,
      );
      if (!ok && !cancelled) {
        setOrientationExpand(true);
        setExpanded(true);
        pauseVideo();
      }
    };

    void apply();
    mq.addEventListener("change", apply);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", apply);
    };
  }, [playing, hoverMode, expanded, orientationExpand]);

  const openExpand = () => {
    clearLeaveTimer();
    hoveringRef.current = false;
    pauseVideo();
    setOrientationExpand(false);
    setExpanded(true);
  };

  const handlePointerEnter = () => {
    if (!hoverMode || expanded) return;
    clearLeaveTimer();
    hoveringRef.current = true;
    if (!loaded) {
      setLoaded(true);
    } else {
      void playVideo();
    }
  };

  const handlePointerLeave = () => {
    if (!hoverMode || expanded) return;
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      hoveringRef.current = false;
      pauseVideo();
      leaveTimerRef.current = null;
    }, LEAVE_DELAY_MS);
  };

  const handleVideoReady = () => {
    if (hoveringRef.current) void playVideo();
  };

  const handleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openExpand();
  };

  const syncTime = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (Number.isFinite(video.duration)) setDuration(video.duration);
  };

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setCurrentTime(video.currentTime);
  };

  const handleTogglePlay = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (playing) {
      hoveringRef.current = false;
      pauseVideo();
    } else {
      hoveringRef.current = true;
      if (!loaded) setLoaded(true);
      else void playVideo();
    }
  };

  const showPoster = !playing && !expanded;
  const showChrome = loaded && !expanded && playing;

  return (
    <>
      <div
        ref={rootRef}
        className={`group/video relative aspect-video overflow-hidden border border-grid-dim bg-bg-raised ${className}`}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
      >
        {loaded && !expanded && (
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="metadata"
            poster={poster}
            aria-label={title}
            onPlay={() => {
              setPlaying(true);
            }}
            onPause={() => {
              setPlaying(false);
            }}
            onCanPlay={handleVideoReady}
            onLoadedData={handleVideoReady}
            onTimeUpdate={syncTime}
            onLoadedMetadata={syncTime}
            onDurationChange={syncTime}
            className="absolute inset-0 h-full w-full bg-bg object-contain"
          >
            <source src={src} type={mime} />
            Your browser does not support embedded video.
          </video>
        )}

        {!expanded && (
          <button
            type="button"
            onClick={openExpand}
            aria-label={`Expand video: ${title}`}
            className="absolute inset-0 z-10 cursor-zoom-in"
          >
            {showPoster && (
              <>
                <PosterArt poster={poster} />
                <PlayBadge label="Video" />
              </>
            )}
          </button>
        )}

        {showChrome && (
          <div
            className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-bg via-bg/80 to-transparent px-3 pt-8 pb-2.5"
            onClick={(event) => event.stopPropagation()}
            onMouseEnter={() => {
              if (!hoverMode) return;
              clearLeaveTimer();
              hoveringRef.current = true;
            }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration) || 0}
              aria-valuenow={Math.round(currentTime)}
              aria-valuetext={`${formatClock(currentTime)} of ${formatClock(duration)}`}
              className="group/seek relative mb-2 h-1.5 cursor-pointer rounded-full bg-grid-dim"
              onClick={handleSeek}
              onKeyDown={(event) => {
                const video = videoRef.current;
                if (!video || !duration) return;
                const step = Math.max(1, duration * 0.05);
                if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                  event.preventDefault();
                  video.currentTime = Math.min(duration, video.currentTime + step);
                  syncTime();
                } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                  event.preventDefault();
                  video.currentTime = Math.max(0, video.currentTime - step);
                  syncTime();
                }
              }}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 rounded-full bg-cyan"
                style={{ width: `${progress * 100}%` }}
              />
              <span
                aria-hidden
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-cyan bg-bg opacity-0 transition-opacity group-hover/seek:opacity-100"
                style={{ left: `calc(${progress * 100}% - 6px)` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTogglePlay}
                aria-label={playing ? "Pause video" : "Play video"}
                className="flex h-7 w-7 shrink-0 items-center justify-center border border-cyan/50 bg-bg/60 text-cyan transition-colors hover:border-cyan hover:bg-cyan/10"
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                    <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden>
                    <path d="M8 5.14v13.72L19.27 12 8 5.14z" />
                  </svg>
                )}
              </button>

              <span className="label-mono text-[11px] text-text-dim tabular-nums">
                <span className="text-text">{formatClock(currentTime)}</span>
                <span className="mx-1 text-grid">/</span>
                <span>{formatClock(duration)}</span>
                <span className="ml-2 text-cyan">-{formatClock(remaining)}</span>
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleExpand}
          aria-label={`Expand video: ${title}`}
          className="label-mono absolute top-3 right-3 z-20 border border-grid-dim bg-bg/70 px-2 py-1 text-cyan opacity-0 transition-opacity group-hover/video:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan [@media(hover:none)]:opacity-100"
        >
          EXPAND
        </button>
      </div>

      {expanded && (
        <VideoLightbox
          title={title}
          source={{ kind: "local", src, type: mime, poster }}
          onClose={closeExpand}
        />
      )}
    </>
  );
}

function PosterArt({ poster }: { poster?: string }) {
  return (
    <>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- static public asset; mirror YouTube/Instagram posters
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-200 group-hover/video:opacity-100"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-bg-raised via-panel to-bg"
        />
      )}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent"
      />
    </>
  );
}

function PlayBadge({ label }: { label: string }) {
  return (
    <>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center border border-cyan/60 bg-bg/70 text-cyan transition-all duration-200 group-hover/video:panel-glow-cyan group-hover/video:scale-105">
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-5 w-5 fill-current"
            aria-hidden
          >
            <path d="M8 5.14v13.72L19.27 12 8 5.14z" />
          </svg>
        </span>
      </span>
      <span className="label-mono absolute right-3 bottom-3 text-text-dim">
        {label}
      </span>
    </>
  );
}
