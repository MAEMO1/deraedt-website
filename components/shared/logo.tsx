"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-4 group", className)}>
      {/* Monogram mark - architectural, heritage feel */}
      <div
        className={cn(
          "relative flex h-12 w-12 items-center justify-center transition-colors duration-300",
          variant === "white"
            ? "bg-white/10 group-hover:bg-white/20"
            : "bg-[#0C0C0C] group-hover:bg-[#1A1A18]"
        )}
      >
        {/* Decorative corner accents */}
        <div
          className={cn(
            "absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-300",
            variant === "white" ? "border-[#9A6B4C]/60" : "border-[#9A6B4C]"
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-300",
            variant === "white" ? "border-[#9A6B4C]/60" : "border-[#9A6B4C]"
          )}
        />

        {/* Monogram */}
        <span
          className={cn(
            "font-display text-xl tracking-tight transition-colors duration-300",
            variant === "white" ? "text-white" : "text-white"
          )}
        >
          DR
        </span>
      </div>

      {/* Company name - refined typography */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-display text-xl leading-tight tracking-[-0.02em] transition-colors duration-300",
            variant === "white" ? "text-white" : "text-[#0C0C0C]"
          )}
        >
          De Raedt
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
            variant === "white" ? "text-white/50" : "text-[#9A6B4C]"
          )}
        >
          Bouwwerken
        </span>
      </div>
    </Link>
  );
}
