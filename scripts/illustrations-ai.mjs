// AI and community illustrations: stalled pilots, use-case article, community, member projects, learners.
import { C, SKIN, HAIR, arm, arrow, circ, dotPattern, g, grad, laptopBack, line, path, person, poly, radial, rect, rr, shadow, sticky, svg, text, tick, warn, windowChrome } from "./illustration-kit.mjs";

const out = {};

// ── AI Services "The problem": pilots stall at the use-case, data and governance checkpoints ──────
// Shown at 2:1 from desktop width only (below that its labels are too small to read), so no text is smaller than 14.
// Content decision IMG6: final illustration, no figures (nothing to source).
{
  const lanes = [230, 312, 394, 476, 558, 640, 722];
  const LIVE = 3, gap = 30, TOP = 196, BOTTOM = 762;
  const gates = [[640, "01", "Use case"], [800, "02", "Data"], [960, "03", "Governance"]];
  // One pilot per industry in lib/industries.ts: [industry, application, gate it stalls at (null = live), why]
  const pilots = [
    ["Real estate", "Lease abstraction", 0, "No owner or target KPI"],
    ["Retail", "Markdown optimisation", 0, "No agreed margin KPI"],
    ["Utilities", "Grid load forecasting", 1, "Meter data in silos"],
    ["Oil & gas", "Predictive maintenance", null, "In production"],
    ["Pharma", "Batch deviation triage", 2, "No GxP validation plan"],
    ["Manufacturing", "Defect detection", 1, "Too few labelled defects"],
    ["Financial services", "Credit-risk scoring", 2, "No model-risk sign-off"],
  ];
  const CX = 290, CW = 260, PX = 1050, PW = 270, PY = 296, PH = 340;
  const risk = [0.2, 0.24, 0.22, 0.3, 0.28, 0.36, 0.42, 0.5, 0.62, 0.86];
  const ry = (v) => 488 - v * 90;
  out["ai-pilots-stall"] = svg(1600, 800, grad([[0, C.navy8], [1, C.navy]], "v"), g(
    rect(0, 0, 1600, 800, dotPattern("rgba(43,181,232,0.24)", 28)),
    circ(PX + PW / 2, 470, 420, radial([[0, "rgba(47,158,107,0.2)"], [1, "rgba(47,158,107,0)"]])),
    circ(620, 470, 540, radial([[0, "rgba(43,181,232,0.16)"], [1, "rgba(43,181,232,0)"]])),
    // the backlog of ideas behind the pilots
    ...lanes.map((y) => line(0, y, CX, y, C.navy6, 3, 'stroke-dasharray="4 14" stroke-linecap="round"') + rr(120, y - 16, 120, 32, 8, C.navy8, `stroke="${C.navy6}" stroke-width="2" opacity="0.55"`) + rr(136, y - 3, 70, 6, 3, C.navy6, 'opacity="0.7"')),
    // column headers
    text(CX, 160, "Pilots", C.onNavy, 24, 800),
    ...gates.map(([x, n, t]) => text(x, 128, n, C.accent3, 18, 800, 'text-anchor="middle" letter-spacing="2"') + text(x, 160, t, C.onNavy, 22, 800, 'text-anchor="middle"')),
    text(PX + PW / 2, 160, "Production", C.onNavy, 24, 800, 'text-anchor="middle"'),
    // the path every pilot was meant to take, faint, and how far each actually got
    ...lanes.map((y, i) => pilots[i][2] === null ? "" : line(CX + CW, y, PX - 10, y, C.navy6, 3, 'stroke-dasharray="10 12" opacity="0.7"')),
    ...lanes.map((y, i) => pilots[i][2] === null ? "" : line(CX + CW, y, gates[pilots[i][2]][0] - 22, y, C.onNavyMuted, 5, 'stroke-linecap="round"')),
    arrow(CX + CW, lanes[LIVE], PX - 2, C.ai, 7, 18),
    // checkpoints, open only on the lane that gets through
    ...gates.map(([x]) => g(
      rr(x - 12, TOP, 24, lanes[LIVE] - gap - TOP, 8, C.navy7, `stroke="${C.navy6}" stroke-width="2"`),
      rr(x - 12, lanes[LIVE] + gap, 24, BOTTOM - lanes[LIVE] - gap, 8, C.navy7, `stroke="${C.navy6}" stroke-width="2"`),
      tick(x, lanes[LIVE], 16, C.green))),
    // checkpoints each stalled pilot did pass, then the one that stopped it
    ...lanes.map((y, i) => pilots[i][2] === null ? "" : g(gates.slice(0, pilots[i][2]).map(([x]) => tick(x, y, 10, C.green)), warn(gates[pilots[i][2]][0], y, 20))),
    // pilot cards: industry, application, status
    ...pilots.map(([ind, app, stall, why], i) => g(
      shadow(rr(CX, lanes[i] - 36, CW, 72, 10, C.navy8, `stroke="${stall === null ? C.ai : C.navy6}" stroke-width="${stall === null ? 3 : 2}"`), "sh2"),
      rr(CX + 9, lanes[i] - 24, 5, 48, 2.5, stall === null ? C.ai : C.accent),
      text(CX + 26, lanes[i] - 14, ind.toUpperCase().replace("&", "&amp;"), C.onNavyMuted, 14, 800, 'letter-spacing="1.2"'),
      text(CX + 26, lanes[i] + 8, app, stall === null ? C.onNavy : "#d5dbe5", 18, 800),
      text(CX + 26, lanes[i] + 28, why, stall === null ? "#7fd6a8" : C.accent3, 16, 600))),
    // production: the live model, monitored
    shadow(rr(PX, PY, PW, PH, 14, C.navy8, `stroke="${C.green}" stroke-width="3"`)),
    text(PX + 20, PY + 38, "Compressor health", C.onNavy, 18, 800), text(PX + 20, PY + 61, "Predictive maintenance", C.onNavyMuted, 16, 600),
    rr(PX + PW - 72, PY + 18, 56, 26, 13, C.green), text(PX + PW - 44, PY + 36, "Live", C.navy, 14, 800, 'text-anchor="middle"'),
    rr(PX + 20, 378, PW - 40, 124, 8, C.navy7),
    text(PX + 32, 400, "Failure risk", C.onNavyMuted, 14, 700), text(PX + 32, ry(0.7) + 19, "alert line", C.accent3, 14, 700),
    line(PX + 32, ry(0.7), PX + PW - 32, ry(0.7), C.accent, 2, 'stroke-dasharray="6 6"'),
    `<polyline points="${risk.map((v, i) => `${PX + 34 + i * 22.6},${ry(v)}`).join(" ")}" fill="none" stroke="${C.ai}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`,
    circ(PX + 34 + 9 * 22.6, ry(risk[9]), 13, C.accent, 'opacity="0.35"'), circ(PX + 34 + 9 * 22.6, ry(risk[9]), 7, C.accent),
    ...["Work order raised", "Drift monitored", "Audit log on"].map((t, i) => tick(PX + 30, 526 + i * 36, 10, C.green) + text(PX + 50, 532 + i * 36, t, C.onNavy, 16, 600)),
  ));
}

