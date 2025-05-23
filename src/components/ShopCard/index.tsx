import { Card } from "../ui/card";
import { CardContent } from "../ui/card";
import { Shop, Cast, Tag } from "@/payload-types";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ShopCarousel } from "./ShopCarousel";
import { ShopHeader } from "./ShopHeader";
import { ShopTags } from "./ShopTags";
import { ShopInfo } from "./ShopInfo";
import { ShopCoupon } from "./ShopCoupon";
import { getTranslations } from "next-intl/server";

interface Props {
  shop: Shop
}

export async function ShopCard({ shop }: Props) {
  const t = await getTranslations()

  const casts = (shop.casts || []).filter((cast): cast is Cast => typeof cast !== 'string')
  const tags = (shop.tags || []).filter((tag): tag is Tag => typeof tag !== 'string')

  return (
    <Card className="py-0 overflow-hidden gap-2">
      <ShopCarousel casts={casts} />

      <CardContent className="p-2 md:p-4 flex-1 flex flex-col gap-3">
        <ShopHeader shop={shop} />
        <ShopTags tags={tags} />
        <ShopInfo
          nearestStation={shop.nearestStation || ''}
          openHour={shop.openHour}
          closeHour={shop.closeHour}
        />

        {shop.coupons && shop.coupons[0] && (
          <Link href={`/shops/${shop.id}`}>
            <ShopCoupon
              name={shop.coupons[0].name || ''}
              description={shop.coupons[0].description || ''}
              originalPrice={shop.coupons[0].originalPrice}
              discountedPrice={shop.coupons[0].discountedPrice}
            />
          </Link>
        )}

        <div>
          <p className="text-xs">
            {shop.message}
          </p>
        </div>
      </CardContent>

      <div className="p-3 pt-0 md:p-4 md:pt-0 mt-auto">
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 h-9 text-xs md:text-sm" asChild>
            <Link href={`/shops/${shop.id}`}>{t('shop-card.viewDetails')}</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
} 