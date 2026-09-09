import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Selected Works & Case Studies | Adrian Pratama',
  description:
    'Comprehensive directory of digital product design, interactive software interfaces, and design token architectures by Adrian Pratama.',
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-createdAt',
  })

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-poppins antialiased selection:bg-[#0D99FF] selection:text-white pb-14">

      <main className="mx-auto max-w-6xl px-6 pt-10 sm:px-10 sm:pt-14 md:px-14">
        {/* ========================================================== */}
        {/* 2. EDITORIAL SECTION HEADER (MATCHING HOMEWORKS SECTION)   */}
        {/* ========================================================== */}
        <header className="mb-12 border-b border-[#E2DDD3] pb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#121212]">
                <span className="h-2 w-2 rounded-full bg-[#0D99FF]" />
                PORTFOLIO DIRECTORY // COMPLETE ARCHIVE
              </div>
              <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-[#121212] sm:text-4xl md:text-5xl">
                Selected Works
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5C5A55]">
                In-depth case studies covering financial software consoles, spatial node topologies, design token pipelines, and mission-critical interactive architectures.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-[#7A7873]">
              <span className="rounded-full border border-[#DDD8CD] bg-white px-3.5 py-1.5 font-semibold text-[#121212] shadow-xs">
                {projects.totalDocs} Production Project{projects.totalDocs === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </header>

        {/* ========================================================== */}
        {/* 3. PROJECT ARCHIVE LIST                                    */}
        {/* ========================================================== */}
        {projects.docs.length > 0 ? (
          <div className="space-y-8">
            {projects.docs.map((project, index) => {
              // Extract primary media cover image
              const rawImages = Array.isArray(project.image)
                ? project.image
                : project.image
                ? [project.image]
                : []

              const firstMedia = rawImages[0]
              const imageUrl =
                typeof firstMedia === 'object' && firstMedia !== null && 'url' in firstMedia
                  ? (firstMedia.url as string)
                  : null

              const projectNumber = String(index + 1).padStart(2, '0')

              return (
                <article
                  key={project.id || index}
                  className="group relative rounded-2xl border border-[#E5E0D6] bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-[#0D99FF] hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                    {/* Left Column: Project Metadata & Description (7 Cols) */}
                    <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                      {/* Top Meta Bar */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="flex items-center gap-2 font-mono font-bold text-[#0D99FF]">
                          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0D99FF]/10 text-[11px]">
                            {projectNumber}
                          </span>
                          <span>{project.type || 'Product Design'}</span>
                        </span>

                        {project.label && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0ACF83]/30 bg-[#0ACF83]/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#0B8556]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0ACF83]" />
                            <span>{project.label}</span>
                          </span>
                        )}

                        {project.year && (
                          <span className="font-mono text-[#7A7873]">&bull; {project.year}</span>
                        )}
                      </div>

                      {/* Title */}
                      <Link href={`/projects/${project.slug}`} className="block">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] transition-colors group-hover:text-[#0D99FF]">
                          {project.title}
                        </h2>
                      </Link>

                      {/* Brief Info Tag */}
                      <p className="text-sm leading-relaxed text-[#55524C]">
                        Explore the full case study breakdown, architectural design decisions, and production artifacts shipped for this project scope.
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#F2EEE4]">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#0D99FF] hover:scale-105"
                        >
                          <span>Inspect Case Study</span>
                          <span>&rarr;</span>
                        </Link>

                        {project.link && (
                          <a
                            href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D0C5] bg-white px-4 py-2 text-xs font-medium text-[#111111] shadow-2xs transition-all hover:border-[#0D99FF] hover:text-[#0D99FF]"
                          >
                            <span>Live Prototype</span>
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Visual Specimen Artboard Thumbnail (5 Cols) */}
                    <div className="md:col-span-5">
                      <Link href={`/projects/${project.slug}`} className="block group/thumb">
                        <div className="relative rounded-xl border border-[#D8D3C7] bg-[#ECE7DF] p-2 transition-all group-hover/thumb:border-[#0D99FF]">
                          <div className="flex items-center justify-between px-1 pb-1 font-mono text-[10px] text-[#7A756D]">
                            <span className="font-semibold text-[#111111]">❖ Specimen Canvas</span>
                            <span>Inspect &rarr;</span>
                          </div>

                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#E0DBD0]">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 450px"
                                className="object-cover object-top transition-transform duration-300 group-hover/thumb:scale-103"
                              />
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#EAE6DD] via-[#F2EEE6] to-[#DDD7CB] p-6 text-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D99FF]/10 text-[#0D99FF]">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4zm12 0l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4z" />
                                  </svg>
                                </div>
                                <span className="mt-2 font-mono text-[11px] font-bold text-[#111111]">
                                  {project.title}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          /* Empty State if no projects in database yet */
          <div className="rounded-2xl border border-dashed border-[#D5D0C5] bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0D99FF]/10 text-[#0D99FF]">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4zm12 0l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#111111]">No Projects Published Yet</h3>
            <p className="mt-1 text-sm text-[#66635C] max-w-sm mx-auto">
              Create and publish projects in Payload CMS Admin under the Projects collection to display them here.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/collections/projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-2.5 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#0D99FF]"
              >
                <span>Open Payload Admin</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* 4. BOTTOM NAVIGATION & CALL TO ACTION                      */}
        {/* ========================================================== */}
        <div className="mt-16 border-t border-[#E5E0D6] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#0D99FF] transition-colors"
            >
              <span>&larr;</span>
              <span>Back to Home Overview</span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-2.5 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#0D99FF] hover:scale-105"
            >
              <span>Initiate Collaboration</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
