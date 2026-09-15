import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import {
  FixedToolbarFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

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
      name: 'desc',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
          ]
        },
      }),
      label: 'Description',
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
