"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: "top" | "bottom";
  showPercentage?: boolean;
}

// Horizontal progress bar
export function ScrollProgress({
  color = "#204CE5",
  height = 3,
  position = "top",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed left-0 right-0 z-[60] origin-left`}
      style={{
        [position]: 0,
        height,
        backgroundColor: color,
        scaleX,
      }}
    />
  );
}

// Circular progress indicator
export function ScrollProgressCircle({
  color = "#204CE5",
  size = 48,
  strokeWidth = 3,
  showPercentage = false,
}: ScrollProgressProps & { size?: number; strokeWidth?: number }) {
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = useTransform(
    springProgress,
    [0, 1],
    [circumference, 0]
  );

  const percentage = useTransform(springProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-[60]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {showPercentage && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
          style={{ color }}
        >
          <motion.span>
            {percentage.get().toFixed(0)}%
          </motion.span>
        </motion.span>
      )}
    </motion.div>
  );
}

// Scroll to top button with progress
export function ScrollToTopWithProgress({
  color = "#204CE5",
  size = 48,
}: { color?: string; size?: number }) {
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(springProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(springProgress, [0, 0.1], [0.8, 1]);

  const strokeWidth = 2;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(
    springProgress,
    [0, 1],
    [circumference, 0]
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[60] cursor-pointer"
      style={{ opacity, scale }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Scroll to top"
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="white"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          className="drop-shadow-lg"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {/* Arrow icon */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ color }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    </motion.button>
  );
}
