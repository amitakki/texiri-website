// Illustrations for the article "ECC mainstream maintenance ends in 2027. Start with the data."
// (app/insights/ecc-2027-start-with-the-data/). Numbers drawn here are sample data, and say so.
import { C, arrow, circ, cylinder, g, grad, line, path, person, poly, rect, rr, shadow, svg, text, tick, warn, windowChrome } from "./illustration-kit.mjs";

const out = {};
const mid = 'text-anchor="middle"';
const bg = () => grad([[0, C.ground], [1, "#f3e4d0"]], "d");

// ── Hero: ECC data checked against agreed rules, then into S/4HANA, with the 2027 date ───────────
{
  const rows = [["Acme Traders", "Pune", "ok"], ["ACME Traders Ltd", "Pune", "dup"], ["Bharat Steel", "—", "miss"], ["Nova Foods", "Delhi", "ok"], ["Orion Pharma", "Mumbai", "ok"]];
  out["ecc-article-hero"] = svg16(g(
    circ(1380, 160, 220, "rgba(252,154,58,0.10)"),
    text(235, 300, "SAP ECC 6.0", C.navy, 30, 800, mid),
    shadow(cylinder(110, 330, 250, 300, C.navy7, C.navy6, "ECC", C.onNavy, 56)),
    arrow(380, 480, 466, C.accent, 10, 22),
    shadow(rr(480, 160, 640, 600, 16, C.white)),
    `<path d="M480,240 V176 a16,16 0 0 1 16,-16 h608 a16,16 0 0 1 16,16 V240 Z" fill="${C.navy}"/>`,
    text(516, 212, "Business partners · data check", C.onNavy, 30, 800),
    ...[["NAME", 516], ["CITY", 790], ["STATUS", 940]].map(([t, x]) => text(x, 288, t, C.soft, 18, 800, 'letter-spacing="2"')),
    ...rows.map(([n, city, k], i) => {
      const y = 306 + i * 74;
      const tint = k === "dup" ? C.redTint : k === "miss" ? C.accent1 : "none";
      const chip = k === "dup" ? rr(940, y + 18, 150, 40, 20, C.red) + text(1015, y + 45, "Duplicate", C.white, 19, 800, mid)
        : k === "miss" ? rr(940, y + 18, 150, 40, 20, C.accent) + text(1015, y + 45, "No city", C.navy, 19, 800, mid)
        : tick(958, y + 38, 16, C.green) + text(984, y + 45, "Clean", C.green, 21, 800);
      return g(rect(496, y, 608, 74, tint), text(516, y + 46, n, C.ink, 24, 700), text(790, y + 46, city, k === "miss" ? C.accent7 : C.ink, 24, 700), chip, line(496, y + 74, 1104, y + 74, C.line, 2));
    }),
    tick(526, 716, 15, C.navy, C.white), text(552, 724, "Rules agreed with data owners", C.muted, 22, 700),
    arrow(1136, 460, 1236, C.accent, 10, 22),
    shadow(rr(1250, 340, 270, 240, 16, C.navy)),
    text(1385, 445, "S/4HANA", C.onNavy, 46, 800, mid), text(1385, 490, "Clean data in", C.onNavyMuted, 24, 600, mid), tick(1385, 535, 18, C.accent, C.navy),
    shadow(g(rr(1250, 150, 270, 130, 14, C.white), `<path d="M1250,196 V164 a14,14 0 0 1 14,-14 h242 a14,14 0 0 1 14,14 V196 Z" fill="${C.navy}"/>`), "sh2"),
    text(1385, 182, "DECEMBER 2027", C.onNavy, 20, 800, `${mid} letter-spacing="2"`),
    circ(1385, 238, 30, C.accent), text(1385, 249, "31", C.navy, 30, 800, mid),
  ));
}

