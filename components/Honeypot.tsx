import { HONEYPOT_FIELD } from "@/lib/forms";

/** Off-screen field that people (and screen readers) never reach. Bots that fill every input are dropped. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
      <label>Leave this field empty<input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" /></label>
    </div>
  );
}
