"use server";

import { headers } from "next/headers";
import { S108_STEPS } from "@/lib/company";
import { clientIp, collectErrors, firstName, isBot } from "@/lib/forms";
import { deliverLead, signOff } from "@/lib/leads";
import { isRateLimited } from "@/lib/rate-limit";
import { contact } from "@/lib/site";
import { s108Schema } from "@/lib/shambhavi";
import { verifyTurnstile } from "@/lib/turnstile";

export type S108State = { ok: true; firstName: string; ackSent: boolean } | { ok: false; errors: Record<string, string>; message?: string } | null;

const LABELS = Object.fromEntries(S108_STEPS.flatMap((s) => s.fields.map((f) => [f.id, f.label]))) as Record<string, string>;

export async function submitShambhavi(_: S108State, fd: FormData): Promise<S108State> {
  if (isBot(fd)) return { ok: true, firstName: "there", ackSent: false };

  const raw = Object.fromEntries(fd);
  const r = s108Schema.safeParse({ ...raw, pledge: raw.pledge === "on", consent: raw.consent === "on" });
  if (!r.success) return { ok: false, errors: collectErrors(r.error.issues) };

  const ip = clientIp(await headers());
  if (await isRateLimited("shambhavi", ip)) {
    return { ok: false, errors: {}, message: `You've submitted several times in a short time. Please wait a few minutes, or email ${contact.email}.` };
  }
  if (!(await verifyTurnstile(String(raw["cf-turnstile-response"] ?? ""), ip))) {
    return { ok: false, errors: {}, message: "We couldn't verify the submission. Please try again." };
  }

  // Applications go to the HR inbox and the Sheet, never the sales CRM.
  const a = r.data;
  const name = firstName(a.name);
  const fields = Object.fromEntries(Object.entries(a).map(([id, v]) => [LABELS[id] ?? id, v]));
  const result = await deliverLead({
    form: "shambhavi",
    subject: `Shambhavi 108 application: ${a.name} (${a.location})`,
    replyTo: a.email,
    fields: { ...fields, "Consent given at": new Date().toISOString() },
    ack: {
      subject: "Your Shambhavi 108 application — Texiri Solutions",
      text: `Hi ${name},\n\nThank you for applying to Shambhavi 108. Your application is in, and our team will review your details and get back to you soon.\n\nIf you have questions about the programme in the meantime, call ${contact.phoneDisplay} or reply to this email.${signOff}`,
    },
  });

  if (!result.delivered) {
    return { ok: false, errors: {}, message: `Sorry, we couldn't send your application just now. Your answers are still saved on this device, so please try again shortly, or email ${contact.email}.` };
  }
  return { ok: true, firstName: name, ackSent: result.ackSent };
}
