import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Tools: CollectionConfig = {
  slug: 'tools',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'color', 'order'],
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Tool / Stack',
      type: 'text',
      required: true,
    },
    {
      name: 'color',
      label: 'Warna Aksen / Hex (contoh: #A259FF)',
      type: 'text',
      defaultValue: '#0D99FF',
    },
    {
      name: 'icon',
      label: 'Icon Gambar / SVG',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      label: 'Urutan Tampil (1, 2, 3...)',
      type: 'number',
      defaultValue: 1,
    },
  ],
}
