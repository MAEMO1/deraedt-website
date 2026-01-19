"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * ScrollToTop - Forces scroll to top on route changes
 *
 * This component solves the issue where browser back/forward navigation
 * restores scroll position, causing useInView animations with `once: true`
 * to not trigger because elements were already "in view" during render.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  // Use useLayoutEffect to run before browser paint on pathname change
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Also handle browser back/forward (popstate) events
  useEffect(() => {
    const handlePopState = () => {
      // Small delay to override browser's scroll restoration
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 0);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
