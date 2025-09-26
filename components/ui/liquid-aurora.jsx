"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function LiquidAurora({ className }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute w-[60vw] h-[60vw] -left-[10vw] -top-[10vw]",
          "rounded-full blur-3xl opacity-30 mix-blend-screen bg-frappe-blue",
          "animate-blob"
        )}
        style={{ animationDelay: "0s" }}
      />
      <div
        className={cn(
          "absolute w-[55vw] h-[55vw] -right-[20vw] top-[10vh]",
          "rounded-full blur-3xl opacity-25 mix-blend-screen bg-frappe-mauve",
          "animate-blob"
        )}
        style={{ animationDelay: "6s" }}
      />
      <div
        className={cn(
          "absolute w-[50vw] h-[50vw] left-[10vw] -bottom-[20vh]",
          "rounded-full blur-3xl opacity-25 mix-blend-screen bg-frappe-teal",
          "animate-blob"
        )}
        style={{ animationDelay: "12s" }}
      />
    </div>
  );
}



