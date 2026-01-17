"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {/* Clean, minimal wordmark - McCownGordon style */}
      <span
        className={cn(
          "text-2xl font-bold tracking-tight transition-colors duration-300",
          variant === "white" ? "text-white" : "text-[#112337]"
        )}
      >
        DE RAEDT
      </span>
    </div>
  );
}
