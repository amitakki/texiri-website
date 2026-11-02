import { Kicker, SiteImage } from "./ui";
import { images } from "@/lib/images";
import { leaders } from "@/lib/company";

export function LeadershipSection({ asPage }: { asPage?: boolean }) {
  const Title = asPage ? "h1" : "h2";
  return (
    <section id="leadership" aria-labelledby="lead-h" className="scroll-mt-20 border-t-2 border-rule py-section">
      <div className={`container-content ${asPage ? "hero-enter" : ""}`}>
        <Kicker>Leadership</Kicker>
        <Title id="lead-h" className="m-0 max-w-[18ch] text-h2">Senior people who still work on the projects.</Title>
        {leaders.map((l, i) => (
          <article key={l.name} aria-labelledby={`leader-${i}-h`} className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-6 border-t-2 border-ink pt-6 md:grid-cols-2">
            <div className="w-full max-w-[360px]"><SiteImage {...images[l.image]} ratio="aspect-[4/5]" sizes="360px" /></div>
            <div className="flex flex-col gap-4">
              <span className="text-kicker font-semibold uppercase tracking-[0.1em] text-muted">{l.role}</span>
              <h3 id={`leader-${i}-h`} className="m-0 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05]">{l.name}</h3>
              {l.bio.map((p) => <p key={p} className="m-0 max-w-[56ch] text-[17px] leading-relaxed">{p}</p>)}
              <ul className="m-0 grid list-none gap-x-6 p-0 sm:grid-cols-2">
                {l.facts.map(([k, v]) => <li key={k} className="border-t border-hairline py-3"><strong>{k}</strong><div className="text-[15px] text-muted">{v}</div></li>)}
              </ul>
              {l.linkedin && <a href={l.linkedin} target="_blank" rel="noopener" className="flex min-h-11 items-center font-extrabold no-underline">LinkedIn<span className="sr-only">: {l.name}</span> →<span className="sr-only"> (opens in a new tab)</span></a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
