import { getPayload } from 'payload'
import { TypedLocale } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

export const queryMasterData = cache(async ({ locale }: { locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })

  const [areas, categories, regions, prefectures, tags, shopsCountResult] = await Promise.all([
    payload.find({
      collection: 'areas',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 0,
    }),
    payload.find({
      collection: 'categories',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 0,
    }),
    payload.find({
      collection: 'regions',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 0,
    }),
    payload.find({
      collection: 'prefectures',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 0,
    }),
    payload.find({
      collection: 'tags',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 0,
    }),
    payload.find({
      collection: 'shops',
      overrideAccess: false,
      locale,
      limit: 1,
      page: 1,
      depth: 0,
      select: { shopName: false },
    }),
  ])

  return {
    areas: areas.docs,
    categories: categories.docs,
    regions: regions.docs,
    prefectures: prefectures.docs,
    tags: tags.docs,
    shopCount: shopsCountResult.totalDocs,
  }
}) 