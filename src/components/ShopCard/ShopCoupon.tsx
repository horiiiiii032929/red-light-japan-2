import { MoveRight, Tag as TagIcon } from "lucide-react"

interface ShopCouponProps {
  name: string
  description: string
  originalPrice?: number
  discountedPrice?: number
}

export function ShopCoupon({ name, description, originalPrice, discountedPrice }: ShopCouponProps) {
  if (!name) return null

  return (
    <div className="p-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-md text-xs">
      <div className="font-medium text-red-600 dark:text-red-400 flex items-center gap-1 mb-1">
        <TagIcon className="h-3 w-3" />
        {name}
      </div>
      <div className="text-muted-foreground">{description}</div>
      {originalPrice && discountedPrice && (
        <div className="mt-1 flex items-center gap-2">
          <span className="line-through text-muted-foreground">¥{originalPrice.toLocaleString()}</span>
          <MoveRight className="h-3 w-3" />
          <span className="font-bold text-red-600 dark:text-red-400">¥{discountedPrice.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
} 