import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Define the fields we want to select for shops
const SHOP_SELECT_FIELDS = {
  id: true,
  updatedAt: true,
}

// Define supported locales
const SUPPORTED_LOCALES = ['en', 'ja', 'ko', 'zh'] as const
type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // Define your static routes
  const staticRoutes = [
    '',
    '/shops',
    '/search',
    '/contact',
  ]

  // Generate sitemap entries for static routes
  const staticEntries = SUPPORTED_LOCALES.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  // Get all shops for each locale
  const payload = await getPayload({ config: configPromise })
  const shopEntries = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const shops = await payload.find({
        collection: 'shops',
        overrideAccess: false,
        locale,
        depth: 0,
        limit: 1000, // Adjust this number based on your needs
        select: SHOP_SELECT_FIELDS,
      })

      return shops.docs.map((shop) => ({
        url: `${baseUrl}/${locale}/shops/${shop.id}`,
        lastModified: new Date(shop.updatedAt),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }))
    })
  )

  // Combine all entries
  const allEntries = [
    ...staticEntries,
    ...shopEntries.flat(),
  ]

  return allEntries
} 