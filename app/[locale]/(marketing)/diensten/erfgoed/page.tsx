"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { CheckCircle2, Building2 } from "lucide-react";
import { STATS } from "@/lib/constants";
import {
  ServicePageHero,
  TwoColumnSection,
  ServicePageStats,
  PageCTA,
  SectionHeader,
} from "@/components/marketing/diensten";

const expertise = [
  {
    title: "Monumentenrestauratie",
    description: "Volledige restauratie van beschermde monumenten met respect voor het historische karakter.",
    examples: ["Stadhuis Gent", "Justitiepaleis Dendermonde", "Historische kerken"],
  },
  {
    title: "Dakrestauratie",
    description: "Authentieke materialen en technieken voor historische daken. Leien, koper en zink.",
    examples: ["Natuurleien", "Historisch koperbekleding", "Traditioneel soldeerwerk"],
  },
  {
    title: "Gevelrestauratie",
    description: "Herstel van historisch metselwerk, voegwerk en ornamenten.",
    examples: ["Schoorsteenherstellingen", "Gevelreiniging", "Voegwerk renovatie"],
  },
];

const features = [
  "Monumentenrestauratie en -onderhoud",
  "Authentieke materialen en technieken",
  "Natuurleien vervangen en herstellen",
  "Historisch koper- en zinkwerk",
  "Traditioneel soldeerwerk",
  "Beschermde stads- en dorpsgezichten",
  "Werken voor KU Leuven campussen",
  "Samenwerking met erfgoedconsulenten",
];

const references = [
  { name: "Stadhuis Gent", type: "Raamcontract", year: "2023" },
  { name: "Stadhuis Brussel", type: "Beschermd erfgoed", year: "2023" },
  { name: "Justitiepaleis Dendermonde", type: "Beschermd erfgoed", year: "2023" },
  { name: "KU Leuven", type: "10 campussen", year: "Lopend" },
];

const stats = [
  { value: STATS.yearsExperience, suffix: "+", label: "Jaar ervaring" },
  { value: "ISO", suffix: "", label: "9001 kwaliteit" },
  { value: "6", suffix: "", label: "Klasse erkenning" },
  { value: "4", suffix: "", label: "Grote referenties" },
];

// Expertise Section
function ExpertiseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <SectionHeader label="Onze Expertise" title="Specialisaties" />

        <div className="grid md:grid-cols-3 gap-6">
          {expertise.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:border-[#204CE5]/30 hover:shadow-sm transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-[#112337] mb-3">
                {item.title}
              </h3>
              <p className="text-[#686E77] mb-6 leading-relaxed">
                {item.description}
              </p>
              <div className="space-y-2">
                {item.examples.map((example) => (
                  <div key={example} className="flex items-center gap-2 text-sm text-[#112337]">
                    <CheckCircle2 className="w-4 h-4 text-[#204CE5]" />
                    {example}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// References Section
function ReferencesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
              Referenties
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
              Bewezen trackrecord
            </h2>
            <p className="mt-6 text-[#686E77] text-lg leading-relaxed">
              Wij werken voor de meest prestigieuze erfgoedprojecten in België.
              Van historische stadhuizen tot universiteitscampussen.
            </p>

            <div className="mt-8 space-y-4">
              {references.map((refItem, i) => (
                <motion.div
                  key={refItem.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#204CE5]/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#204CE5]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#112337]">{refItem.name}</div>
                      <div className="text-sm text-[#686E77]">{refItem.type}</div>
                    </div>
                  </div>
                  <span className="text-sm text-[#204CE5] font-medium">{refItem.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
                alt="Justitiepaleis Dendermonde"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <SectionHeader label="Volledig Pakket" title="Onze diensten" centered />

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

export default function ErfgoedPage() {
  return (
    <>
      <ServicePageHero
        title="Erfgoedrenovatie"
        subtitle="Restauratie van beschermd bouwkundig erfgoed met authentieke technieken. Vakmanschap dat generaties overstijgt."
        backgroundImage="/images/original-site/Justitiepaleis-Dendermonde.jpg"
        breadcrumbLabel="Erfgoedrenovatie"
      />
      <TwoColumnSection
        label="Monumentenrestauratie"
        title="Authentiek vakmanschap voor historisch erfgoed"
        image="/images/original-site/Foto-Stadhuis-Gent.jpeg"
        imageAlt="Stadhuis Gent"
      >
        <p className="text-[#686E77] text-lg leading-relaxed">
          Gespecialiseerde restauratie van beschermd bouwkundig erfgoed. Met
          authentieke materialen, traditionele technieken en in nauwe
          samenwerking met Onroerend Erfgoed.
        </p>
        <p className="mt-4 text-[#686E77] leading-relaxed">
          Met {STATS.yearsExperience} jaar ervaring en ISO 9001 certificering staan wij
          garant voor de hoogste kwaliteitsnormen bij erfgoedprojecten.
        </p>
      </TwoColumnSection>
      <ExpertiseSection />
      <ReferencesSection />
      <FeaturesSection />
      <ServicePageStats stats={stats} />
      <PageCTA
        title="Erfgoedproject?"
        subtitle="Neem contact op voor een vrijblijvend adviesgesprek. Wij komen graag ter plaatse voor een eerste inventarisatie."
      />
    </>
  );
}
