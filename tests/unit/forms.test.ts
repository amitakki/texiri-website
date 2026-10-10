import { describe, expect, it } from "vitest";
import { clientIp, collectErrors, firstName, HONEYPOT_FIELD, isBot } from "@/lib/forms";

describe("collectErrors", () => {
  it("keeps the first message per field", () => {
    const issues = [
      { path: ["email"], message: "first", code: "custom" },
      { path: ["email"], message: "second", code: "custom" },
      { path: ["name"], message: "name", code: "custom" },
    ] as Parameters<typeof collectErrors>[0];
    expect(collectErrors(issues)).toEqual({ email: "first", name: "name" });
  });
});

describe("isBot", () => {
  it("is true only when the honeypot is filled", () => {
    const fd = new FormData();
    expect(isBot(fd)).toBe(false);
    fd.set(HONEYPOT_FIELD, "  ");
    expect(isBot(fd)).toBe(false);
    fd.set(HONEYPOT_FIELD, "https://spam.example");
    expect(isBot(fd)).toBe(true);
  });
});

describe("firstName", () => {
  it("uses the first word", () => expect(firstName("Asha Rao")).toBe("Asha"));
  it("keeps accented and Indic names", () => {
    expect(firstName("José García")).toBe("José");
    expect(firstName("मीरा कुमार")).toBe("मीरा");
  });
  it("strips links and digits a spammer could inject into an acknowledgement", () => {
    expect(firstName("http://spam.example/win")).not.toMatch(/[/:]/);
    expect(firstName("Win$$$1000")).toBe("Win");
  });
  it("falls back to a neutral greeting", () => expect(firstName("   ")).toBe("there"));
});

describe("clientIp", () => {
  it("takes the first x-forwarded-for address", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" }))).toBe("203.0.113.5");
  });
  it("falls back to x-real-ip, then null", () => {
    expect(clientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
    expect(clientIp(new Headers())).toBeNull();
  });
});
