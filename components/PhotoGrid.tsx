import { SiteImage } from "@/components/ui";
import type { Photo } from "@/lib/gallery";

/**
 * A captioned photo grid. With `feature`, the first photo spans two columns and two rows (from md up).
 * Two columns on phones, three from md.
 */
export function PhotoGrid({ photos, label, feature = true }: { photos: Photo[]; label: string; feature?: boolean }) {
  return (
    <ul aria-label={label} className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-5 p-0 md:grid-cols-3">
      {photos.map((p, i) => {
        const big = feature && i === 0 && photos.length >= 3;
        return (
          <li key={`${p.src}-${i}`} className={big ? "col-span-2 flex flex-col md:row-span-2" : "flex flex-col"}>
            <figure className="m-0 flex flex-1 flex-col">
              <SiteImage
                {...p}
                ratio={big ? "aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}
                className={big ? "md:min-h-0 md:flex-1" : ""}
                sizes={big ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              />
              <figcaption className="mt-2 text-sm text-muted">{p.caption}</figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
