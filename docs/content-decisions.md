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
| C1 | Footer (every page), Organization data for search engines | Company Identification Number (CIN) | Not published | Founder / finance | U62099KA2026PTC222039 (Nov 2026). Shown in the footer, the Privacy Policy and the Organization data | Done |
| C2 | About → "Our story" | Year founded | Not published | Founder | 2021 (Texiri Profile 2026), as Texiri Solutions LLP. It was converted to Texiri Solutions Private Limited in August 2026 (the CIN, C1), so About says "Founded 2021 as Texiri Solutions LLP · Converted to Texiri Solutions Private Limited in August 2026" (Nov 2026) | Done |
| C3 | Footer, Legal pages, Organization data | Confirm the legal name | Texiri Solutions Private Limited | Founder | Texiri Solutions Private Limited (formerly Texiri Solutions LLP; converted August 2026) | Done |
| C4 | Contact, footer (About shows only the two towns) | Confirm both office addresses are still current | Vijayapura: 1st Floor, Toravi building, Anand Nagar, Ashram Road, Opp. BLDE Engineering College, Vijayapura, Karnataka 586103. Navi Mumbai: CG Parivar House, EL-86, T.T.C Industrial Area, MIDC Mahape, Navi Mumbai, Maharashtra 400701 | Founder | Both current, as shown (Nov 2026) | Done |
| C5 | Footer, Contact | Confirm the phone, email and hours | +91 79753 05499 · info@texiri.com · Mon–Fri 9am–7pm IST | Founder | All correct, as shown (Nov 2026) | Done |
| C6 | Credibility strip (Home, About), About story | Are the 2Klicks tools **patented**? If so, the patent numbers or "patent pending". The old site only says the founder "holds multiple patents and copyrights". | Not stated for 2Klicks | Founder | Call them **proprietary**, not patented (review, Oct 2026) | Done |

## 2. Proof: metrics, case studies, client names

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | Home → case study cards | Utility, Australia: the real metric for "fewer load defects across mock cycles" | None | Founder / delivery lead | Replaced with a profile fact: "4 SAP areas migrated, with operations running throughout" | Done |
| P2 | Home → case study cards | Retail, USA: the number of records updated with 2Klicks Update | None | Founder / delivery lead | The retail case is now the profile's RE-FX case: "100% IFRS 16-compliant lease accounting" | Done |
| P3 | Home → case study cards | Real estate, USA: weeks from template to first load | None | Founder / delivery lead | Real-estate case dropped (no source); replaced by the profile's oil & gas EAM case | Dropped |
| P4 | `/case-studies/*` | Full case study write-ups, with client approval for each | None | Founder / marketing | Written from the Texiri Profile 2026, clients unnamed as in the profile (`lib/case-studies.ts`). See P8 | Done |
| P5 | Candidate for the Home credibility strip | Should the site show the old-site metrics? Which **4 industries**? | "10 clients served around the world", "USD 1 billion impact created for clients", "4 major industries served" | Founder | Not shown; the credibility strip stays as it is (Nov 2026) | Dropped |
| P6 | Leadership bio | Permission to name past clients | Named on the old Team page | Founder | Client names stay off the site (Nov 2026). The removed sentence, for reference: "He has worked with SAP Labs and global enterprises including Walmart, CVS, Nike, T-Systems, Singtel, Stockland, EQL and Victoria's Secret." | Dropped |
| P8 | `/case-studies/*`, Industries | Confirm the profile's case-study wording (prepared for an SAP partner meeting) can be published on the public site as written | Not published | Founder | Publish as written, clients unnamed (Nov 2026) | Done |
| P7 | Home, SAP, Data Migration → testimonials | Confirm the three original testimonials can still be published (now used word for word) | Published on the old homepage | Founder | All three approved, unnamed as now (Nov 2026) | Done |

## 3. 2Klicks

