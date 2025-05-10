import { Form } from "@/components/Form"
import { TypedLocale } from "payload"
import { queryMasterData } from "@/lib/queries/masterData"
import { MobileForm } from "@/components/MobileForm"
import { Suspense } from "react"
import { getTranslations } from 'next-intl/server'

interface Props {
  params: Promise<{
    locale: TypedLocale
    region: string
    filters: string[]
  }>,
  children: React.ReactNode
}

export default async function Layout({
  params,
  children,
}: Props) {
  const { region, filters = [], locale } = await params
  const { areas, categories, regions } = await queryMasterData({ region, locale })
  const t = await getTranslations('region')

  const areaSlugs = extractSlugFromFilters(filters, 'area')
  const categorySlugs = extractSlugFromFilters(filters, 'category')

  const regionName = regions?.find(r => r.slug === region)?.title || region.charAt(0).toUpperCase() + region.slice(1)

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside
        className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block"
        aria-label={t('filterOptions')}
      >
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

      <main className="py-6">
        <header className="mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {t('title', { region: regionName })}
            </h1>
            <p className="text-muted-foreground">
              {t('description', { region: regionName })}
            </p>
          </div>
        </header>


        <MobileForm
          region={region}
          areas={areas}
          categories={categories}
          areaSlugs={areaSlugs}
          categorySlugs={categorySlugs}
        />

        <Suspense fallback={
          <div className="space-y-4" aria-label={t('loading.content')}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-32 bg-gray-200 rounded" />
            ))}
          </div>
        }>
          {children}
        </Suspense>
      </main>
    </div>
  )
}

const extractSlugFromFilters = (filters: string[], key: string): string => {
  const keyIndex = filters.indexOf(key)
  if (keyIndex === -1 || keyIndex + 1 >= filters.length) {
    return ''
  }
  return filters[keyIndex + 1] || ''
}
