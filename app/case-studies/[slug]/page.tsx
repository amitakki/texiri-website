import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Trophy, Wrench, type LucideIcon } from "lucide-react";
import { Kicker, Section } from "@/components/ui";
import { CaseFlow } from "@/components/visuals";
import { Breadcrumbs, CTABand, TestimonialCard } from "@/components/sections";
import { caseBySlug, caseHref, caseStudies } from "@/lib/case-studies";
import { testimonials } from "@/lib/company";

// Only the case studies in lib/case-studies.ts exist; anything else is a real 404.
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = caseBySlug((await params).slug);
  return c ? { title: `Case Study: ${c.title}`, description: c.summary, alternates: { canonical: caseHref(c) } } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const c = caseBySlug((await params).slug);
  if (!c) notFound();
  const columns: { t: string; icon: LucideIcon; items: string[]; dark?: boolean }[] = [
    { t: "Client challenge", icon: AlertTriangle, items: c.challenge },
    { t: "Texiri solution", icon: Wrench, items: c.solution },
    { t: "Business impact", icon: Trophy, items: c.impact, dark: true },
  ];
  const others = caseStudies.filter((o) => o.slug !== c.slug);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies/" }, { label: c.sector, href: caseHref(c) }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="hero-enter container-content">
          <Kicker>Case study · {c.sector}</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[22ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.018em]">{c.title}</h1>
          <div className="mt-8 grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
            <p className="m-0 max-w-[52ch] text-lead text-muted">{c.summary}</p>
            <div className="flex flex-wrap items-baseline gap-3 bg-surface p-5">
              <span className="text-[48px] font-extrabold leading-none">{c.metric}</span>
              <span className="text-[15px] text-muted">{c.metricLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-content pb-[clamp(2.5rem,5vw,4rem)]">
        <CaseFlow from={c.from} steps={c.steps} note={c.stepsNote} target={c.target} />
      </div>

      <section aria-label="Challenge, solution and impact" className="pb-section">
        <div className="container-content grid gap-4 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.t} className={`flex flex-col gap-4 border-t-4 p-6 ${col.dark ? "surface-dark border-accent bg-navy-900 text-on-navy" : "border-ink bg-surface"}`}>
              <h2 className={`m-0 flex items-center gap-3 text-[22px] ${col.dark ? "text-on-navy" : ""}`}><col.icon aria-hidden className={`size-6 ${col.dark ? "text-accent" : "text-accent-700"}`} />{col.t}</h2>
              <ul className="m-0 flex flex-col gap-2.5 pl-5 text-[16px]">{col.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {c.testimonial && (
        <section aria-labelledby="quote-h" className="pb-section">
          <div className="container-content max-w-[60rem]">
            <h2 id="quote-h" className="mb-4 mt-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">What the client said</h2>
            <TestimonialCard {...testimonials[c.testimonial]} />
          </div>
        </section>
      )}

      <Section labelledBy="rel-h" ruled>
        <h2 id="rel-h" className="m-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Related</h2>
        <ul className="mt-6 grid list-none gap-x-8 p-0 md:grid-cols-2 lg:grid-cols-3">
          {c.services.map((s) => <li key={s.href} className="border-t border-hairline py-4"><Link href={s.href} className="font-extrabold">{s.label} →</Link></li>)}
          {others.map((o) => <li key={o.slug} className="border-t border-hairline py-4"><Link href={caseHref(o)} className="font-extrabold">Case study: {o.title} →</Link></li>)}
        </ul>
      </Section>

      <CTABand title="Planning something similar? Talk to the team that delivered it." note="A senior SAP consultant replies within one business day." primary={{ label: "Talk to an SAP expert", href: "/contact/" }} />
    </>
  );
}
