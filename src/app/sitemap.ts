import { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { Shop } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// TODO: Replace with actual query function
async function queryShops(): Promise<Shop[]> {
  const payload = await getPayload({ config: configPromise })
  const shops = await payload.find({
    collection: 'shops',
    overrideAccess: false,
    locale: 'en',
    limit: -1,
    select: {
      id: true,
      updatedAt: true,
    }
  })
  return shops.docs
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL()
  const locales = ['en', 'ja', 'ko', 'zh']

  // Get all shops
  const shops = await queryShops()

  // Generate shop URLs with all locales
  const shopUrls = shops.flatMap((shop: Shop) =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/shops/${shop.id}`,
      lastModified: new Date(shop.updatedAt),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }))
  )

  // Add static pages for all locales
  const staticPages = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/${locale}/shops`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/${locale}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }
  ])

  // Combine all URLs
  const allUrls = [
    ...staticPages,
    ...shopUrls
  ]

  // Filter out any invalid URLs
  const validUrls = allUrls.filter(entry => {
    try {
      new URL(entry.url)
      return true
    } catch {
      return false
    }
  })

  return validUrls
} 