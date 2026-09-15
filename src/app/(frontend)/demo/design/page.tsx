import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import PortfolioClient, {
  ProjectItem,
  ToolItem,
  ExperienceItem,
  EducationItem,
  HeroData,
} from './page.client'
import { DevNav } from './_components/DevNav'
import { DevFooter } from './_components/DevFooter'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const dynamic = 'force-static'
export const revalidate = 600

function extractTextFromLexical(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (typeof node === 'object') {
    const obj = node as Record<string, unknown>
    if (obj.text && typeof obj.text === 'string') {
      return obj.text
    }
    if (Array.isArray(obj.children)) {
      return obj.children.map(extractTextFromLexical).filter(Boolean).join(' ')
    }
    if (obj.root) {
      return extractTextFromLexical(obj.root)
    }
  }
  return ''
}

// High quality fallback data if database collections are still empty
const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: '01',
    title: 'Aura Protocol',
    subtitle: 'High-Frequency Algorithmic Trading Console',
    client: 'Aura Protocol GmbH',
    year: '2025',
    category: 'Fintech',
    impact: '+38.4% order throughput',
    summary:
      'Engineered a deterministic trading console with predictive optimistic UI states and sub-second execution feedback.',
    challenge:
      'Traders were losing critical milliseconds navigating multi-level transaction confirmation screens on volatile liquidity spikes.',
    solution:
      'Engineered a deterministic keyboard-driven order console with optimistic state updates and visual slippage tolerance gauges.',
    deliverables: ['Design System', 'Orderbook UI', 'Keyboard Navigation Framework'],
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    color: '#0D99FF',
    slug: 'aura-protocol',
  },
  {
    id: '02',
    title: 'Strata Cloud Platform',
    subtitle: 'Spatial Node Observability for Cloud Infrastructure',
    client: 'Strata Cloud Systems',
    year: '2024',
    category: 'Enterprise SaaS',
    impact: '-42% incident triage duration',
    summary:
      'Spatial node-clustering workspace for cloud infrastructure engineers, replacing cluttered tables with a visual topology canvas.',
    challenge:
      'Site reliability engineers were overwhelmed by sprawling data tables during cluster failovers and silent cascading outages.',
    solution:
      'Designed a spatial topology canvas with intelligent node clustering, dynamic zoom levels, and instant dependency mapping.',
    deliverables: ['Topology Canvas', 'Incident Timeline', 'Design Tokens'],
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    color: '#FF3B00',
    slug: 'strata-cloud',
  },
  {
    id: '03',
    title: 'Prism Design Infrastructure',
    subtitle: 'Multi-Brand Token Pipeline for Web & Mobile',
    client: 'Nordic Mobility Group',
    year: '2024',
    category: 'Design Systems',
    impact: '420+ tokens synchronized across platforms',
    summary:
      'Multi-platform token pipeline connecting Figma design variables directly with production iOS, Android, and Web components.',
    challenge:
      'Maintaining consistency across four sub-brands led to divergent UI code, visual drift, and repetitive front-end reviews.',
    solution:
      'Constructed a headless design token architecture directly compiling Figma variables into typed CSS, Swift, and Kotlin primitives.',
    deliverables: ['Token Pipeline', 'Figma Plugin', 'Multi-Brand Library'],
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    color: '#0ACF83',
    slug: 'prism-design-system',
  },
  {
    id: '04',
    title: 'Voxel Health Portal',
    subtitle: 'High-Contrast Clinical Diagnostics Workspace',
    client: 'Voxel Radiomics AI',
    year: '2023',
    category: 'Healthtech',
    impact: 'Zero contrast violations across 180 views',
    summary:
      'Designed an eye-fatigue mitigation layout system for radiologists reviewing 4K scan imagery under low-light laboratory conditions.',
    challenge:
      'Clinicians suffered from optical fatigue and diagnostic errors caused by standard bright hospital UI templates.',
    solution:
      'Implemented an ultra-low glare dark interface calibrated to DICOM Part 14 standards with dynamic luminance adaptation.',
    deliverables: ['Accessible Color Matrix', 'Diagnostic Viewport', 'Keyboard Shorthands'],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    color: '#A259FF',
    slug: 'voxel-health',
  },
]

const FALLBACK_TOOLS: ToolItem[] = [
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Next.js', color: '#000000' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Payload CMS', color: '#121212' },
  { name: 'Tokens Studio', color: '#8B5CF6' },
  { name: 'Framer Motion', color: '#0055FF' },
  { name: 'PostgreSQL', color: '#336791' },
]

const FALLBACK_EXPERIENCES: ExperienceItem[] = [
  {
    period: '2023 - Present',
    role: 'Lead UI/UX Architect',
    company: 'Studiofolio Labs • Jakarta & Remote',
    description:
      'Directing core design infrastructure, token pipelines, and interactive enterprise client systems. Leading product interface architecture across fintech and cloud observability suites.',
  },
  {
    period: '2021 - 2023',
    role: 'Senior Product Designer',
    company: 'Nexus FinTech • Singapore',
    description:
      'Led the redesign of high-frequency trading interfaces, shaving 2.4s off order placement cycles. Built and maintained the multi-brand component library serving 40+ engineering squads.',
  },
  {
    period: '2019 - 2021',
    role: 'UI/UX Engineer',
    company: 'Algospatial Systems • Bandung',
    description:
      'Bridged product design and frontend engineering. Created pixel-accurate interactive prototypes in React and established design tokens adopted across 6 cross-functional teams.',
  },
]

