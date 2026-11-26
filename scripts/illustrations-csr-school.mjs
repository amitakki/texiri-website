// Second CSR example event: a school visit in Vijayapura (school kits, a computer class, a group photo).
// Kept in its own module, generated last, so adding drawings here does not renumber the gradient ids in the others.
import { C, SKIN, HAIR, arm, circ, g, grad, laptopBack, line, path, person, poly, rect, rr, shadow, svg, text, tick, windowChrome } from "./illustration-kit.mjs";

const out = {};
const UNIFORM = "#e6eef8";
const tee = (x, y, s, i, style, k) => person(x, y, s, { shirt: C.accent6, skin: SKIN[(i + 1) % 6], hair: HAIR[k % 5], style, collar: false, len: 440 });
const pupil = (x, y, s, i, style, k) => person(x, y, s, { shirt: UNIFORM, skin: SKIN[(i + 3) % 6], hair: HAIR[(k + 2) % 5], style, len: 400 });
const bag = (x, y, s = 1, flap = C.accent) => g(
  path(`M${x - 22 * s},${y - 48 * s} q${22 * s},${-34 * s} ${44 * s},0`, "none", `stroke="${C.navy}" stroke-width="${7 * s}"`),
  rr(x - 44 * s, y - 50 * s, 88 * s, 108 * s, 16 * s, C.navy7), rr(x - 44 * s, y - 50 * s, 88 * s, 46 * s, 16 * s, flap),
  rr(x - 26 * s, y + 14 * s, 52 * s, 30 * s, 6 * s, "rgba(255,255,255,0.14)"),
);

// ── Handing out school kits in a classroom ──────────────────────────────────────────────────────
{
  out["csr-school-kits"] = svg(1200, 900, grad([[0, "#f6efe2"], [1, "#ebe0cc"]], "v"), g(
    // blackboard
    shadow(rr(130, 80, 640, 300, 10, "#7a5638")), rr(146, 96, 608, 268, 4, "#2f4a3a"),
    text(450, 190, "WELCOME", "rgba(245,244,241,0.85)", 58, 800, 'text-anchor="middle" letter-spacing="6"'),
    ...[[210, 250, 320], [210, 290, 250], [520, 250, 170]].map(([x, y, w]) => rr(x, y, w, 8, 4, "rgba(245,244,241,0.45)")),
    // window
    rr(870, 90, 240, 270, 8, C.white), rr(884, 104, 212, 242, 4, "#cfe6f3"), line(990, 104, 990, 346, C.white, 10), line(884, 225, 1096, 225, C.white, 10),
    // two volunteers behind, two pupils seated in front
    tee(290, 300, 1.3, 1, "long", 0), tee(1000, 310, 1.3, 4, "short", 1),
    pupil(600, 500, 0.95, 0, "short", 0), pupil(790, 490, 0.95, 2, "bun", 1),
    // desk with kits
    rect(0, 680, 1200, 220, grad([[0, "#c9a77e"], [1, "#a98760"]], "v")), rect(0, 680, 1200, 14, "rgba(255,255,255,0.35)"),
    bag(790, 650, 1, C.ai),
    ...[0, 1, 2, 3].map((i) => rr(940 - i * 4, 650 - i * 16, 150, 16, 3, [C.ai, C.accent3, C.green, C.white][i], 'stroke="rgba(15,26,46,0.15)"')),
    // the volunteer hands a bag across the desk
    arm(370, 410, 430, 540, 500, 590, C.accent6, SKIN[2], 34), bag(520, 630, 0.9, C.com),
  ));
}

// ── A computer class with the pupils ────────────────────────────────────────────────────────────
{
  const block = (x, y, w, fill) => g(rr(x, y, w, 30, 6, fill), rr(x + 14, y - 6, 26, 10, 4, fill));
  out["csr-computer-class"] = svg(1200, 900, grad([[0, "#e9f3f8"], [1, "#dbe7ee"]], "v"), g(
    // lesson on the wall screen
    windowChrome(360, 60, 480, 250, "Lesson 1"),
    block(400, 150, 180, C.com), block(424, 196, 220, C.ai), block(424, 242, 150, C.accent), block(400, 288 - 6, 120, C.green),
    circ(760, 210, 44, C.aiTint), tick(760, 210, 30, C.green),
    // two pupils at laptops, the volunteer between them
    pupil(330, 470, 1.05, 1, "long", 0), pupil(870, 470, 1.05, 4, "short", 3),
    tee(600, 380, 1.3, 2, "curly", 2),
    rect(0, 700, 1200, 200, grad([[0, "#cfd6de"], [1, "#b7c0ca"]], "v")), rect(0, 700, 1200, 12, "rgba(255,255,255,0.5)"),
    laptopBack(330, 700, 1.5), laptopBack(870, 700, 1.5),
    // pointing at the pupil's screen
    arm(680, 490, 740, 580, 790, 590, C.accent6, SKIN[3], 34),
  ));
}

// ── Group photo outside the school ──────────────────────────────────────────────────────────────
{
  out["csr-group-photo"] = svg(1200, 900, grad([[0, "#d7eaf6"], [1, "#f4efe4"]], "v"), g(
    circ(1080, 110, 54, C.com), circ(1080, 110, 80, "rgba(255,194,14,0.18)"),
    // school building
    poly([[90, 170], [600, 40], [1110, 170]], "#b5533c"),
    rect(120, 170, 960, 300, "#efe3cf"), rect(120, 170, 960, 16, "rgba(15,26,46,0.08)"),
    rr(470, 196, 260, 56, 6, C.navy), text(600, 236, "SCHOOL", C.onNavy, 30, 800, 'text-anchor="middle" letter-spacing="6"'),
    ...[170, 300, 800, 930].map((x) => g(rr(x, 210, 100, 90, 4, "#9cc3dc"), line(x + 50, 210, x + 50, 300, C.white, 6))),
    path("M0,470 H1200 V900 H0 Z", grad([[0, "#d8c7a8"], [1, "#c2ad89"]], "v")),
    // volunteers behind, pupils in front
    ...[[200, 1, "long"], [400, 3, "short"], [600, 0, "bun"], [800, 4, "curly"], [1000, 2, "short"]].map(([x, i, style], k) => tee(x, 360 - (k % 2) * 16, 1.2, i, style, k)),
    ...[[300, 0, "bun"], [500, 2, "short"], [700, 5, "long"], [900, 1, "short"]].map(([x, i, style], k) => pupil(x, 560, 0.9, i, style, k)),
    // banner held in front
    shadow(rr(170, 690, 860, 120, 10, C.navy)), rect(170, 790, 860, 20, C.accent),
    text(600, 768, "BACK TO SCHOOL", C.onNavy, 50, 800, 'text-anchor="middle" letter-spacing="5"'),
    ...[250, 950].map((x) => circ(x, 700, 22, SKIN[2])),
  ));
}

export default out;
