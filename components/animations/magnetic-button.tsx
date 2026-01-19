"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Component = "button",
  href,
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = Component === "a" ? motion.a : Component === "div" ? motion.div : motion.button;

  const props = {
    ref,
    className: `relative inline-block ${className}`,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ...(href && { href }),
    ...(onClick && { onClick }),
    ...(Component === "button" && { disabled }),
  };

  return (
    // @ts-expect-error - dynamic component type
    <MotionComponent {...props}>
      {children}
    </MotionComponent>
  );
}

// Button with inner content that also moves (double magnetic effect)
export function MagneticButtonDouble({
  children,
  className = "",
  innerClassName = "",
  strength = 0.3,
  innerStrength = 0.15,
  as: Component = "button",
  href,
  onClick,
}: MagneticButtonProps & { innerClassName?: string; innerStrength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Inner content moves in the same direction but less
  const innerX = useTransform(springX, (val) => val * (innerStrength / strength));
  const innerY = useTransform(springY, (val) => val * (innerStrength / strength));

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = Component === "a" ? motion.a : Component === "div" ? motion.div : motion.button;

  const props = {
    ref,
    className: `relative inline-block ${className}`,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ...(href && { href }),
    ...(onClick && { onClick }),
  };

  return (
    // @ts-expect-error - dynamic component type
    <MotionComponent {...props}>
      <motion.span
        className={`relative inline-flex ${innerClassName}`}
        style={{ x: innerX, y: innerY }}
      >
        {children}
      </motion.span>
    </MotionComponent>
  );
}
