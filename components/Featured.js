"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Building2 } from "lucide-react";

export default function Featured() {
  return (
    <section id="featured" className="relative py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto space-y-8">

          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
            <p className="text-muted-foreground max-w-lg">
              Professional journey and key roles that have shaped my technical expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Experience Card 1 */}
            <Card className="bg-card hover:bg-muted/30 transition-colors border-border shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary">Present</Badge>
                </div>
                <CardTitle className="mt-4">Sun Valley Broadband</CardTitle>
                <CardDescription className="text-base font-medium">Web Developer & Network Technician</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Developing internal tools and customer-facing web applications. Managing network infrastructure and assisting with ISP operations.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="text-xs">Next.js</Badge>
                  <Badge variant="outline" className="text-xs">Networking</Badge>
                  <Badge variant="outline" className="text-xs">React</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Experience Card 2 */}
            <Card className="bg-card hover:bg-muted/30 transition-colors border-border shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary">Freelance</Badge>
                </div>
                <CardTitle className="mt-4">Full Stack Developer</CardTitle>
                <CardDescription className="text-base font-medium">Self-Employed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Building custom web solutions for small businesses. Specializing in high-performance websites and automated business logic scripts.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="text-xs">Node.js</Badge>
                  <Badge variant="outline" className="text-xs">Python</Badge>
                  <Badge variant="outline" className="text-xs">Docker</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
