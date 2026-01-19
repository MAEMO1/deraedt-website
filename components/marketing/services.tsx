"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { SERVICES, COMPANY } from "@/lib/constants";

// Service images mapping
const serviceImages: Record<string, string> = {
  bouwwerken: "/images/original-site/Atlas-College-Genk-10-scaled.jpg",
  dakwerken: "/images/original-site/IMG_20230615_0957592-ps-scaled.jpg",
  erfgoed: "/images/original-site/Justitiepaleis-Dendermonde.jpg",
  facility: "/images/original-site/team-collage.jpg",
};

// Map service IDs to actual routes
const serviceRoutes: Record<string, string> = {
  bouwwerken: "/diensten/bouwwerken",
  dakwerken: "/diensten/dakwerken",
  erfgoed: "/diensten/erfgoed",
  facility: "/diensten/facility",
};

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-50px" });
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section ref={sectionRef} className="bg-white">
      {/* Main Services Section */}
      <div className="grid lg:grid-cols-2">
        {/* Left side - Image */}
        <div className="relative h-[400px] lg:h-auto lg:min-h-[600px] overflow-hidden">
          {/* Background images that fade in/out */}
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                hoveredService === service.id || (!hoveredService && service.id === "bouwwerken")
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <Image
                src={serviceImages[service.id]}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#112337]/30" />
            </div>
          ))}

          {/* Overlay content */}
          <div className="absolute inset-0 flex items-end p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                Expertise
              </span>
              <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-white leading-tight">
                Onze
                <br />
                diensten
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Right side - Service list */}
        <div className="bg-[#F5F5F5]">
          <div className="h-full flex flex-col">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={serviceRoutes[service.id]}
                  className="group block border-b border-[#112337]/10 last:border-b-0"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="flex items-center justify-between p-8 lg:p-10 transition-all duration-300 group-hover:bg-white group-hover:pl-12">
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#112337] group-hover:text-[#204CE5] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-[#686E77] text-sm lg:text-base max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {service.description}
                      </p>
                    </div>
                    <div className="ml-6 w-12 h-12 rounded-full bg-transparent group-hover:bg-[#204CE5] flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-[#112337]/30 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#112337]"
      >
        <div className="container-wide py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Klaar om te bouwen?
              </h3>
              <p className="mt-4 text-white/60 text-lg">
                Neem contact op voor een vrijblijvend gesprek over uw bouwplannen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#204CE5] text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-lg"
              >
                <span>Contact</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:bg-white/20"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
