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
          ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#0C0C0C]/5"
          : "bg-transparent"
      )}
    >
      <div className="container-wide">
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
                        "relative px-5 py-2 text-[13px] font-medium tracking-[0.08em] transition-all duration-300",
                        scrolled || !isHomepage
                          ? isActive
                            ? "text-[#0C0C0C]"
                            : "text-[#6B6560] hover:text-[#0C0C0C]"
                          : isActive
                            ? "text-white"
                            : "text-white/60 hover:text-white"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className={cn(
                            "absolute bottom-0 left-5 right-5 h-[2px]",
                            scrolled || !isHomepage ? "bg-[#9A6B4C]" : "bg-white"
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
                "hidden lg:inline-flex items-center px-6 py-2.5 text-[12px] font-semibold tracking-[0.1em] transition-all duration-300",
                scrolled || !isHomepage
                  ? "border border-[#0C0C0C]/20 text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white hover:border-[#0C0C0C]"
                  : "border border-white/30 text-white hover:bg-white hover:text-[#0C0C0C]"
              )}
            >
              KLANTENPORTAAL
            </Link>

            <div className={cn(scrolled || !isHomepage ? "text-[#0C0C0C]" : "text-white")}>
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
