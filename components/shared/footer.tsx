"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, Linkedin, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { COMPANY, NAV_ITEMS, STATS } from "@/lib/constants";
import { Logo } from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="bg-[#F5F3EF] text-[#0C0C0C] relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-blueprint opacity-30" />

      {/* Decorative corner */}
      <div className="absolute top-12 right-12 w-24 h-24 border-t border-r border-[#9A6B4C]/10 hidden lg:block" />
      <div className="absolute bottom-32 left-12 w-16 h-16 border-b border-l border-[#9A6B4C]/10 hidden lg:block" />

      {/* CTA Section */}
      <div className="container-wide py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#0C0C0C]/5 p-12 lg:p-16 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A6B4C]">
                Klaar om te starten?
              </span>
              <h3 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-[#0C0C0C] tracking-[-0.01em]">
                Laten we bouwen aan de toekomst
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center justify-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#7A5339] shadow-lg shadow-[#9A6B4C]/15"
              >
                <span>Start uw project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="group inline-flex items-center justify-center gap-3 border-2 border-[#0C0C0C]/10 text-[#0C0C0C] px-8 py-4 text-sm font-medium transition-all duration-300 hover:border-[#9A6B4C] hover:text-[#9A6B4C]"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY.contact.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-[#0C0C0C]/5">
        <div className="container-wide py-16 sm:py-20 relative">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Company Info - Left Column */}
            <div className="lg:col-span-5 space-y-8">
              <Logo variant="default" />
              <p className="text-[#6B6560] leading-relaxed max-w-sm">
                Al {STATS.yearsExperience} jaar uw betrouwbare partner voor
                erfgoedrenovatie, nieuwbouw en facility management in België.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="font-display text-4xl text-[#0C0C0C]">{STATS.yearsExperience}</div>
                  <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mt-1">Jaar</div>
                </div>
                <div className="h-10 w-px bg-[#0C0C0C]/10" />
                <div>
                  <div className="font-display text-4xl text-[#0C0C0C]">500<span className="text-[#9A6B4C]">+</span></div>
                  <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mt-1">Projecten</div>
                </div>
                <div className="h-10 w-px bg-[#0C0C0C]/10" />
                <div>
                  <div className="font-display text-4xl text-[#0C0C0C]">40<span className="text-[#9A6B4C]">+</span></div>
                  <div className="text-[10px] text-[#6B6560]/60 uppercase tracking-[0.2em] mt-1">Medewerkers</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6B6560]/50 mb-6">
                Navigatie
              </h3>
              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm text-[#6B6560] hover:text-[#9A6B4C] transition-colors duration-300"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6B6560]/50 mb-6">
                Diensten
              </h3>
              <ul className="space-y-4">
                {["Nieuwbouw", "Renovatie", "Erfgoedrenovatie", "Facility Management"].map((service) => (
                  <li key={service}>
                    <span className="text-sm text-[#6B6560]">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6B6560]/50 mb-6">
                Contact
              </h3>
              <ul className="space-y-5">
                <li>
                  <a
                    href={`mailto:${COMPANY.contact.email}`}
                    className="group flex items-center gap-4 text-[#6B6560] hover:text-[#9A6B4C] transition-colors duration-300"
                  >
                    <div className="flex h-10 w-10 items-center justify-center bg-[#9A6B4C]/5 text-[#9A6B4C] transition-all duration-300 group-hover:bg-[#9A6B4C] group-hover:text-white">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{COMPANY.contact.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY.contact.phone}`}
                    className="group flex items-center gap-4 text-[#6B6560] hover:text-[#9A6B4C] transition-colors duration-300"
                  >
                    <div className="flex h-10 w-10 items-center justify-center bg-[#9A6B4C]/5 text-[#9A6B4C] transition-all duration-300 group-hover:bg-[#9A6B4C] group-hover:text-white">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{COMPANY.contact.phone}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-4 text-[#6B6560]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#9A6B4C]/5 text-[#9A6B4C]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="text-sm pt-2">
                      <span className="block">{COMPANY.address.street}</span>
                      <span className="block">{COMPANY.address.postal} {COMPANY.address.city}</span>
                    </div>
                  </div>
                </li>
              </ul>

              {/* Social & Certifications */}
              <div className="mt-8 pt-6 border-t border-[#0C0C0C]/5">
                <div className="flex items-center justify-between">
                  <a
                    href={COMPANY.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#6B6560]/50 hover:text-[#9A6B4C] transition-colors duration-300"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-xs">LinkedIn</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-[#9A6B4C]">ISO 9001</span>
                    <span className="text-[#0C0C0C]/10">·</span>
                    <span className="text-[10px] font-semibold text-[#9A6B4C]">VCA</span>
                    <span className="text-[#0C0C0C]/10">·</span>
                    <span className="text-[10px] font-semibold text-[#9A6B4C]">Klasse 6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#0C0C0C]/5 bg-white/50">
        <div className="container-wide py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-[#6B6560]/50 tracking-wide">
              &copy; {currentYear} {COMPANY.name}. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-6 text-[11px] text-[#6B6560]/50">
              <span className="tracking-wide">KBO: {COMPANY.kbo}</span>
              <Link href="/privacy" className="hover:text-[#9A6B4C] transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-[#9A6B4C] transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
