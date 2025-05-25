import { Link } from "@/i18n/routing"
import { MapPin, ArrowRight, Construction } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getPayload, TypedLocale } from "payload"
import { queryMasterData } from "@/lib/queries/masterData"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Prefecture, Shop } from "@/payload-types"
import configPromise from "@payload-config"
import { NoResults } from "@/components/Search/NoResults"
import { ShopCard } from "@/components/ShopCard"
import type { Metadata } from "next"
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph"
import { getServerSideURL } from "@/utilities/getURL"

interface Props {
  params: Promise<{
    prefecture: string
    locale: TypedLocale
  }>
}

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const t = await getTranslations()
  const { prefecture, locale } = await paramsPromise
  const masterdata = await queryMasterData({ locale })
  const prefectureData = masterdata.prefectures.find((item) => item.slug === prefecture)

  if (!prefectureData) {
    return {
      title: 'Prefecture Not Found',
      robots: {
        index: false,
        follow: true,
      }
    }
  }

  // Build title and description
  const title = `${prefectureData.title} | Nightlife Japan`
  const description = t('prefecture-page.description', { prefecture: prefectureData.title })

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
      }
    ]
  }

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      locale: locale,
      url: `${getServerSideURL()}/${locale}/${prefecture}`,
      type: 'website',
    }),
    alternates: {
      canonical: `/${locale}/${prefecture}`,
      languages: {
        'en': `/en/${prefecture}`,
        'ja': `/ja/${prefecture}`,
        'ko': `/ko/${prefecture}`,
        'zh': `/zh/${prefecture}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    other: {
      'schema-org': JSON.stringify([breadcrumbSchema]),
    },
  }
}

export default async function PrefecturePage({
  params,
}: Props) {
  const { prefecture, locale } = await params
  const t = await getTranslations()

  const masterdata = await queryMasterData({ locale })
  const prefectureData = masterdata.prefectures.find((item) => item.slug === prefecture)
  const areas = masterdata.areas.filter(
    (item) => (item.prefecture as Prefecture).id === prefectureData?.id
  ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const payload = await getPayload({ config: configPromise })
  const areasWithCount = await Promise.all(areas.map(async (area) => {
    const count = await payload.find({
      collection: 'shops',
      where: {
        area: {
          equals: area.id,
        },
      },
    })

    return {
      ...area,
      count: count.totalDocs,
    }
  }))

  const topShops = await payload.find({
    collection: 'shops',
    where: {
      area: {
        in: areasWithCount.map((area) => area.id).join(','),
      },
    },
    limit: 6,
  })

  if (!prefectureData) {
    return notFound()
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-2 md:mb-3 pb-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('breadcrumbs.home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prefecture}`}>
              {prefectureData.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t('prefecture-page.title', { prefecture: prefectureData.title })}</h1>
        <p className="mt-1 text-xs text-muted-foreground md:mt-2 md:text-sm">
          {t('prefecture-page.description', { prefecture: prefectureData.title })}
        </p>
      </div>

      {/* Areas Section */}
      <section className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{t('prefecture-page.areas', { prefecture: prefectureData.title })}</h2>
          <Link
            href={`/search?prefecture=${prefecture}`}
            className="flex items-center text-xs font-medium text-primary md:text-sm"
          >
            {t('prefecture-page.all-areas')} <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {areasWithCount.slice(0, 8).map((area) => (
            <Link
              key={area.id}
              href={`/${prefecture}/${area.slug}`}
              className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-colors hover:bg-muted md:gap-2 md:p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-12 md:w-12">
                <MapPin className="h-5 w-5 text-primary md:h-6 md:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium md:text-base">{area.title}</h3>
                <p className="text-xs text-muted-foreground">{area.count} {t('prefecture-page.venues')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Shops */}
      <section className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{t('prefecture-page.popular-shops', { prefecture: prefectureData.title })}</h2>
          <Link
            href={`/search?prefecture=${prefecture}`}
            className="flex items-center text-xs font-medium text-primary md:text-sm"
          >
            {t('prefecture-page.all-shops')} <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-4">
          {topShops.docs.length > 0 ? (
            topShops.docs.map((shop) => (
              <ShopCard key={shop.id} shop={shop as Shop} />
            ))
          ) : (
            <div className="flex justify-center items-center h-full w-full col-span-full">
              <NoResults />
            </div>
          )}
        </div>
      </section>

      <section className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{t('prefecture-page.featured-articles', { prefecture: prefectureData.title })}</h2>
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
