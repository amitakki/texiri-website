/**
 * Archivo (the site font) for ImageResponse images, fetched from Google Fonts at build time,
 * the same source next/font uses. Falls back to the default font if the fetch fails.
 */
export async function archivo(weight: 600 | 800): Promise<{ name: string; data: ArrayBuffer; weight: 600 | 800; style: "normal" }[]> {
  try {
    // Without a modern browser user agent, the CSS API serves TTF, which ImageResponse needs.
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return [];
    return [{ name: "Archivo", data: await (await fetch(url)).arrayBuffer(), weight, style: "normal" }];
  } catch {
    return [];
  }
}
