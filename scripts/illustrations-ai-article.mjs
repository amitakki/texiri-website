// Illustrations for the article "Choosing your first AI use case in one day"
// (app/insights/first-ai-use-case/). Names, scores and counts drawn here are sample data, and say so.
import { C, arrow, circ, g, grad, line, rect, rr, shadow, svg, text, tick, warn, windowChrome } from "./illustration-kit.mjs";

const out = {};
const mid = 'text-anchor="middle"';
const end = 'text-anchor="end"';
const caps = 'letter-spacing="2"';
const bg = () => grad([[0, C.ground], [1, C.aiTint]], "d");
const chip = (x, y, w, label, fill, ink, h = 34, size = 16) => rr(x, y, w, h, h / 2, fill) + text(x + w / 2, y + h / 2 + size * 0.36, label, ink, size, 800, mid);
const risk = { Low: [C.greenTint, C.green], Med: [C.accent2, C.accent7], High: [C.redTint, C.red] };

// ── Hero: a long list of problems is scored on four criteria and ranked into a proposed first pilot ──
{
  const ideas = ["Invoice extraction", "Demand forecast", "Policy assistant", "Service assistant", "Contract search", "Churn warning",
    "Meeting notes", "CV screening", "Credit scoring", "Asset failure risk", "Price optimisation", "Email triage"];
  // [use case, value, data readiness, feasibility, risk]
  const scored = [
    ["Invoice extraction", 5, 5, 4, "Low"], ["Demand forecast", 5, 3, 4, "Low"], ["Policy assistant", 3, 5, 5, "Low"], ["Service assistant", 4, 2, 3, "Low"],
    ["Credit scoring", 5, 3, 2, "High"], ["Asset failure risk", 5, 1, 2, "Low"], ["Meeting notes", 2, 4, 5, "Med"],
  ];
  const ranked = [["Invoice extraction", "Data ready"], ["Demand forecast", "Needs data work"], ["Policy assistant", "Data ready"]];
  const dot = (x, y, n) => circ(x, y, 19, n >= 4 ? C.ai : n === 3 ? C.accent3 : C.strong) + text(x, y + 7, String(n), C.navy, 19, 800, mid);
  out["ai-article-hero"] = svg(1600, 900, bg(), g(
    circ(1420, 140, 220, "rgba(43,181,232,0.10)"),
    // long list
    text(60, 110, "Long list", C.navy, 28, 800), text(60, 142, "12 problems worth solving", C.muted, 18, 600),
    ...ideas.map((t, i) => {
      const x = 60 + (i % 2) * 205, y = 170 + Math.floor(i / 2) * 92;
      return g(shadow(rr(x, y, 190, 70, 10, C.white), "sh2"), rect(x, y, 6, 70, i < 3 ? C.ai : C.strong), text(x + 20, y + 42, t, C.ink, 17, 700));
    }),
    arrow(466, 435, 522, C.ai6, 7, 16),
    // scoring
    windowChrome(530, 110, 560, 600, "Scoring · four criteria"),
    ...["Value", "Data", "Feasible", "Risk"].map((h, i) => text(800 + i * 82, 206, h, C.muted, 15, 800, mid)),
    ...scored.map(([t, v, d, f, r], i) => {
      const y = 250 + i * 64;
      return g(
        i === 0 ? rr(546, y - 26, 538, 56, 8, C.aiTint) : "",
        text(560, y + 8, t, C.ink, 18, 800), dot(800, y, v), dot(882, y, d), dot(964, y, f), chip(1014, y - 16, 64, r, risk[r][0], risk[r][1], 32, 15),
        line(546, y + 32, 1074, y + 32, C.line, 2));
    }),
    arrow(1096, 435, 1136, C.ai6, 7, 16),
    // ranked list and the proposed pilot
    shadow(rr(1140, 110, 400, 600, 16, C.navy)),
    text(1170, 168, "Ranked list", C.onNavy, 28, 800),
    ...ranked.map(([t, s], i) => {
      const y = 200 + i * 120;
      return g(
        rr(1166, y, 56, 56, 8, i === 0 ? C.accent : C.navy7), text(1194, y + 39, String(i + 1), i === 0 ? C.navy : C.onNavy, 28, 800, mid),
        text(1240, y + 26, t, C.onNavy, 21, 800), text(1240, y + 52, s, i === 1 ? C.accent3 : C.onNavyMuted, 17, 700),
        i < 2 ? line(1166, y + 88, 1514, y + 88, C.navy6, 2) : "");
    }),
    rr(1166, 576, 348, 108, 10, C.ai),
    text(1188, 610, "PROPOSED FIRST PILOT", C.navy, 15, 800, caps), text(1188, 644, "Invoice extraction", C.navy, 25, 800),
    text(1188, 670, "KPI: days to post an invoice", C.navy, 16, 700),
    // the day
    line(60, 800, 1540, 800, C.strong, 3),
    ...[[257, "09:00–12:00", "Problems"], [810, "13:00–15:00", "Scoring"], [1340, "15:00–17:00", "Ranking"]].map(([x, t, l]) =>
      circ(x, 800, 11, C.ai) + text(x, 778, t, C.muted, 17, 700, mid) + text(x, 838, l, C.ink, 21, 800, mid)),
    text(1540, 880, "Sample data", C.soft, 20, 700, end),
  ));
}

