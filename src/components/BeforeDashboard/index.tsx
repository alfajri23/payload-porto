import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { TrafficChart } from './TrafficChart'
import { SeedButton } from './SeedButton'
import './index.scss'

export const BeforeDashboard: React.FC = async () => {
  const payload = await getPayload({ config })

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29)
  thirtyDaysAgo.setHours(0, 0, 0, 0)

  const [visitsCount, promoCount, monthlyViewsDoc, projectsCount, postsCount] =
    await Promise.all([
      payload.count({ collection: 'page-views' }).catch(() => ({ totalDocs: 0 })),
      payload
        .count({
          collection: 'page-views',
          where: {
            referrer: {
              not_equals: 'Direct',
            },
          },
        })
        .catch(() => ({ totalDocs: 0 })),
      payload
        .find({
          collection: 'page-views',
          where: {
            createdAt: {
              greater_than_equal: thirtyDaysAgo.toISOString(),
            },
          },
          limit: 1000,
          pagination: false,
          sort: 'createdAt',
        })
        .catch(() => ({ docs: [] })),
      payload.count({ collection: 'projects' as any }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'posts' as any }).catch(() => ({ totalDocs: 0 })),
    ])

  const totalVisits = visitsCount.totalDocs
  const promoVisits = promoCount.totalDocs
  const totalProjects = projectsCount.totalDocs
  const totalPosts = postsCount.totalDocs

  const trafficData = (monthlyViewsDoc.docs || []).map((doc: any) => ({
    createdAt:
      typeof doc.createdAt === 'string' ? doc.createdAt : new Date(doc.createdAt).toISOString(),
    device: doc.device || null,
    referrer: doc.referrer || null,
  }))

  return (
    <div className="custom-admin-dashboard">
      <div className="custom-admin-dashboard__header">
        <div>
          <h2 className="custom-admin-dashboard__title">Ringkasan Website & Analitik</h2>
          <p className="custom-admin-dashboard__subtitle">
            Pantau metrik kunjungan website tiket dan aktivitas pengunjung secara real-time.
          </p>
        </div>
        <div className="custom-admin-dashboard__actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="custom-admin-dashboard__link-button"
          >
            ↗ Kunjungi Web
          </a>
          <SeedButton />
        </div>
      </div>

      <div className="custom-admin-dashboard__grid">
        <div className="custom-admin-dashboard__card">
          <div className="custom-admin-dashboard__card-header">
            <span className="custom-admin-dashboard__card-label">Total Pengunjung</span>
            <span className="custom-admin-dashboard__card-icon">👥</span>
          </div>
          <div className="custom-admin-dashboard__card-value">{totalVisits}</div>
          <div className="custom-admin-dashboard__card-desc">Sesi unik landing tercatat</div>
        </div>

        <div className="custom-admin-dashboard__card">
          <div className="custom-admin-dashboard__card-header">
            <span className="custom-admin-dashboard__card-label">Kunjungan Promo (?ref=)</span>
            <span className="custom-admin-dashboard__card-icon">🏷️</span>
          </div>
          <div className="custom-admin-dashboard__card-value">{promoVisits}</div>
          <div className="custom-admin-dashboard__card-desc">Dari link sosmed & referral</div>
        </div>

        <div className="custom-admin-dashboard__card">
          <div className="custom-admin-dashboard__card-header">
            <span className="custom-admin-dashboard__card-label">Total Proyek / Tiket</span>
            <span className="custom-admin-dashboard__card-icon">🎟️</span>
          </div>
          <div className="custom-admin-dashboard__card-value">{totalProjects}</div>
          <div className="custom-admin-dashboard__card-desc">Katalog aktif terdaftar</div>
        </div>

        <div className="custom-admin-dashboard__card">
          <div className="custom-admin-dashboard__card-header">
            <span className="custom-admin-dashboard__card-label">Total Artikel / Posts</span>
            <span className="custom-admin-dashboard__card-icon">📝</span>
          </div>
          <div className="custom-admin-dashboard__card-value">{totalPosts}</div>
          <div className="custom-admin-dashboard__card-desc">Konten terbit</div>
        </div>
      </div>

      <TrafficChart initialData={trafficData} />
    </div>
  )
}

export default BeforeDashboard
