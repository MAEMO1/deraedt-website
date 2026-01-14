"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { COMPANY, NAV_ITEMS, STATS } from "@/lib/constants";
import { Logo } from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08111C] text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute -right-64 top-0 w-[500px] h-[500px] rounded-full border border-white/[0.02]" />

      {/* Main Footer */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 py-24 relative">
        <div className="grid gap-20 lg:grid-cols-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-8">
            <Logo variant="white" />
            <p className="text-white/40 leading-relaxed max-w-sm">
              Al {STATS.yearsExperience} jaar uw betrouwbare partner voor
              nieuwbouw, renovatie en erfgoedrenovatie in België.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-10 pt-6">
              <div>
                <div className="text-4xl font-display font-semibold text-white">{STATS.yearsExperience}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Jaar</div>
              </div>
              <div className="h-12 w-px bg-white/[0.06]" />
              <div>
                <div className="text-4xl font-display font-semibold text-white">500<span className="text-[#C9A227]">+</span></div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Projecten</div>
              </div>
              <div className="h-12 w-px bg-white/[0.06]" />
              <div>
                <div className="text-4xl font-display font-semibold text-white">40<span className="text-[#C9A227]">+</span></div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Vakmannen</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/20 mb-8">
              Navigatie
            </h3>
            <ul className="space-y-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-500"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/20 mb-8">
              Diensten
            </h3>
            <ul className="space-y-5">
              {["Nieuwbouw", "Renovatie", "Erfgoedrenovatie", "Facility Management"].map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/50">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/20 mb-8">
              Contact
            </h3>
            <ul className="space-y-6">
              <li>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="group flex items-center gap-5 text-white/50 hover:text-white transition-colors duration-500"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/[0.03] text-[#C9A227] transition-all duration-500 group-hover:bg-[#C9A227] group-hover:text-[#08111C]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{COMPANY.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="group flex items-center gap-5 text-white/50 hover:text-white transition-colors duration-500"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/[0.03] text-[#C9A227] transition-all duration-500 group-hover:bg-[#C9A227] group-hover:text-[#08111C]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{COMPANY.contact.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-5 text-white/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white/[0.03] text-[#C9A227]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-sm pt-3">
                    <span className="block">{COMPANY.address.street}</span>
                    <span className="block">{COMPANY.address.postal} {COMPANY.address.city}</span>
                  </div>
                </div>
              </li>
            </ul>

            {/* Certifications */}
            <div className="mt-10 flex items-center gap-5 pt-8 border-t border-white/[0.06]">
              <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Gecertificeerd:</span>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#C9A227]">ISO 9001</span>
                <span className="text-white/10">|</span>
                <span className="text-xs font-semibold text-[#C9A227]">VCA**</span>
                <span className="text-white/10">|</span>
                <span className="text-xs font-semibold text-[#C9A227]">Klasse 6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[11px] text-white/20 tracking-wide">
              &copy; {currentYear} {COMPANY.name}. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-8 text-[11px] text-white/20">
              <span className="tracking-wide">KBO: {COMPANY.kbo}</span>
              <Link href="/privacy" className="hover:text-white/50 transition-colors duration-500">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-white/50 transition-colors duration-500">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
