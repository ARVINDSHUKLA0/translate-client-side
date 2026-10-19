"use client";
import { useState } from "react";
import "./signup.css";
import Link from "next/link";

export default function SignupPage() {
    const [selected, setSelected] = useState("client"); // "client" | "translator"

    return (
        <div className="container-fluid p-0 overflow-hidden">
            <div className="row g-0 min-vh-100" >
                <div className=" col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-center leftSide" >
                    <div className="w-100 px-4 px-md-5 py-5 mx-auto" >
                        <h5 className="fw-bold mb-lg-5 mb-mb-3 mb-2 logo">translate co</h5>

                        <h5 className="fw-bold mb-2 heading">Create your account</h5>
                        <p className="text-secondary mb-4 fs-13">First, tell us why you're here.</p>

                        <div className="row g-3">

                            <div className="col-6">
                                <Link className="text-decoration-none" href="/client-signup">
                                    <div
                                        role="button"
                                        onClick={() => setSelected("client")}
                                        className={`rounded-3 text-center h-100 optionCard ${selected === "client" ? "optionCardSelected" : ""
                                            }`}
                                    >
                                        <div className="mb-lg-3 mb-2">
                                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                                                    fill="#e3d9f7"
                                                />
                                                <path d="M15 2v5h5" fill="#d3c5ee" />
                                                <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#8a7bb0" strokeWidth="1" />
                                                <line x1="7.5" y1="15" x2="16.5" y2="15" stroke="#8a7bb0" strokeWidth="1" />
                                                <line x1="7.5" y1="18" x2="13" y2="18" stroke="#8a7bb0" strokeWidth="1" />
                                            </svg>
                                        </div>
                                        <div className="fw-semibold cardTitle fw-bold text-dark">I need a translation</div>
                                        <div className="text-secondary cardSubtitle">
                                            Post jobs &amp; hire translators
                                        </div>
                                    </div>
                                </Link>
                            </div>


                            <div className="col-6">
                                <Link className="text-decoration-none" href="/translator-signup">
                                <div
                                    role="button"
                                    onClick={() => setSelected("translator")}
                                    className={`rounded-3 text-center h-100 optionCard ${selected === "translator" ? "optionCardSelected" : ""
                                        }`}
                                >
                                    <div className="mb-l-3 mb-2">
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                                            <path d="M14.5 3.5l6 6-11 11H3.5v-6l11-11z" fill="#111" />
                                            <path d="M12.5 5.5l6 6" stroke="#fff" strokeWidth="1" />
                                        </svg>
                                    </div>
                                    <div className="fw-semibold cardTitle fw-bold text-dark">I'm a translator</div>
                                    <div className="text-secondary cardSubtitle">Find work &amp; get paid</div>
                                </div>
                                </Link>
                            </div>
                        </div>

                        <p className="text-center text-secondary mt-4 mb-0 fs-14">
                            Already have an account?{" "}
                            <a href="/login" className="fw-semibold text-decoration-none loginLink">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-12   d-flex align-items-center justify-content-center position-relative rightSide">
                    <div className="position-absolute glow" />

                    <div className="rounded-4 p-4 position-relative testimonialCard ">
                        <div className="mb-3 stars">★ ★ ★ ★ ★</div>
                        <p className="text-white mb-4 quoteText">
                            "We handed off a 40-page legal contract and had a certified
                            translation back in under 30 hours — fully tracked the whole
                            way."
                        </p>
                        <div className="d-flex align-items-center gap-2">
                            <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-semibold avatar">
                                MJ
                            </div>
                            <div>
                                <div className="text-white fw-semibold avatarName">Maya Jensen</div>
                                <div className="text-white-50 avatarRole">Ops Lead, Northwind Legal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}