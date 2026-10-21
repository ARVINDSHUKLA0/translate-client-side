// 'use client'

// import React, { useState } from 'react'
// import Link from 'next/link'
// import '../componentStyle/Navbar.css'

// const Navbar = () => {
//     const [menuOpen, setMenuOpen] = useState(false)

//     const closeMenu = () => {
//         setMenuOpen(false)
//     }

//     return (
//         <>
//             <nav className="navbar-bg-custom ">
//                 <div className="navbar-main">
//                     <div className="navbar-inner container-fluid">
//                         <Link
//                             href="/"
//                             onClick={closeMenu}
//                             className="navbar-brand p-0 m-0 text-decoration-none"
//                         >
//                             <span className="fw-bold navbar-logo">
//                                 logo<span className="navbar-dot">●</span>
//                             </span>
//                         </Link>

//                         <ul className="navbar-menu list-unstyled mb-0">
//                             <li>
//                                 <Link href="/services" className="navbar-menu-link">
//                                     Services
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/custom-service" className="navbar-menu-link">
//                                     Custom-Services
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/word-count" className="navbar-menu-link">
//                                     Word Count
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link href="/solutions" className="navbar-menu-link">
//                                     Solutions
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link href="/pricing" className="navbar-menu-link">
//                                     Pricing
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link href="/how-work-it" className="navbar-menu-link">
//                                     How it works
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link href="/faq" className="navbar-menu-link">
//                                     FAQ
//                                 </Link>
//                             </li>
//                         </ul>

//                         {/* Desktop Buttons */}
//                         <div className="navbar-desktop-actions gap-2 gap-xl-3">
//                             <Link
//                                 href="/signup"
//                                 className="btn rounded-pill navbar-signin"
//                             >
//                                 Sign in
//                             </Link>
//                         </div>

//                         {/* Mobile Button */}
//                         <button
//                             type="button"
//                             className="btn navbar-bars"
//                             onClick={() => setMenuOpen(true)}
//                             aria-label="Open menu"
//                         >
//                             <i className="fa-solid fa-bars"></i>
//                         </button>

//                     </div>
//                 </div>

//                 {menuOpen && (
//                     <div
//                         className="navbar-overlay"
//                         onClick={closeMenu}
//                     />
//                 )}

//                 {/* Mobile Menu */}
//                 <div
//                     className={`navbar-menu-wrapper ${menuOpen ? 'navbar-menu-wrapper-open' : ''
//                         }`}
//                 >

//                     <div className="navbar-mobile-header">
//                         <Link
//                             href="/"
//                             onClick={closeMenu}
//                             className="text-decoration-none"
//                         >
//                             <span className="fw-bold navbar-logo">
//                                 verba<span className="navbar-dot">●</span>
//                             </span>
//                         </Link>

//                         <button
//                             type="button"
//                             className="btn navbar-close"
//                             onClick={closeMenu}
//                             aria-label="Close menu"
//                         >
//                             <i className="fa-solid fa-xmark"></i>
//                         </button>
//                     </div>

//                     <ul className="navbar-mobile-menu list-unstyled mb-0">
//                         <li>
//                             <Link href="/services" onClick={closeMenu}>
//                                 Services
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="custom-service" className="navbar-menu-link">
//                                 Custom-Services
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/word-count" className="navbar-menu-link">
//                                 Word Count
//                             </Link>
//                         </li>

//                         <li>
//                             <Link href="/solutions" onClick={closeMenu}>
//                                 Solutions
//                             </Link>
//                         </li>

//                         <li>
//                             <Link href="/pricing" onClick={closeMenu}>
//                                 Pricing
//                             </Link>
//                         </li>

//                         <li>
//                             <Link href="/how-work-it" onClick={closeMenu}>
//                                 How it works
//                             </Link>
//                         </li>

//                         <li>
//                             <Link href="/faq" onClick={closeMenu}>
//                                 FAQ
//                             </Link>
//                         </li>
//                     </ul>

//                     <div className="navbar-mobile-actions">
//                         <Link
//                             href="/signup"
//                             onClick={closeMenu}
//                             className="btn rounded-pill navbar-signin"
//                         >
//                             Sign in
//                         </Link>

//                     </div>

//                 </div>

