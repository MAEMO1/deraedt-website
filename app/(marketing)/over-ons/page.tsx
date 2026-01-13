"use client";

import { motion } from "framer-motion";
import { Clock, Users, Award, Target, Heart, Shield } from "lucide-react";
import { COMPANY, STATS, CERTIFICATIONS } from "@/lib/constants";

const timeline = [
  { year: 1930, event: "Oprichting van het familiebedrijf in Zele" },
  { year: 1960, event: "Uitbreiding naar grotere bouwprojecten" },
  { year: 1990, event: "Specialisatie in erfgoedrenovatie" },
  { year: 2010, event: "ISO 9001 certificering behaald" },
  { year: 2020, event: "90 jaar vakmanschap gevierd" },
  { year: 2024, event: "Groei naar 40+ medewerkers" },
];

const values = [
  {
    icon: Target,
    title: "Kwaliteit",
    description:
      "Wij streven naar de hoogste kwaliteit in elk project, groot of klein.",
  },
  {
    icon: Heart,
    title: "Passie",
    description:
      "Bouwen is onze passie. Wij houden van wat we doen en dat zie je in het resultaat.",
  },
  {
    icon: Shield,
    title: "Betrouwbaarheid",
    description:
      "Al 96 jaar een betrouwbare partner voor particulieren en overheden.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1E3A5F] pb-16 pt-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {STATS.yearsExperience} jaar vakmanschap
            </h1>
            <p className="mt-6 text-xl text-white/70">
              Sinds {COMPANY.founded} bouwt De Raedt mee aan de toekomst van
              België. Drie generaties vakmanschap, innovatie en toewijding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#EBF4FF] py-12">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Clock className="mx-auto h-8 w-8 text-[#1E3A5F]" />
              <div className="mt-4 text-3xl font-bold text-[#1E3A5F]">
                {STATS.yearsExperience}
              </div>
              <div className="text-gray-600">Jaar ervaring</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Users className="mx-auto h-8 w-8 text-[#1E3A5F]" />
              <div className="mt-4 text-3xl font-bold text-[#1E3A5F]">
                {STATS.employees}
              </div>
              <div className="text-gray-600">Medewerkers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Award className="mx-auto h-8 w-8 text-[#1E3A5F]" />
              <div className="mt-4 text-3xl font-bold text-[#1E3A5F]">
                Klasse {STATS.erkenningsklasse}
              </div>
              <div className="text-gray-600">Erkenning</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Award className="mx-auto h-8 w-8 text-[#1E3A5F]" />
              <div className="mt-4 text-3xl font-bold text-[#1E3A5F]">
                {CERTIFICATIONS.length}
              </div>
              <div className="text-gray-600">Certificeringen</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#1E3A5F] md:text-4xl"
            >
              Ons Verhaal
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-gray-600"
            >
              Wat begon als een klein familiebedrijf in Zele, is uitgegroeid tot
              een gerenommeerd bouwbedrijf met meer dan {STATS.employees}{" "}
              medewerkers. Al drie generaties lang combineren wij traditioneel
              vakmanschap met moderne bouwtechnieken.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-[#F7FAFC]">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-[#1E3A5F] md:text-4xl"
          >
            Onze Geschiedenis
          </motion.h2>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-[#4299E1]/20 md:left-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative mb-8 flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="text-2xl font-bold text-[#4299E1]">
                      {item.year}
                    </div>
                    <div className="mt-2 text-gray-600">{item.event}</div>
                  </div>
                </div>
                <div className="absolute left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A5F] text-white md:left-1/2 md:-translate-x-1/2">
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-[#1E3A5F] md:text-4xl"
          >
            Onze Waarden
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#EBF4FF] text-[#1E3A5F]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#1E3A5F]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
