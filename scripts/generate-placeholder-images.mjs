#!/usr/bin/env node
// Generates the on-brand placeholder illustrations in public/images/placeholders/.
// They stand in for real photos and screenshots until Texiri supplies them (docs/content-decisions.md,
// docs/visual-asset-brief.md). Each one is drawn to explain its subject, not just fill space.
// Run: node scripts/generate-placeholder-images.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import sap from "./illustrations-sap.mjs";
import ai from "./illustrations-ai.mjs";

const OUT = "public/images/placeholders";
mkdirSync(OUT, { recursive: true });

const images = { ...sap, ...ai };
for (const [name, body] of Object.entries(images)) writeFileSync(`${OUT}/${name}.svg`, body);
console.log(`Wrote ${Object.keys(images).length} placeholder images to ${OUT}/`);
