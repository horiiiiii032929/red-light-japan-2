import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ShopClient } from '@/components/Shop/Page'
import { notFound } from 'next/navigation'
// export async function generateStaticParams() {
// 	const payload = await getPayload({ config: configPromise })
// 	const posts = await payload.find({
// 		collection: 'posts',
// 		draft: false,
// 		limit: 1000,
// 		overrideAccess: false,
// 		pagination: false,
// 		select: {
// 			slug: true,
// 		},
// 	})

// 	const params = posts.docs.map(({ slug }) => {
// 		return { slug }
// 	})

// 	return params
// }

type Args = {
  params: Promise<{
    id?: string
    locale: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { id = '' } = await paramsPromise

  const shop = await queryShopBySlug({ id: '6819bee84225b871faf204a1' })

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

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
// 	const { slug = '' } = await paramsPromise
// 	const post = await queryPostBySlug({ slug })

// 	return generateMeta({ doc: post })
// }

const queryShopBySlug = cache(async ({ id }: { id: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'shops',
    draft,
    limit: 1,
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
