// "use client";

// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { useCallback, useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const API_BASE_URL = (
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
// ).replace(/\/+$/, "");

// const WISHLIST_API_URL = `${API_BASE_URL}/api/wishlist`;
// const CART_API_URL = `${API_BASE_URL}/api/cart`;

// const formatMoney = (amount, currency = "USD") => {
//     const value = Number(amount ?? 0);

//     try {
//         return new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency,
//             maximumFractionDigits: 2,
//         }).format(value);
//     } catch {
//         return `${currency} ${value.toFixed(2)}`;
//     }
// };

// // Display price only. The real price is always calculated
// // by the server when the service is added to the cart.
// const getDisplayPrice = (service) => {
//     const originalPrice = Number(service.startingPrice ?? 0);

//     const discountValue =
//         service.discount?.enabled === true
//             ? Number(service.discount?.value ?? 0)
//             : 0;

//     const discountAmount =
//         Number.isFinite(discountValue) && discountValue > 0
//             ? Math.min(discountValue, originalPrice)
//             : 0;

//     return {
//         originalPrice,
//         discountedPrice:
//             Math.round((originalPrice - discountAmount) * 100) / 100,
//         hasDiscount: discountAmount > 0,
//         currency: service.startingPriceCurrency || "USD",
//     };
// };

// export default function WishlistPage() {
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [needsLogin, setNeedsLogin] = useState(false);
//     const [busyId, setBusyId] = useState("");

//     // Fetch the logged-in client's wishlist.
//     const loadWishlist = useCallback(async () => {
//         setLoading(true);
//         setError("");
//         setNeedsLogin(false);

//         try {
//             const response = await fetch(WISHLIST_API_URL, {
//                 method: "GET",
//                 credentials: "include",
//                 cache: "no-store",
//             });

//             const result = await response.json().catch(() => ({}));

//             if (response.status === 401) {
//                 setNeedsLogin(true);
//                 setError(result.message || "Please log in to continue.");
//                 return;
//             }

//             if (!response.ok || !result.success) {
//                 setError(result.message || "Unable to load your wishlist.");
//                 return;
//             }

//             setServices(result.wishlist?.services || []);
//         } catch (err) {
//             console.error("LOAD WISHLIST ERROR:", err);
//             setError("Unable to connect to the server.");
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         loadWishlist();
//     }, [loadWishlist]);

//     // Remove a service from the wishlist.
//     const removeItem = async (serviceId) => {
//         setBusyId(serviceId);

//         try {
//             const response = await fetch(
//                 `${WISHLIST_API_URL}/${serviceId}`,
//                 {
//                     method: "DELETE",
//                     credentials: "include",
//                 }
//             );

//             const result = await response.json().catch(() => ({}));

//             if (!response.ok || !result.success) {
//                 alert(result.message || "Unable to remove this service.");
//                 return;
//             }

//             setServices(result.wishlist?.services || []);
//             window.dispatchEvent(new Event("wishlist-updated"));

//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Removed from wishlist",
//                 showConfirmButton: false,
//                 timer: 1500,
//             });
//         } catch (err) {
//             console.error("REMOVE WISHLIST ITEM ERROR:", err);
//             alert("Unable to connect to the server.");
//         } finally {
//             setBusyId("");
//         }
//     };

//     // Add a service to the cart (quantity 1, no add-ons).
//     const addToCart = async (serviceId) => {
//         setBusyId(serviceId);

//         try {
//             const response = await fetch(`${CART_API_URL}/items`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     serviceId,
//                     addonIds: [],
//                     quantity: 1,
//                 }),
//             });

//             const result = await response.json().catch(() => ({}));

//             if (!response.ok || !result.success) {
//                 alert(result.message || "Unable to add service to cart.");
//                 return;
//             }

//             window.dispatchEvent(new Event("cart-updated"));

