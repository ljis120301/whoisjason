import React from 'react';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaGlobe, FaServer, FaNetworkWired, FaLinux, FaMicrosoft, FaPython, FaCode, FaDesktop, FaMusic, FaRoute, FaFilm, FaBlog, FaRobot, FaCog, FaStickyNote, FaDatabase, FaExternalLinkAlt } from 'react-icons/fa';
import { cn } from "@/lib/utils";

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
    { title: "Internal CRM", description: "I have created internal Customer Resource Management systems to hold customer information. As well as allow least privlidge management of the system to be deligated by a system administrator. I was able to craft a Full-Stack NextJS web application using Prisma DB. As well as bundling into a self contained docker image for the company. I was able to manage the deployment and operation of the entirre project.", icon: <FaDatabase />, href: "https://crm.whoisjason.me" },
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

// Transform projects to Bento Grid format with dialog functionality
const transformToBentoGrid = (projects, sectionName) => {
  const mutedFrappeColors = [
    'bg-frappe-surface1',
    'bg-frappe-surface2', 
    'bg-frappe-surface0',
    'bg-frappe-overlay0',
    'bg-frappe-overlay1',
    'bg-frappe-overlay2'
  ];

  return projects.map((project, index) => {
    const colorIndex = index % mutedFrappeColors.length;
    const backgroundColor = mutedFrappeColors[colorIndex];
    
    return {
      Icon: project.icon.type,
      name: project.title,
      description: project.description.length > 100 ? project.description.substring(0, 100) + "..." : project.description,
      href: project.href || "#",
      cta: project.href ? "View Project" : "Learn More",
      className: index === 0 ? "col-span-3 lg:col-span-2" : "col-span-3 lg:col-span-1",
      background: (
        <div className={`absolute inset-0 ${backgroundColor} rounded-xl border border-frappe-overlay0/20`}></div>
      ),
      project: project, // Keep original project data for dialog
    };
  });
};

// Main Header Component (Style 5)
const MainHeader = () => (
  <div className="mb-16 bg-frappe-surface0 border-l-4 border-frappe-blue rounded-r-lg p-6">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-frappe-blue/20 rounded-lg flex items-center justify-center">
        <FaCode className="text-frappe-blue text-xl" />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-frappe-text mb-2">My Work & Experience</h1>
        <p className="text-frappe-subtext0 mb-4">Some of the projects I have worked on, or just interesting stuff I have experience with.</p>
        <div className="flex gap-2">
        </div>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, icon, description }) => (
  <Card className="mb-8 bg-frappe-surface0 border-frappe-surface2">
    <CardHeader className="pb-4">
      <div className="flex items-center gap-4">
        {React.cloneElement(icon, { className: "text-3xl text-frappe-blue" })}
        <CardTitle className="text-3xl font-bold text-frappe-text tracking-tight">{title}</CardTitle>
      </div>
      {description && (
        <CardDescription className="text-frappe-subtext1 text-lg">
          {description}
        </CardDescription>
      )}
    </CardHeader>
  </Card>
);