// ── Article: choosing your first AI use case ──────────────────────────────────────────────────────
{
  const cards = [
    ["Invoice extraction", C.accent, 0.8, 0.3, "doc"],
    ["Demand forecast", C.ai, 0.7, 0.5, "chart"],
    ["Policy assistant", C.navy6, 0.55, 0.4, "chat"],
  ];
  const icon = (k, x, y, col) => k === "doc"
    ? g(rr(x, y, 56, 70, 6, C.white), rect(x + 10, y + 16, 36, 5, col), rect(x + 10, y + 30, 36, 5, col), rect(x + 10, y + 44, 22, 5, col))
    : k === "chart"
      ? g(rr(x - 4, y, 64, 70, 6, C.white), rect(x + 8, y + 40, 10, 20, col), rect(x + 24, y + 26, 10, 34, col), rect(x + 40, y + 12, 10, 48, col))
      : g(rr(x - 2, y + 4, 60, 44, 10, C.white), poly([[x + 12, y + 46], [x + 8, y + 66], [x + 30, y + 48]], C.white), circ(x + 16, y + 26, 5, col), circ(x + 28, y + 26, 5, col), circ(x + 40, y + 26, 5, col));
  out["article-first-ai"] = svg(1600, 900, grad([[0, C.navy8], [1, C.navy]], "v"), g(
    rect(0, 0, 1600, 900, dotPattern("rgba(43,181,232,0.24)", 30)),
    circ(1180, 450, 460, radial([[0, "rgba(43,181,232,0.2)"], [1, "rgba(43,181,232,0)"]])),
    text(110, 130, "One day. One ranked list.", C.onNavy, 52, 800),
    text(110, 176, "Long list  →  shortlist  →  first pilot", C.onNavyMuted, 26, 600),
    ...cards.map(([t, col, v, e, k], i) => g(
      shadow(rr(110 + i * 36, 250 + i * 190, 860, 164, 14, C.navy8, `stroke="${col}" stroke-width="3"`)),
      rr(110 + i * 36, 250 + i * 190, 150, 164, 14, col), text(185 + i * 36, 358 + i * 190, String(i + 1), i === 2 ? C.onNavy : C.navy, 92, 800, 'text-anchor="middle"'),
      icon(k, 290 + i * 36, 296 + i * 190, col), text(386 + i * 36, 322 + i * 190, t, C.onNavy, 38, 800),
      text(386 + i * 36, 366 + i * 190, "Value", C.onNavyMuted, 18, 700), rr(458 + i * 36, 352 + i * 190, 190, 12, 6, C.navy6), rr(458 + i * 36, 352 + i * 190, 190 * v, 12, 6, C.ai),
      text(386 + i * 36, 396 + i * 190, "Effort", C.onNavyMuted, 18, 700), rr(458 + i * 36, 382 + i * 190, 190, 12, 6, C.navy6), rr(458 + i * 36, 382 + i * 190, 190 * e, 12, 6, C.accent),
      i === 0 ? rr(790, 276, 150, 44, 22, C.accent) + text(865, 306, "Start here", C.navy, 22, 800, 'text-anchor="middle"') : "")),
    // funnel
    poly([[1090, 250], [1500, 250], [1410, 470], [1180, 470]], "rgba(43,181,232,0.22)", `stroke="${C.ai}" stroke-width="3"`),
    poly([[1180, 470], [1410, 470], [1350, 640], [1240, 640]], "rgba(252,154,58,0.3)", `stroke="${C.accent}" stroke-width="3"`),
    rr(1262, 640, 66, 90, 8, C.accent), text(1295, 700, "1", C.navy, 56, 800, 'text-anchor="middle"'),
    text(1295, 335, "12 ideas", C.onNavy, 32, 800, 'text-anchor="middle"'), text(1295, 540, "3 shortlisted", C.onNavy, 24, 800, 'text-anchor="middle"'),
    text(1380, 700, "first pilot", C.accent3, 24, 800),
  ));
}

