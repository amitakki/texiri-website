// Illustrations for the article "RE-FX after go-live: keeping lease data clean"
// (app/insights/re-fx-after-go-live/). Numbers drawn here are sample data, and say so.
import { C, arrow, circ, g, grad, line, path, poly, rect, rr, shadow, svg, text, tick, warn, windowChrome } from "./illustration-kit.mjs";

const out = {};
const mid = 'text-anchor="middle"';
const end = 'text-anchor="end"';
const bg = () => grad([[0, C.ground], [1, "#f3e4d0"]], "d");
const chip = (x, y, w, label, fill, ink) => rr(x, y, w, 38, 19, fill) + text(x + w / 2, y + 26, label, ink, 17, 800, mid);
const curve = (x1, y1, x2, y2, color = C.accent6) =>
  path(`M${x1},${y1} C${x1 + 60},${y1} ${x2 - 60},${y2} ${x2},${y2}`, "none", `stroke="${color}" stroke-width="4" stroke-dasharray="3 10" stroke-linecap="round"`) + circ(x2, y2, 7, color);

// ── Hero: everyday events change a contract after go-live, and period-end shows it ───────────────
{
  const events = [["Renewal option exercised", "Lease administration"], ["CPI published late", "Statistics office"], ["Store closed", "Retail operations"], ["Moved to a new company", "Group finance"]];
  const rows = [
    ["Lease term", "to 31.12.2031", ["Not reassessed", C.accent, C.navy]],
    ["Rent (CPI-linked)", "Index Sep 2026", ["Index missing", C.accent, C.navy]],
    ["Cost centre", "ST214", ["Centre locked", C.red, C.white]],
    ["Company code", "1000", ["Should be 2000", C.red, C.white]],
    ["Valuation rule", "IFRS 16", null],
    ["Landlord", "BP 100231", null],
  ];
  const rowY = (i) => 236 + i * 92;
  out["refx-article-hero"] = svg16(g(
    circ(1400, 150, 210, "rgba(252,154,58,0.10)"),
    text(60, 150, "After go-live", C.navy, 30, 800),
    ...events.map(([t, s], i) => {
      const y = 190 + i * 150;
      return g(
        shadow(rr(50, y, 380, 100, 12, C.white), "sh2"), rect(50, y, 8, 100, C.accent),
        circ(96, y + 50, 20, C.accent2), circ(96, y + 50, 8, C.accent6),
        text(130, y + 44, t, C.ink, 20, 800), text(130, y + 74, s, C.muted, 18, 600),
        curve(430, y + 50, 500, rowY(i) + 41));
    }),
    windowChrome(500, 110, 700, 710, "Lease contract 4711 · Store 214"),
    text(532, 206, "SAP RE-FX", C.soft, 18, 800, 'letter-spacing="2"'),
    ...rows.map(([k, v, flag], i) => {
      const y = rowY(i);
      return g(
        flag ? rect(516, y, 668, 82, flag[1] === C.red ? C.redTint : C.accent1) : "",
        text(532, y + 50, k, C.muted, 20, 700), text(760, y + 50, v, C.ink, 23, 800),
        flag ? chip(960, y + 22, 200, flag[0], flag[1], flag[2]) : tick(1000, y + 41, 17, C.green) + text(1026, y + 49, "OK", C.green, 21, 800),
        line(516, y + 82, 1184, y + 82, C.line, 2));
    }),
    arrow(1210, 465, 1256, C.accent, 8, 18),
    shadow(rr(1266, 250, 290, 430, 16, C.navy)),
    text(1411, 312, "PERIOD-END", C.onNavyMuted, 18, 800, `${mid} letter-spacing="2"`),
    text(1411, 352, "IFRS 16 valuation", C.onNavy, 25, 800, mid),
    ...[["Lease liability", "warn"], ["Right-of-use asset", "warn"], ["Postings", "err"]].map(([t, k], i) => {
      const y = 400 + i * 82;
      return g(rr(1286, y, 250, 62, 10, C.navy7), text(1304, y + 38, t, C.onNavy, 18, 700),
        k === "err" ? circ(1508, y + 31, 15, C.red) + text(1508, y + 38, "3", C.white, 18, 800, mid) : warn(1508, y + 31, 15));
    }),
    text(1540, 860, "Sample data", C.soft, 20, 700, end),
  ));
}

