"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  GraduationCap,
  Heart,
  TrendingUp,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react";
import { COMPANY, STATS } from "@/lib/constants";

const benefits = [
  {
    icon: Heart,
    title: "Familiale Sfeer",
    description: "Werken in een hecht team met korte communicatielijnen en persoonlijke aandacht.",
  },
  {
    icon: GraduationCap,
    title: "Opleiding & Groei",
    description: "Continue investering in jouw professionele ontwikkeling en certificeringen.",
  },
  {
    icon: TrendingUp,
    title: "Doorgroeimogelijkheden",
    description: "Duidelijke carrièrepaden binnen een groeiend familiebedrijf.",
  },
  {
    icon: Briefcase,
    title: "Afwisselend Werk",
    description: "Diverse projecten van erfgoedrenovatie tot moderne nieuwbouw.",
  },
];

// Import jobs from seed data
import jobsData from "@/scripts/seed/jobs.json";

interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  employment_type: string;
  location: string;
  description: string;
  status: string;
}

const allJobs: Job[] = jobsData as Job[];
const openPositions = allJobs.filter((job) => job.status === "published");

function getEmploymentTypeLabel(type: string): string {
  const types: Record<string, string> = {
    full_time: "Voltijds",
    part_time: "Deeltijds",
    contract: "Contract",
    internship: "Stage",
  };
  return types[type] || type;
}

export default function WerkenBijPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const vacaturesRef = useRef<HTMLDivElement>(null);

  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const isVacaturesInView = useInView(vacaturesRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] bg-[#112337] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/team-collage.jpg"
            alt="Team De Raedt"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-[#112337]/60 to-[#112337]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/80 to-transparent" />
        </div>

        <div className="container-wide relative pb-20 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Wij zijn op zoek naar talent
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Bouw mee aan
              <br />
              <span className="text-[#204CE5]">jouw toekomst</span>
            </h1>

            <p className="mt-8 text-lg text-white/60 leading-relaxed max-w-xl">
              Word deel van een team met {STATS.yearsExperience} jaar ervaring.
              Bij De Raedt combineer je vakmanschap met innovatie.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#vacatures"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30"
              >
                Bekijk vacatures
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={`mailto:${COMPANY.contact.jobs}`}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/20"
              >
                Spontaan solliciteren
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="label-overline">Waarom De Raedt?</span>
            <h2 className="mt-4 heading-lg">
              Meer dan alleen een <span className="text-[#204CE5]">job</span>
            </h2>
            <p className="mt-4 text-[#686E77] max-w-2xl mx-auto">
              Wij bieden een carrière in een bedrijf waar jouw bijdrage telt.
            </p>
          </motion.header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#204CE5]/10 text-[#204CE5] mb-6 transition-colors duration-300 group-hover:bg-[#204CE5] group-hover:text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#112337]">{benefit.title}</h3>
                  <p className="mt-3 text-sm text-[#686E77] leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section-spacing bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="label-overline">Ons Team</span>

              <h2 className="mt-4 heading-lg">
                {STATS.employees} collega&apos;s,
                <br />één <span className="text-[#204CE5]">familie</span>
              </h2>

              <p className="mt-6 text-[#686E77] leading-relaxed">
                Van ervaren vakmensen tot jonge talenten, iedereen draagt bij
                aan ons succes. Bij De Raedt word je niet zomaar een nummer —
                je wordt deel van een hecht team dat al generaties lang samen bouwt.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Dagelijks vers fruit en koffie op de werf",
                  "Regelmatige teamactiviteiten en uitjes",
                  "Flexibele werkuren waar mogelijk",
                  "Modern en veilig materiaal",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#112337]">
                    <CheckCircle className="w-5 h-5 text-[#204CE5] flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
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

              {/* Floating stats */}
              <div className="absolute -bottom-6 -right-6 bg-[#112337] text-white rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-[#204CE5]" />
                  <div>
                    <div className="text-3xl font-bold">{STATS.employees}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Medewerkers
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="vacatures" ref={vacaturesRef} className="section-spacing bg-[#112337]">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isVacaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Vacatures
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Openstaande <span className="text-[#204CE5]">functies</span>
            </h2>
          </motion.header>

          <div className="space-y-4 max-w-4xl mx-auto">
            {openPositions.map((position, index) => (
              <motion.article
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVacaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 sm:p-8 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#204CE5] transition-colors">
                      {position.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/50">{position.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {getEmploymentTypeLabel(position.employment_type)}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/werken-bij/${position.slug}`}
                    className="group/btn inline-flex items-center gap-3 bg-[#204CE5] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] whitespace-nowrap"
                  >
                    Bekijk vacature
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Spontaneous application */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVacaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-[#204CE5]/10 border border-[#204CE5]/20 rounded-2xl p-8 sm:p-12 text-center">
              <h3 className="text-2xl font-bold text-white">
                Staat jouw functie er niet bij?
              </h3>
              <p className="mt-4 text-white/60">
                Stuur ons een spontane sollicitatie. Wij zijn altijd op zoek naar talent!
              </p>
              <a
                href={`mailto:${COMPANY.contact.jobs}`}
                className="group inline-flex items-center gap-3 mt-8 bg-white text-[#112337] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#F5F5F5]"
              >
                Spontaan solliciteren
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
