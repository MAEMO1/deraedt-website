"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { STATS } from "@/lib/constants";
import {
  ServicePageHero,
  TwoColumnSection,
  ServicePageStats,
  PageCTA,
  SectionHeader,
} from "@/components/marketing/diensten";

const features = [
  "Publieke gebouwen (scholen, sportinfrastructuur)",
  "Kantoorgebouwen en bedrijfspanden",
  "Verbouwingen en uitbreidingen",
  "Structurele werken en funderingen",
  "Metselwerk en betonwerken",
  "Afwerking: vloeren, plafonds, pleisterwerk",
  "Klasse 6 erkend voor grote projecten",
  "Sleutel-op-de-deur projecten",
];

const process = [
  {
    number: "01",
    title: "Kennismaking & Analyse",
    description: "Grondige inventarisatie van uw wensen, budget en planning. Technische haalbaarheidsanalyse.",
  },
  {
    number: "02",
    title: "Offerte & Planning",
    description: "Gedetailleerde prijsopgave met transparante kostenstructuur. Realistische planning met mijlpalen.",
  },
  {
    number: "03",
    title: "Uitvoering",
    description: "Professionele uitvoering door eigen vakmensen. Wekelijkse voortgangsrapportage.",
  },
  {
    number: "04",
    title: "Oplevering & Nazorg",
    description: "Grondige oplevering met kwaliteitscontrole. Garantie en onderhoudsadvies.",
  },
];

const stats = [
  { value: STATS.yearsExperience, suffix: "+", label: "Jaar ervaring" },
  { value: "6", suffix: "", label: "Klasse erkenning" },
  { value: "3", suffix: "x", label: "Gecertificeerd" },
  { value: "40", suffix: "+", label: "Vakmensen" },
];

// Features Section - Clean grid with border cards
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <SectionHeader label="Wat wij doen" title="Onze diensten" centered />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                <span className="text-[#112337] font-medium">{feature}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section - Clean numbered steps
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <SectionHeader
          label="Werkwijze"
          title="Van plan tot oplevering"
          subtitle="Een transparant proces met duidelijke communicatie. U weet altijd waar u aan toe bent."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-[#204CE5]/10 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#112337] mb-2">
                {step.title}
              </h3>
              <p className="text-[#686E77] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BouwwerkenPage() {
  return (
    <>
      <ServicePageHero
        title="Algemene Bouwwerken"
        subtitle="Van fundament tot sleutel-op-de-deur. Klasse 6 erkend voor de meest complexe overheidsopdrachten en bedrijfsgebouwen."
        backgroundImage="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
        breadcrumbLabel="Algemene Bouwwerken"
      />
      <TwoColumnSection
        label="Onze Expertise"
        title="Complete bouwoplossingen voor elk project"
        image="/images/original-site/Atlas-College-Genk-10-scaled.jpg"
        imageAlt="Bouwproject"
      >
        <p className="text-[#686E77] text-lg leading-relaxed">
          Als Klasse 6 erkend aannemer realiseren wij bouwprojecten van elke
          omvang. Van publieke gebouwen tot bedrijfspanden, wij leveren
          kwaliteit op maat.
        </p>
        <p className="mt-4 text-[#686E77] leading-relaxed">
          Met {STATS.yearsExperience} jaar ervaring en een team van meer dan 40 vakmensen
          staan wij garant voor een professionele uitvoering van uw project.
        </p>
      </TwoColumnSection>
      <FeaturesSection />
      <ProcessSection />
      <ServicePageStats stats={stats} />
      <PageCTA
        title="Klaar om te bouwen?"
        subtitle="Neem contact op voor een vrijblijvende offerte. Binnen 48 uur hoort u van ons."
      />
    </>
  );
}
