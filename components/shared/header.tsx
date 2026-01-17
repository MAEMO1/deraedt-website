"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, NAV_CTA } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
        scrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#0C0C0C]/5 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-wide">
        <div className="flex h-24 items-center justify-between">
          <Logo variant="default" />

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
                        "relative px-5 py-2 text-[13px] font-medium tracking-[0.08em] transition-all duration-300",
                        isActive
                          ? "text-[#0C0C0C]"
                          : "text-[#6B6560] hover:text-[#0C0C0C]"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#9A6B4C]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={NAV_CTA.href}
              className="group hidden lg:inline-flex items-center gap-2 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] bg-[#9A6B4C] text-white hover:bg-[#7A5339] transition-all duration-300 shadow-lg shadow-[#9A6B4C]/15"
            >
              {NAV_CTA.label}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <div className="text-[#0C0C0C]">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
