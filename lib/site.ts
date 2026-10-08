export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.texiri.com";

export const contact = {
  phone: "+91 7975305499",
  phoneDisplay: "+91 79753 05499",
  email: "info@texiri.com",
  hours: "Mon–Fri, 9am–7pm IST",
  // [TO CONFIRM] registered legal name, CIN and full postal addresses
  legalName: "[REGISTERED LEGAL NAME]",
  cin: "[TO CONFIRM]",
  linkedin: "https://www.linkedin.com/company/texiri", // [TO CONFIRM]
};

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
  sap: { label: "Talk to an SAP expert", short: "Talk to an expert", href: "/contact/", className: "bg-accent hover:bg-accent-600" },
  ai: { label: "Talk to an AI expert", short: "Talk to an expert", href: "/contact/?type=ai", className: "bg-ai hover:bg-ai-600" },
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
  url: SITE_URL,
  logo: `${SITE_URL}/texiri-logo.png`,
  email: contact.email,
  telephone: contact.phone,
  founder: { "@type": "Person", name: "Muttu Sarashetti", jobTitle: "Founder & CEO" },
  address: [
    { "@type": "PostalAddress", addressLocality: "Vijayapura", addressRegion: "Karnataka", addressCountry: "IN" },
    { "@type": "PostalAddress", addressLocality: "Navi Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
  ],
  sameAs: [contact.linkedin],
};