//             </nav>
//             <div className="navbar-spacer"></div>
//         </>
//     )
// }

// export default Navbar














// 'use client'

// import React, { useCallback, useEffect, useState } from 'react'
// import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation'
// import '../componentStyle/Navbar.css'

// const API_URL = (
//     process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
// ).replace(/\/+$/, '')

// const Navbar = () => {
//     const router = useRouter()
//     const pathname = usePathname()

//     const [menuOpen, setMenuOpen] = useState(false)
//     const [activeUserType, setActiveUserType] = useState(null)

//     const closeMenu = () => {
//         setMenuOpen(false)
//     }

//     const syncAuthState = useCallback(() => {
//         const clientToken = localStorage.getItem('clientToken')
//         const translatorToken = localStorage.getItem('translatorToken')
//         const savedType = localStorage.getItem('activeUserType')

//         if (
//             savedType === 'translator' &&
//             translatorToken
//         ) {
//             setActiveUserType('translator')
//         } else if (
//             savedType === 'client' &&
//             clientToken
//         ) {
//             setActiveUserType('client')
//         } else if (translatorToken) {
//             setActiveUserType('translator')
//         } else if (clientToken) {
//             setActiveUserType('client')
//         } else {
//             setActiveUserType(null)
//         }
//     }, [])

//     useEffect(() => {
//         syncAuthState()
//     }, [syncAuthState, pathname])

//     useEffect(() => {
//         const handleAuthChange = () => syncAuthState()

//         window.addEventListener('auth-changed', handleAuthChange)
//         window.addEventListener('storage', handleAuthChange)

//         return () => {
//             window.removeEventListener('auth-changed', handleAuthChange)
//             window.removeEventListener('storage', handleAuthChange)
//         }
//     }, [syncAuthState])

//     const handleLogout = async () => {
//         if (!activeUserType) return

//         const logoutType = activeUserType
//         const tokenKey =
//             logoutType === 'translator'
//                 ? 'translatorToken'
//                 : 'clientToken'

//         const endpoint =
//             logoutType === 'translator'
//                 ? '/api/translator/logout'
//                 : '/api/client/logout'

//         closeMenu()

//         try {
//             await fetch(`${API_URL}${endpoint}`, {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//         } catch (error) {
//             console.error('LOGOUT API ERROR:', error)
//         } finally {
//             localStorage.removeItem(tokenKey)

//             if (
//                 localStorage.getItem('activeUserType') === logoutType
//             ) {
//                 localStorage.removeItem('activeUserType')
//             }

//             setActiveUserType(null)
//             window.dispatchEvent(new Event('auth-changed'))
//             router.push('/')
//             router.refresh()
//         }
//     }

//     const authButton = (
//         <button
//             type="button"
//             onClick={activeUserType ? handleLogout : () => {
//                 closeMenu()
//                 router.push('/login')
//             }}
//             className="btn rounded-pill navbar-signin"
//         >
//             {activeUserType ? 'Logout' : 'Sign in'}
//         </button>
//     )

//     return (
//         <>
//             <nav className="navbar-bg-custom">
//                 <div className="navbar-main">
//                     <div className="navbar-inner container-fluid">
//                         <Link
//                             href="/"
//                             onClick={closeMenu}
//                             className="navbar-brand p-0 m-0 text-decoration-none"
//                         >
//                             <span className="fw-bold navbar-logo">
//                                 logo<span className="navbar-dot">●</span>
//                             </span>
//                         </Link>

//                         <ul className="navbar-menu list-unstyled mb-0">
//                             <li>
//                                 <Link href="/services" className="navbar-menu-link">
//                                     Services
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/custom-service" className="navbar-menu-link">
//                                     Custom-Services
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/word-count" className="navbar-menu-link">
//                                     Word Count
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/solutions" className="navbar-menu-link">
//                                     Solutions
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/pricing" className="navbar-menu-link">
//                                     Pricing
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/how-work-it" className="navbar-menu-link">
//                                     How it works
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/faq" className="navbar-menu-link">
//                                     FAQ
//                                 </Link>
//                             </li>
//                         </ul>
                        

//                         <div className="navbar-desktop-actions gap-2 gap-xl-3">
//                             {authButton}
//                         </div>

