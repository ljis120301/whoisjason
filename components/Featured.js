"use client";

import React from "react";
import GoogleCard1 from "@/components/blocks/google-card-1";
import GoogleCard2 from "@/components/blocks/google-ai-card";
import { TerminalWindow, TerminalBlock } from "@/components/ui/terminal-window";
import { LiquidGrid } from "@/components/ui/glass";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Badge } from "@/components/ui/badge";

export default function Featured() {
  return (
    <section id="featured" className="relative py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto space-y-8">
          <TerminalWindow title="certs & tooling" variant="solid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GoogleCard1 />
              <GoogleCard2 />
            </div>
            <div className="mt-6">
              <TerminalBlock prompt="jason" path="~/tooling">
                <div>
                  <div>node --version && npm --version</div>
                  <div className="text-frappe-subtext0">v20.x • 10.x</div>
                </div>
                <div className="mt-2">
                  <div>lsb_release -a</div>
                  <div className="text-frappe-subtext0">Gentoo / Debian / Fedora friendly</div>
                </div>
              </TerminalBlock>
            </div>
          </TerminalWindow>

          <TerminalWindow title="focus areas" variant="solid">
            <CardSpotlight className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Next.js + React",
                  "Node.js APIs",
                  "Networking Automation",
                  "Linux Ops",
                ].map((t) => (
                  <Badge key={t} variant="secondary" className="justify-center py-2 text-[11px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardSpotlight>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