2Klicks Create and 2Klicks Update were merged into one page, `/2klicks/`, written from the 2Klicks presentation (Nov 2026). The old URLs redirect there. Client logos, support-package terms and the 10Gravity branding in the presentation are deliberately not published.

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| K1 | 2Klicks → "Supported releases & security model" | Supported SAP releases (ECC 6.0 EhPx, S/4HANA versions, cloud/on-premise) | None | 2Klicks product lead | "SAP ECC 6.0 and every SAP S/4HANA edition: on-premise, private cloud and public cloud" (Nov 2026) | Done |
| K2 | Same table | Deployment model (add-on, transport, SaaS?) | None | 2Klicks product lead | Deployment is not described on the site; the Deployment row and the FAQ's transport/installation wording were removed (Nov 2026) | Dropped |
| K3 | Same table | Authorisation model (SAP roles needed) | None | 2Klicks product lead | Not described; the Authorisations row was removed (Nov 2026) | Dropped |
| K4 | Same table | Data handling (does data leave the SAP system?) | None | 2Klicks product lead | "Data stays in your SAP system and the Excel files your users download. Nothing is sent to Texiri or any third party." (Nov 2026) | Done |
| K5 | Same table | Audit trail / validation logs | None | 2Klicks product lead | "Changes are recorded in standard SAP change documents." About → "Data you can verify" reworded to match (no validation-log claim) (Nov 2026) | Done |
| K6 | 2Klicks Create → ROI example | Typical effort per migration program, in person-days | None | 2Klicks product lead | ROI box replaced by the presentation's timeline (100+ days vs day 1) | Dropped |
| K7 | Home → 2Klicks band, 2Klicks hero | Screenshots of the product UI (template screen, upload, validation log) | None | 2Klicks product lead | No screenshot at launch. The mock was removed from the Home 2Klicks band and the 2Klicks hero (Nov 2026) | Dropped |
| K8 | `/2klicks/update/` | Content for the 2Klicks Update page | Old URL `/about/2klicks-update/` | 2Klicks product lead | Merged into `/2klicks/` | Dropped |
| K9 | 2Klicks → capabilities, FAQ, Data Migration | Confirm the module scope: RE-FX (core), FI/CO and PS (MM, PM and SD removed), and the six RE-FX objects listed | None | 2Klicks product lead | Scope confirmed as listed (Nov 2026) | Done |
| K10 | 2Klicks → "Where it runs" | Evidence for "clients in the US, Australia and Europe" and the six industries (property management, retail, public sector, life sciences, manufacturing, wineries) | None | 2Klicks product lead | Confirmed: clients in the US, Australia and Europe, in all six industries (Nov 2026) | Done |

## 4. AI Services

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | AI Services → "Engagement model" | Confirm the durations (workshop 1 day, data readiness 2–3 weeks, prioritisation 1 week, POC 6–8 weeks) | None | AI practice lead | Steps shown without durations; each engagement is scoped with the client (Nov 2026). The "one-day" workshop wording elsewhere is unchanged | Done |
| A2 | `/ai-services/*` sub-pages | Content for Strategy, Generative AI, ML and MLOps pages | None | AI practice lead | No sub-pages: one AI Services page, as with 2Klicks. Menu and footer links go to its sections, and the four sub-page URLs redirect there (Nov 2026) | Dropped |

## 5. TEXIRI AI Community

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| M1 | Community hero (the Home page no longer shows it) | Current member count | None | Community lead | No member count. The tile was removed with the hero photos (M7) (Nov 2026) | Dropped |
| M2 | Community FAQ | Is joining free? Any fees for events or workshops? | None | Community lead | Not decided yet; the "Is it free to join?" question was removed from the FAQ (Nov 2026) | Dropped |
| M3 | Community FAQ, events | Where sessions happen (venue in Vijayapura; online platform) | "Vijayapura AI Club" | Community lead | Online for now. FAQ: "Online for now. In-person sessions in Vijayapura will be announced." The perks, Join page, events page and welcome email were updated to match (Nov 2026) | Done |
| M4 | Community → events (the Home page no longer shows an event) | The next 3 events: title, date and time, format, level | None | Community lead | No event list at launch. "Coming up" now says the next sessions are being planned and members hear first, with a join button (Nov 2026) | Dropped |
| M5 | Community → learning paths | Confirm the curriculum for the Beginner / Intermediate / Advanced paths | None | Community lead | Show the three levels and their one-line descriptions only; topic lists removed until the curriculum is set (Nov 2026) | Done |
| M6 | Community → projects | Up to 3 member projects to showcase (title, member name with consent, screenshot) | None | Community lead | "Built by members" section removed until there are real projects with member consent (Nov 2026) | Dropped |
| M7 | Community hero | Photos (workshop, project demo) with consent from the people shown | None | Community lead | No photos: the Community hero is text only, and the Join page and interim community pages have no image (Nov 2026) | Dropped |
| M8 | Community → "What you get", Resources section | Do the resource library (reading list, session recordings, notebooks, glossary) and mentorship exist? | None | Community lead | Resource library not yet available: the Resources section and the "Resource library" perk were removed; mentorship stays (Nov 2026) | Dropped |

