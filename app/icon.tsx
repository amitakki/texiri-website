import { ImageResponse } from "next/og";
import { archivo } from "@/lib/og-font";
import { BrandMark } from "@/components/BrandMark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<BrandMark px={size.width} />, { ...size, fonts: await archivo(800) });
}
