"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Building2,
  Hammer,
  Landmark,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  Play,
  CheckCircle2,
  Phone,
  ChevronRight,
} from "lucide-react";
import { COMPANY, STATS, CERTIFICATIONS } from "@/lib/constants";

// Service routes mapping
const serviceRoutes: Record<string, string> = {
  bouwwerken: "/diensten/bouwwerken",
  dakwerken: "/diensten/dakwerken",
  erfgoed: "/diensten/erfgoed",
  facility: "/diensten/facility",
};

const services = [
  {
    id: "bouwwerken",
    icon: Building2,
    title: "Algemene Bouwwerken",
    subtitle: "Klasse 6 erkend",
    shortDesc: "Bouwprojecten van A tot Z",
    description:
      "Van fundament tot afwerking — complete bouwprojecten voor overheden, scholen en bedrijven. Onze Klasse 6 erkenning staat garant voor projecten zonder aanbestedingsgrens.",
    features: [
      "Publieke gebouwen & onderwijsinfrastructuur",
      "Verbouwingen en uitbreidingen",
      "Structurele werken en afwerking",
      "Klasse 6 erkenning — geen projectlimiet",
    ],
    stats: { value: "€22,7M", label: "Jaaromzet" },
    image: "/images/original-site/Atlas-College-Genk-10-scaled.jpg",
    accent: "#204CE5",
  },
  {
    id: "dakwerken",
    icon: Hammer,
    title: "Dakwerken",
    subtitle: "Dak- & gevelspecialist",
    shortDesc: "Hellend tot plat",
    description:
      "Experts in dakconstructie — van traditionele natuurleien tot moderne Sarking isolatie. Inclusief koperbekleding, zinkwerk en valbeveiliging conform de strengste veiligheidsnormen.",
    features: [
      "Hellende en platte daksystemen",
      "Sarking isolatie voor optimale EPB",
      "Koper- en zinkbekleding",
      "Valbeveiliging en dakgoten",
    ],
    stats: { value: "VCA**", label: "Veiligheidscertificaat" },
    image: "/images/original-site/Foto-Stadhuis-Gent.jpeg",
    accent: "#1E3A5A",
  },
  {
    id: "erfgoed",
    icon: Landmark,
    title: "Erfgoedrenovatie",
    subtitle: "Monumentenrestauratie",
    shortDesc: "Beschermd erfgoed",
    description:
      "Gespecialiseerde restauratie van beschermd bouwkundig erfgoed. Met authentieke materialen, traditionele technieken en in nauwe samenwerking met Onroerend Erfgoed.",
    features: [
      "Monumentenrestauratie & -behoud",
      "Authentiek soldeerwerk en ambacht",
      "Natuurleien volgens historische methodes",
      "Referenties: Stadhuis Gent, Brussel, KU Leuven",
    ],
    stats: { value: "96", label: "Jaar vakmanschap" },
    image: "/images/original-site/Justitiepaleis-Dendermonde.jpg",
    accent: "#112337",
  },
  {
    id: "facility",
    icon: Wrench,
    title: "Onderhoud & Interventies",
    subtitle: "Raamcontracten",
    shortDesc: "Langlopende partnerships",
    description:
      "Langlopende raamcontracten voor dakonderhoud, herstellingen en renovatiewerken. Actieve contracten met Stad Gent, Stad Brussel, VEB en KU Leuven.",
    features: [
      "Raamcontract Stad Gent & Brussel",
      "VEB scholenonderhoud",
      "24/7 interventies bij schade",
      "Preventief onderhoud & inspectie",
    ],
    stats: { value: "4", label: "Raamcontracten" },
    image: "/images/original-site/Koning-Boudewijn-Stadion.webp",
    accent: "#204CE5",
  },
];

