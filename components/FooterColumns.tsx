"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

type Col = { title: string; links: [string, string][] };

/**
 * One list of footer links for every screen. From md up the groups are always open columns; on phones each
 * group is a collapsible section. The markup is rendered open so the links are in the page for everyone, and
 * the groups fold shut on phones after load.
 */
export function FooterColumns({ cols }: { cols: Col[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => root.current?.querySelectorAll("details").forEach((d) => { d.open = mq.matches; });
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div ref={root} className="grid gap-x-6 gap-y-0 py-4 md:grid-cols-4 md:gap-y-8 md:py-8">
      {cols.map((c) => (
        <details key={c.title} open className="group border-b border-on-navy/20 md:border-b-0">
          <summary className="flex min-h-12 items-center justify-between text-[15px] font-bold md:pointer-events-none md:min-h-0 md:mb-2 md:text-xs md:font-semibold md:uppercase md:tracking-[0.1em] md:text-on-navy-muted">
            {c.title}
            <ChevronDown aria-hidden className="size-4.5 transition-transform group-open:rotate-180 md:hidden" />
          </summary>
          <nav aria-label={c.title} className="flex flex-col pb-3 text-[15px] md:gap-0.5 md:pb-0">
            {c.links.map(([label, href]) => (
              <Link key={href} href={href} className="flex min-h-11 items-center text-on-navy no-underline hover:text-accent md:min-h-9">{label}</Link>
            ))}
          </nav>
        </details>
      ))}
    </div>
  );
}
