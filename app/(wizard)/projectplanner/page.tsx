"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Hammer,
  Landmark,
  Wrench,
  Home,
  Building,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Phone,
  RotateCcw,
  Loader2,
  Sparkles,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

// Animated counter for success screen
function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
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
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return <span ref={ref} className="tabular-nums">{count}</span>;
}

// Streamlined questions
const questions = [
  {
    id: "projectType",
    overline: "Stap 1 van 6",
    headline: "Wat wilt u\nbouwen?",
    subline: "Selecteer het type project",
    type: "cards" as const,
    options: [
      { id: "nieuwbouw", icon: Building2, label: "Nieuwbouw", desc: "Nieuw gebouw" },
      { id: "renovatie", icon: Hammer, label: "Renovatie", desc: "Bestaand pand" },
      { id: "erfgoed", icon: Landmark, label: "Erfgoed", desc: "Monument" },
      { id: "onderhoud", icon: Wrench, label: "Onderhoud", desc: "Periodiek" },
    ],
  },
  {
    id: "clientType",
    overline: "Stap 2 van 6",
    headline: "Wie bent u?",
    subline: "Dit helpt ons uw aanvraag te personaliseren",
    type: "cards" as const,
    options: [
      { id: "particulier", icon: Home, label: "Particulier", desc: "Privépersoon" },
      { id: "bedrijf", icon: Building, label: "Bedrijf", desc: "Onderneming" },
      { id: "overheid", icon: Landmark, label: "Overheid", desc: "Publieke sector" },
      { id: "ontwikkelaar", icon: Briefcase, label: "Ontwikkelaar", desc: "Vastgoed" },
    ],
  },
  {
    id: "scope",
    overline: "Stap 3 van 6",
    headline: "Budget?",
    subline: "Een indicatie volstaat",
    type: "pills" as const,
    options: [
      { id: "small", label: "< €100K" },
      { id: "medium", label: "€100K – €500K" },
      { id: "large", label: "€500K – €2M" },
      { id: "enterprise", label: "> €2M" },
      { id: "unknown", label: "Nog onbekend" },
    ],
  },
  {
    id: "timeline",
    overline: "Stap 4 van 6",
    headline: "Wanneer?",
    subline: "Wanneer wilt u starten?",
    type: "pills" as const,
    options: [
      { id: "urgent", label: "Direct" },
      { id: "soon", label: "1-3 maanden" },
      { id: "planned", label: "3-6 maanden" },
      { id: "future", label: "Later" },
    ],
  },
  {
    id: "location",
    overline: "Stap 5 van 6",
    headline: "Waar?",
    subline: "Locatie van het project",
    type: "pills" as const,
    options: [
      { id: "oost-vlaanderen", label: "Oost-Vlaanderen" },
      { id: "west-vlaanderen", label: "West-Vlaanderen" },
      { id: "antwerpen", label: "Antwerpen" },
      { id: "vlaams-brabant", label: "Vlaams-Brabant" },
      { id: "limburg", label: "Limburg" },
      { id: "brussel", label: "Brussel" },
      { id: "andere", label: "Andere" },
    ],
  },
  {
    id: "contact",
    overline: "Laatste stap",
    headline: "Uw gegevens",
    subline: "We nemen discreet contact op",
    type: "form" as const,
    options: [],
  },
];

