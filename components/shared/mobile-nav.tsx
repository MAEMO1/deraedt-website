"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, NAV_CTA, COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm p-0 bg-[#0C0C0C] border-l border-white/10">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <Logo variant="white" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Sluiten</span>
            </Button>
          </div>

          <nav className="flex-1 overflow-auto p-6">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-lg font-medium transition-all duration-300",
                        isActive
                          ? "text-white bg-white/5 border-l-2 border-[#9A6B4C]"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-white/10 p-6 space-y-4">
            <Link
              href={NAV_CTA.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-center gap-2 w-full bg-[#9A6B4C] text-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
            >
              {NAV_CTA.label}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <div className="text-center">
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {COMPANY.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
