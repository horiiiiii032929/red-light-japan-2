import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Config, Plugin, User } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { getServerSideURL } from '@/utilities/getURL'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'
import { Shop } from '@/payload-types'

const generateTitle: GenerateTitle<Shop> = ({ doc }) => {
  return doc?.shopName ? `${doc.shopName} | Nightlife Japan` : 'Nightlife Japan'
}

const generateURL: GenerateURL<Shop> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.id ? `${url}/${doc.id}` : url
}

export const plugins: Plugin[] = [
  // redirectsPlugin({
  //   // collections: ['pages', 'posts'],
  //   overrides: {
  //     admin: {
  //       hidden: (args) => {
  //         return !isSuperAdmin(args.user as User)
  //       },
  //     },
  //     //  - This is a valid override, mapped fields don't resolve to the same type
  //     // @ts-expect-error
  //     fields: ({ defaultFields }) => {
  //       return defaultFields.map((field) => {
  //         if ('name' in field && field.name === 'from') {
  //           return {
  //             ...field,
  //             admin: {
  //               description: 'You will need to rebuild the website when changing this field.',
  //             },
  //           }
  //         }

  //         return field
  //       })
  //     },
  //     hooks: {
  //       afterChange: [revalidateRedirects],
  //     },
  //   },
  // }),
  nestedDocsPlugin({
    collections: ['regions', 'prefectures', 'areas'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      admin: {
        hidden: (args) => {
          return !isSuperAdmin(args.user)
        },
      },
    },
    formOverrides: {
      admin: {
        hidden: (args) => {
          return !isSuperAdmin(args.user)
        },
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  multiTenantPlugin<Config>({
    collections: {
      shops: {},
      media: {},
      casts: {},
      news: {},
    },
    tenantField: {
      access: {
        read: () => true,
        update: ({ req }) => {
          if (isSuperAdmin(req.user as User | null)) {
            return true
          }
          return getUserTenantIDs(req.user).length > 0
        },
      },
    },
    tenantsArrayField: {
      includeDefaultField: false,
    },
    userHasAccessToAllTenants: (user) => isSuperAdmin(user),
  }),
  // payloadCloudPlugin(),
]
