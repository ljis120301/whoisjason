'use client';

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full h-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="w-full px-6 z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Building the future <br className="hidden md:block" /> with{" "}
              <HeroHighlight containerClassName="inline-block">
                <Highlight className="text-black dark:text-white px-4 py-2 rounded-lg">
                  Modern Web Tech
                </Highlight>
              </HeroHighlight>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            I&apos;m Jason, a Full-Stack Developer specializing in minimal, reliable web applications.
            Merging UNIX discipline with modern JavaScript ecosystems to craft exceptional digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" asChild className="h-12 px-8 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25">
              <a href="#featured" className="flex items-center gap-2">
                Explore Work <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base font-medium rounded-full border-border hover:bg-secondary/50 backdrop-blur-sm transition-all">
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
