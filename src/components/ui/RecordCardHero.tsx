import LocalVideoPlayer from "@/components/ui/LocalVideoPlayer";
import RoboPhoto from "@/components/ui/RoboPhoto";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import type { ProjectImage, ProjectVideo } from "@/lib/types";

type RecordCardHeroProps = {
  video?: ProjectVideo;
  images?: ProjectImage[];
  /** Responsive sizes hint for photo heroes. */
  sizes?: string;
};

/**
 * Index-card hero: landscape video when available, otherwise the lead photo.
 * Instagram stays photo-first so portrait reels do not break the grid.
 */
export default function RecordCardHero({
  video,
  images,
  sizes = "(max-width: 640px) 100vw, 50vw",
}: RecordCardHeroProps) {
  const image = images?.[0];

  if (video?.provider === "youtube") {
    return (
      <YouTubeEmbed
        videoId={video.id}
        title={video.title}
        className="border-0 border-b border-grid-dim"
      />
    );
  }

  if (video?.provider === "local") {
    return (
      <LocalVideoPlayer
        src={video.src}
        title={video.title}
        poster={video.poster}
        type={video.type}
        className="border-0 border-b border-grid-dim"
      />
    );
  }

  if (image) {
    return (
      <RoboPhoto
        src={image.src}
        alt={image.alt}
        caption={image.caption}
        aspect="aspect-[16/10]"
        sizes={sizes}
        className="border-0 border-b border-grid-dim"
      />
    );
  }

  if (video?.provider === "instagram" && video.poster) {
    return (
      <RoboPhoto
        src={video.poster}
        alt={video.title}
        caption="INSTAGRAM REEL"
        link={{ href: video.url, label: "Watch on Instagram ↗" }}
        aspect="aspect-[16/10]"
        sizes={sizes}
        className="border-0 border-b border-grid-dim"
      />
    );
  }

  return null;
}
