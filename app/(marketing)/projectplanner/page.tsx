"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Hammer,
  Landmark,
  Wrench,
  Users,
  Building,
  Home,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

// Step definitions
const steps = [
  { id: 1, title: "Project Type", description: "Wat voor project heeft u?" },
  { id: 2, title: "Klanttype", description: "Wie bent u?" },
  { id: 3, title: "Details", description: "Vertel ons meer" },
  { id: 4, title: "Planning", description: "Wanneer wilt u starten?" },
  { id: 5, title: "Locatie", description: "Waar bevindt het project zich?" },
  { id: 6, title: "Contact", description: "Hoe bereiken we u?" },
  { id: 7, title: "Overzicht", description: "Controleer uw aanvraag" },
];

const projectTypes = [
  {
    id: "nieuwbouw",
    icon: Building2,
    title: "Nieuwbouw",
    description: "Nieuwe gebouwen van fundament tot afwerking",
  },
  {
    id: "renovatie",
    icon: Hammer,
    title: "Renovatie",
    description: "Grondige renovatie van bestaande panden",
  },
  {
    id: "erfgoed",
    icon: Landmark,
    title: "Erfgoedrenovatie",
    description: "Restauratie van historische gebouwen",
  },
  {
    id: "facility",
    icon: Wrench,
    title: "Facility Management",
    description: "Onderhoud en beheer van gebouwen",
  },
];

const clientTypes = [
  {
    id: "particulier",
    icon: Home,
    title: "Particulier",
    description: "Privépersoon of gezin",
  },
  {
    id: "bedrijf",
    icon: Building,
    title: "Bedrijf",
    description: "KMO of grote onderneming",
  },
  {
    id: "overheid",
    icon: Landmark,
    title: "Overheid",
    description: "Gemeente, stad of rijksoverheid",
  },
  {
    id: "ontwikkelaar",
    icon: Briefcase,
    title: "Ontwikkelaar",
    description: "Projectontwikkelaar of investeerder",
  },
];

const budgetRanges = [
  { id: "small", label: "< €100.000", description: "Klein project" },
  { id: "medium", label: "€100.000 - €500.000", description: "Middelgroot project" },
  { id: "large", label: "€500.000 - €2.000.000", description: "Groot project" },
  { id: "enterprise", label: "> €2.000.000", description: "Groot commercieel project" },
  { id: "unknown", label: "Nog niet bepaald", description: "Graag advies ontvangen" },
];

const timelines = [
  { id: "asap", label: "Zo snel mogelijk", description: "Start binnen 1 maand" },
  { id: "short", label: "1-3 maanden", description: "Binnenkort starten" },
  { id: "medium", label: "3-6 maanden", description: "Na de voorbereidingen" },
  { id: "long", label: "6-12 maanden", description: "Ruime planning" },
  { id: "future", label: "> 12 maanden", description: "Voor de toekomst" },
];

const provinces = [
  "Antwerpen",
  "Limburg",
  "Oost-Vlaanderen",
  "Vlaams-Brabant",
  "West-Vlaanderen",
  "Brussel",
  "Waals-Brabant",
  "Henegouwen",
  "Luik",
  "Luxemburg",
  "Namen",
];

