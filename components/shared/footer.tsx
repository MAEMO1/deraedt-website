"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Shield, BadgeCheck, Award, ArrowUpRight } from "lucide-react";
import { COMPANY, NAV_ITEMS } from "@/lib/constants";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const CERTIFICATIONS = [
  { id: "iso9001", name: "ISO 9001", fullName: "Kwaliteitsmanagement", icon: Shield },
  { id: "vca", name: "VCA**", fullName: "Veiligheid & Gezondheid", icon: BadgeCheck },
  { id: "klasse6", name: "Klasse 6", fullName: "Erkenning overheidsopdrachten", icon: Award },
];

function CertBadge({ cert, index }: { cert: typeof CERTIFICATIONS[number]; index: number }) {
  const Icon = cert.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4299E1]/20 text-[#63B3ED]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{cert.name}</div>
        <div className="text-xs text-white/50">{cert.fullName}</div>
      </div>
    </motion.div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#0F1E2E] to-[#0A1420] text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="footer-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Gradient orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#4299E1]/5 blur-[100px] pointer-events-none" />

      {/* Certification badges section */}
      <div className="relative border-b border-white/5">
        <div className="container-custom py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#4299E1]/50" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#4299E1]">
                Gecertificeerd & Erkend
              </span>
              <span className="h-px w-8 bg-[#4299E1]/50" />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {CERTIFICATIONS.map((cert, index) => (
                <CertBadge key={cert.id} cert={cert} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Company Info - spans 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="white" />
            <p className="text-sm text-white/60 leading-relaxed">
              Al {currentYear - COMPANY.founded} jaar uw betrouwbare partner voor
              nieuwbouw, renovatie en erfgoedrenovatie in België. Een warm
              familiebedrijf met focus op kwaliteit en vakmanschap.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-white/40">Projecten</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">96</div>
                <div className="text-xs text-white/40">Jaar ervaring</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">40+</div>
                <div className="text-xs text-white/40">Vakmannen</div>
              </div>
            </div>
          </div>

          {/* Navigation - spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Navigatie
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Diensten
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/diensten/nieuwbouw"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Nieuwbouw
                </Link>
              </li>
              <li>
                <Link
                  href="/diensten/renovatie"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Renovatie
                </Link>
              </li>
              <li>
                <Link
                  href="/diensten/erfgoed"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Erfgoedrenovatie
                </Link>
              </li>
              <li>
                <Link
                  href="/diensten/facility"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Facility Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - spans 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#4299E1] transition-colors group-hover:bg-[#4299E1]/20">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>{COMPANY.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#4299E1] transition-colors group-hover:bg-[#4299E1]/20">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>{COMPANY.contact.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#4299E1]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="pt-2">
                    <span className="block">{COMPANY.address.street}</span>
                    <span className="block">{COMPANY.address.postal} {COMPANY.address.city}</span>
                    <span className="block text-white/40">{COMPANY.address.country}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-xs text-white/40">
              &copy; {currentYear} {COMPANY.name}. Alle rechten voorbehouden.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-6 text-xs text-white/40">
              <span className="text-white/20">KBO: {COMPANY.kbo}</span>
              <Link
                href="/privacy"
                className="transition-colors hover:text-white/70"
              >
                Privacybeleid
              </Link>
              <Link
                href="/cookies"
                className="transition-colors hover:text-white/70"
              >
                Cookiebeleid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
