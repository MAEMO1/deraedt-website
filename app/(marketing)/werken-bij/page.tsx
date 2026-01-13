"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Heart,
  TrendingUp,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY, STATS } from "@/lib/constants";

const benefits = [
  {
    icon: Heart,
    title: "Familiale Sfeer",
    description: "Werken in een hecht team met korte communicatielijnen.",
  },
  {
    icon: GraduationCap,
    title: "Opleiding & Groei",
    description: "Investering in jouw professionele ontwikkeling.",
  },
  {
    icon: TrendingUp,
    title: "Doorgroeimogelijkheden",
    description: "Carrièreperspectief binnen een groeiend bedrijf.",
  },
  {
    icon: Briefcase,
    title: "Afwisselend Werk",
    description: "Diverse projecten van renovatie tot nieuwbouw.",
  },
];

const openPositions = [
  {
    title: "Werfleider",
    department: "Bouw",
    type: "Voltijds",
    location: "Oost-Vlaanderen",
  },
  {
    title: "Metselaar",
    department: "Uitvoering",
    type: "Voltijds",
    location: "Oost-Vlaanderen",
  },
  {
    title: "Projectleider",
    department: "Projectmanagement",
    type: "Voltijds",
    location: "Zele",
  },
];

export default function WerkenBijPage() {
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
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              Wij zijn op zoek naar talent!
            </Badge>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Bouw mee aan jouw toekomst
            </h1>
            <p className="mt-6 text-xl text-white/70">
              Word deel van een team met {STATS.yearsExperience} jaar ervaring.
              Bij De Raedt combineer je vakmanschap met innovatie.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E3A5F] hover:bg-white/90"
              >
                <a href="#vacatures">
                  Bekijk Vacatures
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/contact">Spontaan Solliciteren</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Work Here Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Waarom werken bij De Raedt?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Wij bieden meer dan alleen een job. Wij bieden een carrière in een
              bedrijf waar jouw bijdrage telt.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF4FF] text-[#1E3A5F]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#1E3A5F]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-[#F7FAFC]">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
                Ons Team
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Met {STATS.employees} collega's vormen wij een hecht team.
                Van ervaren vakmensen tot jonge talenten, iedereen draagt bij
                aan ons succes.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E3A5F] text-white">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1E3A5F]">
                    {STATS.employees}
                  </div>
                  <div className="text-gray-600">Medewerkers</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video overflow-hidden rounded-2xl bg-[#1E3A5F]"
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <Users className="h-24 w-24" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="vacatures" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Openstaande Vacatures
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Bekijk onze huidige vacatures en vind jouw volgende uitdaging.
            </p>
          </motion.div>

          <div className="mt-12 space-y-4">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E3A5F] group-hover:text-[#4299E1]">
                      {position.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary">{position.department}</Badge>
                      <Badge variant="outline">{position.type}</Badge>
                      <Badge variant="outline">{position.location}</Badge>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/contact?subject=sollicitatie&job=${position.title}`}>
                      Solliciteer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl bg-[#EBF4FF] p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-[#1E3A5F]">
              Staat jouw functie er niet bij?
            </h3>
            <p className="mt-2 text-gray-600">
              Stuur ons een spontane sollicitatie. Wij zijn altijd op zoek naar
              talent!
            </p>
            <Button asChild className="mt-6">
              <a href={`mailto:${COMPANY.contact.jobs}`}>
                Spontaan Solliciteren
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
