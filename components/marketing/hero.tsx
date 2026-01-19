"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { STATS } from "@/lib/constants";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#112337]">
      {/* Background Image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
          alt="Justitiepaleis Dendermonde"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/90 via-[#112337]/70 to-[#112337]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 min-h-screen flex items-center">
        {/* pb-40 on mobile to account for stats bar, pb-32 on larger screens */}
        <div className="container-wide pt-24 sm:pt-32 pb-44 sm:pb-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8"
            >
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-pulse" />
              Familiale aannemer sinds 1930
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] sm:leading-[1.05] tracking-tight"
            >
              Bouwen aan de
              <br />
              <span className="text-white">toekomst</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
            >
              Erfgoedrenovatie, nieuwbouw en facility management.
              Al {STATS.yearsExperience} jaar uw betrouwbare partner voor
              overheidsopdrachten en complexe bouwprojecten.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Link
                href="/projectplanner"
                className="inline-flex items-center justify-center gap-3 bg-[#204CE5] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
              >
                Start uw project
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-white/20"
              >
                <Play className="w-4 sm:w-5 h-4 sm:h-5" />
                Bekijk projecten
              </Link>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 bg-white z-20"
      >
        <div className="container-wide py-5 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { value: STATS.yearsExperience, suffix: "+", label: "Jaar ervaring" },
              { value: "3", suffix: "x", label: "Gecertificeerd" },
              { value: "40", suffix: "+", label: "Medewerkers" },
              { value: "6", suffix: "", label: "Klasse erkenning" },
            ].map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "md:border-l md:border-gray-200 md:pl-8" : ""}>
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#112337]">
                  {stat.value}<span className="text-[#204CE5]">{stat.suffix}</span>
                </div>
                <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#686E77]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
