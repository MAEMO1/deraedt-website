"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/constants";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
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
            {/* Phone - hidden on mobile */}
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-[#204CE5] hover:text-[#1A3BB8] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{COMPANY.contact.phone}</span>
            </a>

            {/* Project Planner - outlined button like McCownGordon */}
            <Link
              href="/projectplanner"
              className="hidden sm:inline-flex items-center px-5 py-2.5 border-2 border-[#204CE5] text-[#204CE5] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#204CE5] hover:text-white"
            >
              Projectplanner
            </Link>

            {/* Menu button - always visible */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-sm font-semibold text-[#112337] hover:text-[#204CE5] transition-colors"
            >
              <span className="hidden sm:inline uppercase tracking-wider text-xs">Menu</span>
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full screen menu overlay */}
      <div
        className={cn(
          "fixed inset-0 top-20 bg-white z-40 transition-all duration-500 ease-out",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container-wide py-12">
          <nav className="grid md:grid-cols-2 gap-8">
            {/* Main navigation */}
            <div>
              <div className="text-xs font-semibold text-[#686E77] uppercase tracking-wider mb-6">
                Navigatie
              </div>
              <ul className="space-y-1">
                {[
                  { href: "/", label: "Home" },
                  { href: "/diensten", label: "Diensten" },
                  { href: "/projecten", label: "Projecten" },
                  { href: "/over-ons", label: "Over Ons" },
                  { href: "/werken-bij", label: "Werken Bij" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => {
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
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Secondary navigation */}
            <div>
              <div className="text-xs font-semibold text-[#686E77] uppercase tracking-wider mb-6">
                Voor professionals
              </div>
              <ul className="space-y-4">
                {[
                  { href: "/procurement", label: "Procurement Hub", desc: "Certificaten & documentatie" },
                  { href: "/projectplanner", label: "Projectplanner", desc: "Start uw project" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group block p-4 bg-[#F5F5F5] hover:bg-[#204CE5]/5 transition-colors rounded-lg"
                    >
                      <span className="block text-lg font-bold text-[#112337] group-hover:text-[#204CE5] transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-sm text-[#686E77] mt-1">
                        {item.desc}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact info in menu */}
              <div className="mt-12 pt-8 border-t border-[#112337]/10">
                <div className="text-xs font-semibold text-[#686E77] uppercase tracking-wider mb-4">
                  Contact
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
    </header>
  );
}
