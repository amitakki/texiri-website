#!/usr/bin/env node
// Renders the link-preview image and icons into app/ as static PNGs (Next.js metadata file convention).
// Static files keep a file extension, so trailingSlash never redirects them, which some preview crawlers won't follow.
// Run after changing the logo or brand colours: node scripts/generate-brand-images.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const logo = `data:image/png;base64,${readFileSync("public/texiri-logo.png").toString("base64")}`;
// Mirrors the @theme tokens in app/globals.css.
const C = { navy: "#0f1a2e", navy7: "#243553", onNavy: "#f5f4f1", onNavyMuted: "#aeb8c8", accent: "#f7941d", ai: "#2bb5e8" };
const head = `<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&display=block" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{font-family:Archivo,sans-serif;background:${C.navy};color:${C.onNavy}}</style>`;

// The logo sits in the centre so it survives the square crop WhatsApp and others apply to previews.
const share = `<!doctype html><html><head>${head}</head><body>
<div style="width:1200px;height:630px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative">
  <img src="${logo}" style="width:500px;height:auto">
  <div style="margin-top:38px;width:120px;height:6px;background:${C.accent}"></div>
  <div style="margin-top:30px;font-size:34px;font-weight:600;color:${C.onNavyMuted};letter-spacing:.2px">SAP consulting · S/4HANA migration · 2Klicks tools</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:14px;display:flex"><div style="flex:3;background:${C.accent}"></div><div style="flex:1;background:${C.ai}"></div></div>
</div></body></html>`;

const mark = (px) => `<!doctype html><html><head>${head}</head><body>
<div style="width:${px}px;height:${px}px;display:flex;align-items:center;justify-content:center;position:relative;background:${C.navy}">
  <div style="font-size:${px * 0.78}px;font-weight:800;line-height:1;color:${C.accent};margin-top:${px * 0.04}px">T</div>
  <div style="position:absolute;top:${px * 0.12}px;right:${px * 0.12}px;width:${px * 0.18}px;height:${px * 0.18}px;background:${C.ai}"></div>
</div></body></html>`;

const jobs = [
  ["app/opengraph-image.png", share, 1200, 630],
  ["app/twitter-image.png", share, 1200, 630],
  ["app/icon.png", mark(64), 64, 64],
  ["app/apple-icon.png", mark(180), 180, 180],
];

const browser = await chromium.launch();
for (const [out, html, width, height] of jobs) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width, height } });
  await page.close();
  console.log(`wrote ${out}`);
}
await browser.close();

const alt = "Texiri Solutions — SAP consulting, S/4HANA migration and 2Klicks tools";
writeFileSync("app/opengraph-image.alt.txt", alt);
writeFileSync("app/twitter-image.alt.txt", alt);