// ── Community workshop (tall tile): learning to prompt ────────────────────────────────────────────
{
  out["community-workshop"] = svg(900, 1200, grad([[0, C.comTint], [1, "#ffe9b8"]], "v"), g(
    circ(780, 110, 150, C.com, 'opacity="0.55"'), circ(80, 1070, 190, C.comOrangeTint),
    ...[[120, 60, C.accent], [830, 420, C.comBlue], [60, 520, C.com], [850, 700, C.accent]].map(([x, y, c], i) => `<rect x="${x}" y="${y}" width="16" height="16" rx="3" fill="${c}" transform="rotate(${i * 25} ${x} ${y})"/>`),
    // slide
    shadow(rr(70, 90, 760, 450, 24, C.white)),
    `<path d="M70,114 a24,24 0 0 1 24,-24 h712 a24,24 0 0 1 24,24 V170 H70 Z" fill="${C.comBlue}"/>`,
    text(110, 146, "Prompting 101", C.white, 40, 800), rr(640, 112, 150, 36, 18, C.com), text(715, 137, "Workshop", C.navy, 20, 800, 'text-anchor="middle"'),
    rr(110, 200, 440, 70, 22, C.comBlueTint), text(136, 244, "Explain RAG like I’m new to AI", C.ink, 24, 700),
    rr(280, 292, 480, 96, 22, C.comBlue), text(308, 332, "Think of it as an open-book exam:", C.white, 23, 600), text(308, 366, "the model looks things up first.", C.white, 23, 600),
    circ(120, 340, 22, C.com), text(120, 349, "AI", C.navy, 17, 800, 'text-anchor="middle"'),
    ...["Role", "Context", "Format"].map((t, i) => rr(110 + i * 240, 430, 220, 64, 32, [C.comTint2, C.comOrangeTint, C.comBlueTint][i]) + text(220 + i * 240, 471, t, C.ink, 26, 800, 'text-anchor="middle"')),
    // people and table
    person(220, 700, 1.25, { shirt: C.comBlue, skin: SKIN[0], hair: HAIR[0], style: "long", len: 150 }),
    person(470, 720, 1.2, { shirt: C.accent, skin: SKIN[3], hair: HAIR[4], style: "curly", len: 150 }),
    person(710, 705, 1.25, { shirt: C.navy7, skin: SKIN[2], hair: HAIR[1], style: "short", glasses: true, len: 150 }),
    rr(40, 930, 820, 54, 27, C.white, 'filter="url(#sh2)"'),
    ...[220, 470, 710].map((x, i) => laptopBack(x, 934, 1, C.white, [C.comBlue, C.accent, C.com][i])),
    rr(40, 976, 820, 224, 0, "rgba(255,255,255,0.55)"),
    // speech
    rr(560, 600, 150, 54, 27, C.com), text(635, 636, "Try it!", C.navy, 26, 800, 'text-anchor="middle"'), poly([[590, 650], [600, 676], [620, 652]], C.com),
  ));
}

