import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'

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
    title: `${project.title} | Adrian Pratama - Portfolio`,
    description: `Case study for ${project.title} (${project.type || 'UI/UX Design'}) by Adrian Pratama.`,
  }
}

export default async function Project({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise

  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug

  const project = await queryProjectBySlug(decodedSlug)

  if (!project) return <PayloadRedirects url={url} />

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-poppins antialiased selection:bg-[#0D99FF] selection:text-white pb-24">
      {draft && <LivePreviewListener />}
      <PayloadRedirects disableNotFound url={url} />

      {/* ========================================================== */}
      {/* 1. TOP MINIMAL NAVIGATION BAR                              */}
      {/* ========================================================== */}
      <nav
        aria-label="Project Navigation"
        className="sticky top-0 z-40 border-b border-[#E8E4DA] bg-[#FAF8F5]/95 px-6 py-3.5 backdrop-blur-md sm:px-10 md:px-14"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between font-mono text-xs">
          <Link
            href="/#works"
            className="group inline-flex items-center gap-2 font-semibold text-[#111111] transition-colors hover:text-[#0D99FF]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D5D0C5] bg-white text-[11px] shadow-2xs transition-transform group-hover:-translate-x-0.5 group-hover:border-[#0D99FF]">
              &larr;
            </span>
            <span>Back to Selected Works</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-[#D5D0C5] bg-white px-3 py-1 text-[11px] text-[#55524C] sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-[#0ACF83]" />
              <span>❖ Scope: {project.slug}</span>
            </span>

            {project.link && (
              <a
                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0D99FF] px-4 py-1.5 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#007FE0] hover:scale-105"
              >
                <span>Live Prototype</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        <section aria-label="Project Case Study Hero" className="mb-14 border-b border-[#E5E0D6] pb-12">
          {/* Top Tagline / Meta Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0D99FF]/30 bg-[#0D99FF]/10 px-3 py-1 font-mono text-xs font-bold text-[#0D99FF]">
              <span>{project.type || 'Product Design'}</span>
            </span>

            {project.label && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0ACF83]/30 bg-[#0ACF83]/10 px-3 py-1 font-mono text-xs font-semibold text-[#0B8556]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0ACF83]" />
                <span>{project.label}</span>
              </span>
            )}

            {project.year && (
              <span className="font-mono text-xs font-medium text-[#7A756D]">
                &bull; Year {project.year}
              </span>
            )}
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111111] leading-[1.08] mb-8">
            {project.title}
          </h1>

          {/* 2-Column Hero Grid: Case Study Analysis + Project Artifacts */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
            {/* Left: Case Study Narrative (7 cols) */}
            <div className="lg:col-span-8 rounded-2xl border border-[#E5E0D6] bg-white p-7 sm:p-9 shadow-xs">
              <div className="mb-5 flex items-center justify-between border-b border-[#F0ECE1] pb-3.5">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0D99FF]" />
                  <span>CASE STUDY ANALYSIS &bull; ARCHITECTURE</span>
                </div>
                <span className="font-mono text-[11px] text-[#8A857C]">Overview</span>
              </div>

              {/* RichText Content */}
              {project.description ? (
                <div className="prose prose-neutral max-w-none text-[#33312E] leading-relaxed prose-headings:font-bold prose-headings:text-[#111111] prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-relaxed prose-li:text-base prose-a:text-[#0D99FF] prose-a:underline hover:prose-a:text-[#007FE0]">
                  <RichText data={project.description} enableGutter={false} />
                </div>
              ) : (
                <p className="text-base leading-relaxed text-[#66635C] italic">
                  No narrative written yet. You can edit this in Payload CMS under the description field.
                </p>
              )}
            </div>

            {/* Right: Project Artifacts Specs Box (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-[#E5E0D6] bg-white p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#111111] border-b border-[#F0ECE1] pb-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#A259FF]" />
                <span>PROJECT ARTIFACTS</span>
              </div>

              <div className="space-y-3.5 font-mono text-xs">
                <div className="flex justify-between border-b border-[#F2EEE4] pb-2.5">
                  <span className="text-[#7A756D]">Status</span>
                  <span className="font-semibold text-[#0ACF83] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#0ACF83]" />
                    <span>Production Shipped</span>
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#F2EEE4] pb-2.5">
                  <span className="text-[#7A756D]">Discipline</span>
                  <span className="font-semibold text-[#111111] text-right">{project.type}</span>
                </div>

                {project.label && (
                  <div className="flex justify-between border-b border-[#F2EEE4] pb-2.5">
                    <span className="text-[#7A756D]">Key Metric</span>
                    <span className="font-semibold text-[#0D99FF] text-right">{project.label}</span>
                  </div>
                )}

                {project.year && (
                  <div className="flex justify-between border-b border-[#F2EEE4] pb-2.5">
                    <span className="text-[#7A756D]">Year</span>
                    <span className="font-semibold text-[#111111]">{project.year}</span>
                  </div>
                )}
              </div>

              {project.link && (
                <div className="pt-2">
                  <a
                    href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] py-3 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#0D99FF] hover:scale-102"
                  >
                    <span>Visit Live Prototype</span>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        {/* 3. ALIGNED IMAGES SHOWCASE: 1 CLEAR VOCAL POINT            */}
        {/* ========================================================== */}
        <section aria-label="Visual Specimens Showcase" className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0ACF83]" />
              <span>INTERFACE SPECIMENS // ALIGNED VISUALS</span>
            </div>
            <span className="font-mono text-xs text-[#7A756D]">
              {mediaList.length > 0 ? `${mediaList.length} Artboard${mediaList.length > 1 ? 's' : ''}` : 'Figma Specimen'}
            </span>
          </div>

          {/* ALIGNED GRID WITH 1 PROMINENT VOCAL POINT */}
          {mediaList.length <= 1 ? (
            /* Case 1: Single Vocal Point Image (or placeholder) */
            <div className="relative rounded-2xl border-2 border-[#0D99FF] bg-white p-3 shadow-[0_16px_40px_rgba(13,153,255,0.1)]">
              <div className="flex items-center justify-between px-2 pb-2 font-mono text-[11px] text-[#7A756D]">
                <span className="flex items-center gap-1.5 font-bold text-[#0D99FF]">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4zm12 0l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4z" />
                  </svg>
                  <span>❖ Vocal Point: Primary Interface Canvas</span>
                </span>
                <span>1440 &times; 900px &bull; 100% Scale</span>
              </div>

              {/* 4 Corner Nodes */}
              <span className="absolute -left-1.5 -top-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white" />
              <span className="absolute -right-1.5 -top-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white" />
              <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white" />
              <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white" />

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#ECE7DF]">
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
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#EAE6DD] via-[#F2EEE6] to-[#DDD7CB] p-8 text-center [background-image:radial-gradient(#C5C0B4_1px,transparent_1px)] [background-size:20px_20px]">
                    <div className="rounded-2xl border border-[#0D99FF]/40 bg-white/95 p-8 shadow-sm max-w-md">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D99FF]/10 text-[#0D99FF]">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4zm12 0l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4z" />
                        </svg>
                      </div>
                      <h3 className="mt-4 font-mono text-sm font-bold text-[#111111] uppercase tracking-wider">
                        {project.title} &bull; Primary Specimen
                      </h3>
                      <p className="mt-1 text-xs text-[#55524C]">
                        Upload images in Payload Admin under the image field to showcase full interfaces here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Case 2: Aligned Showcase (Left = Big Vocal Point, Right = Aligned Companion Images) */
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
              {/* PRIMARY VOCAL POINT (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="relative h-full flex flex-col rounded-2xl border-2 border-[#0D99FF] bg-white p-3 shadow-[0_16px_40px_rgba(13,153,255,0.1)]">
                  <div className="flex items-center justify-between px-2 pb-2 font-mono text-[11px] text-[#7A756D]">
                    <span className="flex items-center gap-1.5 font-bold text-[#0D99FF]">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4zm12 0l4 4-4 4-4-4 4-4zm-6 6l4 4-4 4-4-4 4-4z" />
                      </svg>
                      <span>❖ Vocal Point: Primary Specimen</span>
                    </span>
                    <span>Lead Canvas</span>
                  </div>

                  {/* Corner Handles */}
                  <span className="absolute -left-1.5 -top-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white" />
                  <span className="absolute -right-1.5 -top-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white" />
                  <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white" />
                  <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-2 border-[#0D99FF] bg-white" />

                  <div className="relative min-h-[340px] sm:min-h-[420px] flex-1 w-full overflow-hidden rounded-xl bg-[#ECE7DF]">
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

              {/* SECONDARY ALIGNED SPECIMENS (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                {secondaryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative flex-1 rounded-2xl border border-[#D8D3C7] bg-white p-2.5 shadow-xs transition-all hover:border-[#0D99FF] hover:shadow-md flex flex-col"
                  >
                    <div className="flex items-center justify-between px-1 pb-1.5 font-mono text-[10px] text-[#7A756D]">
                      <span className="font-semibold text-[#111111]">❖ Specimen {String(idx + 2).padStart(2, '0')}</span>
                      <span>Aligned Detail</span>
                    </div>

                    <div className="relative min-h-[160px] flex-1 w-full overflow-hidden rounded-lg bg-[#ECE7DF]">
                      <Image
                        src={img.url}
                        alt={img.alt || `Specimen ${idx + 2}`}
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

          {/* ADDITIONAL REMAINING IMAGES (IF > 3 IMAGES) */}
          {remainingImages.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4">
              {remainingImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl border border-[#D8D3C7] bg-white p-2.5 shadow-xs transition-all hover:border-[#0D99FF] hover:shadow-md"
                >
                  <div className="flex items-center justify-between px-1 pb-1.5 font-mono text-[10px] text-[#7A756D]">
                    <span className="font-semibold text-[#111111]">❖ Specimen {String(idx + 4).padStart(2, '0')}</span>
                    <span>Supporting Artboard</span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#ECE7DF]">
                    <Image
                      src={img.url}
                      alt={img.alt || `Specimen ${idx + 4}`}
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
        {/* 4. FOOTER: CLEAN NEXT ACTIONS                              */}
        {/* ========================================================== */}
        <footer className="mt-20 border-t border-[#E5E0D6] pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#0D99FF] transition-colors"
            >
              <span>&larr;</span>
              <span>Explore Other Selected Works</span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-2.5 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#0D99FF] hover:scale-105"
            >
              <span>Discuss Similar Project</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}