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
              <div className="text-6xl lg:text-7xl font-bold leading-none">
                {STATS.yearsExperience}<span className="text-[#204CE5]">+</span>
              </div>
              <div className="mt-2 text-xs text-white/60 uppercase tracking-wider">
                Jaar Ervaring
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-2xl font-bold text-[#204CE5]">
                  {COMPANY.founded}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  Opgericht
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
            <span className="label-overline">Over Ons</span>

            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] leading-tight">
              Vakmanschap
              <br />
              <span className="text-[#204CE5]">sinds 1930</span>
            </h2>

            <p className="mt-8 text-lg text-[#686E77] leading-relaxed max-w-xl">
              Al {STATS.yearsExperience} jaar bouwt De Raedt mee aan de toekomst van België.
              Als warm familiebedrijf combineren wij traditioneel vakmanschap met
              innovatieve technieken — van erfgoedrenovatie tot moderne nieuwbouw.
            </p>

            {/* The 5 V's */}
            <div className="mt-12">
              <div className="text-sm text-[#686E77] font-semibold mb-6">
                Onze Kernwaarden — De 5 V&apos;s
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VALUES.map((value, index) => (
                  <motion.div
                    key={value.word}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-[#F5F5F5] hover:bg-[#204CE5]/5 transition-colors duration-300"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#204CE5]/10 text-[#204CE5] text-sm font-bold transition-all duration-300 group-hover:bg-[#204CE5] group-hover:text-white">
                      {value.letter}
                    </span>
                    <div>
                      <span className="block text-sm font-semibold text-[#112337] group-hover:text-[#204CE5] transition-colors">
                        {value.word}
                      </span>
                      <span className="text-xs text-[#686E77] mt-0.5 block">
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
              className="mt-12"
            >
              <Link
                href="/over-ons"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
              >
                <span>Ontdek ons verhaal</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