## 6. Careers and Shambhavi 108

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| H1 | Careers → open roles | The live list of open roles | No roles listed | HR | No roles at launch: the page says "No roles listed right now" with a "Send your CV" button. Add live roles to `roles` in `lib/company.ts` (samples in git history, commit 352654d) (Nov 2026) | Done |
| H2 | Careers, role "Apply" buttons | Which inbox receives applications? (`careers@texiri.com` doesn't exist yet) | info@texiri.com | HR | careers@texiri.com (`CAREERS_EMAIL`, Nov 2026). **The mailbox must be created before launch**, or CVs bounce | Done |
| H3 | Careers → "Life at Texiri" | Team photo of the Vijayapura office | None | HR | Keep the placeholder until a real photo arrives (Nov 2026) | Open |
| H4 | Careers → "Life at Texiri" gallery | Five more photos with captions: festival celebrations, birthdays and work anniversaries, team outings, learning sessions, the Navi Mumbai office (edit the list in `lib/gallery.ts`) | None | HR | Keep the five placeholder slots until real photos arrive (Nov 2026) | Open |
| S1 | Shambhavi 108 page | Training duration | None | Programme lead | Not fixed yet; no duration is stated on the page (Nov 2026) | Dropped |
| S2 | Shambhavi 108 page | Format (online, Vijayapura, hybrid) | None | Programme lead | Hybrid: "mostly online, with some sessions at our Vijayapura office" (Nov 2026) | Done |
| S3 | Shambhavi 108 page | Tracks offered | None | Programme lead | SAP only. The summary now says "structured SAP training" and the page says "The training is in SAP" (Nov 2026) | Done |
| S4 | Shambhavi 108 page | Fees (or "free") | None | Programme lead | Not decided; fees are not mentioned (Nov 2026) | Dropped |
| S5 | Shambhavi 108 form | Legal sign-off on asking age, marital status and number of children as **required** questions | Asked on the old form | Legal counsel | Age, marital status and children are now **optional** (marked "(optional)" on the form, blank answers accepted). The consent text and the Privacy Policy say so. Legal counsel should still review asking them at all (Nov 2026) | Done |

## 6b. CSR

`/about/csr/` lists CSR activities and events, each with a photo gallery. It stays hidden on production (footer link, About band, sitemap, search engines) until at least one real event replaces the example slots in `lib/gallery.ts`.

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| CSR1 | `/about/csr/` | For each CSR event: title, date, place, a two- or three-sentence summary (cause, partner organisation, what was achieved) and 2–6 photos with captions | None | HR / founder | Keep as now: the two example slots stay, and the page stays hidden on production until a real event is added (Nov 2026) | Open |
| CSR2 | `/about/csr/` photos | Consent from everyone identifiable in the photos; for children, written consent from a parent or the school | None | HR | Needed with the first real event (CSR1) (Nov 2026) | Open |
| CSR3 | `/about/csr/` hero, About band | Confirm the headline "Giving back where we live and work" and the "Partner with us" invitation | None | Founder | Keep both: "Giving back where we live and work", the "Partner with us" button and the "Working on a community initiative?" banner (Nov 2026) | Done |

## 7. Leadership

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| L1 | About, Leadership | A high-resolution founder portrait. The old-site photo is now used, but it is only 343×444 px | Photo on the old Team page (now in `public/images/team/`) | Founder | Keep the current photo for launch; swap in a sharper portrait (at least 720×900 px, 4:5) when the founder sends one (Nov 2026) | Open |
| L2 | Leadership → "LinkedIn profile" link | The founder's personal LinkedIn URL (currently points to the company page) | Not published | Founder | Muttu: https://www.linkedin.com/in/muttannasarashetti/. Santosh: https://www.linkedin.com/in/santosh-s-angadi/. Both shown as "LinkedIn →" links (Nov 2026) | Done |
| L3 | Leadership | Any other leaders to list? | Only the founder | Founder | Santosh S Angadi, CRO (Texiri Profile 2026) | Done |
| L4 | Leadership, Organization data | Founder's title: the profile says "Founder & MD" on the bio slide and "CEO" on the contact slide. The site uses "Founder & CEO" | Founder & CEO | Founder | "Founder & CEO" everywhere (Nov 2026) | Done |
| L5 | Leadership | A high-resolution photo of Santosh S Angadi | None | Santosh / founder | Supplied photo cropped to 4:5 (430×537), in `public/images/team/santosh-angadi.jpg` | Done |
| L6 | Leadership bio | Founder "holds patented innovations": patent numbers or wording the founder will stand behind. The old site said "holds multiple patents and copyrights" | Same claim, no numbers | Founder | Leave it out of the bio, consistent with C6 (2Klicks is proprietary, not patented) (Nov 2026) | Dropped |

## 8. Legal

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| G1 | `/legal/privacy/` | Lawyer review of the draft Privacy Policy | No policy published | Legal counsel | Values filled in and badges removed (Nov 2026). Still needs a lawyer's review before launch | Open |
| G2 | `/legal/privacy/` | Grievance officer's name and contact (required under India's DPDP Act) | None | Founder / legal | Santosh S Angadi, Chief Revenue Officer, at the main contact email (Nov 2026) | Done |
| G3 | `/legal/privacy/` | Retention periods for enquiries, community members and Shambhavi applications | None | Founder / legal | Enquiries: 24 months after last contact (longer for clients). Community: deleted within 30 days of leaving. Shambhavi: 12 months after the selection decision. Privacy requests answered within 30 days (Nov 2026) | Done |
| G4 | `/legal/cookies/` | Lawyer review of the draft Cookie Policy (update when analytics is added) | No policy published | Legal counsel | Badge removed (Nov 2026). Still needs a lawyer's review; update the policy when analytics is added | Open |
| G5 | `/legal/terms/` | Lawyer review of the draft Terms; confirm the courts of jurisdiction | None | Legal counsel | Courts at Vijayapura, Karnataka (registered office). Badge removed (Nov 2026). Still needs a lawyer's review | Open |

