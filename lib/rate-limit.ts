const LIMIT = 5;
const WINDOW_SECONDS = 600;

/**
 * Fixed-window limit of 5 submissions per 10 minutes per IP and form, via the Upstash REST API.
 * Does nothing unless UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, and fails open
 * if Upstash is unreachable (Turnstile and the honeypot still apply).
 */
export async function isRateLimited(scope: string, ip: string | null): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || !ip) return false;
  const key = `rl:${scope}:${ip}`;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", key], ["EXPIRE", key, String(WINDOW_SECONDS), "NX"]]),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const [incr] = (await res.json()) as { result?: number }[];
    return (incr?.result ?? 0) > LIMIT;
  } catch {
    return false;
  }
}
