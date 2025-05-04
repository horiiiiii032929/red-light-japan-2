import { Phone, MapPin, Train, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import type { Shop, Cast, Category } from "@/payload-types"
import { ShopPageSystems } from "./ShopPageSystems"
import { ShopPageStaff } from "./ShopPageStaff"
import { ShopPageCoupons } from "./ShopPageCoupons"
import RichText from "@/components/RichText"
import { ShopPageHeader } from "./ShopPageHeader"
import { ShopPageCarousel } from "./ShopPageCarousel"
import { ShopPageFeatures } from "./ShopPageFeatures"
import { ShopPageBasicInfo } from "./ShopPageBasicInfo"
import { ShopPageContact } from "./ShopPageContact"
import { ShopPageMap } from "./ShopPageMap"
import { getTranslations } from "next-intl/server"

interface ShopPageProps {
  shop: Shop
}

export async function ShopPage({ shop }: ShopPageProps) {
  const t = await getTranslations()
  const casts = (shop.casts || []).filter((cast): cast is Cast => typeof cast !== 'string')

  return (
    <div>
      <ShopPageHeader shop={shop} />
      <ShopPageCarousel shop={shop} />

      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="mb-4 grid w-full grid-cols-4">
              <TabsTrigger value="info" className="text-xs md:text-sm">
                {t('shop-page.information')}
              </TabsTrigger>
              <TabsTrigger value="cast" className="text-xs md:text-sm">
                {t('shop-page.cast')}
              </TabsTrigger>
              <TabsTrigger value="menu" className="text-xs md:text-sm">
                {t('shop-page.system-menu')}
              </TabsTrigger>
              <TabsTrigger value="coupon" className="text-xs md:text-sm">
                {t('shop-page.coupon')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 md:space-y-6">
              <div>
                <h2 className="mb-2 text-lg font-semibold md:mb-4 md:text-xl">
                  {t('shop-page.about-us')}
                </h2>
                <RichText data={shop.description} />
              </div>

              <ShopPageFeatures tags={shop.tags || []} />
              <ShopPageBasicInfo
                address={shop.address}
                openHour={shop.openHour}
                closeHour={shop.closeHour}
                phoneNumber={shop.phoneNumber}
                lowestPrice={shop.lowestPrice}
                categoryTitle={shop.categories?.map((category) => (category as Category).title) || []}
                paymentMethods={shop.paymentMethods || []}
              />
            </TabsContent>

            <TabsContent value="cast" className="space-y-4 md:space-y-6">
              <h2 className="mb-2 text-lg font-semibold md:mb-4 md:text-xl">
                {t('shop-page.cast')}
              </h2>
              <ShopPageStaff staff={casts} />
            </TabsContent>

            <TabsContent value="menu" className="space-y-4 md:space-y-6">
              <h2 className="mb-2 text-lg font-semibold md:mb-4 md:text-xl">
                {t('shop-page.system-menu')}
              </h2>
              <ShopPageSystems systems={shop.systems} />

              {shop.systemDescription && <RichText data={shop.systemDescription} />}

              <div className="rounded-lg border bg-muted/50 p-3 md:p-4">
                <h3 className="mb-1 text-sm font-semibold md:mb-2 md:text-base">
                  {t('shop-page.system-terms')}
                </h3>
                <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground md:text-sm">
                  {shop.systemTerms?.split('\n').map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="coupon" className="space-y-4 md:space-y-6">
              <h2 className="text-lg font-semibold md:text-xl">{t('shop-page.coupon')}</h2>
              <ShopPageCoupons coupons={shop.coupons} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - CTA and Map */}
        <div className="space-y-4 md:space-y-6">
          <ShopPageContact shop={shop} />
          <ShopPageMap shop={shop} />
        </div>
      </div>
    </div>
  )
} 