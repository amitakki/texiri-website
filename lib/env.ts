/**
 * True only on the production deployment (NEXT_PUBLIC_SITE_ENV=production).
 * Everything else — local, Vercel previews — is kept out of search engines.
 */
export const isProd = process.env.NEXT_PUBLIC_SITE_ENV === "production";
