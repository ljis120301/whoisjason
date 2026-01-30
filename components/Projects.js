import React from 'react';
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Globe,
  Server,
  Network,
  Cpu,
  Code2,
  Database,
  Terminal,
  ShieldCheck,
  Cloud,
  Layers,
  ExternalLink,
  Laptop
} from 'lucide-react';

const projects = {
  web: [
    {
      title: "Portfolio",
      description: "My main portfolio website showcasing my work and experience.",
      icon: <Globe className="w-full h-full" />,
      href: "https://whoisjason.me",
      tags: ["Next.js", "React", "Tailwind"],
      longDesc: "A modern, responsive portfolio website built with Next.js, featuring real-time data integration, dark/light theme support, and optimized performance."
    },
    {
      title: "Blog",
      description: "Personal blog where I write about technology, projects, and thoughts.",
      icon: <Code2 className="w-full h-full" />,
      href: "https://bee.whoisjason.me",
      tags: ["Markdown", "SEO", "Analytics"],
      longDesc: "A personal blog platform with markdown support, SEO optimization, and integrated analytics for sharing thoughts on technology and development."
    },
    {
      title: "Notes App",
      description: "Google Docs-like notes app with cloud sync and self-hosted docker option.",
      icon: <Layers className="w-full h-full" />,
      href: "https://notes.whoisjason.me",
      tags: ["React Query", "Docker", "2FA"],
      longDesc: "A full-featured note-taking application with real-time collaboration, cloud synchronization, 2FA security, and offline support using React Query for efficient data management."
    },
    {
      title: "MP3 Extractor",
      description: "AI-powered tool using local models to separate audio tracks.",
      icon: <Cpu className="w-full h-full" />,
      href: "https://mp3.whoisjason.me",
      tags: ["AI/ML", "Audio Processing"],
      longDesc: "An AI-powered audio separation tool that uses local machine learning models to isolate individual tracks from mixed audio, perfect for music producers and audio engineers."
    },
    {
      title: "Internal CRM",
      description: "Customer Resource Management system with RBAC and Docker deployment.",
      icon: <Database className="w-full h-full" />,
      href: "https://crm.whoisjason.me",
      tags: ["Prisma", "PostgreSQL", "Docker"],
      longDesc: "A comprehensive Customer Resource Management system built with Next.js and Prisma, featuring role-based access control, customer data management, and automated workflows."
    },
  ],
  sysadmin: [
    {
      title: "Self-Hosted Services",
      description: "Dockerized deployments of Next.js sites with automated CI/CD.",
      icon: <Server className="w-full h-full" />,
      tags: ["Docker", "CI/CD", "Bash"],
      longDesc: "Dockerized deployments of Next.js sites with automated CI/CD using BASH scripts for efficient development workflows."
    },
    {
      title: "Virtual AD",
      description: "Fully virtualized Microsoft AD server on KVM/QEMU.",
      icon: <ShieldCheck className="w-full h-full" />,
      tags: ["Active Directory", "KVM", "Security"],
      longDesc: "A fully virtualized Microsoft AD server with Group Policy and a Domain Server on KVM/QEMU for enterprise-level directory services."
    },
    {
      title: "Linux Expertise",
      description: "Daily driver Gentoo/Arch, comfortable in any UNIX shell.",
      icon: <Terminal className="w-full h-full" />,
      tags: ["Gentoo", "Arch", "Shell Scripting"],
      longDesc: "Daily driver Gentoo on a ThinkPad T420, extensive experience with Arch Linux, and comfortable in any UNIX shell environment."
    },
  ],
  it: [
    {
      title: "Network Infra",
      description: "Experience with Cisco/MikroTik configuration and maintenance.",
      icon: <Network className="w-full h-full" />,
      tags: ["Cisco", "MikroTik", "Routing"],
      longDesc: "Hands-on experience with Cisco and MikroTik equipment, including configuration and remote site maintenance for enterprise networks."
    },
    {
      title: "ISP Operations",
      description: "Recursive DNS management and network ops for small ISP.",
      icon: <Cloud className="w-full h-full" />,
      tags: ["DNS", "ISP", "Network Ops"],
      longDesc: "Run recursive DNS servers for customer connections and assist with network operations at a small ISP with real-world networking experience."
    },
    {
      title: "Automation",
      description: "Custom Python scripts for business data manipulation.",
      icon: <Laptop className="w-full h-full" />,
      tags: ["Python", "Automation", "Data"],
      longDesc: "Developed custom Python scripts and Docker containers to manage customer databases and manipulate data for business efficiency."
    },
  ]
};

