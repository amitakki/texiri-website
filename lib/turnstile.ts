const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

if (process.env.TURNSTILE_SECRET_KEY && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
  console.warn("[turnstile] TURNSTILE_SECRET_KEY is set but NEXT_PUBLIC_TURNSTILE_SITE_KEY is not: every form submission will be rejected.");
}

/**
 * Server-side Turnstile check. Skipped when no secret is configured (local development);
 * otherwise fails closed on a missing token, a network error or a bad response.
 */
export async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
      cache: "no-store",
    });
    if (!res.ok) return false;
    return ((await res.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}
