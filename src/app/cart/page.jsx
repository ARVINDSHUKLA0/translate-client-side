
// "use client";

// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { useCallback, useEffect, useState } from "react";

// const API_BASE_URL = (
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
// ).replace(/\/+$/, "");

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

// export default function CartPage() {
//     const [cart, setCart] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [busyItem, setBusyItem] = useState("");

//     // Fetch the logged-in client's cart from the server.
//     const loadCart = useCallback(async () => {
//         setLoading(true);
//         setError("");

//         try {
//             const response = await fetch(CART_API_URL, {
//                 method: "GET",
//                 credentials: "include",
//                 cache: "no-store",
//             });

//             const result = await response.json();

//             if (!response.ok || !result.success) {
//                 setError(
//                     result.message || "Unable to load your cart."
//                 );
//                 return;
//             }

//             setCart(result.cart);
//         } catch (err) {
//             console.error("LOAD CART ERROR:", err);
//             setError("Unable to connect to the server.");
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         loadCart();
//     }, [loadCart]);

//     // Update an item's quantity.
//     const updateQuantity = async (itemId, quantity) => {
//         if (quantity < 1 || quantity > 100) {
//             return;
//         }

//         setBusyItem(itemId);

//         try {
//             const response = await fetch(
//                 `${CART_API_URL}/items/${itemId}`,
//                 {
//                     method: "PATCH",
//                     credentials: "include",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ quantity }),
//                 }
//             );

//             const result = await response.json();

//             if (!response.ok || !result.success) {
//                 alert(
//                     result.message || "Unable to update quantity."
//                 );
//                 return;
//             }

//             setCart(result.cart);
//         } catch (err) {
//             console.error("UPDATE QUANTITY ERROR:", err);
//             alert("Unable to connect to the server.");
//         } finally {
//             setBusyItem("");
//         }
//     };

//     // Remove an item from the cart.
//     const removeItem = async (itemId) => {
//         setBusyItem(itemId);

//         try {
//             const response = await fetch(
//                 `${CART_API_URL}/items/${itemId}`,
//                 {
//                     method: "DELETE",
//                     credentials: "include",
//                 }
//             );

//             const result = await response.json();

//             if (!response.ok || !result.success) {
//                 alert(
//                     result.message || "Unable to remove this item."
//                 );
//                 return;
//             }

//             setCart(result.cart);
//         } catch (err) {
//             console.error("REMOVE CART ITEM ERROR:", err);
//             alert("Unable to connect to the server.");
//         } finally {
//             setBusyItem("");
//         }
//     };

//     // Loading state.
//     if (loading) {
//         return (
//             <main className="container py-5">
//                 <h1 className="h3 fw-bold mb-3">Your Cart</h1>
//                 <p className="text-secondary">Loading cart...</p>
//             </main>
//         );
//     }

//     // Error and authentication state.
//     if (error) {
//         const needsLogin = error.toLowerCase().includes("log in");

//         return (
//             <main className="container py-5">
//                 <h1 className="h3 fw-bold mb-3">Your Cart</h1>

//                 <div className="alert alert-warning" role="alert">
//                     {error}
//                 </div>

//                 {needsLogin ? (
//                     <a
//                         href="/login"
//                         className="btn btn-primary me-2"
//                     >
//                         Log In
//                     </a>
//                 ) : (
//                     <button
//                         type="button"
//                         className="btn btn-primary me-2"
//                         onClick={loadCart}
//                     >
//                         Try Again
//                     </button>
//                 )}

//                 <a href="/" className="btn btn-outline-secondary">
//                     Continue Shopping
//                 </a>
//             </main>
//         );
//     }

//     const items = cart?.items || [];

//     return (
//         <>
//             <Navbar />

//             <main className="container py-5">
//                 <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
//                     <h1 className="h3 fw-bold mb-0">Your Cart</h1>

//                     <a href="/" className="btn btn-outline-primary">
//                         Continue Shopping
//                     </a>
//                 </div>

