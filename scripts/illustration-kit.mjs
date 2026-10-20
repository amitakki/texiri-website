// Shared drawing helpers for scripts/generate-placeholder-images.mjs.
// Everything returns SVG strings. Gradients and shadows register themselves in `defs` and are flushed by svg().

export const C = {
  ground: "#f5f4f1", surface: "#ebe9e4", strong: "#d7d3d3", line: "#e2dfda", ink: "#0f1a2e", muted: "#4a5670", soft: "#8993a8",
  navy: "#0f1a2e", navy8: "#18263f", navy7: "#243553", navy6: "#34476b", onNavy: "#f5f4f1", onNavyMuted: "#aeb8c8",
  accent: "#f7941d", accent6: "#e07f0a", accent7: "#9a4f00", accent4: "#f9aa4c", accent3: "#fbc27d", accent2: "#fddcb3", accent1: "#fef1e0",
  ai: "#2bb5e8", ai6: "#1e9ccb", aiInk: "#1546a0", aiTint: "#e3f4fb", green: "#2f9e6b", greenTint: "#dff3e8", red: "#d6453d", redTint: "#fbe3e0",
  com: "#ffc20e", comTint: "#fff0c7", comTint2: "#ffe6a3", comBlue: "#1546a0", comBlueTint: "#e3ecfb", comBlue2: "#cfdcf5", comOrangeTint: "#fde3c4", white: "#ffffff",
};
export const SKIN = ["#c68a5f", "#a8714b", "#e0a878", "#8a5a3c", "#b97d55", "#f0c29a"];
export const HAIR = ["#1d1a19", "#2b211c", "#3a2a20", "#4a3426", "#12100f"];
const FONT = `font-family="Archivo, 'Segoe UI', system-ui, -apple-system, sans-serif"`;

let defs = [];
let uid = 0;
const nid = (p) => `${p}${++uid}`;

/** Linear gradient; returns a paint reference. dir: v (top→bottom), h (left→right), d (diagonal). */
export function grad(stops, dir = "v") {
  const id = nid("g");
  const [x2, y2] = dir === "h" ? [1, 0] : dir === "d" ? [1, 1] : [0, 1];
  defs.push(`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ""}/>`).join("")}</linearGradient>`);
  return `url(#${id})`;
}
export function radial(stops, cx = 0.5, cy = 0.5, r = 0.5) {
  const id = nid("r");
  defs.push(`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ""}/>`).join("")}</radialGradient>`);
  return `url(#${id})`;
}
export function dotPattern(color, gap = 28, r = 1.6) {
  const id = nid("p");
  defs.push(`<pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse"><circle cx="${gap / 2}" cy="${gap / 2}" r="${r}" fill="${color}"/></pattern>`);
  return `url(#${id})`;
}
export function hatch(color, gap = 14, w = 3) {
  const id = nid("h");
  defs.push(`<pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="${w}" height="${gap}" fill="${color}"/></pattern>`);
  return `url(#${id})`;
}

