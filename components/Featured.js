import React from "react";
import { CardSpotlightDemo } from "@/components/ui/card-spotlight-demo";
import CardDemo from "@/components/blocks/cards-demo-3";

export default function Featured() {
  return (
    <section className="featured py-16 sm:py-24 relative">
      {/* Grid background */}
      <div className="absolute inset-0 dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        {/* Radial gradient overlay */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-frappe-text mb-8 sm:mb-12 text-center">Featured</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            <CardSpotlightDemo 
              radius={240}
              color="rgba(100, 100, 238, 0.3)"
              className="col-span-2 aspect-[16/9]"
            />
            <CardSpotlightDemo 
              radius={120}
              color="rgba(100, 238, 100, 0.3)"
              className="aspect-square"
            />
            <CardSpotlightDemo 
              radius={120}
              color="rgba(238, 100, 100, 0.3)"
              className="aspect-square"
            />
            <CardSpotlightDemo 
              radius={120}
              color="rgba(238, 238, 100, 0.3)"
              className="aspect-square"
            />
          </div>
          
          <div className="space-y-6">
            <CardDemo
              title="Card 1"
              description="Description for Card 1"
            />
            <CardDemo
              title="Card 2"
              description="Description for Card 2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
