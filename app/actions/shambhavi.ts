"use server";

import { s108Schema } from "@/lib/shambhavi";

export type S108State = { ok: true; firstName: string } | { ok: false; errors: Record<string, string>; message?: string } | null;

export async function submitShambhavi(_: S108State, fd: FormData): Promise<S108State> {
  const raw = Object.fromEntries(fd);
  const token = String(raw["cf-turnstile-response"] ?? "");
  const r = s108Schema.safeParse({ ...raw, pledge: raw.pledge === "on" });
  if (!r.success) {
    const errors: Record<string, string> = {};
    for (const i of r.error.issues) errors[String(i.path[0])] ??= i.message;
    return { ok: false, errors };
  }
  if (process.env.TURNSTILE_SECRET_KEY) {
    const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }) }).then((x) => x.json());
    if (!v.success) return { ok: false, errors: {}, message: "We couldn't verify the submission. Please try again." };
  }
  // TODO(step 7): send to HR inbox / ATS (not the sales CRM). Store consent timestamp.
  console.info("[shambhavi-108] application", { email: r.data.email, at: new Date().toISOString() });
  return { ok: true, firstName: r.data.name.split(" ")[0] };
}
