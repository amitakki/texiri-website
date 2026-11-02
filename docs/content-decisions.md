# Content decisions tracker

This file lists every piece of website content that still needs a decision. Each row says what's needed, what the old site (www.texiri.com) says (if anything), and who should decide. Until an item is resolved, the site shows a dashed orange **placeholder badge** where it appears.

**How to use it**
1. Work through the rows with the owner named in each one.
2. When a value is agreed, write it in the **Decision** column and set the status to `Agreed`.
3. A developer updates the code and removes the badge, then sets the status to `Done`.
4. Before launch, run `npm run placeholders` to list any badges still in the code.
5. When a stub page gets its real content, mark it `ready: true` in `lib/pages.ts`. On the production deployment only ready pages appear in menus, the footer, home-page cards and diagram links, and only ready pages are indexed and listed in the sitemap.

**Statuses:** `Open` · `Agreed` (value decided, not yet in code) · `Done` · `Dropped` (content removed instead)

---

## 1. Company

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | Footer (every page), Organization data for search engines | Company Identification Number (CIN) | Not published | Founder / finance | | Open |
| C2 | About → "Our story" | Year founded | Not published | Founder | 2021 (Texiri Profile 2026) | Done |
| C3 | Footer, Legal pages, Organization data | Confirm the legal name | Texiri Solutions Private Limited | Founder | Texiri Solutions Private Limited | Done |
| C4 | Contact, footer (About shows only the two towns) | Confirm both office addresses are still current | Vijayapura: 1st Floor, Toravi building, Anand Nagar, Ashram Road, Opp. BLDE Engineering College, Vijayapura, Karnataka 586103. Navi Mumbai: CG Parivar House, EL-86, T.T.C Industrial Area, MIDC Mahape, Navi Mumbai, Maharashtra 400701 | Founder | | Open |
| C5 | Footer, Contact | Confirm the phone, email and hours | +91 79753 05499 · info@texiri.com · Mon–Fri 9am–7pm IST | Founder | | Open |
| C6 | Credibility strip (Home, About), About story | Are the 2Klicks tools **patented**? If so, the patent numbers or "patent pending". The old site only says the founder "holds multiple patents and copyrights". | Not stated for 2Klicks | Founder | Call them **proprietary**, not patented (review, Oct 2026) | Done |

## 2. Proof: metrics, case studies, client names

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | Home → case study cards | Utility, Australia: the real metric for "fewer load defects across mock cycles" | None | Founder / delivery lead | Replaced with a profile fact: "4 SAP areas migrated, with operations running throughout" | Done |
| P2 | Home → case study cards | Retail, USA: the number of records updated with 2Klicks Update | None | Founder / delivery lead | The retail case is now the profile's RE-FX case: "100% IFRS 16-compliant lease accounting" | Done |
| P3 | Home → case study cards | Real estate, USA: weeks from template to first load | None | Founder / delivery lead | Real-estate case dropped (no source); replaced by the profile's oil & gas EAM case | Dropped |
| P4 | `/case-studies/*` | Full case study write-ups, with client approval for each | None | Founder / marketing | Written from the Texiri Profile 2026, clients unnamed as in the profile (`lib/case-studies.ts`). See P8 | Done |
| P5 | Candidate for the Home credibility strip | Should the site show the old-site metrics? Which **4 industries**? | "10 clients served around the world", "USD 1 billion impact created for clients", "4 major industries served" | Founder | | Open |
| P6 | Leadership bio | Permission to name past clients | Named on the old Team page | Founder | **Removed from the page for now.** Text to restore once agreed: "He has worked with SAP Labs and global enterprises including Walmart, CVS, Nike, T-Systems, Singtel, Stockland, EQL and Victoria's Secret." Note: the old Team page did not list Nike or Victoria's Secret | Open |
| P8 | `/case-studies/*`, Industries | Confirm the profile's case-study wording (prepared for an SAP partner meeting) can be published on the public site as written | Not published | Founder | | Open |
| P7 | Home, SAP, Data Migration → testimonials | Confirm the three original testimonials can still be published (now used word for word) | Published on the old homepage | Founder | | Open |

