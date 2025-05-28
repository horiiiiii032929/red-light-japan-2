import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '@/access/anyone'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      ja: 'メディア',
    },
    plural: {
      en: 'Media',
      ja: 'メディア',
    },
  },
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: anyone,
    update: superAdminOrTenantAdminAccess,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      // {
      //   name: 'thumbnail',
      //   width: 300,
      // },
      // {
      //   name: 'logo',
      //   width: 200,
      //   height: 200,
      //   crop: 'center',
      // },
      // {
      //   name: 'banner',
      //   width: 800,
      //   height: 250,
      //   crop: 'center',
      // },
      // {
      //   name: 'portrait',
      //   width: 600,
      //   height: 800,
      //   crop: 'center',
      // },
      // {
      //   name: 'hero',
      //   width: 1920,
      //   height: 1080,
      //   crop: 'center',
      // },
      // {
      //   name: 'system',
      //   width: 400,
      //   height: 300,
      //   crop: 'center',
      // },
      // {
      //   name: 'og',
      //   width: 1200,
      //   height: 630,
      //   crop: 'center',
      // },
    ],
  },
}
