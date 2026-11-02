import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Factory, Fuel, HeartPulse, Landmark, ShoppingCart, Zap, type LucideIcon } from "lucide-react";
import { Button, H2, Kicker, Section } from "@/components/ui";
import { Breadcrumbs, CTABand, Hero } from "@/components/sections";
import { caseBySlug, caseHref } from "@/lib/case-studies";
import { industries, type Industry } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries: SAP for 7 Sectors",
  description: "SAP consulting and S/4HANA data migration for real estate, retail, utilities and energy, oil and gas, healthcare and pharmaceuticals, manufacturing, and financial services.",
  alternates: { canonical: "/industries/" },
};

const icons: Record<Industry["icon"], LucideIcon> = { realEstate: Building2, retail: ShoppingCart, utilities: Zap, oilGas: Fuel, pharma: HeartPulse, manufacturing: Factory, finance: Landmark };

export default function IndustriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries/" }]} />
      <Hero
        kicker="Industries"
        title="SAP for 7 industries across 5 continents."
        lead="Where our SAP implementation, asset management and data-migration experience runs deepest, for clients in the USA, Europe, the Middle East, Australia and India."
        actions={<><Button href="/contact/" arrow data-track="cta_click" data-vertical="sap">Talk to an SAP expert</Button><Button href="/case-studies/" variant="secondary">See case studies</Button></>}
        aside={
          <nav aria-label="Industries on this page" className="bg-navy-900 p-[clamp(1.25rem,3vw,2rem)] text-on-navy">
            <ul className="m-0 grid list-none gap-x-4 p-0 sm:grid-cols-2">
              {industries.map((i) => {
                const Icon = icons[i.icon];
                return <li key={i.id} className="border-t border-on-navy/20"><Link href={`#${i.id}`} className="flex min-h-12 items-center gap-3 font-bold text-on-navy no-underline hover:text-accent"><Icon aria-hidden className="size-5 flex-none text-accent" />{i.t}</Link></li>;
              })}
            </ul>
          </nav>
        }
      />

      <section aria-label="Industries" className="border-t-2 border-ink">
        <div className="container-content">
          {industries.map((ind, n) => {
            const Icon = icons[ind.icon];
            const cases = (ind.cases ?? []).map(caseBySlug).filter((c) => c !== undefined);
            return (
              <article key={ind.id} id={ind.id} aria-labelledby={`${ind.id}-h`} className="grid scroll-mt-20 gap-x-[clamp(2rem,4vw,4rem)] gap-y-5 border-b-2 border-rule py-[clamp(2.5rem,5vw,4rem)] last:border-b-0 lg:grid-cols-2">
                <div>
                  <span className="flex items-center gap-3"><span className="text-sm font-extrabold text-accent-700">{String(n + 1).padStart(2, "0")}</span><Icon aria-hidden className="size-6 text-accent-700" /></span>
                  <h2 id={`${ind.id}-h`} className="mb-3 mt-2 text-[clamp(1.625rem,3vw,2.25rem)]">{ind.t}</h2>
                  <p className="m-0 max-w-[48ch] text-[17px] text-muted">{ind.d}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Services</span>
                    <ul className="m-0 mt-2 list-none p-0">
                      {ind.services.map((s) => <li key={s.href} className="border-t border-hairline"><Link href={s.href} className="flex min-h-11 items-center font-extrabold no-underline">{s.label} →</Link></li>)}
                    </ul>
                  </div>
                  {cases.map((c) => (
                    <Link key={c.slug} href={caseHref(c)} className="flex flex-col gap-1.5 border-t-4 border-accent bg-surface p-5 no-underline" data-track="case_study_view">
                      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Case study · {c.sector}</span>
                      <strong className="text-lg leading-snug">{c.title}</strong>
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Section labelledBy="x-h" tone="navy">
        <div className="grid items-end gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <Kicker onNavy>Every industry</Kicker>
            <H2 id="x-h" className="text-on-navy">Cross-industry data migration &amp; analytics</H2>
          </div>
          <div>
            <p className="m-0 max-w-[48ch] text-[17px] text-on-navy-muted">End-to-end data migration, from planning through extraction, cleansing and loading to governance, using SAP BODS, Syniti ADM and our 2Klicks accelerator for fast, low-risk cutovers.</p>
            <Link href="/sap/data-migration/" className="mt-4 inline-flex min-h-11 items-center font-extrabold text-accent">S/4HANA, Data Migration &amp; MDG →</Link>
          </div>
        </div>
      </Section>

      <CTABand title="Tell us about your industry and your SAP landscape." note="A senior SAP consultant replies within one business day." primary={{ label: "Talk to an SAP expert", href: "/contact/" }} />
    </>
  );
}
