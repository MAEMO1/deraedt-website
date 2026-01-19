"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useInView, animate } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { STATS } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { useRef, MouseEvent, useEffect, useState } from "react";

// Magnetic button component for hero CTAs
function MagneticCTA({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={href}>
      <motion.span
        ref={ref}
        className={className}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLSpanElement>}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

// Animated counter for stats - counts up from 0
function AnimatedCounter({
  value,
  suffix,
  duration = 2,
}: {
  value: string | number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === "string" ? parseInt(value, 10) : value;

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, numericValue, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, numericValue, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="inline-flex"
    >
      <span className="tabular-nums">{displayValue}</span>
      <span className="text-[#204CE5]">{suffix}</span>
    </motion.span>
  );
}

// Word animation for headline
const wordAnimation = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("common.cta");

  // Split headline into words for animation
  const headlineWords = t("headline").split(" ");

  const stats = [
    { value: STATS.yearsExperience, suffix: "+", labelKey: "yearsExperience", color: "#C73030" },
    { value: "3", suffix: "x", labelKey: "certified", color: "#7C3AED" },
    { value: "40", suffix: "+", labelKey: "employees", color: "#D97706" },
    { value: "6", suffix: "", labelKey: "classRecognition", color: "#204CE5" },
  ] as const;

  return (
    <section className="relative min-h-screen bg-[#112337]">
      {/* Background Image - static, no parallax for performance */}
      <div className="absolute inset-0">
        <Image
          src="/images/original-site/Justitiepaleis-Dendermonde.jpg"
          alt="Justitiepaleis Dendermonde"
          fill
          className="object-cover"
          priority
          quality={75}
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/90 via-[#112337]/70 to-[#112337]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        {/* pb-40 on mobile to account for stats bar, pb-32 on larger screens */}
        <div className="container-wide pt-24 sm:pt-32 pb-44 sm:pb-32">
          <div className="max-w-3xl">
            {/* Badge - with subtle float animation */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8"
            >
              <motion.span
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {t("badge")}
            </motion.div>

            {/* Headline - word by word reveal */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] sm:leading-[1.05] tracking-tight"
              style={{ perspective: "1000px" }}
            >
              <span className="block overflow-hidden">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={wordAnimation}
                    initial="hidden"
                    animate="visible"
                    className="inline-block mr-[0.25em]"
                    style={{ transformOrigin: "bottom center" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 60, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-white"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {t("headlineAccent")}
                </motion.span>
              </span>
            </h1>

            {/* Subtitle - line reveal */}
            <div className="mt-6 sm:mt-8 overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
              >
                {t("subtitle", { years: STATS.yearsExperience })}
              </motion.p>
            </div>

            {/* CTA Buttons - with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <MagneticCTA
                href="/projectplanner"
                className="inline-flex items-center justify-center gap-3 bg-[#204CE5] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl hover:shadow-[#204CE5]/30 group"
              >
                {tCta("startProject")}
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:translate-x-1" />
                </motion.span>
              </MagneticCTA>
              <MagneticCTA
                href="/projecten"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-white/20 border border-white/10 group"
              >
                <Play className="w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:scale-110" />
                {tCta("viewProjects")}
              </MagneticCTA>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Stats bar - with staggered reveal */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 bg-white z-20"
      >
        <div className="container-wide py-5 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`${i > 0 ? "md:border-l md:border-gray-200 md:pl-8" : ""} group cursor-default`}
              >
                <div
                  className="text-2xl sm:text-4xl md:text-5xl font-bold transition-transform duration-300 group-hover:scale-105"
                  style={{ color: stat.color }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#686E77]">
                  {t(`stats.${stat.labelKey}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
