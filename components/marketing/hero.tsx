"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, Shield, Award, Leaf, ChevronDown } from "lucide-react";
import { STATS } from "@/lib/constants";

// Animated number with smooth counting
function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
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
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// Certification badge component
function CertBadge({
  icon: Icon,
  label,
  delay,
}: {
  icon: typeof Shield;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-[#0C0C0C]/5 px-4 py-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#9A6B4C]/20">
        <Icon className="w-4 h-4 text-[#9A6B4C]" strokeWidth={1.5} />
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#0C0C0C]/70">
          {label}
        </span>
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const imageY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#FAF7F2]"
    >
      {/* Background Image with parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 origin-center"
      >
        <Image
          src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
          alt="Justitiepaleis Dendermonde - Erfgoedrenovatie door De Raedt"
          fill
          className="object-cover"
          priority
          quality={95}
        />

        {/* Light warm overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-[#FAF7F2]/30" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-blueprint opacity-30" />

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Spacer for header */}
        <div className="h-32 lg:h-40" />

        {/* Main content area */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16">
            <div className="max-w-3xl">
              {/* Certification badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <CertBadge icon={Shield} label="Klasse 6" delay={0.4} />
                <CertBadge icon={Award} label="ISO 9001 · VCA**" delay={0.5} />
                <CertBadge icon={Leaf} label="CO₂-Niveau 3" delay={0.6} />
              </motion.div>

              {/* Overline with animated line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-5 mb-8"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px w-16 bg-[#9A6B4C] origin-left"
                />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9A6B4C]">
                  Familiale aannemer sinds 1930
                </span>
              </motion.div>

              {/* Main Headline */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.02em] text-[#0C0C0C]"
                >
                  Monumenten
                </motion.h1>
              </div>
              <div className="overflow-hidden mt-1">
                <motion.h1
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.02em]"
                >
                  <span className="text-[#9A6B4C]">van morgen</span>
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-10 max-w-xl text-lg sm:text-xl text-[#6B6560] leading-relaxed font-serif font-light"
              >
                Erfgoedrenovatie, overheidsopdrachten en facility management
                voor wie kwaliteit verkiest boven compromis.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-12 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/projectplanner"
                  className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/20"
                >
                  <span>Start uw project</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/procurement"
                  className="group inline-flex items-center gap-3 border-2 border-[#0C0C0C]/10 text-[#0C0C0C] px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300 hover:border-[#9A6B4C] hover:text-[#9A6B4C]"
                >
                  <span>Voor overheden</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="mt-12 flex items-center gap-4 text-[11px] text-[#6B6560]/60 tracking-wide"
              >
                <span className="uppercase font-medium">Partners:</span>
                <div className="flex items-center gap-3">
                  {["Infrabel", "Regie der Gebouwen", "Stad Gent"].map((name, i) => (
                    <span key={name} className="flex items-center gap-3">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-[#9A6B4C]/30" />}
                      <span className="text-[#0C0C0C]/50">{name}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="relative mt-auto"
        >
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-[#0C0C0C]/5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-[#9A6B4C]/40 to-transparent origin-left"
            />
          </div>

          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
              {[
                { value: STATS.yearsExperience, suffix: "", label: "Jaar ervaring" },
                { value: 500, suffix: "+", label: "Projecten" },
                { value: 15, suffix: "+", label: "Raamcontracten" },
                { value: 6, suffix: "", label: "Klasse erkenning" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`${
                    i > 0 ? "md:border-l md:border-[#0C0C0C]/5" : ""
                  } ${i > 0 ? "md:pl-8" : ""}`}
                >
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0C0C0C] tracking-tight">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#6B6560]/40 hover:text-[#9A6B4C] transition-colors duration-500"
        aria-label="Scroll naar beneden"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
