"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { CheckCircle2, Building2 } from "lucide-react";
import { STATS } from "@/lib/constants";
import { useTranslations } from "next-intl";
import {
  ServicePageHero,
  TwoColumnSection,
  ServicePageStats,
  PageCTA,
  SectionHeader,
} from "@/components/marketing/diensten";

const EXPERTISE_KEYS = ["monumenten", "dak", "gevel"] as const;
const REFERENCE_KEYS = ["stadhuisGent", "stadhuisBrussel", "justitiepaleis", "kuleuven"] as const;

// Expertise Section
function ExpertiseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.erfgoed");
  const tCommon = useTranslations("serviceDetails.common.sectionLabels");

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <SectionHeader
          label={tCommon("expertise")}
          title={t("expertise.sectionTitle")}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {EXPERTISE_KEYS.map((key, index) => {
            const examples = t.raw(`expertise.items.${key}.examples`) as string[];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#112337] mb-3">
                  {t(`expertise.items.${key}.title`)}
                </h3>
                <p className="text-[#686E77] mb-6 leading-relaxed">
                  {t(`expertise.items.${key}.description`)}
                </p>
                <div className="space-y-2">
                  {examples.map((example) => (
                    <div key={example} className="flex items-center gap-2 text-sm text-[#112337]">
                      <CheckCircle2 className="w-4 h-4 text-[#204CE5]" />
                      {example}
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// References Section
function ReferencesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.erfgoed");
  const tCommon = useTranslations("serviceDetails.common.sectionLabels");

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
              {tCommon("references")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
              {t("references.sectionTitle")}
            </h2>
            <p className="mt-6 text-[#686E77] text-lg leading-relaxed">
              {t("references.description")}
            </p>

            <div className="mt-8 space-y-4">
              {REFERENCE_KEYS.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#204CE5]/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#204CE5]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#112337]">
                        {t(`references.items.${key}.name`)}
                      </div>
                      <div className="text-sm text-[#686E77]">
                        {t(`references.items.${key}.type`)}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#204CE5] font-medium">
                    {t(`references.items.${key}.year`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
                alt="Justitiepaleis Dendermonde"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.erfgoed");
  const tCommon = useTranslations("serviceDetails.common.sectionLabels");

  const features = t.raw("features.items") as string[];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <SectionHeader
          label={tCommon("fullPackage")}
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

export default function ErfgoedPage() {
  const t = useTranslations("serviceDetails.erfgoed");

  const stats = [
    { value: STATS.yearsExperience, suffix: "+", label: t("stats.yearsExperience") },
    { value: "ISO", suffix: "", label: t("stats.isoQuality") },
    { value: "6", suffix: "", label: t("stats.classRecognition") },
    { value: "4", suffix: "", label: t("stats.largeReferences") },
  ];

  return (
    <>
      <ServicePageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/original-site/Justitiepaleis-Dendermonde.jpg"
        breadcrumbLabel={t("hero.breadcrumb")}
      />
      <TwoColumnSection
        label={t("twoColumn.label")}
        title={t("twoColumn.title")}
        image="/images/original-site/Foto-Stadhuis-Gent.jpeg"
        imageAlt="Stadhuis Gent"
      >
        <p className="text-[#686E77] text-lg leading-relaxed">
          {t("twoColumn.paragraph1")}
        </p>
        <p className="mt-4 text-[#686E77] leading-relaxed">
          {t("twoColumn.paragraph2", { years: STATS.yearsExperience })}
        </p>
      </TwoColumnSection>
      <ExpertiseSection />
      <ReferencesSection />
      <FeaturesSection />
      <ServicePageStats stats={stats} />
      <PageCTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
      />
    </>
  );
}
