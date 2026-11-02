import type { Metadata } from "next";
import { images } from "@/lib/images";
import Link from "next/link";
import { ClipboardCheck, DatabaseZap, PencilRuler, Repeat, Rocket } from "lucide-react";
import { EccTimeline, Track } from "@/components/visuals";
import { Button, H2, Kicker, Placeholder, Section, SiteImage } from "@/components/ui";
import { Breadcrumbs, CheckList, CTABand, FAQAccordion, NumberedGrid, TestimonialCard } from "@/components/sections";
import { testimonials } from "@/lib/company";
import { DEMO_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "S/4HANA, Data Migration & MDG Services",
  description: "S/4HANA data migration from ECC or legacy systems, greenfield, brownfield or bluefield: extraction, cleansing, mapping, loading and SAP MDG with SAP BODS, Syniti ADM and 2Klicks.",
  alternates: { canonical: "/sap/data-migration/" },
};

const serviceJsonLd = {
  "@context": "https://schema.org", "@type": "Service",
  name: "S/4HANA Data Migration & Master Data Governance",
  provider: { "@type": "Organization", name: "Texiri Solutions" },
  serviceType: "SAP data migration", areaServed: ["US", "EU", "AE", "AU", "IN"],
};

const caps = [
  { t: "Planning and assessment", d: "Data audit, object scope, migration strategy and a realistic timeline." },
  { t: "Extraction and mapping", d: "Repeatable extracts from ECC and non-SAP legacy sources, mapped with the business teams, using SAP BODS / Data Services and Syniti ADM." },
  { t: "Cleansing and validation", d: "Profiling, de-duplication and enrichment, with rules agreed with data owners." },
  { t: "Loading", d: "2Klicks, Syniti ADM and S/4HANA Migration Cockpit, with reconciliation after every cycle." },
  { t: "Cutover", d: "Cutover planning and execution with full reconciliation, so operations keep running." },
  { t: "Master Data Governance", d: "SAP MDG workflows and rules so quality holds after go-live." },
];
const phases = [
  { name: "Assess", icon: ClipboardCheck, out: ["Data audit report", "Object inventory", "Migration strategy"] },
  { name: "Design", icon: PencilRuler, out: ["Mapping specifications", "Cleansing rules", "2Klicks templates configured"] },
  { name: "Extract & cleanse", icon: DatabaseZap, out: ["Extraction jobs", "Cleansed data sets", "Data-quality scorecard"] },
  { name: "Mock loads", icon: Repeat, repeats: true, out: ["Mock-cycle reports", "Reconciliation sign-off", "Defect log"] },
  { name: "Cutover & govern", icon: Rocket, out: ["Cutover runbook", "MDG rules live", "Hypercare"] },
];
const tech = ["2Klicks", "SAP BODS / Data Services", "Syniti ADM", "S/4HANA Migration Cockpit", "Smart Data Integration", "Information Steward", "SAP MDG", "SQL tooling"];
const stats = [
  ["Zero", "data loss at cutover on an ECC to S/4HANA conversion"],
  ["75%", "lower cost for RE-FX data operations with 2Klicks"],
  ["22%", "of our consultants specialise in data migration"],
];
const faqs = [
  { q: "Do you work alongside our systems integrator?", a: "Yes. We often own the data workstream within a larger programme, with clear hand-offs to the SI for build, test and cutover." },
  { q: "How does 2Klicks handle our custom fields?", a: "Templates recognise custom fields and validations in your system, so the load respects your configuration without new code." },
  { q: "Which migration tools do you use?", a: "SAP BODS / Data Services, Syniti ADM, S/4HANA Migration Cockpit and our own 2Klicks, chosen by object, volume and source." },
  { q: "Can we start before we pick a migration approach?", a: "Yes. A data assessment on ECC today informs the greenfield, brownfield or bluefield decision and shortens the programme later." },
  { q: "How long does a migration take?", a: "It depends on objects, volumes and data quality. We give you an evidence-based timeline at the end of the assessment phase." },
];

