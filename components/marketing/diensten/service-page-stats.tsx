"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Stat {
  value: string | number;
  suffix: string;
  label: string;
}

interface ServicePageStatsProps {
  stats: Stat[];
}

export function ServicePageStats({ stats }: ServicePageStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-[#112337]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white">
                {stat.value}
                <span className="text-[#204CE5]">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
