"use client";

import { useState, useRef } from "react";
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
import { COMPANY, CONTACT_SUBJECTS } from "@/lib/constants";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { toast } from "sonner";

// Animated stat component
function AnimatedStat({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useState(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl text-white">
        {count}
        <span className="text-[#C9A87C]">{suffix}</span>
      </div>
      <div className="mt-1 text-[10px] text-white/30 uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
      <div className="min-h-screen bg-[#0A0A09] flex items-center justify-center px-6">
        {/* Film grain */}
        <div
          className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg relative z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 12 }}
            className="w-24 h-24 mx-auto mb-12 rounded-full border border-[#C9A87C]/20 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#C9A87C]/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-[#C9A87C]" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="h-px w-12 bg-[#C9A87C]/30" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A87C]">
              Bericht verzonden
            </span>
            <span className="h-px w-12 bg-[#C9A87C]/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display text-5xl sm:text-6xl text-white tracking-[-0.03em]"
          >
            Bedankt
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-lg text-white/40"
          >
            Wij nemen binnen <span className="text-[#C9A87C]">24 uur</span> contact met u op.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 bg-[#C9A87C] text-[#0A0A09] px-8 py-4 font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-[#E5D4B8]"
            >
              <span>Naar home</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={() => setIsSuccess(false)}
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white/60 px-8 py-4 font-medium text-sm tracking-wide transition-all duration-500 hover:text-white hover:border-white/30"
            >
              Nieuw bericht
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A09]">
      {/* Film grain texture */}
      <div
        className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Geometric accent - top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="fixed top-32 right-12 lg:right-24 hidden lg:block z-0"
      >
        <div className="w-32 h-32 border-t border-r border-[#C9A87C]/10" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Overline */}
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-[#C9A87C]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A87C]">
                  Contact
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-[-0.03em] leading-[0.95]">
                Laten we
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A87C] via-[#E5D4B8] to-[#C9A87C]">
                  praten
                </span>
              </h1>

              <p className="mt-8 text-lg text-white/40 leading-relaxed max-w-md">
                Heeft u een vraag of wilt u een vrijblijvende offerte?
                Wij reageren binnen 24 uur.
              </p>

              {/* Contact cards */}
              <div className="mt-12 space-y-4">
                <motion.a
                  href={`tel:${COMPANY.contact.phone}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group flex items-center gap-5 p-5 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-full bg-[#C9A87C]/10 flex items-center justify-center group-hover:bg-[#C9A87C]/20 transition-colors">
                    <Phone className="w-6 h-6 text-[#C9A87C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                      Telefoon
                    </div>
                    <div className="text-lg text-white font-medium">
                      {COMPANY.contact.phone}
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href={`mailto:${COMPANY.contact.email}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group flex items-center gap-5 p-5 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-full bg-[#C9A87C]/10 flex items-center justify-center group-hover:bg-[#C9A87C]/20 transition-colors">
                    <Mail className="w-6 h-6 text-[#C9A87C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                      Email
                    </div>
                    <div className="text-lg text-white font-medium">
                      {COMPANY.contact.email}
                    </div>
                  </div>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-5 p-5 bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="w-14 h-14 rounded-full bg-[#C9A87C]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#C9A87C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                      Adres
                    </div>
                    <div className="text-white font-medium">
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
                className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-[#C9A87C]/5 border border-[#C9A87C]/20"
              >
                <Clock className="w-4 h-4 text-[#C9A87C]" />
                <span className="text-sm text-white/60">
                  Gemiddelde responstijd: <span className="text-[#C9A87C] font-medium">4 uur</span>
                </span>
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative bg-white/[0.02] border border-white/[0.06] p-8 lg:p-10"
              >
                {/* Form header */}
                <div className="mb-10">
                  <h2 className="font-display text-2xl text-white">
                    Stuur een bericht
                  </h2>
                  <p className="mt-2 text-sm text-white/30">
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
                      <label className="block text-[11px] text-white/40 uppercase tracking-[0.15em] mb-3">
                        Naam <span className="text-[#C9A87C]">*</span>
                      </label>
                      <input
                        {...register("naam")}
                        onFocus={() => setFocusedField("naam")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Uw naam"
                        className={`w-full bg-white/[0.03] border px-5 py-4 text-white placeholder:text-white/20 focus:outline-none transition-all duration-500 ${
                          focusedField === "naam"
                            ? "border-[#C9A87C]/40 bg-white/[0.05]"
                            : errors.naam
                            ? "border-red-500/50"
                            : "border-white/[0.06] hover:border-white/[0.12]"
                        }`}
                      />
                      {errors.naam && (
                        <p className="mt-2 text-xs text-red-400">{errors.naam.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-white/40 uppercase tracking-[0.15em] mb-3">
                        Organisatie
                      </label>
                      <input
                        {...register("organisatie")}
                        onFocus={() => setFocusedField("organisatie")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Bedrijf of instelling"
                        className={`w-full bg-white/[0.03] border px-5 py-4 text-white placeholder:text-white/20 focus:outline-none transition-all duration-500 ${
                          focusedField === "organisatie"
                            ? "border-[#C9A87C]/40 bg-white/[0.05]"
                            : "border-white/[0.06] hover:border-white/[0.12]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] text-white/40 uppercase tracking-[0.15em] mb-3">
                        Email <span className="text-[#C9A87C]">*</span>
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="uw@email.be"
                        className={`w-full bg-white/[0.03] border px-5 py-4 text-white placeholder:text-white/20 focus:outline-none transition-all duration-500 ${
                          focusedField === "email"
                            ? "border-[#C9A87C]/40 bg-white/[0.05]"
                            : errors.email
                            ? "border-red-500/50"
                            : "border-white/[0.06] hover:border-white/[0.12]"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-white/40 uppercase tracking-[0.15em] mb-3">
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        {...register("telefoon")}
                        onFocus={() => setFocusedField("telefoon")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+32 ..."
                        className={`w-full bg-white/[0.03] border px-5 py-4 text-white placeholder:text-white/20 focus:outline-none transition-all duration-500 ${
                          focusedField === "telefoon"
                            ? "border-[#C9A87C]/40 bg-white/[0.05]"
                            : "border-white/[0.06] hover:border-white/[0.12]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[11px] text-white/40 uppercase tracking-[0.15em] mb-3">
                      Onderwerp <span className="text-[#C9A87C]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_SUBJECTS.map((subject) => (
                        <button
                          key={subject.value}
                          type="button"
                          onClick={() => setValue("onderwerp", subject.value as ContactFormData["onderwerp"])}
                          className={`px-4 py-2.5 text-sm border transition-all duration-300 ${
                            selectedSubject === subject.value
                              ? "bg-[#C9A87C]/10 border-[#C9A87C]/40 text-white"
                              : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:border-white/[0.12] hover:text-white/70"
                          }`}
                        >
                          {subject.label}
                        </button>
                      ))}
                    </div>
                    {errors.onderwerp && (
                      <p className="mt-2 text-xs text-red-400">{errors.onderwerp.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] text-white/40 uppercase tracking-[0.15em] mb-3">
                      Bericht <span className="text-[#C9A87C]">*</span>
                    </label>
                    <textarea
                      {...register("bericht")}
                      onFocus={() => setFocusedField("bericht")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Vertel ons meer over uw project of vraag..."
                      rows={5}
                      className={`w-full bg-white/[0.03] border px-5 py-4 text-white placeholder:text-white/20 focus:outline-none transition-all duration-500 resize-none ${
                        focusedField === "bericht"
                          ? "border-[#C9A87C]/40 bg-white/[0.05]"
                          : errors.bericht
                          ? "border-red-500/50"
                          : "border-white/[0.06] hover:border-white/[0.12]"
                      }`}
                    />
                    {errors.bericht && (
                      <p className="mt-2 text-xs text-red-400">{errors.bericht.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group w-full mt-4 py-5 text-base font-semibold tracking-wide transition-all duration-500 flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? "bg-white/[0.05] text-white/20 cursor-not-allowed"
                        : "bg-[#C9A87C] text-[#0A0A09] hover:bg-[#E5D4B8]"
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
      <section className="relative border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#C9A87C]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                  Bedrijf
                </div>
                <div className="text-white font-medium">{COMPANY.name}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                <span className="text-[#C9A87C] text-sm font-medium">KBO</span>
              </div>
              <div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                  Ondernemingsnummer
                </div>
                <div className="text-white font-medium">{COMPANY.kbo}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                <span className="text-[#C9A87C] text-sm font-medium">BTW</span>
              </div>
              <div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                  BTW-nummer
                </div>
                <div className="text-white font-medium">{COMPANY.btw}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid grid-cols-3 gap-4">
                <AnimatedStat value={95} suffix="+" label="Jaar" />
                <AnimatedStat value={500} suffix="+" label="Projecten" />
                <AnimatedStat value={6} label="Klasse" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="relative h-[400px] border-t border-white/[0.06] bg-white/[0.01]">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <MapPin className="w-8 h-8 text-[#C9A87C]/40 mx-auto mb-4" />
            <p className="text-white/30 text-sm">
              {COMPANY.address.street}, {COMPANY.address.postal} {COMPANY.address.city}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${COMPANY.address.street}, ${COMPANY.address.postal} ${COMPANY.address.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#C9A87C] text-sm hover:text-[#E5D4B8] transition-colors"
            >
              Open in Google Maps
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
