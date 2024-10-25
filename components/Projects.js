import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {CardDemo } from "@/components/blocks/cards-demo-1";
import {Card2} from "@/components/blocks/cards-demo-2";
import {LinuxCard} from "@/components/blocks/linux-card";

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
          <div className="flex items-center mb-10 ml-4">
            <Image src="/pi-server.jpeg" className="rounded-full" alt="" width={50} height={50} />
            <h2 className="text-3xl font-bold ml-4">Projects</h2>
          </div>
          <Separator className="my-6" />
          
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
                <CardHeader>
                  <CardTitle>Websites</CardTitle>
                  <CardDescription>NGINX</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>I have created an array of different template websites to match your business needs. I am able to quickly deploy new web servers and services as needed.</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="outline">Discover More</Button>
                  <span className="text-4xl">🌐</span>
                </CardFooter>
              </CardDemo>
              
              {/* Python Project */}
              <CardDemo>
                <CardHeader>
                  <CardTitle>Python</CardTitle>
                  <CardDescription>$1,200</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>I started my journey with Python 3 years ago when I attempted to re-do my employer's POS system. From there I grew to design websites and backend applications.</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="outline">Discover More</Button>
                  <span className="text-4xl">💡</span>
                </CardFooter>
              </CardDemo>
              
              {/* Homelab-Servers Project */}
              <Card>
                <CardHeader>
                  <CardTitle>Homelab-Servers</CardTitle>
                  <CardDescription>BASH/ZSH</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>From setting up Jellyfin servers on aging laptops to hosting a customized Minecraft Server complete with a personalized domain powered by Cloudflare, I am deeply passionate about embracing and integrating enterprise-grade technologies into my home environment...</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="outline">Discover More</Button>
                  <span className="text-4xl">💻</span>
                </CardFooter>
              </Card>
              
              {/* Microsoft Active Directory Project */}
              <Card>
                <CardHeader>
                  <CardTitle>Microsoft Active Directory</CardTitle>
                  <CardDescription>MS ADDS</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>I have deployed an entirely Virtualized Microsoft Active Directory Server. I have also deployed things such as Group Policy and a Domain Server running entirely virtualized on QEMU/KVM virtualization.</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="outline">Discover More</Button>
                  <span className="text-4xl">🖥️</span>
                </CardFooter>
              </Card>

              {/* Testing Card */}
              <CardDemo title="Google IT Fundamentals Certified" description="Successfully completed the Google IT Fundamentals course, gaining essential skills in IT support and operations." />  

              {/* Testing Card 2 */}
              <Card2 />

            </div>

            {/* Right Linux Card - increased width */}
            <div className="hidden 2xl:block w-[400px]">
              <LinuxCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