//                         <button
//                             type="button"
//                             className="btn navbar-bars"
//                             onClick={() => setMenuOpen(true)}
//                             aria-label="Open menu"
//                         >
//                             <i className="fa-solid fa-bars"></i>
//                         </button>
//                     </div>
//                 </div>

//                 {menuOpen && (
//                     <div
//                         className="navbar-overlay"
//                         onClick={closeMenu}
//                     />
//                 )}

//                 <div
//                     className={`navbar-menu-wrapper ${menuOpen ? 'navbar-menu-wrapper-open' : ''
//                         }`}
//                 >
//                     <div className="navbar-mobile-header">
//                         <Link
//                             href="/"
//                             onClick={closeMenu}
//                             className="text-decoration-none"
//                         >
//                             <span className="fw-bold navbar-logo">
//                                 verba<span className="navbar-dot">●</span>
//                             </span>
//                         </Link>

//                         <button
//                             type="button"
//                             className="btn navbar-close"
//                             onClick={closeMenu}
//                             aria-label="Close menu"
//                         >
//                             <i className="fa-solid fa-xmark"></i>
//                         </button>
//                     </div>

//                     <ul className="navbar-mobile-menu list-unstyled mb-0">
//                         <li>
//                             <Link href="/services" onClick={closeMenu}>
//                                 Services
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/custom-service" onClick={closeMenu}>
//                                 Custom-Services
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/word-count" onClick={closeMenu}>
//                                 Word Count
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/solutions" onClick={closeMenu}>
//                                 Solutions
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/pricing" onClick={closeMenu}>
//                                 Pricing
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/how-work-it" onClick={closeMenu}>
//                                 How it works
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/faq" onClick={closeMenu}>
//                                 FAQ
//                             </Link>
//                         </li>
//                     </ul>

//                     <div className="navbar-mobile-actions">
//                         {authButton}
//                     </div>
//                 </div>
//             </nav>

//             <div className="navbar-spacer"></div>
//         </>
//     )
// }

// export default Navbar









// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import "../componentStyle/Navbar.css";

// const API_URL = (
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
// ).replace(/\/+$/, "");

// const Navbar = () => {
//     const router = useRouter();
//     const pathname = usePathname();

//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activeUserType, setActiveUserType] = useState(null);
//     const [cartCount, setCartCount] = useState(0);

//     const closeMenu = () => {
//         setMenuOpen(false);
//     };

//     // Authentication state
//     const syncAuthState = useCallback(() => {
//         const clientToken = localStorage.getItem("clientToken");
//         const translatorToken = localStorage.getItem("translatorToken");
//         const savedType = localStorage.getItem("activeUserType");

//         if (savedType === "translator" && translatorToken) {
//             setActiveUserType("translator");
//         } else if (savedType === "client" && clientToken) {
//             setActiveUserType("client");
//         } else if (translatorToken) {
//             setActiveUserType("translator");
//         } else if (clientToken) {
//             setActiveUserType("client");
//         } else {
//             setActiveUserType(null);
//         }
//     }, []);

//     useEffect(() => {
//         syncAuthState();
//     }, [syncAuthState, pathname]);

//     useEffect(() => {
//         const handleAuthChange = () => syncAuthState();

//         window.addEventListener("auth-changed", handleAuthChange);
//         window.addEventListener("storage", handleAuthChange);

//         return () => {
//             window.removeEventListener("auth-changed", handleAuthChange);
//             window.removeEventListener("storage", handleAuthChange);
//         };
//     }, [syncAuthState]);

//     // Fetch cart count from API
//     const syncCartCount = useCallback(async () => {
//         try {
//             const response = await fetch(`${API_URL}/api/cart`, {
//                 method: "GET",
//                 credentials: "include",
//                 cache: "no-store",
//             });

//             if (!response.ok) {
//                 console.error("Unable to fetch cart count:", response.status);
//                 return;
//             }

//             const result = await response.json();

//             if (!result.success || !result.cart) {
//                 return;
//             }

//             const cart = result.cart;

//             const count =
//                 cart.itemCount != null
//                     ? Number(cart.itemCount)
//                     : (cart.items || []).reduce(
//                           (total, item) =>
//                               total + Number(item.quantity ?? 1),
//                           0
//                       );

