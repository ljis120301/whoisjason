"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cnFilter } from "@/lib/utils";
import { useTheme } from 'next-themes';

const BoxesCore = ({ className, ...rest }) => {
  const rows = useMemo(() => new Array(50).fill(1), []);
  const cols = useMemo(() => new Array(50).fill(1), []);
  const { theme } = useTheme();

  const colors = useMemo(() => {
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

    return theme === 'dark' ? frappeColors : latteColors;
  }, [theme]);

  const getRandomColor = useMemo(() => () => 
    colors[Math.floor(Math.random() * colors.length)]
  , [colors]);

  return (
    <div
      className={cnFilter(
        "absolute inset-0 w-full h-full z-0 transition-colors duration-300",
        "bg-latte-base dark:bg-frappe-base",
        className
      )}
      {...rest}
    >
      {/* Simplified background - just the Catppuccin base color */}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
