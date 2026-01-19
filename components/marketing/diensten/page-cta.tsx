"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface PageCTAProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
}

export function PageCTA({
  title,
  subtitle,
  ctaText = "Start projectplanner",
  ctaHref = "/projectplanner",
}: PageCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112337]">
            {title}
          </h2>
          <p className="mt-6 text-lg text-[#686E77]">{subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 bg-[#204CE5] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#1a3fd4]"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#112337] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#1a2d47]"
            >
              <Phone className="w-4 h-4" />
              {COMPANY.contact.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
