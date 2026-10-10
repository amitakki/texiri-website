import type { ReactNode } from "react";
import { Breadcrumbs } from "./sections";
import { Kicker, Placeholder } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Shared layout for the Privacy Policy, Cookie Policy and Terms: numbered sections with an on-page contents list. */
export function LegalPage({ title, href, updated, intro, sections }: { title: string; href: string; updated: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title, href }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(2rem,4vw,3rem)] pt-[clamp(2.5rem,6vw,5rem)]">
        <div className="container-content">
          <Kicker>Legal</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] text-h2">{title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>Last updated {updated}</span>
            {/* Content decisions G1, G4, G5: remove once a lawyer has approved the text */}
            <Placeholder>DRAFT · PENDING LEGAL REVIEW</Placeholder>
          </div>
          <div className="mt-6 max-w-[64ch] text-lead text-muted">{intro}</div>
        </div>
      </section>
      <div className="container-content grid gap-x-12 gap-y-10 border-t-2 border-ink pb-section pt-10 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">On this page</span>
          <ol className="m-0 flex list-none flex-col p-0 text-[15px]">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex min-h-10 items-baseline gap-2.5 py-1 no-underline">
                  <span className="w-5 flex-none text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span>{s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex max-w-[70ch] flex-col gap-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24 border-t border-hairline pt-6 first:border-t-0 first:pt-0">
              <h2 id={`${s.id}-h`} className="mb-4 mt-0 text-[clamp(1.375rem,2.4vw,1.75rem)] leading-tight">
                <span className="mr-2 text-accent-700">{String(i + 1).padStart(2, "0")}</span>{s.title}
              </h2>
              <div className="flex flex-col gap-4 text-[17px] leading-relaxed [&_a]:font-bold [&_a]:underline [&_h3]:mb-0 [&_h3]:mt-2 [&_h3]:text-lg [&_p]:m-0">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return <ul className="m-0 flex flex-col gap-2 pl-5">{items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
}

/** Responsive table: stacks into labelled rows below the md breakpoint. */
export function LegalTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[15px] leading-normal">
        <thead className="max-md:sr-only">
          <tr className="border-b-2 border-ink">{head.map((h) => <th key={h} scope="col" className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-rule max-md:grid max-md:gap-1 max-md:py-3">
              {r.map((c, j) => (
                <td key={j} className="py-3 pr-4 align-top max-md:py-0 max-md:pr-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted md:hidden">{head[j]}: </span>{c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
