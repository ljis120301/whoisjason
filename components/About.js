'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section className="about section-padding" id="section_2">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <Image src="/images/pi.png" className="about-image img-fluid" alt="" width={600} height={400} />
          </div>
          <div className="col-lg-6 col-12 mt-5 mt-lg-0">
            <div className="about-thumb">
              <div className="section-title-wrap d-flex justify-content-end align-items-center mb-4">
                <h2 className="text-white me-4 mb-0">My Story</h2>
                <Image src="/images/dark-profile.jpg" className="avatar-image img-fluid" alt="" width={100} height={100} />
              </div>
              <h3 className="pt-2 mb-3">a little bit about Jason</h3>
              <p>Hello, my name is Jason Graham. I am an experienced IT professional with a strong focus on Linux systems and network infrastructure. Throughout my career, I have successfully undertaken a range of diverse projects, demonstrating my expertise in Linux administration and networking...</p>
              <h1>Hello world</h1>
              <p>I started Programing in HTML when I was 10 years old. For me web design and web development interests me a lot and is something I am passionate about...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
