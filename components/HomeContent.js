import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import StickyScrollDemo from "@/components/sticky-scroll-demo";

export default function HomeContent() {
  return (
    <div className="overflow-x-hidden">
      <ClientWrapper>
        <Navbar />
      </ClientWrapper>
      
      <main className="w-full">
        <section id="hero" className="h-screen w-full flex items-center justify-center">
          <Hero />
        </section>
        
        <section id="featured" className="relative z-10 bg-white ">
          <div className="">
            <Featured />
          </div>
        </section>
        <section id="about" className=" bg-gray-50">
          <About />
        </section>
        
        <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
          <Projects />
        </section>
        
        <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <Blog />
        </section>
        
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
