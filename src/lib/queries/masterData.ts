import { getPayload } from 'payload'
import { TypedLocale } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

export const queryMasterData = cache(async ({ region, locale }: { region: string, locale: TypedLocale }) => {
    const payload = await getPayload({ config: configPromise })

    const [areas, categories, regions] = await Promise.all([
        payload.find({
            collection: 'areas',
            sort: 'order',
            overrideAccess: false,
            locale,
            limit: 30,
            where: {
                ['region.slug']: {
                    equals: region,
                },
            },
        }),
        payload.find({
            collection: 'categories',
            sort: 'order',
            overrideAccess: false,
            locale,
            limit: 30,
        }),
        payload.find({
            collection: 'regions',
            sort: 'order',
            overrideAccess: false,
            locale,
            limit: 30,
        }),
    ])

    return {
        areas: areas.docs,
        categories: categories.docs,
        regions: regions.docs,
    }
}) 