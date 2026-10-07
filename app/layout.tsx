import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL, organizationJsonLd } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font — no layout shift, no third-party request.
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Texiri Solutions — SAP Consulting & S/4HANA Migration", template: "%s | Texiri Solutions" },
  description: "Founder-led SAP consultancy: SAP implementation, S/4HANA data migration, integration and managed services, with 2Klicks migration tools.",
  openGraph: { siteName: "Texiri Solutions", type: "website", images: ["/og/default.png"] },
  twitter: { card: "summary_large_image" },
  generator: null,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={archivo.variable}>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
