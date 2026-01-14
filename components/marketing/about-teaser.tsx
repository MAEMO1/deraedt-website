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
    <section ref={ref} className="relative py-32 sm:py-40 bg-[#08111C] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Decorative circles */}
      <div className="absolute -right-64 top-1/4 w-[600px] h-[600px] rounded-full border border-white/[0.03]" />
      <div className="absolute -right-48 top-1/4 w-[400px] h-[400px] rounded-full border border-white/[0.02]" />

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
                className="object-cover image-elegant"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08111C]/40 to-transparent" />
            </div>

            {/* Floating experience card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-10 -right-6 lg:-right-16 bg-[#FAF8F5] p-10 shadow-2xl"
            >
              <div className="text-7xl lg:text-8xl font-display font-semibold text-[#08111C] leading-none">
                {STATS.yearsExperience}
              </div>
              <div className="mt-3 text-xs text-[#08111C]/50 uppercase tracking-[0.2em] font-medium">
                Jaar Erfgoed
              </div>
              <div className="mt-6 pt-6 border-t border-[#08111C]/10">
                <div className="text-3xl font-display font-semibold text-[#C9A227]">
                  {COMPANY.founded}
                </div>
                <div className="text-[10px] text-[#08111C]/40 uppercase tracking-[0.15em]">
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
              <div className="w-12 h-12 border-t border-l border-[#C9A227]/40" />
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
                className="h-px w-16 bg-[#C9A227] origin-left"
              />
              <span className="text-[#C9A227] text-xs font-medium tracking-[0.3em] uppercase">
                Over Ons
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading tracking-[0.02em] text-white leading-none">
              VAKMANSCHAP
              <br />
              <span className="text-gradient-gold">SINDS 1930</span>
            </h2>

            <p className="mt-10 text-lg text-white/50 leading-relaxed max-w-xl">
              Al {STATS.yearsExperience} jaar bouwt De Raedt mee aan de toekomst van België.
              Als warm familiebedrijf combineren wij traditioneel vakmanschap met
              innovatieve technieken — van erfgoedrenovatie tot moderne nieuwbouw.
            </p>

            {/* The 5 V's */}
            <div className="mt-14">
              <div className="text-[11px] text-white/30 uppercase tracking-[0.2em] mb-6 font-medium">
                Onze Kernwaarden — De 5 V's
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VALUES.map((value, index) => (
                  <motion.div
                    key={value.word}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-start gap-4 py-4 border-b border-white/[0.06] hover:border-[#C9A227]/30 transition-colors duration-500"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#C9A227]/10 text-[#C9A227] text-sm font-semibold transition-all duration-500 group-hover:bg-[#C9A227] group-hover:text-[#08111C]">
                      {value.letter}
                    </span>
                    <div>
                      <span className="block text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        {value.word}
                      </span>
                      <span className="text-xs text-white/30 mt-0.5 block">
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
                <span className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60 group-hover:text-white transition-colors duration-500">
                  Ontdek Ons Verhaal
                </span>
                <div className="flex items-center justify-center w-12 h-12 border border-white/20 text-white/60 transition-all duration-500 group-hover:bg-[#C9A227] group-hover:border-[#C9A227] group-hover:text-[#08111C]">
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
