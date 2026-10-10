#!/usr/bin/env node
// Lists unconfirmed content still in the code (see docs/content-decisions.md).
// `npm run placeholders` reports; `npm run placeholders -- --strict` exits 1 if anything is left (use before launch).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components", "lib"];
const MARKERS = /TO VERIFY|TO CONFIRM|CLIENT APPROVAL|CONTENT IN PROGRESS|PLACEHOLDER|<Placeholder|\[X\]|\[(?:Event title|Project title|Member name|Date[^\]]*|Year|Grievance officer|Full postal address)\]/;
const strict = process.argv.includes("--strict");

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (/\.(tsx?|mjs)$/.test(name)) yield p;
  }
}

const hits = [];
for (const root of ROOTS) {
  for (const file of files(root)) {
    // The Placeholder component itself isn't content.
    if (file.endsWith(join("components", "ui.tsx"))) continue;
    readFileSync(file, "utf8").split(/\r?\n/).forEach((line, i) => {
      const m = line.match(MARKERS);
      if (m) hits.push({ file: relative(".", file).replaceAll("\\", "/"), line: i + 1, marker: m[0], text: line.trim().slice(0, 110) });
    });
  }
}

const byFile = Object.groupBy ? Object.groupBy(hits, (h) => h.file) : hits.reduce((a, h) => ((a[h.file] ??= []).push(h), a), {});
for (const [file, list] of Object.entries(byFile)) {
  console.log(`\n${file}`);
  for (const h of list) console.log(`  ${String(h.line).padStart(4)}  ${h.marker.padEnd(18)} ${h.text}`);
}
console.log(`\n${hits.length} placeholder marker(s) in ${Object.keys(byFile).length} file(s). Track them in docs/content-decisions.md.`);
if (strict && hits.length > 0) process.exit(1);
