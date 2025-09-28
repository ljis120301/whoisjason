'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FaTwitter, FaInstagram, FaPinterest, FaYoutube, FaDiscord, FaEnvelope } from 'react-icons/fa';
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { GlassPanel } from "@/components/ui/glass";
import { LiquidAurora } from "@/components/ui/liquid-aurora";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const [servicesState, setServicesState] = useState({
    website: false,
    branding: false,
    ecommerce: false,
    seo: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const services = ['website', 'branding', 'ecommerce', 'seo']
      .filter(service => formData.get(service))
      .join(', ');

    const message = {
      content: "New Contact Form Submission",
      embeds: [{
        title: "New Contact Request",
        color: 0x58B9FF, // Light blue color
        fields: [
          { name: "Name", value: formData.get('name') || "Not provided", inline: true },
          { name: "Email", value: formData.get('email') || "Not provided", inline: true },
          { name: "Services", value: services || "None selected", inline: false },
          { name: "Message", value: formData.get('message') || "No message provided" }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
        duration: 5000,
      });
      
      e.target.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 bg-background" id="section_6">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-12">
            <Image src="/aerial-view-man-using-computer-laptop-wooden-table.jpg" className="rounded-full" alt="Jason at his desk with a laptop" width={100} height={100} />
            <h2 className="text-foreground text-3xl font-bold ml-4">Say Hi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassPanel className="space-y-6 p-6 bg-card text-card-foreground border border-input">
              <div>
                <h3 className="text-xl font-semibold mb-3">Projects</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Websites</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Branding</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Ecommerce</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">SEO</a></li>
                </ul>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Stay connected</h3>
                <ul className="flex space-x-4">
                  <li><a href="https://twitter.com/ljis120301" className="text-muted-foreground hover:text-foreground transition-colors"><FaTwitter size={24} /></a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><FaInstagram size={24} /></a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><FaPinterest size={24} /></a></li>
                  <li><a href="https://www.youtube.com/ljis120301" className="text-muted-foreground hover:text-foreground transition-colors"><FaYoutube size={24} /></a></li>
                </ul>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Start a project</h3>
                <p className="text-muted-foreground">I&apos;m available for freelance projects</p>
              </div>
            </GlassPanel>

            <GlassPanel className="space-y-6 p-6 bg-card text-card-foreground border border-input">
              <div>
                <h3 className="text-xl font-semibold mb-3">About</h3>
                <p className="text-muted-foreground">I&apos;m free most days of the week feel free to contact me</p>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Email</h3>
                <p>
                  <a href="mailto:ljis120301@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <FaEnvelope size={24} className="mr-2" />
                    ljis120301 at gmail.com
                  </a>
                </p>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Discord</h3>
                <p>
                  <a href="https://discord.com/users/238064010044506123" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <FaDiscord size={24} className="mr-2" />
                    Add me on Discord!
                  </a>
                </p>
              </div>
            </GlassPanel>

            <GlassPanel className="p-6 bg-card text-card-foreground border border-input">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" name="name" id="name" placeholder="Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input type="email" name="email" id="email" placeholder="Email address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="website" checked={servicesState.website} onCheckedChange={(v) => setServicesState(s => ({ ...s, website: !!v }))} />
                    <Label htmlFor="website" className="text-muted-foreground">Websites</Label>
                    {servicesState.website && <input type="hidden" name="website" value="on" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="branding" checked={servicesState.branding} onCheckedChange={(v) => setServicesState(s => ({ ...s, branding: !!v }))} />
                    <Label htmlFor="branding" className="text-muted-foreground">Branding</Label>
                    {servicesState.branding && <input type="hidden" name="branding" value="on" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ecommerce" checked={servicesState.ecommerce} onCheckedChange={(v) => setServicesState(s => ({ ...s, ecommerce: !!v }))} />
                    <Label htmlFor="ecommerce" className="text-muted-foreground">Ecommerce</Label>
                    {servicesState.ecommerce && <input type="hidden" name="ecommerce" value="on" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="seo" checked={servicesState.seo} onCheckedChange={(v) => setServicesState(s => ({ ...s, seo: !!v }))} />
                    <Label htmlFor="seo" className="text-muted-foreground">SEO</Label>
                    {servicesState.seo && <input type="hidden" name="seo" value="on" />}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Project details</Label>
                  <Textarea id="message" name="message" rows="4" placeholder="Tell me about the project" />
                </div>
                <div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner className="mr-2 h-4 w-4" />
                        Sending...
                      </>
                    ) : (
                      'Send'
                    )}
                  </Button>
                </div>
              </form>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
