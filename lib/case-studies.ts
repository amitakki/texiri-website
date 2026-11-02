// Case studies from the Texiri Profile 2026 deck. Clients stay unnamed, as in the profile (content decision P4).
import type { testimonials } from "./company";

export type CaseStudy = {
  slug: string;
  sector: string;
  /** Industries page anchor this case belongs to (lib/industries.ts). */
  industry: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  /** The starting point, the four steps of the work, and the SAP target with its modules. */
  from: { name: string; note: string };
  steps: [string, string, string, string];
  stepsNote: string;
  target: { name: string; modules: string[] };
  challenge: string[];
  solution: string[];
  impact: string[];
  services: { label: string; href: string }[];
  testimonial?: keyof typeof testimonials;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "utility-australia",
    sector: "Utilities · Australia",
    industry: "utilities",
    title: "Legacy to SAP S/4HANA for one of Australia's top utility companies",
    summary: "An end-to-end data migration from complex legacy systems into S/4HANA, covering Plant Maintenance, Project Systems, Supply Chain and Finance.",
    metric: "4",
    metricLabel: "SAP areas migrated, with operations running throughout",
    from: { name: "Legacy systems", note: "Complex, inconsistent data" },
    steps: ["Extract", "Cleanse", "Map", "Load"],
    stepsNote: "Tools: SAP BODS · Syniti ADM",
    target: { name: "SAP S/4HANA", modules: ["PM", "Project Systems", "Supply Chain", "Finance"] },
    challenge: ["Highly complex legacy data structures", "Unclear data mapping between systems", "High risk of errors from inconsistent data"],
    solution: ["End-to-end data mapping with the business teams", "Migration executed with SAP BODS and Syniti ADM", "Covered PM, Project Systems, Supply Chain and Finance"],
    impact: ["Significant reduction in migration errors", "Smooth cutover, with operations running throughout", "Lower running costs from clean, standard data"],
    services: [{ label: "S/4HANA, Data Migration & MDG", href: "/sap/data-migration/" }, { label: "Enterprise Asset Management", href: "/sap/consulting/#eam" }],
    testimonial: "utility",
  },
  {
    slug: "retail-usa",
    sector: "Retail · USA",
    industry: "retail",
    title: "Real estate and leasing transformation with IFRS 16-compliant lease accounting",
    summary: "SAP RE-FX implemented across leasing, contracts, valuations and accounting for a leading US retailer, with custom dashboards and workflow automation.",
    metric: "100%",
    metricLabel: "IFRS 16-compliant lease accounting",
    from: { name: "Legacy leasing system", note: "Outdated, hard to scale" },
    steps: ["Contracts", "Valuations", "Accounting", "Analytics"],
    stepsNote: "Plus: custom dashboards · workflow automation",
    target: { name: "SAP RE-FX", modules: ["Leasing", "Contracts", "Valuations", "IFRS 16"] },
    challenge: ["Outdated real estate and leasing system with limited scalability", "Difficulty achieving IFRS 16-compliant lease accounting", "Inefficient vendor and contract management"],
    solution: ["Implemented SAP RE-FX across leasing, contracts, valuations and accounting", "Built custom analytics dashboards for real-time decisions", "Automated workflows for vendor and contract operations"],
    impact: ["100% IFRS 16-compliant lease accounting", "Better vendor performance", "Timely procurement cycles"],
    services: [{ label: "RE-FX & Lease Accounting", href: "/sap/consulting/#re-fx" }, { label: "SAP Managed Services", href: "/sap/managed-services/" }],
    testimonial: "retail",
  },
  {
    slug: "oil-gas-eam",
    sector: "Oil & Gas",
    industry: "oil-gas",
    title: "Digital asset management with SAP EAM, APM and SSAM",
    summary: "Predictive maintenance for a large, ageing asset base across upstream, midstream and refining, starting with control valves.",
    metric: "3",
    metricLabel: "SAP asset solutions working as one: APM, EAM/PM and SSAM",
    from: { name: "Plant assets", note: "Valves, pumps, compressors" },
    steps: ["Detect", "Analyse", "Plan", "Execute"],
    stepsNote: "Use case: control valve predictive maintenance",
    target: { name: "SAP EAM", modules: ["APM", "EAM / PM", "SSAM", "Asset data"] },
    challenge: ["Large, ageing asset base across upstream, midstream and refining", "Risk of unplanned shutdowns affecting production and safety", "Earlier detection needed on pumps, compressors and valves"],
    solution: ["SAP APM: health monitoring, FMEA/RCM and anomaly detection", "SAP EAM/PM: planning, spare parts and work orders", "SAP SSAM: mobile field work, inspections and offline use"],
    impact: ["Higher asset reliability, with fewer unplanned shutdowns", "Lower maintenance costs and better use of spare parts", "Improved safety, compliance and sustainability"],
    services: [{ label: "Enterprise Asset Management", href: "/sap/consulting/#eam" }, { label: "SAP BTP & Development", href: "/sap/btp/" }],
  },
];

export const caseHref = (c: Pick<CaseStudy, "slug">) => `/case-studies/${c.slug}/`;
export const caseBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
