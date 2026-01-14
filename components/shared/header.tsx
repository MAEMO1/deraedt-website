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
        "fixed left-0 right-0 top-0 z-50 transition-all duration-700",
        scrolled || !isHomepage
          ? "bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-[#08111C]/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex h-24 items-center justify-between">
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
                        "px-6 py-2 text-[13px] font-medium uppercase tracking-[0.12em] transition-all duration-500 relative",
                        scrolled || !isHomepage
                          ? isActive
                            ? "text-[#08111C]"
                            : "text-[#08111C]/50 hover:text-[#08111C]"
                          : isActive
                            ? "text-white"
                            : "text-white/60 hover:text-white"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className={cn(
                            "absolute bottom-0 left-6 right-6 h-[2px]",
                            scrolled || !isHomepage ? "bg-[#C9A227]" : "bg-white"
                          )}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-8">
            <Link
              href="/login"
              className={cn(
                "hidden lg:inline-flex items-center gap-2 px-8 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-500",
                scrolled || !isHomepage
                  ? "border border-[#08111C] text-[#08111C] hover:bg-[#08111C] hover:text-white"
                  : "border border-white/30 text-white hover:bg-white hover:text-[#08111C]"
              )}
            >
              Klantenportaal
            </Link>

            <div className={cn(scrolled || !isHomepage ? "text-[#08111C]" : "text-white")}>
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
