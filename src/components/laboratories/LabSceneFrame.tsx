"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import {
  canHoverPlay,
  enterFullscreen,
  exitFullscreen,
  isFullscreenActive,
} from "@/lib/video-playback";

type LabSceneFrameProps = {
  src: string;
  title: string;
  caption: string;
  credit: string;
};

type SceneMessage = {
  type?: string;
  action?: string;
};

/**
 * Embedded lab viewer. The model's own fullscreen control, and a phone
 * rotation to landscape, open the same full-viewport viewer as photos.
 * Landscape on a phone also requests native fullscreen; the layout still
 * fills the screen when that call is rejected.
 */
export default function LabSceneFrame({
  src,
  title,
  caption,
  credit,
}: LabSceneFrameProps) {
  const rootRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const askedFullscreen = useRef(false);
  const expandedRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [orientationExpand, setOrientationExpand] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [holdHeight, setHoldHeight] = useState<number | null>(null);
  const viewerSrc = `${src}${src.includes("?") ? "&" : "?"}theme=night`;

  expandedRef.current = expanded;

  const close = useCallback(() => {
    setExpanded(false);
    setOrientationExpand(false);
  }, []);

  const open = useCallback((fromOrientation: boolean) => {
    if (!expandedRef.current && rootRef.current) {
      setHoldHeight(rootRef.current.offsetHeight);
    }
    setOrientationExpand(fromOrientation);
    setExpanded(true);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent<SceneMessage>) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.type !== "kinesis-lab") return;
      const frame = rootRef.current?.querySelector("iframe");
      if (!frame || event.source !== frame.contentWindow) return;

      if (data.action === "close") {
        close();
        return;
      }
      if (data.action !== "fullscreen") return;
      if (!expandedRef.current) {
        open(false);
        return;
      }
      if (isFullscreenActive()) void exitFullscreen();
      else if (rootRef.current) void enterFullscreen(rootRef.current);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [close, open]);

  // Phone: turning to landscape while the model is on screen opens the viewer.
  // Turning back closes it only when rotation was what opened it.
  useEffect(() => {
    if (canHoverPlay()) return;

    const landscape = window.matchMedia("(orientation: landscape)");

    const onChange = () => {
      if (!landscape.matches) {
        if (orientationExpand) close();
        return;
      }
      if (expandedRef.current) return;
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, window.innerHeight);
      const visiblePx = visibleBottom - visibleTop;
      if (visiblePx < Math.min(rect.height, window.innerHeight) * 0.35) return;
      open(true);
    };

    landscape.addEventListener("change", onChange);
    return () => landscape.removeEventListener("change", onChange);
  }, [close, open, orientationExpand]);

  useLayoutEffect(() => {
    if (!expanded) {
      setImmersive(false);
      return;
    }

    const landscape = window.matchMedia("(orientation: landscape)");
    const short = window.matchMedia("(max-height: 520px)");
    let cancelled = false;

    const wantsImmersive = () =>
      landscape.matches && (!canHoverPlay() || short.matches);

    const apply = async () => {
      if (cancelled) return;
      if (!wantsImmersive()) {
        setImmersive(false);
        if (askedFullscreen.current && isFullscreenActive()) {
          askedFullscreen.current = false;
          void exitFullscreen();
        }
        return;
      }
      setImmersive(true);
      if (canHoverPlay() || isFullscreenActive() || !rootRef.current) return;
      const ok = await enterFullscreen(rootRef.current);
      if (!cancelled && ok) askedFullscreen.current = true;
    };

    void apply();
    landscape.addEventListener("change", apply);
    short.addEventListener("change", apply);
    return () => {
      cancelled = true;
      landscape.removeEventListener("change", apply);
      short.removeEventListener("change", apply);
      if (askedFullscreen.current && isFullscreenActive()) {
        askedFullscreen.current = false;
        void exitFullscreen();
      }
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, close]);

  const onBackdrop = (event: MouseEvent<HTMLElement>) => {
    if (!expanded) return;
    if (event.target === event.currentTarget) close();
  };

  const figureClass = expanded
    ? immersive
      ? "photo-lightbox fixed inset-0 z-[100] flex flex-col bg-bg"
      : "photo-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-bg/92 p-4 backdrop-blur-md sm:p-8"
    : "mt-10";

  const shellClass = expanded
    ? immersive
      ? "relative flex min-h-0 w-full flex-1 flex-col bg-[#070810]"
      : "relative flex max-h-full w-[min(92vw,1400px)] max-w-full flex-col border border-grid-dim bg-bg"
    : "border border-grid-dim bg-[#070810]";

  const stageClass = expanded
    ? immersive
      ? "relative min-h-0 w-full flex-1"
      : "relative h-[min(70dvh,820px)] w-full sm:h-[min(78vh,860px)]"
    : "relative h-[min(72vh,40rem)] w-full";

  return (
    <>
      {expanded && holdHeight != null && (
        <div aria-hidden className="mt-10" style={{ height: holdHeight }} />
      )}
      <figure
        ref={rootRef}
        className={figureClass}
        role={expanded ? "dialog" : undefined}
        aria-modal={expanded ? true : undefined}
        aria-label={expanded ? title : undefined}
        onClick={onBackdrop}
      >
        {expanded && (
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className={
              immersive
                ? "label-mono z-20 m-2 self-end border border-grid bg-bg/80 px-3 py-2 text-cyan transition-colors hover:border-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                : "label-mono absolute top-4 right-4 z-20 border border-grid px-3 py-2 text-cyan transition-colors hover:border-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:top-6 sm:right-6"
            }
          >
            CLOSE [ESC]
          </button>
        )}

        <div
          className={shellClass}
          onClick={(event) => {
            if (expanded) event.stopPropagation();
          }}
        >
          <div className={stageClass}>
            <iframe
              src={viewerSrc}
              title={title}
              allow="fullscreen"
              allowFullScreen
              loading="eager"
              className="absolute inset-0 h-full w-full border-0 bg-[#070810]"
            />
          </div>
          <figcaption
            className={
              immersive
                ? "sr-only"
                : expanded
                  ? "border-t border-grid-dim bg-bg/80 px-4 py-3"
                  : "border-t border-grid-dim bg-bg/60 px-3 py-2"
            }
          >
            <p className="label-mono text-text-dim">{caption}</p>
            <p className="mt-1.5 font-body text-sm text-text-dim">{credit}</p>
          </figcaption>
        </div>
      </figure>
    </>
  );
}
