import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { MapPin, Star, ArrowRight, Filter, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPayload, TypedLocale } from "payload"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Shop } from "@/payload-types"
import { queryMasterData } from "@/lib/queries/masterData"
import configPromise from "@payload-config"
import { ShopCard } from "@/components/ShopCard"
import { NoResults } from "@/components/Search/NoResults"
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph"
import { getServerSideURL } from "@/utilities/getURL"

interface Props {
  params: Promise<{
    prefecture: string
    area: string
    locale: TypedLocale
  }>
}

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const t = await getTranslations()
  const { prefecture, area, locale } = await paramsPromise
  const masterdata = await queryMasterData({ locale })
  const prefectureData = masterdata.prefectures.find((item) => item.slug === prefecture)
  const areaData = masterdata.areas.find((item) => item.slug === area)

  if (!areaData || !prefectureData) {
    return {
      title: 'Area Not Found',
      robots: {
        index: false,
        follow: true,
      }
    }
  }

  // Build title and description
  const title = `${areaData.title}, ${prefectureData.title} | Nightlife Japan`
  const description = t('area-page.description', { area: areaData.title })

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
      url: `${getServerSideURL()}/${locale}/${prefecture}/${area}`,
      type: 'website',
    }),
    alternates: {
      canonical: `/${locale}/${prefecture}/${area}`,
      languages: {
        'en': `/en/${prefecture}/${area}`,
        'ja': `/ja/${prefecture}/${area}`,
        'ko': `/ko/${prefecture}/${area}`,
        'zh': `/zh/${prefecture}/${area}`,
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

export default async function AreaPage({
  params,
}: Props) {
  const { prefecture, area, locale } = await params
  const t = await getTranslations()

  const masterdata = await queryMasterData({ locale })
  const prefectureData = masterdata.prefectures.find((item) => item.slug === prefecture)
  const areas = masterdata.areas.find((item) => item.slug === area)

  const payload = await getPayload({ config: configPromise })
  const shopByCategories = await Promise.all(masterdata.categories.map(async (category) => {
    const shops = await payload.find({
      collection: 'shops',
      where: {
        categories: {
          in: category.id,
        },
        area: {
          equals: areas?.id,
        },
      },
      limit: 6,
    })

    return {
      ...category,
      shops: {
        docs: shops.docs,
        totalDocs: shops.totalDocs
      }
    }
  }))

  const topShops = await payload.find({
    collection: 'shops',
    where: {
      area: {
        equals: areas?.id,
      },
    },
    limit: 6,
  })

  if (!areas) {
    return notFound()
  }

  return (
    <div >
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-2 md:mb-3 overflow-x-auto whitespace-nowrap pb-1">
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
            <BreadcrumbLink href={`/${prefecture}/${area}`}>
              {areas.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t('area-page.title', { area: areas.title })}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground md:mt-2 md:text-sm">
          {t('area-page.description', { area: areas.title })}
        </p>
      </div>

      {/* Area Map */}
      <div className="mb-6 overflow-hidden rounded-lg border md:mb-8">
        <div className="aspect-video md:aspect-[21/9] bg-muted">
          <div className="flex h-full items-center justify-center">
            <Image
              src="/hero.png"
              alt={`${areas.title} recommended map`}
              width={700}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="bg-muted/50 p-3 md:p-4">
          <h2 className="text-base font-semibold md:text-lg">{t('area-page.area-information', { area: areas.title })}</h2>
          {/* TODO: add area information */}
          <p className="mt-1 text-xs text-muted-foreground md:mt-2 md:text-sm">
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{t('area-page.categories', { area: areas.title })}</h2>
          <Link
            href={`/search?area=${area}`}
            className="flex items-center text-xs font-medium text-primary md:text-sm"
          >
            {t('area-page.all-categories')} <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {shopByCategories.map((category) => (
            <Link
              key={category.id}
              href={`/search?area=${area}&category=${category.slug}`}
              className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-colors hover:bg-muted md:gap-2 md:p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-12 md:w-12">
                <MapPin className="h-5 w-5 text-primary md:h-6 md:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium md:text-base">{category.title}</h3>
                <p className="text-xs text-muted-foreground">{category.shops.totalDocs} {t('area-page.venues')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Tabs */}
      <div className="mb-8 md:mb-10">
        <Tabs defaultValue="all">
          <TabsList className="mb-4 w-full justify-start overflow-auto md:mb-6">
            <TabsTrigger value="all" className="min-w-max text-xs md:text-sm">
              {t('area-page.all')}
            </TabsTrigger>
            {shopByCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="min-w-max text-xs md:text-sm">
                {category.title} ({category.shops.totalDocs})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-4">
              {topShops.docs.length > 0 ? (
                topShops.docs.map((shop) => (
                  <ShopCard key={shop.id} shop={shop as Shop} />
                ))
              ) : (
                <div className="flex justify-center items-center h-full w-full col-span-full">
                  <NoResults isSearch={false} />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center md:mt-8">
              <Button className="h-10 text-sm w-full sm:w-auto" asChild>
                <Link href={`/search?area=${area}`}>{t('area-page.all-shops', { count: topShops.totalDocs })}</Link>
              </Button>
            </div>
          </TabsContent>

          {shopByCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-4">
                {category.shops.docs.length > 0 ? (
                  category.shops.docs.map((shop) => (
                    <ShopCard key={shop.id} shop={shop as Shop} />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full w-full col-span-full">
                    <NoResults isSearch={false} />
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-center md:mt-8">
                <Button className="h-10 text-sm w-full sm:w-auto" asChild>
                  <Link href={`/search?area=${area}&category=${category.slug}`}>
                    {t('area-page.view-category', { category: category.title })}
                  </Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Featured Articles */}
      <section className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{t('prefecture-page.featured-articles', { prefecture: prefectureData?.title || '' })}</h2>
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
