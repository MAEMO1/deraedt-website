"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled || !isHomepage
          ? "bg-white/95 backdrop-blur-md border-b border-[#0A1628]/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex h-20 items-center justify-between">
          <Logo variant={scrolled || !isHomepage ? "default" : "white"} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "px-5 py-2 text-sm font-medium transition-all duration-300 relative",
                        scrolled || !isHomepage
                          ? isActive
                            ? "text-[#0A1628]"
                            : "text-[#0A1628]/60 hover:text-[#0A1628]"
                          : isActive
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className={cn(
                            "absolute bottom-0 left-5 right-5 h-0.5",
                            scrolled || !isHomepage ? "bg-[#B8860B]" : "bg-white"
                          )}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className={cn(
                "hidden lg:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold transition-all duration-300",
                scrolled || !isHomepage
                  ? "border border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
                  : "border border-white/30 text-white hover:bg-white hover:text-[#0A1628]"
              )}
            >
              Klantenportaal
            </Link>

            <div className={cn(scrolled || !isHomepage ? "" : "text-white")}>
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
