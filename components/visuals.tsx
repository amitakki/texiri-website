import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { isLive } from "@/lib/pages";
import { ArrowRight, Boxes, DatabaseZap, Download, FileSpreadsheet, Globe, Layers, LifeBuoy, MapPin, Repeat, Upload, type LucideIcon } from "lucide-react";

/* ── Process visuals ─────────────────────────────────────────────────────────────────────
   Built from HTML and CSS (not images) so text stays selectable, translatable and responsive.
   Structure and process only: nothing here shows a number, client or screenshot. */

export type TrackItem = {
  label: string;
  note?: ReactNode;
  icon?: LucideIcon;
  /** Small tag under the title, e.g. "Repeats each mock cycle". */
  badge?: string;
  /** solid = reached or active, ring = deadline, hollow = optional or later. */
  node?: "solid" | "ring" | "hollow";
  /** The line leading to the next item is dashed (optional or extended period). */
  dashed?: boolean;
};

// Full class names so Tailwind can see them. `rowFrom` is the width at which the track turns horizontal.
const trackRow = {
  md: { ol: "md:grid-cols-[repeat(var(--n),minmax(0,1fr))]", li: "md:pb-0 md:pl-0 md:pr-6 md:pt-10", node: "md:top-0", line: "md:left-6 md:right-0 md:top-[8px] md:bottom-auto md:border-l-0 md:border-t-2" },
  lg: { ol: "lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]", li: "lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-10", node: "lg:top-0", line: "lg:left-6 lg:right-0 lg:top-[8px] lg:bottom-auto lg:border-l-0 lg:border-t-2" },
} as const;

/**
 * A timeline / process track: square nodes joined by a line, vertical on phones and horizontal from `rowFrom`.
 * Used for the ECC maintenance dates, the migration approach, the AI engagement model and the hiring steps.
 */
export function Track({ items, rowFrom = "md", tone = "accent", onNavy, numbered, label }:
  { items: TrackItem[]; rowFrom?: "md" | "lg"; tone?: "accent" | "ai"; onNavy?: boolean; numbered?: boolean; label: string }) {
  const r = trackRow[rowFrom];
  const fill = tone === "ai" ? "bg-ai" : "bg-accent";
  const edge = tone === "ai" ? "border-ai" : "border-accent";
  const muted = onNavy ? "border-on-navy/60" : "border-ink/50";
  const hole = onNavy ? "bg-navy-900" : "bg-ground";
  const numTone = onNavy ? (tone === "ai" ? "text-ai" : "text-accent") : tone === "ai" ? "text-ai-ink" : "text-accent-700";
  return (
    <ol aria-label={label} style={{ "--n": items.length } as CSSProperties} className={`m-0 grid list-none p-0 ${r.ol}`}>
      {items.map((it, i) => {
        const Icon = it.icon;
        const nodeStyle = it.node === "ring" ? `border-4 ${edge} ${hole}` : it.node === "hollow" ? `border-2 ${muted} ${hole}` : `border ${edge} ${fill}`;
        const lineTone = it.dashed ? `border-dashed ${muted}` : edge;
        return (
          <li key={it.label} className={`relative pb-9 pl-10 last:pb-0 ${r.li}`}>
            <span aria-hidden className={`absolute left-0 top-1 size-[18px] ${r.node} ${nodeStyle}`} />
            {i < items.length - 1 && <span aria-hidden className={`absolute bottom-[-4px] left-[8px] top-6 border-l-2 ${r.line} ${lineTone}`} />}
            {numbered && <div className={`mb-1 text-sm font-extrabold ${numTone}`}>{String(i + 1).padStart(2, "0")}</div>}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {Icon && <Icon aria-hidden className={`size-5 ${numTone}`} />}
              <strong className="text-[clamp(1.125rem,2vw,1.5rem)] font-extrabold leading-tight">{it.label}</strong>
            </div>
            {it.badge && <span className={`mt-2 inline-flex items-center gap-1.5 border px-2 py-0.5 text-xs font-bold ${onNavy ? "border-on-navy/40" : "border-ink/40"}`}><Repeat aria-hidden className="size-3.5" />{it.badge}</span>}
            {it.note && <div className={`mt-2 text-[15px] ${onNavy ? "text-on-navy-muted" : "text-muted"}`}>{it.note}</div>}
          </li>
        );
      })}
    </ol>
  );
}

