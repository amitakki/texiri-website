import type { Metadata } from "next";
import Link from "next/link";
import { Button, H2, Kicker, Placeholder, Section } from "@/components/ui";
import { Breadcrumbs, CheckList, CTABand, FAQAccordion, NumberedGrid, StickyMobileCTA, TestimonialCard } from "@/components/sections";

export const metadata: Metadata = {
  title: "S/4HANA Data Migration & Master Data Governance (MDG) | SAP Data Migration Services",
  description: "S/4HANA data migration from ECC or legacy systems: assessment, extraction, cleansing, loading and SAP MDG, accelerated by 2Klicks Create. SAP Data Services, SDI and Migration Cockpit.",
  alternates: { canonical: "/sap/data-migration/" },
};

const serviceJsonLd = {
  "@context": "https://schema.org", "@type": "Service",
  name: "S/4HANA Data Migration & Master Data Governance",
  provider: { "@type": "Organization", name: "Texiri Solutions" },
  serviceType: "SAP data migration", areaServed: ["IN", "US", "DE", "SG", "AU"],
};

const caps = [
  { t: "Planning and assessment", d: "Data audit, object scope, migration strategy and a realistic timeline." },
  { t: "Extraction", d: "Repeatable extracts from ECC and non-SAP legacy sources." },
  { t: "Cleansing", d: "Profiling, de-duplication and enrichment, with rules agreed with data owners." },
  { t: "Loading", d: "2Klicks Create and S/4HANA Migration Cockpit, with reconciliation after every cycle." },
  { t: "Master Data Governance", d: "SAP MDG workflows and rules so quality holds after go-live." },
];
const phases = [
  { name: "Assess", out: ["Data audit report", "Object inventory", "Migration strategy"] },
  { name: "Design", out: ["Mapping specifications", "Cleansing rules", "2Klicks templates configured"] },
  { name: "Extract & cleanse", out: ["Extraction jobs", "Cleansed data sets", "Data-quality scorecard"] },
  { name: "Mock loads", out: ["Mock-cycle reports", "Reconciliation sign-off", "Defect log"] },
  { name: "Cutover & govern", out: ["Cutover runbook", "MDG rules live", "Hypercare"] },
];
const tech = ["2Klicks Create", "SAP Data Services", "Smart Data Integration", "Information Steward", "S/4HANA Migration Cockpit", "SAP MDG", "SQL tooling"];
const faqs = [
  { q: "Do you work alongside our systems integrator?", a: "Yes. We often own the data workstream within a larger programme, with clear hand-offs to the SI for build, test and cutover." },
  { q: "How does 2Klicks handle our custom fields?", a: "Templates recognise custom fields and validations in your system, so the load respects your configuration without new code." },
  { q: "Do you use SAP Migration Cockpit?", a: "Yes, where it fits. We combine it with 2Klicks Create, SAP Data Services and SDI depending on objects, volumes and sources." },
  { q: "Can we start before we pick a migration approach?", a: "Yes. A data assessment on ECC today informs the greenfield, brownfield or selective decision and shortens the programme later." },
  { q: "How long does a migration take?", a: "It depends on objects, volumes and data quality. We give you an evidence-based timeline at the end of the assessment phase." },
];

