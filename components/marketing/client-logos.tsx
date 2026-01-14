"use client";

import { motion } from "framer-motion";

// Client logos based on De Raedt's actual clients from their website
const CLIENTS = [
  { name: "Infrabel", category: "infrastructure" },
  { name: "AG Vespa", category: "public" },
  { name: "NMBS/SNCB", category: "infrastructure" },
  { name: "Provincie Oost-Vlaanderen", category: "public" },
  { name: "Stad Gent", category: "public" },
  { name: "Thuis Gent", category: "housing" },
  { name: "VEB", category: "public" },
  { name: "Woonpunt Mechelen", category: "housing" },
  { name: "Stad Brussel", category: "public" },
  { name: "Sibelga", category: "infrastructure" },
  { name: "Regie der Gebouwen", category: "public" },
  { name: "Provincie Antwerpen", category: "public" },
  { name: "Fluvius", category: "infrastructure" },
  { name: "Leefmilieu Brussel", category: "public" },
];

function LogoPlaceholder({ name }: { name: string }) {
  // Generate initials from company name
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-center h-12 px-6 rounded-lg bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#4299E1]/20 hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-[#1E3A5F] to-[#2C5282] text-white text-xs font-bold">
          {initials}
        </div>
        <span className="text-sm font-medium text-[#1E3A5F]/70 whitespace-nowrap">
          {name}
        </span>
      </div>
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
    <div className="relative overflow-hidden">
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
          <LogoPlaceholder key={`${client.name}-${index}`} name={client.name} />
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
        <div className="space-y-6">
          <MarqueeRow clients={firstHalf} direction="left" speed={35} />
          <MarqueeRow clients={secondHalf} direction="right" speed={40} />
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