/** ECC and PI/PO maintenance dates as a track. Sits on a navy section. */
export function EccTimeline() {
  const tag = "border border-on-navy/40 px-2 py-0.5 text-xs font-bold";
  return (
    <Track
      label="SAP ECC and PI/PO maintenance timeline"
      onNavy
      items={[
        { label: "Today", node: "solid", note: "Data assessment and cleansing can start now, on your current ECC system." },
        { label: "End of 2027", node: "ring", dashed: true, note: <>SAP ECC 6.0 and SAP PI/PO 7.5 mainstream maintenance end on the same date.<span className="mt-2 flex flex-wrap gap-1.5"><span className={tag}>ECC 6.0</span><span className={tag}>PI/PO 7.5</span></span></> },
        { label: "2030", node: "hollow", note: "Optional extended maintenance for ECC ends, at additional cost." },
      ]}
    />
  );
}

/** The 2Klicks workflow as three icon steps (wording from the 2Klicks presentation). */
export const klicksSteps: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Download, t: "Download", d: "Pull the ready-made template for your objects straight from SAP. No setup, no coding." },
  { icon: FileSpreadsheet, t: "Update", d: "Make the changes in Excel, custom fields included. Validate, clean and prepare the data." },
  { icon: Upload, t: "Upload", d: "Load the file back and 2Klicks creates or updates the records in SAP, with no programming." },
];

/** Time to value: the stages of a traditional load program against 2Klicks (from the 2Klicks presentation). */
export function KlicksTimeline() {
  const traditional = [["Mapping", "Day 1"], ["Functional specs", "Day 5"], ["Technical specs", "Day 10"], ["Develop", "Day 20"], ["Testing", "Day 60"], ["Transport", "Day 80"], ["Go-live", "Day 100+"]];
  const klicks = [["Purchase", "Day 1"], ["Install", "Day 1"], ["Use", "Day 1"]];
  // Row titles sit above each track so seven stages get the full width; the 2Klicks track spans 3/7 to line up.
  const title = (t: string, d: string) => <p className="m-0 mb-6 text-[15px] text-muted"><strong className="mr-2 text-lg text-ink">{t}</strong>{d}</p>;
  return (
    <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-10">
      <div className="border-t-2 border-ink pt-6">
        {title("Traditional programs", "Seven stages, many hand-offs")}
        <Track label="Traditional load program: seven stages over 100+ days" rowFrom="lg" items={traditional.map(([label, note]) => ({ label, note, node: "hollow" }))} />
      </div>
      <div className="border-t-2 border-ink pt-6">
        {title("2Klicks", "No hand-offs, live on day 1")}
        <div className="lg:max-w-[calc(3/7*100%)]"><Track label="2Klicks: purchase, install and use on day 1" rowFrom="lg" items={klicks.map(([label, note]) => ({ label, note }))} /></div>
      </div>
    </div>
  );
}

export function KlicksFlow({ onNavy }: { onNavy?: boolean }) {
  const steps = klicksSteps;
  return (
    <ol aria-label="How 2Klicks works" className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.t} className={`relative flex flex-col gap-3 border-t-2 p-4 pb-5 ${onNavy ? "border-accent bg-navy-800" : "border-ink bg-surface"}`}>
          <div className="flex items-center justify-between">
            <span className="grid size-11 place-items-center bg-accent text-navy-900"><s.icon aria-hidden className="size-5.5" /></span>
            <span className={`text-sm font-extrabold ${onNavy ? "text-accent" : "text-accent-700"}`}>STEP {i + 1}</span>
          </div>
          <strong className="text-lg">{s.t}</strong>
          <span className={`text-[15px] ${onNavy ? "text-on-navy-muted" : "text-muted"}`}>{s.d}</span>
          {i < steps.length - 1 && <ArrowRight aria-hidden className="absolute -right-[11px] top-1/2 z-10 hidden size-5 -translate-y-1/2 bg-accent p-0.5 text-navy-900 sm:block" />}
        </li>
      ))}
    </ol>
  );
}

