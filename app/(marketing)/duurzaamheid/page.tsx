"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Sun, Building2, Shield, Award } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";

const initiatives = [
  {
    icon: Recycle,
    title: "Afvalbeheer",
    description:
      "Wij sorteren en recycleren bouwafval waar mogelijk, om de impact op het milieu te minimaliseren.",
  },
  {
    icon: Sun,
    title: "Energie-efficiëntie",
    description:
      "Wij adviseren en implementeren energie-efficiënte oplossingen in onze projecten.",
  },
  {
    icon: Leaf,
    title: "Duurzame Materialen",
    description:
      "Waar mogelijk kiezen wij voor duurzame en lokaal geproduceerde materialen.",
  },
  {
    icon: Building2,
    title: "Renovatie boven Nieuwbouw",
    description:
      "Door bestaande gebouwen te renoveren, vermijden we onnodige sloop en nieuwbouw.",
  },
];

export default function DuurzaamheidPage() {
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
              Duurzaam Bouwen
            </h1>
            <p className="mt-6 text-xl text-white/70">
              Wij nemen onze verantwoordelijkheid voor een duurzamere
              bouwsector. Met respect voor mens, milieu en maatschappij.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Onze Certificeringen
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Onze certificeringen tonen onze toewijding aan kwaliteit,
              veiligheid en duurzaamheid.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-[#F7FAFC] p-8 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1E3A5F] text-white">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#1E3A5F]">
                  {cert.name}
                </h3>
                <p className="mt-2 text-gray-600">{cert.description}</p>
                {cert.verified && (
                  <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    <Shield className="h-4 w-4" />
                    Geverifieerd
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="section-padding bg-[#EBF4FF]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Onze Duurzaamheidsinitiatieven
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Concrete acties die wij ondernemen voor een duurzamere bouwsector.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {initiatives.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E3A5F] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E3A5F]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#1E3A5F] md:text-4xl"
            >
              Onze Toekomstplannen
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-gray-600"
            >
              Wij blijven investeren in duurzamere bouwmethodes en
              certificeringen. Onze ambitie is om voorloper te zijn in duurzaam
              bouwen in België.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 rounded-2xl bg-[#F7FAFC] p-6"
            >
              <p className="text-sm text-gray-500">
                Wij werken continu aan het verbeteren van onze duurzaamheidsprestaties.
                Neem contact met ons op voor meer informatie over onze initiatieven.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
