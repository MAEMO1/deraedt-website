"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const CLIENTS = [
  { name: "Infrabel", logo: "/images/original-site/Infrabel-logo.png", width: 100, height: 35 },
  { name: "AG Vespa", logo: "/images/original-site/ag-vespa-logo.svg", width: 90, height: 35 },
  { name: "NMBS/SNCB", logo: "/images/original-site/Logo-Nmbs.webp", width: 90, height: 35 },
  { name: "Provincie Oost-Vlaanderen", logo: "/images/original-site/logo-provincie-Oost-Vlaanderen.png", width: 120, height: 30 },
  { name: "Stad Gent", logo: "/images/original-site/logoggent.svg", width: 70, height: 35 },
  { name: "Thuis Gent", logo: "/images/original-site/thuispuntgent_logo.svg", width: 90, height: 35 },
  { name: "VEB", logo: "/images/original-site/logo-veb.svg", width: 70, height: 35 },
  { name: "Stad Brussel", logo: "/images/original-site/bxl-stad.svg", width: 90, height: 35 },
  { name: "Regie der Gebouwen", logo: "/images/original-site/regiedergebouwen.svg", width: 100, height: 35 },
  { name: "Fluvius", logo: "/images/original-site/Fluvius_logo.svg", width: 90, height: 30 },
  { name: "Leefmilieu Brussel", logo: "/images/original-site/leefmilieu.svg", width: 100, height: 35 },
  { name: "BXL Régie", logo: "/images/original-site/bxl-regie.svg", width: 90, height: 35 },
];

function ClientLogo({ client }: { client: (typeof CLIENTS)[number] }) {
  return (
    <div className="flex items-center justify-center h-20 px-10 min-w-[180px]">
      <Image
        src={client.logo}
        alt={`${client.name} logo`}
        width={client.width}
        height={client.height}
        className="object-contain max-h-9 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
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
    <section ref={ref} className="py-20 sm:py-24 bg-white border-y border-[#0A1628]/5">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#0A1628]/40 text-sm font-medium tracking-[0.2em] uppercase">
            Vertrouwd door toonaangevende organisaties
          </span>
        </motion.div>

        {/* Logo Marquees */}
        <div className="space-y-2">
          <MarqueeRow clients={firstHalf} direction="left" speed={40} />
          <MarqueeRow clients={secondHalf} direction="right" speed={45} />
        </div>
      </div>
    </section>
  );
}
