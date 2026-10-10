import { ImagePlaceholder, Kicker, Placeholder } from "./ui";
import { founder } from "@/lib/company";

export function LeadershipSection({ asPage }: { asPage?: boolean }) {
  const Title = asPage ? "h1" : "h2";
  return (
    <section id="leadership" aria-labelledby="lead-h" className="scroll-mt-20 border-t-2 border-rule py-section">
      <div className="container-content">
        <Kicker>Leadership</Kicker>
        <Title id="lead-h" className="m-0 max-w-[18ch] text-h2">Senior people who still work on the projects.</Title>
        <article aria-labelledby="ceo-h" className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-6 border-t-2 border-ink pt-6 md:grid-cols-2">
          <div className="grayscale max-w-[420px]"><ImagePlaceholder label={`Portrait · ${founder.name}`} ratio="aspect-[4/5]" /></div>
          <div className="flex flex-col gap-4">
            <span className="text-kicker font-semibold uppercase tracking-[0.1em] text-muted">{founder.role}</span>
            <h3 id="ceo-h" className="m-0 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05]">{founder.name}</h3>
            {founder.bio.map((p) => <p key={p} className="m-0 max-w-[56ch] text-[17px] leading-relaxed">{p}</p>)}
            <p className="m-0 max-w-[56ch] text-[17px] leading-relaxed">{founder.clients} <Placeholder>CLIENT NAMES · PERMISSION TO CONFIRM</Placeholder></p>
            <ul className="m-0 grid list-none gap-x-6 p-0 sm:grid-cols-2">
              {founder.facts.map(([k, v]) => <li key={k} className="border-t border-hairline py-3"><strong>{k}</strong><div className="text-[15px] text-muted">{v}</div></li>)}
            </ul>
            <a href={founder.linkedin} target="_blank" rel="noopener" className="flex min-h-11 items-center font-extrabold no-underline">LinkedIn →<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </article>
      </div>
    </section>
  );
}
