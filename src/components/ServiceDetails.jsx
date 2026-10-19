// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { createPortal } from 'react-dom'
// import '../componentStyle/ServiceDetails.css'

// const ADDONS_API_URL =
//     'http://localhost:8000/api/service-addons'

// const getImage = (image) => {
//     if (!image) {
//         return ''
//     }

//     if (typeof image === 'string') {
//         return image
//     }

//     return (
//         image?.url ||
//         image?.secure_url ||
//         ''
//     )
// }

// const getServiceImages = (service) => {
//     const images = []

//     if (service?.thumbnail) {
//         const thumbnail = getImage(service.thumbnail)

//         if (thumbnail) {
//             images.push(thumbnail)
//         }
//     }

//     if (Array.isArray(service?.images)) {
//         service.images.forEach((image) => {
//             const url = getImage(image)

//             if (
//                 url &&
//                 !images.includes(url)
//             ) {
//                 images.push(url)
//             }
//         })
//     }

//     return images
// }

// const getFeatures = (service) => {
//     const source =
//         Array.isArray(service?.tabs)
//             ? service.tabs
//             : Array.isArray(service?.features)
//                 ? service.features
//                 : []

//     return source
//         .map((item) => {
//             if (typeof item === 'string') {
//                 return item
//             }

//             return (
//                 item?.title ||
//                 item?.name ||
//                 item?.label ||
//                 ''
//             )
//         })
//         .filter(Boolean)
// }

// const getRating = (service) => {
//     const rating =
//         service?.translatorInfo?.rating?.average

//     if (
//         rating === undefined ||
//         rating === null ||
//         Number.isNaN(Number(rating))
//     ) {
//         return '0.0'
//     }

//     return Number(rating).toFixed(1)
// }

// const getDelivery = (service) => {
//     const delivery = service?.delivery || {}

//     const range =
//         delivery?.range ??
//         delivery?.value ??
//         ''

//     if (range === '') {
//         return '—'
//     }

//     const unit = String(
//         delivery?.unit || 'day'
//     )
//         .trim()
//         .toLowerCase()

//     let finalUnit = unit

//     if (
//         unit === 'day' ||
//         unit === 'days'
//     ) {
//         finalUnit =
//             String(range) === '1'
//                 ? 'Day'
//                 : 'Days'
//     } else if (
//         unit === 'hour' ||
//         unit === 'hours'
//     ) {
//         finalUnit =
//             String(range) === '1'
//                 ? 'Hour'
//                 : 'Hours'
//     } else if (
//         unit === 'business_day' ||
//         unit === 'business_days'
//     ) {
//         finalUnit =
//             String(range) === '1'
//                 ? 'Business Day'
//                 : 'Business Days'
//     }

//     return `${range} ${finalUnit}`
// }

// const getPrice = (service) => {
//     const amount =
//         Number(service?.startingPrice || 0)

//     const currency =
//         service?.startingPriceCurrency || 'USD'

//     try {
//         return new Intl.NumberFormat(
//             'en-US',
//             {
//                 style: 'currency',
//                 currency,
//                 maximumFractionDigits: 0,
//             }
//         ).format(amount)
//     } catch {
//         return `${currency} ${amount}`
//     }
// }

// const formatMoney = (amount, currency = 'USD') => {
//     const value = Number(amount || 0)

//     try {
//         return new Intl.NumberFormat(
//             'en-US',
//             {
//                 style: 'currency',
//                 currency,
//                 minimumFractionDigits: 0,
//                 maximumFractionDigits: 2,
//             }
//         ).format(value)
//     } catch {
//         return `${currency} ${value}`
//     }
// }

// const VISIBLE_THUMBS = 3

// const addonTileStyle = (isSelected) => ({
//     cursor: 'pointer',
//     backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
//     transition: 'all 0.15s ease',
// })

// export default function ServiceDetails({
//     service,
//     onClose,
// }) {
//     const [mounted, setMounted] =
//         useState(false)

//     const images =
//         getServiceImages(service)

//     const [activeImage, setActiveImage] =
//         useState(images[0] || '')

//     const [canPrev, setCanPrev] =
//         useState(false)

//     const [canNext, setCanNext] =
//         useState(false)

//     const [addons, setAddons] =
//         useState([])

//     const [selectedAddons, setSelectedAddons] =
//         useState([])

//     const [showTotal, setShowTotal] =
//         useState(false)

//     const listRef = useRef(null)

//     const totalRef = useRef(null)

//     const showArrows =
//         images.length > VISIBLE_THUMBS

//     const updateArrows = () => {
//         const el = listRef.current

//         if (!el) {
//             return
//         }

//         setCanPrev(
//             el.scrollTop > 2
//         )

//         setCanNext(
//             el.scrollTop + el.clientHeight <
//             el.scrollHeight - 2
//         )
//     }

//     const scrollThumbs = (direction) => {
//         const el = listRef.current

//         if (!el) {
//             return
//         }