//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Added to cart",
//                 showConfirmButton: false,
//                 timer: 1500,
//             });
//         } catch (err) {
//             console.error("WISHLIST ADD TO CART ERROR:", err);
//             alert("Unable to connect to the server.");
//         } finally {
//             setBusyId("");
//         }
//     };

//     // Loading state.
//     if (loading) {
//         return (
//             <>
//                 <Navbar />

//                 <main className="container py-5">
//                     <h1 className="h3 fw-bold mb-3">Your Wishlist</h1>
//                     <p className="text-secondary">Loading wishlist...</p>
//                 </main>

//                 <Footer />
//             </>
//         );
//     }

//     // Error and authentication state.
//     if (error) {
//         return (
//             <>
//                 <Navbar />

//                 <main className="container py-5">
//                     <h1 className="h3 fw-bold mb-3">Your Wishlist</h1>

//                     <div className="alert alert-warning" role="alert">
//                         {error}
//                     </div>

//                     {needsLogin ? (
//                         <a href="/login" className="btn btn-primary me-2">
//                             Log In
//                         </a>
//                     ) : (
//                         <button
//                             type="button"
//                             className="btn btn-primary me-2"
//                             onClick={loadWishlist}
//                         >
//                             Try Again
//                         </button>
//                     )}

//                     <a href="/services" className="btn btn-outline-secondary">
//                         Browse Services
//                     </a>
//                 </main>

//                 <Footer />
//             </>
//         );
//     }

//     return (
//         <>
//             <Navbar />

//             <main className="container py-5">
//                 <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
//                     <h1 className="h3 fw-bold mb-0">Your Wishlist</h1>

//                     <a href="/services" className="btn btn-outline-primary">
//                         Browse Services
//                     </a>
//                 </div>

//                 {services.length === 0 ? (
//                     <div className="border rounded p-4 p-md-5 text-center">
//                         <h2 className="h5 mb-2">Your wishlist is empty</h2>

//                         <p className="text-secondary mb-3">
//                             Save services you like and find them here later.
//                         </p>

//                         <a href="/services" className="btn btn-primary">
//                             Browse Services
//                         </a>
//                     </div>
//                 ) : (
//                     <div className="row g-3">
//                         {services.map((service) => {
//                             const price = getDisplayPrice(service);

//                             const thumbnail =
//                                 typeof service.thumbnail === "string"
//                                     ? service.thumbnail
//                                     : service.thumbnail?.url ||
//                                       service.thumbnail?.secure_url ||
//                                       "";

//                             const available = service.status === "active";
//                             const busy = busyId === service._id;

//                             return (
//                                 <div
//                                     className="col-12 col-md-6"
//                                     key={service._id}
//                                 >
//                                     <article className="card h-100">
//                                         <div className="card-body">
//                                             <div className="d-flex gap-3">
//                                                 {thumbnail && (
//                                                     <img
//                                                         src={thumbnail}
//                                                         alt={
//                                                             service.title ||
//                                                             service.name ||
//                                                             "Service"
//                                                         }
//                                                         width="88"
//                                                         height="88"
//                                                         className="rounded border flex-shrink-0"
//                                                         style={{
//                                                             objectFit: "cover",
//                                                         }}
//                                                     />
//                                                 )}

//                                                 <div>
//                                                     <h2 className="h5 mb-2">
//                                                         {service.title ||
//                                                             service.name ||
//                                                             "Service"}
//                                                     </h2>

//                                                     <p className="small text-secondary mb-1">
//                                                         Price:{" "}
//                                                         {price.hasDiscount ? (
//                                                             <>
//                                                                 <span className="text-decoration-line-through me-1">
//                                                                     {formatMoney(
//                                                                         price.originalPrice,
//                                                                         price.currency
//                                                                     )}
//                                                                 </span>
//                                                                 <span className="text-success fw-semibold">
//                                                                     {formatMoney(
//                                                                         price.discountedPrice,
//                                                                         price.currency
//                                                                     )}
//                                                                 </span>
//                                                             </>
//                                                         ) : (
//                                                             formatMoney(
//                                                                 price.originalPrice,
//                                                                 price.currency
//                                                             )
//                                                         )}
//                                                     </p>

