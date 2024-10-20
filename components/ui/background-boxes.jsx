"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BoxesCore = ({ className, ...rest }) => {
  const rows = useMemo(() => new Array(75).fill(1), []);
  const cols = useMemo(() => new Array(75).fill(1), []);

  const frappeColors = [
    "#F2D5CF", // Rosewater
    "#EEBEBE", // Flamingo
    "#F4B8E4", // Pink
    "#CA9EE6", // Mauve
    "#E78284", // Red
    "#EF9F76", // Peach
    "#E5C890", // Yellow
    "#A6D189", // Green
    "#81C8BE", // Teal
    "#99D1DB", // Sky
    "#85C1DC", // Sapphire
    "#8CAAEE", // Blue
    "#BAB0E8", // Lavender
    "#C6D0F5", // Text
    "#B5BFE2", // Subtext1
    "#A5ADCE", // Subtext0
    "#949CBB", // Overlay2
    "#838BA7", // Overlay1
    "#737994", // Overlay0
    "#626880", // Surface2
    "#51576D", // Surface1
    "#414559", // Surface0
    "#303446", // Base
    "#292C3C", // Mantle
    "#232634", // Crust
  ];

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div key={`row-${i}`} className="w-16 h-8 border-l border-slate-700 relative">
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              className="w-16 h-8 border-r border-t border-slate-700 relative"
              whileHover={{
                backgroundColor: frappeColors[Math.floor(Math.random() * frappeColors.length)],
                transition: { duration: 0 },
              }}
            >
              {j % 2 === 0 && i % 2 === 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              )}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