// ── Section 01: data quality drifts after go-live without a routine (illustrative) ───────────────
{
  const x0 = 130, x1 = 1110, yTop = 260, yBot = 740;
  const X = (m) => x0 + (m / 24) * (x1 - x0);
  const Y = (pct) => yBot - ((pct - 60) / 40) * (yBot - yTop);
  const drift = [[0, 100], [3, 100], [3, 97], [6, 97], [6, 93], [9, 93], [9, 88], [12, 88], [12, 84], [15, 84], [15, 82], [18, 82], [18, 78], [21, 78], [21, 75], [24, 75]];
  const routine = Array.from({ length: 25 }, (_, m) => [[m, 100], [m + 0.55, m % 3 === 2 ? 96 : 98]]).flat().filter(([m]) => m <= 24);
  const pts = (arr) => arr.map(([m, p]) => `${X(m).toFixed(1)},${Y(p).toFixed(1)}`).join(" ");
  const events = [[3, "Renewals"], [6, "CPI updates"], [9, "Reorganisation"], [12, "Year-end"], [18, "Store closures"]];
  out["refx-article-drift"] = svg12(g(
    text(80, 110, "Lease data after go-live", C.navy, 46, 800),
    text(80, 156, "Illustrative, not measured data", C.muted, 24, 600),
    ...[100, 90, 80, 70].map((p) => line(x0, Y(p), x1, Y(p), C.line, 2) + text(x0 - 16, Y(p) + 8, `${p}%`, C.soft, 20, 700, end)),
    line(x0, yBot, x1, yBot, C.ink, 3),
    ...events.map(([m, t]) => line(X(m), yTop, X(m), yBot, C.strong, 2, 'stroke-dasharray="6 8"') + text(X(m), yBot + 34, t, C.muted, 17, 700, mid)),
    rr(x0 - 4, yTop - 64, 168, 44, 22, C.navy), text(x0 + 80, yTop - 35, "Go-live", C.onNavy, 21, 800, mid),
    `<polyline points="${pts(routine)}" fill="none" stroke="${C.green}" stroke-width="5" stroke-linejoin="round"/>`,
    `<polyline points="${pts(drift)}" fill="none" stroke="${C.red}" stroke-width="6" stroke-linejoin="round"/>`,
    rr(X(24) - 250, yTop - 64, 250, 44, 8, C.greenTint), text(X(24) - 125, yTop - 35, "Monthly routine", C.green, 21, 800, mid),
    rr(X(24) - 250, Y(75) + 24, 250, 44, 8, C.redTint), text(X(24) - 125, Y(75) + 53, "No routine", C.red, 21, 800, mid),
    text(x0, 840, "Contracts with complete, current data · months after go-live", C.ink, 22, 800),
  ));
}

// ── Section 02: six places lease data drifts ─────────────────────────────────────────────────────
{
  const items = [
    ["Term &amp; options", "Notice dates pass unseen"], ["Index &amp; rent", "Index points arrive late"], ["Modifications", "Posted as new contracts"],
    ["Valuation setup", "Rule or flag missing"], ["Reorganisations", "Closed cost centres"], ["Partners &amp; Z-fields", "Duplicates and gaps"],
  ];
  const pos = (i) => (i < 3 ? { x: 60, y: 250 + i * 210, side: "l" } : { x: 860, y: 250 + (i - 3) * 210, side: "r" });
  out["refx-article-drift-points"] = svg12(g(
    text(60, 110, "Six places lease data drifts", C.navy, 46, 800),
    shadow(rr(430, 210, 340, 600, 14, C.white)),
    rect(430, 210, 340, 80, C.navy), text(456, 260, "LEASE CONTRACT", C.onNavy, 24, 800, 'letter-spacing="2"'),
    ...Array.from({ length: 9 }, (_, r) => rr(456, 330 + r * 50, r % 3 === 2 ? 190 : 288, 16, 8, C.surface)),
    ...items.map(([t, s], i) => {
      const { x, y, side } = pos(i);
      const docX = side === "l" ? 430 : 770, cardX = side === "l" ? x + 290 : x;
      return g(
        line(cardX, y + 50, docX, 345 + (i % 3) * 150, C.accent6, 3, 'stroke-dasharray="3 9" stroke-linecap="round"'), circ(docX, 345 + (i % 3) * 150, 8, C.accent6),
        shadow(rr(x, y, 290, 104, 12, i === 2 ? C.accent1 : C.white), "sh2"),
        circ(x + 38, y + 52, 22, i === 2 ? C.accent : C.navy), text(x + 38, y + 60, String(i + 1), i === 2 ? C.navy : C.onNavy, 22, 800, mid),
        text(x + 72, y + 46, t, C.ink, 22, 800), text(x + 72, y + 78, s, C.muted, 17, 600));
    }),
  ));
}