interface FormData {
  projectType: string;
  clientType: string;
  budget: string;
  description: string;
  timeline: string;
  city: string;
  province: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function ProjectplannerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    clientType: "",
    budget: "",
    description: "",
    timeline: "",
    city: "",
    province: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType !== "";
      case 2:
        return formData.clientType !== "";
      case 3:
        return formData.budget !== "";
      case 4:
        return formData.timeline !== "";
      case 5:
        return formData.city !== "" && formData.province !== "";
      case 6:
        return formData.name !== "" && formData.email !== "" && formData.phone !== "";
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 7 && canProceed()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getSelectedLabel = (id: string, options: { id: string; label?: string; title?: string }[]) => {
    const option = options.find((o) => o.id === id);
    return option?.label || option?.title || id;
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen bg-[#FAF7F2] flex items-center justify-center relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white p-12 sm:p-16 max-w-xl mx-4 text-center"
        >
          <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#0C0C0C]">
            Aanvraag ontvangen!
          </h1>
          <p className="mt-6 text-[#6B6560] leading-relaxed">
            Bedankt voor uw aanvraag, {formData.name.split(" ")[0]}. Ons team neemt binnen
            48 uur contact met u op om uw project te bespreken.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#0C0C0C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#9A6B4C]"
            >
              Terug naar home
            </Link>
            <Link
              href="/projecten"
              className="inline-flex items-center justify-center gap-2 border border-[#0C0C0C]/20 text-[#0C0C0C] px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-[#0C0C0C] hover:text-white"
            >
              Bekijk projecten
            </Link>
          </div>

          {/* Corner accents */}
          <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#9A6B4C]/30" />
          <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#9A6B4C]/30" />
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0C0C0C] pt-32 pb-16">
        <div className="absolute inset-0 texture-stone opacity-30" />
        <div className="container-wide relative">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-[#9A6B4C]" />
            <span className="label-overline">Projectplanner</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95] tracking-[-0.02em]">
            Plan uw project
          </h1>
          <p className="mt-6 text-lg text-white/50 max-w-xl font-serif font-light">
            Beantwoord een paar vragen en ontvang binnen 48 uur een vrijblijvende offerte.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-[#0C0C0C] border-b border-white/10">
        <div className="container-wide">
          <div className="flex items-center justify-between py-6 overflow-x-auto">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
              >
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-[#9A6B4C] text-white"
                        : currentStep === step.id
                        ? "bg-white text-[#0C0C0C]"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span
                    className={`hidden sm:block text-sm transition-colors duration-300 ${
                      currentStep >= step.id ? "text-white" : "text-white/40"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block flex-1 h-px mx-4 transition-colors duration-300 ${
                      currentStep > step.id ? "bg-[#9A6B4C]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="section-spacing bg-[#FAF7F2] relative min-h-[60vh]">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto">
            {/* Step Header */}
            <div className="text-center mb-12">
              <span className="label-overline">Stap {currentStep} van 7</span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[#0C0C0C]">
                {steps[currentStep - 1].description}
              </h2>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Project Type */}
                {currentStep === 1 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {projectTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.projectType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => updateFormData("projectType", type.id)}
                          className={`group p-6 text-left transition-all duration-300 ${
                            isSelected
                              ? "bg-[#0C0C0C] text-white"
                              : "bg-white hover:shadow-lg"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 ${
                              isSelected
                                ? "bg-[#9A6B4C] text-white"
                                : "bg-[#9A6B4C]/10 text-[#9A6B4C] group-hover:bg-[#9A6B4C] group-hover:text-white"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-display text-xl">{type.title}</h3>
                          <p
                            className={`mt-2 text-sm ${
                              isSelected ? "text-white/60" : "text-[#6B6560]"
                            }`}
                          >
                            {type.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 2: Client Type */}
                {currentStep === 2 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {clientTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.clientType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => updateFormData("clientType", type.id)}
                          className={`group p-6 text-left transition-all duration-300 ${
                            isSelected
                              ? "bg-[#0C0C0C] text-white"
                              : "bg-white hover:shadow-lg"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 ${
                              isSelected
                                ? "bg-[#9A6B4C] text-white"
                                : "bg-[#9A6B4C]/10 text-[#9A6B4C] group-hover:bg-[#9A6B4C] group-hover:text-white"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-display text-xl">{type.title}</h3>
                          <p
                            className={`mt-2 text-sm ${
                              isSelected ? "text-white/60" : "text-[#6B6560]"
                            }`}
                          >
                            {type.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 3: Project Details */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-semibold text-[#0C0C0C] mb-4">
                        Geschat budget
                      </label>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {budgetRanges.map((range) => {
                          const isSelected = formData.budget === range.id;
                          return (
                            <button
                              key={range.id}
                              onClick={() => updateFormData("budget", range.id)}
                              className={`p-4 text-left transition-all duration-300 ${
                                isSelected
                                  ? "bg-[#0C0C0C] text-white"
                                  : "bg-white hover:shadow-md"
                              }`}
                            >
                              <div className="font-semibold">{range.label}</div>
                              <div
                                className={`text-xs mt-1 ${
                                  isSelected ? "text-white/60" : "text-[#6B6560]"
                                }`}
                              >
                                {range.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0C0C0C] mb-4">
                        Korte omschrijving van uw project (optioneel)
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateFormData("description", e.target.value)}
                        placeholder="Beschrijf kort uw project..."
                        rows={4}
                        className="w-full bg-white border border-[#0C0C0C]/10 px-4 py-3 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#9A6B4C] transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Timeline */}
                {currentStep === 4 && (
                  <div className="space-y-3">
                    {timelines.map((timeline) => {
                      const isSelected = formData.timeline === timeline.id;
                      return (
                        <button
                          key={timeline.id}
                          onClick={() => updateFormData("timeline", timeline.id)}
                          className={`w-full p-5 text-left flex items-center gap-4 transition-all duration-300 ${
                            isSelected
                              ? "bg-[#0C0C0C] text-white"
                              : "bg-white hover:shadow-md"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
                              isSelected
                                ? "bg-[#9A6B4C] text-white"
                                : "bg-[#9A6B4C]/10 text-[#9A6B4C]"
                            }`}
                          >
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold">{timeline.label}</div>
                            <div
                              className={`text-sm ${
                                isSelected ? "text-white/60" : "text-[#6B6560]"
                              }`}
                            >
                              {timeline.description}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="ml-auto">
                              <Check className="w-5 h-5" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 5: Location */}
                {currentStep === 5 && (
                  <div className="bg-white p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-[#0C0C0C]">Projectlocatie</span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                          Stad / Gemeente
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateFormData("city", e.target.value)}
                          placeholder="bv. Gent, Antwerpen, Brussel..."
                          className="w-full bg-[#FAF7F2] border border-[#0C0C0C]/10 px-4 py-3 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#9A6B4C] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                          Provincie
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {provinces.map((province) => {
                            const isSelected = formData.province === province;
                            return (
                              <button
                                key={province}
                                onClick={() => updateFormData("province", province)}
                                className={`px-4 py-2 text-sm text-left transition-all duration-300 ${
                                  isSelected
                                    ? "bg-[#0C0C0C] text-white"
                                    : "bg-[#FAF7F2] text-[#0C0C0C] hover:bg-[#0C0C0C]/5"
                                }`}
                              >
                                {province}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Contact Information */}
                {currentStep === 6 && (
                  <div className="bg-white p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-[#0C0C0C]">Uw contactgegevens</span>
                    </div>

                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                            Naam *
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => updateFormData("name", e.target.value)}
                              placeholder="Uw volledige naam"
                              className="w-full bg-[#FAF7F2] border border-[#0C0C0C]/10 pl-12 pr-4 py-3 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#9A6B4C] transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                            Bedrijfsnaam (optioneel)
                          </label>
                          <div className="relative">
                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) => updateFormData("company", e.target.value)}
                              placeholder="Naam van uw bedrijf"
                              className="w-full bg-[#FAF7F2] border border-[#0C0C0C]/10 pl-12 pr-4 py-3 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#9A6B4C] transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                            E-mailadres *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateFormData("email", e.target.value)}
                              placeholder="uw@email.be"
                              className="w-full bg-[#FAF7F2] border border-[#0C0C0C]/10 pl-12 pr-4 py-3 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#9A6B4C] transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                            Telefoonnummer *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => updateFormData("phone", e.target.value)}
                              placeholder="+32 xxx xx xx xx"
                              className="w-full bg-[#FAF7F2] border border-[#0C0C0C]/10 pl-12 pr-4 py-3 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#9A6B4C] transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                          Bijkomende opmerkingen (optioneel)
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#6B6560]" />
                          <textarea
                            value={formData.message}
                            onChange={(e) => updateFormData("message", e.target.value)}
                            placeholder="Heeft u nog iets toe te voegen?"
                            rows={4}
                            className="w-full bg-[#FAF7F2] border border-[#0C0C0C]/10 pl-12 pr-4 py-3 text-[#0C0C0C] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#9A6B4C] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 7: Overview */}
                {currentStep === 7 && (
                  <div className="bg-white p-8">
                    <h3 className="font-display text-2xl text-[#0C0C0C] mb-8">
                      Overzicht van uw aanvraag
                    </h3>

                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-4 bg-[#FAF7F2]">
                          <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                            Project Type
                          </div>
                          <div className="font-semibold text-[#0C0C0C]">
                            {getSelectedLabel(formData.projectType, projectTypes)}
                          </div>
                        </div>

                        <div className="p-4 bg-[#FAF7F2]">
                          <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                            Klanttype
                          </div>
                          <div className="font-semibold text-[#0C0C0C]">
                            {getSelectedLabel(formData.clientType, clientTypes)}
                          </div>
                        </div>

                        <div className="p-4 bg-[#FAF7F2]">
                          <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                            Budget
                          </div>
                          <div className="font-semibold text-[#0C0C0C]">
                            {getSelectedLabel(formData.budget, budgetRanges)}
                          </div>
                        </div>

                        <div className="p-4 bg-[#FAF7F2]">
                          <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                            Planning
                          </div>
                          <div className="font-semibold text-[#0C0C0C]">
                            {getSelectedLabel(formData.timeline, timelines)}
                          </div>
                        </div>

                        <div className="p-4 bg-[#FAF7F2]">
                          <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                            Locatie
                          </div>
                          <div className="font-semibold text-[#0C0C0C]">
                            {formData.city}, {formData.province}
                          </div>
                        </div>

                        <div className="p-4 bg-[#FAF7F2]">
                          <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                            Contact
                          </div>
                          <div className="font-semibold text-[#0C0C0C]">{formData.name}</div>
                          <div className="text-sm text-[#6B6560]">{formData.email}</div>
                        </div>
                      </div>

                      {formData.description && (
                        <div className="p-4 bg-[#FAF7F2]">
                          <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                            Projectomschrijving
                          </div>
                          <div className="text-[#0C0C0C]">{formData.description}</div>
                        </div>
                      )}

                      {formData.message && (
                        <div className="p-4 bg-[#FAF7F2]">
                          <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                            Extra opmerkingen
                          </div>
                          <div className="text-[#0C0C0C]">{formData.message}</div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 p-4 bg-[#9A6B4C]/10 border border-[#9A6B4C]/20">
                      <p className="text-sm text-[#6B6560]">
                        Door op &quot;Verstuur aanvraag&quot; te klikken, gaat u akkoord met onze
                        privacyvoorwaarden. Wij nemen binnen 48 uur contact met u op.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-12 flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? "text-[#6B6560]/50 cursor-not-allowed"
                    : "text-[#0C0C0C] hover:text-[#9A6B4C]"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Vorige
              </button>

              {currentStep < 7 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                    canProceed()
                      ? "bg-[#0C0C0C] text-white hover:bg-[#9A6B4C]"
                      : "bg-[#0C0C0C]/20 text-[#0C0C0C]/40 cursor-not-allowed"
                  }`}
                >
                  Volgende
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#7A5339] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    <>
                      Verstuur aanvraag
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white border-t border-[#0C0C0C]/5">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-xl text-[#0C0C0C]">Liever persoonlijk contact?</h3>
              <p className="mt-2 text-[#6B6560]">
                Neem gerust contact met ons op voor een vrijblijvend gesprek.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="inline-flex items-center gap-2 text-[#0C0C0C] hover:text-[#9A6B4C] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">{COMPANY.contact.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="inline-flex items-center gap-2 text-[#0C0C0C] hover:text-[#9A6B4C] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">E-mail</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
