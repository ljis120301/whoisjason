import React from "react";
import { CardSpotlightDemo } from "@/components/ui/card-spotlight-demo";
import CardDemo from "@/components/blocks/cards-demo-3";

export default function Featured() {
  return (
    <section className="featured py-16 sm:py-24 relative " >
      {/* Grid background */}
      <div className="absolute inset-0 dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        {/* Radial gradient overlay */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-frappe-text mb-8 sm:mb-12 text-center">Featured</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          <div className="lg:col-span-3 h-full flex items-center justify-center">
            <CardSpotlightDemo 
              radius={360}
              color="rgba(100, 100, 238, 0.3)"
            />
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 text-frappe-text content-center flex-col rounded ">
            {/* Updated structure to ensure CardDemo components are direct children */}
            <CardDemo/> 
            <CardDemo/> 
            <CardDemo/> 
            <CardDemo/> 
          </div>
        </div>
      </div>
    </section>
  );
}
