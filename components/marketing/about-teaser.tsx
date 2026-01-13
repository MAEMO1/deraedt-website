"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS, COMPANY } from "@/lib/constants";

export function AboutTeaser() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#EBF4FF] px-4 py-1 text-sm font-medium text-[#1E3A5F]">
              Over Ons
            </span>
            <h2 className="mt-6 text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              {STATS.yearsExperience} jaar vakmanschap
              <br />
              <span className="text-[#4299E1]">in de bouw</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Sinds {COMPANY.founded} bouwt De Raedt mee aan de toekomst van
              België. Van historische monumenten tot moderne infrastructuur, wij
              combineren traditioneel vakmanschap met innovatieve technieken.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EBF4FF] text-[#1E3A5F]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-[#1E3A5F]">
                    Sinds {COMPANY.founded}
                  </div>
                  <div className="text-sm text-gray-500">
                    {STATS.yearsExperience} jaar ervaring
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EBF4FF] text-[#1E3A5F]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-[#1E3A5F]">
                    {STATS.employees}
                  </div>
                  <div className="text-sm text-gray-500">Medewerkers</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EBF4FF] text-[#1E3A5F]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-[#1E3A5F]">
                    Klasse {STATS.erkenningsklasse}
                  </div>
                  <div className="text-sm text-gray-500">Erkenning</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link href="/over-ons">
                  Lees meer over ons
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#2C5282]">
              {/* Placeholder for image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl font-bold opacity-20">
                    {STATS.yearsExperience}
                  </div>
                  <div className="mt-2 text-xl font-medium opacity-60">
                    Jaar Ervaring
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#4299E1]/30 blur-xl" />
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#4299E1]/20 blur-xl" />
            </div>

            {/* Timeline accent */}
            <div className="absolute -left-4 bottom-8 rounded-lg bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-1 rounded-full bg-gradient-to-b from-[#1E3A5F] to-[#4299E1]" />
                <div>
                  <div className="text-sm text-gray-500">Actief sinds</div>
                  <div className="text-xl font-bold text-[#1E3A5F]">
                    {COMPANY.founded}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
