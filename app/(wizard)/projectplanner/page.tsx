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
    overline: "Stap 1",
    headline: "Wat wilt u\nbouwen?",
    type: "cards" as const,
    options: [
      { id: "nieuwbouw", icon: Building2, label: "Nieuwbouw" },
      { id: "renovatie", icon: Hammer, label: "Renovatie" },
      { id: "erfgoed", icon: Landmark, label: "Erfgoed" },
      { id: "onderhoud", icon: Wrench, label: "Onderhoud" },
    ],
  },
  {
    id: "clientType",
    overline: "Stap 2",
    headline: "Wie bent u?",
    type: "cards" as const,
    options: [
      { id: "particulier", icon: Home, label: "Particulier" },
      { id: "bedrijf", icon: Building, label: "Bedrijf" },
      { id: "overheid", icon: Landmark, label: "Overheid" },
      { id: "ontwikkelaar", icon: Briefcase, label: "Ontwikkelaar" },
    ],
  },
  {
    id: "scope",
    overline: "Stap 3",
    headline: "Budget?",
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
    overline: "Stap 4",
    headline: "Wanneer?",
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
    overline: "Stap 5",
    headline: "Waar?",
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

  const currentQuestion = questions[step];
  const progress = (step / (questions.length - 1)) * 100;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectOption = (optionId: string) => {
    updateField(currentQuestion.id as keyof FormData, optionId);
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      }
    }, 250);
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

  // Success screen - dramatic dark
  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-[#0C0C0C] overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C0C0C] via-[#0C0C0C] to-[#1a1815]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 15 }}
              className="w-24 h-24 mx-auto mb-12 rounded-full border border-[#9A6B4C]/30 flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-[#9A6B4C]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-[-0.03em]"
            >
              Bedankt
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-lg text-white/40"
            >
              We nemen binnen 48 uur contact op.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-3 bg-white text-[#0C0C0C] px-8 py-4 font-medium transition-all duration-300 hover:bg-[#9A6B4C] hover:text-white"
              >
                <span>Naar home</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 px-8 py-4 font-medium transition-all duration-300 hover:text-white hover:border-white/40"
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
    <div className="fixed inset-0 bg-[#F8F7F4] overflow-hidden">
      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #0C0C0C,
            #0C0C0C 1px,
            transparent 1px,
            transparent 40px
          )`
        }}
      />

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
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-11 h-11 bg-[#0C0C0C] flex items-center justify-center transition-colors group-hover:bg-[#9A6B4C]">
              <span className="text-white font-display text-sm tracking-wide">DR</span>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="hidden sm:flex items-center gap-2 text-sm text-[#0C0C0C]/40 hover:text-[#0C0C0C] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{COMPANY.contact.phone}</span>
            </a>
            <Link
              href="/"
              className="w-11 h-11 flex items-center justify-center text-[#0C0C0C]/30 hover:text-[#0C0C0C] hover:bg-[#0C0C0C]/5 transition-all"
            >
              <X className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="absolute inset-0 flex items-center justify-center px-6 pt-20 pb-24">
        <div className="w-full max-w-3xl">
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
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-[#9A6B4C] mb-6"
              >
                {currentQuestion.overline}
              </motion.span>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-[#0C0C0C] tracking-[-0.04em] leading-[0.85] whitespace-pre-line"
              >
                {currentQuestion.headline}
              </motion.h1>

              {/* Options container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-14 sm:mt-20"
              >
                {/* Card grid - 4 columns */}
                {currentQuestion.type === "cards" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {currentQuestion.options.map((option, index) => {
                      const Icon = option.icon!;
                      const isSelected = formData[currentQuestion.id as keyof FormData] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 + index * 0.06 }}
                          onClick={() => selectOption(option.id)}
                          className={`group relative aspect-[4/5] flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
                            isSelected
                              ? "bg-[#0C0C0C] scale-[1.02]"
                              : "bg-white hover:bg-[#0C0C0C]"
                          }`}
                        >
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? "bg-[#9A6B4C]"
                                : "bg-[#F8F7F4] group-hover:bg-[#9A6B4C]"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300 ${
                                isSelected ? "text-white" : "text-[#0C0C0C]/50 group-hover:text-white"
                              }`}
                              strokeWidth={1.5}
                            />
                          </div>
                          <span
                            className={`text-base sm:text-lg font-medium transition-colors duration-300 ${
                              isSelected ? "text-white" : "text-[#0C0C0C] group-hover:text-white"
                            }`}
                          >
                            {option.label}
                          </span>

                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                              className="absolute top-4 right-4 w-6 h-6 bg-[#9A6B4C] rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* Pills */}
                {currentQuestion.type === "pills" && (
                  <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = formData[currentQuestion.id as keyof FormData] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + index * 0.04 }}
                          onClick={() => selectOption(option.id)}
                          className={`relative px-7 py-4 text-base font-medium transition-all duration-300 ${
                            isSelected
                              ? "bg-[#0C0C0C] text-white scale-105"
                              : "bg-white text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white"
                          }`}
                        >
                          {option.label}
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#9A6B4C] rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* Form */}
                {currentQuestion.type === "form" && (
                  <div className="max-w-sm mx-auto space-y-4">
                    {[
                      { key: "name", placeholder: "Naam *", type: "text" },
                      { key: "email", placeholder: "E-mail *", type: "email" },
                      { key: "phone", placeholder: "Telefoon *", type: "tel" },
                      { key: "company", placeholder: "Bedrijf (optioneel)", type: "text" },
                    ].map((field, index) => (
                      <motion.input
                        key={field.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + index * 0.08 }}
                        type={field.type}
                        value={formData[field.key as keyof FormData]}
                        onChange={(e) => updateField(field.key as keyof FormData, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full bg-white px-6 py-5 text-[#0C0C0C] text-center text-lg placeholder:text-[#0C0C0C]/25 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]/30 transition-all"
                      />
                    ))}

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      onClick={handleSubmit}
                      disabled={!canSubmit() || isSubmitting}
                      className={`w-full mt-8 py-5 text-base font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
                        canSubmit() && !isSubmitting
                          ? "bg-[#9A6B4C] text-white hover:bg-[#7A5339]"
                          : "bg-[#0C0C0C]/10 text-[#0C0C0C]/25 cursor-not-allowed"
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
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {/* Back */}
          <button
            onClick={prevStep}
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              step === 0 ? "opacity-0 pointer-events-none" : "text-[#0C0C0C]/40 hover:text-[#0C0C0C]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Vorige</span>
          </button>

          {/* Dots */}
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
                    ? "w-2 bg-[#9A6B4C]/60 hover:bg-[#9A6B4C] cursor-pointer rounded-full"
                    : "w-2 bg-[#0C0C0C]/10 rounded-full"
                }`}
              />
            ))}
          </div>

          {/* Restart */}
          <button
            onClick={restart}
            className="flex items-center gap-2 text-sm font-medium text-[#0C0C0C]/40 hover:text-[#0C0C0C] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Opnieuw</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
