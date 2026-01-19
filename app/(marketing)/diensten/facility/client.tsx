"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Wrench,
  Clock,
  Shield,
  FileCheck,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  Award,
  Building2,
} from "lucide-react";
import { COMPANY, RAAMCONTRACTEN, CERTIFICATIONS } from "@/lib/constants";

const services = [
  {
    number: "01",
    icon: FileCheck,
    title: "Raamcontracten",
    description: "Langlopende overeenkomsten met overheden en instellingen voor structureel onderhoud en renovatie.",
    features: [
      "Actieve contracten met Stad Gent, Brussel",
      "Ervaring met publieke aanbestedingen",
      "VEB scholen, KU Leuven campussen",
      "Klasse 6 erkend voor grote opdrachten",
    ],
  },
  {
    number: "02",
    icon: Wrench,
    title: "Dakonderhoud",
    description: "Periodieke inspecties en herstellingen van daken. Preventief onderhoud voorkomt grote schade.",
    features: [
      "Dakinspecties en preventief onderhoud",
      "Dakgoten en regenwaterafvoer",
      "Klein herstel en waterdichting",
      "Zowel hellende als platte daken",
    ],
  },
  {
    number: "03",
    icon: Clock,
    title: "Interventies",
    description: "Snelle herstellingen bij schade of dringende problemen. Wij staan klaar wanneer u ons nodig heeft.",
    features: [
      "Waterschade en stormschade",
      "Herstellingen aan daken en gevels",
      "Voegwerk en gevelreparaties",
      "Structurele stabilisatie",
    ],
  },
  {
    number: "04",
    icon: Shield,
    title: "Renovatiewerken",
    description: "Structurele verbeteringen en energetische aanpassingen voor een duurzamer gebouwenbestand.",
    features: [
      "Gevelrenovatie en isolatie",
      "Energetische verbeteringen",
      "Valbeveiliging installatie",
      "Renovatie gemeenschappelijke delen",
    ],
  },
];

const scopeIncludes = [
  "Dakonderhoud en -herstellingen (plat en hellend)",
  "Gevelherstellingen en voegwerk",
  "Waterdichtingswerken",
  "Structurele herstellingen",
  "Schilderwerk buitenschrijnwerk",
  "Renovatie van gemeenschappelijke delen",
  "Valbeveiliging en toegankelijkheid",
  "Kleine verbouwingen en aanpassingen",
];

const scopeExcludes = [
  "Elektriciteitswerken",
  "HVAC-onderhoud",
  "Liftonderhoud",
  "Branddetectie en -beveiliging",
  "Groenonderhoud en tuinwerken",
];