// ── Community demo: a member presents their first chatbot ─────────────────────────────────────────
{
  out["community-demo"] = svg(900, 700, grad([[0, C.comBlueTint], [1, C.comBlue2]], "v"), g(
    circ(820, 640, 160, "rgba(255,255,255,0.4)"),
    shadow(rr(310, 50, 540, 380, 22, C.white)),
    `<path d="M310,72 a22,22 0 0 1 22,-22 h496 a22,22 0 0 1 22,22 V120 H310 Z" fill="${C.comBlue}"/>`,
    circ(352, 85, 20, C.com), text(352, 92, "AI", C.navy, 15, 800, 'text-anchor="middle"'), text(386, 92, "My first chatbot", C.white, 26, 800),
    rr(340, 148, 300, 52, 26, C.comBlueTint), text(364, 182, "What can you do?", C.ink, 21, 700),
    rr(430, 216, 390, 82, 26, C.com), text(454, 252, "I can answer questions about", C.navy, 21, 700), text(454, 280, "the Saturday workshop!", C.navy, 21, 700),
    rr(340, 314, 230, 52, 26, C.comBlueTint), text(364, 348, "What time?", C.ink, 21, 700),
    rr(340, 378, 480, 40, 20, C.ground), text(362, 405, "Type a message…", C.soft, 18, 600),
    // presenter
    person(170, 280, 1.3, { shirt: C.accent, skin: SKIN[4], hair: HAIR[1], style: "long", lanyard: true, len: 420 }),
    arm(236, 410, 290, 380, 330, 300, C.accent, SKIN[4], 30),
    // audience
    ...[[260, 0, C.comBlue, SKIN[0], "short"], [520, 1, C.navy7, SKIN[2], "bun"], [780, 2, C.accent, SKIN[3], "curly"]].map(([x, i, shirt, , style]) => person(x, 640, 0.95, { view: "back", shirt, hair: HAIR[i], style })),
    circ(420, 505, 22, C.com), text(420, 513, "★", C.navy, 22, 800, 'text-anchor="middle"'), circ(640, 520, 16, C.accent), circ(100, 520, 14, C.comBlue),
  ));
}

