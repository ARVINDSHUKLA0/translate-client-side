
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import "./login.css";

const API_URL = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialType =
        searchParams.get("type") === "translator"
            ? "translator"
            : "client";

    const [loginType, setLoginType] = useState(initialType);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const type = searchParams.get("type");

        setLoginType(type === "translator" ? "translator" : "client");
    }, [searchParams]);

    const handleTypeChange = (type) => {
        setLoginType(type);

        router.replace(`/login?type=${type}`, {
            scroll: false,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (loading) return;

    //     if (!email.trim() || !password) {
    //         await Swal.fire({
    //             position: "top-end",
    //             icon: "error",
    //             title: "Login Failed",
    //             text: "Please enter your email and password.",
    //             showConfirmButton: true,
    //             confirmButtonText: "OK",
    //         });
    //         return;
    //     }

    //     try {
    //         setLoading(true);

    //         const endpoint =
    //             loginType === "translator"
    //                 ? "/api/translator/login"
    //                 : "/api/client/login";

    //         const response = await fetch(`${API_URL}${endpoint}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             credentials: "include",
    //             body: JSON.stringify({
    //                 email: email.trim().toLowerCase(),
    //                 password,
    //             }),
    //         });

    //         const result = await response.json();

    //         if (!response.ok || !result.success) {
    //             await Swal.fire({
    //                 position: "top-end",
    //                 icon: "error",
    //                 title: "Login Failed",
    //                 text: result.message || "Invalid email or password.",
    //                 showConfirmButton: true,
    //                 confirmButtonText: "OK",
    //             });
    //             return;
    //         }

    //         await Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "Login successful!",
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });

    //         // Translator keeps its existing dashboard navigation.
    //         // Client goes to the home page for now.
    //         if (loginType === "translator") {
    //             router.push("/translator-dashboard");
    //         } else {
    //             router.push("/");
    //         }
    //     } catch (error) {
    //         console.error("LOGIN ERROR:", error);

    //         await Swal.fire({
    //             position: "top-end",
    //             icon: "error",
    //             title: "Connection Error",
    //             text: "Unable to connect to the server. Please try again.",
    //             showConfirmButton: true,
    //             confirmButtonText: "OK",
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    
const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email.trim() || !password) {
        await Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Login Failed",
            text: "Please enter your email and password.",
            showConfirmButton: true,
            confirmButtonText: "OK",
        });
        return;
    }

    try {
        setLoading(true);

        const endpoint =
            loginType === "translator"
                ? "/api/translator/login"
                : "/api/client/login";

        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email: email.trim().toLowerCase(),
                password,
            }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            await Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Login Failed",
                text: result.message || "Invalid email or password.",
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            return;
        }

        // The server must return the real authentication token.
        const token = result.token;

        if (typeof token !== "string" || !token.trim()) {
            await Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Authentication Error",
                text: "Login succeeded, but the server did not return a token. Please check the server login controller.",
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            return;
        }

        // Save the token for the selected account type.
        const storageKey =
            loginType === "translator"
                ? "translatorToken"
                : "clientToken";

        localStorage.setItem(storageKey, token);

        await Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500,
        });

        if (loginType === "translator") {
            router.push("/translator-dashboard");
        } else {
            router.push("/");
        }
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        await Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Connection Error",
            text: "Unable to connect to the server. Please try again.",
            showConfirmButton: true,
            confirmButtonText: "OK",
        });
    } finally {
        setLoading(false);
    }
};


    localStorage.getItem("clientToken")
localStorage.getItem("translatorToken")
    return (
        <div className="container-fluid p-0 overflow-hidden">
            <div className="row g-0 min-vh-100">
                <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center leftSide">
                    <div className="w-100 px-4 px-md-5 py-4">
                        <h4 className="fw-bold mb-5 logo">
                            translate co
                        </h4>

                        <h1 className="fw-bold mb-2 heading">
                            Welcome back
                        </h1>

                        <p className="text-secondary small mb-4">
                            Log in to continue where you left off.
                        </p>

                        <div
                            className="d-flex gap-1 border rounded-3 p-1 mb-4"
                            role="group"
                            aria-label="Choose account type"
                        >
                            <button
                                type="button"
                                className={`btn flex-fill ${
                                    loginType === "client"
                                        ? "btn-light fw-semibold shadow-sm"
                                        : "btn-link text-secondary text-decoration-none"
                                }`}
                                onClick={() => handleTypeChange("client")}
                            >
                                I'm a client
                            </button>

                            <button
                                type="button"
                                className={`btn flex-fill ${
                                    loginType === "translator"
                                        ? "btn-light fw-semibold shadow-sm"
                                        : "btn-link text-secondary text-decoration-none"
                                }`}
                                onClick={() => handleTypeChange("translator")}
                            >
                                I'm a translator
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="form-label fw-semibold"
                                >
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    className="form-control py-2"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="form-label fw-semibold"
                                >
                                    Password
                                </label>

                                <div className="position-relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        className="form-control py-2 pe-5"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        autoComplete="current-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-primary text-decoration-none px-3"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="text-end mb-4">
                                <Link
                                    href="/forgot-password"
                                    className="text-primary text-decoration-none small"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-2 fw-semibold"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </button>
                        </form>

                        <div className="d-flex align-items-center gap-3 my-4">
                            <hr className="flex-grow-1" />
                            <span className="small">or</span>
                            <hr className="flex-grow-1" />
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-secondary w-100 py-2"
                            onClick={() =>
                                Swal.fire({
                                    icon: "info",
                                    title: "Google Login",
                                    text: "Google authentication has not been connected yet.",
                                })
                            }
                        >
                            Continue with Google
                        </button>

                        <p className="text-center text-secondary mt-4 mb-0">
                            Don't have an account?{" "}
                            <Link
                                href={
                                    loginType === "translator"
                                        ? "/translator-signup"
                                        : "/client-signup"
                                }
                                className="text-primary text-decoration-none fw-semibold"
                            >
                                Sign up free
                            </Link>
                        </p>
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
