'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export type ProjectItem = {
  id: string
  title: string
  subtitle?: string
  client?: string
  year?: string | number
  category?: string
  impact?: string
  summary?: string
  challenge?: string
  solution?: string
  deliverables?: string[]
  image?: string
  color?: string
  slug?: string
  link?: string
}

export type ToolItem = {
  name: string
  color?: string
  icon?: string | React.ReactNode
}

export type ExperienceItem = {
  period: string
  role: string
  company: string
  description: string
}

export type EducationItem = {
  year: string
  title: string
  institution: string
}

export type HeroData = {
  headline?: string
  subheadline?: string
  description?: string
  image?: string
}

type Props = {
  hero?: HeroData
  projects: ProjectItem[]
  tools: ToolItem[]
  experiences: ExperienceItem[]
  educations: EducationItem[]
}

export default function PortfolioClient({ hero, projects, tools, experiences, educations }: Props) {
  const [activeProject, setActiveProject] = useState<ProjectItem>(projects[0] || null)
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adrian.pratama@studiofolio.id')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedModalProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Keep activeProject in sync if projects change
  useEffect(() => {
    if (projects.length > 0 && !activeProject) {
      setActiveProject(projects[0])
    }
  }, [projects, activeProject])

  const headline = hero?.headline || 'Adrian Pratama'
  const subheadline =
    hero?.subheadline ||
    'Directing high-density interaction models • Enterprise Telemetry • Fintech'
  const heroDescription =
    hero?.description ||
    'Engineering intuitive software interfaces, spatial design token systems, and mission-critical digital products with mathematical precision.'
  const heroImage =
    hero?.image ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80'

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-poppins antialiased selection:bg-[#0D99FF] selection:text-white">
      <main>
        {/* ========================================================== */}
        {/* HERO SECTION: FIGMA ART DIRECTION                         */}
        {/* ========================================================== */}
        <section
          id="hero"
          className="relative flex flex-col justify-between px-6 py-5 sm:px-10 md:px-14 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-[#F5F2EA] via-[#FBF9F5] to-[#EBE6DA] [background-image:radial-gradient(#D5D0C3_1px,transparent_1px)] [background-size:24px_24px]"
          aria-label="Designer Introduction"
        >
          {/* Saturated Ambient Color Glows */}
          <div className="pointer-events-none absolute -top-28 left-8 h-96 w-96 rounded-full bg-gradient-to-tr from-[#A259FF]/20 to-[#8B5CF6]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-8 h-96 w-96 rounded-full bg-gradient-to-bl from-[#0D99FF]/20 to-[#06B6D4]/15 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF7262]/15 to-[#F59E0B]/12 blur-3xl" />

          {/* Architectural Hairlines & Crosshairs */}
          <div className="pointer-events-none absolute inset-0 mx-auto max-w-6xl">
            <div className="absolute left-0 top-0 h-full w-px bg-[#DCD6CA]/80" />
            <div className="absolute right-0 top-0 h-full w-px bg-[#DCD6CA]/80" />
            <span className="absolute left-[-5px] top-4 font-mono text-[10px] text-[#A8A398]">
              +
            </span>
            <span className="absolute right-[-5px] top-4 font-mono text-[10px] text-[#A8A398]">
              +
            </span>
            <span className="absolute left-[-5px] bottom-4 font-mono text-[10px] text-[#A8A398]">
              +
            </span>
            <span className="absolute right-[-5px] bottom-4 font-mono text-[10px] text-[#A8A398]">
              +
            </span>
          </div>

          <div className="mx-auto w-full max-w-6xl h-full flex flex-col justify-between relative z-10">
            {/* CENTER STAGE: BALANCED 2-COLUMN GRID */}
            <div className="my-auto py-3 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
              {/* LEFT COLUMN: FIGMA COMPONENT HERO */}
              <div className="flex flex-col justify-center space-y-3.5 lg:col-span-7">
                {/* FIGMA SELECTION COMPONENT BOX AROUND HEADLINE */}
                <div className="relative rounded-2xl border-1 border-[#0D99FF]/70 bg-white/80 p-5 sm:p-7 backdrop-blur-md shadow-[0_8px_30px_rgba(13,153,255,0.08)]">
                  {/* Multi-Color Corner Resize Square Handles */}
                  <span
                    className="absolute -left-1.5 -top-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white shadow-xs"
                    title="Node: Cyan"
                  />
                  <span
                    className="absolute -right-1.5 -top-1.5 h-3 w-3 border-2 border-[#A259FF] bg-white shadow-xs"
                    title="Node: Purple"
                  />
                  <span
                    className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-2 border-[#0ACF83] bg-white shadow-xs"
                    title="Node: Green"
                  />
                  <span
                    className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-2 border-[#FF7262] bg-white shadow-xs"
                    title="Node: Coral"
                  />

                  {/* INFORMATIVE DATA COMPONENT LAYER CHIP */}
                  <div className="absolute -top-3 left-4 flex items-center gap-1.5 rounded-md bg-[#0D99FF] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white shadow-xs">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4zm12 0l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4z" />
                    </svg>
                    <span>❖ Lead UI/UX Architect</span>
                    <span className="text-white/80">&bull;</span>
                    <span className="text-white/90">7+ Yrs &bull; 420+ Tokens Sync</span>
                  </div>

                  {/* Professional Typography Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-extrabold tracking-tight text-[#111111] leading-[1.02] font-sans select-none">
                    {headline}
                  </h1>

                  <p className="mt-2 text-sm sm:text-base font-medium text-[#4A4741]">
                    {subheadline}
                  </p>
                </div>

                {/* Concise Narrative */}
                <p className="max-w-lg text-sm sm:text-base leading-relaxed text-[#55524C] font-normal">
                  {heroDescription}
                </p>

                {/* Action Buttons: Contact Me & Download CV */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0D99FF] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
                  >
                    <span>Contact Me</span>
                    <span>&rarr;</span>
                  </Link>

                  <a
                    href="/Adrian-Pratama-CV.pdf"
                    download="Adrian-Pratama-CV.pdf"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#D5D0C5] bg-white px-6 py-2.5 text-xs sm:text-sm font-medium text-[#111111] shadow-2xs transition-all hover:border-[#0D99FF] hover:text-[#0D99FF] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download CV</span>
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN: THE VOCAL POINT (PORTRAIT SPECIMEN) */}
              <div className="relative lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px]">
                  {/* FIGMA LIVE COLLABORATIVE CURSOR 1 (Purple) */}
                  <div className="absolute -top-3.5 -left-3 z-30 flex items-center gap-1 animate-pulse">
                    <svg
                      className="w-4 h-4 text-[#A259FF] drop-shadow-sm"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4 2l16 11.5-6.5 1.5 4 7.5-2.5 1.5-4-7.5-5 5V2z" />
                    </svg>
                    <span className="rounded-full bg-[#A259FF] px-2.5 py-0.5 font-mono text-[9px] font-semibold text-white shadow-md">
                      Adrian (Lead UI/UX)
                    </span>
                  </div>

                  {/* FIGMA DEV MODE CURSOR 2 (Green) */}
                  <div className="absolute -bottom-3 -right-2 z-30 flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-[#0ACF83] drop-shadow-sm"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4 2l16 11.5-6.5 1.5 4 7.5-2.5 1.5-4-7.5-5 5V2z" />
                    </svg>
                    <span className="rounded-full bg-[#0ACF83] px-2.5 py-0.5 font-mono text-[9px] font-semibold text-white shadow-md">
                      Dev Mode: Inspect
                    </span>
                  </div>

                  {/* MAIN FIGMA SELECTION SPECIMEN BOX */}
                  <div className="relative rounded-2xl border-2 border-[#0D99FF] bg-white p-2.5 shadow-[0_16px_45px_rgba(13,153,255,0.18)]">
                    {/* Top Layer Header Tag */}
                    <div className="flex items-center justify-between pb-1.5 px-1 font-mono text-[10px] text-[#7A756D]">
                      <span className="font-bold text-[#0D99FF] flex items-center gap-1">
                        <span>❖ Frame: Specimen</span>
                      </span>
                      <span>1200 &times; 1500px</span>
                    </div>

                    {/* 4 Corner Resize Handles */}
                    <span className="absolute -left-1.5 -top-1.5 h-3 w-3 border border-[#0D99FF] bg-white" />
                    <span className="absolute -right-1.5 -top-1.5 h-3 w-3 border border-[#0D99FF] bg-white" />
                    <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border border-[#0D99FF] bg-white" />
                    <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border border-[#0D99FF] bg-white" />

                    {/* The Focal Point Portrait Image */}
                    <div className="relative aspect-[4/5] max-h-[350px] sm:max-h-[390px] w-full overflow-hidden rounded-xl bg-[#ECE7DF] shadow-inner">
                      <Image
                        src={heroImage}
                        alt={headline}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover object-center filter contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                      {/* Bottom Image Specimen Label */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-lg bg-black/65 px-3 py-1.5 text-[10px] font-mono text-white/90 backdrop-blur-md">
                        <span>{headline}</span>
                        <span className="text-[#0ACF83] font-semibold">&bull; Active Scope</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM FIGMA STATUS BAR */}
            <div className="flex items-center justify-between font-mono text-xs text-[#7A756D] border-t border-[#DDD8CD]/80 pt-2 pb-1">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded bg-[#0D99FF]" />
                  <span>8pt Grid System</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded bg-[#A259FF]" />
                  <span>Tokens Studio Synced</span>
                </span>
              </div>
              <a
                href="#works"
                className="flex items-center gap-1.5 font-semibold text-[#111111] hover:text-[#0D99FF] transition-colors"
              >
                <span>Selected Works</span>
                <span>&darr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 01: SELECTED WORKS                                 */}
        {/* ========================================================== */}
        <section
          id="works"
          className="px-6 py-20 md:px-10 md:py-28 bg-[#FAF8F5] border-t border-[#E8E6DF]"
          aria-label="Selected Works"
        >
          <div className="mx-auto max-w-6xl">
            {/* EDITORIAL SECTION HEADER */}
            <div className="mb-14 border-b border-[#DFDAD0] pb-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#121212]">
                    <span className="h-2 w-2 rounded-full bg-[#F3A824]" />
                    SECTION 01 • PORTFOLIO ARCHIVE
                  </div>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#121212] sm:text-4xl md:text-5xl">
                    Selected Works
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5C5A55]">
                    In-depth case studies covering financial trading consoles, spatial cloud
                    topology, design token infrastructure, and high-contrast healthcare interfaces.
                  </p>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-[#7A7873]">
                  <Link
                    href="/projects"
                    className="rounded-full border border-[#DDD8CD] bg-white px-3.5 py-1.5 font-semibold text-[#121212] shadow-xs hover:border-[#0D99FF] hover:text-[#0D99FF] transition-all"
                  >
                    View All Projects &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* UNIFIED INTERACTIVE LIST + LIVE PREVIEW DOCK */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Interactive Project Items */}
              <div className="lg:col-span-7 space-y-6">
                {projects.map((project, idx) => {
                  const isSelected = activeProject?.id === project.id
                  return (
                    <div
                      key={project.id || idx}
                      onMouseEnter={() => setActiveProject(project)}
                      onClick={() => setSelectedModalProject(project)}
                      className={`group cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#0D99FF] bg-white shadow-lg ring-1 ring-[#0D99FF]/20'
                          : 'border-[#E5E2DA] bg-white/70 hover:border-[#0D99FF]/60 hover:bg-white hover:shadow-md'
                      }`}
                      tabIndex={0}
                      role="button"
                      aria-label={`Inspect ${project.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedModalProject(project)
                        }
                      }}
                    >
                      <div className="flex flex-col gap-3">
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="flex items-center gap-2 font-mono font-bold text-[#0D99FF]">
                            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0D99FF]/10 text-[11px]">
                              {project.id}
                            </span>
                            <span>{project.category}</span>
                          </span>
                          <span className="font-mono text-[#7A7873]">
                            {project.year} {project.client ? `• ${project.client}` : ''}
                          </span>
                        </div>

                        {/* Distinct Project Title with Arrow */}
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-xl font-bold tracking-tight text-[#121212] transition-colors duration-200 group-hover:text-[#0D99FF] sm:text-2xl">
                            {project.title}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D99FF]/10 px-3 py-1 text-xs font-bold text-[#0D99FF] group-hover:bg-[#0D99FF] group-hover:text-white transition-all">
                            <span>Inspect Scope</span>
                            <span>&rarr;</span>
                          </span>
                        </div>

                        {/* Subtitle */}
                        {project.subtitle && (
                          <p className="text-xs font-medium text-[#7A7873]">{project.subtitle}</p>
                        )}

                        {/* Short Description */}
                        {project.summary && (
                          <p className="text-sm leading-relaxed text-[#5C5A55]">
                            {project.summary}
                          </p>
                        )}

                        {/* Measurable Impact & Deliverables Bar */}
                        <div className="mt-1 flex flex-wrap items-center gap-2 border-t border-[#F0EFEA] pt-3">
                          {project.impact && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0ACF83]/10 px-2.5 py-0.5 text-xs font-bold text-[#0B8556]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#0ACF83]" />
                              <span>{project.impact}</span>
                            </span>
                          )}

                          {project.deliverables?.map((d, dIdx) => (
                            <span
                              key={dIdx}
                              className="rounded-md bg-[#F2EFE9] px-2 py-0.5 font-mono text-[11px] text-[#55524C]"
                            >
                              {d}
                            </span>
                          ))}

                          {project.slug && (
                            <Link
                              href={`/projects/${project.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#0D99FF] hover:underline"
                            >
                              <span>Full Study</span>
                              <span>&rarr;</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right Column: Live Sticky Specimen Inspector */}
              <div className="lg:col-span-5">
                {activeProject && (
                  <div className="sticky top-20 rounded-3xl border-2 border-[#121212] bg-[#121212] p-5 text-white shadow-2xl sm:p-7">
                    {/* Live Inspector Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                      <span className="flex items-center gap-2 font-bold text-[#0D99FF]">
                        <span className="h-2 w-2 rounded-full bg-[#0D99FF] animate-pulse" />
                        SPECIMEN INSPECTOR • {activeProject.id}
                      </span>
                      <span className="text-[#888888]">{activeProject.year}</span>
                    </div>

                    {/* Project Preview Image */}
                    {activeProject.image && (
                      <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#222222]">
                        <Image
                          src={activeProject.image}
                          alt={activeProject.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 450px"
                          className="object-cover object-top transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                          <span>{activeProject.client || activeProject.category}</span>
                          <span className="font-bold text-[#0ACF83]">{activeProject.impact}</span>
                        </div>
                      </div>
                    )}

                    {/* Project Anatomy & Specs */}
                    <div className="mt-5 space-y-3 font-mono text-xs">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-[#888888]">Architecture</span>
                        <span className="font-semibold text-white">{activeProject.category}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-[#888888]">Primary Outcome</span>
                        <span className="font-semibold text-[#0D99FF]">{activeProject.impact}</span>
                      </div>
                    </div>

                    {/* Direct Inspection Action */}
                    <div className="mt-6 flex flex-col gap-2">
                      <button
                        onClick={() => setSelectedModalProject(activeProject)}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0D99FF] py-3 text-xs font-bold text-white transition-all hover:bg-[#007FE0]"
                      >
                        <span>Open Detailed Case Study</span>
                        <span>&rarr;</span>
                      </button>

                      {activeProject.slug && (
                        <Link
                          href={`/projects/${activeProject.slug}`}
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent py-2.5 text-xs font-medium text-white/90 hover:bg-white/10 transition-colors"
                        >
                          <span>Dedicated Project Page</span>
                          <span>&rarr;</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 02: SPECIALIZED TOOLS (ICON & NAME ONLY)           */}
        {/* ========================================================== */}
        <section
          id="tools"
          className="border-t border-[#DFDAD0] bg-[#F7F5F0] px-6 py-16 md:px-10 md:py-20"
          aria-label="Design and Engineering Tools"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="mb-10 flex flex-col justify-between gap-3 border-b border-[#DDD8CD] pb-6 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                  SECTION 02 • TOOLKIT
                </span>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-[#121212] sm:text-3xl md:text-4xl">
                  Specialized Tools &amp; Stack
                </h2>
              </div>
              <p className="font-mono text-xs text-[#7A7873]">
                Daily driver software for product architecture, interaction, &amp; code
              </p>
            </div>

            {/* Clean Grid: ONLY ICON & TOOL NAME */}
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 md:gap-5">
              {tools.map((tool, idx) => {
                const toolColor = tool.color || '#0D99FF'
                return (
                  <div
                    key={idx}
                    className="group flex items-center gap-3.5 rounded-2xl border border-[#E3DFD5] bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8B5CF6]/50 hover:shadow-md"
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${toolColor}15` }}
                    >
                      {typeof tool.icon === 'string' ? (
                        <div className="relative h-6 w-6">
                          <Image src={tool.icon} alt={tool.name} fill className="object-contain" />
                        </div>
                      ) : tool.icon ? (
                        tool.icon
                      ) : (
                        <span className="font-mono font-bold text-sm" style={{ color: toolColor }}>
                          {tool.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#121212] transition-colors duration-200 group-hover:text-[#7C3AED]">
                        {tool.name}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 03: EXPERIENCE & EDUCATION                        */}
        {/* ========================================================== */}
        <section
          id="experience"
          className="border-t border-[#E0DBD0] bg-[#ECE8DF] px-6 py-20 md:px-10 md:py-24"
          aria-label="Career Experience and Education"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Work Experience */}
              <div className="lg:col-span-7">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F3A824]">
                  SECTION 03 • TRAJECTORY
                </span>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-[#121212] sm:text-3xl">
                  Work Experience
                </h2>

                <div className="mt-8 space-y-8 border-l-2 border-[#DDD8CD] pl-5">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="relative">
                      {/* Active indicator node */}
                      <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-[#F2EFE9] bg-[#0D99FF] shadow-xs" />

                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-bold text-[#121212]">{exp.role}</h3>
                        <span className="font-mono text-xs font-semibold text-[#0D99FF]">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#6E6D68]">{exp.company}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#5C5A55]">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Education & Design Philosophy */}
              <div id="about" className="lg:col-span-5">
                <div className="mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#7A7873]">
                    FOUNDATION
                  </span>
                  <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-[#121212] sm:text-3xl">
                    Education &amp; Credentials
                  </h2>

                  <div className="mt-6 space-y-4">
                    {educations.map((edu, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-[#DDD8CD] bg-white p-4 shadow-xs"
                      >
                        <span className="font-mono text-xs font-semibold text-[#0D99FF]">
                          {edu.year}
                        </span>
                        <h4 className="mt-0.5 text-sm font-bold text-[#121212]">{edu.title}</h4>
                        <p className="text-xs text-[#6E6D68]">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Philosophy Box */}
                <div className="rounded-2xl border border-[#DDD8CD] bg-white p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-[#121212]">Design Principle</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C5A55]">
                    Simplicity is the resolution of complexity, not its absence. I build software
                    interfaces that honor user intent through direct manipulation, clear hierarchy,
                    and predictable execution loops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 04: CALL TO ACTION                                 */}
        {/* ========================================================== */}
        <section
          id="contact"
          className="bg-[#FAF8F5] border-t border-[#E8E6DF] px-6 py-16 md:px-10 md:py-20"
          aria-label="Collaboration Inquiry"
        >
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-[#E3E1DA] bg-white px-8 py-12 shadow-[0_16px_40px_rgba(0,0,0,0.03)] sm:px-12 md:py-16">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F3A824]">
                INITIATE DIALOGUE
              </span>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#121212] sm:text-4xl md:text-5xl">
                Have an ambitious product in mind? <br />
                <span className="text-[#0D99FF]">Let&apos;s build it with purpose.</span>
              </h2>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#5C5A55]">
                Currently open for UI/UX product architecture, design systems, and select consulting
                contracts. Direct inquiries typically answered within 24 hours.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#121212] px-8 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0D99FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
                >
                  Go to Contact Page &rarr;
                </Link>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#E3E1DA] bg-white px-6 py-3 font-mono text-xs font-medium text-[#121212] shadow-xs transition-all hover:border-[#0D99FF] hover:text-[#0D99FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
                >
                  {copiedEmail ? 'Copied to Clipboard!' : 'Copy: adrian.pratama@studiofolio.id'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================== */}
      {/* CASE STUDY DETAIL MODAL                                    */}
      {/* ========================================================== */}
      {selectedModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedModalProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E3E1DA] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E8E6DF] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#0D99FF]">
                  {selectedModalProject.category}{' '}
                  {selectedModalProject.year ? `• ${selectedModalProject.year}` : ''}
                </span>
                <h3 id="modal-title" className="mt-1 text-2xl font-bold text-[#121212] sm:text-3xl">
                  {selectedModalProject.title}
                </h3>
                {selectedModalProject.subtitle && (
                  <p className="text-xs text-[#7A7873]">{selectedModalProject.subtitle}</p>
                )}
              </div>

              <button
                onClick={() => setSelectedModalProject(null)}
                aria-label="Close dialog"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#E3E1DA] bg-[#FAF8F5] text-sm font-semibold text-[#121212] transition-colors hover:border-[#0D99FF] hover:text-[#0D99FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            {selectedModalProject.image && (
              <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#222222]">
                <Image
                  src={selectedModalProject.image}
                  alt={selectedModalProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-top"
                />
              </div>
            )}

            {/* Modal Content */}
            <div className="mt-6 space-y-4 text-sm text-[#55524C] leading-relaxed">
              {selectedModalProject.summary && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Overview
                  </h4>
                  <p className="mt-1">{selectedModalProject.summary}</p>
                </div>
              )}

              {selectedModalProject.challenge && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Key Challenge
                  </h4>
                  <p className="mt-1">{selectedModalProject.challenge}</p>
                </div>
              )}

              {selectedModalProject.solution && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Architectural Solution
                  </h4>
                  <p className="mt-1">{selectedModalProject.solution}</p>
                </div>
              )}

              {selectedModalProject.impact && (
                <div className="rounded-xl border border-[#0ACF83]/30 bg-[#0ACF83]/10 p-3 text-xs font-bold text-[#0B8556]">
                  <span>Measurable Impact: {selectedModalProject.impact}</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#E8E6DF] pt-4">
              {selectedModalProject.slug && (
                <Link
                  href={`/projects/${selectedModalProject.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0D99FF] px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#007FE0]"
                >
                  <span>Open Dedicated Study Page</span>
                  <span>&rarr;</span>
                </Link>
              )}

              {selectedModalProject.link && (
                <a
                  href={
                    selectedModalProject.link.startsWith('http')
                      ? selectedModalProject.link
                      : `https://${selectedModalProject.link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D0C5] bg-white px-5 py-2.5 text-xs font-medium text-[#111111] hover:border-[#0D99FF] hover:text-[#0D99FF]"
                >
                  <span>Visit Live Prototype</span>
                  <span>&rarr;</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
