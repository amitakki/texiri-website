import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, DatabaseZap, Layers, LifeBuoy, Sparkles, Users, type LucideIcon } from "lucide-react";
import { Button, H2, Kicker, Placeholder, Section, SiteImage } from "@/components/ui";
import { CaseStudyCard, CredibilityStrip, CTABand, TestimonialCard } from "@/components/sections";
import { SapServicesPanel } from "@/components/diagrams";
import { KlicksFlow } from "@/components/visuals";
import { caseHref, caseStudies } from "@/lib/case-studies";
import { testimonials } from "@/lib/company";
import { industries } from "@/lib/industries";
import { images } from "@/lib/images";
import { isLive } from "@/lib/pages";
import { DEMO_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Texiri Solutions — SAP Consulting & S/4HANA Migration" },
  description: "SAP consultancy: SAP implementation and consulting (RE-FX, FICO, PS, PM), S/4HANA data migration and MDG, SAP BTP and managed services, with proprietary 2Klicks tools for SAP RE-FX mass data, from one Excel template with no programs to develop.",
  alternates: { canonical: "/" },
};

// TODO(cms, step 8): Service, CaseStudy, Testimonial, Article from Sanity.
const services: { t: string; d: string; href: string; icon: LucideIcon; featured?: boolean }[] = [
  { t: "SAP Consulting", d: "RE-FX & lease accounting, FICO, Project Systems (PS), Plant Maintenance and MM.", href: "/sap/consulting/", icon: Layers },
  { t: "S/4HANA, Data Migration & MDG", d: "Greenfield, brownfield and bluefield migrations with BODS, Syniti ADM and 2Klicks.", href: "/sap/data-migration/", icon: DatabaseZap, featured: true },
  { t: "SAP BTP & Development", d: "Clean-core extensions, Fiori apps, ABAP and integration.", href: "/sap/btp/", icon: Boxes },
  { t: "SAP Managed Services", d: "Basis to functional support under one roof, plus experienced consultants on demand.", href: "/sap/managed-services/", icon: LifeBuoy },
];
const cases = caseStudies.map((c) => ({ sector: c.sector, title: c.title, metric: c.metric, metricLabel: c.metricLabel, href: caseHref(c) }));
const insights = [
  { cat: "S/4HANA & Migration", title: "ECC mainstream maintenance ends in 2027. Start with the data.", href: "/insights/ecc-2027-start-with-the-data/", img: images.articleEcc },
  { cat: "SAP", title: "RE-FX after go-live: keeping lease data clean", href: "/insights/re-fx-after-go-live/", img: images.articleRefx },
  { cat: "AI", title: "Choosing your first AI use case in one day", href: "/insights/first-ai-use-case/", img: images.articleAi },
].filter((a) => isLive(a.href));

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-h" className="py-[clamp(3rem,7vw,6.5rem)]">
        <div className="container-content grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1.4fr_1fr]">
          <div className="hero-enter">
            <Kicker>SAP consulting · S/4HANA · BTP</Kicker>
            <h1 id="hero-h" className="m-0 -ml-[0.04em] text-display">
              <span className="block">Implement SAP.</span><span className="block">Migrate to S/4HANA.</span><span className="block">Run it well.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-muted">One senior team for SAP implementation, S/4HANA data migration, SAP BTP and managed services, backed by our own proprietary 2Klicks tools.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/" arrow data-track="cta_click" data-vertical="sap">Talk to an SAP expert</Button>
              <Button href={DEMO_HREF} variant="secondary" data-track="2klicks_demo_click">Request a 2Klicks demo</Button>
            </div>
          </div>
          <div className="hero-enter-late"><SapServicesPanel /></div>
        </div>
      </section>

      <CredibilityStrip />

      <Section labelledBy="svc-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Kicker>SAP Services</Kicker><H2 id="svc-h" className="max-w-[18ch]">Everything your SAP landscape needs</H2></div>
          <Link href="/sap/" className="flex min-h-11 items-center gap-2 font-extrabold no-underline">All SAP services<ArrowRight aria-hidden className="size-4.5" /></Link>
        </div>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.filter((s) => isLive(s.href)).map((s, i) => (
            <Link key={s.href} href={s.href} className={`lift flex flex-col gap-3 border-t-4 bg-surface p-6 no-underline hover:bg-surface-strong hover:text-ink ${s.featured ? "border-accent" : "border-ink"}`}>
              <span className="flex items-center justify-between"><span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span><s.icon aria-hidden className="size-6 text-accent-700" /></span>
              <h3 className="m-0 text-[21px]">{s.t}</h3>
              <p className="m-0 flex-1 text-[15px] text-muted">{s.d}</p>
              <span className="text-[15px] font-extrabold">Learn more →</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">Industries</span>
          {industries.map((i) => <Link key={i.id} href={`/industries/#${i.id}`} className="flex min-h-11 items-center font-extrabold no-underline">{i.short} →</Link>)}
        </div>
      </Section>

      <Section labelledBy="klicks-h" tone="navy">
        <div className="grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
          <div>
            <Kicker onNavy>2Klicks by Texiri</Kicker>
            <H2 id="klicks-h" className="max-w-[16ch] text-on-navy">SAP RE-FX mass data, 10× faster.</H2>
          </div>
          <div>
            <p className="m-0 max-w-[48ch] text-lg text-on-navy-muted">Create, update and migrate RE-FX data from one Excel template, at 75% lower cost and with no programs to develop. Our proprietary tools run inside ECC and S/4HANA and handle your custom fields.</p>
            <p className="mb-0 mt-3"><Placeholder>BENCHMARK TO VERIFY · X10</Placeholder></p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={DEMO_HREF} arrow data-track="2klicks_demo_click">Request a 2Klicks demo</Button>
              <Button href="/2klicks/" variant="outline-on-navy">Explore 2Klicks</Button>
            </div>
          </div>
        </div>
        <div className="mt-[clamp(2.5rem,5vw,4rem)]"><KlicksFlow onNavy /></div>
        <p className="mb-0 mt-8 border-t border-on-navy/20 pt-5 text-[15px] text-on-navy-muted">
          <strong className="text-on-navy">The ECC clock is running.</strong> SAP ECC 6.0 and PI/PO 7.5 mainstream maintenance ends at the end of 2027.{" "}
          <Link href="/sap/data-migration/" className="inline-flex min-h-11 items-center font-bold text-accent">Plan your migration →</Link>
        </p>
      </Section>

      <Section id="outcomes" labelledBy="outcomes-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Kicker>Outcomes</Kicker><H2 id="outcomes-h">Results from SAP programmes</H2></div>
          <Link href="/case-studies/" className="flex min-h-11 items-center gap-2 font-extrabold no-underline">All case studies<ArrowRight aria-hidden className="size-4.5" /></Link>
        </div>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 lg:grid-cols-3">{cases.map((c) => <CaseStudyCard key={c.title} {...c} />)}</div>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] max-w-3xl"><TestimonialCard {...testimonials.retail} /></div>
      </Section>

      <Section labelledBy="also-h" tone="surface">
        <Kicker>Also from Texiri</Kicker>
        <H2 id="also-h" className="sr-only">AI Services and the TEXIRI AI Community</H2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/ai-services/" data-track="cta_click" data-vertical="ai" className="lift surface-dark ai-grid flex flex-col gap-3 border-t-4 border-ai bg-navy-900 p-7 text-on-navy no-underline hover:text-on-navy">
            <Sparkles aria-hidden className="size-7 text-ai" />
            <h3 className="m-0 text-2xl">AI Services</h3>
            <p className="m-0 flex-1 text-on-navy-muted">Practical AI, from a one-day readiness workshop to models running in production.</p>
            <span className="font-extrabold text-ai">Explore AI Services →</span>
          </Link>
          <Link href="/ai-community/" data-track="cta_click" data-vertical="community" className="lift rounded-com flex flex-col gap-3 bg-com-bg p-7 no-underline">
            <Users aria-hidden className="size-7 text-com-ink" />
            <h3 className="m-0 text-2xl">TEXIRI AI Community</h3>
            <p className="m-0 flex-1 text-muted">Sessions, workshops and projects for anyone curious about AI. It started in Vijayapura.</p>
            <span className="font-extrabold">Join the community →</span>
          </Link>
        </div>
      </Section>

      {insights.length > 0 && (
        <Section id="insights" labelledBy="ins-h">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><Kicker>Insights</Kicker><H2 id="ins-h">Latest thinking</H2></div>
            {isLive("/insights/") && <Link href="/insights/" className="flex min-h-11 items-center gap-2 font-extrabold no-underline">All insights<ArrowRight aria-hidden className="size-4.5" /></Link>}
          </div>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 md:grid-cols-3">
            {insights.map((a) => (
              <Link key={a.href} href={a.href} className="flex flex-col gap-3 no-underline">
                <SiteImage {...a.img} alt="" sizes="(min-width: 768px) 33vw, 100vw" />
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-700">{a.cat}</span>
                <h3 className="m-0 text-xl leading-tight">{a.title}</h3>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTABand
        title={<><span className="block">Planning an SAP implementation or S/4HANA migration?</span><span className="block">Talk to a senior SAP consultant.</span></>}
        note="A senior SAP consultant replies within one business day."
        primary={{ label: "Talk to an SAP expert", href: "/contact/" }}
        secondary={{ label: "Request a 2Klicks demo", href: DEMO_HREF }}
      />
    </>
  );
}
