"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled || !isHomepage
          ? "bg-white/95 shadow-sm backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          <Logo variant={scrolled || !isHomepage ? "default" : "white"} />

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                        scrolled || !isHomepage
                          ? isActive
                            ? "bg-[#EBF4FF] text-[#1E3A5F]"
                            : "text-gray-700 hover:bg-gray-100"
                          : isActive
                            ? "bg-white/20 text-white"
                            : "text-white/90 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              asChild
              variant={scrolled || !isHomepage ? "outline" : "secondary"}
              className={cn(
                "hidden md:inline-flex",
                scrolled || !isHomepage
                  ? "border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white"
                  : "border-white bg-transparent text-white hover:bg-white hover:text-[#1E3A5F]"
              )}
            >
              <Link href="/portal/login">Klantenportaal</Link>
            </Button>

            <div className={cn(scrolled || !isHomepage ? "" : "text-white")}>
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
