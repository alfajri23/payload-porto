'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Education, Experience, LandingPage, Project, Tool } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { summaryLexicalContent } from '@/utilities/extractLexical'
import { CardProject } from '@/components/Card/CardProject'
import { RichText } from 'node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToJSX/Component'

type Props = {
  landingPage: LandingPage
  experience: Experience[]
  education: Education[]
  tools?: Tool[]
}

const COMPANIES = [
  { url: 'https://www.linkedin.com', name: 'Linkedin', style: 'font-black tracking-tight' },
  { url: 'https://www.github.com', name: 'Github', style: 'font-black tracking-widest' },
  { url: 'mailto:rian.kurnia@devfolio.io', name: 'Gmail', style: 'font-serif  font-bold' },
]

export default function Page({ landingPage, experience, education, tools }: Props) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [activeHudTag, setActiveHudTag] = useState<string | null>('architecture')

  const projects = (landingPage?.project || []) as Project[]
  const toolsList = (tools || []) as Tool[]

  const handleCopyEmail = () => {
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-[#E5E7EB] selection:text-black">
      <main>
        {/* HERO SECTION */}
        <section
          aria-label="Portfolio Introduction"
          className="relative bg-white flex flex-col justify-between px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-10 overflow-hidden border-b border-[#F0F2F5]"
        >
          {/* Top Availability Row */}
          <div className="mx-auto w-full max-w-7xl pt-1 lg:pt-2">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 shadow-xs transition-transform hover:scale-[1.02]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-slate-700">
                Available for contracts &amp; full-time engineering roles
              </span>
            </div>
          </div>

          {/* Main 3-Column Hero Content */}
          <div className="mx-auto w-full max-w-7xl my-auto py-6 sm:py-8 lg:py-1">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12">
              {/* LEFT COLUMN: Main Typography & Action (Concise Copy) */}
              <div className="lg:col-span-4 z-10 text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.06]">
                  {landingPage?.hero?.headline}
                </h1>

                <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {landingPage?.hero?.description}
                </p>

                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <a
                    href="#projects"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 text-sm font-semibold text-white transition-all hover:bg-black hover:scale-105 shadow-md"
                  >
                    <span>Explore Projects</span>
                    <span className="text-xs">&darr;</span>
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-50"
                  >
                    Contact Me
                  </Link>
                </div>
              </div>

              {/* CENTER COLUMN: Clean Portrait + Interactive HUD Reticles */}
              <div className="relative flex justify-center lg:col-span-5 my-2 lg:my-0">
                <div className="relative h-[340px] w-full max-w-[290px] sm:h-[400px] sm:max-w-[350px] lg:h-[450px] lg:max-w-[380px] xl:h-[480px] xl:max-w-[400px]">
                  {/* Portrait with seamless bottom fade */}
                  <div className="relative h-full w-full overflow-hidden rounded-3xl bg-slate-50">
                    <ImageMedia
                      resource={
                        landingPage?.hero?.image ??
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      }
                      priority
                      fill
                      alt=" Feri Alfajri - Systems Engineer Portrait"
                      size="(max-width: 768px) 100vw, 420px"
                      imgClassName="object-cover object-top contrast-105 filter brightness-100"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/85 to-transparent" />
                  </div>

                  {/* HUD RETICLE 1: Systems Design */}
                  <div
                    onClick={() => setActiveHudTag('architecture')}
                    className={`absolute top-6 right-2 sm:right-6 z-20 cursor-pointer transition-all duration-300 ${
                      activeHudTag === 'architecture' ? 'scale-105' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="relative rounded-lg border-2 border-white bg-white/30 p-2 sm:p-2.5 backdrop-blur-md shadow-lg">
                      <div className="flex items-start gap-1.5 sm:gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-xs mt-0.5" />
                        <div>
                          <div className="text-[11px] sm:text-xs font-bold text-white leading-tight drop-shadow-md">
                            Creative
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HUD RETICLE 2: Latency & Throughput */}
                  <div
                    onClick={() => setActiveHudTag('throughput')}
                    className={`absolute top-36 right-2 sm:right-4 z-20 cursor-pointer transition-all duration-300 ${
                      activeHudTag === 'throughput' ? 'scale-105' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="relative rounded-lg border-2 border-white bg-white/30 p-2 sm:p-2.5 backdrop-blur-md shadow-lg">
                      <div className="flex items-start gap-1.5 sm:gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-xs mt-0.5" />
                        <div>
                          <div className="text-[11px] sm:text-xs font-bold text-white leading-tight drop-shadow-md">
                            Design
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HUD RETICLE 3: Zero Downtime Infrastructure */}
                  <div
                    onClick={() => setActiveHudTag('infra')}
                    className={`absolute bottom-20 left-2 sm:left-6 z-20 cursor-pointer transition-all duration-300 ${
                      activeHudTag === 'infra' ? 'scale-105' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="relative rounded-lg border-2 border-white bg-white/30 p-2 sm:p-2.5 backdrop-blur-md shadow-lg">
                      <div className="flex items-start gap-1.5 sm:gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-xs mt-0.5" />
                        <div>
                          <div className="text-[11px] sm:text-xs font-bold text-white leading-tight drop-shadow-md">
                            Production
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Proportional Stats (Clean Cards on Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-6 xl:gap-7 lg:col-span-3 lg:pl-2">
                {/* Stat 2 */}
                <div className="flex items-center gap-3.5 group rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-4 lg:border-none lg:bg-transparent lg:p-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 group-hover:border-slate-900 group-hover:text-slate-900 transition-all shadow-2xs">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="10" cy="12" r="7" />
                      <circle cx="14" cy="12" r="7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight text-slate-900">10+</div>
                    <div className="text-xs font-medium text-slate-500 leading-snug">
                      Systems deployed
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-3.5 group rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-4 lg:border-none lg:bg-transparent lg:p-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 group-hover:border-slate-900 group-hover:text-slate-900 transition-all shadow-2xs">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight text-slate-900">4+ yrs</div>
                    <div className="text-xs font-medium text-slate-500 leading-snug">
                      Engineering experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Partner Logo Bar */}
          <div className="mx-auto w-full max-w-7xl border-t border-slate-100 pt-10 pb-3 sm:pt-10 sm:pb-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Contant me on:
              </span>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-8 md:gap-11 opacity-60 grayscale transition-opacity">
                {COMPANIES.map((comp) => (
                  <a
                    key={comp.name}
                    href={comp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm sm:text-base text-slate-800 hover:opacity-90 ${comp.style}`}
                  >
                    {comp.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT */}
        <section
          id="projects"
          aria-label="Featured Projects"
          className="border-b border-[#F0F2F5] bg-white py-14 sm:py-18"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-5 mb-8 border-b border-slate-100">
              <div>
                <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-600">
                  Selected Work
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  My Portfolio
                </h2>
              </div>
              <Link
                href="/demo/developer/projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-black transition-all shadow-xs w-full sm:w-auto"
              >
                <span>View Project Archive ({projects.length})</span>
                <span className="text-sm">&rarr;</span>
              </Link>
            </div>

            {/* 6 Eye-Catching Cards Grid (3 Columns on Desktop, Perfectly Balanced) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {projects.map((proj) => (
                <CardProject key={proj.id} props={proj} />
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS */}
        <section
          id="tools"
          aria-label="Specialized Toolchain"
          className="border-b border-[#F0F2F5] bg-[#FAFAFA] py-14 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Core Capabilities
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Tools &amp; Technologies
                </h2>
              </div>
              <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-slate-500">
                Production runtimes, distributed storage engines, and cloud platforms.
              </p>
            </div>

            {/* Categorized Pill Matrix */}
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 sm:gap-3 lg:gap-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {toolsList.map((tool) => (
                    <div
                      key={tool.name}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:border-slate-900 hover:shadow-xs transition-all cursor-default group"
                    >
                      <span className="shrink-0 transition-transform group-hover:scale-110">
                        {tool.icon && (
                          <ImageMedia
                            resource={
                              tool.icon ||
                              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85'
                            }
                            alt={tool.name}
                            imgClassName="w-8 h-8 object-contain rounded-full shadow-xs"
                          />
                        )}
                      </span>
                      <span className="tracking-tight">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION & CAREER */}
        <section
          id="experience"
          aria-label="Work Experience and Education"
          className="border-t border-[#F3F4F6] bg-[#FAFAFA] py-14 sm:py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12">
              {/* Left Column: Career Timeline */}
              <div className="lg:col-span-7">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Career Trajectory
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Work Experience
                </h2>

                <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-7">
                  {experience.map((job) => (
                    <div
                      key={job.period}
                      className="relative pl-6 sm:pl-7 border-l-2 border-slate-200"
                    >
                      <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-slate-900" />
                      <span className="text-xs font-bold text-slate-500">{job.period}</span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">{job.role}</h3>
                      <div className="text-xs font-semibold text-slate-600">{job.company}</div>
                      {/* <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {summaryLexicalContent(job.desc)}
                      </p> */}
                      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-xs prose-h3:text-xs prose-p:text-xs sm:prose-p:text-xs prose-p:leading-relaxed prose-li:text-sm sm:prose-li:text-xs prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700">
                        <RichText data={job.desc} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Education & Accreditations */}
              <div className="lg:col-span-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Credentials
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Education &amp; Honors
                </h2>

                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5">
                  {education.map((edu) => (
                    <div
                      key={edu.title}
                      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs"
                    >
                      <span className="text-xs font-bold text-slate-500">{edu.year}</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">{edu.title}</h3>
                      <p className="text-xs text-slate-600 mt-0.5">{edu.institution}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Consultation Callout */}
                <div className="mt-6 rounded-2xl bg-[#111827] p-5 sm:p-6 text-white shadow-xs">
                  <h3 className="text-base font-bold">Have a systems bottleneck?</h3>
                  <p className="mt-1.5 text-xs text-[#9CA3AF] leading-relaxed">
                    Available for backend performance audits, architecture reviews, and staff
                    engineering contract engagements.
                  </p>
                  <button
                    onClick={handleCopyEmail}
                    className="mt-4 inline-flex min-h-[40px] w-full items-center justify-center rounded-xl bg-white px-4 text-xs font-bold text-[#111827] hover:bg-[#F3F4F6] transition-all"
                  >
                    {copiedEmail ? 'Email Copied!' : 'Copy Email: feri.alfajri@gmail.com'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          aria-label="Contact Section"
          className="bg-white py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-4xl px-6 sm:px-10 md:px-12">
            <div className="rounded-3xl px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 text-center text-white shadow-xl bg-gray-900/90 backdrop-blur-md border border-white/10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-medium text-white/90 mb-4 sm:mb-5">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                <span>Available for Q3/Q4 Contracts &amp; Advisory</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Need a Staff Systems Engineer?
              </h2>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#9CA3AF] max-w-lg mx-auto leading-relaxed">
                Available for high-concurrency backend consulting, distributed streaming
                architecture, and contract engagements.
              </p>

              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto">
                <a
                  href="mailto:feri.alfajri@gmail.com"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-white px-7 text-xs sm:text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F3F4F6] transition-all w-full sm:w-auto"
                >
                  Send Direct Email
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 transition-all w-full sm:w-auto"
                >
                  {copiedEmail ? 'Copied to Clipboard!' : 'Copy: feri.alfajri@gmail.com'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
