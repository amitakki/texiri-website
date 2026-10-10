import { DEMO_HREF, type Vertical } from "./site";

/**
 * Interim pages for routes the navigation already links to.
 * Rendered by app/[...slug]/page.tsx; replace each with a dedicated page (or CMS content, step 8).
 */
export type InterimPage = {
  title: string;
  kicker: string;
  lead: string;
  vertical?: Vertical;
  crumbs: { label: string; href: string }[];
  points?: { t: string; d: string }[];
  cta?: { label: string; href: string };
  related?: { label: string; href: string }[];
};

const home = { label: "Home", href: "/" };
const sap = { label: "SAP Services", href: "/sap/" };
const klicks = { label: "2Klicks", href: "/2klicks/" };
const ai = { label: "AI Services", href: "/ai-services/" };
const community = { label: "AI Community", href: "/ai-community/" };
const industries = { label: "Industries", href: "/industries/" };
const cases = { label: "Case Studies", href: "/case-studies/" };
const insights = { label: "Insights", href: "/insights/" };
const legal = { label: "Legal", href: "/legal/privacy/" };

const sapCta = { label: "Talk to an SAP expert", href: "/contact/" };
const aiCta = { label: "Talk to an AI expert", href: "/contact/?type=ai" };
const joinCta = { label: "Join the community", href: "/ai-community/join/" };

const sapRelated = [
  { label: "SAP Consulting", href: "/sap/consulting/" },
  { label: "S/4HANA Data Migration & MDG", href: "/sap/data-migration/" },
  { label: "SAP Integration", href: "/sap/integration/" },
  { label: "SAP Managed Services", href: "/sap/managed-services/" },
];
const aiRelated = [
  { label: "AI Strategy & Readiness", href: "/ai-services/strategy-readiness/" },
  { label: "Generative AI & RAG", href: "/ai-services/generative-ai/" },
  { label: "Machine Learning & Forecasting", href: "/ai-services/machine-learning/" },
  { label: "MLOps & AI Governance", href: "/ai-services/mlops-governance/" },
];
const caseRelated = [
  { label: "S/4HANA data migration for an asset-intensive utility", href: "/case-studies/utility-australia/" },
  { label: "Mass master-data update after a business reorganisation", href: "/case-studies/retail-usa/" },
  { label: "RE-FX lease portfolio migrated with validations intact", href: "/case-studies/real-estate-usa/" },
];
const industryRelated = [
  { label: "Real Estate", href: "/industries/real-estate/" },
  { label: "Utilities", href: "/industries/utilities/" },
  { label: "Retail", href: "/industries/retail/" },
];
const insightRelated = [
  { label: "ECC mainstream maintenance ends in 2027. Start with the data.", href: "/insights/ecc-2027-start-with-the-data/" },
  { label: "RE-FX after go-live: keeping lease data clean", href: "/insights/re-fx-after-go-live/" },
  { label: "Choosing your first AI use case in one day", href: "/insights/first-ai-use-case/" },
];

function sapService(slug: string, title: string, lead: string, points: InterimPage["points"]): [string, InterimPage] {
  const href = `/sap/${slug}/`;
  return [href, { title, kicker: "SAP Services", lead, crumbs: [home, sap, { label: title, href }], points, cta: sapCta, related: sapRelated.filter((r) => r.href !== href) }];
}
function aiService(slug: string, title: string, lead: string): [string, InterimPage] {
  const href = `/ai-services/${slug}/`;
  return [href, { title, kicker: "AI Services", lead, vertical: "ai", crumbs: [home, ai, { label: title, href }], cta: aiCta, related: aiRelated.filter((r) => r.href !== href) }];
}
function caseStudy(slug: string, sector: string, title: string): [string, InterimPage] {
  const href = `/case-studies/${slug}/`;
  return [href, { title, kicker: `Case study · ${sector}`, lead: "The full write-up of this engagement is being prepared with the client.", crumbs: [home, cases, { label: sector, href }], cta: sapCta, related: caseRelated.filter((r) => r.href !== href) }];
}
function industry(slug: string, title: string, lead: string): [string, InterimPage] {
  const href = `/industries/${slug}/`;
  return [href, { title: `SAP for ${title}`, kicker: "Industries", lead, crumbs: [home, industries, { label: title, href }], cta: sapCta, related: industryRelated.filter((r) => r.href !== href) }];
}
function article(slug: string, cat: string, title: string): [string, InterimPage] {
  const href = `/insights/${slug}/`;
  return [href, { title, kicker: cat, lead: "This article is being written.", vertical: cat === "AI" ? "ai" : "sap", crumbs: [home, insights, { label: title, href }], related: insightRelated.filter((r) => r.href !== href) }];
}
function legalPage(slug: string, title: string): [string, InterimPage] {
  const href = `/legal/${slug}/`;
  return [href, { title, kicker: "Legal", lead: `Our ${title.toLowerCase()} is being finalised. For any questions in the meantime, email info@texiri.com.`, crumbs: [home, { ...legal, label: title, href }] }];
}

