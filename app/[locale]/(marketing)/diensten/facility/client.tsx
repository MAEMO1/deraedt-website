"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Building2, X } from "lucide-react";
import { RAAMCONTRACTEN } from "@/lib/constants";
import { useTranslations } from "next-intl";
import {
  ServicePageHero,
  TwoColumnSection,
  ServicePageStats,
  PageCTA,
  SectionHeader,
} from "@/components/marketing/diensten";

const SERVICE_KEYS = ["raamcontracten", "dakonderhoud", "interventies", "renovatiewerken"] as const;

// Services Section
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.facility");
  const tCommon = useTranslations("serviceDetails.common.sectionLabels");

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <SectionHeader
          label={tCommon("ourServices")}
          title={t("services.sectionTitle")}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICE_KEYS.map((key, index) => {
            const features = t.raw(`services.items.${key}.features`) as string[];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#112337] mb-3">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="text-[#686E77] mb-6 leading-relaxed">
                  {t(`services.items.${key}.description`)}
                </p>
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#112337]">
                      <CheckCircle2 className="w-4 h-4 text-[#204CE5]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Raamcontracten Section
function RaamcontractenSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.facility");
  const tCommon = useTranslations("serviceDetails.common.sectionLabels");

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <SectionHeader
          label={tCommon("references")}
          title={t("raamcontracten.sectionTitle")}
          subtitle={t("raamcontracten.subtitle")}
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RAAMCONTRACTEN.map((contract, index) => (
            <motion.div
              key={contract.client}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-6 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#204CE5]/10 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-[#204CE5]" />
              </div>
              <h3 className="text-lg font-bold text-[#112337] mb-1">
                {contract.client}
              </h3>
              <p className="text-sm text-[#686E77] mb-2">
                {contract.scope}
              </p>
              <span className="text-xs text-[#204CE5] font-medium uppercase tracking-wide">
                {contract.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Scope Section
function ScopeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.facility");

  const scopeIncludes = t.raw("scope.includes.items") as string[];
  const scopeExcludes = t.raw("scope.excludes.items") as string[];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <SectionHeader
          label="Scope"
          title={t("scope.sectionTitle")}
          centered
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* What we do */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#204CE5]/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#204CE5]" />
              </div>
              <h3 className="text-xl font-bold text-[#112337]">
                {t("scope.includes.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {scopeIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                  <span className="text-[#112337]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Via partners */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#112337] rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {t("scope.excludes.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {scopeExcludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 pt-6 border-t border-white/10 text-sm text-white/50">
              {t("scope.excludes.note")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FacilityClient() {
  const t = useTranslations("serviceDetails.facility");

  const stats = [
    { value: "4", suffix: "", label: t("stats.activeContracts") },
    { value: "6", suffix: "", label: t("stats.classRecognition") },
    { value: "24", suffix: "/7", label: t("stats.interventions") },
    { value: "40", suffix: "+", label: t("stats.craftsmen") },
  ];

  return (
    <>
      <ServicePageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/original-site/Koning-Boudewijn-Stadion.webp"
        breadcrumbLabel={t("hero.breadcrumb")}
      />
      <TwoColumnSection
        label={t("twoColumn.label")}
        title={t("twoColumn.title")}
        image="/images/original-site/Koning-Boudewijn-Stadion.webp"
        imageAlt="Facility Management"
      >
        <p className="text-[#686E77] text-lg leading-relaxed">
          {t("twoColumn.paragraph1")}
        </p>
        <p className="mt-4 text-[#686E77] leading-relaxed">
          {t("twoColumn.paragraph2")}
        </p>
      </TwoColumnSection>
      <ServicesSection />
      <RaamcontractenSection />
      <ScopeSection />
      <ServicePageStats stats={stats} />
      <PageCTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        ctaText={t("cta.ctaText")}
      />
    </>
  );
}
