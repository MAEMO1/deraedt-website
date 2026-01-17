"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Award, ArrowRight } from "lucide-react";
import { COMPANY, STATS, CERTIFICATIONS } from "@/lib/constants";

const timeline = [
  { year: 1930, title: "De Stichting", description: "Oprichting van het familiebedrijf in Zele door de familie De Raedt" },
  { year: 1960, title: "Groei & Expansie", description: "Uitbreiding naar grotere bouwprojecten en eerste overheidscontracten" },
  { year: 1990, title: "Erfgoed Specialisatie", description: "Focus op erfgoedrenovatie en monumentenzorg" },
  { year: 2010, title: "Kwaliteitserkenning", description: "ISO 9001 certificering en VCA** veiligheidscertificaat" },
  { year: 2020, title: "90 Jaar Vakmanschap", description: "Viering van negen decennia bouwen aan België" },
  { year: 2024, title: "Verdere Groei", description: "Uitbreiding team naar 40+ medewerkers en Klasse 6 erkenning" },
];

const values = [
  {
    title: "Verantwoordelijkheid",
    description: "Wij nemen volledige verantwoordelijkheid voor elk project. Van start tot oplevering staan wij garant voor kwaliteit.",
  },
  {
    title: "Veiligheid",
    description: "VCA** gecertificeerd. Veiligheid van onze medewerkers en opdrachtgevers staat altijd voorop.",
  },
  {
    title: "Vrijheid",
    description: "Ruimte voor initiatief en creativiteit. Onze medewerkers krijgen de vrijheid om hun vakmanschap te tonen.",
  },
  {
    title: "Vertrouwen",
    description: "Al meer dan 90 jaar een betrouwbare partner. Onze reputatie is gebouwd op wederzijds vertrouwen.",
  },
  {
    title: "Vooruitgang",
    description: "Continue groei en ontwikkeling. Wij investeren in innovatie, opleiding en duurzaamheid.",
  },
];

const teamStats = [
  { value: "3", label: "Generaties", suffix: "" },
  { value: "40", label: "Vakmannen", suffix: "+" },
  { value: "500", label: "Projecten", suffix: "+" },
  { value: "6", label: "Klasse Erkenning", suffix: "" },
];

export default function OverOnsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] bg-[#112337] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/team-collage.jpg"
            alt="Team De Raedt aan het werk"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-[#112337]/60 to-[#112337]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container-wide relative pb-20 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Over Ons
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {STATS.yearsExperience} jaar
              <br />
              <span className="text-[#204CE5]">vakmanschap</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl">
              Sinds {COMPANY.founded} bouwt De Raedt mee aan de toekomst van België.
              Drie generaties vakmanschap, innovatie en toewijding.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10"
          >
            {teamStats.map((stat) => (
              <div key={stat.label} className="md:px-8 first:md:pl-0 last:md:pr-0">
                <div className="text-4xl lg:text-5xl font-bold text-white">
                  {stat.value}<span className="text-[#204CE5]">{stat.suffix}</span>
                </div>
                <div className="mt-1 text-xs text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
                alt="Erfgoedrenovatie Justitiepaleis"
                fill
                className="object-cover"
              />
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 bg-[#112337] text-white p-8 rounded-2xl shadow-2xl">
                <div className="text-5xl font-bold">1930</div>
                <div className="text-xs text-[#204CE5] uppercase tracking-wider mt-1">Opgericht</div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-overline">Ons Verhaal</span>

              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#112337] leading-tight">
                Drie generaties
                <br />bouwen aan <span className="text-[#204CE5]">België</span>
              </h2>

              <div className="mt-8 space-y-6 text-[#686E77] leading-relaxed">
                <p>
                  Wat begon als een klein familiebedrijf in Zele, is uitgegroeid tot een
                  gerenommeerd bouwbedrijf met meer dan {STATS.employees} medewerkers.
                </p>
                <p>
                  Al drie generaties lang combineren wij traditioneel vakmanschap met
                  moderne bouwtechnieken. Onze specialisatie in erfgoedrenovatie maakt
                  ons de partner bij uitstek voor de restauratie van historische
                  gebouwen en monumenten.
                </p>
                <p>
                  Met een Klasse 6 erkenning zijn wij bevoegd voor de meest complexe
                  overheidsopdrachten. Onze ISO 9001 en VCA** certificeringen garanderen
                  kwaliteit en veiligheid op elke werf.
                </p>
              </div>

              {/* Certifications */}
              <div className="mt-10 flex items-center gap-6 pt-8 border-t border-[#112337]/10">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#204CE5]" />
                    <span className="text-sm font-semibold text-[#112337]">{cert.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 sm:mb-20"
          >
            <span className="label-overline">Onze Geschiedenis</span>
            <h2 className="mt-4 heading-lg max-w-2xl">
              Al meer dan <span className="text-[#204CE5]">90 jaar</span> bouwen aan België
            </h2>
          </motion.header>

          {/* Timeline - Compact numbered list */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#112337]/10">
            {timeline.map((item, index) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isTimelineInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-white p-8 hover:bg-[#112337] transition-all duration-500 cursor-default"
              >
                {/* Year */}
                <div className="mb-4">
                  <span className="text-5xl font-bold text-[#204CE5] group-hover:text-white transition-colors tracking-tight">
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#112337] group-hover:text-white transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#686E77] group-hover:text-white/70 transition-colors leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="section-spacing bg-[#112337]">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              De 5 V&apos;s
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Waar wij voor <span className="text-[#204CE5]">staan</span>
            </h2>
          </motion.header>

          {/* Values list - clean numbered list */}
          <div className="space-y-0 border-t border-white/10">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border-b border-white/10"
              >
                <div className="py-8 sm:py-10 flex items-start gap-6 sm:gap-10">
                  {/* Number */}
                  <span className="text-5xl sm:text-6xl font-bold text-[#204CE5] leading-none min-w-[60px] sm:min-w-[80px]">
                    {index + 1}
                  </span>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#204CE5] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
                      {value.description.replace("{years}", String(STATS.yearsExperience))}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="label-overline">Ons Team</span>

              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#112337] leading-tight">
                Vakmannen met
                <br />passie voor <span className="text-[#204CE5]">bouwen</span>
              </h2>

              <p className="mt-8 text-[#686E77] leading-relaxed max-w-lg">
                Ons team van meer dan 40 vakmannen brengt decennia aan ervaring samen.
                Van metselaars tot projectmanagers, iedereen deelt dezelfde passie voor
                kwaliteit en vakmanschap.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/werken-bij"
                  className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl"
                >
                  Bekijk vacatures
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-white text-[#112337] px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#112337] hover:text-white"
                >
                  Neem contact op
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/original-site/IMG_20230615_0957592-ps-scaled.jpg"
                  alt="Team De Raedt"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="relative bg-[#112337] p-12 sm:p-16 lg:p-20 rounded-2xl overflow-hidden text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Klaar om te <span className="text-[#204CE5]">bouwen</span>?
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed max-w-xl mx-auto">
              Neem contact op voor een vrijblijvend gesprek over uw bouwplannen.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl"
              >
                Start uw project
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/20"
              >
                Contact opnemen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
