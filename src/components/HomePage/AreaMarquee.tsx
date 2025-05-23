'use client'

import { Link } from "@/i18n/routing"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Marquee } from "@/components/magicui/marquee"
import { Area, Prefecture } from "@/payload-types"
import { useTranslations } from "next-intl"

interface AreaMarqueeProps {
  prefectures: Prefecture[]
  areas: Area[]
}

export function AreaMarquee({ prefectures, areas }: AreaMarqueeProps) {
  const t = useTranslations()

  const popularAreas = areas
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((area) => {
      const prefecture = prefectures.find(p => p.id === (typeof area.prefecture === 'object' ? area.prefecture.id : area.prefecture))
      return {
        id: area.id,
        name: area.title,
        slug: area.slug,
        prefecture: prefecture,
        image: `/areas/${prefecture?.slug}/${area.slug}.jpg`,
        count: Math.floor(Math.random() * 50) + 10 // Placeholder count, replace with actual data
      }
    })

  // Split areas into three rows and duplicate them for smooth animation
  const row1 = [...popularAreas.slice(0, Math.ceil(popularAreas.length / 3)), ...popularAreas.slice(0, Math.ceil(popularAreas.length / 3))]
  const row2 = [...popularAreas.slice(Math.ceil(popularAreas.length / 3), Math.ceil(popularAreas.length * 2 / 3)), ...popularAreas.slice(Math.ceil(popularAreas.length / 3), Math.ceil(popularAreas.length * 2 / 3))]
  const row3 = [...popularAreas.slice(Math.ceil(popularAreas.length * 2 / 3)), ...popularAreas.slice(Math.ceil(popularAreas.length * 2 / 3))]

  const AreaCard = ({ area, index }: { area: typeof popularAreas[0], index: number }) => (
    <Link
      key={index}
      href={`/search?prefecture=${area.prefecture?.slug}&area=${area.slug}`}
      className="group relative overflow-hidden rounded-lg w-[300px] h-[200px] flex-shrink-0 mx-3 bg-background border rounded-xl"
    >
      <div className="absolute inset-0 justify-center z-20">
        <div className="[writing-mode:vertical-rl] h-[160px] flex">
          <h3 className="scroll-m-20 text-4xl uppercase font-extrabold tracking-tight lg:text-5xl whitespace-pre-line break-words max-h-[160px]">
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
  )

  return (
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
        <Link href="/areas" className="flex items-center text-sm font-medium text-primary md:text-base">
          {t('home-page.featured-button')} <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Link>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-4">
        <Marquee pauseOnHover className="[--duration:360s]">
          {row1.map((area, index) => (
            <AreaCard key={index} area={area} index={index} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:320s]">
          {row2.map((area, index) => (
            <AreaCard key={index} area={area} index={index} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:340s]">
          {row3.map((area, index) => (
            <AreaCard key={index} area={area} index={index} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  )
} 