interface FormData {
  projectType: string;
  clientType: string;
  scope: string;
  timeline: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export default function ProjectplannerPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    clientType: "",
    scope: "",
    timeline: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  // Spring animation for progress bar
  const springProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectOption = (optionId: string) => {
    updateField(currentQuestion.id as keyof FormData, optionId);
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      }
    }, 300);
  };

  const canSubmit = () => formData.name && formData.email && formData.phone;
  const prevStep = () => step > 0 && setStep(step - 1);

  const handleSubmit = async () => {
    if (!canSubmit()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const restart = () => {
    setStep(0);
    setFormData({
      projectType: "",
      clientType: "",
      scope: "",
      timeline: "",
      location: "",
      name: "",
      email: "",
      phone: "",
      company: "",
    });
    setIsComplete(false);
  };

  // Success screen
  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-[#0A0A09] overflow-hidden">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,124,0.08)_0%,_transparent_70%)]" />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Geometric accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-20 right-20 hidden lg:block"
        >
          <div className="w-40 h-40 border-t border-r border-[#C9A87C]/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-20 left-20 hidden lg:block"
        >
          <div className="w-24 h-24 border-b border-l border-[#C9A87C]/10" />
        </motion.div>

        <div className="relative h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
              className="relative w-32 h-32 mx-auto mb-16"
            >
              <div className="absolute inset-0 rounded-full border border-[#C9A87C]/20" />
              <div className="absolute inset-2 rounded-full border border-[#C9A87C]/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-[#C9A87C]/10 flex items-center justify-center"
                >
                  <Check className="w-8 h-8 text-[#C9A87C]" strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>

            {/* Overline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className="h-px w-12 bg-[#C9A87C]/30" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A87C]">
                Aanvraag verzonden
              </span>
              <span className="h-px w-12 bg-[#C9A87C]/30" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl text-white tracking-[-0.03em]"
            >
              Bedankt
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xl text-white/40 leading-relaxed max-w-md mx-auto"
            >
              We analyseren uw project en nemen binnen{" "}
              <span className="text-[#C9A87C]">48 uur</span> contact op.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 grid grid-cols-3 gap-8 py-8 border-t border-b border-white/[0.06]"
            >
              {[
                { value: 500, suffix: "+", label: "Projecten" },
                { value: 95, suffix: "%", label: "Tevredenheid" },
                { value: 48, suffix: "u", label: "Responstijd" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl sm:text-4xl text-white">
                    <AnimatedNumber value={stat.value} delay={1200 + i * 150} />
                    <span className="text-[#C9A87C]">{stat.suffix}</span>
                  </div>
                  <div className="mt-2 text-[10px] text-white/30 uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-3 bg-[#C9A87C] text-[#0A0A09] px-8 py-5 font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-[#E5D4B8]"
              >
                <span>Naar home</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center justify-center gap-3 border border-white/20 text-white/60 px-8 py-5 font-medium text-sm tracking-wide transition-all duration-500 hover:text-white hover:border-white/30"
              >
                Bekijk projecten
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0A0A09] overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,168,124,0.05)_0%,_transparent_50%)]" />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Geometric accent - top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute top-24 right-12 lg:right-24 hidden lg:block"
      >
        <div className="w-24 h-24 border-t border-r border-[#C9A87C]/10" />
      </motion.div>

      {/* Geometric accent - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-32 left-12 lg:left-24 hidden lg:block"
      >
        <div className="flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-px bg-white/20"
              style={{ width: i % 2 === 0 ? "20px" : "10px" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06] z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#C9A87C] to-[#E5D4B8]"
          style={{ width: springProgress.get() + "%" }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-4">
            <div className="w-12 h-12 bg-white/[0.05] border border-white/[0.08] flex items-center justify-center transition-all duration-500 group-hover:bg-[#C9A87C] group-hover:border-[#C9A87C]">
              <span className="font-display text-sm text-white tracking-wide group-hover:text-[#0A0A09] transition-colors">
                DR
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="hidden sm:flex items-center gap-3 text-sm text-white/30 hover:text-white/60 transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-medium tracking-wide">{COMPANY.contact.phone}</span>
            </a>
            <Link
              href="/"
              className="w-12 h-12 flex items-center justify-center text-white/30 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="absolute inset-0 flex items-center justify-center px-6 pt-28 pb-32">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Overline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <span className="h-px w-8 bg-[#C9A87C]/30" />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A87C]">
                  {currentQuestion.overline}
                </span>
                <span className="h-px w-8 bg-[#C9A87C]/30" />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] text-white tracking-[-0.03em] leading-[0.9] whitespace-pre-line"
              >
                {currentQuestion.headline}
              </motion.h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-6 text-lg text-white/30"
              >
                {currentQuestion.subline}
              </motion.p>

              {/* Options container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-16 sm:mt-20"
              >
                {/* Card grid */}
                {currentQuestion.type === "cards" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {currentQuestion.options.map((option, index) => {
                      const Icon = option.icon!;
                      const isSelected =
                        formData[currentQuestion.id as keyof FormData] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.4 + index * 0.08,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          onClick={() => selectOption(option.id)}
                          className={`group relative aspect-[4/5] flex flex-col items-center justify-center gap-4 border transition-all duration-500 ${
                            isSelected
                              ? "bg-[#C9A87C]/10 border-[#C9A87C]/40"
                              : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                          }`}
                        >
                          {/* Icon container */}
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isSelected
                                ? "bg-[#C9A87C]"
                                : "bg-white/[0.04] group-hover:bg-white/[0.08]"
                            }`}
                          >
                            <Icon
                              className={`w-7 h-7 transition-colors duration-500 ${
                                isSelected
                                  ? "text-[#0A0A09]"
                                  : "text-white/40 group-hover:text-white/60"
                              }`}
                              strokeWidth={1.5}
                            />
                          </div>

                          {/* Label */}
                          <div className="text-center">
                            <span
                              className={`block text-base font-medium transition-colors duration-500 ${
                                isSelected ? "text-white" : "text-white/70 group-hover:text-white"
                              }`}
                            >
                              {option.label}
                            </span>
                            <span className="block mt-1 text-xs text-white/25">
                              {option.desc}
                            </span>
                          </div>

                          {/* Selection indicator */}
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              className="absolute top-3 right-3 w-7 h-7 bg-[#C9A87C] rounded-full flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-[#0A0A09]" strokeWidth={2} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* Pills */}
                {currentQuestion.type === "pills" && (
                  <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected =
                        formData[currentQuestion.id as keyof FormData] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            delay: 0.4 + index * 0.05,
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          onClick={() => selectOption(option.id)}
                          className={`relative px-7 py-4 text-base font-medium border transition-all duration-500 ${
                            isSelected
                              ? "bg-[#C9A87C]/10 border-[#C9A87C]/40 text-white scale-[1.02]"
                              : "bg-white/[0.02] border-white/[0.06] text-white/60 hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-white"
                          }`}
                        >
                          {option.label}
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-[#C9A87C] rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3.5 h-3.5 text-[#0A0A09]" strokeWidth={2} />
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* Form */}
                {currentQuestion.type === "form" && (
                  <div className="max-w-md mx-auto space-y-4">
                    {[
                      { key: "name", placeholder: "Naam", type: "text", required: true },
                      { key: "email", placeholder: "E-mailadres", type: "email", required: true },
                      { key: "phone", placeholder: "Telefoonnummer", type: "tel", required: true },
                      { key: "company", placeholder: "Bedrijf (optioneel)", type: "text", required: false },
                    ].map((field, index) => (
                      <motion.div
                        key={field.key}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.4 + index * 0.1,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative"
                      >
                        <input
                          type={field.type}
                          value={formData[field.key as keyof FormData]}
                          onChange={(e) => updateField(field.key as keyof FormData, e.target.value)}
                          onFocus={() => setFocusedField(field.key)}
                          onBlur={() => setFocusedField(null)}
                          placeholder={field.placeholder}
                          className={`w-full bg-white/[0.03] border px-6 py-5 text-white text-lg placeholder:text-white/20 focus:outline-none transition-all duration-500 ${
                            focusedField === field.key
                              ? "border-[#C9A87C]/40 bg-white/[0.05]"
                              : "border-white/[0.06] hover:border-white/[0.12]"
                          }`}
                        />
                        {field.required && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A87C]/40 text-sm">
                            *
                          </span>
                        )}
                      </motion.div>
                    ))}

                    {/* Submit button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      onClick={handleSubmit}
                      disabled={!canSubmit() || isSubmitting}
                      className={`group w-full mt-8 py-5 text-base font-semibold tracking-wide transition-all duration-500 flex items-center justify-center gap-3 ${
                        canSubmit() && !isSubmitting
                          ? "bg-[#C9A87C] text-[#0A0A09] hover:bg-[#E5D4B8]"
                          : "bg-white/[0.05] text-white/20 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Even geduld...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Verstuur aanvraag
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>

                    {/* Privacy note */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="text-xs text-white/20 text-center mt-6"
                    >
                      Door te versturen gaat u akkoord met ons{" "}
                      <Link href="/privacy" className="text-white/30 hover:text-white/50 underline">
                        privacybeleid
                      </Link>
                    </motion.p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: step === 0 ? 0 : 1 }}
            onClick={prevStep}
            className={`flex items-center gap-3 text-sm font-medium transition-all duration-300 ${
              step === 0
                ? "pointer-events-none"
                : "text-white/30 hover:text-white"
            }`}
          >
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline tracking-wide">Vorige</span>
          </motion.button>

          {/* Step indicators */}
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => i < step && setStep(i)}
                disabled={i >= step}
                className={`h-1.5 transition-all duration-500 ${
                  i === step
                    ? "w-8 bg-[#C9A87C]"
                    : i < step
                    ? "w-1.5 bg-[#C9A87C]/50 hover:bg-[#C9A87C] cursor-pointer rounded-full"
                    : "w-1.5 bg-white/[0.08] rounded-full"
                }`}
              />
            ))}
          </div>

          {/* Restart button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={restart}
            className="flex items-center gap-3 text-sm font-medium text-white/30 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline tracking-wide">Opnieuw</span>
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors">
              <RotateCcw className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
