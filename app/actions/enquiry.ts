"use server";

import { headers } from "next/headers";
import { enquirySchema, isFreeMail } from "@/lib/enquiry";
import { clientIp, collectErrors, firstName, isBot } from "@/lib/forms";
import { deliverLead, signOff } from "@/lib/leads";
import { isRateLimited } from "@/lib/rate-limit";
import { contact } from "@/lib/site";
import { verifyTurnstile } from "@/lib/turnstile";

export type EnquiryState =
  | { ok: true; firstName: string; ackSent: boolean }
  | { ok: false; errors: Record<string, string>; message?: string }
  | null;

export async function submitEnquiry(_: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Bots get a convincing success and nothing is delivered.
  if (isBot(form)) return { ok: true, firstName: "there", ackSent: false };

  const raw = Object.fromEntries(form);
  const parsed = enquirySchema.safeParse({ ...raw, consent: raw.consent === "on" });
  if (!parsed.success) return { ok: false, errors: collectErrors(parsed.error.issues) };

  const h = await headers();
  const ip = clientIp(h);
  if (await isRateLimited("enquiry", ip)) {
    return { ok: false, errors: {}, message: `You've sent several enquiries in a short time. Please wait a few minutes, or email ${contact.email}.` };
  }
  if (!(await verifyTurnstile(String(raw["cf-turnstile-response"] ?? ""), ip))) {
    return { ok: false, errors: {}, message: "We couldn't verify the request. Please try again." };
  }

  const lead = parsed.data;
  const name = firstName(lead.name);
  const result = await deliverLead({
    form: "enquiry",
    subject: `New enquiry: ${lead.type} — ${lead.company}`,
    replyTo: lead.email,
    fields: {
      "Enquiry type": lead.type,
      Name: lead.name,
      Email: lead.email,
      "Personal email address": isFreeMail(lead.email),
      Company: lead.company,
      Role: lead.role,
      Phone: lead.phone,
      Message: lead.message,
      Page: h.get("referer"),
      "Consent given at": new Date().toISOString(),
    },
    ack: {
      subject: "We've received your enquiry — Texiri Solutions",
      text: `Hi ${name},\n\nThanks for contacting Texiri Solutions. A senior consultant will read your enquiry and reply within one business day.\n\nWhat happens next:\n1. A senior consultant reviews your enquiry.\n2. We email you to book a short scoping call.\n3. We come prepared with relevant examples.\n\nIf anything is urgent, call us on ${contact.phoneDisplay} (${contact.hours}).${signOff}`,
    },
  });

  if (!result.delivered) {
    return { ok: false, errors: {}, message: `Sorry, we couldn't send your enquiry just now. Please try again, or email us at ${contact.email}.` };
  }
  return { ok: true, firstName: name, ackSent: result.ackSent };
}
