"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Download,
  CheckCircle,
  Shield,
  Award,
  Leaf,
  FileCheck,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const requestSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  organisation: z.string().min(2, "Organisatie is verplicht"),
  email: z.string().email("Ongeldig emailadres"),
  phone: z.string().optional(),
  purpose: z.enum(["aanbesteding", "preselectie", "raamcontract", "other"], "Selecteer een doel"),
  purposeOther: z.string().optional(),
  message: z.string().optional(),
});

type RequestForm = z.infer<typeof requestSchema>;

const purposeOptions = [
  { value: "aanbesteding", label: "Aanbesteding / Openbare opdracht" },
  { value: "preselectie", label: "Preselectie / Kandidaatstelling" },
  { value: "raamcontract", label: "Raamcontract onderhandeling" },
  { value: "other", label: "Anders" },
];

const availableDocuments = [
  { name: "ISO 9001:2015 Certificaat", type: "Kwaliteit" },
  { name: "VCA** Certificaat", type: "Veiligheid" },
  { name: "CO₂-Prestatieladder Niveau 3", type: "Duurzaamheid" },
  { name: "Erkenning Klasse 6 - Categorie D", type: "Erkenning" },
  { name: "Erkenning Klasse 4 - Subcategorie D8", type: "Erkenning" },
  { name: "Burgerlijke Aansprakelijkheid Attest", type: "Verzekering" },
  { name: "Tienjarige Aansprakelijkheid Attest", type: "Verzekering" },
  { name: "Referentielijst Overheidsopdrachten", type: "Referenties" },
];

export function DocumentatieClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RequestForm>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      purpose: undefined,
    },
  });

  const watchPurpose = watch("purpose");

  const onSubmit = async (data: RequestForm) => {
    setIsSubmitting(true);

    try {
      // Create lead via API
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_type: "procurement",
          contact_name: data.name,
          contact_email: data.email,
          contact_phone: data.phone || null,
          organisation: data.organisation,
          message: `Doel: ${purposeOptions.find(p => p.value === data.purpose)?.label || data.purpose}${data.purposeOther ? ` (${data.purposeOther})` : ""}${data.message ? `\n\nBericht: ${data.message}` : ""}`,
          source: "tender-pack-request",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);
      toast.success("Aanvraag verzonden!", {
        description: "U ontvangt de documentatie binnen 24 uur.",
      });
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Er is iets misgegaan", {
        description: "Probeer het later opnieuw of neem contact met ons op.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0C0C0C] py-24 pt-40">
        <div className="container-wide">
          <Link
            href="/procurement"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Terug naar Procurement Hub</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Tender Pack
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-white leading-[0.95]">
              Documentatie aanvragen
            </h1>

            <p className="mt-6 text-white/50 leading-relaxed">
              Vraag ons tender pack aan met alle certificaten en referenties die
              u nodig heeft voor uw aanbesteding, preselectie of raamcontract.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-[#FAF7F2]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isSubmitted ? (
                <div className="bg-white p-10 border border-green-200">
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="font-display text-2xl text-[#0C0C0C] mb-4">
                      Aanvraag ontvangen!
                    </h2>
                    <p className="text-[#6B6560] mb-8">
                      Bedankt voor uw aanvraag. U ontvangt het tender pack met
                      alle gevraagde documentatie binnen 24 uur per email.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/procurement"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0C0C0C] text-white text-sm font-semibold transition-colors hover:bg-[#9A6B4C]"
                      >
                        Terug naar Procurement Hub
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#0C0C0C]/20 text-[#0C0C0C] text-sm font-medium transition-colors hover:bg-[#0C0C0C] hover:text-white"
                      >
                        Contact opnemen
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 sm:p-10 border border-[#0C0C0C]/5">
                  <h2 className="font-display text-2xl text-[#0C0C0C] mb-6">
                    Vul uw gegevens in
                  </h2>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name">Naam *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="mt-2"
                        placeholder="Uw naam"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Organisation */}
                    <div>
                      <Label htmlFor="organisation">Organisatie *</Label>
                      <Input
                        id="organisation"
                        {...register("organisation")}
                        className="mt-2"
                        placeholder="Uw organisatie"
                      />
                      {errors.organisation && (
                        <p className="text-sm text-red-600 mt-1">{errors.organisation.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-2"
                        placeholder="uw@email.be"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone">Telefoon (optioneel)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-2"
                        placeholder="+32 ..."
                      />
                    </div>

                    {/* Purpose */}
                    <div>
                      <Label>Doel van aanvraag *</Label>
                      <div className="mt-3 space-y-2">
                        {purposeOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-3 p-3 border border-[#0C0C0C]/10 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                          >
                            <input
                              type="radio"
                              value={option.value}
                              {...register("purpose")}
                              className="w-4 h-4 text-[#9A6B4C] border-gray-300 focus:ring-[#9A6B4C]"
                            />
                            <span className="text-sm text-[#0C0C0C]">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.purpose && (
                        <p className="text-sm text-red-600 mt-1">{errors.purpose.message}</p>
                      )}
                    </div>

                    {/* Purpose Other */}
                    {watchPurpose === "other" && (
                      <div>
                        <Label htmlFor="purposeOther">Specificeer</Label>
                        <Input
                          id="purposeOther"
                          {...register("purposeOther")}
                          className="mt-2"
                          placeholder="Waarvoor heeft u de documentatie nodig?"
                        />
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">Aanvullende opmerkingen (optioneel)</Label>
                      <textarea
                        id="message"
                        {...register("message")}
                        rows={3}
                        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Specifieke documenten of vragen..."
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 text-sm font-semibold uppercase tracking-[0.1em]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verzenden...
                        </>
                      ) : (
                        <>
                          Tender Pack Aanvragen
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Documents List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display text-2xl text-[#0C0C0C] mb-6">
                Beschikbare documentatie
              </h2>

              <p className="text-[#6B6560] mb-8">
                Het tender pack bevat alle documenten die u nodig heeft voor
                aanbestedingen en preselecties. Na uw aanvraag ontvangt u:
              </p>

              <div className="space-y-4">
                {availableDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 bg-white border border-[#0C0C0C]/5"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#0C0C0C]">{doc.name}</div>
                      <div className="text-xs text-[#6B6560]">{doc.type}</div>
                    </div>
                    <Download className="w-4 h-4 text-[#6B6560]" />
                  </motion.div>
                ))}
              </div>

              {/* Certifications Summary */}
              <div className="mt-10 p-6 bg-[#0C0C0C] text-white">
                <h3 className="font-display text-lg mb-4">Onze certificeringen</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Shield className="w-4 h-4 text-[#9A6B4C]" />
                    Klasse 6 erkend
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Award className="w-4 h-4 text-[#9A6B4C]" />
                    ISO 9001
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <FileCheck className="w-4 h-4 text-[#9A6B4C]" />
                    VCA**
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Leaf className="w-4 h-4 text-[#9A6B4C]" />
                    CO₂-niveau 3
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
