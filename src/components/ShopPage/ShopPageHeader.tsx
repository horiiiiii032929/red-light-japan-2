import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import Link from "next/link"
import type { Shop, Tag, Category } from "@/payload-types"
import { getTranslations } from "next-intl/server"

interface ShopPageHeaderProps {
  shop: Shop
}

export async function ShopPageHeader({ shop }: ShopPageHeaderProps) {
  const t = await getTranslations()

  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{shop.shopName}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {shop.categories && shop.categories[0] && (
            shop.categories.map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs md:text-sm">
                {(category as Category).title}
              </Badge>
            ))
          )}
          {shop.lowestPrice && <Badge variant="outline" className="text-xs md:text-sm">
            {shop.lowestPrice} ~
          </Badge>}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {shop.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {(tag as Tag).title}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-3 md:mt-0">
        <Button className="h-9 text-xs md:h-10 md:text-sm" asChild>
          <Link href={`tel:${shop.phoneNumber?.phoneNumber}`}>
            <Phone className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
            {t('shop-page.call')}
          </Link>
        </Button>
      </div>
    </div>
  )
} 