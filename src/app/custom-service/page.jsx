 

// 'use client'
// import { useEffect, useMemo, useState } from 'react'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import ServiceDetails from '@/components/ServiceDetails'
// import './customService.css'

// const RAW_API = (
//     process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
// ).replace(/\/+$/, '')

// const API = RAW_API.endsWith('/api')
//     ? RAW_API
//     : `${RAW_API}/api`
// const subcategoryApi = `${API}/subcategories`
// const serviceApi = `${API}/services`
// // ============================================================ 

// const idOf = (item) =>

//     item?._id ||

//     item?.id ||

//     ''
// const subcategoryName = (item) =>
//     item?.subcategoryName ||
//     item?.name ||
//     item?.title ||
//     'Untitled'

// const serviceSubcategoryId = (service) => {

//     const value = service?.subcategory

//     if (value && typeof value === 'object') {

//         return (

//             value?._id ||

//             value?.id ||

//             ''

//         )

//     }

//     return (

//         value ||

//         service?.subcategoryId ||

//         ''

//     )

// }

// const serviceSubcategoryName = (service) => {

//     const value = service?.subcategory

//     if (value && typeof value === 'object') {

//         return (

//             value?.subcategoryName ||

//             value?.name ||

//             value?.title ||

//             ''

//         )

//     }

//     return service?.subcategoryName || ''

// }

// const serviceImage = (service) =>

//     service?.thumbnail?.url ||

//     service?.thumbnail?.secure_url ||

//     service?.images?.[0]?.url ||

//     service?.images?.[0]?.secure_url ||

//     ''

// const serviceFeatures = (service) => {

//     const source = Array.isArray(service?.tabs)

//         ? service.tabs

//         : Array.isArray(service?.features)

//             ? service.features

//             : []

//     return source

//         .map((item) =>

//             typeof item === 'string'

//                 ? item

//                 : item?.title ||

//                 item?.name ||

//                 item?.label ||

//                 ''

//         )

//         .filter(Boolean)

//         .slice(0, 5)

// }

// // ============================================================

// // PRICE

// //

// // DATABASE:

// //

// // startingPrice: 400

// //

// // RESULT:

// //

// // $400

// //

// // IMPORTANT:

// // startingPrice direct dollar amount hai.

// // Isliye /100 bilkul nahi karna hai.

// // ============================================================

// const getServicePricing = (service) => {
//     const originalPrice = Number(service?.startingPrice ?? 0);
//     const currency = String(service?.startingPriceCurrency || 'USD').toUpperCase();
//     const discountEnabled = service?.discount?.enabled === true;
//     const configuredDiscount = discountEnabled ? Number(service?.discount?.value ?? 0) : 0;
//     const discountAmount = Number.isFinite(configuredDiscount)
//         ? Math.min(Math.max(configuredDiscount, 0), Math.max(originalPrice, 0))
//         : 0;

//     return {
//         originalPrice: Number.isFinite(originalPrice) ? Math.max(originalPrice, 0) : 0,
//         currency,
//         discountEnabled: discountEnabled && discountAmount > 0,
//         discountAmount,
//         finalPrice: Math.max(Number.isFinite(originalPrice) ? originalPrice : 0, 0) - discountAmount,
//     };
// };

// const formatMoney = (amount, currency = 'USD') => {
//     const value = Number(amount ?? 0);
//     try {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency,
//             minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
//             maximumFractionDigits: 2,
//         }).format(value);
//     } catch {
//         return `${currency} ${value.toFixed(2)}`;
//     }
// };

// const formattedPrice = (service) => {
//     const pricing = getServicePricing(service);
//     return formatMoney(pricing.finalPrice, pricing.currency);
// };

// // ============================================================

// // PAGE

// // ============================================================

// export default function Page() {

//     // ========================================================

//     // SUBCATEGORIES

//     // ========================================================

//     const [

//         subcategories,

//         setSubcategories

//     ] = useState([])

//     // ========================================================

//     // SERVICES

//     // ========================================================

//     const [

//         services,

//         setServices

//     ] = useState([])

//     // ========================================================

//     // SELECTED SUBCATEGORY

//     // ========================================================

//     const [

//         selectedSubcategory,

//         setSelectedSubcategory

//     ] = useState('all')

//     // ========================================================

//     // SEARCH

//     // ========================================================

//     const [

//         search,

//         setSearch

//     ] = useState('')

//     // ========================================================

//     // LOADING

//     // ========================================================

//     const [

//         loading,

//         setLoading

//     ] = useState(true)

//     // ========================================================

//     // ERROR

//     // ========================================================

//     const [

//         error,

//         setError

//     ] = useState('')

//     // ========================================================

//     // SELECTED SERVICE

//     // ========================================================

//     const [

//         selectedService,

//         setSelectedService

//     ] = useState(null)

//     // ========================================================

//     // LOAD DATA

//     // ========================================================

//     useEffect(() => {

//         let mounted = true

//         const load = async () => {

//             try {

//                 setLoading(true)

//                 setError('')

//                 const [

//                     subResponse,

//                     serviceResponse

//                 ] = await Promise.all([

//                     fetch(subcategoryApi),

//                     fetch(

//                         `${serviceApi}?status=active`

//                     ),

//                 ])

//                 if (!subResponse.ok) {

//                     throw new Error(

//                         'Unable to load subcategories'

//                     )

//                 }

//                 if (!serviceResponse.ok) {

//                     throw new Error(

//                         'Unable to load services'

//                     )

//                 }

//                 const [

//                     subJson,

//                     serviceJson

//                 ] = await Promise.all([

//                     subResponse.json(),

//                     serviceResponse.json(),

//                 ])

//                 if (!mounted) return

//                 setSubcategories(

//                     Array.isArray(

//                         subJson?.data

//                     )

//                         ? subJson.data

//                         : Array.isArray(

//                             subJson

//                         )

//                             ? subJson

//                             : []

//                 )

//                 setServices(

//                     Array.isArray(

//                         serviceJson?.data

//                     )

//                         ? serviceJson.data

//                         : Array.isArray(

//                             serviceJson

//                         )

//                             ? serviceJson

//                             : []

//                 )

//             } catch (err) {

//                 if (mounted) {

//                     setError(

//                         err?.message ||

//                         'Unable to load services'

//                     )

//                 }

//             } finally {

//                 if (mounted) {

//                     setLoading(false)

//                 }

//             }

//         }

//         load()

//         return () => {

//             mounted = false

//         }

//     }, [])

//     // ========================================================

//     // FILTER SERVICES

//     // ========================================================

//     const filteredServices = useMemo(() => {

//         let list = services

//         // ----------------------------------------------------

//         // SUBCATEGORY

//         // ----------------------------------------------------

//         if (

