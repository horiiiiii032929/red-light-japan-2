import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { Shop, Area, Prefecture, Category } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ShopPage as ShopPageComponent } from '@/components/ShopPage'
import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'

type Args = {
  params: Promise<{
    id: string
    locale: TypedLocale
  }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const t = await getTranslations()
  const { id = '', locale } = await paramsPromise
  const shop = await queryShopBySlug({ id, locale })

  if (!shop) {
    return {
      title: 'Shop Not Found',
      robots: {
        index: false,
        follow: true,
      }
    }
  }

  const shopData = shop as Shop
  const prefecture = (shopData.area as Area).prefecture as Prefecture
  const area = shopData.area as Area
  const category = (shopData.categories as Category[])[0]

  // Build title and description
  const title = `${shopData.shopName} | ${area.title}, ${prefecture.title}`
  const description = shopData.message ||
    `${shopData.shopName} - ${category?.title || ''} in ${area.title}, ${prefecture.title}. ` +
    `Find information about prices, business hours, and staff details.`

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
        'name': prefecture.title,
        'item': `${getServerSideURL()}/${locale}/search?prefecture=${prefecture.slug}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': area.title,
        'item': `${getServerSideURL()}/${locale}/search?city=${area.slug}`
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': category?.title || '',
        'item': `${getServerSideURL()}/${locale}/search?category=${category?.slug}`
      },
      {
        '@type': 'ListItem',
        'position': 5,
        'name': shopData.shopName,
        'item': `${getServerSideURL()}/${locale}/shops/${id}`
      }
    ]
  }

  // Build local business schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': shopData.shopName,
    'image': typeof shopData.logo === 'object' && shopData.logo ? `${getServerSideURL()}${shopData.logo.url}` : undefined,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': area.title,
      'addressRegion': prefecture.title,
      'addressCountry': 'JP'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'opens': shopData.openHour,
      'closes': shopData.closeHour
    },
    'priceRange': shopData.lowestPrice ? `¥${shopData.lowestPrice}` : undefined,
    'url': `${getServerSideURL()}/${locale}/shops/${id}`
  }

  // Handle logo image for OpenGraph
  const ogImage = typeof shopData.logo === 'object' && shopData.logo ? {
    url: `${getServerSideURL()}${shopData.logo.url}`,
    width: shopData.logo.width || 1200,
    height: shopData.logo.height || 630,
    alt: shopData.shopName,
  } : undefined

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      locale: locale,
      url: `${getServerSideURL()}/${locale}/shops/${id}`,
      images: ogImage ? [ogImage] : undefined,
      type: 'website',
    }),
    alternates: {
      canonical: `/${locale}/shops/${id}`,
      languages: {
        'en': `/en/shops/${id}`,
        'ja': `/ja/shops/${id}`,
        'ko': `/ko/shops/${id}`,
        'zh': `/zh/shops/${id}`,
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
      'schema-org': JSON.stringify([breadcrumbSchema, localBusinessSchema]),
    },
  }
}

export default async function ShopPage({ params: paramsPromise }: Args) {
  const t = await getTranslations()
  const { id = '', locale } = await paramsPromise

  const shop = await queryShopBySlug({ id, locale })

  const shopData = shop as Shop

  if (!shop) {
    return notFound()
  }

  return (
    <div className="flex flex-col">
      <Breadcrumb className="mb-2 md:mb-3 pb-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('breadcrumbs.home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search">{((shopData.area as Area).prefecture as Prefecture).title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search">{(shopData.area as Area).title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search">{(shopData.categories as Category[])[0]?.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search">{shopData.shopName}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ShopPageComponent shop={shop} />
    </div>
  )
}

const queryShopBySlug = cache(async ({ id, locale }: { id: string, locale: TypedLocale }) => {
  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.findByID({
      collection: 'shops',
      draft,
      locale,
      overrideAccess: draft,
      id,
    })

    return result || null
  } catch (error) {
    console.error(`Error fetching shop with id ${id}:`, error)
    return null
  }
})
