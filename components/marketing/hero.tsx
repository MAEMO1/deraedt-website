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
        <div className="container-wide pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Familiale aannemer sinds 1930
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight"
            >
              Bouwen aan de
              <br />
              <span className="text-[#204CE5]">toekomst</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 text-xl text-white/70 max-w-xl leading-relaxed"
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
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/projectplanner"
                className="inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
              >
                Start uw project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/20"
              >
                <Play className="w-5 h-5" />
                Bekijk projecten
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 flex items-center gap-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#112337] flex items-center justify-center text-white text-xs font-bold"
                  >
                    {i === 4 ? "+" : ""}
                  </div>
                ))}
              </div>
              <div className="text-white/60 text-sm">
                <span className="text-white font-semibold">Actief sinds 1930</span>
              </div>
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
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: STATS.yearsExperience, suffix: "+", label: "Jaar ervaring" },
              { value: "3", suffix: "x", label: "Gecertificeerd" },
              { value: "40", suffix: "+", label: "Medewerkers" },
              { value: "6", suffix: "", label: "Klasse erkenning" },
            ].map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "md:border-l md:border-gray-200 md:pl-8" : ""}>
                <div className="text-4xl sm:text-5xl font-bold text-[#112337]">
                  {stat.value}<span className="text-[#204CE5]">{stat.suffix}</span>
                </div>
                <div className="mt-1 text-sm text-[#686E77]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
