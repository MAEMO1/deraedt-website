"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { STATS } from "@/lib/constants";

// Staggered text reveal animation
function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="relative inline-block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

// Animated word that cycles with elegant transitions
function AnimatedWord() {
  const words = ["ERFGOED", "INNOVATIE", "VAKMANSCHAP", "TOEKOMST"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Show first word immediately on server, then animate on client
  if (!mounted) {
    return (
      <span className="text-[#C9A227]">
        {words[0]}
      </span>
    );
  }

  return (
    <span className="relative inline-block min-w-[300px] sm:min-w-[400px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block text-[#C9A227]"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Statistics counter with elegant animation
function StatCounter({
  end,
  suffix = "",
  label,
  delay = 0,
}: {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, end, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight">
        {count}
        <span className="text-[#C9A227]">{suffix}</span>
      </div>
      <div className="mt-2 text-[11px] sm:text-xs text-white/40 uppercase tracking-[0.25em] font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[900px] overflow-hidden bg-[#08111C]"
    >
      {/* Background Image with Parallax - FULL COVERAGE */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/original-site/team-collage.jpg"
          alt="De Raedt team at work"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Lighter gradient overlay - image more visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08111C]/60 via-[#08111C]/40 to-[#08111C]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08111C]/70 via-transparent to-[#08111C]/50" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-[1] grid-pattern opacity-20 pointer-events-none" />

      {/* Vertical Lines - Architectural Element */}
      <div className="absolute inset-0 z-[1] flex justify-between px-[10%] pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-px bg-white/[0.05] origin-top"
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Overline with animated line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-6 mb-10"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-20 bg-[#C9A227] origin-left"
            />
            <span className="text-[#C9A227] text-xs sm:text-sm font-medium tracking-[0.4em] uppercase">
              Sinds 1930 · België
            </span>
          </motion.div>

          {/* Main Headline - Dramatic Typography */}
          <div className="space-y-0">
            <h1 className="font-heading text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-[0.02em] text-white">
              <RevealText delay={0.3}>BOUWEN</RevealText>
            </h1>
            <h1 className="font-heading text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-[0.02em] text-white flex flex-wrap items-baseline gap-x-6">
              <RevealText delay={0.4}>AAN</RevealText>
              <AnimatedWord />
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed font-body"
          >
            Bouwwerken De Raedt Ivan NV — Uw betrouwbare partner voor
            erfgoedrenovatie, nieuwbouw en facility management.
            Generaties van vakmanschap in dienst van België.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <Link
              href="/projecten"
              className="group relative inline-flex items-center gap-3 bg-[#C9A227] text-[#08111C] px-10 py-5 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 hover:bg-white overflow-hidden"
            >
              <span className="relative z-10">Ontdek Projecten</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-white/30 text-white px-10 py-5 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 hover:bg-white/10 hover:border-white/50"
            >
              <span>Contact</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Bar - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10"
      >
        <div className="relative bg-[#08111C]/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-10 sm:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
              <div className="md:pr-8">
                <StatCounter end={STATS.yearsExperience} label="Jaar Ervaring" delay={1800} />
              </div>
              <div className="md:px-8">
                <StatCounter end={500} suffix="+" label="Projecten" delay={2000} />
              </div>
              <div className="md:px-8">
                <StatCounter end={40} suffix="+" label="Vakmannen" delay={2200} />
              </div>
              <div className="md:pl-8">
                <StatCounter end={6} label="Klasse Erkenning" delay={2400} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-44 sm:bottom-48 right-6 sm:right-12 lg:right-20 z-20"
      >
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="flex flex-col items-center gap-3 text-white/40 hover:text-white/70 transition-colors duration-500"
          aria-label="Scroll naar beneden"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium [writing-mode:vertical-lr]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </button>
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-8 right-8 w-32 h-32 pointer-events-none z-10"
      >
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#C9A227]/40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-48 left-8 w-24 h-24 pointer-events-none z-10 hidden lg:block"
      >
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/20" />
      </motion.div>
    </section>
  );
}
