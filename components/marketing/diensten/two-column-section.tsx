"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, ReactNode } from "react";

interface TwoColumnSectionProps {
  label: string;
  title: string;
  children: ReactNode;
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  background?: "white" | "gray";
}

export function TwoColumnSection({
  label,
  title,
  children,
  image,
  imageAlt,
  imagePosition = "right",
  background = "white",
}: TwoColumnSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bgClass = background === "white" ? "bg-white" : "bg-[#F8F9FA]";

  return (
    <section ref={ref} className={`py-20 lg:py-28 ${bgClass}`}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "right" ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={imagePosition === "left" ? "order-1 lg:order-2" : ""}
          >
            <span className="text-[#204CE5] text-sm font-semibold uppercase tracking-wider">
              {label}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112337] leading-[1.15]">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "right" ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative ${imagePosition === "left" ? "order-2 lg:order-1" : ""}`}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                quality={75}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