// ── Section 01: technology first versus problem first ───────────────────────────────────────────────
{
  const panel = (x, head, headFill, headInk, quote, rows, good, result, sub) => g(
    shadow(rr(x, 170, 520, 660, 16, C.white)),
    `<path d="M${x},234 V186 a16,16 0 0 1 16,-16 h488 a16,16 0 0 1 16,16 V234 Z" fill="${headFill}"/>`,
    text(x + 30, 212, head, headInk, 22, 800, caps),
    rr(x + 30, 262, 460, 90, 12, C.navy), text(x + 260, 317, quote, C.onNavy, 24, 800, mid),
    ...rows.map((r, i) => {
      const y = 410 + i * 70;
      return g(good ? tick(x + 56, y, 16, C.green) : warn(x + 56, y, 16), text(x + 86, y + 8, r, good ? C.ink : C.muted, 21, 700),
        line(x + 30, y + 35, x + 490, y + 35, C.line, 2));
    }),
    rr(x + 30, 660, 460, 130, 12, good ? C.greenTint : C.redTint),
    good ? tick(x + 74, 725, 22, C.green) : warn(x + 74, 725, 22, C.red, C.white),
    text(x + 112, 716, result, good ? C.green : C.red, 25, 800), text(x + 112, 752, sub, C.muted, 19, 600));
  out["ai-article-problem"] = svg(1200, 900, bg(), g(
    text(60, 110, "Two ways to pick a first pilot", C.navy, 44, 800),
    panel(60, "TECHNOLOGY FIRST", C.surface, C.muted, "“Let’s build a chatbot.”", ["Who will use it?", "Which data does it need?", "How will we measure it?"], false, "The demo works, then stalls", "No owner, no data, no KPI"),
    panel(620, "PROBLEM FIRST", C.ai, C.navy, "“Invoices take 6 days to post.”", ["Owner: accounts payable lead", "Data: invoices and orders in ERP", "KPI: days to post, 6 → 2"], true, "A pilot with a target", "Measured from the first day"),
    text(1140, 870, "Sample values", C.soft, 20, 700, end),
  ));
}

