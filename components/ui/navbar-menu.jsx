"use client";
import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.2,
  damping: 15,
  stiffness: 150,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  onClick
}) => {
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setActive(item)}
      className="relative px-4 py-2 text-base font-medium text-frappe-text dark:text-frappe-text hover:text-frappe-blue dark:hover:text-frappe-blue transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ ...transition, duration: 0.1 }}
    >
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
      >
        {item}
      </motion.span>
      {active === item && (
        <motion.div
          className="absolute inset-0 bg-frappe-surface0 dark:bg-frappe-surface0 rounded-md -z-10"
          layoutId="active-pill"
          transition={transition}
        />
      )}
    </motion.button>
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full  bg-frappe-base dark:bg-frappe-crust shadow-frappe-overlay1 flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};
