import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { notFound } from 'next/navigation'
import { Shop, Area, Prefecture, Category } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ShopPage as ShopPageComponent } from '@/components/ShopPage'

type Args = {
  params: Promise<{
    id: string
    locale: TypedLocale
  }>
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
