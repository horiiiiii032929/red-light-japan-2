'use client'

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Train } from "lucide-react"
import dynamic from "next/dynamic"
import type { Shop } from "@/payload-types"
import { useTranslations } from "next-intl"

const ShopMap = dynamic(() => import("@/components/ShopPage/ShopMap"), {
  ssr: false,
})

interface ShopPageMapProps {
  shop: Shop
}

export function ShopPageMap({ shop }: ShopPageMapProps) {
  const t = useTranslations()

  return (
    <Card>
      <CardContent className="p-3 md:p-4">
        <h3 className="mb-2 text-sm font-medium md:text-base md:mb-3">
          {t('shop-page.access')}
        </h3>
        <div className="mb-2 aspect-[4/3] overflow-hidden rounded-md bg-muted md:mb-3">
          <ShopMap
            location={null}
            name={shop.shopName}
          />
        </div>
        <div className="space-y-1 text-xs md:text-sm md:space-y-2">
          <div className="flex items-start gap-1 md:gap-2">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground md:h-4 md:w-4" />
            <span>{shop.address}</span>
          </div>
          <div className="flex items-start gap-1 md:gap-2">
            <Train className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground md:h-4 md:w-4" />
            <span>{shop.nearestStation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 