//             if (Number.isFinite(count)) {
//                 setCartCount(Math.max(0, count));
//             }
//         } catch (error) {
//             console.error("CART COUNT ERROR:", error);
//         }
//     }, []);

//     // Refresh cart count on navigation and cart updates
//     useEffect(() => {
//         syncCartCount();

//         const handleCartChange = () => {
//             syncCartCount();
//         };

//         window.addEventListener("cart-updated", handleCartChange);
//         window.addEventListener("auth-changed", handleCartChange);

//         return () => {
//             window.removeEventListener("cart-updated", handleCartChange);
//             window.removeEventListener("auth-changed", handleCartChange);
//         };
//     }, [syncCartCount, pathname]);

//     // Logout
//     const handleLogout = async () => {
//         if (!activeUserType) return;

//         const logoutType = activeUserType;

//         const tokenKey =
//             logoutType === "translator"
//                 ? "translatorToken"
//                 : "clientToken";

//         const endpoint =
//             logoutType === "translator"
//                 ? "/api/translator/logout"
//                 : "/api/client/logout";

//         closeMenu();

//         try {
//             await fetch(`${API_URL}${endpoint}`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//         } catch (error) {
//             console.error("LOGOUT API ERROR:", error);
//         } finally {
//             localStorage.removeItem(tokenKey);

//             if (
//                 localStorage.getItem("activeUserType") === logoutType
//             ) {
//                 localStorage.removeItem("activeUserType");
//             }

//             setActiveUserType(null);
//             setCartCount(0);

//             window.dispatchEvent(new Event("auth-changed"));

//             router.push("/");
//             router.refresh();
//         }
//     };

//     // Sign in / Logout button
//     const authButton = (
//         <button
//             type="button"
//             onClick={
//                 activeUserType
//                     ? handleLogout
//                     : () => {
//                           closeMenu();
//                           router.push("/login");
//                       }
//             }
//             className="btn rounded-pill navbar-signin"
//         >
//             {activeUserType ? "Logout" : "Sign in"}
//         </button>
//     );

//     // Cart icon only — no Cart text
//     const cartLink = (
//         <Link
//             href="/cart"
//             onClick={closeMenu}
//             className="navbar-icon-link navbar-cart-link"
//             aria-label={`Shopping cart, ${cartCount} items`}
//             title={`Cart (${cartCount})`}
//         >
//             <span className="navbar-cart-icon-wrapper">
//                 <i
//                     className="fa-solid fa-cart-shopping"
//                     aria-hidden="true"
//                 />

//                 {cartCount > 0 && (
//                     <span className="navbar-cart-count">
//                         {cartCount > 99 ? "99+" : cartCount}
//                     </span>
//                 )}
//             </span>
//         </Link>
//     );

//     // Navigation links
//     const menuLinks = (
//         <>
//             <li>
//                 <Link
//                     href="/services"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Services
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/custom-service"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Custom-Services
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/word-count"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Word Count
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/solutions"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Solutions
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/pricing"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Pricing
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/how-work-it"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     How it works
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/faq"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     FAQ
//                 </Link>
//             </li>
//         </>
//     );

//     return (
//         <>
//             <nav className="navbar-bg-custom">
//                 <div className="navbar-main">
//                     <div className="navbar-inner container-fluid">
//                         <Link
//                             href="/"
//                             onClick={closeMenu}
//                             className="navbar-brand p-0 m-0 text-decoration-none"
//                         >
//                             <span className="fw-bold navbar-logo">
//                                 logo
//                                 <span className="navbar-dot">●</span>
//                             </span>
//                         </Link>

//                         <ul className="navbar-menu list-unstyled mb-0">
//                             {menuLinks}
//                         </ul>

//                         {/* Desktop actions */}
//                         <div className="navbar-desktop-actions gap-2 gap-xl-3">
//                             {cartLink}
//                             {authButton}
//                         </div>

//                         {/* Mobile menu button */}
//                         <button
//                             type="button"
//                             className="btn navbar-bars"
//                             onClick={() => setMenuOpen(true)}
//                             aria-label="Open menu"
//                             aria-expanded={menuOpen}
//                         >
//                             <i
//                                 className="fa-solid fa-bars"
//                                 aria-hidden="true"
//                             />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile overlay */}
//                 {menuOpen && (
//                     <div
//                         className="navbar-overlay"
//                         onClick={closeMenu}
//                         aria-hidden="true"
//                     />
//                 )}

