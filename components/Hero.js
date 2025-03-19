'use client';


import { Boxes } from "./ui/background-boxes";

export default function Hero() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-frappe-crust flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-frappe-crust z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      
      <Boxes />
      <div className="text-center max-w-4xl px-4 relative z-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight lg:leading-tight mb-4">
          Welcome! hello
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-10 flex flex-col items-center">
          <span className="text-white bg-frappe-surface0 inline-block mb-2 px-4 py-2 rounded-lg">
            Providing IT Services
          </span>
          <span className="text-white bg-frappe-surface0 inline-block px-4 py-2 rounded-lg">
            For You!
          </span>
        </h2>
        <a 
          className="px-8 py-4 text-lg rounded-full bg-frappe-blue text-white hover:bg-frappe-sapphire transition-colors duration-300"
          href="#Featured"
        >
          Let&apos;s begin
        </a>
      </div>
    </div>
  );
}
