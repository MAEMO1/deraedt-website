"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronRight, CheckCircle2, Phone, Building2 } from "lucide-react";
import { COMPANY, STATS } from "@/lib/constants";

const expertise = [
  {
    title: "Monumentenrestauratie",
    description: "Volledige restauratie van beschermde monumenten met respect voor het historische karakter.",
    examples: ["Stadhuis Gent", "Justitiepaleis Dendermonde", "Historische kerken"],
  },
  {
    title: "Dakrestauratie",
    description: "Authentieke materialen en technieken voor historische daken. Leien, koper en zink.",
    examples: ["Natuurleien", "Historisch koperbekleding", "Traditioneel soldeerwerk"],
  },
  {
    title: "Gevelrestauratie",
    description: "Herstel van historisch metselwerk, voegwerk en ornamenten.",
    examples: ["Schoorsteenherstellingen", "Gevelreiniging", "Voegwerk renovatie"],
  },
];

const features = [
  "Monumentenrestauratie en -onderhoud",
  "Authentieke materialen en technieken",
  "Natuurleien vervangen en herstellen",
  "Historisch koper- en zinkwerk",
  "Traditioneel soldeerwerk",
  "Beschermde stads- en dorpsgezichten",
  "Werken voor KU Leuven campussen",
  "Samenwerking met erfgoedconsulenten",
];

const references = [
  { name: "Stadhuis Gent", type: "Raamcontract", year: "2023" },
  { name: "Stadhuis Brussel", type: "Beschermd erfgoed", year: "2023" },
  { name: "Justitiepaleis Dendermonde", type: "Beschermd erfgoed", year: "2023" },
  { name: "KU Leuven", type: "10 campussen", year: "Lopend" },
];

// Hero Section
function HeroSection() {
  return (
    <section className="relative bg-[#112337] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
          alt="Erfgoedrenovatie"
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
            <span className="text-white">Erfgoedrenovatie</span>
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
              Erfgoedrenovatie
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              Restauratie van beschermd bouwkundig erfgoed met authentieke
              technieken. Vakmanschap dat generaties overstijgt.
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
              Monumentenrestauratie
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112337] leading-[1.15]">
              Authentiek vakmanschap voor historisch erfgoed
            </h2>
            <p className="mt-6 text-[#686E77] text-lg leading-relaxed">
              Gespecialiseerde restauratie van beschermd bouwkundig erfgoed. Met
              authentieke materialen, traditionele technieken en in nauwe
              samenwerking met Onroerend Erfgoed.
            </p>
            <p className="mt-4 text-[#686E77] leading-relaxed">
              Met {STATS.yearsExperience} jaar ervaring en ISO 9001 certificering staan wij
              garant voor de hoogste kwaliteitsnormen bij erfgoedprojecten.
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
                src="/images/original-site/Foto-Stadhuis-Gent.jpeg"
                alt="Stadhuis Gent"
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

// Expertise Section
function ExpertiseSection() {
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
            Onze Expertise
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
            Specialisaties
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {expertise.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-[#112337] mb-3">
                {item.title}
              </h3>
              <p className="text-[#686E77] mb-6 leading-relaxed">
                {item.description}
              </p>
              <div className="space-y-2">
                {item.examples.map((example) => (
                  <div key={example} className="flex items-center gap-2 text-sm text-[#112337]">
                    <CheckCircle2 className="w-4 h-4 text-[#204CE5]" />
                    {example}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// References Section
function ReferencesSection() {
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
              Referenties
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
              Bewezen trackrecord
            </h2>
            <p className="mt-6 text-[#686E77] text-lg leading-relaxed">
              Wij werken voor de meest prestigieuze erfgoedprojecten in België.
              Van historische stadhuizen tot universiteitscampussen.
            </p>

            <div className="mt-8 space-y-4">
              {references.map((refItem, i) => (
                <motion.div
                  key={refItem.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#204CE5]/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#204CE5]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#112337]">{refItem.name}</div>
                      <div className="text-sm text-[#686E77]">{refItem.type}</div>
                    </div>
                  </div>
                  <span className="text-sm text-[#204CE5] font-medium">{refItem.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
                alt="Justitiepaleis Dendermonde"
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

// Features Section
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
            Volledig Pakket
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

// Stats Section
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: STATS.yearsExperience, suffix: "+", label: "Jaar ervaring" },
    { value: "ISO", suffix: "", label: "9001 kwaliteit" },
    { value: "6", suffix: "", label: "Klasse erkenning" },
    { value: "4", suffix: "", label: "Grote referenties" },
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
            Erfgoedproject?
          </h2>
          <p className="mt-6 text-lg text-[#686E77]">
            Neem contact op voor een vrijblijvend adviesgesprek. Wij komen
            graag ter plaatse voor een eerste inventarisatie.
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

export default function ErfgoedPage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ExpertiseSection />
      <ReferencesSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
