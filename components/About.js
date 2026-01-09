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
              <p>I am a web developer who uses Next JS. I currently work for Sun Valley Broadband. I have a deep passion for networking and web development. Always working on new stuff working with AI models to vibe code websites faster</p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 pt-6">
          <NeofetchCard />
        </div>
      </div>
    </div>
  );
}
