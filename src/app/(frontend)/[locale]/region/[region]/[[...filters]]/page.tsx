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

  const title = `${regionName} ${t('app.description')} | NIGHT LIFE JAPAN`
  const description = t('region.description', { region: regionName })

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale,
      siteName: t('shops.shopList')
    },
    alternates: {
      canonical: `https://nightlifejapan.com/${locale}/region/${region}${filters.length ? `/${filters.join('/')}` : ''}`,
      languages: {
        'en': `https://nightlifejapan.com/en/region/${region}${filters.length ? `/${filters.join('/')}` : ''}`,
        'ja': `https://nightlifejapan.com/ja/region/${region}${filters.length ? `/${filters.join('/')}` : ''}`,
        'ko': `https://nightlifejapan.com/ko/region/${region}${filters.length ? `/${filters.join('/')}` : ''}`,
        'zh': `https://nightlifejapan.com/zh/region/${region}${filters.length ? `/${filters.join('/')}` : ''}`,
      }
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
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