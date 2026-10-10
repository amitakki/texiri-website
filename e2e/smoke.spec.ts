import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/", "/sap/", "/sap/data-migration/", "/sap/consulting/", "/2klicks/create/", "/ai-services/", "/ai-community/", "/ai-community/join/",
  "/about/", "/about/leadership/", "/careers/", "/careers/shambhavi-108/", "/contact/", "/legal/privacy/", "/legal/cookies/", "/legal/terms/",
];

for (const path of routes) {
  test(`${path} loads with one h1 and no serious accessibility violations`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);

    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
  });
}

test("previews are kept out of search engines", async ({ page, request }) => {
  const res = await page.goto("/");
  expect(res?.headers()["x-robots-tag"]).toContain("noindex");
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
});

test("security headers are set", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});

test("old WordPress URLs redirect", async ({ request }) => {
  for (const [from, to] of [["/services/", "/sap/"], ["/about/team/", "/about/leadership/"], ["/2klicks-create/", "/2klicks/create/"]]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers().location).toBe(to);
  }
});

test("desktop mega-menu links to the section overview", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop navigation only");
  await page.goto("/contact/");
  await page.getByRole("button", { name: "SAP Services" }).click();
  await page.getByRole("link", { name: "SAP Services overview" }).click();
  await expect(page).toHaveURL(/\/sap\/$/);
});

test("mobile menu opens with focus inside and closes on Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("#mobile-nav :focus")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("AI Services breadcrumbs are readable on the navy hero", async ({ page }) => {
  await page.goto("/ai-services/");
  const current = page.getByRole("navigation", { name: "Breadcrumb" }).locator('[aria-current="page"]');
  await expect(current).toHaveCSS("color", "rgb(245, 244, 241)");
});

test("enquiry form shows errors and keeps what was typed", async ({ page }) => {
  await page.goto("/contact/?type=ai");
  await expect(page.getByLabel("Enquiry type")).toHaveValue("AI Services");
  await page.getByLabel("Full name *").fill("Asha Rao");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator("#f-email-error")).toContainText("valid email");
  await expect(page.getByLabel("Work email *")).toBeFocused();
  await expect(page.getByLabel("Full name *")).toHaveValue("Asha Rao");
});

test("enquiry form hints at, but accepts, personal email addresses", async ({ page }) => {
  await page.goto("/contact/");
  await page.getByLabel("Work email *").fill("asha@gmail.com");
  await page.getByLabel("Company *").focus();
  await expect(page.locator("#f-email-error")).toContainText("any address is fine");
});
