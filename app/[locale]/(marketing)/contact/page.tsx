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
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6 pt-32">
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
            className="w-20 h-20 mx-auto mb-10 rounded-full bg-[#204CE5]/10 flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-[#204CE5]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full" />
              Bericht verzonden
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl font-bold text-[#112337]"
          >
            Bedankt
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg text-[#686E77]"
          >
            Wij nemen binnen <span className="text-[#204CE5] font-semibold">24 uur</span> contact met u op.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl"
            >
              <span>Naar home</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={() => setIsSuccess(false)}
              className="inline-flex items-center justify-center gap-3 bg-white text-[#112337] px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#F5F5F5]"
            >
              Nieuw bericht
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-24 bg-[#F5F5F5]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-overline">Contact</span>

              <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold text-[#112337] leading-tight">
                Laten we
                <br />
                <span className="text-[#204CE5]">praten</span>
              </h1>

              <p className="mt-8 text-lg text-[#686E77] leading-relaxed max-w-md">
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
                  className="group flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#204CE5]/10 flex items-center justify-center group-hover:bg-[#204CE5] transition-colors">
                    <Phone className="w-6 h-6 text-[#204CE5] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-[#686E77] uppercase tracking-wider mb-1">
                      Telefoon
                    </div>
                    <div className="text-lg text-[#112337] font-semibold">
                      {COMPANY.contact.phone}
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href={`mailto:${COMPANY.contact.email}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#204CE5]/10 flex items-center justify-center group-hover:bg-[#204CE5] transition-colors">
                    <Mail className="w-6 h-6 text-[#204CE5] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-[#686E77] uppercase tracking-wider mb-1">
                      Email
                    </div>
                    <div className="text-lg text-[#112337] font-semibold">
                      {COMPANY.contact.email}
                    </div>
                  </div>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#204CE5]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#204CE5]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-[#686E77] uppercase tracking-wider mb-1">
                      Adres
                    </div>
                    <div className="text-[#112337] font-semibold">
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
                className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-[#204CE5]/5 rounded-full"
              >
                <Clock className="w-4 h-4 text-[#204CE5]" />
                <span className="text-sm text-[#686E77]">
                  Gemiddelde responstijd: <span className="text-[#204CE5] font-semibold">4 uur</span>
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
                className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-xl"
              >
                {/* Form header */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#112337]">
                    Stuur een bericht
                  </h2>
                  <p className="mt-2 text-sm text-[#686E77]">
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
                      <label className="block text-sm text-[#112337] font-medium mb-2">
                        Naam <span className="text-[#204CE5]">*</span>
                      </label>
                      <input
                        {...register("naam")}
                        onFocus={() => setFocusedField("naam")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Uw naam"
                        className={`w-full bg-[#F5F5F5] border-2 rounded-xl px-5 py-4 text-[#112337] placeholder:text-[#686E77]/50 focus:outline-none transition-all duration-300 ${
                          focusedField === "naam"
                            ? "border-[#204CE5] bg-white"
                            : errors.naam
                            ? "border-red-400"
                            : "border-transparent hover:border-[#204CE5]/20"
                        }`}
                      />
                      {errors.naam && (
                        <p className="mt-2 text-xs text-red-500">{errors.naam.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#112337] font-medium mb-2">
                        Organisatie
                      </label>
                      <input
                        {...register("organisatie")}
                        onFocus={() => setFocusedField("organisatie")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Bedrijf of instelling"
                        className={`w-full bg-[#F5F5F5] border-2 rounded-xl px-5 py-4 text-[#112337] placeholder:text-[#686E77]/50 focus:outline-none transition-all duration-300 ${
                          focusedField === "organisatie"
                            ? "border-[#204CE5] bg-white"
                            : "border-transparent hover:border-[#204CE5]/20"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#112337] font-medium mb-2">
                        Email <span className="text-[#204CE5]">*</span>
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="uw@email.be"
                        className={`w-full bg-[#F5F5F5] border-2 rounded-xl px-5 py-4 text-[#112337] placeholder:text-[#686E77]/50 focus:outline-none transition-all duration-300 ${
                          focusedField === "email"
                            ? "border-[#204CE5] bg-white"
                            : errors.email
                            ? "border-red-400"
                            : "border-transparent hover:border-[#204CE5]/20"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#112337] font-medium mb-2">
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        {...register("telefoon")}
                        onFocus={() => setFocusedField("telefoon")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+32 ..."
                        className={`w-full bg-[#F5F5F5] border-2 rounded-xl px-5 py-4 text-[#112337] placeholder:text-[#686E77]/50 focus:outline-none transition-all duration-300 ${
                          focusedField === "telefoon"
                            ? "border-[#204CE5] bg-white"
                            : "border-transparent hover:border-[#204CE5]/20"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm text-[#112337] font-medium mb-3">
                      Onderwerp <span className="text-[#204CE5]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_SUBJECTS.map((subject) => (
                        <button
                          key={subject.value}
                          type="button"
                          onClick={() => setValue("onderwerp", subject.value as ContactFormData["onderwerp"])}
                          className={`px-4 py-2.5 text-sm rounded-full transition-all duration-300 ${
                            selectedSubject === subject.value
                              ? "bg-[#204CE5] text-white"
                              : "bg-[#F5F5F5] text-[#686E77] hover:bg-[#204CE5]/10 hover:text-[#204CE5]"
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
                    <label className="block text-sm text-[#112337] font-medium mb-2">
                      Bericht <span className="text-[#204CE5]">*</span>
                    </label>
                    <textarea
                      {...register("bericht")}
                      onFocus={() => setFocusedField("bericht")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Vertel ons meer over uw project of vraag..."
                      rows={5}
                      className={`w-full bg-[#F5F5F5] border-2 rounded-xl px-5 py-4 text-[#112337] placeholder:text-[#686E77]/50 focus:outline-none transition-all duration-300 resize-none ${
                        focusedField === "bericht"
                          ? "border-[#204CE5] bg-white"
                          : errors.bericht
                          ? "border-red-400"
                          : "border-transparent hover:border-[#204CE5]/20"
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
                    className={`group w-full mt-4 py-5 rounded-full text-base font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? "bg-[#686E77]/20 text-[#686E77]/50 cursor-not-allowed"
                        : "bg-[#204CE5] text-white hover:bg-[#1A3BB8] shadow-lg hover:shadow-xl"
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
      <section className="relative bg-white py-16">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#204CE5]/10 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#204CE5]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-xs text-[#686E77] uppercase tracking-wider mb-1">
                  Bedrijf
                </div>
                <div className="text-[#112337] font-semibold">{COMPANY.name}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#204CE5]/10 flex items-center justify-center shrink-0">
                <span className="text-[#204CE5] text-sm font-bold">KBO</span>
              </div>
              <div>
                <div className="text-xs text-[#686E77] uppercase tracking-wider mb-1">
                  Ondernemingsnummer
                </div>
                <div className="text-[#112337] font-semibold">{COMPANY.kbo}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#204CE5]/10 flex items-center justify-center shrink-0">
                <span className="text-[#204CE5] text-sm font-bold">BTW</span>
              </div>
              <div>
                <div className="text-xs text-[#686E77] uppercase tracking-wider mb-1">
                  BTW-nummer
                </div>
                <div className="text-[#112337] font-semibold">{COMPANY.btw}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#112337]">{STATS.yearsExperience}</div>
                <div className="text-xs text-[#686E77] uppercase tracking-wider">Jaar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#112337]">40<span className="text-[#204CE5]">+</span></div>
                <div className="text-xs text-[#686E77] uppercase tracking-wider">Vakmannen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#112337]">6</div>
                <div className="text-xs text-[#686E77] uppercase tracking-wider">Klasse</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="relative h-[350px] bg-[#F5F5F5]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#204CE5]/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-[#204CE5]" />
            </div>
            <p className="text-[#686E77] text-sm">
              {COMPANY.address.street}, {COMPANY.address.postal} {COMPANY.address.city}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${COMPANY.address.street}, ${COMPANY.address.postal} ${COMPANY.address.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-[#204CE5] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#1A3BB8] transition-colors"
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