// ── Section 03: a period-end valuation run with its errors (sample data) ─────────────────────────
{
  const issues = [
    ["Cost centre locked", "Store closed; contract still assigned to it", "18"],
    ["Index points missing", "CPI for September not yet maintained", "11"],
    ["No valuation rule", "New condition type added without one", "9"],
    ["Posting period closed", "Retroactive change into a closed period", "4"],
  ];
  out["refx-article-period-end"] = svg12(g(
    windowChrome(80, 80, 1040, 740, "Valuation run · October 2026"),
    ...[["1,240", "contracts selected", C.ink], ["1,198", "posted", C.green], ["42", "with errors", C.red]].map(([n, l, c], i) => g(
      rr(120 + i * 330, 170, 300, 112, 10, C.surface), text(144 + i * 330, 228, n, c, 44, 800), text(144 + i * 330, 262, l, C.muted, 21, 600))),
    rr(120, 306, 960, 16, 8, C.redTint), rr(120, 306, 960 * (1198 / 1240), 16, 8, C.green),
    text(120, 380, "Why postings failed", C.ink, 26, 800),
    ...issues.map(([t, d, n], i) => {
      const y = 402 + i * 100;
      return g(rr(120, y, 960, 88, 10, C.ground), rect(120, y, 8, 88, i === 0 ? C.red : C.accent),
        warn(172, y + 44, 21, i === 0 ? C.red : C.accent, i === 0 ? C.white : C.navy),
        text(212, y + 38, t, C.ink, 24, 800), text(212, y + 68, d, C.muted, 19, 600),
        text(1050, y + 56, n, i === 0 ? C.red : C.accent7, 34, 800, end));
    }),
    text(1120, 862, "Sample data", C.soft, 20, 700, end),
  ));
}

// ── Section 04: the monthly routine around the close ─────────────────────────────────────────────
{
  const cx = 600, cy = 500, R = 250;
  const nodes = [
    ["Exceptions", "Week 3 · before the close", 0, -1],
    ["Fix at source", "Week 4 · data owners", 1, 0],
    ["Post &amp; value", "Close · RE-FX runs", 0, 1],
    ["Reconcile", "Close + 3 · finance", -1, 0],
  ];
  const heads = [45, 135, 225, 315].map((deg) => {
    const a = (deg - 90) * Math.PI / 180, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R, t = a + Math.PI / 2;
    const p = (dx, dy) => [x + dx * Math.cos(t) - dy * Math.sin(t), y + dx * Math.sin(t) + dy * Math.cos(t)];
    return poly([p(16, 0), p(-12, -14), p(-12, 14)], C.accent);
  });
  out["refx-article-routine"] = svg12(g(
    text(60, 110, "Every month, four checkpoints", C.navy, 44, 800),
    circ(cx, cy, R, "none", `stroke="${C.accent}" stroke-width="6" stroke-dasharray="14 12"`),
    ...heads,
    // calendar in the middle of the ring
    shadow(rr(cx - 90, cy - 86, 180, 150, 12, C.white), "sh2"),
    `<path d="M${cx - 90},${cy - 44} V${cy - 74} a12,12 0 0 1 12,-12 h156 a12,12 0 0 1 12,12 V${cy - 44} Z" fill="${C.navy}"/>`,
    text(cx, cy - 55, "MONTH-END", C.onNavy, 16, 800, `${mid} letter-spacing="2"`),
    ...Array.from({ length: 12 }, (_, k) => rr(cx - 70 + (k % 4) * 37, cy - 30 + Math.floor(k / 4) * 30, 28, 20, 4, k === 10 ? C.accent : C.surface)),
    ...nodes.map(([t, s, dx, dy]) => {
      const x = cx + dx * R, y = cy + dy * R, dark = dy !== 1;
      return g(
        shadow(rr(x - 120, y - 40, 240, 80, 12, dark ? C.navy : C.accent), "sh2"),
        text(x, y + 10, t, dark ? C.onNavy : C.navy, 26, 800, mid),
        text(x, dy === -1 ? y - 58 : y + 72, s, C.muted, 19, 700, mid));
    }),
  ));
}