// ── Section 02: who is in the room, and what they bring ──────────────────────────────────────────────
{
  const cx = 390, cy = 500, R = 270;
  // [role, initials, fill, ink]
  const seats = [
    ["Business sponsor", "BS", C.navy, C.onNavy], ["Process owner", "PO", C.navy7, C.onNavy], ["Process owner", "PO", C.navy7, C.onNavy], ["Data owner", "DO", C.ai, C.navy],
    ["IT &amp; security", "IT", C.navy6, C.onNavy], ["Risk &amp; compliance", "RC", C.navy6, C.onNavy], ["Texiri facilitators", "TX", C.accent, C.navy],
  ];
  const bring = ["This year’s goals", "3–5 problems per team", "Volume, time and cost", "Systems and data held", "Region and risk limits"];
  out["ai-article-prep"] = svg(1200, 900, bg(), g(
    text(60, 110, "Who is in the room", C.navy, 44, 800),
    shadow(circ(cx, cy, 180, C.white)), circ(cx, cy, 150, C.surface),
    text(cx, cy - 6, "One day", C.navy, 34, 800, mid), text(cx, cy + 28, "one shared list", C.muted, 19, 700, mid),
    ...seats.map(([t, initials, fill, ink], i) => {
      const a = (-90 + (i * 360) / 7) * Math.PI / 180, x = Math.round(cx + Math.cos(a) * R), y = Math.round(cy + Math.sin(a) * R);
      return g(shadow(circ(x, y, 40, fill), "sh2"), text(x, y + 9, initials, ink, 24, 800, mid), text(x, y + 72, t, C.ink, 18, 800, mid));
    }),
    shadow(rr(790, 200, 370, 600, 14, C.white)),
    `<path d="M790,270 V214 a14,14 0 0 1 14,-14 h342 a14,14 0 0 1 14,14 V270 Z" fill="${C.navy}"/>`,
    text(818, 245, "BRING TO THE DAY", C.onNavy, 19, 800, caps),
    ...bring.map((t, i) => {
      const y = 330 + i * 92;
      return g(tick(830, y, 16, C.ai, C.navy), text(860, y + 7, t, C.ink, 20, 800), rr(860, y + 24, 220 - (i % 2) * 60, 10, 5, C.surface));
    }),
    text(975, 775, "Sent a week before", C.muted, 18, 700, mid),
  ));
}

// ── Section 03: the day, with sample counts as the list narrows ────────────────────────────────────
{
  const agenda = [
    ["09:00", "Goals and limits", "What this year must deliver; what AI must not do", "4", "goals and limits"],
    ["10:00", "Problems, not ideas", "Each team describes what is slow, costly or error-prone", "23", "problems"],
    ["11:30", "Shape use cases", "For each: the problem, its users, the data and a KPI", "12", "use cases"],
    ["13:30", "Score", "Value, data readiness, feasibility and risk", "12", "scored"],
    ["15:00", "Rank and choose", "Data and risk act as gates; then value decides", "3", "shortlisted"],
    ["16:30", "Next steps", "Owners, data checks and the proposed pilot", "1", "proposed pilot"],
  ];
  const fills = [C.surface, C.surface, C.aiTint, C.aiTint, C.ai, C.navy];
  out["ai-article-agenda"] = svg(1200, 900, bg(), g(
    text(60, 110, "A typical workshop day", C.navy, 44, 800),
    text(60, 152, "Sample counts from one day", C.muted, 22, 600),
    line(150, 220, 150, 800, C.ai6, 4, 'stroke-dasharray="4 10" stroke-linecap="round"'),
    ...agenda.map(([time, t, d, n, l], i) => {
      const y = 200 + i * 102, dark = i === 5;
      return g(
        text(128, y + 50, time, C.muted, 20, 800, end), circ(150, y + 42, 10, i === 5 ? C.accent : C.ai),
        shadow(rr(180, y, 640, 84, 10, C.white), "sh2"), text(204, y + 36, t, C.ink, 23, 800), text(204, y + 66, d, C.muted, 18, 600),
        rr(850, y, 290, 84, 10, fills[i]), text(882, y + 55, n, dark ? C.accent : C.navy, 40, 800), text(950, y + 52, l, dark ? C.onNavy : C.ink, 20, 800));
    }),
    text(1140, 870, "Sample data", C.soft, 20, 700, end),
  ));
}

