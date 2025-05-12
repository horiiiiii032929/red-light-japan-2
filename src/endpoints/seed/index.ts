import type { CollectionSlug, Payload, PayloadRequest } from 'payload'
import type { Area } from '@/payload-types'

import { paymentMethods, paymentMethods_ja, paymentMethods_ko, paymentMethods_zh } from './paymentmethods'
import { prefectures, prefectures_ja, prefectures_ko, prefectures_zh } from './prefecture'
import { areas, areas_ja, areas_ko, areas_zh } from './area'
import { categories, categories_ja, categories_ko, categories_zh } from './categories'
import { regions, regions_ja, regions_ko, regions_zh } from './regions'

const collections: CollectionSlug[] = [
  'categories',
  'payment-methods',
  'regions',
  'prefectures',
  'areas',
  'media',
  'shops',
  'users',
  'tenants',
  'payload-jobs',
  'payload-locked-documents',
  'payload-preferences',
  'payload-migrations',
]

type GlobalType = 'header' | 'footer'
const globals: GlobalType[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // Clear the database
  payload.logger.info(`— Clearing database...`)

  // // Clear globals
  // payload.logger.info(`— Clearing globals...`)
  // for (const global of globals) {
  //   await payload.updateGlobal({
  //     slug: global,
  //     data: {},
  //     req,
  //   })
  // }

  // Clear all collections
  payload.logger.info(`— Clearing collections...`)
  for (const collection of collections) {
    try {
      // Delete all documents in the collection
      await payload.delete({
        collection,
        where: {
          id: {
            exists: true,
          },
        },
        req,
      })

      // Delete all versions if the collection has versioning enabled
      if (payload.collections[collection]?.config?.versions) {
        await payload.db.deleteVersions({
          collection,
          req,
          where: {},
        })
      }
    } catch (error) {
      payload.logger.error(`Error clearing collection ${collection}:`, error)
    }
  }

  // #region Categories
  payload.logger.info(`— Seeding categories...`)

  for (const category of categories) {
    const categoryDoc = await payload.create({
      collection: 'categories',
      data: JSON.parse(JSON.stringify(category)),
      locale: 'en',
      req,
    })

    // Add Japanese translation
    const jaCategory = categories_ja.find(c => c.slug === category.slug)
    if (jaCategory) {
      await payload.update({
        collection: 'categories',
        id: categoryDoc.id,
        data: JSON.parse(JSON.stringify(jaCategory)),
        locale: 'ja',
        req,
      })
    }

    // Add Korean translation
    const koCategory = categories_ko.find(c => c.slug === category.slug)
    if (koCategory) {
      await payload.update({
        collection: 'categories',
        id: categoryDoc.id,
        data: JSON.parse(JSON.stringify(koCategory)),
        locale: 'ko',
        req,
      })
    }

    // Add Chinese translation
    const zhCategory = categories_zh.find(c => c.slug === category.slug)
    if (zhCategory) {
      await payload.update({
        collection: 'categories',
        id: categoryDoc.id,
        data: JSON.parse(JSON.stringify(zhCategory)),
        locale: 'zh',
        req,
      })
    }
  }
  // #endregion

  // #region Payment Methods
  payload.logger.info(`— Seeding payment methods...`)

  for (const paymentMethod of paymentMethods) {
    const paymentMethodDoc = await payload.create({
      collection: 'payment-methods',
      data: JSON.parse(JSON.stringify(paymentMethod)),
      locale: 'en',
      req,
    })

    // Add Japanese translation
    const jaPaymentMethod = paymentMethods_ja.find(pm => pm.slug === paymentMethod.slug)
    if (jaPaymentMethod) {
      await payload.update({
        collection: 'payment-methods',
        id: paymentMethodDoc.id,
        data: JSON.parse(JSON.stringify(jaPaymentMethod)),
        locale: 'ja',
        req,
      })
    }

    // Add Korean translation
    const koPaymentMethod = paymentMethods_ko.find(pm => pm.slug === paymentMethod.slug)
    if (koPaymentMethod) {
      await payload.update({
        collection: 'payment-methods',
        id: paymentMethodDoc.id,
        data: JSON.parse(JSON.stringify(koPaymentMethod)),
        locale: 'ko',
        req,
      })
    }

    // Add Chinese translation
    const zhPaymentMethod = paymentMethods_zh.find(pm => pm.slug === paymentMethod.slug)
    if (zhPaymentMethod) {
      await payload.update({
        collection: 'payment-methods',
        id: paymentMethodDoc.id,
        data: JSON.parse(JSON.stringify(zhPaymentMethod)),
        locale: 'zh',
        req,
      })
    }
  }
  // #endregion

  // #region Regions
  payload.logger.info(`— Seeding regions...`)

  const regionMap = new Map<string, string>() // Map to store slug -> id mapping

  for (const region of regions) {
    try {
      const regionDoc = await payload.create({
        collection: 'regions',
        data: JSON.parse(JSON.stringify(region)),
        locale: 'en',
        req,
      })

      // Store the region ID mapped to its slug
      regionMap.set(region.slug!, regionDoc.id)

      // Add Japanese translation
      const jaRegion = regions_ja.find(r => r.slug === region.slug)
      if (jaRegion) {
        await payload.update({
          collection: 'regions',
          id: regionDoc.id,
          data: JSON.parse(JSON.stringify(jaRegion)),
          locale: 'ja',
          req,
        })
      }

      // Add Korean translation
      const koRegion = regions_ko.find(r => r.slug === region.slug)
      if (koRegion) {
        await payload.update({
          collection: 'regions',
          id: regionDoc.id,
          data: JSON.parse(JSON.stringify(koRegion)),
          locale: 'ko',
          req,
        })
      }

      // Add Chinese translation
      const zhRegion = regions_zh.find(r => r.slug === region.slug)
      if (zhRegion) {
        await payload.update({
          collection: 'regions',
          id: regionDoc.id,
          data: JSON.parse(JSON.stringify(zhRegion)),
          locale: 'zh',
          req,
        })
      }
    } catch (error) {
      payload.logger.error(`Error creating region ${region.slug}:`, error)
    }
  }
  // #endregion

  // #region Prefectures
  payload.logger.info(`— Seeding prefectures...`)

  const prefectureMap = new Map<string, string>() // Map to store slug -> id mapping

  for (const prefecture of prefectures) {
    try {
      // Get the region ID from the map
      const regionId = regionMap.get(prefecture.region as string)
      if (!regionId) {
        payload.logger.error(`Region not found for prefecture: ${prefecture.slug}`)
        continue
      }

      // Create prefecture with the correct region ID
      const prefectureData = {
        ...JSON.parse(JSON.stringify(prefecture)),
        region: regionId,
      }

      const prefectureDoc = await payload.create({
        collection: 'prefectures',
        data: prefectureData,
        locale: 'en',
        req,
      })

      // Store the prefecture ID mapped to its slug
      prefectureMap.set(prefecture.slug!, prefectureDoc.id)

      // Add Japanese translation
      const jaPrefecture = prefectures_ja.find(p => p.slug === prefecture.slug)
      if (jaPrefecture) {
        await payload.update({
          collection: 'prefectures',
          id: prefectureDoc.id,
          data: {
            ...JSON.parse(JSON.stringify(jaPrefecture)),
            region: regionId,
          },
          locale: 'ja',
          req,
        })
      }

      // Add Korean translation
      const koPrefecture = prefectures_ko.find(p => p.slug === prefecture.slug)
      if (koPrefecture) {
        await payload.update({
          collection: 'prefectures',
          id: prefectureDoc.id,
          data: {
            ...JSON.parse(JSON.stringify(koPrefecture)),
            region: regionId,
          },
          locale: 'ko',
          req,
        })
      }

      // Add Chinese translation
      const zhPrefecture = prefectures_zh.find(p => p.slug === prefecture.slug)
      if (zhPrefecture) {
        await payload.update({
          collection: 'prefectures',
          id: prefectureDoc.id,
          data: {
            ...JSON.parse(JSON.stringify(zhPrefecture)),
            region: regionId,
          },
          locale: 'zh',
          req,
        })
      }
    } catch (error) {
      payload.logger.error(`Error creating prefecture ${prefecture.slug}:`, error)
    }
  }
  // #endregion

  // #region Areas
  payload.logger.info(`— Seeding areas...`)

  for (const area of areas) {
    try {
      // Get the prefecture ID from the map
      const prefectureId = prefectureMap.get(area.prefecture as string)
      if (!prefectureId) {
        payload.logger.error(`Prefecture not found for area: ${area.slug}`)
        continue
      }

      // Create area with the correct prefecture ID
      const areaData = {
        ...JSON.parse(JSON.stringify(area)),
        prefecture: prefectureId,
      }

      const areaDoc = await payload.create({
        collection: 'areas',
        data: areaData,
        locale: 'en',
        req,
      })

      // Add Japanese translation
      const jaArea = areas_ja.find((a: Partial<Area>) => a.slug === area.slug)
      if (jaArea) {
        await payload.update({
          collection: 'areas',
          id: areaDoc.id,
          data: {
            ...JSON.parse(JSON.stringify(jaArea)),
            prefecture: prefectureId,
          },
          locale: 'ja',
          req,
        })
      }

      // Add Korean translation
      const koArea = areas_ko.find((a: Partial<Area>) => a.slug === area.slug)
      if (koArea) {
        await payload.update({
          collection: 'areas',
          id: areaDoc.id,
          data: {
            ...JSON.parse(JSON.stringify(koArea)),
            prefecture: prefectureId,
          },
          locale: 'ko',
          req,
        })
      }

      // Add Chinese translation
      const zhArea = areas_zh.find((a: Partial<Area>) => a.slug === area.slug)
      if (zhArea) {
        await payload.update({
          collection: 'areas',
          id: areaDoc.id,
          data: {
            ...JSON.parse(JSON.stringify(zhArea)),
            prefecture: prefectureId,
          },
          locale: 'zh',
          req,
        })
      }
    } catch (error) {
      payload.logger.error(`Error creating area ${area.slug}:`, error)
    }
  }
  // #endregion

  payload.logger.info('Seeded database successfully!')
}
