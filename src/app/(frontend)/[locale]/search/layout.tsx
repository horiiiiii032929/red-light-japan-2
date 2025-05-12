import { Form } from "@/components/Form"
import { TypedLocale } from "payload"
import { queryMasterData } from "@/lib/queries/masterData"
import { MobileForm } from "@/components/MobileForm"
import { Suspense } from "react"
import { getTranslations } from 'next-intl/server'
import { Card, CardContent } from "@/components/ui/card"
import React from "react"

type Props = {
  params: Promise<{
    locale: TypedLocale
  }>,
  // searchParams: Promise<{
  //   prefecture?: string
  //   city?: string
  //   category?: string
  //   open_now?: string
  //   price_min?: string
  //   price_max?: string
  //   tags?: string
  //   sort?: string
  // }>,
  children: React.ReactNode
}

export default async function SearchLayout({
  params,
  children,
}: Props) {
  const { locale } = await params

  const { areas, categories } = await queryMasterData({
    locale
  })
  const t = await getTranslations()

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
      <aside
        className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block"
        aria-label={t('filter.filters')}
      >
        <div className="no-scrollbar h-full overflow-auto py-6 lg:py-8">
          <Card>
            <CardContent>
              <Form
                locale={locale}
                areas={areas}
                categories={categories}
              />
            </CardContent>
          </Card>
        </div>
      </aside>

      <main className="py-6">
        {/* <header className="mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {t('region.title')}
            </h1>
          </div>
        </header> */}

        <MobileForm
          locale={locale}
          areas={areas}
          categories={categories}
        />

        <Suspense>
          {children}
        </Suspense>
      </main>
    </div>
  )
}
