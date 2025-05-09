import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Shop } from '../../../payload-types'
import localization from '@/i18n/localization'

export const revalidateShop: CollectionAfterChangeHook<Shop> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/${localization.defaultLocale}/shops/${doc.id}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      // revalidateTag('shops-sitemap')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/${localization.defaultLocale}/shops/${previousDoc.id}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      // revalidateTag('shops-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Shop> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/${localization.defaultLocale}/shops/${doc?.id}`

    revalidatePath(path)
    // revalidateTag('shops-sitemap')
  }

  return doc
}
