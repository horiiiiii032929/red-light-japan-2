import { getPayload } from 'payload'
import { TypedLocale } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

export const queryMasterData = cache(async ({ locale }: { locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })

  const [areas, categories, regions, prefectures, tags] = await Promise.all([
    payload.find({
      collection: 'areas',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 200,
    }),
    payload.find({
      collection: 'categories',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 200,
    }),
    payload.find({
      collection: 'regions',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 200,
    }),
    payload.find({
      collection: 'prefectures',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 200,
    }),
    payload.find({
      collection: 'tags',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 200,
    }),
  ])

  return {
    areas: areas.docs,
    categories: categories.docs,
    regions: regions.docs,
    prefectures: prefectures.docs,
    tags: tags.docs,
  }
}) 