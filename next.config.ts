import type { NextConfig } from "next";

// Mirrors lib/env.ts: only the production deployment may be indexed.
const isProd = process.env.NEXT_PUBLIC_SITE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
// Vercel's preview toolbar (comments, feedback) loads from vercel.live on preview deployments.
const vercelLive = process.env.VERCEL_ENV === "preview" ? " https://vercel.live wss://ws-us3.pusher.com" : "";
const turnstile = "https://challenges.cloudflare.com";

// Static pages can't carry per-request nonces, so inline scripts (Next's hydration data, JSON-LD) need 'unsafe-inline'.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${turnstile}${vercelLive}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${vercelLive}`,
  "font-src 'self' data:",
  `connect-src 'self' ${turnstile}${isDev ? " ws:" : ""}${vercelLive}`,
  `frame-src ${turnstile}${vercelLive}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Add includeSubDomains (and consider preload) once every texiri.com subdomain is HTTPS-only.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
];

const config: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  async headers() {
    const headers = isProd ? securityHeaders : [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [{ source: "/:path*", headers }];
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