## 3. 2Klicks

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
2Klicks Create and 2Klicks Update were merged into one page, `/2klicks/`, written from the 2Klicks presentation (Nov 2026). The old URLs redirect there. Client logos, support-package terms and the 10Gravity branding in the presentation are deliberately not published.

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| K1 | 2Klicks → "Supported releases & security model" | Supported SAP releases (ECC 6.0 EhPx, S/4HANA versions, cloud/on-premise) | None | 2Klicks product lead | | Open |
| K2 | Same table | Deployment model (add-on, transport, SaaS?) | None | 2Klicks product lead | "Add-on that runs inside your SAP system" (2Klicks presentation). Confirm the wording | Agreed |
| K3 | Same table | Authorisation model (SAP roles needed) | None | 2Klicks product lead | | Open |
| K4 | Same table | Data handling (does data leave the SAP system?) | None | 2Klicks product lead | | Open |
| K5 | Same table | Audit trail / validation logs | None | 2Klicks product lead | | Open |
| K6 | 2Klicks Create → ROI example | Typical effort per migration program, in person-days | None | 2Klicks product lead | ROI box replaced by the presentation's timeline (100+ days vs day 1) | Dropped |
| K7 | Home → 2Klicks band, 2Klicks hero | Screenshots of the product UI (template screen, upload, validation log) | None | 2Klicks product lead | | Open |
| K8 | `/2klicks/update/` | Content for the 2Klicks Update page | Old URL `/about/2klicks-update/` | 2Klicks product lead | Merged into `/2klicks/` | Dropped |
| K9 | 2Klicks → capabilities, FAQ, Data Migration | Confirm the module scope: RE-FX (core), FI/CO and PS (MM, PM and SD removed), and the six RE-FX objects listed | None | 2Klicks product lead | | Open |
| K10 | 2Klicks → "Where it runs" | Evidence for "clients in the US, Australia and Europe" and the six industries (property management, retail, public sector, life sciences, manufacturing, wineries) | None | 2Klicks product lead | From the 2Klicks presentation | Open |

## 4. AI Services

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | AI Services → "Engagement model" | Confirm the durations (workshop 1 day, data readiness 2–3 weeks, prioritisation 1 week, POC 6–8 weeks) | None | AI practice lead | | Open |
| A2 | `/ai-services/*` sub-pages | Content for Strategy, Generative AI, ML and MLOps pages | None | AI practice lead | | Open |

## 5. TEXIRI AI Community

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| M1 | Community hero (the Home page no longer shows it) | Current member count | None | Community lead | | Open |
| M2 | Community FAQ | Is joining free? Any fees for events or workshops? | None | Community lead | | Open |
| M3 | Community FAQ, events | Where sessions happen (venue in Vijayapura; online platform) | "Vijayapura AI Club" | Community lead | | Open |
| M4 | Community → events (the Home page no longer shows an event) | The next 3 events: title, date and time, format, level | None | Community lead | | Open |
| M5 | Community → learning paths | Confirm the curriculum for the Beginner / Intermediate / Advanced paths | None | Community lead | | Open |
| M6 | Community → projects | Up to 3 member projects to showcase (title, member name with consent, screenshot) | None | Community lead | | Open |
| M7 | Community hero | Photos (workshop, project demo) with consent from the people shown | None | Community lead | | Open |