// ── Section 01: support steps down after 2027 ────────────────────────────────────────────────────
{
  const shield = (cx, cy, s, fill, extra = "") => path(`M${cx},${cy - 60 * s} L${cx + 52 * s},${cy - 40 * s} V${cy + 6 * s} Q${cx + 52 * s},${cy + 56 * s} ${cx},${cy + 78 * s} Q${cx - 52 * s},${cy + 56 * s} ${cx - 52 * s},${cy + 6 * s} V${cy - 40 * s} Z`, fill, extra);
  const steps = [
    { x: 90, top: 260, fill: C.navy, name: "Mainstream", when: "to 31 Dec 2027", icon: (cx, cy) => shield(cx, cy, 1.2, C.accent) + tick(cx, cy + 6, 26, C.navy, C.accent) },
    { x: 440, top: 410, fill: C.navy7, name: "Extended", when: "2028–2030, optional", icon: (cx, cy) => shield(cx, cy, 1.1, "none", `stroke="${C.accent}" stroke-width="8"`) + shield(cx, cy, 0.62, C.accent4) },
    { x: 790, top: 560, fill: hatchFill(), name: "Customer-specific", when: "afterwards", icon: (cx, cy) => shield(cx, cy, 0.9, "none", `stroke="${C.soft}" stroke-width="6" stroke-dasharray="10 8"`) + warn(cx, cy + 4, 22) },
  ];
  out["ecc-article-support"] = svg12(g(
    text(90, 130, "What SAP support covers", C.navy, 46, 800),
    text(90, 178, "SAP ECC 6.0 and the Business Suite 7 core applications", C.muted, 25, 600),
    ...steps.map((s) => g(
      shadow(rr(s.x, s.top, 320, 720 - s.top, 10, s.fill, s.x === 790 ? `stroke="${C.soft}" stroke-width="3"` : "")),
      s.icon(s.x + 160, s.top + (720 - s.top) / 2 - 10),
      text(s.x, 780, s.name, C.ink, 30, 800), text(s.x, 818, s.when, C.muted, 24, 600))),
    line(70, 720, 1130, 720, C.ink, 4),
    shadow(g(rr(640, 382, 150, 56, 28, C.accent), text(715, 419, "+2 pts", C.navy, 26, 800, mid)), "sh2"),
    text(790, 860, "No new legal changes", C.red, 24, 800),
  ));
}

// ── Section 02: many ECC systems, a few experienced people ───────────────────────────────────────
{
  const chip = (x, top, year) => shadow(g(rr(x, top, 180, 112, 12, C.white), `<path d="M${x},${top + 38} V${top + 12} a12,12 0 0 1 12,-12 h156 a12,12 0 0 1 12,12 V${top + 38} Z" fill="${C.navy}"/>`, text(x + 90, top + 27, "END OF", C.onNavyMuted, 17, 800, `${mid} letter-spacing="2"`), text(x + 90, top + 90, year, C.navy, 44, 800, mid)), "sh2");
  out["ecc-article-queue"] = svg12(g(
    text(80, 110, "The queue to 2030", C.navy, 46, 800),
    text(80, 156, "Many ECC systems, a limited pool of experienced people", C.muted, 25, 600),
    '<g transform="translate(0,70)">',
    chip(200, 200, "2027"), chip(600, 200, "2030"),
    line(380, 256, 600, 256, C.soft, 4, 'stroke-dasharray="10 10"'),
    rect(0, 700, 1200, 200, grad([[0, C.surface], [1, C.ground]], "v")),
    arrow(80, 410, 912, C.accent, 6, 18),
    ...Array.from({ length: 6 }, (_, i) => {
      const x = 80 + i * 135;
      return shadow(g(
        rr(x, 466, 110, 234, 10, C.navy7),
        text(x + 55, 506, "ECC", C.onNavy, 24, 800, mid),
        ...[0, 1, 2].map((k) => rr(x + 14, 530 + k * 50, 82, 34, 5, C.navy6) + circ(x + 80, 547 + k * 50, 6, (i + k) % 3 === 0 ? C.accent : C.green)),
      ), "sh2");
    }),
    shadow(rr(930, 250, 200, 450, 16, C.navy)),
    text(1030, 312, "S/4HANA", C.onNavy, 30, 800, mid),
    rr(962, 350, 136, 350, 8, grad([[0, C.accent2], [1, C.accent1]], "v")),
    person(1000, 600, 0.5, { shirt: C.accent6, len: 150 }), person(1061, 608, 0.5, { shirt: C.aiInk, style: "long", len: 134 }),
    "</g>",
  ));
}

