#!/usr/bin/env node
// Generates the on-brand placeholder illustrations in public/images/placeholders/.
// They stand in for real photos and screenshots until Texiri supplies them (docs/content-decisions.md).
// Run: node scripts/generate-placeholder-images.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "public/images/placeholders";
mkdirSync(OUT, { recursive: true });

// Mirrors the @theme tokens in app/globals.css.
const C = {
  ground: "#f5f4f1", surface: "#ebe9e4", strong: "#d7d3d3", ink: "#0f1a2e", muted: "#4a5670",
  navy: "#0f1a2e", navy8: "#18263f", navy7: "#243553", onNavy: "#f5f4f1", onNavyMuted: "#aeb8c8",
  accent: "#f7941d", accent6: "#e07f0a", accent3: "#fbc27d", accent2: "#fddcb3", accent1: "#fef1e0",
  ai: "#2bb5e8", aiInk: "#1546a0", aiTint: "#e3f4fb",
  com: "#ffc20e", comTint: "#fff0c7", comTint2: "#ffe6a3", comBlue: "#1546a0", comBlueTint: "#e3ecfb", comOrangeTint: "#fde3c4",
};
const SKIN = ["#c68a5f", "#a8714b", "#e0a878", "#8a5a3c", "#b97d55"];
const HAIR = ["#1d1a19", "#2b211c", "#3a2a20"];
const FONT = `font-family="Archivo, 'Segoe UI', system-ui, sans-serif"`;

