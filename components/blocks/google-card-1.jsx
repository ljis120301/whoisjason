"use client";
import { animate, motion } from "framer-motion";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaGoogle, FaLaptopCode, FaServer, FaNetworkWired } from "react-icons/fa"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoogleCard, GoogleCardTitle, GoogleCardDescription } from "@/components/ui/google-card";
import { GoogleCardSkeletonContainer, GoogleContainer, GoogleSparkles } from "@/components/ui/google-card-skeleton";

export default function GoogleCard1({ className }) {
  return (
    <GoogleCard className={cn("flex flex-col overflow-hidden", className)}>
      <div className="flex-shrink-0 h-20">
        <GoogleCardSkeletonContainer className="w-full h-full">
          <Skeleton />
        </GoogleCardSkeletonContainer>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <GoogleCardTitle>Google IT Fundamentals Certified</GoogleCardTitle>
          <GoogleCardDescription>
            Successfully completed the Google IT Fundamentals course, gaining essential skills in IT support and operations.
          </GoogleCardDescription>
        </div>
        <Button asChild variant="link" className="w-fit">
          <Link 
            href="https://coursera.org/share/c380b4498d7755a80e315fa078c06e92"
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
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [".icon-1", { scale: [1, 1.2, 1], transform }, { duration: 1 }], // Google icon with larger scale
    [".icon-2", { scale, transform }, { duration: 0.8 }],
    [".icon-3", { scale, transform }, { duration: 0.8 }],
    [".icon-4", { scale, transform }, { duration: 0.8 }],
    [".icon-5", { scale, transform }, { duration: 0.8 }],
  ];

  useEffect(() => {
    animate(sequence, {
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="h-20 overflow-hidden relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-3">
        <GoogleContainer className="h-8 w-8 icon-2">
          <FaLaptopCode className="h-4 w-4 text-frappe-green dark:text-frappe-green" />
        </GoogleContainer>
        <GoogleContainer className="h-8 w-8 icon-3">
          <FaServer className="h-4 w-4 text-frappe-mauve dark:text-frappe-mauve" />
        </GoogleContainer>
        <GoogleContainer className="h-12 w-12 icon-1">
          <FaGoogle className="h-6 w-6 text-frappe-blue dark:text-frappe-sapphire" />
        </GoogleContainer>
        <GoogleContainer className="h-8 w-8 icon-4">
          <FaNetworkWired className="h-4 w-4 text-frappe-peach dark:text-frappe-peach" />
        </GoogleContainer>
        <GoogleContainer className="h-8 w-8 icon-5">
          <FaLaptopCode className="h-4 w-4 text-frappe-lavender dark:text-frappe-lavender" />
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
