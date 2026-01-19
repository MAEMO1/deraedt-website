"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}
    >
      <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
        {label}
      </span>
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[#686E77] text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
