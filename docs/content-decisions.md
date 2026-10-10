# Content decisions tracker

This file lists every piece of website content that still needs a decision. Each row says what's needed, what the old site (www.texiri.com) says (if anything), and who should decide. Until an item is resolved, the site shows a dashed orange **placeholder badge** where it appears.

**How to use it**
1. Work through the rows with the owner named in each one.
2. When a value is agreed, write it in the **Decision** column and set the status to `Agreed`.
3. A developer updates the code and removes the badge, then sets the status to `Done`.
4. Before launch, run `npm run placeholders` to list any badges still in the code.

**Statuses:** `Open` · `Agreed` (value decided, not yet in code) · `Done` · `Dropped` (content removed instead)

---

## 1. Company

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | Footer (every page), Organization data for search engines | Company Identification Number (CIN) | Not published | Founder / finance | | Open |
| C2 | About → "Our story" | Year founded | Not published | Founder | | Open |
| C3 | Footer, Contact, About | Confirm the legal name **Texiri Solutions Private Limited** | Texiri Solutions Private Limited | Founder | | Open |
| C4 | Contact, About, footer | Confirm both office addresses are still current | Vijayapura: 1st Floor, Toravi building, Anand Nagar, Ashram Road, Opp. BLDE Engineering College, Vijayapura, Karnataka 586103. Navi Mumbai: CG Parivar House, EL-86, T.T.C Industrial Area, MIDC Mahape, Navi Mumbai, Maharashtra 400701 | Founder | | Open |
| C5 | Footer, Contact | Confirm the phone, email and hours | +91 79753 05499 · info@texiri.com · Mon–Fri 9am–7pm IST | Founder | | Open |
| C6 | Credibility strip (Home, About), About story | Are the 2Klicks tools **patented**? If so, the patent numbers or "patent pending". The old site only says the founder "holds multiple patents and copyrights". | Not stated for 2Klicks | Founder | | Open |

## 2. Proof: metrics, case studies, client names

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | Home → case study cards | Utility, Australia: the real metric for "fewer load defects across mock cycles" | None | Founder / delivery lead | | Open |
| P2 | Home → case study cards | Retail, USA: the number of records updated with 2Klicks Update | None | Founder / delivery lead | | Open |
| P3 | Home → case study cards | Real estate, USA: weeks from template to first load | None | Founder / delivery lead | | Open |
| P4 | `/case-studies/*` | Full case study write-ups, with client approval for each | None | Founder / marketing | | Open |
| P5 | Candidate for the Home credibility strip | Should the site show the old-site metrics? Which **4 industries**? | "10 clients served around the world", "USD 1 billion impact created for clients", "4 major industries served" | Founder | | Open |
| P6 | Leadership bio | Permission to name past clients (Walmart, CVS, T-Systems, Singtel, Stockland, EQL) | Named on the old Team page | Founder | | Open |
| P7 | Home, SAP, Data Migration → testimonials | Confirm the three original testimonials can still be published (now used word for word) | Published on the old homepage | Founder | | Open |

## 3. 2Klicks

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| K1 | 2Klicks Create → "Supported releases & security model" | Supported SAP releases (ECC 6.0 EhPx, S/4HANA versions, cloud/on-premise) | None | 2Klicks product lead | | Open |
| K2 | Same table | Deployment model (add-on, transport, SaaS?) | None | 2Klicks product lead | | Open |
| K3 | Same table | Authorisation model (SAP roles needed) | None | 2Klicks product lead | | Open |
| K4 | Same table | Data handling (does data leave the SAP system?) | None | 2Klicks product lead | | Open |
| K5 | Same table | Audit trail / validation logs | None | 2Klicks product lead | | Open |
| K6 | 2Klicks Create → ROI example | Typical effort per migration program, in person-days | None | 2Klicks product lead | | Open |
| K7 | Home → 2Klicks band, 2Klicks Create hero | Screenshots of the product UI (template screen, upload, validation log) | None | 2Klicks product lead | | Open |
| K8 | `/2klicks/update/` | Content for the 2Klicks Update page | Old URL `/about/2klicks-update/` | 2Klicks product lead | | Open |

