'use client';

import React from 'react';
import Image from 'next/image';

export default function Contact() {
  return (
    <section className="contact section-padding" id="section_5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="section-title-wrap d-flex justify-content-center align-items-center mb-5">
              <Image src="/images/aerial-view-man-using-computer-laptop-wooden-table.jpg" className="avatar-image img-fluid" alt="" width={100} height={100} />
              <h2 className="text-white ms-4 mb-0">Say Hi</h2>
            </div>
          </div>

          <div className="clearfix"></div>

          <div className="col-lg-3 col-md-6 col-12 pe-lg-0">
            <div className="contact-info contact-info-border-start d-flex flex-column">
              <strong className="site-footer-title d-block mb-3">Projects</strong>
              <ul className="footer-menu">
                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Websites</a></li>
                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Branding</a></li>
                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Ecommerce</a></li>
                <li className="footer-menu-item"><a href="#" className="footer-menu-link">SEO</a></li>
              </ul>

              <strong className="site-footer-title d-block mt-4 mb-3">Stay connected</strong>
              <ul className="social-icon">
                <li className="social-icon-item"><a href="https://twitter.com/ljis120301" className="social-icon-link bi-twitter"></a></li>
                <li className="social-icon-item"><a href="#" className="social-icon-link bi-instagram"></a></li>
                <li className="social-icon-item"><a href="#" className="social-icon-link bi-pinterest"></a></li>
                <li className="social-icon-item"><a href="https://www.youtube.com/ljis120301" className="social-icon-link bi-youtube"></a></li>
              </ul>

              <strong className="site-footer-title d-block mt-4 mb-3">Start a project</strong>
              <p className="mb-0">I'm available for freelance projects</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 ps-lg-0">
            <div className="contact-info d-flex flex-column">
              <strong className="site-footer-title d-block mb-3">About</strong>
              <p className="mb-2">I'm free most days of the week feel free to contact me</p>

              <strong className="site-footer-title d-block mt-4 mb-3">Email</strong>
              <p><a href="mailto:ljis120301@gmail.com">ljis120301 at gmail.com</a></p>

              <strong className="site-footer-title d-block mt-4 mb-3">Discord</strong>
              <p className="mb-0">
                <a href="https://discord.com/users/238064010044506123">Add me on Discord!</a>
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-12 mt-5 mt-lg-0">
            <form action="#" method="get" className="custom-form contact-form" role="form">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-floating">
                    <input type="text" name="name" id="name" className="form-control" placeholder="Name" required="" />
                    <label htmlFor="floatingInput">Name</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-12"> 
                  <div className="form-floating">
                    <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Email address" required="" />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-6">
                  <div className="form-check form-check-inline">
                    <input name="website" type="checkbox" className="form-check-input" id="inlineCheckbox1" value="1" />
                    <label className="form-check-label" htmlFor="inlineCheckbox1">
                      <i className="bi-globe form-check-icon"></i>
                      <span className="form-check-label-text">Websites</span>
                    </label>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-6">
                  <div className="form-check form-check-inline">
                    <input name="branding" type="checkbox" className="form-check-input" id="inlineCheckbox2" value="1" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">
                      <i className="bi-lightbulb form-check-icon"></i>
                      <span className="form-check-label-text">Branding</span>
                    </label>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-6">
                  <div className="form-check form-check-inline">
                    <input name="ecommerce" type="checkbox" className="form-check-input" id="inlineCheckbox3" value="1" />
                    <label className="form-check-label" htmlFor="inlineCheckbox3">
                      <i className="bi-phone form-check-icon"></i>
                      <span className="form-check-label-text">Ecommerce</span>
                    </label>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-6">
                  <div className="form-check form-check-inline me-0">
                    <input name="seo" type="checkbox" className="form-check-input" id="inlineCheckbox4" value="1" />
                    <label className="form-check-label" htmlFor="inlineCheckbox4">
                      <i className="bi-reddit form-check-icon"></i>
                      <span className="form-check-label-text">SEO</span>
                    </label>
                  </div>
                </div>

                <div className="col-lg-12 col-12">
                  <div className="form-floating">
                    <textarea className="form-control" id="message" name="message" placeholder="Tell me about the project"></textarea>
                    <label htmlFor="floatingTextarea">Tell me about the project</label>
                  </div>
                </div>

                <div className="col-lg-3 col-12 ms-auto">
                  <button type="submit" className="form-control">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
