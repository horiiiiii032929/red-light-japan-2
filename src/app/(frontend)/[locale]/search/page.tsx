import type { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, TypedLocale, Where } from 'payload'
import React from 'react'
import { ShopCard } from '@/components/Shop/Card'

type Props = {
  params: Promise<{
    locale: TypedLocale
  }>,
  searchParams: Promise<{
    prefecture?: string
    city?: string
    category?: string
    open_now?: string
    price_min?: string
    price_max?: string
    tags?: string
    sort?: string
  }>,
}

const SORT_OPTIONS = {
  recommended: '-createdAt',
  newest: '-createdAt',
  popular: '-staff.length',
  priceLow: 'lowestPrice',
  priceHigh: '-lowestPrice'
} as const

type SortOption = keyof typeof SORT_OPTIONS

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params
  const awaitedSearchParams = await searchParams || {}

  const payload = await getPayload({ config: configPromise })

  // Build where conditions
  const whereConditions = buildWhereConditions(awaitedSearchParams)

  // Validate and get sort option
  const sortField = SORT_OPTIONS[awaitedSearchParams.sort as SortOption] || SORT_OPTIONS.recommended

  const shops = await payload.find({
    collection: 'shops',
    overrideAccess: false,
    locale,
    where: whereConditions,
    sort: sortField,
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

  const t = await getTranslations('system')

  return (
    <div className="flex flex-col gap-4 py-4">
      {shops.docs.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}

      {shops.totalDocs === 0 && (
        <div className="container">
          <p className="text-center text-2xl font-bold">{t('noResultsFound')}</p>
          <p className="text-center text-muted-foreground mt-2">{t('tryDifferentFilters')}</p>
        </div>
      )}

      <div className="container">
        {shops.totalPages > 1 && shops.page && (
          <Pagination page={shops.page} totalPages={shops.totalPages} />
        )}
      </div>
    </div>
  )
}

function buildWhereConditions(searchParams: Awaited<Props['searchParams']>): Where {
  const conditions: Where = {}

  // Prefecture filter
  if (searchParams?.prefecture) {
    conditions['area.prefecture.slug'] = {
      equals: searchParams.prefecture
    }
  }

  // City filter
  if (searchParams?.city) {
    conditions['area.slug'] = {
      in: searchParams.city.split(',')
    }
  }

  // Category filter
  if (searchParams?.category) {
    conditions['categories.slug'] = {
      in: searchParams.category.split(',')
    }
  }

  // Price range filter
  if (searchParams?.price_min || searchParams?.price_max) {
    conditions['lowestPrice'] = {
      ...(searchParams?.price_min && { greater_than_equal: Number(searchParams?.price_min) }),
      ...(searchParams?.price_max && { less_than_equal: Number(searchParams?.price_max) })
    }
  }

  // Open now filter
  if (searchParams?.open_now === 'true') {
    const now = new Date()
    const currentHour = now.getHours()
    conditions['openHour'] = {
      less_than_equal: currentHour
    }
    conditions['closeHour'] = {
      greater_than_equal: currentHour
    }
  }

  // // Tags filter
  // if (searchParams.tags) {
  //   conditions['tags'] = {
  //     in: searchParams.tags.split(',')
  //   }
  // }

  return conditions
}