// SAP-side placeholder illustrations: consulting, data migration, 2Klicks UI, offices, team, articles.
import { C, SKIN, HAIR, arm, arrow, circ, cylinder, darr, g, grad, laptopBack, line, path, person, plant, poly, radial, rect, rr, shadow, sticky, svg, text, tick, warn } from "./illustration-kit.mjs";

const out = {};

// ── 2Klicks Create: template → enter data → upload, with a validation log ──────────────────────────
{
  const cols = [["Contract", 120], ["Company code", 150], ["Start date", 140], ["Monthly rent", 150], ["Currency", 110], ["ZZ_REGION ★", 190]];
  const rows = [
    ["LC-100231", "1000", "01.04.2026", "12,500.00", "INR", "NORTH"],
    ["LC-100232", "1000", "01.05.2026", "8,200.00", "INR", "SOUTH"],
    ["LC-100233", "1900", "15.05.2026", "15,750.00", "INR", "WEST"],
    ["LC-100234", "1000", "01.06.2026", "9,400.00", "INR", "NORTH"],
    ["LC-100235", "1000", "01.06.2026", "11,100.00", "INR", "EAST"],
    ["LC-100236", "1000", "01.07.2026", "7,900.00", "INR", "SOUTH"],
    ["LC-100237", "1000", "15.07.2026", "13,300.00", "INR", "WEST"],
  ];
  const tx = 350, ty = 300, rh = 60;
  let cx = tx;
  const colX = cols.map(([, w]) => { const x = cx; cx += w; return x; });
  const objects = ["Lease contracts", "Rental objects", "Business partners", "Conditions", "Material master", "Equipment"];
  out["2klicks-ui"] = svg(1600, 1000, grad([[0, "#e6eaf1"], [1, C.ground]], "d"), g(
    shadow(rr(30, 30, 1540, 940, 16, C.white)),
    `<path d="M30,102 V46 a16,16 0 0 1 16,-16 h1508 a16,16 0 0 1 16,16 V102 Z" fill="${C.navy}"/>`,
    rr(58, 54, 26, 26, 4, C.accent), text(98, 78, "2Klicks Create", C.onNavy, 28, 800),
    rr(1090, 52, 250, 32, 16, C.navy7), text(1215, 75, "SAP DEV-100 · RE-FX", C.onNavyMuted, 18, 700, 'text-anchor="middle"'),
    circ(1480, 68, 20, C.accent3), text(1480, 75, "AK", C.navy, 17, 800, 'text-anchor="middle"'), text(1425, 75, "", C.white, 1),
    // sidebar
    rect(30, 102, 280, 868, C.surface, 'rx="0"'),
    text(56, 150, "OBJECTS", C.muted, 16, 700, 'letter-spacing="2"'),
    ...objects.map((t, i) => g(
      i === 0 ? rr(44, 172 + i * 62, 252, 52, 6, C.navy) + rect(44, 172 + i * 62, 6, 52, C.accent) : "",
      rr(64, 188 + i * 62, 20, 20, 4, i === 0 ? C.accent : C.strong),
      text(98, 205 + i * 62, t, i === 0 ? C.onNavy : C.ink, 20, 600))),
    // main header
    text(350, 160, "Lease contracts · template", C.ink, 34, 800),
    text(350, 192, "Template for RE-FX lease contracts · 1 custom field recognised from your system", C.muted, 18, 600),
    rr(960, 126, 120, 46, 6, C.white, `stroke="${C.ink}" stroke-width="2"`), text(1020, 156, "Download", C.ink, 19, 700, 'text-anchor="middle"'),
    rr(1092, 126, 118, 46, 6, C.accent), text(1151, 156, "Upload →", C.navy, 19, 800, 'text-anchor="middle"'),
    // stepper
    ...[["Download template", 0, true], ["Enter or modify data", 1, true], ["Upload", 2, false]].map(([t, i, done]) => g(
      rr(350 + i * 292, 222, 276, 46, 23, done ? C.greenTint : C.navy),
      done ? tick(378 + i * 292, 245, 13, C.green) : circ(378 + i * 292, 245, 13, C.accent) + text(378 + i * 292, 252, "3", C.navy, 17, 800, 'text-anchor="middle"'),
      text(404 + i * 292, 252, t, done ? C.green : C.onNavy, 19, 700))),
    // sheet
    rr(tx, ty - 4, 860, 48 + rows.length * rh + 8, 8, C.white, `stroke="${C.line}" stroke-width="2"`),
    rect(tx, ty, 860, 48, C.accent2),
    ...cols.map(([t], i) => text(colX[i] + 16, ty + 31, t, C.ink, 18, 800)),
    rect(colX[5], ty, 190, 48 + rows.length * rh, "rgba(247,148,29,0.12)"),
    ...rows.map((r, ri) => g(
      ri === 2 ? rect(tx, ty + 48 + ri * rh, 860, rh, "rgba(247,148,29,0.18)") : "",
      line(tx, ty + 48 + (ri + 1) * rh, tx + 860, ty + 48 + (ri + 1) * rh, C.line, 2),
      ...r.map((v, ci) => text(colX[ci] + 16, ty + 48 + ri * rh + 37, v, ci === 5 ? C.accent7 : ci === 1 && ri === 2 ? C.accent7 : C.ink, 19, ci === 5 || (ci === 1 && ri === 2) ? 800 : 600)),
      ri === 2 ? warn(colX[1] + 104, ty + 48 + ri * rh + 30, 12) : "")),
    ...[1, 2, 3, 4, 5].map((i) => line(colX[i], ty, colX[i], ty + 48 + rows.length * rh, C.line, 2)),
    // warning tooltip
    shadow(g(poly([[560, 535], [576, 550], [592, 535]], C.navy), rr(430, 548, 330, 50, 8, C.navy), warn(458, 573, 13), text(482, 580, "Company code 1900 not found", C.onNavy, 18, 700)), "sh2"),
    // summary
    ...[["1,248", "rows read", C.ink], ["2", "warnings", C.accent7], ["1,246", "ready to load", C.green]].map(([n, l, c], i) => g(
      rr(350 + i * 292, 846, 276, 98, 8, C.surface), text(372 + i * 292, 894, n, c, 40, 800), text(372 + i * 292, 924, l, C.muted, 18, 600))),
    // validation log
    rr(1240, 102, 330, 868, 0, C.navy),
    `<path d="M1240,970 H1554 a16,16 0 0 0 16,-16 V970 Z" fill="${C.navy}"/>`,
    text(1272, 160, "Validation log", C.onNavy, 28, 800),
    text(1272, 190, "Mock load 3 · just now", C.onNavyMuted, 17, 600),
    ...[["1,248 rows read", "ok"], ["3 custom fields found", "ok"], ["Date formats valid", "ok"], ["Company codes · 2 rows", "warn"], ["Ready to load", "wait"]].map(([t, k], i) => g(
      line(1286, 262 + i * 84, 1286, 262 + i * 84 + 40, "rgba(255,255,255,0.18)", 3),
      k === "ok" ? tick(1286, 240 + i * 84, 15, C.ai, C.navy) : k === "warn" ? warn(1286, 240 + i * 84, 15) : circ(1286, 240 + i * 84, 15, "none", `stroke="${C.onNavyMuted}" stroke-width="3"`),
      text(1316, 247 + i * 84, t, k === "wait" ? C.onNavyMuted : C.onNavy, 19, 600))),
    text(1272, 700, "Validated", C.onNavyMuted, 16, 700, 'letter-spacing="2"'), text(1536, 700, "98%", C.onNavy, 22, 800, 'text-anchor="end"'),
    rr(1272, 716, 264, 14, 7, C.navy7), rr(1272, 716, 258 * 0.98, 14, 7, C.accent),
    rr(1272, 800, 264, 62, 8, C.accent), text(1404, 840, "Upload to SAP  →", C.navy, 24, 800, 'text-anchor="middle"'),
  ));
}

