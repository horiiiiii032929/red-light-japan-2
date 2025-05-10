'use client'

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useTranslations } from "next-intl"
import { Filter, ArrowDownNarrowWide } from "lucide-react"
import { Form } from "../Form"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
  areas: any[]
  categories: any[]
}

const SORT_OPTIONS = {
  recommended: 'recommended',
  newest: 'newest',
  popular: 'popular',
  priceLow: 'priceLow',
  priceHigh: 'priceHigh'
} as const

type SortOption = keyof typeof SORT_OPTIONS

export function MobileForm({
  region,
  areas,
  categories,
  areaSlugs,
  categorySlugs,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('filter')
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)
      const { areas: selectedAreas, categories: selectedCategories } = data;

      let path = `/region/${region}/`;

      if (selectedAreas.length > 0) {
        path += `area/${selectedAreas.join('+')}`;
      }

      if (selectedCategories.length > 0) {
        if (selectedAreas.length > 0) {
          path += '/';
        }
        path += `category/${selectedCategories.join('+')}`;
      }

      await router.push(path);
      setIsOpen(false)
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex gap-4 justify-end">
      <div className="flex items-center gap-2">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 md:hidden"
              aria-label={t('filterOptions')}
            >
              <Filter className="w-4 h-4 mr-2" />
              {t('filterOptions')}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t('filterOptions')}</DrawerTitle>
              <DrawerDescription>
                {t('filterDescription')}
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <Form
                region={region}
                areas={areas}
                categories={categories}
                areaSlugs={areaSlugs}
                categorySlugs={categorySlugs}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  aria-label={t('close')}
                >
                  {t('close')}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Select
          defaultValue={searchParams.get('sort') || 'recommended'}
          onValueChange={handleSort}
        >
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <ArrowDownNarrowWide className="w-4 h-4" />
              <SelectValue placeholder={t('sort')} />
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SORT_OPTIONS).map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {t(`sortOptions.${key}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}