import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Dedicated pages only. Interim pages (app/[...slug]) are noindex and join the sitemap once they get real content.
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/sap/", priority: 0.9 },
  { path: "/sap/data-migration/", priority: 0.9 },
  { path: "/2klicks/create/", priority: 0.8 },
  { path: "/ai-services/", priority: 0.8 },
  { path: "/ai-community/", priority: 0.6 },
  { path: "/ai-community/join/", priority: 0.5 },
  { path: "/about/", priority: 0.6 },
  { path: "/about/leadership/", priority: 0.5 },
  { path: "/careers/", priority: 0.6 },
  { path: "/careers/shambhavi-108/", priority: 0.6 },
  { path: "/contact/", priority: 0.7 },
  { path: "/legal/privacy/", priority: 0.2 },
  { path: "/legal/cookies/", priority: 0.2 },
  { path: "/legal/terms/", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly", priority }));
}
