import React from 'react';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { GlassPanel } from "@/components/ui/glass";
import { LiquidAurora } from "@/components/ui/liquid-aurora";
import { NeofetchCard } from "@/components/blocks/neofetch-card";
import { CardDemo } from "@/components/blocks/cards-demo-1";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <section className="relative py-24" id="projects">
      <LiquidAurora />

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
              
              <GlassPanel className="p-6">
                <SectionHeader 
                  title={key === 'web' ? 'Web Development' : key === 'sysadmin' ? 'System Administration & Linux' : 'Networking & IT'} 
                  icon={key === 'web' ? <FaGlobe /> : key === 'sysadmin' ? <FaServer /> : <FaNetworkWired />}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sectionProjects.map((p, i) => (
                    <a key={i} href={p.href ?? '#'} className="group block">
                      <Card className="border border-input bg-card text-card-foreground transition-transform group-hover:-translate-y-0.5">
                        <CardHeader className="pb-2 flex flex-row items-start justify-between">
                          <CardTitle className="text-base font-semibold">
                            {p.title}
                          </CardTitle>
                          {React.cloneElement(p.icon, { className: "text-2xl text-frappe-blue" })}
                        </CardHeader>
                        <CardContent className="pt-0 text-sm text-muted-foreground">
                          <p>{p.description}</p>
                          {p.href && (
                            <div className="mt-3">
                              <Badge variant="secondary" className="text-[10px] tracking-wide">VISIT</Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </GlassPanel>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