//                 {/* Empty cart */}
//                 {items.length === 0 ? (
//                     <div className="border rounded p-4 p-md-5 text-center">
//                         <h2 className="h5 mb-2">Your cart is empty</h2>

//                         <p className="text-secondary mb-3">
//                             Browse our services and add a service to your cart.
//                         </p>

//                         <a href="/" className="btn btn-primary">
//                             Browse Services
//                         </a>
//                     </div>
//                 ) : (
//                     <div className="row g-4">
//                         {/* Cart items */}
//                         <section className="col-12 col-lg-8">
//                             {items.map((item) => {
//                                 const service = item.service || {};
//                                 const currency =
//                                     item.currency ||
//                                     service.startingPriceCurrency ||
//                                     "USD";

//                                 const thumbnail =
//                                     typeof service.thumbnail === "string"
//                                         ? service.thumbnail
//                                         : service.thumbnail?.url ||
//                                         service.thumbnail?.secure_url ||
//                                         "";

//                                 return (
//                                     <article
//                                         className="card mb-3"
//                                         key={item._id}
//                                     >
//                                         <div className="card-body">
//                                             <div className="d-flex justify-content-between align-items-start gap-3">
//                                                 <div className="d-flex gap-3">
//                                                     {thumbnail && (
//                                                         <img
//                                                             src={thumbnail}
//                                                             alt={
//                                                                 service.title ||
//                                                                 "Service"
//                                                             }
//                                                             width="88"
//                                                             height="88"
//                                                             className="rounded border flex-shrink-0"
//                                                             style={{
//                                                                 objectFit: "cover",
//                                                             }}
//                                                         />
//                                                     )}

//                                                     <div>
//                                                         <h2 className="h5 mb-2">
//                                                             {service.title ||
//                                                                 "Service"}
//                                                         </h2>
//                                                         <p className="small text-secondary mb-1">
//                                                             Price:{" "}
//                                                             {formatMoney(
//                                                                 service.startingPrice ?? service.price ?? 0,
//                                                                 service.startingPriceCurrency || currency || "USD"
//                                                             )}
//                                                         </p>


//                                                         {(item.addons || []).map(
//                                                             (addon) => (
//                                                                 <p
//                                                                     key={addon._id}
//                                                                     className="small text-secondary mb-1"
//                                                                 >
//                                                                     {addon.name}:{" "}
//                                                                     {formatMoney(
//                                                                         addon.price,
//                                                                         currency
//                                                                     )}
//                                                                 </p>
//                                                             )
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 <strong className="text-nowrap">
//                                                     {formatMoney(
//                                                         item.lineTotal,
//                                                         currency
//                                                     )}
//                                                 </strong>
//                                             </div>

//                                             <hr />

//                                             <div className="d-flex align-items-center flex-wrap gap-2">
//                                                 <span className="small">
//                                                     Quantity:
//                                                 </span>

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-outline-secondary btn-sm"
//                                                     aria-label="Decrease quantity"
//                                                     disabled={
//                                                         item.quantity <= 1 ||
//                                                         busyItem === item._id
//                                                     }
//                                                     onClick={() =>
//                                                         updateQuantity(
//                                                             item._id,
//                                                             item.quantity - 1
//                                                         )
//                                                     }
//                                                 >
//                                                     −
//                                                 </button>

//                                                 <span className="px-2">
//                                                     {item.quantity}
//                                                 </span>

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-outline-secondary btn-sm"
//                                                     aria-label="Increase quantity"
//                                                     disabled={
//                                                         item.quantity >= 100 ||
//                                                         busyItem === item._id
//                                                     }
//                                                     onClick={() =>
//                                                         updateQuantity(
//                                                             item._id,
//                                                             item.quantity + 1
//                                                         )
//                                                     }
//                                                 >
//                                                     +
//                                                 </button>

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-outline-danger btn-sm ms-sm-auto"
//                                                     disabled={
//                                                         busyItem === item._id
//                                                     }
//                                                     onClick={() =>
//                                                         removeItem(item._id)
//                                                     }
//                                                 >
//                                                     {busyItem === item._id
//                                                         ? "Please wait..."
//                                                         : "Remove"}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </article>
//                                 );
//                             })}
//                         </section>

