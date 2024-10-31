'use client';

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardSpotlightDemo } from "@/components/ui/card-spotlight-demo";
import GoogleCard1 from "@/components/blocks/google-card-1";
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { CardSpotlightJason } from "@/components/ui/card-spotlight-web-dev";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import GoogleCard2  from "@/components/blocks/google-ai-card"
import { CardSpotlightNetworking } from "@/components/ui/card-spotlight-networking";
import { CardSpotlightLinux } from "@/components/ui/card-spotlight-linux";

export default function Featured() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative py-16" id="Featured">  
      {/* Grid background */}
      <div className="absolute inset-0 dark:bg-frappe-mantle bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        {/* Radial gradient overlay */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-frappe-base bg-latte-overlay2 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      
      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[1920px] mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <HeroHighlight>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-frappe-text">
                Who is <Highlight>Jason</Highlight>
              </h2>
            </HeroHighlight>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex gap-8 lg:gap-12">
            {/* Left Side Cards - Updated visibility breakpoint from 2xl to md */}
            <div className="hidden md:block w-[300px] space-y-10"> 
              <GoogleCard1 />
              <GoogleCard2 />
              <Accordion type="single" collapsible className="absolute w-[300px]">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it cool?</AccordionTrigger>
                  <AccordionContent>
                    stupid dumb monkey
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Center Content */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <CardSpotlightJason className="h-auto" />
              <CardSpotlightNetworking className="h-auto" />
              <CardSpotlightLinux className="h-auto" />
              <CardSpotlightJason className="h-auto" />
            </div>

            {/* Right Side Cards - Updated visibility breakpoint from 2xl to md */}
            <div className="hidden md:block w-[300px] space-y-10"> 
              <GoogleCard1 />
              <GoogleCard2 />
              <Accordion type="single" collapsible className="absolute w-[300px]">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it cool?</AccordionTrigger>
                  <AccordionContent>
                    stupid dumb monkey
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
