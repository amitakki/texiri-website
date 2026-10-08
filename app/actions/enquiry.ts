"use server";

import { headers } from "next/headers";
import { enquirySchema } from "@/lib/enquiry";

export type EnquiryState =
  | { ok: true; firstName: string }
  | { ok: false; errors: Record<string, string>; message?: string }
  | null;

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
  });
  return ((await res.json()) as { success: boolean }).success;
}

export async function submitEnquiry(_: EnquiryState, form: FormData): Promise<EnquiryState> {
  const raw = Object.fromEntries(form);
  const parsed = enquirySchema.safeParse({ ...raw, consent: raw.consent === "on", turnstileToken: raw["cf-turnstile-response"] });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { ok: false, errors };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] ?? null;
  // TODO(step 7): rate limit by IP (e.g. Upstash Ratelimit) before verification.
  // Turnstile is skipped when no secret is configured (local development).
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret && !(await verifyTurnstile(secret, parsed.data.turnstileToken ?? "", ip))) {
    return { ok: false, errors: {}, message: "We couldn't verify the request. Please try again." };
  }

  const { turnstileToken: _t, ...lead } = parsed.data;
  const record = { ...lead, consentAt: new Date().toISOString(), source: "website" };

  // TODO(step 7): route by enquiry type → CRM (HubSpot or Zoho, via CRM_PROVIDER) + Resend notification.
  console.info("enquiry", record.type);

  return { ok: true, firstName: lead.name.split(" ")[0] };
}
