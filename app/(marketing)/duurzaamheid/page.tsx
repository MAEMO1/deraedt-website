"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Leaf,
  TrendingDown,
  Recycle,
  Truck,
  Factory,
  Sun,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Target,
  BarChart3,
  Building2,
} from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";

const co2Certification = CERTIFICATIONS.find((c) => c.id === "co2");

const reductionMeasures = [
  {
    icon: Truck,
    title: "Duurzaam Transport",
    description: "Optimalisatie van transportroutes en inzet van Euro 6 voertuigen voor lagere uitstoot.",
  },
  {
    icon: Factory,
    title: "Efficiënte Machines",
    description: "Investering in moderne, energiezuinige machines en gereedschap op de werf.",
  },
  {
    icon: Recycle,
    title: "Circulair Bouwen",
    description: "Maximale hergebruik van materialen en gescheiden afvalverwerking op elke werf.",
  },
  {
    icon: Sun,
    title: "Groene Energie",
    description: "Zonnepanelen op ons bedrijfspand en overstap naar groene energieleveranciers.",
  },
];

const co2Pillars = [
  {
    number: "01",
    title: "Inzicht",
    description: "Jaarlijkse CO₂-footprint berekening volgens ISO 14064-1. Wij meten om te verbeteren.",
  },
  {
    number: "02",
    title: "Reductie",
    description: "Concrete maatregelen om onze uitstoot structureel te verlagen op kantoor en werf.",
  },
  {
    number: "03",
    title: "Transparantie",
    description: "Publieke communicatie over onze voortgang en doelstellingen.",
  },
  {
    number: "04",
    title: "Participatie",
    description: "Actieve deelname aan sector-initiatieven en kennisdeling met ketenpartners.",
  },
];

const benefits = [
  "Gunningsvoordeel bij aanbestedingen met CO₂-criteria",
  "Lagere milieubelasting van uw bouwproject",
  "Transparante rapportage over CO₂-prestaties",
  "Bijdrage aan klimaatdoelstellingen",
  "Samenwerking met gecertificeerde onderaannemers",
];

