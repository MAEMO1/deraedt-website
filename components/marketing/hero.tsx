"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS, CERTIFICATIONS } from "@/lib/constants";

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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing function for smoother animation
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
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

// Decorative architectural element
function BlueprintGrid() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="blueprint"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M100 0L100 100M0 100L100 100"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M50 0L50 100M0 50L100 50"
            stroke="white"
            strokeWidth="0.25"
            fill="none"
            strokeDasharray="4 4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#blueprint)" />
    </svg>
  );
}

// Floating architectural shapes
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large corner accent - top right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px]"
      >
        <svg viewBox="0 0 500 500" className="w-full h-full opacity-[0.08]">
          <path
            d="M500 0 L500 500 L0 500"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M500 100 L500 500 L100 500"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M500 200 L500 500 L200 500"
            stroke="white"
            strokeWidth="0.25"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Bottom left accent */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px]"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.06]">
          <rect
            x="50"
            y="50"
            width="300"
            height="300"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          <rect
            x="100"
            y="100"
            width="200"
            height="200"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Floating dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
          className="absolute w-1 h-1 bg-[#4299E1] rounded-full"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 8}%`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-[#0F1E2E] via-[#1E3A5F] to-[#162D47]"
      >
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-[#4299E1]/8 blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[1000px] w-[1000px] rounded-full bg-[#2C5282]/15 blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#4299E1]/5 blur-[100px]" />
        </div>

        {/* Blueprint grid */}
        <BlueprintGrid />

        {/* Floating architectural shapes */}
        <FloatingShapes />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,30,46,0.4)_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-custom relative z-10 py-32"
      >
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <span className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-medium tracking-wide">Klasse 6 erkend aannemer</span>
            </span>
          </motion.div>

          {/* Main heading with distinctive typography */}
          <div className="mt-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {/* Year number - distinctive display */}
              <div className="relative inline-block">
                <span
                  className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-light tracking-tighter text-white leading-none"
                  style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontWeight: 300,
                  }}
                >
                  <AnimatedCounter end={STATS.yearsExperience} />
                </span>
                {/* Subtle decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4299E1]/50 to-transparent"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white"
            >
              jaar bouwen aan{" "}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#63B3ED] to-[#4299E1]">
                  de toekomst
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute bottom-1 left-0 h-3 bg-[#4299E1]/10 -z-10"
                />
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-2xl text-center text-lg text-white/60 leading-relaxed md:text-xl"
          >
            Van erfgoedrenovatie tot moderne nieuwbouw. Wij zijn uw betrouwbare
            partner voor elk bouwproject in België.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-white text-[#1E3A5F] hover:bg-white px-8 py-6 text-base font-medium"
            >
              <Link href="/projecten">
                <span className="relative z-10 flex items-center">
                  Onze Projecten
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-white to-gray-100 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 px-8 py-6 text-base font-medium backdrop-blur-sm"
            >
              <Link href="/contact">Neem Contact Op</Link>
            </Button>
          </motion.div>

          {/* Stats - elegant card design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          >
            {[
              {
                value: <AnimatedCounter end={STATS.yearsExperience} />,
                label: "Jaar ervaring",
                sublabel: "Sinds 1930",
              },
              {
                value: STATS.employees,
                label: "Medewerkers",
                sublabel: "Vakmannen",
              },
              {
                value: (
                  <>
                    Klasse <AnimatedCounter end={STATS.erkenningsklasse} />
                  </>
                ),
                label: "Erkenning",
                sublabel: "Overheidsopdrachten",
              },
              {
                value: CERTIFICATIONS.length,
                label: "Certificeringen",
                sublabel: "ISO & VCA",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.08]">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[#4299E1]/50 to-transparent" />
                    <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[#4299E1]/50 to-transparent" />
                  </div>

                  <div className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-medium text-white/70">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 text-xs text-white/40">
                    {stat.sublabel}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="group flex flex-col items-center gap-3 text-white/40 transition-colors hover:text-white/70"
            aria-label="Scroll naar beneden"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Ontdek meer
            </span>
            <div className="relative h-10 w-5 rounded-full border border-current p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-current"
              />
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1E2E] to-transparent pointer-events-none" />
    </section>
  );
}
