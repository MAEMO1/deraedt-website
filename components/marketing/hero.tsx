"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { STATS } from "@/lib/constants";

// Animated text that cycles through words
function AnimatedTagline() {
  const words = ["erfgoed", "innovatie", "vakmanschap", "toekomst"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[280px] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#DAA520]"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Animated counter for statistics
function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[800px] overflow-hidden bg-[#0A1628]"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ scale: imageScale, opacity: imageOpacity }}
        className="absolute inset-0"
      >
        <Image
          src="/images/original-site/team-collage.jpg"
          alt="De Raedt team at work"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/50 to-[#0A1628]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/80 via-transparent to-[#0A1628]/60" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-6xl">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-[#B8860B]" />
            <span className="text-[#B8860B] text-sm font-medium tracking-[0.3em] uppercase">
              Sinds 1930
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[0.95] tracking-tight">
              Bouwen aan
              <br />
              <AnimatedTagline />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-xl text-lg sm:text-xl text-white/60 leading-relaxed"
          >
            Bouwwerken De Raedt Ivan NV - Uw betrouwbare partner voor
            erfgoedrenovatie, nieuwbouw en facility management in België.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <Link
              href="/projecten"
              className="group inline-flex items-center gap-3 bg-white text-[#0A1628] px-8 py-4 text-base font-semibold transition-all duration-300 hover:bg-[#B8860B] hover:text-white"
            >
              <span>Bekijk Projecten</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-base font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              <span>Contact</span>
            </Link>
          </motion.div>
        </div>

        {/* Statistics Bar - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#0A1628]/80 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {[
                { value: STATS.yearsExperience, label: "Jaar Ervaring", suffix: "" },
                { value: 500, label: "Projecten Voltooid", suffix: "+" },
                { value: 40, label: "Vakmannen", suffix: "+" },
                { value: 6, label: "Klasse Erkenning", suffix: "" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="py-6 sm:py-8 px-4 sm:px-8 text-center md:text-left"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-white/50 tracking-wide uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-32 sm:bottom-36 right-6 sm:right-12 lg:right-20"
        >
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
            aria-label="Scroll naar beneden"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-8 right-8 w-32 h-32 border-t-2 border-r-2 border-white/10 pointer-events-none" />
      <div className="absolute bottom-40 left-8 w-24 h-24 border-b-2 border-l-2 border-white/10 pointer-events-none" />
    </section>
  );
}
