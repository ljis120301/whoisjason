"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({ children, className }) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md",
        "dark:border-frappe-surface0/60 dark:bg-frappe-base/10",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-8px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function LiquidGrid({ className }) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-grid-white/[0.04] dark:bg-grid-white/[0.06]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
    </div>
  );
}


