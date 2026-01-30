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
import { motion } from "framer-motion";

const Section = ({ children, id, className }) => (
  <motion.section
    id={id}
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.section>
);

export default function HomeContent() {
  const adSlots = AD_SLOTS;
  return (
    <div className="overflow-x-hidden relative min-h-screen bg-background selection:bg-primary/20">
      <DynamicSEO />
      <Navbar />

      <main className="w-full relative z-10 min-h-screen">
        <section id="hero" className="h-screen w-full flex items-center justify-center">
          <Hero />
        </section>
        <AdSlot slotId={adSlots.afterHero} />

        <Section id="about" className="relative z-10 scroll-mt-24">
          <About />
        </Section>
        <AdSlot slotId={adSlots.afterAbout} />
        
        <Section id="featured" className="scroll-mt-24">
          <div className="">
            <Featured />
          </div>
        </Section>
        <AdSlot slotId={adSlots.betweenFeaturedProjects} />

        <Section id="projects" className="scroll-mt-24">
          <Projects />
        </Section>
        <AdSlot slotId={adSlots.betweenProjectsBlog} />
        
        <Section id="blog" className="px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <Blog />
        </Section>
        <AdSlot slotId={adSlots.beforeContact} />

        <Section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <Contact />
        </Section>
        <AdSlot slotId={adSlots.beforeFooter} />
      </main>
      
      <Footer />
    </div>
  );
}