// Hero Section with parallax
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[90vh] bg-[#112337] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/images/original-site/Koning-Boudewijn-Stadion.webp"
          alt="Facility Management"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/95 via-[#112337]/80 to-[#112337]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-[#112337]/30" />
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 min-h-[90vh] flex items-center">
        <div className="container-wide pt-32 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            {/* Main Content */}
            <div className="lg:col-span-7">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href="/diensten"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span className="text-sm">Alle diensten</span>
                </Link>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-8"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Facility Management
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Onderhoud &
                <br />
                <span className="text-[#204CE5]">Gebouwbeheer</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Raamcontracten, preventief onderhoud en snelle interventies.
                Wij ontzorgen u volledig met ons technisch beheer.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/projectplanner"
                  className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
                >
                  Vraag offerte aan
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">{COMPANY.contact.phone}</span>
                </a>
              </motion.div>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "4", suffix: "", label: "Actieve raamcontracten" },
                    { value: "6", suffix: "", label: "Klasse erkenning" },
                    { value: "24", suffix: "/7", label: "Interventies" },
                    { value: "40", suffix: "+", label: "Vakmensen" },
                  ].map((stat, i) => (
                    <div key={stat.label} className={i > 1 ? "pt-6 border-t border-white/10" : ""}>
                      <div className="text-3xl sm:text-4xl font-bold text-white">
                        {stat.value}<span className="text-[#204CE5]">{stat.suffix}</span>
                      </div>
                      <div className="mt-1 text-sm text-white/50">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                  {CERTIFICATIONS.filter(c => c.prominent).slice(0, 3).map((cert) => (
                    <div key={cert.id} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                      <Award className="w-3.5 h-3.5 text-[#204CE5]" />
                      <span className="text-xs text-white/70 font-medium">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Services Section with numbered grid
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#F8F9FA]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            Onze Diensten
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] leading-[1.1]">
            Vier pijlers van <span className="text-[#204CE5]">ontzorging</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 sm:p-10 hover:shadow-xl transition-all duration-500"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#204CE5]/10 flex items-center justify-center group-hover:bg-[#204CE5] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#204CE5] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-5xl font-bold text-[#204CE5]/20 group-hover:text-[#204CE5]/40 transition-colors duration-300">
                      {service.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#112337] mb-4">
                  {service.title}
                </h3>

                <p className="text-[#686E77] mb-8 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                      <span className="text-[#112337]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Raamcontracten Section
function RaamcontractenSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-white">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#112337] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            Referenties
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#112337]">
            Actieve Raamcontracten
          </h2>
          <p className="mt-6 text-[#686E77] max-w-2xl mx-auto">
            Wij werken dagelijks voor toonaangevende overheden en instellingen.
            Onze raamcontracten zijn het bewijs van vertrouwen.
          </p>
        </motion.div>

        {/* Contracts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RAAMCONTRACTEN.map((contract, index) => (
            <motion.div
              key={contract.client}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#F8F9FA] rounded-2xl p-8 hover:bg-[#112337] transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#204CE5]/10 group-hover:bg-[#204CE5]/20 flex items-center justify-center mb-6 transition-colors duration-300">
                <Building2 className="w-6 h-6 text-[#204CE5]" />
              </div>

              <h3 className="text-xl font-bold text-[#112337] group-hover:text-white mb-2 transition-colors duration-300">
                {contract.client}
              </h3>

              <p className="text-sm text-[#686E77] group-hover:text-white/60 mb-4 transition-colors duration-300">
                {contract.scope}
              </p>

              <span className="inline-flex items-center gap-2 text-xs text-[#204CE5] font-semibold uppercase tracking-wide">
                {contract.type}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Scope Section
function ScopeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#F8F9FA]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            Scope
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#112337]">
            Wat wij wel en niet doen
          </h2>
        </motion.div>

        {/* Scope Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* What we do */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#204CE5]/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#204CE5]" />
              </div>
              <h3 className="text-2xl font-bold text-[#112337]">Onze diensten</h3>
            </div>

            <ul className="space-y-4">
              {scopeIncludes.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                  <span className="text-[#112337]">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Via partners */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#112337] rounded-2xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Via partners</h3>
            </div>

            <ul className="space-y-4">
              {scopeExcludes.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <ArrowUpRight className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                  <span className="text-white/70">{item}</span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 pt-6 border-t border-white/10 text-sm text-white/50">
              Wij coördineren graag alle technische werken via ons netwerk van vaste partners.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#112337] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            Interesse?
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Interesse in een{" "}
            <span className="text-[#204CE5]">raamcontract?</span>
          </h2>

          <p className="mt-8 text-xl text-white/60 max-w-xl mx-auto">
            Neem contact met ons op voor een vrijblijvend gesprek over de
            mogelijkheden voor uw organisatie.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/projectplanner"
              className="group inline-flex items-center justify-center gap-3 bg-[#204CE5] text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
            >
              Offerte aanvragen
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20"
            >
              <Phone className="w-5 h-5" />
              {COMPANY.contact.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FacilityClient() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <RaamcontractenSection />
      <ScopeSection />
      <CTASection />
    </>
  );
}
