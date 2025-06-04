import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "@/collections/Shops/access/superAdminOrTenantAdmin";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { EXPERIMENTAL_TableFeature, FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticatedOrPublished,
    update: superAdminOrTenantAdminAccess,
  },
  labels: {
    singular: {
      ja: 'ニュース',
      en: 'News',
    },
    plural: {
      ja: 'ニュース',
      en: 'News',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      label: {
        ja: '写真',
        en: 'Images',
      },
    },
    {
      name: 'subTitle',
      type: 'textarea',
      localized: true,
      label: {
        ja: 'サブタイトル',
        en: 'Sub Title',
      },
    },
    {
      name: 'detail',
      type: 'richText',
      localized: true,
      label: {
        ja: '詳細',
        en: 'Detail',
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
      name: 'shop',
      type: 'relationship',
      relationTo: 'shops',
      hasMany: false,
      required: true,
      label: {
        ja: '店舗',
        en: 'Shop',
      },
    }
  ],
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}