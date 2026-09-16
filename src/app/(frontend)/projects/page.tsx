import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CardProject } from '@/components/Card/CardProject'
import { Project } from '@/payload-types'

export const metadata: Metadata = {
  title: 'All Projects | Feri Alfajri',
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
      description: true,
    },
  })
  const projects = result.docs as Project[]

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#111827] font-sans antialiased selection:bg-[#E5E7EB] selection:text-black flex flex-col justify-between">
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
                {projects.map((proj) => (
                  <CardProject key={proj.id} props={proj} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
