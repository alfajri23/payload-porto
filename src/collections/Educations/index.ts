import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Educations: CollectionConfig = {
  slug: 'educations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'institution', 'year', 'order'],
  },
  fields: [
    {
      name: 'title',
      label: 'Gelar / Nama Sertifikat',
      type: 'text',
      required: true,
    },
    {
      name: 'institution',
      label: 'Kampus / Lembaga Penerbit',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      label: 'Tahun (contoh: 2015 - 2019 atau 2021)',
      type: 'text',
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
