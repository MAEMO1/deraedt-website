"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, CheckCircle2, Award, BadgeCheck } from "lucide-react";

const CERTIFICATION_KEYS = ["klasse6", "iso9001", "vca"] as const;

const ICONS = {
  klasse6: Award,
  iso9001: Shield,
  vca: BadgeCheck,
};

function CertificationBadge({
  certKey,
  index,
  t,
}: {
  certKey: (typeof CERTIFICATION_KEYS)[number];
  index: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = ICONS[certKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden bg-white rounded-xl p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        {/* Verified badge indicator */}
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#204CE5]/10 text-[#204CE5] transition-all duration-300 group-hover:bg-[#204CE5] group-hover:text-white">
          <Icon className="w-7 h-7" />
        </div>

        {/* Content */}
        <div className="mt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#112337]">
              {t(`${certKey}.name`)}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-[#204CE5]">
            {t(`${certKey}.fullName`)}
          </p>
          <p className="mt-2 text-sm text-[#686E77]">
            {t(`${certKey}.description`)}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#204CE5] origin-left rounded-b-xl"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
        />
      </div>
    </motion.div>
  );
}

export function Certifications() {
  const t = useTranslations("certifications");

  return (
    <section className="section-spacing bg-[#F5F5F5]">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="label-overline">{t("subtitle")}</span>

          <h2 className="mt-4 heading-lg">
            {t("title")}
          </h2>

          <p className="mt-4 text-lg text-[#686E77] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {CERTIFICATION_KEYS.map((certKey, index) => (
            <CertificationBadge
              key={certKey}
              certKey={certKey}
              index={index}
              t={t}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[#686E77]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">{t("trustIndicators.audited")}</span>
          </div>
          <div className="h-4 w-px bg-[#112337]/10" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">{t("trustIndicators.current")}</span>
          </div>
          <div className="h-4 w-px bg-[#112337]/10" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">{t("trustIndicators.improvement")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
