"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Building2,
  Hammer,
  Landmark,
  ArrowRight,
  CheckCircle,
  XCircle,
  Phone,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

const services = [
  {
    icon: Building2,
    title: "Algemene Bouwwerken",
    description: "Bouwprojecten van A tot Z voor overheden en bedrijven.",
    features: [
      "Publieke gebouwen (scholen, sportinfrastructuur)",
      "Verbouwingen en uitbreidingen",
      "Structurele werken en funderingen",
      "Afwerking: vloeren, plafonds, pleisterwerk",
      "Klasse 6 erkend voor grote projecten",
    ],
  },
  {
    icon: Hammer,
    title: "Dakwerken & Renovatie",
    description: "Specialisten in dak- en gevelwerken.",
    features: [
      "Hellende en platte daken",
      "Sarking isolatie methode",
      "Koperbekleding en zinkwerk",
      "Dakgoten en regenwaterafvoer",
      "Valbeveiliging op daken",
    ],
  },
  {
    icon: Landmark,
    title: "Erfgoedrenovatie",
    description: "Restauratie van beschermd bouwkundig erfgoed.",
    features: [
      "Monumentenrestauratie (o.a. Stadhuis Gent)",
      "Authentieke materialen en soldeerwerk",
      "Natuurleien vervangen en herstellen",
      "Werken voor KU Leuven campussen",
      "Beschermde stads- en dorpsgezichten",
    ],
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
  "Elektriciteitswerken (wij werken met vaste onderaannemers)",
  "HVAC-installatie (wij werken met vaste onderaannemers)",
  "Sanitaire installatie (wij werken met vaste onderaannemers)",
  "Tuinaanleg en groenvoorziening",
  "Interieurontwerp en meubilering",
];

export function BouwRenovatieClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const isScopeInView = useInView(scopeRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] bg-[#112337] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
            alt="Nieuwbouwproject"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-[#112337]/70 to-[#112337]/40" />
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

            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Bouw & Renovatie
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Bouw, Dakwerken<br />& Erfgoed
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl">
              Van dakwerken tot monumentenrestauratie. Klasse 6 erkend voor
              publieke gebouwen met specialisatie in erfgoedrenovatie.
            </p>

            <div className="mt-10">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
              >
                Start uw project
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#204CE5]/10 text-[#204CE5] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#112337] mb-4">
                    {service.title}
                  </h3>

                  <p className="text-[#686E77] mb-6">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-[#112337]">
                        <CheckCircle className="w-4 h-4 text-[#204CE5] flex-shrink-0 mt-0.5" />
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

      {/* Scope Section */}
      <section ref={scopeRef} className="section-spacing bg-white">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isScopeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[#204CE5] uppercase tracking-wider">Scope</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#112337]">
              Wat wij wel en niet doen
            </h2>
            <p className="mt-6 text-[#686E77] max-w-2xl mx-auto">
              Transparantie over onze scope voorkomt misverstanden. Voor specialistische installaties
              werken wij samen met betrouwbare partners.
            </p>
          </motion.header>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Includes */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isScopeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#F5F5F5] p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-[#112337] mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Wat wij doen
              </h3>
              <ul className="space-y-4">
                {scopeIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#112337]">
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
              className="bg-[#F5F5F5] p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-[#112337] mb-6 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-[#686E77]" />
                Via partners
              </h3>
              <ul className="space-y-4">
                {scopeExcludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#686E77]">
                    <XCircle className="w-5 h-5 text-[#686E77] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-[#686E77] italic">
                Wij coordineren deze werken via vaste onderaannemers en kunnen een totaalofferte aanbieden.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#112337]">
        <div className="container-wide text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Klaar voor uw bouwproject?
          </h2>

          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            Plan uw project met onze gratis projectplanner. Binnen 48 uur ontvangt u
            een vrijblijvende offerte van ons team.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/projectplanner"
              className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl"
            >
              Start projectplanner
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="group inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/20"
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