// ── S/4HANA data migration: sources → extract, cleanse, validate → S/4HANA, with mock-load loop ──────
{
  const tbl = (x, y, head, rows, w, tones) => g(
    rect(x, y, w, 34, C.surface), ...head.map((h, i) => text(x + 14 + i * (w / head.length), y + 23, h, C.muted, 15, 800, 'letter-spacing="1"')),
    ...rows.map((r, ri) => g(
      tones[ri] ? rect(x, y + 34 + ri * 40, w, 40, tones[ri]) : "",
      line(x, y + 74 + ri * 40, x + w, y + 74 + ri * 40, C.line, 2),
      ...r.map((v, i) => text(x + 14 + i * (w / head.length), y + 61 + ri * 40, v, C.ink, 19, 600)))),
  );
  out["data-migration"] = svg(1600, 900, grad([[0, "#e9ecf2"], [1, C.ground]], "d"), g(
    // sources
    ...[["SAP ECC 6.0", "Custom tables and Z-fields", 90], ["Legacy systems", "Non-SAP databases", 300], ["Excel / CSV files", "Manual spreadsheets", 510]].map(([t, d, y], i) => g(
      shadow(rr(60, y, 360, 170, 14, C.white)), rect(60, y + 14, 6, 142, C.accent),
      i === 0 ? cylinder(96, y + 36, 84, 100, C.navy7, C.navy6) + text(138, y + 100, "ECC", C.onNavy, 24, 800, 'text-anchor="middle"') : "",
      i === 1 ? g(...[0, 1, 2].map((k) => rr(96, y + 36 + k * 36, 84, 30, 5, C.navy7) + circ(112, y + 51 + k * 36, 5, C.accent) + rect(126, y + 47 + k * 36, 42, 8, C.navy6))) : "",
      i === 2 ? g(rr(98, y + 34, 78, 104, 6, C.greenTint, `stroke="${C.green}" stroke-width="3"`), ...[0, 1, 2, 3].map((k) => line(104, y + 62 + k * 20, 170, y + 62 + k * 20, C.green, 2)), line(138, y + 46, 138, y + 130, C.green, 2), rr(104, y + 44, 30, 16, 3, C.green), text(119, y + 57, "XL", C.white, 12, 800, 'text-anchor="middle"')) : "",
      text(200, y + 84, t, C.ink, 24, 800), text(200, y + 114, d, C.muted, 17, 600))),
    ...[175, 385, 595].map((y) => path(`M426,${y} C450,${y} 452,445 476,445`, "none", `stroke="${C.accent}" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 12"`)),
    // cleanse panel
    shadow(rr(480, 70, 600, 730, 16, C.white)), rect(480, 70, 600, 10, C.accent),
    text(512, 135, "Extract · Cleanse · Validate", C.ink, 32, 800),
    rr(512, 160, 86, 30, 15, C.redTint), text(555, 181, "Before", C.red, 16, 800, 'text-anchor="middle"'),
    tbl(512, 200, ["PARTNER", "CITY", "TAX ID"], [["Acme Ltd", "Pune", "27AAB…"], ["ACME Ltd.", "Pune", "27AAB…"], ["Bharat Co", "", "—"], ["Nova Pvt", "Delhi", "07CCD…"]], 536, [null, C.redTint, C.accent1, null]),
    rr(954, 280, 92, 26, 13, C.red), text(1000, 298, "duplicate", C.white, 14, 800, 'text-anchor="middle"'),
    rr(954, 320, 92, 26, 13, C.accent), text(1000, 338, "no city", C.navy, 14, 800, 'text-anchor="middle"'),
    darr(560, 408, 462, C.accent, 5, 13), text(584, 442, "Rules agreed with data owners", C.muted, 18, 700),
    rr(512, 474, 86, 30, 15, C.greenTint), text(555, 495, "After", C.green, 16, 800, 'text-anchor="middle"'),
    tbl(512, 514, ["PARTNER", "CITY", "TAX ID"], [["Acme Ltd", "Pune", "27AAB…"], ["Bharat Co", "Mumbai", "27EEF…"], ["Nova Pvt", "Delhi", "07CCD…"]], 536, [null, null, null]),
    ...[0, 1, 2].map((i) => tick(1022, 568 + i * 40, 11, C.green)),
    ...["Extract", "Cleanse", "Map fields", "Validate"].map((t, i) => g(rr(512 + i * 138, 676, 128, 56, 8, i === 3 ? C.navy : C.surface), text(576 + i * 138, 710, t, i === 3 ? C.onNavy : C.ink, 18, 800, 'text-anchor="middle"'))),
    text(512, 770, "Custom fields and validations are recognised, not rebuilt", C.muted, 17, 700),
    // to S/4HANA
    arrow(1090, 445, 1175, C.accent, 7, 15),
    // target
    shadow(rr(1180, 110, 370, 620, 16, C.navy)), rect(1180, 110, 370, 10, C.ai),
    text(1214, 180, "S/4HANA", C.onNavy, 42, 800), text(1214, 212, "Target system", C.onNavyMuted, 19, 600),
    ...["Business partners", "Materials", "Lease contracts", "Equipment", "Open items"].map((t, i) => g(
      rr(1214, 244 + i * 78, 302, 62, 8, C.navy8), rr(1230, 262 + i * 78, 26, 26, 5, i === 2 ? C.accent : C.navy6),
      text(1272, 284 + i * 78, t, C.onNavy, 21, 600), tick(1490, 275 + i * 78, 13, C.green))),
    circ(1520, 118, 40, C.accent), `<polyline points="1502,118 1514,132 1540,102" fill="none" stroke="${C.navy}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
    text(1365, 706, "Reconciled after every load", C.accent3, 18, 700, 'text-anchor="middle"'),
    // mock load loop
    path("M1365,735 V820 Q1365,845 1340,845 H800 Q780,845 780,825 V806", "none", `stroke="${C.accent}" stroke-width="5" stroke-dasharray="14 10" stroke-linecap="round"`),
    poly([[766, 812], [780, 790], [794, 812]], C.accent),
    rr(870, 826, 400, 40, 20, C.accent1, `stroke="${C.accent}" stroke-width="2"`), text(1070, 853, "Mock-load cycles · repeat until reconciled", C.accent7, 18, 800, 'text-anchor="middle"'),
  ));
}

// ── SAP consulting: a programme-roadmap workshop ──────────────────────────────────────────────────
{
  const lanes = [["Data migration", 0, [[0, 0.22, C.ai], [0.22, 0.58, C.accent], [0.58, 0.92, C.accent4]]], ["Finance · FI/CO", 1, [[0.05, 0.4, C.accent4], [0.4, 0.78, C.ai]]], ["Integration", 2, [[0.15, 0.55, C.ai], [0.55, 0.85, C.accent4]]], ["Testing", 3, [[0.4, 0.95, C.navy6]]]];
  const sx = 490, sy = 90, sw = 850, sh = 360;
  out["consulting-team"] = svg(1500, 1000, grad([[0, "#f1efe9"], [1, "#e4e1da"]], "v"), g(
    rect(0, 700, 1500, 300, grad([[0, "#d8d4cc"], [1, "#c9c4ba"]], "v")),
    // window with skyline
    shadow(rr(60, 110, 320, 420, 6, grad([[0, "#cfeaf7"], [1, "#f4fafd"]], "v"))),
    ...[[90, 330, 70, 200], [170, 280, 80, 250], [260, 360, 60, 170], [320, 310, 50, 220]].map(([x, y, w, h], i) => rect(x, y, w, h, i % 2 ? "#a6bad0" : "#b9cade")),
    line(220, 110, 220, 530, C.white, 8), line(60, 320, 380, 320, C.white, 8),
    // pendant lamps
    ...[250, 1260].map((x) => line(x, 0, x, 60, C.navy7, 3) + path(`M${x - 50},96 Q${x},30 ${x + 50},96 Z`, C.navy7) + `<ellipse cx="${x}" cy="98" rx="46" ry="8" fill="${C.accent3}"/>`),
    // screen
    shadow(rr(sx - 14, sy - 14, sw + 28, sh + 28, 12, C.navy)),
    rr(sx, sy, sw, sh, 6, C.navy8),
    text(sx + 28, sy + 46, "S/4HANA programme roadmap", C.onNavy, 28, 800),
    ...["Blueprint", "Build", "Test", "Go-live"].map((t, i) => g(rect(sx + 220 + i * 150, sy + 66, 150, 34, i === 3 ? C.accent : C.navy7), text(sx + 295 + i * 150, sy + 89, t, i === 3 ? C.navy : C.onNavyMuted, 16, 800, 'text-anchor="middle"'))),
    ...lanes.map(([t, li, bars]) => g(
      line(sx + 20, sy + 124 + li * 56, sx + sw - 20, sy + 124 + li * 56, C.navy6, 1.5),
      text(sx + 28, sy + 162 + li * 56, t, C.onNavyMuted, 17, 700),
      ...bars.map(([a, b, col]) => rr(sx + 220 + a * 600, sy + 138 + li * 56, (b - a) * 600, 26, 5, col)))),
    line(sx + 220 + 600 * 0.92, sy + 100, sx + 220 + 600 * 0.92, sy + 340, C.accent, 3, 'stroke-dasharray="8 6"'),
    poly([[sx + 220 + 552, sy + 306], [sx + 220 + 564, sy + 318], [sx + 220 + 552, sy + 330], [sx + 220 + 540, sy + 318]], C.accent),
    // seated team
    ...[[220, 510, 1.1, { shirt: C.accent6, skin: SKIN[0], hair: HAIR[0], style: "short" }], [520, 495, 1.12, { shirt: C.navy, skin: SKIN[5], hair: HAIR[1], style: "long" }], [820, 515, 1.08, { shirt: C.aiInk, skin: SKIN[3], hair: HAIR[4], style: "curly", glasses: true }]].map(([x, y, s, o]) => person(x, y, s, o)),
    // table
    rect(60, 700, 1090, 34, grad([[0, "#e9e5dc"], [1, "#d9d4c9"]], "v")),
    rect(60, 734, 1090, 266, grad([[0, "#b8b2a4"], [1, "#a39d90"]], "v")),
    rect(60, 688, 1090, 14, C.strong),
    ...[220, 520, 820].map((x, i) => laptopBack(x, 700, 1.05, i === 1 ? C.navy8 : C.navy7, i === 1 ? C.ai : C.accent)),
    sticky(960, 660, 0.55, C.accent3, -6), sticky(1005, 668, 0.55, C.ai, 5),
    // presenter
    person(1320, 470, 1.2, { shirt: C.navy7, skin: SKIN[2], hair: HAIR[2], style: "short", lanyard: true }),
    arm(1262, 596, 1215, 560, 1150, 470, C.navy7, SKIN[2], 30),
    line(1150, 470, 1090, 280, C.accent4, 7, 'stroke-linecap="round"'),
    // credenza + plant
    rr(1190, 800, 330, 200, 6, grad([[0, "#c7b79c"], [1, "#b3a285"]], "v")), line(1355, 810, 1355, 1000, "rgba(0,0,0,0.12)", 3),
    plant(1440, 800, 0.95, C.accent6),
  ));
}

// ── Vijayapura office ─────────────────────────────────────────────────────────────────────────────
{
  const win = (x, y, w, h, lit) => rect(x, y, w, h, lit ? grad([[0, C.accent3], [1, C.accent2]], "v") : grad([[0, "#7b94b8"], [1, "#46628c"]], "d")) + (lit ? "" : poly([[x, y + h], [x + w * 0.55, y], [x + w * 0.8, y], [x + w * 0.25, y + h]], "rgba(255,255,255,0.14)"));
  out["office"] = svg(1200, 900, grad([[0, "#bfe3f5"], [0.65, "#f4f9fc"], [1, C.ground]], "v"), g(
    circ(1030, 150, 70, "rgba(255,255,255,0.5)"), circ(1030, 150, 44, C.accent3),
    path("M60,250 q40,-34 90,-10 q40,-30 90,6 q40,-22 70,10 H60 Z", "rgba(255,255,255,0.9)"), path("M820,330 q36,-30 80,-8 q46,-28 96,8 H820 Z", "rgba(255,255,255,0.85)"),
    // side block
    rect(880, 380, 260, 380, grad([[0, "#33466a"], [1, "#243553"]], "v")), rect(880, 380, 260, 14, C.accent4),
    ...Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 }, (_, c) => win(906 + c * 78, 420 + r * 100, 58, 70, (r + c) % 4 === 0)).join("")),
    // main block
    shadow(rect(230, 190, 690, 580, grad([[0, "#1f3050"], [1, C.navy]], "v"))),
    rect(230, 190, 690, 20, C.accent), rect(230, 210, 690, 8, "rgba(0,0,0,0.25)"),
    ...Array.from({ length: 4 }, (_, r) => Array.from({ length: 6 }, (_, c) => (r === 3 && (c === 3 || c === 4)) ? "" : win(268 + c * 107, 246 + r * 104, 78, 74, (r * 6 + c) % 7 === 2 || (r * 6 + c) % 11 === 4)).join("")),
    // sign
    rr(268, 640, 270, 56, 4, C.accent), text(403, 680, "TEXIRI", C.navy, 36, 800, 'text-anchor="middle" letter-spacing="8"'),
    // entrance
    rect(590, 600, 200, 170, "#cfe0ef"), rect(590, 600, 200, 8, C.accent), line(690, 608, 690, 770, C.navy, 5), line(640, 608, 640, 770, C.navy, 3), line(740, 608, 740, 770, C.navy, 3),
    path("M570,600 h240 l-14,-26 h-212 Z", C.navy8),
    // ground
    rect(0, 770, 1200, 130, grad([[0, "#d9d6cf"], [1, "#c4c0b7"]], "v")),
    rect(0, 770, 1200, 12, "#e8e5de"),
    ...Array.from({ length: 8 }, (_, i) => rect(i * 160 + 20, 850, 90, 8, "rgba(255,255,255,0.7)")),
    // trees and lamp
    ...[[140, 650], [1080, 690]].map(([x, y]) => rect(x - 8, y, 16, 120, "#6b5844") + circ(x, y - 20, 86, "#4f8a63") + circ(x - 40, y + 10, 56, "#5fa077") + circ(x + 46, y + 4, 58, "#3f7a56")),
    line(840, 560, 840, 770, C.navy7, 8), path("M840,560 q0,-24 28,-24", "none", `stroke="${C.navy7}" stroke-width="8"`), circ(870, 536, 12, C.accent3),
  ));
}

// ── Team group photo ──────────────────────────────────────────────────────────────────────────────
{
  const back = [[170, 0], [360, 1], [550, 2], [740, 3], [930, 4], [1090, 5]];
  const front = [[60, 5], [260, 0], [460, 1], [660, 2], [860, 3], [1060, 4], [1190, 2]];
  const shirts = [C.navy7, C.navy, C.aiInk, C.navy8, C.muted, C.accent6];
  const styles = ["short", "long", "curly", "short", "bun", "long"];
  out["team-photo"] = svg(1200, 900, grad([[0, "#efece6"], [1, "#e0dcd3"]], "v"), g(
    // wall + wordmark
    rect(0, 0, 1200, 640, grad([[0, "#f3f1ec"], [1, "#e6e2d9"]], "v")), rect(0, 560, 1200, 12, C.accent),
    text(600, 200, "TEXIRI", "rgba(15,26,46,0.07)", 200, 800, 'text-anchor="middle" letter-spacing="36"'),
    plant(70, 600, 1.1), plant(1130, 600, 1.1, C.navy7),
    rect(0, 572, 1200, 328, grad([[0, "#cfcabf"], [1, "#bdb7aa"]], "v")),
    // back row
    ...back.map(([x, i]) => person(x, 360 - (i % 2) * 20, 1.12, { shirt: shirts[(i + 2) % 6], skin: SKIN[(i + 1) % 6], hair: HAIR[i % 5], style: styles[(i + 3) % 6], lanyard: i % 2 === 0, glasses: i === 2, len: 330 })),
    // front row
    ...front.map(([x, i]) => person(x, 540, 1.28, { shirt: shirts[i % 6], skin: SKIN[(i + 3) % 6], hair: HAIR[(i + 2) % 5], style: styles[i % 6], lanyard: i % 2 === 1, glasses: i === 3, len: 260 })),
  ));
}

// ── Article: ECC mainstream maintenance ends in 2027 ──────────────────────────────────────────────
{
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const off = 3; // 1 Dec 2027 is a Wednesday
  const cx = 1130, cy = 440, R = 270;
  const tickM = Array.from({ length: 60 }, (_, i) => { const a = (i * 6 - 90) * Math.PI / 180, big = i % 5 === 0; return line(cx + Math.cos(a) * (R - 22), cy + Math.sin(a) * (R - 22), cx + Math.cos(a) * (R - (big ? 48 : 34)), cy + Math.sin(a) * (R - (big ? 48 : 34)), big ? C.navy : C.soft, big ? 6 : 3, 'stroke-linecap="round"'); }).join("");
  const sector = (() => { const a0 = -90 * Math.PI / 180, a1 = (-90 + 355) * Math.PI / 180; const r = R - 20; return path(`M${cx},${cy} L${cx + Math.cos(a0 + (300 * Math.PI) / 180) * r},${cy + Math.sin(a0 + (300 * Math.PI) / 180) * r} A${r},${r} 0 0 1 ${cx + Math.cos(a1) * r},${cy + Math.sin(a1) * r} Z`, "rgba(247,148,29,0.35)"); })();
  out["article-ecc-2027"] = svg(1600, 900, grad([[0, "#eceae4"], [1, "#dfe3ea"]], "d"), g(
    // calendar
    shadow(rr(150, 110, 600, 680, 18, C.white)),
    `<path d="M150,128 a18,18 0 0 1 18,-18 h564 a18,18 0 0 1 18,18 V230 H150 Z" fill="${C.navy}"/>`,
    ...[230, 450, 670].map((x) => rr(x - 8, 90, 16, 46, 8, C.strong) + rr(x - 4, 94, 8, 38, 4, C.soft)),
    text(450, 200, "DECEMBER 2027", C.onNavy, 44, 800, 'text-anchor="middle" letter-spacing="3"'),
    ...["S", "M", "T", "W", "T", "F", "S"].map((d, i) => text(210 + i * 80 + 24, 272, d, C.soft, 22, 800, 'text-anchor="middle"')),
    ...days.map((d) => { const i = d - 1 + off, c = i % 7, r = Math.floor(i / 7), x = 210 + c * 80 + 24, y = 340 + r * 84; return d === 31 ? circ(x, y - 9, 34, C.accent) + text(x, y, "31", C.navy, 30, 800, 'text-anchor="middle"') : text(x, y, String(d), c === 0 || c === 6 ? C.soft : C.ink, 28, 700, 'text-anchor="middle"'); }),
    rr(190, 716, 520, 54, 27, C.accent1, `stroke="${C.accent}" stroke-width="3"`), text(450, 752, "ECC mainstream maintenance ends", C.accent7, 24, 800, 'text-anchor="middle"'),
    // clock
    shadow(circ(cx, cy, R + 24, C.navy)), circ(cx, cy, R, radial([[0, C.white], [1, "#e9ebf0"]])),
    sector, tickM,
    ...[["12", 0, -1], ["3", 1, 0], ["6", 0, 1], ["9", -1, 0]].map(([t, dx, dy]) => text(cx + dx * (R - 84), cy + dy * (R - 84) + 17, t, C.navy, 52, 800, 'text-anchor="middle"')),
    line(cx, cy, cx + Math.cos((-92 + 330) * Math.PI / 180 + Math.PI) * 0, cy, C.navy, 0),
    line(cx, cy, cx - 70, cy - 120, C.navy, 16, 'stroke-linecap="round"'), line(cx, cy, cx + 20, cy - 190, C.accent, 10, 'stroke-linecap="round"'),
    circ(cx, cy, 20, C.navy), circ(cx, cy, 8, C.accent),
    // ECC → S/4HANA chip
    rr(940, 790, 380, 70, 35, C.navy), text(1130, 835, "ECC  →  S/4HANA", C.onNavy, 30, 800, 'text-anchor="middle"'), circ(980, 825, 12, C.accent),
  ));
}

// ── Article: RE-FX, lease data after go-live ──────────────────────────────────────────────────────
{
  const bld = [[110, 330, 190, 400], [320, 200, 210, 530], [550, 390, 170, 340], [740, 260, 200, 470]];
  out["article-refx"] = svg(1600, 900, grad([[0, "#fde7c8"], [1, C.accent1]], "v"), g(
    circ(1250, 160, 120, "rgba(247,148,29,0.18)"), circ(1250, 160, 70, C.accent3),
    rect(0, 730, 1600, 170, grad([[0, C.accent2], [1, C.accent3]], "v")),
    ...bld.map(([x, y, w, h], i) => g(
      shadow(rect(x, y, w, h, grad([[0, i % 2 ? C.navy7 : C.navy8], [1, C.navy]], "v"))),
      rect(x, y, w, 12, C.accent),
      ...Array.from({ length: Math.floor((h - 60) / 78) }, (_, r) => [0, 1, 2].map((c) => rect(x + 24 + c * ((w - 48) / 3), y + 40 + r * 78, (w - 48) / 3 - 14, 52, (r * 3 + c + i) % 5 === 1 ? C.accent3 : "rgba(255,255,255,0.12)")).join("")))),
    // data tags tied to the buildings
    ...[["Lease term", 315, 450, 960, 330], ["Rent schedule", 500, 590, 960, 450], ["Options", 735, 530, 960, 570]].map(([, x, y, tx, ty]) => g(
      path(`M${x},${y} C${x + 100},${y} ${tx - 100},${ty} ${tx},${ty}`, "none", `stroke="${C.accent6}" stroke-width="4" stroke-dasharray="3 10" stroke-linecap="round"`),
      circ(x, y, 9, C.accent6))),
    // lease document
    `<g transform="rotate(-4 1210 450)">${shadow(rr(960, 140, 500, 640, 14, C.white))}${rect(960, 140, 500, 96, C.navy)}${text(996, 202, "LEASE AGREEMENT", C.onNavy, 34, 800, 'letter-spacing="2"')}
    ${[["Term", "5 years"], ["Rent", "Monthly"], ["Escalation", "Annual"], ["Options", "Renewal"]].map(([k, v], i) => text(996, 300 + i * 78, k.toUpperCase(), C.soft, 17, 800, 'letter-spacing="2"') + text(996, 336 + i * 78, v, C.ink, 30, 700) + rect(996, 352 + i * 78, 420, 2, C.line)).join("")}
    ${path("M1000,700 q30,-50 60,-8 t60,-6 t60,10 t60,-22", "none", `stroke="${C.navy}" stroke-width="5" stroke-linecap="round"`)}${circ(1370, 690, 48, C.accent)}${`<polyline points="1348,690 1364,708 1396,668" fill="none" stroke="${C.navy}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`}</g>`,
  ));
}

export default out;
