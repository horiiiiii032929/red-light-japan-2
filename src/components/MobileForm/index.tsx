'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { ArrowDownNarrowWide, Funnel } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Form as FormComponent } from '@/components/Form'
import { Area, Category } from "@/payload-types"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  region: string
  areaSlugs: string
  categorySlugs: string
  areas: Area[]
  categories: Category[]
}

type SortOption = "newest" | "recommended" | "popular" | "priceLow" | "priceHigh"

export function MobileForm({ region, areaSlugs, categorySlugs, areas, categories }: Props) {
  const t = useTranslations('filter')
  const router = useRouter()
  const [sortBy, setSortBy] = useState<SortOption>("newest")

  const handleSortChange = (value: SortOption) => {
    setSortBy(value)

    let path = `/region/${region}/`;

    if (areaSlugs) {
      path += `area/${areaSlugs}`;
    }

    if (categorySlugs) {
      if (areaSlugs) {
        path += '/';
      }
      path += `category/${categorySlugs}`;
    }

    path += `?sort=${value}`;

    router.push(path);
  }

  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-4">
        <Drawer>
          <DrawerTrigger asChild >
            <Button className="block md:hidden" variant="outline">
              <div className="flex items-center gap-2">
                <Funnel />
                <span>
                  {t('filters')}
                </span>
              </div>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <FormComponent
                region={region}
                areaSlugs={areaSlugs}
                categorySlugs={categorySlugs}
                areas={areas}
                categories={categories}
              />
            </div>
          </DrawerContent>
        </Drawer>

        <Select
          onValueChange={handleSortChange}
          value={sortBy}
        >
          <SelectTrigger>
            <ArrowDownNarrowWide />
            <SelectValue placeholder={t('sort')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('sortOptions.newest')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}