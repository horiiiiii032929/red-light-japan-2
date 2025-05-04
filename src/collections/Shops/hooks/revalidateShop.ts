import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Shop } from '../../../payload-types'
import localization from '@/i18n/localization'

export const revalidateShop: CollectionAfterChangeHook<Shop> = ({
  doc,
  previousDoc,
  req: { payload, context, i18n },
}) => {
  const locale = i18n.language

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/${locale}/shops/${doc.id}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/${locale}/shops/${previousDoc.id}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Shop> = ({ doc, req: { payload, context, i18n } }) => {
  const locale = i18n.language
  const oldPath = `/${locale}/shops/${doc.id}`

  payload.logger.info(`Revalidating old post at path: ${oldPath}`)

  revalidatePath(oldPath)

  return doc
}
