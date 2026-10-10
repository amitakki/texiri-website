import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { shambhavi108 } from "@/lib/company";

export function Shambhavi108({ asPage }: { asPage?: boolean }) {
  const Title = asPage ? "h1" : "h2";
  return (
    <section id="shambhavi-108" aria-labelledby="s108-h" className="surface-bright scroll-mt-20 bg-accent py-section text-navy-900">
      <div className="container-content">
        <span className="mb-6 block text-kicker font-bold uppercase tracking-[0.1em]">Career restart programme</span>
        <Title id="s108-h" className="m-0 -ml-[0.04em] text-[clamp(3.5rem,10vw,10rem)] leading-[0.9] tracking-[-0.04em] text-navy-900">Shambhavi 108</Title>
        <p className="mb-0 mt-8 max-w-[40ch] text-[clamp(1.125rem,1.8vw,1.5rem)] font-semibold leading-snug">{shambhavi108.summary}</p>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 md:grid-cols-3">
          {shambhavi108.blocks.map(([t, d]) => <div key={t} className="border-t-2 border-navy-900 pt-4"><h3 className="mb-2 mt-0 text-[22px] text-navy-900">{t}</h3><p className="m-0">{d}</p></div>)}
        </div>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-wrap gap-3">
          <Link href="/careers/shambhavi-108/#register" className="inline-flex min-h-13 items-center gap-2.5 bg-navy-900 px-5 font-extrabold text-on-navy no-underline hover:bg-navy-700">Register for Shambhavi 108<ArrowRight aria-hidden className="size-4.5" /></Link>
          <Link href="/ai-community/" className="inline-flex min-h-13 items-center border-2 border-navy-900 px-5 font-extrabold text-navy-900 no-underline hover:bg-navy-900 hover:text-on-navy">Start learning in the AI Community</Link>
        </div>
      </div>
    </section>
  );
}