//                         {/* Order summary */}
//                         <aside className="col-12 col-lg-4">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <h2 className="h5 fw-bold mb-3">
//                                         Order Summary
//                                     </h2>

//                                     <div className="d-flex justify-content-between mb-2">
//                                         <span className="text-secondary">
//                                             Total quantity
//                                         </span>

//                                         <span>{cart?.itemCount ?? 0}</span>
//                                     </div>

//                                     <hr />

//                                     {cart?.mixedCurrencies ? (
//                                         <div
//                                             className="alert alert-warning small"
//                                             role="alert"
//                                         >
//                                             Your cart contains multiple currencies.
//                                             The total needs currency conversion
//                                             handling before checkout.
//                                         </div>
//                                     ) : (
//                                         <div className="d-flex justify-content-between gap-3">
//                                             <strong>Subtotal</strong>

//                                             <strong>
//                                                 {formatMoney(
//                                                     cart?.subtotal,
//                                                     cart?.currency || "USD"
//                                                 )}
//                                             </strong>
//                                         </div>
//                                     )}

//                                     <p className="small text-secondary mt-3 mb-0">
//                                         Checkout will be connected after Cart and
//                                         Wishlist APIs are tested.
//                                     </p>
//                                 </div>
//                             </div>
//                         </aside>
//                     </div>
//                 )}
//             </main>
//             <Footer />
//         </>
//     );
// }










// "use client";

// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { useCallback, useEffect, useState } from "react";

// const API_BASE_URL = (
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
// ).replace(/\/+$/, "");

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

// export default function CartPage() {
//     const [cart, setCart] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [busyItem, setBusyItem] = useState("");

//     // Fetch the logged-in client's cart from the server.
//     const loadCart = useCallback(async () => {
//         setLoading(true);
//         setError("");

//         try {
//             const response = await fetch(CART_API_URL, {
//                 method: "GET",
//                 credentials: "include",
//                 cache: "no-store",
//             });

//             const result = await response.json();

//             if (!response.ok || !result.success) {
//                 setError(
//                     result.message || "Unable to load your cart."
//                 );
//                 return;
//             }

//             setCart(result.cart);
//         } catch (err) {
//             console.error("LOAD CART ERROR:", err);
//             setError("Unable to connect to the server.");
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         loadCart();
//     }, [loadCart]);

//     // Update an item's quantity.
//     const updateQuantity = async (itemId, quantity) => {
//         if (quantity < 1 || quantity > 100) {
//             return;
//         }

//         setBusyItem(itemId);

//         try {
//             const response = await fetch(
//                 `${CART_API_URL}/items/${itemId}`,
//                 {
//                     method: "PATCH",
//                     credentials: "include",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ quantity }),
//                 }
//             );

//             const result = await response.json();

//             if (!response.ok || !result.success) {
//                 alert(
//                     result.message || "Unable to update quantity."
//                 );
//                 return;
//             }

//             setCart(result.cart);
//         } catch (err) {
//             console.error("UPDATE QUANTITY ERROR:", err);
//             alert("Unable to connect to the server.");
//         } finally {
//             setBusyItem("");
//         }
//     };

//     // Remove an item from the cart.
//     const removeItem = async (itemId) => {
//         setBusyItem(itemId);

//         try {
//             const response = await fetch(
//                 `${CART_API_URL}/items/${itemId}`,
//                 {
//                     method: "DELETE",
//                     credentials: "include",
//                 }
//             );

//             const result = await response.json();

//             if (!response.ok || !result.success) {
//                 alert(
//                     result.message || "Unable to remove this item."
//                 );
//                 return;
//             }

//             setCart(result.cart);
//         } catch (err) {
//             console.error("REMOVE CART ITEM ERROR:", err);
//             alert("Unable to connect to the server.");
//         } finally {
//             setBusyItem("");
//         }
//     };

