import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getTranslations } from "next-intl/server"
import { queryMasterData } from "@/lib/queries/masterData"
import { Link } from "@/i18n/routing"
import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import { TypedLocale } from "payload"
import Script from 'next/script'
import { routing } from '@/i18n/routing'

interface Props {
  params: Promise<{
    locale: TypedLocale
  }>
}

const POPULAR_AREA_SLUGS = [
  'shinjuku',
  'shibuya-ebisu',
  'roppongi-akasaka',
  'umeda-kita-shinchi',
  'namba-shinsaibashi',
  'gion',
  'kawaramachi-kiyamachi-pontocho',
  'sannomiya',
] as const


export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations()
  const { locale } = await params
  const url = `${getServerSideURL()}/${locale}`

  return {
    title: t('seo.app-title', { defaultValue: 'Nightlife Japan - Adult Entertainment Guide' }),
    description: t('seo.app-description'),
    keywords: 'nightlife, japan, entertainment, adult, guide, tokyo, osaka, kyoto, kobe',
    openGraph: mergeOpenGraph({
      title: t('seo.app-title', { defaultValue: 'Nightlife Japan - Adult Entertainment Guide' }),
      description: t('seo.app-description'),
      locale: locale,
      url: url,
      type: 'website',
      images: [
        {
          url: `${getServerSideURL()}/logo.png`,
          width: 1600,
          height: 800,
          alt: 'Nightlife Japan Guide',
        },
      ],
      siteName: 'Nightlife Japan',
    }),
    twitter: {
      card: 'summary_large_image',
      title: t('seo.app-title', { defaultValue: 'Nightlife Japan - Adult Entertainment Guide' }),
      description: t('seo.app-description'),
      images: [`${getServerSideURL()}/logo.png`],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ja': '/ja',
        'ko': '/ko',
        'zh': '/zh',
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

function processPrefecturesByRegion(regions: any[], prefectures: any[]) {
  return regions.map(region => ({
    name: region.title,
    prefectures: prefectures
      .filter(prefecture => typeof prefecture.region === 'object' && prefecture.region.id === region.id)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  }))
}

function processPopularAreas(areas: any[], prefectures: any[]) {
  return areas
    .filter(area => POPULAR_AREA_SLUGS.includes(area.slug || ''))
    .map((area) => {
      const prefecture = prefectures.find(p => p.id === (typeof area.prefecture === 'object' ? area.prefecture.id : area.prefecture))
      return {
        id: area.id,
        name: area.title,
        slug: area.slug,
        prefecture: prefecture,
      }
    })
}

export default async function HomePage({ params }: Props) {
  const t = await getTranslations()
  const { locale } = await params
  const masterData = await queryMasterData({ locale })
  const url = `${getServerSideURL()}/${locale}`

  const prefecturesByRegion = processPrefecturesByRegion(masterData.regions, masterData.prefectures)
  const popularAreas = processPopularAreas(masterData.areas, masterData.prefectures)

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: t('seo.app-title', { defaultValue: 'Nightlife Japan - Adult Entertainment Guide' }),
            description: t('seo.app-description'),
            url: url,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${url}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />
      <div className="container-wrapper">
        <main className="container space-y-12 py-3 md:py-6">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
            <div className="absolute inset-0">
              <Image
                src="/hero.png"
                alt={t('home-page.hero-title')}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                quality={90}
              />
            </div>

            <div className="container relative z-20 flex flex-col items-center justify-center min-h-[600px] px-6">
              <div className="flex flex-col items-center justify-center text-center max-w-2xl">
                <div className="space-y-4">
                  <h1 className="scroll-m-20 text-4xl text-white font-extrabold tracking-tight lg:text-5xl">
                    {t('home-page.hero-title')}
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground text-white">
                    {t('home-page.hero-sub-headline')}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <Button className="text-base" asChild>
                      <Link href="/search">
                        {t('home-page.hero-button')}
                      </Link>
                    </Button>

                    <Button className="text-base" variant="outline" asChild>
                      <Link href="/contact">
                        {t('home-page.cta-button')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Areas Section */}
          <section className="container px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {t('home-page.featurered-title')}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('home-page.featured-sub-headline')}
                </p>
              </div>
              <Link href="/search" className="flex items-center text-sm font-medium text-primary md:text-base">
                {t('home-page.featured-button')} <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>

            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {popularAreas.map((area) => (
                <Link
                  key={area.id}
                  href={`/${area.prefecture?.slug}/${area.slug}`}
                  className="group relative overflow-hidden rounded-lg h-[200px] flex-shrink-0 bg-background border rounded-xl"
                >
                  <div className="absolute inset-0 justify-center z-20">
                    <div className="[writing-mode:vertical-rl] flex">
                      <h3 className="scroll-m-20 text-4xl uppercase font-extrabold tracking-tight lg:text-5xl whitespace-pre-line break-words">
                        {area.prefecture?.title || ''}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight whitespace-pre-line break-words max-w-[200px] text-right">
                      {area.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Regions Section */}
          <section className="container px-6">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-8">{t('home-page.search-area')}</h2>

            <div className="grid gap-8 md:grid-cols-2">
              {prefecturesByRegion.map((region) => (
                <Card key={region.name} className="overflow-hidden py-0">
                  <CardContent className="p-0">
                    <div className="border-b bg-muted px-6 py-3">
                      <h3 className="text-xl font-semibold">{region.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 px-6 py-3 sm:grid-cols-3">
                      {region.prefectures.map((prefecture) => (
                        <Link
                          key={prefecture.id}
                          href={`/${prefecture.slug}`}
                          className="rounded-md px-4 py-3 text-center text-sm hover:bg-muted transition-colors"
                        >
                          {prefecture.title}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="container px-6">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
              <div className="relative z-10 py-16 px-8 md:py-20 md:px-12">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                  <Sparkles className="h-12 w-12 mb-6 text-white" />
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-white">
                    {t('home-page.cta-title')}
                  </h2>
                  <p className="mt-6 text-sm md:text-base text-white">
                    {t('home-page.cta-sub-headline')}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="ghost"
                      className="text-base text-white"
                      asChild
                    >
                      <Link href="/contact">{t('home-page.cta-button')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
