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
  Check,
  X,
  Phone,
  Loader2,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

// Streamlined questions
const questions = [
  {
    id: "projectType",
    headline: "Wat wilt u bouwen?",
    type: "icons" as const,
    options: [
      { id: "nieuwbouw", icon: Building2, label: "Nieuwbouw" },
      { id: "renovatie", icon: Hammer, label: "Renovatie" },
      { id: "erfgoed", icon: Landmark, label: "Erfgoed" },
      { id: "onderhoud", icon: Wrench, label: "Onderhoud" },
    ],
  },
  {
    id: "clientType",
    headline: "Wie bent u?",
    type: "icons" as const,
    options: [
      { id: "particulier", icon: Home, label: "Particulier" },
      { id: "bedrijf", icon: Building, label: "Bedrijf" },
      { id: "overheid", icon: Landmark, label: "Overheid" },
      { id: "ontwikkelaar", icon: Briefcase, label: "Ontwikkelaar" },
    ],
  },
  {
    id: "scope",
    headline: "Wat is uw budget?",
    type: "options" as const,
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
    headline: "Wanneer wilt u starten?",
    type: "options" as const,
    options: [
      { id: "urgent", label: "Direct" },
      { id: "soon", label: "1-3 maanden" },
      { id: "planned", label: "3-6 maanden" },
      { id: "future", label: "Later" },
    ],
  },
  {
    id: "location",
    headline: "Waar is het project?",
    type: "options" as const,
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
    headline: "Uw contactgegevens",
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
  const progress = ((step + 1) / questions.length) * 100;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectOption = (optionId: string) => {
    updateField(currentQuestion.id as keyof FormData, optionId);
  };

  const canProceed = () => {
    const currentValue = formData[currentQuestion.id as keyof FormData];
    if (currentQuestion.type === "form") {
      return formData.name && formData.email && formData.phone;
    }
    return !!currentValue;
  };

  const nextStep = () => {
    if (canProceed() && step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
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
      <div className="fixed inset-0 bg-[#F5F5F5] overflow-hidden">
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
              className="w-20 h-20 mx-auto mb-10 rounded-full bg-[#204CE5]/10 flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-[#204CE5]" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              Aanvraag verzonden
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
              We analyseren uw project en nemen binnen{" "}
              <span className="text-[#204CE5] font-medium">48 uur</span> contact op.
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
              <Link
                href="/projecten"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#112337] px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#112337]/5"
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
    <div className="fixed inset-0 bg-white overflow-hidden">
      {/* Progress bar - McCownGordon style */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="h-1.5 bg-[#112337]/5">
          <motion.div
            className="h-full bg-[#204CE5]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 p-6 sm:p-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="group flex items-center gap-4">
            <span className="text-xl font-bold text-[#112337] tracking-tight">
              DE RAEDT
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#204CE5] hover:text-[#1A3BB8] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{COMPANY.contact.phone}</span>
            </a>
            <Link
              href="/"
              className="text-sm font-medium text-[#686E77] hover:text-[#112337] transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content - McCownGordon style centered layout */}
      <main className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-center"
            >
              {/* Title - McCownGordon style large italic serif */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] mb-4"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                Laten we bouwen
              </motion.h1>

              {/* Question */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl text-[#112337] mb-16"
              >
                {currentQuestion.headline}
              </motion.p>

              {/* Options - McCownGordon circular icon style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Icon buttons - like McCownGordon Yes/No */}
                {currentQuestion.type === "icons" && (
                  <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                    {currentQuestion.options.map((option, index) => {
                      const Icon = option.icon!;
                      const isSelected =
                        formData[currentQuestion.id as keyof FormData] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + index * 0.05 }}
                          onClick={() => selectOption(option.id)}
                          className="flex flex-col items-center gap-4 group"
                        >
                          <div
                            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? "border-[#204CE5] bg-[#204CE5]/5"
                                : "border-[#112337]/20 hover:border-[#204CE5]/50 bg-transparent"
                            }`}
                          >
                            <Icon
                              className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300 ${
                                isSelected ? "text-[#204CE5]" : "text-[#112337]/40 group-hover:text-[#204CE5]/60"
                              }`}
                              strokeWidth={1.5}
                            />
                          </div>
                          <span
                            className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                              isSelected ? "text-[#112337]" : "text-[#686E77]"
                            }`}
                          >
                            {option.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* Text options - clean list style */}
                {currentQuestion.type === "options" && (
                  <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected =
                        formData[currentQuestion.id as keyof FormData] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 + index * 0.03 }}
                          onClick={() => selectOption(option.id)}
                          className={`px-6 py-3 text-base rounded-full border-2 transition-all duration-300 ${
                            isSelected
                              ? "border-[#204CE5] bg-[#204CE5]/5 text-[#204CE5] font-medium"
                              : "border-[#112337]/10 text-[#686E77] hover:border-[#204CE5]/30 hover:text-[#112337]"
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* Form */}
                {currentQuestion.type === "form" && (
                  <div className="max-w-md mx-auto space-y-4">
                    {[
                      { key: "name", placeholder: "Naam *", type: "text" },
                      { key: "email", placeholder: "E-mailadres *", type: "email" },
                      { key: "phone", placeholder: "Telefoonnummer *", type: "tel" },
                      { key: "company", placeholder: "Bedrijf (optioneel)", type: "text" },
                    ].map((field, index) => (
                      <motion.input
                        key={field.key}
                        type={field.type}
                        value={formData[field.key as keyof FormData]}
                        onChange={(e) => updateField(field.key as keyof FormData, e.target.value)}
                        placeholder={field.placeholder}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + index * 0.05 }}
                        className="w-full bg-white border-2 border-[#112337]/10 rounded-lg px-5 py-4 text-[#112337] placeholder:text-[#686E77]/50 focus:outline-none focus:border-[#204CE5] transition-colors"
                      />
                    ))}

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xs text-[#686E77]/60 text-center pt-4"
                    >
                      Door te versturen gaat u akkoord met ons{" "}
                      <Link href="/privacy" className="text-[#204CE5] hover:underline">
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

      {/* Footer - McCownGordon style with centered Next button */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 p-6 sm:p-8">
        <div className="flex items-center justify-center gap-8 max-w-4xl mx-auto">
          {/* Next / Submit button - McCownGordon red style */}
          {currentQuestion.type === "form" ? (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={`px-12 py-4 text-base font-semibold rounded transition-all duration-300 ${
                canProceed() && !isSubmitting
                  ? "bg-[#204CE5] text-white hover:bg-[#1A3BB8]"
                  : "bg-[#112337]/10 text-[#686E77]/50 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Even geduld...
                </span>
              ) : (
                "Versturen"
              )}
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-12 py-4 text-base font-semibold rounded transition-all duration-300 ${
                canProceed()
                  ? "bg-[#204CE5] text-white hover:bg-[#1A3BB8]"
                  : "bg-[#112337]/10 text-[#686E77]/50 cursor-not-allowed"
              }`}
            >
              Volgende
            </motion.button>
          )}
        </div>

        {/* Start over link - right aligned like McCownGordon */}
        <div className="absolute right-6 sm:right-8 bottom-6 sm:bottom-8">
          <button
            onClick={restart}
            className="text-sm font-medium text-[#686E77] hover:text-[#112337] uppercase tracking-wider transition-colors"
          >
            Opnieuw
          </button>
        </div>
      </footer>
    </div>
  );
}
