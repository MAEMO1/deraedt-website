"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, Linkedin } from "lucide-react";
import { COMPANY, NAV_ITEMS, STATS } from "@/lib/constants";
import { Logo } from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C0C0C] text-white relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 texture-stone opacity-30" />

      {/* Decorative elements */}
      <div className="absolute -right-32 top-32 w-64 h-64 rounded-full border border-white/[0.02]" />
      <div className="absolute -left-16 bottom-48 w-48 h-48 rounded-full border border-[#9A6B4C]/5" />

      {/* Main Footer Content */}
      <div className="container-wide py-20 sm:py-24 relative">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Company Info - Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <Logo variant="white" />
            <p className="text-white/40 leading-relaxed max-w-sm">
              Al {STATS.yearsExperience} jaar uw betrouwbare partner voor
              erfgoedrenovatie, nieuwbouw en facility management in België.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="font-display text-4xl text-white">{STATS.yearsExperience}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Jaar</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="font-display text-4xl text-white">500<span className="text-[#9A6B4C]">+</span></div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Projecten</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="font-display text-4xl text-white">40<span className="text-[#9A6B4C]">+</span></div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Medewerkers</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 mb-6">
              Navigatie
            </h3>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
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
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 mb-6">
              Diensten
            </h3>
            <ul className="space-y-4">
              {["Nieuwbouw", "Renovatie", "Erfgoedrenovatie", "Facility Management"].map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/50">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 mb-6">
              Contact
            </h3>
            <ul className="space-y-5">
              <li>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-white/5 text-[#9A6B4C] transition-all duration-300 group-hover:bg-[#9A6B4C] group-hover:text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{COMPANY.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-white/5 text-[#9A6B4C] transition-all duration-300 group-hover:bg-[#9A6B4C] group-hover:text-white">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{COMPANY.contact.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-4 text-white/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/5 text-[#9A6B4C]">
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
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <a
                  href={COMPANY.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-300"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-xs">LinkedIn</span>
                </a>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-[#9A6B4C]">ISO 9001</span>
                  <span className="text-white/10">·</span>
                  <span className="text-[10px] font-semibold text-[#9A6B4C]">VCA</span>
                  <span className="text-white/10">·</span>
                  <span className="text-[10px] font-semibold text-[#9A6B4C]">Klasse 6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-wide py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/25 tracking-wide">
              &copy; {currentYear} {COMPANY.name}. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-6 text-[11px] text-white/25">
              <span className="tracking-wide">KBO: {COMPANY.kbo}</span>
              <Link href="/privacy" className="hover:text-white/50 transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-white/50 transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
