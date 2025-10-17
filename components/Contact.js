'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaDiscord, FaEnvelope } from 'react-icons/fa';
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    const message = {
      content: "New Contact Form Submission",
      embeds: [{
        title: "New Contact Request",
        color: 0x58B9FF, // Light blue color
        fields: [
          { name: "Name", value: values.name || "Not provided", inline: true },
          { name: "Email", value: values.email || "Not provided", inline: true },
          { name: "Message", value: values.message || "No message provided" }
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
      
      form.reset();
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
    <section className="relative py-16 bg-[#303446] text-[#c6d0f5]" id="section_6">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Avatar className="h-16 w-16 border-2 border-[#8caaee]">
                <AvatarImage src="/aerial-view-man-using-computer-laptop-wooden-table.jpg" alt="Jason at his desk" />
                <AvatarFallback className="bg-[#8caaee] text-[#303446] font-semibold">JS</AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-3xl font-bold text-[#c6d0f5] mb-3">Get In Touch</h1>
            <p className="text-[#a5adce] mb-8">
              Ready to work together? Send me a message and I&apos;ll get back to you soon.
            </p>
            
            {/* Quick Contact Links */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a 
                href="mailto:jason@whoisjason.me" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#8caaee] text-[#303446] rounded-md font-medium hover:bg-[#7ba0e6] transition-colors"
              >
                <FaEnvelope className="h-4 w-4" />
                jason at whoisjason.me
              </a>
              <a 
                href="https://discord.com/users/238064010044506123" 
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#414559] text-[#c6d0f5] rounded-md font-medium hover:bg-[#51576d] transition-colors"
              >
                <FaDiscord className="h-4 w-4" />
                Discord
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-[#292c3c] border-[#414559]">
            <CardHeader>
              <CardTitle className="text-[#c6d0f5] text-xl">Send a Message</CardTitle>
              <CardDescription className="text-[#a5adce]">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#c6d0f5]">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="bg-[#414559] border-[#414559] text-[#c6d0f5] placeholder:text-[#a5adce] focus:border-[#8caaee] focus:ring-[#8caaee]/20"
                            />
                          </FormControl>
                          <FormMessage className="text-[#e78284]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#c6d0f5]">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              className="bg-[#414559] border-[#414559] text-[#c6d0f5] placeholder:text-[#a5adce] focus:border-[#8caaee] focus:ring-[#8caaee]/20"
                            />
                          </FormControl>
                          <FormMessage className="text-[#e78284]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#c6d0f5]">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            {...field}
                            className="resize-none bg-[#414559] border-[#414559] text-[#c6d0f5] placeholder:text-[#a5adce] focus:border-[#8caaee] focus:ring-[#8caaee]/20 min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#e78284]" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-[#8caaee] hover:bg-[#7ba0e6] text-[#303446] font-medium" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner className="mr-2 h-4 w-4" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
