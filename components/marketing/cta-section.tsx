"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-blueprint opacity-20" />

      {/* Decorative elements */}
      <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-[#9A6B4C]/10 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-[#9A6B4C]/10 hidden lg:block" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A6B4C]">
            Start vandaag
          </span>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-[#0C0C0C] leading-[0.95] tracking-[-0.02em]">
            Klaar om te bouwen?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-[#6B6560] font-serif font-light">
            Neem vandaag nog contact met ons op voor een vrijblijvend gesprek
            over uw project. Wij denken graag met u mee.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/15"
            >
              <span>Neem Contact Op</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="group inline-flex items-center gap-3 border-2 border-[#0C0C0C]/10 text-[#0C0C0C] px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300 hover:border-[#9A6B4C] hover:text-[#9A6B4C]"
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