//             selectedSubcategory !== 'all'

//         ) {

//             list = list.filter(

//                 (service) =>

//                     serviceSubcategoryId(

//                         service

//                     ) === selectedSubcategory

//             )

//         }

//         // ----------------------------------------------------

//         // SEARCH

//         // ----------------------------------------------------

//         const term =

//             search

//                 .trim()

//                 .toLowerCase()

//         if (term) {

//             list = list.filter(

//                 (service) => {

//                     const searchable = [

//                         service?.title,

//                         service?.smallDescription,

//                         serviceSubcategoryName(

//                             service

//                         ),

//                     ]

//                         .filter(Boolean)

//                         .join(' ')

//                         .toLowerCase()

//                     return searchable.includes(

//                         term

//                     )

//                 }

//             )

//         }

//         return list

//     }, [

//         services,

//         selectedSubcategory,

//         search,

//     ])

//     // ========================================================

//     // HEADING

//     // ========================================================

//     const heading =

//         selectedSubcategory === 'all'

//             ? 'All Services'

//             : subcategoryName(

//                 subcategories.find(

//                     (item) =>

//                         idOf(item) ===

//                         selectedSubcategory

//                 )

//             )

//     // ========================================================

//     // RETURN

//     // ========================================================

//     return (

//         <>

//             <Navbar />

//             <section className="container-custom">

//                 <div className="cs-page">

//                     {/* ==================================================

//                         TOP SUBCATEGORY

//                     ================================================== */}

//                     <section className="cs-subcategory-bar">

//                         <div className="container-fluid">

//                             <div className="row">

//                                 <div className="col-12">

//                                     <div className="cs-subcategory-track">

//                                         <button

//                                             type="button"

//                                             className={`cs-subcategory-pill ${

//                                                 selectedSubcategory ===

//                                                 'all'

//                                                     ? 'is-active'

//                                                     : ''

//                                             }`}

//                                             onClick={() =>

//                                                 setSelectedSubcategory(

//                                                     'all'

//                                                 )

//                                             }

//                                         >

//                                             All

//                                         </button>

//                                         {subcategories.map(

//                                             (item) => {

//                                                 const id =

//                                                     idOf(item)

//                                                 return (

//                                                     <button

//                                                         type="button"

//                                                         key={id}

//                                                         className={`cs-subcategory-pill ${

//                                                             selectedSubcategory ===

//                                                             id

//                                                                 ? 'is-active'

//                                                                 : ''

//                                                         }`}

//                                                         onClick={() =>

//                                                             setSelectedSubcategory(

//                                                                 id

//                                                             )

//                                                         }

//                                                     >

//                                                         {

//                                                             subcategoryName(

//                                                                 item

//                                                             )

//                                                         }

//                                                     </button>

//                                                 )

//                                             }

//                                         )}

//                                     </div>

//                                 </div>

//                             </div>

//                         </div>

//                     </section>

//                     {/* ==================================================

//                         HEADER

//                     ================================================== */}

//                     <section className="cs-header">

//                         <div className="container-fluid">

//                             <div className="row align-items-center gy-3">

//                                 <div className="col-12 col-lg-7">

//                                     <h1 className="cs-title">

//                                         {heading}

//                                     </h1>

//                                     <div className="cs-count">

//                                         {

//                                             filteredServices.length

//                                         }{' '}

//                                         services available

//                                     </div>

//                                 </div>

//                                 <div className="col-12 col-lg-5">

//                                     <div className="cs-search ms-lg-auto">

//                                         <input

//                                             type="search"

//                                             className="form-control cs-search-input"

//                                             value={search}

//                                             onChange={(

//                                                 event

//                                             ) =>

//                                                 setSearch(

//                                                     event

//                                                         .target

//                                                         .value

//                                                 )

//                                             }

//                                             placeholder="Search services..."

//                                         />

//                                         <span className="cs-search-icon">

//                                             <svg

//                                                 viewBox="0 0 24 24"

//                                                 width="21"

//                                                 height="21"

//                                                 fill="none"

//                                                 stroke="currentColor"

//                                                 strokeWidth="2"

//                                             >

//                                                 <circle

//                                                     cx="11"

//                                                     cy="11"

//                                                     r="7"

//                                                 />

//                                                 <path

//                                                     d="m20 20-4-4"

//                                                 />

//                                             </svg>

//                                         </span>

//                                     </div>

//                                 </div>

//                             </div>

//                         </div>

//                     </section>

//                     {/* ==================================================

//                         SERVICES

//                     ================================================== */}

//                     <section className="cs-services">

//                         <div className="container-fluid">

//                             {/* ==================================================

//                                 LOADING

//                             ================================================== */}

//                             {loading && (

//                                 <div className="row g-4">

//                                     {Array.from({

//                                         length: 5,

//                                     }).map(

//                                         (_, index) => (

//                                             <div

//                                                 className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"

//                                                 key={index}

//                                             >

//                                                 <div className="cs-card">

//                                                     <div className="cs-skeleton-image" />

//                                                     <div className="cs-card-body">

//                                                         <div className="cs-skeleton-line w-75" />

//                                                         <div className="cs-skeleton-line w-50" />

//                                                         <div className="cs-skeleton-line w-100" />

//                                                         <div className="cs-skeleton-line w-75" />

//                                                         <div className="cs-skeleton-button" />

//                                                     </div>

//                                                 </div>

//                                             </div>

//                                         )

//                                     )}

//                                 </div>

//                             )}

//                             {/* ==================================================

//                                 ERROR

//                             ================================================== */}

//                             {!loading && error && (

//                                 <div className="row">

//                                     <div className="col-12">

//                                         <div className="alert alert-danger">

//                                             {error}

//                                         </div>

//                                     </div>

//                                 </div>

//                             )}

//                             {/* ==================================================

//                                 EMPTY

//                             ================================================== */}

//                             {!loading &&

//                                 !error &&

//                                 filteredServices.length ===

//                                 0 && (

//                                     <div className="row">

//                                         <div className="col-12">

//                                             <div className="cs-empty text-center">

//                                                 <h2>

//                                                     No services found

//                                                 </h2>

//                                                 <p>

//                                                     Try another

//                                                     subcategory

//                                                     or search

//                                                     for another

//                                                     service.

//                                                 </p>

//                                             </div>

//                                         </div>

//                                     </div>

//                                 )}

//                             {/* ==================================================

//                                 SERVICE CARDS

//                             ================================================== */}

//                             {!loading &&

//                                 !error &&

//                                 filteredServices.length >

//                                 0 && (

//                                     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">

//                                         {filteredServices.map(

//                                             (

//                                                 service

//                                             ) => {

//                                                 const image =

//                                                     serviceImage(

//                                                         service

//                                                     )

