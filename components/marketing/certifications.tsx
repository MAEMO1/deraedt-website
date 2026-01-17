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
      <div className="relative overflow-hidden bg-white rounded-xl p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        {/* Verified badge indicator */}
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#204CE5]/10 text-[#204CE5] transition-all duration-300 group-hover:bg-[#204CE5] group-hover:text-white">
          <Icon className="w-7 h-7" />
        </div>

        {/* Content */}
        <div className="mt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#112337]">
              {certification.name}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-[#204CE5]">
            {certification.fullName}
          </p>
          <p className="mt-2 text-sm text-[#686E77]">
            {certification.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#204CE5] origin-left rounded-b-xl"
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
    <section className="section-spacing bg-[#F5F5F5]">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="label-overline">Kwaliteit</span>

          <h2 className="mt-4 heading-lg">
            Certificeringen &{" "}
            <span className="text-[#204CE5]">Erkenningen</span>
          </h2>

          <p className="mt-4 text-lg text-[#686E77] max-w-2xl mx-auto">
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
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[#686E77]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">Jaarlijks geauditeerd</span>
          </div>
          <div className="h-4 w-px bg-[#112337]/10" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">Alle certificaten actueel</span>
          </div>
          <div className="h-4 w-px bg-[#112337]/10" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">Continue verbetering</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