// ── Section 03: a mock load with the three usual failures (sample data) ──────────────────────────
{
  const issues = [
    ["Custom field ZZ_REGION not mapped", "Lease contracts · the field exists in ECC, with no target in S/4HANA", "312"],
    ["Duplicate business partner", "Same name and tax number under two customer numbers", "204"],
    ["Open items do not reconcile", "Difference to the general ledger in company code 1000", "72"],
  ];
  out["ecc-article-mock-load"] = svg12(g(
    windowChrome(80, 80, 1040, 740, "Mock load 2 · results"),
    ...[["10,000", "records extracted", C.ink], ["9,412", "loaded", C.green], ["588", "rejected", C.red]].map(([n, l, c], i) => g(
      rr(120 + i * 330, 170, 300, 112, 10, C.surface), text(144 + i * 330, 228, n, c, 44, 800), text(144 + i * 330, 262, l, C.muted, 21, 600))),
    rr(120, 306, 960, 16, 8, C.redTint), rr(120, 306, 960 * 0.9412, 16, 8, C.green),
    text(120, 380, "Why records were rejected", C.ink, 26, 800),
    ...issues.map(([t, d, n], i) => {
      const y = 404 + i * 124;
      return g(rr(120, y, 960, 106, 10, i === 0 ? C.accent1 : C.ground), rect(120, y, 8, 106, i === 0 ? C.accent : C.red),
        warn(174, y + 53, 22, i === 0 ? C.accent : C.red, i === 0 ? C.navy : C.white),
        text(216, y + 46, t, C.ink, 25, 800), text(216, y + 80, d, C.muted, 20, 600),
        text(1050, y + 64, n, i === 0 ? C.accent7 : C.red, 34, 800, 'text-anchor="end"'));
    }),
    text(1120, 862, "Sample data", C.soft, 20, 700, 'text-anchor="end"'),
  ));
}

// ── Section 04: fix the same error in every load file, or once in ECC ────────────────────────────
{
  const sheet = (x, y, w, h, title, bad, good) => g(
    shadow(rr(x, y, w, h, 10, C.white, `stroke="${C.line}" stroke-width="2"`), "sh2"),
    rr(x, y, w, 44, 10, C.accent2), rect(x, y + 30, w, 14, C.accent2), text(x + 18, y + 30, title, C.ink, 20, 800),
    ...Array.from({ length: Math.floor((h - 60) / 44) }, (_, r) => line(x + 12, y + 88 + r * 44, x + w - 12, y + 88 + r * 44, C.line, 2)),
    // Sheets behind the top one show the bad row without its label, which the next sheet would clip.
    bad ? rr(x + 14, y + 104, w - 28, 40, 6, C.redTint) + (bad === "label" ? text(x + 28, y + 131, "Duplicate partner", C.red, 18, 800) : "") : "",
    good ? tick(x + w - 26, y + 22, 14, C.green) : "",
  );
  out["ecc-article-fix-at-source"] = svg12(g(
    text(80, 110, "Where the fix happens", C.navy, 46, 800),
    line(600, 170, 600, 840, C.soft, 3, 'stroke-dasharray="10 10"'),
    text(90, 210, "In each load file", C.ink, 30, 800),
    ...[0, 1, 2].map((i) => sheet(110 + i * 46, 260 + i * 72, 330, 340, `Mock ${i + 1}`, i === 2 ? "label" : "bar")),
    text(90, 800, "The same fix, every cycle", C.red, 26, 800),
    text(650, 210, "Once, in ECC", C.ink, 30, 800),
    shadow(cylinder(660, 360, 190, 230, C.navy7, C.navy6, "ECC", C.onNavy, 40)), tick(842, 372, 26, C.green),
    ...[0, 1, 2].map((i) => g(
      path(`M860,${470} C910,${470} 900,${300 + i * 150} 950,${300 + i * 150}`, "none", `stroke="${C.accent}" stroke-width="5" stroke-linecap="round"`),
      sheet(960, 240 + i * 150, 170, 120, `Mock ${i + 1}`, false, true))),
    text(650, 800, "Every extract starts clean", C.green, 26, 800),
  ));
}