## 4. AI Services

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | AI Services → "Engagement model" | Confirm the durations (workshop 1 day, data readiness 2–3 weeks, prioritisation 1 week, POC 6–8 weeks) | None | AI practice lead | | Open |
| A2 | `/ai-services/*` sub-pages | Content for Strategy, Generative AI, ML and MLOps pages | None | AI practice lead | | Open |

## 5. TEXIRI AI Community

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| M1 | Home → Community band, Community hero | Current member count | None | Community lead | | Open |
| M2 | Community FAQ | Is joining free? Any fees for events or workshops? | None | Community lead | | Open |
| M3 | Community FAQ, events | Where sessions happen (venue in Vijayapura; online platform) | "Vijayapura AI Club" | Community lead | | Open |
| M4 | Home, Community → events | The next 3 events: title, date and time, format, level | None | Community lead | | Open |
| M5 | Community → learning paths | Confirm the curriculum for the Beginner / Intermediate / Advanced paths | None | Community lead | | Open |
| M6 | Community → projects | Up to 3 member projects to showcase (title, member name with consent, screenshot) | None | Community lead | | Open |
| M7 | Community hero | Photos (workshop, project demo) with consent from the people shown | None | Community lead | | Open |

## 6. Careers and Shambhavi 108

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| H1 | Careers → open roles | The live list of open roles (the 5 shown are samples) | No roles listed | HR | | Open |
| H2 | Careers, role "Apply" buttons | Which inbox receives applications? (`careers@texiri.com` doesn't exist yet) | info@texiri.com | HR | | Open |
| H3 | Careers → "Life at Texiri" | Team photo of the Vijayapura office | None | HR | | Open |
| S1 | Shambhavi 108 page | Training duration | None | Programme lead | | Open |
| S2 | Shambhavi 108 page | Format (online, Vijayapura, hybrid) | None | Programme lead | | Open |
| S3 | Shambhavi 108 page | Tracks offered | None | Programme lead | | Open |
| S4 | Shambhavi 108 page | Fees (or "free") | None | Programme lead | | Open |
| S5 | Shambhavi 108 form | Legal sign-off on asking age, marital status and number of children as **required** questions | Asked on the old form | Legal counsel | | Open |

## 7. Leadership

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| L1 | About, Leadership | Founder portrait photo | Photo on the old Team page | Founder | | Open |
| L2 | Leadership → "LinkedIn profile" link | The founder's personal LinkedIn URL (currently points to the company page) | Not published | Founder | | Open |
| L3 | Leadership | Any other leaders to list? | Only the founder | Founder | | Open |

## 8. Legal

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| G1 | `/legal/privacy/` | Lawyer review of the draft Privacy Policy | No policy published | Legal counsel | | Open |
| G2 | `/legal/privacy/` | Grievance officer's name and contact (required under India's DPDP Act) | None | Founder / legal | | Open |
| G3 | `/legal/privacy/` | Retention periods for enquiries, community members and Shambhavi applications | None | Founder / legal | | Open |
| G4 | `/legal/cookies/` | Lawyer review of the draft Cookie Policy (update when analytics is added) | No policy published | Legal counsel | | Open |
| G5 | `/legal/terms/` | Lawyer review of the draft Terms; confirm the courts of jurisdiction | None | Legal counsel | | Open |

## 9. Insights and industries

| ID | Where it appears | What's needed | Old-site value | Owner | Decision | Status |
| --- | --- | --- | --- | --- | --- | --- |
| I1 | `/insights/*` | The three launch articles (ECC 2027, RE-FX after go-live, first AI use case) | None | Marketing / authors | | Open |
| I2 | `/industries/*` | Content for the Real Estate, Utilities and Retail pages | Old site mentions "4 major industries" | Marketing | | Open |
| I3 | Home → insights cards | Article illustrations | None | Marketing | | Open |
