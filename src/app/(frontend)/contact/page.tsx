'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function DeveloperContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Architecture Consulting',
    message: '',
  })

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rian.kurnia@devfolio.io')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated submission (no backend hook yet as requested)
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-[#E5E7EB] selection:text-black flex flex-col justify-between">
      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20 items-start">
            {/* Left Column: Direct Info & Communication Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-1 text-xs font-mono font-bold text-[#10B981] mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  <span>ACCEPTING NEW ENGAGEMENTS</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.08]">
                  Let me contact you
                </h1>

                <p className="mt-5 text-base text-[#4B5563] leading-relaxed font-normal">
                  Available for distributed systems consulting, backend latency audits, database
                  scaling, or dedicated contract engineering engagements.
                </p>
              </div>

              {/* Direct Email Card */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-6 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:feri.alfajri@gmail.com"
                  className="text-lg font-bold text-[#111827] hover:underline mt-1 block"
                >
                  feri.alfajri@gmail.com
                </a>
                <p className="text-xs text-[#6B7280] mt-1">Guaranteed response within 24 hours.</p>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="mt-4 inline-flex min-h-[40px] items-center justify-center rounded-xl bg-white border border-[#D1D5DB] px-5 text-xs font-bold text-[#111827] hover:border-[#111827] transition-all"
                >
                  {copiedEmail ? 'Email Copied!' : 'Copy to Clipboard'}
                </button>
              </div>

              {/* Verified Profiles & Social Links */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] block font-mono">
                  Verified Engineering Channels
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-[#E5E7EB] p-3.5 hover:border-[#111827] font-semibold text-[#111827] transition-colors"
                  >
                    <span className="block text-[#6B7280] text-[10px] uppercase font-mono">
                      Code
                    </span>
                    GitHub Profile &rarr;
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-[#E5E7EB] p-3.5 hover:border-[#111827] font-semibold text-[#111827] transition-colors"
                  >
                    <span className="block text-[#6B7280] text-[10px] uppercase font-mono">
                      Network
                    </span>
                    LinkedIn Profile &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 sm:p-12 shadow-sm">
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981]/15 text-[#10B981]">
                      <svg
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#111827]">Message Received</h3>
                    <p className="text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. I will review your project constraints and reply
                      to <span className="font-semibold text-[#111827]">{formData.email}</span>{' '}
                      within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false)
                        setFormData({
                          name: '',
                          email: '',
                          projectType: 'Architecture Consulting',
                          message: '',
                        })
                      }}
                      className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#111827] px-6 text-xs font-bold text-white hover:bg-black transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                        Initiate a Discussion
                      </h2>
                      <p className="mt-1 text-xs text-[#6B7280]">
                        Tell me about your system requirements, performance goals, or timeline.
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2"
                      >
                        Your Name / Company
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor / TechCorp"
                        className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#111827] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#111827] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Scope / Project Type */}
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2"
                      >
                        Engagement Scope
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none transition-all bg-white"
                      >
                        <option value="Architecture Consulting">
                          Architecture Consulting &amp; Design
                        </option>
                        <option value="Backend Performance Audit">
                          Backend Latency &amp; Performance Audit
                        </option>
                        <option value="Contract Staff Engineer">
                          Contract Staff Systems Engineer
                        </option>
                        <option value="Database Sharding Migration">
                          Database Sharding &amp; Migration
                        </option>
                        <option value="Other Technical Inquiries">Other Technical Inquiries</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2"
                      >
                        Project Overview &amp; Technical Objectives
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your architecture challenges, traffic volume, current stack, and expected milestones..."
                        className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#111827] focus:outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full min-h-[48px] rounded-xl bg-[#111827] text-white text-sm font-bold shadow-sm hover:bg-black hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Send Project Inquiry</span>
                      <span className="font-mono text-base">&rarr;</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
