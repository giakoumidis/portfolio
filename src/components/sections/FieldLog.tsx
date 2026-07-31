import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { getFieldPhotos } from "@/content/field-photos";

export default function FieldLog() {
  const photos = getFieldPhotos();
  const gallery =
    photos.length > 1
      ? photos.map((photo, i) => {
          const caption = photo.location
            ? `${photo.caption} — ${photo.location}`
            : photo.caption;
          return {
            src: photo.src,
            alt: photo.alt,
            tag: `LOG.${String(i + 1).padStart(2, "0")}`,
            caption,
            description: photo.description ?? photo.alt,
            link: photo.project
              ? {
                  href: photo.project.href,
                  label: photo.project.title,
                }
              : undefined,
          };
        })
      : undefined;

  return (
    <section id="field-log" aria-labelledby="field-log-heading">
      <div className="section-shell">
        <SectionHeading
          index="09"
          title="Photos"
          headingId="field-log-heading"
          kicker="From projects, laboratories & deployments"
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => {
            const caption = photo.location
              ? `${photo.caption} — ${photo.location}`
              : photo.caption;

            return (
              <Reveal as="li" key={photo.src} delay={(i % 3) * 0.06}>
                <RoboPhoto
                  src={photo.src}
                  alt={photo.alt}
                  tag={`LOG.${String(i + 1).padStart(2, "0")}`}
                  caption={caption}
                  description={photo.description ?? photo.alt}
                  link={
                    photo.project
                      ? {
                          href: photo.project.href,
                          label: photo.project.title,
                        }
                      : undefined
                  }
                  aspect={
                    photo.orientation === "portrait"
                      ? "aspect-[4/5]"
                      : "aspect-[3/2]"
                  }
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="h-full border border-grid-dim"
                  gallery={gallery}
                  galleryIndex={i}
                />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
