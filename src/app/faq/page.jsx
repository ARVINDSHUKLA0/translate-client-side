"use client";

import React, { useState } from "react";
import "./faq.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faq = [
  {
    title: "GENERAL",
    items: [
      [
        "How quickly can you translate my document?",
        "Delivery depends on document length, language pair and service. Many projects have expedited options, and the estimated delivery is shown during the quote process.",
      ],
      [
        "Are translations completed by humans?",
        "Yes. Verba's service is built around native-speaking language professionals who work with context, tone and subject matter.",
      ],
      [
        "What languages do you support?",
        "Verba supports 65+ languages across common business, personal and localization workflows.",
      ],
      [
        "Can I request a revision?",
        "Yes. If something needs adjustment, you can request a revision after receiving the finished translation.",
      ],
    ],
  },
  {
    title: "PRICING",
    items: [
      [
        "How much does translation cost?",
        "Starting plans are $24.95 and $49.95 per document. Larger, specialist or recurring work can receive a tailored quote.",
      ],
      [
        "Is pricing shown before I order?",
        "Yes. The experience is designed to show an estimated price and delivery time before you continue.",
      ],
      [
        "Do you offer business pricing?",
        "Yes. Business and enterprise workflows can be tailored around recurring volume, teams and localization needs.",
      ],
      [
        "Can I translate multiple documents?",
        "Yes. Teams can use recurring workflows and centralized billing for multiple projects.",
      ],
    ],
  },
  {
    title: "DELIVERY",
    items: [
      [
        "What is the standard delivery time?",
        "Many standard projects are delivered within 24–48 hours, depending on the project.",
      ],
      [
        "Can I request expedited delivery?",
        "Priority delivery can be available for qualifying projects and is shown during the quote process.",
      ],
      [
        "How do I receive my completed files?",
        "You'll receive the finished translation as a downloadable final file.",
      ],
    ],
  },
  {
    title: "SECURITY",
    items: [
      [
        "Are my files secure?",
        "Verba uses a secure workflow for document uploads and project handling.",
      ],
      [
        "Is my information confidential?",
        "Confidential handling is part of the workflow, especially for personal and corporate documents.",
      ],
      [
        "Who can access my documents?",
        "Access is limited to the people needed to complete and review your translation.",
      ],
    ],
  },
  {
    title: "BUSINESS",
    items: [
      [
        "Can teams share one account?",
        "Yes. Team accounts provide a shared place to request, track and approve translation work.",
      ],
      [
        "Do you provide centralized billing?",
        "Yes. Business workflows can consolidate billing across team translation requests.",
      ],
      [
        "Do you offer API integrations?",
        "Enterprise workflows can include API access, webhooks and SLA support.",
      ],
      [
        "Do you support recurring translation projects?",
        "Yes. Recurring business workflows can be tailored around your volume and content needs.",
      ],
    ],
  },
];

const categories = [
  "General",
  "Translation",
  "Pricing",
  "Delivery",
  "Security",
  "Business",
];

export default function Page() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen((current) => (current === id ? null : id));
  };

  const scrollToCategory = (category) => {
    const targetId =
      category === "General" ? "GENERAL" : category.toUpperCase();

    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Navbar />

      <main className="faq-page">
        {/* HERO */}
        <section className="faq-hero">
          <div className="container-custom">
            <div className="faq-reveal faq-visible">
              <div className="faq-eyebrow">FAQ</div>

              <h1 className="faq-display">
                Everything you need
                <br />
                to know.
              </h1>

              <p className="faq-lead">
                Answers about translation, pricing, delivery, security and
                working with Verba.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ CONTENT */}
        <section className="faq-section">
          <div className="container-custom">
            <div className="faq-layout">
              {/* CATEGORIES */}
              <aside className="faq-categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      category === "General"
                        ? "faq-category faq-category-active"
                        : "faq-category"
                    }
                    onClick={() => scrollToCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </aside>

              {/* QUESTIONS */}
              <div className="faq-content">
                {faq.map((group, groupIndex) => (
                  <div
                    className="faq-group"
                    id={group.title}
                    key={group.title}
                  >
                    <h2 className="faq-group-title">{group.title}</h2>

                    {group.items.map(([question, answer], itemIndex) => {
                      const id = `${groupIndex}-${itemIndex}`;
                      const isOpen = open === id;

                      return (
                        <div className="faq-item" key={question}>
                          <button
                            type="button"
                            className="faq-question"
                            onClick={() => toggle(id)}
                            aria-expanded={isOpen}
                          >
                            <span>{question}</span>

                            <span className="faq-question-icon">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>

                          <div
                            className={
                              isOpen
                                ? "faq-answer faq-answer-open"
                                : "faq-answer"
                            }
                          >
                            <p>{answer}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="faq-cta-section" id="start">
          <div className="container-custom">
            <div className="faq-cta">
              <div>
                <div className="faq-eyebrow faq-cta-eyebrow">
                  STILL HAVE QUESTIONS?
                </div>

                <h2 className="faq-cta-title">
                  Our team is
                  <br />
                  happy to help.
                </h2>
              </div>

              <div className="faq-actions">
                <a
                  className="faq-btn faq-btn-light"
                  href="#"
                >
                  Contact us →
                </a>

                <a
                  className="faq-btn faq-btn-lime"
                  href="#"
                >
                  Start a translation →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}