//                 {/* Mobile menu */}
//                 <div
//                     className={`navbar-menu-wrapper ${
//                         menuOpen ? "navbar-menu-wrapper-open" : ""
//                     }`}
//                 >
//                     <div className="navbar-mobile-header">
//                         <Link
//                             href="/"
//                             onClick={closeMenu}
//                             className="text-decoration-none"
//                         >
//                             <span className="fw-bold navbar-logo">
//                                 verba
//                                 <span className="navbar-dot">●</span>
//                             </span>
//                         </Link>

//                         <button
//                             type="button"
//                             className="btn navbar-close"
//                             onClick={closeMenu}
//                             aria-label="Close menu"
//                         >
//                             <i
//                                 className="fa-solid fa-xmark"
//                                 aria-hidden="true"
//                             />
//                         </button>
//                     </div>

//                     <ul className="navbar-mobile-menu list-unstyled mb-0">
//                         {menuLinks}
//                     </ul>

//                     <div className="navbar-mobile-actions">
//                         <div className="navbar-mobile-cart">
//                             {cartLink}
//                         </div>

//                         {authButton}
//                     </div>
//                 </div>
//             </nav>

//             <div className="navbar-spacer" />
//         </>
//     );
// };

// export default Navbar;
























// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import "../componentStyle/Navbar.css";

// const API_URL = (
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
// ).replace(/\/+$/, "");

// const Navbar = () => {
//     const router = useRouter();
//     const pathname = usePathname();

//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activeUserType, setActiveUserType] = useState(null);
//     const [cartCount, setCartCount] = useState(0);

//     const closeMenu = () => {
//         setMenuOpen(false);
//     };

//     // Authentication state
//     const syncAuthState = useCallback(() => {
//         const clientToken = localStorage.getItem("clientToken");
//         const translatorToken = localStorage.getItem("translatorToken");
//         const savedType = localStorage.getItem("activeUserType");

//         if (savedType === "translator" && translatorToken) {
//             setActiveUserType("translator");
//         } else if (savedType === "client" && clientToken) {
//             setActiveUserType("client");
//         } else if (translatorToken) {
//             setActiveUserType("translator");
//         } else if (clientToken) {
//             setActiveUserType("client");
//         } else {
//             setActiveUserType(null);
//         }
//     }, []);

//     useEffect(() => {
//         syncAuthState();
//     }, [syncAuthState, pathname]);

//     useEffect(() => {
//         const handleAuthChange = () => syncAuthState();

//         window.addEventListener("auth-changed", handleAuthChange);
//         window.addEventListener("storage", handleAuthChange);

//         return () => {
//             window.removeEventListener("auth-changed", handleAuthChange);
//             window.removeEventListener("storage", handleAuthChange);
//         };
//     }, [syncAuthState]);

//     // Fetch cart count from API
//     const syncCartCount = useCallback(async () => {
//         try {
//             const response = await fetch(`${API_URL}/api/cart`, {
//                 method: "GET",
//                 credentials: "include",
//                 cache: "no-store",
//             });

//             if (!response.ok) {
//                 console.error("Unable to fetch cart count:", response.status);
//                 return;
//             }

//             const result = await response.json();

//             if (!result.success || !result.cart) {
//                 return;
//             }

//             const cart = result.cart;

//             // Show the number of different services in the cart.
//             // Quantity is not added up here.
//             const count = Array.isArray(cart.items)
//                 ? cart.items.length
//                 : Number(cart.itemCount ?? 0);

//             if (Number.isFinite(count)) {
//                 setCartCount(Math.max(0, count));
//             }
//         } catch (error) {
//             console.error("CART COUNT ERROR:", error);
//         }
//     }, []);

//     // Refresh cart count on navigation and cart updates
//     useEffect(() => {
//         syncCartCount();

//         const handleCartChange = () => {
//             syncCartCount();
//         };

//         window.addEventListener("cart-updated", handleCartChange);
//         window.addEventListener("auth-changed", handleCartChange);

