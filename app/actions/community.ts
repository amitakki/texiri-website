"use server";

import { headers } from "next/headers";
import { EXPERIENCE_LEVELS, communityJoinSchema } from "@/lib/community";
import { clientIp, collectErrors, firstName, isBot } from "@/lib/forms";
import { deliverLead, signOff } from "@/lib/leads";
import { isRateLimited } from "@/lib/rate-limit";
import { contact } from "@/lib/site";
import { verifyTurnstile } from "@/lib/turnstile";

export type JoinState =
  | { ok: true; firstName: string; email: string; city: string; ackSent: boolean }
  | { ok: false; errors: Record<string, string>; message?: string }
  | null;

export async function joinCommunity(_: JoinState, form: FormData): Promise<JoinState> {
  if (isBot(form)) return { ok: true, firstName: "there", email: "", city: "", ackSent: false };

  const raw = Object.fromEntries(form);
  const parsed = communityJoinSchema.safeParse({ ...raw, consent: raw.consent === "on" });
  if (!parsed.success) return { ok: false, errors: collectErrors(parsed.error.issues) };

  const ip = clientIp(await headers());
  if (await isRateLimited("community", ip)) {
    return { ok: false, errors: {}, message: "You've tried to join several times in a short time. Please wait a few minutes and try again." };
  }
  if (!(await verifyTurnstile(String(raw["cf-turnstile-response"] ?? ""), ip))) {
    return { ok: false, errors: {}, message: "We couldn't verify the request. Please try again." };
  }

  // Community members go to the community list, never the sales CRM.
  const m = parsed.data;
  const name = firstName(m.name);
  const result = await deliverLead({
    form: "community",
    subject: `New community member: ${m.name} (${m.city})`,
    replyTo: m.email,
    fields: {
      Name: m.name,
      Email: m.email,
      City: m.city,
      Role: m.role,
      "AI experience": EXPERIENCE_LEVELS.find((l) => l.value === m.level)?.label ?? m.level,
      "Why joining": m.why,
      Phone: m.phone,
      "Consent given at": new Date().toISOString(),
    },
    ack: {
      subject: "Welcome to the TEXIRI AI Community",
      text: `Hi ${name},\n\nWelcome to the TEXIRI AI Community! Here's what happens next:\n\n1. We suggest a learning path based on your experience.\n2. You'll hear about upcoming sessions in person and online.\n3. Bring a project to a showcase whenever you're ready.\n\nIn the meantime, browse the learning paths: https://www.texiri.com/ai-community/learning-paths/\n\nWe'll only email you about community sessions and resources, never sales. To stop these emails at any time, reply with "unsubscribe".${signOff}`,
    },
  });

  if (!result.delivered) {
    return { ok: false, errors: {}, message: `Sorry, we couldn't save your details just now. Please try again, or email us at ${contact.email}.` };
  }
  return { ok: true, firstName: name, email: m.email, city: m.city, ackSent: result.ackSent };
}
