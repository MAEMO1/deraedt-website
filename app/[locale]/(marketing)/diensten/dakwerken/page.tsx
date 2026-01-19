"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
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

const SERVICE_KEYS = ["hellendeDaken", "platteDaken", "dakisolatie", "valbeveiliging"] as const;

// Services Section - 2x2 grid with bordered cards
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.dakwerken");
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

// Features Section - Alternating layout (image left)
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("serviceDetails.dakwerken");
  const tCommon = useTranslations("serviceDetails.common.sectionLabels");

  const features = t.raw("features.items") as string[];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/original-site/IMG_20230615_0957592-ps-scaled.jpg"
                alt="Dakwerken project"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
              {tCommon("fullPackage")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
              {t("features.sectionTitle")}
            </h2>
            <ul className="mt-8 space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                  <span className="text-[#112337]">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function DakwerkenPage() {
  const t = useTranslations("serviceDetails.dakwerken");

  const stats = [
    { value: STATS.yearsExperience, suffix: "+", label: t("stats.yearsExperience") },
    { value: "VCA", suffix: "**", label: t("stats.safety") },
    { value: "6", suffix: "", label: t("stats.classRecognition") },
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
        imageAlt="Dakwerken detail"
      >
        <p className="text-[#686E77] text-lg leading-relaxed">
          {t("twoColumn.paragraph1")}
        </p>
        <p className="mt-4 text-[#686E77] leading-relaxed">
          {t("twoColumn.paragraph2", { years: STATS.yearsExperience })}
        </p>
      </TwoColumnSection>
      <ServicesSection />
      <FeaturesSection />
      <ServicePageStats stats={stats} />
      <PageCTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
      />
    </>
  );
}
