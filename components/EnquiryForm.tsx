"use client";

import Link from "next/link";
import { startTransition, useActionState, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { ENQUIRY_TYPES, enquirySchema, isFreeMail } from "@/lib/enquiry";
import { collectErrors } from "@/lib/forms";
import { Honeypot } from "./Honeypot";
import { Turnstile } from "./Turnstile";

const input ="min-h-12 w-full border border-rule bg-surface px-3 text-base text-ink caret-accent-700 hover:border-ink/45 focus-visible:border-accent-700 aria-[invalid=true]:border-accent-700";
const label = "mb-1.5 block text-sm font-semibold";
const err = "mt-1 block min-h-[18px] text-[13px] font-semibold text-accent-800";

function Field({ id, text, error, hint, children }: { id: string; text: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text}</label>
      {children}
      <span id={`${id}-error`} className={err}>{error ?? (hint && <span className="font-normal text-muted">{hint}</span>)}</span>
    </div>
  );
}

export function EnquiryForm({ defaultType = "SAP implementation / consulting", headingId }: { defaultType?: (typeof ENQUIRY_TYPES)[number]; headingId: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, null);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [freeMailHint, setFreeMailHint] = useState(false);
  const started = useRef(false);
  const errors = { ...(state && !state.ok ? state.errors : {}), ...clientErrors };

  if (state?.ok) {
    return (
      <div role="status" className="flex flex-col gap-4">
        <Check aria-hidden className="size-10 text-accent-700" />
        <h3 className="m-0 text-[28px]">Thanks, {state.firstName}. We reply within one business day.</h3>
        {state.ackSent && <p className="m-0 text-muted">We&apos;ve emailed you a confirmation.</p>}
        <ol className="m-0 flex flex-col gap-1.5 pl-5"><li>A senior consultant reviews your enquiry.</li><li>We email you to book a short scoping call.</li><li>We come prepared with relevant examples.</li></ol>
      </div>
    );
  }

  // Submitting through onSubmit (not <form action>) stops React 19 resetting the fields when the server returns an error.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd);
    const r = enquirySchema.safeParse({ ...values, consent: values.consent === "on" });
    if (!r.success) {
      const next = collectErrors(r.error.issues);
      setClientErrors(next);
      document.getElementById(`f-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setClientErrors({});
    window.dataLayer?.push({ event: "form_submit", enquiry_type: values.type });
    startTransition(() => action(fd));
  }

  function onFirstFocus() {
    if (started.current) return;
    started.current = true;
    window.dataLayer?.push({ event: "form_start" });
  }

  const a = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": `f-${k}-error` });

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={headingId} onFocus={onFirstFocus} className="grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <Field id="f-name" text="Full name *" error={errors.name}><input id="f-name" name="name" autoComplete="name" className={input} {...a("name")} /></Field>
      <Field id="f-email" text="Work email *" error={errors.email} hint={freeMailHint ? "A work email helps us route your enquiry, but any address is fine." : undefined}>
        <input id="f-email" name="email" type="email" autoComplete="email" className={input} onBlur={(e) => setFreeMailHint(isFreeMail(e.target.value))} {...a("email")} />
      </Field>
      <Field id="f-company" text="Company *" error={errors.company}><input id="f-company" name="company" autoComplete="organization" className={input} {...a("company")} /></Field>
      <Field id="f-role" text="Role *" error={errors.role}><input id="f-role" name="role" autoComplete="organization-title" className={input} {...a("role")} /></Field>
      <Field id="f-type" text="Enquiry type"><select id="f-type" name="type" defaultValue={defaultType} key={defaultType} className={input}>{ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
      <Field id="f-phone" text="Phone (optional)"><input id="f-phone" name="phone" type="tel" autoComplete="tel" className={input} /></Field>
      <div className="sm:col-span-2"><Field id="f-message" text="Message"><textarea id="f-message" name="message" rows={4} className={`${input} py-2`} /></Field></div>
      <div className="sm:col-span-2">
        <label className="grid cursor-pointer grid-cols-[24px_1fr] items-start gap-2.5 text-sm">
          <input id="f-consent" name="consent" type="checkbox" className="m-0 size-5.5 accent-navy-900" {...a("consent")} />
          <span>I agree that Texiri Solutions may use these details to respond to my enquiry, as described in the <Link href="/legal/privacy/" className="font-bold underline">Privacy Policy</Link>. *</span>
        </label>
        <span id="f-consent-error" className={err}>{errors.consent}</span>
      </div>
      <Turnstile resetKey={state} className="sm:col-span-2" />
      {state && !state.ok && state.message && <p role="alert" className="m-0 font-semibold text-accent-800 sm:col-span-2">{state.message}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className="inline-flex min-h-13 items-center gap-2.5 bg-accent px-5 font-extrabold text-ink hover:bg-accent-600 disabled:opacity-45">
          {pending ? "Sending…" : "Send enquiry"}<ArrowRight aria-hidden className="size-4.5" />
        </button>
      </div>
    </form>
  );
}

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }
