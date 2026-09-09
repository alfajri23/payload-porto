import { Block, GlobalConfig } from 'payload'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  access: {
    read: () => true,
  },
  admin: {
    // 1. Konfigurasi Live Preview untuk Global ini
    livePreview: {
      url: () => {
        const encodedParams = new URLSearchParams({
          path: '/', // Mengarah ke beranda utama
          previewSecret: process.env.PREVIEW_SECRET || '',
        })
        return `/next/preview?${encodedParams.toString()}`
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
        },
        {
          name: 'subheadline',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'project',
      type: 'relationship',
      label: 'Project',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        description: 'Select The Project that will be shown in landing page',
      },  
    },
  ],
}
