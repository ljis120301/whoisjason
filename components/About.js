"use client";
import React from "react";
import { NeofetchCard } from "@/components/blocks/neofetch-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Cpu, Network } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Bio Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
              <p className="text-muted-foreground">
                Developer, Admin, & Network Enthusiast
              </p>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m a web developer and network technician based in Sun Valley, passionate about building reliable, high-performance web applications.
                </p>
                <p>
                  My approach combines modern web technologies with old-school system administration discipline. Whether it&apos;s deploying Docker containers, configuring BGP routes, or crafting responsive React UIs, I love solving complex technical problems.
                </p>
                <p>
                  Currently, I work at Sun Valley Broadband, where I bridge the gap between software development and network infrastructure.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50 bg-card/50">
                <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                  <Cpu className="w-8 h-8 text-primary opacity-80" />
                  <span className="text-sm font-medium">Full Stack</span>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50">
                <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                  <Network className="w-8 h-8 text-primary opacity-80" />
                  <span className="text-sm font-medium">Networking</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-2">
            <NeofetchCard />
          </div>

        </div>
      </div>
    </section>
  );
}
