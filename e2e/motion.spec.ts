import { expect, test } from "@playwright/test";

test.describe("with motion allowed", () => {
  test.use({ reducedMotion: "no-preference" });

  test("content below the fold fades in as it scrolls into view", async ({ page }) => {
    await page.goto("/about/");
    const heading = page.locator("#how-h");
    await expect(heading).toHaveClass(/reveal-armed/);
    await expect(heading).toHaveCSS("opacity", "0");
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toHaveClass(/reveal-in/);
    await expect(heading).toHaveCSS("opacity", "1");
  });

  test("the hero is never hidden waiting for JavaScript", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).not.toHaveClass(/reveal-armed/);
    await expect(h1).toHaveCSS("opacity", "1");
  });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("nothing is hidden or animated", async ({ page }) => {
    await page.goto("/about/");
    await expect(page.locator(".reveal-armed")).toHaveCount(0);
    await expect(page.locator("h1")).toHaveCSS("animation-name", "none");
  });
});
