import type { CollectionConfig } from 'payload'

import { FormBlock } from '@/components/Form/config'
import { slugField } from '@/fields/slug'
import { publishedOnly } from './access/publishedOnly'
import { isSuperAdmin, isSuperAdminAccess } from '@/access/isSuperAdmin'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: publishedOnly,
    update: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    create: isSuperAdminAccess,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [FormBlock],
              required: true,
            },
          ],
          label: 'Content',
        },
      ],
    },
    ...slugField(),
  ],
  versions: {
    drafts: true,
  },
}
