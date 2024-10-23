"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cnFilter } from "@/lib/utils";
import { useTheme } from 'next-themes';

const BoxesCore = ({ className, ...rest }) => {
  const rows = useMemo(() => new Array(100).fill(1), []);
  const cols = useMemo(() => new Array(100).fill(1), []);
  const { theme } = useTheme();

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
  ];

  const latteColors = [
    "#DC8A78", // Rosewater
    "#DD7878", // Flamingo
    "#EA76CB", // Pink
    "#8839EF", // Mauve
    "#D20F39", // Red
    "#FE640B", // Peach
    "#DF8E1D", // Yellow
    "#40A02B", // Green
    "#179299", // Teal
    "#04A5E5", // Sky
    "#209FB5", // Sapphire
    "#1E66F5", // Blue
    "#7287FD", // Lavender
    "#4C4F69", // Text
  ];

  const colors = theme === 'dark' ? frappeColors : latteColors;

  return (
    <div
      style={{
        transform: `translate(-35%,-30%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cnFilter(
        "absolute flex inset-0 w-[400%] h-[250%] z-0 transition-colors duration-300 ",
        "bg-latte-base dark:bg-frappe-base",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div 
          key={`row-${i}`} 
          className="w-16 h-8 border-l border-latte-overlay0 dark:border-frappe-overlay0 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              className="w-16 h-8 border-r border-t border-latte-overlay0 dark:border-frappe-overlay0 relative"
              whileHover={{
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
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
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-latte-overlay0 dark:text-frappe-overlay0 stroke-[1px] pointer-events-none"
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
