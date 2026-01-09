'use client';

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden">
      <div className="w-full px-6 z-10">
        <div className="mx-auto max-w-5xl text-center">

          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              <HeroHighlight containerClassName="rounded-xl "> <Highlight>whoisjason</Highlight> </HeroHighlight>
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              Minimal, reliable web apps. UNIX discipline. Full‑stack JavaScript.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 ">
              <Button asChild className="hover:bg-transparent hover:text-foreground border border-transparent hover:border-border transition-colors">
                <a href="#featured">Featured</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#projects">Projects</a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
