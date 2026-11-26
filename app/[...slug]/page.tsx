import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Placeholder, SiteImage } from "@/components/ui";
import { ArticleRelated } from "@/components/article";
import { Breadcrumbs, CheckList, CTABand, Hero } from "@/components/sections";
import { images } from "@/lib/images";
import { interimPages, isLive } from "@/lib/pages";

// Only the routes in lib/pages.ts exist; anything else is a real 404.
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string[] }> };

const pathOf = (slug: string[]) => `/${slug.join("/")}/`;

/** Stand-in hero image per section until each page gets its own. Community pages have none (content decision M7). */
function heroImage(href: string) {
  if (href.startsWith("/ai-community")) return undefined;
  return images.consultingTeam;
}

export function generateStaticParams() {
  return Object.keys(interimPages).map((href) => ({ slug: href.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const href = pathOf((await params).slug);
  const page = interimPages[href];
  // Interim content stays out of search results until the page is marked `ready` (real content in).
  return page ? { title: page.title, description: page.lead, alternates: { canonical: href }, robots: { index: page.ready === true, follow: true } } : {};
}

export default async function InterimPage({ params }: Props) {
  const href = pathOf((await params).slug);
  const page = interimPages[href];
  if (!page) notFound();
  const related = (page.related ?? []).filter((r) => isLive(r.href));
  const vertical = page.vertical === "ai" ? "ai" : "sap";
  const image = heroImage(href);

  return (
    <>
      <Breadcrumbs items={page.crumbs} />
      <Hero
        kicker={page.kicker}
        title={page.title}
        lead={page.lead}
        aside={image && <SiteImage {...image} ratio="aspect-[4/3]" priority />}
        actions={
          <>
            {page.cta && <Button href={page.cta.href} arrow data-track="cta_click" data-vertical={page.vertical ?? "sap"}>{page.cta.label}</Button>}
            {/* Marks stub content on previews, and lets `npm run placeholders -- --strict` find it before launch. */}
            {!page.ready && <Placeholder>CONTENT IN PROGRESS</Placeholder>}
          </>
        }
      />

      {page.points && page.points.length > 0 && (
        <section aria-label="Overview" className="pb-section">
          <div className="container-content"><CheckList items={page.points} /></div>
        </section>
      )}

      <ArticleRelated items={related} />

      {page.cta && page.vertical !== "community" && (
        <CTABand title="Tell us what you're working on." note="A senior consultant reads every enquiry and replies personally." primary={page.cta} vertical={vertical} />
      )}
    </>
  );
}