//     // Loading state.
//     if (loading) {
//         return (
//             <main className="container py-5">
//                 <h1 className="h3 fw-bold mb-3">Your Cart</h1>
//                 <p className="text-secondary">Loading cart...</p>
//             </main>
//         );
//     }

//     // Error and authentication state.
//     if (error) {
//         const needsLogin = error.toLowerCase().includes("log in");

//         return (
//             <main className="container py-5">
//                 <h1 className="h3 fw-bold mb-3">Your Cart</h1>

//                 <div className="alert alert-warning" role="alert">
//                     {error}
//                 </div>

//                 {needsLogin ? (
//                     <a
//                         href="/login"
//                         className="btn btn-primary me-2"
//                     >
//                         Log In
//                     </a>
//                 ) : (
//                     <button
//                         type="button"
//                         className="btn btn-primary me-2"
//                         onClick={loadCart}
//                     >
//                         Try Again
//                     </button>
//                 )}

//                 <a href="/" className="btn btn-outline-secondary">
//                     Continue Shopping
//                 </a>
//             </main>
//         );
//     }

//     const items = cart?.items || [];

//     return (
//         <>
//             <Navbar />

//             <main className="container py-5">
//                 <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
//                     <h1 className="h3 fw-bold mb-0">Your Cart</h1>

//                     <a href="/" className="btn btn-outline-primary">
//                         Continue Shopping
//                     </a>
//                 </div>

//                 {/* Empty cart */}
//                 {items.length === 0 ? (
//                     <div className="border rounded p-4 p-md-5 text-center">
//                         <h2 className="h5 mb-2">Your cart is empty</h2>

//                         <p className="text-secondary mb-3">
//                             Browse our services and add a service to your cart.
//                         </p>

//                         <a href="/" className="btn btn-primary">
//                             Browse Services
//                         </a>
//                     </div>
//                 ) : (
//                     <div className="row g-4">
//                         {/* Cart items */}
//                         <section className="col-12 col-lg-8">
//                             {items.map((item) => {
//                                 const service = item.service || {};
//                                 const pricing = item.pricing || {};
//                                 const currency =
//                                     item.currency ||
//                                     service.startingPriceCurrency ||
//                                     "USD";

//                                 const thumbnail =
//                                     typeof service.thumbnail === "string"
//                                         ? service.thumbnail
//                                         : service.thumbnail?.url ||
//                                         service.thumbnail?.secure_url ||
//                                         "";

//                                 return (
//                                     <article
//                                         className="card mb-3"
//                                         key={item._id}
//                                     >
//                                         <div className="card-body">
//                                             <div className="d-flex justify-content-between align-items-start gap-3">
//                                                 <div className="d-flex gap-3">
//                                                     {thumbnail && (
//                                                         <img
//                                                             src={thumbnail}
//                                                             alt={
//                                                                 service.title ||
//                                                                 "Service"
//                                                             }
//                                                             width="88"
//                                                             height="88"
//                                                             className="rounded border flex-shrink-0"
//                                                             style={{
//                                                                 objectFit: "cover",
//                                                             }}
//                                                         />
//                                                     )}

//                                                     <div>
//                                                         <h2 className="h5 mb-2">
//                                                             {service.title ||
//                                                                 "Service"}
//                                                         </h2>
//                                                         <p className="small text-secondary mb-1">
//                                                             Price:{" "}
//                                                             {pricing.discountEnabled &&
//                                                             pricing.discountAmount > 0 ? (
//                                                                 <>
//                                                                     <span className="text-decoration-line-through me-1">
//                                                                         {formatMoney(
//                                                                             pricing.originalPrice,
//                                                                             currency
//                                                                         )}
//                                                                     </span>
//                                                                     <span className="text-success fw-semibold">
//                                                                         {formatMoney(
//                                                                             pricing.discountedPrice,
//                                                                             currency
//                                                                         )}
//                                                                     </span>
//                                                                 </>
//                                                             ) : (
//                                                                 formatMoney(
//                                                                     pricing.originalPrice ??
//                                                                         service.startingPrice ??
//                                                                         service.price ??
//                                                                         0,
//                                                                     currency
//                                                                 )
//                                                             )}
//                                                         </p>


