'use client'

import { useState } from "react"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/SearchForm"
import { Filter } from "lucide-react"
import type { Area, Category, Tag } from "@/payload-types"
import { Sheet, SheetTrigger, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectValue } from "@/components/ui/select"

interface Props {
  areas: Area[]
  categories: Category[]
  tags: Tag[],
  filterCount: number
  isSearchPage?: boolean
}

export function MobileForm({
  areas,
  categories,
  filterCount,
  tags,
  isSearchPage = true
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()

  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleReset = () => {
    setIsOpen(false);
    router.replace('/search', undefined);
  };

  const handleSortChange = (value: string) => {
    const currentQuery = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(currentQuery.entries());
    router.replace({
      pathname: pathname,
      query: { ...queryParams, sort: value }
    }, { scroll: false });
  }

  return (
    <div className="flex items-center gap-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="flex-1 flex flex-row justify-start" variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            {t('filters.title')}

            {/* {filterCount > 0 && (
              <Badge className="ml-2 rounded-full">
                {filterCount}
              </Badge>
            )} */}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full" side="right">
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <SheetHeader>
              <SheetTitle>{t('filters.title')}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1.5 px-4">
              <Form
                areas={areas}
                categories={categories}
                tags={tags}
                onSubmit={handleSubmit}
                isSearchPage={isSearchPage}
              />
            </div>
            <SheetFooter>
              <Button type="submit" form="filter-form">{t('filters.applyFilters')}</Button>
              <Button form="filter-form" variant="outline" onClick={handleReset}>{t('filters.reset')}</Button>
            </SheetFooter>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Select defaultValue="updated_at" onValueChange={handleSortChange}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Recommended" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="updated_at">
              {t('filters.sortOptions.updated_at')}
            </SelectItem>
            <SelectItem value="new_shops">
              {t('filters.sortOptions.new_shops')}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}