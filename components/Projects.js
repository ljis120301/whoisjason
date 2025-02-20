import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardDemo } from "@/components/blocks/cards-demo-1";
import { Card2 } from "@/components/blocks/cards-demo-2";
import { LinuxCard } from "@/components/blocks/linux-card";
// Import React Icons
import { FaGlobe, FaPython, FaServer, FaMicrosoft, FaGoogle } from 'react-icons/fa';
import { SiTestinglibrary } from 'react-icons/si';

export default function Projects() {
  return (
    <section className="relative py-16" id="section_3">
      {/* Grid background */}
      <div className="absolute inset-0 dark:bg-frappe-mantle bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        {/* Radial gradient overlay */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-frappe-base bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Increased max-width and added wider padding */}
        <div className="max-w-[1920px] mx-auto">
          {/* Updated title section with new gradient */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-4 mb-4">
              <Image 
                src="/pi-server.jpeg" 
                className="rounded-full w-16 h-16 object-cover border-2 border-frappe-blue" 
                alt="Projects Icon" 
                width={64} 
                height={64} 
              />
              {/* Option 1: Blue to Sapphire gradient */}
              {/* <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-frappe-blue via-frappe-sapphire to-frappe-blue pb-2">
              Projects
              </h2> */}

              {/* Option 2: Blue to Sky gradient */}
{/*               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-frappe-blue via-frappe-sky to-frappe-sapphire pb-2">
                Projects
              </h2>
 */}
              {/* Option 3: Solid color with subtle shadow */}
{/*                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-frappe-blue drop-shadow-sm pb-2">
                Projects
              </h2>  */}

              {/* Option 4: Regal Blue gradient */}
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-frappe-sapphire via-frappe-blue to-frappe-sapphire pb-2">
                Projects
              </h2>
            </div>
            <p className="text-lg text-frappe-subtext0 max-w-2xl mt-4">
              A showcase of my technical projects and achievements in web development, system administration, and more.
            </p>
          </div>
          
          <Separator className="my-8" />
          
          {/* Adjusted flex container with wider gaps */}
          <div className="flex gap-8 lg:gap-12">
            {/* Left Linux Card - increased width */}
            <div className="hidden 2xl:block w-[400px] space-y-10 ">
              <LinuxCard />
              <LinuxCard />
            </div>

            {/* Main grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Website Project */}
              <CardDemo>
                <CardDemo.Header>
                  <CardDemo.Title>Websites</CardDemo.Title>
                  <CardDemo.Description>NGINX</CardDemo.Description>
                </CardDemo.Header>
                <CardDemo.Content>
                  <p>I have created an array of different template websites to match your business needs. I am able to quickly deploy new web servers and services as needed.</p>
                </CardDemo.Content>
                <CardDemo.Footer className="flex justify-between items-center">
                  <Button variant="link">Discover More</Button>
                  <FaGlobe className="text-4xl text-frappe-blue" />
                </CardDemo.Footer>
              </CardDemo>
              
              {/* Python Project */}
              <CardDemo>
                <CardDemo.Header>
                  <CardDemo.Title>Python</CardDemo.Title>
                  <CardDemo.Description>4+ Years</CardDemo.Description>
                </CardDemo.Header>
                <CardDemo.Content>
                  <p>I started my journey with Python 3 years ago when I attempted to re-do my employer's POS system. From there I grew to design websites and backend applications.</p>
                </CardDemo.Content>
                <CardDemo.Footer className="flex justify-between items-center">
                  <Button variant="link">Discover More</Button>
                  <FaPython className="text-4xl text-frappe-blue" />
                </CardDemo.Footer>
              </CardDemo>
              
              {/* Homelab-Servers Project */}
              <CardDemo>
                <CardDemo.Header>
                  <CardDemo.Title>Homelab-Servers</CardDemo.Title>
                  <CardDemo.Description>BASH/ZSH</CardDemo.Description>
                </CardDemo.Header>
                <CardDemo.Content>
                  <p>From setting up Jellyfin servers on aging laptops to hosting a customized Minecraft Server complete with a personalized domain powered by Cloudflare, I am deeply passionate about embracing and integrating enterprise-grade technologies into my home environment...</p>
                </CardDemo.Content>
                <CardDemo.Footer className="flex justify-between items-center">
                  <Button variant="link">Discover More</Button>
                  <FaServer className="text-4xl text-frappe-blue" />
                </CardDemo.Footer>
              </CardDemo>
              
              {/* Microsoft Active Directory Project */}
              <CardDemo>
                <CardDemo.Header>
                  <CardDemo.Title>Microsoft Active Directory</CardDemo.Title>
                  <CardDemo.Description>MS ADDS</CardDemo.Description>
                </CardDemo.Header>
                <CardDemo.Content>
                  <p>I have deployed an entirely Virtualized Microsoft Active Directory Server. I have also deployed things such as Group Policy and a Domain Server running entirely virtualized on QEMU/KVM virtualization.</p>
                </CardDemo.Content>
                <CardDemo.Footer className="flex justify-between items-center">
                  <Button variant="link">Discover More</Button>
                  <FaMicrosoft className="text-4xl text-frappe-blue" />
                </CardDemo.Footer>
              </CardDemo>

              {/* Google IT Certification Card */}
              <CardDemo>
                <CardDemo.Header>
                  <CardDemo.Title>Google IT Fundamentals Certified</CardDemo.Title>
                  <CardDemo.Description>Certification</CardDemo.Description>
                </CardDemo.Header>
                <CardDemo.Content>
                  <p>Successfully completed the Google IT Fundamentals course, gaining essential skills in IT support and operations.</p>
                </CardDemo.Content>
                <CardDemo.Footer className="flex justify-between items-center">
                  <Button variant="link">Discover More</Button>
                  <FaGoogle className="text-4xl text-frappe-blue" />
                </CardDemo.Footer>
              </CardDemo>

              {/* Testing Card 2 */}
              <CardDemo>
                <CardDemo.Header>
                  <CardDemo.Title>PC Building</CardDemo.Title>
                  <CardDemo.Description>10+ Years</CardDemo.Description>
                </CardDemo.Header>
                <CardDemo.Content>
                  <p>I have been building PCs for over 10 years. It was my first deep dive into discovering technology and the fundamentals that make up a computer. I have since gone on to build PCs for commision as well as for personal use. I have experience with water cooling and custom builds. I have also assembled quite a few servers that have been deployed in a production environment.</p>
                </CardDemo.Content>
                <CardDemo.Footer className="flex justify-between items-center">
                  <Button variant="link">Discover More</Button>
                  <SiTestinglibrary className="text-4xl text-frappe-blue" />
                </CardDemo.Footer>
              </CardDemo>
            </div>

            {/* Right Linux Card - increased width */}
            <div className="flex gap-8 lg:gap-12">
            {/* Left Linux Card - increased width */}
            <div className="hidden 2xl:block w-[400px] space-y-10 ">
              <LinuxCard />
              <LinuxCard />
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
