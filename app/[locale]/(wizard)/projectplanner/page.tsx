"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
  LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { COMPANY } from "@/lib/constants";

const PROJECT_TYPE_ICONS: Record<string, LucideIcon> = {
  nieuwbouw: Building2,
  renovatie: Hammer,
  erfgoed: Landmark,
  onderhoud: Wrench,
};

const CLIENT_TYPE_ICONS: Record<string, LucideIcon> = {
  particulier: Home,
  bedrijf: Building,
  overheid: Landmark,
  ontwikkelaar: Briefcase,
};

const PROJECT_TYPES = ["nieuwbouw", "renovatie", "erfgoed", "onderhoud"] as const;
const CLIENT_TYPES = ["particulier", "bedrijf", "overheid", "ontwikkelaar"] as const;
const BUDGETS = ["small", "medium", "large", "enterprise", "unknown"] as const;
const TIMELINES = ["urgent", "soon", "planned", "future"] as const;
const LOCATIONS = [
  "oost-vlaanderen",
  "west-vlaanderen",
  "antwerpen",
  "vlaams-brabant",
  "limburg",
  "brussel",
  "andere",
] as const;

type QuestionId = "projectType" | "clientType" | "scope" | "timeline" | "location" | "contact";

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
  const t = useTranslations("projectPlanner");
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

  const questions: { id: QuestionId; type: "icons" | "options" | "form" }[] = [
    { id: "projectType", type: "icons" },
    { id: "clientType", type: "icons" },
    { id: "scope", type: "options" },
    { id: "timeline", type: "options" },
    { id: "location", type: "options" },
    { id: "contact", type: "form" },
  ];

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

    try {
      const response = await fetch("/api/projectplanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t("toast.error.title"));
      }

      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });
      setIsComplete(true);
    } catch (error) {
      console.error("[PROJECTPLANNER] Submit error:", error);
      toast.error(t("toast.error.title"), {
        description: t("toast.error.description"),
      });
    } finally {
      setIsSubmitting(false);
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
    });
    setIsComplete(false);
  };

  // Success screen
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
              {t("success.badge")}
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-[#112337]">
              {t("success.title")}
            </h1>

            <p className="mt-6 text-lg text-[#686E77]">
              {t("success.message")}{" "}
              <span className="text-[#204CE5] font-medium">
                {t("success.hours", { hours: 48 })}
              </span>{" "}
              {t("success.messageEnd")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8]"
              >
                <span>{t("success.backHome")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#112337] px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#112337]/5"
              >
                {t("buttons.viewProjects")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const getIconOptionsForQuestion = () => {
    switch (currentQuestion.id) {
      case "projectType":
        return PROJECT_TYPES.map((id) => ({
          id,
          icon: PROJECT_TYPE_ICONS[id],
          label: t(`options.projectTypes.${id}`),
        }));
      case "clientType":
        return CLIENT_TYPES.map((id) => ({
          id,
          icon: CLIENT_TYPE_ICONS[id],
          label: t(`options.clientTypes.${id}`),
        }));
      default:
        return [];
    }
  };

  const getTextOptionsForQuestion = () => {
    switch (currentQuestion.id) {
      case "scope":
        return BUDGETS.map((id) => ({
          id,
          label: t(`options.budgets.${id}`),
        }));
      case "timeline":
        return TIMELINES.map((id) => ({
          id,
          label: t(`options.timelines.${id}`),
        }));
      case "location":
        return LOCATIONS.map((id) => ({
          id,
          label: t(`options.locations.${id}`),
        }));
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      {/* Progress bar */}
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
      <main className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-40 sm:pb-32 overflow-y-auto">
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
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#112337] mb-3 sm:mb-4"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                {t("title")}
              </h1>

              {/* Question */}
              <p className="text-lg sm:text-2xl text-[#112337] mb-8 sm:mb-16">
                {t(`questions.${currentQuestion.id}`)}
              </p>

              {/* Icon buttons */}
              {currentQuestion.type === "icons" && (
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-10 lg:gap-14 max-w-md sm:max-w-none mx-auto">
                  {getIconOptionsForQuestion().map((option) => {
                    const Icon = option.icon;
                    const isSelected =
                      formData[currentQuestion.id as keyof FormData] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => selectOption(option.id)}
                        className="flex flex-col items-center gap-3 sm:gap-5 group"
                      >
                        <div className="relative">
                          <div
                            className={`w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-white flex items-center justify-center transition-shadow duration-75 ${
                              isSelected
                                ? "shadow-[0_0_34px_-6px_rgba(32,76,229,0.6)]"
                                : "shadow-[0_4px_20px_-4px_rgba(17,35,55,0.1)] group-hover:shadow-[0_8px_30px_-4px_rgba(17,35,55,0.15)]"
                            }`}
                          >
                            <Icon
                              className={`w-8 h-8 sm:w-14 sm:h-14 lg:w-16 lg:h-16 transition-colors duration-75 ${
                                isSelected
                                  ? "text-[#204CE5]"
                                  : "text-[#DADADA] group-hover:text-[#204CE5]/50"
                              }`}
                              strokeWidth={1.25}
                            />
                          </div>
                        </div>
                        <span
                          className={`text-xs sm:text-base font-medium tracking-wide transition-colors duration-75 ${
                            isSelected
                              ? "text-[#112337]"
                              : "text-[#686E77] group-hover:text-[#112337]"
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
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl mx-auto px-2">
                  {getTextOptionsForQuestion().map((option) => {
                    const isSelected =
                      formData[currentQuestion.id as keyof FormData] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => selectOption(option.id)}
                        className={`px-5 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full transition-[color,box-shadow] duration-75 ${
                          isSelected
                            ? "bg-white text-[#204CE5] font-semibold shadow-[0_0_34px_-6px_rgba(32,76,229,0.5)]"
                            : "bg-white text-[#686E77] shadow-[0_4px_20px_-4px_rgba(17,35,55,0.08)] hover:shadow-[0_8px_30px_-4px_rgba(17,35,55,0.12)] hover:text-[#112337]"
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
                <div className="max-w-lg mx-auto space-y-4 sm:space-y-5 px-2">
                  {[
                    { key: "name", placeholder: t("form.name"), type: "text" },
                    { key: "email", placeholder: t("form.email"), type: "email" },
                    { key: "phone", placeholder: t("form.phone"), type: "tel" },
                    { key: "company", placeholder: t("form.company"), type: "text" },
                  ].map((field) => {
                    const hasValue = formData[field.key as keyof FormData];
                    return (
                      <div key={field.key} className="relative">
                        <input
                          type={field.type}
                          value={formData[field.key as keyof FormData]}
                          onChange={(e) => updateField(field.key as keyof FormData, e.target.value)}
                          placeholder={field.placeholder}
                          className={`w-full bg-white rounded-xl px-4 py-4 sm:px-6 sm:py-5 text-[#112337] text-base sm:text-lg placeholder:text-[#DADADA] focus:outline-none transition-shadow duration-75 ${
                            hasValue
                              ? "shadow-[0_0_34px_-6px_rgba(32,76,229,0.3)]"
                              : "shadow-[0_4px_20px_-4px_rgba(17,35,55,0.08)] focus:shadow-[0_8px_30px_-4px_rgba(32,76,229,0.2)]"
                          }`}
                        />
                      </div>
                    );
                  })}

                  <p className="text-xs sm:text-sm text-[#686E77]/60 text-center pt-4 sm:pt-6">
                    {t("form.privacy")}{" "}
                    <Link href="/privacy" className="text-[#204CE5] hover:underline">
                      {t("form.privacyLink")}
                    </Link>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 p-6 sm:p-10">
        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
          {/* Main action button */}
          {currentQuestion.type === "form" ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={`group px-8 py-4 sm:px-14 sm:py-5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                canProceed() && !isSubmitting
                  ? "bg-[#204CE5] text-white shadow-[0_8px_30px_-4px_rgba(32,76,229,0.4)] hover:shadow-[0_12px_40px_-4px_rgba(32,76,229,0.5)] hover:bg-[#1A3BB8]"
                  : "bg-white text-[#DADADA] shadow-[0_4px_20px_-4px_rgba(17,35,55,0.08)] cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 sm:gap-3">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  {t("buttons.submitting")}
                </span>
              ) : (
                <span className="flex items-center gap-2 sm:gap-3">
                  {t("buttons.submit")}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`group px-8 py-4 sm:px-14 sm:py-5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                canProceed()
                  ? "bg-[#204CE5] text-white shadow-[0_8px_30px_-4px_rgba(32,76,229,0.4)] hover:shadow-[0_12px_40px_-4px_rgba(32,76,229,0.5)] hover:bg-[#1A3BB8]"
                  : "bg-white text-[#DADADA] shadow-[0_4px_20px_-4px_rgba(17,35,55,0.08)] cursor-not-allowed"
              }`}
            >
              <span className="flex items-center gap-2 sm:gap-3">
                {t("buttons.next")}
                <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${canProceed() ? "group-hover:translate-x-1" : ""}`} />
              </span>
            </button>
          )}

          {/* Start over */}
          <button
            onClick={restart}
            className="sm:absolute sm:right-10 sm:bottom-10 text-sm font-medium text-[#DADADA] hover:text-[#112337] uppercase tracking-widest transition-all duration-300"
          >
            {t("buttons.restart")}
          </button>
        </div>
      </footer>
    </div>
  );
}
