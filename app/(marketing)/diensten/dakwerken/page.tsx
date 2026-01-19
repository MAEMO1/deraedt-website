"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import { COMPANY, STATS } from "@/lib/constants";

const services = [
  {
    title: "Hellende Daken",
    description: "Dakpannen, leien, zink en koper. Traditioneel vakmanschap met moderne technieken.",
    features: ["Dakpannen en leien", "Zink- en koperbekleding", "Dakgoten en afvoeren", "Dakvensters"],
  },
  {
    title: "Platte Daken",
    description: "EPDM, bitumen en groendaken. Waterdichte oplossingen met lange levensduur.",
    features: ["EPDM en bitumen", "Groendaken", "Isolatie", "Afwatering"],
  },
  {
    title: "Dakisolatie",
    description: "Sarking isolatie en energetische renovatie. Verbeter uw EPC-score.",
    features: ["Sarking methode", "Binnenisolatie", "Dampschermen", "Energiebesparend"],
  },
  {
    title: "Valbeveiliging",
    description: "Veilige werkplekken op daken. Conform alle normen en regelgeving.",
    features: ["Ankerlijnen", "Loopbruggen", "Collectieve beveiliging", "Keuring en onderhoud"],
  },
];

const features = [
  "Hellende daken in alle materialen",
  "Platte daken: EPDM, bitumen, PVC",
  "Sarking isolatie methode",
  "Koperbekleding en zinkwerk",
  "Dakgoten en regenwaterafvoer",
  "Dakvensters en lichtstraten",
  "Valbeveiliging installatie",
  "Groendaken en sedumdaken",
];

// Hero Section
function HeroSection() {
  return (
    <section className="relative bg-[#112337] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/original-site/Koning-Boudewijn-Stadion.webp"
          alt="Dakwerken"
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
            <span className="text-white">Dakwerken</span>
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
              Dakwerken
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              Hellende en platte daken, isolatie en waterdichting. Van
              traditionele leien tot moderne EPDM-systemen.
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
                Start uw project
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
              Dak- & Gevelspecialist
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112337] leading-[1.15]">
              Experts in alle types daken
            </h2>
            <p className="mt-6 text-[#686E77] text-lg leading-relaxed">
              Van traditionele natuurleien tot moderne Sarking isolatie. Inclusief
              koperbekleding, zinkwerk en valbeveiliging conform de strengste
              veiligheidsnormen.
            </p>
            <p className="mt-4 text-[#686E77] leading-relaxed">
              Met {STATS.yearsExperience} jaar ervaring en VCA** certificering staan wij garant
              voor veilige en kwalitatieve dakwerken.
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
                alt="Dakwerken detail"
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

// Services Section - 2x2 grid with bordered cards
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
            Onze Specialisaties
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
            Elk type dak
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

// Features Section - Alternating layout (image left)
function FeaturesSection() {
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
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/original-site/IMG_20230615_0957592-ps-scaled.jpg"
                alt="Dakwerken project"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
              Volledig Pakket
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
              Wat wij doen
            </h2>
            <ul className="mt-8 space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                  <span className="text-[#112337]">{feature}</span>
                </motion.li>
              ))}
            </ul>
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
    { value: STATS.yearsExperience, suffix: "+", label: "Jaar ervaring" },
    { value: "VCA", suffix: "**", label: "Veiligheid" },
    { value: "6", suffix: "", label: "Klasse erkenning" },
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
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112337]">
            Nieuw dak nodig?
          </h2>
          <p className="mt-6 text-lg text-[#686E77]">
            Van dakinspectie tot volledige renovatie. Wij adviseren u graag
            over de beste oplossing voor uw situatie.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/projectplanner"
              className="inline-flex items-center justify-center gap-2 bg-[#204CE5] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#1a3fd4]"
            >
              Start projectplanner
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

export default function DakwerkenPage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
