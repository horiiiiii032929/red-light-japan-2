import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'
import { Access, User } from 'payload'

export const updateAndDeleteAccess: Access = ({ req }) => {
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(req.user as User | null)) {
    return true
  }

  return {
    id: {
      in: getUserTenantIDs(req.user, 'tenant-admin'),
    },
  }
}
