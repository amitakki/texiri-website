import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Cog, Gauge, Landmark, Scale, Truck, Wrench, type LucideIcon } from "lucide-react";
import { Button, H2, Kicker, Section } from "@/components/ui";
import { LifecycleRail } from "@/components/visuals";
import { Breadcrumbs, CTABand, FAQAccordion, Hero } from "@/components/sections";

export const metadata: Metadata = {
  title: "SAP Consulting: RE-FX, EAM, FICO & Project Systems",
  description: "SAP implementation and consulting: RE-FX and lease accounting (IFRS 16, ASC 842), enterprise asset management with PM, APM and SSAM, FICO, Project Systems and MM.",
  alternates: { canonical: "/sap/consulting/" },
};

const serviceJsonLd = {
  "@context": "https://schema.org", "@type": "Service",
  name: "SAP Consulting and Implementation",
  provider: { "@type": "Organization", name: "Texiri Solutions" },
  serviceType: "SAP implementation", areaServed: ["US", "EU", "AE", "AU", "IN"],
};

const areas = [["RE-FX & Lease Accounting", "re-fx"], ["Enterprise Asset Management", "eam"], ["Finance (FICO)", "finance"], ["Project Systems", "ps"], ["MM & supply chain", "mm"]];

type Practice = { id: string; kicker: string; title: string; lead: string; bullets: string[]; tiles: { icon: LucideIcon; t: string; d: string }[]; caseStudy: { label: string; href: string } };

const practices: Practice[] = [
  {
    id: "re-fx", kicker: "RE-FX & Lease Accounting", title: "Real estate and leases, accounted for correctly.",
    lead: "For property groups, retailers and any lease-heavy business. We implement SAP RE-FX and C4RE so portfolios, contracts and lease accounting live in one place.",
    bullets: [
      "Real estate portfolio management: land, buildings, rental objects and space",
      "Lease accounting compliant with IFRS 16 and ASC 842, for property and equipment leases",
      "Lessee and lessor contracts: rent, indexation, renewals and options",
      "Service-charge settlement, sales-based rent and tenant billing",
      "SAP RE-FX and C4RE implementation, S/4HANA migration and support",
      "Integration with Finance and Asset Accounting, plus portfolio dashboards",
    ],
    tiles: [
      { icon: Building2, t: "Portfolio", d: "Land, buildings, rental objects and space" },
      { icon: Truck, t: "Leases", d: "Property and equipment, lessee and lessor" },
      { icon: Scale, t: "Compliance", d: "IFRS 16 and ASC 842" },
    ],
    caseStudy: { label: "Case study: RE-FX and IFRS 16 for a leading US retailer", href: "/case-studies/retail-usa/" },
  },
  {
    id: "eam", kicker: "Enterprise Asset Management", title: "From reactive to predictive maintenance.",
    lead: "For mining, utilities, oil & gas and manufacturing, where asset uptime decides the year. Fewer unplanned outages, lower maintenance costs, and support for safety, compliance and ESG goals.",
    bullets: [
      "Enterprise asset management on S/4HANA: equipment, functional locations and the full asset lifecycle",
      "Predictive maintenance with SAP APM, using AI and IoT insights to prevent failures",
      "Plant Maintenance: work orders, maintenance plans, preventive and corrective maintenance",
      "Project Systems for capital projects, shutdowns and turnarounds",
      "Integration with Finance, procurement and supply chain for full cost and spares visibility",
      "SAP EAM implementation, S/4HANA migration, asset data migration and support",
    ],
    tiles: [
      { icon: Cog, t: "SSAM", d: "SAP Service and Asset Manager" },
      { icon: Gauge, t: "APM", d: "SAP Asset Performance Management" },
      { icon: Wrench, t: "PM", d: "SAP Plant Maintenance" },
    ],
    caseStudy: { label: "Case study: predictive maintenance for an oil & gas operator", href: "/case-studies/oil-gas-eam/" },
  },
];

const modules: { id: string; icon: LucideIcon; t: string; d: string }[] = [
  { id: "finance", icon: Landmark, t: "Finance (FICO)", d: "General ledger, controlling and asset accounting, integrated with RE-FX for IFRS 16 lease accounting and with every operational module." },
  { id: "ps", icon: Cog, t: "Project Systems (PS)", d: "Capital projects, shutdowns and turnarounds, planned and costed in PS and connected to Plant Maintenance and Finance." },
  { id: "mm", icon: Truck, t: "MM & supply chain", d: "Materials Management integrated with PP, SD and Project Systems, for streamlined supply-chain operations, maintenance and production planning." },
];

