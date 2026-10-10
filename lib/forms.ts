import type { ZodIssue } from "zod";

/** First error message per field, keyed by field name. Shared by the client forms and the server actions. */
export function collectErrors(issues: ZodIssue[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) errors[String(issue.path[0])] ??= issue.message;
  return errors;
}

/** Name of the hidden honeypot field rendered by <Honeypot />. People never see it; bots fill it in. */
export const HONEYPOT_FIELD = "website";

export function isBot(form: FormData) {
  return String(form.get(HONEYPOT_FIELD) ?? "").trim() !== "";
}

export function clientIp(h: Headers) {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
}

/** Only the first word of a name, capped, so acknowledgement emails can't carry a spammer's text. */
export function firstName(name: string) {
  // Latin (incl. accented) and Indic scripts; drops URLs, digits and punctuation.
  return (name.trim().split(/\s+/)[0] ?? "").replace(/[^A-Za-zÀ-ɏऀ-෿'.-]/g, "").slice(0, 40) || "there";
}