export default function DuurzaamheidPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const measuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const isApproachInView = useInView(approachRef, { once: true, margin: "-100px" });
  const isMeasuresInView = useInView(measuresRef, { once: true, margin: "-100px" });
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] bg-[#0C0C0C] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
            alt="Duurzaam bouwen"
            fill
            className="object-cover image-cinematic opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-[#0C0C0C]/40" />
        </div>

        <div className="container-wide relative pb-16 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            {/* Certification badge */}
            <div className="inline-flex items-center gap-3 bg-green-600 text-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] mb-8">
              <Leaf className="w-4 h-4" />
              CO₂-Prestatieladder Niveau 3 · Geldig tot 2028
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Duurzaamheid & CO₂</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95] tracking-[-0.02em]">
              CO₂-bewust bouwen
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/50 leading-relaxed max-w-xl font-serif font-light">
              Wij zijn gecertificeerd op niveau 3 van de CO₂-Prestatieladder.
              Dit betekent concrete CO₂-reductie en transparante rapportage.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/procurement"
                className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
              >
                Bekijk certificaten
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact?subject=raamcontract"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5"
              >
                Neem contact op
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is CO2-Prestatieladder */}
      <section className="py-16 bg-[#0C0C0C] border-t border-white/10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl text-white mb-4">
                Wat is de CO₂-Prestatieladder?
              </h2>
              <p className="text-white/60 leading-relaxed">
                De CO₂-Prestatieladder is een instrument dat bedrijven helpt om hun CO₂-uitstoot
                te reduceren. Het certificaat wordt steeds vaker gevraagd bij aanbestedingen
                en biedt gunningsvoordeel. Niveau 3 betekent dat wij onze CO₂-footprint kennen,
                actief reduceren én hier transparant over communiceren.
              </p>
            </div>
            <div className="bg-white/5 p-6 border border-white/10">
              <div className="text-[10px] text-green-400 uppercase tracking-[0.2em] mb-2">
                Onze Certificering
              </div>
              <div className="font-display text-3xl text-white">Niveau 3</div>
              <div className="text-sm text-white/50 mt-2">
                CO₂-Prestatieladder 3.1
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-white/40">Scope</div>
                <div className="text-sm text-white/70 mt-1">
                  {co2Certification && "scope" in co2Certification ? co2Certification.scope : "Algemene bouw-, dak- en infrastructuurwerken"}
                </div>
              </div>
              <div className="mt-3">
                <div className="text-xs text-white/40">Geldig tot</div>
                <div className="text-sm text-white/70 mt-1">
                  {co2Certification && "validUntil" in co2Certification ? co2Certification.validUntil : "14 januari 2028"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach - 4 Pillars */}
      <section ref={approachRef} className="section-spacing bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Onze Aanpak</span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="heading-section text-[#0C0C0C]">
              4 pijlers van CO₂-management
            </h2>
          </motion.header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {co2Pillars.map((pillar, index) => (
              <motion.article
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 border border-[#0C0C0C]/5"
              >
                <div className="font-display text-5xl text-[#0C0C0C]/10 mb-4">
                  {pillar.number}
                </div>
                <h3 className="font-display text-xl text-[#0C0C0C]">{pillar.title}</h3>
                <p className="mt-3 text-sm text-[#6B6560] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Reduction Measures */}
      <section ref={measuresRef} className="section-spacing bg-white relative">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isMeasuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-[#9A6B4C]" />
                <span className="label-overline">Concrete Maatregelen</span>
              </div>

              <h2 className="heading-section text-[#0C0C0C]">
                Hoe wij CO₂ reduceren
              </h2>

              <p className="mt-8 text-[#6B6560] leading-relaxed">
                Onze CO₂-reductie is geen papieren exercitie. Wij implementeren
                concrete maatregelen op kantoor, in ons wagenpark en op elke werf.
              </p>

              <div className="mt-10 space-y-6">
                {reductionMeasures.map((measure, index) => {
                  const Icon = measure.icon;
                  return (
                    <motion.div
                      key={measure.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isMeasuresInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-green-500/10 text-green-600 flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0C0C0C]">{measure.title}</h3>
                        <p className="mt-1 text-sm text-[#6B6560]">{measure.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isMeasuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square relative">
                <Image
                  src="/images/original-site/team-collage.jpg"
                  alt="Duurzaam bouwen in de praktijk"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-green-500/30" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-green-500/30" />

              {/* Stats overlay */}
              <div className="absolute -bottom-8 -right-8 bg-[#0C0C0C] text-white p-8">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <TrendingDown className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-[0.15em]">Reductiedoel</span>
                </div>
                <div className="font-display text-4xl">2028</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                  Certificaat geldig
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits for Clients */}
      <section ref={benefitsRef} className="section-spacing bg-[#0C0C0C] relative">
        <div className="absolute inset-0 texture-stone opacity-30" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-[#9A6B4C]" />
                <span className="label-overline">Voordelen voor U</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl text-white leading-[0.95]">
                Wat betekent dit voor uw project?
              </h2>

              <p className="mt-8 text-white/50 leading-relaxed">
                Steeds meer aanbestedende diensten — waaronder Infrabel, Aquafin en
                grote gemeenten — hanteren CO₂-criteria in hun gunning. Door met
                De Raedt te werken, profiteert u van ons certificaat.
              </p>

              <ul className="mt-10 space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isBenefitsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 border border-white/10 p-10"
            >
              <h3 className="font-display text-2xl text-white mb-8">
                Gunningsvoordeel bij aanbestedingen
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 text-green-400 flex-shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Infrabel / Tucrail</div>
                    <div className="text-sm text-white/50 mt-1">
                      Implementeert CO₂-Prestatieladder in procurement vanaf september 2025
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 text-green-400 flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Grote steden & gemeenten</div>
                    <div className="text-sm text-white/50 mt-1">
                      Steeds meer lokale overheden hanteren CO₂-criteria in aanbestedingen
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 text-green-400 flex-shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Fictieve korting</div>
                    <div className="text-sm text-white/50 mt-1">
                      CO₂-certificaat kan leiden tot gunningsvoordeel via fictieve korting op inschrijvingsprijs
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <Link
                  href="/procurement"
                  className="group inline-flex items-center gap-2 text-[#9A6B4C] text-sm font-semibold uppercase tracking-[0.1em] hover:text-[#BA8B6C] transition-colors"
                >
                  Bekijk al onze certificaten
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] mb-8">
              <FileCheck className="w-4 h-4" />
              Gecertificeerd tot 2028
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-[#0C0C0C] leading-[0.95]">
              Duurzaam bouwen begint hier
            </h2>

            <p className="mt-6 text-[#6B6560] leading-relaxed max-w-xl mx-auto">
              Wilt u meer weten over onze CO₂-aanpak of hoe ons certificaat
              uw aanbesteding kan ondersteunen? Neem contact op.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center gap-3 bg-[#0C0C0C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#9A6B4C]"
              >
                Start uw project
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact?subject=raamcontract"
                className="group inline-flex items-center gap-3 border border-[#0C0C0C]/20 text-[#0C0C0C] px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-[#0C0C0C] hover:text-white"
              >
                Neem contact op
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
