"use client";
import React from "react";
import { TerminalWindow, TerminalBlock, TerminalList } from "@/components/ui/terminal-window";
import { NeofetchCard } from "@/components/blocks/neofetch-card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function About() {
  return (
    <div id="About" className="relative px-4 sm:px-6 lg:px-8 py-12 pb-6">
      <div className="relative max-w-6xl mx-auto gap-8">
        <div>
          <TerminalWindow title="whoami" className="min-h-[420px] " variant="glass">
          <TerminalBlock>
            <div className="space-y-3">
              <p>
                I am a Linux nerd, I use Gentoo on my Thinkpad. I also have a deep passion for networking and currently work for 
                <br/>
                <span className="font-bold">Sun Valley Broadband</span>
                , an internet service provider. 
              </p>
              <div className="mt-4">
                <div className="text-frappe-subtext0">$ </div>
                <pre className="mt-1 text-xs text-frappe-text whitespace-pre-wrap">
{`output`}
                </pre>
              </div>
            </div>
          </TerminalBlock>
          
          {/* System Information Table */}
          <div className="mt-6">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-frappe-surface0/60">
                  <TableHead className="text-frappe-text font-medium">Property</TableHead>
                  <TableHead className="text-frappe-text font-medium">Value</TableHead>
                  <TableHead className="text-frappe-text font-medium">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-frappe-surface0/40 hover:bg-frappe-surface0/20">
                  <TableCell className="text-frappe-text">OS</TableCell>
                  <TableCell className="text-frappe-blue">Gentoo Linux</TableCell>
                  <TableCell className="text-frappe-green">Active</TableCell>
                </TableRow>
                <TableRow className="border-frappe-surface0/40 hover:bg-frappe-surface0/20">
                  <TableCell className="text-frappe-text">Shell</TableCell>
                  <TableCell className="text-frappe-blue">Zsh</TableCell>
                  <TableCell className="text-frappe-green">Active</TableCell>
                </TableRow>
                <TableRow className="border-frappe-surface0/40 hover:bg-frappe-surface0/20">
                  <TableCell className="text-frappe-text">Editor</TableCell>
                  <TableCell className="text-frappe-blue">Neovim</TableCell>
                  <TableCell className="text-frappe-green">Active</TableCell>
                </TableRow>
                <TableRow className="border-frappe-surface0/40 hover:bg-frappe-surface0/20">
                  <TableCell className="text-frappe-text">WM</TableCell>
                  <TableCell className="text-frappe-blue">i3wm</TableCell>
                  <TableCell className="text-frappe-green">Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          </TerminalWindow>
        </div>

        <div className="lg:col-span-2 pt-6">
          <NeofetchCard />
        </div>
      </div>
    </div>
  );
}
