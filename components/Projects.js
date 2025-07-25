import React from 'react';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { NeofetchCard } from "@/components/blocks/neofetch-card";
import { CardDemo } from "@/components/blocks/cards-demo-1";
import { FaGlobe, FaServer, FaNetworkWired, FaLinux, FaMicrosoft, FaPython, FaCode, FaDesktop, FaMusic, FaRoute, FaFilm, FaBlog, FaRobot, FaCog, FaStickyNote } from 'react-icons/fa';

const projects = {
  web: [
    { title: "Portfolio", description: "My main portfolio website showcasing my work and experience.", icon: <FaGlobe />, href: "https://whoisjason.me" },
    { title: "Blog", description: "Personal blog where I write about technology, projects, and thoughts.", icon: <FaBlog />, href: "https://bee.whoisjason.me" },
    { title: "Notes App", description: "Google Docs-like notes app with cloud sync, self-hosted docker option, 2FA support, and React Query caching.", icon: <FaStickyNote />, href: "https://notes.whoisjason.me" },
    { title: "MP3 Track Extractor", description: "AI-powered tool using local models to separate audio tracks from songs for music producers.", icon: <FaMusic />, href: "https://mp3.whoisjason.me" },
    { title: "BGP Route Checker", description: "Custom-built tool to check BGP routes and network information for network diagnostics.", icon: <FaRoute />, href: "https://bgp.whoisjason.me" },
    { title: "Emby Media Server", description: "Self-hosted media server for streaming movies, TV shows, and personal media collection.", icon: <FaFilm />, href: "https://emby.whoisjason.me" },
    { title: "Business Website Template", description: "Custom business website template showcasing modern web design capabilities.", icon: <FaCog />, href: "https://gram.whoisjason.me" },
    { title: "Monero P2Pool Observer", description: "Next.js-based p2pool mini observer for monitoring Monero mining pool statistics.", icon: <FaCode />, href: "https://xmr.whoisjason.me" },
    { title: "OpenWebUI Portal", description: "Self-hosted AI interface portal for interacting with various AI models and services.", icon: <FaRobot />, href: "https://ai.whoisjason.me" },
  ],
  sysadmin: [
    { title: "Self-Hosted Services", description: "Dockerized deployments of Next.js sites with automated CI/CD using BASH scripts.", icon: <FaServer /> },
    { title: "Virtual Active Directory", description: "A fully virtualized Microsoft AD server with Group Policy and a Domain Server on KVM/QEMU.", icon: <FaMicrosoft /> },
    { title: "Linux Expertise", description: "Daily driver Gentoo on a ThinkPad T420, extensive experience with Arch Linux, and comfortable in any UNIX shell.", icon: <FaLinux /> },
    { title: "PC Building & Hardware", description: "10+ years building custom PCs and servers, including water-cooled and production environment builds.", icon: <FaDesktop /> },
  ],
  it: [
    { title: "Network Infrastructure", description: "Hands-on experience with Cisco and MikroTik equipment, including configuration and remote site maintenance.", icon: <FaNetworkWired /> },
    { title: "Business Automation", description: "Developed custom Python scripts and Docker containers to manage customer databases and manipulate data.", icon: <FaPython /> },
    { title: "ISP Operations", description: "Run recursive DNS servers for customer connections and assist with network operations at a small ISP.", icon: <FaServer /> },
    { title: "Home Security Automation", description: "Wrote specialized Python code to automate and manage my home security system.", icon: <FaCode /> },
  ]
};

const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center gap-4 mb-8">
    {React.cloneElement(icon, { className: "text-3xl text-frappe-blue" })}
    <h3 className="text-3xl font-bold text-frappe-text tracking-tight">{title}</h3>
  </div>
);

export default function Projects() {
  return (
    <section className="relative py-24" id="section_3">
      <div className="absolute inset-0 dark:bg-frappe-mantle bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-frappe-base bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <Image 
            src="/pi-server.jpeg" 
            className="rounded-full w-20 h-20 object-cover border-4 border-frappe-blue mb-4" 
            alt="Projects Icon" 
            width={80} 
            height={80} 
          />
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-frappe-sapphire via-frappe-blue to-frappe-sky pb-2">
            My Work & Experience
          </h2>
          <p className="text-lg text-frappe-subtext0 max-w-3xl mt-4">
            A curated showcase of my projects in web development, system administration, and network engineering.
          </p>
        </div>
        
        <Separator className="my-16 bg-frappe-surface2" />
        
        <div className="space-y-20">
          {Object.entries(projects).map(([key, sectionProjects], index) => (
            <React.Fragment key={key}>
              {index === 1 && (
                <div className="my-20">
                  <NeofetchCard />
                </div>
              )}
              <div>
                <SectionHeader 
                  title={key === 'web' ? 'Web Development' : key === 'sysadmin' ? 'System Administration & Linux' : 'Networking & IT'} 
                  icon={key === 'web' ? <FaGlobe /> : key === 'sysadmin' ? <FaServer /> : <FaNetworkWired />}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {sectionProjects.map((p, i) => (
                    <CardDemo key={i} href={p.href}>
                      <CardDemo.Header>
                        <div className="flex justify-between items-start">
                          <CardDemo.Title>{p.title}</CardDemo.Title>
                          {React.cloneElement(p.icon, { className: "text-3xl text-frappe-blue" })}
                        </div>
                      </CardDemo.Header>
                      <CardDemo.Content>
                        <p className="mt-2">{p.description}</p>
                      </CardDemo.Content>
                    </CardDemo>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
