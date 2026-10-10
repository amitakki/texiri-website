/** Square brand mark for generated icons: orange T on navy, with the logo's blue square. Colours mirror the @theme tokens. */
export function BrandMark({ px }: { px: number }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f1a2e", position: "relative", fontFamily: "Archivo" }}>
      <div style={{ display: "flex", fontSize: px * 0.78, fontWeight: 800, lineHeight: 1, color: "#f7941d", marginTop: px * 0.04 }}>T</div>
      <div style={{ position: "absolute", top: px * 0.12, right: px * 0.12, width: px * 0.18, height: px * 0.18, background: "#2bb5e8" }} />
    </div>
  );
}
