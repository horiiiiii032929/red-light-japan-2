import { getTranslations } from 'next-intl/server'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

type Props = {
  children: React.ReactNode
}

export default async function SearchLayout({
  children,
}: Props) {
  const t = await getTranslations()

  return (
    <div className="container-wrapper">
      <main className="container py-3 md:py-6">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-2 md:mb-3 overflow-x-auto whitespace-nowrap pb-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('breadcrumbs.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/search">{t('breadcrumbs.search')}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {children}
      </main>
    </div>
  )
}
