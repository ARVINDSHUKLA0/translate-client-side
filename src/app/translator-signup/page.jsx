"use client";

import { useState } from "react";
import "./translator-signup.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const API_URL = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

function validatePassword(password) {
    if (password.length < 8 || password.length > 15) {
        return "Password must be 8 to 15 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter (A-Z).";
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return "Password must contain at least one special character, such as @, # or !.";
    }

    return "";
}

function showError(title, message) {
    return Swal.fire({
        position: "top-end",
        icon: "error",
        title,
        text: message,
        showConfirmButton: true,
        confirmButtonText: "OK",
    });
}

function showSuccess(title) {
    return Swal.fire({
        position: "top-end",
        icon: "success",
        title,
        showConfirmButton: false,
        timer: 1500,
    });
}

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: "",
        nativeLanguage: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        const passwordError = validatePassword(formData.password);

        if (passwordError) {
            await showError("Invalid Password", passwordError);
            return;
        }

        try {
            setLoading(true);

            const body = new FormData();

            body.append("fullName", formData.fullName.trim());
            body.append(
                "nativeLanguage",
                formData.nativeLanguage.trim()
            );
            body.append(
                "email",
                formData.email.trim().toLowerCase()
            );
            body.append("password", formData.password);

            const response = await fetch(
                `${API_URL}/api/translator/register`,
                {
                    method: "POST",
                    credentials: "include",
                    body,
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                await showError(
                    "Signup Failed",
                    result.message || "Translator registration failed."
                );
                return;
            }

            await showSuccess(
                "Translator registration successful!"
            );

            setFormData({
                fullName: "",
                nativeLanguage: "",
                email: "",
                password: "",
            });

            setShowPassword(false);

            // Navigate only after successful registration.
            router.push("/login?type=translator");
        } catch (error) {
            await showError(
                "Connection Error",
                error.message || "Unable to connect to the server."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-0 overflow-hidden">
            <div className="row g-0 min-vh-100">
                <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center leftSide mb-3">
                    <div className="w-100 px-4 px-md-5 py-1">
                        <h4 className="fw-bold mb-lg-5 mt-3 mb-3 logo">
                            translate co
                        </h4>

                        <p className="small m-0 fs-14 mb-lg-3 mb-3">
                            <Link
                                className="text-decoration-none custom-hover fw-bold text-secondary"
                                href="/signup"
                            >
                                ← Choose a different account type
                            </Link>
                        </p>

                        <h1 className="fw-bold mb-2 heading">
                            Create your translator account
                        </h1>

                        <p className="text-secondary mb-lg-4 mb-md-3 mb-sm-2 mb-1 small m-0 fs-14">
                            You'll verify your credentials in the next step.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="signupForm"
                        >
                            <div className="row g-3">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <label
                                        htmlFor="fullName"
                                        className="form-label fw-semibold fs-14"
                                    >
                                        Full name
                                    </label>

                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        className="form-control customfontplaceHolder"
                                        placeholder="Noah Carter"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        required
                                    />
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <label
                                        htmlFor="nativeLanguage"
                                        className="form-label fw-semibold fs-14"
                                    >
                                        Native language
                                    </label>

                                    <input
                                        type="text"
                                        id="nativeLanguage"
                                        name="nativeLanguage"
                                        className="form-control customfontplaceHolder"
                                        placeholder="Spanish"
                                        value={formData.nativeLanguage}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold fs-14"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control customfontplaceHolder"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label
                                        htmlFor="password"
                                        className="form-label fw-semibold fs-14"
                                    >
                                        Password
                                    </label>

                                    <div className="position-relative">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="password"
                                            name="password"
                                            className="form-control customfontplaceHolder pe-5"
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) => !prev
                                                )
                                            }
                                            className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-primary text-decoration-none fw-semibold px-3"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>
                                    </div>

                                    <small className="text-secondary">
                                        8–15 characters, at least one uppercase
                                        letter (A–Z) and one special character
                                        (@, #, !).
                                    </small>
                                </div>

                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 fw-semibold"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Creating account..."
                                            : "Create account"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center justify-content-center position-relative rightSide">
                    <div className="position-absolute glow"></div>

                    <div className="rounded-4 p-4 position-relative testimonialCard">
                        <div className="mb-3 stars">
                            ★ ★ ★ ★ ★
                        </div>

                        <p className="text-white mb-4 quoteText">
                            "We handed off a 40-page legal contract and had a
                            certified translation back in under 30 hours —
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
