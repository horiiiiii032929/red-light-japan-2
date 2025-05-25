import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Discover the best adult entertainment venues in Japan\'s red light districts. Find comprehensive information about prices, business hours, access, and staff details.',
  images: [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/og-image.jpg`
        : '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'NIGHT LIFE JAPAN - Your Guide to Japan\'s Nightlife',
    },
  ],
  siteName: 'NIGHT LIFE JAPAN',
  title: 'NIGHT LIFE JAPAN - Your Guide to Japan\'s Nightlife',
  locale: 'en_US',
  alternateLocale: ['ja_JP', 'ko_KR', 'zh_CN'],
  url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.nightlifejapan.jp',
  determiner: 'the',
  emails: ['contact@nightlifejapan.jp'],
  phoneNumbers: [],
  audio: [],
  videos: [],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
