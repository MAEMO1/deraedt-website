"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import { COMPANY, STATS } from "@/lib/constants";

const features = [
  "Publieke gebouwen (scholen, sportinfrastructuur)",
  "Kantoorgebouwen en bedrijfspanden",
  "Verbouwingen en uitbreidingen",
  "Structurele werken en funderingen",
  "Metselwerk en betonwerken",
  "Afwerking: vloeren, plafonds, pleisterwerk",
  "Klasse 6 erkend voor grote projecten",
  "Sleutel-op-de-deur projecten",
];

const process = [
  {
    number: "01",
    title: "Kennismaking & Analyse",
    description: "Grondige inventarisatie van uw wensen, budget en planning. Technische haalbaarheidsanalyse.",
  },
  {
    number: "02",
    title: "Offerte & Planning",
    description: "Gedetailleerde prijsopgave met transparante kostenstructuur. Realistische planning met mijlpalen.",
  },
  {
    number: "03",
    title: "Uitvoering",
    description: "Professionele uitvoering door eigen vakmensen. Wekelijkse voortgangsrapportage.",
  },
  {
    number: "04",
    title: "Oplevering & Nazorg",
    description: "Grondige oplevering met kwaliteitscontrole. Garantie en onderhoudsadvies.",
  },
];

// Hero Section - Clean McCownGordon style
function HeroSection() {
  return (
    <section className="relative bg-[#112337] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
          alt="Algemene Bouwwerken"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#112337]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="container-wide pt-32 pb-4">
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/diensten" className="hover:text-white transition-colors">Diensten</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Algemene Bouwwerken</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="container-wide pb-24 lg:pb-32">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            >
              Algemene Bouwwerken
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              Van fundament tot sleutel-op-de-deur. Klasse 6 erkend voor de
              meest complexe overheidsopdrachten en bedrijfsgebouwen.
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

// Intro Section - Alternating image/text
function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
              Onze Expertise
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112337] leading-[1.15]">
              Complete bouwoplossingen voor elk project
            </h2>
            <p className="mt-6 text-[#686E77] text-lg leading-relaxed">
              Als Klasse 6 erkend aannemer realiseren wij bouwprojecten van elke
              omvang. Van publieke gebouwen tot bedrijfspanden, wij leveren
              kwaliteit op maat.
            </p>
            <p className="mt-4 text-[#686E77] leading-relaxed">
              Met {STATS.yearsExperience} jaar ervaring en een team van meer dan 40 vakmensen
              staan wij garant voor een professionele uitvoering van uw project.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
                alt="Bouwproject"
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

// Features Section - Clean grid with border cards
function FeaturesSection() {
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
            Wat wij doen
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
            Onze diensten
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                <span className="text-[#112337] font-medium">{feature}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section - Clean numbered steps
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
            Werkwijze
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
            Van plan tot oplevering
          </h2>
          <p className="mt-4 text-[#686E77] text-lg">
            Een transparant proces met duidelijke communicatie. U weet altijd waar u aan toe bent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-[#204CE5]/10 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#112337] mb-2">
                {step.title}
              </h3>
              <p className="text-[#686E77] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section - Clean horizontal layout
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: STATS.yearsExperience, suffix: "+", label: "Jaar ervaring" },
    { value: "6", suffix: "", label: "Klasse erkenning" },
    { value: "3", suffix: "x", label: "Gecertificeerd" },
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
            Klaar om te bouwen?
          </h2>
          <p className="mt-6 text-lg text-[#686E77]">
            Neem contact op voor een vrijblijvende offerte. Binnen 48 uur hoort u van ons.
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

export default function BouwwerkenPage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <ProcessSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
