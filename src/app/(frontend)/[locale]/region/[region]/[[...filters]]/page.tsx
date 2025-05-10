import type { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, TypedLocale, Where } from 'payload'
import React from 'react'
import { ShopCard } from '@/components/Shop/Card'
import { queryMasterData } from '@/lib/queries/masterData'

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

export async function generateMetadata({
  params: paramsPromise,
}: Props): Promise<Metadata> {
  const { region, filters = [], locale } = await paramsPromise
  const t = await getTranslations()
  const { regions } = await queryMasterData({ region, locale })
  const regionName = regions.find(r => r.slug === region)?.title || region

  // Parse filters to determine if they're canonical
  const { areas, categories } = parseFilters(filters)

  // Determine if this is a canonical view
  const isCanonicalView = determineCanonicalView(areas, categories)

  // Base URL without filters
  const baseUrl = `https://nightlifejapan.com/${locale}/region/${region}`

  // Canonical URL - either base URL or filtered URL depending on context
  const canonicalUrl = isCanonicalView
    ? `${baseUrl}${filters.length ? `/${filters.join('/')}` : ''}`
    : baseUrl

  // Generate title and description based on filters
  const title = generateTitle(regionName, areas, categories, t)
  const description = generateDescription(regionName, areas, categories, t)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale,
      siteName: t('shops.shopList'),
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}${filters.length ? `/${filters.join('/')}` : ''}`,
        'ja': `${baseUrl}${filters.length ? `/${filters.join('/')}` : ''}`,
        'ko': `${baseUrl}${filters.length ? `/${filters.join('/')}` : ''}`,
        'zh': `${baseUrl}${filters.length ? `/${filters.join('/')}` : ''}`,
      }
    },
    robots: {
      index: isCanonicalView,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

// Helper function to determine if a filtered view should be canonical
function determineCanonicalView(areas: string[], categories: string[]): boolean {
  // Example rules for canonical views:
  // 1. No filters (base view)
  if (areas.length === 0 && categories.length === 0) return true

  // 2. Single area filter (common use case)
  if (areas.length === 1 && categories.length === 0) return true

  // 3. Single category filter (common use case)
  if (areas.length === 0 && categories.length === 1) return true

  // 4. Common area + category combinations
  if (areas.length === 1 && categories.length === 1) return true

  // All other combinations are non-canonical
  return false
}

// Helper function to generate dynamic titles
function generateTitle(
  regionName: string,
  areas: string[],
  categories: string[],
  t: any
): string {
  let title = `${regionName} ${t('app.description')}`

  if (areas.length > 0) {
    title += ` - ${t('area')}: ${areas.join(', ')}`
  }

  if (categories.length > 0) {
    title += ` - ${t('category')}: ${categories.join(', ')}`
  }

  return `${title} | NIGHT LIFE JAPAN`
}

// Helper function to generate dynamic descriptions
function generateDescription(
  regionName: string,
  areas: string[],
  categories: string[],
  t: any
): string {
  let description = t('region.description', { region: regionName })

  if (areas.length > 0 || categories.length > 0) {
    description += ` ${t('filtered.description', {
      areas: areas.length > 0 ? areas.join(', ') : t('all'),
      categories: categories.length > 0 ? categories.join(', ') : t('all')
    })}`
  }

  return description
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

      {shops.totalDocs === 0 && (
        <div className="container">
          <p className="text-center text-2xl font-bold">No shops found</p>
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