"use client";

import React from "react";
import Link from "next/link";
import "./Services.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      number: "01 / OFFICIAL",
      title: "Certified translation",
      text: "Official translations for immigration, education, legal, government and other high-stakes submissions.",
      link: "Explore certified translation →",
    },
    {
      number: "02 / EVERYDAY",
      title: "Document translation",
      text: "Professional translation for contracts, reports, certificates, presentations, websites and business documents.",
      link: "Explore document translation →",
    },
    {
      number: "03 / GLOBAL",
      title: "Localization",
      text: "Adapt language, tone and cultural details so your product and content feel native in every market.",
      link: "Explore localization →",
    },
    {
      number: "04 / SCALE",
      title: "Business solutions",
      text: "Team accounts, centralized billing, recurring workflows and tailored language programs for organizations.",
      link: "Explore business solutions →",
    },
  ];

  const features = [
    {
      title: "Native-speaking professionals",
      text: "Experienced language specialists matched to your content.",
    },
    {
      title: "Transparent pricing",
      text: "Know the expected cost before you begin.",
    },
    {
      title: "Fast delivery",
      text: "Clear delivery estimates for every project.",
    },
    {
      title: "Quality review",
      text: "Professional review before final delivery.",
    },
  ];

  const comparison = [
    ["Certified", "Official submissions", "24–48 hrs", "Specialist", "Available"],
    [
      "Documents",
      "Business & personal files",
      "24–48 hrs",
      "Native professional",
      "Optional",
    ],
    [
      "Localization",
      "Products & markets",
      "Project-based",
      "Native + cultural",
      "—",
    ],
    [
      "Business",
      "Recurring team work",
      "Tailored",
      "Dedicated",
      "Optional",
    ],
  ];

  return (
    <> 
    <Navbar/>
      <section className="py-3 py-lg-5 overflow-hidden ">
        <div className="container-custom px-2 py-lg-5">
          <div className="row align-items-center g-5">

            <div className="col-12 col-lg-6">
              <div className="small fw-bold text-secondary mb-3">
                SERVICES
              </div>

              <h1 className="display-1 fw-bold lh-1 mb-4 services-heading">
                One partner for
                <br />
                every language need.
              </h1>

              <p className="fs-5 text-secondary mb-4 services-lead">
                From certified documents to multilingual products, choose the
                right translation service for your project.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Link href="#start" className="btn btn-dark rounded-pill px-4 py-3">
                  Start a translation →
                </Link>

                <Link
                  href="/solutions"
                  className="btn btn-light border rounded-pill px-4 py-3"
                >
                  Explore solutions
                </Link>
              </div>
            </div> 
            <div className="col-12 col-lg-6">
              <div className="services-visual position-relative">

                <div className="services-doc position-absolute bg-white border rounded-4 p-4 shadow-sm">
                  <strong className="d-block mb-4">
                    Certificate.pdf
                  </strong>

                  <div className="service-line mb-3"></div>
                  <div className="service-line mb-3"></div>
                  <div className="service-line short mb-3"></div>
                  <div className="service-line mb-3"></div>
                  <div className="service-line short"></div>
                </div>

                <div className="services-lang position-absolute bg-white border rounded-4 p-3 shadow-sm">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <span className="badge bg-light text-dark rounded-pill">
                      English
                    </span>

                    <span className="fs-4">↔</span>

                    <span className="badge bg-light text-dark rounded-pill">
                      German
                    </span>
                  </div>
                </div>

                <div className="services-status position-absolute bg-white border rounded-4 p-3 shadow-sm">
                  <strong className="d-block">
                    Translation ready
                  </strong>

                  <small className="text-secondary">
                    Quality reviewed · 24–48 hrs
                  </small>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
 
      <section className="py-lg-5 py-md-5 py-sm-3 py-2">
        <div className="container-custom px-2 py-lg-5">

          <div className="mb-5">
            <div className="small fw-bold text-secondary mb-3">
              SERVICES
            </div>

            <h2 className="display-5 fw-bold services-section-title">
              Professional language services,
              <br className="d-none d-md-block" />
              built around what you need.
            </h2>
          </div>

          <div className="row g-3">
            {services.map((service, index) => (
              <div className="col-12 col-md-6 col-lg-3" key={index}>
                <div className="card h-100 border rounded-4 p-4 services-card">

                  <div className="small fw-bold text-secondary mb-5">
                    {service.number}
                  </div>

                  <h3 className="h4 fw-bold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-secondary">
                    {service.text}
                  </p>

                  <Link
                    href="#"
                    className="fw-semibold text-decoration-none mt-auto pt-4"
                  >
                    {service.link}
                  </Link>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
 
      <section className="py-lg-5 py-md-5 py-sm-3 py-2">
        <div className="container-custom px-2 py-lg-5">

          <div className="mb-5">
            <div className="small fw-bold text-secondary mb-3">
              WHY VERBA
            </div>

            <h2 className="display-5 fw-bold services-section-title">
              Human expertise.
              <br />
              Digital simplicity.
            </h2>
          </div>

          <div className="row border-top border-bottom">

            {features.map((feature, index) => (
              <div
                className="col-12 col-md-6 col-lg-3 p-4 border-end feature-box"
                key={index}
              >
                <h3 className="h5 fw-bold">
                  {feature.title}
                </h3>

                <p className="small text-secondary mb-0">
                  {feature.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>
 
      <section className="py-lg-5 py-md-5 py-sm-3 py-2">
        <div className="container-custom px-2 py-lg-5">

          <div className="mb-5">
            <div className="small fw-bold text-secondary mb-3">
              SERVICE COMPARISON
            </div>

            <h2 className="display-5 fw-bold services-section-title">
              The right level of expertise.
            </h2>
          </div>

          <div className="table-responsive bg-white border rounded-4">
            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">
                <tr>
                  <th>Service</th>
                  <th>Best for</th>
                  <th>Delivery</th>
                  <th>Expertise</th>
                  <th>Certification</th>
                </tr>
              </thead>

              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index}>
                    {row.map((item, i) => (
                      <td key={i}>{item}</td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </section> 

      <section className="py-lg-5 py-md-5 py-sm-3 py-2" id="start">
        <div className="container-custom px-2 py-lg-5">

          <div className="bg-dark text-white rounded-4 p-4 p-md-5">
            <div className="row align-items-center g-4">

              <div className="col-12 col-lg-8">

                <div className="small fw-bold text-secondary mb-3">
                  GET STARTED
                </div>

                <h2 className="display-5 fw-bold lh-1 mb-3">
                  Your next market
                  <br />
                  starts with one file.
                </h2>

                <p className="text-white-50 mb-0">
                  Upload a document and get a clear quote for professional
                  translation.
                </p>

              </div>

              <div className="col-12 col-lg-4 text-lg-end">

                <Link
                  href="#"
                  className="btn rounded-pill px-4 py-3 services-cta-btn"
                >
                  Start a translation →
                </Link>

              </div>

            </div>
          </div>

        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Services;