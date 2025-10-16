"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function LiquidAurora({ className }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {/* Simplified - removed complex aurora effects to show clean Catppuccin background */}
    </div>
  );
}



