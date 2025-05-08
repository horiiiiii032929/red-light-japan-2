import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
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
