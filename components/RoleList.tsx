"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { CAREERS_EMAIL, roles, type RoleTeam } from "@/lib/company";

const FILTERS: ("All" | RoleTeam)[] = ["All", "SAP", "AI", "Early career"];

export function RoleList({ headingId }: { headingId: string }) {
  const [team, setTeam] = useState<(typeof FILTERS)[number]>("All");
  const list = roles.filter((r) => team === "All" || r.team === team);
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id={headingId} className="m-0 text-h2">{list.length} open {list.length === 1 ? "role" : "roles"}</h2>
        <div role="group" aria-label="Filter roles by team" className="flex flex-wrap">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={team === f} onClick={() => setTeam(f)}
              className={`-ml-0.5 min-h-11 border-2 border-ink px-4 text-sm font-bold ${team === f ? "bg-ink text-ground" : "bg-transparent text-ink hover:bg-ink/5"}`}>{f}</button>
          ))}
        </div>
      </div>
      <ul className="m-0 mt-8 list-none border-t-2 border-ink p-0" aria-live="polite">
        {list.map((r) => (
          <li key={r.title} className="border-b border-rule">
            <details className="group">
              <summary className="grid min-h-20 cursor-pointer items-center gap-x-6 gap-y-2 py-4 md:grid-cols-3">
                <span className="text-xl font-extrabold">{r.title}</span>
                <span className="text-[15px] text-muted">{r.team} · {r.where}</span>
                <span className="flex items-center justify-between gap-3 text-[15px] text-muted">{r.exp}<Plus aria-hidden className="size-5 flex-none transition-transform group-open:rotate-45" /></span>
              </summary>
              <div className="grid gap-6 pb-8 md:grid-cols-2">
                <p className="m-0 max-w-[52ch] text-muted">{r.body}</p>
                <div className="flex flex-col items-start gap-3">
                  <span className="text-sm"><strong>Skills:</strong> {r.skills}</span>
                  <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Application: " + r.title)}`} data-track="job_apply_click"
                    className="inline-flex min-h-12 items-center gap-2.5 bg-accent px-5 font-extrabold text-ink no-underline hover:bg-accent-600">Apply for this role<ArrowRight aria-hidden className="size-4.5" /></a>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
