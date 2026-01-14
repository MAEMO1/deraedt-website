"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Building2, Hammer, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { SERVICES } from "@/lib/constants";

const iconMap = {
  Building2,
  Hammer,
  Landmark,
};

// Technical drawing corner element
function TechnicalCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const corners = {
    tl: "top-0 left-0 rotate-0",
    tr: "top-0 right-0 rotate-90",
    bl: "bottom-0 left-0 -rotate-90",
    br: "bottom-0 right-0 rotate-180",
  };

  return (
    <div className={`absolute ${corners[position]} w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
      <svg viewBox="0 0 32 32" className="w-full h-full text-[#4299E1]">
        <path
          d="M0 8 L0 0 L8 0"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="0" cy="0" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}

// Animated service card with 3D tilt effect
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const cardRef = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
    >
      <motion.a
        ref={cardRef}
        href={`/diensten/${service.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative block h-full"
      >
        {/* Background number */}
        <div className="absolute -top-6 -right-2 text-[8rem] font-serif font-light text-[#1E3A5F]/[0.03] leading-none select-none pointer-events-none z-0 transition-all duration-500 group-hover:text-[#4299E1]/[0.08] group-hover:-top-8">
          {number}
        </div>

        {/* Card content */}
        <div className="relative z-10 h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 group-hover:border-[#1E3A5F]/10 group-hover:shadow-xl group-hover:shadow-[#1E3A5F]/5">
          {/* Technical corners */}
          <TechnicalCorner position="tl" />
          <TechnicalCorner position="tr" />
          <TechnicalCorner position="bl" />
          <TechnicalCorner position="br" />

          {/* Top accent line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4299E1] to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
          />

          {/* Service number indicator */}
          <div className="absolute top-6 right-6 text-xs font-mono tracking-wider text-[#1E3A5F]/30 group-hover:text-[#4299E1] transition-colors duration-300">
            {number}
          </div>

          {/* Icon container with blueprint grid */}
          <div className="relative">
            <div className="relative flex h-16 w-16 items-center justify-center">
              {/* Blueprint grid background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg viewBox="0 0 64 64" className="w-full h-full">
                  <defs>
                    <pattern
                      id={`grid-${index}`}
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 8 0 L 0 0 0 8"
                        fill="none"
                        stroke="#4299E1"
                        strokeWidth="0.3"
                        opacity="0.3"
                      />
                    </pattern>
                  </defs>
                  <rect width="64" height="64" fill={`url(#grid-${index})`} />
                </svg>
              </div>

              {/* Icon circle */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#EBF4FF] to-[#D6E8FF] text-[#1E3A5F] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#1E3A5F] group-hover:to-[#2C5282] group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
          </div>

          {/* Content */}
          <h3 className="mt-6 text-xl font-semibold text-[#1E3A5F] group-hover:text-[#1E3A5F] transition-colors">
            {service.title}
          </h3>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {service.description}
          </p>

          {/* Bottom section with link */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-[#4299E1] transition-all duration-300 group-hover:gap-3">
              <span>Ontdek meer</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            {/* Decorative element */}
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 w-1 rounded-full bg-[#1E3A5F]/20 group-hover:bg-[#4299E1] transition-colors duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.15 + i * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

// Decorative blueprint element
function BlueprintDecoration() {
  return (
    <div className="absolute top-20 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
      <svg viewBox="0 0 256 256" className="w-full h-full">
        <rect
          x="20"
          y="20"
          width="216"
          height="216"
          stroke="#1E3A5F"
          strokeWidth="1"
          fill="none"
        />
        <rect
          x="40"
          y="40"
          width="176"
          height="176"
          stroke="#1E3A5F"
          strokeWidth="0.5"
          fill="none"
        />
        <line
          x1="128"
          y1="0"
          x2="128"
          y2="256"
          stroke="#1E3A5F"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <line
          x1="0"
          y1="128"
          x2="256"
          y2="128"
          stroke="#1E3A5F"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <circle
          cx="128"
          cy="128"
          r="60"
          stroke="#1E3A5F"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

export function Services() {
  return (
    <section className="relative section-padding bg-gradient-to-b from-white via-[#FAFBFD] to-white overflow-hidden">
      {/* Decorative elements */}
      <BlueprintDecoration />

      <div className="container-custom relative">
        {/* Section header */}
        <div className="relative mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-[#4299E1]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4299E1]">
                Wat wij doen
              </span>
              <span className="h-px w-8 bg-[#4299E1]" />
            </motion.div>

            <h2 className="text-4xl font-bold text-[#1E3A5F] md:text-5xl lg:text-6xl">
              Onze{" "}
              <span className="relative">
                <span className="relative z-10">Diensten</span>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-2 left-0 h-3 bg-[#4299E1]/10 -z-0"
                />
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
              Van concept tot oplevering, wij begeleiden u bij elke stap van uw
              bouwproject met{" "}
              <span className="font-medium text-[#1E3A5F]">expertise</span> en{" "}
              <span className="font-medium text-[#1E3A5F]">vakmanschap</span>.
            </p>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[#1E3A5F]/10 to-transparent"
        />
      </div>
    </section>
  );
}
