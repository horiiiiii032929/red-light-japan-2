import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'
import { revalidateDelete, revalidateShop } from './hooks/revalidateShop'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { staff } from './tabs/staff'
import { system } from './tabs/system'
import { coupon } from './tabs/coupon'
import { basic } from './tabs/basic'
import { top } from './tabs/top'

export const Shops: CollectionConfig<'shops'> = {
  slug: 'shops',
  labels: {
    singular: {
      ja: '店舗',
      en: 'Shop',
    },
    plural: {
      ja: '店舗',
      en: 'Shops',
    },
  },
  admin: {
    defaultColumns: ['shopName', 'updatedAt'],
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
      localized: true,
      label: {
        ja: '店舗名',
        en: 'Shop Name',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: top,
          label: {
            ja: '店舗一覧カード',
            en: 'Top',
          },
        },
        {
          fields: basic,
          label: {
            ja: '店舗情報',
            en: 'Information',
          },
        },
        {
          fields: [system],
          label: {
            ja: 'システム',
            en: 'System',
          },
        },
        {
          fields: [staff],
          label: {
            ja: 'スタッフ',
            en: 'Staff',
          },
        },
        {
          fields: [coupon],
          label: {
            ja: 'クーポン',
            en: 'Coupon',
          },
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