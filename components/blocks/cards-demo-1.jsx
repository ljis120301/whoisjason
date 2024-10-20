"use client";
import { cn } from "@/lib/utils";

export default function CardDemo({ title, description }) {
  return (
    <div className="w-full h-full">
      <div
        className={cn(
          "group cursor-pointer overflow-hidden relative card h-full rounded-md shadow-xl flex flex-col justify-between p-6",
          "bg-frappe-mantle",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-frappe-overlay0 hover:after:opacity-50",
          "transition-all duration-500"
        )}>
        <div className="text relative z-10">
          <h2 className="font-bold text-xl text-frappe-text mb-3">
            {title}
          </h2>
          <div className="font-normal text-sm text-frappe-subtext1">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
