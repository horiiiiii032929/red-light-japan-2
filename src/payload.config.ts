// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import localization from './i18n/localization'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media/Media'
import { Users } from './collections/Users'
import { Tenants } from './collections/Tenants'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { en } from '@payloadcms/translations/languages/en'
import { ja } from '@payloadcms/translations/languages/ja'
import { Areas } from './collections/Areas'
import { Regions } from './collections/Regions'
import { PaymentMethods } from './collections/PaymentMethods'
import { Shops } from './collections/Shops'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Prefectures } from './collections/Prefectures'
import { Tags } from './collections/Tags'
import { Casts } from './collections/Casts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    avatar: {
      Component: '@/components/payload/Avatar',
    },
    meta: {
      titleSuffix: '- NIGHT LIFE JAPAN',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '@/components/payload/Logo',
        Icon: '@/components/payload/Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: 'users',
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  collections: [
    Categories,
    Media,
    Tenants,
    Users,
    Regions,
    Prefectures,
    Areas,
    PaymentMethods,
    Shops,
    Tags,
    Casts
  ],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    vercelBlobStorage({
      enabled: process.env.NODE_ENV === 'production',
      collections: {
        media: true,
        // @ts-expect-error
        'media-with-prefix': {
          prefix: 'night-life-japan',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  i18n: {
    supportedLanguages: { en, ja },
    fallbackLanguage: 'en',
  },
  localization
})
