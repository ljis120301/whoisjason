'use client';

export default function Featured() {
  return (
    <section className="featured section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="profile-thumb">
              <div className="profile-title">
                <h4 className="mb-0">Information</h4>
              </div>
              <div className="profile-body">
                <p>
                  <span className="profile-small-title">Name</span> 
                  <span>Jason G</span>
                </p>
                <p>
                  <span className="profile-small-title">Language</span> 
                  <span>HTML, CSS, and JavaScript</span>
                </p>
                <p>
                  <span className="profile-small-title">Phone</span> 
                  <span><a href="tel: 928-503-4965">928-503-4965</a></span>
                </p>
                <p>
                  <span className="profile-small-title">Email</span> 
                  <span><a href="mailto:ljis120301@gmail.com">ljis120301 at gmail.com</a></span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 mt-5 mt-lg-0">
            <div className="about-thumb">
              <div className="row">
                <div className="col-lg-6 col-6 featured-border-bottom py-2">
                  <strong className="featured-numbers">Live</strong>
                  <p className="featured-text">24/7 Servers</p>
                </div>
                <div className="col-lg-6 col-6 featured-border-start featured-border-bottom ps-5 py-2">
                  <strong className="featured-numbers">Certs</strong>
                  <p className="featured-text">CompTIA N10-008 Network +</p>
                </div>
                <div className="col-lg-6 col-6 pt-4">
                  <strong className="featured-text">Microsoft Certified</strong>
                  <p className="featured-text">I hold Certifications for Micosoft Active Directory as well as Microsoft Excel and Word</p>
                </div>
                <div className="col-lg-6 col-6 featured-border-start ps-5 pt-4">
                  <strong className="featured-text">Specialties</strong>
                  <ul className="featured-text">
                    <li>Html</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>Python</li>
                    <li>Linux</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
