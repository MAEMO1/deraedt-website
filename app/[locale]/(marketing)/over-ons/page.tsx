"use client";

import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { Award, ArrowRight, ArrowUpRight, Play, CheckCircle2, Users, Building2, Shield, Heart, TrendingUp } from "lucide-react";
import { COMPANY, STATS, CERTIFICATIONS } from "@/lib/constants";

// Animated counter hook for counting up
function useAnimatedCounter(target: number, isInView: boolean, duration = 2) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return value;
}

const TIMELINE_YEARS = ["1930", "2024", "2025"] as const;

const VALUE_KEYS = ["responsibility", "safety", "freedom", "trust", "progress"] as const;
const VALUE_ICONS = [Shield, Users, Building2, Heart, TrendingUp];

const TEAM_FEATURE_KEYS = ["leaders", "specialists", "team", "training"] as const;

// Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const t = useTranslations("aboutPage");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animated counters for stats
  const foundedYear = useAnimatedCounter(1930, statsInView, 2.5);
  const employeeCount = useAnimatedCounter(parseInt(STATS.employees, 10), statsInView);

  const STAT_KEYS = ["founded", "employees", "recognition", "certified"] as const;
  const STAT_VALUES = [foundedYear, employeeCount, "Klasse", "3"];
  const STAT_SUFFIXES = ["", "+", " 6", "x"];
  const STAT_COLORS = ["#C73030", "#7C3AED", "#D97706", "#204CE5"];

  return (
    <section ref={ref} className="relative min-h-[90vh] bg-[#112337] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/original-site/team-collage.jpg"
          alt="Team De Raedt aan het werk"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337] via-[#112337]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-[#112337]/30" />
      </motion.div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative h-full">
        <div className="container-wide h-full flex flex-col justify-end pb-24 pt-48">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            {/* Left: Main content */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-8">
                  <span className="w-12 h-px bg-[#204CE5]" />
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[clamp(3rem,8vw,5.5rem)] font-bold text-white leading-[0.95] tracking-[-0.02em] mb-8"
              >
                {t("hero.titleYears", { years: STATS.yearsExperience })}
                <br />
                <span className="text-[#204CE5]">{t("hero.titleCraftsmanship")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-white/50 leading-relaxed max-w-lg mb-12"
              >
                {t("hero.description", { year: COMPANY.founded })}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/projecten"
                  className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-[0_20px_40px_rgba(32,76,229,0.3)]"
                >
                  {t("hero.viewProjects")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/werken-bij"
                  className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 border border-white/10"
                >
                  <Play className="w-4 h-4" />
                  {t("hero.workWithUs")}
                </Link>
              </motion.div>
            </div>

            {/* Right: Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {STAT_KEYS.map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="text-3xl font-bold text-white mb-1 tabular-nums">
                      {STAT_VALUES[index]}
                      <span style={{ color: STAT_COLORS[index] }}>{STAT_SUFFIXES[index]}</span>
                    </div>
                    <div className="text-sm text-white/40">{t(`stats.${key}`)}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Mission Statement Section
function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("aboutPage");

  return (
    <section ref={ref} className="py-32 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#204CE5]/5" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-8">
            <span className="w-12 h-px bg-[#204CE5]" />
            {t("mission.badge")}
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] leading-[1.1]">
            {t("mission.titleLine1")}
            <br />
            <span className="text-[#204CE5]">{t("mission.titleLine2")}</span>
          </h2>

          <p className="mt-8 text-xl text-[#686E77] leading-relaxed max-w-3xl">
            {t("mission.description", { years: STATS.yearsExperience })}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Story Section - Asymmetric Layout
function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("aboutPage");

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#F8F9FA]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Image Column - 7 cols */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="relative aspect-[4/3] lg:aspect-[16/12] overflow-hidden rounded-2xl lg:rounded-3xl"
            >
              <Image
                src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
                alt="Erfgoedrenovatie Justitiepaleis Dendermonde"
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#112337]/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl">
                <div className="text-2xl font-bold text-[#112337]">1930</div>
                <div className="text-xs text-[#686E77] uppercase tracking-wider">{t("stats.founded")}</div>
              </div>
            </motion.div>
          </div>

          {/* Content Column - overlapping */}
          <div className="lg:col-span-5 lg:pl-0 lg:pr-12 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-12 lg:-ml-24 lg:relative lg:z-10 shadow-xl lg:shadow-2xl"
            >
              <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
                <span className="w-8 h-px bg-[#204CE5]" />
                {t("story.badge")}
              </span>

              <h3 className="text-3xl lg:text-4xl font-bold text-[#112337] leading-tight mb-6">
                {t("story.title", { years: STATS.yearsExperience })}
              </h3>

              <div className="space-y-4 text-[#686E77] leading-relaxed">
                <p>{t("story.paragraph1", { employees: STATS.employees })}</p>
                <p>{t("story.paragraph2")}</p>
                <p>{t("story.paragraph3")}</p>
              </div>

              {/* Certifications */}
              <div className="mt-8 pt-8 border-t border-[#E5E7EB] flex flex-wrap gap-4">
                {CERTIFICATIONS.filter(c => c.prominent).slice(0, 3).map((cert) => (
                  <div key={cert.id} className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#204CE5]" />
                    <span className="text-sm font-semibold text-[#112337]">{cert.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Timeline Section
function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("aboutPage");

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            <span className="w-12 h-px bg-[#204CE5]" />
            {t("timeline.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#112337] leading-[1.1]">
            {t("timeline.title")} <span className="text-[#204CE5]">{t("timeline.titleAccent")}</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-[#204CE5]/20 via-[#204CE5]/40 to-[#204CE5]/20 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TIMELINE_YEARS.map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Dot */}
                <div className="hidden lg:flex justify-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-[#204CE5] ring-4 ring-white relative z-10" />
                </div>

                {/* Card */}
                <div className="bg-[#F8F9FA] rounded-2xl p-6 group-hover:bg-[#112337] transition-all duration-500">
                  <div className="text-3xl lg:text-4xl font-bold text-[#204CE5] group-hover:text-white transition-colors mb-2">
                    {year}
                  </div>
                  <div className="text-lg font-bold text-[#112337] group-hover:text-white transition-colors mb-2">
                    {t(`timeline.items.${year}.title`)}
                  </div>
                  <p className="text-sm text-[#686E77] group-hover:text-white/70 transition-colors leading-relaxed">
                    {t(`timeline.items.${year}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("aboutPage");

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#112337] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#204CE5] blur-[150px]" />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            {t("values.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            {t("values.title")} <span className="text-[#204CE5]">{t("values.titleAccent")}</span>
          </h2>
        </motion.div>

        {/* Values List - Numbered style for 5 V's */}
        <div className="space-y-0 border-t border-white/10">
          {VALUE_KEYS.map((key, index) => {
            const Icon = VALUE_ICONS[index];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border-b border-white/10"
              >
                <div className="py-8 sm:py-10 flex items-start gap-6 sm:gap-10">
                  {/* Number */}
                  <span className="text-5xl sm:text-6xl font-bold text-[#204CE5] leading-none min-w-[60px] sm:min-w-[80px]">
                    {index + 1}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#204CE5]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-6 h-6 text-[#204CE5]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#204CE5] transition-colors duration-300">
                      {t(`values.items.${key}.title`)}
                    </h3>
                    <p className="mt-3 text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
                      {key === "trust"
                        ? t(`values.items.${key}.description`, { years: STATS.yearsExperience })
                        : t(`values.items.${key}.description`)
                      }
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const teamCount = useAnimatedCounter(parseInt(STATS.employees, 10), isInView);
  const t = useTranslations("aboutPage");

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#F8F9FA]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-12 h-px bg-[#204CE5]" />
              {t("team.badge")}
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#112337] leading-[1.1] mb-6">
              {t("team.title")} <span className="text-[#204CE5]">{t("team.titleAccent")}</span>
            </h2>

            <p className="text-lg text-[#686E77] leading-relaxed mb-8">
              {t("team.description", { employees: STATS.employees })}
            </p>

            <ul className="space-y-4 mb-10">
              {TEAM_FEATURE_KEYS.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0" />
                  <span className="text-[#112337]">{t(`team.features.${key}`)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/werken-bij"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-[0_20px_40px_rgba(32,76,229,0.3)]"
              >
                {t("team.viewVacancies")}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-[#112337] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#112337] hover:text-white border border-[#E5E7EB]"
              >
                {t("team.contactUs")}
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src="/images/original-site/IMG_20230615_0957592-ps-scaled.jpg"
                alt="Team De Raedt"
                fill
                className="object-cover"
              />
            </div>
            {/* Stats badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#112337] text-white p-6 rounded-2xl shadow-2xl">
              <div className="text-4xl font-bold tabular-nums">{teamCount}<span className="text-[#204CE5]">+</span></div>
              <div className="text-sm text-[#204CE5] uppercase tracking-wider">{t("stats.craftsmen")}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("aboutPage");

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#112337] to-[#1E3A5A] p-12 sm:p-16 lg:p-20 rounded-3xl overflow-hidden text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#204CE5] blur-[100px]" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-8 h-px bg-[#204CE5]" />
              {t("cta.badge")}
              <span className="w-8 h-px bg-[#204CE5]" />
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("cta.title")} <span className="text-[#204CE5]">{t("cta.titleAccent")}</span>?
            </h2>
            <p className="text-white/50 leading-relaxed max-w-xl mx-auto mb-10 text-lg">
              {t("cta.description")}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#4D6FEB] hover:shadow-[0_20px_40px_rgba(32,76,229,0.4)]"
              >
                {t("cta.startProject")}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 border border-white/10"
              >
                {t("cta.contactUs")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function OverOnsPage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <StorySection />
      <TimelineSection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </>
  );
}