//                                                     {!available && (
//                                                         <p className="small text-danger mb-0">
//                                                             This service is not
//                                                             currently available.
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <hr />

//                                             <div className="d-flex flex-wrap gap-2">
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-primary btn-sm"
//                                                     disabled={
//                                                         !available || busy
//                                                     }
//                                                     onClick={() =>
//                                                         addToCart(service._id)
//                                                     }
//                                                 >
//                                                     {busy
//                                                         ? "Please wait..."
//                                                         : "Add to Cart"}
//                                                 </button>

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-outline-danger btn-sm ms-auto"
//                                                     disabled={busy}
//                                                     onClick={() =>
//                                                         removeItem(service._id)
//                                                     }
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </article>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </main>

//             <Footer />
//         </>
//     );
// }


















"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_BASE_URL = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const WISHLIST_API_URL = `${API_BASE_URL}/api/wishlist`;
const CART_API_URL = `${API_BASE_URL}/api/cart`;

// Small message in the corner. It is shown above the fixed navbar
// and does not dim the page.
const showToast = (icon, title) =>
    Swal.fire({
        toast: true,
        position: "top-end",
        icon,
        title,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
            const container = Swal.getContainer();

            if (container) {
                container.style.zIndex = "999999";
            }
        },
    });

const formatMoney = (amount, currency = "USD") => {
    const value = Number(amount ?? 0);

    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
        }).format(value);
    } catch {
        return `${currency} ${value.toFixed(2)}`;
    }
};

// Display price only. The real price is always calculated
// by the server when the service is added to the cart.
const getDisplayPrice = (service) => {
    const originalPrice = Number(service.startingPrice ?? 0);

    const discountValue =
        service.discount?.enabled === true
            ? Number(service.discount?.value ?? 0)
            : 0;

    const discountAmount =
        Number.isFinite(discountValue) && discountValue > 0
            ? Math.min(discountValue, originalPrice)
            : 0;

    return {
        originalPrice,
        discountedPrice:
            Math.round((originalPrice - discountAmount) * 100) / 100,
        hasDiscount: discountAmount > 0,
        currency: service.startingPriceCurrency || "USD",
    };
};

