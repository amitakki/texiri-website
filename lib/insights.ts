import { images, type SiteImageData } from "./images";

/**
 * The Insights articles, newest first: the home page cards, the /insights/ index, the sitemap and each article's own
 * hero (app/insights/*), which reads its title, category, date and read time from here.
 * `ready` is set once the article is signed off (content decision I1); lib/pages.ts hides it until then. Keep the list
 * newest first, and `published` no earlier than the newest source the article cites.
 */
// TODO(cms, step 8): Article from Sanity.
export type Article = { href: string; title: string; category: string; excerpt: string; published: string; readTime: string; image: SiteImageData; ready: boolean };

export const articles: Article[] = [
  {
    href: "/insights/re-fx-after-go-live/",
    title: "RE-FX after go-live: keeping lease data clean",
    category: "RE-FX & Lease Accounting",
    excerpt: "Where SAP RE-FX data drifts after go-live, how it shows up at period-end, and a monthly routine that keeps it clean.",
    // Cites the IASB feedback statement of 23 November 2026.
    published: "2026-11-24",
    readTime: "8 min read",
    image: images.articleRefx,
    ready: true,
  },
  {
    href: "/insights/ecc-2027-start-with-the-data/",
    title: "ECC mainstream maintenance ends in 2027. Start with the data.",
    category: "S/4HANA & Migration",
    excerpt: "Whichever route you take to S/4HANA, the work that decides your timeline is the data, and most of it can start on ECC today.",
    published: "2026-10-14",
    readTime: "7 min read",
    image: images.articleEcc,
    ready: true,
  },
  {
    href: "/insights/first-ai-use-case/",
    title: "Choosing your first AI use case in one day",
    category: "AI",
    excerpt: "How to get from a long list of ideas to a ranked shortlist and a first pilot with an owner, data and a target in one working day.",
    published: "2026-09-03",
    readTime: "8 min read",
    image: images.articleAi,
    ready: true,
  },
];

/** The `articles` entry for an article page. */
export function articleFor(href: string): Article {
  const article = articles.find((a) => a.href === href);
  if (!article) throw new Error(`No Insights article for ${href}`);
  return article;
}

/** "24 November 2026" from an ISO date. */
export const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
