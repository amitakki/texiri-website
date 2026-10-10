import Image from "next/image";
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

/**
 * Image slot. Set `placeholder` while the image is a stand-in illustration from public/images/placeholders/
 * (shows a badge; tracked in docs/content-decisions.md). Swapping in the real photo is a change of `src`.
 * `ratio` takes Tailwind aspect classes and may be responsive, e.g. "aspect-[4/3] md:aspect-[21/9]".
 */
export function SiteImage({ src, alt, ratio = "aspect-video", placeholder, priority, sizes = "(min-width: 1024px) 50vw, 100vw", className = "", imgClassName = "" }:
  { src: string; alt: string; ratio?: string; placeholder?: boolean; priority?: boolean; sizes?: string; className?: string; imgClassName?: string }) {
  return (
    <div className={`img-zoom @container relative overflow-hidden bg-surface ${ratio} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={src.endsWith(".svg")} className={`object-cover ${imgClassName}`} />
      {/* Shorter badge on small tiles so it never wraps over the picture */}
      {placeholder && <span className="absolute bottom-2 left-2 whitespace-nowrap @sm:bottom-3 @sm:left-3"><Placeholder><span className="@max-[14rem]:hidden">PLACEHOLDER IMAGE</span><span className="hidden @max-[14rem]:inline">PLACEHOLDER</span></Placeholder></span>}
    </div>
  );
}
