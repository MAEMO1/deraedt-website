"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronRight, CheckCircle2, Phone, Building2, X } from "lucide-react";
import { COMPANY, RAAMCONTRACTEN } from "@/lib/constants";

const services = [
  {
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

// Hero Section
function HeroSection() {
  return (
    <section className="relative bg-[#112337] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/original-site/Koning-Boudewijn-Stadion.webp"
          alt="Facility Management"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#112337]/70" />
      </div>

      <div className="relative z-10">
        <div className="container-wide pt-32 pb-4">
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/diensten" className="hover:text-white transition-colors">Diensten</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Onderhoud & Interventies</span>
          </nav>
        </div>

        <div className="container-wide pb-24 lg:pb-32">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            >
              Onderhoud & Interventies
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              Raamcontracten, preventief onderhoud en snelle interventies.
              Wij ontzorgen u volledig met ons technisch beheer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/projectplanner"
                className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-[#1a3fd4]"
              >
                Vraag offerte aan
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY.contact.phone}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Intro Section
function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
              Facility Management
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112337] leading-[1.15]">
              Uw partner voor gebouwbeheer
            </h2>
            <p className="mt-6 text-[#686E77] text-lg leading-relaxed">
              Langlopende raamcontracten voor dakonderhoud, herstellingen en
              renovatiewerken. Actieve contracten met Stad Gent, Stad Brussel,
              VEB en KU Leuven.
            </p>
            <p className="mt-4 text-[#686E77] leading-relaxed">
              Met 4 actieve raamcontracten en 24/7 interventie service staan wij
              klaar wanneer u ons nodig heeft.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/original-site/Koning-Boudewijn-Stadion.webp"
                alt="Facility Management"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
            Onze Diensten
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
            Vier pijlers van ontzorging
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-[#112337] mb-3">
                {service.title}
              </h3>
              <p className="text-[#686E77] mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[#112337]">
                    <CheckCircle2 className="w-4 h-4 text-[#204CE5]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
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
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
            Referenties
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
            Actieve Raamcontracten
          </h2>
          <p className="mt-4 text-[#686E77]">
            Wij werken dagelijks voor toonaangevende overheden en instellingen.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RAAMCONTRACTEN.map((contract, index) => (
            <motion.div
              key={contract.client}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-6 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#204CE5]/10 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-[#204CE5]" />
              </div>
              <h3 className="text-lg font-bold text-[#112337] mb-1">
                {contract.client}
              </h3>
              <p className="text-sm text-[#686E77] mb-2">
                {contract.scope}
              </p>
              <span className="text-xs text-[#204CE5] font-medium uppercase tracking-wide">
                {contract.type}
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
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
            Scope
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
            Wat wij wel en niet doen
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* What we do */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#204CE5]/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#204CE5]" />
              </div>
              <h3 className="text-xl font-bold text-[#112337]">Onze diensten</h3>
            </div>
            <ul className="space-y-3">
              {scopeIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                  <span className="text-[#112337]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Via partners */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#112337] rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Via partners</h3>
            </div>
            <ul className="space-y-3">
              {scopeExcludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 pt-6 border-t border-white/10 text-sm text-white/50">
              Wij coördineren graag alle technische werken via ons netwerk van vaste partners.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "4", suffix: "", label: "Actieve raamcontracten" },
    { value: "6", suffix: "", label: "Klasse erkenning" },
    { value: "24", suffix: "/7", label: "Interventies" },
    { value: "40", suffix: "+", label: "Vakmensen" },
  ];

  return (
    <section ref={ref} className="py-16 bg-[#112337]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white">
                {stat.value}
                <span className="text-[#204CE5]">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112337]">
            Interesse in een raamcontract?
          </h2>
          <p className="mt-6 text-lg text-[#686E77]">
            Neem contact met ons op voor een vrijblijvend gesprek over de
            mogelijkheden voor uw organisatie.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/projectplanner"
              className="inline-flex items-center justify-center gap-2 bg-[#204CE5] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#1a3fd4]"
            >
              Offerte aanvragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#112337] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#1a2d47]"
            >
              <Phone className="w-4 h-4" />
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
      <IntroSection />
      <ServicesSection />
      <RaamcontractenSection />
      <ScopeSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