const SectionHeader = ({ title, icon: Icon, description }) => (
  <div className="flex flex-col gap-2 mb-8">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
    <p className="text-muted-foreground max-w-2xl">{description}</p>
  </div>
);

export default function Projects() {
  return (
    <section className="relative py-24" id="projects">
      <div className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Selected Work</h2>
          <p className="text-lg text-muted-foreground">
            A collection of web applications, system administration projects, and network infrastructure work.
          </p>
        </div>

        {/* Web Development */}
        <div>
          <SectionHeader
            title="Web Development"
            icon={Globe}
            description="Modern web applications focused on performance, user experience, and scalable architecture."
          />
          <BentoGrid>
            {projects.web.map((project, idx) => (
              <Dialog key={idx}>
                <DialogTrigger asChild>
                  <BentoCard
                    name={project.title}
                    description={project.description}
                    Icon={project.icon.type}
                    className={idx === 0 || idx === 3 ? "col-span-3 lg:col-span-2" : "col-span-3 lg:col-span-1"}
                    cta="View Details"
                    href={project.href || "#"}
                    background={
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                    }
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      {project.title}
                    </DialogTitle>
                    <DialogDescription>
                      {project.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.longDesc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="font-mono text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {project.href && (
                    <div className="flex justify-end">
                      <Button asChild size="sm" className="gap-2">
                        <a href={project.href} target="_blank" rel="noopener noreferrer">
                          Visit Project <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </BentoGrid>
        </div>

        {/* SysAdmin & Linux */}
        <div>
          <SectionHeader
            title="Systems & Infrastructure"
            icon={Server}
            description="Robust infrastructure management, containerization, and enterprise-grade system administration."
          />
          <BentoGrid>
            {projects.sysadmin.map((project, idx) => (
               <Dialog key={idx}>
               <DialogTrigger asChild>
                 <BentoCard
                   name={project.title}
                   description={project.description}
                   Icon={project.icon.type}
                   className="col-span-3 lg:col-span-1"
                   cta="View Details"
                   href="#"
                   background={
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-50" />
                   }
                 />
               </DialogTrigger>
               <DialogContent>
                 <DialogHeader>
                   <DialogTitle>{project.title}</DialogTitle>
                   <DialogDescription>{project.description}</DialogDescription>
                 </DialogHeader>
                 <div className="space-y-4 py-4">
                   <p className="text-sm text-muted-foreground">{project.longDesc}</p>
                   <div className="flex flex-wrap gap-2">
                     {project.tags.map(tag => (
                       <Badge key={tag} variant="secondary" className="font-mono text-xs">{tag}</Badge>
                     ))}
                   </div>
                 </div>
               </DialogContent>
             </Dialog>
            ))}
          </BentoGrid>
        </div>

        {/* IT & Networking */}
        <div>
          <SectionHeader
            title="Networking & Operations"
            icon={Network}
            description="Network engineering, ISP operations, and automated infrastructure solutions."
          />
          <BentoGrid>
            {projects.it.map((project, idx) => (
              <Dialog key={idx}>
              <DialogTrigger asChild>
                <BentoCard
                  name={project.title}
                  description={project.description}
                  Icon={project.icon.type}
                  className="col-span-3 lg:col-span-1"
                  cta="View Details"
                  href="#"
                  background={
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-50" />
                  }
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                  <DialogDescription>{project.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-muted-foreground">{project.longDesc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="font-mono text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            ))}
          </BentoGrid>
        </div>

      </div>
    </section>
  );
}
