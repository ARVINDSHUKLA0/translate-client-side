"use client";

import { useState } from "react";
import Link from "next/link"; 
import './forgotPassword.css'

export default function ForgotPasswordPage() {
  const [selected, setSelected] = useState("client");

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Forgot Password:", {
      role: selected,
      email: email,
    });
 
    setSubmitted(true);
  };

  return (
    <div className="container-fluid p-0 overflow-hidden">
      <div className="row g-0 min-vh-100"> 
        <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center leftSide">
          <div className="w-100 px-4 px-md-5 py-4 forgotContent"> 
            <Link href="/" className="text-decoration-none">
              <h4 className="fw-bold mb-lg-5 mb-4 logo">
                translate co
              </h4>
            </Link>

            {!submitted ? (
              <> 
                <Link
                  href="/login"
                  className="text-decoration-none backLink"
                >
                  ← Back to log in
                </Link> 
                <h1 className="fw-bold mt-4 mb-2 heading">
                  Forgot your password?
                </h1>

                <p className="text-secondary mb-4">
                  Enter your email address and we'll send you
                  a link to reset your password.
                </p>
 
                <div className="accountTabs d-flex mb-4">

                  <button
                    type="button"
                    className={`accountTab ${
                      selected === "client"
                        ? "accountTabActive"
                        : ""
                    }`}
                    onClick={() => setSelected("client")}
                  >
                    I'm a client
                  </button>

                  <button
                    type="button"
                    className={`accountTab ${
                      selected === "translator"
                        ? "accountTabActive"
                        : ""
                    }`}
                    onClick={() => setSelected("translator")}
                  >
                    I'm a translator
                  </button>

                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold"
                    >
                      Email address
                    </label>

                    <input
                      type="email"
                      id="email"
                      className="form-control forgotInput"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 forgotButton fw-semibold"
                  >
                    Send reset link
                  </button>

                </form>
 
                <p className="text-center text-secondary mt-4 mb-0">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="text-decoration-none fw-semibold loginLink"
                  >
                    Log in
                  </Link>
                </p>
              </>
            ) : (
              <> 
                <div className="successIcon mb-4">
                  ✓
                </div>

                <h1 className="fw-bold mb-2 heading">
                  Check your email
                </h1>

                <p className="text-secondary mb-4">
                  If an account exists for{" "}
                  <strong>{email}</strong>, we've sent
                  a password reset link.
                </p>

                <Link
                  href="/login"
                  className="btn btn-primary w-100 forgotButton fw-semibold text-decoration-none"
                >
                  Back to log in
                </Link>

                <p className="text-center text-secondary mt-4 mb-0">
                  Didn't receive the email?{" "}
                  <button
                    type="button"
                    className="resendButton"
                    onClick={() => setSubmitted(false)}
                  >
                    Try again
                  </button>
                </p>
              </>
            )}

          </div>
        </div>

 
        <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center justify-content-center position-relative rightSide">
          <div className="position-absolute glow"></div>
          <div className="rounded-4 p-4 position-relative testimonialCard">
            <div className="mb-3 stars">
              ★ ★ ★ ★ ★
            </div>

            <p className="text-white mb-4 quoteText">
              "We handed off a 40-page legal contract and had
              a certified translation back in under 30 hours —
              fully tracked the whole way."
            </p>

            <div className="d-flex align-items-center gap-2">

              <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-semibold avatar">
                MJ
              </div>

              <div>
                <div className="text-white fw-semibold avatarName">
                  Maya Jensen
                </div>

                <div className="text-white-50 avatarRole">
                  Ops Lead, Northwind Legal
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}