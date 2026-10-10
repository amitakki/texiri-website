import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Lead } from "@/lib/leads";

const lead: Lead = {
  form: "enquiry",
  subject: "New enquiry",
  fields: { Name: "Asha Rao", Email: "asha@acme.com", Consent: true },
  replyTo: "asha@acme.com",
  ack: { subject: "Thanks", text: "Hi Asha" },
};

type Responder = (url: string) => { ok: boolean; json?: unknown };

function mockFetch(respond: Responder) {
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) });
    const r = respond(url);
    return { ok: r.ok, status: r.ok ? 200 : 500, json: async () => r.json ?? {} } as Response;
  }));
  return calls;
}

// lib/leads.ts reads the notification inboxes at import time, so load it after stubbing env.
async function load() {
  vi.resetModules();
  return import("@/lib/leads");
}

const isResend = (url: string) => url.includes("resend.com");

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("SHEETS_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
  vi.stubEnv("SHEETS_WEBHOOK_SECRET", "secret");
  vi.stubEnv("LEAD_NOTIFY_TO", "leads@texiri.com");
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("deliverLead", () => {
  it("emails the inbox, logs to the Sheet and acknowledges the sender", async () => {
    const calls = mockFetch((url) => ({ ok: true, json: isResend(url) ? { id: "1" } : { ok: true } }));
    const { deliverLead } = await load();
    expect(await deliverLead(lead)).toEqual({ delivered: true, ackSent: true });

    const emails = calls.filter((c) => isResend(c.url));
    expect(emails.map((c) => c.body.to)).toEqual([["leads@texiri.com"], ["asha@acme.com"]]);
    expect(emails[0].body.reply_to).toBe("asha@acme.com");
    const sheet = calls.find((c) => !isResend(c.url))!;
    expect(sheet.body).toMatchObject({ secret: "secret", form: "enquiry", fields: { Name: "Asha Rao", Consent: "Yes" } });
  });

  it("still counts as delivered when only the Sheet works", async () => {
    mockFetch((url) => (isResend(url) ? { ok: false } : { ok: true, json: { ok: true } }));
    const { deliverLead } = await load();
    expect(await deliverLead(lead)).toEqual({ delivered: true, ackSent: false });
  });

  it("treats a Sheet rejection in the response body as a failure", async () => {
    mockFetch((url) => (isResend(url) ? { ok: false } : { ok: true, json: { ok: false, error: "unauthorised" } }));
    const { deliverLead } = await load();
    expect(await deliverLead(lead)).toEqual({ delivered: false, ackSent: false });
  });

  it("sends no acknowledgement when nothing was delivered", async () => {
    const calls = mockFetch(() => ({ ok: false }));
    const { deliverLead } = await load();
    expect(await deliverLead(lead)).toEqual({ delivered: false, ackSent: false });
    expect(calls.filter((c) => isResend(c.url))).toHaveLength(1);
  });

  it("fails outside development when no channel is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("SHEETS_WEBHOOK_URL", "");
    const calls = mockFetch(() => ({ ok: true }));
    const { deliverLead } = await load();
    expect(await deliverLead(lead)).toEqual({ delivered: false, ackSent: false });
    expect(calls).toHaveLength(0);
  });

  it("succeeds in local development with no channel configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("SHEETS_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "development");
    mockFetch(() => ({ ok: true }));
    const { deliverLead } = await load();
    expect(await deliverLead(lead)).toEqual({ delivered: true, ackSent: false });
  });
});
