"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, Award, BadgeCheck } from "lucide-react";

const CERTIFICATIONS = [
  {
    id: "iso9001",
    name: "ISO 9001",
    fullName: "ISO 9001:2015",
    description: "Kwaliteitsmanagementsysteem",
    icon: Shield,
  },
  {
    id: "vca",
    name: "VCA**",
    fullName: "VCA** Petrochemie",
    description: "Veiligheid, Gezondheid & Milieu",
    icon: BadgeCheck,
  },
  {
    id: "klasse6",
    name: "Klasse 6",
    fullName: "Erkenning Klasse 6",
    description: "Overheidsopdrachten tot onbeperkt",
    icon: Award,
  },
];

function CertificationBadge({
  certification,
  index,
}: {
  certification: (typeof CERTIFICATIONS)[number];
  index: number;
}) {
  const Icon = certification.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden bg-white border border-[#0C0C0C]/5 p-8 transition-all duration-500 hover:shadow-xl hover:border-[#9A6B4C]/20 hover:-translate-y-1">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#9A6B4C]/5 transition-opacity duration-300 group-hover:bg-[#9A6B4C]/10" />
        </div>

        {/* Verified badge indicator */}
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>

        {/* Icon */}
        <div className="relative w-14 h-14 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C] transition-all duration-300 group-hover:bg-[#9A6B4C] group-hover:text-white group-hover:scale-110">
          <Icon className="w-7 h-7" />
        </div>

        {/* Content */}
        <div className="mt-6">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-[#0C0C0C]">
              {certification.name}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-[#9A6B4C]">
            {certification.fullName}
          </p>
          <p className="mt-2 text-sm text-[#6B6560]">
            {certification.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#9A6B4C] origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
        />
      </div>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section className="relative py-24 bg-[#FAF7F2] overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-blueprint opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-16 left-16 w-20 h-20 border-t border-l border-[#9A6B4C]/10 hidden lg:block" />
      <div className="absolute bottom-16 right-16 w-20 h-20 border-b border-r border-[#9A6B4C]/10 hidden lg:block" />

      <div className="container-wide relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#9A6B4C]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A6B4C]">
              Kwaliteit gegarandeerd
            </span>
            <span className="h-px w-12 bg-[#9A6B4C]" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-[#0C0C0C] leading-[0.95] tracking-[-0.02em]">
            Certificeringen &{" "}
            <span className="text-[#9A6B4C]">
              Erkenningen
            </span>
          </h2>

          <p className="mt-6 text-lg text-[#6B6560] max-w-2xl mx-auto font-serif font-light">
            Onze certificeringen garanderen de hoogste standaarden in
            kwaliteit, veiligheid en professionaliteit.
          </p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationBadge
              key={cert.id}
              certification={cert}
              index={index}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[#6B6560]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">Jaarlijks geauditeerd</span>
          </div>
          <div className="h-4 w-px bg-[#0C0C0C]/10" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">Alle certificaten actueel</span>
          </div>
          <div className="h-4 w-px bg-[#0C0C0C]/10" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">Continue verbetering</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