## 9. Photos and screenshots

Every image below is currently an on-brand placeholder illustration with a "PLACEHOLDER IMAGE" badge. Each is listed in `lib/images.ts`. To use the real one: add it under `public/images/`, change its `src`, and delete `placeholder: true`. Photos of people need their consent.

| ID | Where it appears | Image needed | Current placeholder | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| IMG1 | Not shown today: the SAP pages use a lifecycle diagram. Kept as a fallback for interim pages | SAP consultants working with a client team (optional) | `consulting-team.svg` | Marketing | | Open |
| IMG2 | Careers → Life at Texiri | Team photo, Vijayapura office | `team-photo.svg` | HR | | Open |
| IMG3 | About → Our story, Contact → Offices | Photo of the Vijayapura office | `office.svg` | Founder | | Open |
| IMG4 | S/4HANA Data Migration, case studies | Migration diagram or project photo | `data-migration.svg` | Delivery lead | | Open |
| IMG5 | Home → 2Klicks band, 2Klicks | Real 2Klicks screenshot (same as K7) | `2klicks-ui.svg` | 2Klicks product lead | No screenshot at launch (K7); image removed from the site (Nov 2026) | Dropped |
| IMG6 | AI Services, interim AI pages | AI workshop photo | `ai-workshop.svg` | AI practice lead | | Open |
| IMG7 | Community hero, events page | Community workshop photo (same as M7) | `community-workshop.svg` | Community lead | Not needed: no photos on community pages (M7) | Dropped |
| IMG8 | Community hero, Join page, learning paths | Member presenting a project | `community-demo.svg` | Community lead | Not needed: no photos on community pages (M7) | Dropped |
| IMG9 | Community → Built by members | Three member project screenshots (same as M6) | `project-vision.svg`, `project-chatbot.svg`, `project-forecast.svg` | Community lead | Not needed: the project showcase was removed (M6) | Dropped |
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
| X4 | AI Services → "Controls your risk team will ask for", FAQ | Confirm each governance claim: client data never used to train third-party models; EU AI Act, ISO/IEC 42001 and GDPR alignment; region-pinned deployment | None | AI practice lead / legal | All six controls confirmed, including the FAQ answer on training data (Nov 2026) | Done |
| X5 | Home, SAP, Data Migration → testimonials | Permission to add a name, job title or company logo to each testimonial. The three quotes are now used once each (Home: retail, SAP: real estate, Data Migration: utility) | Published without names | Founder | | Open |
| X6 | Main menu, footer, About | Confirm 2Klicks gets its own menu item and that the AI Community sits beside, not under, AI Services | Community was a page under AI | Founder / community lead | | Open |
| X7 | Visual asset brief | Who supplies each photo or screenshot, and by when (see `visual-asset-brief.md`) | None | Marketing | | Open |
| X8 | `/sap/consulting/`, `/sap/btp/` (was `/sap/integration/`), `/sap/managed-services/` | Content for the three SAP service pages | None | Founder / delivery lead | Written from the Texiri Profile 2026; SAP Integration became SAP BTP & Development | Done |
| X9 | `/2klicks/`, `/ai-community/events/`, `/ai-community/learning-paths/` | Content for the 2Klicks overview, Community events and Community learning-path pages (now short interim pages) | None | 2Klicks product lead / community lead | 2Klicks: full page written from the 2Klicks presentation. Community pages still interim | Open |
| X11 | Every page's main heading (`--text-display` in `app/globals.css`), Community hero heading | Confirm the smaller headline size: max cut from 5rem to 4rem (Community hero from 5.25rem) so desktop headlines fit 2–3 lines instead of 4–5. If agreed, update `Design-System.dc.html` and `assets/texiri-theme.css`, which the tokens mirror (not in this repo) | None | Founder / design owner | | Open |
| X10 | Home, 2Klicks, SAP, Data Migration, Managed Services, mega-menu, credentials strip | Evidence for "10× faster", "75% lower cost" and "0 programs to develop" (2Klicks presentation; replaced "up to 80% less effort"), "zero data loss at cutover" and "22% of consultants specialise in data migration" (profile) | None | 2Klicks product lead | | Open |
