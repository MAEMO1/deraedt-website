"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Shield,
  Award,
  Leaf,
  FileCheck,
  Building2,
  CheckCircle,
  ArrowRight,
  Download,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import {
  COMPANY,
  STATS,
  CERTIFICATIONS,
  RAAMCONTRACTEN,
  KEY_CLIENTS,
  PROCUREMENT_USPS,
} from "@/lib/constants";

const certificationIcons: Record<string, typeof Shield> = {
  klasse6: Shield,
  iso9001: Award,
  vca: FileCheck,
  co2: Leaf,
};

export default function ProcurementPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const raamcontractenRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const isCertsInView = useInView(certsRef, { once: true, margin: "-100px" });
  const isRaamcontractenInView = useInView(raamcontractenRef, { once: true, margin: "-100px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] bg-[#0C0C0C] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/Foto-Stadhuis-Brussel.png"
            alt="Stadhuis Brussel - Overheidsopdracht"
            fill
            className="object-cover image-cinematic opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-[#0C0C0C]/40" />
        </div>

        <div className="container-wide relative pb-16 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-[#9A6B4C] text-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em]">
                <Shield className="w-4 h-4" />
                Klasse 6 Erkend
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em]">
                <Leaf className="w-4 h-4" />
                CO₂-Prestatieladder Niveau 3
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Voor Overheden & Facility Managers</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95] tracking-[-0.02em]">
              Procurement Hub
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/50 leading-relaxed max-w-xl font-serif font-light">
              Alle informatie die u nodig heeft voor aanbestedingen, preselecties
              en raamcontracten — op één plek.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#certificaten"
                className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
              >
                Bekijk certificaten
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                href="/contact?subject=raamcontract"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5"
              >
                Plan een gesprek
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USP Bar */}
      <section className="bg-[#0C0C0C] border-t border-white/10">
        <div className="container-wide py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCUREMENT_USPS.map((usp, index) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-lg text-white">{usp.title}</div>
                <div className="mt-2 text-sm text-white/40">{usp.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certificaten" ref={certsRef} className="section-spacing bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Certificeringen & Erkenningen</span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="heading-section text-[#0C0C0C]">
              Volledig gecertificeerd
            </h2>
            <p className="mt-6 text-[#6B6560] max-w-2xl mx-auto">
              Alle certificaten en erkenningen die u nodig heeft voor uw
              aanbestedingsprocedure.
            </p>
          </motion.header>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {CERTIFICATIONS.map((cert, index) => {
              const Icon = certificationIcons[cert.id] || Award;
              return (
                <motion.article
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 border border-[#0C0C0C]/5 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 flex items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C] flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-xl text-[#0C0C0C]">{cert.name}</h3>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="mt-1 text-sm font-medium text-[#9A6B4C]">{cert.fullName}</p>
                      <p className="mt-3 text-sm text-[#6B6560]">{cert.description}</p>
                      {"scope" in cert && cert.scope && (
                        <p className="mt-2 text-xs text-[#6B6560]/70">
                          <span className="font-semibold">Scope:</span> {cert.scope}
                        </p>
                      )}
                      {"validUntil" in cert && cert.validUntil && (
                        <p className="mt-1 text-xs text-[#6B6560]/70">
                          <span className="font-semibold">Geldig tot:</span> {cert.validUntil}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-[#6B6560] mb-4">
              Certificaten nodig voor uw aanbesteding?
            </p>
            <Link
              href="/contact?subject=raamcontract"
              className="group inline-flex items-center gap-3 bg-[#0C0C0C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#9A6B4C]"
            >
              <Download className="w-4 h-4" />
              Vraag documentatie aan
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Raamcontracten Section */}
      <section ref={raamcontractenRef} className="section-spacing bg-white relative">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-[#9A6B4C]" />
                <span className="label-overline">Bewezen Trackrecord</span>
              </div>

              <h2 className="heading-section text-[#0C0C0C]">
                Actieve raamcontracten
              </h2>

              <p className="mt-8 text-[#6B6560] leading-relaxed">
                Wij zijn geselecteerde partner voor raamcontracten met toonaangevende
                overheden en publieke instellingen. Deze langdurige samenwerkingen
                getuigen van ons vermogen om consistent kwaliteit te leveren.
              </p>

              <div className="mt-10 space-y-4">
                {RAAMCONTRACTEN.map((contract, index) => (
                  <motion.div
                    key={contract.client}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-[#FAF7F2] border-l-2 border-[#9A6B4C]"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-[#0C0C0C]">{contract.client}</div>
                      <div className="text-sm text-[#6B6560]">{contract.scope}</div>
                    </div>
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.15em] font-semibold">
                      {contract.type}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isRaamcontractenInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[#0C0C0C] p-10 text-white">
                <h3 className="font-display text-2xl mb-6">Vertrouwd door</h3>
                <div className="grid grid-cols-2 gap-4">
                  {KEY_CLIENTS.slice(0, 8).map((client) => (
                    <div
                      key={client.name}
                      className="text-sm text-white/70 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-[#9A6B4C] flex-shrink-0" />
                      {client.name}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="font-display text-3xl">{STATS.yearsExperience}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                        Jaar
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-3xl">{STATS.raamcontracten}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                        Raamcontracten
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-3xl">{STATS.employees}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                        FTE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Corner accents */}
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t border-r border-[#9A6B4C]/30" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b border-l border-[#9A6B4C]/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="section-spacing bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Onze Aanpak</span>
              <span className="h-px w-12 bg-[#9A6B4C]" />
            </div>
            <h2 className="heading-section text-[#0C0C0C]">
              Hoe wij samenwerken
            </h2>
          </motion.header>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Intake & Analyse",
                description: "Wij analyseren uw bestek en bespreken de projectvereisten.",
                icon: FileCheck,
              },
              {
                step: "02",
                title: "Offerte & Planning",
                description: "Gedetailleerde offerte met transparante prijsopbouw en planning.",
                icon: Calendar,
              },
              {
                step: "03",
                title: "Uitvoering",
                description: "Professionele uitvoering met wekelijkse rapportage en QHSE-borging.",
                icon: Building2,
              },
              {
                step: "04",
                title: "Oplevering & Nazorg",
                description: "Grondige oplevering met documentatie en garantieafhandeling.",
                icon: CheckCircle,
              },
            ].map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto flex items-center justify-center bg-white border border-[#0C0C0C]/10 text-[#9A6B4C] mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="font-display text-4xl text-[#0C0C0C]/10 mb-2">{phase.step}</div>
                  <h3 className="font-display text-lg text-[#0C0C0C]">{phase.title}</h3>
                  <p className="mt-3 text-sm text-[#6B6560]">{phase.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0C0C0C] relative">
        <div className="absolute inset-0 texture-stone opacity-30" />

        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl sm:text-5xl text-white leading-[0.95]">
              Klaar voor een kennismaking?
            </h2>

            <p className="mt-6 text-white/50 leading-relaxed max-w-xl mx-auto">
              Neem contact op voor een vrijblijvend gesprek over uw aanbestedingen,
              raamcontracten of facility management behoeften.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?subject=raamcontract"
                className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
              >
                Plan een gesprek
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.contact.phone}
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/40">
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="flex items-center gap-2 hover:text-white/60 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {COMPANY.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
