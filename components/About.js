"use client";
import React from "react";
import { TerminalWindow, TerminalBlock, TerminalList } from "@/components/ui/terminal-window";
import { NeofetchCard } from "@/components/blocks/neofetch-card";

export default function About() {
  return (
    <div id="About" className="relative px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <TerminalWindow title="whoami" className="min-h-[420px]" variant="glass">
          <TerminalBlock>
            <div className="space-y-3">
              <p>
                Linux-first developer focused on JavaScript/TypeScript, networking, and
                pragmatic automation. I care about UNIX philosophy, clean tooling, and
                boring, reliable systems.
              </p>
              <TerminalList
                items={[
                  "ISP + networking background (DNS, DHCP, BGP, STP, TCP/IP)",
                  "Builds with Next.js, Node.js, Docker, Linux",
                  "Automates ops with scripts and containers",
                  "FOSS-aligned; Catppuccin Frappe enjoyer",
                ]}
              />
              <div className="mt-4">
                <div className="text-frappe-subtext0">$ ip -br addr | grep -E "eth|wlan"</div>
                <pre className="mt-1 text-xs text-frappe-text whitespace-pre-wrap">
{`eth0    UP      10.0.0.2/24    fe80::1
wlan0   DOWN    --                --`}
                </pre>
              </div>
            </div>
          </TerminalBlock>
          </TerminalWindow>
        </div>

        <div className="lg:col-span-2">
          <NeofetchCard />
        </div>
      </div>
    </div>
  );
}