export function svg(w, h, bg, body) {
  const shadows = `<filter id="sh" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#0f1a2e" flood-opacity="0.2"/></filter>
<filter id="sh2" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#0f1a2e" flood-opacity="0.18"/></filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>`;
  const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${shadows}${defs.join("")}</defs><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>\n`;
  defs = [];
  return out;
}

export const g = (...parts) => parts.flat().join("");
export const rect = (x, y, w, h, fill, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
export const rr = (x, y, w, h, r, fill, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
export const circ = (x, y, r, fill, extra = "") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
export const line = (x1, y1, x2, y2, stroke, w = 4, extra = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
export const path = (d, fill = "none", extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;
export const poly = (pts, fill, extra = "") => `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${fill}" ${extra}/>`;
export const text = (x, y, s, fill, size, weight = 700, extra = "") => `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" ${extra.includes("font-family") ? "" : FONT} ${extra}>${s}</text>`;
export const shadow = (inner, f = "sh") => `<g filter="url(#${f})">${inner}</g>`;

/** A small filled circle with a tick. */
export const tick = (x, y, r, fill, stroke = C.white) =>
  circ(x, y, r, fill) + `<polyline points="${x - r * 0.45},${y + r * 0.02} ${x - r * 0.1},${y + r * 0.36} ${x + r * 0.5},${y - r * 0.34}" fill="none" stroke="${stroke}" stroke-width="${Math.max(2, r * 0.22)}" stroke-linecap="round" stroke-linejoin="round"/>`;
export const warn = (x, y, r, fill = C.accent, ink = C.navy) =>
  circ(x, y, r, fill) + rect(x - r * 0.08, y - r * 0.5, r * 0.16, r * 0.62, ink, `rx="${r * 0.06}"`) + circ(x, y + r * 0.46, r * 0.11, ink);
export const arrow = (x1, y, x2, color, w = 6, head = 16) => line(x1, y, x2 - head, y, color, w, 'stroke-linecap="round"') + `<path d="M${x2 - head * 1.5},${y - head} L${x2},${y} L${x2 - head * 1.5},${y + head} Z" fill="${color}" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>`;
export const darr = (x, y1, y2, color, w = 6, head = 16) => line(x, y1, x, y2 - head, color, w, 'stroke-linecap="round"') + `<path d="M${x - head},${y2 - head * 1.5} L${x},${y2} L${x + head},${y2 - head * 1.5} Z" fill="${color}" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>`;

/** Database cylinder, top-left (x, y). */
export function cylinder(x, y, w, h, body, top, label, labelFill = C.onNavy, size = 28) {
  const ry = h * 0.14;
  return g(
    `<path d="M${x},${y + ry} v${h - 2 * ry} a${w / 2},${ry} 0 0 0 ${w},0 v${-(h - 2 * ry)}" fill="${body}"/>`,
    `<ellipse cx="${x + w / 2}" cy="${y + ry}" rx="${w / 2}" ry="${ry}" fill="${top}"/>`,
    `<path d="M${x},${y + h * 0.45} a${w / 2},${ry} 0 0 0 ${w},0" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="3"/>`,
    label ? text(x + w / 2, y + h * 0.78, label, labelFill, size, 800, 'text-anchor="middle"') : "",
  );
}

// ── People ───────────────────────────────────────────────────────────────────
function hairBack(style, x, y, r, hair) {
  if (style === "long") return `<path d="M${x - r * 1.08},${y - r * 0.1} C${x - r * 1.3},${y + r * 1.9} ${x - r * 0.6},${y + r * 2.6} ${x},${y + r * 2.5} C${x + r * 0.6},${y + r * 2.6} ${x + r * 1.3},${y + r * 1.9} ${x + r * 1.08},${y - r * 0.1} Z" fill="${hair}"/>`;
  if (style === "bun") return circ(x, y - r * 1.15, r * 0.42, hair);
  if (style === "curly") return [[-0.95, -0.2], [-1.05, 0.45], [0.95, -0.2], [1.05, 0.45], [-0.55, -0.85], [0.55, -0.85], [0, -1.05]].map(([dx, dy]) => circ(x + dx * r, y + dy * r, r * 0.42, hair)).join("");
  return "";
}
function hairFront(style, x, y, r, hair) {
  if (style === "bald") return "";
  if (style === "curly") return `<path d="M${x - r},${y - r * 0.1} A${r},${r} 0 0 1 ${x + r},${y - r * 0.1} Q${x},${y - r * 0.5} ${x - r},${y - r * 0.1} Z" fill="${hair}"/>`;
  if (style === "long") return `<path d="M${x - r * 1.04},${y + r * 0.2} A${r * 1.04},${r * 1.1} 0 0 1 ${x + r * 1.04},${y + r * 0.2} Q${x + r * 0.55},${y - r * 0.45} ${x - r * 0.15},${y - r * 0.5} Q${x - r * 0.75},${y - r * 0.35} ${x - r * 1.04},${y + r * 0.2} Z" fill="${hair}"/>`;
  return `<path d="M${x - r * 1.02},${y + r * 0.1} A${r * 1.02},${r * 1.05} 0 0 1 ${x + r * 1.02},${y + r * 0.1} Q${x + r * 0.7},${y - r * 0.55} ${x},${y - r * 0.5} Q${x - r * 0.6},${y - r * 0.5} ${x - r * 1.02},${y + r * 0.1} Z" fill="${hair}"/>`;
}

/**
 * A person from the chest up, head centre (x, y). `view` front shows a face; back shows hair only.
 * Torso runs 170·s below the head so a desk or a clip edge can hide the bottom.
 */
export function person(x, y, s, o = {}) {
  const { len = 190, shirt = C.navy7, skin = SKIN[0], hair = HAIR[0], style = "short", view = "front", collar = true, glasses = false, lanyard = false } = o;
  const r = 32 * s;
  const top = y + r * 1.3;
  const sh = grad([[0, shirt], [1, shirt]], "v");
  const shirtGrad = grad([[0, shirt], [1, C.navy, 0.35]], "v");
  const torso = `<path d="M${x - 78 * s},${top + len * s} V${top + 62 * s} Q${x - 78 * s},${top + 8 * s} ${x - 30 * s},${top - 2 * s} L${x + 30 * s},${top - 2 * s} Q${x + 78 * s},${top + 8 * s} ${x + 78 * s},${top + 62 * s} V${top + len * s} Z" fill="${sh}"/><path d="M${x - 78 * s},${top + len * s} V${top + 62 * s} Q${x - 78 * s},${top + 8 * s} ${x - 30 * s},${top - 2 * s} L${x + 30 * s},${top - 2 * s} Q${x + 78 * s},${top + 8 * s} ${x + 78 * s},${top + 62 * s} V${top + len * s} Z" fill="${shirtGrad}"/>`;
  const neck = `<path d="M${x - 13 * s},${y + r * 0.6} h${26 * s} v${r * 0.95} q${-13 * s},${14 * s} ${-26 * s},0 Z" fill="${skin}"/><path d="M${x - 13 * s},${y + r * 0.9} h${26 * s} v${r * 0.35} q${-13 * s},${10 * s} ${-26 * s},0 Z" fill="rgba(0,0,0,0.14)"/>`;
  const collarSvg = collar && view === "front" ? `<path d="M${x - 22 * s},${top - 2 * s} L${x},${top + 30 * s} L${x + 22 * s},${top - 2 * s} Z" fill="${skin}"/><path d="M${x - 24 * s},${top - 3 * s} L${x},${top + 34 * s} L${x - 36 * s},${top + 14 * s} Z M${x + 24 * s},${top - 3 * s} L${x},${top + 34 * s} L${x + 36 * s},${top + 14 * s} Z" fill="rgba(255,255,255,0.18)"/>` : "";
  const ears = circ(x - r * 0.98, y + r * 0.1, r * 0.2, skin) + circ(x + r * 0.98, y + r * 0.1, r * 0.2, skin);
  const headG = grad([[0, skin], [1, skin]], "v");
  const head = `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.1}" fill="${headG}"/>`;
  const face = view === "front"
    ? g(
      circ(x - r * 0.38, y + r * 0.08, r * 0.075, C.ink), circ(x + r * 0.38, y + r * 0.08, r * 0.075, C.ink),
      `<path d="M${x - r * 0.52},${y - r * 0.18} q${r * 0.14},${-r * 0.1} ${r * 0.28},0 M${x + r * 0.24},${y - r * 0.18} q${r * 0.14},${-r * 0.1} ${r * 0.28},0" fill="none" stroke="${hair}" stroke-width="${Math.max(2, r * 0.07)}" stroke-linecap="round"/>`,
      `<path d="M${x - r * 0.3},${y + r * 0.46} q${r * 0.3},${r * 0.26} ${r * 0.6},0" fill="none" stroke="${C.ink}" stroke-width="${Math.max(2, r * 0.07)}" stroke-linecap="round" opacity="0.75"/>`,
      circ(x - r * 0.62, y + r * 0.36, r * 0.14, "rgba(220,100,90,0.22)"), circ(x + r * 0.62, y + r * 0.36, r * 0.14, "rgba(220,100,90,0.22)"),
      glasses ? `<g fill="none" stroke="${C.ink}" stroke-width="${Math.max(2, r * 0.07)}"><circle cx="${x - r * 0.38}" cy="${y + r * 0.08}" r="${r * 0.24}"/><circle cx="${x + r * 0.38}" cy="${y + r * 0.08}" r="${r * 0.24}"/><line x1="${x - r * 0.14}" y1="${y + r * 0.08}" x2="${x + r * 0.14}" y2="${y + r * 0.08}"/></g>` : "",
    )
    : "";
  const backHair = view === "back" ? `<ellipse cx="${x}" cy="${y - r * 0.02}" rx="${r * 1.02}" ry="${r * 1.12}" fill="${hair}"/>` : "";
  const lan = lanyard ? `<path d="M${x - 22 * s},${top - 2 * s} L${x - 4 * s},${top + 90 * s} M${x + 22 * s},${top - 2 * s} L${x + 4 * s},${top + 90 * s}" stroke="${C.accent}" stroke-width="${4 * s}" fill="none"/>${rr(x - 16 * s, top + 88 * s, 32 * s, 40 * s, 4 * s, C.white)}` : "";
  return g(hairBack(style, x, y, r, hair), torso, neck, ears, head, view === "back" ? backHair : hairFront(style, x, y, r, hair), collarSvg, face, lan);
}

/** An arm from the shoulder (x1, y1) to a hand at (x2, y2), bent through an elbow (ex, ey). */
export function arm(x1, y1, ex, ey, x2, y2, sleeve, skin, w = 26) {
  return g(
    `<polyline points="${x1},${y1} ${ex},${ey}" fill="none" stroke="${sleeve}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<polyline points="${ex},${ey} ${x2},${y2}" fill="none" stroke="${sleeve}" stroke-width="${w * 0.9}" stroke-linecap="round" stroke-linejoin="round"/>`,
    circ(x2, y2, w * 0.5, skin),
  );
}

/** Laptop seen from behind, bottom-centre (x, y). */
export function laptopBack(x, y, s, lid = C.navy7, mark = C.accent) {
  const w = 150 * s, h = 98 * s;
  return g(
    rr(x - w / 2, y - h, w, h, 6 * s, lid),
    rr(x - w / 2, y - h, w, h * 0.12, 6 * s, "rgba(255,255,255,0.12)"),
    rr(x - 12 * s, y - h * 0.55, 24 * s, 24 * s, 5 * s, mark),
    rr(x - w / 2 - 12 * s, y, w + 24 * s, 9 * s, 4 * s, C.strong),
  );
}
/** Laptop seen from the front with a screen showing `screen`. */
export function laptopFront(x, y, w, h, screen) {
  return g(
    shadow(rr(x - w / 2, y - h, w, h, 8, C.navy)),
    rr(x - w / 2 + 8, y - h + 8, w - 16, h - 16, 3, C.white),
    screen,
    path(`M${x - w / 2 - 28},${y} h${w + 56} l-14,12 h${-(w + 28)} Z`, C.strong),
  );
}
export const plant = (x, y, s = 1, pot = C.accent) => g(
  `<path d="M${x - 36 * s},${y} h${72 * s} l-8 ${70 * s} h${-56 * s} Z" fill="${pot}"/>`,
  ...[[-50, -90, -25], [0, -140, 0], [48, -100, 28], [-24, -70, -12], [26, -64, 14]].map(([dx, dy, rot]) =>
    `<ellipse cx="${x + dx * s}" cy="${y + dy * s}" rx="${20 * s}" ry="${58 * s}" transform="rotate(${rot} ${x + dx * s} ${y + dy * s})" fill="${C.green}"/><ellipse cx="${x + dx * s}" cy="${y + dy * s}" rx="${6 * s}" ry="${50 * s}" transform="rotate(${rot} ${x + dx * s} ${y + dy * s})" fill="rgba(255,255,255,0.18)"/>`),
);
export const sticky = (x, y, s, fill, rot = 0, lines = 3) => `<g transform="rotate(${rot} ${x} ${y})">${rect(x, y, 70 * s, 70 * s, fill, 'filter="url(#sh2)"')}${Array.from({ length: lines }, (_, i) => rect(x + 10 * s, y + 14 * s + i * 16 * s, (46 - i * 10) * s, 6 * s, "rgba(15,26,46,0.35)")).join("")}</g>`;

export const windowChrome = (x, y, w, h, title, { bar = C.navy, ink = C.onNavy, r = 14 } = {}) => g(
  shadow(rr(x, y, w, h, r, C.white)),
  `<path d="M${x},${y + 56} V${y + r} a${r},${r} 0 0 1 ${r},${-r} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r} V${y + 56} Z" fill="${bar}"/>`,
  ...[0, 1, 2].map((i) => circ(x + 30 + i * 24, y + 28, 7, i === 0 ? C.accent : "rgba(255,255,255,0.35)")),
  title ? text(x + 130, y + 36, title, ink, 20, 700) : "",
);
