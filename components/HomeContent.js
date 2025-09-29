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
import { AD_SLOTS } from "@/lib/adsense";
import { useEffect, useMemo } from "react";
import { toast } from "@/components/hooks/use-toast";
import { LiquidAurora } from "@/components/ui/liquid-aurora";

export default function HomeContent() {
  const adSlots = AD_SLOTS;
  const isOnionHost = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /\.onion$/i.test(window.location.hostname);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Inform Tor users on clearnet of onion site with a small toast (once)
    try {
      const ua = navigator.userAgent || '';
      const isTorBrowser = /TorBrowser/i.test(ua) || (/Firefox/i.test(ua) && /Tor/i.test(ua));
      if (!isOnionHost && isTorBrowser) {
        toast({
          title: 'Private browsing detected',
          description: 'This site is available over Tor: http://opurtrkxaxldq3ayee7r22j6znxhzf7pysvunracvszqq4jhwf5qfaqd.onion/',
        });
      }
    } catch (_) {}
  }, [isOnionHost]);
  return (
    <div className="overflow-x-hidden relative">
      <LiquidAurora />
      <DynamicSEO />
      <Navbar />
      
      {/* Sticky footer positioned behind main content */}
      <Footer />
      
      <main className="w-full relative z-10 min-h-[100vh]">
        <section id="hero" className="h-screen w-full flex items-center justify-center">
          <Hero />
        </section>
        {!isOnionHost && <AdSlot slotId={adSlots.afterHero} />}
        <section id="about" className="relative z-10">
          <About />
        </section>
        {!isOnionHost && <AdSlot slotId={adSlots.afterAbout} />}
        
        <section id="featured" className="">
          <div className="">
            <Featured />
          </div>
        </section>
        {!isOnionHost && <AdSlot slotId={adSlots.betweenFeaturedProjects} />}

        <section id="projects" className="">
          <Projects />
        </section>
        {!isOnionHost && <AdSlot slotId={adSlots.betweenProjectsBlog} />}
        
        <section id="blog" className=" px-4 sm:px-6 lg:px-8 ">
          <Blog />
        </section>
        {!isOnionHost && <AdSlot slotId={adSlots.beforeContact} />}
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
          <Contact />
        </section>
        {!isOnionHost && <AdSlot slotId={adSlots.beforeFooter} />}
      </main>
    </div>
  );
}