export default function WishlistPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [needsLogin, setNeedsLogin] = useState(false);
    const [busyId, setBusyId] = useState("");

    // Fetch the logged-in client's wishlist.
    const loadWishlist = useCallback(async () => {
        setLoading(true);
        setError("");
        setNeedsLogin(false);

        try {
            const response = await fetch(WISHLIST_API_URL, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });

            const result = await response.json().catch(() => ({}));

            if (response.status === 401) {
                setNeedsLogin(true);
                setError(result.message || "Please log in to continue.");
                return;
            }

            if (!response.ok || !result.success) {
                setError(result.message || "Unable to load your wishlist.");
                return;
            }

            setServices(result.wishlist?.services || []);
        } catch (err) {
            console.error("LOAD WISHLIST ERROR:", err);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadWishlist();
    }, [loadWishlist]);

    // Remove a service from the wishlist.
    const removeItem = async (serviceId) => {
        setBusyId(serviceId);

        try {
            const response = await fetch(
                `${WISHLIST_API_URL}/${serviceId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                alert(result.message || "Unable to remove this service.");
                return;
            }

            setServices(result.wishlist?.services || []);
            window.dispatchEvent(new Event("wishlist-updated"));

            // Removed = info icon.
            showToast("info", "Removed from wishlist");
        } catch (err) {
            console.error("REMOVE WISHLIST ITEM ERROR:", err);
            alert("Unable to connect to the server.");
        } finally {
            setBusyId("");
        }
    };

    // Add a service to the cart (quantity 1, no add-ons).
    const addToCart = async (serviceId) => {
        setBusyId(serviceId);

        try {
            const response = await fetch(`${CART_API_URL}/items`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    serviceId,
                    addonIds: [],
                    quantity: 1,
                }),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                alert(result.message || "Unable to add service to cart.");
                return;
            }

            window.dispatchEvent(new Event("cart-updated"));

            showToast("success", "Added to cart");
        } catch (err) {
            console.error("WISHLIST ADD TO CART ERROR:", err);
            alert("Unable to connect to the server.");
        } finally {
            setBusyId("");
        }
    };

    // Loading state.
    if (loading) {
        return (
            <>
                <Navbar />

                <main className="container py-5">
                    <h1 className="h3 fw-bold mb-3">Your Wishlist</h1>
                    <p className="text-secondary">Loading wishlist...</p>
                </main>

                <Footer />
            </>
        );
    }

    // Error and authentication state.
    if (error) {
        return (
            <>
                <Navbar />

                <main className="container py-5">
                    <h1 className="h3 fw-bold mb-3">Your Wishlist</h1>

                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>

                    {needsLogin ? (
                        <a href="/login" className="btn btn-primary me-2">
                            Log In
                        </a>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-primary me-2"
                            onClick={loadWishlist}
                        >
                            Try Again
                        </button>
                    )}

                    <a href="/services" className="btn btn-outline-secondary">
                        Browse Services
                    </a>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="container py-5">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                    <h1 className="h3 fw-bold mb-0">Your Wishlist</h1>

                    <a href="/services" className="btn btn-outline-primary">
                        Browse Services
                    </a>
                </div>

                {services.length === 0 ? (
                    <div className="border rounded p-4 p-md-5 text-center">
                        <h2 className="h5 mb-2">Your wishlist is empty</h2>

                        <p className="text-secondary mb-3">
                            Save services you like and find them here later.
                        </p>

                        <a href="/services" className="btn btn-primary">
                            Browse Services
                        </a>
                    </div>
                ) : (
                    <div className="row g-3">
                        {services.map((service) => {
                            const price = getDisplayPrice(service);

                            const thumbnail =
                                typeof service.thumbnail === "string"
                                    ? service.thumbnail
                                    : service.thumbnail?.url ||
                                      service.thumbnail?.secure_url ||
                                      "";

                            const available = service.status === "active";
                            const busy = busyId === service._id;

                            return (
                                <div
                                    className="col-12 col-md-6"
                                    key={service._id}
                                >
                                    <article className="card h-100">
                                        <div className="card-body">
                                            <div className="d-flex gap-3">
                                                {thumbnail && (
                                                    <img
                                                        src={thumbnail}
                                                        alt={
                                                            service.title ||
                                                            service.name ||
                                                            "Service"
                                                        }
                                                        width="88"
                                                        height="88"
                                                        className="rounded border flex-shrink-0"
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                )}

                                                <div>
                                                    <h2 className="h5 mb-2">
                                                        {service.title ||
                                                            service.name ||
                                                            "Service"}
                                                    </h2>

                                                    <p className="small text-secondary mb-1">
                                                        Price:{" "}
                                                        {price.hasDiscount ? (
                                                            <>
                                                                <span className="text-decoration-line-through me-1">
                                                                    {formatMoney(
                                                                        price.originalPrice,
                                                                        price.currency
                                                                    )}
                                                                </span>
                                                                <span className="text-success fw-semibold">
                                                                    {formatMoney(
                                                                        price.discountedPrice,
                                                                        price.currency
                                                                    )}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            formatMoney(
                                                                price.originalPrice,
                                                                price.currency
                                                            )
                                                        )}
                                                    </p>

                                                    {!available && (
                                                        <p className="small text-danger mb-0">
                                                            This service is not
                                                            currently available.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="d-flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    disabled={
                                                        !available || busy
                                                    }
                                                    onClick={() =>
                                                        addToCart(service._id)
                                                    }
                                                >
                                                    {busy
                                                        ? "Please wait..."
                                                        : "Add to Cart"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm ms-auto"
                                                    disabled={busy}
                                                    onClick={() =>
                                                        removeItem(service._id)
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}
