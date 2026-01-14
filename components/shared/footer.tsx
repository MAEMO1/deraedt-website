"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { COMPANY, NAV_ITEMS, STATS } from "@/lib/constants";
import { Logo } from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 py-20">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="white" />
            <p className="text-white/50 leading-relaxed max-w-sm">
              Al {STATS.yearsExperience} jaar uw betrouwbare partner voor
              nieuwbouw, renovatie en erfgoedrenovatie in België.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-display font-semibold text-white">{STATS.yearsExperience}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Jaar</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-display font-semibold text-white">500+</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Projecten</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-display font-semibold text-white">40+</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Vakmannen</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-6">
              Navigatie
            </h3>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-6">
              Diensten
            </h3>
            <ul className="space-y-4">
              {["Nieuwbouw", "Renovatie", "Erfgoedrenovatie", "Facility Management"].map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/60">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-6">
              Contact
            </h3>
            <ul className="space-y-5">
              <li>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-white/5 text-[#B8860B]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{COMPANY.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-white/5 text-[#B8860B]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{COMPANY.contact.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-4 text-white/60">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/5 text-[#B8860B]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-sm pt-2">
                    <span className="block">{COMPANY.address.street}</span>
                    <span className="block">{COMPANY.address.postal} {COMPANY.address.city}</span>
                  </div>
                </div>
              </li>
            </ul>

            {/* Certifications */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs text-white/30 uppercase tracking-wider">Gecertificeerd:</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#B8860B]">ISO 9001</span>
                <span className="text-white/20">|</span>
                <span className="text-xs font-semibold text-[#B8860B]">VCA**</span>
                <span className="text-white/20">|</span>
                <span className="text-xs font-semibold text-[#B8860B]">Klasse 6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              &copy; {currentYear} {COMPANY.name}. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/30">
              <span>KBO: {COMPANY.kbo}</span>
              <Link href="/privacy" className="hover:text-white/60 transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-white/60 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
