import { isProd } from "./env";
import { csrReady } from "./gallery";
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

const home = { label: "Home", href: "/" };
const community = { label: "AI Community", href: "/ai-community/" };
const insights = { label: "Insights", href: "/insights/" };

const joinCta = { label: "Join the community", href: "/ai-community/join/" };

// The four AI sub-pages were merged into /ai-services/ (content decision A2); their URLs redirect in next.config.ts.
const insightRelated = [
  { label: "ECC mainstream maintenance ends in 2027. Start with the data.", href: "/insights/ecc-2027-start-with-the-data/" },
  { label: "RE-FX after go-live: keeping lease data clean", href: "/insights/re-fx-after-go-live/" },
  { label: "Choosing your first AI use case in one day", href: "/insights/first-ai-use-case/" },
];

function article(slug: string, cat: string, title: string): [string, InterimPage] {
  const href = `/insights/${slug}/`;
  return [href, { title, kicker: cat, lead: "This article is being written.", vertical: cat === "AI" ? "ai" : "sap", crumbs: [home, insights, { label: title, href }], related: insightRelated.filter((r) => r.href !== href) }];
}

export const interimPages: Record<string, InterimPage> = Object.fromEntries([
  ["/ai-community/events/", { title: "Community events", kicker: "TEXIRI AI Community", lead: "Online sessions and hands-on workshops, with in-person sessions in Vijayapura to follow. The event calendar is on its way. Join the community to hear about the next one first.", vertical: "community", crumbs: [home, community, { label: "Events", href: "/ai-community/events/" }], cta: joinCta }],
  ["/ai-community/learning-paths/", { title: "Learning paths", kicker: "TEXIRI AI Community", lead: "Structured paths from first steps to building real projects. No experience needed. Join the community to get started.", vertical: "community", crumbs: [home, community, { label: "Learning paths", href: "/ai-community/learning-paths/" }], cta: joinCta }],

  ["/insights/", { title: "Latest thinking", kicker: "Insights", lead: "Notes on SAP, S/4HANA migration and practical AI from the Texiri team.", crumbs: [home, insights], related: insightRelated }],
  article("ecc-2027-start-with-the-data", "S/4HANA & Migration", "ECC mainstream maintenance ends in 2027. Start with the data."),
  article("re-fx-after-go-live", "SAP", "RE-FX after go-live: keeping lease data clean"),
  article("first-ai-use-case", "AI", "Choosing your first AI use case in one day"),
]);

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
};

/** True once a page has real content: every dedicated page except those in `dedicatedReady`, and interim pages marked `ready`. */
export function isReady(href: string): boolean {
  if (href in dedicatedReady) return dedicatedReady[href];
  const page = interimPages[href];
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
