"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Blocks that reveal on scroll: every direct child of a section's .container-content. Grids and lists reveal item by item. */
const BLOCKS = "main .container-content > *";
const isGroup = (el: Element) =>
  el.children.length > 1 && (el.tagName === "UL" || el.tagName === "OL" || /(^|\s)grid(\s|$)/.test(el.className)) && !el.querySelector("form, input");

/**
 * Scroll reveal for every page. Only content that starts below the fold is hidden, and only once JS has run,
 * so nothing flashes and nothing stays hidden without JS. Off when the visitor prefers reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let io: IntersectionObserver | undefined;

    const frame = requestAnimationFrame(() => {
      const targets: HTMLElement[] = [];
      for (const block of document.querySelectorAll<HTMLElement>(BLOCKS)) {
        // Heroes have their own CSS entrance (hero-enter); opt-outs use data-no-reveal.
        if (block.closest(".hero-enter, .hero-enter-late, [data-no-reveal]")) continue;
        if (isGroup(block)) targets.push(...(Array.from(block.children) as HTMLElement[]));
        else targets.push(block);
      }
      const fold = window.innerHeight * 0.9;
      const armed = targets.filter((el) => !el.classList.contains("reveal-in") && el.getBoundingClientRect().top > fold);

      io = new IntersectionObserver(
        (entries) => {
          // Items that arrive together come in one after another.
          entries
            .filter((e) => e.isIntersecting)
            .map((e) => e.target as HTMLElement)
            .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
            .forEach((el, i) => {
              el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * 80}ms`);
              el.classList.add("reveal-in");
              io?.unobserve(el);
            });
        },
        { rootMargin: "0px 0px -6% 0px" },
      );
      for (const el of armed) { el.classList.add("reveal-armed"); io.observe(el); }
    });

    return () => { cancelAnimationFrame(frame); io?.disconnect(); };
  }, [pathname]);

  return null;
}
