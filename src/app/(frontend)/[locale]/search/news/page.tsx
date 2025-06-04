import { getTranslations } from 'next-intl/server'
import configPromise from '@payload-config'
import { getPayload, TypedLocale, Where } from 'payload'
import React from 'react'
import { MobileForm } from '@/components/MobileForm'
import { queryMasterData } from '@/lib/queries/masterData'
import { NoResults } from '@/components/Search/NoResults'
import { News } from '@/payload-types'
import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import { Tabs, TabsContent } from "@/components/ui/tabs"
import NewsCard from '@/components/NewsCard'
import SearchPageTab from '@/components/SearchPageTab'
import { Pagination } from '@/components/Pagination'

// Types
type SearchParams = {
  prefecture?: string
  area?: string
  category?: string
  open_now?: string
  price_min?: string
  price_max?: string
  tags?: string
  sort?: string
  page?: string
}

type Props = {
  params: Promise<{
    locale: TypedLocale
  }>,
  searchParams: Promise<SearchParams>,
}

const SORT_OPTIONS = {
  updated_at: '-updatedAt',
  new_shops: '-createdAt',
} as const

type SortOption = keyof typeof SORT_OPTIONS


function getFilterCount(searchParams: SearchParams): number {
  return Object.entries(searchParams).reduce((count, [key, value]) => {
    if (key === 'sort' || !value) return count
    return count + 1
  }, 0)
}