const faqs = [
  { q: "Do you work alongside our systems integrator?", a: "Yes. We can lead a workstream such as RE-FX, asset management or data migration inside a larger programme, with clear hand-offs to your SI." },
  { q: "Do you implement both RE-FX and C4RE?", a: "Yes. We implement SAP RE-FX on S/4HANA and Cloud for Real Estate, and migrate lease portfolios into either with 2Klicks." },
  { q: "Can you take us from reactive to predictive maintenance?", a: "Yes. We start from clean asset data in PM, then add SAP APM for health monitoring and anomaly detection, and SSAM for mobile field work." },
  { q: "Can you provide consultants rather than a whole project?", a: "Yes. We provide experienced consultants for RE-FX, FICO, PS, PM and other modules, onsite, offshore or hybrid." },
];

export default function SapConsultingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SAP Services", href: "/sap/" }, { label: "SAP Consulting", href: "/sap/consulting/" }]} />
      <Hero
        kicker="SAP Consulting"
        title="SAP, configured to how your business works."
        lead="Implementation, functional and technical consulting across RE-FX and lease accounting, enterprise asset management, Finance, Project Systems and MM. One senior team from blueprint to go-live."
        aside={<LifecycleRail active={1} />}
        actions={<><Button href="/contact/" arrow data-track="cta_click" data-vertical="sap">Talk to an SAP expert</Button><Button href="#re-fx" variant="secondary">RE-FX &amp; Lease Accounting</Button></>}
      />

      <nav aria-label="On this page" className="border-y-2 border-rule">
        <ul className="container-content m-0 flex list-none flex-wrap gap-x-6 gap-y-1 py-3">
          {areas.map(([label, id]) => <li key={id}><Link href={`#${id}`} className="flex min-h-11 items-center font-extrabold no-underline">{label}</Link></li>)}
        </ul>
      </nav>

      {practices.map((p, n) => (
        <Section key={p.id} id={p.id} labelledBy={`${p.id}-h`} tone={n % 2 ? "surface" : "ground"} className="scroll-mt-20">
          <Kicker>{p.kicker}</Kicker>
          <H2 id={`${p.id}-h`}>{p.title}</H2>
          <p className="mt-6 max-w-[60ch] text-lg text-muted">{p.lead}</p>
          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-8 lg:grid-cols-[3fr_2fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">What we do</span>
              <ul className="m-0 mt-3 list-none border-t-2 border-ink p-0">
                {p.bullets.map((b) => <li key={b} className="border-b border-hairline py-3 text-[17px]">{b}</li>)}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              {p.tiles.map((t) => (
                <div key={t.t} className={`flex items-center gap-4 border-t-4 border-accent p-5 ${n % 2 ? "bg-ground" : "bg-surface"}`}>
                  <span className="grid size-12 flex-none place-items-center bg-navy-900 text-on-navy"><t.icon aria-hidden className="size-6" /></span>
                  <span><strong className="block text-xl">{t.t}</strong><span className="text-[15px] text-muted">{t.d}</span></span>
                </div>
              ))}
              <Link href={p.caseStudy.href} className="mt-2 flex min-h-11 items-center font-extrabold" data-track="case_study_view">{p.caseStudy.label} →</Link>
            </div>
          </div>
        </Section>
      ))}

      <Section labelledBy="mod-h" ruled>
        <Kicker>Core modules</Kicker>
        <H2 id="mod-h">Finance, projects and supply chain, connected.</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-8 md:grid-cols-3">
          {modules.map((m) => (
            <article key={m.id} id={m.id} aria-labelledby={`${m.id}-h`} className="scroll-mt-20 border-t-2 border-ink pt-4">
              <m.icon aria-hidden className="size-6 text-accent-700" />
              <h3 id={`${m.id}-h`} className="mb-2 mt-3 text-[22px]">{m.t}</h3>
              <p className="m-0 text-base text-muted">{m.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <FAQAccordion id="faq-h" title="SAP consulting questions" faqs={faqs} />
      <CTABand title="Tell us which SAP areas you're working on." note="A senior SAP consultant replies within one business day." primary={{ label: "Talk to an SAP expert", href: "/contact/" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
