"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function TerminalWindow({
  title = "terminal",
  className,
  children,
  variant = "solid", // 'solid' | 'glass'
}) {
  return (
    <div
      className={cn(
        variant === "glass"
          ? "rounded-lg border text-foreground border-border bg-card/60 backdrop-blur-md dark:border-frappe-surface0/60 dark:bg-frappe-base/10 dark:text-frappe-text"
          : "rounded-lg border bg-card text-foreground border-border shadow-sm dark:bg-frappe-mantle dark:text-frappe-text dark:border-frappe-surface0",
        "font-mono text-sm",
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-between px-3 py-2",
        variant === "glass" ? "border-b border-border/60 dark:border-frappe-surface0/60" : "border-b border-border dark:border-frappe-surface0"
      )}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-frappe-red"></span>
          <span className="w-3 h-3 rounded-full bg-frappe-yellow"></span>
          <span className="w-3 h-3 rounded-full bg-frappe-green"></span>
        </div>
        <div className="text-xs text-muted-foreground dark:text-frappe-subtext0">{title}</div>
        <div className="w-10" />
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

export function TerminalBlock({
  prompt = "jason@whoisjason",
  path = "~",
  children,
  className,
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <span className="text-frappe-green dark:text-frappe-green">{prompt}</span>
        <span className="text-muted-foreground dark:text-frappe-overlay2">@</span>
        <span className="text-blue-600 dark:text-frappe-blue">{path}</span>
        <span className="text-muted-foreground dark:text-frappe-overlay2">$</span>
      </div>
      <div className="whitespace-pre-wrap leading-relaxed text-foreground dark:text-frappe-text">{children}</div>
    </div>
  );
}

export function TerminalList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="list-disc pl-5 space-y-1 marker:text-frappe-overlay2">
      {items.map((item, idx) => (
        <li key={idx} className="text-frappe-text">{item}</li>
      ))}
    </ul>
  );
}