//                                                         {(item.addons || []).map(
//                                                             (addon) => (
//                                                                 <p
//                                                                     key={addon._id}
//                                                                     className="small text-secondary mb-1"
//                                                                 >
//                                                                     {addon.name}:{" "}
//                                                                     {formatMoney(
//                                                                         addon.price,
//                                                                         currency
//                                                                     )}
//                                                                 </p>
//                                                             )
//                                                         )}

//                                                         {item.unavailable && (
//                                                             <div
//                                                                 className="alert alert-warning small py-1 px-2 mt-2 mb-0"
//                                                                 role="alert"
//                                                             >
//                                                                 {(item.issues || []).join(" ")}{" "}
//                                                                 Please remove this item.
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 <strong className="text-nowrap">
//                                                     {item.unavailable
//                                                         ? "Unavailable"
//                                                         : formatMoney(
//                                                               item.lineTotal,
//                                                               currency
//                                                           )}
//                                                 </strong>
//                                             </div>

//                                             <hr />

//                                             <div className="d-flex align-items-center flex-wrap gap-2">
//                                                 <span className="small">
//                                                     Quantity:
//                                                 </span>

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-outline-secondary btn-sm"
//                                                     aria-label="Decrease quantity"
//                                                     disabled={
//                                                         item.quantity <= 1 ||
//                                                         busyItem === item._id
//                                                     }
//                                                     onClick={() =>
//                                                         updateQuantity(
//                                                             item._id,
//                                                             item.quantity - 1
//                                                         )
//                                                     }
//                                                 >
//                                                     −
//                                                 </button>

//                                                 <span className="px-2">
//                                                     {item.quantity}
//                                                 </span>

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-outline-secondary btn-sm"
//                                                     aria-label="Increase quantity"
//                                                     disabled={
//                                                         item.quantity >= 100 ||
//                                                         busyItem === item._id
//                                                     }
//                                                     onClick={() =>
//                                                         updateQuantity(
//                                                             item._id,
//                                                             item.quantity + 1
//                                                         )
//                                                     }
//                                                 >
//                                                     +
//                                                 </button>

//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-outline-danger btn-sm ms-sm-auto"
//                                                     disabled={
//                                                         busyItem === item._id
//                                                     }
//                                                     onClick={() =>
//                                                         removeItem(item._id)
//                                                     }
//                                                 >
//                                                     {busyItem === item._id
//                                                         ? "Please wait..."
//                                                         : "Remove"}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </article>
//                                 );
//                             })}
//                         </section>

//                         {/* Order summary */}
//                         <aside className="col-12 col-lg-4">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <h2 className="h5 fw-bold mb-3">
//                                         Order Summary
//                                     </h2>

//                                     <div className="d-flex justify-content-between mb-2">
//                                         <span className="text-secondary">
//                                             Total quantity
//                                         </span>

//                                         <span>{cart?.itemCount ?? 0}</span>
//                                     </div>

//                                     <hr />

//                                     {cart?.hasUnavailableItems && (
//                                         <div
//                                             className="alert alert-warning small"
//                                             role="alert"
//                                         >
//                                             Some items are unavailable and are not
//                                             included in the subtotal.
//                                         </div>
//                                     )}

//                                     {cart?.mixedCurrencies ? (
//                                         <div
//                                             className="alert alert-warning small"
//                                             role="alert"
//                                         >
//                                             Your cart contains multiple currencies.
//                                             The total needs currency conversion
//                                             handling before checkout.
//                                         </div>
//                                     ) : (
//                                         <div className="d-flex justify-content-between gap-3">
//                                             <strong>Subtotal</strong>

//                                             <strong>
//                                                 {formatMoney(
//                                                     cart?.subtotal,
//                                                     cart?.currency || "USD"
//                                                 )}
//                                             </strong>
//                                         </div>
//                                     )}

