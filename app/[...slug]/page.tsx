import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Placeholder, SiteImage } from "@/components/ui";
import { Breadcrumbs, CheckList, CTABand, Hero, StickyMobileCTA } from "@/components/sections";
import { images } from "@/lib/images";
import { interimPages } from "@/lib/pages";

// Only the routes in lib/pages.ts exist; anything else is a real 404.
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string[] }> };

const pathOf = (slug: string[]) => `/${slug.join("/")}/`;

/** Stand-in hero image per section until each page gets its own. */
function heroImage(href: string) {
  if (href.startsWith("/2klicks")) return images.klicksUi;
  if (href.startsWith("/ai-services")) return images.aiWorkshop;
  if (href.startsWith("/ai-community/events")) return images.communityWorkshop;
  if (href.startsWith("/ai-community")) return images.communityDemo;
  if (href.startsWith("/case-studies")) return images.dataMigration;
  if (href.startsWith("/industries/real-estate") || href.includes("re-fx")) return images.articleRefx;
  if (href.startsWith("/industries")) return images.office;
  if (href.includes("first-ai")) return images.articleAi;
  if (href.startsWith("/insights")) return images.articleEcc;
  return images.consultingTeam;
}

export function generateStaticParams() {
  return Object.keys(interimPages).map((href) => ({ slug: href.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const href = pathOf((await params).slug);
  const page = interimPages[href];
  // Interim content stays out of search results until each page gets its real content.
  return page ? { title: page.title, description: page.lead, alternates: { canonical: href }, robots: { index: false, follow: true } } : {};
}

export default async function InterimPage({ params }: Props) {
  const href = pathOf((await params).slug);
  const page = interimPages[href];
  if (!page) notFound();
  const vertical = page.vertical === "ai" ? "ai" : "sap";

  return (
    <>
      <Breadcrumbs items={page.crumbs} />
      <Hero
        kicker={page.kicker}
        title={page.title}
        lead={page.lead}
        aside={<SiteImage {...heroImage(href)} ratio="aspect-[4/3]" priority className={page.vertical === "community" ? "rounded-com" : ""} />}
        actions={
          <>
            {page.cta && <Button href={page.cta.href} arrow data-track="cta_click" data-vertical={page.vertical ?? "sap"}>{page.cta.label}</Button>}
            <Placeholder>CONTENT IN PROGRESS</Placeholder>
          </>
        }
      />

      {page.points && page.points.length > 0 && (
        <section aria-label="Overview" className="pb-section">
          <div className="container-content"><CheckList items={page.points} /></div>
        </section>
      )}

      {page.related && page.related.length > 0 && (
        <section aria-labelledby="related-h" className="border-t-2 border-ink">
          <div className="container-content py-[clamp(2.5rem,5vw,4rem)]">
            <h2 id="related-h" className="m-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Related</h2>
            <ul className="mt-6 grid list-none gap-x-8 p-0 md:grid-cols-2 lg:grid-cols-3">
              {page.related.map((r) => (
                <li key={r.href} className="border-t border-hairline py-4"><Link href={r.href} className="font-extrabold">{r.label} →</Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {page.cta && page.vertical !== "community" && (
        <>
          <CTABand title="Tell us what you're working on." note="A senior consultant replies within one business day." primary={page.cta} vertical={vertical} />
          <StickyMobileCTA label={page.cta.label} href={page.cta.href} vertical={vertical} />
        </>
      )}
      {page.cta && page.vertical === "community" && <StickyMobileCTA label={page.cta.label} href={page.cta.href} vertical="community" />}
    </>
  );
}
