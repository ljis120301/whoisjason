'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Blog() {
  return (
    <section className="py-16" id="section_4">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center mb-8">
            <Image 
              src="/white-desk-work-study-aesthetics.jpg" 
              className="rounded-full" 
              alt="" 
              width={100} 
              height={75} 
            />
            <h2 className="text-white text-3xl font-bold ml-4">My blog</h2>
          </div>
          <div className="text-center">
            <Link 
              href="https://bee.whoisjason.me" 
              className="inline-block px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              here (still a work in progress)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
