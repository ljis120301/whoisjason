'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaInstagram, FaPinterest, FaYoutube, FaDiscord, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      alert('Message sent successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-background" id="section_6">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-12">
            <Image src="/aerial-view-man-using-computer-laptop-wooden-table.jpg" className="rounded-full" alt="" width={100} height={100} />
            <h2 className="text-foreground text-3xl font-bold ml-4">Say Hi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
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
                <p className="text-muted-foreground">I'm available for freelance projects</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">About</h3>
                <p className="text-muted-foreground">I'm free most days of the week feel free to contact me</p>
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
            </div>

            <div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input type="text" name="name" id="name" className="w-full bg-input text-foreground rounded-md px-3 py-2 border border-input" placeholder="Name" required />
                </div>
                <div>
                  <input type="email" name="email" id="email" className="w-full bg-input text-foreground rounded-md px-3 py-2 border border-input" placeholder="Email address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="website" className="form-checkbox" />
                    <span className="text-muted-foreground">Websites</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="branding" className="form-checkbox" />
                    <span className="text-muted-foreground">Branding</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="ecommerce" className="form-checkbox" />
                    <span className="text-muted-foreground">Ecommerce</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="seo" className="form-checkbox" />
                    <span className="text-muted-foreground">SEO</span>
                  </label>
                </div>
                <div>
                  <textarea id="message" name="message" rows="4" className="w-full bg-input text-foreground rounded-md px-3 py-2 border border-input" placeholder="Tell me about the project"></textarea>
                </div>
                <div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
