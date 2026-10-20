import type { Metadata } from "next";
import Link from "next/link";
import { Button, Kicker } from "@/components/ui";
import { isLive } from "@/lib/pages";
import { NotFoundIllustration } from "@/components/visuals";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

const links = [
  { label: "SAP Services", href: "/sap/", d: "Consulting, S/4HANA migration, integration, managed services" },
  { label: "2Klicks", href: "/2klicks/", d: "Our SAP data migration and mass-update tools" },
  { label: "AI Services", href: "/ai-services/", d: "Strategy, generative AI, ML and MLOps" },
  { label: "Contact", href: "/contact/", d: "Tell us what you are working on" },
];

export default function NotFound() {
  return (
    <>
      <section aria-labelledby="nf-h" className="py-[clamp(3rem,7vw,6rem)]">
        <div className="container-content grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <Kicker>Error 404</Kicker>
            <h1 id="nf-h" className="m-0 max-w-[14ch] text-display">That page isn&apos;t here.</h1>
            <p className="mt-6 max-w-[48ch] text-lead text-muted">The link may be old or mistyped. Try one of the pages below, or head back to the home page.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/" arrow>Go to the home page</Button>
              <Button href="/contact/" variant="secondary">Contact us</Button>
            </div>
          </div>
          <div className="hidden lg:block"><NotFoundIllustration /></div>
        </div>
      </section>
      <section aria-labelledby="nf-links-h" className="border-t-2 border-ink">
        <div className="container-content py-[clamp(2.5rem,5vw,4rem)]">
          <h2 id="nf-links-h" className="m-0 text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Popular pages</h2>
          <ul className="mt-6 grid list-none gap-x-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {links.filter((l) => isLive(l.href)).map((l) => (
              <li key={l.href} className="border-t border-hairline py-4">
                <Link href={l.href} className="flex min-h-11 items-center font-extrabold no-underline">{l.label} →</Link>
                <p className="m-0 mt-1 text-[15px] text-muted">{l.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
