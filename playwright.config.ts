import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

// Runs against a production build: `npm run build` first (CI does), then `npm run test:e2e`.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  // Reduced motion keeps screenshots and axe checks deterministic; e2e/motion.spec.ts turns motion back on.
  use: { baseURL: `http://localhost:${PORT}`, trace: "on-first-retry", reducedMotion: "reduce" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: { command: `npx next start -p ${PORT}`, port: PORT, reuseExistingServer: !process.env.CI, timeout: 60_000 },
});
