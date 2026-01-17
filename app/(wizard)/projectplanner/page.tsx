"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

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
      <div className="fixed inset-0 bg-[#FAF7F2] overflow-hidden">
        <div className="absolute inset-0 grid-blueprint opacity-30" />

        <div className="relative h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-md"
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
                Aanvraag verzonden
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
              We analyseren uw project en nemen binnen{" "}
              <span className="text-[#9A6B4C] font-medium">48 uur</span> contact op.
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
              <Link
                href="/projecten"
                className="inline-flex items-center justify-center gap-3 border-2 border-[#0C0C0C]/10 text-[#0C0C0C] px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300 hover:border-[#9A6B4C] hover:text-[#9A6B4C]"
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
    <div className="fixed inset-0 bg-[#FAF7F2] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-blueprint opacity-30" />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0C0C0C]/5 z-50">
        <motion.div
          className="h-full bg-[#9A6B4C]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-4">
            <div className="w-12 h-12 bg-white border border-[#0C0C0C]/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#9A6B4C] group-hover:shadow-md">
              <span className="font-display text-sm text-[#0C0C0C] tracking-wide">
                DR
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="hidden sm:flex items-center gap-3 text-sm text-[#6B6560] hover:text-[#9A6B4C] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#0C0C0C]/10 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-medium">{COMPANY.contact.phone}</span>
            </a>
            <Link
              href="/"
              className="w-12 h-12 flex items-center justify-center text-[#6B6560] hover:text-[#0C0C0C] hover:bg-white border border-transparent hover:border-[#0C0C0C]/10 transition-all duration-300"
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
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="text-center"
            >
              {/* Overline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <span className="h-px w-8 bg-[#9A6B4C]/30" />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9A6B4C]">
                  {currentQuestion.overline}
                </span>
                <span className="h-px w-8 bg-[#9A6B4C]/30" />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#0C0C0C] tracking-[-0.02em] leading-[0.9] whitespace-pre-line"
              >
                {currentQuestion.headline}
              </motion.h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-6 text-lg text-[#6B6560]"
              >
                {currentQuestion.subline}
              </motion.p>

              {/* Options container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-14 sm:mt-20"
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
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 + index * 0.06 }}
                          onClick={() => selectOption(option.id)}
                          className={`group relative aspect-[4/5] flex flex-col items-center justify-center gap-4 border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#9A6B4C] border-[#9A6B4C] shadow-lg"
                              : "bg-white border-[#0C0C0C]/10 hover:border-[#9A6B4C]/30 hover:shadow-md"
                          }`}
                        >
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? "bg-white/20"
                                : "bg-[#9A6B4C]/5 group-hover:bg-[#9A6B4C]/10"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300 ${
                                isSelected ? "text-white" : "text-[#9A6B4C]"
                              }`}
                              strokeWidth={1.5}
                            />
                          </div>
                          <div className="text-center">
                            <span
                              className={`block text-base font-medium transition-colors duration-300 ${
                                isSelected ? "text-white" : "text-[#0C0C0C]"
                              }`}
                            >
                              {option.label}
                            </span>
                            <span
                              className={`block mt-1 text-xs transition-colors duration-300 ${
                                isSelected ? "text-white/70" : "text-[#6B6560]"
                              }`}
                            >
                              {option.desc}
                            </span>
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                              className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3.5 h-3.5 text-[#9A6B4C]" strokeWidth={2} />
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
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + index * 0.04 }}
                          onClick={() => selectOption(option.id)}
                          className={`relative px-7 py-4 text-base font-medium border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#9A6B4C] border-[#9A6B4C] text-white shadow-lg"
                              : "bg-white border-[#0C0C0C]/10 text-[#0C0C0C] hover:border-[#9A6B4C]/30 hover:shadow-md"
                          }`}
                        >
                          {option.label}
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"
                            >
                              <Check className="w-3 h-3 text-[#9A6B4C]" strokeWidth={2} />
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + index * 0.08 }}
                        className="relative"
                      >
                        <input
                          type={field.type}
                          value={formData[field.key as keyof FormData]}
                          onChange={(e) => updateField(field.key as keyof FormData, e.target.value)}
                          onFocus={() => setFocusedField(field.key)}
                          onBlur={() => setFocusedField(null)}
                          placeholder={field.placeholder}
                          className={`w-full bg-white border px-6 py-5 text-[#0C0C0C] text-center text-lg placeholder:text-[#6B6560]/40 focus:outline-none transition-all duration-300 ${
                            focusedField === field.key
                              ? "border-[#9A6B4C] shadow-md"
                              : "border-[#0C0C0C]/10 hover:border-[#0C0C0C]/20"
                          }`}
                        />
                        {field.required && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A6B4C]/50 text-sm">
                            *
                          </span>
                        )}
                      </motion.div>
                    ))}

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      onClick={handleSubmit}
                      disabled={!canSubmit() || isSubmitting}
                      className={`group w-full mt-8 py-5 text-base font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
                        canSubmit() && !isSubmitting
                          ? "bg-[#9A6B4C] text-white hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/15"
                          : "bg-[#0C0C0C]/10 text-[#6B6560]/50 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Even geduld...
                        </>
                      ) : (
                        <>
                          Verstuur aanvraag
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-xs text-[#6B6560]/60 text-center mt-6"
                    >
                      Door te versturen gaat u akkoord met ons{" "}
                      <Link href="/privacy" className="text-[#9A6B4C] hover:underline">
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
          <button
            onClick={prevStep}
            className={`flex items-center gap-3 text-sm font-medium transition-all duration-300 ${
              step === 0
                ? "opacity-0 pointer-events-none"
                : "text-[#6B6560] hover:text-[#0C0C0C]"
            }`}
          >
            <div className="w-10 h-10 bg-white border border-[#0C0C0C]/10 flex items-center justify-center hover:border-[#9A6B4C]/30 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">Vorige</span>
          </button>

          {/* Step indicators */}
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => i < step && setStep(i)}
                disabled={i >= step}
                className={`h-2 transition-all duration-300 ${
                  i === step
                    ? "w-8 bg-[#9A6B4C]"
                    : i < step
                    ? "w-2 bg-[#9A6B4C]/40 hover:bg-[#9A6B4C] cursor-pointer rounded-full"
                    : "w-2 bg-[#0C0C0C]/10 rounded-full"
                }`}
              />
            ))}
          </div>

          {/* Restart button */}
          <button
            onClick={restart}
            className="flex items-center gap-3 text-sm font-medium text-[#6B6560] hover:text-[#0C0C0C] transition-colors"
          >
            <span className="hidden sm:inline">Opnieuw</span>
            <div className="w-10 h-10 bg-white border border-[#0C0C0C]/10 flex items-center justify-center hover:border-[#9A6B4C]/30 transition-colors">
              <RotateCcw className="w-4 h-4" />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
