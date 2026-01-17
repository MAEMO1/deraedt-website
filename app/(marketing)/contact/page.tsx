"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Loader2,
  Check,
  Clock,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { COMPANY, CONTACT_SUBJECTS, STATS } from "@/lib/constants";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      naam: "",
      organisatie: "",
      email: "",
      telefoon: "",
      onderwerp: undefined,
      bericht: "",
      honeypot: "",
    },
  });

  const selectedSubject = watch("onderwerp");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Verzenden mislukt");
      }

      setIsSuccess(true);
      reset();
      toast.success("Bericht verzonden!", {
        description: "Wij nemen zo snel mogelijk contact met u op.",
      });
    } catch {
      toast.error("Er is iets misgegaan", {
        description: "Probeer het later opnieuw of neem telefonisch contact op.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 pt-32">
        <div className="absolute inset-0 grid-blueprint opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
            className="w-20 h-20 mx-auto mb-10 rounded-full bg-[#9A6B4C]/10 flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-[#9A6B4C]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="h-px w-12 bg-[#9A6B4C]/30" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9A6B4C]">
              Bericht verzonden
            </span>
            <span className="h-px w-12 bg-[#9A6B4C]/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl text-[#0C0C0C] tracking-[-0.02em]"
          >
            Bedankt
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg text-[#6B6560]"
          >
            Wij nemen binnen <span className="text-[#9A6B4C] font-medium">24 uur</span> contact met u op.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/15"
            >
              <span>Naar home</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={() => setIsSuccess(false)}
              className="inline-flex items-center justify-center gap-3 border-2 border-[#0C0C0C]/10 text-[#0C0C0C] px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300 hover:border-[#9A6B4C] hover:text-[#9A6B4C]"
            >
              Nieuw bericht
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Grid pattern */}
      <div className="fixed inset-0 grid-blueprint opacity-30 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Overline */}
              <div className="flex items-center gap-4 mb-8">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px w-12 bg-[#9A6B4C] origin-left"
                />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9A6B4C]">
                  Contact
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#0C0C0C] tracking-[-0.02em] leading-[0.95]">
                Laten we
                <br />
                <span className="text-[#9A6B4C]">praten</span>
              </h1>

              <p className="mt-8 text-lg text-[#6B6560] leading-relaxed max-w-md">
                Heeft u een vraag of wilt u een vrijblijvende offerte?
                Wij reageren binnen 24 uur.
              </p>

              {/* Contact cards */}
              <div className="mt-12 space-y-4">
                <motion.a
                  href={`tel:${COMPANY.contact.phone}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group flex items-center gap-5 p-5 bg-white border border-[#0C0C0C]/5 shadow-sm hover:shadow-md hover:border-[#9A6B4C]/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-[#9A6B4C]/5 flex items-center justify-center group-hover:bg-[#9A6B4C]/10 transition-colors">
                    <Phone className="w-6 h-6 text-[#9A6B4C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mb-1">
                      Telefoon
                    </div>
                    <div className="text-lg text-[#0C0C0C] font-medium">
                      {COMPANY.contact.phone}
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href={`mailto:${COMPANY.contact.email}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group flex items-center gap-5 p-5 bg-white border border-[#0C0C0C]/5 shadow-sm hover:shadow-md hover:border-[#9A6B4C]/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-[#9A6B4C]/5 flex items-center justify-center group-hover:bg-[#9A6B4C]/10 transition-colors">
                    <Mail className="w-6 h-6 text-[#9A6B4C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mb-1">
                      Email
                    </div>
                    <div className="text-lg text-[#0C0C0C] font-medium">
                      {COMPANY.contact.email}
                    </div>
                  </div>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-5 p-5 bg-white border border-[#0C0C0C]/5 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-full bg-[#9A6B4C]/5 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#9A6B4C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mb-1">
                      Adres
                    </div>
                    <div className="text-[#0C0C0C] font-medium">
                      {COMPANY.address.street}, {COMPANY.address.postal} {COMPANY.address.city}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Response time badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-[#9A6B4C]/5 border border-[#9A6B4C]/10"
              >
                <Clock className="w-4 h-4 text-[#9A6B4C]" />
                <span className="text-sm text-[#6B6560]">
                  Gemiddelde responstijd: <span className="text-[#9A6B4C] font-medium">4 uur</span>
                </span>
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 40 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative bg-white border border-[#0C0C0C]/5 p-8 lg:p-10 shadow-sm"
              >
                {/* Form header */}
                <div className="mb-10">
                  <h2 className="font-display text-2xl text-[#0C0C0C]">
                    Stuur een bericht
                  </h2>
                  <p className="mt-2 text-sm text-[#6B6560]">
                    Velden met * zijn verplicht
                  </p>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  {...register("honeypot")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-6">
                  {/* Name & Organisation */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] text-[#6B6560]/80 uppercase tracking-[0.15em] mb-3">
                        Naam <span className="text-[#9A6B4C]">*</span>
                      </label>
                      <input
                        {...register("naam")}
                        onFocus={() => setFocusedField("naam")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Uw naam"
                        className={`w-full bg-[#FAF7F2] border px-5 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/40 focus:outline-none transition-all duration-300 ${
                          focusedField === "naam"
                            ? "border-[#9A6B4C] bg-white"
                            : errors.naam
                            ? "border-red-400"
                            : "border-[#0C0C0C]/10 hover:border-[#0C0C0C]/20"
                        }`}
                      />
                      {errors.naam && (
                        <p className="mt-2 text-xs text-red-500">{errors.naam.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#6B6560]/80 uppercase tracking-[0.15em] mb-3">
                        Organisatie
                      </label>
                      <input
                        {...register("organisatie")}
                        onFocus={() => setFocusedField("organisatie")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Bedrijf of instelling"
                        className={`w-full bg-[#FAF7F2] border px-5 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/40 focus:outline-none transition-all duration-300 ${
                          focusedField === "organisatie"
                            ? "border-[#9A6B4C] bg-white"
                            : "border-[#0C0C0C]/10 hover:border-[#0C0C0C]/20"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] text-[#6B6560]/80 uppercase tracking-[0.15em] mb-3">
                        Email <span className="text-[#9A6B4C]">*</span>
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="uw@email.be"
                        className={`w-full bg-[#FAF7F2] border px-5 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/40 focus:outline-none transition-all duration-300 ${
                          focusedField === "email"
                            ? "border-[#9A6B4C] bg-white"
                            : errors.email
                            ? "border-red-400"
                            : "border-[#0C0C0C]/10 hover:border-[#0C0C0C]/20"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#6B6560]/80 uppercase tracking-[0.15em] mb-3">
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        {...register("telefoon")}
                        onFocus={() => setFocusedField("telefoon")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+32 ..."
                        className={`w-full bg-[#FAF7F2] border px-5 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/40 focus:outline-none transition-all duration-300 ${
                          focusedField === "telefoon"
                            ? "border-[#9A6B4C] bg-white"
                            : "border-[#0C0C0C]/10 hover:border-[#0C0C0C]/20"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[11px] text-[#6B6560]/80 uppercase tracking-[0.15em] mb-3">
                      Onderwerp <span className="text-[#9A6B4C]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_SUBJECTS.map((subject) => (
                        <button
                          key={subject.value}
                          type="button"
                          onClick={() => setValue("onderwerp", subject.value as ContactFormData["onderwerp"])}
                          className={`px-4 py-2.5 text-sm border transition-all duration-300 ${
                            selectedSubject === subject.value
                              ? "bg-[#9A6B4C] border-[#9A6B4C] text-white"
                              : "bg-white border-[#0C0C0C]/10 text-[#6B6560] hover:border-[#9A6B4C]/30 hover:text-[#0C0C0C]"
                          }`}
                        >
                          {subject.label}
                        </button>
                      ))}
                    </div>
                    {errors.onderwerp && (
                      <p className="mt-2 text-xs text-red-500">{errors.onderwerp.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] text-[#6B6560]/80 uppercase tracking-[0.15em] mb-3">
                      Bericht <span className="text-[#9A6B4C]">*</span>
                    </label>
                    <textarea
                      {...register("bericht")}
                      onFocus={() => setFocusedField("bericht")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Vertel ons meer over uw project of vraag..."
                      rows={5}
                      className={`w-full bg-[#FAF7F2] border px-5 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/40 focus:outline-none transition-all duration-300 resize-none ${
                        focusedField === "bericht"
                          ? "border-[#9A6B4C] bg-white"
                          : errors.bericht
                          ? "border-red-400"
                          : "border-[#0C0C0C]/10 hover:border-[#0C0C0C]/20"
                      }`}
                    />
                    {errors.bericht && (
                      <p className="mt-2 text-xs text-red-500">{errors.bericht.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group w-full mt-4 py-5 text-base font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? "bg-[#6B6560]/20 text-[#6B6560]/50 cursor-not-allowed"
                        : "bg-[#9A6B4C] text-white hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/15"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verzenden...
                      </>
                    ) : (
                      <>
                        Verstuur bericht
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company info strip */}
      <section className="relative border-t border-[#0C0C0C]/5 bg-white/50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#9A6B4C]/5 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#9A6B4C]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mb-1">
                  Bedrijf
                </div>
                <div className="text-[#0C0C0C] font-medium">{COMPANY.name}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#9A6B4C]/5 flex items-center justify-center shrink-0">
                <span className="text-[#9A6B4C] text-sm font-medium">KBO</span>
              </div>
              <div>
                <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mb-1">
                  Ondernemingsnummer
                </div>
                <div className="text-[#0C0C0C] font-medium">{COMPANY.kbo}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#9A6B4C]/5 flex items-center justify-center shrink-0">
                <span className="text-[#9A6B4C] text-sm font-medium">BTW</span>
              </div>
              <div>
                <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mb-1">
                  BTW-nummer
                </div>
                <div className="text-[#0C0C0C] font-medium">{COMPANY.btw}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-display text-3xl text-[#0C0C0C]">{STATS.yearsExperience}</div>
                <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.15em]">Jaar</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-[#0C0C0C]">500<span className="text-[#9A6B4C]">+</span></div>
                <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.15em]">Projecten</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-[#0C0C0C]">6</div>
                <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.15em]">Klasse</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="relative h-[350px] border-t border-[#0C0C0C]/5 bg-[#F5F3EF]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-[#9A6B4C]/30 mx-auto mb-4" />
            <p className="text-[#6B6560] text-sm">
              {COMPANY.address.street}, {COMPANY.address.postal} {COMPANY.address.city}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${COMPANY.address.street}, ${COMPANY.address.postal} ${COMPANY.address.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#9A6B4C] text-sm hover:text-[#7A5339] transition-colors"
            >
              Open in Google Maps
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
