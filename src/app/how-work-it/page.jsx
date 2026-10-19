import React from "react";
import "./HowItWork.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  ["01", "Tell us what you need", "Choose your source and target languages, service type and delivery speed. Upload your files securely."],
  ["02", "Get a clear quote", "See your estimated price and delivery time before you continue."],
  ["03", "We match the right expert", "Your content goes to a qualified language professional with the right subject-matter expertise."],
  ["04", "Translation begins", "Your translator works carefully with language, context and formatting."],
  ["05", "Review your translation", "Receive the finished translation and request revisions if needed."],
  ["06", "Download and use", "Approve the final file and download your completed translation."],
];

const upload = [
  ["01 Upload", "Secure file intake"],
  ["02 Quote", "Clear price & delivery"],
  ["03 Expert", "Matched specialist"],
  ["04 Review", "Quality checked"],
  ["05 Delivery", "Final approved file"],
];

const workflow = [
  ["CLIENT", "Request"],
  ["UPLOAD", "Secure intake"],
  ["QUOTE", "Approve"],
  ["TRANSLATOR", "Expert work"],
  ["DELIVERY", "Final file"],
];

const security = [
  ["Secure file handling", "Files are handled through a confidential workflow."],
  ["Professional experts", "Work is matched to qualified language specialists."],
  ["Quality review", "Finished translations receive professional review."],
  ["Confidential workflow", "Your documents stay focused on the people who need them."],
];

const Page = () => (
  <>
    <Navbar />

    <main className="howit-page">
 
      <section className="howit-hero">
        <div className="container-custom howit-hero-grid">

          <div className="howit-reveal">
            <div className="howit-eyebrow">HOW IT WORKS</div>

            <h1 className="howit-display">
              Simple enough to
              <br />
              start in a minute.
            </h1>

            <p className="howit-lead">
              A streamlined experience from your first upload to the final
              approved file.
            </p>

            <div className="howit-actions">
              <a href="#start" className="howit-btn">
                Start a translation →
              </a>
            </div>
          </div>

          <div className="howit-visual howit-reveal">
            <div className="howit-hero-flow">
              {upload.map(([title, text]) => (
                <div className="howit-workflow-card" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
 
      <section className="howit-section">
        <div className="container-custom">

          <div className="howit-section-head">
            <div>
              <div className="howit-eyebrow">
                FROM UPLOAD TO DELIVERY
              </div>

              <h2 className="howit-section-title">
                A process that keeps
                <br />
                you in the loop.
              </h2>
            </div>
          </div>

          <div className="howit-timeline">
            {steps.map(([no, title, text]) => (
              <div className="howit-step" key={no}>

                <div className="howit-step-num">
                  {no}
                </div>

                <div className="howit-step-content">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
 
      <section className="howit-section">
        <div className="container-custom">

          <div className="howit-section-head">
            <div>
              <div className="howit-eyebrow">
                SHOW THE WORKFLOW
              </div>

              <h2 className="howit-section-title">
                Quietly sophisticated,
                <br />
                step by step.
              </h2>
            </div>
          </div>

          <div className="howit-workflow">
            {workflow.map(([title, text]) => (
              <div className="howit-workflow-card" key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
 
      <section className="howit-section">
        <div className="container-custom">

          <div className="howit-section-head">
            <div>
              <div className="howit-eyebrow">
                BUILT FOR PEACE OF MIND
              </div>

              <h2 className="howit-section-title">
                Professional care at
                <br />
                every handoff.
              </h2>
            </div>
          </div>

          <div className="howit-security-grid">
            {security.map(([title, text]) => (
              <div className="howit-security-column" key={title}>
                <div className="howit-card">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
 
      <section className="howit-section howit-start-section" id="start">
        <div className="container-custom">

          <div className="howit-cta">

            <div>
              <div className="howit-eyebrow howit-cta-eyebrow">
                GET STARTED
              </div>

              <h2 className="howit-cta-title">
                Ready to translate?
                <br />
                Start with one file.
              </h2>
            </div>

            <a href="#" className="howit-btn howit-btn-lime">
              Start a translation →
            </a>

          </div>

        </div>
      </section>

    </main>

    <Footer />
  </>
);

export default Page;