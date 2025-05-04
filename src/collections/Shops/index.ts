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
import { lexicalEditor, FixedToolbarFeature, InlineToolbarFeature, UploadFeature, EXPERIMENTAL_TableFeature } from '@payloadcms/richtext-lexical'
import { slugField } from '@/fields/slug'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'

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
    create: isSuperAdminAccess,
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
    ...slugField(),
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
          fields: [
            system,
            {
              name: 'systemDescription',
              type: 'richText',
              localized: true,
              label: {
                ja: 'システム説明',
                en: 'System Description',
              },
              editor: lexicalEditor({
                features: ({ defaultFeatures, rootFeatures }) => {
                  return [
                    ...defaultFeatures,
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    EXPERIMENTAL_TableFeature(),
                  ]
                },
              }),
            },
            {
              name: 'systemTerms',
              type: 'textarea',
              localized: true,
              label: {
                ja: 'システム利用規約',
                en: 'System Terms',
              },
              admin: {
                rows: 10,
                placeholder: '利用規約を入力してください(改行でわけられます)',
              },
            },
          ],
          label: {
            ja: 'システム',
            en: 'System',
          },
        },
        {
          fields: [
            staff
          ],
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
    // afterChange: [revalidateShop],
    // afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};