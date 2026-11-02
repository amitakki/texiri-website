// Industries from the Texiri Profile 2026 deck. The profile's two pharma cards are merged into one,
// and Oil & Gas comes from its EAM case study and SAP Mobile use case (content decision I4).
export type Industry = {
  id: string;
  t: string;
  /** Short label for the home page "Sectors" line. */
  short: string;
  d: string;
  icon: "realEstate" | "retail" | "utilities" | "oilGas" | "pharma" | "manufacturing" | "finance";
  services: { label: string; href: string }[];
  /** Case-study slugs (lib/case-studies.ts). */
  cases?: string[];
};

export const industries: Industry[] = [
  {
    id: "real-estate", t: "Real Estate & Property Management", short: "Real Estate", icon: "realEstate",
    d: "SAP RE-FX and C4RE implementations with IFRS 16-compliant leasing, to manage portfolios, lease accounting and vendors in one place.",
    services: [{ label: "RE-FX & Lease Accounting", href: "/sap/consulting/#re-fx" }, { label: "2Klicks", href: "/2klicks/" }],
  },
  {
    id: "retail", t: "Retail & Consumer Goods", short: "Retail", icon: "retail",
    d: "Retail real estate transformation and S/4HANA migrations for large retailers, improving lease accounting, merchandising and operational reporting.",
    services: [{ label: "RE-FX & Lease Accounting", href: "/sap/consulting/#re-fx" }, { label: "S/4HANA, Data Migration & MDG", href: "/sap/data-migration/" }],
    cases: ["retail-usa"],
  },
  {
    id: "utilities", t: "Utilities & Energy", short: "Utilities", icon: "utilities",
    d: "Complex data migrations, asset and maintenance (PM) and process optimisation for utility providers, keeping operations running and regulators satisfied.",
    services: [{ label: "S/4HANA, Data Migration & MDG", href: "/sap/data-migration/" }, { label: "Enterprise Asset Management", href: "/sap/consulting/#eam" }],
    cases: ["utility-australia"],
  },
  {
    id: "oil-gas", t: "Oil & Gas", short: "Oil & Gas", icon: "oilGas",
    d: "Predictive maintenance with SAP APM, EAM and SSAM across upstream, midstream and refining, and mobile apps that let field crews work offline at remote sites.",
    services: [{ label: "Enterprise Asset Management", href: "/sap/consulting/#eam" }, { label: "SAP Mobile on BTP", href: "/sap/btp/#mobile" }],
    cases: ["oil-gas-eam"],
  },
  {
    id: "pharma", t: "Healthcare & Pharmaceuticals", short: "Pharma", icon: "pharma",
    d: "Data governance, master-data harmonisation and secure S/4HANA migration for life-science organisations that need accuracy and auditability, plus PM-driven asset management for their plants.",
    services: [{ label: "S/4HANA, Data Migration & MDG", href: "/sap/data-migration/" }, { label: "Enterprise Asset Management", href: "/sap/consulting/#eam" }],
  },
  {
    id: "manufacturing", t: "Manufacturing & Supply Chain", short: "Manufacturing", icon: "manufacturing",
    d: "SAP integration across MM, PP, SD and Project Systems, for streamlined supply-chain operations, maintenance and production planning.",
    services: [{ label: "SAP Consulting", href: "/sap/consulting/#mm" }, { label: "Project Systems", href: "/sap/consulting/#ps" }],
  },
  {
    id: "finance", t: "Financial Services & Accounting Compliance", short: "Financial Services", icon: "finance",
    d: "Finance and controlling, with IFRS 16 compliance through SAP RE-FX and proven migration frameworks.",
    services: [{ label: "Finance (FICO)", href: "/sap/consulting/#finance" }, { label: "RE-FX & Lease Accounting", href: "/sap/consulting/#re-fx" }],
  },
];
