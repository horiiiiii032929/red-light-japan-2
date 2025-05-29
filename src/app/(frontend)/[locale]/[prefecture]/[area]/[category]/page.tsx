import Link from "next/link"
import { Construction, ArrowRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTranslations } from "next-intl/server"
import { queryMasterData } from "@/lib/queries/masterData"
import { getPayload, TypedLocale, Where } from "payload"
import { notFound } from "next/navigation"
import configPromise from '@payload-config'
import { MobileForm } from "@/components/MobileForm"
import { ShopCard } from "@/components/ShopCard"
import { NoResults } from "@/components/Search/NoResults"
import { Shop } from "@/payload-types"
import { Pagination } from '@/components/Pagination'
import { SHOP_SELECT_FIELDS } from "@/lib/queries/const"
import { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'

interface Props {
  params: Promise<{
    locale: TypedLocale;
    prefecture: string;
    area: string;
    category: string;
  }>
  searchParams: Promise<{
    page: string
    price_min?: string
    price_max?: string
    open_now?: string
    tags?: string
    sort?: string
  }>
}

const SORT_OPTIONS = {
  updated_at: '-updatedAt',
  new_shops: '-createdAt',
} as const

type SortOption = keyof typeof SORT_OPTIONS


function buildWhereConditions(
  params: Awaited<Props['params']>,
  searchParams: Awaited<Props['searchParams']>,
  masterData: Awaited<ReturnType<typeof queryMasterData>>
): Where {
  const conditions: Where = {
    _status: { equals: 'published' } // Only show published shops
  }

  // Prefecture filter
  if (params.prefecture) {
    const prefecture = masterData.prefectures.find(p => p.slug === params.prefecture?.toLowerCase())
    // @ts-expect-error error in payload
    const relatedAreas = masterData.areas.filter(a => a.prefecture.id === prefecture?.id)
    if (relatedAreas.length > 0) {
      conditions['area'] = { in: relatedAreas.map(a => a.id).join(',') }
    }
  }

  // City filter
  if (params.area) {
    const areaSlugs = params.area.split(',')
    const areaIds = masterData.areas
      .filter(area => areaSlugs.includes(area.slug || ''))
      .map(area => area.id)

    if (areaIds.length > 0) {
      conditions['area'] = { in: areaIds.join(',') }
    }
  }

  // Category filter
  if (params.category) {
    const categorySlugs = params.category.split(',')
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

export async function generateMetadata({
  params,
  searchParams
}: Props): Promise<Metadata> {
  const { prefecture, area, category, locale } = await params
  const awaitedSearchParams = await searchParams || {}
  const t = await getTranslations()
  const masterdata = await queryMasterData({ locale })

  const prefectureData = masterdata.prefectures.find((item) => item.slug === prefecture)
  const areaData = masterdata.areas.find((item) => item.slug === area)
  const categoryData = masterdata.categories.find((item) => item.slug === category)

  if (!areaData || !categoryData || !prefectureData) {
    return {
      title: '404 - Page Not Found',
      robots: {
        index: false,
        follow: true,
      }
    }
  }

  // Build title and description
  const title = `${categoryData.title} in ${areaData.title}, ${prefectureData.title} | Nightlife Japan`
  const description = t('category-page.description', {
    area: areaData.title,
    category: categoryData.title
  })

  // Build breadcrumb structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': t('breadcrumbs.home'),
        'item': `${getServerSideURL()}/${locale}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': prefectureData.title,
        'item': `${getServerSideURL()}/${locale}/${prefecture}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': areaData.title,
        'item': `${getServerSideURL()}/${locale}/${prefecture}/${area}`
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': categoryData.title,
        'item': `${getServerSideURL()}/${locale}/${prefecture}/${area}/${category}`
      }
    ]
  }

  // Build collection page schema
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': title,
    'description': description,
    'url': `${getServerSideURL()}/${locale}/${prefecture}/${area}/${category}`,
    'about': {
      '@type': 'Thing',
      'name': categoryData.title,
      'description': description
    },
    'location': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': areaData.title,
        'addressRegion': prefectureData.title,
        'addressCountry': 'JP'
      }
    }
  }

  // Build canonical URL with pagination
  const canonicalUrl = awaitedSearchParams.page && Number(awaitedSearchParams.page) > 1
    ? `/${locale}/${prefecture}/${area}/${category}?page=${awaitedSearchParams.page}`
    : `/${locale}/${prefecture}/${area}/${category}`

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
        'en': `/en/${prefecture}/${area}/${category}`,
        'ja': `/ja/${prefecture}/${area}/${category}`,
        'ko': `/ko/${prefecture}/${area}/${category}`,
        'zh': `/zh/${prefecture}/${area}/${category}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
        'notranslate': true,
      }
    },
    other: {
      'schema-org': JSON.stringify([breadcrumbSchema, collectionPageSchema]),
    },
  }
}

export default async function CategoryPage({
  params,
  searchParams
}: Props) {
  const { prefecture, area, category, locale } = await params
  const awaitedSearchParams = await searchParams || {}

  const t = await getTranslations()

  const masterdata = await queryMasterData({ locale })
  const prefectureData = masterdata.prefectures.find((item) => item.slug === prefecture)
  const areaData = masterdata.areas.find((item) => item.slug === area)
  const categoryData = masterdata.categories.find((item) => item.slug === category)

  const payload = await getPayload({ config: configPromise })
  const whereConditions = buildWhereConditions(await params, awaitedSearchParams, masterdata)
  const page = Number(awaitedSearchParams.page) || 1
  const limit = 12 // Number of items per page

  const shops = await payload.find({
    collection: 'shops',
    where: whereConditions,
    sort: SORT_OPTIONS[awaitedSearchParams.sort as SortOption] || SORT_OPTIONS.updated_at,
    locale,
    page,
    limit,
    select: SHOP_SELECT_FIELDS
  })

  if (!areaData || !categoryData) {
    return notFound()
  }

  return (
    <div >
      <Breadcrumb className="mb-4 md:mb-6 overflow-x-auto whitespace-nowrap pb-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('breadcrumbs.home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prefecture}`}>{prefectureData?.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prefecture}/${area}`}>{areaData?.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prefecture}/${area}/${category}`}>
              {categoryData?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t('category-page.title', { area: areaData?.title, category: categoryData?.title })}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground md:text-sm">
          {t('category-page.description', { area: areaData?.title, category: categoryData?.title })}
        </p>
      </div>
      <div className="mb-8 md:mb-10">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:mb-6 md:justify-end">
          <MobileForm
            areas={masterdata.areas}
            categories={masterdata.categories}
            filterCount={0}
            tags={masterdata.tags}
            isSearchPage={false}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {shops.docs.length > 0 ? (
            shops.docs.map((shop) => (
              <ShopCard key={shop.id} shop={shop as Shop} />
            ))
          ) : (
            <div className="flex justify-center items-center h-full w-full col-span-full">
              <NoResults />
            </div>
          )}
        </div>

        <div className="container">
          {shops.totalPages > 1 && shops.page && (
            <Pagination
              page={shops.page}
              totalPages={shops.totalPages}
              baseUrl={`/${locale}/${prefecture}/${area}/${category}`}
              searchParams={awaitedSearchParams}
            />
          )}
        </div>
      </div>

      <section className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{t('category-page.related-articles')}</h2>
          <Link
            href={`/search?prefecture=${prefecture}`}
            className="flex items-center text-xs font-medium text-primary md:text-sm"
            aria-disabled
          >
            {t('prefecture-page.all-articles')} <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-4">
          <div className="flex flex-col justify-center items-center h-full w-full col-span-full">
            <div className="rounded-full p-36 flex flex-col items-center justify-center gap-4">
              <Construction className="h-12 w-12" />
              <p className="text-sm text-muted-foreground">Under Construction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
