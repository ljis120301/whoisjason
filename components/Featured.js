"use client";

import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import GoogleCard1 from "@/components/blocks/google-card-1";
import GoogleCard2 from "@/components/blocks/google-ai-card";
import { TerminalWindow, TerminalBlock } from "@/components/ui/terminal-window";
import { LiquidGrid } from "@/components/ui/glass";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function Featured() {
  return (
    <section id="featured" className="relative py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 p-6">
              <GoogleCard1 />
              <GoogleCard2 />
            </div>
            <div className="mt-6">
              <CardContent>
                <div>
                  <div>node --version && npm --version</div>
                  <div className="text-frappe-subtext0">v20.x • 10.x</div>
                </div>
                <div className="mt-2">
                    <div>lsb_release -a</div>
                    <div className="text-frappe-subtext0">Gentoo / Debian / Fedora friendly</div>
                </div>
              </CardContent>
            </div>
          
        </div>
      </div>
    </section>
  );
}
