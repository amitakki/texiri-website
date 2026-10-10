import { describe, expect, it } from "vitest";
import { communityJoinSchema } from "@/lib/community";
import { enquirySchema, isFreeMail } from "@/lib/enquiry";
import { collectErrors } from "@/lib/forms";
import { s108Schema } from "@/lib/shambhavi";

const enquiry = { name: "Asha Rao", email: "asha@acme.com", company: "Acme", role: "CIO", type: "S/4HANA data migration", phone: "", message: "", consent: true };

describe("enquirySchema", () => {
  it("accepts a complete enquiry", () => {
    expect(enquirySchema.safeParse(enquiry).success).toBe(true);
  });
  it("accepts personal email addresses (they are flagged, not blocked)", () => {
    expect(enquirySchema.safeParse({ ...enquiry, email: "asha@gmail.com" }).success).toBe(true);
  });
  it("requires consent and the core fields", () => {
    const r = enquirySchema.safeParse({ ...enquiry, name: " ", company: "", consent: false });
    expect(r.success).toBe(false);
    if (!r.success) expect(Object.keys(collectErrors(r.error.issues)).sort()).toEqual(["company", "consent", "name"]);
  });
  it("rejects unknown enquiry types", () => {
    expect(enquirySchema.safeParse({ ...enquiry, type: "Spam" }).success).toBe(false);
  });
});

describe("isFreeMail", () => {
  it.each(["a@gmail.com", "b@yahoo.co.in", "c@outlook.com", "d@rediffmail.com", "e@proton.me"])("flags %s", (e) => expect(isFreeMail(e)).toBe(true));
  it.each(["a@texiri.com", "b@gmailer.io", "c@acme-outlook.com"])("does not flag %s", (e) => expect(isFreeMail(e)).toBe(false));
});

describe("communityJoinSchema", () => {
  const join = { name: "Ravi", email: "ravi@example.com", city: "Vijayapura", role: "Student", level: "new", consent: true };
  it("accepts a minimal join", () => expect(communityJoinSchema.safeParse(join).success).toBe(true));
  it("rejects an unknown experience level", () => expect(communityJoinSchema.safeParse({ ...join, level: "guru" }).success).toBe(false));
});

describe("s108Schema", () => {
  const text = "Some answer";
  const app = {
    reference: text, name: "Meera K", location: "Vijayapura", age: "34", qualification: "B.E.", gradYear: "2012", married: "Yes", children: "2",
    mobile: "+91 98765 43210", email: "meera@example.com", occupation: text, laptop: "Yes", english: "4", intro: text, education: text,
    breakReason: text, breakUse: text, whyRestart: text, impact: text, strengths: text, commitment: text, hours: "15", acceptJob: "Yes",
    describe: text, pledge: true, consent: true,
  };
  it("accepts a complete application and coerces numbers", () => {
    const r = s108Schema.safeParse(app);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.age).toBe(34);
  });
  it("requires the consent checkbox", () => {
    const r = s108Schema.safeParse({ ...app, consent: false });
    expect(r.success).toBe(false);
    if (!r.success) expect(collectErrors(r.error.issues)).toHaveProperty("consent");
  });
  it("rejects a short mobile number", () => expect(s108Schema.safeParse({ ...app, mobile: "12345" }).success).toBe(false));
});
