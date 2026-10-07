"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav, verticalCta, verticalFor } from "@/lib/site";

const accentBar = { sap: "border-accent", ai: "border-ai", community: "border-com" } as const;

export function SiteHeader() {
  const pathname = usePathname();
  const vertical = verticalFor(pathname);
  const cta = verticalCta[vertical];
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setOpen(null); setDrawer(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setDrawer(false); } };
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, []);

  const active = (href: string) => pathname.startsWith(href) || (href === "/ai-services/" && pathname.startsWith("/ai-community"));
  const bar = (item: (typeof primaryNav)[number]) => (active(item.href) ? accentBar[vertical === "community" && item.vertical === "ai" ? "community" : item.vertical ?? "sap"] : "border-transparent");

  return (
    <header ref={ref} className={`sticky top-0 z-50 border-b-2 border-rule ${vertical === "community" ? "bg-com-bg" : "bg-ground"}`}>
      <a href="#main" className="absolute -left-[9999px] top-2 z-[60] bg-ink px-4 py-3 font-semibold text-ground focus:left-4">Skip to content</a>
      <div className="container-content flex h-18 items-center gap-6">
        <Link href="/" aria-label="Texiri Solutions — home" className="flex min-h-11 flex-none items-center">
          <Image src="/texiri-logo.png" alt="Texiri Solutions" width={120} height={30} priority />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden h-18 items-stretch xl:flex">
          {primaryNav.map((item) =>
            item.mega ? (
              <button key={item.label} type="button" aria-expanded={open === item.label} aria-controls={`mega-${item.vertical}`}
                onClick={() => setOpen(open === item.label ? null : item.label)}
                className={`-mb-0.5 flex items-center gap-1 whitespace-nowrap border-b-3 px-2.5 text-sm font-semibold hover:text-accent-700 ${bar(item)}`}>
                {item.label}<ChevronDown aria-hidden className="size-4" />
              </button>
            ) : (
              <Link key={item.label} href={item.href} aria-current={active(item.href) ? "page" : undefined}
                className={`-mb-0.5 flex items-center whitespace-nowrap border-b-3 px-2.5 text-sm font-semibold no-underline ${bar(item)}`}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <Link href={cta.href} data-track="cta_click" data-vertical={vertical}
          className={`ml-auto inline-flex min-h-11 items-center whitespace-nowrap px-4 font-extrabold text-navy-900 no-underline hover:text-navy-900 xl:ml-0 ${cta.className}`}>
          <span className="xl:hidden">{cta.short}</span><span className="hidden xl:inline">{cta.label}</span>
        </Link>
        <button type="button" className="grid size-11 flex-none place-items-center border-2 border-rule xl:hidden"
          aria-expanded={drawer} aria-controls="mobile-nav" aria-label={drawer ? "Close menu" : "Open menu"} onClick={() => setDrawer(!drawer)}>
          {drawer ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      {primaryNav.filter((i) => i.mega && open === i.label).map((item) => (
        <div key={item.label} id={`mega-${item.vertical}`} role="region" aria-label={item.label} className="absolute inset-x-0 top-full hidden border-b-2 border-rule bg-ground shadow-xl xl:block">
          <div className="container-content grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.2fr)] gap-6 py-8">
            {item.mega!.links.map((l) => (
              <Link key={l.href} href={l.href} className={`flex flex-col gap-1.5 border-t-2 pt-4 no-underline ${item.vertical === "ai" ? "border-ai" : "border-ink"}`}>
                <span className="text-base font-extrabold">{l.label}</span>
                <span className="text-sm text-muted">{l.description}</span>
              </Link>
            ))}
            <Link href={item.mega!.feature.href} className="row-span-2 flex flex-col gap-2 bg-navy-900 p-4 text-on-navy no-underline hover:bg-navy-800 hover:text-on-navy">
              <span className={`text-xs font-semibold uppercase tracking-[0.1em] ${item.vertical === "ai" ? "text-ai" : "text-accent"}`}>{item.mega!.feature.kicker}</span>
              <span className="text-lg font-extrabold">{item.mega!.feature.label}</span>
              <span className="text-sm text-on-navy-muted">{item.mega!.feature.description}</span>
            </Link>
          </div>
        </div>
      ))}

      {drawer && (
        <nav id="mobile-nav" aria-label="Primary" className="absolute inset-x-0 top-full max-h-[calc(100vh-72px)] overflow-auto border-b-2 border-rule bg-ground shadow-xl xl:hidden">
          <div className="container-content flex flex-col pb-6 pt-2">
            {primaryNav.map((item) => item.mega ? (
              <details key={item.label} className="border-b border-hairline">
                <summary className="flex min-h-13 items-center justify-between font-bold">{item.label}<ChevronDown aria-hidden className="size-4.5" /></summary>
                <div className="flex flex-col pb-3 pl-4">
                  <Link href={item.href} className="flex min-h-11 items-center font-bold no-underline">Overview</Link>
                  {item.mega.links.map((l) => <Link key={l.href} href={l.href} className="flex min-h-11 items-center no-underline">{l.label}</Link>)}
                </div>
              </details>
            ) : (
              <Link key={item.label} href={item.href} className="flex min-h-13 items-center border-b border-hairline font-bold no-underline">{item.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
