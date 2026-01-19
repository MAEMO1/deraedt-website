"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * ScrollToTop - Forces scroll to top on route changes
 *
 * This component solves the issue where browser back/forward navigation
 * restores scroll position, causing useInView animations with `once: true`
 * to not trigger because elements were already "in view" during render.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