//                                                 const features =

//                                                     serviceFeatures(

//                                                         service

//                                                     )

//                                                 return (

//                                                     <div

//                                                         className="col"

//                                                         key={idOf(

//                                                             service

//                                                         )}

//                                                     >

//                                                         <article className="cs-card h-100">

//                                                             {/* ==================================================

//                                                                 IMAGE

//                                                             ================================================== */}

//                                                             <div className="cs-card-image">

//                                                                 {image ? (

//                                                                     <img

//                                                                         src={

//                                                                             image

//                                                                         }

//                                                                         alt={

//                                                                             service?.title ||

//                                                                             'Service'

//                                                                         }

//                                                                     />

//                                                                 ) : (

//                                                                     <div className="cs-no-image">

//                                                                         Service

//                                                                     </div>

//                                                                 )}

//                                                                 <button

//                                                                     type="button"

//                                                                     className="cs-heart"

//                                                                     aria-label="Favorite service"

//                                                                 >

//                                                                     ♡

//                                                                 </button>

//                                                             </div>

//                                                             {/* ==================================================

//                                                                 BODY

//                                                             ================================================== */}

//                                                             <div className="cs-card-body d-flex flex-column">

//                                                                 {/* ==================================================

//                                                                     TITLE + RATING

//                                                                 ================================================== */}

//                                                                 <div className="cs-card-title-row">

//                                                                     <h2 className="cs-card-title">

//                                                                         {

//                                                                             service?.title ||

//                                                                             'Untitled Service'

//                                                                         }

//                                                                     </h2>

//                                                                     <div className="cs-rating">

//                                                                         <span>

//                                                                             ★

//                                                                         </span>

//                                                                         <strong>

//                                                                             {

//                                                                                 service?.translatorInfo?.rating?.average !==

//                                                                                     undefined &&

//                                                                                     service?.translatorInfo?.rating?.average !==

//                                                                                     null

//                                                                                     ? Number(

//                                                                                         service

//                                                                                             .translatorInfo

//                                                                                             .rating

//                                                                                             .average

//                                                                                     ).toFixed(

//                                                                                         1

//                                                                                     )

//                                                                                     : '0.0'

//                                                                             }

//                                                                         </strong>

//                                                                     </div>

//                                                                 </div>

//                                                                 {/* ==================================================

//                                                                     FEATURES

//                                                                 ================================================== */}

//                                                                 <div className="cs-features">

//                                                                     {features.map(

//                                                                         (

//                                                                             feature,

//                                                                             index

//                                                                         ) => (

//                                                                             <div

//                                                                                 className="cs-feature"

//                                                                                 key={`${idOf(

//                                                                                     service

//                                                                                 )}-${index}`}

//                                                                             >

//                                                                                 <span className="cs-check">

//                                                                                     ✓

//                                                                                 </span>

//                                                                                 <span>

//                                                                                     {

//                                                                                         feature

//                                                                                     }

//                                                                                 </span>

//                                                                             </div>

//                                                                         )

//                                                                     )}

//                                                                 </div>

//                                                                 {/* ==================================================

//                                                                     DESCRIPTION

//                                                                 ================================================== */}

//                                                                 {service?.smallDescription && (

//                                                                     <p className="cs-description">

//                                                                         {

//                                                                             service.smallDescription

//                                                                         }

//                                                                     </p>

//                                                                 )}

//                                                                 {/* ==================================================

//                                                                     PRICE + BUY

//                                                                 ================================================== */}

//                                                                 <div>

//                                                                     {/* ==================================================

//                                                                         PRICE

//                                                                     ================================================== */}

//                                                                     <div className="cs-price pt-2 mb-3">
//     {(() => {
//         const pricing = getServicePricing(service);
//         return (
//             <div className="d-flex flex-column align-items-start gap-1">
//                 <div className="d-flex align-items-center flex-wrap gap-2">
//                     <span className="fw-bold">
//                         {formatMoney(pricing.finalPrice, pricing.currency)}
//                     </span>
//                     {pricing.discountEnabled && (
//                         <del className="text-secondary small fs-15 ps-1">
//                             {formatMoney(pricing.originalPrice, pricing.currency)}
//                         </del>
//                     )}
//                 </div>
//                 {/* {pricing.discountEnabled && (
//                     <span className="text-success small fw-semibold">
//                         Save {formatMoney(pricing.discountAmount, pricing.currency)}
//                     </span>
//                 )} */}
//             </div>
//         );
//     })()}
// </div>

//                                                                     {/* ==================================================

//                                                                         BUY NOW

//                                                                     ================================================== */}

//                                                                     <button

//                                                                         type="button"

//                                                                         className="btn border custom-btn-hover w-100 py-2"

//                                                                         onClick={() =>

//                                                                             setSelectedService(

//                                                                                 service

//                                                                             )

//                                                                         }

//                                                                     >

//                                                                         Buy Now

//                                                                     </button>

//                                                                 </div>

//                                                             </div>

//                                                         </article>

//                                                     </div>

//                                                 )

//                                             }

//                                         )}

//                                     </div>

//                                 )}

//                         </div>

//                     </section>

//                 </div>

//             </section>

//             {/* ==================================================

//                 SERVICE DETAILS DRAWER

//             ================================================== */}

//             {selectedService && (

//                 <ServiceDetails

//                     service={selectedService}

//                     onClose={() =>

//                         setSelectedService(null)

//                     }

//                 />

//             )}

//             <Footer />

//         </>

//     )

// }






// 'use client'
// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Swal from 'sweetalert2'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import ServiceDetails from '@/components/ServiceDetails'
// import './customService.css'

// const RAW_API = (
//     process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
// ).replace(/\/+$/, '')

// const API = RAW_API.endsWith('/api')
//     ? RAW_API
//     : `${RAW_API}/api`
// const subcategoryApi = `${API}/subcategories`
// const serviceApi = `${API}/services`
// const wishlistApi = `${API}/wishlist`
// // ============================================================

// const idOf = (item) =>
//     item?._id ||
//     item?.id ||
//     ''

// const subcategoryName = (item) =>
//     item?.subcategoryName ||
//     item?.name ||
//     item?.title ||
//     'Untitled'

// const serviceSubcategoryId = (service) => {
//     const value = service?.subcategory

//     if (value && typeof value === 'object') {
//         return (
//             value?._id ||
//             value?.id ||
//             ''
//         )
//     }

//     return (
//         value ||
//         service?.subcategoryId ||
//         ''
//     )
// }

// const serviceSubcategoryName = (service) => {
//     const value = service?.subcategory

//     if (value && typeof value === 'object') {
//         return (
//             value?.subcategoryName ||
//             value?.name ||
//             value?.title ||
//             ''
//         )
//     }

