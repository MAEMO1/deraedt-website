"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface ServicePageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  breadcrumbLabel: string;
}

export function ServicePageHero({
  title,
  subtitle,
  backgroundImage,
  breadcrumbLabel,
}: ServicePageHeroProps) {
  return (
    <section className="relative bg-[#112337] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#112337]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="container-wide pt-32 pb-4">
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/diensten" className="hover:text-white transition-colors">
              Diensten
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{breadcrumbLabel}</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="container-wide pb-24 lg:pb-32">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/projectplanner"
                className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-[#1a3fd4]"
              >
                Start uw project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY.contact.phone}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
