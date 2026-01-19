"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Download,
  CheckCircle,
  Shield,
  Award,
  Leaf,
  FileCheck,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const DOC_KEYS = ['iso', 'vca', 'co2', 'klasse6', 'klasse4', 'ba', 'tienjarige', 'referenties'] as const;
const PURPOSE_KEYS = ['aanbesteding', 'preselectie', 'raamcontract', 'other'] as const;

export function DocumentatieClient() {
  const t = useTranslations("procurement.documentatie");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestSchema = z.object({
    name: z.string().min(2, t("validation.nameRequired")),
    organisation: z.string().min(2, t("validation.organisationRequired")),
    email: z.string().email(t("validation.emailInvalid")),
    phone: z.string().optional(),
    purpose: z.enum(["aanbesteding", "preselectie", "raamcontract", "other"], t("validation.purposeRequired")),
    purposeOther: z.string().optional(),
    message: z.string().optional(),
  });

  type RequestForm = z.infer<typeof requestSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RequestForm>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      purpose: undefined,
    },
  });

  const watchPurpose = watch("purpose");

  const onSubmit = async (data: RequestForm) => {
    setIsSubmitting(true);

    try {
      // Create lead via API
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_type: "procurement",
          contact_name: data.name,
          contact_email: data.email,
          contact_phone: data.phone || null,
          organisation: data.organisation,
          message: `Doel: ${t(`purposes.${data.purpose}`)}${data.purposeOther ? ` (${data.purposeOther})` : ""}${data.message ? `\n\nBericht: ${data.message}` : ""}`,
          source: "tender-pack-request",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);
      toast.success(t("toast.success"), {
        description: t("toast.successDescription"),
      });
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(t("toast.error"), {
        description: t("toast.errorDescription"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0C0C0C] py-24 pt-40">
        <div className="container-wide">
          <Link
            href="/procurement"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{t("backLink")}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                {t("badge")}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-white leading-[0.95]">
              {t("title")}
            </h1>

            <p className="mt-6 text-white/50 leading-relaxed">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-[#FAF7F2]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isSubmitted ? (
                <div className="bg-white p-10 border border-green-200">
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="font-display text-2xl text-[#0C0C0C] mb-4">
                      {t("success.title")}
                    </h2>
                    <p className="text-[#6B6560] mb-8">
                      {t("success.message")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/procurement"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0C0C0C] text-white text-sm font-semibold transition-colors hover:bg-[#9A6B4C]"
                      >
                        {t("success.backToHub")}
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#0C0C0C]/20 text-[#0C0C0C] text-sm font-medium transition-colors hover:bg-[#0C0C0C] hover:text-white"
                      >
                        {t("success.contactUs")}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 sm:p-10 border border-[#0C0C0C]/5">
                  <h2 className="font-display text-2xl text-[#0C0C0C] mb-6">
                    {t("form.title")}
                  </h2>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name">{t("form.name")} {t("form.required")}</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="mt-2"
                        placeholder={t("form.namePlaceholder")}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Organisation */}
                    <div>
                      <Label htmlFor="organisation">{t("form.organisation")} {t("form.required")}</Label>
                      <Input
                        id="organisation"
                        {...register("organisation")}
                        className="mt-2"
                        placeholder={t("form.organisationPlaceholder")}
                      />
                      {errors.organisation && (
                        <p className="text-sm text-red-600 mt-1">{errors.organisation.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">{t("form.email")} {t("form.required")}</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-2"
                        placeholder={t("form.emailPlaceholder")}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone">{t("form.phone")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-2"
                        placeholder={t("form.phonePlaceholder")}
                      />
                    </div>

                    {/* Purpose */}
                    <div>
                      <Label>{t("form.purpose")} {t("form.required")}</Label>
                      <div className="mt-3 space-y-2">
                        {PURPOSE_KEYS.map((key) => (
                          <label
                            key={key}
                            className="flex items-center gap-3 p-3 border border-[#0C0C0C]/10 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                          >
                            <input
                              type="radio"
                              value={key}
                              {...register("purpose")}
                              className="w-4 h-4 text-[#9A6B4C] border-gray-300 focus:ring-[#9A6B4C]"
                            />
                            <span className="text-sm text-[#0C0C0C]">{t(`purposes.${key}`)}</span>
                          </label>
                        ))}
                      </div>
                      {errors.purpose && (
                        <p className="text-sm text-red-600 mt-1">{errors.purpose.message}</p>
                      )}
                    </div>

                    {/* Purpose Other */}
                    {watchPurpose === "other" && (
                      <div>
                        <Label htmlFor="purposeOther">{t("form.purposeOther")}</Label>
                        <Input
                          id="purposeOther"
                          {...register("purposeOther")}
                          className="mt-2"
                          placeholder={t("form.purposeOtherPlaceholder")}
                        />
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">{t("form.message")}</Label>
                      <textarea
                        id="message"
                        {...register("message")}
                        rows={3}
                        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder={t("form.messagePlaceholder")}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 text-sm font-semibold uppercase tracking-[0.1em]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("form.submitting")}
                        </>
                      ) : (
                        <>
                          {t("form.submit")}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Documents List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display text-2xl text-[#0C0C0C] mb-6">
                {t("documents.title")}
              </h2>

              <p className="text-[#6B6560] mb-8">
                {t("documents.description")}
              </p>

              <div className="space-y-4">
                {DOC_KEYS.map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 bg-white border border-[#0C0C0C]/5"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#0C0C0C]">{t(`documents.items.${key}.name`)}</div>
                      <div className="text-xs text-[#6B6560]">{t(`documents.items.${key}.type`)}</div>
                    </div>
                    <Download className="w-4 h-4 text-[#6B6560]" />
                  </motion.div>
                ))}
              </div>

              {/* Certifications Summary */}
              <div className="mt-10 p-6 bg-[#0C0C0C] text-white">
                <h3 className="font-display text-lg mb-4">{t("certSummary.title")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Shield className="w-4 h-4 text-[#9A6B4C]" />
                    {t("certSummary.klasse6")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Award className="w-4 h-4 text-[#9A6B4C]" />
                    {t("certSummary.iso")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <FileCheck className="w-4 h-4 text-[#9A6B4C]" />
                    {t("certSummary.vca")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Leaf className="w-4 h-4 text-[#9A6B4C]" />
                    {t("certSummary.co2")}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
