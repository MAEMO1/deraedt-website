"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Stat {
  value: string | number;
  suffix: string;
  label: string;
  color?: string;
}

interface ServicePageStatsProps {
  stats: Stat[];
}

// Animated counter that counts up from 0
function AnimatedStatCounter({
  value,
  suffix,
  color = "#204CE5",
  isInView,
}: {
  value: string | number;
  suffix: string;
  color?: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === "string" ? parseInt(value, 10) : value;
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    const controls = animate(0, numericValue, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, numericValue, isNumeric]);

  if (!isNumeric) {
    return (
      <span className="text-4xl lg:text-5xl font-bold text-white">
        {value}
        <span style={{ color }}>{suffix}</span>
      </span>
    );
  }

  return (
    <span className="text-4xl lg:text-5xl font-bold text-white">
      <span className="tabular-nums">{displayValue}</span>
      <span style={{ color }}>{suffix}</span>
    </span>
  );
}

export function ServicePageStats({ stats }: ServicePageStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Default colors for variety
  const defaultColors = ["#C73030", "#7C3AED", "#D97706", "#204CE5"];

  return (
    <section ref={ref} className="py-16 bg-[#112337]">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedStatCounter
                value={stat.value}
                suffix={stat.suffix}
                color={stat.color || defaultColors[index % defaultColors.length]}
                isInView={isInView}
              />
              <div className="mt-2 text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
