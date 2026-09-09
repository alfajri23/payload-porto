import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'company', 'period', 'order'],
  },
  fields: [
    {
      name: 'role',
      label: 'Posisi / Role',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Perusahaan & Lokasi',
      type: 'text',
      required: true,
    },
    {
      name: 'period',
      label: 'Periode (contoh: 2023 - Present)',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi Pekerjaan',
      type: 'textarea',
      required: true,
    },
    {
      name: 'order',
      label: 'Urutan Tampil (1, 2, 3...)',
      type: 'number',
      defaultValue: 1,
    },
  ],
}
