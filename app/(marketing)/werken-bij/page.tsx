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
      <section ref={heroRef} className="relative min-h-[70vh] bg-[#0C0C0C] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/team-collage.jpg"
            alt="Team De Raedt"
            fill
            className="object-cover image-cinematic"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/60 to-[#0C0C0C]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/80 to-transparent" />
        </div>

        <div className="container-wide relative pb-20 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] mb-8">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Wij zijn op zoek naar talent
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-[-0.02em]">
              Bouw mee aan
              <br />
              <span className="text-heritage-gradient">jouw toekomst</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/50 leading-relaxed max-w-xl font-serif font-light">
              Word deel van een team met {STATS.yearsExperience} jaar ervaring.
              Bij De Raedt combineer je vakmanschap met innovatie.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#vacatures"
                className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
              >
                Bekijk vacatures
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={`mailto:${COMPANY.contact.jobs}`}
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5"
              >
                Spontaan solliciteren
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="section-spacing bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Waarom De Raedt?</span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="heading-section text-[#0C0C0C]">
              Meer dan alleen een job
            </h2>
            <p className="mt-6 text-[#6B6560] max-w-2xl mx-auto">
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
                  className="group bg-white p-8 hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C] mb-6 transition-colors duration-300 group-hover:bg-[#9A6B4C] group-hover:text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl text-[#0C0C0C]">{benefit.title}</h3>
                  <p className="mt-3 text-sm text-[#6B6560] leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section-spacing bg-white relative">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-[#9A6B4C]" />
                <span className="label-overline">Ons Team</span>
              </div>

              <h2 className="heading-section text-[#0C0C0C]">
                {STATS.employees} collega&apos;s,
                <br />één familie
              </h2>

              <p className="mt-8 text-[#6B6560] leading-relaxed">
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
                  <li key={item} className="flex items-center gap-3 text-[#0C0C0C]">
                    <CheckCircle className="w-5 h-5 text-[#9A6B4C] flex-shrink-0" />
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
              <div className="aspect-square relative image-reveal">
                <Image
                  src="/images/original-site/IMG_20230615_0957592-ps-scaled.jpg"
                  alt="Team De Raedt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#9A6B4C]/30" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#9A6B4C]/30" />

              {/* Floating stats */}
              <div className="absolute -bottom-8 -right-8 bg-[#0C0C0C] text-white p-8">
                <div className="font-display text-4xl">{STATS.employees}</div>
                <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mt-1">
                  Medewerkers
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="vacatures" ref={vacaturesRef} className="section-spacing bg-[#0C0C0C] relative">
        <div className="absolute inset-0 texture-stone opacity-30" />

        <div className="container-wide relative">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isVacaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Vacatures</span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="heading-section text-white">
              Openstaande functies
            </h2>
          </motion.header>

          <div className="space-y-4 max-w-4xl mx-auto">
            {openPositions.map((position, index) => (
              <motion.article
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVacaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/5 hover:bg-white/10 p-6 sm:p-8 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-display text-2xl text-white group-hover:text-[#9A6B4C] transition-colors">
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
                    className="group/btn inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C] whitespace-nowrap"
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
            <div className="bg-[#9A6B4C]/10 border border-[#9A6B4C]/20 p-8 sm:p-12 text-center">
              <h3 className="font-display text-2xl text-white">
                Staat jouw functie er niet bij?
              </h3>
              <p className="mt-4 text-white/50">
                Stuur ons een spontane sollicitatie. Wij zijn altijd op zoek naar talent!
              </p>
              <a
                href={`mailto:${COMPANY.contact.jobs}`}
                className="group inline-flex items-center gap-3 mt-8 bg-white text-[#0C0C0C] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#FAF7F2]"
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
