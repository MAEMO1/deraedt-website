"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { STATS, COMPANY } from "@/lib/constants";

const VALUES = [
  { letter: "V", word: "Verantwoordelijkheid", description: "Wij staan garant voor kwaliteit" },
  { letter: "V", word: "Veiligheid", description: "VCA** gecertificeerd" },
  { letter: "V", word: "Vrijheid", description: "Ruimte voor creativiteit" },
  { letter: "V", word: "Vertrouwen", description: "Transparante communicatie" },
  { letter: "V", word: "Vooruitgang", description: "Continue innovatie" },
];

export function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 sm:py-40 bg-white overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-blueprint opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-t border-r border-[#9A6B4C]/10 hidden lg:block" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border-b border-l border-[#9A6B4C]/10 hidden lg:block" />

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 relative">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/original-site/team-photo-max.jpg"
                alt="De Raedt team"
                fill
                className="object-cover"
              />
              {/* Subtle warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/30 to-transparent" />
            </div>

            {/* Floating experience card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-10 -right-6 lg:-right-16 bg-white p-10 shadow-2xl border border-[#0C0C0C]/5"
            >
              <div className="text-7xl lg:text-8xl font-display text-[#0C0C0C] leading-none">
                {STATS.yearsExperience}
              </div>
              <div className="mt-3 text-xs text-[#6B6560] uppercase tracking-[0.2em] font-medium">
                Jaar Erfgoed
              </div>
              <div className="mt-6 pt-6 border-t border-[#0C0C0C]/10">
                <div className="text-3xl font-display text-[#9A6B4C]">
                  {COMPANY.founded}
                </div>
                <div className="text-[10px] text-[#6B6560] uppercase tracking-[0.15em]">
                  Opgericht
                </div>
              </div>
            </motion.div>

            {/* Corner accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-8 left-8 w-20 h-20"
            >
              <div className="w-12 h-12 border-t border-l border-[#9A6B4C]/40" />
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Overline */}
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-16 bg-[#9A6B4C] origin-left"
              />
              <span className="text-[#9A6B4C] text-xs font-semibold tracking-[0.3em] uppercase">
                Over Ons
              </span>
            </div>

            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#0C0C0C] leading-[0.95] tracking-[-0.02em]">
              Vakmanschap
              <br />
              <span className="text-[#9A6B4C]">sinds 1930</span>
            </h2>

            <p className="mt-10 text-lg text-[#6B6560] leading-relaxed max-w-xl font-serif font-light">
              Al {STATS.yearsExperience} jaar bouwt De Raedt mee aan de toekomst van België.
              Als warm familiebedrijf combineren wij traditioneel vakmanschap met
              innovatieve technieken — van erfgoedrenovatie tot moderne nieuwbouw.
            </p>

            {/* The 5 V's */}
            <div className="mt-14">
              <div className="text-[11px] text-[#6B6560] uppercase tracking-[0.2em] mb-6 font-medium">
                Onze Kernwaarden — De 5 V&apos;s
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VALUES.map((value, index) => (
                  <motion.div
                    key={value.word}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-start gap-4 py-4 border-b border-[#0C0C0C]/5 hover:border-[#9A6B4C]/30 transition-colors duration-500"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C] text-sm font-semibold transition-all duration-500 group-hover:bg-[#9A6B4C] group-hover:text-white">
                      {value.letter}
                    </span>
                    <div>
                      <span className="block text-sm font-medium text-[#0C0C0C] group-hover:text-[#9A6B4C] transition-colors">
                        {value.word}
                      </span>
                      <span className="text-xs text-[#6B6560] mt-0.5 block">
                        {value.description}
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
              className="mt-14"
            >
              <Link
                href="/over-ons"
                className="group inline-flex items-center gap-4"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6B6560] group-hover:text-[#9A6B4C] transition-colors duration-500">
                  Ontdek Ons Verhaal
                </span>
                <div className="flex items-center justify-center w-12 h-12 border border-[#0C0C0C]/10 text-[#6B6560] transition-all duration-500 group-hover:bg-[#9A6B4C] group-hover:border-[#9A6B4C] group-hover:text-white">
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
