'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Education, Experience, LandingPage, Project, Tool } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { summaryLexicalContent } from '@/utilities/extractLexical'

type Props = {
  landingPage: LandingPage
  experience: Experience[]
  education: Education[]
  tools?: Tool[]
}

// Specialized Tools: Curated with authentic SVG icons & category pills
const TOOL_CATEGORIES = [
  {
    category: 'Runtimes & Systems',
    tools: [
      {
        name: 'Go (Golang)',
        color: '#00ADD8',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M1.98 12.04c.1-1.39.82-2.73 1.94-3.56 1.34-.99 3.09-1.28 4.71-.97.23.04.45.1.66.19-.13.37-.28.73-.44 1.09-.59-.2-1.22-.3-1.84-.27-1.42.06-2.82.91-3.32 2.24-.56 1.5.07 3.32 1.44 4.14 1.25.75 2.87.67 4.11-.14.28-.18.53-.4.74-.65h-3.41v-1.21h4.74c.05.58.01 1.18-.17 1.74-.42 1.32-1.45 2.39-2.77 2.87-1.57.57-3.38.38-4.78-.54-1.07-.7-1.8-1.8-1.95-3.04z"
              fill="#00ADD8"
            />
            <path
              d="M17.48 8.16c1.65-.25 3.37.29 4.54 1.48 1.29 1.31 1.78 3.28 1.25 5.04-.54 1.8-2.07 3.19-3.92 3.53-1.81.33-3.7-.42-4.83-1.92-1.09-1.45-1.27-3.49-.44-5.11.75-1.46 2.05-2.58 3.4-3.02zm-.23 1.23c-1.12.3-2.12 1.14-2.54 2.24-.49 1.29-.16 2.86.78 3.84.87.91 2.26 1.25 3.44.82 1.16-.42 1.99-1.53 2.1-2.77.12-1.38-.63-2.78-1.86-3.41-.61-.31-1.29-.44-1.92-.42z"
              fill="#00ADD8"
            />
          </svg>
        ),
      },
      {
        name: 'Rust',
        color: '#111827',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="2" />
            <path
              d="M9 15V9h3a2 2 0 012 2v0a2 2 0 01-2 2H9m3 0l2.5 2.5"
              stroke="#111827"
              strokeWidth="1.8"
            />
          </svg>
        ),
      },
      {
        name: 'TypeScript',
        color: '#3178C6',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#3178C6" />
            <path
              d="M12.5 13.5v1.8c-.8-.4-1.6-.6-2.4-.6-1.1 0-1.7.4-1.7 1.1 0 .6.4 1 1.7 1.4 1.9.6 2.9 1.4 2.9 2.9 0 1.9-1.5 3-3.7 3-1.2 0-2.3-.3-3.3-.8v-1.9c.9.6 2 1 3.1 1 1.2 0 1.8-.5 1.8-1.1 0-.7-.5-1.1-1.8-1.5-1.9-.6-2.8-1.5-2.8-2.9 0-1.8 1.4-2.9 3.5-2.9 1 0 2 .2 2.7.5zm7.3 1.8v7.8h-2.1v-7.8h-2.8v-1.8h7.7v1.8h-2.8z"
              fill="#ffffff"
            />
          </svg>
        ),
      },
      {
        name: 'Next.js & React',
        color: '#000000',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#000000" />
            <path
              d="M15.5 8.5v7m-7-7v7l8-9"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Storage & Streaming',
    tools: [
      {
        name: 'PostgreSQL',
        color: '#336791',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4 21l3.5-.94C9.02 20.62 10.47 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"
              fill="#336791"
            />
            <circle cx="12" cy="12" r="3" fill="#ffffff" />
          </svg>
        ),
      },
      {
        name: 'Redis',
        color: '#DC382D',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#DC382D"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        name: 'Apache Kafka',
        color: '#231F20',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="#111827" />
            <circle cx="12" cy="5" r="2" fill="#111827" />
            <circle cx="12" cy="19" r="2" fill="#111827" />
            <circle cx="5.5" cy="8.5" r="2" fill="#111827" />
            <circle cx="18.5" cy="8.5" r="2" fill="#111827" />
          </svg>
        ),
      },
      {
        name: 'ClickHouse',
        color: '#F9A825',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="3" height="12" fill="#F9A825" rx="1" />
            <rect x="8" y="4" width="3" height="16" fill="#F9A825" rx="1" />
            <rect x="13" y="8" width="3" height="8" fill="#F9A825" rx="1" />
            <rect x="18" y="5" width="3" height="14" fill="#F9A825" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    tools: [
      {
        name: 'Kubernetes',
        color: '#326CE5',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z"
              stroke="#326CE5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" fill="#326CE5" />
          </svg>
        ),
      },
      {
        name: 'Docker',
        color: '#2496ED',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 13c-.5-1.5-2-2-2-2s-.5 1-1.5 1.5c-1 .5-2 0-2 0s-.5 1-2 1h-8c-.5-2 1-3 1-3H5s-1 1-1 3c-2 .5-3 2-3 4 0 3 3 5 8 5 6 0 9-3 10-6 .5 0 2-.5 2-2z"
              fill="#2496ED"
            />
          </svg>
        ),
      },
      {
        name: 'Terraform',
        color: '#844FBA',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <polygon points="2 3 9 7 9 15 2 11" fill="#844FBA" />
            <polygon points="10 7.5 17 11.5 17 19.5 10 15.5" fill="#844FBA" />
            <polygon points="17.5 3 24.5 7 24.5 15 17.5 11" fill="#844FBA" opacity="0.8" />
          </svg>
        ),
      },
      {
        name: 'gRPC / Protobuf',
        color: '#244c5a',
        icon: (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="#244c5a" strokeWidth="2" />
            <polyline points="2 17 12 22 22 17" stroke="#244c5a" strokeWidth="2" />
          </svg>
        ),
      },
    ],
  },
]

