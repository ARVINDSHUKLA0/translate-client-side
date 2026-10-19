import React from 'react'
import Link from 'next/link'
import '../componentStyle/Footer.css'

const footerLinks = [
  {
    title: "SERVICES",
    links: ["Certified", "Documents", "Localization", "Business"],
  },
  {
    title: "SOLUTIONS",
    links: ["Individuals", "Legal & finance", "Marketing", "Technology"],
  },
  {
    title: "COMPANY",
    links: ["How it works", "Security", "FAQ", "Contact"],
  },
  {
    title: "RESOURCES",
    links: ["Help center", "Languages", "Pricing", "Privacy"],
  },
];

const Footer = () => {
  return (
    <footer className="footer-section py-5 ps-lg-0 ps-md-0 ps-3">
      <div className='container-custom'>
        <div className="row"> 
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h3 className="footer-logo mb-3">
              logo<span className="dot">.</span>
            </h3>
            <p className="footer-desc">
              Translation without borders — professional language services for
              people and organizations moving around the world.
            </p>
          </div>
 
          {footerLinks.map((col, index) => (
            <div className="col-lg-1 col-md-3 col-6 mb-4 mb-lg-0 offset-lg-1" key={index}>
              <h6 className="footer-heading mb-3">{col.title}</h6>
              <ul className="list-unstyled">
                {col.links.map((link, i) => (
                  <li key={i} className="mb-2">
                    <Link href="#" className="footer-link">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="footer-divider my-4" />

        <div className="row">
          <div className="col-md-6 mb-2 mb-md-0">
            <p className="footer-bottom-text mb-0">
              © 2026 Verba. Website concept.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="footer-bottom-text mb-0">
              Professional translation · Localization · Global language solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;