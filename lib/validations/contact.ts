import { z } from "zod";

// Matching CONTACT_SUBJECTS from constants.ts
const contactSubjects = [
  "raamcontract",
  "offerte",
  "interventie",
  "facility",
  "sollicitatie",
  "anders",
] as const;

export const contactSchema = z.object({
  naam: z
    .string()
    .min(2, "Naam moet minimaal 2 karakters bevatten")
    .max(100, "Naam mag maximaal 100 karakters bevatten"),
  organisatie: z
    .string()
    .max(200, "Organisatie mag maximaal 200 karakters bevatten")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Ongeldig emailadres")
    .max(255, "Email mag maximaal 255 karakters bevatten"),
  telefoon: z
    .string()
    .max(20, "Telefoonnummer mag maximaal 20 karakters bevatten")
    .optional()
    .or(z.literal("")),
  onderwerp: z.enum(contactSubjects, {
    message: "Selecteer een onderwerp",
  }),
  bericht: z
    .string()
    .min(20, "Bericht moet minimaal 20 karakters bevatten")
    .max(5000, "Bericht mag maximaal 5000 karakters bevatten"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactSubject = typeof contactSubjects[number];

// Map contact subjects to lead types
export function getLeadTypeFromSubject(subject: ContactSubject): 'project' | 'facility' | 'partner' | 'procurement' | 'contact' {
  switch (subject) {
    case 'raamcontract':
      return 'procurement';
    case 'offerte':
      return 'project';
    case 'interventie':
    case 'facility':
      return 'facility';
    case 'sollicitatie':
      // Sollicitaties should go through /werken-bij flow, but if submitted here, treat as contact
      return 'contact';
    case 'anders':
    default:
      return 'contact';
  }
}
