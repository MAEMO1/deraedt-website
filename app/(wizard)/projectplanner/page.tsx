"use client";

import { useState, useEffect } from "react";
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
  Mail,
  RotateCcw,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

// Question flow configuration
const questions = [
  {
    id: "projectType",
    headline: "Laten we bouwen",
    question: "Welk type project heeft u in gedachten?",
    type: "cards" as const,
    options: [
      { id: "nieuwbouw", icon: Building2, label: "Nieuwbouw", desc: "Nieuw gebouw realiseren" },
      { id: "renovatie", icon: Hammer, label: "Renovatie", desc: "Bestaand pand vernieuwen" },
      { id: "erfgoed", icon: Landmark, label: "Erfgoed", desc: "Monumentale restauratie" },
      { id: "onderhoud", icon: Wrench, label: "Onderhoud", desc: "Facility & interventies" },
    ],
  },
  {
    id: "clientType",
    headline: "Over u",
    question: "Hoe omschrijft u zichzelf het beste?",
    type: "cards" as const,
    options: [
      { id: "particulier", icon: Home, label: "Particulier", desc: "Privépersoon of gezin" },
      { id: "bedrijf", icon: Building, label: "Bedrijf", desc: "KMO of onderneming" },
      { id: "overheid", icon: Landmark, label: "Overheid", desc: "Publieke instelling" },
      { id: "ontwikkelaar", icon: Briefcase, label: "Ontwikkelaar", desc: "Projectontwikkelaar" },
    ],
  },
  {
    id: "scope",
    headline: "Projectomvang",
    question: "Wat is de geschatte omvang van uw project?",
    type: "list" as const,
    options: [
      { id: "small", label: "Kleinschalig", desc: "Tot €100.000" },
      { id: "medium", label: "Middelgroot", desc: "€100.000 – €500.000" },
      { id: "large", label: "Grootschalig", desc: "€500.000 – €2.000.000" },
      { id: "enterprise", label: "Enterprise", desc: "Meer dan €2.000.000" },
      { id: "unknown", label: "Nog onbekend", desc: "Graag advies" },
    ],
  },
  {
    id: "timeline",
    headline: "Planning",
    question: "Wanneer wilt u het project starten?",
    type: "list" as const,
    options: [
      { id: "urgent", label: "Zo snel mogelijk", desc: "Binnen 1 maand" },
      { id: "soon", label: "Binnenkort", desc: "1 – 3 maanden" },
      { id: "planned", label: "Gepland", desc: "3 – 6 maanden" },
      { id: "future", label: "Later", desc: "6+ maanden" },
    ],
  },
  {
    id: "location",
    headline: "Locatie",
    question: "In welke regio bevindt het project zich?",
    type: "regions" as const,
    options: [
      { id: "oost-vlaanderen", label: "Oost-Vlaanderen" },
      { id: "west-vlaanderen", label: "West-Vlaanderen" },
      { id: "antwerpen", label: "Antwerpen" },
      { id: "vlaams-brabant", label: "Vlaams-Brabant" },
      { id: "limburg", label: "Limburg" },
      { id: "brussel", label: "Brussel" },
      { id: "wallonie", label: "Wallonië" },
    ],
  },
  {
    id: "contact",
    headline: "Contact",
    question: "Hoe kunnen we u bereiken?",
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
  message: string;
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
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectOption = (optionId: string) => {
    updateField(currentQuestion.id as keyof FormData, optionId);
    // Auto-advance after selection with slight delay
    setTimeout(() => {
      if (step < questions.length - 1) {
        setDirection(1);
        setStep(step + 1);
      }
    }, 400);
  };

  const canProceed = () => {
    if (currentQuestion.type === "form") {
      return formData.name && formData.email && formData.phone;
    }
    return formData[currentQuestion.id as keyof FormData] !== "";
  };

  const nextStep = () => {
    if (step < questions.length - 1 && canProceed()) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
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
      message: "",
    });
    setIsComplete(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  // Success screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
        {/* Minimal header */}
        <header className="p-6 sm:p-8">
          <Link href="/" className="inline-block">
            <span className="font-display text-xl text-[#0C0C0C]">De Raedt</span>
          </Link>
        </header>

        {/* Success content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-10 rounded-full bg-[#1A5D3A]/10 flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-[#1A5D3A]" />
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl text-[#0C0C0C] tracking-[-0.02em]">
              Aanvraag ontvangen
            </h1>

            <p className="mt-6 text-lg text-[#6B6560] leading-relaxed max-w-md mx-auto">
              Bedankt, {formData.name.split(" ")[0]}. Ons team neemt binnen 48 uur contact met u op om uw {" "}
              {formData.projectType === "nieuwbouw" ? "nieuwbouwproject" :
               formData.projectType === "renovatie" ? "renovatieproject" :
               formData.projectType === "erfgoed" ? "erfgoedproject" : "project"} te bespreken.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#0C0C0C] text-white px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-[#9A6B4C]"
              >
                Terug naar home
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center justify-center gap-2 border border-[#0C0C0C]/20 text-[#0C0C0C] px-8 py-4 text-sm font-medium transition-all duration-300 hover:border-[#0C0C0C]/40"
              >
                Bekijk onze projecten
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* Progress bar - thin red line at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#0C0C0C]/5 z-50">
        <motion.div
          className="h-full bg-[#9A6B4C]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Header */}
      <header className="p-6 sm:p-8 flex items-center justify-between">
        <Link href="/" className="inline-block">
          <span className="font-display text-xl text-[#0C0C0C]">De Raedt</span>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${COMPANY.contact.phone}`}
            className="hidden sm:flex items-center gap-2 text-sm text-[#6B6560] hover:text-[#9A6B4C] transition-colors"
          >
            <Phone className="w-4 h-4" />
            {COMPANY.contact.phone}
          </a>
          <Link
            href="/"
            className="p-2 text-[#6B6560] hover:text-[#0C0C0C] transition-colors"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-center mb-12"
              >
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#0C0C0C] tracking-[-0.03em] leading-[0.9]">
                  {currentQuestion.headline}
                </h1>
                <p className="mt-6 text-xl text-[#6B6560]">
                  {currentQuestion.question}
                </p>
              </motion.div>

              {/* Card options */}
              {currentQuestion.type === "cards" && (
                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                  {currentQuestion.options.map((option, index) => {
                    const Icon = option.icon!;
                    const isSelected = formData[currentQuestion.id as keyof FormData] === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                        onClick={() => selectOption(option.id)}
                        className={`group relative p-6 sm:p-8 text-center transition-all duration-300 ${
                          isSelected
                            ? "bg-[#0C0C0C] text-white shadow-2xl scale-[1.02]"
                            : "bg-white hover:shadow-xl hover:scale-[1.01]"
                        }`}
                      >
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "bg-[#9A6B4C]"
                              : "bg-[#FAF7F2] group-hover:bg-[#9A6B4C]/10"
                          }`}
                        >
                          <Icon className={`w-7 h-7 ${isSelected ? "text-white" : "text-[#9A6B4C]"}`} />
                        </div>
                        <div className="font-display text-xl sm:text-2xl">{option.label}</div>
                        <div className={`mt-2 text-sm ${isSelected ? "text-white/60" : "text-[#6B6560]"}`}>
                          {option.desc}
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-6 h-6 bg-[#9A6B4C] rounded-full flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* List options */}
              {currentQuestion.type === "list" && (
                <div className="max-w-md mx-auto space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = formData[currentQuestion.id as keyof FormData] === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                        onClick={() => selectOption(option.id)}
                        className={`w-full p-5 flex items-center gap-4 transition-all duration-300 ${
                          isSelected
                            ? "bg-[#0C0C0C] text-white"
                            : "bg-white hover:shadow-lg"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isSelected ? "bg-[#9A6B4C]" : "bg-[#FAF7F2]"
                          }`}
                        >
                          {isSelected ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <span className="w-3 h-3 rounded-full bg-[#0C0C0C]/10" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-lg">{option.label}</div>
                          <div className={`text-sm ${isSelected ? "text-white/60" : "text-[#6B6560]"}`}>
                            {option.desc}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Region options */}
              {currentQuestion.type === "regions" && (
                <div className="max-w-lg mx-auto">
                  <div className="flex flex-wrap justify-center gap-3">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = formData[currentQuestion.id as keyof FormData] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.03, duration: 0.4 }}
                          onClick={() => selectOption(option.id)}
                          className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                            isSelected
                              ? "bg-[#0C0C0C] text-white"
                              : "bg-white text-[#0C0C0C] hover:bg-[#0C0C0C]/5"
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Contact form */}
              {currentQuestion.type === "form" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="max-w-md mx-auto"
                >
                  <div className="bg-white p-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                        Naam *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Uw volledige naam"
                        className="w-full bg-[#FAFAF8] border-0 px-4 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="uw@email.be"
                        className="w-full bg-[#FAFAF8] border-0 px-4 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                        Telefoon *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+32 xxx xx xx xx"
                        className="w-full bg-[#FAFAF8] border-0 px-4 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                        Bedrijf <span className="text-[#6B6560] font-normal">(optioneel)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        placeholder="Naam van uw organisatie"
                        className="w-full bg-[#FAFAF8] border-0 px-4 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                        Bericht <span className="text-[#6B6560] font-normal">(optioneel)</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        placeholder="Vertel ons meer over uw project..."
                        rows={3}
                        className="w-full bg-[#FAFAF8] border-0 px-4 py-4 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer navigation */}
      <footer className="p-6 sm:p-8">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={prevStep}
            disabled={step === 0}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              step === 0
                ? "text-[#6B6560]/30 cursor-not-allowed"
                : "text-[#6B6560] hover:text-[#0C0C0C]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Vorige
          </button>

          {/* Center - step indicator */}
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === step
                    ? "bg-[#9A6B4C] w-6"
                    : i < step
                    ? "bg-[#9A6B4C]"
                    : "bg-[#0C0C0C]/10"
                }`}
              />
            ))}
          </div>

          {/* Next / Submit button */}
          {step < questions.length - 1 ? (
            currentQuestion.type === "form" ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  canProceed()
                    ? "bg-[#9A6B4C] text-white hover:bg-[#7A5339]"
                    : "bg-[#0C0C0C]/10 text-[#0C0C0C]/30 cursor-not-allowed"
                }`}
              >
                Volgende
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#6B6560] hover:text-[#0C0C0C] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Opnieuw
              </button>
            )
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={`inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all duration-300 ${
                canProceed() && !isSubmitting
                  ? "bg-[#9A6B4C] text-white hover:bg-[#7A5339]"
                  : "bg-[#0C0C0C]/10 text-[#0C0C0C]/30 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verzenden...
                </>
              ) : (
                <>
                  Verstuur aanvraag
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
