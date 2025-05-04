import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "@/collections/Shops/access/superAdminOrTenantAdmin";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { revalidateShop, revalidateDelete } from "@/collections/Shops/hooks/revalidateShop";

export const Casts: CollectionConfig = {
  slug: 'casts',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticatedOrPublished,
    update: superAdminOrTenantAdminAccess,
  },
  labels: {
    singular: {
      ja: 'キャスト',
      en: 'Cast',
    },
    plural: {
      ja: 'キャスト',
      en: 'Casts',
    },
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: {
        ja: '名前',
        en: 'Name',
      },
    },
    {
      name: 'age',
      type: 'number',
      required: true,
      label: {
        ja: '年齢',
        en: 'Age',
      },
    },
    {
      name: 'height',
      type: 'number',
      required: true,
      label: {
        ja: '身長',
        en: 'Height',
      },
    },
    {
      name: 'cup',
      type: 'select',
      options: ['A', 'B', 'C', 'D', 'E', 'F'],
      label: {
        ja: 'カップ',
        en: 'Cup',
      },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: {
        ja: '写真',
        en: 'Images',
      },
      maxDepth: 10
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
}