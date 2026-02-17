import React from 'react';
import { Separator } from "@/components/ui/separator";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaGlobe, FaServer, FaNetworkWired, FaLinux, FaMicrosoft, FaPython, FaCode, FaDesktop, FaMusic, FaRoute, FaFilm, FaBlog, FaRobot, FaCog, FaStickyNote, FaDatabase, FaExternalLinkAlt, FaDocker, FaCamera } from 'react-icons/fa';

const PangolinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 238.34 252.73" className={className} fill="currentColor">
    <g transform="translate(-13.119542,-5.9258171)">
      <path d="m 213.66176,90.072122 c 4.95655,0 8.97383,4.018046 8.97383,8.973827 0,4.956581 -4.01728,8.974621 -8.97383,8.974621 -4.95657,0 -8.97462,-4.01804 -8.97462,-8.974621 0,-4.955781 4.01805,-8.973827 8.97462,-8.973827 z m 35.2316,37.450998 c -0.90048,29.80928 -23.66033,69.21262 -54.51292,79.34466 -36.04206,11.836 -63.40991,-5.92226 -72.08409,-26.74061 -6.75754,-16.21966 -1.65117,-35.62363 10.96266,-43.83669 10.6506,-6.93533 30.48543,-8.76736 47.15454,2.19144 -5.85627,-15.34246 -21.62491,-25.4256 -35.59101,-28.49424 -13.96613,-3.06867 -28.38324,0.43858 -38.74504,5.69946 13.29071,-14.68572 44.40801,-28.946049 78.24077,-10.95958 22.67676,12.05491 32.43775,28.93208 42.0489,51.72763 C 251.59637,117.87858 234.026,71.411066 203.39074,43.794029 172.15544,15.636686 129.95516,4.340214 97.668803,6.103155 108.32483,12.678273 120.84625,22.06586 132.41209,33.053363 81.298533,26.697169 39.174705,38.314245 13.119542,73.749217 27.67508,70.878527 46.868833,69.073666 65.974711,70.016861 28.737658,96.252107 7.1124298,140.38147 18.105298,186.43137 c 6.718497,-11.74129 16.767711,-25.84558 28.726275,-38.62863 -3.677175,34.36994 1.42836,80.83745 45.62293,110.85478 -2.25587,-9.42394 -4.08014,-20.88443 -4.91466,-33.0154 20.673197,16.1282 50.685067,29.42205 87.917917,20.24096 65.77679,-16.21975 83.34719,-79.78335 73.4356,-118.35996" />
    </g>
  </svg>
);

const projects = {
  web: [
    // portolio
    { title: "Portfolio", description: "My main portfolio website showcasing my work and experience.", icon: <FaGlobe />, href: "https://whoisjason.me" },
    // blog
    { title: "Blog", description: "Personal blog where I write about technology, projects, and thoughts.", icon: <FaBlog />, href: "https://bee.whoisjason.me" },
    // BGP 
    { title: "BGP Route Checker", description: "Custom-built tool to check BGP routes and network information for network diagnostics.", icon: <FaRoute />, href: "https://bgp.whoisjason.me" },

    // gram whoisjason
    { title: "Business Website Template", description: "Custom business website template showcasing modern web design capabilities.", icon: <FaCog />, href: "https://gram.whoisjason.me" },

    { title: "Internal CRM", description: "I have created internal Customer Resource Management systems to hold customer information. As well as allow least privlidge management of the system to be deligated by a system administrator. I was able to craft a Full-Stack NextJS web application using Prisma DB. As well as bundling into a self contained docker image for the company. I was able to manage the deployment and operation of the entirre project.", icon: <FaDatabase />, href: "https://crm.whoisjason.me" },
  ],
  sysadmin: [
    { title: "Self-Hosted Services", description: "Dockerized deployments of Next.js sites with automated CI/CD using BASH scripts.", icon: <FaServer /> },
    { title: "Virtual Active Directory", description: "A fully virtualized Microsoft AD server with Group Policy and a Domain Server on KVM/QEMU.", icon: <FaMicrosoft /> },
    { title: "Linux Expertise", description: "Daily driver Gentoo on a ThinkPad T420, extensive experience with Arch Linux, and comfortable in any UNIX shell.", icon: <FaLinux /> },
    { title: "PC Building & Hardware", description: "10+ years building custom PCs and servers, including water-cooled and production environment builds.", icon: <FaDesktop /> },
    { title: "Docker Swarm Load Balancing", description: "I have  plenty of expirence with Docker. I have built up Docker Swarm setup with custom private repos and secret management. High-Availability and Load Balancing from the start. ", icon: <FaDocker /> }
  ],
  it: [
    { title: "Network Infrastructure", description: "Hands-on experience with Cisco and MikroTik equipment, including configuration and remote site maintenance.", icon: <FaNetworkWired /> },
    { title: "Business Automation", description: "Developed custom Python scripts and Docker containers to manage customer databases and manipulate data. This has given me hands on expirence with Microsoft SQL, Postgress, and MySQL", icon: <FaPython /> },
    { title: "ISP Operations", description: "Run recursive DNS servers for customer connections and assist with network operations at a small ISP.", icon: <FaServer /> },
    { title: "IP Camera Setup / Installation", description: "I have worked with small buisnesses accross my city to assist them in deploying Security IP Cameras.", icon: <FaCamera /> },
    { title: "Reverse Proxy", description: "I have setup and manage Pangolin Self Hosted Reverse Proxy for hosting my sites and keeping control over my data", icon: <PangolinIcon /> },
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
