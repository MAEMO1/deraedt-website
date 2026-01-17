"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { STATS } from "@/lib/constants";

const CLIENTS = [
  { name: "Infrabel", logo: "/images/original-site/Infrabel-logo.png", width: 130, height: 50 },
  { name: "AG Vespa", logo: "/images/original-site/ag-vespa-logo.svg", width: 120, height: 50 },
  { name: "NMBS/SNCB", logo: "/images/original-site/Logo-Nmbs.webp", width: 120, height: 50 },
  { name: "Provincie Oost-Vlaanderen", logo: "/images/original-site/logo-provincie-Oost-Vlaanderen.png", width: 150, height: 45 },
  { name: "Stad Gent", logo: "/images/original-site/logoggent.svg", width: 100, height: 50 },
  { name: "Thuis Gent", logo: "/images/original-site/thuispuntgent_logo.svg", width: 120, height: 50 },
  { name: "VEB", logo: "/images/original-site/logo-veb.svg", width: 100, height: 50 },
  { name: "Stad Brussel", logo: "/images/original-site/bxl-stad.svg", width: 120, height: 50 },
  { name: "Regie der Gebouwen", logo: "/images/original-site/regiedergebouwen.svg", width: 130, height: 50 },
  { name: "Fluvius", logo: "/images/original-site/Fluvius_logo.svg", width: 120, height: 45 },
  { name: "Leefmilieu Brussel", logo: "/images/original-site/leefmilieu.svg", width: 130, height: 50 },
  { name: "BXL Régie", logo: "/images/original-site/bxl-regie.svg", width: 120, height: 50 },
];

function ClientLogo({ client }: { client: (typeof CLIENTS)[number] }) {
  return (
    <div className="flex items-center justify-center h-24 px-12 min-w-[200px]">
      <Image
        src={client.logo}
        alt={`${client.name} logo`}
        width={client.width}
        height={client.height}
        className="object-contain max-h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
      />
    </div>
  );
}

function MarqueeRow({
  clients,
  direction = "left",
  speed = 35,
}: {
  clients: typeof CLIENTS;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...clients, ...clients].map((client, index) => (
          <ClientLogo key={`${client.name}-${index}`} client={client} />
        ))}
      </motion.div>
    </div>
  );
}

export function ClientLogos() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const firstHalf = CLIENTS.slice(0, 6);
  const secondHalf = CLIENTS.slice(6);

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="container-wide relative">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-[#112337]/10"
        >
          {[
            { value: `${STATS.yearsExperience}+`, label: "Jaar ervaring" },
            { value: `${STATS.projectsCompleted}+`, label: "Projecten voltooid" },
            { value: `${STATS.employees}`, label: "Vakspecialisten" },
            { value: "100%", label: "Tevreden klanten" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#204CE5]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-[#686E77] uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#112337]">
            Vertrouwd door toonaangevende <span className="text-[#204CE5]">organisaties</span>
          </h2>
          <p className="mt-4 text-[#686E77] max-w-2xl mx-auto">
            Overheden en bedrijven kiezen voor De Raedt vanwege onze betrouwbaarheid, kwaliteit en jarenlange expertise.
          </p>
        </motion.div>

        {/* Logo Marquees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <MarqueeRow clients={firstHalf} direction="left" speed={40} />
          <MarqueeRow clients={secondHalf} direction="right" speed={45} />
        </motion.div>
      </div>
    </section>
  );
}
