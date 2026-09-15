'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adrian.pratama@studiofolio.id')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-poppins antialiased selection:bg-[#0D99FF] selection:text-white pb-14">
      {/* ========================================================== */}
      {/* 1. TOP MINIMAL NAVIGATION BAR                              */}
      {/* ========================================================== */}
      <nav
        aria-label="Contact Navigation"
        className="sticky top-0 z-40 border-b border-[#E8E4DA] bg-[#FAF8F5]/95 px-6 py-3.5 backdrop-blur-md sm:px-10 md:px-14"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between font-mono text-xs">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-semibold text-[#111111] transition-colors hover:text-[#0D99FF]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D5D0C5] bg-white text-[11px] shadow-2xs transition-transform group-hover:-translate-x-0.5 group-hover:border-[#0D99FF]">
              &larr;
            </span>
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-[#D5D0C5] bg-white px-3 py-1 text-[11px] text-[#55524C]">
              <span className="h-2 w-2 rounded-full bg-[#0ACF83] animate-pulse" />
              <span>Available for New Projects</span>
            </span>

            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#D5D0C5] bg-white px-3.5 py-1 text-[11px] font-medium text-[#111111] shadow-2xs transition-all hover:border-[#0D99FF] hover:text-[#0D99FF]"
            >
              <span>View Case Studies</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-10 sm:px-10 sm:pt-14 md:px-14">
        {/* ========================================================== */}
        {/* 2. EDITORIAL HEADER                                        */}
        {/* ========================================================== */}
        <header className="mb-12 border-b border-[#E2DDD3] pb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#121212]">
                <span className="h-2 w-2 rounded-full bg-[#0D99FF]" />
                Contact &bull; Let&apos;s Connect
              </div>
              <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-[#121212] sm:text-4xl md:text-5xl">
                Let&apos;s Build Together
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5C5A55]">
                Ada proyek menarik atau ingin berdiskusi seputar desain produk dan design system? Kirimkan pesan singkat di bawah ini.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-[#7A7873]">
              <span className="rounded-full border border-[#DDD8CD] bg-white px-3.5 py-1.5 font-semibold text-[#121212] shadow-xs">
                Response within 24h
              </span>
            </div>
          </div>
        </header>

        {/* ========================================================== */}
        {/* 3. TWO-COLUMN INTERACTIVE CONTACT WORKSPACE                */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* LEFT COLUMN: SIMPLE CLEAN FORM SPECIMEN (7 COLS) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border-2 border-[#0D99FF] bg-white p-6 sm:p-9 shadow-[0_16px_45px_rgba(13,153,255,0.08)]">
              {/* 4 Multi-Color Corner Resize Node Handles */}
              <span className="absolute -left-1.5 -top-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white shadow-xs" />
              <span className="absolute -right-1.5 -top-1.5 h-3 w-3 border-2 border-[#A259FF] bg-white shadow-xs" />
              <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-2 border-[#0ACF83] bg-white shadow-xs" />
              <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-2 border-[#FF7262] bg-white shadow-xs" />

              {/* Informative Layer Badge */}
              <div className="absolute -top-3 left-4 flex items-center gap-1.5 rounded-md bg-[#0D99FF] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white shadow-xs">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4zm12 0l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4z" />
                </svg>
                <span>❖ Form: Direct Message</span>
              </div>

              {formSubmitted ? (
                /* Success State */
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0ACF83]/15 text-[#0ACF83]">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111]">Pesan Terkirim!</h3>
                  <p className="text-sm text-[#55524C] max-w-md mx-auto leading-relaxed">
                    Terima kasih, <span className="font-semibold text-[#111111]">{formData.name || 'teman'}</span>. Pesan Anda sudah diterima. Adrian akan segera membalas ke <span className="font-semibold text-[#111111]">{formData.email}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setFormSubmitted(false)
                        setFormData({ name: '', email: '', message: '' })
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-[#D5D0C5] bg-white px-6 py-2.5 text-xs font-semibold text-[#111111] shadow-2xs hover:border-[#0D99FF] hover:text-[#0D99FF]"
                    >
                      <span>Kirim Pesan Lain</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Simple Form: Name, Email, and What you want to build */
                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Nama Anda atau Tim
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Maya Lin atau Tim Startup"
                      className="w-full rounded-xl border border-[#D8D3C7] bg-[#FAF8F5] px-4 py-3 text-sm text-[#111111] placeholder:text-[#9A958C] focus:border-[#0D99FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0D99FF]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Alamat Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full rounded-xl border border-[#D8D3C7] bg-[#FAF8F5] px-4 py-3 text-sm text-[#111111] placeholder:text-[#9A958C] focus:border-[#0D99FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0D99FF]"
                    />
                  </div>

                  {/* What you want to build */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Ceritakan apa yang ingin dibuat
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan tentang ide produk Anda, fitur yang dibutuhkan, atau target yang ingin dicapai..."
                      className="w-full rounded-xl border border-[#D8D3C7] bg-[#FAF8F5] p-4 text-sm text-[#111111] placeholder:text-[#9A958C] focus:border-[#0D99FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0D99FF]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0D99FF] hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
                    >
                      <span>Kirim Pesan</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: DIRECT CHANNELS (EMAIL & LINKEDIN) (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <div className="rounded-2xl border border-[#E5E0D6] bg-white p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#111111] border-b border-[#F0ECE1] pb-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0ACF83]" />
                <span>Email Langsung</span>
              </div>

              <div>
                <p className="text-xs text-[#7A756D] font-mono">Mailbox Resmi</p>
                <a
                  href="mailto:adrian.pratama@studiofolio.id?subject=Inquiry%20via%20Portfolio"
                  className="mt-1 block text-base sm:text-lg font-bold text-[#111111] hover:text-[#0D99FF] transition-colors"
                >
                  adrian.pratama@studiofolio.id
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href="mailto:adrian.pratama@studiofolio.id?subject=Inquiry%20via%20Portfolio"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#111111] px-5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#0D99FF]"
                >
                  <span>Buka Email</span>
                  <span>&rarr;</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D0C5] bg-white px-4 py-2 font-mono text-xs font-medium text-[#111111] shadow-2xs transition-all hover:border-[#0D99FF] hover:text-[#0D99FF]"
                >
                  {copiedEmail ? '✓ Tersalin!' : 'Salin Alamat'}
                </button>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="rounded-2xl border border-[#E5E0D6] bg-white p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#111111] border-b border-[#F0ECE1] pb-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0D99FF]" />
                <span>LinkedIn</span>
              </div>

              <div>
                <p className="text-xs text-[#7A756D] font-mono">Jaringan Profesional</p>
                <h3 className="mt-1 text-base sm:text-lg font-bold text-[#111111]">
                  Adrian Pratama
                </h3>
                <p className="mt-1 text-xs text-[#66635C] leading-relaxed">
                  Terhubung untuk diskusi profesional, peluang kolaborasi, atau konsultasi design system.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0D99FF] bg-[#0D99FF]/10 px-5 py-2 text-xs font-bold text-[#0D99FF] shadow-2xs transition-all hover:bg-[#0D99FF] hover:text-white"
                >
                  <span>Kunjungi LinkedIn</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM NAVIGATION */}
        <div className="mt-16 border-t border-[#E5E0D6] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#0D99FF] transition-colors"
            >
              <span>&larr;</span>
              <span>Jelajahi Proyek &amp; Studi Kasus</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C5A55] hover:text-[#0D99FF] transition-colors"
            >
              <span>Kembali ke Beranda</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
