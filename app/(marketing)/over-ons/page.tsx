"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Target, Heart, Shield, Users, Award, ArrowRight } from "lucide-react";
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
    icon: Target,
    title: "Kwaliteit",
    description: "Wij streven naar de hoogste kwaliteit in elk project. Geen compromissen, alleen vakmanschap.",
  },
  {
    icon: Heart,
    title: "Passie",
    description: "Bouwen zit in ons DNA. Elke steen, elke renovatie draagt onze toewijding.",
  },
  {
    icon: Shield,
    title: "Betrouwbaarheid",
    description: "Al {years} jaar een betrouwbare partner. Onze reputatie is gebouwd op vertrouwen.",
  },
  {
    icon: Users,
    title: "Samenwerking",
    description: "Wij bouwen niet alleen gebouwen, maar ook relaties. Samen bereiken we meer.",
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
      <section ref={timelineRef} className="section-spacing bg-white">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="label-overline">Onze Geschiedenis</span>
            <h2 className="mt-4 heading-lg">
              Mijlpalen door de <span className="text-[#204CE5]">jaren</span>
            </h2>
          </motion.header>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#204CE5]/20 md:-translate-x-px" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="bg-[#F5F5F5] p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="text-3xl font-bold text-[#204CE5]">{item.year}</div>
                    <h3 className="mt-2 text-xl font-bold text-[#112337]">{item.title}</h3>
                    <p className="mt-3 text-[#686E77] text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#204CE5] rounded-full -translate-x-1/2 mt-8" />
              </motion.div>
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
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Onze Waarden
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Waar wij voor <span className="text-[#204CE5]">staan</span>
            </h2>
          </motion.header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-8 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#204CE5]/20 text-[#204CE5] mb-6 transition-all duration-300 group-hover:bg-[#204CE5] group-hover:text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                  <p className="mt-4 text-white/50 text-sm leading-relaxed">
                    {value.description.replace("{years}", String(STATS.yearsExperience))}
                  </p>
                </motion.article>
              );
            })}
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
