import { z } from "zod";

export const ENQUIRY_TYPES = [
  "SAP implementation / consulting",
  "S/4HANA data migration",
  "SAP integration",
  "SAP managed services",
  "2Klicks demo",
  "AI Services",
  "Partnership",
  "Other",
] as const;

const freeMail = /@(gmail|yahoo|hotmail|outlook|live|icloud)\./i;

/** Shared by the client form and the server action — one schema, both sides. */
export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your full name."),
  email: z.string().trim().email("Enter a valid work email, like name@company.com.")
    .refine((v) => !freeMail.test(v), "Please use your work email address."),
  company: z.string().trim().min(1, "Enter your company name."),
  role: z.string().trim().min(1, "Enter your role."),
  type: z.enum(ENQUIRY_TYPES),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the Privacy Policy so we can reply." }) }),
  // Required by the server action only when TURNSTILE_SECRET_KEY is set.
  turnstileToken: z.string().optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;
