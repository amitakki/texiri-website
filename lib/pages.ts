import { isProd } from "./env";
import { csrReady } from "./gallery";
import { articles } from "./insights";
import type { Vertical } from "./site";

/**
 * Interim pages for routes the navigation already links to.
 * Rendered by app/[...slug]/page.tsx; replace each with a dedicated page (or CMS content, step 8).
 */
export type InterimPage = {
  title: string;
  kicker: string;
  lead: string;
  vertical?: Vertical;
  crumbs: { label: string; href: string }[];
  points?: { t: string; d: string }[];
  cta?: { label: string; href: string };
  related?: { label: string; href: string }[];
  /** Set true once the page has real content. Until then it is hidden from menus and cards when SHOW_UNFINISHED is off. */
  ready?: boolean;
};

// None left: the four AI sub-pages were merged into /ai-services/ (content decision A2), the Community events and
// learning-path stubs into /ai-community/ (X9), and /insights/ became a dedicated page (Nov 2026). Merged URLs
// redirect in next.config.ts.
export const interimPages: Record<string, InterimPage> = {};

/**
 * Pages that still hold placeholder content are shown while the site is being reviewed (local and preview builds),
 * and hidden on the production deployment (NEXT_PUBLIC_SITE_ENV=production). Set NEXT_PUBLIC_SHOW_UNFINISHED to
 * "true" or "false" to override either default. It is read at build time, so changing it needs a new build.
 * Menus, the footer, cards and diagram links drop every page that is not `ready` while this is false.
 */
const flag = process.env.NEXT_PUBLIC_SHOW_UNFINISHED?.trim().toLowerCase();
export const SHOW_UNFINISHED = flag === "true" ? true : flag === "false" ? false : !isProd;

/** Dedicated pages whose content is still placeholder. They follow the same rule as interim pages until ready. */
const dedicatedReady: Record<string, boolean> = {
  "/about/csr/": csrReady,
  // Articles go live once signed off (`ready` in lib/insights.ts), and the index with its first article.
  ...Object.fromEntries(articles.map((a) => [a.href, a.ready])),
  "/insights/": articles.some((a) => a.ready),
};

/**
 * True once a page has real content: every dedicated page except those in `dedicatedReady`, and interim pages marked
 * `ready`. Any `#section` or `?query` is ignored, so a link to part of a page follows the page.
 */
export function isReady(href: string): boolean {
  const path = href.split(/[?#]/)[0];
  if (path in dedicatedReady) return dedicatedReady[path];
  const page = interimPages[path];
  return !page || page.ready === true;
}

/** True for ready pages, and for every page while unfinished pages are shown. */
export function isLive(href: string): boolean {
  return isReady(href) || SHOW_UNFINISHED;
}

/** Pages to hide right now. Passed from the server layout to the client header. */
export function hiddenHrefs(): string[] {
  return [...Object.keys(interimPages), ...Object.keys(dedicatedReady)].filter((h) => !isLive(h));
}