const CAREER = [
  {
    period: '2023 - Present',
    role: 'Staff Infrastructure & Backend Engineer',
    company: 'Apex Cloud Systems • Singapore & Remote',
    summary:
      'Leading the platform infrastructure team. Architected the edge API gateway handling 24M+ daily requests and spearheaded database sharding that decreased p99 latency by 45%.',
  },
  {
    period: '2021 - 2023',
    role: 'Senior Backend Engineer',
    company: 'Nexus FinTech • Jakarta & Singapore',
    summary:
      'Engineered an idempotent payment processing engine handling $40M+ monthly throughput. Designed failover mechanics with zero duplicate ledger records during network partition events.',
  },
  {
    period: '2019 - 2021',
    role: 'Fullstack Software Engineer',
    company: 'Algospatial Telemetry • Bandung',
    summary:
      'Built high-concurrency Node.js and Go microservices with Next.js dashboards. Maintained automated CI/CD deployment pipelines across multi-region Kubernetes clusters.',
  },
]

const EDUCATION = [
  {
    year: '2015 - 2019',
    title: 'B.Sc. in Computer Science',
    institution: 'Institut Teknologi Bandung (ITB)',
  },
  {
    year: '2022',
    title: 'Certified Kubernetes Administrator (CKA)',
    institution: 'Cloud Native Computing Foundation (CNCF)',
  },
  {
    year: '2021',
    title: 'AWS Certified Solutions Architect Professional',
    institution: 'Amazon Web Services (AWS)',
  },
]

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
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition-all hover:bg-black hover:scale-105 shadow-md"
                  >
                    <span>Explore Projects</span>
                    <span className="text-xs">&darr;</span>
                  </a>
                  <Link
                    href="/demo/developer/contact"
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
                            Systems Design
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm">
                            Distributed Mesh
                          </div>
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
                            Low Latency
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm">
                            p99 &lt; 4.2ms
                          </div>
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
                            High Availability
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm">
                            99.99% Uptime
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Proportional Stats (Clean Cards on Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-6 xl:gap-7 lg:col-span-3 lg:pl-2">
                {/* Stat 1 */}
                {/* <div className="flex items-center gap-3.5 group rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-4 lg:border-none lg:bg-transparent lg:p-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 group-hover:border-slate-900 group-hover:text-slate-900 transition-all shadow-2xs">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight text-slate-900">99.99%</div>
                    <div className="text-xs font-medium text-slate-500 leading-snug">
                      Production uptime
                    </div>
                  </div>
                </div> */}

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
                    <div className="text-xl font-bold tracking-tight text-slate-900">3+ yrs</div>
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
                <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Selected Work
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Featured Projects
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
                <Link
                  key={proj.id}
                  href={`/demo/developer/projects/${proj.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-slate-300"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <ImageMedia
                        resource={
                          proj.image?.[0] ||
                          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85'
                        }
                        alt={proj.title}
                        fill
                        size="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        imgClassName="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                          {proj.type}
                        </span>
                        {proj.year && (
                          <span className="text-[11px] font-medium text-slate-400">
                            {proj.year}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {proj.title}
                      </h3>

                      {proj.description && (
                        <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-2 font-normal">
                          {summaryLexicalContent(proj.description)}
                        </p>
                      )}

                      {proj.label && (
                        <div className="mt-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="truncate max-w-[240px]">{proj.label}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mx-5 sm:mx-6 pb-5 sm:pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      View Case Study
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <svg
                        className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
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
                  Specialized Tools &amp; Infrastructure
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
                        <ImageMedia
                          resource={
                            tool.icon ||
                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85'
                          }
                          alt={tool.name}
                          imgClassName="w-8 h-8 object-contain rounded-full shadow-xs"
                        />
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
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {job.description}
                      </p>
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
