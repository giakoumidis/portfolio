import Reveal from "@/components/ui/Reveal";
import RoboPhoto from "@/components/ui/RoboPhoto";
import SectionHeading from "@/components/ui/SectionHeading";
import { fieldPhotos } from "@/content/field-photos";

export default function FieldLog() {
  return (
    <section id="field-log" aria-labelledby="field-log-heading">
      <div className="section-shell">
        <SectionHeading
          index="09"
          title="Photos"
          headingId="field-log-heading"
          kicker="From labs & deployments"
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fieldPhotos.map((photo, i) => (
            <Reveal as="li" key={photo.src} delay={(i % 3) * 0.06}>
              <RoboPhoto
                src={photo.src}
                alt={photo.alt}
                tag={`LOG.${String(i + 1).padStart(2, "0")}`}
                caption={`${photo.caption} — ${photo.location}`}
                aspect={
                  photo.orientation === "portrait"
                    ? "aspect-[4/5]"
                    : "aspect-[3/2]"
                }
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="h-full border border-grid-dim"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
