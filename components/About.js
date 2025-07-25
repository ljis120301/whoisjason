"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Who I Am",
    description:
      "I'm a technology enthusiast with a deep passion for Linux and open-source. From compiling Gentoo from source to running FreeBSD on a Raspberry Pi, I have a passion for the UNIX philosophy, I also hate having free time.",
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
    title: "What I Do",
    description:
      "I currently work for Sun Valley Broadband, a small ISP which allows me various opportunities to work with a wide range of technologies. I have experience with DNS, DHCP, BGP, STP, TCP/IP and various other networking technologies. I have been able to flex my skills by writing custom python script and docker containers to help us manage our customer database easily.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/SVB.png"
          width={400}
          height={400}
          className="rounded-lg object-contain "
          alt="Tech stack visualization"
        />
      </div>
    ),
  },
  {
    title: "Personal Life",
    description:
      "I am a 23 year old loser who loves spending a whole weekend seting up a new OS. I have a cat named Tom. I love to cook new and interesting meals. I morally allign myself with the FOSS foundation. I care deeply for open source and what that mentality represents in the tech community.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <Image
          src="/pi-server.jpeg"
          width={400}
          height={200}
          className="object-contain rounded-lg"
          alt="Coding process visualization"
        />
      </div>
    ),
  },
  {
    title: "My Goals",
    description:
      "My current goal in life is to become a Network Engineer, I would love to work for Sun Valley Broadband as long as I can. I am passionate about networking and love that I am allowed the opportunity to help out within my community to provide IT services. It brings me joy to know that I allow the world to remain connected to each over. I feel power and a sense of pride over providing Internet to the people.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Image
          src="/fiber.jpg"
          width={400}
          height={300}
          className="object-contain rounded-lg"
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