//         const firstThumb =
//             el.firstElementChild

//         const step =
//             (firstThumb?.offsetHeight || 76) + 8

//         el.scrollBy({
//             top: direction * step,
//             behavior: 'smooth',
//         })
//     }

//     const toggleAddon = (id) => {
//         setSelectedAddons((prev) =>
//             prev.includes(id)
//                 ? prev.filter((item) => item !== id)
//                 : [...prev, id]
//         )
//     }

//     const clearAddons = () => {
//         setSelectedAddons([])
//     }

//     const handleAddToCart = async () => {
//         if (!service?._id) {
//             alert("Service ID is missing. Please refresh and try again.")
//             return
//         }

//         try {
//             const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "")
//             const response = await fetch(`${apiBase}/api/cart/items`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ serviceId: service._id, addonIds: selectedAddons, quantity: 1 }),
//             })
//             const result = await response.json()

//             if (!response.ok || !result.success) {
//                 if (response.status === 401) {
//                     alert("Please log in before adding a service to your cart.")
//                     return
//                 }
//                 alert(result.message || "Unable to add service to cart.")
//                 return
//             }
//             window.location.href = "/cart"
//         } catch (error) {
//             console.error("ADD TO CART ERROR:", error)
//             alert("Unable to connect to the server. Please try again.")
//         }
//     }

//     useEffect(() => {
//         setMounted(true)

//         return () => {
//             setMounted(false)
//         }
//     }, [])

//     useEffect(() => {
//         let cancelled = false

//         const loadAddons = async () => {
//             try {
//                 const response =
//                     await fetch(ADDONS_API_URL)

//                 const result =
//                     await response.json()

//                 if (
//                     !cancelled &&
//                     response.ok &&
//                     Array.isArray(result?.data)
//                 ) {
//                     setAddons(result.data)
//                 }
//             } catch (error) {
//                 console.error(
//                     'GET ADDONS ERROR:',
//                     error
//                 )
//             }
//         }

//         loadAddons()

//         return () => {
//             cancelled = true
//         }
//     }, [])

//     useEffect(() => {
//         setActiveImage(
//             images[0] || ''
//         )

//         setSelectedAddons([])

//         setShowTotal(false)
//     }, [service])

//     useEffect(() => {
//         if (mounted) {
//             updateArrows()
//         }
//     }, [
//         mounted,
//         images.length,
//     ])

//     useEffect(() => {
//         if (showTotal) {
//             totalRef.current?.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'nearest',
//             })
//         }
//     }, [showTotal])

//     useEffect(() => {
//         if (!mounted) {
//             return
//         }

//         const handleEscape = (event) => {
//             if (event.key === 'Escape') {
//                 onClose?.()
//             }
//         }

//         document.addEventListener(
//             'keydown',
//             handleEscape
//         )

//         const previousOverflow =
//             document.body.style.overflow

//         document.body.style.overflow =
//             'hidden'

//         return () => {
//             document.removeEventListener(
//                 'keydown',
//                 handleEscape
//             )

//             document.body.style.overflow =
//                 previousOverflow
//         }
//     }, [
//         mounted,
//         onClose,
//     ])

//     const features =
//         getFeatures(service)

//     const rating =
//         getRating(service)

//     const currency =
//         service?.startingPriceCurrency || 'USD'

//     const basePrice =
//         Number(service?.startingPrice || 0)

//     const selectedItems =
//         addons.filter((addon) =>
//             selectedAddons.includes(addon._id)
//         )

//     const addonsTotal =
//         selectedItems.reduce(
//             (sum, addon) =>
//                 sum + Number(addon.price || 0),
//             0
//         )

//     const totalPrice =
//         basePrice + addonsTotal

//     const noAddonSelected =
//         selectedAddons.length === 0

//     if (!mounted) {
//         return null
//     }

//     return createPortal(
//         <>
//             <div
//                 className="cs-details-overlay"
//                 onClick={onClose}
//             />

//             <aside
//                 className="cs-details-drawer bg-white shadow-lg"
//                 role="dialog"
//                 aria-modal="true"
//                 onClick={(event) =>
//                     event.stopPropagation()
//                 }
//             >
//                 <div className="border-bottom bg-white px-3 px-md-4 py-3 flex-shrink-0">
//                     <div className="d-flex align-items-center justify-content-between gap-3">
//                         <h2 className="h5 fw-semibold mb-0 text-dark text-truncate">
//                             {service?.title ||
//                                 'Service Details'}
//                         </h2>

//                         <button
//                             type="button"
//                             className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 cs-details-close"
//                             onClick={onClose}
//                             aria-label="Close"
//                         >
//                             ×
//                         </button>
//                     </div>
//                 </div>

