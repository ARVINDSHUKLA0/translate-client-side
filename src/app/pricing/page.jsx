import React from "react";
import Link from "next/link";
import "./Pricing.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    type: "STANDARD",
    desc: "For everyday documents and personal use.",
    price: "$24.95",
    features: [
      "Native-speaking translators",
      "24–48 hr delivery",
      "PDF & DOCX export",
      "Email support",
    ],
    button: "Choose Standard",
    dark: false,
  },
  {
    type: "PROFESSIONAL",
    desc: "For businesses with regular translation needs.",
    price: "$49.95",
    features: [
      "Everything in Standard",
      "Certified translation option",
      "Priority 24 hr delivery",
      "Dedicated project manager",
      "Team billing",
    ],
    button: "Choose Professional",
    dark: true,
    popular: true,
  },
  {
    type: "ENTERPRISE",
    desc: "For organizations scaling across markets.",
    price: "Custom pricing",
    features: [
      "Everything in Professional",
      "Localization workflows",
      "API & integrations",
      "SLA & compliance support",
      "Dedicated account support",
    ],
    button: "Talk to sales →",
    dark: false,
    custom: true,
  },
];

const comparison = [
  ["Translation quality", "✓", "✓", "✓"],
  ["Native professionals", "✓", "✓", "✓"],
  ["Certified options", "—", "✓", "✓"],
  ["Delivery speed", "24–48 hr", "Priority", "Tailored"],
  ["File formats", "PDF / DOCX", "All common", "Custom"],
  ["Team access", "—", "✓", "✓"],
  ["Project management", "—", "✓", "Dedicated"],
  ["API access", "—", "—", "✓"],
  ["Support", "Email", "Dedicated PM", "Dedicated team"],
];

const factors = [
  {
    title: "Language pair",
    text: "Demand and specialization vary by language.",
  },
  {
    title: "Document length",
    text: "Longer or more complex files require more work.",
  },
  {
    title: "Specialist subject",
    text: "Technical and regulated content may need specialists.",
  },
  {
    title: "Delivery & formatting",
    text: "Rush delivery and complex layouts can affect cost.",
  },
];

const Page = () => {
  return (
    <>
      <Navbar />

      <main className="mx-lg-0 mx-md-0 mx-sm-1 px-2"> 

        <section className="py-lg-5 py-lg-md-4 py-sm-3 py-2">
          <div className="container-custom py-lg-5">
            <div className="eyebrow mb-3">PRICING</div>

            <h1 className="display-1 fw-bold lh-1 mb-4">
              Clear pricing.
              <br />
              No surprises.
            </h1>

            <p className="lead text-secondary pricing-lead mb-4">
              Choose a simple starting plan for everyday translation or get a
              tailored quote for larger and recurring projects.
            </p>

            <div
              className="pricing-toggle d-inline-flex p-1 rounded-pill"
              role="group"
            >
              <button
                type="button"
                className="btn active rounded-pill px-4"
              >
                Pay per document
              </button>

              <button type="button" className="btn rounded-pill px-4">
                Business plan
              </button>
            </div>
          </div>
        </section> 

        <section className="pb-lg-5 pb-md-4 pb-sm-3 pb-2">
          <div className="container-custom">
            <div className="row g-3">
              {plans.map((plan) => (
                <div className="col-12 col-lg-4" key={plan.type}>
                  <article
                    className={`price-card ${
                      plan.popular ? "popular" : ""
                    } h-100 rounded-4 p-4 p-lg-5 position-relative`}
                  >
                    {plan.popular && (
                      <div className="badge-popular">MOST POPULAR</div>
                    )}

                    <div className="kicker mb-3">{plan.type}</div>

                    <p className="text-secondary">{plan.desc}</p>

                    <div className={`price ${plan.custom ? "custom-price" : ""}`}>
                      {plan.price}
                      {!plan.custom && <small>/document</small>}
                    </div>

                    <ul className="list-unstyled my-4">
                      {plan.features.map((feature) => (
                        <li key={feature}>✓ {feature}</li>
                      ))}
                    </ul>

                    <Link
                      href="#"
                      className={`btn ${
                        plan.dark
                          ? "btn-dark"
                          : "btn-light border"
                      } rounded-pill px-4 py-3 w-100`}
                    >
                      {plan.button}
                    </Link>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        <section className="py-lg-5 py-md-4 py-sm-3 py-2">
          <div className="container-custom py-lg-5">
            <div className="eyebrow mb-3">WHAT'S INCLUDED</div>

            <h2 className="display-5 fw-bold mb-5">
              Compare at a glance.
            </h2>

            <div className="table-responsive">
              <div className="pricing-table">
                <div className="table-head">Feature</div>
                <div className="table-head">Standard</div>
                <div className="table-head">Professional</div>
                <div className="table-head">Enterprise</div>

                {comparison.flatMap((row) =>
                  row.map((item, index) => (
                    <div key={`${row[0]}-${index}`}>{item}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
 
        <section className="py-lg-5 py-md-4 py-sm-3 py-2">
          <div className="container-custom py-lg-5">
            <div className="row g-4 align-items-end mb-5">
              <div className="col-12 col-lg-7">
                <div className="eyebrow mb-3">PRICING EXPLAINED</div>

                <h2 className="display-5 fw-bold">
                  What can change the final quote?
                </h2>
              </div>

              <div className="col-12 col-lg-5">
                <p className="text-secondary mb-0">
                  Final pricing can depend on language pair, document length,
                  specialist subject, certification, delivery speed, formatting
                  and localization complexity.
                </p>
              </div>
            </div>

            <div className="row g-3">
              {factors.map((factor) => (
                <div
                  className="col-12 col-md-6 col-lg-3"
                  key={factor.title}
                >
                  <div className="feature-card h-100 p-4 rounded-4">
                    <h3>{factor.title}</h3>
                    <p>{factor.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        <section className="py-lg-5 py-md-4 py-sm-3 py-2" id="start">
          <div className="container-custom py-lg-5">
            <div className="pricing-cta rounded-4 p-4 p-lg-5">
              <div className="row align-items-center g-4">
                <div className="col-12 col-lg-8">
                  <div className="eyebrow mb-3">GET A QUOTE</div>

                  <h2 className="display-5 fw-bold">
                    Need something
                    <br />
                    more specific?
                  </h2>

                  <p className="text-secondary mb-0">
                    Tell us what you're translating and we'll recommend
                    the right option.
                  </p>
                </div>

                <div className="col-12 col-lg-4 text-lg-end">
                  <Link
                    href="#"
                    className="btn btn-lime rounded-pill px-4 py-3"
                  >
                    Get my quote →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Page;