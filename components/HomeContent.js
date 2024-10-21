import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import CardDemo from "./blocks/cards-demo-2";


export default function HomeContent() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <ClientWrapper>
        <Navbar />
      </ClientWrapper>
      <div id="section_1" className="h-screen">
        <Hero />
      </div>
      <main>

        <div id="section_2"><Featured /></div>
        <div id="section_3"><About /></div>
        <div id="section_4"><Projects /></div>
        <div id="section_5"><Blog /></div>
        <div id="section_6"><Contact /></div>
      </main>
      <Footer />
    </div>
  );
}
