export const MEDIA_VIDEO_PLAY = "ng:media-video-play";
export const MEDIA_VIDEO_STOP = "ng:media-video-stop";

export function notifyVideoPlay() {
  window.dispatchEvent(new Event(MEDIA_VIDEO_PLAY));
}

export function notifyVideoStop() {
  window.dispatchEvent(new Event(MEDIA_VIDEO_STOP));
}