//         return () => {
//             window.removeEventListener("cart-updated", handleCartChange);
//             window.removeEventListener("auth-changed", handleCartChange);
//         };
//     }, [syncCartCount, pathname]);

//     // Logout
//     const handleLogout = async () => {
//         if (!activeUserType) return;

//         const logoutType = activeUserType;

//         const tokenKey =
//             logoutType === "translator"
//                 ? "translatorToken"
//                 : "clientToken";

//         const endpoint =
//             logoutType === "translator"
//                 ? "/api/translator/logout"
//                 : "/api/client/logout";

//         closeMenu();

//         try {
//             await fetch(`${API_URL}${endpoint}`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//         } catch (error) {
//             console.error("LOGOUT API ERROR:", error);
//         } finally {
//             localStorage.removeItem(tokenKey);

//             if (
//                 localStorage.getItem("activeUserType") === logoutType
//             ) {
//                 localStorage.removeItem("activeUserType");
//             }

//             setActiveUserType(null);
//             setCartCount(0);

//             window.dispatchEvent(new Event("auth-changed"));

//             router.push("/");
//             router.refresh();
//         }
//     };

//     // Sign in / Logout button
//     const authButton = (
//         <button
//             type="button"
//             onClick={
//                 activeUserType
//                     ? handleLogout
//                     : () => {
//                           closeMenu();
//                           router.push("/login");
//                       }
//             }
//             className="btn rounded-pill navbar-signin"
//         >
//             {activeUserType ? "Logout" : "Sign in"}
//         </button>
//     );

//     // Cart icon only — no Cart text
//     const cartLink = (
//         <Link
//             href="/cart"
//             onClick={closeMenu}
//             className="navbar-icon-link navbar-cart-link"
//             aria-label={`Shopping cart, ${cartCount} items`}
//             title={`Cart (${cartCount})`}
//         >
//             <span className="navbar-cart-icon-wrapper">
//                 <i
//                     className="fa-solid fa-cart-shopping"
//                     aria-hidden="true"
//                 />

//                 {cartCount > 0 && (
//                     <span className="navbar-cart-count">
//                         {cartCount > 99 ? "99+" : cartCount}
//                     </span>
//                 )}
//             </span>
//         </Link>
//     );

//     // Navigation links
//     const menuLinks = (
//         <>
//             <li>
//                 <Link
//                     href="/services"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Services
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/custom-service"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Custom-Services
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/word-count"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Word Count
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/solutions"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Solutions
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/pricing"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     Pricing
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/how-work-it"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     How it works
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     href="/faq"
//                     onClick={closeMenu}
//                     className="navbar-menu-link"
//                 >
//                     FAQ
//                 </Link>
//             </li>
//         </>
//     );

//     return (
//         <>
//             <nav className="navbar-bg-custom">
//                 <div className="navbar-main">
//                     <div className="navbar-inner container-fluid">
//                         <Link
//                             href="/"
//                             onClick={closeMenu}
//                             className="navbar-brand p-0 m-0 text-decoration-none"
//                         >
//                             <span className="fw-bold navbar-logo">
//                                 logo
//                                 <span className="navbar-dot">●</span>
//                             </span>
//                         </Link>

//                         <ul className="navbar-menu list-unstyled mb-0">
//                             {menuLinks}
//                         </ul>

//                         {/* Desktop actions */}
//                         <div className="navbar-desktop-actions gap-2 gap-xl-3">
//                             {cartLink}
//                             {authButton}
//                         </div>

//                         {/* Mobile menu button */}
//                         <button
//                             type="button"
//                             className="btn navbar-bars"
//                             onClick={() => setMenuOpen(true)}
//                             aria-label="Open menu"
//                             aria-expanded={menuOpen}
//                         >
//                             <i
//                                 className="fa-solid fa-bars"
//                                 aria-hidden="true"
//                             />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile overlay */}
//                 {menuOpen && (
//                     <div
//                         className="navbar-overlay"
//                         onClick={closeMenu}
//                         aria-hidden="true"
//                     />
//                 )}

