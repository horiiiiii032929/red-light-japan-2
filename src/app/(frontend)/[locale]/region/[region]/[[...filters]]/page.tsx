import type { Metadata } from 'next/types'

import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, TypedLocale, Where } from 'payload'
import React from 'react'
import { ShopCard } from '@/components/Shop/Card'

interface FilterParams {
  locale: TypedLocale
  region: string
  filters: string[]
}

interface Props {
  params: Promise<FilterParams>
}

interface FilterConditions {
  areas: string[]
  categories: string[]
}

export default async function Page({ params: paramsPromise }: Props) {
  const {
    region,
    filters = [],
    locale
  } = await paramsPromise

  const filterConditions = parseFilters(filters)
  const whereConditions = buildWhereConditions(region, filterConditions)

  const payload = await getPayload({ config: configPromise })

  const shops = await payload.find({
    collection: 'shops',
    overrideAccess: false,
    locale,
    where: whereConditions,
    select: {
      id: true,
      logo: true,
      shopName: true,
      message: true,
      lowestPrice: true,
      openHour: true,
      closeHour: true,
      bannerImage: true,
      staff: true,
      description: true,
      paymentMethods: true,
      area: true,
      categories: true,
    }
  })

  return (
    <div className="flex flex-col gap-4 py-4">
      {shops.docs.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}

      <div className="container">
        {shops.totalPages > 1 && shops.page && (
          <Pagination page={shops.page} totalPages={shops.totalPages} />
        )}
      </div>
    </div>
  )
}

function parseFilters(filters: string[]): FilterConditions {
  const areas: string[] = []
  const categories: string[] = []

  filters.forEach((filter, index) => {
    const nextSegment = filters[index + 1]
    if (!nextSegment) return

    if (filter === 'area') {
      areas.push(...nextSegment.split('+'))
    } else if (filter === 'category') {
      categories.push(...nextSegment.split('+'))
    }
  })

  return { areas, categories }
}

function buildWhereConditions(region: string, { areas, categories }: FilterConditions): Where {
  const conditions: Where = {
    'area.region.slug': {
      equals: region,
    },
  }

  if (areas.length > 0) {
    conditions['area.slug'] = {
      in: areas,
    }
  }

  if (categories.length > 0) {
    conditions['categories.slug'] = {
      in: categories,
    }
  }

  return conditions
}