import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, H2, ImagePlaceholder, Kicker, Placeholder, Section } from "@/components/ui";
import { CaseStudyCard, CredibilityStrip, CTABand, StickyMobileCTA, TestimonialCard } from "@/components/sections";
import { SapLifecycleDiagram } from "@/components/diagrams";

export const metadata: Metadata = {
  title: { absolute: "Texiri Solutions — SAP Consulting, S/4HANA Data Migration & Managed Services" },
  description: "Founder-led SAP consultancy: SAP implementation and consulting, S/4HANA data migration and MDG, SAP integration and managed services, with 2Klicks migration tools that have programs ready on day 1.",
  alternates: { canonical: "/" },
};

// TODO(cms, step 8): Service, CaseStudy, Testimonial, Article, CommunityEvent from Sanity.
const services = [
  { t: "SAP Consulting", d: "Implementation, functional and technical consulting across RE-FX, FI/CO, PM, MM and SD.", href: "/sap/consulting/" },
  { t: "S/4HANA Data Migration & MDG", d: "Assessment to cutover, accelerated by 2Klicks, with MDG to keep data clean.", href: "/sap/data-migration/", featured: true },
  { t: "SAP Integration", d: "SAP CPI and PI/PO interfaces, built and maintained.", href: "/sap/integration/" },
  { t: "SAP Managed Services", d: "Post-go-live support and continuous optimisation.", href: "/sap/managed-services/" },
];
const cases = [
  { sector: "Utility · Australia", title: "S/4HANA data migration for an asset-intensive utility", metric: "[X]%", metricLabel: "fewer load defects across mock cycles", href: "/case-studies/utility-australia/" },
  { sector: "Retail · USA", title: "Mass master-data update after a business reorganisation", metric: "[X]k", metricLabel: "records updated with 2Klicks Update", href: "/case-studies/retail-usa/" },
  { sector: "Real estate · USA", title: "RE-FX lease portfolio migrated with validations intact", metric: "[X]", metricLabel: "weeks from template to first load", href: "/case-studies/real-estate-usa/" },
];
const quotes = [ // [CLIENT APPROVAL NEEDED] rewritten from existing testimonials
  { quote: "Texiri had our migration objects ready far earlier than planned. We ran more mock loads and went into cutover with confidence.", who: "Utility, Australia" },
  { quote: "They knew our SAP data down to the field. Reconciliations were clean and the business signed off first time.", who: "Major retailer, USA" },
  { quote: "Lease data is hard to move. Texiri moved our RE-FX contracts with every validation intact and kept us informed throughout.", who: "Real-estate company, USA" },
];
const industries = [
  { t: "Real Estate", d: "SAP RE-FX implementation, lease and contract migration, and portfolio changes with 2Klicks Update.", href: "/industries/real-estate/" },
  { t: "Utilities", d: "SAP PM asset and maintenance data, FI/CO structures and governed master data.", href: "/industries/utilities/" },
  { t: "Retail", d: "SAP MM and SD master data at volume, and fast mass updates when the business reorganises.", href: "/industries/retail/" },
];
const insights = [
  { cat: "S/4HANA & Migration", title: "ECC mainstream maintenance ends in 2027. Start with the data.", href: "/insights/ecc-2027-start-with-the-data/" },
  { cat: "SAP", title: "RE-FX after go-live: keeping lease data clean", href: "/insights/re-fx-after-go-live/" },
  { cat: "AI", title: "Choosing your first AI use case in one day", href: "/insights/first-ai-use-case/" },
];

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-h" className="py-[clamp(3rem,7vw,6.5rem)]">
        <div className="container-content grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <Kicker>SAP consulting, founder-led</Kicker>
            <h1 id="hero-h" className="m-0 -ml-[0.04em] text-display">
              <span className="block">Implement SAP.</span><span className="block">Migrate to S/4HANA.</span><span className="block">Run it well.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-muted">Texiri Solutions is led by a founder who started at SAP Labs India and has spent 20+ years delivering SAP across five countries. Our own 2Klicks tools get migration programs running on day 1.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/" arrow data-track="cta_click" data-vertical="sap">Talk to an SAP expert</Button>
              <Button href="/2klicks/demo/" variant="secondary" data-track="2klicks_demo_click">Request a 2Klicks demo</Button>
            </div>
          </div>
          <SapLifecycleDiagram />
        </div>
      </section>

      <CredibilityStrip />

      <Section labelledBy="svc-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Kicker>SAP Services</Kicker><H2 id="svc-h" className="max-w-[18ch]">Everything your SAP landscape needs</H2></div>
          <Link href="/sap/" className="flex min-h-11 items-center gap-2 font-extrabold no-underline">All SAP services<ArrowRight aria-hidden className="size-4.5" /></Link>
        </div>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Link key={s.href} href={s.href} className={`flex flex-col gap-3 border-t-4 bg-surface p-6 no-underline hover:bg-[#d7d3d3] hover:text-ink ${s.featured ? "border-accent" : "border-ink"}`}>
              <span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="m-0 text-[21px]">{s.t}</h3>
              <p className="m-0 flex-1 text-[15px] text-muted">{s.d}</p>
              <span className="text-[15px] font-extrabold">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>

      <section aria-labelledby="now-h" className="border-y-2 border-rule">
        <div className="container-content grid items-start gap-x-8 gap-y-6 py-[clamp(2.5rem,5vw,4rem)] md:grid-cols-4">
          <div><Kicker>Why it matters now</Kicker><h2 id="now-h" className="m-0 text-[clamp(1.625rem,3vw,2.25rem)] leading-[1.1]">The ECC clock is running.</h2></div>
          <div className="border-t-4 border-accent pt-3"><div className="text-2xl font-extrabold">End of 2027</div><p className="mb-0 mt-1 text-[15px] text-muted">SAP ECC 6.0 mainstream maintenance ends.</p></div>
          <div className="border-t-4 border-accent pt-3"><div className="text-2xl font-extrabold">End of 2027</div><p className="mb-0 mt-1 text-[15px] text-muted">SAP PI/PO 7.5 mainstream maintenance ends.</p></div>
          <div className="border-t-4 border-rule pt-3"><div className="text-2xl font-extrabold">2030</div><p className="mb-0 mt-1 text-[15px] text-muted">Optional extended maintenance ends, at additional cost. <Link href="/sap/data-migration/" className="font-bold">Plan your migration →</Link></p></div>
        </div>
      </section>

      <Section labelledBy="klicks-h" tone="navy">
        <div className="grid items-start gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <Kicker onNavy>2Klicks by Texiri</Kicker>
            <H2 id="klicks-h" className="max-w-[16ch] text-on-navy">Migration programs on day 1, not day 120.</H2>
            <p className="mt-6 max-w-[48ch] text-lg text-on-navy-muted">Our own SAP tools recognise your custom fields and validations, so your team skips building at least eight programs per object: specs, mapping, coding, testing and transport.</p>
            <ol className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-3">
              {["Download template", "Enter or modify data", "Upload"].map((s, i) => (
                <li key={s} className="border-t-2 border-accent pt-3"><span className="text-[13px] font-extrabold text-accent">STEP {i + 1}</span><div className="mt-1 text-lg font-extrabold">{s}</div></li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/2klicks/demo/" arrow data-track="2klicks_demo_click">Request a 2Klicks demo</Button>
              <Button href="/2klicks/create/" variant="outline-on-navy">See 2Klicks Create</Button>
            </div>
          </div>
          <ImagePlaceholder label="product UI · 2Klicks Create template screen" ratio="aspect-[16/10]" onNavy />
        </div>
      </Section>

      <Section id="outcomes" labelledBy="outcomes-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Kicker>Outcomes</Kicker><H2 id="outcomes-h">Results from SAP programmes</H2></div>
          <Link href="/case-studies/" className="flex min-h-11 items-center gap-2 font-extrabold no-underline">All case studies<ArrowRight aria-hidden className="size-4.5" /></Link>
        </div>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 lg:grid-cols-3">{cases.map((c) => <CaseStudyCard key={c.title} {...c} />)}</div>
      </Section>

      <Section labelledBy="quotes-h" ruled>
        <div className="flex flex-wrap items-center gap-3"><Kicker>What clients say</Kicker><Placeholder>CLIENT APPROVAL NEEDED</Placeholder></div>
        <H2 id="quotes-h">In their words</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-8 lg:grid-cols-3">{quotes.map((q) => <TestimonialCard key={q.who} {...q} />)}</div>
      </Section>

      <Section id="industries" labelledBy="ind-h" tone="surface">
        <Kicker>Industries</Kicker>
        <H2 id="ind-h" className="max-w-[20ch]">SAP for the sectors we know best</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid border-t-2 border-ink md:grid-cols-3">
          {industries.map((i) => (
            <Link key={i.href} href={i.href} className="flex flex-col gap-3 border-b border-hairline py-6 pr-6 no-underline">
              <h3 className="m-0 text-2xl">{i.t}</h3><p className="m-0 text-muted">{i.d}</p><span className="text-[15px] font-extrabold">{i.t} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* VerticalBand — AI Services: a second business line, its own accent and dot-grid motif */}
      <section aria-labelledby="ai-h" className="ai-grid bg-navy-900 py-[clamp(4rem,9vw,7rem)] text-on-navy">
        <div className="container-content grid items-end gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 text-kicker font-semibold uppercase tracking-[0.1em] text-ai"><span aria-hidden className="size-2.5 bg-ai" />Also from Texiri · AI Services</span>
            <H2 id="ai-h" className="max-w-[16ch] text-on-navy">Practical AI, from strategy to production.</H2>
            <Link href="/ai-services/" data-track="cta_click" data-vertical="ai" className="mt-8 inline-flex min-h-13 items-center gap-2.5 bg-ai px-5 font-extrabold text-navy-900 no-underline hover:bg-ai-600 hover:text-navy-900">Explore AI Services<ArrowRight aria-hidden className="size-4.5" /></Link>
          </div>
          <ul className="m-0 list-none p-0">
            {[["AI strategy & readiness", "A one-day workshop and a ranked list of use cases worth piloting."], ["Generative AI & RAG", "Assistants and document intelligence grounded in your own knowledge."], ["ML, MLOps & governance", "Forecasting and models that run in production, monitored and accountable."]].map(([t, d]) => (
              <li key={t} className="border-t-2 border-ai/60 py-4 last:border-b-2"><strong className="text-lg">{t}</strong><p className="mb-0 mt-1 text-on-navy-muted">{d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* VerticalBand — AI Community: friendlier palette, rounded components */}
      <section aria-labelledby="com-h" className="bg-com-bg py-[clamp(4rem,9vw,7rem)]">
        <div className="container-content grid items-center gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-2">
          <div>
            <span className="rounded-pill mb-4 inline-flex bg-com-tint px-3.5 py-1.5 text-[13px] font-bold text-com-ink">TEXIRI AI Community</span>
            <H2 id="com-h" className="max-w-[16ch]">Learn AI with the TEXIRI AI Community</H2>
            <p className="mt-6 max-w-[46ch] text-lg text-muted">Sessions, hands-on workshops and projects for anyone curious about AI. It started in Vijayapura, and no experience is needed.</p>
            <Link href="/ai-community/join/" data-track="cta_click" data-vertical="community" className="rounded-pill mt-8 inline-flex min-h-13 items-center gap-2.5 bg-com px-6 font-extrabold text-navy-900 no-underline hover:bg-com-600 hover:text-navy-900">Join the community<ArrowRight aria-hidden className="size-4.5" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/ai-community/events/" className="rounded-com flex flex-col gap-2 bg-com-surface p-6 no-underline shadow-sm hover:shadow-md">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-com-ink">Next event</span>
              <strong className="text-[19px]">[Event title]</strong>
              <span className="text-sm text-muted">[Date] · Vijayapura + online</span>
              <Placeholder />
            </Link>
            <div className="rounded-com flex flex-col gap-2 bg-com p-6">
              <span className="text-xs font-bold uppercase tracking-[0.08em]">Members</span>
              <strong className="text-[44px] leading-none">[X]</strong>
              <span className="text-sm">learners and counting</span>
              <Placeholder />
            </div>
          </div>
        </div>
      </section>

      <Section id="insights" labelledBy="ins-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Kicker>Insights</Kicker><H2 id="ins-h">Latest thinking</H2></div>
          <Link href="/insights/" className="flex min-h-11 items-center gap-2 font-extrabold no-underline">All insights<ArrowRight aria-hidden className="size-4.5" /></Link>
        </div>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 md:grid-cols-3">
          {insights.map((a) => (
            <Link key={a.href} href={a.href} className="flex flex-col gap-3 no-underline">
              <ImagePlaceholder label="article illustration" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-700">{a.cat}</span>
              <h3 className="m-0 text-xl leading-tight">{a.title}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <CTABand
        title={<><span className="block">Planning an SAP implementation or S/4HANA migration?</span><span className="block">Talk to a senior SAP consultant.</span></>}
        note="A senior SAP consultant replies within one business day."
        primary={{ label: "Talk to an SAP expert", href: "/contact/" }}
        secondary={{ label: "Request a 2Klicks demo", href: "/2klicks/demo/" }}
      />
      <StickyMobileCTA label="Talk to an SAP expert" href="/contact/" />
    </>
  );
}
