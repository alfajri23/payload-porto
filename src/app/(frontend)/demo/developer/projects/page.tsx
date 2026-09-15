import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { DevNav } from '../_components/DevNav'
import { DevFooter } from '../_components/DevFooter'

export const metadata: Metadata = {
  title: 'All Projects | Rian Kurnia',
  description:
    'Full archive of production systems, distributed backends, and cloud infrastructure projects.',
}

export default async function DeveloperProjectsPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 100,
    overrideAccess: false,
    depth: 1,
    select: {
      title: true,
      slug: true,
      type: true,
      label: true,
      year: true,
      image: true,
    },
  })
  const projects = result.docs

  function getFirstImageUrl(project: (typeof projects)[0]): string | null {
    const raw = Array.isArray(project.image) ? project.image[0] : project.image
    if (raw && typeof raw === 'object' && 'url' in raw && raw.url) return raw.url as string
    return null
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#111827] font-sans antialiased selection:bg-[#E5E7EB] selection:text-black flex flex-col justify-between">
      <DevNav />

      <main className="flex-1">
        {/* Compact, clean page header */}
        <section className="border-b border-slate-100 bg-white px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>
                  All Projects &bull; {projects.length} {projects.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Portofolio
              </h1>
            </div>

            <p className="text-sm text-slate-500 max-w-md sm:text-right font-normal">
              High-throughput distributed systems, cloud infrastructure, and database engineering.
            </p>
          </div>
        </section>

        {/* Projects grid */}
        <section className="px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-7xl">
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 max-w-sm shadow-xs">
                  <p className="text-sm font-semibold text-slate-700">No projects published yet</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Add projects in Payload Admin to display them here.
                  </p>
                  <Link
                    href="/demo/developer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    <span>&larr;</span>
                    <span>Back to Overview</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                {projects.map((proj) => {
                  const imageUrl = getFirstImageUrl(proj)
                  const slug = typeof proj.slug === 'string' ? proj.slug : ''
                  return (
                    <Link
                      key={proj.id}
                      href={`/demo/developer/projects/${slug}`}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-slate-300"
                    >
                      <div>
                        {/* Image */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={proj.title || 'Project preview'}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-100">
                              <span className="text-xs text-slate-400 font-medium">No image</span>
                            </div>
                          )}
                        </div>

                        {/* Card content */}
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

                          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                            {proj.title}
                          </h2>

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

                      {/* Card footer */}
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
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <DevFooter />
    </div>
  )
}
