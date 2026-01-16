"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Shield, Award, Leaf } from "lucide-react";
import { STATS } from "@/lib/constants";

// Counter animation component
function AnimatedCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
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
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
        {count}
        <span className="text-[#9A6B4C]">{suffix}</span>
      </div>
      <div className="mt-2 text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.25em] font-medium">
        {label}
      </div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[800px] overflow-hidden bg-[#0C0C0C]"
    >
      {/* Background Image - Heritage Focus */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
          alt="Justitiepaleis Dendermonde - Erfgoedrenovatie"
          fill
          className="object-cover image-cinematic"
          priority
          quality={90}
        />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/90 via-[#0C0C0C]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/30" />

        {/* Subtle texture */}
        <div className="absolute inset-0 texture-stone" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col"
      >
        {/* Top spacer for header */}
        <div className="h-32" />

        {/* Main content area */}
        <div className="flex-1 flex items-center">
          <div className="container-wide w-full">
            <div className="max-w-3xl">
              {/* Certification badges - PROCUREMENT PROOF */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                  <Shield className="w-3.5 h-3.5 text-[#9A6B4C]" />
                  Klasse 6
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                  <Award className="w-3.5 h-3.5 text-[#9A6B4C]" />
                  ISO 9001 · VCA**
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                  <Leaf className="w-3.5 h-3.5 text-[#9A6B4C]" />
                  CO₂-Niveau 3
                </div>
              </motion.div>

              {/* Overline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="h-px w-12 bg-[#9A6B4C]" />
                <span className="label-overline">Familiale aannemer sinds 1930</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.02em] text-white"
              >
                Uw partner voor
                <br />
                <span className="text-heritage-gradient">erfgoed</span> & bouw
              </motion.h1>

              {/* Subtitle with procurement focus */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 max-w-xl text-lg sm:text-xl text-white/50 leading-relaxed font-serif font-light"
              >
                Raamcontracten, monumentenrestauratie en facility management
                voor overheden, infrastructuurbeheerders en bedrijven.
              </motion.p>

              {/* Dual CTA - Split flows */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/projectplanner"
                  className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 hover:bg-[#BA8B6C]"
                >
                  <span>Start uw project</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/procurement"
                  className="group inline-flex items-center gap-3 border border-white/30 text-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 hover:bg-white/10"
                >
                  <span>Voor overheden</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-10 flex items-center gap-6 text-[11px] text-white/40"
              >
                <span>Vertrouwd door:</span>
                <span className="font-medium text-white/60">Infrabel</span>
                <span className="text-white/20">·</span>
                <span className="font-medium text-white/60">Regie der Gebouwen</span>
                <span className="text-white/20">·</span>
                <span className="font-medium text-white/60">Stad Gent</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="border-t border-white/10"
        >
          <div className="container-wide py-8 sm:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
              <div className="md:pr-8">
                <AnimatedCounter value={STATS.yearsExperience} label="Jaar ervaring" />
              </div>
              <div className="md:px-8">
                <AnimatedCounter value={500} suffix="+" label="Projecten" />
              </div>
              <div className="md:px-8">
                <AnimatedCounter value={15} suffix="+" label="Raamcontracten" />
              </div>
              <div className="md:pl-8">
                <AnimatedCounter value={6} label="Klasse erkenning" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-28 right-8 sm:right-16 z-20 flex flex-col items-center gap-3 text-white/30 hover:text-white/60 transition-colors duration-500"
        aria-label="Scroll naar beneden"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Corner accent */}
      <div className="absolute top-32 right-8 sm:right-16 w-20 h-20 pointer-events-none z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#9A6B4C]/30"
        />
      </div>
    </section>
  );
}
