'use client';

import { CardSpotlight } from "@/components/ui/card-spotlight";
import { cn } from "@/lib/utils";

function CardDemo({ title, description }) {
  return (
    <div className="w-full h-full">
      <div
        className={cn(
          "group cursor-pointer overflow-hidden relative card h-full rounded-md shadow-xl flex flex-col justify-between p-6",
          "bg-frappe-mantle",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-frappe-overlay0 hover:after:opacity-50",
          "transition-all duration-500"
        )}>
        <div className="text relative z-10">
          <h2 className="font-bold text-xl text-frappe-text mb-3">
            {title}
          </h2>
          <div className="font-normal text-sm text-frappe-subtext1">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Featured() {
  return (
    <section className="featured py-24 bg-frappe-base">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-frappe-text mb-12 text-center">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-full">
            <CardSpotlight 
              className="h-full w-full"
              radius={400}
              color="rgba(140, 170, 238, 0.15)"
            >
              <CardSpotlightDemo />
            </CardSpotlight>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-frappe-text">
            <CardDemo title="Live Servers" description="24/7 Servers" />
            <CardDemo title="Certifications" description="CompTIA N10-008 Network +" />
            <CardDemo title="Microsoft Certified" description="I hold Certifications for Microsoft Active Directory as well as Microsoft Excel and Word" />
            <CardDemo title="Specialties" description={
              <ul className="list-disc list-inside">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Python</li>
                <li>Linux</li>
              </ul>
            } />
          </div>
        </div>
      </div>
    </section>
  );
}

function CardSpotlightDemo() {
  console.log("Rendering CardSpotlightDemo");
  return (
    <div className="h-96 w-96">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Authentication steps
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
        Follow these steps to secure your account:
        <ul className="list-none mt-2">
          <Step title="Enter your email address" />
          <Step title="Create a strong password" />
          <Step title="Set up two-factor authentication" />
          <Step title="Verify your identity" />
        </ul>
      </div>
      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        Ensuring your account is properly secured helps protect your personal
        information and data.
      </p>
    </div>
  );
}

const Step = ({ title, link }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      {link ? (
        <a href={link} className="text-frappe-blue hover:text-frappe-sapphire">{title}</a>
      ) : (
        <p className="text-frappe-text">{title}</p>
      )}
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-frappe-blue mt-1 flex-shrink-0">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0" />
    </svg>
  );
};
