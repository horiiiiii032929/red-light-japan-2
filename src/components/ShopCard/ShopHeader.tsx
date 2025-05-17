import Image from "next/image"
import { Badge } from "../ui/badge"
import { Area, Category, Shop } from "@/payload-types"

interface ShopHeaderProps {
  shop: Shop
}

export function ShopHeader({ shop }: ShopHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-start">
      <div className="flex items-center flex-1 gap-2">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted/10">
          {typeof shop.logo === 'object' && shop.logo?.url ? (
            <Image
              src={shop.logo.url}
              fill
              className="object-cover"
              sizes="48px"
              alt={`${shop.shopName} logo`}
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center text-muted-foreground text-2xl font-bold bg-muted-foreground/10">
              {shop.shopName.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold md:text-base line-clamp-1">{shop.shopName}</h3>
          <div className="text-xs text-muted-foreground mb-1">
            {shop.area && (shop.area as Area).title} / ¥{shop.lowestPrice.toLocaleString()} ~
          </div>
        </div>
      </div>

      <div>
        {shop.categories && shop.categories[0] && (
          shop.categories.map((category, index) => (
            <Badge variant="outline" className="text-xs shrink-0 ml-1" key={index}>
              {(category as Category).title}
            </Badge>
          ))
        )}
      </div>
    </div>
  )
} 