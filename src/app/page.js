"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  const services = [
    { id: "1", title: "01 / OFFICIAL", name: "Certified translation", desc: "Official translations for immigration, education, legal, government and other high-stakes submissions.", dark: true, svcIcon: "hdsa", circleColor: "#5B61FF", circleBorder: "#454BDB" },
    {
      id: "2", title: "02 / EVERYDAY", name: "Document translation", desc: "Professional translation for contracts, reports, certificates, presentations, websites and business documents.", dark: false, circleColor: "#B7FF32",
      circleBorder: "#9DDE20",
    },
    {
      id: "3", title: "03 / GLOBAL", name: "Localization", desc: "Adapt language, tone and cultural details so your product and content feel native in every market.", dark: false, circleColor: "#FF9866",
      circleBorder: "#E57D4D",
    },
    {
      id: "4", title: "04 / SCALE", name: "Business solutions", desc: "Team accounts, centralized billing, recurring workflows and tailored language programs for organizations.", dark: false, circleColor: "#A982FF",
      circleBorder: "#8E63E8",
    },
  ];

  const useCases = [
    { id: "1", tag: "Individuals", title: "Important documents, handled with care.", desc: "Birth certificates, academic records, passports, applications and personal documents.", tint: styles.caseTint1, bgColor: styles.translationBg1, circleColor: "#5B61FF", },
    { id: "2", tag: "Legal & finance", title: "Precision where every word matters.", desc: "Contracts, compliance documents, financial reports and regulated communications.", tint: styles.caseTint2, bgColor: styles.translationBg1, circleColor: "#5B61FF", },
    { id: "3", tag: "Marketing", title: "Keep your brand's voice, everywhere.", desc: "Campaigns, websites, product copy and creative content adapted for local audiences.", tint: styles.caseTint3, bgColor: styles.translationBg2, circleColor: "#ff9a6b", },
    { id: "4", tag: "Technology", title: "Launch globally without sounding translated.", desc: "Apps, software, help centers, UI strings and product experiences localized for scale.", tint: styles.caseTint4, bgColor: styles.translationBg3, circleColor: "#caff55", },
  ];

  const steps = [
    { id: "1", title: "Tell us what you need", desc: "Choose your source and target languages, service type and delivery speed. Upload your files securely." },
    { id: "2", title: "We match the right expert", desc: "Your content goes to a qualified language professional with the right subject-matter and language expertise." },
    { id: "3", title: "Review, approve, done", desc: "Receive your finished translation, request revisions if needed, and download your final files." },
  ];

  const plans = [
    { id: "1", name: "Standard", desc: "For everyday documents and personal use.", price: "$24.95", unit: "/ document", featured: false, features: ["Native-speaking translators", "24–48 hr delivery", "PDF & DOCX export", "Email support"] },
    { id: "2", name: "Professional", desc: "For businesses with regular translation needs.", price: "$49.95", unit: "/ document", featured: true, features: ["Everything in Standard", "Certified translation option", "Priority 24 hr delivery", "Dedicated project manager", "Team billing"] },
    { id: "3", name: "Enterprise", desc: "For organizations scaling across markets.", price: "Custom", unit: "pricing", featured: false, features: ["Everything in Professional", "Localization workflows", "API & integrations", "SLA & compliance support"] },
  ];

  const languages = ["English", "Spanish", "French", "German", "Japanese", "Arabic", "Hindi", "Portuguese", "Korean", "Italian"];

  const faqs = [
    { q: "How quickly can you translate my document?", a: "Delivery depends on document length, language pair and service. Many projects have expedited options, and the estimated delivery is shown during the quote process." },
    { q: "Are translations completed by humans?", a: "Professional translators handle the work, with quality processes designed to match projects to the right language expertise." },
    { q: "Do you provide certified translations?", a: "Yes. Certified translation is available for official uses such as immigration, education, legal and government submissions." },
    { q: "Can you handle business and recurring projects?", a: "Yes. Business workflows can include team access, centralized billing, recurring translation needs and customized language programs." },
    { q: "What languages do you support?", a: "The platform is designed around 65+ languages, including major global business languages and many regional language pairs." },
  ];
  const cardsData = [
    {
      id: 1,
      gradient: "linear-gradient(135deg, #f4f9c9 0%, #d4f542 100%)",
      category: "GUIDE",
      title: "Certified vs. standard translation: what's the difference?",
      description: "Understand which service is right for official documents and everyday business content.",
      linkText: "Read guide",
    },
    {
      id: 2,
      gradient: "linear-gradient(135deg, #fbe4dd 0%, #e6e0f7 100%)",
      category: "GLOBAL GROWTH",
      title: "How to make your website feel local.",
      description: "Language, tone and cultural context can change how customers experience your brand.",
      linkText: "Explore",
    },
    {
      id: 3,
      gradient: "linear-gradient(135deg, #d7ecd9 0%, #c9d6f7 100%)",
      category: "BUSINESS",
      title: "Build a scalable translation workflow.",
      description: "A practical approach to recurring multilingual content and team collaboration.",
      linkText: "Learn more",
    },
  ];

  const [openFaq, setOpenFaq] = useState(0);
  const [billing, setBilling] = useState("monthly");

  return (
    <>
      <div className="mx-2">
        <Navbar />

        <section className="container-custom">
          <section className={`${styles.hero} row align-items-center ps-2 `}>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12">
              <span className={`${styles.badge} d-inline-flex align-items-center gap-2 px-2`}>
                <span className={styles.dot}></span>
                Global language partner · 65+ languages
              </span>
              <h1 className={`${styles.title} my-lg-5 my-3`}>
                Make your
                <br />
                business
                <br />
                <span className={styles.customGradientColor}>understood.</span>
              </h1>

              <p className="fs-22 text-secondary">
                Professional translation and localization for companies,
                documents, products and people — combining native-language
                expertise with a beautifully simple digital experience.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link href="#quote" className={`${styles.darkBtn} btn rounded-pill fw-bold`}>
                  Start a translation →
                </Link>
                <Link href="#services" className="btn bg-white border rounded-pill fw-bold px-4 py-3">
                  Explore solutions
                </Link>
              </div>

              <div className={`${styles.features} d-flex flex-wrap gap-3 mt-3 fs-13`}>
                <span>✓ Native-speaking professionals</span>
                <span>✓ Transparent pricing</span>
                <span>✓ Fast delivery</span>
              </div>
            </div>

            <div className="col-lg-7 col-md-12 col-sm-12 col-12">
              <div className={styles.translation}>
                <div className={styles.circle}></div>
                <div className={styles.card}>
                  <h2 className="fs-4 fw-bold mb-4">Create a translation</h2>
                  <div className="row align-items-center g-3">
                    <div className="col">
                      <div className={styles.language}>
                        <strong className="me-2">US</strong>English
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className={styles.swap}>↔</div>
                    </div>
                    <div className="col">
                      <div className={styles.language}>
                        <strong className="me-2">DE</strong>German
                      </div>
                    </div>
                  </div>
                  <div className={styles.upload}>
                    <div className={styles.uploadIcon}>↑</div>
                    <strong>Drop your document here</strong>
                    <small>PDF, DOCX, PPTX, XLSX and more · Secure upload</small>
                  </div>
                  <div className="border-top mt-3 pt-3 d-flex justify-content-between">
                    <div>
                      <small className="d-block text-secondary">Estimated delivery</small>
                      <strong className="fs-4">24–48 hrs</strong>
                    </div>
                    <div className="text-end">
                      <small className="d-block text-secondary">From</small>
                      <strong className="fs-4">$24.95</strong>
                    </div>
                  </div>
                </div>

                <span className={styles.languages}>65+ languages</span>
                <span className={styles.available}>• Available now</span>
                <span className={styles.secure}>🔒 Secure workflow</span>
                <span className={styles.rating}>★ 4.9 / 5 customer rating</span>
              </div>
            </div>
          </section>
        </section>

        <section className={`${styles.trusted} border-top border-bottom my-lg-5 my-md-4 my-3`}>
          <div className="row align-items-center g-0">
            <div className="col-12 col-md-auto">
              <span className={styles.trustedTitle}>Trusted by global teams</span>
            </div>
            <div className="col">
              <div className={`${styles.brands} d-flex align-items-center justify-content-between`}>
                <span className="fs-14 fw-bold">UNICEF</span>
                <span className="fs-14 fw-bold">YUM!</span>
                <span className="fs-14 fw-bold">EF</span>
                <span className="fs-14 fw-bold">deel.</span>
                <span className="fs-14 fw-bold">YMCA</span>
                <span className="fs-14 fw-bold">SOTHEBY'S</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} container-custom`} id="services">
          <div className="row align-items-end mb-4 pb-3 pt-3">
            <div className="col-lg-7 col-md-12 col-sm-12 col-12 ">
              <span className={styles.eyebrow}>Services</span>
              <h2 className={styles.sectionTitle}>
                One partner for
                <br />
                every language need.
              </h2>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12">
              <p className={`${styles.sectionDesc} ms-lg-auto`}>
                Whether you're submitting one important document or scaling a
                multilingual product, Verba gives you the right level of
                expertise without unnecessary complexity.
              </p>
            </div>
          </div>

          <div className="row g-3">
            {services.map((s) => (
              <div className="col-lg-3 col-md-6 col-12" key={s.id}>
                <div className={`${styles.svc} ${s.dark ? styles.svcDark : ""}`}>
                  <span className={styles.svcNum}>{s.title}</span>
                  <div className={styles.svcIcon}>{s.svcIcon}</div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <div className={styles.svcBlob}>
                    <div
                      className={styles.svcCircle}
                      style={{
                        backgroundColor: s.circleColor,
                        borderColor: s.circleBorder,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ribbon}>
            <div className={styles.ticker}>
              <span>
                {languages.map((l) => (
                  <span key={l}><i></i>{l}</span>
                ))}
              </span>
              <span>
                {languages.map((l) => (
                  <span key={l + "2"}><i></i>{l}</span>
                ))}
              </span>
            </div>
          </div>
        </section>


        <section className={`${styles.section} container-custom`} id="solutions">
          <div className="row align-items-end mb-4 g-3">
            <div className="col-lg-7">
              <span className={styles.eyebrow}>Built around your world</span>
              <h2 className={styles.sectionTitle}>
                Translation that
                <br />
                understands context.
              </h2>
            </div>
            <div className="col-lg-5">
              <p className={`${styles.sectionDesc} ms-lg-auto`}>
                Language is never just words. Our solutions are designed around
                the audience, purpose and market behind every project.
              </p>
            </div>
          </div>

          <div className="row g-3">
            {useCases.map((c) => (
              <div className="col-lg-6 col-6 col-sm-6 col-12" key={c.id}>
                <div className={`${styles.case} ${c.tint}`}>
                  <small>{c.tag}</small>
                  <div className="mt-4">
                    <sapn className="bg-light p-3 rounded-4 ">icon</sapn>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className={`${styles.caseShape} ${c.bgColor}`}>
                    <div style={{
                      backgroundColor: c.circleColor,
                    }} className={styles.caseShapeDifrrent}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} container-custom`} id="process">
          <div className="mb-4">
            <span className={styles.eyebrow}>How it works</span>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <h2 className={styles.sectionTitle}>Simple enough to start in a minute.</h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <p className={`${styles.sectionDesc} ms-lg-auto`}>A streamlined experience from your first upload to the final approved file.</p>
              </div>
            </div>
          </div>
          <div className="row g-3">
            {steps.map((s, i) => (
              <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={s.id}>
                <div className={styles.step}>
                  <div className={styles.stepNo}>0{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container-custom" id="security">
          <div className={styles.security}>
            <div className="row align-items-end g-4">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <span className={styles.eyebrow} style={{ color: "var(--color-accent-lime)" }}>Security & quality</span>
                <h3 style={{ color: "white" }} className={styles.sectionTitle}>Global work deserves a secure home.</h3>
                <p>
                  From personal certificates to confidential corporate files, your content should be handled with care at every step of the process.
                </p>
                <div className="row g-2 mt-3">
                  <div className="col-6"><div className={styles.check}><b>✓</b>Secure file handling</div></div>
                  <div className="col-6"><div className={styles.check}><b>✓</b>Professional experts</div></div>
                  <div className="col-6"><div className={styles.check}><b>✓</b>Quality review</div></div>
                  <div className="col-6"><div className={styles.check}><b>✓</b>Confidential workflow</div></div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={styles.securityVisual}>
                  <div className={styles.secureTop}>
                    <span>VERBA SECURE WORKSPACE</span>
                    <span>● Protected</span>
                  </div>
                  <div className={styles.shield}>
                    <div className={styles.shieldMark}>✓</div>
                  </div>
                  <div className="mt-3">
                    <div className={styles.sline}></div>
                    <div className={styles.sline}></div>
                    <div className={styles.sline}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} container-custom`}>
          <div className="row g-4 align-items-center">
            <div className="col-lg-5 col-md-12 col-sm-12 col-12">
              <span className={styles.eyebrow}>Why teams choose Verba</span>
              <h2 className={styles.sectionTitle}>Human expertise. Digital simplicity.</h2>
              <p className="text-muted fs-12">We remove the frustrating parts of translation while keeping the part that matters most: people who understand language, culture and context.</p>
              <div className="row g-2 mt-3">
                <div className="col-6"><div className={styles.stat}><strong>65+</strong><span>Languages supported</span></div></div>
                <div className="col-6"><div className={styles.stat}><strong>275K+</strong><span>Documents translated</span></div></div>
                <div className="col-6"><div className={styles.stat}><strong>24–48h</strong><span>Average delivery</span></div></div>
                <div className="col-6"><div className={styles.stat}><strong>4.9★</strong><span>Customer rating</span></div></div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 col-12">
              <div className={styles.testimonial}>
                <div className={styles.testimonialBlob}></div>
                <div className={styles.stars}>★★★★★</div>
                <blockquote>
                  “The process was incredibly clear. We uploaded the documents, knew the price and delivery time, and got exactly what we needed
                </blockquote>
                <div className="d-flex align-items-center gap-2 position-relative">
                  <div className={styles.avatar}></div>
                  <div>
                    <strong className="d-block fs-14">Verified customer</strong>
                    <span className="fs-13 text-secondary">Business document translation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-custom" id="quote">
          <div className={styles.quoteBox}>
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <p className="fw-bold fs-10 text-uppercase">Get started</p>
                <h1 className={styles.sectionTitle}>Your next market <br /> starts with one file.</h1>
                <p className="fs-14">Upload a document and get a clear quote for professional translation. No complicated sales process..</p>
                <p className="fs-12">✓ No obligation   ✓ Transparent pricing   ✓ Fast response</p>
              </div>
              <div className="col-lg-5">
                <div className={styles.quoteForm}>
                  <h3>Get your estimate</h3>

                  <div className="row g-2">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">  <input className={styles.formInput} placeholder="Full name" /> </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">  <input className={styles.formInput} placeholder="Email address" /></div>

                    <input className={styles.formInput} placeholder="From language" />
                    <input className={styles.formInput} placeholder="To language" />
                  </div>
                  <button type="button" className={`${styles.darkBtn} btn rounded-pill fw-bold w-100 mt-2`}>
                    Get my quote →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} container-custom my-lg-5 my-md-4 my-sm-3 my-2`} id="pricing">
          <div className="mb-4">
            <span className={styles.eyebrow}>Pricing</span>
            <div className="row align-items-center">
              <div className="col-lg-8 col-sm-6 col-sm-12 col-12">
                <h2 className={styles.sectionTitle}>Choose the right <br /> way to translate.</h2>
              </div>
              <div className="col-lg-4 col-sm-6 col-sm-12 col-12">
                <p className={styles.sectionDesc}>Clear starting prices for common projects.  For large files, <br /> specialist subjects or recurring business work,  we'll build a  <br />tailored quote.</p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mb-4">
            <div className={styles.toggle}>
              <button
                type="button"
                className={`${styles.toggleBtn} ${billing === "monthly" ? styles.toggleActive : ""}`}
                onClick={() => setBilling("monthly")}
              >
                Pay per document
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${billing === "annual" ? styles.toggleActive : ""}`}
                onClick={() => setBilling("annual")}
              >
                Business plan
              </button>
            </div>
          </div>

          <div className="row g-3">
            {plans.map((p) => (
              <div className="col-lg-4 col-md-4 col-sm-4 col-12" key={p.id}>
                <div className={`${styles.plan} ${p.featured ? styles.planFeatured : ""}`}>
                  {p.featured && <span className={styles.planBadge}>Most popular</span>}
                  <small>{p.name}</small>
                  <h3>{p.name}</h3>
                  <div className="desc">{p.desc}</div>
                  <div className={styles.planPrice}>
                    {p.price} <span>{p.unit}</span>
                  </div>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`btn rounded-pill fw-bold w-100 mt-2 ${p.featured ? "" : "border"}`}
                    style={p.featured ? { background: "var(--color-accent-lime)", color: "var(--color-text)" } : { background: "var(--color-white)" }}
                  >
                    Choose {p.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} container-custom`}>
          <div className="row align-items-center">
            <div className="col-lg-8 col-sm-6 col-sm-12 col-12">
              <h2 className={styles.sectionTitle}>People notice <br /> the difference.</h2>
            </div>
            <div className="col-lg-4 col-sm-6 col-sm-12 col-12">
              <p className={styles.sectionDesc}>Trust is especially important when your document, customer  or global launch depends on the words being right.</p>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-8 col-md-8 col-sm-8  col-12">
              <div className={styles.reviewMain}>
                <div className={styles.reviewGlow}></div>
                <span className={styles.eyebrow} style={{ color: "var(--color-accent-lime)" }}>Customer review</span>
                <div className={styles.reviewQuote}>
                  "The certified translation was accepted on the first try — fast, accurate and exactly formatted the way the embassy needed."
                </div>
                <div className={styles.reviewMeta}>
                  <div className={styles.reviewAvatar}></div>
                  <span>Daniel Ruiz · Certified translation client</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4  col-12">
              <div className="row g-3 h-100">
                <div className="col-12">
                  <div className={styles.score}>
                    <div className={styles.scoreNum}>4.9</div>
                    <div style={{ color: "var(--color-primary)", letterSpacing: "4px" }}>★★★★★</div>
                    <p>Based on 12,000+ verified reviews</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className={styles.miniReview}>
                    <strong>Priya S.</strong>
                    <span>"Delivery was even faster than the estimate. Highly recommend."</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} container-custom`} id="global">
          <div className="mb-4">
            <div className="row align-items-center">
              <p className={styles.eyebrow}>Languages</p>
              <div className="col-lg-8 col-sm-6 col-sm-12 col-12">
                <h2 className={styles.sectionTitle}>Speak to customers <br /> in their language.</h2>
              </div>
              <div className="col-lg-4 col-sm-6 col-sm-12 col-12">
                <p className={styles.sectionDesc}>Build a truly global presence with widely used business languages and regional language support.</p>
              </div>
            </div>
          </div>
          <div className="row g-2">
            {languages.map((l) => (
              <div className="col-lg-2 col-md-3 col-6" key={l}>
                <div className={styles.langCard}>
                  {l} <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} container-custom`}>
          <div className="row g-3">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className={styles.enterpriseCard}>
                <span className={styles.eyebrow}>For teams</span>
                <h3>Centralized billing and team access.</h3>
                <p>Give your whole team a single place to request, track and approve translations, with one consolidated invoice.</p>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <span className={styles.chip}>Team accounts</span>
                  <span className={styles.chip}>Single invoice</span>
                  <span className={styles.chip}>Usage reports</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className={`${styles.enterpriseCard} ${styles.enterpriseTint}`}>
                <span className={styles.eyebrow}>For developers</span>
                <h3>Plug translation into your product.</h3>
                <p>Integrate certified and everyday translation directly into your workflows with a simple, well-documented API.</p>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <span className={styles.chip}>REST API</span>
                  <span className={styles.chip}>Webhooks</span>
                  <span className={styles.chip}>SLA support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} container-custom`} id="global">
          <div className="mb-4">
            <div className="row align-items-center">
              <p className={styles.eyebrow}>Resources</p>
              <div className="col-lg-8 col-sm-6 col-sm-12 col-12">
                <h2 className={styles.sectionTitle}>Ideas for going global.</h2>
              </div>
              <div className="col-lg-4 col-sm-6 col-sm-12 col-12">
                <p className={styles.sectionDesc}>Helpful guidance for international teams, document owners and anyone working across languages.</p>
              </div>
            </div>
            <div className="row align-items-center">
              {cardsData.map((card) => (
                <div className="col-md-4" key={card.id}>
                  <div
                    className="rounded-4 overflow-hidden bg-white h-100"
                    style={{ border: "1px solid #eee" }}
                  >
                    <div
                      style={{
                        background: card.gradient,
                        height: "190px",
                        position: "relative",
                        padding: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          background: "rgba(255,255,255,0.6)",
                          borderRadius: "16px",
                        }}
                      ></div>
                    </div>
                    <div className="p-4">
                      <p
                        className="mb-2 fw-semibold"
                        style={{ fontSize: "12px", letterSpacing: "1px", color: "#5b5bf7" }}
                      >
                        {card.category}
                      </p>
                      <h5 className="fw-bold mb-3">{card.title}</h5>
                      <p className="text-secondary mb-4" style={{ fontSize: "14px" }}>
                        {card.description}
                      </p>
                      <a href="#" className="fw-semibold text-dark text-decoration-none">
                        {card.linkText} &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>

            </div>
          </div>
        </section>

        <section className="container-custom" id="security">
          <div className={styles.security}>
            <div className="row align-items-end g-4">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <span className={styles.eyebrow} style={{ color: "var(--color-accent-lime)" }}>Global by default</span>
                <h3 style={{ color: "white" }} className={styles.sectionTitle}>One translation partner. Every market.</h3>
                <p>
                  From a single certificate to thousands of product strings, Verba is built to support international work at every stage of growth.
                </p>
                <div className="row g-2 mt-3">
                  <div className="col-6"><div className={styles.check}><b>✓</b>65+ languages</div></div>
                  <div className="col-6"><div className={styles.check}><b>✓</b>Global coverage</div></div>
                  <div className="col-6"><div className={styles.check}><b>✓</b>Document expertise</div></div>
                  <div className="col-6"><div className={styles.check}><b>✓</b>Business workflows</div></div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={styles.securityVisual}>
                  <div className={styles.secureTop}>
                    <span>VERBA SECURE WORKSPACE</span>
                    <span>● Protected</span>
                  </div>
                  <div className={styles.shield}>
                    <div className={styles.shieldMark}>A↔文</div>
                  </div>
                  <div className="mt-3">
                    <div className={styles.sline}></div>
                    <div className={styles.sline}></div>
                    <div className={styles.sline}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className={`${styles.section} container-custom`} id="faq">
          <div className="text-center mb-4">
            <span className={styles.eyebrow}>FAQ</span>
            <h2 className={styles.sectionTitle}>Everything you need to know.</h2>
          </div>
          <div className="mx-auto" style={{ maxWidth: "900px" }}>
            {faqs.map((f, i) => (
              <div className={styles.faqItem} key={f.q}>
                <button type="button" className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}
                  <span className={styles.faqPlus}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className={styles.faqAnswer}>{f.a}</div>}
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}











