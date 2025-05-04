import { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { Shop, Region } from '@/payload-types'
import { queryMasterData } from '@/lib/queries/masterData'

// TODO: Replace with actual query function
async function queryShops(): Promise<Shop[]> {
  // Implement actual query logic
  return []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL()
  const locales = ['en', 'ja', 'ko', 'zh']

  // Get all shops
  const shops = await queryShops()

  // Get all regions
  const { regions } = await queryMasterData({ locale: 'en' })

  // Generate shop URLs
  const shopUrls = shops.flatMap((shop: Shop) =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/shops/${shop.id}`,
      lastModified: new Date(shop.updatedAt),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }))
  )

  // Generate region URLs
  const regionUrls = regions.flatMap((region: Region) =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/region/${region.slug || ''}`,
      lastModified: new Date(region.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))
  )

  // Add static pages
  const staticPages = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }
  ])

  return [...staticPages, ...shopUrls, ...regionUrls]
} 