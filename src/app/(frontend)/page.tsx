import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Page from './page.client'
import { Experience, Education, LandingPage, Tool, Project } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const defaultLandingPage = {
    id: 1,
    title: 'Modern Developer Portfolio',
    hero: {
      headline: 'Modern Developer Portfolio',
      subheadline: 'A modern developer portfolio built with Payload CMS and Next.js.',
    },
    project: [] as Project[],
  } as LandingPage

  // Query global and collections in parallel
  const [landingData, experiencesData, educationsData, toolsData] = await Promise.all([
    payload
      .findGlobal({
        slug: 'landing-page',
        draft: isDraft,
        depth: 2,
      })
      .catch((err) => {
        console.error('Error fetching landing page global:', err)
        return null
      }),
    payload
      .find({
        collection: 'experiences',
        draft: isDraft,
        sort: 'order',
        limit: 50,
        overrideAccess: false,
      })
      .catch(() => ({ docs: [] as Experience[] })),
    payload
      .find({
        collection: 'educations',
        draft: isDraft,
        sort: 'order',
        limit: 50,
        overrideAccess: false,
      })
      .catch(() => ({ docs: [] as Education[] })),
    payload
      .find({
        collection: 'tools',
        draft: isDraft,
        sort: 'order',
        limit: 50,
        overrideAccess: false,
      })
      .catch(() => ({ docs: [] as Tool[] })),
  ])

  return (
    <>
      {isDraft && <LivePreviewListener />}
      <Page
        landingPage={landingData ?? defaultLandingPage}
        experience={experiencesData?.docs}
        education={educationsData?.docs}
        tools={toolsData?.docs}
      />
    </>
  )
}
