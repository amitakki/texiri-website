"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { joinCommunity, type JoinState } from "@/app/actions/community";
import { COMMUNITY_ROLES, EXPERIENCE_LEVELS, communityJoinSchema } from "@/lib/community";
import { collectErrors } from "@/lib/forms";
import { Honeypot } from "./Honeypot";
import { Turnstile } from "./Turnstile";

const input = "rounded-com-sm min-h-12 w-full border border-rule bg-com-bg px-3 text-base hover:border-ink/45 focus-visible:border-com-ink aria-[invalid=true]:border-accent-700";
const err = "mt-1 block min-h-[18px] text-[13px] font-semibold text-accent-800";

export function CommunityJoinForm() {
  const [state, action, pending] = useActionState<JoinState, FormData>(joinCommunity, null);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [level, setLevel] = useState("");
  const errors = { ...(state && !state.ok ? state.errors : {}), ...clientErrors };
  const a = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": `f-${k}-error` });

  if (state?.ok) {
    return (
      <div role="status" className="flex flex-col gap-4">
        <span className="grid size-14 place-items-center rounded-full bg-com"><Check aria-hidden className="size-7" /></span>
        <h2 className="m-0 text-3xl">Welcome aboard, {state.firstName}!</h2>
        <p className="m-0 text-muted">{state.ackSent ? <>Check {state.email} for a welcome email. </> : null}Here&apos;s what happens next:</p>
        <ol className="m-0 flex flex-col gap-1.5 pl-5"><li>We suggest a learning path based on your experience.</li><li>You&apos;ll hear about the next sessions{state.city ? <> near {state.city}</> : null} and online.</li><li>Bring a project to a showcase whenever you&apos;re ready.</li></ol>
        <Link href="/ai-community/learning-paths/" className="rounded-pill inline-flex min-h-12 items-center self-start bg-com px-5 font-extrabold text-navy-900 no-underline">Browse learning paths</Link>
      </div>
    );
  }

  // Submitting through onSubmit (not <form action>) stops React 19 resetting the fields when the server returns an error.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd);
    const r = communityJoinSchema.safeParse({ ...values, consent: values.consent === "on" });
    if (!r.success) {
      const next = collectErrors(r.error.issues);
      setClientErrors(next);
      (document.getElementById(`f-${Object.keys(next)[0]}`) ?? document.querySelector<HTMLInputElement>('input[name="level"]'))?.focus();
      return;
    }
    setClientErrors({});
    window.dataLayer?.push({ event: "community_join", level: values.level });
    startTransition(() => action(fd));
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="hero-h" className="grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <div><label htmlFor="f-name" className="mb-1.5 block text-sm font-semibold">Name *</label><input id="f-name" name="name" autoComplete="name" className={input} {...a("name")} /><span id="f-name-error" className={err}>{errors.name}</span></div>
      <div><label htmlFor="f-email" className="mb-1.5 block text-sm font-semibold">Email *</label><input id="f-email" name="email" type="email" autoComplete="email" className={input} {...a("email")} /><span id="f-email-error" className={err}>{errors.email}</span></div>
      <div><label htmlFor="f-city" className="mb-1.5 block text-sm font-semibold">City *</label><input id="f-city" name="city" autoComplete="address-level2" className={input} {...a("city")} /><span id="f-city-error" className={err}>{errors.city}</span></div>
      <div><label htmlFor="f-role" className="mb-1.5 block text-sm font-semibold">Current role *</label><select id="f-role" name="role" defaultValue="" className={input} {...a("role")}><option value="">Choose one</option>{COMMUNITY_ROLES.map((r) => <option key={r}>{r}</option>)}</select><span id="f-role-error" className={err}>{errors.role}</span></div>
      <fieldset role="radiogroup" className="m-0 border-0 p-0 sm:col-span-2" aria-invalid={errors.level ? true : undefined} aria-describedby="f-level-error">
        <legend className="mb-2 p-0 text-sm font-semibold">Your AI experience *</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE_LEVELS.map((l) => (
            <label key={l.value} className={`rounded-com-sm flex min-h-14 cursor-pointer items-center gap-2.5 border-2 px-3.5 py-2.5 text-[15px] font-semibold ${level === l.value ? "border-navy-900 bg-com-tint" : "border-hairline bg-com-bg"}`}>
              <input type="radio" name="level" value={l.value} onChange={() => setLevel(l.value)} className="m-0 size-4.5 flex-none accent-navy-900" />{l.label}
            </label>
          ))}
        </div>
        <span id="f-level-error" className={err}>{errors.level}</span>
      </fieldset>
      <div className="sm:col-span-2"><label htmlFor="f-why" className="mb-1.5 block text-sm font-semibold">Why are you joining? <span className="font-normal text-muted">(optional)</span></label><textarea id="f-why" name="why" rows={3} className={`${input} py-2`} /></div>
      <div><label htmlFor="f-phone" className="mb-1.5 block text-sm font-semibold">Phone <span className="font-normal text-muted">(optional)</span></label><input id="f-phone" name="phone" type="tel" autoComplete="tel" className={input} /></div>
      <div className="sm:col-span-2">
        <label className="grid cursor-pointer grid-cols-[24px_1fr] items-start gap-2.5 text-sm">
          <input id="f-consent" name="consent" type="checkbox" className="m-0 size-5.5 accent-navy-900" {...a("consent")} />
          <span>I agree that Texiri Solutions may store these details to send me TEXIRI AI Community updates, as described in the <Link href="/legal/privacy/" className="font-bold underline">Privacy Policy</Link>. I can unsubscribe at any time. *</span>
        </label>
        <span id="f-consent-error" className={err}>{errors.consent}</span>
      </div>
      <Turnstile resetKey={state} className="sm:col-span-2" />
      {state && !state.ok && state.message && <p role="alert" className="m-0 font-semibold text-accent-800 sm:col-span-2">{state.message}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className="rounded-pill inline-flex min-h-13 items-center gap-2.5 bg-com px-6 font-extrabold text-navy-900 hover:bg-com-600 disabled:opacity-45">
          {pending ? "Joining…" : "Count me in"}<ArrowRight aria-hidden className="size-4.5" />
        </button>
      </div>
    </form>
  );
}
