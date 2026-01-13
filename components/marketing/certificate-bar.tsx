"use client";

import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/lib/constants";
import { Shield, Award, CheckCircle } from "lucide-react";

const iconMap = {
  iso9001: Shield,
  vca: CheckCircle,
  klasse6: Award,
};

export function CertificateBar() {
  return (
    <section className="bg-[#EBF4FF] py-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {CERTIFICATIONS.map((cert) => {
            const Icon = iconMap[cert.id as keyof typeof iconMap] || Award;
            return (
              <div
                key={cert.id}
                className="flex items-center gap-3 text-[#1E3A5F]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">{cert.name}</div>
                  <div className="text-sm text-[#2C5282]">{cert.description}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
