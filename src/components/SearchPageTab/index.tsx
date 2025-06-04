'use client'

import { Link, useRouter } from "@/i18n/routing"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { useTranslations } from "next-intl"
import { usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface Props {
  tab: 'shops' | 'news'
}

export default function SearchPageTab() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()

  const isShops = pathname === '/search'
  const isNews = pathname === '/search/news'

  return (
    <TabsList className="w-full">
      <TabsTrigger
        value="shops"
        onClick={() => {
          router.push('/search')
        }}
      >
        <Link href="/search" className="text-xs md:text-sm text-center">
          {t('search.shops')}
        </Link>
      </TabsTrigger>
      <TabsTrigger
        value="news"
        onClick={() => {
          router.push('/search/news')
        }}
      >
        <Link href="/search/news" className="text-xs md:text-sm text-center">
          {t('search.news')}
        </Link>
      </TabsTrigger>
    </TabsList>
  )
}