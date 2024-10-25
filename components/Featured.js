'use client';

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardSpotlightDemo } from "@/components/ui/card-spotlight-demo";
import GoogleCard1 from "@/components/blocks/google-card-1";
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { CardSpotlightJason } from "@/components/ui/card-spotlight-web-dev";

export default function Featured() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section ref={sectionRef} className="featured py-16 sm:py-24 relative flex items-center pt-24" id="Featured">  
      {/* Grid background */}
      <div className="absolute inset-0 dark:bg-frappe-mantle bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        {/* Radial gradient overlay */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-frappe-base bg-latte-overlay2 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <HeroHighlight>
            <h2 className="text-3xl sm:text-4xl font-bold text-frappe-text text-center pb-12 pt-24">
              all about <Highlight>Jason</Highlight>
            </h2>
          </HeroHighlight>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 ">
            <CardSpotlightJason className="h-auto" />
            <CardSpotlightJason className="h-auto" />
            <CardSpotlightJason className="h-auto" />
            <CardSpotlightJason className="h-auto" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 content-end pl-10">
            <GoogleCard1 className="h-auto" />
            <GoogleCard1 className="h-auto" />
            <GoogleCard1 className="h-auto" />
            <GoogleCard1 className="h-auto" />
            <GoogleCard1 className="h-auto" />
            <GoogleCard1 className="h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