export const interimPages: Record<string, InterimPage> = Object.fromEntries([
  sapService("consulting", "SAP Consulting", "Implementation, functional and technical consulting for teams that need SAP configured to how the business actually works.", [
    { t: "Implementation", d: "Blueprint, build, test, go-live." },
    { t: "Functional", d: "RE-FX, FI/CO, PM, MM, SD." },
    { t: "Technical", d: "Development, enhancements, performance." },
  ]),
  sapService("integration", "SAP Integration", "Interfaces between SAP and the rest of your landscape, built on SAP CPI and PI/PO.", [
    { t: "SAP CPI", d: "Cloud integration flows and APIs." },
    { t: "PI/PO", d: "Support today, and a plan before mainstream maintenance ends in 2027." },
  ]),
  sapService("managed-services", "SAP Managed Services", "Post-go-live support and optimisation from the people who know how your system was built.", [
    { t: "Support", d: "Incidents, changes and small enhancements." },
    { t: "Optimisation", d: "Process and performance improvements." },
    { t: "Mass changes", d: "Reorganisations handled with 2Klicks Update." },
  ]),

  ["/2klicks/", { title: "2Klicks Create and 2Klicks Update", kicker: "Our SAP tools", lead: "Download a template, enter or modify data, upload. Migration programs on day 1, and mass updates without new code.", crumbs: [home, klicks], cta: { label: "Request a 2Klicks demo", href: DEMO_HREF },
    related: [{ label: "2Klicks Create", href: "/2klicks/create/" }, { label: "2Klicks Update", href: "/2klicks/update/" }, { label: "S/4HANA Data Migration & MDG", href: "/sap/data-migration/" }] }],
  ["/2klicks/update/", { title: "2Klicks Update", kicker: "Our SAP tools", lead: "The same template workflow as 2Klicks Create, applied to data already in SAP: mass changes after reorganisations, without new code.", crumbs: [home, klicks, { label: "2Klicks Update", href: "/2klicks/update/" }], cta: { label: "Request a 2Klicks demo", href: DEMO_HREF },
    related: [{ label: "2Klicks Create", href: "/2klicks/create/" }, { label: "SAP Managed Services", href: "/sap/managed-services/" }] }],

  aiService("strategy-readiness", "AI Strategy & Readiness", "A one-day workshop, a data readiness review and a prioritised roadmap of use cases worth piloting."),
  aiService("generative-ai", "Generative AI & RAG", "Knowledge systems, assistants and document intelligence grounded in your own content."),
  aiService("machine-learning", "Machine Learning & Forecasting", "Predictive analytics, forecasting and optimisation models that run in production."),
  aiService("mlops-governance", "MLOps & AI Governance", "Pipelines, drift monitoring and governance aligned with the EU AI Act and ISO/IEC 42001."),

  ["/ai-community/events/", { title: "Community events", kicker: "TEXIRI AI Community", lead: "Sessions and hands-on workshops in Vijayapura and online. The event calendar is on its way. Join the community to hear about the next one first.", vertical: "community", crumbs: [home, community, { label: "Events", href: "/ai-community/events/" }], cta: joinCta }],
  ["/ai-community/learning-paths/", { title: "Learning paths", kicker: "TEXIRI AI Community", lead: "Structured paths from first steps to building real projects. No experience needed. Join the community to get started.", vertical: "community", crumbs: [home, community, { label: "Learning paths", href: "/ai-community/learning-paths/" }], cta: joinCta }],

  ["/industries/", { title: "SAP for the sectors we know best", kicker: "Industries", lead: "Real estate, utilities and retail: where our SAP and data-migration experience runs deepest.", crumbs: [home, industries], cta: sapCta, related: industryRelated }],
  industry("real-estate", "Real Estate", "SAP RE-FX implementation, lease and contract migration, and portfolio changes with 2Klicks Update."),
  industry("utilities", "Utilities", "SAP PM asset and maintenance data, FI/CO structures and governed master data."),
  industry("retail", "Retail", "SAP MM and SD master data at volume, and fast mass updates when the business reorganises."),

  ["/case-studies/", { title: "Results from SAP programmes", kicker: "Case Studies", lead: "Selected engagements across utilities, retail and real estate.", crumbs: [home, cases], cta: sapCta, related: caseRelated }],
  caseStudy("utility-australia", "Utility · Australia", "S/4HANA data migration for an asset-intensive utility"),
  caseStudy("retail-usa", "Retail · USA", "Mass master-data update after a business reorganisation"),
  caseStudy("real-estate-usa", "Real estate · USA", "RE-FX lease portfolio migrated with validations intact"),

  ["/insights/", { title: "Latest thinking", kicker: "Insights", lead: "Notes on SAP, S/4HANA migration and practical AI from the Texiri team.", crumbs: [home, insights], related: insightRelated }],
  article("ecc-2027-start-with-the-data", "S/4HANA & Migration", "ECC mainstream maintenance ends in 2027. Start with the data."),
  article("re-fx-after-go-live", "SAP", "RE-FX after go-live: keeping lease data clean"),
  article("first-ai-use-case", "AI", "Choosing your first AI use case in one day"),

  legalPage("privacy", "Privacy Policy"),
  legalPage("cookies", "Cookie Policy"),
  legalPage("terms", "Terms of Use"),
]);
