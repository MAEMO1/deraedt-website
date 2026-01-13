"use client";

import { motion } from "framer-motion";
import { Building2, Hammer, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

const iconMap = {
  Building2,
  Hammer,
  Landmark,
};

export function Services() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
            Onze Diensten
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Van concept tot oplevering, wij begeleiden u bij elke stap van uw
            bouwproject met expertise en vakmanschap.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/diensten/${service.id}`}
                  className="group block h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-[#4299E1]/20 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EBF4FF] text-[#1E3A5F] transition-colors group-hover:bg-[#1E3A5F] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#1E3A5F]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{service.description}</p>
                  <div className="mt-6 flex items-center text-sm font-medium text-[#4299E1] opacity-0 transition-opacity group-hover:opacity-100">
                    Meer info
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
