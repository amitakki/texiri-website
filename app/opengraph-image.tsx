import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { archivo } from "@/lib/og-font";

// Default share image for every page (pages can add their own opengraph-image to override).
export const alt = "Texiri Solutions — SAP consulting, S/4HANA data migration and 2Klicks tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the @theme tokens in app/globals.css (CSS variables aren't available to ImageResponse).
const navy = "#0f1a2e", navy700 = "#243553", onNavy = "#f5f4f1", onNavyMuted = "#aeb8c8", accent = "#f7941d", ai = "#2bb5e8";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/texiri-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const fonts = [...(await archivo(600)), ...(await archivo(800))];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: navy, padding: "72px 80px", color: onNavy, fontFamily: "Archivo" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={270} height={100} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: accent }}>SAP consulting, founder-led</div>
          <div style={{ marginTop: 18, fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>Implement SAP. Migrate to S/4HANA. Run it well.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `3px solid ${navy700}`, paddingTop: 28, fontSize: 28, fontWeight: 600, color: onNavyMuted }}>
          <div style={{ display: "flex" }}>2Klicks migration tools · AI Services · TEXIRI AI Community</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 22, height: 22, background: accent }} />
            <div style={{ width: 22, height: 22, background: ai }} />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
