
'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './documentTranslation.css'

const RAW_API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/$/, '')
const API = RAW_API.endsWith('/api') ? RAW_API : `${RAW_API}/api`
const UPLOAD_URL = `${API}/translation-uploads`
const SETTINGS_URL = `${API}/word-price-settings`
const ADDONS_URL = `${API}/service-addons`
const pick = (...values) => values.find((value) => value !== undefined && value !== null && value !== '')

const formatMoney = (amount, currency = 'USD') => {
  const value = Number(amount || 0)
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value)
  } catch {
    return `${currency} ${value}`
  }
}

export default function DocumentTranslationPage() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [settings, setSettings] = useState(null)
  const [settingsMessage, setSettingsMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [addons, setAddons] = useState([])
  const [selectedAddons, setSelectedAddons] = useState([])

  useEffect(() => {
    let active = true
    fetch(SETTINGS_URL)
      .then(async (response) => {
        const json = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(json?.message || 'Pricing settings are not available yet.')
        return json
      })
      .then((json) => {
        if (active) setSettings(json?.data?.settings || json?.data || json?.settings || null)
      })
      .catch(() => {
        if (active) setSettingsMessage('Price will be confirmed by the server after it reads your document.')
      })
    return () => { active = false }
  }, [])

  useEffect(() => {
    let active = true
    fetch(ADDONS_URL)
      .then((response) => response.json().then((json) => ({ ok: response.ok, json })))
      .then(({ ok, json }) => {
        if (active && ok && Array.isArray(json?.data)) setAddons(json.data)
      })
      .catch((err) => console.error('GET ADDONS ERROR:', err))
    return () => { active = false }
  }, [])

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }
  const clearAddons = () => setSelectedAddons([])

  const selectFile = (selected) => {
    setError('')
    setResult(null)
    if (!selected) { setFile(null); return }
    const extension = selected.name.split('.').pop()?.toLowerCase()
    if (!['pdf', 'docx', 'doc', 'txt'].includes(extension)) {
      setFile(null)
      if (inputRef.current) inputRef.current.value = ''
      setError('Please upload a PDF, DOC, DOCX, or TXT file.')
      return
    }
    const maxMb = Number(settings?.maxFileSizeMB || 100)
    if (selected.size > maxMb * 1024 * 1024) {
      setFile(null)
      if (inputRef.current) inputRef.current.value = ''
      setError(`File size must be ${maxMb} MB or less.`)
      return
    }
    setFile(selected)
  }

  const submitDocument = async (event) => {
    event.preventDefault()
    setError('')
    setResult(null)
    if (!file) { setError('Please choose a document first.'); return }

    const body = new FormData()
    body.append('file', file)

    try {
      setUploading(true)
      const response = await fetch(UPLOAD_URL, { method: 'POST', body })
      const json = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(json?.message || json?.error || `Upload failed (${response.status}).`)
      setResult(json?.data || json?.upload || json)
    } catch (err) {
      setError(err?.message || 'Unable to process this document. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const wordCount = pick(result?.wordCount, result?.totalWords, result?.document?.wordCount, result?.extractedWordCount)
  const pages = pick(result?.billablePages, result?.pageCount, result?.pages, result?.calculation?.pages, result?.pricing?.pages)
  const detectedLanguage = pick(result?.detectedLanguage, result?.documentLanguage, result?.language, result?.document?.detectedLanguage)
  const multiplier = pick(result?.priceMultiplier, result?.pricing?.priceMultiplier, result?.multiplier)
  const totalPrice = pick(result?.totalPrice, result?.finalPrice, result?.pricing?.totalPrice, result?.pricing?.total, result?.amount)
  const currencyRaw = pick(result?.currency, result?.pricing?.currency, result?.startingPriceCurrency, settings?.currency, 'USD')
  const currency = String(currencyRaw).toUpperCase()
  const selectedItems = addons.filter((addon) => selectedAddons.includes(addon._id))
  const addonsTotal = selectedItems.reduce((sum, addon) => sum + Number(addon.price || 0), 0)
  const noAddonSelected = selectedAddons.length === 0
  const baseTotal = totalPrice !== undefined && Number.isFinite(Number(totalPrice))
    ? (Number(totalPrice) > 100000 ? Number(totalPrice) / 100 : Number(totalPrice))
    : null
  const formattedPrice = baseTotal !== null
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(baseTotal + addonsTotal)
    : null

  return (
    <>
      <Navbar />
      <main className="dt-page container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="dt-intro text-center mb-4 mb-lg-5">
              <span className="dt-eyebrow">DOCUMENT TRANSLATION</span>
              <h1>Upload your document</h1>
              <p>We’ll read the file, detect its language, count the words, and calculate your price automatically.</p>
            </div>

            <div className="row g-4 align-items-stretch">
              <div className="col-12 col-lg-7">
                <form className="dt-card h-100" onSubmit={submitDocument}>
                  <div className="dt-card-heading">
                    <span className="dt-step">01</span>
                    <div><h2>Upload your document</h2><p>PDF, DOC, DOCX or TXT · Maximum {settings?.maxFileSizeMB || 100} MB</p></div>
                  </div>
                  <input ref={inputRef} className="d-none" type="file" accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => selectFile(e.target.files?.[0])} />
                  <button type="button" className={`dt-dropzone w-100 ${file ? 'dt-dropzone-selected' : ''}`} onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); selectFile(e.dataTransfer.files?.[0]) }}>
                    <span className="dt-upload-icon"><i className="fa-solid fa-cloud-arrow-up" /></span>
                    {file ? <><strong>{file.name}</strong><small>{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to process</small></> : <><strong>Click to choose a file or drag it here</strong><small>Upload only. You do not need to select any language.</small></>}
                    <span className="dt-choose">{file ? 'Choose another file' : 'Browse files'}</span>
                  </button>

                  <div className="dt-auto-info mt-4">
                    <span className="dt-step">02</span>
                    <div><h2>Automatic document analysis</h2><p>The server will detect the language and count words directly from your uploaded file.</p></div>
                  </div>
                  <ul className="dt-process-list">
                    <li><i className="fa-solid fa-check-circle" /> No language selection required</li>
                    {/* <li><i className="fa-solid fa-check-circle" /> Every 250 words count as 1 billable page</li> */}
                    <li>
                      <i className="fa-solid fa-check-circle" /> Every{" "}
                      {settings?.wordsPerPage ?? 250} words count as 1 billable page
                    </li>
                    <li><i className="fa-solid fa-check-circle" /> Non-English documents are priced at 2× the base price</li>
                  </ul>

                  {error && <div className="alert alert-danger mt-4 mb-0" role="alert">{error}</div>}
                  <button className="btn dt-submit w-100 mt-4" type="submit" disabled={uploading || !file}>
                    {uploading ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Reading document...</> : <>Upload &amp; calculate price <i className="fa-solid fa-arrow-right ms-2" /></>}
                  </button>
                  <p className="dt-privacy"><i className="fa-solid fa-lock me-2" />Word count and language must be verified by the server.</p>
                </form>
              </div>

              <div className="col-12 col-lg-5">
                <aside className="dt-summary h-100">
                  <span className="dt-summary-icon"><i className="fa-solid fa-file-lines" /></span>
                  <h2>Your estimate</h2>
                  <p className="dt-summary-copy">Upload your document to see the detected language, word count, billable pages, and price.</p>
                  <div className="dt-rule" />
                  {/* <div className="dt-summary-row"><span>Pricing unit</span><strong>250 words = 1 page</strong></div>
                  <div className="dt-summary-row"><span>Detected language</span><strong>{detectedLanguage || 'Pending document scan'}</strong></div>
                  <div className="dt-summary-row"><span>Price rule</span><strong>{multiplier !== undefined ? `${Number(multiplier)}× ${Number(multiplier) === 1 ? '(base price)' : '(double price)'}` : 'Pending document scan'}</strong></div> */}
                  <div className="dt-summary-row"><span>Document words</span><strong>{wordCount !== undefined ? Number(wordCount).toLocaleString() : '—'}</strong></div>
                  <div className="dt-summary-row"><span>Billable pages</span><strong>{pages !== undefined ? Number(pages).toLocaleString() : '—'}</strong></div>
                  {addonsTotal > 0 && <div className="dt-summary-row"><span>Add-ons</span><strong>+ {formatMoney(addonsTotal, currency)}</strong></div>}
                  <div className="dt-total"><span>Estimated total</span><strong>{formattedPrice || '—'}</strong></div>
                  {settingsMessage && <p className="dt-settings-note">{settingsMessage}</p>}
                  {result && <div className="dt-success mt-3"><i className="fa-solid fa-circle-check me-2" />Server returned a document analysis result.</div>}
                  <div className="dt-note"><i className="fa-solid fa-circle-info" /><span>English document: normal price. Any other detected language: double price. The server must calculate and return the final values.</span></div>

                  {addons.length > 0 && (
                    <section className="dt-addons">
                      <h3 className="dt-addons-title">Add-ons</h3>
                      <div className="dt-addons-grid">
                        <label htmlFor="addon-none" className={`dt-addon ${noAddonSelected ? 'dt-addon-selected' : ''}`}>
                          <input type="checkbox" className="form-check-input dt-addon-check" id="addon-none" checked={noAddonSelected} onChange={clearAddons} />
                          <span className="dt-addon-text">
                            <span className="dt-addon-name">No Certification</span>
                          </span>
                        </label>
                        {addons.map((addon) => {
                          const isSelected = selectedAddons.includes(addon._id)
                          return (
                            <label key={addon._id} htmlFor={`addon-${addon._id}`} className={`dt-addon ${isSelected ? 'dt-addon-selected' : ''}`}>
                              <input type="checkbox" className="form-check-input dt-addon-check" id={`addon-${addon._id}`} checked={isSelected} onChange={() => toggleAddon(addon._id)} />
                              <span className="dt-addon-text">
                                <span className="dt-addon-name">{addon.name}</span>
                                <span className="dt-addon-price">+ {formatMoney(addon.price, currency)}</span>
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </section>
                  )}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

