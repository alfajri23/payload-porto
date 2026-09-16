import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import RichText from '@/components/RichText'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { Education, Experience, LandingPage, Project, Tool } from '@/payload-types'

interface PageProps {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

async function queryProjectBySlug(slug: string) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    depth: 2,
    where: {
      slug: { equals: slug },
    },
  })
  return result.docs[0] || null
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug(decodedSlug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: `Case study for ${project.title} (${project.type || 'Engineering & Design'}).`,
  }
}

export default async function DeveloperProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug || '')
  const project = (await queryProjectBySlug(decodedSlug)) as Project
  console.log('Project:', project)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-200 selection:text-black flex flex-col justify-between">
      <main className="flex-1">
        {/* ========================================================== */}
        {/* BREADCRUMBS & PROJECT HEADER                               */}
        {/* ========================================================== */}
        <section className="border-b border-slate-100 bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 xl:px-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
              <Link href="/demo/developer" className="hover:text-slate-900 transition-colors">
                Overview
              </Link>
              <span>/</span>
              <Link
                href="/demo/developer/projects"
                className="hover:text-slate-900 transition-colors"
              >
                Projects
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">{project.title}</span>
            </div>

            {/* Title & Metadata */}
            <div className="max-w-4xl">
              {project.type && (
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{project.type}</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {project.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"></p>
            </div>

            {/* Spec Sheet Strip */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-slate-100 pt-7 text-xs">
              <div>
                <span className="text-slate-500 uppercase tracking-wider font-semibold block">
                  Production Year
                </span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">{project.year}</span>
              </div>

              <div>
                {project.link && (
                  <>
                    <span className="text-slate-500 uppercase tracking-wider font-semibold block">
                      Source Repository
                    </span>
                    <Link
                      href={
                        project.link?.startsWith('http') ? project.link : `https://${project.link}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-blue-600 text-sm mt-1 inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Link</span>
                      <span>&rarr;</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* HERO IMAGE SPECIMEN                                        */}
        {/* ========================================================== */}
        <section className="bg-slate-50/50 py-10 sm:py-14 border-b border-slate-100">
          <div className="mx-auto max-w-6xl px-6 sm:px-6">
            {/* Remaining Images */}
            {project.image && project.image.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4">
                {project.image.map((img, idx) => {
                  if (typeof img === 'number' || !img) return null

                  return (
                    <div>
                      <div
                        key={img.id || idx}
                        className="relative rounded-2xl border border-slate-200/80 bg-white p-2.5 transition-all hover:border-slate-400 hover:shadow-md shadow-xl"
                      >
                        <div className="relative w-full overflow-hidden rounded-lg bg-slate-100">
                          <ImageMedia
                            resource={img}
                            alt={img.alt || `Preview ${idx + 1}`}
                            size="(max-width: 768px) 100vw, 600px"
                            imgClassName="object-top object-cover"
                          />
                        </div>
                        <span className="mt-2 text-xs text-slate-700 block">{img.alt}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================== */}
        {/* DEEP DIVE ARCHITECTURAL NARRATIVE                          */}
        {/* ========================================================== */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 xl:px-20">
            <div className="space-y-14">
              {/* Section 01: Challenge */}
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Project Description
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-li:text-sm sm:prose-li:text-base prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700">
                  <RichText data={project.description} enableGutter={false} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
