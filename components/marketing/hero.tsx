"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, Shield, Award, Leaf, ChevronDown } from "lucide-react";
import { STATS } from "@/lib/constants";

// Animated number with spring physics
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

// Floating badge component
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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-white/[0.08] px-4 py-2.5 transition-all duration-500 hover:bg-white/[0.12] hover:border-white/[0.15]">
        <Icon className="w-4 h-4 text-[#C9A87C]" strokeWidth={1.5} />
        <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/90">
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

  const imageY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[900px] overflow-hidden bg-[#0A0A09]"
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
          style={{ filter: "contrast(1.05) saturate(0.85)" }}
        />

        {/* Dramatic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A09] via-[#0A0A09]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09] via-[#0A0A09]/20 to-[#0A0A09]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A09]/60 via-transparent to-transparent" />

        {/* Film grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Geometric accent elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right corner frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute top-24 right-12 lg:right-24 hidden lg:block"
        >
          <div className="w-32 h-32 border-t border-r border-[#C9A87C]/20" />
        </motion.div>

        {/* Bottom-left measurement marks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-40 left-12 lg:left-24 hidden lg:flex flex-col items-start gap-1"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-px bg-white/30"
              style={{ width: i % 2 === 0 ? "24px" : "12px" }}
            />
          ))}
        </motion.div>

        {/* Diagonal line accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 right-0 w-[40%] h-px bg-gradient-to-l from-[#C9A87C]/30 to-transparent origin-right hidden xl:block"
          style={{ transform: "rotate(-15deg) translateY(-50%)" }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col"
      >
        {/* Spacer for header */}
        <div className="h-28 lg:h-36" />

        {/* Main content area */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-4xl">
              {/* Certification badges - floating row */}
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
                  className="h-px w-16 bg-[#C9A87C] origin-left"
                />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A87C]">
                  Familiale aannemer sinds 1930
                </span>
              </motion.div>

              {/* Main Headline - Monumental */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] tracking-[-0.03em] text-white"
                >
                  Monumenten
                </motion.h1>
              </div>
              <div className="overflow-hidden mt-1">
                <motion.h1
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] tracking-[-0.03em]"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A87C] via-[#E5D4B8] to-[#C9A87C]">
                    van morgen
                  </span>
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-10 max-w-xl text-lg sm:text-xl text-white/45 leading-relaxed font-serif font-light"
              >
                Erfgoedrenovatie, overheidsopdrachten en facility management
                voor wie kwaliteit verkiest boven compromis.
              </motion.p>

              {/* Dual CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-12 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/projectplanner"
                  className="group relative inline-flex items-center gap-4 bg-[#C9A87C] text-[#0A0A09] px-8 py-5 font-semibold text-sm tracking-wide overflow-hidden transition-all duration-500 hover:bg-[#E5D4B8]"
                >
                  <span className="relative z-10">Start uw project</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/procurement"
                  className="group inline-flex items-center gap-4 border border-white/20 text-white px-8 py-5 font-medium text-sm tracking-wide transition-all duration-500 hover:bg-white/[0.05] hover:border-white/30"
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
                className="mt-12 flex items-center gap-4 text-[11px] text-white/30 tracking-wide"
              >
                <span className="uppercase">Partners:</span>
                <div className="flex items-center gap-3">
                  {["Infrabel", "Regie der Gebouwen", "Stad Gent"].map((name, i) => (
                    <span key={name} className="flex items-center gap-3">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                      <span className="text-white/50">{name}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar - Monumental numbers */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="relative"
        >
          {/* Top border with accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.08]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-[#C9A87C]/50 to-transparent origin-left"
            />
          </div>

          <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
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
                    i > 0 ? "md:border-l md:border-white/[0.06]" : ""
                  } ${i > 0 ? "md:pl-8" : ""}`}
                >
                  <div className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-[10px] text-white/35 uppercase tracking-[0.2em] font-medium">
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
        transition={{ delay: 2.2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors duration-500"
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
