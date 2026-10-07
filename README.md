# Texiri Solutions — website (Next.js)

Production code matching the HTML design files in the project root (`Design-System.dc.html`, `Home.dc.html`, `Data-and-AI.dc.html`, `SAP-AI-Hub.dc.html`, `SAP-Data-Migration.dc.html`, `2Klicks-Create.dc.html`).

**Status: steps 1–6 of 10.** Tokens for three verticals (corporate, AI Services, AI Community), layout shell with per-vertical header CTA, Home, `/sap/`, `/sap/data-migration/`, `/2klicks/create/`, `/ai-services/`, `/ai-community/`, `/ai-community/join/`, the business enquiry form and the separate community join form, plus the 301 redirect map in `next.config.ts`. `/ai-community/` sits under the AI Services menu. CMS, SEO layer, consent, analytics and deployment come in steps 7–10.

## Stack
Next.js 15 (App Router, RSC, SSG) · TypeScript strict · Tailwind CSS v4 (tokens in `app/globals.css` `@theme`) · lucide-react · next/font (Archivo, self-hosted) · Zod · Cloudflare Turnstile.

## Structure
```
app/
  layout.tsx            header, footer, skip link, Organization JSON-LD
  globals.css           design tokens — the single source of truth
  page.tsx              Home
  ai/page.tsx           Data & AI
  sap-ai/page.tsx       SAP + AI hub
  sap/data-migration/   S/4HANA Data Migration & MDG
  2klicks/create/       2Klicks Create (+ demo form)
  actions/enquiry.ts    Server Action: validate → Turnstile → CRM/email (stubbed)
components/
  ui.tsx                Button, Kicker, Placeholder, PilotLabel, Section, H2, ImagePlaceholder
  sections.tsx          Breadcrumbs, Hero, CredibilityStrip, NumberedGrid, CheckList,
                        TestimonialCard, CaseStudyCard, FAQAccordion, CTABand, StickyMobileCTA
  diagrams.tsx          HeroDiagram, ReferenceArchitecture (semantic HTML, no raster)
  SiteHeader.tsx        mega-menu + mobile drawer (client)
  SiteFooter.tsx
  EnquiryForm.tsx       pathway form (client), shared Zod schema
lib/
  site.ts               nav, contact, Organization JSON-LD
  enquiry.ts            Zod schema + enquiry types
```

## Setup
```bash
pnpm install
cp .env.example .env.local
pnpm dev
```
Copy `assets/texiri-logo.png` from the design project to `public/texiri-logo.png`. Add `@/*` → `./*` to `tsconfig.json` paths.

## Environment variables
| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, e.g. https://www.texiri.com |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile |
| `CRM_PROVIDER` | `hubspot` or `zoho` (step 7) |
| `RESEND_API_KEY`, `LEAD_NOTIFY_TO` | Email notification (step 7) |

## Design rules carried into code
- Radius 0 everywhere; 2px section rules; labels flush left, including buttons.
- Orange (`accent`) is a fill only; small accent text uses `accent-700`; button labels on orange are navy.
- Every unverified claim uses `<Placeholder>` — search the codebase for `TO VERIFY`, `TO CONFIRM` and `CLIENT APPROVAL NEEDED` before launch.
- Pilots always carry `<PilotLabel>`; never present them as delivered work.
- One `<h1>` per page.
