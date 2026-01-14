"use client";

import { motion, useInView } from "framer-motion";
import { Building2, Hammer, Landmark, ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { SERVICES, COMPANY } from "@/lib/constants";

const iconMap = {
  Building2,
  Hammer,
  Landmark,
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/diensten/${service.id}`}
        className="group block h-full"
      >
        <div className="relative h-full border-b border-[#08111C]/8 pb-12 transition-all duration-700 group-hover:border-[#C9A227]/40">
          {/* Number and Icon row */}
          <div className="mb-10 flex items-center justify-between">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
              className="font-display text-6xl lg:text-7xl font-light text-[#08111C]/[0.06] group-hover:text-[#C9A227]/20 transition-colors duration-700"
            >
              {number}
            </motion.span>
            <div className="flex h-14 w-14 items-center justify-center border border-[#08111C]/10 text-[#08111C]/40 transition-all duration-500 group-hover:border-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>
          </div>

          {/* Content */}
          <h3 className="text-2xl lg:text-3xl font-display font-semibold text-[#08111C] group-hover:text-[#1A2D42] transition-colors duration-500">
            {service.title}
          </h3>
          <p className="mt-5 text-[#08111C]/50 leading-relaxed">
            {service.description}
          </p>

          {/* Link */}
          <div className="mt-10 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#08111C]/30 group-hover:text-[#C9A227] transition-colors duration-500">
              Meer informatie
            </span>
            <ArrowUpRight className="h-4 w-4 text-[#08111C]/30 transition-all duration-500 group-hover:text-[#C9A227] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          {/* Hover line accent */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#C9A227] origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
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
    <section className="py-28 sm:py-36 bg-[#FAF8F5] relative">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 relative">
        {/* Section Header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          {/* Overline */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-16 bg-[#C9A227] origin-left"
            />
            <span className="text-[#C9A227] text-xs font-medium tracking-[0.3em] uppercase">
              Expertise
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-heading tracking-[0.02em] text-[#08111C] leading-none">
              ONZE
              <br />
              <span className="text-[#1A2D42]">DIENSTEN</span>
            </h2>
            <p className="max-w-lg text-[#08111C]/50 leading-relaxed lg:text-right">
              Van monumentale erfgoedrenovatie tot innovatieve nieuwbouw —
              wij combineren generaties vakmanschap met hedendaagse technieken.
            </p>
          </div>
        </motion.header>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-16 lg:gap-20">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Full-width CTA Banner */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-32 sm:mt-40"
        >
          <div className="relative overflow-hidden bg-[#08111C] p-14 sm:p-20 lg:p-24">
            {/* Background elements */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute -right-32 -top-32 w-64 h-64 rounded-full bg-[#C9A227]/5 blur-3xl" />
            <div className="absolute -left-32 -bottom-32 w-80 h-80 rounded-full bg-[#1A2D42]/20 blur-3xl" />

            {/* Corner accents */}
            <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/[0.06]" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/[0.06]" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="max-w-2xl">
                <h3 className="text-4xl sm:text-5xl font-heading tracking-[0.02em] text-white leading-none">
                  KLAAR OM TE
                  <br />
                  <span className="text-gradient-gold">BOUWEN?</span>
                </h3>
                <p className="mt-6 text-white/40 leading-relaxed max-w-lg">
                  Neem contact op voor een vrijblijvend gesprek over uw bouwplannen.
                  Wij denken graag met u mee — van concept tot oplevering.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 bg-[#C9A227] text-[#08111C] px-10 py-5 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 hover:bg-white"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white px-10 py-5 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 hover:bg-white/10 hover:border-white/40"
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
