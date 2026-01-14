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
    color: "#1E3A5F",
  },
  {
    id: "vca",
    name: "VCA**",
    fullName: "VCA** Petrochemie",
    description: "Veiligheid, Gezondheid & Milieu",
    icon: BadgeCheck,
    color: "#2C5282",
  },
  {
    id: "klasse6",
    name: "Klasse 6",
    fullName: "Erkenning Klasse 6",
    description: "Overheidsopdrachten tot onbeperkt",
    icon: Award,
    color: "#4299E1",
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
      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#1E3A5F]/5 hover:border-[#4299E1]/20 hover:-translate-y-1">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
            style={{ backgroundColor: certification.color }}
          />
        </div>

        {/* Verified badge indicator */}
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>

        {/* Icon */}
        <div
          className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${certification.color}10` }}
        >
          <Icon
            className="w-7 h-7 transition-colors duration-300"
            style={{ color: certification.color }}
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1E3A5F]">
              {certification.name}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-[#4299E1]">
            {certification.fullName}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {certification.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 origin-left"
          style={{ backgroundColor: certification.color }}
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
    <section className="relative py-24 bg-gradient-to-br from-[#0F1E2E] via-[#1E3A5F] to-[#162D47] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="cert-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cert-grid)" />
          </svg>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#4299E1]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#2C5282]/20 blur-[100px]" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#4299E1]/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4299E1]">
              Kwaliteit gegarandeerd
            </span>
            <span className="h-px w-12 bg-[#4299E1]/50" />
          </div>

          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Certificeringen &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#63B3ED] to-[#4299E1]">
              Erkenningen
            </span>
          </h2>

          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Onze certificeringen garanderen de hoogste standaarden in
            kwaliteit, veiligheid en professionaliteit.
          </p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid gap-6 md:grid-cols-3">
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
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/40"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm">Jaarlijks geauditeerd</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm">Alle certificaten actueel</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm">Continue verbetering</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
