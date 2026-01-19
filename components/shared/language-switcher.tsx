"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/config";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Minimal language codes for display
const localeLabels: Record<Locale, string> = {
  nl: "NL",
  fr: "FR",
  en: "EN",
};

interface LanguageSwitcherProps {
  variant?: "default" | "minimal" | "menu";
}

export function LanguageSwitcher({ variant = "default" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Menu variant - horizontal buttons for mobile menu
  if (variant === "menu") {
    return (
      <div className="flex items-center gap-2">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              loc === locale
                ? "bg-[#204CE5] text-white"
                : "bg-[#F5F5F5] text-[#112337] hover:bg-[#204CE5]/10 hover:text-[#204CE5]"
            }`}
          >
            {localeLabels[loc]}
          </button>
        ))}
      </div>
    );
  }

  // Minimal variant - just the code with underline
  if (variant === "minimal") {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#112337] hover:text-[#204CE5] transition-colors uppercase"
          aria-label="Select language"
        >
          <span>{localeLabels[locale]}</span>
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-3 bg-white rounded-lg shadow-xl border border-[#112337]/5 py-1 min-w-[100px] z-50 overflow-hidden"
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`w-full px-4 py-2.5 text-left text-xs font-bold tracking-wider uppercase transition-colors ${
                    loc === locale
                      ? "text-[#204CE5] bg-[#204CE5]/5"
                      : "text-[#112337] hover:text-[#204CE5] hover:bg-[#F5F5F5]"
                  }`}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default variant - dropdown with codes
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-bold tracking-wider text-[#112337] hover:text-[#204CE5] transition-colors border border-[#112337]/10 rounded-lg hover:border-[#204CE5]/30 uppercase"
        aria-label="Select language"
      >
        <span>{localeLabels[locale]}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-[#112337]/5 py-1 min-w-[100px] z-50 overflow-hidden"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full px-4 py-2.5 text-left text-xs font-bold tracking-wider uppercase transition-colors ${
                  loc === locale
                    ? "text-[#204CE5] bg-[#204CE5]/5"
                    : "text-[#112337] hover:text-[#204CE5] hover:bg-[#F5F5F5]"
                }`}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
