import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'the place to find the adult entertainment in red light districts in japan',
  images: [
    // {
    //   url: process.env.NEXT_PUBLIC_SERVER_URL
    //     ? `${process.env.NEXT_PUBLIC_SERVER_URL}/website-template-OG.webp`
    //     : '/website-template-OG.webp',
    // },
  ],
  siteName: 'NIGHT LIFE JAPAN',
  title: 'NIGHT LIFE JAPAN',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
