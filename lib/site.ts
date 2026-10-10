export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.texiri.com";

/** Demo requests live in the form on the 2Klicks Create page. Link here directly, not via the /2klicks/demo/ redirect. */
export const DEMO_HREF = "/2klicks/create/#demo";

export const contact = {
  phone: "+91 7975305499",
  phoneDisplay: "+91 79753 05499",
  email: "info@texiri.com",
  hours: "Mon–Fri, 9am–7pm IST",
  // From the old site (www.texiri.com); confirm with the founder (docs/content-decisions.md C3–C5).
  legalName: "Texiri Solutions Private Limited",
  /** [TO CONFIRM] Company Identification Number (content decision C1). Hidden on the site while null. */
  cin: null as string | null,
  linkedin: "https://www.linkedin.com/company/texiri-solutions/",
  instagram: "https://www.instagram.com/texirisolutions/",
};

export type Office = { name: string; label: string; street: string[]; locality: string; region: string; postalCode: string; hq?: boolean };

export const offices: Office[] = [
  { name: "Vijayapura (HQ)", label: "Headquarters", street: ["1st Floor, Toravi building, Anand Nagar", "Ashram Road, Opp. BLDE Engineering College"], locality: "Vijayapura", region: "Karnataka", postalCode: "586103", hq: true },
  { name: "Navi Mumbai", label: "Office", street: ["CG Parivar House, EL-86, T.T.C Industrial Area", "MIDC Mahape"], locality: "Navi Mumbai", region: "Maharashtra", postalCode: "400701" },
];

export type Vertical = "sap" | "ai" | "community";
export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { vertical?: Vertical; mega?: { links: NavLink[]; feature: NavLink & { kicker: string } } };

export const primaryNav: NavItem[] = [
  {
    label: "SAP Services", href: "/sap/", vertical: "sap",
    mega: {
      links: [
        { label: "SAP Consulting", href: "/sap/consulting/", description: "Implementation, functional and technical consulting. RE-FX, FI/CO, PM, MM, SD." },
        { label: "S/4HANA Data Migration & MDG", href: "/sap/data-migration/", description: "Assess, extract, cleanse and load — then keep master data governed." },
        { label: "SAP Integration", href: "/sap/integration/", description: "SAP CPI and PI/PO." },
        { label: "SAP Managed Services", href: "/sap/managed-services/", description: "Post-go-live support and continuous optimisation." },
      ],
      feature: { kicker: "Our SAP tools", label: "2Klicks Create & Update", href: "/2klicks/", description: "Migration programs on day 1, not day 120." },
    },
  },
  {
    label: "AI Services", href: "/ai-services/", vertical: "ai",
    mega: {
      links: [
        { label: "AI Strategy & Readiness", href: "/ai-services/strategy-readiness/", description: "Workshop, data readiness and a prioritised use-case roadmap." },
        { label: "Generative AI & RAG", href: "/ai-services/generative-ai/", description: "Knowledge systems, assistants and document intelligence." },
        { label: "Machine Learning & Forecasting", href: "/ai-services/machine-learning/", description: "Predictive analytics, forecasting and optimisation." },
        { label: "MLOps & AI Governance", href: "/ai-services/mlops-governance/", description: "Pipelines, drift monitoring, EU AI Act and ISO/IEC 42001." },
        { label: "TEXIRI AI Community", href: "/ai-community/", description: "Learning paths, workshops and projects for anyone curious about AI." },
      ],
      feature: { kicker: "Start here", label: "Request an AI readiness workshop", href: "/contact/?type=ai", description: "One day. A ranked list of use cases at the end." },
    },
  },
  { label: "Industries", href: "/industries/" },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "Insights", href: "/insights/" },
  { label: "About", href: "/about/" },
  { label: "Careers", href: "/careers/" },
];

export const verticalCta: Record<Vertical, { label: string; short: string; href: string; className: string }> = {
  sap: { label: "Talk to an SAP expert", short: "Talk to us", href: "/contact/", className: "bg-accent hover:bg-accent-600" },
  ai: { label: "Talk to an AI expert", short: "Talk to us", href: "/contact/?type=ai", className: "bg-ai hover:bg-ai-600" },
  community: { label: "Join the community", short: "Join", href: "/ai-community/join/", className: "rounded-pill bg-com hover:bg-com-600" },
};

export function verticalFor(pathname: string): Vertical {
  if (pathname.startsWith("/ai-community")) return "community";
  if (pathname.startsWith("/ai-services")) return "ai";
  return "sap";
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Texiri Solutions",
  legalName: contact.legalName,
  ...(contact.cin ? { identifier: contact.cin } : {}),
  url: SITE_URL,
  logo: `${SITE_URL}/texiri-logo.png`,
  email: contact.email,
  telephone: contact.phone,
  founder: { "@type": "Person", name: "Muttu Sarashetti", jobTitle: "Founder & CEO" },
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.street.join(", "),
    addressLocality: o.locality,
    addressRegion: o.region,
    postalCode: o.postalCode,
    addressCountry: "IN",
  })),
  sameAs: [contact.linkedin, contact.instagram],
};
