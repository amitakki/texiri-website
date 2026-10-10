import { contact } from "./site";

export type LeadForm = "enquiry" | "community" | "shambhavi";
type FieldValue = string | number | boolean | null | undefined;

export type Lead = {
  form: LeadForm;
  /** Subject of the internal notification email. */
  subject: string;
  /** Human-readable labels → values. Order is kept in the email and becomes the Sheet's column order. */
  fields: Record<string, FieldValue>;
  /** The submitter's email: the notification's Reply-To and the acknowledgement's recipient. */
  replyTo: string;
  /** Acknowledgement sent to the submitter. Keep it free of user-supplied text other than a first name. */
  ack: { subject: string; text: string };
};

export type DeliveryResult = { delivered: boolean; ackSent: boolean };

const RESEND_URL = "https://api.resend.com/emails";

// TODO(step 7): route enquiries to the CRM (HubSpot or Zoho, via CRM_PROVIDER) alongside these channels.
const notifyTo: Record<LeadForm, string | undefined> = {
  enquiry: process.env.LEAD_NOTIFY_TO ?? contact.email,
  community: process.env.COMMUNITY_NOTIFY_TO ?? process.env.LEAD_NOTIFY_TO ?? contact.email,
  shambhavi: process.env.CAREERS_NOTIFY_TO ?? process.env.LEAD_NOTIFY_TO ?? contact.email,
};

const show = (v: FieldValue) => (v === true ? "Yes" : v === false ? "No" : v == null || v === "" ? "—" : String(v));

async function sendEmail(body: Record<string, unknown>): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.LEAD_FROM ?? `Texiri Solutions <website@texiri.com>`, ...body }),
      cache: "no-store",
    });
    if (!res.ok) console.error("[leads] resend failed", res.status);
    return res.ok;
  } catch (e) {
    console.error("[leads] resend error", (e as Error).message);
    return false;
  }
}

async function appendToSheet(lead: Lead): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return false;
  try {
    const fields = Object.fromEntries(Object.entries(lead.fields).map(([k, v]) => [k, show(v)]));
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, form: lead.form, fields }),
      cache: "no-store",
    });
    // Apps Script answers 200 even on rejection, so the body decides.
    const ok = res.ok && ((await res.json().catch(() => ({}))) as { ok?: boolean }).ok === true;
    if (!ok) console.error("[leads] sheet append failed", res.status);
    return ok;
  } catch (e) {
    console.error("[leads] sheet error", (e as Error).message);
    return false;
  }
}

/**
 * Delivers a form submission by email (Resend) and to the Google Sheet log, in parallel.
 * It counts as delivered when at least one of the two succeeds. With neither configured, local
 * development logs the form name only (never personal data) and succeeds; any other environment fails,
 * so a misconfigured deployment can't silently drop leads.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const emailOn = Boolean(process.env.RESEND_API_KEY);
  const sheetOn = Boolean(process.env.SHEETS_WEBHOOK_URL && process.env.SHEETS_WEBHOOK_SECRET);
  if (!emailOn && !sheetOn) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[leads] ${lead.form} received (no delivery channel configured)`);
      return { delivered: true, ackSent: false };
    }
    console.error(`[leads] ${lead.form} NOT delivered: set RESEND_API_KEY and/or SHEETS_WEBHOOK_URL + SHEETS_WEBHOOK_SECRET`);
    return { delivered: false, ackSent: false };
  }

  const text = Object.entries(lead.fields).map(([k, v]) => `${k}:\n${show(v)}`).join("\n\n");
  const [notified, logged] = await Promise.all([
    emailOn ? sendEmail({ to: [notifyTo[lead.form]], reply_to: lead.replyTo, subject: lead.subject.replace(/[\r\n]+/g, " ").slice(0, 200), text }) : false,
    sheetOn ? appendToSheet(lead) : false,
  ]);
  const delivered = notified || logged;

  // Acknowledge only what was actually received.
  const ackSent = delivered && emailOn
    ? await sendEmail({ to: [lead.replyTo], reply_to: notifyTo[lead.form], subject: lead.ack.subject, text: lead.ack.text })
    : false;

  return { delivered, ackSent };
}

/** Common sign-off for acknowledgement emails. */
export const signOff = `\n\nTexiri Solutions\n${contact.phoneDisplay} · ${contact.email}\nhttps://www.texiri.com\n\nYou're receiving this because this email address was entered on a form at texiri.com. If that wasn't you, please ignore this email.`;
