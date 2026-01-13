import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, CERTIFICATIONS, NAV_ITEMS } from "@/lib/constants";
import { Logo } from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E3A5F] text-white">
      {/* Certificaten bar */}
      <div className="border-b border-white/10 bg-[#2C5282]">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-2 text-sm text-white/90"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-xs font-bold">
                  {cert.name.slice(0, 3)}
                </div>
                <span>{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo variant="white" />
            <p className="text-sm text-white/70">
              Al {currentYear - COMPANY.founded} jaar uw betrouwbare partner voor
              nieuwbouw, renovatie en erfgoedrenovatie in België.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Navigatie
            </h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {COMPANY.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {COMPANY.contact.phone}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {COMPANY.address.street}
                    <br />
                    {COMPANY.address.postal} {COMPANY.address.city}
                    <br />
                    {COMPANY.address.country}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Bedrijfsgegevens
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <span className="text-white/50">KBO:</span> {COMPANY.kbo}
              </li>
              <li>
                <span className="text-white/50">BTW:</span> {COMPANY.btw}
              </li>
            </ul>
            <div className="mt-4 space-y-2">
              <Link
                href="/privacy"
                className="block text-sm text-white/70 transition-colors hover:text-white"
              >
                Privacybeleid
              </Link>
              <Link
                href="/cookies"
                className="block text-sm text-white/70 transition-colors hover:text-white"
              >
                Cookiebeleid
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          <p>
            &copy; {currentYear} {COMPANY.name}. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