// ── Section 04: value against readiness, coloured by risk ───────────────────────────────────────────
{
  const x0 = 150, x1 = 1080, yTop = 220, yBot = 760;
  const X = (r) => x0 + r * (x1 - x0), Y = (v) => yBot - v * (yBot - yTop);
  const col = { Low: C.green, Med: C.accent, High: C.red };
  // [use case, readiness (data and feasibility), value, risk]
  const pts = [
    ["Invoice extraction", 0.85, 0.85, "Low"], ["Demand forecast", 0.6, 0.8, "Low"], ["Credit scoring", 0.55, 0.92, "High"], ["Policy assistant", 0.82, 0.58, "Low"],
    ["Service assistant", 0.35, 0.75, "Low"], ["Asset failure risk", 0.15, 0.82, "Low"], ["Price optimisation", 0.25, 0.6, "Med"], ["Contract search", 0.4, 0.4, "Med"],
    ["CV screening", 0.7, 0.45, "High"], ["Email triage", 0.7, 0.35, "Low"], ["Meeting notes", 0.88, 0.3, "Med"], ["Churn warning", 0.3, 0.3, "Low"],
  ];
  const mx = X(0.5), my = Y(0.5);
  out["ai-article-matrix"] = svg(1200, 900, bg(), g(
    text(60, 110, "Value against readiness", C.navy, 44, 800),
    text(60, 152, "Sample scores · colour shows risk", C.muted, 22, 600),
    rect(x0, yTop, x1 - x0, yBot - yTop, C.white), rect(mx, yTop, x1 - mx, my - yTop, C.aiTint),
    line(mx, yTop, mx, yBot, C.strong, 2, 'stroke-dasharray="6 8"'), line(x0, my, x1, my, C.strong, 2, 'stroke-dasharray="6 8"'),
    line(x0, yBot, x1, yBot, C.ink, 3), line(x0, yTop, x0, yBot, C.ink, 3),
    text(x0 + 20, yTop + 34, "Fix the data first", C.muted, 19, 800), text(x1 - 20, yTop + 34, "Start here", C.aiInk, 21, 800, end),
    text(x0 + 20, yBot - 20, "Not now", C.muted, 19, 800), text(x1 - 20, yBot - 20, "Small wins", C.muted, 19, 800, end),
    ...pts.map(([t, r, v, k], i) => {
      const x = X(r), y = Y(v);
      return g(
        i === 0 ? circ(x, y, 26, "none", `stroke="${C.accent}" stroke-width="5"`) : "",
        circ(x, y, 14, col[k]), text(x + (i === 0 ? 34 : 22), y + 7, t, C.ink, 20, 800));
    }),
    text((x0 + x1) / 2, yBot + 44, "Readiness: data and feasibility →", C.ink, 21, 800, mid),
    text(98, (yTop + yBot) / 2, "Value →", C.ink, 21, 800, `${mid} transform="rotate(-90 98 ${(yTop + yBot) / 2})"`),
    ...[["Low risk", "Low"], ["Medium", "Med"], ["High risk", "High"]].map(([t, k], i) => circ(x0 + 12 + i * 190, 862, 11, col[k]) + text(x0 + 32 + i * 190, 869, t, C.muted, 19, 700)),
  ));
}

