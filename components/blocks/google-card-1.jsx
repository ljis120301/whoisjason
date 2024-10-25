"use client";
import { animate, motion } from "framer-motion";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaGoogle, FaLaptopCode, FaServer, FaNetworkWired } from "react-icons/fa"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GoogleCard1({ className }) {
  return (
    <Card className={cn("flex flex-col overflow-hidden h-full", className)}>
      <div className="flex-shrink-0 h-24">
        <CardSkeletonContainer className="w-full h-full">
          <Skeleton />
        </CardSkeletonContainer>
      </div>
      <div className="p-6 flex-grow flex flex-col gap-6">
        <div className="space-y-2.5">
          <CardTitle>Google IT Fundamentals Certified</CardTitle>
          <CardDescription>
            Successfully completed the Google IT Fundamentals course, gaining essential skills in IT support and operations.
          </CardDescription>
        </div>
        <Button asChild variant="outline" className="w-fit mt-auto">
          <Link 
            href="https://coursera.org/share/c380b4498d7755a80e315fa078c06e92"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Certificate
          </Link>
        </Button>
      </div>
    </Card>
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
    <div className="h-full overflow-hidden relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-3">
        <Container className="h-8 w-8 icon-2">
          <FaLaptopCode className="h-4 w-4 text-frappe-green dark:text-frappe-green" />
        </Container>
        <Container className="h-8 w-8 icon-3">
          <FaServer className="h-4 w-4 text-frappe-mauve dark:text-frappe-mauve" />
        </Container>
        <Container className="h-12 w-12 icon-1">
          <FaGoogle className="h-6 w-6 text-frappe-blue dark:text-frappe-sapphire" />
        </Container>
        <Container className="h-8 w-8 icon-4">
          <FaNetworkWired className="h-4 w-4 text-frappe-peach dark:text-frappe-peach" />
        </Container>
        <Container className="h-8 w-8 icon-5">
          <FaLaptopCode className="h-4 w-4 text-frappe-lavender dark:text-frappe-lavender" />
        </Container>
      </div>
      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-frappe-blue dark:via-frappe-sapphire to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    (<div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"></motion.span>
      ))}
    </div>)
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl border border-frappe-surface1 dark:border-frappe-surface0 bg-latte-base dark:bg-frappe-base shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }) => {
  return (
    <h3 className={cn("text-sm font-semibold text-gray-800 dark:text-white", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className }) => {
  return (
    <p className={cn("text-xs font-normal text-neutral-600 dark:text-neutral-400", className)}>
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true
}) => {
  return (
    (<div
      className={cn("rounded-xl z-40", className, showGradient &&
        "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]")}>
      {children}
    </div>)
  );
};

const Container = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}>
      {children}
    </div>)
  );
};