export default function Projects() {
  return (
    <section className="relative py-24" id="projects">
      <div className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        <MainHeader />
        
        <Separator className="my-16 bg-frappe-surface2" />
        
        <div className="space-y-20">
          {Object.entries(projects).map(([key, sectionProjects], index) => (
            <React.Fragment key={key}>
              <div className="relative">
                <SectionHeader 
                  title={key === 'web' ? 'Web Development' : key === 'sysadmin' ? 'System Administration & Linux' : 'Networking & IT'} 
                  icon={key === 'web' ? <FaGlobe /> : key === 'sysadmin' ? <FaServer /> : <FaNetworkWired />}
                  description={key === 'web' ? 'Modern web applications and full-stack development projects' : key === 'sysadmin' ? 'Infrastructure management, Linux systems, and server administration' : 'Network engineering, automation, and IT operations'}
                />
                <BentoGrid className="max-w-7xl mx-auto">
                  {transformToBentoGrid(sectionProjects, key).map((project, idx) => (
                    <Dialog key={idx}>
                      <DialogTrigger asChild>
                        <BentoCard 
                          {...project}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-frappe-base border-frappe-surface2 text-frappe-text">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 text-2xl text-frappe-text">
                            {React.cloneElement(project.project.icon, { className: "text-3xl text-frappe-blue" })}
                            {project.project.title}
                          </DialogTitle>
                          <DialogDescription className="text-base text-frappe-subtext1">
                            {project.project.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-frappe-surface0 rounded-lg border border-frappe-surface2">
                            <h4 className="font-semibold text-frappe-text mb-2">Project Details</h4>
                            <p className="text-sm text-frappe-subtext1">
                              {project.project.title === "Portfolio" && "A modern, responsive portfolio website built with Next.js, featuring real-time data integration, dark/light theme support, and optimized performance."}
                              {project.project.title === "Blog" && "A personal blog platform with markdown support, SEO optimization, and integrated analytics for sharing thoughts on technology and development."}
                              {project.project.title === "Notes App" && "A full-featured note-taking application with real-time collaboration, cloud synchronization, 2FA security, and offline support using React Query for efficient data management."}
                              {project.project.title === "MP3 Track Extractor" && "An AI-powered audio separation tool that uses local machine learning models to isolate individual tracks from mixed audio, perfect for music producers and audio engineers."}
                              {project.project.title === "BGP Route Checker" && "A network diagnostic tool for checking BGP routing information, helping network administrators troubleshoot connectivity issues and analyze routing paths."}
                              {project.project.title === "Emby Media Server" && "A self-hosted media streaming solution for organizing and accessing personal movie and TV show collections with transcoding support and multi-device compatibility."}
                              {project.project.title === "Business Website Template" && "A modern, responsive business website template showcasing contemporary web design principles with customizable components and mobile-first approach."}
                              {project.project.title === "Monero P2Pool Observer" && "A Next.js-based monitoring dashboard for P2Pool mining statistics, providing real-time data visualization for Monero cryptocurrency mining operations."}
                              {project.project.title === "OpenWebUI Portal" && "A self-hosted AI interface that provides access to various AI models and services, enabling local AI interactions with a user-friendly web interface."}
                              {project.project.title === "Internal CRM" && "A comprehensive Customer Resource Management system built with Next.js and Prisma, featuring role-based access control, customer data management, and automated workflows. Deployed as a self-contained Docker application with full administrative control."}
                              {project.project.title === "Self-Hosted Services" && "Dockerized deployments of Next.js sites with automated CI/CD using BASH scripts for efficient development workflows."}
                              {project.project.title === "Virtual Active Directory" && "A fully virtualized Microsoft AD server with Group Policy and a Domain Server on KVM/QEMU for enterprise-level directory services."}
                              {project.project.title === "Linux Expertise" && "Daily driver Gentoo on a ThinkPad T420, extensive experience with Arch Linux, and comfortable in any UNIX shell environment."}
                              {project.project.title === "PC Building & Hardware" && "10+ years building custom PCs and servers, including water-cooled and production environment builds with extensive hardware knowledge."}
                              {project.project.title === "Network Infrastructure" && "Hands-on experience with Cisco and MikroTik equipment, including configuration and remote site maintenance for enterprise networks."}
                              {project.project.title === "Business Automation" && "Developed custom Python scripts and Docker containers to manage customer databases and manipulate data for business efficiency."}
                              {project.project.title === "ISP Operations" && "Run recursive DNS servers for customer connections and assist with network operations at a small ISP with real-world networking experience."}
                              {project.project.title === "Home Security Automation" && "Wrote specialized Python code to automate and manage my home security system with custom integration solutions."}
                            </p>
                          </div>
                          {project.project.href && (
                            <div className="flex justify-center">
                              <Button asChild className="bg-frappe-blue hover:bg-frappe-sapphire text-frappe-base font-medium">
                                <a href={project.project.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <FaExternalLinkAlt className="w-4 h-4" />
                                  Visit Project
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </BentoGrid>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
