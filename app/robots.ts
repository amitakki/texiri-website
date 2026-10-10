import type { MetadataRoute } from "next";
import { isProd } from "@/lib/env";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isProd) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
