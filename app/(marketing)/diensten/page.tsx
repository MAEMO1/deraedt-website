"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Building2,
  Hammer,
  Landmark,
  Wrench,
  ArrowRight,
  CheckCircle,
  Phone,
} from "lucide-react";
import { COMPANY, STATS } from "@/lib/constants";

// Map service IDs to detail pages
const serviceRoutes: Record<string, string> = {
  bouwwerken: "/diensten/bouw-renovatie",
  dakwerken: "/diensten/bouw-renovatie",
  erfgoed: "/diensten/bouw-renovatie",
  facility: "/diensten/facility",
};

const services = [
  {
    id: "bouwwerken",
    icon: Building2,
    title: "Algemene Bouwwerken",
    subtitle: "Klasse 6 erkend aannemer",
    description:
      "Bouwprojecten van A tot Z voor overheden en bedrijven. Van verbouwingen tot complete nieuwbouw van publieke gebouwen, scholen en sportinfrastructuur.",
    features: [
      "Publieke gebouwen & scholen",
      "Verbouwingen en uitbreidingen",
      "Structurele werken",
      "Afwerking en pleisterwerk",
      "Klasse 6 erkenning",
    ],
    image: "/images/original-site/Atlas-College-Genk-10-scaled.jpg",
  },
  {
    id: "dakwerken",
    icon: Hammer,
    title: "Dakwerken",
    subtitle: "Specialisten in dak- en gevelwerken",
    description:
      "Van hellende daken tot platte daken, met expertise in koperbekleding, zinkwerk en natuurleien. Inclusief Sarking isolatie voor optimale energieprestaties.",
    features: [
      "Hellende en platte daken",
      "Sarking isolatie methode",
      "Koper- en zinkbekleding",
      "Valbeveiliging op daken",
      "Dakgoten en waterdichting",
    ],
    image: "/images/original-site/Foto-Stadhuis-Gent.jpeg",
  },
  {
    id: "erfgoed",
    icon: Landmark,
    title: "Erfgoedrenovatie",
    subtitle: "Monumentenrestauratie",
    description:
      "Gespecialiseerde restauratie van beschermd bouwkundig erfgoed. Met authentieke materialen en technieken, in samenwerking met Onroerend Erfgoed.",
    features: [
      "Monumentenrestauratie",
      "Authentieke soldeerwerk",
      "Natuurleien vervangen",
      "KU Leuven campussen",
      "Stadhuis Gent & Brussel",
    ],
    image: "/images/original-site/Justitiepaleis-Dendermonde.jpg",
  },
  {
    id: "facility",
    icon: Wrench,
    title: "Onderhoud & Interventies",
    subtitle: "Raamcontracten voor overheden",
    description:
      "Langlopende raamcontracten voor dakonderhoud, herstellingen en renovatiewerken. Actieve contracten met Stad Gent, Stad Brussel, VEB en KU Leuven.",
    features: [
      "Raamcontract Stad Gent",
      "Raamcontract Stad Brussel",
      "VEB scholen onderhoud",
      "Dakonderhoud & inspectie",
      "Interventies bij schade",
    ],
    image: "/images/original-site/Koning-Boudewijn-Stadion.webp",
  },
];

const workProcess = [
  {
    step: "01",
    title: "Intake & Analyse",
    description: "Wij luisteren naar uw wensen en analyseren de mogelijkheden. Samen bepalen we de scope en aanpak van uw project.",
  },
  {
    step: "02",
    title: "Ontwerp & Offerte",
    description: "Op basis van de analyse stellen wij een gedetailleerde offerte op met een transparante prijsberekening.",
  },
  {
    step: "03",
    title: "Planning & Voorbereiding",
    description: "Wij coördineren alle vergunningen, materialen en onderaannemers. U krijgt een heldere planning.",
  },
  {
    step: "04",
    title: "Uitvoering & Opvolging",
    description: "Tijdens de bouw houden wij u op de hoogte van de voortgang. Kwaliteitscontroles zijn standaard.",
  },
  {
    step: "05",
    title: "Oplevering & Nazorg",
    description: "Na grondige controle leveren wij het project op. Onze service stopt niet bij de oplevering.",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Image */}
      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${isReversed ? "lg:order-2" : ""}`}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className={isReversed ? "lg:order-1" : ""}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#204CE5]/10 text-[#204CE5]">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold text-[#204CE5] uppercase tracking-wider">{service.subtitle}</span>
        </div>

        <h3 className="text-4xl sm:text-5xl font-bold text-[#112337]">
          {service.title}
        </h3>

        <p className="mt-6 text-[#686E77] leading-relaxed">
          {service.description}
        </p>

        <ul className="mt-8 space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-[#112337]">
              <CheckCircle className="w-5 h-5 text-[#204CE5] flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={serviceRoutes[service.id]}
            className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl"
          >
            Meer info
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/projectplanner"
            className="group inline-flex items-center gap-3 border-2 border-[#204CE5] text-[#204CE5] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#204CE5]/5"
          >
            Offerte aanvragen
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function DienstenPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] bg-[#112337] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/Foto-Stadhuis-Brussel.png"
            alt="Stadhuis Brussel"
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
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Onze Expertise
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Diensten
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl">
              Van monumentale erfgoedrenovatie tot innovatieve nieuwbouw —
              {STATS.yearsExperience} jaar vakmanschap met hedendaagse technieken.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide space-y-32">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Work Process */}
      <section ref={processRef} className="section-spacing bg-white">
        <div className="container-wide">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="label-overline">Onze Werkwijze</span>
            <h2 className="mt-4 heading-lg">
              Van plan tot <span className="text-[#204CE5]">oplevering</span>
            </h2>
            <p className="mt-4 text-[#686E77] max-w-2xl mx-auto">
              Een transparant proces met duidelijke communicatie. U weet altijd waar u aan toe bent.
            </p>
          </motion.header>

          <div className="grid md:grid-cols-5 gap-8">
            {workProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < workProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-[#204CE5]/20 -translate-x-4" />
                )}

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#204CE5]/10 text-[#204CE5] flex items-center justify-center mx-auto mb-4 text-2xl font-bold">{step.step}</div>
                  <h3 className="text-xl font-bold text-[#112337] mb-3">{step.title}</h3>
                  <p className="text-sm text-[#686E77] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#112337]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                Start Uw Project
              </span>

              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Klaar om te <span className="text-[#204CE5]">beginnen</span>?
              </h2>

              <p className="mt-6 text-white/60 leading-relaxed max-w-lg">
                Plan uw project met onze gratis projectplanner. Binnen 48 uur ontvangt u
                een vrijblijvende offerte van ons team.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
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

            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Waarom De Raedt?</h3>
                <ul className="space-y-4">
                  {[
                    "96 jaar ervaring in de bouwsector",
                    "Klasse 6 erkend voor overheidsopdrachten",
                    "ISO 9001 & VCA** gecertificeerd",
                    "Specialisten in erfgoedrenovatie",
                    "Transparante prijzen, geen verrassingen",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <CheckCircle className="w-5 h-5 text-[#204CE5] flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
