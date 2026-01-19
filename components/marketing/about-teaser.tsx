"use client";

import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { STATS, COMPANY } from "@/lib/constants";

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

const VALUE_KEYS = ["responsibility", "safety", "freedom", "trust", "progress"] as const;

export function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("about");
  const tCta = useTranslations("common.cta");

  // Animated counters for the floating card
  const yearsCount = useAnimatedCounter(STATS.yearsExperience, isInView);
  const foundedCount = useAnimatedCounter(COMPANY.founded, isInView, 2.5);

  return (
    <section ref={ref} className="section-spacing bg-white overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/original-site/team-photo-max.jpg"
                alt="De Raedt team"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating experience card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-8 -right-4 lg:-right-12 bg-[#112337] text-white p-8 rounded-2xl shadow-2xl"
            >
              <div className="text-6xl lg:text-7xl font-bold leading-none tabular-nums">
                {yearsCount}<span className="text-[#204CE5]">+</span>
              </div>
              <div className="mt-2 text-xs text-white/60 uppercase tracking-wider">
                {t("yearsExperience")}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-2xl font-bold text-[#204CE5] tabular-nums">
                  {foundedCount}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  {t("activeSince")}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-overline">{t("title")}</span>

            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] leading-tight">
              {t("subtitle")}
            </h2>

            <p className="mt-8 text-lg text-[#686E77] leading-relaxed max-w-xl">
              {t("description", { years: STATS.yearsExperience })}
            </p>

            {/* The 5 V's */}
            <div className="mt-12">
              <div className="text-sm text-[#686E77] font-semibold mb-6">
                {t("coreValuesTitle")}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VALUE_KEYS.map((valueKey, index) => (
                  <motion.div
                    key={valueKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-[#F5F5F5] hover:bg-[#204CE5]/5 transition-colors duration-300"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#204CE5]/10 text-[#204CE5] text-sm font-bold transition-all duration-300 group-hover:bg-[#204CE5] group-hover:text-white">
                      V
                    </span>
                    <div>
                      <span className="block text-sm font-semibold text-[#112337] group-hover:text-[#204CE5] transition-colors">
                        {t(`values.${valueKey}.title`)}
                      </span>
                      <span className="text-xs text-[#686E77] mt-0.5 block">
                        {t(`values.${valueKey}.description`)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12"
            >
              <Link
                href="/over-ons"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
              >
                <span>{tCta("discoverStory")}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
