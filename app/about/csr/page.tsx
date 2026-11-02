import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, H2, Kicker, Placeholder, SiteImage } from "@/components/ui";
import { Breadcrumbs, CTABand, Hero } from "@/components/sections";
import { PhotoGrid } from "@/components/PhotoGrid";
import { csrEvents } from "@/lib/gallery";
import { isLive, isReady } from "@/lib/pages";

const HREF = "/about/csr/";

export const metadata: Metadata = {
  title: "CSR: Corporate Social Responsibility",
  description: "Corporate social responsibility at Texiri Solutions: our CSR activities and events in Vijayapura and Navi Mumbai, with photos from each one.",
  alternates: { canonical: HREF },
  // Stays out of search results until at least one real event is in (lib/gallery.ts).
  robots: { index: isReady(HREF), follow: true },
};

export default function CsrPage() {
  // Hidden on production while every event is still an example slot.
  if (!isLive(HREF)) notFound();
  const cover = csrEvents[0]?.photos[0];

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about/" }, { label: "CSR", href: HREF }]} />
      <Hero
        kicker="CSR at Texiri"
        title="Giving back where we live and work."
        lead="Our corporate social responsibility activities and events: what we did, who we did it with, and photos from each one."
        actions={<><Button href="#events" arrow>See our CSR events</Button><Button href="/contact/" variant="secondary">Partner with us</Button></>}
        aside={cover && <SiteImage {...cover} ratio="aspect-[4/3]" priority />}
      />

      <section id="events" aria-labelledby="events-h" className="scroll-mt-20 border-t-2 border-ink py-section">
        <div className="container-content">
          <Kicker>CSR events</Kicker>
          <H2 id="events-h">What we&apos;ve done so far</H2>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(3rem,6vw,5rem)]">
            {csrEvents.map((e) => (
              <article key={e.id} id={e.id} aria-labelledby={`${e.id}-h`} className="grid scroll-mt-20 gap-x-[clamp(2rem,4vw,4rem)] gap-y-6 border-t border-rule pt-8 lg:grid-cols-[1fr_2fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-accent-700">
                    <span>{e.date}</span><span aria-hidden>·</span><span>{e.place}</span>
                    {e.placeholder && <Placeholder>EXAMPLE EVENT</Placeholder>}
                  </div>
                  <h3 id={`${e.id}-h`} className="mb-0 mt-3 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">{e.title}</h3>
                  <p className="mb-0 mt-4 max-w-[48ch] text-[17px] text-muted">{e.summary}</p>
                </div>
                <PhotoGrid photos={e.photos} label={`Photos: ${e.title}`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Working on a community initiative? Let's talk." note="Tell us about the cause and how we could help." primary={{ label: "Contact us", href: "/contact/" }} secondary={{ label: "Life at Texiri", href: "/careers/#life" }} />
    </>
  );
}
