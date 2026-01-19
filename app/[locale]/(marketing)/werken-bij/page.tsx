"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  GraduationCap,
  Heart,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Award,
  Play,
} from "lucide-react";
import { COMPANY, STATS, CERTIFICATIONS } from "@/lib/constants";

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

const benefits = [
  {
    icon: Heart,
    title: "Familiale Sfeer",
    description: "Werken in een hecht team met korte communicatielijnen en persoonlijke aandacht voor elke medewerker.",
  },
  {
    icon: GraduationCap,
    title: "Opleiding & Groei",
    description: "Continue investering in jouw professionele ontwikkeling, certificeringen en vakmanschap.",
  },
  {
    icon: TrendingUp,
    title: "Doorgroeimogelijkheden",
    description: "Duidelijke carrièrepaden binnen een groeiend familiebedrijf met een sterke reputatie.",
  },
  {
    icon: Briefcase,
    title: "Afwisselend Werk",
    description: "Diverse projecten van erfgoedrenovatie tot moderne nieuwbouw bij prestigieuze opdrachtgevers.",
  },
];

const culturePoints = [
  {
    number: "01",
    title: "Vakmanschap",
    description: "Wij waarderen traditioneel vakmanschap en geven je de ruimte om te excelleren in je vak.",
  },
  {
    number: "02",
    title: "Veiligheid",
    description: "VCA** gecertificeerd. Jouw veiligheid staat altijd voorop — op elke werf, elke dag.",
  },
  {
    number: "03",
    title: "Ontwikkeling",
    description: "Regelmatige opleidingen en de mogelijkheid om certificeringen te behalen op kosten van het bedrijf.",
  },
  {
    number: "04",
    title: "Teamspirit",
    description: "Een hecht team waar iedereen elkaar kent. Regelmatige teamactiviteiten en uitjes.",
  },
];

// Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[90vh] bg-[#112337] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/original-site/team-collage.jpg"
          alt="Team De Raedt aan het werk"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337] via-[#112337]/80 to-[#112337]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-[#112337]/30" />
      </motion.div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative h-full">
        <div className="container-wide h-full flex flex-col justify-end pb-24 pt-48">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            {/* Left: Main content */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-8">
                  <span className="w-12 h-px bg-[#204CE5]" />
                  Carrière
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-white leading-[0.95] tracking-[-0.02em] mb-8"
              >
                Bouw mee aan
                <br />
                <span className="text-[#204CE5]">jouw toekomst</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-white/50 leading-relaxed max-w-lg mb-12"
              >
                Word deel van een team met {STATS.yearsExperience} jaar ervaring.
                Bij De Raedt combineer je traditioneel vakmanschap met moderne innovatie.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#vacatures"
                  className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-[0_20px_40px_rgba(32,76,229,0.3)]"
                >
                  Bekijk vacatures
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={`mailto:${COMPANY.contact.jobs}`}
                  className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 border border-white/10"
                >
                  <Play className="w-4 h-4" />
                  Spontaan solliciteren
                </a>
              </motion.div>
            </div>

            {/* Right: Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: STATS.employees, label: "Collega's", suffix: "+" },
                  { value: STATS.yearsExperience.toString(), label: "Jaar ervaring", suffix: "" },
                  { value: "VCA**", label: "Veiligheid", suffix: "" },
                  { value: openPositions.length.toString(), label: "Vacatures", suffix: "" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}<span className="text-[#204CE5]">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Benefits Section - Editorial Style
function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            <span className="w-12 h-px bg-[#204CE5]" />
            Waarom De Raedt?
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] leading-[1.1]">
            Meer dan alleen een <span className="text-[#204CE5]">job</span>
          </h2>
          <p className="mt-6 text-xl text-[#686E77] leading-relaxed">
            Wij bieden een carrière in een bedrijf waar jouw bijdrage écht telt.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-[#F8F9FA] rounded-2xl p-8 hover:bg-[#112337] transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#204CE5]/10 group-hover:bg-[#204CE5]/20 flex items-center justify-center flex-shrink-0 transition-colors duration-500">
                    <Icon className="w-6 h-6 text-[#204CE5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#112337] group-hover:text-white transition-colors duration-500 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-[#686E77] group-hover:text-white/60 transition-colors duration-500 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Team Section - Asymmetric Layout
function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#F8F9FA]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Image Column - 7 cols */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="relative aspect-[4/3] lg:aspect-[16/12] overflow-hidden rounded-2xl lg:rounded-3xl"
            >
              <Image
                src="/images/original-site/IMG_20230615_0957592-ps-scaled.jpg"
                alt="Team De Raedt"
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#112337]/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl">
                <div className="text-2xl font-bold text-[#112337]">{STATS.employees}+</div>
                <div className="text-xs text-[#686E77] uppercase tracking-wider">Collega&apos;s</div>
              </div>
            </motion.div>
          </div>

          {/* Content Column - overlapping */}
          <div className="lg:col-span-5 lg:pl-0 lg:pr-12 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-12 lg:-ml-24 lg:relative lg:z-10 shadow-xl lg:shadow-2xl"
            >
              <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
                <span className="w-8 h-px bg-[#204CE5]" />
                Ons Team
              </span>

              <h3 className="text-3xl lg:text-4xl font-bold text-[#112337] leading-tight mb-6">
                {STATS.employees} collega&apos;s, één familie
              </h3>

              <div className="space-y-4 text-[#686E77] leading-relaxed">
                <p>
                  Van ervaren vakmensen tot jonge talenten, iedereen draagt bij
                  aan ons succes. Bij De Raedt word je niet zomaar een nummer.
                </p>
                <p>
                  Je wordt deel van een hecht team dat al sinds 1930 samen bouwt
                  aan de mooiste projecten in België.
                </p>
              </div>

              {/* Team perks */}
              <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                <ul className="space-y-3">
                  {[
                    "Dagelijks vers fruit en koffie op de werf",
                    "Regelmatige teamactiviteiten",
                    "Modern en veilig materiaal",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#204CE5] flex-shrink-0" />
                      <span className="text-sm text-[#112337]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Culture Section - Numbered List
function CultureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#112337] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#204CE5] blur-[150px]" />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            Onze Cultuur
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Wat ons <span className="text-[#204CE5]">drijft</span>
          </h2>
        </motion.div>

        {/* Culture points - Numbered list */}
        <div className="space-y-0 border-t border-white/10">
          {culturePoints.map((point, index) => (
            <motion.article
              key={point.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-b border-white/10"
            >
              <div className="py-8 sm:py-10 flex items-start gap-6 sm:gap-10">
                {/* Number */}
                <span className="text-5xl sm:text-6xl font-bold text-[#204CE5] leading-none min-w-[60px] sm:min-w-[80px]">
                  {point.number}
                </span>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#204CE5] transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center gap-6"
        >
          {CERTIFICATIONS.filter(c => c.prominent).slice(0, 3).map((cert) => (
            <div key={cert.id} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-[#204CE5]" />
              <span className="text-sm font-semibold text-white">{cert.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Open Positions Section
function VacaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vacatures" ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {openPositions.length} openstaande vacatures
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] leading-[1.1]">
            Openstaande <span className="text-[#204CE5]">functies</span>
          </h2>
        </motion.div>

        {/* Job listings */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {openPositions.map((position, index) => (
            <motion.article
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={`/werken-bij/${position.slug}`}
                className="block bg-[#F8F9FA] hover:bg-[#112337] rounded-2xl p-6 sm:p-8 transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#112337] group-hover:text-white transition-colors duration-500">
                      {position.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#686E77] group-hover:text-white/60 transition-colors duration-500 line-clamp-1">
                      {position.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#686E77] group-hover:text-white/40 transition-colors duration-500">
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
                  <div className="flex items-center gap-3 text-[#204CE5] group-hover:text-white transition-colors duration-500">
                    <span className="font-semibold whitespace-nowrap">Bekijk vacature</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Spontaneous application */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#112337] to-[#1E3A5A] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#204CE5] blur-[80px]" />
            </div>

            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Staat jouw functie er niet bij?
              </h3>
              <p className="mt-4 text-white/50 max-w-lg mx-auto">
                Stuur ons een spontane sollicitatie. Wij zijn altijd op zoek naar gemotiveerd talent!
              </p>
              <a
                href={`mailto:${COMPANY.contact.jobs}`}
                className="group inline-flex items-center gap-3 mt-8 bg-white text-[#112337] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#204CE5] hover:text-white"
              >
                Spontaan solliciteren
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#F8F9FA]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Content */}
          <div>
            <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-12 h-px bg-[#204CE5]" />
              Contact
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#112337] leading-[1.1] mb-6">
              Heb je nog <span className="text-[#204CE5]">vragen</span>?
            </h2>

            <p className="text-lg text-[#686E77] leading-relaxed mb-8">
              Neem gerust contact op met ons HR team. Wij helpen je graag verder
              met al je vragen over werken bij De Raedt.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${COMPANY.contact.jobs}`}
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-[0_20px_40px_rgba(32,76,229,0.3)]"
              >
                Email HR team
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="inline-flex items-center gap-3 bg-white text-[#112337] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#112337] hover:text-white border border-[#E5E7EB]"
              >
                {COMPANY.contact.phone}
              </a>
            </div>
          </div>

          {/* Right: Info card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl">
            <h3 className="text-2xl font-bold text-[#112337] mb-6">
              Onze voordelen
            </h3>
            <ul className="space-y-4">
              {[
                "Competitief salaris en extralegale voordelen",
                "Bedrijfswagen (functie-afhankelijk)",
                "Groepsverzekering en hospitalisatieverzekering",
                "13e maand en eindejaarspremie",
                "Maaltijdcheques",
                "Opleiding op kosten van het bedrijf",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0" />
                  <span className="text-[#112337]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function WerkenBijPage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <TeamSection />
      <CultureSection />
      <VacaturesSection />
      <CTASection />
    </>
  );
}