//                 <div className="cs-details-content">
//                     <div className="p-3 p-md-4">
//                         <div className="mb-4 cs-gallery">
//                             {images.length > 1 && (
//                                 <div className="cs-thumbs">
//                                     {showArrows && (
//                                         <button
//                                             type="button"
//                                             className="cs-thumbs-arrow"
//                                             onClick={() =>
//                                                 scrollThumbs(-1)
//                                             }
//                                             disabled={!canPrev}
//                                             aria-label="Previous images"
//                                         >
//                                             <svg
//                                                 width="14"
//                                                 height="14"
//                                                 viewBox="0 0 24 24"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 strokeWidth="3"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             >
//                                                 <polyline points="18 15 12 9 6 15" />
//                                             </svg>
//                                         </button>
//                                     )}

//                                     <div
//                                         className="cs-thumbs-list"
//                                         ref={listRef}
//                                         onScroll={updateArrows}
//                                     >
//                                         {images.map(
//                                             (
//                                                 image,
//                                                 index
//                                             ) => (
//                                                 <button
//                                                     type="button"
//                                                     key={`${image}-${index}`}
//                                                     className={`cs-thumb ${activeImage === image
//                                                         ? 'is-active'
//                                                         : ''
//                                                         }`}
//                                                     onClick={() =>
//                                                         setActiveImage(
//                                                             image
//                                                         )
//                                                     }
//                                                 >
//                                                     <img
//                                                         src={image}
//                                                         alt=""
//                                                     />
//                                                 </button>
//                                             )
//                                         )}
//                                     </div>

//                                     {showArrows && (
//                                         <button
//                                             type="button"
//                                             className="cs-thumbs-arrow"
//                                             onClick={() =>
//                                                 scrollThumbs(1)
//                                             }
//                                             disabled={!canNext}
//                                             aria-label="Next images"
//                                         >
//                                             <svg
//                                                 width="14"
//                                                 height="14"
//                                                 viewBox="0 0 24 24"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 strokeWidth="3"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             >
//                                                 <polyline points="6 9 12 15 18 9" />
//                                             </svg>
//                                         </button>
//                                     )}
//                                 </div>
//                             )}

//                             <div className="border rounded overflow-hidden bg-light cs-main-image">
//                                 {activeImage ? (
//                                     <img
//                                         src={activeImage}
//                                         alt={
//                                             service?.title ||
//                                             'Service'
//                                         }
//                                     />
//                                 ) : (
//                                     <div className="h-100 d-flex align-items-center justify-content-center text-secondary">
//                                         No Image
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="border rounded p-3 mb-4">
//                             <div className="row g-3 align-items-center">
//                                 <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-3">
//                                     <span className="d-block small text-secondary mb-1">
//                                         Service Price
//                                     </span>

//                                     <div className="d-flex align-items-baseline flex-wrap gap-2">
//                                         <strong className="fs-3 fw-bold text-dark">
//                                             {getPrice(service)}
//                                         </strong>
//                                     </div>
//                                 </div>

//                                 <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
//                                     <button
//                                         type="button"
//                                         className="btn btn-primary py-1 fw-semibold text-nowrap"
//                                         onClick={handleAddToCart}
//                                     >
//                                         <span>
//                                             <i className="fa-solid fa-cart-arrow-down"></i>
//                                         </span>
//                                         {' '}Add to Cart
//                                     </button>
//                                 </div>

//                                 <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-5">
//                                     <div className="row g-2 text-center">
//                                         {/* DELIVERY */}

//                                         <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
//                                             <span className="d-block cs-stat-label text-secondary mb-1">
//                                                 ◷ Delivery
//                                             </span>

//                                             <strong className="d-block cs-stat-value text-dark">
//                                                 {getDelivery(service)}
//                                             </strong>
//                                         </div>


//                                         {/* RATING */}
//                                         <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
//                                             <span className="d-block cs-stat-label text-secondary mb-1">
//                                                 ★ Rating
//                                             </span>

//                                             <strong className="d-block cs-stat-value text-dark">
//                                                 {rating} / 5
//                                             </strong>
//                                         </div>


//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <section className="mb-4">
//                             <div className="row">
//                                 <div className="col-12 col-sm-12 col-md-12 col-lg-12">
//                                     <h3 className="h5 fw-semibold mb-3">
//                                         About this Package
//                                     </h3>

//                                     <div
//                                         className="text-secondary cs-details-description"
//                                         dangerouslySetInnerHTML={{
//                                             __html:
//                                                 service?.longDescription ||
//                                                 '<p>Service details will appear here.</p>',
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         </section>

//                         {features.length > 0 && (
//                             <section className="mb-4">
//                                 <div className="row">
//                                     <div className="col-12 col-sm-12 col-md-12 col-lg-12">
//                                         <h3 className="h5 fw-semibold mb-3">
//                                             What You'll Get
//                                         </h3>
//                                     </div>
//                                 </div>

//                                 <div className="row g-2">
//                                     {features.map(
//                                         (
//                                             feature,
//                                             index
//                                         ) => (
//                                             <div
//                                                 key={index}
//                                                 className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
//                                             >
//                                                 <div className="d-flex align-items-start gap-2">
//                                                     <span className="text-primary fw-bold flex-shrink-0">
//                                                         ✓
//                                                     </span>

