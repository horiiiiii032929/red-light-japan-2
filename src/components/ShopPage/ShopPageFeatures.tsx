import { Check } from "lucide-react"
import type { Tag } from "@/payload-types"
import { getTranslations } from "next-intl/server"
interface ShopPageFeaturesProps {
  tags: (Tag | string)[]
}

export async function ShopPageFeatures({ tags }: ShopPageFeaturesProps) {
  const t = await getTranslations()

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold md:mb-4 md:text-xl">
        {t('shop-page.features')}
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {tags?.map((feature, index) => (
          <div key={index} className="flex items-center gap-1 md:gap-2">
            <Check className="h-3 w-3 text-primary md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">
              {typeof feature === 'string' ? feature : feature.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 