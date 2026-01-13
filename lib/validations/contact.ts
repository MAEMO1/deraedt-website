import { z } from "zod";

export const contactSchema = z.object({
  naam: z
    .string()
    .min(2, "Naam moet minimaal 2 karakters bevatten")
    .max(100, "Naam mag maximaal 100 karakters bevatten"),
  email: z
    .string()
    .email("Ongeldig emailadres")
    .max(255, "Email mag maximaal 255 karakters bevatten"),
  telefoon: z
    .string()
    .max(20, "Telefoonnummer mag maximaal 20 karakters bevatten")
    .optional()
    .or(z.literal("")),
  onderwerp: z.enum(["offerte", "vraag", "sollicitatie", "anders"], {
    message: "Selecteer een onderwerp",
  }),
  bericht: z
    .string()
    .min(20, "Bericht moet minimaal 20 karakters bevatten")
    .max(5000, "Bericht mag maximaal 5000 karakters bevatten"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