const lifecycle = [
  { n: "01", t: "Implement", s: "SAP Consulting", href: "/sap/consulting/", icon: Layers },
  { n: "02", t: "Migrate", s: "S/4HANA, DM & MDG", href: "/sap/data-migration/", icon: DatabaseZap },
  { n: "03", t: "Extend", s: "SAP BTP & Development", href: "/sap/btp/", icon: Boxes },
  { n: "04", t: "Run", s: "Managed Services", href: "/sap/managed-services/", icon: LifeBuoy },
];

/** The four SAP services as linked stages over the SAP core. `active` highlights one (1–4). */
export function LifecycleRail({ active, wide }: { active?: 1 | 2 | 3 | 4; wide?: boolean }) {
  return (
    <figure aria-label="Texiri SAP services across the lifecycle: implement, migrate, extend and run" className="m-0 bg-navy-900 p-[clamp(1rem,2.5vw,1.75rem)] text-on-navy">
      <figcaption className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-on-navy-muted">One partner across the SAP lifecycle</figcaption>
      <ol className={`m-0 grid list-none grid-cols-2 gap-2 p-0 ${wide ? "md:grid-cols-4" : ""}`}>
        {lifecycle.map((l, i) => {
          const on = active === i + 1;
          const cls = `flex h-full min-h-28 flex-col justify-between gap-4 border-t-4 p-4 no-underline ${on ? "border-accent bg-accent text-navy-900 hover:text-navy-900" : "border-on-navy/30 bg-navy-800 text-on-navy hover:border-accent hover:text-on-navy"}`;
          const inner = <><span className="flex items-center justify-between"><l.icon aria-hidden className="size-6" /><span className="text-sm font-extrabold">{l.n}</span></span><span><strong className="block text-lg">{l.t}</strong><span className={`text-sm ${on ? "text-navy-900" : "text-on-navy-muted"}`}>{l.s}</span></span></>;
          return (
            <li key={l.n}>
              {/* A page that is not ready yet is shown as plain text, not a link. */}
              {isLive(l.href)
                ? <Link href={l.href} aria-current={on ? "page" : undefined} className={cls}>{inner}</Link>
                : <div className={cls.replace(" hover:border-accent", "")}>{inner}</div>}
            </li>
          );
        })}
      </ol>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-2 border-on-navy p-3.5">
        <strong className="text-[15px]">Your SAP core · ECC → S/4HANA</strong>
        <span className="text-[13px] text-on-navy-muted">RE-FX · FI/CO · PS · PM · MM · SD</span>
      </div>
    </figure>
  );
}

/**
 * A case study as a flow: where the client started, four numbered steps, and the SAP target with its modules.
 * Vertical on phones, a row from `lg`.
 */
export function CaseFlow({ from, steps, note, target }:
  { from: { name: string; note: string }; steps: readonly string[]; note: string; target: { name: string; modules: string[] } }) {
  return (
    <figure aria-label={`${from.name}, then ${steps.join(", ")}, into ${target.name}`} className="m-0 grid items-stretch gap-3 bg-surface p-[clamp(1rem,2.5vw,1.75rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1.2fr)]">
      <div className="flex flex-col justify-center border-t-4 border-ink bg-ground p-5">
        <strong className="text-lg">{from.name}</strong>
        <span className="text-sm text-muted">{from.note}</span>
      </div>
      <div className="flex flex-col justify-center gap-3 px-1 py-2">
        <ol className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-col items-start gap-1 border-t-2 border-accent pt-2">
              <span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span>
              <strong className="text-[17px]">{s}</strong>
            </li>
          ))}
        </ol>
        <span className="text-sm text-muted">{note}</span>
      </div>
      <div className="flex flex-col gap-3 bg-navy-900 p-5 text-on-navy">
        <strong className="flex items-center gap-2 text-lg"><ArrowRight aria-hidden className="size-4.5 text-accent" />{target.name}</strong>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0 text-[13px]">
          {target.modules.map((m) => <li key={m} className="border border-on-navy/35 px-2.5 py-1">{m}</li>)}
        </ul>
      </div>
    </figure>
  );
}