//                                                     <p className="mb-0 text-secondary">
//                                                         {feature}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         )
//                                     )}
//                                 </div>
//                             </section>
//                         )}

//                         {addons.length > 0 && (
//                             <section className="mb-4">
//                                 <div className="row">
//                                     <div className="col-12 col-sm-12 col-md-12 col-lg-12">
//                                         <h3 className="h5 fw-semibold mb-3">
//                                             Add-ons
//                                         </h3>
//                                     </div>
//                                 </div>

//                                 <div className="row g-2">
//                                     {/* NO CERTIFICATION (DEFAULT) */}

//                                     <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
//                                         <label
//                                             htmlFor="addon-none"
//                                             className={`d-flex align-items-center justify-content-between gap-2 border rounded px-3 py-2 h-100 mb-0 ${noAddonSelected
//                                                 ? 'border-primary shadow-sm'
//                                                 : ''
//                                                 }`}
//                                             style={addonTileStyle(
//                                                 noAddonSelected
//                                             )}
//                                         >
//                                             <span className="d-flex align-items-center gap-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     className="form-check-input m-0"
//                                                     id="addon-none"
//                                                     checked={noAddonSelected}
//                                                     onChange={clearAddons}
//                                                 />

//                                                 <span className="fw-semibold text-dark">
//                                                     No Certification
//                                                 </span>
//                                             </span>
//                                         </label>
//                                     </div>

//                                     {addons.map((addon) => {
//                                         const isSelected =
//                                             selectedAddons.includes(
//                                                 addon._id
//                                             )

//                                         return (
//                                             <div
//                                                 key={addon._id}
//                                                 className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
//                                             >
//                                                 <label
//                                                     htmlFor={`addon-${addon._id}`}
//                                                     className={`d-flex align-items-center justify-content-between gap-2 border rounded px-3 py-2 h-100 mb-0 ${isSelected
//                                                         ? 'border-primary shadow-sm'
//                                                         : ''
//                                                         }`}
//                                                     style={addonTileStyle(
//                                                         isSelected
//                                                     )}
//                                                 >
//                                                     <span className="d-flex align-items-center gap-2">
//                                                         <input
//                                                             type="checkbox"
//                                                             className="form-check-input m-0"
//                                                             id={`addon-${addon._id}`}
//                                                             checked={isSelected}
//                                                             onChange={() =>
//                                                                 toggleAddon(
//                                                                     addon._id
//                                                                 )
//                                                             }
//                                                         />

//                                                         <span className="fw-semibold text-dark text-capitalize">
//                                                             {addon.name}
//                                                         </span>
//                                                     </span>

//                                                     <span className="fw-bold text-primary text-nowrap">
//                                                         + {formatMoney(
//                                                             addon.price,
//                                                             currency
//                                                         )}
//                                                     </span>
//                                                 </label>
//                                             </div>
//                                         )
//                                     })}
//                                 </div>
//                             </section>
//                         )}

//                         {showTotal && (
//                             <section
//                                 className="mb-4"
//                                 ref={totalRef}
//                             >
//                                 <div className="border rounded p-3">
//                                     <h3 className="h5 fw-semibold mb-3">
//                                         Price Summary
//                                     </h3>

//                                     <div className="d-flex justify-content-between mb-2">
//                                         <span className="text-secondary">
//                                             Service Price
//                                         </span>

//                                         <strong className="text-dark">
//                                             {formatMoney(
//                                                 basePrice,
//                                                 currency
//                                             )}
//                                         </strong>
//                                     </div>

//                                     {selectedItems.map((addon) => (
//                                         <div
//                                             key={addon._id}
//                                             className="d-flex justify-content-between mb-2"
//                                         >
//                                             <span className="text-secondary text-capitalize">
//                                                 {addon.name}
//                                             </span>

//                                             <strong className="text-dark">
//                                                 + {formatMoney(
//                                                     addon.price,
//                                                     currency
//                                                 )}
//                                             </strong>
//                                         </div>
//                                     ))}

//                                     <hr className="my-2" />

//                                     <div className="d-flex justify-content-between">
//                                         <strong className="text-dark">
//                                             Total
//                                         </strong>

//                                         <strong className="fs-5 text-dark">
//                                             {formatMoney(
//                                                 totalPrice,
//                                                 currency
//                                             )}
//                                         </strong>
//                                     </div>
//                                 </div>
//                             </section>
//                         )}
//                     </div>
//                 </div>
//             </aside>
//         </>,
//         document.body
//     )
// }







 'use client'

import { useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

import '../componentStyle/ServiceDetails.css'

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '')

const ADDONS_API_URL = `${API_BASE_URL}/api/service-addons`

const getImage = (image) => {

    if (!image) {

        return ''

    }

    if (typeof image === 'string') {

        return image

    }

    return (

        image?.url ||

        image?.secure_url ||

        ''

    )

}

