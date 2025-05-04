import type { GlobalConfig, User } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { isSuperAdmin } from '@/access/isSuperAdmin'
export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    hidden: (args) => {
      return !isSuperAdmin(args.user as User)
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
