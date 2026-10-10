import Link from "next/link";
import { Check, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button, H2, Kicker, Placeholder } from "./ui";
import { SITE_URL } from "@/lib/site";

export const isUnconfirmed = (text: string) => /\[TO (CONFIRM|VERIFY)\]/.test(text);

/** Use tone="navy" when the breadcrumbs sit on a navy background (e.g. the AI Services hero). */
export function Breadcrumbs({ items, tone = "light" }: { items: { label: string; href: string }[]; tone?: "light" | "navy" }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: `${SITE_URL}${it.href}` })),
  };
  const navy = tone === "navy";
  return (
    <nav aria-label="Breadcrumb" className="container-content pt-4">
      <ol className={`m-0 flex list-none flex-wrap gap-2 p-0 text-[13px] ${navy ? "text-on-navy-muted" : "text-muted"}`}>
        {items.map((it, i) => (
          <li key={it.href} className="flex gap-2">
            {i < items.length - 1
              ? <><Link href={it.href} className={navy ? "hover:text-ai" : undefined}>{it.label}</Link><span aria-hidden>/</span></>
              : <span aria-current="page" className={`font-semibold ${navy ? "text-on-navy" : "text-ink"}`}>{it.label}</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

export function Hero({ kicker, title, lead, actions, aside, id = "hero-h" }:
  { kicker: string; title: ReactNode; lead: string; actions: ReactNode; aside?: ReactNode; id?: string }) {
  return (
    <section aria-labelledby={id} className="py-[clamp(2.5rem,6vw,5.5rem)]">
      <div className="container-content grid items-end gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
        <div>
          <Kicker>{kicker}</Kicker>
          <h1 id={id} className="m-0 -ml-[0.04em] max-w-[16ch] text-display">{title}</h1>
          <p className="mt-6 max-w-[52ch] text-lead text-muted">{lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        </div>
        {aside}
      </div>
    </section>
  );
}

export function CredibilityStrip() {
  const items = [
    ["Founder-led since SAP Labs India", "Our CEO began his career at SAP Labs India."],
    ["20+ years in SAP", "Consulting and enterprise transformation."],
    ["Delivery across 5 countries", "India, USA, Germany, Singapore, Australia."],
    ["Patented SAP migration tools", "2Klicks Create and 2Klicks Update."],
  ];
  return (
    <section aria-label="Credentials" className="border-y-2 border-rule">
      <div className="container-content grid sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([t, d]) => (
          <div key={t} className="border-hairline py-6 pr-6 lg:border-r lg:last:border-r-0">
            <div className="text-lg font-extrabold">{t}</div>
            <div className="mt-1 text-sm text-muted">{d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NumberedGrid({ items, cols = 3 }: { items: { title: string; body: string }[]; cols?: 3 | 4 | 5 }) {
  const c = { 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4", 5: "md:grid-cols-3 lg:grid-cols-5" }[cols];
  return (
    <ol className={`mt-[clamp(2.5rem,5vw,4rem)] grid list-none gap-8 p-0 ${c}`}>
      {items.map((it, i) => (
        <li key={it.title} className="border-t-2 border-current pt-4">
          <span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mb-2 mt-3 text-[22px]">{it.title}</h3>
          <p className="m-0 text-base text-muted">{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ul className="m-0 grid list-none gap-x-8 p-0 md:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <li key={c.t} className="grid grid-cols-[28px_1fr] gap-3 border-t-2 border-ink py-6">
          <Check aria-hidden className="mt-0.5 size-5.5 text-accent-700" />
          <div><h3 className="mb-1 text-[19px]">{c.t}</h3><p className="m-0 text-[15px] text-muted">{c.d}</p></div>
        </li>
      ))}
    </ul>
  );
}

export function TestimonialCard({ quote, who }: { quote: string; who: string }) {
  return (
    <figure className="m-0 flex flex-col gap-4 border-t-2 border-ink pt-6">
      <blockquote className="m-0 flex-1 text-xl font-semibold leading-[1.45]">“{quote}”</blockquote>
      <figcaption className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">{who}</figcaption>
    </figure>
  );
}

export function CaseStudyCard({ sector, title, metric, metricLabel, href }:
  { sector: string; title: string; metric: string; metricLabel: string; href: string }) {
  return (
    <article className="flex flex-col gap-3 border-t-2 border-ink pt-4">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{sector}</span>
      <h3 className="m-0 text-[22px]">{title}</h3>
      <div className="flex flex-wrap items-baseline gap-2 bg-surface p-4">
        <span className="text-[40px] font-extrabold leading-none">{metric}</span>
        <span className="text-sm text-muted">{metricLabel}</span>
        <Placeholder />
      </div>
      <Link href={href} className="flex min-h-11 items-center gap-2 font-extrabold no-underline">
        Read the case study<span className="sr-only">: {title}</span>
      </Link>
    </article>
  );
}

export function FAQAccordion({ id, title, faqs }: { id: string; title: string; faqs: { q: string; a: string }[] }) {
  // Answers still awaiting confirmation ("[TO CONFIRM]") are left out of the structured data.
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.filter((f) => !isUnconfirmed(f.a)).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <section aria-labelledby={id} className="py-section">
      <div className="container-content flex flex-wrap gap-8">
        <div className="flex-[1_1_280px]"><Kicker>FAQs</Kicker><H2 id={id} className="max-w-[12ch]">{title}</H2></div>
        <div className="min-w-0 flex-[2_1_480px] border-t-2 border-ink">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex min-h-16 items-center justify-between gap-4 py-3 text-lg font-extrabold">
                {f.q}<Plus aria-hidden className="size-5 flex-none transition-transform group-open:rotate-45" />
              </summary>
              <p className="mb-6 mt-0 max-w-[68ch] text-base text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

export function CTABand({ id = "contact", title, note, primary, secondary, vertical = "sap" }:
  { id?: string; title: ReactNode; note: string; primary: { label: string; href: string }; secondary?: { label: string; href: string }; vertical?: "sap" | "ai" }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`surface-bright ${vertical === "ai" ? "bg-ai" : "bg-accent"} py-[clamp(4rem,9vw,7.5rem)] text-navy-900`}>
      <div className="container-content">
        <h2 id={`${id}-h`} className="m-0 max-w-[22ch] text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.025em] text-navy-900">{title}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={primary.href} variant="navy" arrow data-track="cta_click">{primary.label}</Button>
          {secondary && <Button href={secondary.href} variant="outline-on-accent" data-track="cta_click">{secondary.label}</Button>}
        </div>
        <p className="mb-0 mt-6 text-base font-semibold">{note}</p>
      </div>
    </section>
  );
}

const stickyTone = {
  sap: "bg-accent hover:bg-accent-600",
  ai: "bg-ai hover:bg-ai-600",
  community: "rounded-pill bg-com hover:bg-com-600",
} as const;

/** Context-specific sticky CTA on mobile only. 48px tall. */
export function StickyMobileCTA({ label, href, vertical = "sap" }: { label: string; href: string; vertical?: keyof typeof stickyTone }) {
  return (
    <div className={`sticky bottom-0 z-40 grid border-t-2 border-rule px-4 py-2.5 md:hidden ${vertical === "community" ? "bg-com-bg" : "bg-ground"}`}>
      <Link href={href} data-track="cta_click" data-vertical={vertical} className={`flex min-h-12 items-center px-5 font-extrabold text-navy-900 no-underline hover:text-navy-900 ${stickyTone[vertical]}`}>{label}</Link>
    </div>
  );
}
