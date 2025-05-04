import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'
import { isSuperAdmin, isSuperAdminAccess } from '@/access/isSuperAdmin'

export const Areas: CollectionConfig = {
  slug: 'areas',
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
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'prefecture',
      type: 'relationship',
      relationTo: 'prefectures',
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
