import { Link } from '@/i18n/routing'
import React from 'react'

import { TypedLocale } from 'payload'
import { Logo } from '@/components/Logo/Logo'
import { queryMasterData } from '@/lib/queries/masterData'
import { getTranslations } from 'next-intl/server'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const t = await getTranslations()
  const masterData = await queryMasterData({ locale })
  const prefecturesSlug = [
    'hokkaido',
    'tokyo',
    'kanagawa',
    'osaka',
    'kyoto',
    'aicchi',
    'fukuoka',
    'okinawa',
  ]
  const prefectures = masterData.prefectures.filter(prefecture => prefecturesSlug.includes(prefecture.slug || ''))


  const areaSlug = [
    'susukino',
    'shinjuku',
    'shibuya-ebisu',
    'roppongi-akasaka',
    'umeda-kita-shinchi',
    'namba-shinsaibashi',
    'gion',
    'kawaramachi-kiyamachi-pontocho',
    'nakasu',
    'naha',
  ]

  const areas = masterData.areas.filter(
    area => areaSlug.includes(area.slug || '')
  ).map(area => {
    const prefecture = masterData.prefectures.find(prefecture => prefecture.id === area.prefecture)
    return {
      ...area,
      prefecture: prefecture
    }
  })


  const information = {
    en: [
      // { title: 'About', href: '/about' },
      { title: 'Terms of Service & Privacy Policy', href: '/terms' },
      { title: 'Contact', href: '/contact' }
    ],
    ja: [
      // { title: 'サイトについて', href: '/about' },
      { title: '利用規約 & プライバシーポリシー', href: '/terms' },
      { title: 'お問い合わせ', href: '/contact' }
    ],
    ko: [
      // { title: '사이트 정보', href: '/about' },
      { title: '이용 약관 & 개인 정보 보호 정책', href: '/terms' },
      { title: '문의', href: '/contact' }
    ],
    zh: [
      // { title: '网站信息', href: '/about' },
      { title: '使用条款 & 隐私政策', href: '/terms' },
      { title: '联系', href: '/contact' }
    ]
  }

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container-wrapper py-2">
        <div className="container py-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center mb-4">
                <Logo className="h-12 w-12" />
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold md:text-lg">{t('footer.prefectures')}</h3>
              {prefectures.map(prefecture => (
                <Link key={prefecture.id} href={`/${prefecture.slug}`} className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
                  {prefecture.title}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold md:text-lg">{t('footer.areas')}</h3>
              {areas.map(area => (
                <Link key={area.id} href={`/${area.prefecture?.slug}/${area.slug}`} className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
                  {area.title}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold md:text-lg">{t('footer.categories')}</h3>
              {masterData.categories.map(category => (
                <Link key={category.id} href={`/search?category=${category.slug}`} className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
                  {category.title}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold md:text-lg">{t('footer.content')}</h3>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold md:text-lg">{t('footer.site-information')}</h3>
              {information[locale].map(item => (
                <Link key={item.title} href={item.href} className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <span className="block text-sm text-center mt-8">
          © {new Date().getFullYear()} <Link href="/" className="hover:underline">NIGHT LIFE JAPAN</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
