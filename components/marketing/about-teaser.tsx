"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { STATS, COMPANY } from "@/lib/constants";

const VALUES = [
  { letter: "V", word: "Verantwoordelijkheid" },
  { letter: "V", word: "Veiligheid" },
  { letter: "V", word: "Vrijheid" },
  { letter: "V", word: "Vertrouwen" },
  { letter: "V", word: "Vooruitgang" },
];

export function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#0A1628] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/original-site/team-photo-max.jpg"
                alt="De Raedt team"
                fill
                className="object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/30 to-transparent" />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 lg:-right-12 bg-white p-8 shadow-2xl"
            >
              <div className="text-6xl font-display font-semibold text-[#0A1628]">
                {STATS.yearsExperience}
              </div>
              <div className="mt-2 text-sm text-[#0A1628]/60 uppercase tracking-wider">
                Jaar Ervaring
              </div>
              <div className="mt-4 pt-4 border-t border-[#0A1628]/10">
                <div className="text-2xl font-display font-semibold text-[#B8860B]">
                  {COMPANY.founded}
                </div>
                <div className="text-xs text-[#0A1628]/50 uppercase tracking-wider">
                  Opgericht
                </div>
              </div>
            </motion.div>

            {/* Corner accent */}
            <div className="absolute top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-white/20" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Overline */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#B8860B]" />
              <span className="text-[#B8860B] text-sm font-medium tracking-[0.2em] uppercase">
                Over Ons
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-tight">
              Een familiebedrijf met{" "}
              <span className="text-[#B8860B]">traditie</span>
            </h2>

            <p className="mt-8 text-lg text-white/60 leading-relaxed">
              Sinds {COMPANY.founded} bouwt De Raedt mee aan de toekomst van België.
              Als warm familiebedrijf combineren wij traditioneel vakmanschap met
              innovatieve technieken in bouw, renovatie en facility management.
            </p>

            {/* The 5 V's */}
            <div className="mt-10">
              <div className="text-sm text-white/40 uppercase tracking-wider mb-4">
                Onze Kernwaarden — De 5 V's
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {VALUES.map((value, index) => (
                  <motion.div
                    key={value.word}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 py-2"
                  >
                    <span className="flex h-8 w-8 items-center justify-center bg-[#B8860B]/20 text-[#B8860B] text-sm font-bold">
                      {value.letter}
                    </span>
                    <span className="text-sm text-white/70">{value.word}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <Link
                href="/over-ons"
                className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 font-semibold transition-all duration-300 hover:bg-white hover:text-[#0A1628]"
              >
                <span>Ontdek Ons Verhaal</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
