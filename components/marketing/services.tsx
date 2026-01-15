"use client";

import { motion, useInView } from "framer-motion";
import { Building2, Hammer, Landmark, Wrench, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { SERVICES, COMPANY } from "@/lib/constants";

const iconMap = {
  Building2,
  Hammer,
  Landmark,
  Wrench,
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/diensten/${service.id}`}
        className="group block h-full"
      >
        <article className="relative h-full bg-white p-8 sm:p-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(12,12,12,0.08)] border border-transparent hover:border-[#9A6B4C]/10">
          {/* Top row - number and icon */}
          <div className="flex items-start justify-between mb-10">
            <span className="font-display text-6xl text-[#0C0C0C]/[0.06] group-hover:text-[#9A6B4C]/20 transition-colors duration-500">
              {number}
            </span>
            <div className="w-14 h-14 flex items-center justify-center border border-[#0C0C0C]/10 text-[#6B6560] transition-all duration-500 group-hover:border-[#9A6B4C] group-hover:bg-[#9A6B4C] group-hover:text-white">
              <Icon className="w-5 h-5" />
            </div>
          </div>

          {/* Content */}
          <h3 className="font-display text-2xl sm:text-3xl text-[#0C0C0C] group-hover:text-[#1A2F42] transition-colors duration-300">
            {service.title}
          </h3>
          <p className="mt-4 text-[#6B6560] leading-relaxed">
            {service.description}
          </p>

          {/* Link */}
          <div className="mt-8 flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6B6560] group-hover:text-[#9A6B4C] transition-colors duration-300">
              Meer info
            </span>
            <ArrowRight className="w-4 h-4 text-[#6B6560] group-hover:text-[#9A6B4C] transition-all duration-300 group-hover:translate-x-1" />
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9A6B4C] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </article>
      </Link>
    </motion.div>
  );
}

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing bg-[#FAF7F2] relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 grid-blueprint opacity-50" />

      <div className="container-wide relative">
        {/* Section Header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          {/* Overline */}
          <div className="flex items-center gap-4 mb-6">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-12 bg-[#9A6B4C] origin-left"
            />
            <span className="label-overline">Expertise</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="heading-section text-[#0C0C0C]">
              Onze diensten
            </h2>
            <p className="max-w-md text-[#6B6560] leading-relaxed lg:text-right">
              Van monumentale erfgoedrenovatie tot innovatieve nieuwbouw —
              generaties vakmanschap met hedendaagse technieken.
            </p>
          </div>
        </motion.header>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 sm:mt-32"
        >
          <div className="relative overflow-hidden bg-[#0C0C0C] p-12 sm:p-16 lg:p-20">
            {/* Background texture */}
            <div className="absolute inset-0 texture-stone opacity-50" />

            {/* Corner accents */}
            <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#9A6B4C]/20" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-[#9A6B4C]/20" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div className="max-w-xl">
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.01em]">
                  Klaar om te bouwen?
                </h3>
                <p className="mt-4 text-white/40 leading-relaxed">
                  Neem contact op voor een vrijblijvend gesprek over uw bouwplannen.
                  Wij denken graag met u mee — van concept tot oplevering.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
                >
                  <span>Contact</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/30"
                >
                  <Phone className="w-4 h-4" />
                  <span>{COMPANY.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
