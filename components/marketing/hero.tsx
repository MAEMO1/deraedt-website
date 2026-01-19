"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowRight, Play, Shield, Award, Leaf } from "lucide-react";
import { STATS } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { useRef, useEffect, useState } from "react";

// Animated counter for stats panel
function AnimatedStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl font-bold text-[#112337]"
      >
        {displayValue}{suffix}
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

export function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("common.cta");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-[#112337] overflow-hidden">
      {/* Background with parallax */}
      <motion.div style={{ y: heroImageY }} className="absolute inset-0">
        <Image
          src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
          alt="Justitiepaleis Dendermonde"
          fill
          className="object-cover opacity-50"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/95 via-[#112337]/80 to-[#112337]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-[#112337]/40" />
      </motion.div>

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full">
        <div className="container-wide pt-32 sm:pt-40 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
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
                  {t("badges.klasse6")}
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4 text-[#204CE5]" />
                  {t("badges.iso9001")}
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Leaf className="w-4 h-4 text-[#204CE5]" />
                  {t("badges.co2")}
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-[#204CE5]/20 border border-[#204CE5]/30 text-[#204CE5] px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-[#204CE5] rounded-full animate-pulse" />
                {t("badge")}
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              >
                {t("headline")}
                <br />
                <span className="text-[#204CE5]">{t("headlineAccent")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 max-w-lg text-lg text-white/60 leading-relaxed"
              >
                {t("subtitle", { years: STATS.yearsExperience })}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4"
              >
                <Link
                  href="/projectplanner"
                  className="group inline-flex items-center justify-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
                >
                  <span>{tCta("startProject")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projecten"
                  className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/20 border border-white/10"
                >
                  <Play className="w-4 h-4" />
                  <span>{tCta("viewProjects")}</span>
                </Link>
              </motion.div>
            </div>

            {/* Right side - Stats panel (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-10 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <AnimatedStat value={STATS.yearsExperience} label={t("stats.yearsExperience")} />
                  <AnimatedStat value={6} label={t("stats.classRecognition")} />
                  <AnimatedStat value={STATS.employeesExact} suffix="+" label={t("stats.employees")} />
                  <AnimatedStat value={3} suffix="x" label={t("stats.certified")} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile stats - shows below hero content on mobile */}
      <div className="lg:hidden relative z-10 pb-8">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-white rounded-xl p-6 shadow-xl"
          >
            <div className="grid grid-cols-2 gap-6">
              <AnimatedStat value={STATS.yearsExperience} label={t("stats.yearsExperience")} />
              <AnimatedStat value={6} label={t("stats.classRecognition")} />
              <AnimatedStat value={STATS.employeesExact} suffix="+" label={t("stats.employees")} />
              <AnimatedStat value={3} suffix="x" label={t("stats.certified")} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
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
  );
}
