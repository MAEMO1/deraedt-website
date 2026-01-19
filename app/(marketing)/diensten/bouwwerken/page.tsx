"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  Phone,
  Award,
} from "lucide-react";
import { COMPANY, STATS, CERTIFICATIONS } from "@/lib/constants";

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

// Hero Section
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
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
          alt="Algemene Bouwwerken"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/95 via-[#112337]/80 to-[#112337]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-[#112337]/30" />
      </motion.div>

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <motion.div style={{ opacity }} className="relative z-10 min-h-[90vh] flex items-center">
        <div className="container-wide pt-32 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-8"
              >
                <Building2 className="w-4 h-4" />
                Algemene Bouwwerken
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Bouwprojecten
                <br />
                <span className="text-[#204CE5]">van A tot Z</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Van fundament tot sleutel-op-de-deur. Klasse 6 erkend voor de
                meest complexe overheidsopdrachten en bedrijfsgebouwen.
              </motion.p>

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

// Features Section
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#F8F9FA]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Onze Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#112337] leading-[1.1] mb-8">
              Complete bouw<span className="text-[#204CE5]">oplossingen</span>
            </h2>
            <p className="text-lg text-[#686E77] leading-relaxed mb-10">
              Als Klasse 6 erkend aannemer realiseren wij bouwprojecten van elke
              omvang. Van publieke gebouwen tot bedrijfspanden, wij leveren
              kwaliteit op maat.
            </p>

            <ul className="space-y-4">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                  <span className="text-[#112337]">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
                alt="Bouwproject"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#112337] rounded-2xl p-6 max-w-[200px]">
              <div className="text-3xl font-bold text-white">Klasse 6</div>
              <div className="text-sm text-white/60 mt-1">Hoogste erkenning</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#112337] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            Werkwijze
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#112337]">
            Van plan tot oplevering
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <span className="text-7xl font-bold text-[#204CE5]/10">{step.number}</span>
              <h3 className="text-xl font-bold text-[#112337] mt-2 mb-3">{step.title}</h3>
              <p className="text-[#686E77] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
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
            Klaar om te bouwen?
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Start uw <span className="text-[#204CE5]">bouwproject</span>
          </h2>

          <p className="mt-8 text-xl text-white/60 max-w-xl mx-auto">
            Neem contact op voor een vrijblijvende offerte. Binnen 48 uur
            hoort u van ons.
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

export default function BouwwerkenPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
