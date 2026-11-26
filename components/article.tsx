import Link from "next/link";
import type { ReactNode } from "react";
import { Kicker, SiteImage } from "@/components/ui";
import type { SiteImageData } from "@/lib/images";
import { formatDate, type Article } from "@/lib/insights";

/** Building blocks shared by the dedicated Insights articles (app/insights/*). */

/** The article hero. Title, category, date and read time come from the `articles` entry, so the cards and the page agree. */
export function ArticleHero({ article, lead, byline, image }: { article: Article; lead: string; byline: string; image: SiteImageData }) {
  return (
    <section aria-labelledby="hero-h" className="py-[clamp(2.5rem,6vw,5.5rem)]">
      <div className="container-content grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
        <div className="hero-enter">
          <Kicker>{article.category}</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[18ch] text-display">{article.title}</h1>
          <p className="mt-6 max-w-[52ch] text-lead text-muted">{lead}</p>
          <p className="mb-0 mt-6 text-sm text-muted">
            By {byline} · <time dateTime={article.published}>{formatDate(article.published)}</time> · {article.readTime}
          </p>
        </div>
        <div className="hero-enter-late"><SiteImage {...image} priority /></div>
      </div>
    </section>
  );
}

/** Article JSON-LD for `article`, with absolute URLs on `origin`. */
export function articleJsonLd(article: Article, { description, image, origin }: { description: string; image: SiteImageData; origin: string }) {
  return {
    "@context": "https://schema.org", "@type": "Article",
    headline: article.title, description,
    datePublished: article.published, dateModified: article.published,
    image: `${origin}${image.src}`,
    author: { "@type": "Organization", name: "Texiri Solutions" },
    publisher: { "@type": "Organization", name: "Texiri Solutions" },
    mainEntityOfPage: `${origin}${article.href}`,
  };
}

/** Article body text: a readable measure, with links underlined. */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="flex max-w-[68ch] flex-col gap-5 text-[18px] leading-relaxed [&_a]:font-bold [&_a]:underline [&_p]:m-0">{children}</div>;
}

/**
 * A numbered article section: the body text with its illustration beside it from `lg` (stacked below on smaller
 * screens), then any full-width content (`children`) such as a timeline, stat tiles or cards.
 */
export function Part({ id, n, title, body, image, children }: { id: string; n: string; title: string; body: ReactNode; image: SiteImageData; children?: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} className="pb-[clamp(3rem,6vw,5rem)]">
      <div className="container-content">
        <h2 id={`${id}-h`} className="mb-6 mt-0 border-t-2 border-ink pt-6 text-[clamp(1.625rem,3vw,2.25rem)] leading-tight">
          <span className="mr-3 text-accent-700">{n}</span>{title}
        </h2>
        <div className="grid items-start gap-x-[clamp(2rem,4vw,4rem)] gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Prose>{body}</Prose>
          <SiteImage {...image} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 45vw, 100vw" className="lg:sticky lg:top-24" />
        </div>
        {children}
      </div>
    </section>
  );
}

export function Figure({ caption, children, className = "" }: { caption: ReactNode; children: ReactNode; className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      {children}
      <figcaption className="mt-3 max-w-[68ch] text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

/** The three-point "In short" summary under the article hero. */
export function ArticleSummary({ points }: { points: string[] }) {
  return (
    <section aria-labelledby="short-h" className="pb-[clamp(3rem,6vw,5rem)]">
      <div className="container-content">
        <h2 id="short-h" className="m-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">In short</h2>
        <ol className="m-0 mt-4 grid list-none gap-3 p-0 md:grid-cols-3">
          {points.map((s, i) => (
            <li key={s} className="border-t-4 border-accent bg-surface p-[clamp(1.25rem,2.5vw,1.75rem)] text-[17px]">
              <span className="mb-2 block text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span>{s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export type TableRow = [ReactNode, ReactNode, ReactNode];

/**
 * A three-column reference table that stacks into cards on small screens. The explicit ARIA roles keep it a table for
 * screen readers: Safari drops table semantics from rows restyled with `display: grid`.
 */
export function DataTable({ caption, head, rows }: { caption: string; head: [string, string, string]; rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto border-t-4 border-ink bg-surface p-[clamp(1rem,3vw,1.75rem)]">
      <table role="table" className="w-full border-collapse text-[15px] leading-normal">
        <caption className="mb-4 text-left text-lg font-extrabold">{caption}</caption>
        <thead role="rowgroup" className="max-md:sr-only">
          <tr role="row" className="border-b-2 border-ink">
            {head.map((h) => <th key={h} role="columnheader" scope="col" className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted">{h}</th>)}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map(([a, b, c], i) => (
            <tr key={i} role="row" className="border-b border-rule max-md:grid max-md:gap-1.5 max-md:py-3">
              <th role="rowheader" scope="row" className="py-3 pr-4 text-left align-top font-extrabold max-md:py-0">{a}</th>
              <td role="cell" className="py-3 pr-4 align-top text-muted max-md:py-0">{b}</td>
              <td role="cell" className="py-3 align-top max-md:py-0">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Stat tiles with the source of each figure underneath. */
export function SourcedStats({ stats }: { stats: { n: string; l: string; s: string }[] }) {
  return (
    <dl className="mb-0 mt-[clamp(2rem,4vw,3rem)] grid gap-3 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.l} className="flex flex-col border-t-4 border-ink bg-surface p-5">
          <dt className="sr-only">{s.l}</dt>
          <dd className="m-0 flex flex-1 flex-col">
            <span className="block text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none">{s.n}</span>
            <span className="mt-2 block flex-1 text-[15px]">{s.l}</span>
            <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.06em] text-muted">{s.s}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Proof tiles: the articles' "How Texiri helps" sections and the data-migration page. */
export function ProofStats({ items }: { items: [string, string][] }) {
  return (
    <dl className="mb-0 mt-[clamp(2rem,4vw,3rem)] grid gap-3 sm:grid-cols-3">
      {items.map(([n, l]) => <div key={n} className="border-t-4 border-accent bg-surface p-5"><dt className="sr-only">{l}</dt><dd className="m-0"><span className="block text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none">{n}</span><span className="mt-2 block text-[15px] text-muted">{l}</span></dd></div>)}
    </dl>
  );
}

export function ArticleSources({ sources }: { sources: { t: string; by: string; href: string }[] }) {
  return (
    <section aria-labelledby="src-h" className="pb-[clamp(3rem,6vw,5rem)]">
      <div className="container-content">
        <h2 id="src-h" className="m-0 border-t-2 border-ink pt-6 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Sources</h2>
        <ol className="mb-0 mt-4 grid gap-x-10 gap-y-2 pl-5 text-[15px] text-muted lg:grid-cols-3">
          {sources.map((s) => <li key={s.href}><a href={s.href} rel="noopener" className="font-bold text-ink underline">{s.t}</a>. {s.by}.</li>)}
        </ol>
      </div>
    </section>
  );
}

/** Related links (articles and interim pages); pass only live pages (see isLive in lib/pages.ts). Renders nothing when the list is empty. */
export function ArticleRelated({ items }: { items: { label: string; href: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-h" className="border-t-2 border-ink">
      <div className="container-content py-[clamp(2.5rem,5vw,4rem)]">
        <h2 id="related-h" className="m-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Related</h2>
        <ul className="mt-6 grid list-none gap-x-8 p-0 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => <li key={r.href} className="border-t border-hairline py-4"><Link href={r.href} className="font-extrabold">{r.label} →</Link></li>)}
        </ul>
      </div>
    </section>
  );
}