// ── Section 05: moving contracts between company codes with one template ─────────────────────────
{
  const store = (x, y, fill, faded = false) => g(
    rect(x, y, 56, 48, fill, faded ? 'opacity="0.28"' : ""), rect(x - 4, y - 8, 64, 10, C.accent, faded ? 'opacity="0.28"' : ""),
    ...[0, 1].map((c) => rect(x + 9 + c * 22, y + 12, 15, 14, "rgba(255,255,255,0.35)", faded ? 'opacity="0.28"' : "")));
  const cc = (x, label, moved) => g(
    shadow(rr(x, 260, 300, 440, 16, C.navy)),
    text(x + 150, 318, "COMPANY CODE", C.onNavyMuted, 17, 800, `${mid} letter-spacing="2"`),
    text(x + 150, 370, label, C.onNavy, 46, 800, mid),
    ...Array.from({ length: 9 }, (_, k) => store(x + 40 + (k % 3) * 82, 430 + Math.floor(k / 3) * 82, C.navy6, moved(k))));
  out["refx-article-reorg"] = svg12(g(
    text(60, 110, "Moving contracts between company codes", C.navy, 42, 800),
    text(60, 154, "One template instead of a program per object", C.muted, 24, 600),
    cc(60, "1000", (k) => k >= 5),
    cc(840, "2000", (k) => k < 5),
    shadow(rr(420, 240, 360, 480, 14, C.white)),
    `<path d="M420,298 V254 a14,14 0 0 1 14,-14 h332 a14,14 0 0 1 14,14 V298 Z" fill="${C.accent}"/>`,
    rr(440, 252, 34, 34, 6, C.green), text(457, 278, "X", C.white, 22, 800, mid),
    text(488, 278, "2Klicks template", C.navy, 24, 800),
    ...["Contract", "Rental object", "Building", "Contract", "Contract", "Rental object"].map((o, r) => g(
      text(442, 346 + r * 56, o, C.ink, 19, 700), text(732, 346 + r * 56, "1000 → 2000", C.muted, 17, 700, end),
      r === 4 ? warn(758, 340 + r * 56, 12) : tick(758, 340 + r * 56, 12, C.green),
      line(436, 362 + r * 56, 764, 362 + r * 56, C.line, 2))),
    text(600, 700, "Validated before posting", C.muted, 20, 700, mid),
    arrow(370, 480, 412, C.accent, 7, 16), arrow(788, 480, 832, C.accent, 7, 16),
    text(600, 790, "Every change recorded in standard SAP change documents", C.ink, 24, 800, mid),
  ));
}

// ── Section 06: 2Klicks across the RE-FX objects ─────────────────────────────────────────────────
{
  const objs = ["Business entity", "Building", "Property", "Rental object", "Contract", "Contract offer"];
  out["refx-article-2klicks"] = svg12(g(
    text(60, 110, "Download, update, validate, upload", C.navy, 44, 800),
    '<g transform="translate(0,40)">',
    shadow(rr(60, 180, 300, 560, 16, C.navy)),
    text(210, 240, "SAP RE-FX", C.onNavy, 32, 800, mid),
    ...objs.map((o, i) => g(rr(84, 272 + i * 74, 252, 56, 8, C.navy7), circ(110, 300 + i * 74, 7, C.accent), text(128, 307 + i * 74, o, C.onNavy, 20, 700))),
    arrow(372, 360, 440, C.accent, 7, 18), text(406, 340, "Download", C.muted, 16, 700, mid),
    line(440, 560, 390, 560, C.accent, 7, 'stroke-linecap="round"'), poly([[372, 560], [396, 544], [396, 576]], C.accent), text(406, 600, "Upload", C.muted, 16, 700, mid),
    shadow(rr(450, 180, 330, 560, 14, C.white)),
    rr(450, 180, 330, 56, 14, C.accent2), rect(450, 220, 330, 16, C.accent2), text(472, 216, "Contracts · conditions", C.ink, 21, 800),
    ...Array.from({ length: 9 }, (_, r) => g(
      line(466, 300 + r * 50, 764, 300 + r * 50, C.line, 2),
      rr(472, 266 + r * 50, 120, 16, 8, C.surface), rr(608, 266 + r * 50, 90, 16, 8, r === 6 ? C.accent3 : C.surface),
      r === 6 ? warn(740, 274 + r * 50, 12) : tick(740, 274 + r * 50, 12, C.green))),
    arrow(792, 460, 850, C.accent, 7, 18),
    shadow(rr(860, 180, 280, 560, 16, C.white)),
    text(1000, 236, "Validation", C.ink, 28, 800, mid),
    rr(884, 266, 232, 120, 10, C.greenTint), text(1000, 324, "1,180", C.green, 42, 800, mid), text(1000, 360, "rows valid", C.green, 19, 700, mid),
    rr(884, 404, 232, 120, 10, C.accent1), text(1000, 462, "12", C.accent7, 42, 800, mid), text(1000, 498, "flagged: index missing", C.accent7, 17, 700, mid),
    tick(904, 586, 16, C.navy, C.white), text(930, 593, "Posted in SAP", C.ink, 20, 800),
    tick(904, 640, 16, C.navy, C.white), text(930, 647, "Change documents", C.ink, 20, 800),
    "</g>",
    text(1140, 862, "Sample data", C.soft, 20, 700, end),
  ));
}

// Bodies are built before the background gradient registers, so every def is flushed by the same svg() call.
function svg16(body) { return svg(1600, 900, bg(), body); }
function svg12(body) { return svg(1200, 900, bg(), body); }

export default out;
