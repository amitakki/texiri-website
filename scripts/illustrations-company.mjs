// Company-life placeholder illustrations: Life at Texiri and CSR event gallery slots.
// Kept in their own module, generated last, so adding drawings here does not renumber the gradient ids in the others.
import { C, SKIN, HAIR, circ, g, grad, line, path, person, poly, rect, rr, shadow, svg, text } from "./illustration-kit.mjs";

const out = {};

// ── Life at Texiri: a team celebration in the office (gallery slot) ─────────────────────────────
{
  const flags = Array.from({ length: 13 }, (_, i) => i);
  const flagFill = [C.accent, C.navy7, C.ai, C.com, C.green];
  const crowd = [[200, 1, 0], [380, 3, 1], [600, 0, 2], [820, 4, 3], [1000, 2, 4]];
  const shirts = [C.navy7, C.accent6, C.aiInk, C.navy, C.green];
  const styles = ["long", "short", "curly", "bun", "short"];
  out["life-at-texiri"] = svg(1200, 900, grad([[0, "#f3efe7"], [1, "#e6dfd2"]], "v"), g(
    text(600, 230, "TEXIRI", "rgba(15,26,46,0.06)", 190, 800, 'text-anchor="middle" letter-spacing="34"'),
    // bunting
    path("M0,70 Q600,190 1200,70", "none", `stroke="${C.navy}" stroke-width="4"`),
    ...flags.map((i) => { const x = 40 + i * 92, y = 70 + Math.sin((x / 1200) * Math.PI) * 60; return poly([[x - 28, y], [x + 28, y], [x, y + 62]], flagFill[i % 5]); }),
    // balloons
    ...[[90, 300, C.accent], [150, 250, C.ai], [1090, 280, C.com], [1140, 340, C.accent6]].map(([x, y, c]) => g(path(`M${x},${y + 52} q-14,60 6,130`, "none", `stroke="${C.soft}" stroke-width="3"`), `<ellipse cx="${x}" cy="${y}" rx="44" ry="54" fill="${c}"/>`, `<ellipse cx="${x - 14}" cy="${y - 18}" rx="10" ry="16" fill="rgba(255,255,255,0.35)"/>`)),
    // people
    ...crowd.map(([x, i, k]) => person(x, 430 - (k % 2) * 24, 1.35, { shirt: shirts[k], skin: SKIN[(i + 2) % 6], hair: HAIR[k], style: styles[k], glasses: k === 3, len: 300 })),
    // table with a cake
    rect(0, 690, 1200, 210, grad([[0, "#c9b79a"], [1, "#b49f80"]], "v")), rect(0, 690, 1200, 14, "rgba(255,255,255,0.35)"),
    shadow(g(rr(500, 600, 200, 90, 10, C.white), rr(500, 600, 200, 26, 10, C.accent3), rr(530, 560, 140, 48, 8, C.white), rr(530, 560, 140, 16, 8, C.accent2))),
    ...[560, 600, 640].map((x) => g(rr(x - 4, 528, 8, 32, 3, C.ai), `<ellipse cx="${x}" cy="520" rx="6" ry="10" fill="${C.com}"/>`)),
    rr(250, 640, 150, 50, 25, C.surface), rr(800, 640, 150, 50, 25, C.surface),
  ));
}

// ── CSR event: volunteers planting saplings (gallery slot) ──────────────────────────────────────
{
  const volunteers = [[260, 1, "long"], [480, 3, "short"], [720, 0, "bun"], [940, 4, "curly"]];
  const sapling = (x, y, s) => g(`<ellipse cx="${x}" cy="${y + 6}" rx="${54 * s}" ry="${16 * s}" fill="#7a5638"/>`, line(x, y, x, y - 90 * s, "#5d7a3a", 7 * s, 'stroke-linecap="round"'),
    ...[[-1, -60], [1, -78], [-1, -96], [1, -112]].map(([d, dy]) => `<ellipse cx="${x + d * 22 * s}" cy="${y + dy * s}" rx="${24 * s}" ry="${11 * s}" transform="rotate(${d * -28} ${x + d * 22 * s} ${y + dy * s})" fill="${C.green}"/>`));
  out["csr-event"] = svg(1200, 900, grad([[0, "#dcecf5"], [1, "#f4efe4"]], "v"), g(
    circ(1030, 150, 70, C.com), circ(1030, 150, 100, "rgba(255,194,14,0.18)"),
    path("M0,470 Q300,380 620,450 T1200,420 V900 H0 Z", grad([[0, "#b9d39a"], [1, "#9cbf78"]], "v")),
    // banner
    shadow(rr(330, 90, 540, 110, 10, C.navy)), rect(330, 182, 540, 18, C.accent),
    text(600, 160, "COMMUNITY DRIVE", C.onNavy, 44, 800, 'text-anchor="middle" letter-spacing="4"'),
    line(360, 200, 360, 470, C.navy7, 8), line(840, 200, 840, 470, C.navy7, 8),
    // volunteers in matching T-shirts
    ...volunteers.map(([x, i, style], k) => person(x, 420 - (k % 2) * 20, 1.3, { shirt: C.accent6, skin: SKIN[(i + 1) % 6], hair: HAIR[k], style, collar: false, len: 260 })),
    // planting strip
    path("M0,700 Q600,660 1200,700 V900 H0 Z", grad([[0, "#8c6a49"], [1, "#6f5238"]], "v")),
    ...[[150, 760, 1.1], [420, 740, 1.3], [700, 750, 1.2], [980, 745, 1.35], [1120, 780, 0.9]].map(([x, y, s]) => sapling(x, y, s)),
    // watering can
    g(rr(540, 790, 120, 80, 14, C.ai), path("M660,810 l70,-40", "none", `stroke="${C.ai}" stroke-width="14" stroke-linecap="round"`), path("M560,790 q40,-50 80,0", "none", `stroke="${C.aiInk}" stroke-width="10"`)),
  ));
}

export default out;