export default function DataMigrationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SAP Services", href: "/sap/" }, { label: "S/4HANA, Data Migration & MDG", href: "/sap/data-migration/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="container-content grid items-start gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div className="hero-enter">
            <Kicker>S/4HANA, Data Migration &amp; MDG</Kicker>
            <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[22ch] text-display">Move to S/4HANA with data the business signs off.</h1>
            <p className="mt-6 max-w-[52ch] text-lead text-muted">For SAP programme directors and data owners moving from ECC or legacy systems. We plan, extract, cleanse and load your data, then keep it governed with MDG.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/?type=migration" arrow>Talk to a migration architect</Button>
              <Button href="/2klicks/" variant="secondary">Explore 2Klicks</Button>
            </div>
          </div>
          <div className="hero-enter-late border-t-4 border-ink bg-surface p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">The business challenge</span>
            <p className="mb-0 mt-3 text-xl font-semibold leading-[1.45]">Data is the most common reason S/4HANA timelines slip. Programs are built late, mock loads fail on custom fields, and reconciliation drags into cutover.</p>
          </div>
        </div>
      </section>

      <Section labelledBy="now-h" tone="navy">
        <Kicker onNavy>Why it matters now</Kicker>
        <H2 id="now-h" className="text-on-navy">The ECC clock is running.</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)]"><EccTimeline /></div>
      </Section>

      <Section labelledBy="sol-h">
        <Kicker>The Texiri solution</Kicker>
        <H2 id="sol-h" className="max-w-[20ch]">Data-first migration, with our own IP doing the heavy lifting</H2>
        <p className="mt-6 max-w-[60ch] text-lg text-muted">End-to-end S/4HANA migration on greenfield, brownfield and bluefield programmes. 2Klicks is ready on day 1 for RE-FX, FI/CO and PS, with no programs to develop and your custom fields handled, so our consultants spend their time on data quality and business sign-off instead of writing load programs.</p>
        <dl className="mb-0 mt-[clamp(2rem,4vw,3rem)] grid gap-3 sm:grid-cols-3">
          {stats.map(([n, l]) => <div key={n} className="border-t-4 border-accent bg-surface p-5"><dt className="sr-only">{l}</dt><dd className="m-0"><span className="block text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none">{n}</span><span className="mt-2 block text-[15px] text-muted">{l}</span></dd></div>)}
        </dl>
        <p className="mb-[clamp(2.5rem,5vw,4rem)] mt-3"><Placeholder>STATS TO VERIFY · X10</Placeholder></p>
        <SiteImage {...images.dataMigration} ratio="aspect-[4/3] sm:aspect-video" className="mb-[clamp(2.5rem,5vw,4rem)]" sizes="(min-width: 1280px) 1280px, 100vw" />
        <CheckList items={caps} />
      </Section>

      <Section labelledBy="app-h" tone="surface">
        <Kicker>Approach</Kicker>
        <H2 id="app-h">Five phases, each with something you can sign</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)]">
          <Track
            label="Migration approach: five phases"
            rowFrom="lg"
            numbered
            items={phases.map((p) => ({
              label: p.name,
              icon: p.icon,
              badge: p.repeats ? "Repeats until reconciled" : undefined,
              note: <><span className="text-[11px] font-semibold uppercase tracking-[0.08em]">Deliverables</span><ul className="m-0 mt-1.5 flex flex-col gap-1 pl-4 text-sm">{p.out.map((o) => <li key={o}>{o}</li>)}</ul></>,
            }))}
          />
        </div>
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
            <H2 id="kp-h" className="max-w-[18ch] text-on-navy">2Klicks: RE-FX loads ready on day 1.</H2>
            <p className="mt-4 max-w-[46ch] text-[17px] text-on-navy-muted">Download, update and upload data for RE-FX, FI/CO and PS on ECC or S/4HANA: 10× faster, at 75% lower cost.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/2klicks/">Explore 2Klicks</Button>
            <Button href={DEMO_HREF} variant="outline-on-navy" data-track="2klicks_demo_click">Request a demo</Button>
          </div>
        </div>
      </Section>

      <Section labelledBy="sc-h" ruled>
        <Kicker>Scenarios</Kicker>
        <H2 id="sc-h">Whatever route you take to S/4HANA</H2>
        <NumberedGrid cols={4} items={[
          { title: "Greenfield", body: "New S/4HANA implementations that need clean opening data from SAP and non-SAP sources." },
          { title: "Brownfield", body: "ECC to S/4HANA system conversions where data still needs cleansing first." },
          { title: "Bluefield", body: "Selective data transition: move the history and organisations you need, and leave the rest." },
          { title: "Landscape transformation", body: "Mergers, carve-outs and consolidation of SAP systems." },
        ]} />
      </Section>

      <Section labelledBy="proof-h">
        <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <h2 id="proof-h" className="mb-4 mt-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Proof</h2>
            <TestimonialCard {...testimonials.utility} />
          </div>
          <Link href="/case-studies/utility-australia/" className="flex flex-col gap-3 border-t-4 border-ink bg-surface p-8 no-underline" data-track="case_study_view">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Case study · Utilities · Australia</span>
            <h3 className="m-0 text-2xl">Legacy to SAP S/4HANA for one of Australia&apos;s top utility companies</h3>
            <p className="m-0 text-muted">PM, Project Systems, Supply Chain and Finance migrated with SAP BODS and Syniti ADM, with a smooth cutover and operations running throughout.</p>
            <span className="font-extrabold">Read the case study →</span>
          </Link>
        </div>
      </Section>

      <FAQAccordion id="faq-h" title="Migration questions" faqs={faqs} />
      <CTABand title="Get a data-readiness view of your S/4HANA migration." note="A senior consultant replies within one business day." primary={{ label: "Talk to a migration architect", href: "/contact/?type=migration" }} secondary={{ label: "Request a 2Klicks demo", href: DEMO_HREF }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
