"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  tiltEnabled?: boolean;
  scaleOnHover?: number;
  tiltAmount?: number;
}

// 3D tilt card effect
export function TiltCard({
  children,
  className = "",
  glareEnabled = true,
  tiltEnabled = true,
  scaleOnHover = 1.02,
  tiltAmount = 10,
}: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

  // Glare effect
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tiltEnabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    x.set(normalizedX * 0.5);
    y.set(normalizedY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: scaleOnHover }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          rotateX: tiltEnabled ? rotateX : 0,
          rotateY: tiltEnabled ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare overlay */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// Hover reveal effect - content slides up from bottom
export function HoverReveal({
  children,
  revealContent,
  className = "",
}: {
  children: ReactNode;
  revealContent: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {/* Main content */}
      <motion.div
        variants={{
          initial: { y: 0 },
          hover: { y: -10 },
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {/* Reveal content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        variants={{
          initial: { y: "100%", opacity: 0 },
          hover: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {revealContent}
      </motion.div>
    </motion.div>
  );
}

// Shimmer effect on hover
export function ShimmerCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {children}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
      />
    </div>
  );
}

// Border glow effect on hover
export function GlowCard({
  children,
  className = "",
  glowColor = "#204CE5",
  glowIntensity = 0.3,
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: number;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: `0 0 30px ${glowColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')}, 0 0 60px ${glowColor}${Math.round(glowIntensity * 0.5 * 255).toString(16).padStart(2, '0')}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Scale and lift effect
export function LiftCard({
  children,
  className = "",
  liftAmount = -8,
  scaleAmount = 1.02,
}: {
  children: ReactNode;
  className?: string;
  liftAmount?: number;
  scaleAmount?: number;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        y: liftAmount,
        scale: scaleAmount,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger children animation
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
