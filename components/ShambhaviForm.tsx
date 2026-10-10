"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { submitShambhavi, type S108State } from "@/app/actions/shambhavi";
import { S108_STEPS } from "@/lib/company";
import { collectErrors } from "@/lib/forms";
import { s108Schema } from "@/lib/shambhavi";
import { Honeypot } from "./Honeypot";
import { Turnstile } from "./Turnstile";

const KEY = "texiri-s108-draft";
const DRAFT_TTL_MS = 30 * 24 * 60 * 60 * 1000; // drafts on shared devices shouldn't linger
const LAST = S108_STEPS.length - 1;
const input = "min-h-12 w-full border border-rule bg-surface px-3 text-base text-ink hover:border-ink/45 focus-visible:border-accent-700 aria-[invalid=true]:border-accent-700";
const err = "mt-1 block min-h-[18px] text-[13px] font-semibold text-accent-800";
type Vals = Record<string, string | boolean>;

export function ShambhaviForm() {
  const [state, action, pending] = useActionState<S108State, FormData>(submitShambhavi, null);
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Vals>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (d && Date.now() - (d.savedAt ?? 0) < DRAFT_TTL_MS) { setV(d.v ?? {}); setStep(Math.min(d.step ?? 0, LAST)); }
      else if (d) localStorage.removeItem(KEY);
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return; // don't overwrite the saved draft before it has been read
    try { localStorage.setItem(KEY, JSON.stringify({ v, step, savedAt: Date.now() })); } catch {}
  }, [v, step, hydrated]);
  useEffect(() => {
    if (state?.ok) { try { localStorage.removeItem(KEY); } catch {} return; }
    // A server error can belong to an earlier step: go back to the first step that has one.
    if (state && !state.ok && Object.keys(state.errors).length > 0) {
      const s = S108_STEPS.findIndex((st) => st.fields.some((f) => f.id in state.errors));
      if (s >= 0) { setStep(s); requestAnimationFrame(() => heading.current?.focus()); }
    }
  }, [state]);

  const serverErrors = state && !state.ok ? state.errors : {};
  const allErrors = { ...serverErrors, ...errors };

  if (state?.ok) {
    return (
      <div role="status" className="mt-8 flex flex-col gap-4 border-t-4 border-accent bg-ground p-8">
        <Check aria-hidden className="size-10 text-accent-700" />
        <h3 className="m-0 text-[28px]">Thank you, {state.firstName}. Your application is in.</h3>
        <p className="m-0 max-w-[56ch] text-muted">Our team will review your details and get back to you soon.{state.ackSent && " We've emailed you a confirmation."}</p>
        <Link href="/careers/" className="inline-flex min-h-11 items-center self-start border-2 border-ink px-4 font-extrabold no-underline">Back to Careers</Link>
      </div>
    );
  }

  const cur = S108_STEPS[step];
  const set = (id: string, val: string | boolean) => setV((p) => ({ ...p, [id]: val }));
  const goTo = (s: number) => { setStep(s); requestAnimationFrame(() => heading.current?.focus()); };

  function clearDraft() {
    if (!window.confirm("Clear all your saved answers and start again?")) return;
    try { localStorage.removeItem(KEY); } catch {}
    setV({}); setErrors({}); goTo(0);
  }

  // Always handled here (not <form action>), so React 19 never resets the form and steps advance client-side.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ids = cur.fields.map((f) => f.id);
    const shape = Object.fromEntries(ids.map((id) => [id, true])) as { [K in keyof typeof s108Schema.shape]?: true };
    const r = s108Schema.pick(shape).safeParse(v);
    if (!r.success) {
      const next = collectErrors(r.error.issues);
      setErrors(next);
      document.getElementById(`s108-${ids.find((id) => next[id])}`)?.focus();
      return;
    }
    setErrors({});
    if (step < LAST) goTo(step + 1);
    else { const fd = new FormData(e.currentTarget); startTransition(() => action(fd)); }
  }

  return (
    <>
      <ol aria-label="Progress" className="m-0 mt-8 grid list-none grid-cols-4 gap-1 p-0">
        {S108_STEPS.map((s, i) => (
          <li key={s.label} aria-current={i === step ? "step" : undefined} className={`border-t-4 pt-2 text-[13px] font-bold ${i <= step ? "border-accent text-ink" : "border-neutral-400 text-muted"}`}>
            <span className="block">Step {i + 1}</span><span className="block font-semibold">{s.label}</span>
          </li>
        ))}
      </ol>
      <form onSubmit={onSubmit} noValidate aria-labelledby="step-h" className="mt-6 border-t-4 border-accent bg-ground p-[clamp(1.25rem,3vw,2.5rem)]">
        <Honeypot />
        {/* All answers travel with the final submit */}
        {Object.entries(v).map(([k, val]) => cur.fields.some((f) => f.id === k) ? null : <input key={k} type="hidden" name={k} value={val === true ? "on" : String(val)} />)}
        <h3 id="step-h" ref={heading} tabIndex={-1} className="mb-6 mt-0 text-2xl outline-none">{cur.label}</h3>
        <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
          {cur.fields.map((f) => {
            const id = `s108-${f.id}`, e = allErrors[f.id];
            const invalid = e ? true : undefined;
            const aria = { "aria-invalid": invalid, "aria-describedby": `${id}-err` };
            const wide = f.kind === "area" || f.kind === "check" || (f.kind === "choice" && f.opts.length > 2) || f.id === "occupation" || f.id === "describe";
            return (
              <div key={f.id} className={wide ? "sm:col-span-2" : ""}>
                {f.kind === "area" ? (
                  <><label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{f.label} *</label><textarea id={id} name={f.id} rows={3} value={String(v[f.id] ?? "")} onChange={(x) => set(f.id, x.target.value)} className={`${input} py-2`} {...aria} /></>
                ) : f.kind === "choice" ? (
                  <fieldset role="radiogroup" className="m-0 border-0 p-0" aria-invalid={invalid} aria-describedby={`${id}-err`}>
                    <legend className="mb-1.5 p-0 text-sm font-semibold">{f.label} *</legend>
                    <div className="flex flex-wrap">
                      {f.opts.map((o, i) => (
                        <label key={o} className={`-ml-0.5 flex min-h-12 min-w-14 cursor-pointer items-center border-2 border-ink px-4 font-bold has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-700 ${v[f.id] === o ? "bg-ink text-ground" : "bg-ground"}`}>
                          <input id={i === 0 ? id : undefined} type="radio" name={f.id} value={o} checked={v[f.id] === o} onChange={() => set(f.id, o)} className="sr-only" />{o}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : f.kind === "check" ? (
                  <label className="grid cursor-pointer grid-cols-[24px_1fr] items-start gap-2.5 text-[15px]">
                    <input id={id} name={f.id} type="checkbox" checked={!!v[f.id]} onChange={(x) => set(f.id, x.target.checked)} className="m-0 size-5.5 accent-navy-900" {...aria} /><span>{f.label} *</span>
                  </label>
                ) : (
                  <><label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{f.label} *</label>
                  <input id={id} name={f.id} type={f.kind === "number" ? "text" : f.kind} inputMode={f.kind === "number" ? "numeric" : undefined} autoComplete={"auto" in f ? f.auto : "off"} value={String(v[f.id] ?? "")} onChange={(x) => set(f.id, x.target.value)} className={input} {...aria} /></>
                )}
                <span id={`${id}-err`} className={err}>{e}</span>
              </div>
            );
          })}
        </div>
        {step === LAST && <p className="mb-0 mt-2 text-sm text-muted">Read how we use and protect your answers in our <Link href="/legal/privacy/" className="font-bold text-ink underline">Privacy Policy</Link>.</p>}
        {step === LAST && <Turnstile resetKey={state} className="mt-4" />}
        {state && !state.ok && state.message && <p role="alert" className="mb-0 mt-4 font-semibold text-accent-800">{state.message}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hairline pt-6">
          {step > 0 && <button type="button" onClick={() => { setErrors({}); goTo(step - 1); }} className="inline-flex min-h-13 items-center border-2 border-ink px-5 font-extrabold hover:bg-ink/5">Back</button>}
          <button type="submit" disabled={pending} className="inline-flex min-h-13 items-center gap-2.5 bg-accent px-5 font-extrabold text-ink hover:bg-accent-600 disabled:opacity-45">
            {step === LAST ? (pending ? "Submitting…" : "Submit application") : "Continue"}<ArrowRight aria-hidden className="size-4.5" />
          </button>
          <span className="text-[13px] text-muted">Step {step + 1} of {S108_STEPS.length}</span>
          {Object.keys(v).length > 0 && <button type="button" onClick={clearDraft} className="ml-auto min-h-11 text-[13px] font-semibold text-muted underline hover:text-ink">Clear saved answers</button>}
        </div>
      </form>
    </>
  );
}
