import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Metadata } from 'next'
import SubmissionsDashboard from './SubmissionsDashboard'

export const metadata: Metadata = {
  title: 'Form Submissions Dashboard | Web Ticket',
  description: 'Kelola dan lihat data pendaftaran form event dalam tampilan grid yang mudah dibaca.',
}

export default async function DashboardSubmissionsPage() {
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch all Forms ("Form dari mana")
  const formsRes = await payload.find({
    collection: 'forms',
    limit: 100,
  })

  // 2. Fetch Form Submissions with depth: 1 to populate form relationships & field definitions
  const submissionsRes = await payload.find({
    collection: 'form-submissions',
    depth: 1,
    limit: 300,
    sort: '-createdAt',
  })

  // Serialized clean docs for client component
  const forms = JSON.parse(JSON.stringify(formsRes.docs || []))
  const submissions = JSON.parse(JSON.stringify(submissionsRes.docs || []))

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <SubmissionsDashboard forms={forms} submissions={submissions} />
    </main>
  )
}