// ── Member project: computer vision ───────────────────────────────────────────────────────────────
{
  const car = (x, y, s) => g(
    rr(x, y + 70 * s, 320 * s, 90 * s, 22 * s, C.comBlue),
    path(`M${x + 62 * s},${y + 72 * s} L${x + 110 * s},${y + 8 * s} H${x + 220 * s} L${x + 276 * s},${y + 72 * s} Z`, C.comBlue),
    path(`M${x + 84 * s},${y + 68 * s} L${x + 120 * s},${y + 22 * s} H${x + 154 * s} V${y + 68 * s} Z`, "#bfd6f5"), path(`M${x + 168 * s},${y + 68 * s} V${y + 22 * s} H${x + 212 * s} L${x + 252 * s},${y + 68 * s} Z`, "#bfd6f5"),
    rect(x + 292 * s, y + 96 * s, 22 * s, 14 * s, C.com),
    ...[70, 250].map((dx) => circ(x + dx * s, y + 160 * s, 38 * s, C.ink) + circ(x + dx * s, y + 160 * s, 17 * s, C.strong)),
  );
  const px = 900, py = 520;
  const box = (x, y, w, h, col, label, w2) => g(rect(x, y, w, h, "none", `stroke="${col}" stroke-width="7"`), rect(x - 3.5, y - 46, w2, 46, col), text(x + 14, y - 14, label, C.navy, 25, 800));
  out["project-vision"] = svg(1600, 1000, grad([[0, C.comTint], [1, C.comOrangeTint]], "d"), g(
    windowChrome(40, 40, 1520, 920, "detect.py · live preview", { bar: C.comTint2, ink: C.ink }),
    // scene
    rect(70, 112, 1010, 820, grad([[0, "#bfdcf7"], [0.55, "#e7f1fb"], [1, "#e7f1fb"]], "v")),
    ...[[90, 330, 150, 330], [250, 400, 130, 260], [880, 300, 170, 360], [720, 420, 140, 240]].map(([x, y, w, h], i) => rect(x, y, w, h, i % 2 ? "#9fb6d3" : "#8aa3c4") + Array.from({ length: Math.floor(h / 60) }, (_, r) => rect(x + 18, y + 22 + r * 60, w - 36, 28, "rgba(255,255,255,0.35)")).join("")),
    rect(70, 660, 1010, 272, "#6f7686"), rect(70, 650, 1010, 20, "#c9ccd3"),
    ...Array.from({ length: 6 }, (_, i) => rect(100 + i * 170, 800, 100, 12, "#e9e6df")),
    car(250, 540, 1.2),
    // person
    g(circ(px, py - 120, 44, SKIN[2]), `<path d="M${px - 44},${py - 130} A44,44 0 0 1 ${px + 44},${py - 130} Q${px},${py - 160} ${px - 44},${py - 130} Z" fill="${HAIR[1]}"/>`,
      rr(px - 52, py - 70, 104, 170, 28, C.accent), rr(px - 46, py + 90, 38, 140, 14, C.navy7), rr(px + 8, py + 90, 38, 140, 14, C.navy7), rr(px - 76, py - 60, 26, 120, 13, C.accent), rr(px + 50, py - 60, 26, 120, 13, C.accent)),
    box(236, 556, 440, 300, C.accent, "car 0.88", 200),
    box(814, 340, 172, 420, C.com, "person 0.94", 262),
    // side panel
    rr(1110, 112, 420, 820, 12, C.white, `stroke="${C.line}" stroke-width="2"`),
    text(1142, 168, "Detections", C.ink, 32, 800), text(1142, 198, "2 objects in this frame", C.muted, 18, 600),
    ...[["car", 0.88, C.accent], ["person", 0.94, C.com]].map(([t, v, col], i) => g(
      rr(1142, 226 + i * 112, 356, 92, 10, C.surface), rect(1142, 226 + i * 112, 8, 92, col),
      text(1170, 262 + i * 112, t, C.ink, 26, 800), text(1486, 262 + i * 112, String(v), C.ink, 26, 800, 'text-anchor="end"'),
      rr(1170, 282 + i * 112, 300, 12, 6, C.line), rr(1170, 282 + i * 112, 300 * v, 12, 6, col))),
    text(1142, 530, "Confidence threshold", C.muted, 19, 700), rr(1142, 552, 356, 10, 5, C.line), rr(1142, 552, 200, 10, 5, C.comBlue), circ(1342, 557, 15, C.comBlue), text(1486, 592, "0.50", C.muted, 18, 800, 'text-anchor="end"'),
    ...["Model: YOLO-style", "Frames: 30 fps", "Trained on: member dataset"].map((t, i) => text(1142, 660 + i * 40, t, C.muted, 19, 600)),
    rr(1142, 820, 356, 62, 31, C.comBlue), text(1320, 860, "Run on a new photo", C.white, 22, 800, 'text-anchor="middle"'),
  ));
}