//                                     <p className="small text-secondary mt-3 mb-0">
//                                         Checkout will be connected after Cart and
//                                         Wishlist APIs are tested.
//                                     </p>
//                                 </div>
//                             </div>
//                         </aside>
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

const API_BASE_URL = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const CART_API_URL = `${API_BASE_URL}/api/cart`;

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

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [busyItem, setBusyItem] = useState("");

    // Fetch the logged-in client's cart from the server.
    const loadCart = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(CART_API_URL, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                setError(
                    result.message || "Unable to load your cart."
                );
                return;
            }

            setCart(result.cart);
        } catch (err) {
            console.error("LOAD CART ERROR:", err);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    // Update an item's quantity.
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1 || quantity > 100) {
            return;
        }

        setBusyItem(itemId);

        try {
            const response = await fetch(
                `${CART_API_URL}/items/${itemId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ quantity }),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                alert(
                    result.message || "Unable to update quantity."
                );
                return;
            }

            setCart(result.cart);

            // Tell the Navbar to refresh the cart count.
            window.dispatchEvent(new Event("cart-updated"));
        } catch (err) {
            console.error("UPDATE QUANTITY ERROR:", err);
            alert("Unable to connect to the server.");
        } finally {
            setBusyItem("");
        }
    };

    // Remove an item from the cart.
    const removeItem = async (itemId) => {
        setBusyItem(itemId);

        try {
            const response = await fetch(
                `${CART_API_URL}/items/${itemId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                alert(
                    result.message || "Unable to remove this item."
                );
                return;
            }

            setCart(result.cart);

            // Tell the Navbar to refresh the cart count.
            window.dispatchEvent(new Event("cart-updated"));
        } catch (err) {
            console.error("REMOVE CART ITEM ERROR:", err);
            alert("Unable to connect to the server.");
        } finally {
            setBusyItem("");
        }
    };

    // Loading state.
    if (loading) {
        return (
            <main className="container py-5">
                <h1 className="h3 fw-bold mb-3">Your Cart</h1>
                <p className="text-secondary">Loading cart...</p>
            </main>
        );
    }

    // Error and authentication state.
    if (error) {
        const needsLogin = error.toLowerCase().includes("log in");

        return (
            <main className="container py-5">
                <h1 className="h3 fw-bold mb-3">Your Cart</h1>

                <div className="alert alert-warning" role="alert">
                    {error}
                </div>

                {needsLogin ? (
                    <a
                        href="/login"
                        className="btn btn-primary me-2"
                    >
                        Log In
                    </a>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary me-2"
                        onClick={loadCart}
                    >
                        Try Again
                    </button>
                )}

                <a href="/" className="btn btn-outline-secondary">
                    Continue Shopping
                </a>
            </main>
        );
    }

    const items = cart?.items || [];

    return (
        <>
            <Navbar />

            <main className="container py-5">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                    <h1 className="h3 fw-bold mb-0">Your Cart</h1>

                    <a href="/" className="btn btn-outline-primary">
                        Continue Shopping
                    </a>
                </div>

                {/* Empty cart */}
                {items.length === 0 ? (
                    <div className="border rounded p-4 p-md-5 text-center">
                        <h2 className="h5 mb-2">Your cart is empty</h2>

                        <p className="text-secondary mb-3">
                            Browse our services and add a service to your cart.
                        </p>

                        <a href="/" className="btn btn-primary">
                            Browse Services
                        </a>
                    </div>
                ) : (
                    <div className="row g-4">
                        {/* Cart items */}
                        <section className="col-12 col-lg-8">
                            {items.map((item) => {
                                const service = item.service || {};
                                const pricing = item.pricing || {};
                                const currency =
                                    item.currency ||
                                    service.startingPriceCurrency ||
                                    "USD";

                                const thumbnail =
                                    typeof service.thumbnail === "string"
                                        ? service.thumbnail
                                        : service.thumbnail?.url ||
                                        service.thumbnail?.secure_url ||
                                        "";

                                return (
                                    <article
                                        className="card mb-3"
                                        key={item._id}
                                    >
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start gap-3">
                                                <div className="d-flex gap-3">
                                                    {thumbnail && (
                                                        <img
                                                            src={thumbnail}
                                                            alt={
                                                                service.title ||
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
                                                                "Service"}
                                                        </h2>
                                                        <p className="small text-secondary mb-1">
                                                            Price:{" "}
                                                            {pricing.discountEnabled &&
                                                            pricing.discountAmount > 0 ? (
                                                                <>
                                                                    <span className="text-decoration-line-through me-1">
                                                                        {formatMoney(
                                                                            pricing.originalPrice,
                                                                            currency
                                                                        )}
                                                                    </span>
                                                                    <span className="text-success fw-semibold">
                                                                        {formatMoney(
                                                                            pricing.discountedPrice,
                                                                            currency
                                                                        )}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                formatMoney(
                                                                    pricing.originalPrice ??
                                                                        service.startingPrice ??
                                                                        service.price ??
                                                                        0,
                                                                    currency
                                                                )
                                                            )}
                                                        </p>


                                                        {(item.addons || []).map(
                                                            (addon) => (
                                                                <p
                                                                    key={addon._id}
                                                                    className="small text-secondary mb-1"
                                                                >
                                                                    {addon.name}:{" "}
                                                                    {formatMoney(
                                                                        addon.price,
                                                                        currency
                                                                    )}
                                                                </p>
                                                            )
                                                        )}

                                                        {item.unavailable && (
                                                            <div
                                                                className="alert alert-warning small py-1 px-2 mt-2 mb-0"
                                                                role="alert"
                                                            >
                                                                {(item.issues || []).join(" ")}{" "}
                                                                Please remove this item.
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <strong className="text-nowrap">
                                                    {item.unavailable
                                                        ? "Unavailable"
                                                        : formatMoney(
                                                              item.lineTotal,
                                                              currency
                                                          )}
                                                </strong>
                                            </div>

                                            <hr />

                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <span className="small">
                                                    Quantity:
                                                </span>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm"
                                                    aria-label="Decrease quantity"
                                                    disabled={
                                                        item.quantity <= 1 ||
                                                        busyItem === item._id
                                                    }
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item._id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <span className="px-2">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm"
                                                    aria-label="Increase quantity"
                                                    disabled={
                                                        item.quantity >= 100 ||
                                                        busyItem === item._id
                                                    }
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm ms-sm-auto"
                                                    disabled={
                                                        busyItem === item._id
                                                    }
                                                    onClick={() =>
                                                        removeItem(item._id)
                                                    }
                                                >
                                                    {busyItem === item._id
                                                        ? "Please wait..."
                                                        : "Remove"}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </section>

                        {/* Order summary */}
                        <aside className="col-12 col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="h5 fw-bold mb-3">
                                        Order Summary
                                    </h2>

                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-secondary">
                                            Total quantity
                                        </span>

                                        <span>{cart?.itemCount ?? 0}</span>
                                    </div>

                                    <hr />

                                    {cart?.hasUnavailableItems && (
                                        <div
                                            className="alert alert-warning small"
                                            role="alert"
                                        >
                                            Some items are unavailable and are not
                                            included in the subtotal.
                                        </div>
                                    )}

                                    {cart?.mixedCurrencies ? (
                                        <div
                                            className="alert alert-warning small"
                                            role="alert"
                                        >
                                            Your cart contains multiple currencies.
                                            The total needs currency conversion
                                            handling before checkout.
                                        </div>
                                    ) : (
                                        <div className="d-flex justify-content-between gap-3">
                                            <strong>Subtotal</strong>

                                            <strong>
                                                {formatMoney(
                                                    cart?.subtotal,
                                                    cart?.currency || "USD"
                                                )}
                                            </strong>
                                        </div>
                                    )}

                                    <p className="small text-secondary mt-3 mb-0">
                                        Checkout will be connected after Cart and
                                        Wishlist APIs are tested.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}