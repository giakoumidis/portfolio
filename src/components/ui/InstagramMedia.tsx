type InstagramMediaProps = {
  url: string;
  title: string;
  poster?: string;
  className?: string;
};

/**
 * Instagram reels cannot be played in-page (login walls / blocked embeds),
 * so the card is a full-width portrait poster that opens the reel on Instagram.
 */
export default function InstagramMedia({
  url,
  title,
  poster,
  className = "",
}: InstagramMediaProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on Instagram: ${title}`}
      className={`group/video relative block aspect-[9/16] w-full cursor-pointer overflow-hidden border border-grid-dim bg-bg-raised ${className}`}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- static public asset; keep simple for portrait posters
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
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent"
      />
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
      <span className="label-mono absolute top-3 right-3 border border-grid-dim bg-bg/70 px-2 py-1 text-cyan opacity-0 transition-opacity group-hover/video:opacity-100 [@media(hover:none)]:opacity-100">
        OPEN ↗
      </span>
      <span className="label-mono absolute right-3 bottom-3 text-text-dim">
        Instagram
      </span>
    </a>
  );
}
