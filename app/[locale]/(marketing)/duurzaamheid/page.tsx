"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import {
  Leaf,
  TrendingDown,
  Recycle,
  Truck,
  Factory,
  Sun,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Target,
  BarChart3,
  Building2,
} from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

const co2Certification = CERTIFICATIONS.find((c) => c.id === "co2");

const PILLAR_KEYS = ['insight', 'reduction', 'transparency', 'participation'] as const;
const MEASURE_KEYS = ['transport', 'machines', 'circular', 'energy'] as const;

const measureIcons: Record<typeof MEASURE_KEYS[number], LucideIcon> = {
  transport: Truck,
  machines: Factory,
  circular: Recycle,
  energy: Sun,
};

export default function DuurzaamheidPage() {
  const t = useTranslations('sustainability');
  const heroRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const measuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const isApproachInView = useInView(approachRef, { once: true, margin: "-100px" });
  const isMeasuresInView = useInView(measuresRef, { once: true, margin: "-100px" });
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  const benefits = t.raw('benefits.items') as string[];

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] bg-[#0C0C0C] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
            alt={t('hero.title')}
            fill
            className="object-cover image-cinematic opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-[#0C0C0C]/40" />
        </div>

        <div className="container-wide relative pb-16 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            {/* Certification badge */}
            <div className="inline-flex items-center gap-3 bg-green-600 text-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] mb-8">
              <Leaf className="w-4 h-4" />
              {t('hero.badge')}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">{t('hero.label')}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95] tracking-[-0.02em]">
              {t('hero.title')}
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/50 leading-relaxed max-w-xl font-serif font-light">
              {t('hero.description')}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/procurement"
                className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
              >
                {t('hero.viewCertificates')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact?subject=raamcontract"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5"
              >
                {t('hero.contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is CO2-Prestatieladder */}
      <section className="py-16 bg-[#0C0C0C] border-t border-white/10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl text-white mb-4">
                {t('whatIs.title')}
              </h2>
              <p className="text-white/60 leading-relaxed">
                {t('whatIs.description')}
              </p>
            </div>
            <div className="bg-white/5 p-6 border border-white/10">
              <div className="text-[10px] text-green-400 uppercase tracking-[0.2em] mb-2">
                {t('whatIs.ourCertification')}
              </div>
              <div className="font-display text-3xl text-white">{t('whatIs.level')} 3</div>
              <div className="text-sm text-white/50 mt-2">
                CO₂-Prestatieladder 3.1
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-white/40">{t('whatIs.scope')}</div>
                <div className="text-sm text-white/70 mt-1">
                  {co2Certification && "scope" in co2Certification ? co2Certification.scope : "Algemene bouw-, dak- en infrastructuurwerken"}
                </div>
              </div>
              <div className="mt-3">
                <div className="text-xs text-white/40">{t('whatIs.validUntil')}</div>
                <div className="text-sm text-white/70 mt-1">
                  {co2Certification && "validUntil" in co2Certification ? co2Certification.validUntil : "14 januari 2028"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach - 4 Pillars */}
      <section ref={approachRef} className="section-spacing bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">{t('approach.label')}</span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="heading-section text-[#0C0C0C]">
              {t('approach.title')}
            </h2>
          </motion.header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLAR_KEYS.map((key, index) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 border border-[#0C0C0C]/5"
              >
                <div className="font-display text-5xl text-[#0C0C0C]/10 mb-4">
                  {t(`approach.pillars.${key}.number`)}
                </div>
                <h3 className="font-display text-xl text-[#0C0C0C]">
                  {t(`approach.pillars.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm text-[#6B6560] leading-relaxed">
                  {t(`approach.pillars.${key}.description`)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Reduction Measures */}
      <section ref={measuresRef} className="section-spacing bg-white relative">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isMeasuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-[#9A6B4C]" />
                <span className="label-overline">{t('measures.label')}</span>
              </div>

              <h2 className="heading-section text-[#0C0C0C]">
                {t('measures.title')}
              </h2>

              <p className="mt-8 text-[#6B6560] leading-relaxed">
                {t('measures.description')}
              </p>

              <div className="mt-10 space-y-6">
                {MEASURE_KEYS.map((key, index) => {
                  const Icon = measureIcons[key];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isMeasuresInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-green-500/10 text-green-600 flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0C0C0C]">
                          {t(`measures.items.${key}.title`)}
                        </h3>
                        <p className="mt-1 text-sm text-[#6B6560]">
                          {t(`measures.items.${key}.description`)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isMeasuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square relative">
                <Image
                  src="/images/original-site/team-collage.jpg"
                  alt={t('measures.title')}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-green-500/30" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-green-500/30" />

              {/* Stats overlay */}
              <div className="absolute -bottom-8 -right-8 bg-[#0C0C0C] text-white p-8">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <TrendingDown className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-[0.15em]">{t('measures.reductionGoal')}</span>
                </div>
                <div className="font-display text-4xl">2028</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                  {t('measures.certificateValid')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits for Clients */}
      <section ref={benefitsRef} className="section-spacing bg-[#0C0C0C] relative">
        <div className="absolute inset-0 texture-stone opacity-30" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-[#9A6B4C]" />
                <span className="label-overline">{t('benefits.label')}</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl text-white leading-[0.95]">
                {t('benefits.title')}
              </h2>

              <p className="mt-8 text-white/50 leading-relaxed">
                {t('benefits.description')}
              </p>

              <ul className="mt-10 space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isBenefitsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 border border-white/10 p-10"
            >
              <h3 className="font-display text-2xl text-white mb-8">
                {t('benefits.awardAdvantage.title')}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 text-green-400 flex-shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {t('benefits.awardAdvantage.infrabel.title')}
                    </div>
                    <div className="text-sm text-white/50 mt-1">
                      {t('benefits.awardAdvantage.infrabel.description')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 text-green-400 flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {t('benefits.awardAdvantage.municipalities.title')}
                    </div>
                    <div className="text-sm text-white/50 mt-1">
                      {t('benefits.awardAdvantage.municipalities.description')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 text-green-400 flex-shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {t('benefits.awardAdvantage.discount.title')}
                    </div>
                    <div className="text-sm text-white/50 mt-1">
                      {t('benefits.awardAdvantage.discount.description')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <Link
                  href="/procurement"
                  className="group inline-flex items-center gap-2 text-[#9A6B4C] text-sm font-semibold uppercase tracking-[0.1em] hover:text-[#BA8B6C] transition-colors"
                >
                  {t('benefits.viewCertificates')}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] mb-8">
              <FileCheck className="w-4 h-4" />
              {t('cta.badge')}
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-[#0C0C0C] leading-[0.95]">
              {t('cta.title')}
            </h2>

            <p className="mt-6 text-[#6B6560] leading-relaxed max-w-xl mx-auto">
              {t('cta.description')}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center gap-3 bg-[#0C0C0C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#9A6B4C]"
              >
                {t('cta.startProject')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact?subject=raamcontract"
                className="group inline-flex items-center gap-3 border border-[#0C0C0C]/20 text-[#0C0C0C] px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-[#0C0C0C] hover:text-white"
              >
                {t('cta.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
