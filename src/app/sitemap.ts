import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { queryMasterData } from '@/lib/queries/masterData'

// Define the fields we want to select for shops
const SHOP_SELECT_FIELDS = {
  id: true,
  updatedAt: true,
  slug: true,
  shopName: true,
} as const

// Define supported locales
const SUPPORTED_LOCALES = ['en', 'ja', 'ko', 'zh'] as const

// Define static routes with their priorities
const STATIC_ROUTES = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: '/search', priority: 0.9, changefreq: 'daily' },
  { path: '/contact', priority: 0.8, changefreq: 'weekly' },
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // Generate sitemap entries for static routes
  const staticEntries = SUPPORTED_LOCALES.flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changefreq,
      priority: route.priority,
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
        limit: 1000,
        select: SHOP_SELECT_FIELDS,
      })

      return shops.docs.map((shop) => ({
        url: `${baseUrl}/${locale}/shops/${shop.id}`,
        lastModified: new Date(shop.updatedAt),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }))
    })
  )

  // Get prefecture and area entries for each locale
  const locationEntries = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const masterdata = await queryMasterData({ locale })
      const entries: MetadataRoute.Sitemap = []

      // Add prefecture entries
      masterdata.prefectures.forEach((prefecture) => {
        entries.push({
          url: `${baseUrl}/${locale}/${prefecture.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        })

        // Add area entries for each prefecture
        masterdata.areas
          .filter((area) => (area.prefecture as any).id === prefecture.id)
          .forEach((area) => {
            entries.push({
              url: `${baseUrl}/${locale}/${prefecture.slug}/${area.slug}`,
              lastModified: new Date(),
              changeFrequency: 'weekly' as const,
              priority: 0.8,
            })

            // Add category entries for each area
            masterdata.categories.forEach((category) => {
              entries.push({
                url: `${baseUrl}/${locale}/${prefecture.slug}/${area.slug}/${category.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
              })
            })
          })
      })

      return entries
    })
  )

  // Combine all entries and sort by priority
  const allEntries = [
    ...staticEntries,
    ...shopEntries.flat(),
    ...locationEntries.flat(),
  ].sort((a, b) => (b.priority || 0) - (a.priority || 0))

  return allEntries
} 