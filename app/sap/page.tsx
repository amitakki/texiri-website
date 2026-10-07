import type { Metadata } from "next";
import Link from "next/link";
import { Button, Kicker, Placeholder } from "@/components/ui";
import { Breadcrumbs, CTABand, FAQAccordion, StickyMobileCTA, TestimonialCard } from "@/components/sections";

export const metadata: Metadata = {
  title: "SAP Services: SAP Consulting, S/4HANA Migration, SAP Integration & Managed Services",
  description: "SAP services across the lifecycle: SAP implementation and functional consulting (RE-FX, FI/CO, PM, MM, SD), S/4HANA data migration and MDG, SAP CPI and PI/PO integration, managed services and mobility.",
  alternates: { canonical: "/sap/" },
};

const services = [
  { id: "consulting", t: "SAP Consulting", d: "Implementation, functional and technical consulting for teams that need SAP configured to how the business actually works.", points: [["Implementation", "Blueprint, build, test, go-live"], ["Functional", "RE-FX, FI/CO, PM, MM, SD"], ["Technical", "Development, enhancements, performance"]], href: "/sap/consulting/", highlight: true },
  { id: "migration", t: "S/4HANA Data Migration & MDG", d: "Planning, extraction, cleansing and loading, then Master Data Governance so the data stays right.", points: [["Scenarios", "Legacy/ECC to S/4HANA, new implementation, conversion, landscape transformation"], ["Tools", "2Klicks Create, Data Services, SDI, Information Steward, Migration Cockpit"]], href: "/sap/data-migration/" },
  { id: "integration", t: "SAP Integration", d: "Interfaces between SAP and the rest of your landscape, built on SAP CPI and PI/PO.", points: [["SAP CPI", "Cloud integration flows and APIs"], ["PI/PO", "Support today, and a plan before mainstream maintenance ends in 2027"]], href: "/sap/integration/" },
  { id: "managed", t: "SAP Managed Services", d: "Post-go-live support and optimisation from the people who know how your system was built.", points: [["Support", "Incidents, changes and small enhancements"], ["Optimisation", "Process and performance improvements"], ["Mass changes", "Reorganisations handled with 2Klicks Update"]], href: "/sap/managed-services/" },
  { id: "mobility", t: "Mobility Solutions", d: "Enterprise mobile apps and IoT integration that put SAP processes in the hands of field and plant teams.", points: [], href: "/sap/mobility/" },
];
const faqs = [
  { q: "Do you work alongside our systems integrator?", a: "Yes. We can lead a workstream such as data migration or RE-FX inside a larger programme, with clear hand-offs to your SI." },
  { q: "Which SAP modules do you cover?", a: "Functional consulting across RE-FX, FI/CO, PM, MM and SD, plus technical consulting, integration on CPI and PI/PO, and managed services." },
  { q: "Can you support us after go-live?", a: "Yes. SAP Managed Services covers post-go-live support and optimisation, and 2Klicks Update handles mass changes after reorganisations." },
  { q: "Where do you deliver from?", a: "Our teams are based in India, with delivery experience across India, the USA, Germany, Singapore and Australia." },
];

export default function SapServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SAP Services", href: "/sap/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="container-content">
          <Kicker>SAP Services</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[16ch] text-display">SAP consulting for the whole lifecycle.</h1>
          <div className="mt-8 grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
            <p className="m-0 max-w-[52ch] text-lead text-muted">For CIOs, SAP programme leads and finance and operations owners on ECC or S/4HANA. One senior team from blueprint to go-live to steady-state support.</p>
            <div className="flex flex-wrap gap-3"><Button href="/contact/" arrow>Talk to an SAP expert</Button><Button href="/2klicks/demo/" variant="secondary">Request a 2Klicks demo</Button></div>
          </div>
        </div>
      </section>

      <section aria-label="Service index" className="border-t-2 border-ink">
        <div className="container-content">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="grid scroll-mt-20 gap-x-[clamp(2rem,4vw,4rem)] gap-y-6 border-b-2 border-rule py-[clamp(2.5rem,5vw,4rem)] last:border-b-0 lg:grid-cols-2">
              <div>
                <span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span>
                <h2 id={`${s.id}-h`} className="mb-3 mt-1.5 text-[clamp(1.625rem,3vw,2.25rem)]">{s.t}</h2>
                <p className="m-0 max-w-[44ch] text-[17px] text-muted">{s.d}</p>
              </div>
              <div className="flex flex-col gap-4">
                {s.points.length > 0 && (
                  <ul className="m-0 grid list-none gap-x-6 p-0 sm:grid-cols-2">
                    {s.points.map(([k, v]) => <li key={k} className="border-t border-hairline py-3"><strong>{k}</strong><div className="text-[15px] text-muted">{v}</div></li>)}
                  </ul>
                )}
                {s.highlight && (
                  <div className="border-t-4 border-accent bg-navy-900 p-6 text-on-navy">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">RE-FX highlight</span>
                    <h3 className="mb-2 mt-1.5 text-[22px] text-on-navy">SAP Flexible Real Estate Management</h3>
                    <p className="m-0 text-on-navy-muted">Real-estate objects, lease contracts and conditions, configured, migrated with 2Klicks and maintained through portfolio changes with 2Klicks Update.</p>
                  </div>
                )}
                <Link href={s.href} className="font-extrabold">{s.t} →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="k-h" className="bg-navy-900 text-on-navy">
        <Link href="/2klicks/" className="container-content grid items-end gap-x-8 gap-y-6 py-[clamp(3rem,6vw,5rem)] text-on-navy no-underline hover:text-on-navy md:grid-cols-2">
          <div><Kicker onNavy>Our SAP tools</Kicker><h2 id="k-h" className="m-0 max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08]">2Klicks Create and 2Klicks Update</h2></div>
          <div><p className="m-0 max-w-[46ch] text-[17px] text-on-navy-muted">Download a template, enter or modify data, upload. Migration programs on day 1, and mass updates without new code.</p><span className="mt-4 inline-block font-extrabold text-accent">Explore 2Klicks →</span></div>
        </Link>
      </section>

      <section aria-labelledby="proof-h" className="py-section">
        <div className="container-content max-w-[60rem]">
          <div className="mb-4 flex flex-wrap items-center gap-3"><h2 id="proof-h" className="m-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Proof</h2><Placeholder>CLIENT APPROVAL NEEDED</Placeholder></div>
          <TestimonialCard quote="Lease data is hard to move. Texiri moved our RE-FX contracts with every validation intact and kept us informed throughout." who="Real-estate company, USA" />
        </div>
      </section>

      <FAQAccordion id="faq-h" title="Working with Texiri" faqs={faqs} />
      <CTABand title="Tell us where your SAP landscape is today." note="A senior SAP consultant replies within one business day." primary={{ label: "Talk to an SAP expert", href: "/contact/" }} />
      <StickyMobileCTA label="Talk to an SAP expert" href="/contact/" />
    </>
  );
}