//     return service?.subcategoryName || ''
// }

// const serviceImage = (service) =>
//     service?.thumbnail?.url ||
//     service?.thumbnail?.secure_url ||
//     service?.images?.[0]?.url ||
//     service?.images?.[0]?.secure_url ||
//     ''

// const serviceFeatures = (service) => {
//     const source = Array.isArray(service?.tabs)
//         ? service.tabs
//         : Array.isArray(service?.features)
//             ? service.features
//             : []

//     return source
//         .map((item) =>
//             typeof item === 'string'
//                 ? item
//                 : item?.title ||
//                 item?.name ||
//                 item?.label ||
//                 ''
//         )
//         .filter(Boolean)
//         .slice(0, 5)
// }

// // ============================================================
// // PRICE
// //
// // DATABASE:
// //
// // startingPrice: 400
// //
// // RESULT:
// //
// // $400
// //
// // IMPORTANT:
// // startingPrice direct dollar amount hai.
// // Isliye /100 bilkul nahi karna hai.
// // ============================================================

// const getServicePricing = (service) => {
//     const originalPrice = Number(service?.startingPrice ?? 0);
//     const currency = String(service?.startingPriceCurrency || 'USD').toUpperCase();
//     const discountEnabled = service?.discount?.enabled === true;
//     const configuredDiscount = discountEnabled ? Number(service?.discount?.value ?? 0) : 0;
//     const discountAmount = Number.isFinite(configuredDiscount)
//         ? Math.min(Math.max(configuredDiscount, 0), Math.max(originalPrice, 0))
//         : 0;

//     return {
//         originalPrice: Number.isFinite(originalPrice) ? Math.max(originalPrice, 0) : 0,
//         currency,
//         discountEnabled: discountEnabled && discountAmount > 0,
//         discountAmount,
//         finalPrice: Math.max(Number.isFinite(originalPrice) ? originalPrice : 0, 0) - discountAmount,
//     };
// };

// const formatMoney = (amount, currency = 'USD') => {
//     const value = Number(amount ?? 0);
//     try {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency,
//             minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
//             maximumFractionDigits: 2,
//         }).format(value);
//     } catch {
//         return `${currency} ${value.toFixed(2)}`;
//     }
// };

// const formattedPrice = (service) => {
//     const pricing = getServicePricing(service);
//     return formatMoney(pricing.finalPrice, pricing.currency);
// };

// // ============================================================
// // PAGE
// // ============================================================

// export default function Page() {
//     const router = useRouter()

//     // SUBCATEGORIES
//     const [subcategories, setSubcategories] = useState([])

//     // SERVICES
//     const [services, setServices] = useState([])

//     // SELECTED SUBCATEGORY
//     const [selectedSubcategory, setSelectedSubcategory] = useState('all')

//     // SEARCH
//     const [search, setSearch] = useState('')

//     // LOADING
//     const [loading, setLoading] = useState(true)

//     // ERROR
//     const [error, setError] = useState('')

//     // SELECTED SERVICE
//     const [selectedService, setSelectedService] = useState(null)

//     // WISHLIST (ids of the services saved by the logged-in client)
//     const [wishlistIds, setWishlistIds] = useState([])
//     const [wishlistBusyId, setWishlistBusyId] = useState('')

//     // ========================================================
//     // LOAD DATA
//     // ========================================================

//     useEffect(() => {
//         let mounted = true

//         const load = async () => {
//             try {
//                 setLoading(true)
//                 setError('')

//                 const [
//                     subResponse,
//                     serviceResponse
//                 ] = await Promise.all([
//                     fetch(subcategoryApi),
//                     fetch(`${serviceApi}?status=active`),
//                 ])

//                 if (!subResponse.ok) {
//                     throw new Error('Unable to load subcategories')
//                 }

//                 if (!serviceResponse.ok) {
//                     throw new Error('Unable to load services')
//                 }

//                 const [
//                     subJson,
//                     serviceJson
//                 ] = await Promise.all([
//                     subResponse.json(),
//                     serviceResponse.json(),
//                 ])

//                 if (!mounted) return

//                 setSubcategories(
//                     Array.isArray(subJson?.data)
//                         ? subJson.data
//                         : Array.isArray(subJson)
//                             ? subJson
//                             : []
//                 )

//                 setServices(
//                     Array.isArray(serviceJson?.data)
//                         ? serviceJson.data
//                         : Array.isArray(serviceJson)
//                             ? serviceJson
//                             : []
//                 )
//             } catch (err) {
//                 if (mounted) {
//                     setError(err?.message || 'Unable to load services')
//                 }
//             } finally {
//                 if (mounted) {
//                     setLoading(false)
//                 }
//             }
//         }

//         load()

//         return () => {
//             mounted = false
//         }
//     }, [])

//     // ========================================================
//     // WISHLIST
//     // ========================================================

//     // Load the saved service ids once (not once per card).
//     const loadWishlist = useCallback(async () => {
//         // Only logged-in clients have a wishlist.
//         if (!localStorage.getItem('clientToken')) {
//             setWishlistIds([])
//             return
//         }

//         try {
//             const response = await fetch(wishlistApi, {
//                 method: 'GET',
//                 credentials: 'include',
//                 cache: 'no-store',
//             })

//             if (!response.ok) {
//                 setWishlistIds([])
//                 return
//             }

//             const result = await response.json()
//             const list = result?.wishlist?.services || []

//             setWishlistIds(list.map((item) => String(item?._id)))
//         } catch (err) {
//             console.error('WISHLIST LOAD ERROR:', err)
//         }
//     }, [])

//     useEffect(() => {
//         loadWishlist()

//         window.addEventListener('wishlist-updated', loadWishlist)
//         window.addEventListener('auth-changed', loadWishlist)

//         return () => {
//             window.removeEventListener('wishlist-updated', loadWishlist)
//             window.removeEventListener('auth-changed', loadWishlist)
//         }
//     }, [loadWishlist])

//     // Add or remove one service from the wishlist.
//     const toggleWishlist = async (serviceId) => {
//         const id = String(serviceId || '')

//         if (!id || wishlistBusyId) return

//         const isSaved = wishlistIds.includes(id)

//         setWishlistBusyId(id)

//         try {
//             const response = await fetch(`${wishlistApi}/${id}`, {
//                 method: isSaved ? 'DELETE' : 'POST',
//                 credentials: 'include',
//             })

//             const result = await response.json().catch(() => ({}))

//             if (response.status === 401) {
//                 router.push('/login')
//                 return
//             }

//             if (!response.ok || !result.success) {
//                 alert(result.message || 'Unable to update wishlist.')
//                 return
//             }

//             const list = result?.wishlist?.services || []

//             setWishlistIds(list.map((item) => String(item?._id)))

