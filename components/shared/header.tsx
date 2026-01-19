"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { COMPANY } from "@/lib/constants";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("header");
  const tNav = useTranslations("common.navigation");

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { href: "/", labelKey: "home" },
    { href: "/diensten", labelKey: "services" },
    { href: "/projecten", labelKey: "projects" },
    { href: "/over-ons", labelKey: "about" },
    { href: "/werken-bij", labelKey: "careers" },
    { href: "/contact", labelKey: "contact" },
  ] as const;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white shadow-sm"
            : "bg-white/95 backdrop-blur-sm"
        )}
      >
        <div className="container-wide">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo variant="default" />
            </Link>

            {/* Right side - minimal like McCownGordon */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Language Switcher - hidden on mobile */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Phone - hidden on mobile */}
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="hidden lg:flex items-center gap-2 text-sm font-medium text-[#204CE5] hover:text-[#1A3BB8] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY.contact.phone}</span>
              </a>

              {/* Project Planner - outlined button like McCownGordon */}
              <Link
                href="/projectplanner"
                className="hidden sm:inline-flex items-center px-5 py-2.5 border-2 border-[#204CE5] text-[#204CE5] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#204CE5] hover:text-white"
              >
                {t("projectPlanner")}
              </Link>

              {/* Menu button - always visible */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-sm font-semibold text-[#112337] hover:text-[#204CE5] transition-colors"
              >
                <span className="hidden sm:inline uppercase tracking-wider text-xs">
                  {menuOpen ? t("close") : t("menu")}
                </span>
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full screen menu overlay - OUTSIDE header to avoid stacking context issues */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-white overflow-auto"
        >
          {/* Menu header with close button */}
          <div className="sticky top-0 bg-white border-b border-[#112337]/5 z-10">
            <div className="container-wide">
              <div className="flex h-20 items-center justify-between">
                <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center">
                  <Logo variant="default" />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#112337] hover:text-[#204CE5] transition-colors"
                >
                  <span className="hidden sm:inline uppercase tracking-wider text-xs">{t("close")}</span>
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Menu content */}
          <div className="container-wide py-12">
            <nav className="grid md:grid-cols-2 gap-8">
              {/* Main navigation */}
              <div>
                <div className="text-xs font-semibold text-[#686E77] uppercase tracking-wider mb-6">
                  {t("navigation")}
                </div>
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            "block py-3 text-3xl sm:text-4xl font-bold transition-colors duration-200",
                            isActive
                              ? "text-[#204CE5]"
                              : "text-[#112337] hover:text-[#204CE5]"
                          )}
                        >
                          {tNav(item.labelKey)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Secondary navigation */}
              <div>
                <div className="text-xs font-semibold text-[#686E77] uppercase tracking-wider mb-6">
                  {t("forProfessionals")}
                </div>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/procurement"
                      onClick={() => setMenuOpen(false)}
                      className="group block p-4 bg-[#F5F5F5] hover:bg-[#204CE5]/5 transition-colors rounded-lg"
                    >
                      <span className="block text-lg font-bold text-[#112337] group-hover:text-[#204CE5] transition-colors">
                        {t("procurementHub")}
                      </span>
                      <span className="block text-sm text-[#686E77] mt-1">
                        {t("procurementDesc")}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projectplanner"
                      onClick={() => setMenuOpen(false)}
                      className="group block p-4 bg-[#F5F5F5] hover:bg-[#204CE5]/5 transition-colors rounded-lg"
                    >
                      <span className="block text-lg font-bold text-[#112337] group-hover:text-[#204CE5] transition-colors">
                        {t("projectPlanner")}
                      </span>
                      <span className="block text-sm text-[#686E77] mt-1">
                        {t("projectPlannerDesc")}
                      </span>
                    </Link>
                  </li>
                </ul>

                {/* Language switcher in mobile menu */}
                <div className="mt-8 pt-8 border-t border-[#112337]/10">
                  <div className="text-xs font-semibold text-[#686E77] uppercase tracking-wider mb-4">
                    {t("language")}
                  </div>
                  <LanguageSwitcher variant="menu" />
                </div>

                {/* Contact info in menu */}
                <div className="mt-8 pt-8 border-t border-[#112337]/10">
                  <div className="text-xs font-semibold text-[#686E77] uppercase tracking-wider mb-4">
                    {tNav("contact")}
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${COMPANY.contact.phone}`}
                      className="flex items-center gap-3 text-[#112337] hover:text-[#204CE5] transition-colors"
                    >
                      <Phone className="w-5 h-5 text-[#204CE5]" />
                      <span className="font-medium">{COMPANY.contact.phone}</span>
                    </a>
                    <p className="text-sm text-[#686E77]">
                      {COMPANY.address.street}<br />
                      {COMPANY.address.postal} {COMPANY.address.city}
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