const getServiceImages = (service) => {

    const images = []

    if (service?.thumbnail) {

        const thumbnail = getImage(service.thumbnail)

        if (thumbnail) {

            images.push(thumbnail)

        }

    }

    if (Array.isArray(service?.images)) {

        service.images.forEach((image) => {

            const url = getImage(image)

            if (

                url &&

                !images.includes(url)

            ) {

                images.push(url)

            }

        })

    }

    return images

}

const getFeatures = (service) => {

    const source =

        Array.isArray(service?.tabs)

            ? service.tabs

            : Array.isArray(service?.features)

                ? service.features

                : []

    return source

        .map((item) => {

            if (typeof item === 'string') {

                return item

            }

            return (

                item?.title ||

                item?.name ||

                item?.label ||

                ''

            )

        })

        .filter(Boolean)

}

const getRating = (service) => {

    const rating =

        service?.translatorInfo?.rating?.average

    if (

        rating === undefined ||

        rating === null ||

        Number.isNaN(Number(rating))

    ) {

        return '0.0'

    }

    return Number(rating).toFixed(1)

}

const getDelivery = (service) => {

    const delivery = service?.delivery || {}

    const range =

        delivery?.range ??

        delivery?.value ??

        ''

    if (range === '') {

        return '—'

    }

    const unit = String(

        delivery?.unit || 'day'

    )

        .trim()

        .toLowerCase()

    let finalUnit = unit

    if (

        unit === 'day' ||

        unit === 'days'

    ) {

        finalUnit =

            String(range) === '1'

                ? 'Day'

                : 'Days'

    } else if (

        unit === 'hour' ||

        unit === 'hours'

    ) {

        finalUnit =

            String(range) === '1'

                ? 'Hour'

                : 'Hours'

    } else if (

        unit === 'business_day' ||

        unit === 'business_days'

    ) {

        finalUnit =

            String(range) === '1'

                ? 'Business Day'

                : 'Business Days'

    }

    return `${range} ${finalUnit}`

}

const getServicePricing = (service) => {
    const originalPrice = Math.max(0, Number(service?.startingPrice ?? 0) || 0);
    const currency = String(service?.startingPriceCurrency || 'USD').toUpperCase();
    const discountEnabled = service?.discount?.enabled === true;
    const configuredDiscount = discountEnabled
        ? Math.max(0, Number(service?.discount?.value ?? 0) || 0)
        : 0;
    const discountAmount = Math.min(configuredDiscount, originalPrice);
    const discountedPrice = Math.max(0, originalPrice - discountAmount);

    return {
        originalPrice,
        currency,
        discountEnabled: discountEnabled && discountAmount > 0,
        discountAmount,
        discountedPrice,
    };
};

const getPrice = (amount, currency = 'USD') => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
            maximumFractionDigits: 2,
        }).format(amount);
    } catch {
        return `${currency} ${Number(amount || 0).toFixed(2)}`;
    }
};

const formatMoney = (amount, currency = 'USD') => {

    const value = Number(amount || 0)

    try {

        return new Intl.NumberFormat(

            'en-US',

            {

                style: 'currency',

                currency,

                minimumFractionDigits: 0,

                maximumFractionDigits: 2,

            }

        ).format(value)

    } catch {

        return `${currency} ${value}`

    }

}

const VISIBLE_THUMBS = 3

const addonTileStyle = (isSelected) => ({

    cursor: 'pointer',

    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',

    transition: 'all 0.15s ease',

})

