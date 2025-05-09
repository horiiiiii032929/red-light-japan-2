import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'
import { revalidateDelete, revalidateShop } from './hooks/revalidateShop'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { staff } from './tabs/staff'
import { system } from './tabs/system'
import { coupon } from './tabs/coupon'
import { basic } from './tabs/basic'
import { top } from './tabs/top'

export const Shops: CollectionConfig<'shops'> = {
  slug: 'shops',
  admin: {
    defaultColumns: ['shopName', 'updatedAt'],
    // livePreview: {
    //   url: ({ data, req }) => {
    //     const path = generatePreviewPath({
    //       slug: typeof data?.slug === 'string' ? data.slug : '',
    //       collection: 'posts',
    //       req,
    //     })

    //     return path
    //   },
    // },
    // preview: (data, { req }) =>
    //   generatePreviewPath({
    //     slug: typeof data?.slug === 'string' ? data.slug : '',
    //     collection: 'posts',
    //     req,
    //   }),
    useAsTitle: 'shopName',
  },
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticatedOrPublished,
    update: superAdminOrTenantAdminAccess,
  },
  fields: [
    {
      name: 'shopName',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: top,
          label: 'Top',
        },
        {
          fields: basic,
          label: 'Information',
        },
        {
          fields: [system],
          label: 'System',
        },
        {
          fields: [staff],
          label: 'Staff',
        },
        {
          fields: [coupon],
          label: 'Coupon',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
          ],
        },
      ]
    }
  ],
  hooks: {
    afterChange: [revalidateShop],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};