// ── Section 05: the mock-load cycle, with rejections falling each round (sample data) ────────────
{
  const cx = 300, cy = 470, R = 190;
  const nodes = [["Extract", 0, -1], ["Cleanse", 1, 0], ["Load", 0, 1], ["Reconcile", -1, 0]];
  const heads = [45, 135, 225, 315].map((deg) => {
    const a = (deg - 90) * Math.PI / 180, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R, t = a + Math.PI / 2;
    const p = (dx, dy) => [x + dx * Math.cos(t) - dy * Math.sin(t), y + dx * Math.sin(t) + dy * Math.cos(t)];
    return poly([p(16, 0), p(-12, -14), p(-12, 14)], C.accent);
  });
  const bars = [["Mock 1", 2140, C.navy6], ["Mock 2", 588, C.accent6], ["Mock 3", 41, C.accent4]];
  out["ecc-article-mock-cycles"] = svg12(g(
    text(60, 110, "Mock loads until the data reconciles", C.navy, 44, 800),
    '<g transform="translate(0,60)">',
    circ(cx, cy, R, "none", `stroke="${C.accent}" stroke-width="6" stroke-dasharray="14 12"`),
    ...heads,
    text(cx, cy - 6, "Repeat until", C.muted, 24, 700, mid), text(cx, cy + 26, "it reconciles", C.muted, 24, 700, mid),
    ...nodes.map(([t, dx, dy]) => shadow(g(rr(cx + dx * R - 100, cy + dy * R - 38, 200, 76, 12, dy === 1 ? C.accent : C.navy), text(cx + dx * R, cy + dy * R + 10, t, dy === 1 ? C.navy : C.onNavy, 26, 800, mid)), "sh2")),
    text(640, 250, "Rejected records per cycle", C.ink, 28, 800),
    text(640, 284, "Sample data", C.soft, 20, 700),
    ...bars.map(([l, v, c], i) => {
      const y = 340 + i * 110, w = Math.max(8, (v / 2140) * 400);
      return g(text(640, y, l, C.ink, 22, 700), rr(640, y + 16, w, 44, 6, c), text(640 + w + 14, y + 48, v.toLocaleString("en-GB"), C.ink, 24, 800));
    }),
    text(640, 670, "Dress rehearsal", C.ink, 22, 700), tick(664, 710, 22, C.green), text(698, 719, "0 rejected · signed off", C.green, 24, 800),
    "</g>",
  ));
}

// ── Section 06: 2Klicks on both sides of the move ────────────────────────────────────────────────
{
  const sys = (x, name, when, fill, chipFill) => g(
    shadow(rr(x, 300, 260, 300, 16, fill)),
    text(x + 130, 440, name, C.onNavy, 40, 800, mid),
    rr(x + 70, 480, 120, 44, 22, chipFill), text(x + 130, 510, when, C.navy, 22, 800, mid));
  out["ecc-article-2klicks"] = svg12(g(
    text(60, 110, "One tool on both sides of the move", C.navy, 44, 800),
    '<g transform="translate(0,50)">',
    sys(60, "SAP ECC", "Now", C.navy7, C.accent),
    sys(880, "S/4HANA", "Later", C.navy, C.accent3),
    shadow(rr(430, 210, 340, 480, 14, C.white)),
    `<path d="M430,268 V224 a14,14 0 0 1 14,-14 h312 a14,14 0 0 1 14,14 V268 Z" fill="${C.accent}"/>`,
    rr(450, 222, 34, 34, 6, C.green), text(467, 248, "X", C.white, 22, 800, mid),
    text(498, 248, "2Klicks template", C.navy, 24, 800),
    ...Array.from({ length: 7 }, (_, r) => g(line(450, 320 + r * 50, 750, 320 + r * 50, C.line, 2), rr(456, 286 + r * 50, 150, 16, 8, C.surface), rr(626, 286 + r * 50, 70, 16, 8, C.surface), r < 6 ? tick(728, 294 + r * 50, 11, C.green) : warn(728, 294 + r * 50, 11))),
    text(600, 660, "Validated before posting", C.muted, 22, 700, mid),
    arrow(334, 410, 420, C.accent, 7, 18), text(377, 392, "Download", C.muted, 17, 700, mid),
    line(420, 500, 352, 500, C.accent, 7, 'stroke-linecap="round"'), poly([[334, 500], [358, 484], [358, 516]], C.accent), text(377, 540, "Upload", C.muted, 17, 700, mid),
    arrow(782, 450, 870, C.accent, 7, 18),
    text(190, 660, "Correct data in bulk", C.ink, 24, 800, mid), text(1010, 660, "Load with the", C.ink, 24, 800, mid), text(1010, 692, "same templates", C.ink, 24, 800, mid),
    "</g>",
  ));
}

// Bodies are built before the background gradient registers, so every def is flushed by the same svg() call.
function svg16(body) { return svg(1600, 900, bg(), body); }
function svg12(body) { return svg(1200, 900, bg(), body); }
function hatchFill() { return grad([[0, C.surface], [1, C.strong]], "v"); }

export default out;
