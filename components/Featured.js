'use client';

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardSpotlightDemo } from "@/components/ui/card-spotlight-demo";
import GoogleCard1 from "@/components/blocks/google-card-1";
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { CardSpotlightWebDev } from "@/components/ui/card-spotlight-web-dev";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import GoogleCard2  from "@/components/blocks/google-ai-card"
import { CardSpotlightNetworking } from "@/components/ui/card-spotlight-networking";
import { CardSpotlightLinux } from "@/components/ui/card-spotlight-linux";
import { CardSpotlightComputers } from "@/components/ui/card-spotlight-computers";

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
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Side Cards - Hide on smaller screens */}
            <div className="hidden lg:block w-[300px] space-y-10"> 
              <GoogleCard1 />
              <GoogleCard2 />
              <Accordion type="single" collapsible className="absolute w-[300px]">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Why I Love GNU FOSS</AccordionTrigger>
                  <AccordionContent>
                  <p>“When we speak of free software, we are referring to freedom, not price.”</p>
                  <p>— Richard Stallman</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Top 5 Linux Distros</AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      <li>1. Debian</li>
                      <li>2. Gentoo</li>
                      <li>3. Fedora</li>
                      <li>4. Arch Linux</li>
                      <li>5. Alpine</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is this?</AccordionTrigger>
                  <AccordionContent>
                    <pre className="text-xs font-mono whitespace-pre">
{`⠀⠀⠀⣴⣴⡤
⠀⣠⠀⢿⠇⡇⠀⠀⠀⠀⠀⠀⠀⢰⢷⡗
⠀⢶⢽⠿⣗⠀⠀⠀⠀⠀⠀⠀⠀⣼⡧⠂⠀⠀⣼⣷⡆
⠀⠀⣾⢶⠐⣱⠀⠀⠀⠀⠀⣤⣜⣻⣧⣲⣦⠤⣧⣿⠶
⠀⢀⣿⣿⣇⠀⠀⠀⠀⠀⠀⠛⠿⣿⣿⣷⣤⣄⡹⣿⣷
⠀⢸⣿⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⣿⣿
⠀⠿⠃⠈⠿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⠿⠿⠿

⠀⢀⢀⡀⠀⢀⣤⠀⠀⠀⠀⠀⠀⠀⡀⡀
⠀⣿⡟⡇⠀⠭⡋⠅⠀⠀⠀⠀⠀⢰⣟⢿
⠀⣹⡌⠀⠀⣨⣾⣷⣄⠀⠀⠀⠀⢈⠔⠌
⠰⣷⣿⡀⢐⢿⣿⣿⢻⠀⠀⠀⢠⣿⡿⡤⣴⠄⢀⣀⡀
⠘⣿⣿⠂⠈⢸⣿⣿⣸⠀⠀⠀⢘⣿⣿⣀⡠⣠⣺⣿⣷
⠀⣿⣿⡆⠀⢸⣿⣿⣾⡇⠀⣿⣿⣿⣿⣿⣗⣻⡻⠿⠁
⠀⣿⣿⡇⠀⢸⣿⣿⡇⠀⠀⠉⠉⠉⠉⠉⠉⠁`}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Center Content - Full width on mobile */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <CardSpotlightWebDev className="h-auto" />
              <CardSpotlightNetworking className="h-auto" />
              <CardSpotlightLinux className="h-auto" />
              <CardSpotlightComputers className="h-auto" />
            </div>

            {/* Right Side Cards - Hide on smaller screens */}
            <div className="hidden lg:block w-[300px] space-y-10"> 
              <GoogleCard1 />
              <GoogleCard2 />
              <Accordion type="single" collapsible className="absolute w-[300px]">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Top 8 Linux Commands</AccordionTrigger>
                    <AccordionContent>
                    <ul className="list-none space-y-1">
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-orange-300 mr-2"></span>
                        ls
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                        cd
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                        pwd
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        mkdir
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-blue-300 mr-2"></span>
                        rm
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        cp
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-amber-200 mr-2"></span>
                        mv
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-amber-700 mr-2"></span>
                        cat
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                        echo
                      </li>
                    </ul>
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
