import { MapPin, Clock, Phone, CreditCard, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import ShopGallery from "@/components/Shop/components/shop-gallery"
import ShopSystems from "@/components/Shop/components/shop-systems"
import ShopStaff from "@/components/Shop/components/shop-staff"
import ShopCoupons from "@/components/Shop/components/shop-coupons"
import ShopContact from "@/components/Shop/components/shop-contact"
import ShopMap from "@/components/Shop/components/shop-map"
import { ExternalLink } from "lucide-react"
import type { Shop, Category, Area, PaymentMethod, Media } from "@/payload-types"
import RichText from "@/components/RichText"
import { getTranslations } from "next-intl/server"
import { formatTime } from "@/lib/format"
import { Media as MediaComponent } from "@/components/Media"
import { Suspense } from "react"

interface ShopClientProps {
  shop: Shop
}

export async function ShopClient({ shop }: ShopClientProps) {
  const t = await getTranslations('shops')
  const tagList = (shop.tags as string)?.split(",").filter(Boolean) || []
  const googleMapsUrl = shop.location ? `https://www.google.com/maps/search/?api=1&query=${shop.location[0]},${shop.location[1]}` : "#"

  return (
    <main>
      <section className="relative" aria-label="Shop gallery">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-[300px] w-full" />}>
          <ShopGallery
            images={shop.images as Media[]}
            shopName={shop.shopName}
          />
        </Suspense>
      </section>

      <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" role="banner">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-22 w-22 md:h-24 md:w-24">
                {shop.logo && <MediaComponent
                  // @ts-expect-error
                  resource={shop.logo?.sizes?.logo}
                  className="-z-10 object-cover"
                  loading="eager"
                  priority
                  alt={`${shop.shopName} logo`}
                />}
              </div>
              <div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{shop.shopName}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <div className="flex flex-wrap gap-1">
                    {shop.categories && (shop.categories as Category[]).map((category: Category, index) => (
                      <Badge key={category.id} variant="secondary">
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                  {shop.area && (
                    <>
                      <span>•</span>
                      <Badge variant="outline">{(shop.area as Area).title}</Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="py-4 sm:py-8">
        <div className="container flex-1 items-start grid grid-cols-1 gap-4 md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <aside className="md:sticky top-14 z-30 w-full shrink-0" role="complementary">
            <div className="no-scrollbar h-full overflow-auto">
              <Card className="gap-2">
                <CardContent className="py-0 mt-0">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2 pb-2">{t("shop.contactInformation")}</h4>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium leading-none">{t("shop.phone")}</p>
                        <p className="text-sm font-medium leading-none text-muted-foreground">{shop.phoneNumber?.phoneNumber}</p>
                        {shop.phoneNumber?.phoneNumber2 && (
                          <p className="text-sm font-medium leading-none">{shop.phoneNumber.phoneNumber2}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium leading-none">{t("shop.address")}</p>
                        <p className="text-sm font-medium leading-none text-muted-foreground">{shop.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium leading-none">{t("shop.businessHours")}</p>
                        <p className="text-sm font-medium leading-none text-muted-foreground">
                          {formatTime(shop.openHour)} - {formatTime(shop.closeHour)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="mt-4 mb-3" />

                  <div className="space-y-4">
                    <h4 className="mb-1 pb-1">{t("shop.connectWithUs")}</h4>
                    <Tabs defaultValue="line">
                      <TabsList className="w-full mb-2">
                        <TabsTrigger value="line">{t("shop.line")}</TabsTrigger>
                        <TabsTrigger value="wechat">{t("shop.wechat")}</TabsTrigger>
                        <TabsTrigger value="whatsapp">{t("shop.whatsapp")}</TabsTrigger>
                      </TabsList>
                      <TabsContent value="line">
                        <ShopContact
                          platform={shop.line?.platform}
                          qrCode={shop.line?.qrCode as Media}
                        />
                      </TabsContent>
                      <TabsContent value="wechat">
                        <ShopContact
                          platform={shop.weChat?.platform}
                          qrCode={shop.weChat?.qrCode as Media}
                        />
                      </TabsContent>
                      <TabsContent value="whatsapp">
                        <ShopContact
                          platform={shop.whatsapp?.platform}
                          qrCode={shop.whatsapp?.qrCode as Media}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content Area */}
          <section role="main">
            {/* Main Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-4 sm:mb-6 w-full justify-start overflow-x-auto">
                <TabsTrigger value="about">{t("shop.about")}</TabsTrigger>
                <TabsTrigger value="services">{t("shop.system")}</TabsTrigger>
                <TabsTrigger value="staff">{t("shop.staff")}</TabsTrigger>
                <TabsTrigger value="coupons">{t("shop.coupon")}</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="mt-0">
                <div className="space-y-8 sm:space-y-8">
                  <article>
                    <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("shop.About")}</h2>
                    <div className="prose max-w-none">
                      {typeof shop.description === 'string' ? (
                        <p className="text-base sm:text-lg">{shop.description}</p>
                      ) : (
                        shop.description && <RichText data={shop.description} />
                      )}
                    </div>
                  </article>

                  <section>
                    <h3 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("shop.servicesAndFacilities")}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {tagList.map((tag, idx) => (
                        <div className="flex items-center gap-2 border rounded-xl p-2" key={idx}>
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-lg font-semibold"> {tag}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("shop.location")}</h3>
                    <div className="overflow-hidden rounded-lg border">
                      <div className="h-[250px] sm:h-[300px]">
                        <ShopMap
                          location={shop.location}
                          name={shop.shopName}
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <p className="text-sm sm:text-base font-medium">{shop.address}</p>
                        {shop.nearestStation && (
                          <p className="mt-1 text-xs sm:text-sm">
                            {shop.nearestStation}
                          </p>
                        )}
                      </div>
                      <div className="text-center mb-2">
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Google Maps
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="mt-0">
                <section>
                  <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("shop.System")}</h2>
                  {shop.systems && shop.systems.length > 0 ? (
                    <Suspense fallback={<div className="animate-pulse bg-gray-200 h-[200px] w-full rounded-lg" />}>
                      <ShopSystems systems={shop.systems} />
                    </Suspense>
                  ) : (
                    <p className="text-sm sm:text-base">{t("system.noResultsFound")}</p>
                  )}
                </section>
              </TabsContent>

              {/* Staff Tab */}
              <TabsContent value="staff" className="mt-0">
                <section>
                  <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("shop.Staff")}</h2>
                  {shop.staff && shop.staff.length > 0 ? (
                    <ShopStaff staff={shop.staff} />
                  ) : (
                    <p className="text-sm sm:text-base">{t("system.noResultsFound")}</p>
                  )}
                </section>
              </TabsContent>

              {/* Coupons Tab */}
              <TabsContent value="coupons" className="mt-0">
                <section>
                  <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("shop.Coupon")}</h2>
                  {shop.coupons && shop.coupons.length > 0 ? (
                    <ShopCoupons coupons={shop.coupons} />
                  ) : (
                    <p className="text-sm sm:text-base">{t("system.noResultsFound")}</p>
                  )}
                </section>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </main>
  )
} 