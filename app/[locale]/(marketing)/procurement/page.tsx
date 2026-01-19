"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Shield,
  Award,
  Leaf,
  FileCheck,
  Building2,
  CheckCircle,
  ArrowRight,
  Download,
  Phone,
  Mail,
  Calendar,
  Zap,
} from "lucide-react";
import {
  COMPANY,
  STATS,
} from "@/lib/constants";

const certificationIcons: Record<string, typeof Shield> = {
  klasse6: Shield,
  iso9001: Award,
  vca: FileCheck,
  co2: Leaf,
};

const USP_KEYS = ['klasse6', 'certified', 'since1930', 'framework'] as const;
const PROCESS_KEYS = ['intake', 'quote', 'execution', 'delivery'] as const;

const processIcons: Record<typeof PROCESS_KEYS[number], typeof FileCheck> = {
  intake: FileCheck,
  quote: Calendar,
  execution: Building2,
  delivery: CheckCircle,
};

// Animated counter for stats
function AnimatedStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl sm:text-6xl font-bold text-[#112337]"
      >
        {isInView ? value : 0}{suffix}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-2 text-sm text-[#686E77]"
      >
        {label}
      </motion.div>
    </div>
  );
}

// Map RAAMCONTRACTEN to translation keys
const RAAMCONTRACT_KEYS = ['stadGent', 'stadBrussel', 'veb', 'kuLeuven'] as const;

// Map KEY_CLIENTS to translation keys
const KEY_CLIENT_KEYS = ['infrabel', 'nmbs', 'regieGebouwen', 'stadGent', 'stadBrussel', 'stadAntwerpen', 'agVespa', 'provincieOostVlaanderen'] as const;

// Map CERTIFICATIONS to translation keys
const CERTIFICATION_KEYS = ['klasse6', 'iso9001', 'vca', 'co2'] as const;