//                 {/* Mobile menu */}
//                 <div
//                     className={`navbar-menu-wrapper ${
//                         menuOpen ? "navbar-menu-wrapper-open" : ""
//                     }`}
//                 >
//                     <div className="navbar-mobile-header">
//                         <Link
//                             href="/"
//                             onClick={closeMenu}
//                             className="text-decoration-none"
//                         >
//                             <span className="fw-bold navbar-logo">
//                                 verba
//                                 <span className="navbar-dot">●</span>
//                             </span>
//                         </Link>

//                         <button
//                             type="button"
//                             className="btn navbar-close"
//                             onClick={closeMenu}
//                             aria-label="Close menu"
//                         >
//                             <i
//                                 className="fa-solid fa-xmark"
//                                 aria-hidden="true"
//                             />
//                         </button>
//                     </div>

//                     <ul className="navbar-mobile-menu list-unstyled mb-0">
//                         {menuLinks}
//                     </ul>

//                     <div className="navbar-mobile-actions">
//                         <div className="navbar-mobile-cart">
//                             {cartLink}
//                         </div>

//                         {authButton}
//                     </div>
//                 </div>
//             </nav>

//             <div className="navbar-spacer" />
//         </>
//     );
// };

// export default Navbar;





























"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "../componentStyle/Navbar.css";

