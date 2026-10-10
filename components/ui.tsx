import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "navy" | "outline-on-navy" | "outline-on-accent";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-600 active:bg-accent-700 active:text-on-navy",
  secondary: "border-2 border-ink text-ink hover:bg-ink/5",
  navy: "bg-navy-900 text-on-navy hover:bg-navy-700 hover:text-on-navy",
  "outline-on-navy": "border-2 border-on-navy text-on-navy hover:bg-navy-700 hover:text-on-navy",
  "outline-on-accent": "border-2 border-navy-900 text-navy-900 hover:bg-accent-600",
};

/** Labels are flush left (Modernist). Min height 52px desktop / 48px mobile → ≥44px targets. */
export function Button({ variant = "primary", arrow, className = "", children, ...props }:
  ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }) {
  return (
    <Link {...props} className={`inline-flex min-h-12 items-center justify-start gap-2.5 px-5 text-base font-extrabold no-underline md:min-h-13 ${variants[variant]} ${className}`}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4.5" />}
    </Link>
  );
}

export function Kicker({ children, onNavy }: { children: ReactNode; onNavy?: boolean }) {
  return <span className={`mb-4 block text-kicker font-semibold uppercase tracking-[0.1em] ${onNavy ? "text-accent" : "text-accent-700"}`}>{children}</span>;
}

/** Proof placeholder — every unverified claim carries one until Texiri confirms it. */
export function Placeholder({ children = "TO VERIFY" }: { children?: ReactNode }) {
  return <span className="inline-flex border border-dashed border-accent-700 bg-accent-100 px-2 py-0.5 text-[11px] font-bold tracking-[0.06em] text-accent-800">{children}</span>;
}

export function PilotLabel() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-navy-900 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.06em] text-on-navy">
      <span className="size-2 bg-accent" aria-hidden /> Pilot · in development
    </span>
  );
}

export function Section({ id, labelledBy, tone = "ground", ruled, className = "", children }:
  { id?: string; labelledBy?: string; tone?: "ground" | "surface" | "navy" | "accent"; ruled?: boolean; className?: string; children: ReactNode }) {
  const tones = { ground: "", surface: "bg-surface", navy: "surface-dark bg-navy-900 text-on-navy", accent: "surface-bright bg-accent text-navy-900" };
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-section ${tones[tone]} ${ruled ? "rule-section" : ""} ${className}`}>
      <div className="container-content">{children}</div>
    </section>
  );
}

export function H2({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return <h2 id={id} className={`m-0 max-w-[22ch] text-h2 ${className}`}>{children}</h2>;
}

export function ImagePlaceholder({ label, ratio = "aspect-video", onNavy }: { label: string; ratio?: string; onNavy?: boolean }) {
  const stripes = onNavy
    ? "bg-[repeating-linear-gradient(135deg,var(--color-navy-800)_0_12px,var(--color-navy-700)_12px_24px)]"
    : "bg-[repeating-linear-gradient(135deg,var(--color-surface)_0_12px,var(--color-surface-strong)_12px_24px)]";
  return (
    <div role="img" aria-label={`Placeholder: ${label}`} className={`flex items-end p-4 ${ratio} ${stripes}`}>
      <span className="bg-ground px-2 py-1 font-mono text-xs text-muted">{label}</span>
    </div>
  );
}
