"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionRefs.current.indexOf(entry.target));
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: "-50% 0px -50% 0px", // Adjust this value to change when the section is considered active
        threshold: 0
      }
    );

    // Save current refs in a local variable to use in cleanup
    const currentRefs = sectionRefs.current;
    
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="relative h-[30rem]">
      {/* Fixed background */}
      <div className="absolute inset-0 dark:bg-frappe-mantle bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-frappe-base bg-latte-overlay2 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      
      {/* Scrollable content */}
      <div className="relative h-full overflow-y-auto" ref={containerRef}>
        <div className="flex justify-center space-x-10 p-10">
          <div className="relative flex items-start px-4 z-10">
            <div className="max-w-2xl">
              {content.map((item, index) => (
                <motion.div
                  key={item.title + index}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="my-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeSection === index ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-slate-100">{item.title}</h2>
                  <p className="text-kg text-slate-300 max-w-sm mt-10">{item.description}</p>
                </motion.div>
              ))}
              <div className="h-40" />
            </div>
          </div>
          <div
            className={cn(
              "hidden lg:block h-60 w-80 rounded-md bg-frappe-base sticky top-10 overflow-hidden z-10",
              contentClassName
            )}
          >
            {content[activeSection].content ?? null}
          </div>
        </div>
      </div>
    </div>
  );
};