/** Offices and client countries drawn as a simple network (not a geographic map). */
export function DeliveryNetwork({ offices, countries }: { offices: { name: string; label: string }[]; countries: string[] }) {
  return (
    <figure aria-label={`Delivered from ${offices.map((o) => o.name).join(" and ")} to clients in ${countries.join(", ")}`} className="m-0 grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1.4fr)]">
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {offices.map((o, i) => (
          <li key={o.name} className={`flex items-center gap-3 border-t-4 bg-ground p-4 ${i === 0 ? "border-accent" : "border-ink"}`}>
            <MapPin aria-hidden className="size-6 flex-none text-accent-700" />
            <span><strong className="block text-lg">{o.name}</strong><span className="text-sm text-muted">{o.label}</span></span>
          </li>
        ))}
      </ul>
      <div aria-hidden className="hidden items-center justify-center md:flex"><span className="h-0.5 flex-1 bg-ink/50" /><ArrowRight className="size-5" /></div>
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Clients in</span>
        <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
          {countries.map((c) => <li key={c} className="flex items-center gap-2 border-2 border-ink bg-ground px-3.5 py-2 text-[15px] font-bold"><Globe aria-hidden className="size-4 text-accent-700" />{c}</li>)}
        </ul>
      </div>
    </figure>
  );
}

/** Case-study result as a before/after bar pair. Renders only when real values are supplied. */
export function ResultBars({ before, after, unit }: { before: number; after: number; unit: string }) {
  const max = Math.max(before, after, 1);
  const rows: [string, number, string][] = [["Before", before, "bg-ink/40"], ["After", after, "bg-accent"]];
  return (
    <div role="img" aria-label={`Before: ${before} ${unit}. After: ${after} ${unit}.`} className="mt-3 flex flex-col gap-1.5 text-xs font-bold">
      {rows.map(([l, v, c]) => (
        <div key={l} className="grid grid-cols-[48px_1fr_auto] items-center gap-2"><span>{l}</span><span className="h-3 bg-ink/10"><span className={`block h-3 ${c}`} style={{ width: `${(v / max) * 100}%` }} /></span><span>{v} {unit}</span></div>
      ))}
    </div>
  );
}

/** Decorative: a data table with one record missing. */
export function NotFoundIllustration() {
  return (
    <svg aria-hidden viewBox="0 0 320 240" className="h-auto w-full max-w-md">
      <rect x="0" y="0" width="320" height="240" fill="var(--color-surface)" />
      <rect x="24" y="24" width="272" height="36" fill="var(--color-navy-900)" />
      <rect x="36" y="38" width="64" height="8" fill="var(--color-accent)" />
      {Array.from({ length: 16 }, (_, i) => {
        const x = 24 + (i % 4) * 70, y = 72 + Math.floor(i / 4) * 36;
        if (i === 6) return <g key={i}><rect x={x} y={y} width="62" height="28" fill="none" stroke="var(--color-accent-700)" strokeWidth="2" strokeDasharray="5 4" /><text x={x + 31} y={y + 20} textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--color-accent-700)">?</text></g>;
        return <rect key={i} x={x} y={y} width="62" height="28" fill={i % 5 === 0 ? "var(--color-accent-200)" : "var(--color-surface-strong)"} />;
      })}
    </svg>
  );
}
