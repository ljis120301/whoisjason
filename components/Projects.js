'use client';

import Image from 'next/image';

export default function Projects() {
  return (
    <section className="py-16" id="section_3">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <article className="prose lg:prose-xl">
            <div className="flex justify-center items-center mb-10">
              <Image src="/pi-server.jpeg" className="rounded-full" alt="" width={100} height={100} />
              <h2 className="text-white ml-4 mb-0">Projects</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Website Project */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h3 className="text-xl font-bold">Websites</h3>
                  <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">NGINX</span>
                </div>
                <p>I have created an array of different template websites to match your business needs. I am able to quickly deploy new web servers and services as needed.</p>
                <a href="#" className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Discover More</a>
                <div className="flex justify-center items-center mt-4">
                  <i className="text-4xl">🌐</i>
                </div>
              </div>
              {/* Python Project */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h3 className="text-xl font-bold">Python</h3>
                  <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">$1,200</span>
                </div>
                <p>I started my journey with Python 3 years ago when I attempted to re-do my employer's POS system. From there I grew to design websites and backend applications.</p>
                <a href="#" className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Discover More</a>
                <div className="flex justify-center items-center mt-4">
                  <i className="text-4xl">💡</i>
                </div>
              </div>
              {/* Homelab-Servers Project */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h3 className="text-xl font-bold">Homelab-Servers</h3>
                  <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">BASH/ZSH</span>
                </div>
                <p>From setting up Jellyfin servers on aging laptops to hosting a customized Minecraft Server complete with a personalized domain powered by Cloudflare, I am deeply passionate about embracing and integrating enterprise-grade technologies into my home environment...</p>
                <a href="#" className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Discover More</a>
                <div className="flex justify-center items-center mt-4">
                  <i className="text-4xl">💻</i>
                </div>
              </div>
              {/* Microsoft Active Directory Project */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h3 className="text-xl font-bold">Microsoft Active Directory</h3>
                  <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">MS ADDS</span>
                </div>
                <p>I have deployed an entirely Virtualized Microsoft Active Directory Server. I have also deployed things such as Group Policy and a Domain Server running entirely virtualized on QEMU/KVM virtualization.</p>
                <div className="flex justify-center items-center mt-4">
                  <i className="text-4xl">🖥️</i>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