//             window.dispatchEvent(new Event('wishlist-updated'))

//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: isSaved
//                     ? 'Removed from wishlist'
//                     : 'Added to wishlist',
//                 showConfirmButton: false,
//                 timer: 1500,
//             })
//         } catch (err) {
//             console.error('WISHLIST TOGGLE ERROR:', err)
//             alert('Unable to connect to the server.')
//         } finally {
//             setWishlistBusyId('')
//         }
//     }

//     // ========================================================
//     // FILTER SERVICES
//     // ========================================================

//     const filteredServices = useMemo(() => {
//         let list = services

//         // SUBCATEGORY
//         if (selectedSubcategory !== 'all') {
//             list = list.filter(
//                 (service) =>
//                     serviceSubcategoryId(service) === selectedSubcategory
//             )
//         }

//         // SEARCH
//         const term = search.trim().toLowerCase()

//         if (term) {
//             list = list.filter((service) => {
//                 const searchable = [
//                     service?.title,
//                     service?.smallDescription,
//                     serviceSubcategoryName(service),
//                 ]
//                     .filter(Boolean)
//                     .join(' ')
//                     .toLowerCase()

//                 return searchable.includes(term)
//             })
//         }

//         return list
//     }, [
//         services,
//         selectedSubcategory,
//         search,
//     ])

//     // ========================================================
//     // HEADING
//     // ========================================================

//     const heading =
//         selectedSubcategory === 'all'
//             ? 'All Services'
//             : subcategoryName(
//                 subcategories.find(
//                     (item) => idOf(item) === selectedSubcategory
//                 )
//             )

//     // ========================================================
//     // RETURN
//     // ========================================================

//     return (
//         <>
//             <Navbar />

//             <section className="container-custom">
//                 <div className="cs-page">
//                     {/* TOP SUBCATEGORY */}
//                     <section className="cs-subcategory-bar">
//                         <div className="container-fluid">
//                             <div className="row">
//                                 <div className="col-12">
//                                     <div className="cs-subcategory-track">
//                                         <button
//                                             type="button"
//                                             className={`cs-subcategory-pill ${
//                                                 selectedSubcategory === 'all'
//                                                     ? 'is-active'
//                                                     : ''
//                                             }`}
//                                             onClick={() =>
//                                                 setSelectedSubcategory('all')
//                                             }
//                                         >
//                                             All
//                                         </button>

//                                         {subcategories.map((item) => {
//                                             const id = idOf(item)

//                                             return (
//                                                 <button
//                                                     type="button"
//                                                     key={id}
//                                                     className={`cs-subcategory-pill ${
//                                                         selectedSubcategory === id
//                                                             ? 'is-active'
//                                                             : ''
//                                                     }`}
//                                                     onClick={() =>
//                                                         setSelectedSubcategory(id)
//                                                     }
//                                                 >
//                                                     {subcategoryName(item)}
//                                                 </button>
//                                             )
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//                     {/* HEADER */}
//                     <section className="cs-header">
//                         <div className="container-fluid">
//                             <div className="row align-items-center gy-3">
//                                 <div className="col-12 col-lg-7">
//                                     <h1 className="cs-title">
//                                         {heading}
//                                     </h1>

//                                     <div className="cs-count">
//                                         {filteredServices.length}{' '}
//                                         services available
//                                     </div>
//                                 </div>

//                                 <div className="col-12 col-lg-5">
//                                     <div className="cs-search ms-lg-auto">
//                                         <input
//                                             type="search"
//                                             className="form-control cs-search-input"
//                                             value={search}
//                                             onChange={(event) =>
//                                                 setSearch(event.target.value)
//                                             }
//                                             placeholder="Search services..."
//                                         />

//                                         <span className="cs-search-icon">
//                                             <svg
//                                                 viewBox="0 0 24 24"
//                                                 width="21"
//                                                 height="21"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 strokeWidth="2"
//                                             >
//                                                 <circle
//                                                     cx="11"
//                                                     cy="11"
//                                                     r="7"
//                                                 />
//                                                 <path d="m20 20-4-4" />
//                                             </svg>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//                     {/* SERVICES */}
//                     <section className="cs-services">
//                         <div className="container-fluid">
//                             {/* LOADING */}
//                             {loading && (
//                                 <div className="row g-4">
//                                     {Array.from({
//                                         length: 5,
//                                     }).map((_, index) => (
//                                         <div
//                                             className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
//                                             key={index}
//                                         >
//                                             <div className="cs-card">
//                                                 <div className="cs-skeleton-image" />

//                                                 <div className="cs-card-body">
//                                                     <div className="cs-skeleton-line w-75" />
//                                                     <div className="cs-skeleton-line w-50" />
//                                                     <div className="cs-skeleton-line w-100" />
//                                                     <div className="cs-skeleton-line w-75" />
//                                                     <div className="cs-skeleton-button" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* ERROR */}
//                             {!loading && error && (
//                                 <div className="row">
//                                     <div className="col-12">
//                                         <div className="alert alert-danger">
//                                             {error}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* EMPTY */}
//                             {!loading &&
//                                 !error &&
//                                 filteredServices.length === 0 && (
//                                     <div className="row">
//                                         <div className="col-12">
//                                             <div className="cs-empty text-center">
//                                                 <h2>No services found</h2>

//                                                 <p>
//                                                     Try another subcategory or
//                                                     search for another service.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                             {/* SERVICE CARDS */}
//                             {!loading &&
//                                 !error &&
//                                 filteredServices.length > 0 && (
//                                     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
//                                         {filteredServices.map((service) => {
//                                             const image = serviceImage(service)
//                                             const features = serviceFeatures(service)
//                                             const serviceId = String(idOf(service))
//                                             const isSaved = wishlistIds.includes(serviceId)

//                                             return (
//                                                 <div
//                                                     className="col"
//                                                     key={idOf(service)}
//                                                 >
//                                                     <article className="cs-card h-100">
//                                                         {/* IMAGE */}
//                                                         <div className="cs-card-image">
//                                                             {image ? (
//                                                                 <img
//                                                                     src={image}
//                                                                     alt={
//                                                                         service?.title ||
//                                                                         'Service'
//                                                                     }
//                                                                 />
//                                                             ) : (
//                                                                 <div className="cs-no-image">
//                                                                     Service
//                                                                 </div>
//                                                             )}

//                                                             <button
//                                                                 type="button"
//                                                                 className="cs-heart"
//                                                                 aria-label={
//                                                                     isSaved
//                                                                         ? 'Remove from wishlist'
//                                                                         : 'Add to wishlist'
//                                                                 }
//                                                                 aria-pressed={isSaved}
//                                                                 disabled={
//                                                                     wishlistBusyId === serviceId
//                                                                 }
//                                                                 style={
//                                                                     isSaved
//                                                                         ? { color: '#e0245e' }
//                                                                         : undefined
//                                                                 }
//                                                                 onClick={() =>
//                                                                     toggleWishlist(serviceId)
//                                                                 }
//                                                             >
//                                                                 {isSaved ? '♥' : '♡'}
//                                                             </button>
//                                                         </div>