## 6. Careers and Shambhavi 108

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| H1 | Careers → open roles | The live list of open roles | No roles listed | HR | Sample roles removed; the page says "No roles listed right now" until `roles` in `lib/company.ts` is filled (samples are in git history, commit 352654d) | Open |
| H2 | Careers, role "Apply" buttons | Which inbox receives applications? (`careers@texiri.com` doesn't exist yet) | info@texiri.com | HR | Using info@texiri.com for now (`CAREERS_EMAIL`) | Open |
| H3 | Careers → "Life at Texiri" | Team photo of the Vijayapura office | None | HR | | Open |
| H4 | Careers → "Life at Texiri" gallery | Five more photos with captions: festival celebrations, birthdays and work anniversaries, team outings, learning sessions, the Navi Mumbai office (edit the list in `lib/gallery.ts`) | None | HR | | Open |
| S1 | Shambhavi 108 page | Training duration | None | Programme lead | | Open |
| S2 | Shambhavi 108 page | Format (online, Vijayapura, hybrid) | None | Programme lead | | Open |
| S3 | Shambhavi 108 page | Tracks offered | None | Programme lead | | Open |
| S4 | Shambhavi 108 page | Fees (or "free") | None | Programme lead | | Open |
| S5 | Shambhavi 108 form | Legal sign-off on asking age, marital status and number of children as **required** questions | Asked on the old form | Legal counsel | | Open |

## 6b. CSR

`/about/csr/` lists CSR activities and events, each with a photo gallery. It stays hidden on production (footer link, About band, sitemap, search engines) until at least one real event replaces the example slots in `lib/gallery.ts`.

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| CSR1 | `/about/csr/` | For each CSR event: title, date, place, a two- or three-sentence summary (cause, partner organisation, what was achieved) and 2–6 photos with captions | None | HR / founder | | Open |
| CSR2 | `/about/csr/` photos | Consent from everyone identifiable in the photos; for children, written consent from a parent or the school | None | HR | | Open |
| CSR3 | `/about/csr/` hero, About band | Confirm the headline "Giving back where we live and work" and the "Partner with us" invitation | None | Founder | | Open |

## 7. Leadership

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| L1 | About, Leadership | A high-resolution founder portrait. The old-site photo is now used, but it is only 343×444 px | Photo on the old Team page (now in `public/images/team/`) | Founder | | Agreed |
| L2 | Leadership → "LinkedIn profile" link | The founder's personal LinkedIn URL (currently points to the company page) | Not published | Founder | | Open |
| L3 | Leadership | Any other leaders to list? | Only the founder | Founder | Santosh S Angadi, CRO (Texiri Profile 2026) | Done |
| L4 | Leadership, Organization data | Founder's title: the profile says "Founder & MD" on the bio slide and "CEO" on the contact slide. The site uses "Founder & CEO" | Founder & CEO | Founder | | Open |
| L5 | Leadership | A high-resolution photo of Santosh S Angadi (now a placeholder; his photo is in the profile deck) | None | Santosh / founder | | Open |
| L6 | Leadership bio | Founder "holds patented innovations": patent numbers or wording the founder will stand behind. The old site said "holds multiple patents and copyrights" | Same claim, no numbers | Founder | Removed from the bio for now; restore once confirmed | Open |

## 8. Legal

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| G1 | `/legal/privacy/` | Lawyer review of the draft Privacy Policy | No policy published | Legal counsel | | Open |
| G2 | `/legal/privacy/` | Grievance officer's name and contact (required under India's DPDP Act) | None | Founder / legal | | Open |
| G3 | `/legal/privacy/` | Retention periods for enquiries, community members and Shambhavi applications | None | Founder / legal | | Open |
| G4 | `/legal/cookies/` | Lawyer review of the draft Cookie Policy (update when analytics is added) | No policy published | Legal counsel | | Open |
| G5 | `/legal/terms/` | Lawyer review of the draft Terms; confirm the courts of jurisdiction | None | Legal counsel | | Open |

## 9. Photos and screenshots

Every image below is currently an on-brand placeholder illustration with a "PLACEHOLDER IMAGE" badge. Each is listed in `lib/images.ts`. To use the real one: add it under `public/images/`, change its `src`, and delete `placeholder: true`. Photos of people need their consent.

| ID | Where it appears | Image needed | Current placeholder | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| IMG1 | Not shown today: the SAP pages use a lifecycle diagram. Kept as a fallback for interim pages | SAP consultants working with a client team (optional) | `consulting-team.svg` | Marketing | | Open |
| IMG2 | Careers → Life at Texiri | Team photo, Vijayapura office | `team-photo.svg` | HR | | Open |
| IMG3 | About → Our story, Contact → Offices | Photo of the Vijayapura office | `office.svg` | Founder | | Open |
| IMG4 | S/4HANA Data Migration, case studies | Migration diagram or project photo | `data-migration.svg` | Delivery lead | | Open |
| IMG5 | Home → 2Klicks band, 2Klicks | Real 2Klicks screenshot (same as K7) | `2klicks-ui.svg` | 2Klicks product lead | | Open |
| IMG6 | AI Services, interim AI pages | AI workshop photo | `ai-workshop.svg` | AI practice lead | | Open |
| IMG7 | Community hero, events page | Community workshop photo (same as M7) | `community-workshop.svg` | Community lead | | Open |
| IMG8 | Community hero, Join page, learning paths | Member presenting a project | `community-demo.svg` | Community lead | | Open |
| IMG9 | Community → Built by members | Three member project screenshots (same as M6) | `project-vision.svg`, `project-chatbot.svg`, `project-forecast.svg` | Community lead | | Open |
| IMG10 | Home → Latest thinking, Insights pages | Article cover images (same as I3) | `article-ecc-2027.svg`, `article-refx.svg`, `article-first-ai.svg` | Marketing | | Open |
| IMG11 | Shambhavi 108 page, Community page | Photo of programme learners | `learners.svg` | Programme lead | | Open |
| IMG12 | Careers → Life at Texiri gallery | Photos of office life (same as H4) | `life-at-texiri.svg` | HR | | Open |
| IMG13 | `/about/csr/`, About → CSR band | Photos from each CSR event (same as CSR1) | `csr-event.svg` | HR / founder | | Open |

