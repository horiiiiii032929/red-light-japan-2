import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'
import { isSuperAdmin, isSuperAdminAccess } from '@/access/isSuperAdmin'

export const Prefectures: CollectionConfig = {
  slug: 'prefectures',
  access: {
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: anyone,
    update: isSuperAdminAccess,
  },
  admin: {
    useAsTitle: 'title',
    hidden: (args) => {
      return !isSuperAdmin(args.user)
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
      name: 'region',
      type: 'relationship',
      relationTo: 'regions',
      required: true,
      hasMany: false,
    },
    {
      name: 'order',
      type: 'number',
    },
    ...slugField(),
  ],
}
