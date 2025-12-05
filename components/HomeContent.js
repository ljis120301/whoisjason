"use client";
 
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DynamicSEO from "@/components/dynamicSEO";
import AdSlot from "@/components/ads/AdSlot";
import { AD_SLOTS } from "@/lib/admaven";
export default function HomeContent() {
  const adSlots = AD_SLOTS;
  return (
    <div className="overflow-x-hidden relative min-h-screen bg-latte-mantle dark:bg-frappe-base">
      <DynamicSEO />
      <Navbar />

      <main className="w-full relative z-10 min-h-screen">
        <section id="hero" className="h-screen w-full flex items-center justify-center">
          <Hero />
        </section>
        <AdSlot slotId={adSlots.afterHero} />
        <section id="about" className="relative z-10">
          <About />
        </section>
        <AdSlot slotId={adSlots.afterAbout} />
        
        <section id="featured" className="">
          <div className="">
            <Featured />
          </div>
        </section>
        <AdSlot slotId={adSlots.betweenFeaturedProjects} />

        <section id="projects" className="">
          <Projects />
        </section>
        <AdSlot slotId={adSlots.betweenProjectsBlog} />
        
        <section id="blog" className=" px-4 sm:px-6 lg:px-8 ">
          <Blog />
        </section>
        <AdSlot slotId={adSlots.beforeContact} />
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
          <Contact />
        </section>
        <AdSlot slotId={adSlots.beforeFooter} />
      </main>
      
      {/* Footer fixed at bottom, revealed by curtain effect */}
      <Footer />
    </div>
  );
}
