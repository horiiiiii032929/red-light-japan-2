import Image from "next/image"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getTranslations } from "next-intl/server"
import { queryMasterData } from "@/lib/queries/masterData"
import { Config } from "@/payload-types"
import { AreaMarquee } from "@/components/HomePage/AreaMarquee"
import { Link } from "@/i18n/routing"
import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'


export async function generateMetadata({ params }: { params: { locale: Config['locale'] } }): Promise<Metadata> {
  const t = await getTranslations()
  const { locale } = params

  return {
    title: t('seo.app-title', { defaultValue: 'Nightlife Japan - Adult Entertainment Guide' }),
    description: t('seo.app-description'),
    openGraph: mergeOpenGraph({
      title: t('seo.app-title', { defaultValue: 'Nightlife Japan - Adult Entertainment Guide' }),
      description: t('seo.app-description'),
      locale: locale,
      url: `${getServerSideURL()}/${locale}`,
      images: [
        {
          url: `${getServerSideURL()}/hero.png`,
          width: 1600,
          height: 800,
          alt: 'Nightlife Japan - Your Guide to Japan\'s Nightlife',
        },
      ],
    }),
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
    },
  }
}

export default async function HomePage({ params }: { params: { locale: Config['locale'] } }) {
  const t = await getTranslations()
  const { locale } = await params
  const masterData = await queryMasterData({ locale })

  // Group prefectures by region
  const prefecturesByRegion = masterData.regions.map(region => ({
    name: region.title,
    prefectures: masterData.prefectures
      .filter(prefecture => typeof prefecture.region === 'object' && prefecture.region.id === region.id)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  }))

  return (
    <div className="container-wrapper">
      <main className="container space-y-12 py-3 md:py-6">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <div className="absolute inset-0">
            <Image src="/hero.png?height=800&width=1600" alt="Nightlife" fill className="object-cover" priority />
          </div>

          <div className="container relative z-20 flex flex-col px-6 py-16 md:py-24 lg:py-32">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col w-full justify-center items-center max-w-2xl">
              <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  {t('home-page.hero-title')}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {t('home-page.hero-sub-headline')}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button className="h-12 text-base" asChild>
                    <Link href="/search">
                      {t('home-page.hero-button')}
                    </Link>
                  </Button>

                  <Button className="h-12 text-base" variant="outline" asChild>
                    <Link href="/contact">
                      {t('home-page.cta-button')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Areas Section */}
        <AreaMarquee
          prefectures={masterData.prefectures}
          areas={masterData.areas}
        />

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
                        href={`/search?prefecture=${prefecture.slug}`}
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
            <div className="relative z-10 py-16 px-8 md:py-20 md:px-12 text-white">
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                <Sparkles className="h-12 w-12 mb-6" />
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {t('home-page.cta-title')}
                </h2>
                <p className="mt-6 text-sm md:text-base">
                  {t('home-page.cta-sub-headline')}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 text-base border-white text-white hover:bg-white/20 hover:text-white"
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
  )
}