export default function DataMigrationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SAP Services", href: "/sap/" }, { label: "S/4HANA Data Migration & MDG", href: "/sap/data-migration/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="container-content grid items-end gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <Kicker>S/4HANA Data Migration &amp; MDG</Kicker>
            <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[15ch] text-display">Move to S/4HANA with data the business signs off.</h1>
            <p className="mt-6 max-w-[52ch] text-lead text-muted">For SAP programme directors and data owners moving from ECC or legacy systems. We plan, extract, cleanse and load your data, then keep it governed with MDG.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/?type=migration" arrow>Plan your migration with an architect</Button>
              <Button href="/2klicks/create/" variant="secondary">See 2Klicks Create</Button>
            </div>
          </div>
          <div className="border-t-4 border-ink bg-surface p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">The business challenge</span>
            <p className="mb-0 mt-3 text-xl font-semibold leading-[1.45]">Data is the most common reason S/4HANA timelines slip. Programs are built late, mock loads fail on custom fields, and reconciliation drags into cutover.</p>
          </div>
        </div>
      </section>

      <Section labelledBy="now-h" tone="navy">
        <Kicker onNavy>Why it matters now</Kicker>
        <H2 id="now-h" className="text-on-navy">The ECC clock is running.</H2>
        <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid list-none p-0 md:grid-cols-3">
          {[["Today", "Data assessment and cleansing can start now, on your current ECC system.", "border-accent"],
            ["End of 2027", "SAP ECC 6.0 mainstream maintenance ends. SAP PI/PO 7.5 mainstream maintenance ends on the same date.", "border-on-navy/40"],
            ["2030", "Optional extended maintenance for ECC ends, at additional cost.", "border-on-navy/20"]].map(([t, d, b]) => (
            <li key={t} className={`border-t-4 pr-6 pt-4 ${b}`}><div className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold">{t}</div><p className="mb-0 mt-1.5 text-on-navy-muted">{d}</p></li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="sol-h">
        <Kicker>The Texiri solution</Kicker>
        <H2 id="sol-h" className="max-w-[20ch]">Data-first migration, with our own IP doing the heavy lifting</H2>
        <p className="mb-[clamp(2.5rem,5vw,4rem)] mt-6 max-w-[60ch] text-lg text-muted">2Klicks Create gives your project migration programs on day 1, aware of your custom fields and validations. Our consultants spend their time on data quality and business sign-off instead of writing load programs.</p>
        <CheckList items={caps} />
      </Section>

      <Section labelledBy="app-h" tone="surface">
        <Kicker>Approach</Kicker>
        <H2 id="app-h">Five phases, each with something you can sign</H2>
        <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {phases.map((p, i) => (
            <li key={p.name} className="flex flex-col border-t-4 border-ink bg-ground">
              <div className="px-4 pb-3 pt-4"><span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span><h3 className="m-0 mt-1 text-xl">{p.name}</h3></div>
              <div className="flex-1 border-t border-hairline p-4"><span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deliverables</span><ul className="m-0 mt-1.5 flex flex-col gap-1 pl-4 text-sm">{p.out.map((o) => <li key={o}>{o}</li>)}</ul></div>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="tech-h">
        <div className="grid items-start gap-x-8 gap-y-6 md:grid-cols-2">
          <div><Kicker>Technologies</Kicker><h2 id="tech-h" className="m-0 text-[clamp(1.625rem,3vw,2.25rem)]">Tools we use every day</h2></div>
          <div className="flex flex-wrap gap-2">{tech.map((t, i) => <span key={t} className={`px-3.5 py-2 text-[15px] ${i === 0 ? "bg-navy-900 font-bold text-on-navy" : "border border-rule"}`}>{t}</span>)}</div>
        </div>
      </Section>

      <Section labelledBy="kp-h" tone="navy">
        <div className="grid items-center gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <Kicker onNavy>Related 2Klicks product</Kicker>
            <H2 id="kp-h" className="max-w-[18ch] text-on-navy">2Klicks Create: migration programs on day 1.</H2>
            <p className="mt-4 max-w-[46ch] text-[17px] text-on-navy-muted">Template-based loads for RE-FX, MM, PM, FI/CO and SD that recognise your custom fields and validations.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/2klicks/create/">See 2Klicks Create</Button>
            <Button href="/2klicks/demo/" variant="outline-on-navy" data-track="2klicks_demo_click">Request a demo</Button>
          </div>
        </div>
      </Section>

      <Section labelledBy="sc-h" ruled>
        <Kicker>Scenarios</Kicker>
        <H2 id="sc-h">Whatever route you take to S/4HANA</H2>
        <NumberedGrid cols={4} items={[
          { title: "Legacy or ECC to S/4HANA", body: "Cloud or on-premise, from SAP and non-SAP sources." },
          { title: "New implementation", body: "Greenfield builds that need clean opening data." },
          { title: "System conversion", body: "Brownfield moves where data still needs cleansing first." },
          { title: "Landscape transformation", body: "Mergers, carve-outs and consolidation of SAP systems." },
        ]} />
      </Section>

      

      <Section labelledBy="proof-h">
        <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3"><h2 id="proof-h" className="m-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Proof</h2><Placeholder>CLIENT APPROVAL NEEDED</Placeholder></div>
            <TestimonialCard quote="Texiri had our migration objects ready far earlier than planned. We ran more mock loads and went into cutover with confidence." who="Utility, Australia" />
          </div>
          <Link href="/case-studies/utility-australia/" className="flex flex-col gap-3 border-t-4 border-ink bg-surface p-8 no-underline" data-track="case_study_view">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Case study · Utility · Australia</span>
            <h3 className="m-0 text-2xl">S/4HANA data migration for an asset-intensive utility</h3>
            <Placeholder>PLACEHOLDER — CONTENT TO VERIFY</Placeholder>
          </Link>
        </div>
      </Section>

      <FAQAccordion id="faq-h" title="Migration questions" faqs={faqs} />
      <CTABand title="Get a data-readiness view of your S/4HANA migration." note="A senior consultant replies within one business day." primary={{ label: "Talk to a migration architect", href: "/contact/?type=migration" }} secondary={{ label: "Request a 2Klicks demo", href: "/2klicks/demo/" }} />
      <StickyMobileCTA label="Talk to a migration architect" href="/contact/?type=migration" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