## 10. Insights and industries

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| I1 | `/insights/*` | The three launch articles (ECC 2027, RE-FX after go-live, first AI use case) | None | Marketing / authors | | Open |
| I2 | `/industries/` | Content for the industries | Old site mentions "4 major industries" | Marketing | One page with 7 industries from the Texiri Profile 2026 (`lib/industries.ts`) | Done |
| I4 | `/industries/` | Confirm the 7 industries. The profile's two pharma cards are merged into "Healthcare & Pharmaceuticals", and Oil & Gas is added from its case study | "Supporting 7 Industries" | Founder | | Open |
| I3 | Home → insights cards | Article illustrations | None | Marketing | | Open |

## 11. Claims and structure (added after the UX review)

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| X1 | Home 2Klicks band, 2Klicks Create, Data Migration | Evidence for "skips at least eight programs per object" (what the eight are, and whether it holds for every object) | None | 2Klicks product lead | Replaced by "0 programs to develop" from the 2Klicks presentation (evidence tracked in X10) | Dropped |
| X2 | Contact, every closing banner | Confirm "a senior consultant replies within one business day" is a commitment the team can keep | None | Founder | | Open |
| X3 | 2Klicks demo form | Confirm the demo is a 45-minute session | None | 2Klicks product lead | | Open |
| X4 | AI Services → "Controls your risk team will ask for", FAQ | Confirm each governance claim: client data never used to train third-party models; EU AI Act, ISO/IEC 42001 and GDPR alignment; region-pinned deployment | None | AI practice lead / legal | | Open |
| X5 | Home, SAP, Data Migration → testimonials | Permission to add a name, job title or company logo to each testimonial. The three quotes are now used once each (Home: retail, SAP: real estate, Data Migration: utility) | Published without names | Founder | | Open |
| X6 | Main menu, footer, About | Confirm 2Klicks gets its own menu item and that the AI Community sits beside, not under, AI Services | Community was a page under AI | Founder / community lead | | Open |
| X7 | Visual asset brief | Who supplies each photo or screenshot, and by when (see `visual-asset-brief.md`) | None | Marketing | | Open |
| X8 | `/sap/consulting/`, `/sap/btp/` (was `/sap/integration/`), `/sap/managed-services/` | Content for the three SAP service pages | None | Founder / delivery lead | Written from the Texiri Profile 2026; SAP Integration became SAP BTP & Development | Done |
| X9 | `/2klicks/`, `/ai-community/events/`, `/ai-community/learning-paths/` | Content for the 2Klicks overview, Community events and Community learning-path pages (now short interim pages) | None | 2Klicks product lead / community lead | 2Klicks: full page written from the 2Klicks presentation. Community pages still interim | Open |
| X11 | Every page's main heading (`--text-display` in `app/globals.css`), Community hero heading | Confirm the smaller headline size: max cut from 5rem to 4rem (Community hero from 5.25rem) so desktop headlines fit 2–3 lines instead of 4–5. If agreed, update `Design-System.dc.html` and `assets/texiri-theme.css`, which the tokens mirror (not in this repo) | None | Founder / design owner | | Open |
| X10 | Home, 2Klicks, SAP, Data Migration, Managed Services, mega-menu, credentials strip | Evidence for "10× faster", "75% lower cost" and "0 programs to develop" (2Klicks presentation; replaced "up to 80% less effort"), "zero data loss at cutover" and "22% of consultants specialise in data migration" (profile) | None | 2Klicks product lead | | Open |