const API_URL = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeUserType, setActiveUserType] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // Authentication state
    const syncAuthState = useCallback(() => {
        const clientToken = localStorage.getItem("clientToken");
        const translatorToken = localStorage.getItem("translatorToken");
        const savedType = localStorage.getItem("activeUserType");

        if (savedType === "translator" && translatorToken) {
            setActiveUserType("translator");
        } else if (savedType === "client" && clientToken) {
            setActiveUserType("client");
        } else if (translatorToken) {
            setActiveUserType("translator");
        } else if (clientToken) {
            setActiveUserType("client");
        } else {
            setActiveUserType(null);
        }
    }, []);

    useEffect(() => {
        syncAuthState();
    }, [syncAuthState, pathname]);

    useEffect(() => {
        const handleAuthChange = () => syncAuthState();

        window.addEventListener("auth-changed", handleAuthChange);
        window.addEventListener("storage", handleAuthChange);

        return () => {
            window.removeEventListener("auth-changed", handleAuthChange);
            window.removeEventListener("storage", handleAuthChange);
        };
    }, [syncAuthState]);

    // Fetch cart count from API
    const syncCartCount = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/cart`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });

            if (!response.ok) {
                console.error("Unable to fetch cart count:", response.status);
                return;
            }

            const result = await response.json();

            if (!result.success || !result.cart) {
                return;
            }

            const cart = result.cart;

            // Show the number of different services in the cart.
            // Quantity is not added up here.
            const count = Array.isArray(cart.items)
                ? cart.items.length
                : Number(cart.itemCount ?? 0);

            if (Number.isFinite(count)) {
                setCartCount(Math.max(0, count));
            }
        } catch (error) {
            console.error("CART COUNT ERROR:", error);
        }
    }, []);

    // Refresh cart count on navigation and cart updates
    useEffect(() => {
        syncCartCount();

        const handleCartChange = () => {
            syncCartCount();
        };

        window.addEventListener("cart-updated", handleCartChange);
        window.addEventListener("auth-changed", handleCartChange);

        return () => {
            window.removeEventListener("cart-updated", handleCartChange);
            window.removeEventListener("auth-changed", handleCartChange);
        };
    }, [syncCartCount, pathname]);

    // Logout
    const handleLogout = async () => {
        if (!activeUserType) return;

        const logoutType = activeUserType;

        const tokenKey =
            logoutType === "translator"
                ? "translatorToken"
                : "clientToken";

        const endpoint =
            logoutType === "translator"
                ? "/api/translator/logout"
                : "/api/client/logout";

        closeMenu();

        try {
            await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("LOGOUT API ERROR:", error);
        } finally {
            localStorage.removeItem(tokenKey);

            if (
                localStorage.getItem("activeUserType") === logoutType
            ) {
                localStorage.removeItem("activeUserType");
            }

            // Translator logout here must also close the dashboard session.
            if (logoutType === "translator") {
                document.cookie =
                    "translator-session=; path=/; max-age=0; SameSite=Lax";
                localStorage.removeItem("translator-user");
            }

            setActiveUserType(null);
            setCartCount(0);

            window.dispatchEvent(new Event("auth-changed"));

            router.push("/");
            router.refresh();
        }
    };

    // Sign in / Logout button
    const authButton = (
        <button
            type="button"
            onClick={
                activeUserType
                    ? handleLogout
                    : () => {
                          closeMenu();
                          router.push("/login");
                      }
            }
            className="btn rounded-pill navbar-signin"
        >
            {activeUserType ? "Logout" : "Sign in"}
        </button>
    );

    // Cart icon only — no Cart text
    const cartLink = (
        <Link
            href="/cart"
            onClick={closeMenu}
            className="navbar-icon-link navbar-cart-link"
            aria-label={`Shopping cart, ${cartCount} items`}
            title={`Cart (${cartCount})`}
        >
            <span className="navbar-cart-icon-wrapper">
                <i
                    className="fa-solid fa-cart-shopping"
                    aria-hidden="true"
                />

                {cartCount > 0 && (
                    <span className="navbar-cart-count">
                        {cartCount > 99 ? "99+" : cartCount}
                    </span>
                )}
            </span>
        </Link>
    );

    // Navigation links
    const menuLinks = (
        <>
            <li>
                <Link
                    href="/services"
                    onClick={closeMenu}
                    className="navbar-menu-link"
                >
                    Services
                </Link>
            </li>

            <li>
                <Link
                    href="/custom-service"
                    onClick={closeMenu}
                    className="navbar-menu-link"
                >
                    Custom-Services
                </Link>
            </li>

            <li>
                <Link
                    href="/word-count"
                    onClick={closeMenu}
                    className="navbar-menu-link"
                >
                    Word Count
                </Link>
            </li>

            <li>
                <Link
                    href="/solutions"
                    onClick={closeMenu}
                    className="navbar-menu-link"
                >
                    Solutions
                </Link>
            </li>

            <li>
                <Link
                    href="/pricing"
                    onClick={closeMenu}
                    className="navbar-menu-link"
                >
                    Pricing
                </Link>
            </li>

            <li>
                <Link
                    href="/how-work-it"
                    onClick={closeMenu}
                    className="navbar-menu-link"
                >
                    How it works
                </Link>
            </li>

            <li>
                <Link
                    href="/faq"
                    onClick={closeMenu}
                    className="navbar-menu-link"
                >
                    FAQ
                </Link>
            </li>
        </>
    );

    return (
        <>
            <nav className="navbar-bg-custom">
                <div className="navbar-main">
                    <div className="navbar-inner container-fluid">
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="navbar-brand p-0 m-0 text-decoration-none"
                        >
                            <span className="fw-bold navbar-logo">
                                logo
                                <span className="navbar-dot">●</span>
                            </span>
                        </Link>

                        <ul className="navbar-menu list-unstyled mb-0">
                            {menuLinks}
                        </ul>

                        {/* Desktop actions */}
                        <div className="navbar-desktop-actions gap-2 gap-xl-3">
                            {cartLink}
                            {authButton}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="btn navbar-bars"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                        >
                            <i
                                className="fa-solid fa-bars"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile overlay */}
                {menuOpen && (
                    <div
                        className="navbar-overlay"
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                )}

                {/* Mobile menu */}
                <div
                    className={`navbar-menu-wrapper ${
                        menuOpen ? "navbar-menu-wrapper-open" : ""
                    }`}
                >
                    <div className="navbar-mobile-header">
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="text-decoration-none"
                        >
                            <span className="fw-bold navbar-logo">
                                verba
                                <span className="navbar-dot">●</span>
                            </span>
                        </Link>

                        <button
                            type="button"
                            className="btn navbar-close"
                            onClick={closeMenu}
                            aria-label="Close menu"
                        >
                            <i
                                className="fa-solid fa-xmark"
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    <ul className="navbar-mobile-menu list-unstyled mb-0">
                        {menuLinks}
                    </ul>

                    <div className="navbar-mobile-actions">
                        <div className="navbar-mobile-cart">
                            {cartLink}
                        </div>

                        {authButton}
                    </div>
                </div>
            </nav>

            <div className="navbar-spacer" />
        </>
    );
};

export default Navbar;
