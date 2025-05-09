import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ShopClient } from '@/components/Shop/Page'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/utilities/generateMeta'
import { Shop } from '@/payload-types'


export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'shops',
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
  })

  const params = posts.docs.map(({ id }) => {
    return { id }
  })

  return params
}

type Args = {
  params: Promise<{
    id?: string
    locale: TypedLocale
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { id = '', locale } = await paramsPromise

  const shop = await queryShopBySlug({ id, locale })

  if (!shop) {
    return notFound()
  }

  return (
    <div className="flex flex-col">

      {draft && <LivePreviewListener />}

      <ShopClient shop={shop} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { id = '', locale } = await paramsPromise
  const shop = await queryShopBySlug({ id, locale })

  return generateMeta({ doc: shop as Shop })
}



const queryShopBySlug = cache(async ({ id, locale }: { id: string, locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'shops',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      id: {
        equals: id,
      },
    },
  })

  return result.docs?.[0] || null
})
