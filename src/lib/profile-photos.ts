import { getFieldPhotos } from "@/content/field-photos";

/** One archive frame that can appear in the homepage profile photo. */
export type ProfilePhotoSlide = {
  src: string;
  alt: string;
  caption: string;
  href: string;
  title: string;
};

/**
 * Archive photographs grouped by case file. Each group is one project or
 * laboratory, in content order, with every photo that belongs to it.
 */
export function getProfilePhotoGroups(): ProfilePhotoSlide[][] {
  const groups = new Map<string, ProfilePhotoSlide[]>();

  for (const photo of getFieldPhotos()) {
    if (!photo.project) continue;
    const slide: ProfilePhotoSlide = {
      src: photo.src,
      alt: photo.alt,
      caption: photo.caption,
      href: photo.project.href,
      title: photo.project.title,
    };
    const list = groups.get(slide.href) ?? [];
    list.push(slide);
    groups.set(slide.href, list);
  }

  return [...groups.values()];
}