// ── Member project: chatbot ───────────────────────────────────────────────────────────────────────
{
  const bot = (x, y) => g(circ(x, y, 30, C.comBlue), rect(x - 14, y - 6, 28, 18, C.white, 'rx="5"'), circ(x - 6, y + 3, 3.5, C.comBlue), circ(x + 6, y + 3, 3.5, C.comBlue), line(x, y - 6, x, y - 16, C.white, 3), circ(x, y - 18, 4, C.com));
  out["project-chatbot"] = svg(1600, 1000, grad([[0, C.comBlueTint], [1, C.comBlue2]], "d"), g(
    windowChrome(40, 40, 1520, 920, "Path Buddy · chat", { bar: C.comTint2, ink: C.ink }),
    // conversation
    rect(70, 112, 920, 820, "#ffffff"), rect(70, 112, 920, 90, C.comBlue), bot(130, 157), text(180, 152, "Path Buddy", C.white, 30, 800), circ(182, 178, 6, C.green), text(196, 183, "online", "#d6e4ff", 17, 600),
    rr(160, 232, 560, 78, 39, C.comTint), text(200, 281, "Which learning path should I start with?", C.ink, 25, 700),
    bot(130, 380), rr(180, 340, 700, 112, 36, C.comBlue), text(220, 386, "Start with “AI from zero”. No code needed,", C.white, 25, 600), text(220, 424, "and you finish with your first project.", C.white, 25, 600),
    rr(330, 486, 560, 78, 39, C.comTint), text(370, 535, "Can I build something this week?", C.ink, 25, 700),
    bot(130, 624), rr(180, 584, 740, 112, 36, C.comBlue), text(220, 630, "Yes! Join the chatbot workshop on Saturday", C.white, 25, 600), text(220, 668, "and build one in an afternoon.", C.white, 25, 600),
    ...["Beginner path", "Build a chatbot", "Upcoming events"].map((t, i) => rr(100 + i * 292, 724, 276, 54, 27, C.white, `stroke="${C.comBlue}" stroke-width="3"`) + text(238 + i * 292, 759, t, C.comBlue, 21, 800, 'text-anchor="middle"')),
    rr(100, 826, 820, 74, 37, C.surface), text(140, 872, "Ask anything…", C.soft, 24, 600), circ(872, 863, 28, C.com), poly([[860, 851], [888, 863], [860, 875]], C.navy),
    // side: recommended
    rect(990, 112, 540, 820, C.ground), text(1030, 168, "Recommended for you", C.ink, 30, 800),
    ...[["Beginner", "AI from zero", C.comTint, true], ["Intermediate", "Build with Python", C.comOrangeTint, false], ["Advanced", "Ship it", C.comBlueTint, false]].map(([lvl, t, bg, on], i) => g(
      shadow(rr(1030, 206 + i * 190, 460, 164, 22, on ? bg : C.white), "sh2"), on ? rr(1030, 206, 460, 164, 22, "none", `stroke="${C.com}" stroke-width="5"`) : "",
      rr(1060, 232 + i * 190, 120, 34, 17, on ? C.com : C.surface), text(1120, 256 + i * 190, lvl, C.ink, 17, 800, 'text-anchor="middle"'),
      text(1060, 316 + i * 190, t, C.ink, 32, 800), rr(1060, 336 + i * 190, 240, 10, 5, C.line), rr(1060, 336 + i * 190, i === 0 ? 240 : i === 1 ? 120 : 40, 10, 5, C.comBlue))),
  ));
}

