import type { Metadata } from "next";
import Link from "next/link";
import { Button, Kicker } from "@/components/ui";
import { LifecycleRail } from "@/components/visuals";
import { Breadcrumbs, CTABand, FAQAccordion, NumberedGrid, TestimonialCard } from "@/components/sections";
import { testimonials } from "@/lib/company";
import { isLive } from "@/lib/pages";
import { DEMO_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "SAP Consulting & Managed Services",
  description: "SAP services across the lifecycle: SAP implementation and consulting (RE-FX and lease accounting, FICO, PS, PM, MM), S/4HANA data migration and MDG, SAP BTP and ABAP development, and managed services.",
  alternates: { canonical: "/sap/" },
};

const services = [
  { id: "consulting", t: "SAP Consulting", d: "SAP implementation configured to how the business actually works, from blueprint to go-live.", points: [["RE-FX & Lease Accounting", "RE-FX, C4RE, IFRS 16 and ASC 842"], ["Enterprise Asset Management", "PM, APM and SSAM"], ["Finance", "FICO, asset accounting, lease accounting"], ["Project Systems", "Capital projects, shutdowns and turnarounds"]], href: "/sap/consulting/", highlight: true },
  { id: "migration", t: "S/4HANA, Data Migration & MDG", d: "Data migration to S/4HANA on every type of implementation, then Master Data Governance so the data stays right.", points: [["Scenarios", "Greenfield, brownfield and bluefield"], ["Tools", "SAP BODS / Data Services, Syniti ADM, Migration Cockpit, 2Klicks"]], href: "/sap/data-migration/" },
  { id: "btp", t: "SAP BTP & Development", d: "Tailored SAP development, from ABAP to Fiori apps and BTP extensions that keep the S/4HANA core clean.", points: [["ABAP & RAP", "Enhancements, reports, interfaces and RAP services"], ["Fiori/UI5", "Mobile-ready apps that speed up adoption"], ["SAP BTP", "Clean-core extensions, workflows and integration"]], href: "/sap/btp/" },
  { id: "managed", t: "SAP Managed Services", d: "From Basis to functional support: complete SAP management under one roof.", points: [["Support", "Incidents, changes and small enhancements"], ["Basis", "Technical operations and system health"], ["Mass changes", "Reorganisations handled with 2Klicks"]], href: "/sap/managed-services/" },
];
const engage = [
  { title: "Implementation projects", body: "A full SAP implementation or a single workstream, such as data migration or RE-FX, inside a larger programme." },
  { title: "Managed services", body: "Ongoing Basis and functional support from the team that knows how your system was built." },
  { title: "Staff augmentation", body: "Experienced consultants in ABAP, Fiori, BTP, MDG, FICO, RE-FX, PS, S/4HANA, Group Reporting, FSCM, PM and EWM." },
  { title: "Onsite, offshore or hybrid", body: "A delivery model that balances cost with round-the-clock support." },
];
const faqs = [
  { q: "Do you work alongside our systems integrator?", a: "Yes. We can lead a workstream such as data migration or RE-FX inside a larger programme, with clear hand-offs to your SI." },
  { q: "Which SAP modules do you cover?", a: "RE-FX and C4RE, FI/CO, Project Systems, Plant Maintenance and asset management (APM, SSAM), MM, PP and SD, plus ABAP, Fiori/UI5, RAP and SAP BTP development, data migration and MDG, and Basis." },
  { q: "Can you support us after go-live?", a: "Yes. SAP Managed Services covers post-go-live support and optimisation, and 2Klicks handles RE-FX mass changes after reorganisations." },
  { q: "Where do you deliver from?", a: "Our delivery centres are in Vijayapura and Navi Mumbai. We work onsite, offshore or hybrid, for clients on five continents: the USA, Europe, the Middle East, Australia and India." },
];

export default function SapServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SAP Services", href: "/sap/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="hero-enter container-content">
          <Kicker>SAP Services</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[16ch] text-display">SAP consulting for the whole lifecycle.</h1>
          <div className="mt-8 grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
            <p className="m-0 max-w-[52ch] text-lead text-muted">For CIOs, SAP programme leads and finance and operations owners on ECC or S/4HANA. One senior team from blueprint to go-live to steady-state support.</p>
            <div className="flex flex-wrap gap-3"><Button href="/contact/" arrow>Talk to an SAP expert</Button><Button href={DEMO_HREF} variant="secondary">Request a 2Klicks demo</Button></div>
          </div>
        </div>
      </section>

      <div className="container-content pb-[clamp(2.5rem,5vw,4rem)]">
        <LifecycleRail wide />
      </div>

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
                    <h3 className="mb-2 mt-1.5 text-[22px] text-on-navy">SAP RE-FX &amp; Lease Accounting</h3>
                    <p className="m-0 text-on-navy-muted">Land, buildings, rental objects and space; lessee and lessor contracts for property and equipment; lease accounting compliant with IFRS 16 and ASC 842. Migrated with 2Klicks and kept current through portfolio changes with the same tool.</p>
                  </div>
                )}
                {isLive(s.href) && <Link href={s.href} className="font-extrabold">{s.t} →</Link>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="eng-h" className="border-t-2 border-ink py-section">
        <div className="container-content">
          <Kicker>Ways to engage</Kicker>
          <h2 id="eng-h" className="m-0 max-w-[22ch] text-h2">Project, service or people. Whatever fits your programme.</h2>
          <NumberedGrid items={engage} cols={4} />
        </div>
      </section>

      <section aria-labelledby="k-h" className="surface-dark bg-navy-900 text-on-navy">
        <Link href="/2klicks/" className="container-content grid items-end gap-x-8 gap-y-6 py-[clamp(3rem,6vw,5rem)] text-on-navy no-underline hover:text-on-navy md:grid-cols-2">
          <div><Kicker onNavy>Our SAP tools</Kicker><h2 id="k-h" className="m-0 max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08]">2Klicks: SAP RE-FX mass data, in two clicks</h2></div>
          <div><p className="m-0 max-w-[46ch] text-[17px] text-on-navy-muted">Our proprietary tools create, update and migrate RE-FX data from one template: 10× faster, 75% lower cost, no programs to develop.</p><span className="mt-4 inline-block font-extrabold text-accent">Explore 2Klicks →</span></div>
        </Link>
      </section>

      <section aria-labelledby="proof-h" className="py-section">
        <div className="container-content max-w-[60rem]">
          <h2 id="proof-h" className="mb-4 mt-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Proof</h2>
          <TestimonialCard {...testimonials.realEstate} />
        </div>
      </section>

      <FAQAccordion id="faq-h" title="Working with Texiri" faqs={faqs} />
      <CTABand title="Tell us where your SAP landscape is today." note="A senior SAP consultant replies within one business day." primary={{ label: "Talk to an SAP expert", href: "/contact/" }} />
    </>
  );
}