const workProcess = [
  {
    step: "01",
    title: "Intake",
    description: "Analyse van uw wensen en mogelijkheden",
  },
  {
    step: "02",
    title: "Ontwerp",
    description: "Gedetailleerde offerte met transparante prijzen",
  },
  {
    step: "03",
    title: "Planning",
    description: "Coördinatie van vergunningen en materialen",
  },
  {
    step: "04",
    title: "Uitvoering",
    description: "Kwaliteitscontroles en voortgangsrapportage",
  },
  {
    step: "05",
    title: "Oplevering",
    description: "Grondige controle en nazorggarantie",
  },
];

// Hero Section Component
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
          src="/images/original-site/Foto-Stadhuis-Brussel.png"
          alt="Stadhuis Brussel"
          fill
          className="object-cover"
          priority
        />
        {/* Dramatic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337] via-[#112337]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-[#112337]/40" />
      </motion.div>

      {/* Subtle noise texture */}
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
                  Onze Expertise
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[clamp(3rem,8vw,6rem)] font-bold text-white leading-[0.95] tracking-[-0.02em] mb-8"
              >
                Building
                <br />
                <span className="text-[#204CE5]">Excellence</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-white/50 leading-relaxed max-w-lg mb-12"
              >
                {STATS.yearsExperience} jaar vakmanschap. Van monumentale erfgoedrenovatie
                tot innovatieve nieuwbouw — Klasse 6 erkend voor projecten zonder grenzen.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/projectplanner"
                  className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-[0_20px_40px_rgba(32,76,229,0.3)]"
                >
                  Start uw project
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#diensten"
                  className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 border border-white/10"
                >
                  <Play className="w-4 h-4" />
                  Ontdek onze diensten
                </Link>
              </motion.div>
            </div>

            {/* Right: Stats cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { value: STATS.yearsExperience.toString(), label: "Jaar ervaring", suffix: "" },
                { value: "6", label: "Erkenningsklasse", suffix: "" },
                { value: STATS.revenueDisplay.replace("€", ""), label: "Jaaromzet", suffix: "" },
                { value: STATS.employees, label: "Medewerkers", suffix: "+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </motion.div>
              ))}
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

// Service Card Component - Editorial Style
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className={`grid lg:grid-cols-12 gap-8 lg:gap-0 items-stretch ${isReversed ? "" : ""}`}>
        {/* Image Column - 7 cols */}
        <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] lg:aspect-[16/12] overflow-hidden rounded-2xl lg:rounded-3xl"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#112337]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating stat badge - position based on layout direction */}
            <div className={`absolute bottom-6 ${isReversed ? "right-6" : "left-6"} bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl`}>
              <div className="text-2xl font-bold text-[#112337]">{service.stats.value}</div>
              <div className="text-xs text-[#686E77] uppercase tracking-wider">{service.stats.label}</div>
            </div>
          </motion.div>
        </div>

        {/* Content Column - 5 cols with overlap */}
        <div className={`lg:col-span-5 ${isReversed ? "lg:order-1 lg:pr-0 lg:pl-12" : "lg:pl-0 lg:pr-12"} flex items-center`}>
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -50 : 50, y: 30 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-white lg:bg-[#F8F9FA] rounded-2xl lg:rounded-3xl p-8 lg:p-12 ${isReversed ? "lg:-mr-24" : "lg:-ml-24"} lg:relative lg:z-10 shadow-xl lg:shadow-2xl`}
          >
            {/* Icon & Category */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${service.accent}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: service.accent }} />
              </div>
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-[0.15em]"
                  style={{ color: service.accent }}
                >
                  {service.subtitle}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl lg:text-4xl font-bold text-[#112337] leading-tight mb-4">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-[#686E77] leading-relaxed mb-8">
              {service.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-10">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: service.accent }}
                  />
                  <span className="text-sm text-[#112337]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={serviceRoutes[service.id]}
                className="group/btn inline-flex items-center gap-2 bg-[#112337] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#1E3A5A]"
              >
                Meer informatie
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
              <Link
                href="/projectplanner"
                className="inline-flex items-center gap-2 text-[#112337] px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 hover:text-[#204CE5] border border-[#E5E7EB] hover:border-[#204CE5]"
              >
                Offerte aanvragen
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// Process Section Component
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-50" />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-20"
        >
          <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            <span className="w-12 h-px bg-[#204CE5]" />
            Werkwijze
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#112337] leading-[1.1] mb-6">
            Van plan tot{" "}
            <span className="text-[#204CE5]">oplevering</span>
          </h2>
          <p className="text-lg text-[#686E77] leading-relaxed">
            Een transparant proces met duidelijke communicatie.
            U weet altijd waar u aan toe bent.
          </p>
        </motion.div>

        {/* Process Steps - Horizontal Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-[#204CE5]/20 via-[#204CE5]/40 to-[#204CE5]/20 hidden md:block" />

          <div className="grid md:grid-cols-5 gap-8 md:gap-6">
            {workProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center group"
              >
                {/* Step number */}
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#F5F5F5] flex items-center justify-center transition-all duration-300 group-hover:bg-[#204CE5]/10">
                    <span className="text-3xl font-bold text-[#204CE5]">{step.step}</span>
                  </div>
                  {/* Active dot */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#204CE5] hidden md:block" />
                </div>

                <h3 className="text-xl font-bold text-[#112337] mb-3">{step.title}</h3>
                <p className="text-sm text-[#686E77] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#112337]" />

      {/* Decorative elements */}
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-8">
              <span className="w-12 h-px bg-[#204CE5]" />
              Start Uw Project
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
              Klaar om te{" "}
              <span className="text-[#204CE5]">beginnen</span>?
            </h2>

            <p className="text-xl text-white/50 leading-relaxed mb-12 max-w-lg">
              Plan uw project met onze gratis projectplanner.
              Binnen 48 uur ontvangt u een vrijblijvende offerte van ons team.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#4D6FEB] hover:shadow-[0_20px_40px_rgba(32,76,229,0.4)]"
              >
                Start projectplanner
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 border border-white/10"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.contact.phone}
              </a>
            </div>
          </motion.div>

          {/* Right: Trust card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8">
                Waarom De Raedt?
              </h3>

              <ul className="space-y-5">
                {[
                  `${STATS.yearsExperience} jaar ervaring in de bouwsector`,
                  "Klasse 6 erkend voor overheidsopdrachten",
                  "ISO 9001 & VCA** gecertificeerd",
                  "CO₂-Prestatieladder niveau 3",
                  "Specialisten in erfgoedrenovatie",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#204CE5]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#204CE5]" />
                    </div>
                    <span className="text-white/70">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Certification badges */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex flex-wrap gap-3">
                  {CERTIFICATIONS.filter(c => c.prominent).slice(0, 4).map((cert) => (
                    <div
                      key={cert.id}
                      className="px-4 py-2 bg-white/5 rounded-lg border border-white/10"
                    >
                      <span className="text-sm font-semibold text-white/80">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Quick Nav Component
function QuickNav() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-8 bg-white border-b border-[#E5E7EB] sticky top-[72px] z-40 backdrop-blur-xl bg-white/95">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-sm text-[#686E77]">
            <Link href="/" className="hover:text-[#204CE5] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#112337] font-medium">Diensten</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="text-sm font-medium text-[#686E77] hover:text-[#204CE5] transition-colors"
              >
                {service.title}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function DienstenPage() {
  return (
    <>
      <HeroSection />
      <QuickNav />

      {/* Services Section */}
      <section id="diensten" className="py-24 lg:py-32 bg-white">
        <div className="container-wide">
          {/* Section Header */}
          <div className="max-w-3xl mb-20">
            <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-12 h-px bg-[#204CE5]" />
              Onze Diensten
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#112337] leading-[1.1] mb-6">
              Comprehensive Building{" "}
              <span className="text-[#204CE5]">Solutions</span>
            </h2>
            <p className="text-lg text-[#686E77] leading-relaxed">
              Van fundament tot dakwerk — een compleet dienstenpakket voor uw bouwproject,
              ondersteund door {STATS.yearsExperience} jaar expertise.
            </p>
          </div>

          {/* Service Cards */}
          <div className="space-y-32">
            {services.map((service, index) => (
              <div key={service.id} id={service.id}>
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </>
  );
}