const FALLBACK_EDUCATIONS: EducationItem[] = [
  {
    year: '2015 - 2019',
    title: 'B.Sc. in Computer Science & HCI',
    institution: 'Institut Teknologi Bandung (ITB)',
  },
  {
    year: '2022',
    title: 'Certified Design System Lead',
    institution: 'Design Systems Academy',
  },
  {
    year: '2021',
    title: 'Advanced Web Accessibility Specialist',
    institution: 'W3C / Interaction Design Foundation',
  },
]

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Query global and collections in parallel
  const [landingData, allProjects, experiencesData, educationsData, toolsData] = await Promise.all([
    payload
      .findGlobal({
        slug: 'landing-page',
        draft: isDraft,
        depth: 2,
      })
      .catch(() => null),
    payload
      .find({
        collection: 'projects',
        draft: isDraft,
        depth: 2,
        limit: 100,
        overrideAccess: false,
        sort: '-createdAt',
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: 'experiences',
        draft: isDraft,
        sort: 'order',
        limit: 50,
        overrideAccess: false,
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: 'educations',
        draft: isDraft,
        sort: 'order',
        limit: 50,
        overrideAccess: false,
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: 'tools',
        draft: isDraft,
        sort: 'order',
        limit: 50,
        overrideAccess: false,
      })
      .catch(() => ({ docs: [] })),
  ])

  // 1. Process Hero Data from LandingPage global
  const heroGroup = landingData?.hero as Record<string, unknown> | undefined
  const heroImageObj = heroGroup?.image as Record<string, unknown> | undefined
  const heroData: HeroData = {
    headline: typeof heroGroup?.headline === 'string' ? heroGroup.headline : undefined,
    subheadline: typeof heroGroup?.subheadline === 'string' ? heroGroup.subheadline : undefined,
    description: typeof heroGroup?.description === 'string' ? heroGroup.description : undefined,
    image: typeof heroImageObj?.url === 'string' ? heroImageObj.url : undefined,
  }

  // 2. Process Projects: LandingPage.project relationship has priority, otherwise allProjects collection
  let rawProjects: any[] = []
  if (Array.isArray(landingData?.project) && landingData.project.length > 0) {
    rawProjects = landingData.project
  } else if (allProjects?.docs && allProjects.docs.length > 0) {
    rawProjects = allProjects.docs
  }

  const projects: ProjectItem[] =
    rawProjects.length > 0
      ? rawProjects.map((p, idx) => {
          const doc = typeof p === 'object' && p !== null ? p : {}
          const rawImages = Array.isArray(doc.image) ? doc.image : doc.image ? [doc.image] : []
          const firstImg = rawImages[0]
          const imageUrl =
            typeof firstImg === 'object' && firstImg !== null && 'url' in firstImg
              ? (firstImg.url as string)
              : undefined

          const rawText = extractTextFromLexical(doc.description)
          const summary =
            rawText.length > 160 ? rawText.slice(0, 160).trim() + '...' : rawText || undefined

          return {
            id: String(idx + 1).padStart(2, '0'),
            title: doc.title || `Project ${idx + 1}`,
            subtitle: doc.label || doc.type || undefined,
            client: doc.type || 'Client Scope',
            year: doc.year ? String(doc.year) : '2025',
            category: doc.type || 'Product Design',
            impact: doc.label ? doc.label : 'Shipped to Production',
            summary: summary,
            challenge: summary,
            solution: 'Architected with systematic design tokens and responsive execution states.',
            deliverables: [doc.type || 'Design System', 'UI Architecture', 'Production Shipped'],
            image: imageUrl || FALLBACK_PROJECTS[idx % FALLBACK_PROJECTS.length]?.image,
            color: '#0D99FF',
            slug: doc.slug || undefined,
            link: doc.link || undefined,
          }
        })
      : FALLBACK_PROJECTS

  // 3. Process Tools: database tools or fallback
  const tools: ToolItem[] =
    toolsData?.docs && toolsData.docs.length > 0
      ? toolsData.docs.map((t: any) => {
          const iconObj = typeof t.icon === 'object' && t.icon !== null ? t.icon : null
          const iconUrl = iconObj?.url ? (iconObj.url as string) : undefined
          return {
            name: t.name,
            color: t.color || '#0D99FF',
            icon: iconUrl,
          }
        })
      : FALLBACK_TOOLS

  // 4. Process Experiences: database experiences or fallback
  const experiences: ExperienceItem[] =
    experiencesData?.docs && experiencesData.docs.length > 0
      ? experiencesData.docs.map((e: any) => ({
          role: e.role,
          company: e.company,
          period: e.period,
          description: e.description,
        }))
      : FALLBACK_EXPERIENCES

  // 5. Process Educations: database educations or fallback
  const educations: EducationItem[] =
    educationsData?.docs && educationsData.docs.length > 0
      ? educationsData.docs.map((ed: any) => ({
          year: ed.year,
          title: ed.title,
          institution: ed.institution,
        }))
      : FALLBACK_EDUCATIONS

  const headerData = await getCachedGlobal('header', 1)()

  return (
    <>
      {isDraft && <LivePreviewListener />}
      <DevNav data={headerData} />
      <PortfolioClient
        hero={heroData}
        projects={projects}
        tools={tools}
        experiences={experiences}
        educations={educations}
      />
      <DevFooter />
    </>
  )
}
