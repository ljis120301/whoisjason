'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Blog() {
  return (
    <section className="projects section-padding" id="section_4">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-12 ms-auto">
            <div className="section-title-wrap d-flex justify-content-center align-items-center mb-4">
              <Image src="/public/white-desk-work-study-aesthetics.jpg" className="avatar-image img-fluid" alt="" width={100} height={100} />
              <h2 className="text-white ms-4 mb-0">My blog</h2>
            </div>
          </div>
          <div className="custom-border-btn custom-btn section-title-wrap justify-content-center align-items-center">
            <Link href="https://whoisjason.me/cute-website">here (still a work in progress)</Link>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </section>
  );
}
