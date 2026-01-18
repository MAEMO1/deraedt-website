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
    await new Promise((resolve) => setTimeout(resolve, 1500));
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

  // Success screen - minimal animation
  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-[#F5F5F5] overflow-hidden">
        <div className="relative h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 mx-auto mb-10 rounded-full bg-[#204CE5]/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-[#204CE5]" strokeWidth={1.5} />
            </div>

            <div className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Aanvraag verzonden
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-[#112337]">
              Bedankt
            </h1>

            <p className="mt-6 text-lg text-[#686E77]">
              We analyseren uw project en nemen binnen{" "}
              <span className="text-[#204CE5] font-medium">48 uur</span> contact op.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8]"
              >
                <span>Naar home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#112337] px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#112337]/5"
              >
                Bekijk projecten
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      {/* Progress bar - subtle like McCownGordon */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="h-1 bg-[#112337]/5">
          <motion.div
            className="h-full bg-[#204CE5]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 p-6 sm:p-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="text-xl font-bold text-[#112337] tracking-tight">
            DE RAEDT
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
              className="text-[#686E77] hover:text-[#112337] transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              {/* Title */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] mb-4"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                Laten we bouwen
              </h1>

              {/* Question */}
              <p className="text-xl sm:text-2xl text-[#112337] mb-16">
                {currentQuestion.headline}
              </p>

              {/* Icon buttons */}
              {currentQuestion.type === "icons" && (
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                  {currentQuestion.options.map((option) => {
                    const Icon = option.icon!;
                    const isSelected =
                      formData[currentQuestion.id as keyof FormData] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => selectOption(option.id)}
                        className="flex flex-col items-center gap-4 group"
                      >
                        <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            isSelected
                              ? "border-[#204CE5] bg-[#204CE5]/5"
                              : "border-[#112337]/20 hover:border-[#204CE5]/50"
                          }`}
                        >
                          <Icon
                            className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-200 ${
                              isSelected ? "text-[#204CE5]" : "text-[#112337]/40 group-hover:text-[#204CE5]/60"
                            }`}
                            strokeWidth={1.5}
                          />
                        </div>
                        <span
                          className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                            isSelected ? "text-[#112337]" : "text-[#686E77]"
                          }`}
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Text options */}
              {currentQuestion.type === "options" && (
                <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
                  {currentQuestion.options.map((option) => {
                    const isSelected =
                      formData[currentQuestion.id as keyof FormData] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => selectOption(option.id)}
                        className={`px-6 py-3 text-base rounded-full border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-[#204CE5] bg-[#204CE5]/5 text-[#204CE5] font-medium"
                            : "border-[#112337]/10 text-[#686E77] hover:border-[#204CE5]/30 hover:text-[#112337]"
                        }`}
                      >
                        {option.label}
                      </button>
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
                  ].map((field) => (
                    <input
                      key={field.key}
                      type={field.type}
                      value={formData[field.key as keyof FormData]}
                      onChange={(e) => updateField(field.key as keyof FormData, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white border-2 border-[#112337]/10 rounded-lg px-5 py-4 text-[#112337] placeholder:text-[#686E77]/50 focus:outline-none focus:border-[#204CE5] transition-colors"
                    />
                  ))}

                  <p className="text-xs text-[#686E77]/60 text-center pt-4">
                    Door te versturen gaat u akkoord met ons{" "}
                    <Link href="/privacy" className="text-[#204CE5] hover:underline">
                      privacybeleid
                    </Link>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 p-6 sm:p-8">
        <div className="flex items-center justify-center max-w-4xl mx-auto">
          {currentQuestion.type === "form" ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={`px-12 py-4 text-base font-semibold rounded transition-all duration-200 ${
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
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-12 py-4 text-base font-semibold rounded transition-all duration-200 ${
                canProceed()
                  ? "bg-[#204CE5] text-white hover:bg-[#1A3BB8]"
                  : "bg-[#112337]/10 text-[#686E77]/50 cursor-not-allowed"
              }`}
            >
              Volgende
            </button>
          )}
        </div>

        {/* Start over */}
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
