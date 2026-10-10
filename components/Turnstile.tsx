"use client";

import { useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

let loader: Promise<TurnstileApi> | null = null;
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loader ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile unavailable")));
    s.onerror = () => { loader = null; s.remove(); reject(new Error("Turnstile failed to load")); };
    document.head.appendChild(s);
  });
  return loader;
}

/**
 * Cloudflare Turnstile, rendered explicitly so it works after client-side navigation and on the
 * last step of a multi-step form. Turnstile adds the hidden `cf-turnstile-response` input itself.
 * Change `resetKey` after each submission: tokens are single-use.
 */
export function Turnstile({ resetKey, className = "" }: { resetKey?: unknown; className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    loadTurnstile()
      .then((t) => { if (!cancelled && el.current) widget.current = t.render(el.current, { sitekey: SITE_KEY, appearance: "interaction-only" }); })
      .catch(() => { /* the server rejects the missing token and the form shows its message */ });
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, []);

  useEffect(() => { if (widget.current) window.turnstile?.reset(widget.current); }, [resetKey]);

  if (!SITE_KEY) return null;
  return <div ref={el} className={className} />;
}
