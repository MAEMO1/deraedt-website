"use client";

import { useEffect } from "react";

interface LangSetterProps {
  lang: string;
}

/**
 * Client component that sets the HTML lang attribute.
 * This is needed because the root layout doesn't have access to the locale param.
 */
export function LangSetter({ lang }: LangSetterProps) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
