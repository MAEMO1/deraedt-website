"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Phone, Linkedin, ArrowRight } from "lucide-react";
import { COMPANY, STATS } from "@/lib/constants";
import { Logo } from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("common.footer");
  const tNav = useTranslations("common.navigation");
  const tCta = useTranslations("common.cta");

  const navItems = [
    { href: "/", labelKey: "home" },
    { href: "/over-ons", labelKey: "about" },
    { href: "/diensten", labelKey: "services" },
    { href: "/projecten", labelKey: "projects" },
    { href: "/procurement", labelKey: "procurement" },
    { href: "/werken-bij", labelKey: "careers" },
    { href: "/contact", labelKey: "contact" },
  ] as const;

  const services = [
    { labelKey: "newbuild" },
    { labelKey: "renovation" },
    { labelKey: "heritage" },
    { labelKey: "facility" },
  ] as const;

  return (
    <footer className="bg-[#112337] text-white">
      {/* Main Footer Content */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="white" />
            <p className="text-white/60 leading-relaxed max-w-sm">
              {t("tagline", { years: STATS.yearsExperience })}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-4">
              <div>
                <div className="text-3xl font-bold">{STATS.yearsExperience}<span className="text-[#204CE5]">+</span></div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{t("years")}</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-bold">6</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{t("class")}</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-bold">40<span className="text-[#204CE5]">+</span></div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{t("experts")}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-6">
              {t("navigation")}
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-6">
              {t("services")}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.labelKey}>
                  <span className="text-white/70">{t(`servicesList.${service.labelKey}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-6">
              {t("contact")}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>{COMPANY.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.contact.phone}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>{COMPANY.contact.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block">{COMPANY.address.street}</span>
                    <span className="block">{COMPANY.address.postal} {COMPANY.address.city}</span>
                  </div>
                </div>
              </li>
            </ul>

            {/* CTA */}
            <Link
              href="/projectplanner"
              className="mt-8 inline-flex items-center gap-2 bg-[#204CE5] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#1A3BB8]"
            >
              {tCta("startProject")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-white/40">
                &copy; {currentYear} {COMPANY.name}
              </p>
              <div className="hidden sm:flex items-center gap-4 text-xs text-white/40">
                <span>ISO 9001</span>
                <span>•</span>
                <span>VCA**</span>
                <span>•</span>
                <span>Klasse 6</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={COMPANY.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <Link href="/privacy" className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                {t("privacy")}
              </Link>
              <Link href="/cookies" className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                {t("cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
