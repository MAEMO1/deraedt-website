"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Shield,
  Award,
  Leaf,
  FileCheck,
  Building2,
  CheckCircle,
  ArrowRight,
  Download,
  Phone,
  Mail,
  Calendar,
  Zap,
} from "lucide-react";
import {
  COMPANY,
  STATS,
  CERTIFICATIONS,
  RAAMCONTRACTEN,
  KEY_CLIENTS,
  PROCUREMENT_USPS,
} from "@/lib/constants";

const certificationIcons: Record<string, typeof Shield> = {
  klasse6: Shield,
  iso9001: Award,
  vca: FileCheck,
  co2: Leaf,
};

// Animated counter for stats
function AnimatedStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#0C0C0C] tracking-tight"
      >
        {isInView ? value : 0}{suffix}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-3 text-[10px] text-[#6B6560] uppercase tracking-[0.2em]"
      >
        {label}
      </motion.div>
    </div>
  );
}

export default function ProcurementPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const raamcontractenRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const isCertsInView = useInView(certsRef, { once: true, margin: "-100px" });
  const isRaamcontractenInView = useInView(raamcontractenRef, { once: true, margin: "-100px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section - Light Editorial Style */}
      <section ref={heroRef} className="relative min-h-screen bg-[#FAF7F2] overflow-hidden">
        {/* Background with parallax */}
        <motion.div style={{ y: heroImageY }} className="absolute inset-0">
          <Image
            src="/images/original-site/Foto-Stadhuis-Brussel.png"
            alt="Stadhuis Brussel - Overheidsopdracht"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Light warm overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/85 to-[#FAF7F2]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-[#FAF7F2]/50" />
        </motion.div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-blueprint opacity-30" />

        {/* Geometric accents */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-32 right-16 w-40 h-40 border-t border-r border-[#9A6B4C]/20 hidden lg:block"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-0 w-px h-32 bg-gradient-to-b from-transparent via-[#9A6B4C]/30 to-transparent origin-top hidden lg:block"
          />
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full">
          <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pt-40 pb-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
              {/* Left content */}
              <div>
                {/* Trust badges - horizontal strip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-wrap gap-3 mb-10"
                >
                  <div className="flex items-center gap-2 bg-[#9A6B4C] text-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#9A6B4C]/15">
                    <Shield className="w-4 h-4" strokeWidth={2} />
                    Klasse 6
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#0C0C0C]/5 text-[#0C0C0C] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] shadow-sm">
                    <Leaf className="w-4 h-4 text-[#9A6B4C]" strokeWidth={1.5} />
                    CO2-Niveau 3
                  </div>
                </motion.div>

                {/* Overline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px w-16 bg-[#9A6B4C] origin-left"
                  />
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9A6B4C]">
                    Voor Overheden & Facility Managers
                  </span>
                </motion.div>

                {/* Headline */}
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#0C0C0C] leading-[0.9] tracking-[-0.03em]"
                  >
                    Procurement
                  </motion.h1>
                </div>
                <div className="overflow-hidden mt-2">
                  <motion.h1
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-[-0.03em] text-[#9A6B4C]"
                  >
                    Hub
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="mt-10 max-w-lg text-lg sm:text-xl text-[#6B6560] leading-relaxed font-serif font-light"
                >
                  Alle documentatie voor aanbestedingen, preselecties en
                  raamcontracten — georganiseerd, actueel en in een klik beschikbaar.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <a
                    href="#certificaten"
                    className="group inline-flex items-center gap-4 bg-[#9A6B4C] text-white px-8 py-5 font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/15"
                  >
                    <span>Bekijk certificaten</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <Link
                    href="/procurement/documentatie"
                    className="group inline-flex items-center gap-4 border-2 border-[#0C0C0C]/10 text-[#0C0C0C] px-8 py-5 font-medium text-sm tracking-wide transition-all duration-500 hover:border-[#9A6B4C] hover:text-[#9A6B4C]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tender Pack</span>
                  </Link>
                </motion.div>
              </div>

              {/* Right side - Stats panel */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden lg:block"
              >
                <div className="bg-white border border-[#0C0C0C]/5 p-10 shadow-sm">
                  <div className="grid grid-cols-2 gap-10">
                    <AnimatedStat value={STATS.yearsExperience} label="Jaar ervaring" />
                    <AnimatedStat value={15} suffix="+" label="Raamcontracten" />
                    <AnimatedStat value={STATS.employeesExact} label="Medewerkers" />
                    <AnimatedStat value={6} label="Klasse erkenning" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border border-[#0C0C0C]/20 rounded-full flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-[#9A6B4C] rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* USP Strip */}
      <section className="bg-white border-y border-[#0C0C0C]/5">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCUREMENT_USPS.map((usp, index) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                  <Zap className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-semibold text-[#0C0C0C]">{usp.title}</div>
                  <div className="mt-1 text-sm text-[#6B6560]">{usp.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section - Editorial Grid */}
      <section id="certificaten" ref={certsRef} className="py-32 bg-[#FAF7F2] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-blueprint opacity-30" />

        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative">
          {/* Section header */}
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-16 bg-[#9A6B4C]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9A6B4C]">
                Certificeringen & Erkenningen
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0C0C0C] leading-[0.95] tracking-[-0.02em]">
              Volledig gecertificeerd voor uw aanbestedingen
            </h2>
            <p className="mt-6 text-lg text-[#6B6560] font-serif font-light leading-relaxed">
              Al onze certificaten en erkenningen zijn actueel en direct beschikbaar
              voor opname in uw aanbestedingsdossier.
            </p>
          </motion.header>

          {/* Certification cards - Bento grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, index) => {
              const Icon = certificationIcons[cert.id] || Award;
              return (
                <motion.article
                  key={cert.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`group relative bg-white border border-[#0C0C0C]/5 p-8 transition-all duration-500 hover:border-[#9A6B4C]/30 hover:shadow-xl ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  {/* Top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9A6B4C] to-[#9A6B4C]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start justify-between mb-6">
                    <div className={`flex items-center justify-center text-[#9A6B4C] ${index === 0 ? "w-16 h-16" : "w-12 h-12"} bg-[#9A6B4C]/10`}>
                      <Icon className={index === 0 ? "w-8 h-8" : "w-6 h-6"} strokeWidth={1.5} />
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>

                  <h3 className={`font-display text-[#0C0C0C] ${index === 0 ? "text-3xl" : "text-xl"}`}>
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#9A6B4C]">{cert.fullName}</p>
                  <p className={`mt-4 text-[#6B6560] ${index === 0 ? "text-base" : "text-sm"}`}>
                    {cert.description}
                  </p>

                  {"scope" in cert && cert.scope && (
                    <div className="mt-6 pt-6 border-t border-[#0C0C0C]/5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]/60 mb-2">Scope</div>
                      <p className="text-sm text-[#0C0C0C]/70">{cert.scope}</p>
                    </div>
                  )}

                  {"validUntil" in cert && cert.validUntil && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#6B6560]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Geldig tot: {cert.validUntil}</span>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <p className="text-sm text-[#6B6560]">
              Alle certificaten nodig voor uw aanbesteding?
            </p>
            <Link
              href="/procurement/documentatie"
              className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/15"
            >
              <Download className="w-4 h-4" />
              <span>Download Tender Pack</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Raamcontracten Section */}
      <section ref={raamcontractenRef} className="py-32 bg-white relative">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-16 bg-[#9A6B4C]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9A6B4C]">
                  Bewezen Trackrecord
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl text-[#0C0C0C] leading-[0.95] tracking-[-0.02em]">
                Actieve raamcontracten
              </h2>

              <p className="mt-8 text-[#6B6560] leading-relaxed font-serif font-light">
                Wij zijn geselecteerde partner voor langdurige raamcontracten met
                toonaangevende overheden en publieke instellingen. Deze samenwerkingen
                getuigen van consistent kwaliteitswerk.
              </p>

              <div className="mt-10 space-y-4">
                {RAAMCONTRACTEN.map((contract, index) => (
                  <motion.div
                    key={contract.client}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="group flex items-center gap-6 p-5 bg-[#FAF7F2] border-l-2 border-[#9A6B4C] hover:bg-[#9A6B4C]/5 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-[#0C0C0C]">{contract.client}</div>
                      <div className="text-sm text-[#6B6560] mt-0.5">{contract.scope}</div>
                    </div>
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.15em] font-semibold">
                      {contract.type}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Trust panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[#0C0C0C] p-12 text-white">
                <h3 className="font-display text-2xl mb-8">Vertrouwd door</h3>
                <div className="grid grid-cols-2 gap-4">
                  {KEY_CLIENTS.slice(0, 8).map((client) => (
                    <div
                      key={client.name}
                      className="text-sm text-white/60 flex items-center gap-3 py-2"
                    >
                      <CheckCircle className="w-4 h-4 text-[#9A6B4C] flex-shrink-0" />
                      {client.name}
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-center">
                  {[
                    { value: STATS.yearsExperience, label: "Jaar" },
                    { value: STATS.raamcontracten, label: "Contracten" },
                    { value: STATS.employees, label: "FTE" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display text-4xl text-white">{stat.value}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-2">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-[#9A6B4C]/30" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b border-l border-[#9A6B4C]/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-32 bg-[#FAF7F2] relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-blueprint opacity-30" />

        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9A6B4C]">
                Onze Aanpak
              </span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#0C0C0C] leading-[0.95] tracking-[-0.02em]">
              Hoe wij samenwerken
            </h2>
          </motion.header>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Intake", description: "Analyse van bestek en projectvereisten", icon: FileCheck },
              { step: "02", title: "Offerte", description: "Transparante prijsopbouw en planning", icon: Calendar },
              { step: "03", title: "Uitvoering", description: "Wekelijkse rapportage en QHSE-borging", icon: Building2 },
              { step: "04", title: "Oplevering", description: "Documentatie en garantieafhandeling", icon: CheckCircle },
            ].map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white border border-[#0C0C0C]/5 text-[#9A6B4C] mb-6 group-hover:border-[#9A6B4C]/30 group-hover:shadow-lg transition-all duration-500">
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="font-display text-5xl text-[#0C0C0C]/10 mb-3">{phase.step}</div>
                  <h3 className="font-display text-xl text-[#0C0C0C]">{phase.title}</h3>
                  <p className="mt-3 text-sm text-[#6B6560]">{phase.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Light with accent */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 grid-blueprint opacity-20" />

        {/* Decorative elements */}
        <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-[#9A6B4C]/10 hidden lg:block" />
        <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-[#9A6B4C]/10 hidden lg:block" />

        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A6B4C]">
                Neem contact op
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-[#0C0C0C] leading-[0.95] tracking-[-0.02em]"
            >
              Klaar voor een <span className="text-[#9A6B4C]">kennismaking</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg text-[#6B6560] leading-relaxed font-serif font-light"
            >
              Neem contact op voor een vrijblijvend gesprek over uw aanbestedingen,
              raamcontracten of facility management behoeften.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact?subject=raamcontract"
                className="group inline-flex items-center gap-4 bg-[#9A6B4C] text-white px-8 py-5 font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/15"
              >
                <span>Plan een gesprek</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="group inline-flex items-center gap-3 border-2 border-[#0C0C0C]/10 text-[#0C0C0C] px-8 py-5 font-medium text-sm tracking-wide transition-all duration-500 hover:border-[#9A6B4C] hover:text-[#9A6B4C]"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.contact.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-[#6B6560]"
            >
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="flex items-center gap-2 hover:text-[#9A6B4C] transition-colors"
              >
                <Mail className="w-4 h-4" />
                {COMPANY.contact.email}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
