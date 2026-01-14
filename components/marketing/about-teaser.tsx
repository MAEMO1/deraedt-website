"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Clock, Building, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS, COMPANY } from "@/lib/constants";
import { useRef } from "react";

// The 5 V's - core values from De Raedt's original website
const VALUES = [
  { letter: "V", word: "Verantwoordelijkheid", color: "#1E3A5F" },
  { letter: "V", word: "Veiligheid", color: "#2C5282" },
  { letter: "V", word: "Vrijheid", color: "#3182CE" },
  { letter: "V", word: "Vertrouwen", color: "#4299E1" },
  { letter: "V", word: "Vooruitgang", color: "#63B3ED" },
];

function AnimatedValue({
  value,
  index,
}: {
  value: (typeof VALUES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex items-center gap-3"
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: value.color }}
      >
        {value.letter}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-[#1E3A5F] transition-colors">
        {value.word}
      </span>
    </motion.div>
  );
}

function TimelineVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const milestones = [
    { year: "1930", label: "Oprichting" },
    { year: "1960", label: "Groei" },
    { year: "1990", label: "ISO Certificering" },
    { year: "2024", label: "Vandaag" },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Main visual container with team photo */}
      <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-3xl">
        {/* Team collage background image */}
        <Image
          src="/images/original-site/team-collage.jpg"
          alt="De Raedt team"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1E2E]/90 via-[#1E3A5F]/80 to-[#2C5282]/70" />

        {/* Background patterns */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="about-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
        </div>

        {/* Central content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div
              className="text-[7rem] lg:text-[9rem] font-light text-white leading-none drop-shadow-lg"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {STATS.yearsExperience}
            </div>
            <div className="mt-2 text-xl text-white/90 font-medium tracking-wide">
              Jaar Bouwtraditie
            </div>
          </motion.div>

          {/* Decorative ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-12 rounded-full border border-white/20"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute inset-16 rounded-full border border-white/10"
          />
        </div>

        {/* Timeline along the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/30 to-transparent">
          <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#4299E1] to-[#63B3ED] origin-left"
            />
          </div>
          <div className="mt-4 flex justify-between text-xs text-white/70">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-bold text-white">{milestone.year}</div>
                <div className="mt-1">{milestone.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating stats card */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: 20 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#4299E1] text-white">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1E3A5F]">500+</div>
            <div className="text-sm text-gray-500">Projecten voltooid</div>
          </div>
        </div>
      </motion.div>

      {/* Family business badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, x: -20 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute -top-4 -right-4 rounded-2xl bg-white p-4 shadow-xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EBF4FF] text-[#1E3A5F]">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#1E3A5F]">
              Familiebedrijf
            </div>
            <div className="text-xs text-gray-500">Sinds 1930</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function AboutTeaser() {
  return (
    <section className="relative section-padding bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#4299E1]/5 blur-[100px] pointer-events-none" />

      <div className="container-custom relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:pr-8"
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-[#4299E1]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4299E1]">
                Over Ons
              </span>
            </div>

            <h2 className="text-4xl font-bold text-[#1E3A5F] md:text-5xl leading-tight">
              Bouwen met{" "}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#4299E1]">
                  verantwoordelijkheid
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-1 left-0 h-3 bg-[#4299E1]/10 -z-0"
                />
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Sinds {COMPANY.founded} bouwt De Raedt mee aan de toekomst van
              België. Als{" "}
              <span className="font-semibold text-[#1E3A5F]">
                warm familiebedrijf
              </span>{" "}
              combineren wij traditioneel vakmanschap met innovatieve technieken
              in bouw, renovatie en facility management.
            </p>

            {/* The 5 V's - Core Values */}
            <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-[#1E3A5F]">
                  Onze 5 V&apos;s
                </span>
                <span className="text-xs text-gray-500">— Kernwaarden</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {VALUES.map((value, index) => (
                  <AnimatedValue key={value.word} value={value} index={index} />
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF4FF] text-[#1E3A5F]">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1E3A5F]">
                    {STATS.yearsExperience}
                  </div>
                  <div className="text-sm text-gray-500">Jaar ervaring</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF4FF] text-[#1E3A5F]">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1E3A5F]">
                    {STATS.employees}
                  </div>
                  <div className="text-sm text-gray-500">Vakmannen</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="group bg-[#1E3A5F] hover:bg-[#2C5282]"
              >
                <Link href="/over-ons">
                  Ontdek ons verhaal
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <TimelineVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
