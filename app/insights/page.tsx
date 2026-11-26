import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteImage } from "@/components/ui";
import { Breadcrumbs, CTABand, Hero } from "@/components/sections";
import { articles, formatDate } from "@/lib/insights";
import { isLive, isReady } from "@/lib/pages";

const HREF = "/insights/";

export const metadata: Metadata = {
  title: "Insights: SAP, S/4HANA Migration and Practical AI",
  description: "Notes on SAP, S/4HANA migration and practical AI from the Texiri team: the 2027 ECC deadline and your data, keeping RE-FX lease data clean after go-live, and choosing a first AI use case.",
  alternates: { canonical: HREF },
  robots: { index: isReady(HREF), follow: true },
};

export default function InsightsPage() {
  if (!isLive(HREF)) notFound();
  const live = articles.filter((a) => isLive(a.href));

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: HREF }]} />
      <Hero kicker="Insights" title="Latest thinking" lead="Notes on SAP, S/4HANA migration and practical AI from the Texiri team." />
      <section aria-label="All articles" className="container-content pb-section">
        <ul className="m-0 grid list-none gap-x-6 gap-y-12 p-0 md:grid-cols-2 lg:grid-cols-3">
          {live.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="flex h-full flex-col gap-3 no-underline">
                <SiteImage {...a.image} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-700">{a.category}</span>
                <h2 className="m-0 text-xl leading-tight">{a.title}</h2>
                <p className="m-0 flex-1 text-[15px] text-muted">{a.excerpt}</p>
                <span className="text-sm text-muted"><time dateTime={a.published}>{formatDate(a.published)}</time> · {a.readTime}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CTABand
        title="Tell us what you're working on."
        note="A senior consultant reads every enquiry and replies personally."
        primary={{ label: "Talk to an SAP expert", href: "/contact/" }}
        secondary={{ label: "Explore AI Services", href: "/ai-services/" }}
      />
    </>
  );
}