export default function ProcurementPage() {
  const t = useTranslations('procurement');
  const tCerts = useTranslations('certifications');
  const tRaam = useTranslations('raamcontracten');
  const tClients = useTranslations('keyClients');
  const heroRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const raamcontractenRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const isCertsInView = useInView(certsRef, { once: true, margin: "-100px" });
  const isRaamcontractenInView = useInView(raamcontractenRef, { once: true, margin: "-100px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-[#112337] overflow-hidden">
        {/* Background with parallax */}
        <motion.div style={{ y: heroImageY }} className="absolute inset-0">
          <Image
            src="/images/original-site/Foto-Stadhuis-Brussel.png"
            alt="Stadhuis Brussel - Overheidsopdracht"
            fill
            className="object-cover opacity-40"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/95 via-[#112337]/80 to-[#112337]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-[#112337]/40" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full">
          <div className="container-wide pt-40 pb-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
              {/* Left content */}
              <div>
                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  <div className="flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    <Shield className="w-4 h-4" />
                    {t('hero.badges.klasse6')}
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    <Leaf className="w-4 h-4 text-[#204CE5]" />
                    {t('hero.badges.co2')}
                  </div>
                </motion.div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {t('hero.badge')}
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
                >
                  {t('hero.titleLine1')}
                  <br />
                  <span className="text-[#204CE5]">{t('hero.titleLine2')}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-8 max-w-lg text-lg text-white/60 leading-relaxed"
                >
                  {t('hero.description')}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <a
                    href="#certificaten"
                    className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
                  >
                    <span>{t('hero.viewCertificates')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <Link
                    href="/procurement/documentatie"
                    className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('hero.tenderPack')}</span>
                  </Link>
                </motion.div>
              </div>

              {/* Right side - Stats panel */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden lg:block"
              >
                <div className="bg-white rounded-2xl p-10 shadow-xl">
                  <div className="grid grid-cols-2 gap-10">
                    <AnimatedStat value={STATS.yearsExperience} label={t('stats.yearsExperience')} />
                    <AnimatedStat value={15} suffix="+" label={t('stats.frameworkContracts')} />
                    <AnimatedStat value={STATS.employeesExact} label={t('stats.employees')} />
                    <AnimatedStat value={6} label={t('stats.classRecognition')} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-[#204CE5] rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* USP Strip */}
      <section className="bg-white border-b border-[#112337]/5">
        <div className="container-wide py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {USP_KEYS.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#204CE5]/10 text-[#204CE5]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-[#112337]">{t(`usps.${key}.title`)}</div>
                  <div className="mt-1 text-sm text-[#686E77]">{t(`usps.${key}.description`)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certificaten" ref={certsRef} className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          {/* Section header */}
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-16"
          >
            <span className="label-overline">{t('certifications.badge')}</span>
            <h2 className="mt-4 heading-lg">
              {t('certifications.title')} <span className="text-[#204CE5]">{t('certifications.titleAccent')}</span> {t('certifications.titleSuffix')}
            </h2>
            <p className="mt-4 text-[#686E77] max-w-2xl">
              {t('certifications.description')}
            </p>
          </motion.header>

          {/* Certification cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATION_KEYS.map((certKey, index) => {
              const Icon = certificationIcons[certKey] || Award;
              const isCO2 = certKey === 'co2';
              return (
                <motion.article
                  key={certKey}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`group relative bg-white rounded-xl p-8 transition-all duration-500 hover:shadow-xl ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  {/* Hover accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#204CE5] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start justify-between mb-6">
                    <div className={`flex items-center justify-center text-[#204CE5] rounded-xl bg-[#204CE5]/10 ${index === 0 ? "w-16 h-16" : "w-12 h-12"}`}>
                      <Icon className={index === 0 ? "w-8 h-8" : "w-6 h-6"} />
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>

                  <h3 className={`font-bold text-[#112337] ${index === 0 ? "text-3xl" : "text-xl"}`}>
                    {tCerts(`${certKey}.name`)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#204CE5]">{tCerts(`${certKey}.fullName`)}</p>
                  <p className={`mt-4 text-[#686E77] ${index === 0 ? "text-base" : "text-sm"}`}>
                    {tCerts(`${certKey}.description`)}
                  </p>

                  {isCO2 && (
                    <div className="mt-6 pt-6 border-t border-[#112337]/5">
                      <div className="text-xs font-semibold text-[#686E77] mb-2">{t('certifications.scope')}</div>
                      <p className="text-sm text-[#112337]/70">{tCerts('co2.scope')}</p>
                    </div>
                  )}

                  {isCO2 && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#686E77]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t('certifications.validUntil')}: {tCerts('co2.validUntil')}</span>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <p className="text-sm text-[#686E77]">
              {t('certifications.downloadPrompt')}
            </p>
            <Link
              href="/procurement/documentatie"
              className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>{t('certifications.downloadTenderPack')}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Raamcontracten Section */}
      <section ref={raamcontractenRef} className="section-spacing bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="label-overline">{t('raamcontracten.badge')}</span>

              <h2 className="mt-4 heading-lg">
                {t('raamcontracten.title')} <span className="text-[#204CE5]">{t('raamcontracten.titleAccent')}</span>
              </h2>

              <p className="mt-6 text-[#686E77] leading-relaxed">
                {t('raamcontracten.description')}
              </p>

              <div className="mt-10 space-y-4">
                {RAAMCONTRACT_KEYS.map((contractKey, index) => (
                  <motion.div
                    key={contractKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="group flex items-center gap-6 p-5 bg-[#F5F5F5] rounded-xl border-l-4 border-[#204CE5] hover:bg-[#204CE5]/5 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-[#112337]">{tRaam(`${contractKey}.client`)}</div>
                      <div className="text-sm text-[#686E77] mt-0.5">{tRaam(`${contractKey}.scope`)}</div>
                    </div>
                    <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold">
                      {tRaam(`${contractKey}.type`)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Trust panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-[#112337] rounded-2xl p-12 text-white">
                <h3 className="text-2xl font-bold mb-8">{t('raamcontracten.trustedBy')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {KEY_CLIENT_KEYS.map((clientKey) => (
                    <div
                      key={clientKey}
                      className="text-sm text-white/60 flex items-center gap-3 py-2"
                    >
                      <CheckCircle className="w-4 h-4 text-[#204CE5] flex-shrink-0" />
                      {tClients(clientKey)}
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-center">
                  {[
                    { value: STATS.yearsExperience, label: t('raamcontracten.year') },
                    { value: "3x", label: t('raamcontracten.certified') },
                    { value: STATS.employees, label: t('raamcontracten.fte') },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-4xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/40 uppercase tracking-wider mt-2">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="label-overline">{t('process.badge')}</span>
            <h2 className="mt-4 heading-lg">
              {t('process.title')} <span className="text-[#204CE5]">{t('process.titleAccent')}</span>
            </h2>
          </motion.header>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {PROCESS_KEYS.map((key, index) => {
              const Icon = processIcons[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white rounded-xl text-[#204CE5] mb-6 group-hover:bg-[#204CE5] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-bold text-[#112337]/10 mb-3">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-xl font-bold text-[#112337]">{t(`process.phases.${key}.title`)}</h3>
                  <p className="mt-3 text-sm text-[#686E77]">{t(`process.phases.${key}.description`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#112337]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                {t('cta.badge')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white leading-tight"
            >
              {t('cta.title')} <span className="text-[#204CE5]">{t('cta.titleAccent')}</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg text-white/60 leading-relaxed"
            >
              {t('cta.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact?subject=raamcontract"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl"
              >
                <span>{t('cta.planMeeting')}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="group inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/20"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.contact.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-white/60"
            >
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="flex items-center gap-2 hover:text-[#204CE5] transition-colors"
              >
                <Mail className="w-4 h-4" />
                {COMPANY.contact.email}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
