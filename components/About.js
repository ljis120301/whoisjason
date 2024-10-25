"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Who I Am",
    description:
      "I'm a passionate full-stack developer with a keen interest in creating intuitive and efficient web applications. My journey in tech has been driven by curiosity and a desire to solve complex problems.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Image
          src="/pi.png"
          width={300}
          height={300}
          className="rounded-full"
          alt="Profile picture"
        />
      </div>
    ),
  },
  {
    title: "My Expertise",
    description:
      "With years of experience in both front-end and back-end development, I specialize in creating responsive, user-friendly interfaces and robust server-side applications. My tech stack includes React, Node.js, and various cloud technologies.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/tech-stack.png"
          width={400}
          height={300}
          className="object-contain"
          alt="Tech stack visualization"
        />
      </div>
    ),
  },
  {
    title: "My Approach",
    description:
      "I believe in clean, maintainable code and user-centered design. Every project I undertake is an opportunity to learn and innovate. I'm always exploring new technologies and methodologies to stay at the forefront of web development.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <Image
          src="/coding-process.png"
          width={400}
          height={300}
          className="object-contain"
          alt="Coding process visualization"
        />
      </div>
    ),
  },
  {
    title: "My Goals",
    description:
      "My aim is to contribute to projects that make a positive impact. Whether it's improving user experiences, optimizing performance, or solving real-world problems, I'm committed to creating software that matters.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Image
          src="/future-goals.png"
          width={400}
          height={300}
          className="object-contain"
          alt="Future goals visualization"
        />
      </div>
    ),
  },
];

export default function About() {
  return (
    <div className="" id="About">
      <StickyScroll content={content} />
    </div>
  );
}
