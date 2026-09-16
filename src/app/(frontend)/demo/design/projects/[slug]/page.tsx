import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'

type Args = {
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
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

export default async function Project({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise

  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug

  const project = await queryProjectBySlug(decodedSlug)

  if (!project) notFound()

  // Normalise uploaded images array
  const rawImages = Array.isArray(project.image)
    ? project.image
    : project.image
      ? [project.image]
      : []

  const mediaList = rawImages
    .map((item) => {
      if (typeof item === 'object' && item !== null && 'url' in item && item.url) {
        return {
          url: item.url as string,
          alt: (item.alt as string) || project.title,
        }
      }
      return null
    })
    .filter((item): item is { url: string; alt: string } => item !== null)

  const primaryImage = mediaList[0] || null
  const secondaryImages = mediaList.slice(1, 3)
  const remainingImages = mediaList.slice(3)

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-slate-900 font-sans antialiased selection:bg-slate-200 selection:text-black pb-24">
      {draft && <LivePreviewListener />}

      {/* ========================================================== */}
      {/* 1. TOP MINIMAL NAVIGATION BAR                              */}
      {/* ========================================================== */}
      <nav
        aria-label="Project Navigation"
        className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 px-6 py-3.5 backdrop-blur-md sm:px-10 md:px-14"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs">
          <Link
            href="/demo/developer"
            className="group inline-flex items-center gap-2 font-semibold text-slate-700 transition-colors hover:text-blue-600"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] shadow-2xs transition-transform group-hover:-translate-x-0.5 group-hover:border-blue-600">
              &larr;
            </span>
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.label && (
              <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{project.label}</span>
              </span>
            )}

            {project.link && (
              <a
                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-black hover:scale-105"
              >
                <span>Live Project</span>
                <svg
                  className="h-3.5 w-3.5"
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
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-10 sm:px-10 sm:pt-14 md:px-14">
        {/* ========================================================== */}
        {/* 2. CORE HERO: TITLE, CASE STUDY NARRATIVE & ARTIFACTS      */}
        {/* ========================================================== */}
        <section
          aria-label="Project Case Study Hero"
          className="mb-14 border-b border-slate-200/80 pb-12"
        >
          {/* Top Tagline / Meta Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <span>{project.type || 'Engineering & Systems'}</span>
            </span>

            {project.label && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{project.label}</span>
              </span>
            )}

            {project.year && (
              <span className="text-xs font-medium text-slate-500">&bull; Year {project.year}</span>
            )}
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
            {project.title}
          </h1>

          {/* 2-Column Hero Grid: Case Study Analysis + Project Artifacts */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
            {/* Left: Case Study Narrative (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>Architecture &bull; Case Study Overview</span>
                </div>
                <span className="text-xs font-medium text-slate-400">Overview</span>
              </div>

              {/* RichText Content */}
              {project.description ? (
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-li:text-sm sm:prose-li:text-base prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700">
                  <RichText data={project.description} enableGutter={false} />
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-slate-500 italic">
                  No narrative written yet. You can edit this in Payload CMS under the description
                  field.
                </p>
              )}
            </div>

            {/* Right: Project Specs Box (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3.5">
                <span className="h-2 w-2 rounded-full bg-slate-900" />
                <span>Project Specifications</span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500">Status</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Production Shipped</span>
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500">Discipline</span>
                  <span className="font-semibold text-slate-900 text-right">{project.type}</span>
                </div>

                {project.label && (
                  <div className="flex justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500">Key Metric</span>
                    <span className="font-semibold text-blue-600 text-right">{project.label}</span>
                  </div>
                )}

                {project.year && (
                  <div className="flex justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500">Year</span>
                    <span className="font-semibold text-slate-900">{project.year}</span>
                  </div>
                )}
              </div>

              {project.link && (
                <div className="pt-2">
                  <a
                    href={
                      project.link.startsWith('http') ? project.link : `https://${project.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white shadow-xs transition-all hover:bg-black hover:scale-[1.02]"
                  >
                    <span>Visit Live Project</span>
                    <svg
                      className="h-3.5 w-3.5"
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
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 3. ALIGNED IMAGES SHOWCASE                                 */}
        {/* ========================================================== */}
        <section aria-label="Visual Specimens Showcase" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Project Previews &amp; Visual Artifacts</span>
            </div>
            <span className="text-xs text-slate-500">
              {mediaList.length > 0
                ? `${mediaList.length} Image${mediaList.length > 1 ? 's' : ''}`
                : 'Gallery'}
            </span>
          </div>

          {/* Image Showcase Grid */}
          {mediaList.length <= 1 ? (
            /* Single Hero Image */
            <div className="relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-md">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 p-8 text-center">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs max-w-md">
                      <h3 className="text-sm font-bold text-slate-900">
                        {project.title} &bull; Interface Preview
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Upload media in Payload Admin under the image field to showcase visual
                        assets here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Multi-Image Aligned Showcase */
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
              {/* Primary Image (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="relative h-full flex flex-col rounded-2xl border border-slate-200/80 bg-white p-3 shadow-md">
                  <div className="relative min-h-[340px] sm:min-h-[420px] flex-1 w-full overflow-hidden rounded-xl bg-slate-100">
                    {primaryImage && (
                      <Image
                        src={primaryImage.url}
                        alt={primaryImage.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Secondary Companion Images (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                {secondaryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative flex-1 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xs transition-all hover:border-slate-400 hover:shadow-md flex flex-col"
                  >
                    <div className="relative min-h-[160px] flex-1 w-full overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={img.url}
                        alt={img.alt || `Preview ${idx + 2}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Remaining Images */}
          {remainingImages.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4">
              {remainingImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xs transition-all hover:border-slate-400 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={img.url}
                      alt={img.alt || `Preview ${idx + 4}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================== */}
        {/* 4. FOOTER: CLEAN NAVIGATION                                */}
        {/* ========================================================== */}
        <footer className="mt-20 border-t border-slate-200/80 pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/demo/developer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
            >
              <span>&larr;</span>
              <span>Back to Developer Overview</span>
            </Link>

            <Link
              href="/demo/developer/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-black hover:scale-105"
            >
              <span>Get in Touch</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
