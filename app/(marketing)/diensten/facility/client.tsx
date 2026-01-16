"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Wrench,
  Clock,
  Shield,
  FileCheck,
  ArrowRight,
  CheckCircle,
  XCircle,
  Phone,
} from "lucide-react";
import { COMPANY, RAAMCONTRACTEN } from "@/lib/constants";

const services = [
  {
    icon: FileCheck,
    title: "Raamcontracten",
    description: "Langlopende overeenkomsten voor overheids- en private opdrachtgevers.",
    features: [
      "Vaste tarieven en snelle responstijden",
      "Ervaring met publieke aanbestedingen",
      "Transparante rapportage per opdracht",
      "Flexibele inzet van capaciteit",
    ],
  },
  {
    icon: Wrench,
    title: "Preventief Onderhoud",
    description: "Periodieke inspecties en onderhoud om problemen te voorkomen.",
    features: [
      "Dakinspecties en gevelcontroles",
      "Reiniging en klein herstel",
      "Rapportage met fotodocumentatie",
      "Jaarlijkse onderhoudsplanning",
    ],
  },
  {
    icon: Clock,
    title: "Interventies",
    description: "Snelle respons bij urgente herstellingen en schadegevallen.",
    features: [
      "Responstijd binnen 24-48 uur",
      "Waterschade en stormschade",
      "Noodherstellingen aan daken en gevels",
      "Stabilisatie bij structurele problemen",
    ],
  },
  {
    icon: Shield,
    title: "Technisch Beheer",
    description: "Volledige ontzorging van uw gebouwtechniek.",
    features: [
      "Coordinatie met onderaannemers",
      "Budgetbeheer en kostenbewaking",
      "Meerjarenplanning onderhoud",
      "Energetische optimalisatie",
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
  "Elektriciteitswerken (via partners)",
  "HVAC-onderhoud (via partners)",
  "Liftonderhoud (via partners)",
  "Branddetectie en -beveiliging (via partners)",
  "Groenonderhoud en tuinwerken",
];

export function FacilityClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const isScopeInView = useInView(scopeRef, { once: true, margin: "-100px" });
  const isClientsInView = useInView(clientsRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] bg-[#0C0C0C] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/Koning-Boudewijn-Stadion.webp"
            alt="Facility Management"
            fill
            className="object-cover image-cinematic opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-[#0C0C0C]/40" />
        </div>

        <div className="container-wide relative pb-20 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span className="text-sm">Alle diensten</span>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Facility Management</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-[-0.02em]">
              Onderhoud &<br />Gebouwbeheer
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/50 leading-relaxed max-w-xl font-serif font-light">
              Raamcontracten, preventief onderhoud en snelle interventies. Wij ontzorgen
              u volledig met ons technisch beheer.
            </p>

            <div className="mt-10">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
              >
                Vraag offerte aan
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 border border-[#0C0C0C]/5"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-xl text-[#0C0C0C] mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#6B6560] mb-6">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs text-[#0C0C0C]">
                        <CheckCircle className="w-3 h-3 text-[#9A6B4C] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Contracts */}
      <section ref={clientsRef} className="section-spacing bg-white">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isClientsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Referenties</span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="heading-section text-[#0C0C0C]">
              Actieve Raamcontracten
            </h2>
            <p className="mt-6 text-[#6B6560] max-w-2xl mx-auto">
              Wij werken dagelijks voor toonaangevende overheden en instellingen.
              Onze raamcontracten zijn het bewijs van vertrouwen.
            </p>
          </motion.header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RAAMCONTRACTEN.map((contract, index) => (
              <motion.div
                key={contract.client}
                initial={{ opacity: 0, y: 20 }}
                animate={isClientsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-[#0C0C0C]/10 bg-[#FAF7F2]/50"
              >
                <h3 className="font-display text-lg text-[#0C0C0C] mb-2">
                  {contract.client}
                </h3>
                <p className="text-sm text-[#6B6560] mb-3">{contract.scope}</p>
                <span className="text-xs text-[#9A6B4C] font-medium uppercase tracking-wide">
                  {contract.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section ref={scopeRef} className="section-spacing bg-[#FAF7F2]">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isScopeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Scope</span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="heading-section text-[#0C0C0C]">
              Wat wij wel en niet doen
            </h2>
          </motion.header>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Includes */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isScopeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8"
            >
              <h3 className="font-display text-2xl text-[#0C0C0C] mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Onze diensten
              </h3>
              <ul className="space-y-4">
                {scopeIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#0C0C0C]">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Excludes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isScopeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8"
            >
              <h3 className="font-display text-2xl text-[#0C0C0C] mb-6 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-[#9A6B4C]" />
                Via partners
              </h3>
              <ul className="space-y-4">
                {scopeExcludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#6B6560]">
                    <XCircle className="w-5 h-5 text-[#9A6B4C] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-[#6B6560] italic">
                Wij coordineren graag alle technische werken via ons netwerk van vaste partners.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0C0C0C] relative">
        <div className="absolute inset-0 texture-stone opacity-30" />

        <div className="container-wide relative text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-white leading-[0.95]">
            Interesse in een raamcontract?
          </h2>

          <p className="mt-6 text-white/50 max-w-xl mx-auto">
            Neem contact met ons op voor een vrijblijvend gesprek over de mogelijkheden
            voor uw organisatie.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/projectplanner"
              className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
            >
              Offerte aanvragen
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5"
            >
              <Phone className="w-4 h-4" />
              {COMPANY.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
