"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Building2,
  Hammer,
  Landmark,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  Award,
  Shield,
} from "lucide-react";
import { COMPANY, STATS, CERTIFICATIONS } from "@/lib/constants";

const services = [
  {
    number: "01",
    icon: Building2,
    title: "Algemene Bouwwerken",
    description: "Complete bouwprojecten van A tot Z voor overheden en bedrijven. Van fundament tot sleutel-op-de-deur.",
    features: [
      "Publieke gebouwen (scholen, sportinfrastructuur)",
      "Verbouwingen en uitbreidingen",
      "Structurele werken en funderingen",
      "Afwerking: vloeren, plafonds, pleisterwerk",
      "Klasse 6 erkend voor grote projecten",
    ],
    image: "/images/original-site/Atlas-College-Genk-10-scaled.jpg",
  },
  {
    number: "02",
    icon: Hammer,
    title: "Dakwerken & Renovatie",
    description: "Specialisten in hellende en platte daken. Van isolatie tot waterdichting, met premium materialen.",
    features: [
      "Hellende en platte daken",
      "Sarking isolatie methode",
      "Koperbekleding en zinkwerk",
      "Dakgoten en regenwaterafvoer",
      "Valbeveiliging op daken",
    ],
    image: "/images/original-site/Koning-Boudewijn-Stadion.webp",
  },
  {
    number: "03",
    icon: Landmark,
    title: "Erfgoedrenovatie",
    description: "Restauratie van beschermd bouwkundig erfgoed met authentieke technieken en materialen.",
    features: [
      "Monumentenrestauratie (o.a. Stadhuis Gent)",
      "Authentieke materialen en soldeerwerk",
      "Natuurleien vervangen en herstellen",
      "Werken voor KU Leuven campussen",
      "Beschermde stads- en dorpsgezichten",
    ],
    image: "/images/original-site/Justitiepaleis-Dendermonde.jpg",
  },
];

const scopeIncludes = [
  "Algemene bouwwerken voor overheden en bedrijven",
  "Dakwerken: hellend, plat, koper, zink, leien",
  "Sarking isolatie en energetische renovatie",
  "Gevelwerken, voegwerk en buitenschrijnwerk",
  "Monumentenrestauratie en erfgoedrenovatie",
  "Structurele versterkingen en stabilisatie",
  "Valbeveiliging en toegankelijkheidswerken",
  "Afwerking: pleisterwerk, vloeren, plafonds",
];

const scopeExcludes = [
  "Elektriciteitswerken",
  "HVAC-installatie",
  "Sanitaire installatie",
  "Tuinaanleg en groenvoorziening",
  "Interieurontwerp en meubilering",
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
          src="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
          alt="Bouwproject"
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
                Bouw & Renovatie
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Bouw, Dakwerken
                <br />
                <span className="text-[#204CE5]">& Erfgoed</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Van dakwerken tot monumentenrestauratie. Klasse 6 erkend voor
                publieke gebouwen met specialisatie in erfgoedrenovatie.
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
                  Start uw project
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
                    { value: STATS.yearsExperience, suffix: "+", label: "Jaar ervaring" },
                    { value: "6", suffix: "", label: "Klasse erkenning" },
                    { value: "3", suffix: "x", label: "Gecertificeerd" },
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

// Services Section with numbered items
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
            Onze Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] leading-[1.1]">
            Drie pijlers van <span className="text-[#204CE5]">vakmanschap</span>
          </h2>
        </motion.div>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Image */}
                <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112337]/60 via-transparent to-transparent" />

                    {/* Number badge */}
                    <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-white flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#204CE5]">{service.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#204CE5]/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#204CE5]" />
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-[#112337] mb-4">
                    {service.title}
                  </h3>

                  <p className="text-lg text-[#686E77] mb-8 leading-relaxed">
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
                </div>
              </motion.article>
            );
          })}
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
            Scope
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#112337]">
            Wat wij wel en niet doen
          </h2>
          <p className="mt-6 text-[#686E77] max-w-2xl mx-auto">
            Transparantie over onze scope voorkomt misverstanden. Voor specialistische
            installaties werken wij samen met betrouwbare partners.
          </p>
        </motion.div>

        {/* Scope Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* What we do */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#F8F9FA] rounded-2xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#204CE5]/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#204CE5]" />
              </div>
              <h3 className="text-2xl font-bold text-[#112337]">Wat wij doen</h3>
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
              Wij coördineren deze werken via vaste onderaannemers en kunnen een totaalofferte aanbieden.
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
            Klaar om te starten?
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Laat ons uw bouwproject{" "}
            <span className="text-[#204CE5]">realiseren</span>
          </h2>

          <p className="mt-8 text-xl text-white/60 max-w-xl mx-auto">
            Plan uw project met onze gratis projectplanner. Binnen 48 uur
            ontvangt u een vrijblijvende offerte van ons team.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/projectplanner"
              className="group inline-flex items-center justify-center gap-3 bg-[#204CE5] text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
            >
              Start projectplanner
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

export function BouwRenovatieClient() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ScopeSection />
      <CTASection />
    </>
  );
}