//                                                         {/* BODY */}
//                                                         <div className="cs-card-body d-flex flex-column">
//                                                             {/* TITLE + RATING */}
//                                                             <div className="cs-card-title-row">
//                                                                 <h2 className="cs-card-title">
//                                                                     {service?.title ||
//                                                                         'Untitled Service'}
//                                                                 </h2>

//                                                                 <div className="cs-rating">
//                                                                     <span>★</span>

//                                                                     <strong>
//                                                                         {service?.translatorInfo?.rating?.average !==
//                                                                             undefined &&
//                                                                         service?.translatorInfo?.rating?.average !==
//                                                                             null
//                                                                             ? Number(
//                                                                                   service
//                                                                                       .translatorInfo
//                                                                                       .rating
//                                                                                       .average
//                                                                               ).toFixed(1)
//                                                                             : '0.0'}
//                                                                     </strong>
//                                                                 </div>
//                                                             </div>

//                                                             {/* FEATURES */}
//                                                             <div className="cs-features">
//                                                                 {features.map(
//                                                                     (feature, index) => (
//                                                                         <div
//                                                                             className="cs-feature"
//                                                                             key={`${idOf(
//                                                                                 service
//                                                                             )}-${index}`}
//                                                                         >
//                                                                             <span className="cs-check">
//                                                                                 ✓
//                                                                             </span>

//                                                                             <span>
//                                                                                 {feature}
//                                                                             </span>
//                                                                         </div>
//                                                                     )
//                                                                 )}
//                                                             </div>

//                                                             {/* DESCRIPTION */}
//                                                             {service?.smallDescription && (
//                                                                 <p className="cs-description">
//                                                                     {service.smallDescription}
//                                                                 </p>
//                                                             )}

//                                                             {/* PRICE + BUY */}
//                                                             <div>
//                                                                 {/* PRICE */}
//                                                                 <div className="cs-price pt-2 mb-3">
//                                                                     {(() => {
//                                                                         const pricing = getServicePricing(service);
//                                                                         return (
//                                                                             <div className="d-flex flex-column align-items-start gap-1">
//                                                                                 <div className="d-flex align-items-center flex-wrap gap-2">
//                                                                                     <span className="fw-bold">
//                                                                                         {formatMoney(pricing.finalPrice, pricing.currency)}
//                                                                                     </span>
//                                                                                     {pricing.discountEnabled && (
//                                                                                         <del className="text-secondary small fs-15 ps-1">
//                                                                                             {formatMoney(pricing.originalPrice, pricing.currency)}
//                                                                                         </del>
//                                                                                     )}
//                                                                                 </div>
//                                                                                 {/* {pricing.discountEnabled && (
//                                                                                     <span className="text-success small fw-semibold">
//                                                                                         Save {formatMoney(pricing.discountAmount, pricing.currency)}
//                                                                                     </span>
//                                                                                 )} */}
//                                                                             </div>
//                                                                         );
//                                                                     })()}
//                                                                 </div>

//                                                                 {/* BUY NOW */}
//                                                                 <button
//                                                                     type="button"
//                                                                     className="btn border custom-btn-hover w-100 py-2"
//                                                                     onClick={() =>
//                                                                         setSelectedService(service)
//                                                                     }
//                                                                 >
//                                                                     Buy Now
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     </article>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 )}
//                         </div>
//                     </section>
//                 </div>
//             </section>

//             {/* SERVICE DETAILS DRAWER */}
//             {selectedService && (
//                 <ServiceDetails
//                     service={selectedService}
//                     onClose={() => setSelectedService(null)}
//                 />
//             )}

//             <Footer />
//         </>
//     )
// }


























'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServiceDetails from '@/components/ServiceDetails'
import './customService.css'

const RAW_API = (
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
).replace(/\/+$/, '')

const API = RAW_API.endsWith('/api')
    ? RAW_API
    : `${RAW_API}/api`
const subcategoryApi = `${API}/subcategories`
const serviceApi = `${API}/services`
const wishlistApi = `${API}/wishlist`

// Small message in the corner. It is shown above the fixed navbar
// and does not dim the page.
const showWishlistToast = (icon, title) =>
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon,
        title,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
            const container = Swal.getContainer()

            if (container) {
                container.style.zIndex = '999999'
            }
        },
    })
// ============================================================

const idOf = (item) =>
    item?._id ||
    item?.id ||
    ''

const subcategoryName = (item) =>
    item?.subcategoryName ||
    item?.name ||
    item?.title ||
    'Untitled'

const serviceSubcategoryId = (service) => {
    const value = service?.subcategory

    if (value && typeof value === 'object') {
        return (
            value?._id ||
            value?.id ||
            ''
        )
    }

    return (
        value ||
        service?.subcategoryId ||
        ''
    )
}

const serviceSubcategoryName = (service) => {
    const value = service?.subcategory

    if (value && typeof value === 'object') {
        return (
            value?.subcategoryName ||
            value?.name ||
            value?.title ||
            ''
        )
    }

    return service?.subcategoryName || ''
}

const serviceImage = (service) =>
    service?.thumbnail?.url ||
    service?.thumbnail?.secure_url ||
    service?.images?.[0]?.url ||
    service?.images?.[0]?.secure_url ||
    ''

const serviceFeatures = (service) => {
    const source = Array.isArray(service?.tabs)
        ? service.tabs
        : Array.isArray(service?.features)
            ? service.features
            : []

    return source
        .map((item) =>
            typeof item === 'string'
                ? item
                : item?.title ||
                item?.name ||
                item?.label ||
                ''
        )
        .filter(Boolean)
        .slice(0, 5)
}

// ============================================================
// PRICE
//
// DATABASE:
//
// startingPrice: 400
//
// RESULT:
//
// $400
//
// IMPORTANT:
// startingPrice direct dollar amount hai.
// Isliye /100 bilkul nahi karna hai.
// ============================================================

const getServicePricing = (service) => {
    const originalPrice = Number(service?.startingPrice ?? 0);
    const currency = String(service?.startingPriceCurrency || 'USD').toUpperCase();
    const discountEnabled = service?.discount?.enabled === true;
    const configuredDiscount = discountEnabled ? Number(service?.discount?.value ?? 0) : 0;
    const discountAmount = Number.isFinite(configuredDiscount)
        ? Math.min(Math.max(configuredDiscount, 0), Math.max(originalPrice, 0))
        : 0;

    return {
        originalPrice: Number.isFinite(originalPrice) ? Math.max(originalPrice, 0) : 0,
        currency,
        discountEnabled: discountEnabled && discountAmount > 0,
        discountAmount,
        finalPrice: Math.max(Number.isFinite(originalPrice) ? originalPrice : 0, 0) - discountAmount,
    };
};

