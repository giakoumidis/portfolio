/** True when the device can reliably use hover-to-play previews. */
export function canHoverPlay() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

type WebkitVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

type VendorDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  msFullscreenElement?: Element | null;
  msExitFullscreen?: () => Promise<void> | void;
};

type VendorEl = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

export function isFullscreenActive() {
  const doc = document as VendorDoc;
  return Boolean(
    document.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement,
  );
}

/** Enter fullscreen on a container, or native iOS video fullscreen when available. */
export async function enterFullscreen(
  el: HTMLElement,
  video?: HTMLVideoElement | null,
): Promise<boolean> {
  const webkitVideo = video as WebkitVideo | null | undefined;
  if (webkitVideo && typeof webkitVideo.webkitEnterFullscreen === "function") {
    try {
      webkitVideo.webkitEnterFullscreen();
      return true;
    } catch {
      /* fall through to element fullscreen */
    }
  }

  const target = el as VendorEl;
  try {
    if (target.requestFullscreen) {
      await target.requestFullscreen();
      return true;
    }
    if (target.webkitRequestFullscreen) {
      await target.webkitRequestFullscreen();
      return true;
    }
    if (target.msRequestFullscreen) {
      await target.msRequestFullscreen();
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function exitFullscreen() {
  const doc = document as VendorDoc;
  try {
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
      return;
    }
    if (doc.webkitFullscreenElement && doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
      return;
    }
    if (doc.msFullscreenElement && doc.msExitFullscreen) {
      await doc.msExitFullscreen();
    }
  } catch {
    /* ignore */
  }
}
