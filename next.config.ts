import type { NextConfig } from "next";

// 301 map from the old WordPress URLs. Security headers are added in step 9.
const config: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
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
    ].map(([source, destination]) => ({ source, destination, permanent: true }))
      // Demo requests live in the form on the 2Klicks Create page.
      .concat({ source: "/2klicks/demo/", destination: "/2klicks/create/#demo", permanent: false });
  },
};

export default config;
