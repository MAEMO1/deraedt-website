"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { STATS } from "@/lib/constants";
import { useTranslations } from "next-intl";
import {
  ServicePageHero,
  TwoColumnSection,
  ServicePageStats,
  PageCTA,
  SectionHeader,
} from "@/components/marketing/diensten";

// Features Section - Clean grid with border cards
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.bouwwerken");
  const tCommon = useTranslations("serviceDetails.common.sectionLabels");

  const features = t.raw("features.items") as string[];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <SectionHeader
          label={tCommon("whatWeDo")}
          title={t("features.sectionTitle")}
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                <span className="text-[#112337] font-medium">{feature}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section - Clean numbered steps
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.bouwwerken");
  const tCommon = useTranslations("serviceDetails.common.sectionLabels");

  const STEP_KEYS = ["01", "02", "03", "04"] as const;

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <SectionHeader
          label={tCommon("process")}
          title={t("process.title")}
          subtitle={t("process.subtitle")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEP_KEYS.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-[#204CE5]/10 mb-4">
                {key}
              </div>
              <h3 className="text-xl font-bold text-[#112337] mb-2">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="text-[#686E77] leading-relaxed">
                {t(`process.steps.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BouwwerkenPage() {
  const t = useTranslations("serviceDetails.bouwwerken");

  const stats = [
    { value: STATS.yearsExperience, suffix: "+", label: t("stats.yearsExperience") },
    { value: "6", suffix: "", label: t("stats.classRecognition") },
    { value: "3", suffix: "x", label: t("stats.certified") },
    { value: "40", suffix: "+", label: t("stats.craftsmen") },
  ];

  return (
    <>
      <ServicePageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
        breadcrumbLabel={t("hero.breadcrumb")}
      />
      <TwoColumnSection
        label={t("twoColumn.label")}
        title={t("twoColumn.title")}
        image="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
        imageAlt="Bouwproject"
      >
        <p className="text-[#686E77] text-lg leading-relaxed">
          {t("twoColumn.paragraph1")}
        </p>
        <p className="mt-4 text-[#686E77] leading-relaxed">
          {t("twoColumn.paragraph2", { years: STATS.yearsExperience })}
        </p>
      </TwoColumnSection>
      <FeaturesSection />
      <ProcessSection />
      <ServicePageStats stats={stats} />
      <PageCTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
      />
    </>
  );
}
