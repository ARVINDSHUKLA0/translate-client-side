
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./Solutions.css";

const solutions = [
    {
        tag: "INDIVIDUALS",
        title: <>Important documents,<br />handled with care.</>,
        text: "Birth certificates, academic records, passports, applications and personal documents.",
        items: ["Certified documents", "Personal support", "Secure file handling"],
        button: "For individuals →",
        label: "PERSONAL",
        visual: "Birth certificate",
        reverse: true,
    },
    {
        tag: "LEGAL & FINANCE",
        title: <>Precision where<br />every word matters.</>,
        text: "Contracts, compliance documents, financial reports and regulated communications.",
        items: ["Specialist translators", "Confidential workflows", "Quality review"],
        button: "For legal & finance →",
        label: "CONFIDENTIAL",
        visual: "Agreement.docx",
    },
    {
        tag: "MARKETING",
        title: <>Keep your brand's<br />voice, everywhere.</>,
        text: "Campaigns, websites, product copy and creative content adapted for local audiences.",
        items: ["Brand voice", "Cultural adaptation", "Creative localization"],
        button: "For marketing teams →",
        label: "BRAND VOICE",
        visual: "Make it feel local.",
        reverse: true,
    },
    {
        tag: "TECHNOLOGY",
        title: <>Launch globally without<br />sounding translated.</>,
        text: "Apps, software, help centers, UI strings and product experiences localized for scale.",
        items: ["UI localization", "Product content", "API workflows"],
        button: "For technology teams →",
        label: "PRODUCT",
        visual: "Welcome back.",
    },
];

const Page = () => (
    <>
        <Navbar />

        <main className="mx-lg-2 ms-3 ms-lg-0">
            <section className="py-lg-5 py-md-4 py-sm-3 py-2  overflow-hidden">
                <div className="container-custom py-lg-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="eyebrow mb-3">SOLUTIONS</div>

                            <h1 className="display-1 fw-bold lh-1 mb-4">
                                Translation that
                                <br />
                                understands context.
                            </h1>

                            <p className="lead text-secondary mb-4">
                                Language is never just words. Our solutions are designed
                                around the audience, purpose and market behind every project.
                            </p>

                            <div className="d-flex flex-wrap gap-2">
                                <Link href="#start" className="btn btn-dark rounded-pill px-4 py-3">
                                    Start a translation →
                                </Link>

                                <Link href="/services" className="btn btn-light border rounded-pill px-4 py-3">
                                    Explore services
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="visual">
                                <div className="context-box visual-one">
                                    <div className="kicker">AUDIENCE</div>
                                    <h4 className="fw-bbold fs-12 kicker text-uppercase">People</h4>
                                    <div className="context-line" />
                                    <div className="context-line w-70" />
                                </div>

                                <div className="context-box visual-two">
                                    <div className="kicker">MARKET</div>
                                    <h4 className="fw-bbold fs-12 kicker text-uppercase">Deutschland</h4>
                                    <div className="context-line" />
                                    <div className="context-line w-65" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-lg-5 py-md-4 py-sm-3 py-2">
                <div className="container-custom py-lg-5">
                    <div className="mb-5">
                        <div className="eyebrow mb-3">BUILT AROUND YOUR WORLD</div>

                        <h2 className="display-5 fw-bold">
                            The audience changes.
                            <br />
                            The standard doesn't.
                        </h2>
                    </div>

                    {solutions.map((s, i) => (
                        <div
                            key={i}
                            className={`row align-items-center g-4 py-5 border-top ${s.reverse ? "flex-lg-row-reverse" : ""
                                }`}
                        >
                            <div className="col-12 col-lg-5">
                                <div className="kicker mb-3">{s.tag}</div>

                                <h3 className="display-6 fw-bold lh-1 mb-3">
                                    {s.title}
                                </h3>

                                <p className="text-secondary">{s.text}</p>

                                <div className="my-4">
                                    {s.items.map((item) => (
                                        <div className="mb-2" key={item}>
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <Link href="#" className="btn btn-light border rounded-pill px-4 py-3">
                                    {s.button}
                                </Link>
                            </div>

                            <div className="col-12 col-lg-7">
                                <div className="solution-visual">
                                    <div className="context-box">
                                        <div className="kicker">{s.label}</div>
                                        <h4>{s.visual}</h4>

                                        <div className="context-line" />
                                        <div className="context-line" />
                                        <div className="context-line w-70" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-lg-5 py-md-4 py-sm-3 py-2">
                <div className="container-custom py-lg-5">
                    <div className="row align-items-end g-4 mb-5">
                        <div className="col-lg-7 col-md-7 col-sm-7 col-12">
                            <div className="eyebrow mb-3">FOR TEAMS</div>

                            <h2 className="display-5 fw-bold">
                                One language partner
                                <br />
                                for your whole organization.
                            </h2>
                        </div>

                        <div className="col-lg-5 col-md-5 col-sm-5 col-12">
                            <p className="text-secondary mb-0">
                                Give your team a single place to request, track and approve
                                translations, with one consolidated invoice.
                            </p>
                        </div>
                    </div>

                    <div className="row g-1 team-strip">
                        {[
                            "Team accounts",
                            "Centralized billing",
                            "Usage reports",
                            "Approval workflows",
                            "Dedicated support",
                        ].map((item) => (
                            <div className="col-12 col-md" key={item}>
                                <div>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
 
            <section className="py-lg-5 py-md-4 py-sm-3 py-2">
                <div className="container-custom py-lg-5">
                    <div className="row align-items-end g-4 mb-5">
                        <div className="col-lg-7 col-md-7 col-sm-7 col-12">
                            <div className="eyebrow mb-3">FOR DEVELOPERS</div>

                            <h2 className="display-5 fw-bold">
                                Plug translation
                                <br />
                                into your product.
                            </h2>
                        </div>

                        <div className="col-lg-5 col-md-5 col-sm-5 col-12">
                            <p className="text-secondary mb-0">
                                Integrate certified and everyday translation directly into
                                your workflows with a simple, well-documented API.
                            </p>
                        </div>
                    </div>

                    <div className="api">
                        <span className="accent">POST</span> /v1/translations
                        <br />
                        {"{"}
                        <br />
                        &nbsp;&nbsp;"source": "en",
                        <br />
                        &nbsp;&nbsp;"target": "de",
                        <br />
                        &nbsp;&nbsp;"content": "...",
                        <br />
                        &nbsp;&nbsp;"service": "localization"
                        <br />
                        {"}"}
                        <br /><br />

                        <span className="accent">✓</span> REST API &nbsp;
                        <span className="accent">✓</span> Webhooks &nbsp;
                        <span className="accent">✓</span> SLA support
                    </div>
                </div>
            </section>
 
            <section className="py-lg-5 py-md-4 py-sm-3 py-2" id="start">
                <div className="container-custom py-lg-5">
                    <div className="cta">
                        <div>
                            <div className="eyebrow mb-3">GET STARTED</div>

                            <h2>
                                Ready to make
                                <br />
                                language local?
                            </h2>

                            <p>
                                Tell us what you're translating and we'll help choose
                                the right path.
                            </p>
                        </div>

                        <Link href="#" className="btn btn-lime rounded-pill px-4 py-3">
                            Start a translation →
                        </Link>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </>
);

export default Page;