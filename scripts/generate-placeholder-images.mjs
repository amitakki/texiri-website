#!/usr/bin/env node
// Generates the on-brand placeholder illustrations in public/images/placeholders/.
// They stand in for real photos and screenshots until Texiri supplies them (docs/content-decisions.md,
// docs/visual-asset-brief.md). Each one is drawn to explain its subject, not just fill space.
// Illustrations accepted as final (listed in FINAL) go to public/images/illustrations/ instead.
// Run: node scripts/generate-placeholder-images.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import sap from "./illustrations-sap.mjs";
import ai from "./illustrations-ai.mjs";
import company from "./illustrations-company.mjs";
import eccArticle from "./illustrations-ecc-article.mjs";
import refxArticle from "./illustrations-refx-article.mjs";
import aiArticle from "./illustrations-ai-article.mjs";
import csrSchool from "./illustrations-csr-school.mjs";

const OUT = "public/images/placeholders";
const FINAL_OUT = "public/images/illustrations";
const FINAL = new Set(["ai-pilots-stall", "article-ecc-2027", "article-refx", "article-first-ai", ...Object.keys(eccArticle), ...Object.keys(refxArticle), ...Object.keys(aiArticle)]);
mkdirSync(OUT, { recursive: true });
mkdirSync(FINAL_OUT, { recursive: true });

const images = { ...sap, ...ai, ...company, ...eccArticle, ...refxArticle, ...aiArticle, ...csrSchool };
for (const [name, body] of Object.entries(images)) writeFileSync(`${FINAL.has(name) ? FINAL_OUT : OUT}/${name}.svg`, body);
console.log(`Wrote ${Object.keys(images).length - FINAL.size} placeholder images to ${OUT}/ and ${FINAL.size} final illustrations to ${FINAL_OUT}/`);