// ── Member project: demand forecast ───────────────────────────────────────────────────────────────
{
  const X0 = 140, X1 = 1030, Y0 = 330, Y1 = 760;
  const px = (i) => X0 + (i / 12) * (X1 - X0);
  const py = (v) => Y1 - v * (Y1 - Y0);
  const actual = [0.42, 0.48, 0.45, 0.55, 0.52, 0.6, 0.58, 0.64];
  const fc = [0.64, 0.68, 0.72, 0.7, 0.76];
  const pts = (a, s) => a.map((v, i) => `${px(i + s)},${py(v)}`).join(" ");
  out["project-forecast"] = svg(1600, 1000, grad([[0, C.comOrangeTint], [1, C.comTint]], "d"), g(
    windowChrome(40, 40, 1520, 920, "forecast.ipynb · Weekly demand", { bar: C.comTint2, ink: C.ink }),
    text(100, 190, "Weekly demand forecast", C.ink, 38, 800), text(100, 226, "Next 5 weeks, with a likely range", C.muted, 22, 600),
    // KPI cards
    ...[["MAPE", "8.2%", "forecast error", C.comBlue], ["Bias", "+1.4%", "slightly high", C.accent], ["Next week", "1,240", "units expected", C.green]].map(([k, v, s, col], i) => g(
      shadow(rr(1060 + 0, 150 + i * 0, 0, 0, 0, "none"), "sh2"), rr(720 + i * 270, 130, 250, 124, 16, C.white, `stroke="${C.line}" stroke-width="2"`), rect(720 + i * 270, 146, 6, 92, col),
      text(748 + i * 270, 172, k.toUpperCase(), C.muted, 16, 800, 'letter-spacing="2"'), text(748 + i * 270, 218, v, C.ink, 46, 800), text(748 + i * 270, 244, s, C.muted, 17, 600))),
    // chart
    rr(100, 280, 970, 600, 16, C.white, `stroke="${C.line}" stroke-width="2"`),
    ...[0, 1, 2, 3, 4].map((i) => line(X0, Y0 + i * ((Y1 - Y0) / 4), X1, Y0 + i * ((Y1 - Y0) / 4), C.line, 2)),
    ...["Wk 1", "Wk 3", "Wk 5", "Wk 7", "Wk 9", "Wk 11"].map((t, i) => text(px(i * 2) + 6, Y1 + 40, t, C.soft, 17, 700, 'text-anchor="middle"')),
    text(X0 - 14, Y0 + 6, "High", C.soft, 15, 700, 'text-anchor="end"'), text(X0 - 14, Y1 + 6, "Low", C.soft, 15, 700, 'text-anchor="end"'),
    `<polygon points="${[[7, 0.64], [8, 0.62], [9, 0.64], [10, 0.62], [11, 0.66], [12, 0.7]].map(([i, v]) => `${px(i)},${py(v + 0.12)}`).join(" ")} ${[[12, 0.7], [11, 0.66], [10, 0.62], [9, 0.64], [8, 0.62], [7, 0.64]].map(([i, v]) => `${px(i)},${py(v - 0.13)}`).join(" ")}" fill="${C.comTint2}" opacity="0.8"/>`,
    line(px(7), Y0 - 10, px(7), Y1, C.soft, 3, 'stroke-dasharray="8 8"'), text(px(7) + 12, Y0 + 14, "Today", C.soft, 17, 800),
    `<polyline points="${pts(actual, 0)}" fill="none" stroke="${C.comBlue}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>`,
    ...actual.map((v, i) => circ(px(i), py(v), 8, C.white, `stroke="${C.comBlue}" stroke-width="4"`)),
    `<polyline points="${pts([actual[7], ...fc], 7)}" fill="none" stroke="${C.accent}" stroke-width="8" stroke-dasharray="22 14" stroke-linecap="round"/>`,
    rect(130, 826, 28, 6, C.comBlue), text(168, 836, "Actual", C.muted, 19, 700), rect(290, 826, 28, 6, C.accent), text(328, 836, "Forecast", C.muted, 19, 700), rect(470, 818, 28, 20, C.comTint2), text(508, 836, "Likely range", C.muted, 19, 700),
    // drivers
    rr(1110, 280, 410, 600, 16, C.white, `stroke="${C.line}" stroke-width="2"`),
    text(1142, 336, "What drives demand", C.ink, 28, 800),
    ...[["Seasonality", 0.86], ["Promotions", 0.64], ["Weather", 0.38], ["Price", 0.22]].map(([t, v], i) => g(
      text(1142, 400 + i * 108, t, C.ink, 22, 700), rr(1142, 418 + i * 108, 346, 18, 9, C.surface), rr(1142, 418 + i * 108, 346 * v, 18, 9, i === 0 ? C.comBlue : C.com), text(1488, 400 + i * 108, `${Math.round(v * 100)}%`, C.muted, 20, 800, 'text-anchor="end"'))),
  ));
}

