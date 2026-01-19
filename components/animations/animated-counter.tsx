"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
  prefixClassName?: string;
  once?: boolean;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  suffixClassName = "",
  prefixClassName = "",
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`inline-flex ${className}`}
    >
      {prefix && <span className={prefixClassName}>{prefix}</span>}
      <span className="tabular-nums">{displayValue}</span>
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </motion.span>
  );
}

// Variant with decimal support
export function AnimatedDecimalCounter({
  value,
  decimals = 1,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  suffixClassName = "",
  prefixClassName = "",
  once = true,
}: AnimatedCounterProps & { decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(decimals));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, decimals]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`inline-flex ${className}`}
    >
      {prefix && <span className={prefixClassName}>{prefix}</span>}
      <span className="tabular-nums">{displayValue}</span>
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </motion.span>
  );
}