function buildWhereConditions(
  searchParams: SearchParams,
  masterData: Awaited<ReturnType<typeof queryMasterData>>
): Where {
  const conditions: Where = {
    _status: { equals: 'published' } // Only show published shops
  }

  // Prefecture filter
  if (searchParams?.prefecture) {
    const prefecture = masterData.prefectures.find(p => p.slug === searchParams.prefecture?.toLowerCase())
    // @ts-expect-error error in payload
    const relatedAreas = masterData.areas.filter(a => a.prefecture.id === prefecture?.id)
    if (relatedAreas.length > 0) {
      conditions['area'] = { in: relatedAreas.map(a => a.id).join(',') }
    }
  }

  // City filter
  if (searchParams?.area) {
    const areaSlugs = searchParams.area.split(',')
    const areaIds = masterData.areas
      .filter(area => areaSlugs.includes(area.slug || ''))
      .map(area => area.id)

    if (areaIds.length > 0) {
      conditions['area'] = { in: areaIds.join(',') }
    }
  }

  // Category filter
  if (searchParams?.category) {
    const categorySlugs = searchParams.category.split(',')
    const categoryIds = masterData.categories
      .filter(category => categorySlugs.includes(category.slug || ''))
      .map(category => category.id)

    if (categoryIds.length > 0) {
      conditions['categories'] = { in: categoryIds.join(',') }
    }
  }

  // Price range filter
  if (searchParams?.price_min || searchParams?.price_max) {
    conditions['lowestPrice'] = {
      ...(searchParams?.price_min && { greater_than_equal: Number(searchParams.price_min) }),
      ...(searchParams?.price_max && { less_than_equal: Number(searchParams.price_max) })
    }
  }

  // Open now filter
  if (searchParams?.open_now === 'true') {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`

    conditions['and'] = [
      { openHour: { less_than_equal: currentTime } },
      { closeHour: { greater_than_equal: currentTime } }
    ]
  }

  // Tags filter
  if (searchParams?.tags) {
    const tagSlugs = searchParams.tags.split(',')
    const tagIds = masterData.tags
      .filter(tag => tagSlugs.includes(tag.slug || ''))
      .map(tag => tag.id)

    if (tagIds.length > 0) {
      conditions['tags'] = { in: tagIds.join(',') }
    }
  }

  return conditions
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const t = await getTranslations()
  const { locale } = await params
  const awaitedSearchParams = await searchParams || {}
  const masterData = await queryMasterData({ locale })

  // Build dynamic title and description based on search parameters
  const titleParts: string[] = []
  const descriptionParts: string[] = []

  if (awaitedSearchParams.prefecture) {
    const prefecture = masterData.prefectures.find(p => p.slug === awaitedSearchParams.prefecture)
    if (prefecture) {
      titleParts.push(prefecture.title)
      descriptionParts.push(prefecture.title)
    }
  }

  if (awaitedSearchParams.area) {
    const areaSlugs = awaitedSearchParams.area.split(',')
    const areas = masterData.areas
      .filter(area => areaSlugs.includes(area.slug || ''))
      .map(area => area.title)
    if (areas.length > 0) {
      titleParts.push(areas.join(', '))
      descriptionParts.push(areas.join(', '))
    }
  }

  if (awaitedSearchParams.category) {
    const categorySlugs = awaitedSearchParams.category.split(',')
    const categories = masterData.categories
      .filter(category => categorySlugs.includes(category.slug || ''))
      .map(category => category.title)
    if (categories.length > 0) {
      titleParts.push(categories.join(', '))
      descriptionParts.push(categories.join(', '))
    }
  }

  // Build the final title and description
  const baseTitle = t('search.title')
  const title = titleParts.length > 0
    ? `${titleParts.join(' - ')} | ${baseTitle}`
    : baseTitle

  const baseDescription = t('search.description', { count: 'various' })
  const description = descriptionParts.length > 0
    ? `Find the best adult entertainment venues in ${descriptionParts.join(', ')}. ${baseDescription}`
    : baseDescription

  // Build canonical URL with search parameters
  const searchParamsString = new URLSearchParams(
    Object.entries(awaitedSearchParams)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => [key, value as string])
  ).toString()

  const canonicalUrl = searchParamsString
    ? `/${locale}/search?${searchParamsString}`
    : `/${locale}/search`

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      locale: locale,
      url: `${getServerSideURL()}${canonicalUrl}`,
      type: 'website',
    }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': '/en/search',
        'ja': '/ja/search',
        'ko': '/ko/search',
        'zh': '/zh/search',
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      'noimageindex': false,
    },
  }
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params
  const t = await getTranslations()
  const awaitedSearchParams = await searchParams || {}
  const masterData = await queryMasterData({ locale })

  const filterCount = getFilterCount(awaitedSearchParams)
  const whereConditions = buildWhereConditions(awaitedSearchParams, masterData)
  const sortField = SORT_OPTIONS[awaitedSearchParams.sort as SortOption] || SORT_OPTIONS.updated_at
  const page = Number(awaitedSearchParams.page) || 1
  const limit = 12
  const payload = await getPayload({ config: configPromise })

  const shops = await payload.find({
    collection: 'shops',
    overrideAccess: false,
    locale,
    where: whereConditions,
    select: {
      shopName: true,
      relatedNews: true
    },
    joins: {
      relatedNews: {
        limit: 1,
        sort: '-updatedAt',
      }
    },
    limit: -1
  })

  const news = await payload.find({
    collection: 'news',
    overrideAccess: false,
    locale,
    where: {
      shop: {
        in: shops.docs.map((shop) => shop.id).join(',')
      }
    },
    sort: sortField,
    page,
    limit,
  })

  return (
    <div className="flex flex-col">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t('search.title')}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground md:mt-2 md:text-sm">
          {t('search.description', { count: shops.totalDocs })}
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:mb-6 md:justify-end">
        <MobileForm
          areas={masterData.areas}
          categories={masterData.categories}
          filterCount={filterCount}
          tags={masterData.tags}
        />
      </div>

      <Tabs defaultValue="news" className="w-full">
        <SearchPageTab />

        <TabsContent value="news">
          <div className="grid grid-cols-1 gap-4">
            {news.docs.length > 0 ? (
              news.docs.map((news, key) => {
                return <NewsCard key={key} news={news as News} />
              })
            ) : (
              <div className="flex justify-center items-center h-full w-full col-span-full">
                <NoResults />
              </div>
            )}
          </div>

          <div className="container mt-6">
            {news.totalPages > 1 && news.page && (
              <Pagination
                page={news.page}
                totalPages={news.totalPages}
                baseUrl={`/${locale}/search/news`}
                searchParams={awaitedSearchParams}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
