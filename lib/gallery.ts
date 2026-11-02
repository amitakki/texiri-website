import { images, type SiteImageData } from "./images";

/**
 * Photo galleries: Life at Texiri (Careers) and CSR events (/about/csr/).
 *
 * To add a real photo: put it under public/images/life/ or public/images/csr/<event>/ (JPG or WebP, at least 1600 px
 * wide, landscape 4:3 works best), replace `src`, write a real `alt` and `caption`, and delete `placeholder`.
 * Only publish photos everyone shown has agreed to; for children, get a parent's or school's written consent.
 */
export type Photo = SiteImageData & { caption: string };

const lifeSlot = (caption: string, alt: string): Photo => ({ src: "/images/placeholders/life-at-texiri.svg", alt, caption, placeholder: true });
const csrSlot = (caption: string, alt: string): Photo => ({ src: "/images/placeholders/csr-event.svg", alt, caption, placeholder: true });

/** Careers → Life at Texiri. The first photo is shown large. Six works well; any number from 3 up lays out. */
export const lifePhotos: Photo[] = [
  { ...images.teamPhoto, caption: "The team at the Vijayapura office" },
  lifeSlot("Festival celebrations", "Texiri colleagues celebrating a festival at the office"),
  lifeSlot("Birthdays and work anniversaries", "Colleagues cutting a cake for a work anniversary"),
  lifeSlot("Team outings", "The Texiri team on a team outing"),
  lifeSlot("Learning sessions", "Consultants at an internal SAP knowledge-sharing session"),
  lifeSlot("Navi Mumbai office", "The Texiri team at the Navi Mumbai office"),
];

export type CsrEvent = {
  /** Anchor on the CSR page, e.g. "tree-planting-2026". */
  id: string;
  title: string;
  /** As it should read on the page, e.g. "15 August 2026". */
  date: string;
  place: string;
  summary: string;
  photos: Photo[];
  /** Set while the event is an example slot. The CSR page stays hidden on production until one real event is in. */
  placeholder?: true;
};

/** Newest first. */
export const csrEvents: CsrEvent[] = [
  {
    id: "event-1", title: "[Event title]", date: "[Date]", place: "Vijayapura", placeholder: true,
    summary: "What we did, who we did it with and why it matters, in two or three sentences. For example: the cause, the partner organisation, how many colleagues volunteered and what was achieved.",
    photos: [csrSlot("Volunteers on the day", "Texiri volunteers at a CSR event"), csrSlot("With the partner organisation", "Texiri volunteers with the partner organisation"), csrSlot("The result", "The result of the CSR activity")],
  },
  {
    id: "event-2", title: "[Event title]", date: "[Date]", place: "Navi Mumbai", placeholder: true,
    summary: "A second event, in the same format. Add as many events as you like; the newest goes at the top.",
    photos: [csrSlot("Volunteers on the day", "Texiri volunteers at a CSR event"), csrSlot("The team", "The Texiri CSR team")],
  },
];

/** True once at least one CSR event is real. Until then /about/csr/ is hidden on production (see lib/pages.ts). */
export const csrReady = csrEvents.some((e) => !e.placeholder);
