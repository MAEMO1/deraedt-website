"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#1E3A5F] py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-[#4299E1]/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-[#2C5282]/20 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Klaar om te bouwen?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            Neem vandaag nog contact met ons op voor een vrijblijvend gesprek
            over uw project. Wij denken graag met u mee.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#1E3A5F] hover:bg-white/90"
            >
              <Link href="/contact">
                Neem Contact Op
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <a href={`tel:${COMPANY.contact.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                {COMPANY.contact.phone}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
