"use client";

import { motion, useInView } from "framer-motion";
import { Building2, Hammer, Landmark, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { SERVICES } from "@/lib/constants";

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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/diensten/${service.id}`}
        className="group block h-full"
      >
        <div className="relative h-full border-b border-[#0A1628]/10 pb-10 transition-all duration-500 group-hover:border-[#B8860B]/50">
          {/* Number */}
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display text-5xl font-light text-[#0A1628]/10 group-hover:text-[#B8860B]/30 transition-colors duration-500">
              {number}
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0A1628]/10 text-[#0A1628]/50 transition-all duration-500 group-hover:border-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-heading font-semibold text-[#0A1628] group-hover:text-[#1E3A5F] transition-colors">
            {service.title}
          </h3>
          <p className="mt-4 text-[#0A1628]/60 leading-relaxed">
            {service.description}
          </p>

          {/* Link */}
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#0A1628]/40 group-hover:text-[#B8860B] transition-colors duration-300">
            <span>Meer informatie</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          {/* Hover accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#B8860B]"
            initial={{ width: 0 }}
            whileInView={{ width: "0%" }}
            animate={isInView ? {} : {}}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#B8860B]" />
            <span className="text-[#B8860B] text-sm font-medium tracking-[0.2em] uppercase">
              Expertise
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-[#0A1628] leading-tight max-w-2xl">
              Onze Diensten
            </h2>
            <p className="max-w-md text-[#0A1628]/60 leading-relaxed">
              Van erfgoedrenovatie tot moderne nieuwbouw - wij combineren
              traditioneel vakmanschap met innovatieve technieken.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Full-width CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-24 sm:mt-32"
        >
          <div className="relative overflow-hidden bg-[#0A1628] p-12 sm:p-16 lg:p-20">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
              </svg>
            </div>

            {/* Corner accents */}
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/10" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-white/10" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <h3 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                  Klaar om uw project te bespreken?
                </h3>
                <p className="mt-4 text-white/60 leading-relaxed">
                  Neem contact op voor een vrijblijvend gesprek over uw bouwplannen.
                  Wij denken graag met u mee.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white text-[#0A1628] px-8 py-4 font-semibold transition-all duration-300 hover:bg-[#B8860B] hover:text-white shrink-0"
              >
                <span>Neem Contact Op</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