const svg = (w, h, bg, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>\n`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const text = (x, y, s, fill, size, weight = 700, extra = "") => `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" ${FONT} ${extra}>${s}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 4, extra = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
let dotId = 0;
const dots = (w, h, color, gap = 28, r = 1.6) => {
  const id = `dots${++dotId}`;
  return `<defs><pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse"><circle cx="${gap / 2}" cy="${gap / 2}" r="${r}" fill="${color}"/></pattern></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>`;
};

/** A person seen from the front, head centre at (x, y). `long` adds long hair. */
function person(x, y, s, shirt, i = 0, { long = false } = {}) {
  const r = 34 * s, skin = SKIN[i % SKIN.length], hair = HAIR[i % HAIR.length];
  const bw = 78 * s, top = y + r + 10 * s, bh = 150 * s;
  return [
    long ? `<path d="M${x - r * 1.05},${y} Q${x - r * 1.2},${y + r * 2.2} ${x - r * 0.6},${y + r * 2.4} L${x + r * 0.6},${y + r * 2.4} Q${x + r * 1.2},${y + r * 2.2} ${x + r * 1.05},${y} Z" fill="${hair}"/>` : "",
    `<path d="M${x - bw},${top + bh} V${top + bw * 0.7} A${bw},${bw * 0.7} 0 0 1 ${x + bw},${top + bw * 0.7} V${top + bh} Z" fill="${shirt}"/>`,
    rect(x - 10 * s, y + r * 0.7, 20 * s, 18 * s, skin),
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${skin}"/>`,
    `<path d="M${x - r},${y - 2 * s} A${r},${r} 0 0 1 ${x + r},${y - 2 * s} Q${x},${y - r * 0.55} ${x - r},${y - 2 * s} Z" fill="${hair}"/>`,
  ].join("");
}
/** A person seen from behind (looking at a screen). */
function back(x, y, s, shirt, i = 0) {
  const r = 34 * s, hair = HAIR[i % HAIR.length], bw = 82 * s, top = y + r - 4 * s;
  return `<path d="M${x - bw},${top + 170 * s} V${top + bw * 0.7} A${bw},${bw * 0.7} 0 0 1 ${x + bw},${top + bw * 0.7} V${top + 170 * s} Z" fill="${shirt}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${hair}"/>`;
}
/** Laptop lid seen from behind, bottom centre at (x, y). */
const laptop = (x, y, s, lid = C.navy7, mark = C.accent) =>
  rect(x - 70 * s, y - 92 * s, 140 * s, 92 * s, lid) + rect(x - 9 * s, y - 55 * s, 18 * s, 18 * s, mark) + rect(x - 84 * s, y, 168 * s, 8 * s, C.strong);
const arrow = (x1, y, x2, color, w = 6) => line(x1, y, x2 - 14, y, color, w) + `<path d="M${x2 - 22},${y - 14} L${x2},${y} L${x2 - 22},${y + 14} Z" fill="${color}"/>`;

const images = {};

// ── SAP consulting team around a table, one presenting the migration plan ──
images["consulting-team"] = svg(1500, 1000, C.ground, [
  rect(0, 700, 1500, 300, C.surface),
  rect(820, 130, 560, 380, C.navy),
  text(860, 190, "S/4HANA migration plan", C.onNavyMuted, 26, 600),
  ...["Assess", "Design", "Mock loads", "Cutover"].map((t, i) => rect(860 + i * 126, 230, 112, 64, i === 2 ? C.accent : C.navy7) + text(872 + i * 126, 270, t, i === 2 ? C.navy : C.onNavy, 17, 700)),
  ...[0, 1, 2, 3].map((i) => rect(860, 330 + i * 38, 220 + ((i * 97) % 220), 18, i === 1 ? C.accent3 : C.navy7)),
  rect(1120, 330, 220, 140, C.navy8) + `<polyline points="1135,450 1185,410 1235,425 1285,370 1325,350" fill="none" stroke="${C.ai}" stroke-width="6"/>`,
  person(1140, 560, 1.05, C.navy7, 3),
  line(1100, 650, 1010, 520, SKIN[3], 18, 'stroke-linecap="round"'),
  rect(120, 700, 860, 26, C.strong), rect(160, 726, 20, 220, C.strong), rect(920, 726, 20, 220, C.strong),
  person(260, 520, 1, C.accent6, 0), person(520, 500, 1.05, C.navy, 1, { long: true }), person(780, 525, 0.98, C.aiInk, 2),
  rect(120, 680, 860, 22, C.strong),
  laptop(260, 690, 0.9), laptop(520, 690, 0.9, C.navy8, C.ai), laptop(780, 690, 0.9),
].join(""));

// ── Team photo: two rows of people ──
images["team-photo"] = svg(1200, 900, C.surface, [
  rect(0, 0, 1200, 120, C.ground), rect(0, 120, 1200, 10, C.accent),
  ...[180, 400, 620, 840, 1040].map((x, i) => person(x, 330 - (i % 2) * 18, 1.15, [C.navy7, C.navy, C.aiInk, C.navy8, C.muted][i], i + 1, { long: i % 2 === 1 })),
  ...[290, 510, 730, 950].map((x, i) => person(x, 520, 1.2, [C.accent6, C.navy7, C.accent, C.navy][i], i, { long: i === 2 })),
  rect(0, 820, 1200, 80, C.strong),
].join(""));

// ── Vijayapura office building ──
images["office"] = svg(1200, 900, C.ground, [
  rect(0, 760, 1200, 140, C.surface),
  rect(240, 170, 720, 590, C.navy8), rect(240, 170, 720, 18, C.accent),
  ...Array.from({ length: 4 }, (_, row) => Array.from({ length: 6 }, (_, col) => rect(290 + col * 110, 240 + row * 110, 70, 70, (row * 6 + col) % 5 === 1 ? C.accent3 : C.navy7)).join("")),
  rect(530, 640, 140, 120, C.navy), rect(540, 650, 55, 110, C.navy7), rect(605, 650, 55, 110, C.navy7),
  rect(300, 600, 200, 34, C.accent) + text(318, 625, "TEXIRI", C.navy, 26, 800, 'letter-spacing="4"'),
  `<circle cx="140" cy="640" r="90" fill="#6b8f71"/>` + rect(132, 680, 16, 90, C.muted),
  `<circle cx="1070" cy="660" r="70" fill="#6b8f71"/>` + rect(1062, 690, 16, 80, C.muted),
].join(""));

// ── Data migration flow: legacy sources → cleanse & validate → S/4HANA ──
images["data-migration"] = svg(1600, 900, C.ground, [
  ...[["ECC", 190], ["Legacy", 420], ["Excel", 650]].map(([t, y]) =>
    `<ellipse cx="230" cy="${y}" rx="110" ry="30" fill="${C.navy7}"/>` + rect(120, y, 220, 110, C.navy7) + `<ellipse cx="230" cy="${y + 110}" rx="110" ry="30" fill="${C.navy7}"/><ellipse cx="230" cy="${y}" rx="110" ry="30" fill="${C.navy8}"/>` + text(185, y + 75, t, C.onNavy, 30, 800)),
  arrow(370, 300, 600, C.accent), arrow(370, 480, 600, C.accent), arrow(370, 700, 600, C.accent),
  rect(620, 210, 360, 520, C.surface) + rect(620, 210, 360, 10, C.accent),
  text(650, 280, "Cleanse · Validate", C.ink, 30, 800),
  ...["Duplicates removed", "Custom fields mapped", "Validations passed", "Reconciled"].map((t, i) =>
    rect(650, 320 + i * 95, 300, 70, C.ground) + `<circle cx="690" cy="${355 + i * 95}" r="18" fill="${i < 3 ? C.accent : C.strong}"/>` + text(725, 364 + i * 95, t, C.muted, 22, 600)),
  arrow(1000, 470, 1180, C.accent, 8),
  rect(1200, 200, 300, 540, C.navy) + text(1235, 270, "S/4HANA", C.onNavy, 40, 800),
  ...Array.from({ length: 7 }, (_, i) => rect(1235, 310 + i * 56, 230, 34, i % 3 === 0 ? C.navy7 : C.navy8)),
  `<circle cx="1490" cy="210" r="46" fill="${C.accent}"/><polyline points="1468,210 1485,228 1515,192" fill="none" stroke="${C.navy}" stroke-width="10"/>`,
].join(""));

// ── 2Klicks Create product UI (template → upload → validation log) ──
images["2klicks-ui"] = svg(1600, 1000, C.ground, [
  rect(0, 0, 1600, 64, C.navy), rect(28, 24, 16, 16, C.accent), text(60, 42, "2Klicks Create", C.onNavy, 24, 800),
  text(1250, 42, "DEV-100 · RE-FX", C.onNavyMuted, 20, 600),
  rect(0, 64, 300, 936, C.surface), text(30, 120, "OBJECTS", C.muted, 16, 700, 'letter-spacing="2"'),
  ...["Lease contracts", "Rental objects", "Business partners", "Conditions", "Material master", "Equipment"].map((t, i) =>
    rect(16, 145 + i * 64, 268, 52, i === 0 ? C.navy : C.surface) + text(36, 178 + i * 64, t, i === 0 ? C.onNavy : C.ink, 20, 600)),
  text(340, 120, "Lease contracts · template", C.ink, 30, 800),
  rect(1180, 88, 180, 48, C.surface, `stroke="${C.ink}" stroke-width="2"`) + text(1200, 120, "Download", C.ink, 20, 700),
  rect(1375, 88, 190, 48, C.accent) + text(1400, 120, "Upload  →", C.navy, 20, 800),
  // spreadsheet
  rect(340, 160, 820, 600, "#ffffff", `stroke="${C.strong}" stroke-width="2"`),
  rect(340, 160, 820, 52, C.accent2),
  ...["Contract", "Company code", "Start date", "Rent", "ZZ_REGION*"].map((t, i) => text(356 + i * 164, 194, t, C.ink, 17, 800)),
  ...Array.from({ length: 10 }, (_, r) => line(340, 266 + r * 54, 1160, 266 + r * 54, C.surface, 2) +
    Array.from({ length: 5 }, (_, c) => rect(356 + c * 164, 228 + r * 54, 60 + ((r * 7 + c * 13) % 70), 16, c === 4 ? C.accent3 : C.strong)).join("")),
  ...[1, 2, 3, 4].map((c) => line(340 + c * 164, 160, 340 + c * 164, 760, C.surface, 2)),
  text(356, 800, "* custom field recognised from your system", C.muted, 18, 600),
  // validation log
  rect(1190, 160, 380, 600, C.navy) + text(1220, 210, "Validation log", C.onNavy, 24, 800),
  ...[["1,248 rows read", C.ai], ["Custom fields: 3 found", C.ai], ["Company code check", C.accent], ["Date formats", C.accent], ["Ready to load", C.accent]].map(([t, col], i) =>
    `<circle cx="1232" cy="${262 + i * 70}" r="14" fill="${col}"/>` + text(1260, 270 + i * 70, t, C.onNavy, 20, 600)),
  rect(1220, 640, 320, 14, C.navy7) + rect(1220, 640, 250, 14, C.accent),
  text(1220, 700, "Mock load 3 · 98% passed", C.onNavyMuted, 18, 600),
  // stepper
  ...["1  Download template", "2  Enter or modify data", "3  Upload"].map((t, i) => rect(340 + i * 410, 850, 390, 90, i === 2 ? C.navy : C.surface) + text(370 + i * 410, 905, t, i === 2 ? C.onNavy : C.ink, 24, 800)),
].join(""));

// ── AI readiness workshop: team in front of a model graph ──
images["ai-workshop"] = svg(1600, 900, C.navy, [
  dots(1600, 900, "rgba(43,181,232,0.28)", 26),
  rect(260, 90, 1080, 520, C.navy8, `stroke="${C.ai}" stroke-width="4"`),
  (() => {
    const n = [[400, 220], [400, 350], [400, 480], [700, 180], [700, 300], [700, 420], [700, 540], [1000, 260], [1000, 450], [1220, 350]];
    const edges = [[0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [1, 3], [3, 7], [4, 7], [5, 8], [6, 8], [4, 8], [7, 9], [8, 9]];
    return edges.map(([a, b]) => line(n[a][0], n[a][1], n[b][0], n[b][1], "rgba(43,181,232,0.55)", 3)).join("") +
      n.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 9 ? 30 : 20}" fill="${i === 9 ? C.accent : C.ai}"/>`).join("");
  })(),
  text(300, 150, "Use-case ranking", C.onNavyMuted, 24, 600),
  back(420, 700, 1.25, C.navy7, 0), back(800, 690, 1.35, C.aiInk, 1), back(1180, 705, 1.2, C.navy7, 2),
].join(""));

// ── AI Community workshop (tall tile) ──
images["community-workshop"] = svg(900, 1200, C.comTint, [
  `<circle cx="760" cy="160" r="120" fill="${C.com}"/>`, `<circle cx="120" cy="1080" r="160" fill="${C.comOrangeTint}"/>`,
  `<rect x="90" y="120" width="460" height="300" rx="24" fill="${C.comBlue}"/>`,
  text(130, 190, "Prompting 101", "#ffffff", 34, 800),
  ...[0, 1, 2].map((i) => `<rect x="130" y="${230 + i * 52}" width="${300 - i * 60}" height="22" rx="11" fill="${i === 1 ? C.com : "rgba(255,255,255,0.45)"}"/>`),
  person(220, 640, 1.2, C.comBlue, 0, { long: true }), person(470, 610, 1.3, C.accent, 1), person(720, 650, 1.15, C.navy7, 2, { long: true }),
  `<rect x="60" y="820" width="780" height="40" rx="20" fill="#ffffff"/>`,
  laptop(220, 830, 0.95, "#ffffff", C.comBlue), laptop(470, 830, 0.95, "#ffffff", C.accent), laptop(720, 830, 0.95, "#ffffff", C.com),
].join(""));

// ── AI Community project demo ──
images["community-demo"] = svg(900, 700, C.comBlueTint, [
  `<rect x="300" y="70" width="540" height="330" rx="22" fill="#ffffff"/>`,
  text(340, 130, "My first chatbot", C.ink, 30, 800),
  `<rect x="340" y="160" width="300" height="44" rx="22" fill="${C.comBlueTint}"/>`, `<rect x="500" y="222" width="300" height="44" rx="22" fill="${C.com}"/>`, `<rect x="340" y="284" width="250" height="44" rx="22" fill="${C.comBlueTint}"/>`,
  person(190, 300, 1.25, C.accent, 3, { long: true }), line(250, 400, 330, 280, SKIN[3], 16, 'stroke-linecap="round"'),
  back(330, 640, 0.9, C.comBlue, 0), back(560, 650, 0.95, C.navy7, 1), back(780, 640, 0.9, C.accent, 2),
].join(""));

// ── Member projects (screenshot-style) ──
const browser = (w, h, bg, body) => svg(w, h, bg, `<rect x="40" y="40" width="${w - 80}" height="${h - 80}" rx="20" fill="#ffffff"/><rect x="40" y="40" width="${w - 80}" height="56" rx="20" fill="${C.comTint2}"/>${[0, 1, 2].map((i) => `<circle cx="${80 + i * 30}" cy="68" r="9" fill="#ffffff"/>`).join("")}${body}`);
images["project-vision"] = browser(1600, 1000, C.comTint, [
  rect(90, 130, 1420, 800, C.comBlueTint),
  rect(90, 690, 1420, 240, "#cfd8c8"), `<circle cx="1320" cy="260" r="80" fill="${C.com}"/>`,
  rect(300, 520, 360, 200, C.comBlue) + `<circle cx="370" cy="730" r="46" fill="${C.ink}"/><circle cx="590" cy="730" r="46" fill="${C.ink}"/>`,
  person(980, 470, 1.6, C.accent, 1),
  `<rect x="270" y="490" width="420" height="300" fill="none" stroke="${C.accent}" stroke-width="8"/>`, rect(270, 450, 180, 40, C.accent) + text(284, 478, "car 0.88", C.ink, 24, 800),
  `<rect x="850" y="400" width="260" height="400" fill="none" stroke="${C.com}" stroke-width="8"/>`, rect(850, 360, 220, 40, C.com) + text(864, 388, "person 0.94", C.ink, 24, 800),
].join(""));
images["project-chatbot"] = browser(1600, 1000, C.comBlueTint, [
  ...[[160, 170, 640, "Which learning path should I start with?", false], [760, 300, 680, "Start with “AI from zero”: no code needed.", true], [160, 450, 560, "Can I build something this week?", false], [760, 580, 680, "Yes! Try the chatbot workshop on Saturday.", true]].map(([x, y, w, t, bot]) =>
    `<rect x="${x}" y="${y}" width="${w}" height="96" rx="48" fill="${bot ? C.comBlue : C.comTint}"/>` + text(x + 44, y + 58, t, bot ? "#ffffff" : C.ink, 28, 600)),
  `<rect x="160" y="780" width="1280" height="88" rx="44" fill="#ffffff" stroke="${C.strong}" stroke-width="3"/>`, text(210, 834, "Ask anything…", C.muted, 28, 500),
  `<circle cx="1390" cy="824" r="30" fill="${C.com}"/>`,
].join(""));
images["project-forecast"] = browser(1600, 1000, C.comOrangeTint, [
  text(130, 190, "Weekly demand forecast", C.ink, 40, 800),
  ...[0, 1, 2, 3, 4].map((i) => line(130, 300 + i * 130, 1470, 300 + i * 130, C.surface, 3)),
  `<path d="M900,520 L1060,470 L1220,420 L1380,380 L1470,350 L1470,560 L1380,580 L1220,610 L1060,640 L900,640 Z" fill="${C.comTint2}"/>`,
  `<polyline points="130,700 290,640 450,670 610,560 770,600 900,580" fill="none" stroke="${C.comBlue}" stroke-width="10" stroke-linejoin="round"/>`,
  `<polyline points="900,580 1060,555 1220,515 1380,480 1470,455" fill="none" stroke="${C.accent}" stroke-width="10" stroke-dasharray="26 18"/>`,
  rect(130, 860, 30, 30, C.comBlue) + text(175, 885, "Actual", C.muted, 26, 600) + rect(330, 860, 30, 30, C.accent) + text(375, 885, "Forecast", C.muted, 26, 600),
].join(""));

// ── Insight article illustrations ──
images["article-ecc-2027"] = svg(1600, 900, C.ground, [
  rect(0, 0, 1600, 900, C.surface),
  rect(260, 160, 520, 580, "#ffffff") + rect(260, 160, 520, 130, C.navy) + text(310, 250, "DEC", C.onNavy, 54, 800) + text(330, 560, "2027", C.ink, 170, 800),
  rect(330, 620, 380, 16, C.accent),
  `<circle cx="1110" cy="450" r="270" fill="${C.navy}"/><circle cx="1110" cy="450" r="230" fill="${C.navy8}"/>`,
  `<path d="M1110,450 L1110,230 A220,220 0 0 1 1300,560 Z" fill="${C.accent}"/>`,
  line(1110, 450, 1110, 270, C.onNavy, 14, 'stroke-linecap="round"') + line(1110, 450, 1240, 520, C.onNavy, 14, 'stroke-linecap="round"') + `<circle cx="1110" cy="450" r="20" fill="${C.onNavy}"/>`,
].join(""));
images["article-refx"] = svg(1600, 900, C.accent1, [
  rect(0, 640, 1600, 260, C.accent2),
  ...[[160, 260, 220, 380], [420, 160, 240, 480], [700, 300, 200, 340], [940, 210, 260, 430]].map(([x, y, w, h], i) =>
    rect(x, y, w, h, i % 2 ? C.navy : C.navy7) + Array.from({ length: Math.floor(h / 80) }, (_, r) => [0, 1].map((c) => rect(x + 34 + c * (w / 2 - 10), y + 40 + r * 80, w / 2 - 60, 40, (r + c + i) % 4 === 0 ? C.accent3 : C.navy8)).join("")).join("")),
  `<g transform="rotate(-6 1350 470)">${rect(1240, 260, 260, 340, "#ffffff")}${text(1270, 320, "LEASE", C.ink, 34, 800)}${[0, 1, 2, 3, 4].map((i) => rect(1270, 350 + i * 40, 200 - (i % 2) * 60, 14, C.strong)).join("")}<circle cx="1440" cy="550" r="34" fill="${C.accent}"/></g>`,
].join(""));
images["article-first-ai"] = svg(1600, 900, C.navy, [
  dots(1600, 900, "rgba(43,181,232,0.25)", 30),
  ...[["1", "Invoice extraction", 250, C.accent], ["2", "Demand forecast", 420, C.ai], ["3", "Policy assistant", 590, C.navy7]].map(([n, t, y, col], i) =>
    rect(260 + i * 40, y, 760, 130, C.navy8, `stroke="${col}" stroke-width="4"`) + rect(260 + i * 40, y, 110, 130, col) + text(300 + i * 40, y + 88, n, i === 2 ? C.onNavy : C.navy, 64, 800) + text(410 + i * 40, y + 80, t, C.onNavy, 40, 700)),
  `<circle cx="1260" cy="420" r="150" fill="none" stroke="${C.ai}" stroke-width="6"/><circle cx="1260" cy="420" r="60" fill="${C.ai}"/>`,
  ...[0, 60, 120, 180, 240, 300].map((a) => { const r = (a * Math.PI) / 180; return line(1260 + Math.cos(r) * 80, 420 + Math.sin(r) * 80, 1260 + Math.cos(r) * 140, 420 + Math.sin(r) * 140, C.ai, 6); }),
].join(""));

// ── Shambhavi 108: learners restarting their careers ──
images["learners"] = svg(1600, 1000, C.accent1, [
  rect(0, 0, 1600, 1000, C.accent1), `<circle cx="1380" cy="200" r="160" fill="${C.accent2}"/>`,
  rect(150, 120, 600, 330, C.navy) + text(190, 190, "Week 3 · JavaScript basics", C.onNavyMuted, 26, 600),
  ...[0, 1, 2, 3].map((i) => rect(190 + (i % 2) * 40, 230 + i * 48, 360 - i * 50, 22, i === 2 ? C.accent : C.navy7)),
  person(330, 600, 1.35, C.navy7, 0, { long: true }), person(800, 580, 1.4, C.accent6, 1, { long: true }), person(1260, 610, 1.3, C.aiInk, 4),
  rect(80, 800, 1440, 34, C.strong),
  laptop(330, 810, 1.1), laptop(800, 810, 1.1, C.navy8, C.ai), laptop(1260, 810, 1.1),
].join(""));

for (const [name, body] of Object.entries(images)) writeFileSync(`${OUT}/${name}.svg`, body);
console.log(`Wrote ${Object.keys(images).length} placeholder images to ${OUT}/`);
