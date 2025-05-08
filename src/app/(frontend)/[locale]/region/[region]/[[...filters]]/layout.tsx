import { Form } from "@/components/Form"
import { TypedLocale } from "payload"
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { MobileForm } from "@/components/MobileForm"

interface Props {
  params: Promise<{
    locale: TypedLocale
    region: string
    filters: string[]
  }>,
  children: React.ReactNode
}

export default async function Layout({
  params: paramsPromise,
  children,
}: Props) {
  const { region, filters = [], locale } = await paramsPromise

  console.log(region, filters, locale)

  const { areas, categories } = await queryMasterData({ region, locale })

  const areaSlugs = extractSlugFromFilters(filters, 'area')
  const categorySlugs = extractSlugFromFilters(filters, 'category')

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
          <Form
            region={region}
            areas={areas}
            categories={categories}
            areaSlugs={areaSlugs}
            categorySlugs={categorySlugs}
          />
        </div>
      </aside>

      <div className="py-6">
        <MobileForm
          region={region}
          areas={areas}
          categories={categories}
          areaSlugs={areaSlugs}
          categorySlugs={categorySlugs}
        />

        {children}
      </div>
    </div>
  )
}

const queryMasterData = cache(async ({ region, locale }: { region: string, locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })

  const [areas, categories] = await Promise.all([
    payload.find({
      collection: 'areas',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 30,
      where: {
        ['region.slug']: {
          equals: region,
        },
      },
    }),
    payload.find({
      collection: 'categories',
      sort: 'order',
      overrideAccess: false,
      locale,
      limit: 30,
    }),
  ])

  return {
    areas: areas.docs,
    categories: categories.docs,
  }
})

const extractSlugFromFilters = (filters: string[], key: string): string => {
  const keyIndex = filters.indexOf(key)
  if (keyIndex === -1 || keyIndex + 1 >= filters.length) {
    return ''
  }
  return filters[keyIndex + 1] || ''
}