export default function ServiceDetails({

    service,

    onClose,

}) {

    const [mounted, setMounted] =

        useState(false)

    const images =

        getServiceImages(service)

    const [activeImage, setActiveImage] =

        useState(images[0] || '')

    const [canPrev, setCanPrev] =

        useState(false)

    const [canNext, setCanNext] =

        useState(false)

    const [addons, setAddons] =

        useState([])

    const [selectedAddons, setSelectedAddons] =

        useState([])

    const [showTotal, setShowTotal] =

        useState(false)

    const listRef = useRef(null)

    const totalRef = useRef(null)

    const showArrows =

        images.length > VISIBLE_THUMBS

    const updateArrows = () => {

        const el = listRef.current

        if (!el) {

            return

        }

        setCanPrev(

            el.scrollTop > 2

        )

        setCanNext(

            el.scrollTop + el.clientHeight <

            el.scrollHeight - 2

        )

    }

    const scrollThumbs = (direction) => {

        const el = listRef.current

        if (!el) {

            return

        }

        const firstThumb =

            el.firstElementChild

        const step =

            (firstThumb?.offsetHeight || 76) + 8

        el.scrollBy({

            top: direction * step,

            behavior: 'smooth',

        })

    }

    const toggleAddon = (id) => {

        setSelectedAddons((prev) =>

            prev.includes(id)

                ? prev.filter((item) => item !== id)

                : [...prev, id]

        )

    }

    const clearAddons = () => {

        setSelectedAddons([])

    }

    const [toast, setToast] = useState(null)

    const [addingToCart, setAddingToCart] = useState(false)

    const handleAddToCart = async () => {

        if (addingToCart) return

        if (!service?._id) {

            setToast({

                type: 'error',

                message: 'Service ID is missing. Please refresh and try again.',

            })

            return

        }

        setAddingToCart(true)

        try {

            const apiBase = (

                process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

            ).replace(/\/+$/, '')

            const response = await fetch(`${apiBase}/api/cart/items`, {

                method: 'POST',

                credentials: 'include',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({

                    serviceId: service._id,

                    addonIds: selectedAddons,

                    quantity: 1,

                }),

            })

            const result = await response.json().catch(() => ({}))

            if (!response.ok || !result.success) {

                setToast({

                    type: 'error',

                    message:

                        response.status === 401

                            ? 'Please log in before adding a service to your cart.'

                            : result.message || 'Unable to add service to cart.',

                })

                return

            }

            window.dispatchEvent(new Event('cart-updated'))

            setToast({

                type: 'success',

                message: 'Service added to cart successfully!',

            })

        } catch (error) {

            console.error('ADD TO CART ERROR:', error)

            setToast({

                type: 'error',

                message: 'Unable to connect to the server. Please try again.',

            })

        } finally {

            setAddingToCart(false)

        }

    }

    useEffect(() => {

        if (!toast) return

        const timeoutId = setTimeout(() => setToast(null), 3000)

        return () => clearTimeout(timeoutId)

    }, [toast])

    useEffect(() => {

        setMounted(true)

        return () => {

            setMounted(false)

        }

    }, [])

    useEffect(() => {

        let cancelled = false

        const loadAddons = async () => {

            try {

                const response =

                    await fetch(ADDONS_API_URL)

                const result =

                    await response.json()

                if (

                    !cancelled &&

                    response.ok &&

                    Array.isArray(result?.data)

                ) {

                    setAddons(result.data)

                }

            } catch (error) {

                console.error(

                    'GET ADDONS ERROR:',

                    error

                )

            }

        }

        loadAddons()

        return () => {

            cancelled = true

        }

    }, [])

    useEffect(() => {

        setActiveImage(

            images[0] || ''

        )

        setSelectedAddons([])

        setShowTotal(false)

    }, [service])

    useEffect(() => {

        if (mounted) {

            updateArrows()

        }

    }, [

        mounted,

        images.length,

    ])

    useEffect(() => {

        if (showTotal) {

            totalRef.current?.scrollIntoView({

                behavior: 'smooth',

                block: 'nearest',

            })

        }

    }, [showTotal])

    useEffect(() => {

        if (!mounted) {

            return

        }

        const handleEscape = (event) => {

            if (event.key === 'Escape') {

                onClose?.()

            }

        }

        document.addEventListener(

            'keydown',

            handleEscape

        )

        const previousOverflow =

            document.body.style.overflow

        document.body.style.overflow =

            'hidden'

        return () => {

            document.removeEventListener(

                'keydown',

                handleEscape

            )

            document.body.style.overflow =

                previousOverflow

        }

    }, [

        mounted,

        onClose,

    ])

    const features =

        getFeatures(service)

    const rating =

        getRating(service)

    const pricing = getServicePricing(service)
    const currency = pricing.currency
    const basePrice = pricing.originalPrice
    const discountAmount = pricing.discountAmount
    const discountedBasePrice = pricing.discountedPrice

    const selectedItems =

        addons.filter((addon) =>

            selectedAddons.includes(addon._id)

        )

    const addonsTotal =

        selectedItems.reduce(

            (sum, addon) =>

                sum + Number(addon.price || 0),

            0

        )

    const totalPrice = discountedBasePrice + addonsTotal

    const noAddonSelected =

        selectedAddons.length === 0

    if (!mounted) {

        return null

    }

    return createPortal(

        <>

            {toast && (

                <div

                    className={`cs-toast cs-toast-${toast.type}`}

                    role={toast.type === 'error' ? 'alert' : 'status'}

                    aria-live="polite"

                >

                    <span className="cs-toast-icon">

                        <i

                            className={toast.type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}

                            aria-hidden="true"

                        />

                    </span>

                    <span className="cs-toast-message">{toast.message}</span>

                    <button

                        type="button"

                        className="cs-toast-close"

                        onClick={() => setToast(null)}

                        aria-label="Close notification"

                    >

                        ×

                    </button>

                </div>

            )}

            <div

                className="cs-details-overlay"

                onClick={onClose}

            />

            <aside

                className="cs-details-drawer bg-white shadow-lg"

                role="dialog"

                aria-modal="true"

                onClick={(event) =>

                    event.stopPropagation()

                }

            >

                <div className="border-bottom bg-white px-3 px-md-4 py-3 flex-shrink-0">

                    <div className="d-flex align-items-center justify-content-between gap-3">

                        <h2 className="h5 fw-semibold mb-0 text-dark text-truncate">

                            {service?.title ||

                                'Service Details'}

                        </h2>

                        <button

                            type="button"

                            className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 cs-details-close"

                            onClick={onClose}

                            aria-label="Close"

                        >

                            ×

                        </button>

                    </div>

                </div>

                <div className="cs-details-content">

                    <div className="p-3 p-md-4">

                        <div className="mb-4 cs-gallery">

                            {images.length > 1 && (

                                <div className="cs-thumbs">

                                    {showArrows && (

                                        <button

                                            type="button"

                                            className="cs-thumbs-arrow"

                                            onClick={() =>

                                                scrollThumbs(-1)

                                            }

                                            disabled={!canPrev}

                                            aria-label="Previous images"

                                        >

                                            <svg

                                                width="14"

                                                height="14"

                                                viewBox="0 0 24 24"

                                                fill="none"

                                                stroke="currentColor"

                                                strokeWidth="3"

                                                strokeLinecap="round"

                                                strokeLinejoin="round"

                                            >

                                                <polyline points="18 15 12 9 6 15" />

                                            </svg>

                                        </button>

                                    )}

                                    <div

                                        className="cs-thumbs-list"

                                        ref={listRef}

                                        onScroll={updateArrows}

                                    >

                                        {images.map(

                                            (

                                                image,

                                                index

                                            ) => (

                                                <button

                                                    type="button"

                                                    key={`${image}-${index}`}

                                                    className={`cs-thumb ${activeImage === image

                                                        ? 'is-active'

                                                        : ''

                                                        }`}

                                                    onClick={() =>

                                                        setActiveImage(

                                                            image

                                                        )

                                                    }

                                                >

                                                    <img

                                                        src={image}

                                                        alt=""

                                                    />

                                                </button>

                                            )

                                        )}

                                    </div>

                                    {showArrows && (

                                        <button

                                            type="button"

                                            className="cs-thumbs-arrow"

                                            onClick={() =>

                                                scrollThumbs(1)

                                            }

                                            disabled={!canNext}

                                            aria-label="Next images"

                                        >

                                            <svg

                                                width="14"

                                                height="14"

                                                viewBox="0 0 24 24"

                                                fill="none"

                                                stroke="currentColor"

                                                strokeWidth="3"

                                                strokeLinecap="round"

                                                strokeLinejoin="round"

                                            >

                                                <polyline points="6 9 12 15 18 9" />

                                            </svg>

                                        </button>

                                    )}

                                </div>

                            )}

                            <div className="border rounded overflow-hidden bg-light cs-main-image">

                                {activeImage ? (

                                    <img

                                        src={activeImage}

                                        alt={

                                            service?.title ||

                                            'Service'

                                        }

                                    />

                                ) : (

                                    <div className="h-100 d-flex align-items-center justify-content-center text-secondary">

                                        No Image

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="border rounded p-3 mb-4">

                            <div className="row g-3 align-items-center">

                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-3">

                                    <span className="d-block small text-secondary mb-1">

                                        Service Price

                                    </span>

                                    <div className="d-flex align-items-baseline flex-wrap gap-2">
                                        <strong className="fs-3 fw-bold text-dark">
                                            {getPrice(discountedBasePrice, currency)}
                                        </strong>
                                        {discountAmount > 0 && (
                                            <>
                                                <span className="text-secondary text-decoration-line-through small">
                                                    {getPrice(basePrice, currency)}
                                                </span>
                                                <span className="badge bg-success">
                                                    Save {getPrice(discountAmount, currency)}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                </div>

                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4">

                                    <button

                                        type="button"

                                        className="btn btn-primary py-1 fw-semibold text-nowrap"

                                        onClick={handleAddToCart}

                                        disabled={addingToCart}

                                    >

                                        <i className="fa-solid fa-cart-arrow-down" aria-hidden="true" />{' '}

                                        {addingToCart ? 'Adding...' : 'Add to Cart'}

                                    </button>

                                </div>

                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-5">

                                    <div className="row g-2 text-center">

                                        {/* DELIVERY */}

                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">

                                            <span className="d-block cs-stat-label text-secondary mb-1">

                                                ◷ Delivery

                                            </span>

                                            <strong className="d-block cs-stat-value text-dark">

                                                {getDelivery(service)}

                                            </strong>

                                        </div>

                                        {/* RATING */}

                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">

                                            <span className="d-block cs-stat-label text-secondary mb-1">

                                                ★ Rating

                                            </span>

                                            <strong className="d-block cs-stat-value text-dark">

                                                {rating} / 5

                                            </strong>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <section className="mb-4">

                            <div className="row">

                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">

                                    <h3 className="h5 fw-semibold mb-3">

                                        About this Package

                                    </h3>

                                    <div

                                        className="text-secondary cs-details-description"

                                        dangerouslySetInnerHTML={{

                                            __html:

                                                service?.longDescription ||

                                                '<p>Service details will appear here.</p>',

                                        }}

                                    />

                                </div>

                            </div>

                        </section>

                        {features.length > 0 && (

                            <section className="mb-4">

                                <div className="row">

                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">

                                        <h3 className="h5 fw-semibold mb-3">

                                            What You'll Get

                                        </h3>

                                    </div>

                                </div>

                                <div className="row g-2">

                                    {features.map(

                                        (

                                            feature,

                                            index

                                        ) => (

                                            <div

                                                key={index}

                                                className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"

                                            >

                                                <div className="d-flex align-items-start gap-2">

                                                    <span className="text-primary fw-bold flex-shrink-0">

                                                        ✓

                                                    </span>

                                                    <p className="mb-0 text-secondary">

                                                        {feature}

                                                    </p>

                                                </div>

                                            </div>

                                        )

                                    )}

                                </div>

                            </section>

                        )}

                        {addons.length > 0 && (

                            <section className="mb-4">

                                <div className="row">

                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">

                                        <h3 className="h5 fw-semibold mb-3">

                                            Add-ons

                                        </h3>

                                    </div>

                                </div>

                                <div className="row g-2">

                                    {/* NO CERTIFICATION (DEFAULT) */}

                                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">

                                        <label

                                            htmlFor="addon-none"

                                            className={`d-flex align-items-center justify-content-between gap-2 border rounded px-3 py-2 h-100 mb-0 ${noAddonSelected

                                                ? 'border-primary shadow-sm'

                                                : ''

                                                }`}

                                            style={addonTileStyle(

                                                noAddonSelected

                                            )}

                                        >

                                            <span className="d-flex align-items-center gap-2">

                                                <input

                                                    type="checkbox"

                                                    className="form-check-input m-0"

                                                    id="addon-none"

                                                    checked={noAddonSelected}

                                                    onChange={clearAddons}

                                                />

                                                <span className="fw-semibold text-dark">

                                                    No Certification

                                                </span>

                                            </span>

                                        </label>

                                    </div>

                                    {addons.map((addon) => {

                                        const isSelected =

                                            selectedAddons.includes(

                                                addon._id

                                            )

                                        return (

                                            <div

                                                key={addon._id}

                                                className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"

                                            >

                                                <label

                                                    htmlFor={`addon-${addon._id}`}

                                                    className={`d-flex align-items-center justify-content-between gap-2 border rounded px-3 py-2 h-100 mb-0 ${isSelected

                                                        ? 'border-primary shadow-sm'

                                                        : ''

                                                        }`}

                                                    style={addonTileStyle(

                                                        isSelected

                                                    )}

                                                >

                                                    <span className="d-flex align-items-center gap-2">

                                                        <input

                                                            type="checkbox"

                                                            className="form-check-input m-0"

                                                            id={`addon-${addon._id}`}

                                                            checked={isSelected}

                                                            onChange={() =>

                                                                toggleAddon(

                                                                    addon._id

                                                                )

                                                            }

                                                        />

                                                        <span className="fw-semibold text-dark text-capitalize">

                                                            {addon.name}

                                                        </span>

                                                    </span>

                                                    <span className="fw-bold text-primary text-nowrap">

                                                        + {formatMoney(

                                                            addon.price,

                                                            currency

                                                        )}

                                                    </span>

                                                </label>

                                            </div>

                                        )

                                    })}

                                </div>

                            </section>

                        )}

                        {showTotal && (

                            <section

                                className="mb-4"

                                ref={totalRef}

                            >

                                <div className="border rounded p-3">

                                    <h3 className="h5 fw-semibold mb-3">

                                        Price Summary

                                    </h3>

                                    <div className="d-flex justify-content-between mb-2">

                                        <span className="text-secondary">

                                            Service Price

                                        </span>

                                        <strong className="text-dark">

                                            {formatMoney(

                                                basePrice,

                                                currency

                                            )}

                                        </strong>

                                    </div>

                                    {discountAmount > 0 && (
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-success">Discount</span>
                                            <strong className="text-success">
                                                − {formatMoney(discountAmount, currency)}
                                            </strong>
                                        </div>
                                    )}
                                    {selectedItems.map((addon) => (

                                        <div

                                            key={addon._id}

                                            className="d-flex justify-content-between mb-2"

                                        >

                                            <span className="text-secondary text-capitalize">

                                                {addon.name}

                                            </span>

                                            <strong className="text-dark">

                                                + {formatMoney(

                                                    addon.price,

                                                    currency

                                                )}

                                            </strong>

                                        </div>

                                    ))}

                                    <hr className="my-2" />

                                    <div className="d-flex justify-content-between">

                                        <strong className="text-dark">

                                            Total

                                        </strong>

                                        <strong className="fs-5 text-dark">

                                            {formatMoney(

                                                totalPrice,

                                                currency

                                            )}

                                        </strong>

                                    </div>

                                </div>

                            </section>

                        )}

                    </div>

                </div>

            </aside>

        </>,

        document.body

    )

}