const formatMoney = (amount, currency = 'USD') => {
    const value = Number(amount ?? 0);
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
            maximumFractionDigits: 2,
        }).format(value);
    } catch {
        return `${currency} ${value.toFixed(2)}`;
    }
};

const formattedPrice = (service) => {
    const pricing = getServicePricing(service);
    return formatMoney(pricing.finalPrice, pricing.currency);
};

// ============================================================
// PAGE
// ============================================================

export default function Page() {
    const router = useRouter()

    // SUBCATEGORIES
    const [subcategories, setSubcategories] = useState([])

    // SERVICES
    const [services, setServices] = useState([])

    // SELECTED SUBCATEGORY
    const [selectedSubcategory, setSelectedSubcategory] = useState('all')

    // SEARCH
    const [search, setSearch] = useState('')

    // LOADING
    const [loading, setLoading] = useState(true)

    // ERROR
    const [error, setError] = useState('')

    // SELECTED SERVICE
    const [selectedService, setSelectedService] = useState(null)

    // WISHLIST (ids of the services saved by the logged-in client)
    const [wishlistIds, setWishlistIds] = useState([])
    const [wishlistBusyId, setWishlistBusyId] = useState('')

    // ========================================================
    // LOAD DATA
    // ========================================================

    useEffect(() => {
        let mounted = true

        const load = async () => {
            try {
                setLoading(true)
                setError('')

                const [
                    subResponse,
                    serviceResponse
                ] = await Promise.all([
                    fetch(subcategoryApi),
                    fetch(`${serviceApi}?status=active`),
                ])

                if (!subResponse.ok) {
                    throw new Error('Unable to load subcategories')
                }

                if (!serviceResponse.ok) {
                    throw new Error('Unable to load services')
                }

                const [
                    subJson,
                    serviceJson
                ] = await Promise.all([
                    subResponse.json(),
                    serviceResponse.json(),
                ])

                if (!mounted) return

                setSubcategories(
                    Array.isArray(subJson?.data)
                        ? subJson.data
                        : Array.isArray(subJson)
                            ? subJson
                            : []
                )

                setServices(
                    Array.isArray(serviceJson?.data)
                        ? serviceJson.data
                        : Array.isArray(serviceJson)
                            ? serviceJson
                            : []
                )
            } catch (err) {
                if (mounted) {
                    setError(err?.message || 'Unable to load services')
                }
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        load()

        return () => {
            mounted = false
        }
    }, [])

    // ========================================================
    // WISHLIST
    // ========================================================

    // Load the saved service ids once (not once per card).
    const loadWishlist = useCallback(async () => {
        // Only logged-in clients have a wishlist.
        if (!localStorage.getItem('clientToken')) {
            setWishlistIds([])
            return
        }

        try {
            const response = await fetch(wishlistApi, {
                method: 'GET',
                credentials: 'include',
                cache: 'no-store',
            })

            if (!response.ok) {
                setWishlistIds([])
                return
            }

            const result = await response.json()
            const list = result?.wishlist?.services || []

            setWishlistIds(list.map((item) => String(item?._id)))
        } catch (err) {
            console.error('WISHLIST LOAD ERROR:', err)
        }
    }, [])

    useEffect(() => {
        loadWishlist()

        window.addEventListener('wishlist-updated', loadWishlist)
        window.addEventListener('auth-changed', loadWishlist)

        return () => {
            window.removeEventListener('wishlist-updated', loadWishlist)
            window.removeEventListener('auth-changed', loadWishlist)
        }
    }, [loadWishlist])

    // Add or remove one service from the wishlist.
    const toggleWishlist = async (serviceId) => {
        const id = String(serviceId || '')

        if (!id || wishlistBusyId) return

        const isSaved = wishlistIds.includes(id)

        setWishlistBusyId(id)

        try {
            const response = await fetch(`${wishlistApi}/${id}`, {
                method: isSaved ? 'DELETE' : 'POST',
                credentials: 'include',
            })

            const result = await response.json().catch(() => ({}))

            if (response.status === 401) {
                router.push('/login')
                return
            }

            if (!response.ok || !result.success) {
                alert(result.message || 'Unable to update wishlist.')
                return
            }

            const list = result?.wishlist?.services || []

            setWishlistIds(list.map((item) => String(item?._id)))

            window.dispatchEvent(new Event('wishlist-updated'))

            // Added = success icon, removed = info icon.
            if (isSaved) {
                showWishlistToast('info', 'Removed from wishlist')
            } else {
                showWishlistToast('success', 'Added to wishlist')
            }
        } catch (err) {
            console.error('WISHLIST TOGGLE ERROR:', err)
            alert('Unable to connect to the server.')
        } finally {
            setWishlistBusyId('')
        }
    }

    // ========================================================
    // FILTER SERVICES
    // ========================================================

    const filteredServices = useMemo(() => {
        let list = services

        // SUBCATEGORY
        if (selectedSubcategory !== 'all') {
            list = list.filter(
                (service) =>
                    serviceSubcategoryId(service) === selectedSubcategory
            )
        }

        // SEARCH
        const term = search.trim().toLowerCase()

        if (term) {
            list = list.filter((service) => {
                const searchable = [
                    service?.title,
                    service?.smallDescription,
                    serviceSubcategoryName(service),
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()

                return searchable.includes(term)
            })
        }

        return list
    }, [
        services,
        selectedSubcategory,
        search,
    ])

    // ========================================================
    // HEADING
    // ========================================================

    const heading =
        selectedSubcategory === 'all'
            ? 'All Services'
            : subcategoryName(
                subcategories.find(
                    (item) => idOf(item) === selectedSubcategory
                )
            )

    // ========================================================
    // RETURN
    // ========================================================

    return (
        <>
            <Navbar />

            <section className="container-custom">
                <div className="cs-page">
                    {/* TOP SUBCATEGORY */}
                    <section className="cs-subcategory-bar">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="cs-subcategory-track">
                                        <button
                                            type="button"
                                            className={`cs-subcategory-pill ${
                                                selectedSubcategory === 'all'
                                                    ? 'is-active'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                setSelectedSubcategory('all')
                                            }
                                        >
                                            All
                                        </button>

                                        {subcategories.map((item) => {
                                            const id = idOf(item)

                                            return (
                                                <button
                                                    type="button"
                                                    key={id}
                                                    className={`cs-subcategory-pill ${
                                                        selectedSubcategory === id
                                                            ? 'is-active'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        setSelectedSubcategory(id)
                                                    }
                                                >
                                                    {subcategoryName(item)}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* HEADER */}
                    <section className="cs-header">
                        <div className="container-fluid">
                            <div className="row align-items-center gy-3">
                                <div className="col-12 col-lg-7">
                                    <h1 className="cs-title">
                                        {heading}
                                    </h1>

                                    <div className="cs-count">
                                        {filteredServices.length}{' '}
                                        services available
                                    </div>
                                </div>

                                <div className="col-12 col-lg-5">
                                    <div className="cs-search ms-lg-auto">
                                        <input
                                            type="search"
                                            className="form-control cs-search-input"
                                            value={search}
                                            onChange={(event) =>
                                                setSearch(event.target.value)
                                            }
                                            placeholder="Search services..."
                                        />

                                        <span className="cs-search-icon">
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="21"
                                                height="21"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <circle
                                                    cx="11"
                                                    cy="11"
                                                    r="7"
                                                />
                                                <path d="m20 20-4-4" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SERVICES */}
                    <section className="cs-services">
                        <div className="container-fluid">
                            {/* LOADING */}
                            {loading && (
                                <div className="row g-4">
                                    {Array.from({
                                        length: 5,
                                    }).map((_, index) => (
                                        <div
                                            className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
                                            key={index}
                                        >
                                            <div className="cs-card">
                                                <div className="cs-skeleton-image" />

                                                <div className="cs-card-body">
                                                    <div className="cs-skeleton-line w-75" />
                                                    <div className="cs-skeleton-line w-50" />
                                                    <div className="cs-skeleton-line w-100" />
                                                    <div className="cs-skeleton-line w-75" />
                                                    <div className="cs-skeleton-button" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ERROR */}
                            {!loading && error && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* EMPTY */}
                            {!loading &&
                                !error &&
                                filteredServices.length === 0 && (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="cs-empty text-center">
                                                <h2>No services found</h2>

                                                <p>
                                                    Try another subcategory or
                                                    search for another service.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            {/* SERVICE CARDS */}
                            {!loading &&
                                !error &&
                                filteredServices.length > 0 && (
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                                        {filteredServices.map((service) => {
                                            const image = serviceImage(service)
                                            const features = serviceFeatures(service)
                                            const serviceId = String(idOf(service))
                                            const isSaved = wishlistIds.includes(serviceId)

                                            return (
                                                <div
                                                    className="col"
                                                    key={idOf(service)}
                                                >
                                                    <article className="cs-card h-100">
                                                        {/* IMAGE */}
                                                        <div className="cs-card-image">
                                                            {image ? (
                                                                <img
                                                                    src={image}
                                                                    alt={
                                                                        service?.title ||
                                                                        'Service'
                                                                    }
                                                                />
                                                            ) : (
                                                                <div className="cs-no-image">
                                                                    Service
                                                                </div>
                                                            )}

                                                            <button
                                                                type="button"
                                                                className="cs-heart"
                                                                aria-label={
                                                                    isSaved
                                                                        ? 'Remove from wishlist'
                                                                        : 'Add to wishlist'
                                                                }
                                                                aria-pressed={isSaved}
                                                                disabled={
                                                                    wishlistBusyId === serviceId
                                                                }
                                                                style={
                                                                    isSaved
                                                                        ? { color: '#e0245e' }
                                                                        : undefined
                                                                }
                                                                onClick={() =>
                                                                    toggleWishlist(serviceId)
                                                                }
                                                            >
                                                                {isSaved ? '♥' : '♡'}
                                                            </button>
                                                        </div>

                                                        {/* BODY */}
                                                        <div className="cs-card-body d-flex flex-column">
                                                            {/* TITLE + RATING */}
                                                            <div className="cs-card-title-row">
                                                                <h2 className="cs-card-title">
                                                                    {service?.title ||
                                                                        'Untitled Service'}
                                                                </h2>

                                                                <div className="cs-rating">
                                                                    <span>★</span>

                                                                    <strong>
                                                                        {service?.translatorInfo?.rating?.average !==
                                                                            undefined &&
                                                                        service?.translatorInfo?.rating?.average !==
                                                                            null
                                                                            ? Number(
                                                                                  service
                                                                                      .translatorInfo
                                                                                      .rating
                                                                                      .average
                                                                              ).toFixed(1)
                                                                            : '0.0'}
                                                                    </strong>
                                                                </div>
                                                            </div>

                                                            {/* FEATURES */}
                                                            <div className="cs-features">
                                                                {features.map(
                                                                    (feature, index) => (
                                                                        <div
                                                                            className="cs-feature"
                                                                            key={`${idOf(
                                                                                service
                                                                            )}-${index}`}
                                                                        >
                                                                            <span className="cs-check">
                                                                                ✓
                                                                            </span>

                                                                            <span>
                                                                                {feature}
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>

                                                            {/* DESCRIPTION */}
                                                            {service?.smallDescription && (
                                                                <p className="cs-description">
                                                                    {service.smallDescription}
                                                                </p>
                                                            )}

                                                            {/* PRICE + BUY */}
                                                            <div>
                                                                {/* PRICE */}
                                                                <div className="cs-price pt-2 mb-3">
                                                                    {(() => {
                                                                        const pricing = getServicePricing(service);
                                                                        return (
                                                                            <div className="d-flex flex-column align-items-start gap-1">
                                                                                <div className="d-flex align-items-center flex-wrap gap-2">
                                                                                    <span className="fw-bold">
                                                                                        {formatMoney(pricing.finalPrice, pricing.currency)}
                                                                                    </span>
                                                                                    {pricing.discountEnabled && (
                                                                                        <del className="text-secondary small fs-15 ps-1">
                                                                                            {formatMoney(pricing.originalPrice, pricing.currency)}
                                                                                        </del>
                                                                                    )}
                                                                                </div>
                                                                                {/* {pricing.discountEnabled && (
                                                                                    <span className="text-success small fw-semibold">
                                                                                        Save {formatMoney(pricing.discountAmount, pricing.currency)}
                                                                                    </span>
                                                                                )} */}
                                                                            </div>
                                                                        );
                                                                    })()}
                                                                </div>

                                                                {/* BUY NOW */}
                                                                <button
                                                                    type="button"
                                                                    className="btn border custom-btn-hover w-100 py-2"
                                                                    onClick={() =>
                                                                        setSelectedService(service)
                                                                    }
                                                                >
                                                                    Buy Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                        </div>
                    </section>
                </div>
            </section>

            {/* SERVICE DETAILS DRAWER */}
            {selectedService && (
                <ServiceDetails
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}

            <Footer />
        </>
    )
}
