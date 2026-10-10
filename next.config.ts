import type { NextConfig } from "next";

// Mirrors lib/env.ts: only the production deployment may be indexed.
const isProd = process.env.NEXT_PUBLIC_SITE_ENV === "production";

const config: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  async headers() {
    return isProd ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  // 301 map from the old WordPress URLs.
  async redirects() {
    return [
      ["/services/single-service/", "/sap/consulting/"],
      ["/services/managed-services/", "/sap/managed-services/"],
      ["/services/data-migration/", "/sap/data-migration/"],
      ["/mobility-solutions/", "/sap/"],
      ["/sap/mobility/", "/sap/"],
      ["/2klicks-create/", "/2klicks/create/"],
      ["/about/2klicks-update/", "/2klicks/update/"],
      ["/texiri-ai-community/", "/ai-community/"],
      ["/shambhavi-108/", "/careers/shambhavi-108/"],
      ["/services/careers/", "/careers/"],
      ["/about/team/", "/about/leadership/"],
      ["/about/contact/", "/contact/"],
      ["/services/", "/sap/"],
      ["/home/footer/", "/"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }))
      // Demo requests live in the form on the 2Klicks Create page.
      .concat({ source: "/2klicks/demo/", destination: "/2klicks/create/#demo", permanent: false });
  },
};

export default config;
