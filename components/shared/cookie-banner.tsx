"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "deraedt-cookie-consent";

type ConsentType = "all" | "necessary" | null;

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: ConsentType) => {
    if (type) {
      localStorage.setItem(COOKIE_CONSENT_KEY, type);
      // Here you would also configure your analytics based on consent
      if (type === "all") {
        // Enable analytics
      }
    }
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 shadow-lg md:p-6"
        >
          <div className="container-custom">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF4FF] text-[#1E3A5F]">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1E3A5F]">
                    Wij respecteren uw privacy
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Deze website maakt gebruik van cookies om uw ervaring te
                    verbeteren. U kunt kiezen welke cookies u wilt accepteren.
                    {!showDetails && (
                      <button
                        onClick={() => setShowDetails(true)}
                        className="ml-1 text-[#4299E1] hover:underline"
                      >
                        Meer informatie
                      </button>
                    )}
                  </p>

                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 space-y-3 rounded-lg bg-[#F7FAFC] p-4 text-sm"
                    >
                      <div>
                        <strong className="text-[#1E3A5F]">
                          Noodzakelijke cookies
                        </strong>
                        <p className="text-gray-600">
                          Deze cookies zijn essentieel voor het functioneren van
                          de website en kunnen niet worden uitgeschakeld.
                        </p>
                      </div>
                      <div>
                        <strong className="text-[#1E3A5F]">
                          Analytische cookies
                        </strong>
                        <p className="text-gray-600">
                          Helpen ons te begrijpen hoe bezoekers de website
                          gebruiken, zodat we de gebruikerservaring kunnen
                          verbeteren.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href="/privacy"
                          className="text-[#4299E1] hover:underline"
                        >
                          Privacybeleid
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link
                          href="/cookies"
                          className="text-[#4299E1] hover:underline"
                        >
                          Cookiebeleid
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* GBA-compliant: Equal prominence for Accept and Reject buttons */}
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-row">
                <Button
                  onClick={() => handleConsent("necessary")}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Alleen noodzakelijke
                </Button>
                <Button
                  onClick={() => handleConsent("all")}
                  className="w-full sm:w-auto"
                >
                  Alles accepteren
                </Button>
              </div>
            </div>

            <button
              onClick={() => handleConsent("necessary")}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 lg:hidden"
              aria-label="Sluiten"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
