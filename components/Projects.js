'use client';

import Image from 'next/image';

export default function Projects() {
  return (
    <section className="services section-padding" id="section_3">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-12 mx-auto">
            <div className="section-title-wrap d-flex justify-content-center align-items-center mb-5">
              <Image src="/images/pi-server.jpeg" className="avatar-image img-fluid" alt="" width={100} height={100} />
              <h2 className="text-white ms-4 mb-0">Projects</h2>
            </div>
            <div className="row pt-lg-5">
              {/* Website Project */}
              <div className="col-lg-6 col-12">
                <div className="services-thumb">
                  <div className="d-flex flex-wrap align-items-center border-bottom mb-4 pb-3">
                    <h3 className="mb-0">Websites</h3>
                    <div className="services-price-wrap ms-auto">
                      <p className="services-price-text mb-0">NGINX</p>
                      <div className="services-price-overlay"></div>
                    </div>
                  </div>
                  <p>I have created an array of different template websites to match your buisnesses needs. I am able to quickly deploy new web servers and services as needed </p>
                  <a href="#" className="custom-btn custom-border-btn btn mt-3">Discover More</a>
                  <div className="services-icon-wrap d-flex justify-content-center align-items-center">
                    <i className="services-icon bi-globe"></i>
                  </div>
                </div>
              </div>
              {/* Python Project */}
              <div className="col-lg-6 col-12">
                <div className="services-thumb services-thumb-up">
                  <div className="d-flex flex-wrap align-items-center border-bottom mb-4 pb-3">
                    <h3 className="mb-0">Python</h3>
                    <div className="services-price-wrap ms-auto">
                      <p className="services-price-text mb-0">$1,200</p>
                      <div className="services-price-overlay"></div>
                    </div>
                  </div>
                  <p>I started my journey with Python 3 years ago when I attempted to re-do my employer's POS system. From there I grew to design websites and backend applications.</p>
                  <a href="#" className="custom-btn custom-border-btn btn mt-3">Discover More</a>
                  <div className="services-icon-wrap d-flex justify-content-center align-items-center">
                    <i className="services-icon bi-lightbulb"></i>
                  </div>
                </div>
              </div>
              {/* Homelab-Servers Project */}
              <div className="col-lg-6 col-12">
                <div className="services-thumb">
                  <div className="d-flex flex-wrap align-items-center border-bottom mb-4 pb-3">
                    <h3 className="mb-0">Homelab-Servers</h3>
                    <div className="services-price-wrap ms-auto">
                      <p className="services-price-text mb-0">BASH/ZSH</p>
                      <div className="services-price-overlay"></div>
                    </div>
                  </div>
                  <p>From setting up Jellyfin servers on aging laptops to hosting a customized Minecraft Server complete with a personalized domain powered by Cloudflare, I am deeply passionate about embracing and integrating enterprise-grade technologies into my home environment...</p>
                  <a href="#" className="custom-btn custom-border-btn btn mt-3">Discover More</a>
                  <div className="services-icon-wrap d-flex justify-content-center align-items-center">
                    <i className="services-icon bi-terminal"></i>
                  </div>
                </div>
              </div>
              {/* Microsoft Active Directory Project */}
              <div className="col-lg-6 col-12">
                <div className="services-thumb services-thumb-up">
                  <div className="d-flex flex-wrap align-items-center border-bottom mb-4 pb-3">
                    <h3 className="mb-0">Microsoft Active Directory</h3>
                    <div className="services-price-wrap ms-auto">
                      <p className="services-price-text mb-0">MS ADDS</p>
                      <div className="services-price-overlay"></div>
                    </div>
                  </div>
                  <p>I have deployed an entirely Virtualized Microsoft Active Directory Server. I have also deployed things such as Group Policy and a Domain Server running entirely virtualized on QEMU/KVM virtualization.</p>
                  <div className="services-icon-wrap d-flex justify-content-center align-items-center">
                    <i className="services-icon bi-motherboard"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
