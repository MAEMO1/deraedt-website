"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      {/* Logo mark - stylized DR with diagonal */}
      <div
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-lg font-bold overflow-hidden",
          variant === "white"
            ? "bg-white text-[#1E3A5F]"
            : "bg-[#1E3A5F] text-white"
        )}
      >
        {/* Diagonal line accent */}
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-[2px] origin-top-left rotate-45 translate-x-1",
            variant === "white" ? "bg-[#1E3A5F]/30" : "bg-white/30"
          )}
        />
        <span className="relative z-10 text-sm">DR</span>
      </div>

      {/* Company name */}
      <div className="flex flex-col">
        <span
          className={cn(
            "text-lg font-bold leading-tight tracking-tight",
            variant === "white" ? "text-white" : "text-[#1E3A5F]"
          )}
        >
          De Raedt
        </span>
        <span
          className={cn(
            "text-xs leading-tight tracking-wide",
            variant === "white" ? "text-white/70" : "text-[#4299E1]"
          )}
        >
          Bouwwerken
        </span>
      </div>
    </Link>
  );
}
