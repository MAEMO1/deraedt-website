"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg font-bold",
          variant === "white"
            ? "bg-white text-[#1E3A5F]"
            : "bg-[#1E3A5F] text-white"
        )}
      >
        DR
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "text-lg font-bold leading-tight",
            variant === "white" ? "text-white" : "text-[#1E3A5F]"
          )}
        >
          De Raedt
        </span>
        <span
          className={cn(
            "text-xs leading-tight",
            variant === "white" ? "text-white/80" : "text-[#2C5282]"
          )}
        >
          Bouwwerken
        </span>
      </div>
    </Link>
  );
}
