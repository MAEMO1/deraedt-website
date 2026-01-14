"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Client logos with actual images from De Raedt's website
const CLIENTS = [
  { name: "Infrabel", logo: "/images/original-site/Infrabel-logo.png", width: 120, height: 40 },
  { name: "AG Vespa", logo: "/images/original-site/ag-vespa-logo.svg", width: 100, height: 40 },
  { name: "NMBS/SNCB", logo: "/images/original-site/Logo-Nmbs.webp", width: 100, height: 40 },
  { name: "Provincie Oost-Vlaanderen", logo: "/images/original-site/logo-provincie-Oost-Vlaanderen.png", width: 140, height: 35 },
  { name: "Stad Gent", logo: "/images/original-site/logoggent.svg", width: 80, height: 40 },
  { name: "Thuis Gent", logo: "/images/original-site/thuispuntgent_logo.svg", width: 100, height: 40 },
  { name: "VEB", logo: "/images/original-site/logo-veb.svg", width: 80, height: 40 },
  { name: "Woonpunt Mechelen", logo: "/images/original-site/woonpunt.svg", width: 100, height: 40 },
  { name: "Stad Brussel", logo: "/images/original-site/bxl-stad.svg", width: 100, height: 40 },
  { name: "Sibelga", logo: "/images/original-site/Logo-Sibelga-website-5.png", width: 100, height: 40 },
  { name: "Regie der Gebouwen", logo: "/images/original-site/regiedergebouwen.svg", width: 120, height: 40 },
  { name: "Provincie Antwerpen", logo: "/images/original-site/antwerpen.svg", width: 100, height: 40 },
  { name: "Fluvius", logo: "/images/original-site/Fluvius_logo.svg", width: 100, height: 35 },
  { name: "Leefmilieu Brussel", logo: "/images/original-site/leefmilieu.svg", width: 120, height: 40 },
  { name: "BXL Régie", logo: "/images/original-site/bxl-regie.svg", width: 100, height: 40 },
  { name: "OCMW Brussel", logo: "/images/original-site/bxl.svg", width: 80, height: 40 },
];

function ClientLogo({ client }: { client: typeof CLIENTS[number] }) {
  return (
    <div className="flex items-center justify-center h-16 px-6 rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#4299E1]/20 hover:-translate-y-0.5 min-w-[160px]">
      <Image
        src={client.logo}
        alt={`${client.name} logo`}
        width={client.width}
        height={client.height}
        className="object-contain max-h-10 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
      />
    </div>
  );
}

function MarqueeRow({
  clients,
  direction = "left",
  speed = 30,
}: {
  clients: typeof CLIENTS;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="relative overflow-hidden py-2">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFBFD] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFBFD] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6"
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
  const firstHalf = CLIENTS.slice(0, Math.ceil(CLIENTS.length / 2));
  const secondHalf = CLIENTS.slice(Math.ceil(CLIENTS.length / 2));

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-[#FAFBFD] to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="client-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="#1E3A5F" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#client-grid)" />
        </svg>
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4299E1]/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4299E1]">
              Vertrouwd door
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4299E1]/50" />
          </div>

          <h2 className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
            Onze Klanten
          </h2>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Van overheidsinstanties tot private opdrachtgevers — al meer dan 90
            jaar bouwen wij vertrouwen op.
          </p>
        </motion.div>

        {/* Logo marquees */}
        <div className="space-y-4">
          <MarqueeRow clients={firstHalf} direction="left" speed={40} />
          <MarqueeRow clients={secondHalf} direction="right" speed={45} />
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: "500+", label: "Voltooide projecten" },
            { value: "15+", label: "Actieve opdrachtgevers" },
            { value: "100%", label: "Klanttevredenheid" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