// ── Section 05: a one-page use-case card ────────────────────────────────────────────────────────────
{
  const field = (x, y, label, body) => g(text(x, y, label, C.muted, 15, 800, caps), body);
  const data = [["Invoice PDFs", true], ["Purchase orders", true], ["Vendor master", false]];
  out["ai-article-card"] = svg(1200, 900, bg(), g(
    shadow(rr(140, 70, 920, 770, 14, C.white)),
    `<path d="M140,200 V84 a14,14 0 0 1 14,-14 h892 a14,14 0 0 1 14,14 V200 Z" fill="${C.navy}"/>`,
    text(180, 122, "USE-CASE CARD · 01", C.onNavyMuted, 17, 800, caps), text(180, 172, "Supplier invoice extraction", C.onNavy, 38, 800),
    chip(890, 100, 140, "Rank 1", C.accent, C.navy, 38, 18),
    field(180, 250, "PROBLEM", text(180, 286, "Invoices take 6 days to post", C.ink, 22, 800)),
    field(620, 250, "OWNER", text(620, 286, "Accounts payable lead", C.ink, 22, 800)),
    line(180, 322, 1020, 322, C.line, 2),
    field(180, 366, "USERS", text(180, 402, "12 AP clerks, 3 sites", C.ink, 22, 800)),
    field(620, 366, "DATA", g(...data.map(([t, ok], i) => g(ok ? tick(634, 400 + i * 44, 13, C.green) : warn(634, 400 + i * 44, 13), text(658, 407 + i * 44, t, C.ink, 20, 700),
      ok ? "" : chip(830, 386 + i * 44, 140, "Duplicates", C.accent2, C.accent7, 30, 15))))),
    line(180, 512, 1020, 512, C.line, 2),
    field(180, 556, "KPI", g(text(180, 604, "6 days", C.muted, 34, 800), text(300, 604, "→", C.ai6, 34, 800), text(350, 604, "2 days", C.ink, 34, 800),
      text(180, 636, "Baseline → target, days to post", C.muted, 17, 600))),
    field(620, 556, "HUMAN REVIEW", g(text(620, 592, "A clerk approves every", C.ink, 22, 800), text(620, 622, "invoice before posting", C.ink, 22, 800))),
    line(180, 670, 1020, 670, C.line, 2),
    field(180, 714, "RISK", chip(180, 730, 250, "Not high-risk", C.greenTint, C.green, 38, 18)),
    field(620, 714, "PILOT SCOPE", text(620, 756, "One business unit", C.ink, 22, 800)),
    text(1060, 880, "Sample data", C.soft, 20, 700, end),
  ));
}

// ── Section 06: after the workshop, each step ends with something you keep ─────────────────────────
{
  const steps = [
    [["AI readiness", "workshop"], ["Ranked list,", "proposed pilot"]],
    [["Data readiness", "analysis"], ["Quality and", "access report"]],
    [["Prioritise and", "set KPIs"], ["Shortlist and", "target KPIs"]],
    [["Pilot"], ["Working pilot,", "evaluated"]],
    [["Scale"], ["In production,", "monitored"]],
  ];
  out["ai-article-next"] = svg(1200, 900, bg(), g(
    text(60, 110, "After the workshop", C.navy, 44, 800),
    text(60, 152, "Each step ends with something you keep", C.muted, 22, 600),
    ...steps.map(([name, keep], i) => {
      const x = 60 + i * 220, top = 640 - i * 100, last = i === 4, ink = last ? C.navy : C.onNavy;
      return g(
        text(x, top - 48, keep[0], C.ink, 17, 800), text(x, top - 24, keep[1], C.ink, 17, 800),
        shadow(rr(x, top, 210, 800 - top, 10, last ? C.ai : i === 0 ? C.navy : C.navy7), "sh2"), rect(x, top, 210, 6, last ? C.navy : C.ai),
        text(x + 20, top + 40, String(i + 1).padStart(2, "0"), last ? C.navy : C.ai, 18, 800),
        ...name.map((l, k) => text(x + 20, top + 74 + k * 26, l, ink, 22, 800)),
        i === 0 ? chip(x + 20, top + 108, 150, "You are here", C.accent, C.navy, 32, 15) : "");
    }),
    line(40, 802, 1160, 802, C.ink, 3),
  ));
}

export default out;