// ── Shambhavi 108: learners restarting their careers ──────────────────────────────────────────────
{
  out["learners"] = svg(1600, 1000, grad([[0, C.accent1], [1, "#fde3c4"]], "v"), g(
    circ(1420, 180, 180, "rgba(252,154,58,0.18)"),
    rect(0, 720, 1600, 280, grad([[0, "#e7d4b5"], [1, "#d6bf9a"]], "v")),
    // board
    shadow(rr(130, 90, 760, 440, 12, C.navy)),
    text(170, 150, "Hands-on practice session", C.onNavy, 32, 800), rr(640, 116, 200, 40, 20, C.accent), text(740, 144, "Mentor-led", C.navy, 20, 800, 'text-anchor="middle"'),
    rr(170, 184, 360, 300, 10, C.navy8),
    ...[[0, "function greet(name) {"], [1, "return `Hi ${name}`;"], [0, "}"], [0, "greet(\"Asha\");"]].map(([ind, t], i) => text(194 + ind * 24, 232 + i * 44, t, i === 2 ? C.accent3 : C.onNavy, 21, 600, 'font-family="Consolas, monospace"')),
    rr(560, 184, 290, 300, 10, C.white), text(584, 230, "Output", C.soft, 17, 800, 'letter-spacing="2"'), text(584, 290, "Hi Asha", C.navy, 38, 800),
    ...[0, 1, 2].map((i) => tick(600, 350 + i * 44, 13, C.green) + rr(626, 342 + i * 44, 180 - i * 30, 14, 7, C.line)),
    // wall notes
    sticky(960, 140, 1, C.accent3, -5), sticky(1050, 160, 1, C.ai, 6), sticky(1000, 250, 1, C.com, 3),
    // learners
    ...[[360, 0, C.navy7, SKIN[0], "long"], [820, 1, C.accent6, SKIN[3], "bun"], [1260, 2, C.aiInk, SKIN[2], "short"]].map(([x, i, shirt, skin, style]) => person(x, 560, 1.3, { shirt, skin, hair: HAIR[i], style, lanyard: true, len: 155 })),
    rr(70, 800, 1460, 44, 8, "#f5ecdc", 'filter="url(#sh2)"'), rect(70, 840, 1460, 160, "rgba(0,0,0,0.12)"),
    ...[360, 820, 1260].map((x, i) => laptopBack(x, 808, 1.2, i === 1 ? C.navy8 : C.navy7, i === 1 ? C.ai : C.accent)),
    // mentor tag
  ));
}

export default out;
