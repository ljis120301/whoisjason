"use client";
import { animate, motion } from "framer-motion";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaGoogle, FaBrain, FaRobot, FaMicrochip } from "react-icons/fa"; 
import { SiOpenai } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoogleCard, GoogleCardTitle, GoogleCardDescription } from "@/components/ui/google-card";
import { GoogleCardSkeletonContainer, GoogleContainer, GoogleSparkles } from "@/components/ui/google-card-skeleton";

export default function GoogleCard2({ className }) {
  return (
    <GoogleCard className={cn("flex flex-col overflow-hidden", className)}>
      <div className="flex-shrink-0 h-20">
        <GoogleCardSkeletonContainer className="w-full h-full">
          <Skeleton />
        </GoogleCardSkeletonContainer>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <GoogleCardTitle>Google AI Essentials Certified</GoogleCardTitle>
          <GoogleCardDescription>
            Completed Google&apos;s AI Essentials course, mastering generative AI tools, prompt engineering, and responsible AI practices.
          </GoogleCardDescription>
        </div>
        <Button asChild variant="link" className="w-fit">
          <Link 
            href="https://www.coursera.org/account/accomplishments/verify/3E55SK5RRE9U"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Certificate
          </Link>
        </Button>
      </div>
    </GoogleCard>
  );
}

const Skeleton = () => {
  useEffect(() => {
    const scale = [1, 1.1, 1];
    const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
    
    const sequence = [
      [".icon-1", { scale, transform }, { duration: 0.8 }],
      [".icon-2", { scale, transform }, { duration: 0.8 }],
      [".icon-3", { scale, transform }, { duration: 0.8 }],
      [".icon-4", { scale, transform }, { duration: 0.8 }],
      [".icon-5", { scale, transform }, { duration: 0.8 }],
    ];
    
    animate(sequence, {
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="h-20 overflow-hidden relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-3">
        <GoogleContainer className="h-8 w-8 icon-2">
          <FaBrain className="h-4 w-4 text-frappe-red dark:text-frappe-red" />
        </GoogleContainer>
        <GoogleContainer className="h-8 w-8 icon-3">
          <FaRobot className="h-4 w-4 text-frappe-yellow dark:text-frappe-yellow" />
        </GoogleContainer>
        <GoogleContainer className="h-12 w-12 icon-1">
          <FaGoogle className="h-6 w-6 text-frappe-blue dark:text-frappe-sapphire" />
        </GoogleContainer>
        <GoogleContainer className="h-8 w-8 icon-4">
          <FaMicrochip className="h-4 w-4 text-frappe-teal dark:text-frappe-teal" />
        </GoogleContainer>
        <GoogleContainer className="h-8 w-8 icon-5">
          <SiOpenai className="h-4 w-4 text-frappe-pink dark:text-frappe-pink" />
        </GoogleContainer>
      </div>
      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-frappe-blue dark:via-frappe-sapphire to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <GoogleSparkles />
        </div>
      </div>
    </div>
  );
};