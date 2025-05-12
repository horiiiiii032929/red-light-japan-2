'use client'

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/Form"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Filter } from "lucide-react"
import type { Area, Category } from "@/payload-types"
import { TypedLocale } from "payload"

interface Props {
  areas: Area[]
  categories: Category[]
  locale: TypedLocale
}

export function MobileForm({
  areas,
  categories,
  locale
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('filter')

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full mb-4 md:hidden md:mb-0">
          <Filter className="mr-2 h-4 w-4" />
          {t('filters')}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="px-4 pb-4">
          <Form
            areas={areas}
            categories={categories}
            locale={locale}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}