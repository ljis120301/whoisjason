"use client";
import React from "react";
import { TerminalWindow, TerminalBlock, TerminalList } from "@/components/ui/terminal-window";
import { NeofetchCard } from "@/components/blocks/neofetch-card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div id="About" className="relative px-4 sm:px-6 lg:px-8 py-12 pb-6">
      <div className="relative max-w-6xl mx-auto gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p>I am a web developer who uses Next JS. I currently work for Sun Valley Broadband. I have a deep passion for networking and web development.</p>
            </CardContent>
          </Card>
          
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
   
        </div>

        <div className="lg:col-span-2 pt-6">
          <NeofetchCard />
        </div>
      </div>
    </div>
  );
}
